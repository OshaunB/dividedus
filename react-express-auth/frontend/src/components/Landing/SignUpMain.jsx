import { useContext, useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { registerUser } from "../adapters/auth-adapter";
import Footer from "../components/Footer";

// Controlling the sign up form is a good idea because we want to add (eventually)
// more validation and provide real time feedback to the user about usernames and passwords
export default function SignUpPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [errorText, setErrorText] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // users shouldn't be able to see the sign up page if they are already logged in.
  // if the currentUser exists in the context, navigate the user to
  // the /users/:id page for that user, using the currentUser.id value
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
    <div className="flex flex-col items-center justify-center w-screen h-[calc(100vh-73.6px)] bg-black text-white px-4">
      <h1 className="text-4xl font-bold text-[#C2B280] mb-4">Sign Up</h1>

      <form
        onSubmit={handleSubmit}
        onChange={handleChange}
        aria-labelledby="create-heading"
        className="bg-[#0E1D21] w-full max-w-md p-6 rounded-lg shadow-md space-y-4">
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

        {/* In reality, we'd want a LOT more validation on signup, so add more things if you have time
          <label htmlFor="password-confirm">Password Confirm</label>
          <input autoComplete="off" type="password" id="password-confirm" name="passwordConfirm" />
        */}

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
    </div>
  );
}
