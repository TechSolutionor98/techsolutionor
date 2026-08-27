"use client";
import { useState } from "react";

function StarRating({ value, onChange }) {
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => onChange(star)}
          style={{
            cursor: "pointer",
            fontSize: 28,
            color: star <= value ? "#FFD700" : "#e0e0e0",
            transition: "color 0.2s",
          }}
          aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function ReviewPopupForm({ apiBase, onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    message: "",
    rating: 5,
    avatar: null,
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value, files } = e.target;
    if (name === "avatar" && files[0]) {
      setForm((f) => ({ ...f, avatar: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  }

  function handleStarChange(rating) {
    setForm((f) => ({ ...f, rating }));
  }
  async function uploadToCloudinary(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "crownexcel-avatars"); // Make sure this preset exists in your Cloudinary dashboard

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dqghun7oj/image/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log("Cloudinary response:", data); // Debug log
      if (data.error?.message === "Upload preset not found") {
        throw new Error("Cloudinary upload preset 'crownexcel-avatars' not found. Please create it in your Cloudinary dashboard.");
      }
      if (!data.secure_url) {
        throw new Error(data.error?.message || "Failed to upload image to Cloudinary");
      }
      return data.secure_url;
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      throw err;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      let avatarUrl = "";
      console.log(avatarUrl);
      
      if (form.avatar) {
        try {
          avatarUrl = await uploadToCloudinary(form.avatar);
          console.log("Avatar URL:", avatarUrl); // Debug log
        } catch (err) {
          setError("Failed to upload avatar image. Please try again.");
          setLoading(false);
          return;
        }
      }
      const res = await fetch(`${apiBase}/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, avatar: avatarUrl }),
      });
      if (!res.ok) {
        throw new Error("Failed to add review. Please try again.");
      }
      setLoading(false);
      onSuccess();
      onClose(); // Automatically close the popup after success
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: 28,
          borderRadius: 16,
          minWidth: 320,
          maxWidth: 400,
          width: "90vw",
          boxShadow: "0 12px 40px #0003",
          position: "relative",
          fontFamily: "inherit",
          maxHeight: "95vh", // Added for scrollable overflow
          overflowY: "auto", // Added for scrollable overflow
        }}
      >
        <button
          type="button"
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 20,
            background: "none",
            border: "none",
            fontSize: 28,
            cursor: "pointer",
            color: "#999",
            transition: "color 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = "#20507C")}
          onMouseOut={(e) => (e.currentTarget.style.color = "#999")}
          aria-label="Close"
        >
          &times;
        </button>
        <h2
          style={{
            marginBottom: 22,
            fontWeight: 700,
            fontSize: 22,
            color: "#20507C",
            textAlign: "center",
            letterSpacing: 1,
          }}
        >
          Add New Review
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div>
            <label
              style={{
                fontWeight: 500,
                marginBottom: 4,
                display: "block",
                color: "#222",
              }}
            >
              Name<span style={{ color: "red" }}>*</span>
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1.5px solid #e0e0e0",
                borderRadius: 8,
                fontSize: 16,
                outline: "none",
                background: "#fafbfc",
                transition: "border 0.2s",
              }}
            />
          </div>
          <div>
            <label
              style={{
                fontWeight: 500,
                marginBottom: 4,
                display: "block",
                color: "#222",
              }}
            >
              Message<span style={{ color: "red" }}>*</span>
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={3}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1.5px solid #e0e0e0",
                borderRadius: 8,
                fontSize: 16,
                outline: "none",
                background: "#fafbfc",
                resize: "vertical",
              }}
            />
          </div>
          <div>
            <label
              style={{
                fontWeight: 500,
                marginBottom: 4,
                display: "block",
                color: "#222",
              }}
            >
              Rating
            </label>
            <StarRating value={form.rating} onChange={handleStarChange} />
          </div>
          <div>
            <label
              style={{
                fontWeight: 500,
                marginBottom: 4,
                display: "block",
                color: "#222",
              }}
            >
              Avatar (Image)
            </label>
            <input
              name="avatar"
              type="file"
              accept="image/*"
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "7px 0",
                border: "none",
                fontSize: 15,
                background: "#fafbfc",
              }}
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                style={{
                  width: 70,
                  height: 70,
                  objectFit: "cover",
                  borderRadius: "50%",
                  marginTop: 8,
                  boxShadow: "0 2px 8px #ccc",
                }}
              />
            )}
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: 24,
            width: "100%",
            padding: "12px 0",
            background: "#E46704",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 17,
            cursor: "pointer",
            boxShadow: "0 2px 8px #eee",
            letterSpacing: 0.5,
            transition: "background 0.2s",
          }}
        >
          {loading ? "Adding..." : "Add Review"}
        </button>
        {error && (
          <div
            style={{
              color: "red",
              marginTop: 12,
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            {error}
          </div>
        )}
      </form>
      <style>{`
        @media (max-width: 600px) {
          form {
            min-width: 0 !important;
            max-width: 98vw !important;
            padding: 16px !important;
            max-height: 95vh !important; /* Also add for mobile */
            overflow-y: auto !important;
          }
          h2 {
            font-size: 18px !important;
          }
        }
      `}</style>
    </div>
  );
}