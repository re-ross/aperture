import axios from "axios";
import { useState, useLayoutEffect } from "react";
import { useCookies } from "react-cookie";
import ImageCard from "../components/ImageCard";
axios.defaults.withCredentials = true;

export const Home = () => {
  const [cookies] = useCookies(["access_token"]);
  const [posts, setPosts] = useState([] as any[]);

  useLayoutEffect(() => {
    const getPosts = async () => {
      await axios
        .get("http://localhost:3333/posts/feed", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.access_token}`,
          },
        })
        .then((res) => setPosts(res.data))
        .catch((err) => console.log(err));
    };
    getPosts();
  }, [posts]);

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
