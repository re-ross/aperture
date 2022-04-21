import "./App.css";
import { Navbar, UploadPost } from "./components";
import { Home, SignIn, SignUp, Logout, Profile } from "./pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
