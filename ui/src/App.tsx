import "./App.css";
import Navbar from "./components/Navbar";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <div className="App">
      <Navbar />
      <SignIn />
      {/* <SignUp /> */}
    </div>
  );
}

export default App;
