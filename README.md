# MEET APP

This app is created with the purpose of users, friends or potential employers to know of upcoming events in a specified city. 

The app is a PWA (progressive web app) with the ability to work offline and has a serverless backend developed with TDD (test-driven-development) technique.

The server, which is a serverless function, will be hosted in a cloud provider, in this case AWS (Amazon web services).

# User Stories

1. As a user,
    I should be able to click on the show/hide button,
    so that I can see the events' details or hide them.
2. As a user,
    I should be able to see the total events in the main page,
    so that I can specify how many events I would like to select.
3. As a user, 
    I should be able to interact with the application anywhere,
    so when I am offline it still functions.
4. As a user, 
    I should be able to select Meet app to my Home Screen section,
    so that I can access it immediately on my phone.
5. As a user,
    I should be able to navigate through the charts on the main page,
    so that I can visualise all of the events details. 

# Gherkin

- **Given** the main page is open;
- **When** the user scrolls through the events;
- **Then** the user can click on see or hide detailse from each event.

- **Given** the main page is open;
- **When** the user navigates through all of the events;
- **Then** the user selects how many events they'd like to see.

- **Given** user wants to use the application;
- **When** user is currently offline;
- **Then** the application will still function from where the user left off.

- **Given** user has not opened the application;
- **When** user wants to access instantly the application;
- **Then** the application has a shortcut to add to home screen.

- **Given** the main page is open;
- **When** all the events pop up for the user;
- **Then** the user navigates through the charts and reads through events' details. 

# Serverless Functions

The Meet App's backend uses FaaS and is hosted on AWS Lambda. It uses an external API (Google Calendar) which will be used to retrieve data for upcoming events, for this procedure to happen the user will need authentication with a valid token from Google OAuth authorisation server. 

For the frontend, one example is that the users will be able to filter events where the serverless functions can perform data processing and filtering tasks, including task management. As the **Meet App** will display the charts and their details, where the serverless framework allows for effective resource allocation and scaling according to current demand of the user.