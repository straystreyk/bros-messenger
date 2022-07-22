export type ThemeType = "light" | "dark";

export type StataObj = {
  error?: string;
  data?: { id: number };
  theme?: ThemeType;
  isAuthenticate: boolean;
};

export interface StoreType {
  state: StataObj;
  changeState: <K extends keyof StataObj, V extends StataObj[K]>(
    key: K,
    value: V
  ) => void;
}

export class Store implements StoreType {
  state: StoreType["state"] = {
    isAuthenticate: false,
    theme: "dark",
  };

  constructor(initialState?: StoreType["state"]) {
    if (initialState) this.state = initialState;
  }

  changeState: StoreType["changeState"] = (key, value) => {
    if (!(key in this.state) || !value)
      throw new Error("You forgot pass the props");

    this.state[key] = value;
  };
}
