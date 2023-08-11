import Event from "./Event";

const EventList = ({ allEvents = [] }) => {
    return (
        <ul id="event-list">
            {allEvents.length > 0 ?

                allEvents.map(event => <Event key={event.id} allEvents={event} />)
                : null}
        </ul>
    );
}

export default EventList;