"use client"
import React from 'react';
import EventList from '../_components/eventList';
import { api } from '~/trpc/react';

const AllEventsPage: React.FC = () => {
    const events = api.event.getAllEvents.useQuery()
    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-blue-800 to-blue-400 text-white p-6">
            <h1 className="text-3xl font-bold mb-6">All Events</h1>
            {events.isFetched && <EventList eventData={events?.data ?? []} />}
            {events.isLoading && <p>Loading Events...</p>}
        </div>
    );
};

export default AllEventsPage;
