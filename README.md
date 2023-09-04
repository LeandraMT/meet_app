# MEET APP

This app is created with the purpose for users to know of upcoming events in a specified city. 

The app is a PWA (progressive web app) with the ability to work offline and has a serverless backend developed with agile techniques TDD and BDD.

The server, which is a serverless function, will be hosted in a cloud provider, in this case AWS.

# Serverless Functions

The Meet App's backend uses FaaS and is hosted on AWS Lambda. It uses an external API (Google Calendar) which will be used to retrieve data for upcoming events, for this procedure to happen the user will need to authenticate with a Gmail account.

For the frontend, one example is that the users will be able to filter events where the serverless functions can perform data processing and filtering tasks, including task management. 
With the **Meet App** a chart and details of each events will be rendered where the user can filter cities to their preferences. 

# TDD and BDD 

The Meet App has been tested with Cucumber and Jest to conduct unit and integration tests as well as, acceptance and end-to-end testing. 

# Atatus - Performance Monitoring App tool

The Meet App has Atatus, the APM tool integrated to capture all relevant data and store it from my application. This way the app will be checked frequently to provide metrics on its performance and errors. 

# Data Visualisation

I have used Recharts to display a ScatterChart where users will be able to see in a visual format the events and its details. I have used Recharts for this project as it is a lightweight charting library with a well-documented resources and easy to customise.

Link to the application: https://leandramt.github.io/meet_app/