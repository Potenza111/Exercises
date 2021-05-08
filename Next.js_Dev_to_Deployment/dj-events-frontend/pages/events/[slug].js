import Image from "next/image";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import style from "@/styles/Event.module.css";
import EventMap from "@/components/EventMap";
export default function EventPage({ evt }) {
  return (
    <Layout>
      <div className={style.event}>
        <span>
          {new Date(evt.date).toLocaleDateString("en-us")} at {evt.time}
        </span>
        <h1>{evt.name}</h1>
        <ToastContainer />
        {evt.image && (
          <div className={style.image}>
            <Image
              src={evt.image.formats.medium.url}
              width={960}
              height={600}
            ></Image>
          </div>
        )}
        <h3>Performers:</h3>
        <p>{evt.performers}</p>
        <h3>Description:</h3>
        <p>{evt.description}</p>
        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>

        {/* <EventMap evt={evt} /> */}

        <Link href="/events">
          <a className={style.back}>{"<"}Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/events`);
  const events = await res.json();

  const paths = events.map((evt) => ({
    params: { slug: evt.slug },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  // console.log(slug);
  const res = await fetch(`${API_URL}/events?slug=${slug}`);
  const events = await res.json();

  return { props: { evt: events[0] }, revalidate: 1 };
}

// export async function getServerSideProps({ query: { slug } }) {
//   // console.log(slug);
//   const res = await fetch(`${API_URL}/api/events/${slug}`);
//   const events = await res.json();

//   return { props: { evt: events[0] } };
// }