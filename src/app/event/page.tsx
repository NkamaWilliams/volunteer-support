'use client'
import { EventList } from "../_components/list"
import { api } from "~/trpc/react"
import { useState, useEffect } from "react"

interface Event {
    status: string,
    id: string,
    title: string,
    location: string,
    date: string
}

const Events = () => {
    const [events, setEvents] = useState<Event[]>([])
    const getEvents = api.event.getMyEvents.useQuery()
    const parseDate = (date:Date) => {
        const setDate = date
        return `${setDate.getDate()}-${setDate.getMonth()}-${setDate.getFullYear()}`
    }

    return(
        <div className="flex-1 flex flex-col space-y-6 rounded-lg bg-blue-400 h-full p-6 shadow-lg">
            <h1 className="text-center text-4xl font-semibold">My Events</h1>

            <div className="flex-1 mx-auto my-4 p-4 max-w-5xl w-full h-screen bg-white rounded-md">
                {
                    getEvents.isLoading && <p className="m-3 text-xl text-center font-semibold">Loading Events...</p>
                }
                {
                    getEvents.isFetched && 
                    getEvents.data?.map(event => 
                        <EventList 
                        key={event.id}
                        eventId={event.id}
                        title={event.title} 
                        date={parseDate(event.date)}
                        location={event.location ?? "Unknown Location"} 
                        status={event.status}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default Events