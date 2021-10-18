const storage = {
  get: (key) => {
    if (localStorage.getItem(key)) {
      return JSON.parse(localStorage.getItem(key));
    }

    return null;
  },
  save: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
};

export { storage };
