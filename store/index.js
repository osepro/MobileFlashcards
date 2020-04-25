import { createStore } from "redux";
import cardentries from "../reducers";

const store = createStore(cardentries);

export default store;