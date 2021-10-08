# Interview Scheduler


Scheduler is a single page React App which allows you to book appointments. 
Built upon an existing back-end provided by LHL during the Web Deb Bootcamp to practice React. 
This is deployed at: https://pensive-chandrasekhar-078fa9.netlify.app/ using a heroku hosted postgres-API and CircleCI. 
The deployed app does not integrate websockets but websockets were implemented in another branch (stretch/websockets).

<sub><sup> ** Note: Please give the app some time to initially load data as heroku will shut off the API after 30 minutes of inactivity. ** </sup></sub>

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```


 ## Major Learnings

 1. Creating React components, passing props and hooks (useState, useEffect, useReducer).
 2. Managing state and using custom hooks to render components and create controlled forms.
 3. Axios requests and web sockets (not in production -- branch: stretch/websockets).
 4. Immutable patterns, conditional rendering and managing DOM events.
 5. Testing with Storybook (components), Jest (unit, integration) and Cypress (End to End).

 ## Final Product
 ### Add, edit or delete an interview
 ![Functionality](https://media0.giphy.com/media/7CM2xLpSiEyxBpuxsE/giphy.gif?cid=790b7611581c38031676d760992b2ee2e37fcaf842daaad3&rid=giphy.gif&ct=g)

 ### Form validation
 ![Form Validation](https://media1.giphy.com/media/pzoAIfkdIvKjd7EuJ9/giphy.gif?cid=790b761195729ef50f296705b6c68f315a96c85eddc65ff7&rid=giphy.gif&ct=g)
