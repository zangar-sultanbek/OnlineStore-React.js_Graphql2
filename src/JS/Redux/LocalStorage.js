const storageName = 'zangar_storage';

const getLocalStorage = () => JSON.parse(localStorage.getItem(storageName));
const setLocalStorage = (data) => localStorage.setItem(storageName, JSON.stringify(data))

export {getLocalStorage, setLocalStorage}