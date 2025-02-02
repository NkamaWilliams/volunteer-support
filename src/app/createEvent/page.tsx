"use client";
import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

const  CreateEvent = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
      title: "",
      description: "",
      location: "",
      date: "",
      max_participants: 0
    });

    const create = api.event.createEvent.useMutation({
      onSuccess: async (event) => {
        console.log("Event created successfully")
        console.log(event)
        router.push("/")
      },
      onError: async err => {
        console.log(err.message)
      }
    })
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      if (e.target.name == "max_participants"){
        setFormData({ ...formData, max_participants: Number(e.target.value) });
      } else{
        setFormData({ ...formData, [e.target.name]: e.target.value });
      }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement | HTMLAreaElement>) => {
      e.preventDefault()
      create.mutate(formData)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-800 to-blue-400">
        <div className="max-w-sm mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Create an Event</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                type="text" 
                name="title" 
                value={formData.title} 
                onChange={handleChange} 
                placeholder="Title" 
                className="w-full p-2 border rounded-md" required />

                <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                placeholder="Description" 
                className="w-full p-2 border rounded-md"></textarea>

                <input 
                type="text" 
                name="location" 
                value={formData.location} 
                onChange={handleChange} 
                placeholder="Location" 
                className="w-full p-2 border rounded-md" />

                <input 
                title="Date"
                type="date" 
                name="date" 
                value={formData.date} 
                onChange={handleChange} 
                className="w-full p-2 border rounded-md" required />

                <input 
                type="number" 
                name="max_participants" 
                value={formData.max_participants} 
                onChange={handleChange} 
                placeholder="Max Participants" 
                className="w-full p-2 border rounded-md" required />

                <button 
                type="submit" 
                disabled={create.isPending} 
                className="w-full bg-blue-600 text-white py-2 rounded-md">
                  {create.isPending ? "Creating..." : "Create Event"}
                </button>
            </form>
        </div>
        </div>
    );

}




export default CreateEvent;