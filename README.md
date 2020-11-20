![AzureBlobExcelFileOnlineEditor](https://user-images.githubusercontent.com/1643802/82470621-35421b80-9ae3-11ea-8957-a16e558a7828.png)

## Description

Web project to access a excel file data resource and modify it using a convenient, flexible and featured user interface.

## Features

Below crud features would be provided:

1. Open file
2. View paginated data grid
3. Update:

- - Add rows
- - Delete rows
- - Edit fields

4. Save file changes

## Principle

backend feature has been chosen to provide limited visibility for users on excel file. This option has been chosen over javascript only libraries like SheetJs parsing the xlsx file because it would mean the complete xlsx file is downloaded by the user. what happens when xlsx file contains information that needs to be authenticated. the backend server would make this possible.

### Tech Choice Explained

- Django, Django Rest Framework, Pandas, openpyxl
- - Django Rest Framework is the json API server. We can inherit the generic api views and write custom behavior to deal with excel as data source.
- - Pandas is easy way to serializer excel file to json in bulk
- - openpyxl allows specific row and cell changes to excel file
- React, React Data Grid, React Router
- - React is convenient way to present the user interface also being future ready
- Azure
- - TODO: figure out how to add project to azure web app

### Behavior

- user opens http://excelapp.com/ then server returns single page app
- user opens any other url then server returns the same single page app
- on page load, SPA loads content based on url state.
- - url 1: /
- - - 'list of data' is displayed
- - - 'add new' option is displayed
- - - 'row on click' is allowed
- - url 2: /2/
- - - 'editable controls' are displayed
- - - 'save option' is displayed
- - - 'delete' option is displayed
- - url 3: /?page=2
- - - not supported in this version. assumption: xls file is small.

## Development

test ui build

```
yarn build
pipenv install
./manage.py collectstatic
./manage.py runserver
open http://localhost:8000
```

or use hot reload

```
pipenv install
./manage.py runserver
yarn
yarn start
open http://localhost:3000
```

## Limitations

- no multi user paradigm / concurrent usage
- blob storage might not support frequent writes

## Deployment

when you run the below command the react app gets built and the html files are committed. The latest pip requirements are printed to requirements.txt and are committed with the same. finally the git repo is pushed to git remote with name azure. (git remote add azure <git-remote-url>)

`make`
