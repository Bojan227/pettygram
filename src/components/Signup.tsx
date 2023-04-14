import TextField from "./TextField";
import useSignup from "../hooks/useSignup";
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import PasswordContainer from "./PasswordContainer";
import { TrashIcon } from "@heroicons/react/20/solid";

export default function Signup() {
  const { signup, isLoading, error, message } = useSignup();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState<File | null>(null);

  console.log(image);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await signup({ username, password, firstName, lastName, image });
  };

  const handleImageUpload = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files != null) {
      setImage(evt.target.files[0]);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen 
      bg-gradient-to-b from-[#405DE6] via-[#5851DB] to-[#FD1D1D] "
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col  w-4/5 justify-center items-center text-white gap-2 grow register-form"
      >
        <h1>Pettygram</h1>
        Username
        <TextField
          className={
            "bg-[#e1306c] rounded-lg p-2 w-5/6 sm:w-3/5 md:w-2/5 2xl:w-1/5"
          }
          value={username}
          onChange={(username) => setUsername(username)}
        />
        <PasswordContainer {...{ password, setPassword }} />
        First Name
        <TextField
          className={
            "bg-[#e1306c] rounded-lg p-2 w-5/6 sm:w-3/5 md:w-2/5 2xl:w-1/5"
          }
          value={firstName}
          onChange={(firstname) => setFirstName(firstname)}
        />
        Last Name
        <TextField
          className={
            "bg-[#e1306c] rounded-lg p-2 w-5/6 sm:w-3/5 md:w-2/5 2xl:w-1/5"
          }
          value={lastName}
          onChange={(lastName) => setLastName(lastName)}
        />
        Upload Profile Picture
        <input
          onChange={(e) => handleImageUpload(e)}
          type="file"
          name="img"
          id="actual-btn"
          style={{ display: "none" }}
        />
        <label htmlFor="actual-btn" className="bg-[#405de6]">
          Choose Image
        </label>
        {image ? (
          <div className="current-image">
            <p>Current Image: {image.name}</p>
            <TrashIcon onClick={() => setImage(null)} width={20} height={20} />
          </div>
        ) : null}
        <button
          type="submit"
          disabled={!username || !password || !firstName || !lastName || !image}
          style={{
            color: `${
              !username || !password || !firstName || !lastName || !image
                ? "rgba(255,255,255, 0.3)"
                : "white"
            }`,
          }}
          className="border border-white w-5/6 sm:w-3/5 md:w-2/5 2xl:w-1/5 p-2 my-4 rounded-lg"
        >
          Register
        </button>
      </form>
      {error && <h2 className="error-signup">{error}</h2>}
      {message && <Navigate to="/login" />}
      {isLoading && <LoadingSpinner className="signup-spinner" />}
      <footer className="border-solid border-t-2 border-white  p-5 w-full text-center text-white">
        <h1>
          Already have an account{" "}
          <Link to="login">
            <span>Sign in</span>
          </Link>
        </h1>
      </footer>
    </div>
  );
}
