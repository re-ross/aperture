import { useState } from "react";
import { CameraIcon } from "@heroicons/react/solid";
import axios from "axios";
import { useCookies } from "react-cookie";
import swal from "sweetalert";
import { InputEvent, ButtonEvent } from "../types";

export const UploadPost = () => {
  const [cookies] = useCookies(["access_token"]);
  const [file, setFile] = useState<File | string>("");
  const [caption, setCaption] = useState("");
  const formData = new FormData();

  const fileChange = (e: InputEvent) => {
    if (e.target.files != null) {
      setFile(e.target.files[0]);
    } else {
      console.error("No file");
    }
  };

  const inputChange = (e: InputEvent) => {
    setCaption(e.target.value);
  };

  const postSubmit = (e: ButtonEvent) => {
    e.preventDefault();
    formData.append("file", file);
    formData.append("caption", caption);
    axios
      .post("http://localhost:3333/posts/create", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.access_token}`,
        },
      })
      .then((res) => console.log(res.status))
      .catch((err) => console.log(err))
      .then(() => swal("Post uploaded!", "📸", "success"));
  };

  return (
    <div className="flex flex-col mt-8 mx-auto text-center w-80  gap-2 ">
      <form>
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">New Post</h3>

        <div className="mt-6 flex flex-col gap-2">
          <button className="bg-[#8FBFE0] hover:bg-[#05668D] text-white font-bold py-2 px-4 w-full inline-flex items-center rounded-md ">
            <svg
              fill="#ffffff"
              height="18"
              viewBox="0 0 24 24"
              width="18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
            </svg>
            <span className="ml-2">Upload a new image!</span>
          </button>
          <input
            className="cursor-pointer absolute block opacity-0 pin-r pin-t"
            type="file"
            id="imgUrl"
            name="imgUrl"
            accept=".png, .jpg, .jpeg"
            onChange={fileChange}
          />

          {/* <input
            type="file"
            id="imgUrl"
            name="imgUrl"
            accept=".png, .jpg, .jpeg"
            onChange={fileChange}
          /> */}
          <input
            type="text"
            value={caption}
            placeholder="New caption..."
            className="px-3 py-3 placeholder-slate-300 text-slate-600 relative  bg-white text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full rounded-md "
            onChange={inputChange}
          />
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#8FBFE0] hover:bg-[#05668D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={postSubmit}
          >
            <CameraIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
