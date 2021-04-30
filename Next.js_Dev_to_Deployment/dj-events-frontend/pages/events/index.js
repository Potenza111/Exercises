<<<<<<< HEAD
import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";

import { API_URL } from "@/config/index";

export default function EventsPage({ events }) {
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No Events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();
  // console.log(events);
  return { props: { events }, revalidate: 1 };
}
=======
export default function EventsPage() {
  return (
    <div>
      <h1>My Events</h1>
    </div>
  );
}
>>>>>>> d07bf7e8fe1db1bd98a1700508f18dfd702dd7e5
