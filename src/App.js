/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import { useEffect, useState } from 'react';
import { extractLocations, getEvents } from './api';

//Test Components
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';

//Alert Class Components
import { InfoAlert, ErrorAlert } from './components/Alert';

const App = () => {
    const [events, setEvents] = useState([]);
    const [currentNOE, setCurrentNOE] = useState(32);
    const [allLocations, setAllLocations] = useState([]);
    const [currentCity, setCurrentCity] = useState("See all cities");
    const [infoAlert, setInfoAlert] = useState("");
    const [errorAlert, setErrorAlert] = useState("");

    const fetchData = async () => {
        const allEvents = await getEvents();
        const filteredEvents = currentCity === "See all cities" ?
            allEvents : allEvents.filter(event => event.location === currentCity)

        setEvents(filteredEvents.slice(0, currentNOE));
        setAllLocations(extractLocations(allEvents));
    }

    useEffect(() => {
        fetchData();
    }, [currentCity]);

    return (
        <div className="App">
            <h1 className="main-heading">Meet</h1>

            <div className="alerts-container">
                {infoAlert.length ?
                    <InfoAlert text={infoAlert} /> : null}
                {errorAlert.length ?
                    <ErrorAlert text={errorAlert} /> : null}
            </div>

            <CitySearch
                allLocations={allLocations}
                setCurrentCity={setCurrentCity}
                setInfoAlert={setInfoAlert}
            />
            <EventList
                allEvents={events}
            />
            <NumberOfEvents
                setCurrentNOE={setCurrentNOE}
                setErrorAlert={setErrorAlert}
            />
        </div>
    );
}

export default App;