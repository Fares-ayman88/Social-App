import React from 'react'
import { CardBody, Image } from '@heroui/react';
import AppCard from '../Layout/shared/post-comment-card/AppCard';





export default function CommentsCard({ comment, postId }) {
    // const userName = comment.commentCreator.name;
    // const userPhoto = comment.commentCreator.photo;
    // const commentCreatedAt = new Date(comment.createdAt).toLocaleString(); // Convert the createdAt timestamp to a human-readable format.
    const commentBody = comment.content;
    const commentId = comment._id || comment.id;
    const commentImage = comment.image;
  return (
    <>
     <AppCard
      user={{...comment.commentCreator , createdAt : new Date(comment.createdAt).toLocaleString()}}
      isPost={false}
      parentPostId={postId}
      commentId={commentId}
      commentContent={commentBody}
      commentImage={commentImage}
      />
      <CardBody className="pt-0 pb-3 px-2">
        <div className="rounded-xl border border-[#d2e0fb] bg-[rgba(255,255,255,0.68)] px-4 py-3">
          <p className="text-[15px] leading-7 text-[#1a2d52]">{commentBody}</p>
          {commentImage && (
            <Image
              src={commentImage}
              alt="Comment image"
              className="rounded-xl object-cover mt-3 border border-[#d2e1fb]"
            />
          )}
        </div>
      </CardBody>
    </>
  )
}
