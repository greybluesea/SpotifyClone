"use client";

import React, { useEffect, useState } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";

import useUploadModal from "@/hooks/useUploadModal";
import uniqid from "uniqid";

const UploadModal = () => {
  const user = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { isOpen, closeModal } = useUploadModal();
  const [isLoading, setIsLoading] = useState(false);

  /*  useEffect(() => {
    if (session) {
      router.refresh();
      closeModal();
    }
  }, [session]);
 */

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });

  const handleClose = () => {
    reset();
    closeModal();
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imageFile || !songFile || !user) {
        toast.error("Missing fields");
        return;
      }

      const uniqueID = uniqid();

      // Upload song
      const { data: songInStorage, error: songInStorageError } =
        await supabaseClient.storage
          .from("songs")
          .upload(`song-${values.title}-${uniqueID}`, songFile, {
            cacheControl: "3600",
            upsert: false,
          });

      if (songInStorageError) {
        setIsLoading(false);
        return toast.error("Failed uploading song");
      }

      // console.log(songInStorage);

      // Upload image
      const { data: imageInStorage, error: imageInStorageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`image-${values.title}-${uniqueID}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });

      if (imageInStorageError) {
        setIsLoading(false);
        return toast.error("Failed uploading image");
      }

      //  console.log(imageInStorage);

      // Create record
      const { data: songInDatabase, error: songInDatabaseError } =
        await supabaseClient.from("songs").insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: imageInStorage.path,
          song_path: songInStorage.path,
        });

      if (songInDatabaseError) {
        return toast.error(songInDatabaseError.message);
      } else {
        //   console.log(songInDatabase);

        setTimeout(() => {
          router.refresh();
        }, 1500);
        toast.success("Song uploaded!");
        reset();
        closeModal();
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal
      title="Add a song"
      description="Upload an mp3 file"
      isOpen={isOpen}
      onClose={handleClose}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="title"
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder="Song title"
          autoFocus
        />
        <Input
          id="author"
          disabled={isLoading}
          {...register("author", { required: true })}
          placeholder="Song author"
        />
        <div>
          <div className="pb-1">Select a song file</div>
          <Input
            // placeholder="test"
            disabled={isLoading}
            type="file"
            accept=".mp3"
            id="song"
            {...register("song", { required: true })}
          />
        </div>
        <div>
          <div className="pb-1">Select an image</div>
          <Input
            //  placeholder="test"
            disabled={isLoading}
            type="file"
            accept="image/*"
            id="image"
            {...register("image", { required: true })}
          />
        </div>
        <Button disabled={isLoading || !isValid} type="submit">
          Add song
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
