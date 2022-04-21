import axios from "axios";
import swal from "sweetalert";
import { User } from "../types";

export const createUser = (user: User) => {
  axios
    .post("http://localhost:3333/auth/local/signup", user)
    .then(() => {
      swal("Account created!", "👍", "success");
    })
    .catch((err) => alert("Error creating account."));
};
