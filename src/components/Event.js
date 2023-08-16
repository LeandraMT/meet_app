import { useState } from "react";

const Event = ({ allEvents }) => {
    const [showDetails, setShowDetails] = useState(false);

    const handleShowDetails = () => {
        setShowDetails(!showDetails);
    }

    return (
        <li className="event">
            <h2>{allEvents.summary}</h2>
            <p>{allEvents.location}</p>
            <p>{allEvents.start.dateTime}</p>
            <button onClick={handleShowDetails} className="details-btn">
                {showDetails ? "Hide details" : "Show details"}
            </button>

            {showDetails && (
                <ul className="details">
                    <li><span>Description: </span> {allEvents.description}</li>
                    <li><span>End Time: </span>{allEvents.end.dateTime}</li>
                    <li><span>Organiser: </span> {allEvents.organizer.email}</li>
                </ul>
            )}
        </li>
    );
}

export default Event;