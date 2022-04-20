import axios from "axios";
import { useState, useLayoutEffect } from "react";
import { useCookies } from "react-cookie";
import ImageCard from "../components/ImageCard";
import { getPosts } from "../hooks";

axios.defaults.withCredentials = true;

export const Home = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [posts, setPosts] = useState([] as any[]);

  useLayoutEffect(() => {
    getPosts(cookies.access_token, setPosts);
  }, [cookies.access_token, posts]);

  return (
    <>
      <div className="flex-col-reverse justify-center flex gap-6 flex-wrap items-center">
        {posts.map((post) => (
          <ImageCard post={post} key={post.id} />
        ))}
      </div>
    </>
  );
};
