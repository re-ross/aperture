import axios from "axios";
import { useCookies } from "react-cookie";
import swal from "sweetalert";
import { fromByteArray } from "base64-js";

interface PropsItem {
  post: {
    id: string;
    bytes: Uint8Array;
    imgUrl: string;
    caption: string;
    author: string;
  };
}

const ImageCard = ({ post }: PropsItem) => {
  //@ts-ignore
  const base64String = fromByteArray(post.bytes.data);

  const [cookies] = useCookies(["access_token"]);
  const deletePost = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { id } = e.currentTarget;
    axios
      .delete(`http://localhost:3333/posts/post/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.access_token}`,
        },
      })
      .then(() => swal("Deleted", "Post successfully deleted", "success"))
      .catch((err) => console.log(err));
  };
  return (
    <div className="p-4 max-w-3xl">
      <div className="bg-white border">
        <div className="flex items-center py-3 ">
          <div className="ml-3 ">
            <span className="text-sm font-semibold antialiased block leading-tight">
              {post.author}
            </span>
          </div>
        </div>
        <img
          src={`data:image/jpeg;base64,${base64String}`}
          alt={post.imgUrl}
          className={"w-[700px] h-[700px]"}
        />
        <div className="flex items-center mx-4 mt-3 mb-2 justify-between">
          <div className="font-normal text-sm">
            {post.author}: {post.caption}
          </div>
          <div>
            <button
              className="inline-flex items-center justify-center w-10 h-10 mr-2 text-gray-700 transition-colors duration-150 bg-white rounded-full focus:shadow-outline hover:bg-gray-200"
              onClick={() => alert("hit!")}
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
              </svg>
            </button>
            <button
              id={post.id}
              className="inline-flex items-center justify-center w-10 h-10 mr-2 text-gray-700 transition-colors duration-150 bg-white rounded-full focus:shadow-outline hover:bg-gray-200"
              onClick={deletePost}
            >
              <svg
                id={post.id}
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  id={post.id}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
