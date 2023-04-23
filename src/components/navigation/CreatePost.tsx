import { useState } from "react";
import DropFileContainer from "./DropFileContainer";
import ImagesContainer from "./ImagesContainer";
import CaptionContainer from "./CaptionContainer";
import { CreatePostProps } from "./types";

export const CreatePost = ({
  toggleCreatePost,
  setToggleCreatePost,
}: CreatePostProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState("");

  const handleImageUpload = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files != null) {
      const typeOfFile = evt.target.files[0].type.split("/")[0];

      console.log(typeOfFile);
      if (typeOfFile === "video") {
        setMessage("Videos are not allowed");
      } else {
        setFiles((prevFiles) => [...prevFiles!, ...evt.target.files!]);
      }
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div
      className="drop-container"
      style={{ display: `${!toggleCreatePost ? "none" : ""}` }}
      onClick={(e) => {
        e.stopPropagation();
        setToggleCreatePost(false);
        setFiles([]);
        setMessage("");
      }}
    >
      {files.length === 0 && (
        <DropFileContainer
          {...{ handleImageUpload, setFiles, message, setMessage }}
        />
      )}
      {files.length !== 0 && (
        <div className="share-container" onClick={(e) => e.stopPropagation()}>
          <ImagesContainer
            {...{ files, handleImageUpload, handleRemoveFile }}
          />
          <CaptionContainer {...{ files, setToggleCreatePost }} />
        </div>
      )}
    </div>
  );
};
