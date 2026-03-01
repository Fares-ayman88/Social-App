import {
  Card,
  CardBody,
  CardFooter,
  Divider,

  Image,
} from "@heroui/react";
import {  FaRegCommentDots, FaRegThumbsUp, FaShare } from "react-icons/fa";
import CommentsCard from "../Comments/CommentsCard";
import AppCard from "../Layout/shared/post-comment-card/AppCard";
import { Link } from "react-router-dom";
import CommentForm from "../Comments/CommentForm";
import { getCommentsByPost } from "../../services/comments.service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";


export default function PostCard({ post ,isDetails}) {
 const [showCommentForm, setShowCommentForm] = useState(false);

 const user = post.user;
 const postHasImage = !!post.image; // This will be true if post.image exists and is not null or undefined.
 const postCreatedAt = new Date(post.createdAt).toLocaleString(); // Convert the createdAt timestamp to a human-readable format.

 const postId = post._id || post.id;
 const { data: commentsData } = useQuery({
   queryKey: ["comments", postId],
   queryFn: () => getCommentsByPost(postId, 1, 10),
   select: (res) => res?.data?.data?.comments ?? res?.data?.comments ?? [],
 });
 
 const comments = commentsData ?? [];
 const firstComment = comments[0] || post.topComment;

  return (
    <Card className="surface-card max-w-3xl mx-auto p-4 sm:p-5 rounded-2xl space-y-4">
      <AppCard
      user={{...user , createdAt:postCreatedAt}}
      isPost={true}
      itemId={postId}
      postBody={post.body}
      postImage={post.image}
      />
      <Divider className="soft-divider" />
      <CardBody className="py-2">
        <p className="mb-4 text-[15px] leading-7 text-[#14332d] whitespace-pre-wrap">{post.body}</p>

    { postHasImage && <Image
          alt={user.name}
          height={400}
          radius="sm"
          src={post.image}
          width={"100%"}
          className="object-cover rounded-xl border border-[#d8e8e2]"
        />}
      </CardBody>
      <Divider className="soft-divider" />
      <CardFooter className="flex justify-between gap-2">
        <button className="chip-button btn-quiet px-4 py-2 text-sm font-semibold text-[#255149] flex items-center gap-2">
          <FaRegThumbsUp />
          Like
        </button>
        <button
          onClick={() => setShowCommentForm((prev) => !prev)}
          className={`chip-button px-4 py-2 text-sm font-semibold flex items-center gap-2 ${
            showCommentForm
              ? "bg-[linear-gradient(135deg,#0f766e_0%,#14b8a6_100%)] text-white border-0"
              : "btn-quiet text-[#255149]"
          }`}
        >
          <FaRegCommentDots />
          Comment
        </button>
        <button className="chip-button btn-quiet px-4 py-2 text-sm font-semibold text-[#255149] flex items-center gap-2">
          <FaShare />
          Share
        </button>
      </CardFooter>
      {showCommentForm && <CommentForm postId={postId} />}
      {!isDetails && firstComment && <CommentsCard comment={firstComment} postId={postId} />}
      {isDetails && comments.length > 0 &&
        comments.map((comment) => (
          <CommentsCard key={comment._id || comment.id} comment={comment} postId={postId} />
        ))}
        {!isDetails && comments?.length > 1 && (
          <Link to={`/post-details/${postId}`} className="inline-link px-2">
            View all comments
          </Link>
        )}
    </Card>
  );
}
