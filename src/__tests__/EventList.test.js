/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */

import { render, waitFor, within } from "@testing-library/react";

//Test Components
import EventList from "../components/EventList";
import { getEvents } from "../api";
import App from "../App";

describe('<EventList /> component', () => {
    let EventListComponent;
    beforeEach(() => {
        EventListComponent = render(<EventList />);
    })
    test('has an element with "list" role', () => {
        expect(EventListComponent.queryByRole("list")).toBeInTheDocument();
    });

    test('renders correct number of events', async () => {
        const allEvents = await getEvents();

        EventListComponent.rerender(<EventList allEvents={allEvents} />);

        expect(EventListComponent.getAllByRole('listitem')).toHaveLength(allEvents.length);
    });
});

//Integration tests - SCOPE
describe('<EventLis /> integration', () => {
    test('render a list of 32 events when the app is mounted and rendered',
        async () => {
            const AppComponent = render(<App />);
            const AppDom = AppComponent.container.firstChild;
            const EventListDom = AppDom.querySelector('#event-list');
            await waitFor(() => {
                const EventListItems = within(EventListDom).queryAllByRole('listitem');

                expect(EventListItems.length).toBe(32);
            });
        });
});