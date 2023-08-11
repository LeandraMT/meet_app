/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable no-undef */
/* eslint-disable testing-library/no-render-in-setup */

import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

//Test Components
import Event from "../components/Event";
import mockData from "../mock-data";

describe('<Event /> component', () => {
    const allEvents = mockData[0];

    let EventComponent;
    beforeEach(() => {
        EventComponent = render(<Event allEvents={allEvents} />)
    });

    test('renders event location', () => {
        expect(EventComponent.queryByText(allEvents.location)).toBeInTheDocument();
    })

    test('renders the name of the event', () => {
        expect(EventComponent.queryByText(allEvents.summary)).toBeInTheDocument();
    });

    test('renders the start time of event', () => {
        expect(EventComponent.queryByText(allEvents.start.dateTime)).toBeInTheDocument();
    });

    test('renders the "show details" button', () => {
        expect(EventComponent.queryByText("Show details")).toBeInTheDocument();
    });

    test('event details is hidden by default', () => {
        const showDetails = EventComponent.queryByRole('list');

        expect(showDetails).not.toBeInTheDocument();
    });

    test('event details are shown when "show details" button is clicked',
        async () => {
            const user = userEvent.setup();
            const ShowDetailsButton = EventComponent.queryByText("Show details");

            await user.click(ShowDetailsButton);

            const eventDetails = EventComponent.queryByRole('list');

            expect(eventDetails).toBeInTheDocument();
        });
})