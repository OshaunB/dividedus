import { useState, useEffect, useRef } from "react";

export default function AskOphelia() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const text = input;
    setMessages((prev) => [...prev, { type: "user", text }]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ask-ophelia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { type: "ophelia", text: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { type: "ophelia", text: "Sorry, something went wrong." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="relative flex h-[calc(100vh-73.6px)] w-full flex-col
                    bg-gradient-to-b from-[#0E1D21] via-black to-black">
      {/* Header */}
      <header className="w-full pt-10 text-center">
        <h1 className="text-5xl font-extrabold tracking-wide text-[#C2B280] ml-6 mt-4">
          Ophelia
        </h1>
        {/* <p className="mx-auto mt-3 max-w-2xl px-4 text-base sm:text-lg text-slate-200">
          Ask me anything related to ICE, detention, and immigration and I’ll
          point you to helpful resources.
        </p> */}
      </header>

      {/* Chat panel */}
      <div className="mx-auto mt-4 w-full max-w-5xl flex-1 overflow-y-auto px-3 sm:px-6 py-6
                      rounded-3xl border border-white/10 bg-white/5 backdrop-blur
                      shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]">
        <div className="flex flex-col gap-4">
          {messages.map((msg, idx) => {
            const isUser = msg.type === "user";
            return (
              <div
                key={idx}
                className={`flex items-start gap-3 ${isUser ? "justify-end" : "justify-start"}`}
              >
                {/* Avatar chip */}
                {!isUser && (
                  <div className="grid h-8 w-8 place-items-center rounded-full
                                  bg-[#C2B280]/20 text-[#C2B280] font-bold">O</div>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl px-5 py-3 text-base sm:text-lg leading-relaxed
                              shadow ring-1
                              ${isUser
                                ? "bg-slate-700/80 text-white ring-white/10 rounded-br-none"
                                : "bg-[#0E1D21]/90 text-slate-100 ring-[#C2B280]/20 rounded-bl-none"}`}
                >
                  {msg.text}
                </div>
                {isUser && (
                  <div className="grid h-8 w-8 place-items-center rounded-full
                                  bg-slate-700 text-white font-bold">U</div>
                )}
              </div>
            );
          })}

          {/* Typing indicator */}
          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="grid h-8 w-8 place-items-center rounded-full
                              bg-[#C2B280]/20 text-[#C2B280] font-bold">O</div>
              <div className="rounded-2xl rounded-bl-none bg-[#0E1D21]/90 px-5 py-3
                              text-slate-300 ring-1 ring-[#C2B280]/20 shadow">
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-slate-300"></span>
                  <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-slate-300 [animation-delay:120ms]"></span>
                  <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-slate-300 [animation-delay:240ms]"></span>
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input bar */}
      <div className="sticky bottom-0 left-0 right-0 z-10
                      bg-gradient-to-t from-black via-black/90 to-transparent pt-6 pb-8">
        <form onSubmit={handleSubmit} className="mx-auto w-full max-w-3xl px-3 sm:px-6">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              aria-label="Ask Ophelia"
              placeholder="Ask a question…"
              className="h-14 sm:h-16 w-full rounded-full border border-white/10 bg-white/90
                         backdrop-blur px-5 pr-20 sm:pr-24 text-slate-900 placeholder:text-slate-500
                         focus:outline-none focus:ring-2 focus:ring-[#C2B280]"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2
                         grid h-11 w-11 sm:h-12 sm:w-12 place-items-center rounded-full
                         bg-[#C2B280] text-black shadow hover:bg-[#e0d6ac]
                         disabled:opacity-60 disabled:cursor-not-allowed"
              title="Send"
            >
              {/* paper plane */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                   fill="currentColor" className="h-5 w-5">
                <path d="M2.01 21 23 12 2.01 3 2 10l14 2-14 2z" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
