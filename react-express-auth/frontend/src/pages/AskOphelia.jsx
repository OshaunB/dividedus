import { useState } from "react";

export default function AskOphelia() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className="flex flex-col w-full h-[calc(100vh-73.6px)] bg-black">
      <header className="w-full flex flex-col items-center text-center space-y-2">
        <h1 className="text-4xl w-full font-bold text-[#C2B280] pt-16 ">
          Ophelia
        </h1>
        <p className="text-white text-xl py-4">
          Ask me anything related to ICE and I'll answer!
        </p>
      </header>

      <div className="flex-1 overflow-y-auto px-24 py-2 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-3xl px-8 py-6 rounded-lg text-white ${
              msg.type === "user"
                ? "bg-gray-700 self-end ml-auto text-right text-2xl"
                : "bg-[#0E1D21] self-start mr-auto text-left text-2xl"
            }`}>
            {msg.text}
          </div>
        ))}
        {isLoading && (
          <div className=" text-gray-600 px-4 py-2 rounded self-start text-4xl mr-auto">
            Ophelia is typing...
          </div>
        )}
      </div>
      <div className="w-full px-4">
        <form
          onSubmit={handleSubmit}
          className="sticky bottom-0 bg-white p-4 flex gap-2 border-t border-gray-200 max-w-2xl w-full mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your question here..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-gray-800 text-white rounded-full px-6 py-2 font-medium hover:bg-gray-700">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
