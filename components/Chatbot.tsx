"use client";
import React, { useState, useEffect, useRef } from "react";
import responses from "../responses.json";

interface ResponseData {
  [key: string]: string;
}

const Chatbot: React.FC = () => {
  const [userInput, setUserInput] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, isOpen]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const handleSend = () => {
    if (userInput.trim() === "") return;
    const response = getResponse(userInput);
    setChatHistory([...chatHistory, `User: ${userInput}`, `Bot: ${response}`]);
    setUserInput("");
  };

  const getResponse = (input: string): string => {
    const lowerCaseInput = input.toLowerCase();
    for (const key in responses) {
      if (lowerCaseInput.includes(key)) {
        return (responses as ResponseData)[key];
      }
    }
    return "Sorry, I have no response for that. Currently supported topics are: Computer Science, Investing, Travelling, Cars and Food.";
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-0 right-0 m-4 z-10">
      <button
        onClick={toggleChat}
        className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-700"
      >
        {isOpen ? "Close Chat" : "Open Chat"}
      </button>
      {isOpen && (
        <div className="w-full sm:w-96 mt-4 p-4 bg-gray-800 text-white border border-gray-600 shadow-lg rounded-lg">
          <h2 className="text-center text-xl font-bold mb-4 text-white-1">
            Support Chatbot:
          </h2>
          <div
            className="h-64 overflow-y-auto mb-4 p-2 bg-gray-700 rounded-lg"
            ref={chatContainerRef}
          >
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`mb-2 ${chat.startsWith("User:") ? "text-white-1" : "text-orange-1"}`}
              >
                {chat}
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={userInput}
              onChange={handleInputChange}
              placeholder="Ask me something..."
              className="flex-1 border border-gray-600 p-2 rounded-l-lg bg-gray-600 text-white-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSend}
              className="bg-orange-500 text-white p-2 rounded-r-lg hover:bg-orange-600"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
