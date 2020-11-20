deploy: server
	git add -A
	git commit -m "build"
	git push azure master

server: ui
	pipenv lock -r > requirements.txt

ui:
	yarn build
