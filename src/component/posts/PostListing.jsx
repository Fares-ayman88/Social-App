
import PostCard from "./PostCard";
import LooderScreen from "../Layout/shared/LooderScreen/LooderScreen";
import ErrorMessage from "../Layout/shared/ErrorMessage/ErrorMessage";
import { useQuery } from '@tanstack/react-query';
import { getAllPosts } from "../../services/posts.service";
import { getUserPosts } from "../../services/profile.service";
import { useParams } from "react-router-dom";

export default function PostListing({isHome = true}) {
    const { userId } = useParams();


const { data, error, isError, isLoading } = useQuery({
  queryKey: isHome ? ["all-posts"] : ["user-posts", userId],

  queryFn: isHome
    ? getAllPosts
    : () => getUserPosts(userId),

  enabled: isHome || !!userId,  //بيستني اما يجيب ال id بعد كدا يعمل كول لل API
  retry: 3,

  select: (data) => data.data.posts,
}); 



  // const [Posts, setPosts] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState("");
  // async function getAllPosts() {
  //   try {
  //     setIsLoading(true);
  //     const { data } = await axios.request({
  //       url: `${BASE_URL}${POSTS_ENDPOINT}`,
  //       method: "get",
  //       headers: {
  //         token: localStorage.getItem("token"),
  //       },
  //       params: {
  //         sort: "-createdAt",
  //       },
  //     });
  //     console.log(data);
  //     if (data.message == "success") {
  //       setPosts(data.posts);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     setError(error.response ? error.response.data.error : error.message)
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  // useEffect(() => {
  //   getAllPosts();
  // }, []);

  // console.log(Posts);
  // if (error) {
  //   return <ErrorMessage error={error} />
  // }
if(isError){
  return(
    <ErrorMessage error={error.response ? error.response.data.error : error.message} />
  )
}
  if (isLoading) {
    return <LooderScreen />;
  }
   

  return (
    <section className="post-feed py-4 rounded space-y-5">
      {data?.length ? (
        data.map((post) => <PostCard key={post._id} post={post} isDetails={false} />)
      ) : (
        <div className="empty-state">No posts yet. Be the first one to share something.</div>
      )}
    </section>
  );
}
