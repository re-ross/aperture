import "./App.css";
import Navbar from "./components/Navbar";
import SignIn from "./pages/SignIn";
// import SignUp from "./pages/SignUp";
import { AuthProvider } from "react-auth-kit";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";

function App() {
  return (
    // <AuthProvider
    //   authType={"cookie"}
    //   authName={"access_token"}
    //   cookieDomain={window.location.hostname}
    //   cookieSecure={window.location.protocol === "http:"}
    // >
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      {/* <SignUp /> */}
    </BrowserRouter>
    // </AuthProvider>
  );
}

export default App;
