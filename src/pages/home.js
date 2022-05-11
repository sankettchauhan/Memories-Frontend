import { useEffect, useState } from "react";
import {
  getAllPublicMemories,
  retrieveUserMemories,
} from "../axios/requests.axios";
import { getToken } from "../util/localStorage.util";

export default function Home() {
  // state - my / all (public) MEMORIES
  // state - memories
  const [memories, setMemories] = useState([]);
  const [state, setState] = useState({ personal: true, all: false });

  const showAllMemories = () => {
    setState({ personal: false, all: true });
  };
  const showPersonalMemories = () => {
    setState({ personal: true, all: false });
  };

  console.log("memory state: ", state);
  console.log("memories: ", memories);

  useEffect(() => {
    async function load() {
      try {
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
      }
    }
    load();
  }, [state]);

  return (
    <div>
      <div>
        <button
          onClick={showPersonalMemories}
          className={`${state.personal && "font-bold"}`}
        >
          Personal
        </button>
        <button
          onClick={showAllMemories}
          className={`${state.all && "font-bold"}`}
        >
          All
        </button>
      </div>
      {memories.map((memory, index) => (
        <>
          <h1>{memory.title}</h1>
        </>
      ))}
    </div>
  );
}
