import React from "react";

export default function Sidebar({
  chats,
  setMessages,
}) {
  return (
    <div className="sidebar">
      <h2>Recent Chats</h2>

      <div className="sidebar-chats">
        {chats.map((chat) => (
          <div
            key={chat._id}
            className="sidebar-chat"
            onClick={() =>
              setMessages([
                {
                  role: "user",
                  content: chat.question,
                },
                {
                  role: "assistant",
                  content: chat.answer,
                },
              ])
            }
          >
            <h3>
              {chat.question.slice(0, 28)}
            </h3>

            <p className="chat-preview">
              {chat.answer.slice(0, 80)}
              ...
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}