// https://www.youtube.com/watch?v=3-bZ7gLVSzo&ab_channel=%D0%92%D0%BB%D0%B0%D0%B4%D0%B8%D0%BB%D0%B5%D0%BD%D0%9C%D0%B8%D0%BD%D0%B8%D0%BD

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
