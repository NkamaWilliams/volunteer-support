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

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[85vh] bg-gradient-to-b from-blue-800 to-blue-400 text-white">
      <h1 className="text-7xl text-center mx-10 mb-4">
        Welcome to Group 16&apos;s Project Page!
      </h1>
      <section>
        <p className="text-2xl text-center">
          Effectively manage and boost your productivity with our platform.
        </p>
      </section>
      <EventList eventData={eventData}/>
    </div>
  );
};

export default Home;
