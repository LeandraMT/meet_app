/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/prefer-screen-queries */
import { render } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

//Test component
import NumberOfEvents from "../components/NumberOfEvents";

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsComponent;
    beforeEach(() => {
        NumberOfEventsComponent = render(<NumberOfEvents />);
    });

    test('renders number of events in textbox', () => {
        const NumberTextBox = NumberOfEventsComponent.queryByRole('textbox');

        expect(NumberTextBox).toBeInTheDocument();
        expect(NumberTextBox).toHaveClass('number-of-events-textbox');
    });

    test('default events are 32', async () => {
        const numberTextBox = NumberOfEventsComponent.queryByRole('textbox');

        expect(numberTextBox).toHaveValue("32");
    });

    test('number of events in the textbox change according to what user types',
        async () => {
            const user = userEvent.setup();
            const numberTextBox = NumberOfEventsComponent.queryByRole('textbox');

            await user.type(numberTextBox, "15");

            //having the default value already written(32) + 15
            expect(numberTextBox).toHaveValue("3215")
        });
});