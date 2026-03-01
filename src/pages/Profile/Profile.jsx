import React, { useContext } from 'react'
import CreatePostForm from './../../component/posts/CreatePostForm';
import PostListing from '../../component/posts/postListing';
import { useParams } from 'react-router-dom';
import { AuthContext } from './../../context/AuthContext';
import { Helmet } from 'react-helmet';

export default function Profile() {


  const { userId: LoggedUserId} = useParams();
 const {userId} = useContext(AuthContext)
 const canCreatePost = String(LoggedUserId) === String(userId);
  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>

      <section className="app-section">
        <div className="page-hero">
          <span className="headline-badge">Profile</span>
          <h1 className="page-title mt-2">{canCreatePost ? "My Profile" : "User Profile"}</h1>
          <p className="page-subtitle">
            Browse posts, updates, and interactions from this profile.
          </p>
        </div>
      </section>

      {canCreatePost && <CreatePostForm queryKey={["user-posts", userId]} />}
      <PostListing isHome={false} />
    </>
  );
}
