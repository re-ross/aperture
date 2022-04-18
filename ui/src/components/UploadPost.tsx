import { useState, useRef } from "react";
import { PlusIcon } from "@heroicons/react/solid";

export default function UploadPost() {
  const [file, setFile] = useState<any>(null);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const types = ["image/png", "image/jpeg"];

  const inputFile = useRef<HTMLInputElement | null>(null);
  const onButtonClick = () => {
    setFile(inputFile.current?.click());
    console.log(file);
  };

  const fileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let selected = e.target.files![0];
    console.log(selected);
    if (selected && types.includes(selected.type)) {
      setFile(selected);
    } else {
      setFile(null);
      setError("Please select an image file (png or jpeg)");
      console.log(error);
    }
  };
  //
  return (
    <div className="mt-8 text-center">
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
      <h3 className="mt-2 text-sm font-medium text-gray-900">
        Upload a new photo!
      </h3>

      <div className="mt-6">
        <input
          type="file"
          id="file"
          ref={inputFile}
          style={{ display: "none" }}
        />
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#8FBFE0] hover:bg-[#05668D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={onButtonClick}
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          New Post
        </button>
      </div>
    </div>
  );
}
