import React from 'react';
import EventList from '../_components/eventList';
import type { Event } from '../_components/eventList';


const acceptedEvents: Event[] = [
    { id: 2, name: 'Web Dev Summit', description: 'Discussing the future of web technologies.', location: 'San Francisco', applied: true },
];

const AcceptedEventsPage: React.FC = () => {
    return (
        <div className="p-6 bg-white min-h-screen">
            <h1 className="text-3xl font-bold text-blue-700 mb-4">Accepted Events</h1>
            <EventList eventData={acceptedEvents} />
        </div>

    );
};

export default AcceptedEventsPage;
