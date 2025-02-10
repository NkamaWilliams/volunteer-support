"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface Volunteer {
  id: string;
  name: string;
}

interface EventDetails {
  id: string;
  name: string;
  location: string;
  description: string;
  maxApplicants: number;
  applicants: Volunteer[];
}

const sampleEvent: EventDetails = {
  id: "1",
  name: "Unilag NelFund Run 2025",
  location: "New Hall, Unilag",
  description: "A charity run to raise funds for some unilag students",
  maxApplicants: 10,
  applicants: [
    { id: "101", name: "Alice Johnson" },
    { id: "102", name: "Bob Smith" },
  ],
};

const EventManagement = ({ event = sampleEvent }: { event?: EventDetails }) => {
  const router = useRouter();
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);

  useEffect(() => {
    if (event) {
      setVolunteers(event.applicants || []);
    }
  }, [event]);

  const handleAccept = (id: string) => {
    setVolunteers(volunteers.filter((volunteer) => volunteer.id !== id));
  };

  const handleReject = (id: string) => {
    setVolunteers(volunteers.filter((volunteer) => volunteer.id !== id));
  };

  const handleDeleteEvent = () => {
    router.push("/events");
  };

  return (
    <div className="mx-auto space-y-6 rounded-lg bg-gradient-to-b from-blue-800 to-blue-400 p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex justify-center gap-3 text-center">
          <button
            onClick={() => router.back()}
            className="flex items-center rounded-full bg-white p-2 shadow-md hover:shadow-lg"
          >
            <ArrowLeft className="h-6 w-6 text-gray-800" />
          </button>

          <h1 className="text-2xl font-bold text-gray-900">Manage Event</h1>
        </div>

        <button
          onClick={handleDeleteEvent}
          className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          Delete Event
        </button>
      </div>
      <div>
        <h2 className="text-3xl font-extrabold text-gray-800">{event.name}</h2>
        <p className="text-lg text-gray-600">📍 {event.location}</p>
        <p className="mt-2 text-gray-700">{event.description}</p>
      </div>
      <div className="text-lg font-semibold text-gray-700">
        Applicants: {volunteers.length}/{event.maxApplicants}
      </div>
      <div>
        <h3 className="mb-3 text-xl font-bold text-gray-900">Volunteers</h3>
        {volunteers.length === 0 ? (
          <p className="text-gray-500">No volunteers yet.</p>
        ) : (
          <ul className="space-y-3">
            {volunteers.map((volunteer) => (
              <li
                key={volunteer.id}
                className="flex items-center justify-between rounded-md bg-gray-100 p-3"
              >
                <span className="font-medium text-gray-800">
                  {volunteer.name}
                </span>
                <div className="space-x-2">
                  <button
                    onClick={() => handleAccept(volunteer.id)}
                    className="rounded-md bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(volunteer.id)}
                    className="rounded-md bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EventManagement;
