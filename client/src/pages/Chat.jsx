import { useEffect, useRef, useState } from "react";
import API from "../utils/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import MessageBubble from "../components/MessageBubble";

export default function Chat() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [style, setStyle] = useState("Simple");
  const [language, setLanguage] = useState("English");
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);

  const chatEndRef = useRef(null);

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    if (currentChat) {
      setMessages([
        {
          role: "user",
          content: currentChat.question,
        },
        {
          role: "ai",
          content: currentChat.answer,
        },
      ]);
    }
  }, [currentChat]);

  const fetchChats = async () => {
  try {
    const res = await API.get("/chat/history");

    const sortedChats = res.data.sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    );

    setChats(sortedChats);
  } catch (error) {
    console.log(error);
  }
};

  const handleAsk = async () => {
    if (!question.trim()) return;

    const userMessage = {
      role: "user",
      content: question,
    };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    try {
      const res = await API.post("/explain", {
        question,
        style,
        language,
      });

      const aiMessage = {
        role: "ai",
        content: res.data.answer,
      };

      setMessages((prev) => [...prev, aiMessage]);

      setQuestion("");

      fetchChats();
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <div className="chat-page">
      <Sidebar
        chats={chats}
        currentChat={currentChat}
        setCurrentChat={setCurrentChat}
      />

      <div className="chat-main">
        <Navbar />

        <div className="chat-container">
          {messages.length === 0 ? (
            <div className="empty-chat">
              <h1>Explain Like Friend AI</h1>
              <p>
                Ask anything and get simple explanations.
              </p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <MessageBubble
                key={index}
                role={msg.role}
                content={msg.content}
              />
            ))
          )}

          {loading && (
            <div className="message-row ai">
              <div className="message-bubble ai">
                Thinking...
              </div>
            </div>
          )}

          <div ref={chatEndRef}></div>
        </div>

        <div className="chat-input-area">
          <div className="top-controls">
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
            >
              <option>Simple</option>
<option>Medium</option>
<option>Complex</option>
<option>Beginner Friendly</option>
<option>Technical</option>
<option>Professional</option>
<option>Funny</option>
<option>Teacher Style</option>
<option>Interview Style</option>
<option>Story Mode</option>
            </select>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option>English</option>
<option>Hindi</option>
<option>Telugu</option>
<option>Tamil</option>
<option>Kannada</option>
<option>Malayalam</option>
<option>Spanish</option>
<option>French</option>
<option>German</option>
<option>Japanese</option>
<option>Chinese</option>
<option>Korean</option>
<option>Russian</option>
<option>Arabic</option>
<option>Portuguese</option>
<option>Italian</option>
            </select>
          </div>

          <div className="input-row">
            <input
              type="text"
              placeholder="Ask anything..."
              value={question}
              onChange={(e) =>
                setQuestion(e.target.value)
              }
            />

            <button onClick={handleAsk}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}