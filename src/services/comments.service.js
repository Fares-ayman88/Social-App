import axios from "axios";
const BASE_URL = "https://route-posts.routemisr.com";

function getAuthHeader() {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
}

export async function getCommentsByPost(postId, page = 1, limit = 10) {
  
  return axios.request({
    url: `${BASE_URL}/posts/${postId}/comments?page=${page}&limit=${limit}`,
    method: "GET",
    headers: getAuthHeader(),
  });
}

export async function addNewComment(postId, data) {
  const url = `${BASE_URL}/posts/${postId}/comments`;
  return axios.request({
    url,
    method: "POST",
    headers: getAuthHeader(),
    data,
  });
}

export async function updateComment(postId, commentId, data) {
  const url = `${BASE_URL}/posts/${postId}/comments/${commentId}`;
  return axios.request({
    url,
    method: "PUT",
    headers: getAuthHeader(),
    data,
  });
}

export async function deleteComment(postId, commentId) {
  const url = `${BASE_URL}/posts/${postId}/comments/${commentId}`;
  return axios.request({
    url,
    method: "DELETE",
    headers: getAuthHeader(),
  });
}

// Backwards-compatible export
export const AddNewCmment = addNewComment;
