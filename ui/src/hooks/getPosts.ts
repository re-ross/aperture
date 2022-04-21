import axios from "axios";

export const getPosts = (
  access_token: string,
  setPosts: React.Dispatch<React.SetStateAction<any[]>>
) => {
  axios
    .get("http://localhost:3333/posts/feed", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    })
    .then((res) => setPosts(res.data))
    .catch((err) => console.log(err));
};
