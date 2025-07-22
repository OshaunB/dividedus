import { useState, useEffect, useRef } from "react";

export default function AskOphelia() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { type: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ask-ophelia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();

      const botReply = { type: "ophelia", text: data.reply };
      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
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
  }, [messages]);

  return (
    <div className="flex flex-col w-full h-[calc(100vh-73.6px)] bg-black px-4 sm:px-6 lg:px-12">
      <header className="w-full flex flex-col items-center text-center space-y-2 pt-12">
        <h1 className="text-5xl font-extrabold text-[#C2B280] tracking-wide py-4">
          Ophelia
        </h1>
        <p className="text-white text-lg sm:text-xl max-w-xl">
          Ask me anything related to ICE, detention, and immigration and I will
          provide resources
        </p>
      </header>

      <div className="flex-1 overflow-y-auto py-6 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-3xl px-10 py-6 rounded-lg text-white transition duration-300 ease-in-out shadow-md ${
              msg.type === "user"
                ? "bg-[#334155] self-end ml-auto text-right text-lg sm:text-2xl rounded-br-none"
                : "bg-[#0E1D21] self-start mr-auto text-left text-lg sm:text-2xl rounded-bl-none"
            }`}>
            {msg.text}
          </div>
        ))}
        {isLoading && (
          <div className="bg-[#1f2937] text-white px-6 py-4 rounded-lg text-left text-lg max-w-3xl self-start animate-pulse shadow-sm">
            Ophelia is typing...
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="w-full px-2 sm:px-4">
        <form
          onSubmit={handleSubmit}
          className="sticky bottom-0 bg-black p-4 flex items-center justify-center w-full mx-auto">
          <div className="flex items-center w-full max-w-3xl gap-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ex. living conditions"
              className="flex-1 border border-gray-600 rounded-full px-4 sm:px-6 py-3 sm:py-4 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#C2B280] text-base sm:text-lg md:text-xl text-center"
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
              className="h-full px-4 sm:px-6 py-2 sm:py-3 bg-[#C2B280] text-black text-base sm:text-lg font-semibold rounded-full hover:bg-[#e0d6ac] transition-colors flex items-center justify-center">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
