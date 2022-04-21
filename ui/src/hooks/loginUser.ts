import axios from "axios";
import swal from "sweetalert";
import { User } from "../types";

export const loginUser = (user: User) => {
  axios
    .post("http://localhost:3333/auth/local/signin", user)
    .then(() => {
      swal("Logged In", "👍", "success");
    })
    .catch((err) => alert("Invalid credentials."));
};
