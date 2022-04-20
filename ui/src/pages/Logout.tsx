import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import swal from "sweetalert";
axios.defaults.withCredentials = true;

export const Logout = () => {
  const [cookies, setCookies, removeCookie] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const submitLogout = () => {
    axios
      .post("http://localhost:3333/auth/logout", cookies, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.access_token}`,
        },
      })
      .then(() => removeCookie("access_token"))
      .catch((err) => console.log(err));
    swal("See ya", "👋", "success");
    navigate("/");
  };

  return (
    <>
      <div className="min-h-full pt-16 pb-12 flex flex-col bg-[#FCFCFC]">
        <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex-shrink-0 flex justify-center">
            <a href="/" className="inline-flex">
              <span className="sr-only">Workflow</span>
              <img
                className="mx-auto h-18 w-auto"
                src="/assets/images/aperturelogo.png"
                alt="Aperture"
              />
            </a>
          </div>
          <div className="py-16">
            <div className="text-center">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide"></p>
              <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                Thanks for visiting!
              </h1>

              <div className="mt-6">
                <button
                  onClick={() => submitLogout()}
                  type="button"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-[#8FBFE0] hover:bg-[#05668D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </main>
        <footer className="flex-shrink-0 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-center space-x-4">
            <a
              href="https://www.linkedin.com/in/re-ross/"
              target="_blank"
              className="text-sm font-medium text-gray-500 hover:text-gray-600"
              rel="noreferrer"
            >
              Linkedin
            </a>
            <span
              className="inline-block border-l border-gray-300"
              aria-hidden="true"
            />
            <a
              href="https://github.com/re-ross"
              target="_blank"
              className="text-sm font-medium text-gray-500 hover:text-gray-600"
              rel="noreferrer"
            >
              Github
            </a>
          </nav>
        </footer>
      </div>
    </>
  );
};
