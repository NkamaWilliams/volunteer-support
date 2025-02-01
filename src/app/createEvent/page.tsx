"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


 const  CreateEvent = () => {
    const [formData, setFormData] = useState({
      title: "",
      description: "",
      location: "",
      date: "",
      max_participants: "",
      status: "OPEN",
    });
  
    const [loading, setLoading] = useState(false);
    const router = useRouter();
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
  
      if (!formData.title || !formData.date || !formData.max_participants) {
        alert("Please fill in all required fields.");
        setLoading(false);
        return;
      }
  
      try {
        const eventResponse = await fetch("/api/events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
  
        if (eventResponse.ok) {
          alert("Event created!");
          router.push("/events");
        } else {
          alert("Error creating event.");
        }
      } catch (error) {
        console.error(error);
        alert("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-800 to-blue-400">
        <div className="max-w-sm mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Create an Event</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="w-full p-2 border rounded-md" required />
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded-md"></textarea>
                <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" className="w-full p-2 border rounded-md" />
                <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full p-2 border rounded-md" required />
                <input type="number" name="max_participants" value={formData.max_participants} onChange={handleChange} placeholder="Max Participants" className="w-full p-2 border rounded-md" required />
                <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2 border rounded-md">
                    <option value="OPEN">Open</option>
                    <option value="CLOSED">Closed</option>
                </select>
                <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded-md">{loading ? "Creating..." : "Create Event"}</button>
            </form>
        </div>
        </div>
    );

}




export default CreateEvent;