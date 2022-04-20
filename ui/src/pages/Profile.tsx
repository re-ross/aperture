import axios from "axios";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import ImageCard from "../components/ImageCard";
axios.defaults.withCredentials = true;

const Home = () => {
  const [cookies] = useCookies(["access_token"]);
  const [posts, setPosts] = useState([] as any[]);

  const getProfilePosts = async () => {
    await axios
      .get("http://localhost:3333/posts/profile", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.access_token}`,
        },
      })
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getProfilePosts();
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

export default Home;
