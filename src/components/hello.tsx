import * as React from "react";
import { popa } from "./test.module.css";
import { StoreType } from "../store";
import { Button } from "@mui/material";

interface HelloProps {
  store: StoreType;
}

const useSocket = () => {
  const socket = React.useRef<null | WebSocket>(null);

  React.useEffect(() => {
    socket.current = new WebSocket(window._GLOBALS_.SOCKET_CONNECTION_STRING);

    socket.current.onmessage = (message) => {
      console.log(message.data);
    };
  });

  return {
    socket,
  };
};

export const Hello: React.FC<HelloProps> = ({ store, ...props }) => {
  return (
    <>
      <h1>Hello config</h1>
      <Button variant="contained" color="primary">
        ~Hello
      </Button>
      <div className={popa}>
        <p>color: {store.state.color}</p>
        <p>User id: {store.state.data && store.state.data.id}</p>
      </div>
    </>
  );
};
