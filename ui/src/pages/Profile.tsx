import axios from "axios";
import { useState, useLayoutEffect } from "react";
import { useCookies } from "react-cookie";
import { ImageCard } from "../components";
import { getProfilePosts } from "../hooks";
axios.defaults.withCredentials = true;

export const Profile = () => {
  const [cookies] = useCookies(["access_token"]);
  const [posts, setPosts] = useState([] as any[]);

  useLayoutEffect(() => {
    getProfilePosts(cookies.access_token, setPosts);
  }, []);

  return (
    <>
      <div className="flex-col-reverse justify-center flex gap-6 flex-wrap items-center">
        {posts.map((post) => (
          <ImageCard post={post} />
        ))}
      </div>
    </>
  );
};
