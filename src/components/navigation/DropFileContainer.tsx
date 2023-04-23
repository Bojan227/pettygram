import { DragEvent, useEffect, useState } from "react";
import FileInput from "../FileInput";
import { DropFileContainerProps } from "./types";

export default function DropFileContainer({
  handleImageUpload,
  setFiles,
  message,
  setMessage,
}: DropFileContainerProps) {
  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const onDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const typeOfFile = e.dataTransfer.files[0].type.split("/")[0];

    if (typeOfFile === "video") {
      setMessage("Videos are not allowed");
    } else {
      setFiles([...e.dataTransfer.files]);
    }
  };

  return (
    <div
      className="drop-div"
      onDragOver={(e) => onDragOver(e)}
      onDragEnter={(e) => onDragEnter(e)}
      onDrop={(e) => handleDrop(e)}
      onClick={(e) => e.stopPropagation()}
    >
      <h1 className="p-4">Create new post</h1>
      <h1>Drag Photos here</h1>
      <FileInput {...{ handleImageUpload, title: "Choose File" }} />
      {message && <p>{message}</p>}
    </div>
  );
}
