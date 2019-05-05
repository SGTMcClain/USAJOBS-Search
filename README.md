# USAJOBSLocationSearch

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Using the Application

This application does a search based on keywords and location, enter in a keyword, a location, both or neither and a search will be performed.  The results will appear in the table below.  The results provide a link to the USAJOBs website that will open in a new window and the dropdown to the left provides information Job and Qualification information for that specifc job.

## USAJOBs API and CORS
This application uses the USAJobs API.  It was initially set up as a Service in the search-query.model.ts however CORS policies prevented me from using that service to run the application.  There wasn't enough time to figure out how to completely fix this issue so the current iteration works around it by putting the service logic into the search-form.component.ts

## Session Storage
The most recent search details are saved to session storage and loaded on the users return to the session

## UI/UX
[Clarity Design System] (https://v1.clarity.design/)

## Files and Usage
This Angular Application uses:
- app.component.html: as the base page for angular components header and search-form
    - header.component: houses the header menu html and ts files
    - search-form.component: houses the html and logic for the search form and the results table.
        - search-form.component.ts: currently contains the search logic, this will likely be broken out into the a search service after fixing the CORS issue
        - search-form.component.html: implements both the search form and the results table that is styled using the clarity design system
    - search-results.component:  Future home of the results table 
- models
    - searchQueryModel: basic model for search queries, ultimately used to store data into session storage in JSON format
    - searchResultsBasic: a basic model for search result formating to make it easy to reference properties in the HTML.  This only uses a subset of all potenital results.
    - searchResultsComplete: a comprehensive model of all potenital search results.  Will be implemented in a future release
- service
    - search-query: future service that will be used to interact with the USAJOBs api, currently not in use due to a CORS issue
- enums
    - searchQuerys: enums to make it easier to reference the correct syntax of search queries using the USAJOBs api

