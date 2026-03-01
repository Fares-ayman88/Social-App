import { Image, Input, Spinner } from "@heroui/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineSend } from "react-icons/ai";
import { CiImageOn } from "react-icons/ci";
import AppButton from "./../Layout/shared/AppButton/AppButton";
import { addNewComment } from "../../services/comments.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

export default function CommentForm({ postId }) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      content: "",
    },
  });

  const queryClient = useQueryClient();
  const inputFileRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const { mutate, isPending } = useMutation({
    mutationFn: createComment,
    onSuccess: async function () {
      toast.success("Comment added successfully!", {
        duration: 3000,
        style: {
          background: "#2563eb",
          color: "#fff",
          fontSize: ".875rem",
          borderRadius: ".5rem",
          padding: "1rem",
        },
      });

      reset();
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
      setSelectedImage(null);
      setImagePreview(null);
      if (inputFileRef.current) {
        inputFileRef.current.value = "";
      }

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["comments", postId] }),
        queryClient.invalidateQueries({ queryKey: ["single-post", postId] }),
        queryClient.invalidateQueries({ queryKey: ["all-posts"] }),
        queryClient.invalidateQueries({ queryKey: ["user-posts"] }),
      ]);
    },
    onError: function (error) {
      const message =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        error?.message ||
        "Failed to add comment";

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

  async function createComment(data) {
    const trimmedContent = data.content?.trim();

    if (!trimmedContent && !selectedImage) {
      throw new Error("Comment must contain text or image");
    }

    const payload = new FormData();
    if (trimmedContent) {
      payload.append("content", trimmedContent);
    }
    if (selectedImage) {
      payload.append("image", selectedImage);
    }

    return await addNewComment(postId, payload);
  }

  function handleClickImageIcon() {
    inputFileRef.current?.click();
  }

  function handleChangeImage(event) {
    const file = event.target.files?.[0];

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    if (!file) {
      setSelectedImage(null);
      setImagePreview(null);
      return;
    }

    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
  }

  function removeImage() {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setSelectedImage(null);
    setImagePreview(null);
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
  }

  return (
    <form onSubmit={handleSubmit(mutate)} className="p-3 sm:p-4 items-center">
      <div className="w-full">
        <Input
          className="w-full"
          type="text"
          placeholder="Write a comment..."
          variant="bordered"
          classNames={{
            inputWrapper:
              "bg-[#f8fbff] border border-[#d3e2fa] shadow-none rounded-xl data-[hover=true]:border-[#b4cbf2] pr-2",
          }}
          endContent={
            <div className="flex items-center gap-1">
              <AppButton
                type="button"
                variant="ghost"
                className="!px-2 !min-w-0 !h-8"
                onPress={handleClickImageIcon}
              >
                <CiImageOn size={19} />
              </AppButton>
              {isPending ? (
                <Spinner size="sm" />
              ) : (
                <AppButton
                  type="submit"
                  aria-label="send"
                  variant="ghost"
                  className="!px-2 !min-w-0 !h-8 text-[#2563eb]"
                >
                  <AiOutlineSend className="text-lg" />
                </AppButton>
              )}
            </div>
          }
          {...register("content", {
            maxLength: { value: 255, message: "max char 255" },
          })}
        />

        <input
          type="file"
          accept="image/*"
          hidden
          ref={inputFileRef}
          onChange={handleChangeImage}
        />
      </div>
      {errors.content && <p className="text-red-600 text-sm mt-1">{errors.content.message}</p>}

      {imagePreview && (
        <div className="mt-3">
          <div className="relative w-full max-w-xs">
            <Image
              src={imagePreview}
              alt="Comment preview"
              className="rounded-xl object-cover border border-[#d2e1fb]"
            />
            <AppButton
              type="button"
              variant="danger"
              onPress={removeImage}
              className="absolute top-2 right-2 z-50 !px-2"
              size="sm"
            >
              X
            </AppButton>
          </div>
        </div>
      )}
    </form>
  );
}
