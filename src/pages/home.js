import { useEffect, useState } from "react";
import {
  getAllPublicMemories,
  retrieveUserMemories,
} from "../axios/requests.axios";
import Card from "../components/Card";
import Hero from "../components/Hero";
import Loading from "../components/Loading";
import { getToken } from "../util/localStorage.util";

const Button = (props) => (
  <button
    {...props}
    className={`basis-1 grow py-4 text-4xl ${
      props.className.active &&
      "bg-[color:var(--secondary-color)] rounded-t-2xl text-[color:var(--yellow-color)]"
    }`}
  >
    {props.children}
  </button>
);

export default function Home() {
  // state - my / all (public) MEMORIES
  // state - memories
  const [memories, setMemories] = useState([]);
  const [state, setState] = useState({ personal: true, all: false });
  const [loading, setLoading] = useState(false);

  const showAllMemories = () => {
    setMemories([]);
    setState({ personal: false, all: true });
  };
  const showPersonalMemories = () => {
    setMemories([]);
    setState({ personal: true, all: false });
  };

  console.log("memory state: ", state);
  console.log("memories: ", memories);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const token = getToken();
        if (state.personal) {
          const resMemories = await retrieveUserMemories(token);
          setMemories(resMemories.data.data);
        } else if (state.all) {
          const resMemories = await getAllPublicMemories(token);
          setMemories(resMemories.data.data);
        }
      } catch (error) {
        console.log("error");
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [state]);

  return (
    <div className="mb-16 md:px-20">
      <Hero />
      <div
        className="flex border-b-2 border-[color:var(--secondary-color)]"
        style={{ fontFamily: "var(--font-dancing-script)" }}
      >
        <Button
          onClick={showPersonalMemories}
          className={{ active: state.personal }}
        >
          Personal
        </Button>
        <Button onClick={showAllMemories} className={{ active: state.all }}>
          All
        </Button>
      </div>
      {loading ? (
        <div className="h-96">
          <Loading />
        </div>
      ) : memories.length === 0 ? (
        <h1
          className="text-xl px-4 mt-16"
          style={{ fontFamily: "var(--font-architect)" }}
        >
          You have not created any memories. Create memories to see them here.
        </h1>
      ) : (
        memories.map((memory, index) => (
          <Card {...memory} state={state} key={`memory-${index + 1}`} />
        ))
      )}
    </div>
  );
}
