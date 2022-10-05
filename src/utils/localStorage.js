export const addUserToLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};
export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};

export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem("user");
  const user = result ? JSON.parse(result) : null;
  return user;
};

export const addTokenToLocalStorage = (token) => {
  localStorage.setItem("authToken", token);
};

export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem("authToken");
};

export const getTokenFromLocalStorage = () => {
  const getToken = localStorage.getItem("authToken");
  return getToken;
};
