"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { api } from "~/trpc/react";
import { useMemo } from "react";
import { Status } from "@prisma/client";

const EventManagement = ({id} : {id: string}) => {
    const router = useRouter();
    
    const {data:event, isLoading, isFetched} = api.event.getEvent.useQuery(
      {
        id
      },
      // { enabled: !!id }
    )
    const accept = api.event.acceptApplication.useMutation({
        onSuccess: res => {
            const id = res.application.id
            const status = res.application.status
            if (event){
                event.signups = event.signups.map(signup => {
                    if (signup.id == id){
                        signup.status = status
                    }
                    return signup
                })
            }
        },
        onError: err => {
            alert(err.message)
        }
    })
    const reject = api.event.rejectApplication.useMutation({
        onSuccess: res => {
            const id = res.application.id
            const status = res.application.status
            if (event){
                event.signups = event.signups.map(signup => {
                    if (signup.id == id){
                        signup.status = status
                    }
                    return signup
                })
            }
        },
        onError: err => {
            alert(err.message)
        }
    })
    
    const memoizedAccepted = useMemo(() => {
        if (event){
            return event.signups.filter(signup => signup.status == Status.CONFIRMED).length
        }
        else {
            return 0;
        }
    }, [event])
    // useEffect(() => {
    //   if (event) {
    //     setVolunteers(event.signups || []);
    //   }
    // }, [event]);
  
    const handleAccept = (id: string) => {
    //   setVolunteers(volunteers.filter((volunteer) => volunteer.id !== id));
        accept.mutate({applicationId: id})
    };
  
    const handleReject = (id: string) => {
    //   setVolunteers(volunteers.filter((volunteer) => volunteer.id !== id));
        reject.mutate({applicationId: id})
    };
  
    const handleDeleteEvent = () => {
      router.push("/events");
    };
    // bg-gradient-to-b from-blue-800 to-blue-400
    return (
      <div className="flex-1 space-y-6 rounded-lg bg-blue-400  p-6 shadow-lg">
        {
          isFetched &&
          <div>
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
            <div className="max-w-7xl mx-auto">
                <h2 className="my-3 text-center text-3xl font-extrabold text-gray-800">{event?.title}</h2>
                <div className="my-2 text-lg text-gray-700 max-w-7xl mx-auto">
                    <span className="text-black font-semibold">Applicants:</span> {memoizedAccepted}/{event?.max_participants}
                </div>
                <p className="text-lg text-gray-900">
                    <span className="text-black font-semibold">Location:</span> {event?.location}
                </p>
                <div className="flex mt-2 gap-2">
                    <p className="block text-center text-lg font-semibold">Description:</p>
                    <p className=" flex-1 text-lg  rounded-md">
                        {event?.description}
                    </p>
                </div>
            </div>
            <div className="max-w-7xl mx-auto">
                <h3 className="my-3 text-xl text-center font-bold text-gray-900">Volunteers</h3>
                {event?.signups.length === 0 ? (
                <p className="text-gray-500">No volunteers yet.</p>
                ) : (
                <ul className="space-y-3">
                    {event?.signups.map((volunteer) => (
                    <li
                        key={volunteer.id}
                        className="flex items-center justify-between rounded-md bg-gray-100 p-3"
                    >
                        <span className="font-medium text-gray-800">
                        {volunteer.user.name}
                        </span>
                        {
                            volunteer.status == Status.PENDING ?
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
                            </div> :
                            <div>
                                <p 
                                className={`font-semibold ${volunteer.status == "CONFIRMED" ? "text-green-500" : "text-red-500"}`}>
                                    {volunteer.status}
                                </p>
                            </div>
                        }
                    </li>
                    ))}
                </ul>
                )}
            </div>
          </div>
        }
        {
            isLoading && 
            <p className="text-center my-5 text-white text-xl font-semibold">Loading Event...</p>
        }
      </div>
    );
  };

export default EventManagement