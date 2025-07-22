import { useContext, useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { registerUser } from "../adapters/auth-adapter";
import Footer from "../components/Footer";

export default function SignUpPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [errorText, setErrorText] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (currentUser) return <Navigate to={`/users/${currentUser.id}`} />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText("");
    if (!username || !password)
      return setErrorText("Missing username or password");

    const [user, error] = await registerUser({ username, password });
    if (error) return setErrorText(error.message);

    setCurrentUser(user);
    navigate("/");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
  };

  return (
    <div className="w-full min-h-[calc(100vh-186px)] bg-black text-white flex flex-col">
      <main className="w-full min-h-[calc(100vh-186px)] flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit}
          onChange={handleChange}
          aria-labelledby="create-heading"
          className="bg-[#0E1D21] w-xl max-w-md px-6 py-10 rounded-lg shadow-md space-y-4 mx-auto">
          <h1 className="text-4xl font-bold text-[#C2B280] text-center mb-4">
            Sign Up
          </h1>
          <h2
            id="create-heading"
            className="text-2xl font-semibold text-white text-center mb-2">
            Create New Account
          </h2>

          <div className="flex flex-col space-y-1">
            <label htmlFor="username" className="text-sm">
              Username
            </label>
            <input
              autoComplete="off"
              type="text"
              id="username"
              name="username"
              placeholder="Enter a username"
              className="px-4 py-2 rounded bg-white text-black"
              onChange={handleChange}
              value={username}
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <input
              autoComplete="off"
              type="password"
              id="password"
              name="password"
              placeholder="Enter a password"
              className="px-4 py-2 rounded bg-white text-black"
              onChange={handleChange}
              value={password}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#C2B280] hover:bg-[#e0d6ac] text-black font-bold rounded transition-colors">
            Sign Up Now!
          </button>

          {!!errorText && (
            <p className="text-red-400 text-sm text-center">{errorText}</p>
          )}

          <p className="text-center text-sm mt-2">
            Already have an account?{" "}
            <Link
              to="/login"
              className="underline text-[#C2B280] hover:text-[#e0d6ac]">
              Log in
            </Link>
          </p>
        </form>
      </main>

      <Footer />
    </div>
  );
}
