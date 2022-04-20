import "./App.css";
import Navbar from "./components/Navbar";
import { Home, SignIn, SignUp, Logout, UploadPost } from "./pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/uploadpost" element={<UploadPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
