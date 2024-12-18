const store = (key: string, value?: unknown) => {
  const json = JSON.stringify(value);
  localStorage.setItem(key, json);
};
const get = <T = unknown>(key: string): T | null => {
  const json = localStorage.getItem(key);
  return json && JSON.parse(json);
};
const remove = (key: string) => {
  localStorage.removeItem(key);
}
const localStore = {
  store,
  get,
  remove,
};
export default localStore;
