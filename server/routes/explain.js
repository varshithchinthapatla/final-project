import express from "express";
import axios from "axios";
import Chat from "../models/Chat.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { question, style, language } = req.body;

    const prompt = `
Explain like a friendly human teacher.

Topic: ${question}

Style: ${style}
Language: ${language}

Make the explanation:
- Easy to understand
- Friendly and conversational
- Clear and engaging
- Well structured
- Helpful for beginners
`;

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const answer = response.data.choices[0].message.content;

    const savedChat = await Chat.create({
      userId: req.user.id,
      question,
      answer,
      style,
      language,
    });

    res.json(savedChat);
  } catch (error) {
    console.log(error.response?.data || error.message);
    res.status(500).json({ message: "AI Error" });
  }
});

export default router;
