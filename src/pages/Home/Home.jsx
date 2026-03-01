import { Helmet } from "react-helmet";
import CreatePostForm from "../../component/posts/CreatePostForm";
import PostListing from "../../component/posts/postListing";



export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <section className="app-section">
        <div className="page-hero">
          <span className="headline-badge">Feed</span>
          <h1 className="page-title mt-2">Welcome back</h1>
          <p className="page-subtitle">Share updates and catch what your network is talking about.</p>
        </div>
      </section>

      <CreatePostForm queryKey={["all-posts"]} />
      <PostListing />
    </>
  );
}
