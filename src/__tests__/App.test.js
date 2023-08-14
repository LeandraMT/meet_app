/* eslint-disable testing-library/render-result-naming-convention */
/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-node-access */
import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import { getEvents } from '../api';

describe('<App /> component', () => {
    let AppDom;
    beforeEach(() => {
        AppDom = render(<App />).container.firstChild;
    });

    test('renders list of events', () => {
        expect(AppDom.querySelector('#event-list')).toBeInTheDocument();
    });

    test('render CitySearch', () => {
        expect(AppDom.querySelector('#city-search')).toBeInTheDocument();
    });

    test('render number of events', () => {
        expect(AppDom.querySelector('#number-of-events')).toBeInTheDocument();
    });
})

//Integration tests - SCOPE
describe('<App /> integration', () => {
    test('renders a list of events matching the city selected by the user',
        async () => {
            const user = userEvent.setup();
            const AppComponent = render(<App />);
            const AppDom = AppComponent.container.firstChild;

            const CitySearchDom = AppDom.querySelector('#city-search');
            const CitySearchInput = within(CitySearchDom).queryByRole('textbox');

            await user.type(CitySearchInput, "Berlin");

            const berlinSuggestionItem = within(CitySearchDom).queryByText('Berlin, Germany');
            await user.click(berlinSuggestionItem);

            const EventListDom = AppDom.querySelector('#event-list');
            const allRenderedEventItems = within(EventListDom).queryAllByRole('listitem');

            const allEvents = await getEvents();
            const berlinEvents = allEvents.filter(
                event => event.location === 'Berlin, Germany'
            );

            expect(allRenderedEventItems.length).toBe(berlinEvents.length);
            allRenderedEventItems.forEach(event => {
                expect(event.textContent).toContain("Berlin, Germany");
            });
        });

    test('render the selected number of events by the user',
        async () => {
            const AppComponent = render(<App />);
            const AppDom = AppComponent.container.firstChild;

            const NumberOfEventsDom = AppDom.querySelector('#number-of-events');
            const NumberInput = within(NumberOfEventsDom).queryByRole('textbox');

            await userEvent.type(NumberInput, '{backspace}{backspace}32');

            const EventListDom = AppDom.querySelector('#event-list');
            const allRenderedEventItems = within(EventListDom).queryAllByRole('listitem');

            expect(allRenderedEventItems.length).toEqual(32);
        });
})