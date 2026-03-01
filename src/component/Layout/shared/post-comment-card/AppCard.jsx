import React, { useContext, useRef, useState } from "react";
import {
  Button,
  CardHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@heroui/react";
import defaultPhoto from "../../../../assets/avatar-gender-neutral-silhouette-vector-600nw-2470054311.webp";
import { Link } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost, updatePost } from "../../../../services/posts.service";
import { deleteComment, updateComment } from "../../../../services/comments.service";
import toast from "react-hot-toast";
import { AuthContext } from "../../../../context/AuthContext";

function checkProfileImage(image) {
  if (typeof image !== "string" || image.includes("undefined")) return defaultPhoto;
  return image;
}

function getApiErrorMessage(error, fallback) {
  return error?.response?.data?.error || error?.response?.data?.message || error?.message || fallback;
}

export default function AppCard({
  user,
  isPost,
  itemId,
  postBody = "",
  postImage = "",
  parentPostId,
  commentId,
  commentContent = "",
  commentImage = "",
}) {
  const queryClient = useQueryClient();
  const { userId: loggedInUserId } = useContext(AuthContext);

  const isCommentItem = Boolean(commentId && parentPostId);
  const entityLabel = isPost ? "post" : "comment";
  const entityLabelCapitalized = entityLabel[0].toUpperCase() + entityLabel.slice(1);

  const baseTextValue = isPost ? postBody : commentContent;
  const baseImageValue = isPost ? postImage : commentImage;
  const textPayloadKey = isPost ? "body" : "content";

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [initialText, setInitialText] = useState((baseTextValue || "").trim());
  const [editedText, setEditedText] = useState(baseTextValue || "");
  const [editedImageFile, setEditedImageFile] = useState(null);
  const [editedImagePreview, setEditedImagePreview] = useState(baseImageValue || "");

  const imageInputRef = useRef(null);

  const authorName = user?.name || "Unknown user";
  const authorId = user?._id;
  const authorPhoto = checkProfileImage(user?.photo);
  const createdAt = user?.createdAt || "";

  const canManageItem =
    (isPost || isCommentItem) &&
    Boolean(loggedInUserId) &&
    Boolean(authorId) &&
    String(loggedInUserId) === String(authorId);

  function isBlobUrl(value) {
    return typeof value === "string" && value.startsWith("blob:");
  }

  function resetEditState() {
    if (isBlobUrl(editedImagePreview)) {
      URL.revokeObjectURL(editedImagePreview);
    }

    const cleanInitialText = (baseTextValue || "").trim();
    setInitialText(cleanInitialText);
    setEditedText(baseTextValue || "");
    setEditedImageFile(null);
    setEditedImagePreview(baseImageValue || "");

    if (imageInputRef.current) imageInputRef.current.value = "";
  }

  function openEditModal() {
    resetEditState();
    setIsEditOpen(true);
  }

  function closeEditModal() {
    resetEditState();
    setIsEditOpen(false);
  }

  async function invalidateQueriesAfterMutation() {
    const invalidations = [
      queryClient.invalidateQueries({ queryKey: ["all-posts"] }),
      queryClient.invalidateQueries({ queryKey: ["user-posts"] }),
    ];

    if (isPost && itemId) {
      invalidations.push(queryClient.invalidateQueries({ queryKey: ["single-post", itemId] }));
    }

    if (isCommentItem) {
      invalidations.push(queryClient.invalidateQueries({ queryKey: ["comments", parentPostId] }));
      invalidations.push(queryClient.invalidateQueries({ queryKey: ["single-post", parentPostId] }));
    }

    await Promise.all(invalidations);
  }

  const { mutate: deleteMutate, isPending: isDeleting } = useMutation({
    mutationFn: () => {
      if (isPost) return deletePost(itemId);
      return deleteComment(parentPostId, commentId);
    },
    onSuccess: async function (data) {
      toast.success(data?.message || `${entityLabelCapitalized} deleted successfully`);
      await invalidateQueriesAfterMutation();
    },
    onError: function (error) {
      const message = getApiErrorMessage(error, `Failed to delete ${entityLabel}`);
      toast.error(message, {
        duration: 3000,
        style: {
          background: "#ef4444",
          color: "#fff",
          fontSize: ".875rem",
          borderRadius: ".5rem",
          padding: "1rem",
        },
      });
    },
  });

  const { mutate: editMutate, isPending: isEditing } = useMutation({
    mutationFn: (payload) => {
      if (isPost) return updatePost(itemId, payload);
      return updateComment(parentPostId, commentId, payload);
    },
    onSuccess: async function (data) {
      toast.success(data?.message || `${entityLabelCapitalized} updated successfully`);
      closeEditModal();
      await invalidateQueriesAfterMutation();
    },
    onError: function (error) {
      const message = getApiErrorMessage(error, `Failed to update ${entityLabel}`);
      toast.error(message, {
        duration: 3000,
        style: {
          background: "#ef4444",
          color: "#fff",
          fontSize: ".875rem",
          borderRadius: ".5rem",
          padding: "1rem",
        },
      });
    },
  });

  function handleEditSubmit() {
    const trimmedText = editedText.trim();
    const hasTextChanged = trimmedText !== initialText;
    const hasImageChanged = !!editedImageFile;
    const hasAnyChanges = hasTextChanged || hasImageChanged;

    if (!hasAnyChanges) {
      toast.error("No changes made", {
        duration: 3000,
        style: {
          background: "#ef4444",
          color: "#fff",
          fontSize: ".875rem",
          borderRadius: ".5rem",
          padding: "1rem",
        },
      });
      return;
    }

    if (!trimmedText && !editedImageFile) {
      toast.error(`${entityLabelCapitalized} must contain text or image`, {
        duration: 3000,
        style: {
          background: "#ef4444",
          color: "#fff",
          fontSize: ".875rem",
          borderRadius: ".5rem",
          padding: "1rem",
        },
      });
      return;
    }

    const formData = new FormData();
    if (trimmedText) {
      formData.append(textPayloadKey, trimmedText);
    }
    if (editedImageFile) {
      formData.append("image", editedImageFile);
    }

    editMutate(formData);
  }

  function handleEditImageChange(event) {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    if (isBlobUrl(editedImagePreview)) {
      URL.revokeObjectURL(editedImagePreview);
    }

    const previewUrl = URL.createObjectURL(selectedFile);
    setEditedImageFile(selectedFile);
    setEditedImagePreview(previewUrl);
  }

  function clearSelectedEditImage() {
    if (isBlobUrl(editedImagePreview)) {
      URL.revokeObjectURL(editedImagePreview);
    }
    setEditedImageFile(null);
    setEditedImagePreview(baseImageValue || "");
    if (imageInputRef.current) imageInputRef.current.value = "";
  }

  return (
    <>
      <CardHeader className="flex justify-between items-start pb-1">
        <div className="flex gap-3 items-center">
          <Image
            alt="user.name"
            height={isPost ? 80 : 50}
            radius="full"
            src={authorPhoto}
            width={isPost ? 80 : 50}
            className="border border-[#cfe3dc] object-cover"
          />
          <div className="flex flex-col">
            <p className={`${isPost ? "text-lg font-bold" : "text-md"} capitalize text-[#10362f]`}>
              {authorId ? (
                <Link to={`/profile/${authorId}`} className="hover:text-[#0f766e] transition-colors">
                  {authorName}
                </Link>
              ) : (
                authorName
              )}
            </p>
            <p className="text-small text-[#5f786e]">{createdAt}</p>
          </div>
        </div>

        {canManageItem && (
          <Dropdown className="ml-auto" placement="bottom-end">
            <DropdownTrigger>
              <Button variant="light" color="default" className="chip-button btn-quiet !min-w-0 px-2">
                <BsThreeDots size="22" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label={`${entityLabel} actions`}>
              <DropdownItem
                key="edit"
                textValue={`Edit ${entityLabel}`}
                onPress={openEditModal}
                isDisabled={isDeleting || isEditing}
              >
                <div className="flex gap-2 items-center">
                  <MdEdit />
                  {`Edit ${entityLabel}`}
                </div>
              </DropdownItem>
              <DropdownItem
                key="delete"
                textValue={`Delete ${entityLabel}`}
                onPress={deleteMutate}
                className="text-danger"
                color="danger"
                isDisabled={isDeleting || isEditing}
              >
                <div className="flex gap-2 items-center">
                  <FaTrash />
                  {`Delete ${entityLabel}`}
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </CardHeader>

      <Modal
        isOpen={isEditOpen}
        onOpenChange={(open) => {
          if (!open) {
            closeEditModal();
          } else {
            setIsEditOpen(true);
          }
        }}
        placement="center"
      >
        <ModalContent className="surface-card border border-[#d6e7e1]">
          {(onClose) => (
            <>
              <ModalHeader className="text-[#12382f]">{`Edit ${entityLabel}`}</ModalHeader>
              <ModalBody>
                <Textarea
                  minRows={5}
                  maxLength={255}
                  value={editedText}
                  onChange={(event) => setEditedText(event.target.value)}
                  placeholder={`Update your ${entityLabel}`}
                  classNames={{
                    inputWrapper:
                      "bg-[#fbfefd] border border-[#d6e8e1] shadow-none rounded-2xl px-2 data-[hover=true]:border-[#b8d9ce]",
                    input: "text-[#14352f] text-[15px]",
                  }}
                />

                <div className="flex items-center gap-2">
                  <Button
                    variant="flat"
                    color="primary"
                    onPress={() => imageInputRef.current?.click()}
                    className="chip-button"
                  >
                    Change image
                  </Button>
                  {editedImageFile && (
                    <Button
                      variant="light"
                      color="danger"
                      onPress={clearSelectedEditImage}
                      className="chip-button btn-danger-soft"
                    >
                      Remove selected image
                    </Button>
                  )}
                </div>

                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleEditImageChange}
                />

                {editedImagePreview && (
                  <Image
                    src={editedImagePreview}
                    alt={`Edited ${entityLabel} preview`}
                    className="rounded-xl object-cover mt-2 border border-[#d5e6df]"
                  />
                )}
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose} className="chip-button btn-quiet">
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={handleEditSubmit}
                  isLoading={isEditing}
                  isDisabled={isEditing}
                  className="chip-button bg-[linear-gradient(135deg,#0f766e_0%,#14b8a6_100%)] text-white border-0"
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
