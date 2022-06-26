export interface StoreType {
  state: {
    color?: string;
    error?: string;
    data?: { id: number };
  };
}

export class Store implements StoreType {
  state: StoreType["state"] = {
    color: "red",
  };

  constructor(initialState?: StoreType["state"]) {
    if (initialState) this.state = initialState;
  }
}
