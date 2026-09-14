"use client";
import { useState } from "react";
import { FaGoogle, FaLock, FaStar } from "react-icons/fa";

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

export default function ReviewPopupForm({ apiBase, onClose, onSuccess, initialReview = null }) {
  const isEditing = !!initialReview;
  const isGoogle = isEditing && (initialReview.source === "Google" || !!initialReview.googleReviewId);

  const [form, setForm] = useState({
    name: initialReview?.name || "",
    message: initialReview?.message || "",
    rating: Number(initialReview?.rating) || 5,
    company: initialReview?.company || "",
    avatar: null,
  });
  const [preview, setPreview] = useState(initialReview?.avatar || null);
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
    formData.append("upload_preset", "crownexcel-avatars");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dqghun7oj/image/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.error?.message === "Upload preset not found") {
        throw new Error("Cloudinary upload preset 'crownexcel-avatars' not found.");
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
      const baseUrl = apiBase || "";

      if (isEditing) {
        // When editing, ONLY review comment/text is editable
        const payload = {
          id: initialReview._id,
          message: form.message.trim(),
        };

        const res = await fetch(`${baseUrl}/api/reviews`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const json = await res.json().catch(() => ({}));
          throw new Error(json.error || "Failed to update review comment.");
        }
      } else {
        // When creating a new review
        let avatarUrl = "";
        if (form.avatar) {
          try {
            avatarUrl = await uploadToCloudinary(form.avatar);
          } catch (err) {
            setError("Failed to upload avatar image. Please try again.");
            setLoading(false);
            return;
          }
        }

        const res = await fetch(`${baseUrl}/api/reviews`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, avatar: avatarUrl }),
        });

        if (!res.ok) {
          throw new Error("Failed to add review. Please try again.");
        }
      }

      setLoading(false);
      onSuccess();
      onClose();
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
        background: "rgba(0,0,0,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        backdropFilter: "blur(2px)",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: 28,
          borderRadius: 16,
          minWidth: 340,
          maxWidth: 480,
          width: "92vw",
          boxShadow: "0 16px 40px rgba(0,0,0,0.18)",
          position: "relative",
          fontFamily: "inherit",
          maxHeight: "92vh",
          overflowY: "auto",
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
            fontSize: 26,
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
            marginBottom: 20,
            fontWeight: 700,
            fontSize: 20,
            color: "#20507C",
            textAlign: "center",
            letterSpacing: 0.5,
          }}
        >
          {isEditing ? "Edit Review Comment" : "Add New Review"}
        </h2>

        {isEditing ? (
          /* ========================================================
             EDIT MODE: Only Review Comment is editable.
             Reviewer name, photo, rating & metadata are locked.
             ======================================================== */
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Locked Reviewer Information Card */}
            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                padding: "14px 16px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {initialReview.avatar && typeof initialReview.avatar === 'string' && initialReview.avatar.trim() ? (
                  <img
                    src={initialReview.avatar}
                    alt={initialReview.name}
                    referrerPolicy="no-referrer"
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "1px solid #cbd5e1",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      background: initialReview.color || "#2B6DAA",
                      color: "#fff",
                      fontWeight: 800,
                      fontSize: 16,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {initialReview.initial || (initialReview.name ? initialReview.name.charAt(0).toUpperCase() : "C")}
                  </div>
                )}

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontWeight: 700, fontSize: 15, color: "#0f172a" }}>
                      {initialReview.name}
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        background: "#e2e8f0",
                        color: "#475569",
                        padding: "2px 6px",
                        borderRadius: 4,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 3,
                        fontWeight: 600,
                      }}
                    >
                      <FaLock size={8} />
                      Locked
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 3, fontSize: 12, color: "#64748b" }}>
                    <div style={{ display: "flex", color: "#f59e0b", fontSize: 13 }}>
                      {[...Array(Number(initialReview.rating) || 5)].map((_, i) => (
                        <FaStar key={i} size={11} className="fill-amber-400" />
                      ))}
                    </div>
                    <span>·</span>
                    {isGoogle ? (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 4, color: "#2563eb", fontWeight: 600 }}>
                        <FaGoogle size={10} /> Google Review
                      </span>
                    ) : (
                      <span>Website Review</span>
                    )}
                    <span>·</span>
                    <span>{initialReview.time || "Recently"}</span>
                  </div>
                </div>
              </div>

              <div
                style={{
                  marginTop: 10,
                  fontSize: 11,
                  color: "#64748b",
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 6,
                  padding: "6px 10px",
                  lineHeight: 1.4,
                }}
              >
                🔒 <strong>Locked metadata:</strong> Reviewer name, profile photo, rating, and source cannot be modified. Only the comment text below can be edited.
              </div>
            </div>

            {/* The ONLY Editable Field: Review Comment */}
            <div>
              <label
                style={{
                  fontWeight: 600,
                  marginBottom: 6,
                  display: "block",
                  color: "#1e293b",
                  fontSize: 14,
                }}
              >
                Review Comment<span style={{ color: "red" }}>*</span>
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  border: "1.5px solid #cbd5e1",
                  borderRadius: 10,
                  fontSize: 14,
                  outline: "none",
                  background: "#fff",
                  lineHeight: 1.5,
                  boxSizing: "border-box",
                  resize: "vertical",
                  transition: "border 0.2s",
                }}
                placeholder="Edit the review comment text..."
              />
            </div>
          </div>
        ) : (
          /* ========================================================
             ADD MODE: Full form for adding a new manual review
             ======================================================== */
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ fontWeight: 500, marginBottom: 4, display: "block", color: "#222" }}>
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
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label style={{ fontWeight: 500, marginBottom: 4, display: "block", color: "#222" }}>
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
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label style={{ fontWeight: 500, marginBottom: 4, display: "block", color: "#222" }}>
                Rating
              </label>
              <StarRating value={form.rating} onChange={handleStarChange} />
            </div>

            <div>
              <label style={{ fontWeight: 500, marginBottom: 4, display: "block", color: "#222" }}>
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
                    width: 60,
                    height: 60,
                    objectFit: "cover",
                    borderRadius: "50%",
                    marginTop: 8,
                    boxShadow: "0 2px 8px #ccc",
                  }}
                />
              )}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: 22,
            width: "100%",
            padding: "11px 0",
            background: "#34953C",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 16,
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: "0 2px 6px rgba(52, 149, 60, 0.3)",
            letterSpacing: 0.3,
            transition: "background 0.2s",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? (isEditing ? "Updating..." : "Adding...") : (isEditing ? "Update Comment" : "Add Review")}
        </button>

        {error && (
          <div style={{ color: "#dc2626", marginTop: 12, textAlign: "center", fontWeight: 500, fontSize: 13 }}>
            {error}
          </div>
        )}
      </form>
    </div>
  );
}