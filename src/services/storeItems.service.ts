import axios from "axios";
import {StoreItem} from "../models/storeItem";
import {CheckAuthentication} from "../utils/CheckAuthentication";
import {API_URL} from "../envrironment";

// This is not redux-based service
export const getItems = async () => {
   CheckAuthentication();
   return await axios.get<StoreItem[]>(API_URL+'items');
}

export const getItem = async (id: string) => {
   CheckAuthentication();
   return await axios.get<StoreItem>(API_URL+'items/' + id);
}

export const disableItem = async (id: string) => {
   CheckAuthentication();
   let item = (await getItem(id)).data;
   item.isAvailable = false;
   return await axios.put<StoreItem[]>(API_URL+'items/' + id, item);
}

export const enableItem = async (id: string) => {
   CheckAuthentication();
   let item = (await getItem(id)).data;
   item.isAvailable = true;
   return await axios.put<StoreItem[]>(API_URL+'items/' + id, item);
}
