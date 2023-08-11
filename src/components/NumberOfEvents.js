import { useState } from "react";

const NumberOfEvents = () => {
    const [query, setQuery] = useState('');

    const handleEventsChanged = (allEvents) => {
        const value = allEvents.target.value;
        setQuery(value)
    }
    return (
        <div id="number-of-events">
            <input
                type="number"
                className="textbox"
                defaultValue={32}
                onChange={handleEventsChanged}
            />
        </div>
    );
}

export default NumberOfEvents;