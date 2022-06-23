import { StoreType } from "./store";

export declare global {
  var _SSR_STORE_: StoreType["state"] | undefined;
  var _GLOBALS_: {
    APP_PORT: string;
    APP_API_CONNECTION_STRING: string;
    SOCKET_CONNECTION_STRING: string;
  };
}
