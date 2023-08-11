/* eslint-disable no-restricted-globals */
/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

//Test Component
import NumberOfEvents from "../components/NumberOfEvents";

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsComponent;
    beforeEach(() => {
        NumberOfEventsComponent = render(<NumberOfEvents />);
    });

    test('default value of textbox is 32 events', () => {
        const TextBox = NumberOfEventsComponent.queryByRole('spinbutton');

        expect(TextBox.value).toBe('32');
    });

    //Check test for when user changes input and the textbox changes accordingly
})