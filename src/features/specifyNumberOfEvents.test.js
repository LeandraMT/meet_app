/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-node-access */
import { render, waitFor, within, screen } from "@testing-library/react";
import { loadFeature, defineFeature } from "jest-cucumber";
import userEvent from '@testing-library/user-event';

import App from "../App";

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, (test) => {
    test('When user hasn\'t specified a number, 32 will be the default number', ({ given, when, then }) => {
        let AppComponent;
        let eventList;
        given('the user hasn\'t filtered the number in the textbox of events', () => {
            AppComponent = render(<App />);
        });

        when('the user sees the list of events',
            async () => {
                const AppDom = AppComponent.container.firstChild;

                await waitFor(() => {
                    eventList = within(AppDom).queryAllByRole('listitem');

                    expect(eventList[0]).toBeTruthy();
                });
            });

        then('the default number of events will be displayed', () => {
            expect(eventList.length).toBe(32);
        });
    });

    test('User can specify the number of events they want to check', ({ given, when, then }) => {
        let AppComponent;
        given('the user has events displayed',
            async () => {
                AppComponent = render(<App />);
                const AppDom = AppComponent.container.firstChild;

                await waitFor(() => {
                    const eventList = within(AppDom).queryAllByRole('listitem');
                    expect(eventList[0]).toBeTruthy();
                });
            });

        when('the user chooses to change the number of events displayed',
            async () => {
                const button = screen.getByPlaceholderText('Enter a number');

                await userEvent.type(button, '10');
            });

        then('the number of events filtered by user will be updated and displayed',
            async () => {
                const user = userEvent.setup();
                const button = screen.getByPlaceholderText('Enter a number');

                await user.type(button, "15");

                expect(button).toHaveValue("321015")
            });
    });
});