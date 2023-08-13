/* eslint-disable no-empty-pattern */
import { useState } from "react";

const NumberOfEvents = ({ }) => {
    const [numberEvents, setNumberEvents] = useState(32);

    const handleInputChanged = (event) => {
        const value = event.target.value;
        setNumberEvents(value);
    }

    return (
        <div id="number-of-events">
            <label>Number of Events:</label>
            <input
                type="text"
                id="number-of-events"
                className="number-of-events-textbox"
                value={numberEvents}
                onChange={handleInputChanged}
            />
        </div>
    )
}

export default NumberOfEvents;