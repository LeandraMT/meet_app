# MEET APP

This app is created with the purpose of users, friends or potential employers to know of upcoming events in a specified city. 

The app is a PWA (progressive web app) with the ability to work offline and has a serverless backend developed with TDD (test-driven-development) technique.

The server, which is a serverless function, will be hosted in a cloud provider, in this case AWS (Amazon web services).

# Serverless Functions

The Meet App's backend uses FaaS and is hosted on AWS Lambda. It uses an external API (Google Calendar) which will be used to retrieve data for upcoming events, for this procedure to happen the user will need authentication with a valid token from Google OAuth authorisation server. 

For the frontend, one example is that the users will be able to filter events where the serverless functions can perform data processing and filtering tasks, including task management. As the **Meet App** will display the charts and their details, where the serverless framework allows for effective resource allocation and scaling according to current demand of the user.

# TDD and BDD 

The Meet App has been tested with Cucumber and Jest to conduct unit and integration tests as well as, acceptance and end-to-end testing. 

# Atatus - Performance Monitoring App tool

The Meet App has Atatus, the APM tool integrated to capture all relevant data and store it from my application. This way the app will be checked frequently to provide metrics on its performance and errors. 