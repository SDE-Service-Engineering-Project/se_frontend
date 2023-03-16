[![Build & Test](https://github.com/SDE-Service-Engineering-Project/se_frontend/actions/workflows/build.yml/badge.svg)](https://github.com/SDE-Service-Engineering-Project/se_frontend/actions/workflows/build.yml)
[![Sonar Scan](https://github.com/SDE-Service-Engineering-Project/se_frontend/actions/workflows/sonar.yaml/badge.svg)](https://github.com/SDE-Service-Engineering-Project/se_frontend/actions/workflows/sonar.yaml)


# Software Engineering Project Frontend Implementation
This repository delivers the frontend application of the Service Engineering project.

## Table of contents

* [Project information](#project-information)
* [Tools and technologies](#tools-and-technologies)
* [Setup](#setup)

## Project information

This project is part of the Service Engineering study course on the FH-Campus Vienna. The whole application 
should consist of a web application, a car rental service, a currency convert service and a google map service.  
In no form is any monetization or commercialisation off this application intended!

## Tools and technologies
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.2.
* [Angular v15](https://angular.io/) as a javascript framework
* [Jest](https://jestjs.io/)  for testing and test coverage
* [Bootstrap](https://getbootstrap.com/) in combination with [Ng-Bootstrap](https://ng-bootstrap.github.io/#/home) as a CSS Framework
* CI/CD is implemented with the help of [GitHub Actions](https://docs.github.com/en/actions)
* For Code quality [SonarCloud is used](https://www.sonarsource.com/products/sonarcloud/)

## Setup

Run `npm i` to install all dependencies

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.


### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `npm run test` to execute the unit tests via [Jest](https://jestjs.io/).  
Run `npm run test:coverage` to execute the unit tests via [Jest](https://jestjs.io/) and to generate a coverage report.


