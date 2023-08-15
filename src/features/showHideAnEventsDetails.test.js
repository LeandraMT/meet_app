/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-node-access */
import { render, waitFor, within } from "@testing-library/react";
import { loadFeature, defineFeature } from "jest-cucumber";
import userEvent from '@testing-library/user-event';

import App from "../App";

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, (test) => {
    test('An event element is collapsed by default', ({ given, when, then }) => {
        let AppComponent;
        given('the user first opens the app', () => {
            AppComponent = render(<App />);
        });

        when('the user receives the full list of events',
            async () => {
                const AppDom = AppComponent.container.firstChild;
                const EventListDom = AppDom.querySelector('#event-list');

                await waitFor(() => {
                    const EventListItems = within(EventListDom).queryAllByRole('listitem');
                    expect(EventListItems.length).toBe(32);
                });
            });

        then('all events will collapse by default', () => {
            const EventDom = AppComponent.container.firstChild;
            const details = EventDom.querySelector('.details');
            expect(details).not.toBeInTheDocument();
        });
    });

    test('Use can expand an event to see its details', ({ given, when, then }) => {
        let AppComponent;
        given('the user gets a list of events',
            async () => {
                AppComponent = render(<App />);
                const AppDom = AppComponent.container.firstChild;

                await waitFor(() => {
                    const eventList = within(AppDom).queryAllByRole('listitem');
                    expect(eventList[0]).toBeTruthy();
                });
            });

        when('a user selects and event\'s details',
            async () => {
                const button = AppComponent.queryAllByText('Show details')[0];

                await userEvent.click(button);
            });

        then('the details will show up for that chosen event', () => {
            const EventDom = AppComponent.container.firstChild;
            const details = EventDom.querySelector('.details');

            expect(details).toBeInTheDocument();
        });
    });

    test('User can collapse an event to hide its details', ({ given, when, then }) => {
        let AppComponent;
        let button;
        given('the user sees the details of the event',
            async () => {
                AppComponent = render(<App />);
                const AppDom = AppComponent.container.firstChild;

                await waitFor(() => {
                    const eventList = within(AppDom).queryAllByRole('listitem');

                    expect(eventList[0]).toBeTruthy();
                });

                button = AppComponent.queryAllByText('Show details')[0];
                await userEvent.click(button);

                const EventDom = AppComponent.container.firstChild;
                const details = EventDom.querySelector('.details');

                expect(details).toBeInTheDocument();
            });

        when('the user presses a button to hide the event\'s details',
            async () => {
                await userEvent.click(button);
            });

        then('the details of that event will be hidden', () => {
            const EventDom = AppComponent.container.firstChild;
            const details = EventDom.querySelector('.details');

            expect(details).not.toBeInTheDocument();
        });
    });
});