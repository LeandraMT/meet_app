/* eslint-disable no-undef */
/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */

import { render } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

//Test Components
import CitySearch from "../components/CitySearch";
import { extractLocations, getEvents } from "../api";

describe('<CitySearch /> component', () => {
    let CitySearchComponent;
    beforeEach(() => {
        CitySearchComponent = render(<CitySearch />);
    });

    test('renders text input', () => {
        const CityTextBox = CitySearchComponent.queryByRole('textbox');

        expect(CityTextBox).toBeInTheDocument();
        expect(CityTextBox).toHaveClass('city');
    });

    test('suggestions list is hidden by default', () => {
        const suggestionList = CitySearchComponent.queryByRole('list');

        expect(suggestionList).not.toBeInTheDocument();
    });

    test('renders a list of suggestions when a city textbox gains focus',
        async () => {
            const user = userEvent.setup();
            const CityTextBox = CitySearchComponent.queryByRole('textbox');

            await user.click(CityTextBox);

            const suggestionList = CitySearchComponent.queryByRole('list');

            expect(suggestionList).toBeInTheDocument();
            expect(suggestionList).toHaveClass('suggestions');
        });

    test('updates list of suggestions correclty when user types in city textbox',
        async () => {
            const user = userEvent.setup();
            const allEvents = await getEvents();
            const allLocations = extractLocations(allEvents);

            CitySearchComponent.rerender(<CitySearch allLocations={allLocations} />);

            //User types "Berlin" in the city textbox
            const CityTextBox = CitySearchComponent.queryByRole('textbox');
            await user.type(CityTextBox, "Berlin");

            //Filter allLocations to locations matching "Berlin"
            const suggestions = allLocations ? allLocations.filter((location) => {
                return location.toUpperCase().indexOf(CityTextBox.value.toUpperCase()) > -1;
            }) : [];

            //Get all <li> elements inside the suggestion list
            const suggestionListItems = CitySearchComponent.queryAllByRole('listitem');

            expect(suggestionListItems).toHaveLength(suggestions.length + 1);
            for (let i = 0; i < suggestions.length; i += 1) {
                expect(suggestionListItems[i].textContent).toBe(suggestions[i]);
            }
        });

    test('renders the suggestion text in the textbox upon clicking on the suggestion',
        async () => {
            const user = userEvent.setup();
            const allEvents = await getEvents();
            const allLocations = extractLocations(allEvents);

            CitySearchComponent.rerender(<CitySearch allLocations={allLocations} />);

            const CityTextBox = CitySearchComponent.queryByRole('textbox');
            await user.type(CityTextBox, "Berlin");

            //The suggestion's textContent look like this: "Berlin, Germany"
            const BerlinGermanySuggestion = CitySearchComponent.queryAllByRole('listitem')[0];

            await user.click(BerlinGermanySuggestion);

            expect(CityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
        });
});