Feature: Specify number of events

    Scenario: When user hasn't specified a number, 32 will be the default number
        Given the user hasn't filtered the number in the textbox of events
        When the user sees the list of events
        Then the default number of events will be displayed

    Scenario: User can specify the number of events they want to check
        Given the user has events displayed
        When the user chooses to change the number of events displayed
        Then the number of events filtered by user will be updated and displayed