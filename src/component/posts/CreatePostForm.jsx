import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardBody,
  Textarea,
  Image,
} from "@heroui/react";
import AppButton from "./../Layout/shared/AppButton/AppButton";
import { CiImageOn } from "react-icons/ci";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createPost } from "../../services/posts.service";
const MAX_CHAR = 255;

const postSchema = z
  .object({
    body: z.string().max(MAX_CHAR, `Maximum ${MAX_CHAR} characters allowed`),
  });

export default function CreatePostForm({ queryKey }) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      body: "",
    },
    mode: "onChange",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const watchedContent = watch("body");
  const hasBody = !!watchedContent?.trim();
  const hasImage = !!selectedImage;
  const canSubmit = hasBody || hasImage;

  const inputFileRef = useRef();

  const onSubmit = async (data) => {
    const formData = new FormData();
    const trimmedBody = data.body?.trim();

    if (!trimmedBody && !selectedImage) {
      toast.error("Post must contain text or an image");
      return;
    }

    if (trimmedBody) {
      formData.append("body", trimmedBody);
    }

    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    return await createPost(formData);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: onSubmit,
    onSuccess: function () {
      toast.success("Post added successfully!", {
        duration: 3000,
        style: {
          background: "#10b981",
          color: "#fff",
          fontSize: ".875rem",
          borderRadius: ".5rem",
          padding: "1rem",
        },
      });

      canselPostSubmit();
      queryClient.invalidateQueries({ queryKey: queryKey });
      // queryClient.invalidateQueries({queryKey:["single-post",postId]});
      // queryClient.invalidateQueries({queryKey:["comments",postId]});
    },
    onError: function () {
      toast.error("Failed to add post", {
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

  function handleClickIcon() {
    // console.log("clicked")
    inputFileRef.current.click();

    //  document.querySelector('input').click()
  }
  function handleChangeImage(event) {
    const selectedFile = event.target.files?.[0];

    if (imagePreview) URL.revokeObjectURL(imagePreview);

    if (!selectedFile) {
      setImagePreview(null);
      setSelectedImage(null);
      return;
    }

    const previewUrl = URL.createObjectURL(selectedFile);
    setImagePreview(previewUrl);
    setSelectedImage(selectedFile);
  }

  const removeImage = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
    setSelectedImage(null);
    if (inputFileRef.current) inputFileRef.current.value = "";
  };

  function canselPostSubmit() {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    reset();
    setImagePreview(null);
    setSelectedImage(null);
    if (inputFileRef.current) inputFileRef.current.value = "";
  }
  return (
    <Card className="surface-card w-full max-w-3xl mx-auto mt-5">
      <CardBody className="p-5 sm:p-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="pill-indicator">Create Post</p>
            <h3 className="mt-2 text-xl font-bold text-[#12372f]">What's new today?</h3>
          </div>
        </div>

        <form onSubmit={handleSubmit(mutate)} className="space-y-4">
          {/* Textarea */}
          <div className="relative">
            <Textarea
              placeholder="What's on your mind?"
              maxLength={MAX_CHAR}
              classNames={{
                inputWrapper:
                  "bg-[#fbfefd] border border-[#d6e8e1] shadow-none rounded-2xl px-2 data-[hover=true]:border-[#b8d9ce]",
                input: "text-[#14352f] text-[15px]",
              }}
              {...register("body")}
              isInvalid={!!errors.body}
              errorMessage={errors.body?.message}
            />

            <AppButton
              type="button"
              variant="ghost"
              className="absolute top-2 end-2 border-none !px-2"
              size="sm"
              onClick={handleClickIcon}
            >
              <CiImageOn size="18" />
            </AppButton>

            <div className="text-right text-sm text-[#60776e] mt-1">
              {watchedContent?.length || 0}/{MAX_CHAR}
            </div>
          </div>

          {/* Upload Icon */}
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept="image/*"
              hidden
              ref={inputFileRef}
              onChange={handleChangeImage}
            />
          </div>

          {/* Image Preview with Close Button */}
          {imagePreview && (
            <div className="flex justify-center mt-3">
              <div className="relative w-[75%]">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  className="rounded-xl object-cover border border-[#d6e8e1]"
                />

                <AppButton
                  type="button"
                  variant="danger"
                  onClick={removeImage}
                  className="absolute top-2 right-2 z-50 !px-2"
                  size="sm"
                >
                  X
                </AppButton>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 mt-4">
            <AppButton variant="secondary" onClick={canselPostSubmit} className="px-5">
              Cancel
            </AppButton>

            <AppButton
              type="submit"
              variant="primary"
              isLoading={isPending}
              color="primary"
              isDisabled={isPending || !canSubmit}
              className="px-6"
            >
              Post
            </AppButton>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}

