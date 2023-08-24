/* eslint-disable no-empty-pattern */
import { useState } from "react";

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
    const [numberEvents, setNumberEvents] = useState(32);

    const handleInputChanged = (event) => {
        const value = event.target.value;
        setNumberEvents(value);

        if (isNaN(value)) {
            setErrorAlert('value is not a number');
        }
        else if (value > 50) {
            setErrorAlert('maximun value is 32');
        }
        else if (value <= 0) {
            setErrorAlert('minimum value is 1');
        }
        else {
            setErrorAlert('');
            setCurrentNOE(value);
        }
    }

    return (
        <div id="number-of-events">
            <label>Number of Events: </label>
            <input
                type="text"
                className="number-of-events-textbox"
                placeholder="Enter a number"
                value={numberEvents}
                onChange={handleInputChanged}
            />
        </div>
    )
}

export default NumberOfEvents;