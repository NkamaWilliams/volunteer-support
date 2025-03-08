"use client"
import { api } from "~/trpc/react";
import type { Event } from "./eventList";
import EventList from "./eventList";
const eventData: Event[] = [
  {
    id: "1",
    title: "Tech Conference 2025",
    description: "A conference on AI and innovation.",
    location: "New York",
    applied: false
  },
  {
    id: "2",
    title: "Web Dev Summit",
    description: "Discussing the future of web technologies.",
    location: "San Francisco",
    applied: false
  },
  {
    id: "3",
    title: "Blockchain Expo",
    description: "Exploring the latest in blockchain development.",
    location: "Berlin",
    applied: false
  },
];

export const LatestEvents = () => {
    const events = api.event.getLatest.useQuery();
    return events.isFetched ? <EventList eventData={events?.data ?? []}/> 
        : <p className="text-center">No available upcoming event!</p>
}