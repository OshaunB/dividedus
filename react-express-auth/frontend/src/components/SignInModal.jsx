import { Dialog } from "@headlessui/react";
import { Field, Label, Input } from "@headlessui/react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

export default function SignInModal({ isOpen, onClose, onSuccess }) {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Replace this with real login logic (like API call)
    // For now, simulate successful login:
    onSuccess(); // Redirect to saved path
    onClose(); // Close modal
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

      {/* Centered modal container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-[#28353A] rounded-xl w-full max-w-md p-8 shadow-xl flex flex-col justify-center items-center">
          <Dialog.Title className="text-2xl font-semibold text-[#C2B280] text-center mb-4">
            Sign In
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <Field>
              <Label className="text-xl font-medium text-white">Username</Label>
              <Input
                required
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
                placeholder="Enter password"
                className={clsx(
                  "mt-2 block w-full rounded-md border-none bg-white/5 px-3 py-2 text-white",
                  "focus:outline-none focus:ring-2 focus:ring-white/30"
                )}
              />
            </Field>

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
