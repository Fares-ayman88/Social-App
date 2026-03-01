import axios from "axios";

const BASE_URL = "https://route-posts.routemisr.com";
const PROFILE_ENDPOINT = "/users/profile-data";
const CHANGE_PASSWORD_ENDPOINT = "/users/change-password";

export async function getCurrentUser() {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No auth token found");
  }

  const response = await axios.request({
    url: `${BASE_URL}${PROFILE_ENDPOINT}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function changePassword(payload) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No auth token found");
  }

  const response = await axios.request({
    url: `${BASE_URL}${CHANGE_PASSWORD_ENDPOINT}`,
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: payload,
  });

  return response.data;
}
