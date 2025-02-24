import React from 'react';
import EventList from '../_components/eventList';
import type { Event } from '../_components/eventList';

const allEvents: Event[] = [
    { id: 1, name: 'Tech Conference 2025', description: 'A conference on AI and innovation.', location: 'New York', applied: false },
    { id: 2, name: 'Web Dev Summit', description: 'Discussing the future of web technologies.', location: 'San Francisco', applied: true },
    { id: 3, name: 'Blockchain Expo', description: 'Exploring the latest in blockchain development.', location: 'Berlin', applied: false },
];

const AllEventsPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
            <h1 className="text-3xl font-bold text-blue-700 mb-6">All Events</h1>
            <EventList eventData={allEvents} />
        </div>
    );
};

export default AllEventsPage;
