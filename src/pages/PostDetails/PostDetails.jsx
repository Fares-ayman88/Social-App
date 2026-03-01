import React from 'react'
import { getSinglePost } from '../../services/posts.service'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import LooderScreen from '../../component/Layout/shared/LooderScreen/LooderScreen'
import ErrorMessage from '../../component/Layout/shared/ErrorMessage/ErrorMessage'
import PostCard from '../../component/posts/PostCard'
import { Helmet } from 'react-helmet'

export default function PostDetails() {
const {postId}= useParams()

// console.log(postId)
const {data,isError,isLoading,error}=useQuery({
    queryKey:["single-post",postId],
    queryFn:()=>getSinglePost(postId),
  select:(data)=>data.data.post
})
// console.log(data,isError,isLoading,error)
    
  if(isError){
    return(
      <ErrorMessage error={error.response ? error.response.data.error : error.message} />
    )
  }
    if (isLoading) {
      return <LooderScreen />;
    }
     
  
    return (
      <>
      <Helmet>
        <title>Post Details</title>
      </Helmet>
      <section className="app-section">
        <div className="page-hero">
          <span className="headline-badge">Post</span>
          <h1 className="page-title mt-2">Post Details</h1>
          <p className="page-subtitle">See the full post and all comments in one place.</p>
        </div>
      </section>
      <section className="py-4 rounded space-y-5">
        {data &&  <PostCard post={data} isDetails={true} />}
      </section>
      </>
    );
}
