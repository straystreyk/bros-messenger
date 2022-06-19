import * as React from "react";
import { popa } from "./test.module.css";
import { Link } from "react-router-dom";
import { StoreType } from "../store";

interface HelloProps {
  store: StoreType;
}
export const Hello: React.FC<HelloProps> = ({ store }) => {
  const socket = React.useRef<null | WebSocket>(null);

  React.useEffect(() => {
    socket.current = new WebSocket("ws://localhost:8080");

    socket.current.onmessage = (message) => {
      console.log(message);
    };
  });

  return (
    <>
      <h1>Hello config</h1>
      <div className={popa}>
        <p>color: {store.state.color}</p>
        <p>User id: {store.state.data.userId}</p>
        <Link to="/about">Go to about page</Link>
      </div>
    </>
  );
};
