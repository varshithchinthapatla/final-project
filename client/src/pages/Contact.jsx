import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setSuccess("Message sent successfully!");

    setForm({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="info-page">
      <div className="info-card glass">
        <h1>Contact Us</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Name</label>

            <input
              type="text"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>

            <input
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              required
            />
          </div>

          <div className="input-group">
            <label>Message</label>

            <textarea
              rows="5"
              value={form.message}
              onChange={(e) =>
                setForm({
                  ...form,
                  message: e.target.value,
                })
              }
              required
            />
          </div>

          <button className="auth-btn">
            Send Message
          </button>

          {success && (
            <div className="success-box">
              {success}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}