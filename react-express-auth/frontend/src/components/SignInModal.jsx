import { Dialog } from "@headlessui/react";
import { Field, Label, Input } from "@headlessui/react";
import clsx from "clsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignInModal({ isOpen, onClose, onSuccess }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorText("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      if (!res.ok) {
        const text = await res.text();
        let error;
        try {
          error = text ? JSON.parse(text).error : null;
        } catch {
          error = null;
        }
        return setErrorText(error || "Login failed.");
      }

      const userRes = await fetch("/api/auth/me", {
        credentials: "include",
      });

      if (!userRes.ok) {
        return setErrorText("Login succeeded, but failed to load user.");
      }

      const user = await userRes.json(); 
      onClose();
      onSuccess(user);
      // ✅ the correct way to close the modal
    } catch (err) {
      console.error("Login failed unexpectedly:", err);
      setErrorText("Something went wrong. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-[#28353A] rounded-xl w-90 max-w-md p-8 shadow-xl flex flex-col justify-center items-center">
          <Dialog.Title className="text-2xl font-semibold text-[#C2B280] text-center mb-4">
            Sign In
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <Field>
              <Label className="text-xl font-medium text-white">Username</Label>
              <Input
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className={clsx(
                  "mt-2 block w-full rounded-md border-none bg-white/5 px-3 py-2 text-white",
                  "focus:outline-none focus:ring-2 focus:ring-white/30"
                )}
              />
            </Field>

            <Field>
              <Label className="text-xl font-medium text-white">Password</Label>
              <Input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className={clsx(
                  "mt-2 block w-full rounded-md border-none bg-white/5 px-3 py-2 text-white",
                  "focus:outline-none focus:ring-2 focus:ring-white/30"
                )}
              />
            </Field>

            {errorText && (
              <p className="text-red-400 text-sm text-center">{errorText}</p>
            )}

            <button
              type="submit"
              className="bg-teal-600 text-white font-semibold py-2 rounded-md hover:bg-teal-700 transition">
              Sign In
            </button>
          </form>

          <p className="text-sm text-center mt-4 text-white/80">
            Don’t have an account?{" "}
            <button
              type="button"
              onClick={() => {
                onClose();
                navigate("/sign-up");
              }}
              className="text-teal-400 hover:underline">
              Sign up
            </button>
          </p>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
