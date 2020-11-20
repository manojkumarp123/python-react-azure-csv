from django.http import HttpResponse, HttpResponseBadRequest
from django.views.generic import TemplateView
from django.views.decorators.cache import never_cache
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework.decorators import action, api_view
from .services.local import LocalFile


# Serve Single Page Application
spa = never_cache(TemplateView.as_view(template_name="index.html"))


def standard_cache_json_response(view):
    def cache_response_wrapper(view_set, *args, **kwargs):
        response = view(view_set, *args, **kwargs)
        if response:
            return response
        json_str = view_set.cache.get_json()
        return HttpResponse(json_str)

    return cache_response_wrapper


def validate_row_index(view):
    def validate_index_wrapper(view_set, *args, **kwargs):
        pk = kwargs["pk"] = int(kwargs["pk"])
        if pk < 0:
            return HttpResponseBadRequest("index should start at 0")
        return view(view_set, *args, **kwargs)

    return validate_index_wrapper


class BrockerOfficeViewSet(ViewSet):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.cache = LocalFile()

    @action(detail=False, methods=["PUT"])
    def azure(self, request):
        self.cache.upload()
        json_str = self.cache.get_json()
        return HttpResponse(json_str)

    @action(detail=False, methods=["DELETE"])
    def local(self, request):
        self.cache.download()
        json_str = self.cache.get_json()
        return HttpResponse(json_str)

    @standard_cache_json_response
    def list(self, request):
        pass

    @standard_cache_json_response
    def create(self, request):
        self.cache.append_row(request.data)

    @validate_row_index
    @standard_cache_json_response
    def destroy(self, request, pk):
        self.cache.delete_row(pk)

    @validate_row_index
    @standard_cache_json_response
    def update(self, request, pk):
        self.cache.update_row(pk, request.data)
