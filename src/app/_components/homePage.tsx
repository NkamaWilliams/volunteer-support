import { LatestEvents } from "./latestEvents";
const Home = () => {
  return (
    <div className="flex min-h-[85vh] flex-col items-center justify-center bg-gradient-to-b from-blue-800 to-blue-400 text-white">
      <h1 className="mx-4 mb-4 text-center text-3xl md:mx-10 md:text-7xl">
        Welcome to Group 16&apos;s Project Page!
      </h1>
      <section className="w-full">
        <p className="text-center text-2xl">
          {/* Effectively manage and boost your productivity with our platform. */}
          Allow us to find the right volunteers for you!
        </p>
        <LatestEvents />
      </section>
    </div>
  );
};

export default Home;
