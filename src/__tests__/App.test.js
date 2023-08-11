/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-node-access */
import { render } from '@testing-library/react';
import App from '../App';

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
    })
})