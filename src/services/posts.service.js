import axios from "axios";
const BASE_URL = "https://route-posts.routemisr.com";
const POSTS_ENDPOINT = "/posts";

export async function getAllPosts() {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found in localStorage");
    }
 const response = await axios.request({
    url: `${BASE_URL}${POSTS_ENDPOINT}`,
    method:"GET",
    headers:{
       Authorization:`Bearer ${token}`,
    },
   
  })
//   console.log("getAllPosts response:", response.data);
  return response.data;

}
 
export async function getSinglePost(id) {
 const token = localStorage.getItem("token")
 const response = await axios.request({
    url: `${BASE_URL}${POSTS_ENDPOINT}/${id}`,
    method:"GET",
    headers:{
       Authorization: `Bearer ${token}`,
    },
   
  })
//   console.log("getSinglePost response:", response.data);
  return response.data;
}

export async function createPost(data) {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found in localStorage");
    }
 const response = await axios.request({
    url: `${BASE_URL}${POSTS_ENDPOINT}`,
    method:"POST",
    headers:{
       Authorization:`Bearer ${token}`,
    },
   data:data,
  })
//   console.log("getAllPosts response:", response.data);
  return response.data;

}


export async function deletePost(id) {
 const token = localStorage.getItem("token")
 const response = await axios.request({
    url: `${BASE_URL}${POSTS_ENDPOINT}/${id}`,
    method:"DELETE",
    headers:{
       Authorization: `Bearer ${token}`,
    },
   
  })
//   console.log("getSinglePost response:", response.data);
  return response.data;
}

export async function updatePost(id, data) {
 const token = localStorage.getItem("token");
 const response = await axios.request({
    url: `${BASE_URL}${POSTS_ENDPOINT}/${id}`,
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  });

  return response.data;
}
