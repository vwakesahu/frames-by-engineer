export const fetchUser = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const userInfo =
      localStorage.getItem("user") !== "undefined"
        ? JSON.parse(localStorage.getItem("user"))
        : localStorage.clear();

    return userInfo;
  } else return null;
};
