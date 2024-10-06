// import { items } from "./data/products";
// import { items } from "./data/outdoors";
// import { items } from "./data/seasonal";
import { items } from "./data/dummy";

const ItemsApi = {
  // ダミーで固定データを返す
  fetchAll: async () => {
    return new Promise((resolve) => {
      resolve(items);
    });
  },
};

export default ItemsApi;
