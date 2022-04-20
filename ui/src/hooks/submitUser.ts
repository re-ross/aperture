import axios from "axios";
import swal from "sweetalert";
import { User } from "../types";
axios.defaults.withCredentials = true;

const submitUser = (user: User) => {
  axios
    .post("http://localhost:3333/auth/local/signin", user)
    .then(() => {
      swal("Logged In", "👍", "success");
    })
    .catch((err) => console.log(err));
};

export default submitUser;
