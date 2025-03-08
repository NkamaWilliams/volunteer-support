import { LatestEvents } from "./latestEvents";
const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[85vh] bg-gradient-to-b from-blue-800 to-blue-400 text-white">
      <h1 className="text-7xl text-center mx-10 mb-4">
        Welcome to Group 16&apos;s Project Page!
      </h1>
      <section className="w-full">
        <p className="text-2xl text-center">
          {/* Effectively manage and boost your productivity with our platform. */}
          Allow us to find the right volunteers for you!
        </p>
        <LatestEvents />
      </section>
    </div>
  );
};

export default Home;
