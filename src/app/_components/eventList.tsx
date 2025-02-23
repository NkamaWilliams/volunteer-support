"use client";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { useState } from "react";

interface Event {
  id: number;
  name: string;
  description: string;
  location: string;
  applied: boolean;
}

interface EventListProps {
  eventData: Event[];
}

// const eventData: Event[] = [
//   {
//     id: 1,
//     name: "Tech Conference 2025",
//     description: "A conference on AI and innovation.",
//     location: "New York",
//     applied: false,
//   },
//   {
//     id: 2,
//     name: "Web Dev Summit",
//     description: "Discussing the future of web technologies.",
//     location: "San Francisco",
//     applied: true,
//   },
//   {
//     id: 3,
//     name: "Blockchain Expo",
//     description: "Exploring the latest in blockchain development.",
//     location: "Berlin",
//     applied: false,
//   },
// ];

const EventList: React.FC<EventListProps> = ({ eventData }) => {
  const [events, setEvents] = useState<Event[]>(eventData);
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const toggleApply = (id: number) => {
    setEvents(
      events.map((event) =>
        event.id === id ? { ...event, applied: !event.applied } : event,
      ),
    );
  };

  const toggleDropdown = (id: number) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="mx-auto mb-10 mt-10 w-[80%] space-y-4 border-2 border-blue-500 p-6">
      {events.map((event) => (
        <div
          key={event.id}
          className="rounded-lg border border-gray-200 bg-white p-4 shadow-md"
        >
          <div className="flex items-center justify-between">
            <h3 className="flex gap-3 text-lg font-semibold text-blue-700">
              {event.name}
              <button
                className="text-gray-500 transition hover:text-gray-700"
                onClick={() => toggleDropdown(event.id)}
              >
                {expanded[event.id] ? (
                  <MdOutlineKeyboardArrowUp />
                ) : (
                  <MdKeyboardArrowDown />
                )}
              </button>
            </h3>
            <div className="flex">
              <button
                className={`rounded-md px-4 py-2 text-sm font-medium text-white transition ${
                  event.applied
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
                onClick={() => toggleApply(event.id)}
              >
                {event.applied ? "Cancel" : "Apply"}
              </button>
            </div>
          </div>
          {expanded[event.id] && (
            <div className="mt-3 rounded-lg bg-gray-100 p-3">
              <p className="text-sm text-gray-700">
                <strong>Description:</strong> {event.description}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Location:</strong> {event.location}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default EventList;
export type {Event}
