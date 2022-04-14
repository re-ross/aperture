import axios from "axios";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import ImageCard from "../components/ImageCard";
axios.defaults.withCredentials = true;

const Home = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [posts, setPosts] = useState([] as any[]);
  useEffect(() => {
    axios
      .get("http://localhost:3333/auth/feed", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.access_token}`,
        },
      })
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div className="text-center justify-center flex gap-6 flex-wrap ">
        {posts.map((post) => (
          <ImageCard post={post} />
        ))}
      </div>
    </>
  );
};

export default Home;
