export const setItemInLocalStorage = (name, value) => {
  localStorage.setItem(name, JSON.stringify(value));
};

export const getItemFromLocalStorage = (name) => {
  const item = localStorage.getItem(name);
  if (item === null) return null;
  try {
    return JSON.parse(item);
  } catch (error) {
    return null;
  }
};

export const removeItemFromLocalStorage = (name) => {
  localStorage.removeItem(name);
};

export const clearLocalStorage = () => {
  localStorage.clear();
};
