import axios from "axios";
import { useState, useLayoutEffect } from "react";
import { useCookies } from "react-cookie";
import { ImageCard } from "../components";
import { getPosts } from "../hooks";
axios.defaults.withCredentials = true;

export const Home = () => {
  const [cookies] = useCookies(["access_token"]);
  const [posts, setPosts] = useState([] as any[]);

  useLayoutEffect(() => {
    getPosts(cookies.access_token, setPosts);
  }, [posts]);

  return (
    <>
      <div className="flex-col-reverse justify-center flex gap-6 items-center">
        {posts.map((post) => (
          <ImageCard post={post} key={post.id} />
        ))}
      </div>
    </>
  );
};
