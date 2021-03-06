# Angular 4 Restaurant App Demo

Angular 4 web application, developed for the following post, [Developing Applications for the Cloud with Azure App Services and MongoDB Atlas](https://wp.me/p1RD28-5ij). Application is designed to be deployed as Azure Web App, backed by the [Restaurant API](https://github.com/garystafford/RestaurantWebAPI).

![Architecture](RestaurantDemoAPI.png)

## Project Generator

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.9.

## Development Server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code Scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running Unit Tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running End-to-End Tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further Help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Project Setup and Run Notes

1. Download and install Node.js, npm, and Yarn<br>
   `npm install -g yarn`

2. Install the Angular CLI globally<br>
  `yarn global add @angular/cli`

  3. Install `ng-bootstrap` dependency into the project<br>
  `yarn add bootstrap@4.0.0-beta.2`

4. Install `ng-bootstrap` into the project<br>
  `yarn add @ng-bootstrap/ng-bootstrap`

5. Update dependencies (_optional_)

```bash
yarn global add david
david update
yarn add typescript@'>=2.1.0 <2.4.0' --save-dev
```

6. Transpile and run continuously in development

```bash
ng serve --open --dev # local
ng serve --open --dev --env=prod # Azure/Atlas
```

7. Build for Development

```bash
ng build --env=prod # local
ng build --env=prod # Azure/Atlas
```

8. Build for Production<br>
  `ng build --prod --env=prod`

## References

- <https://angular.io/guide/http#httpclient>>
- <https://ng-bootstrap.github.io/#/getting-started>
- <https://coursetro.com/posts/code/64/How-to-Deploy-an-Angular-App-(Angular-4>)
- <https://www.intertech.com/Blog/deploying-angular-4-apps-with-environment-specific-info>
- <https://medium.com/beautiful-angular/angular-2-and-environment-variables-59c57ba643be>
