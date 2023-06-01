# Install dependencies

`npm install`

# Build

`npm run build`

# Tests

## Run all cypress tests in background

`npx cypress run --component`

## Run all cypress tests in browser

`npx cypress run --component --headed`

## Open cypress

`npx cypress open`

# UI Library

The application is based on the [React](https://reactjs.org/) library and the [Material-UI](https://material-ui.com/) component library.

# Project template

The project is based on the [Vite](https://vitejs.dev/) `react-ts` template.

# Testing tool

Cypress was chosen as the testing tool. It supports e2e, component and unit testing with full visualisation of the process.

# Components

Logic in components is mostly related to displaying data. While business logic is moved to the hooks and the reducer.

# useDialog hook

It's a helper to deal with dialogs. It allows to simplify logic in components just waiting for result of the modal dialog with simple `const result = await open()`

# reducer

I used React reducer as a state management. It's simple, with atomic changes to the common state, so it's easy to debug.

# Moving to ids

Originally, I used indexes for some actions to make it easier to work with arrays. At beginning, it looked OK for such small task, but it caused more code on the component side so to avoid it I moved to ids. Because of `typescript` moving was fast and without any complications.   


