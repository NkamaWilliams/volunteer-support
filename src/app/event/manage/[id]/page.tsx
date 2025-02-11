import EventManagement from "~/app/_components/manageEvent";

const Manage = async({params}: {params: Promise<{id: string}>}) => {
  const id = (await params).id
  return <EventManagement id={id}/>
}

export default Manage;
