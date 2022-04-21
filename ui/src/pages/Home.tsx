import axios from "axios";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { ImageCard } from "../components";
import { getPosts } from "../hooks";
axios.defaults.withCredentials = true;

export const Home = () => {
  const [cookies] = useCookies(["access_token"]);
  const [posts, setPosts] = useState([] as any[]);

  useEffect(() => {
    getPosts(cookies.access_token, setPosts);
  }, []);

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
