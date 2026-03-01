import axios from "axios";
const BASE_URL = "https://route-posts.routemisr.com";
const USERS_ENDPOINT = "users";
const POSTS_ENDPOINT = "posts";

export async function getUserPosts(userId) {
  const token = localStorage.getItem("token");

  const response = await axios.request({
    url: `${BASE_URL}/${USERS_ENDPOINT}/${userId}/${POSTS_ENDPOINT}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;   // 👈 مهم جدًا
}


//{{baseUrl}}/users/{{userId}}/posts
// export async function getUserPosts(userId) {
//     const token = localStorage.getItem("token");
   
//     if (!token) {
//       console.warn("No token found in localStorage");
//     }
//  return axios.request({
//     url: `${BASE_URL}/${USERS_ENDPOINT}/${userId}/${POSTS_ENDPOINT}`,
//     method:"GET",
//     headers:{
//        Authorization:`Bearer ${token}`,
//     },
   
//   })
 

// }
/**
 * 
 * 
 * 
 * 
 * const { userId } = useContext(AuthContext);

const { data, error, isError, isLoading } = useQuery({
  queryKey: isHome ? ["all-posts"] : ["user-posts", userId],

  queryFn: isHome
    ? getAllPosts
    : () => getUserPosts(userId),

  enabled: isHome || !!userId,   // 👈 ده أهم سطر

  retry: 3,

  select: (data) => data.data.posts,
}); */ 