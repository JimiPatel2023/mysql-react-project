export const baseUrl = "https://td-backend-iota.vercel.app/api";

export const postRequest = async (url, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,

    credentials: "include",
  });
  const data = await response.json();
  return data;
};

export const getRequest = async (url) => {
  const response = await fetch(url, { credentials: "include" });
  const data = await response.json();
  return data;
};

export const deleteRequest = async (url) => {
  const response = await fetch(url, {
    credentials: "include",
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};
