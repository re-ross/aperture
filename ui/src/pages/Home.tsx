import axios from "axios";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
axios.defaults.withCredentials = true;

const Home = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3333/auth/feed", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.access_token}`,
        },
        // test req.body
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <h1>testing</h1>
      <div className="text-center justify-center flex gap-6 flex-wrap ">
        {posts.map((post) => (
          <h3>post.comment</h3>
        ))}
      </div>
    </>
  );
};

export default Home;
