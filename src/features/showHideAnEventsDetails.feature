Feature: Show and hide events details

    Scenario: An event element is collapsed by default
        Given the user first opens the app
        When the user receives the full list of events
        Then all events will collapse by default

    Scenario: Use can expand an event to see its details
        Given the user gets a list of events
        When  a user selects and event's details
        Then the details will show up for that chosen event

    Scenario: User can collapse an event to hide its details
        Given the user sees the details of the event
        When the user presses a button to hide the event's details
        Then the details of that event will be hidden