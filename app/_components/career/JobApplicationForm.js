"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  X, 
  Send,
  Briefcase,
  User,
  Mail,
  Phone,
  Globe,
  Award,
  ShieldCheck,
  RotateCw,
  Edit2
} from "lucide-react";

const availableRoles = [
  "Senior Full-Stack Developer",
  "Lead UI/UX Product Designer",
  "Senior Mobile Engineer (Flutter / React Native)",
  "DevOps & Cloud Infrastructure Architect",
  "SEO & Digital Growth Strategist",
  "QA Automation & Reliability Engineer",
  "Frontend Engineer (React / Next.js)",
  "Backend Engineer (Node.js / Python)",
  "General Application / Other Roles",
];

const experienceOptions = [
  "Entry Level (0 - 1 Year)",
  "Junior / Mid (1 - 3 Years)",
  "Mid-Senior (3 - 5 Years)",
  "Senior (5 - 8 Years)",
  "Lead / Principal (8+ Years)",
];

export default function JobApplicationForm({ selectedPosition, onResetPosition }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: selectedPosition || "",
    experience: "",
    portfolio: "",
    coverLetter: "",
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [formAlert, setFormAlert] = useState(null);
  const [successData, setSuccessData] = useState(null);

  // OTP Verification States
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [resendingOtp, setResendingOtp] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const fileInputRef = useRef(null);
  const formRef = useRef(null);
  const errorBannerRef = useRef(null);
  const otpInputRefs = useRef([]);

  // Cooldown countdown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  // Handle modal lock and focus
  useEffect(() => {
    if (showOtpModal) {
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 100);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showOtpModal]);

  // Sync when selectedPosition prop updates
  useEffect(() => {
    if (selectedPosition) {
      setFormData((prev) => ({ ...prev, position: selectedPosition }));
      setErrors((prev) => ({ ...prev, position: "" }));
    }
  }, [selectedPosition]);

  // Validation function for each field
  const validateField = (name, value, file = resumeFile) => {
    switch (name) {
      case "name": {
        const trimmed = (value || "").trim();
        if (!trimmed) return "Full Name is required.";
        if (trimmed.length < 2) return "Full name must be at least 2 characters.";
        const letters = trimmed.replace(/[^a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]/g, "");
        if (letters.length < 2) return "Please enter a valid full name.";
        return "";
      }
      case "email": {
        const trimmed = (value || "").trim();
        if (!trimmed) return "Email Address is required.";
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
        if (!emailRegex.test(trimmed)) return "Please enter a valid email address (e.g. name@example.com).";
        return "";
      }
      case "phone": {
        const trimmed = (value || "").trim();
        if (!trimmed) return "Phone Number is required.";
        const digits = trimmed.replace(/\D/g, "");
        if (digits.length < 7 || digits.length > 15) return "Please enter a valid phone number (7 to 15 digits).";
        const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/;
        if (!phoneRegex.test(trimmed) && digits.length < 7) return "Please enter a valid phone number format.";
        return "";
      }
      case "position": {
        const trimmed = (value || "").trim();
        if (!trimmed) return "Please select the position you are applying for.";
        return "";
      }
      case "experience": {
        const trimmed = (value || "").trim();
        if (!trimmed) return "Please select your years of relevant experience.";
        return "";
      }
      case "coverLetter": {
        const trimmed = (value || "").trim();
        if (!trimmed) return "Cover letter / application message is required.";
        if (trimmed.length < 20) return `Cover letter must be at least 20 characters (${trimmed.length}/20 written).`;
        return "";
      }
      case "portfolio": {
        const trimmed = (value || "").trim();
        if (!trimmed) return ""; // Optional field
        const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/i;
        if (!urlPattern.test(trimmed)) return "Please enter a valid website or profile URL (e.g., https://linkedin.com/in/username).";
        return "";
      }
      case "resume": {
        if (!file) return "Resume / CV upload is required (.pdf, .doc, or .docx).";
        const allowedExtensions = [".pdf", ".doc", ".docx"];
        const ext = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
        if (!allowedExtensions.includes(ext)) {
          return "Invalid file type. Only PDF (.pdf), DOC (.doc), and DOCX (.docx) files are allowed.";
        }
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
          return `File size exceeds the 10MB limit (uploaded: ${(file.size / (1024 * 1024)).toFixed(1)}MB).`;
        }
        return "";
      }
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
    if (formAlert) setFormAlert(null);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleFileChange = (file) => {
    if (!file) return;
    setTouched((prev) => ({ ...prev, resume: true }));
    const error = validateField("resume", null, file);
    if (error) {
      setErrors((prev) => ({ ...prev, resume: error }));
      setResumeFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setErrors((prev) => ({ ...prev, resume: "" }));
    setResumeFile(file);
    if (formAlert) setFormAlert(null);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const removeFile = () => {
    setResumeFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (touched.resume) {
      setErrors((prev) => ({ ...prev, resume: "Resume / CV upload is required (.pdf, .doc, or .docx)." }));
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  // Scroll smoothly to first invalid input on submit
  const scrollToFirstError = (currentErrors) => {
    const fieldOrder = ["name", "email", "phone", "position", "experience", "portfolio", "coverLetter", "resume"];
    for (const field of fieldOrder) {
      if (currentErrors[field]) {
        if (field === "resume") {
          const el = document.getElementById("resume-upload-zone") || fileInputRef.current;
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
            return;
          }
        } else {
          const el = document.querySelector(`[name="${field}"]`);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
            el.focus();
            return;
          }
        }
      }
    }
    errorBannerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  // OTP Digits input handling
  const handleOtpChange = (index, value) => {
    const cleaned = value.replace(/\D/g, "");
    if (!cleaned) {
      const newDigits = [...otpDigits];
      newDigits[index] = "";
      setOtpDigits(newDigits);
      return;
    }

    const digit = cleaned.slice(-1);
    const newDigits = [...otpDigits];
    newDigits[index] = digit;
    setOtpDigits(newDigits);
    setOtpError("");

    if (index < 5 && digit) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleVerifyAndSubmit();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;

    const newDigits = [...otpDigits];
    for (let i = 0; i < 6; i++) {
      newDigits[i] = pasted[i] || "";
    }
    setOtpDigits(newDigits);
    setOtpError("");

    const nextIndex = Math.min(pasted.length, 5);
    otpInputRefs.current[nextIndex]?.focus();
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0 || resendingOtp) return;
    try {
      setResendingOtp(true);
      setOtpError("");
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email.trim().toLowerCase(),
          purpose: "application",
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to resend verification code.");
      }
      setResendCooldown(30);
      setOtpDigits(["", "", "", "", "", ""]);
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 50);
    } catch (err) {
      setOtpError(err.message || "Failed to resend verification code. Please try again.");
    } finally {
      setResendingOtp(false);
    }
  };

  const handleCloseModal = () => {
    if (verifyingOtp) return;
    setShowOtpModal(false);
    setOtpError("");
  };

  const handleEditEmail = () => {
    if (verifyingOtp) return;
    setShowOtpModal(false);
    setOtpError("");
    setTimeout(() => {
      const emailInput = document.querySelector('input[name="email"]');
      if (emailInput) {
        emailInput.scrollIntoView({ behavior: "smooth", block: "center" });
        emailInput.focus();
      }
    }, 150);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormAlert(null);

    // Validate ALL fields on submission
    const currentErrors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      phone: validateField("phone", formData.phone),
      position: validateField("position", formData.position),
      experience: validateField("experience", formData.experience),
      portfolio: validateField("portfolio", formData.portfolio),
      coverLetter: validateField("coverLetter", formData.coverLetter),
      resume: validateField("resume", null, resumeFile),
    };

    // Mark all as touched
    setTouched({
      name: true,
      email: true,
      phone: true,
      position: true,
      experience: true,
      portfolio: true,
      coverLetter: true,
      resume: true,
    });
    setErrors(currentErrors);

    const hasErrors = Object.values(currentErrors).some((err) => Boolean(err));
    if (hasErrors) {
      setFormAlert({
        type: "error",
        message: "Please correct the highlighted fields before submitting your application.",
      });
      scrollToFirstError(currentErrors);
      return;
    }

    // First validate and dispatch verification OTP to applicant's email
    try {
      setSendingOtp(true);
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email.trim().toLowerCase(),
          purpose: "application",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to dispatch verification code. Please try again.");
      }

      // Open OTP Verification Modal
      setOtpDigits(["", "", "", "", "", ""]);
      setOtpError("");
      setResendCooldown(30);
      setShowOtpModal(true);
    } catch (err) {
      console.error("OTP dispatch error:", err);
      setFormAlert({
        type: "error",
        message: err.message || "Failed to send verification code. Please check your email address and try again.",
      });
      errorBannerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    } finally {
      setSendingOtp(false);
    }
  };

  const handleVerifyAndSubmit = async () => {
    const code = otpDigits.join("").trim();
    if (code.length !== 6) {
      setOtpError("Please enter the complete 6-digit verification code.");
      return;
    }

    try {
      setVerifyingOtp(true);
      setOtpError("");

      // 1. Verify OTP with backend
      const verifyRes = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email.trim().toLowerCase(),
          otp: code,
        }),
      });

      const verifyData = await verifyRes.json();
      if (!verifyRes.ok) {
        throw new Error(verifyData.error || "Invalid verification code. Please check and try again.");
      }

      // 2. OTP is verified! Now submit complete application data with CV
      const data = new FormData();
      data.append("name", formData.name.trim());
      data.append("email", formData.email.trim().toLowerCase());
      data.append("phone", formData.phone.trim());
      data.append("position", formData.position.trim());
      data.append("experience", formData.experience.trim());
      data.append("portfolio", formData.portfolio.trim());
      data.append("coverLetter", formData.coverLetter.trim());
      data.append("resume", resumeFile);

      const appRes = await fetch("/api/applications", {
        method: "POST",
        body: data,
      });

      const appResult = await appRes.json();
      if (!appRes.ok) {
        throw new Error(appResult.error || "Failed to submit application after verification. Please try again.");
      }

      // 3. Close modal & show success celebration
      setShowOtpModal(false);
      setSuccessData({
        name: formData.name,
        email: formData.email,
        position: formData.position,
        id: appResult.entry?.id || appResult.entry?._id,
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        position: "",
        experience: "",
        portfolio: "",
        coverLetter: "",
      });
      setResumeFile(null);
      setErrors({});
      setTouched({});
      if (fileInputRef.current) fileInputRef.current.value = "";
      if (onResetPosition) onResetPosition();
    } catch (err) {
      console.error("Verification and submission error:", err);
      setOtpError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setVerifyingOtp(false);
    }
  };

  return (
    <section id="application-form" ref={formRef} className="py-20 bg-white relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-[#36963D]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1000px] mx-auto px-5 sm:px-8 md:px-10">
        {/* Section Header */}
        <div className="text-center max-w-[700px] mx-auto mb-14">
          <div 
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#36963D]/10 border border-[#36963D]/30 text-[#36963D] font-mono text-xs uppercase tracking-widest font-bold mb-4"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            <span>JOIN OUR TALENT ROSTER</span>
          </div>

          <h2 
            className="text-3xl sm:text-4xl md:text-[40px] font-black tracking-tight text-[#0D0F12] mb-4 leading-tight"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            Submit Your <span className="text-[#36963D]">Application</span>
          </h2>

          <p 
            className="text-[#475569] text-base sm:text-lg leading-relaxed font-normal"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Take the first step toward your next big career milestone. Complete the required details, upload your CV/resume, and our recruitment team will review your application.
          </p>
        </div>

        {/* Success State View */}
        {successData ? (
          <div className="bg-[#FFFFFF] border-2 border-[#36963D]/40 rounded-3xl p-8 sm:p-12 shadow-xl text-center max-w-[650px] mx-auto animate-in fade-in-50 duration-500">
            <div className="w-18 h-18 bg-[#36963D]/10 text-[#36963D] rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-[#0D0F12] mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Application Successfully Submitted!
            </h3>

            <p className="text-[#475569] text-base leading-relaxed mb-6">
              Thank you, <strong className="text-[#0D0F12]">{successData.name}</strong>! We have received your application for the position of <strong className="text-[#36963D]">{successData.position}</strong>.
            </p>

            <div className="bg-[#F8FAFC] border border-gray-200 rounded-2xl p-5 mb-8 text-left text-sm text-[#475569] space-y-2">
              <p>• A confirmation record has been registered with our recruitment team.</p>
              <p>• Our talent acquisition team reviews every profile thoroughly.</p>
              <p>• You will receive status updates directly at <strong className="text-[#0D0F12]">{successData.email}</strong>.</p>
            </div>

            <button
              onClick={() => setSuccessData(null)}
              className="bg-[#36963D] hover:bg-[#2e8234] text-white px-8 py-3.5 rounded-full font-bold text-sm sm:text-base transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
            >
              Submit Another Application
            </button>
          </div>
        ) : (
          /* Application Form - Direct Clean & Minimal Layout */
          <div className="w-full max-w-[880px] mx-auto">
            {/* Form Alert Banner */}
            {formAlert && (
              <div 
                ref={errorBannerRef} 
                className="mb-8 p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start justify-between gap-3 text-red-700 text-sm animate-in fade-in-50 duration-200"
              >
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-5 h-5 shrink-0 text-red-600 mt-0.5" />
                  <div>
                    <p className="font-bold text-red-800">Incomplete or Invalid Submission</p>
                    <p className="text-xs text-red-600 mt-0.5">{formAlert.message}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setFormAlert(null)}
                  className="text-red-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                  title="Dismiss alert"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Row 1: Full Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. Full Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0D0F12] mb-2">
                    Full Name <span className="text-red-500 font-bold">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="e.g. Alexander Brooks"
                      className={`w-full bg-[#F8FAFC] border ${
                        touched.name && errors.name
                          ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-400"
                          : "border-gray-200 focus:border-[#36963D] focus:bg-white"
                      } rounded-xl pl-10 pr-4 py-3 text-sm text-[#0D0F12] placeholder-gray-400 outline-none transition-all`}
                    />
                  </div>
                  {touched.name && errors.name && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1 font-medium animate-in fade-in-50 duration-200">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* 2. Email Address */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0D0F12] mb-2">
                    Email Address <span className="text-red-500 font-bold">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="e.g. alexander@example.com"
                      className={`w-full bg-[#F8FAFC] border ${
                        touched.email && errors.email
                          ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-400"
                          : "border-gray-200 focus:border-[#36963D] focus:bg-white"
                      } rounded-xl pl-10 pr-4 py-3 text-sm text-[#0D0F12] placeholder-gray-400 outline-none transition-all`}
                    />
                  </div>
                  {touched.email && errors.email && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1 font-medium animate-in fade-in-50 duration-200">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: Phone Number & Position Applying For */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 3. Phone Number */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0D0F12] mb-2">
                    Phone Number <span className="text-red-500 font-bold">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="e.g. +971 50 123 4567"
                      className={`w-full bg-[#F8FAFC] border ${
                        touched.phone && errors.phone
                          ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-400"
                          : "border-gray-200 focus:border-[#36963D] focus:bg-white"
                      } rounded-xl pl-10 pr-4 py-3 text-sm text-[#0D0F12] placeholder-gray-400 outline-none transition-all`}
                    />
                  </div>
                  {touched.phone && errors.phone && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1 font-medium animate-in fade-in-50 duration-200">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>

                {/* 4. Position Applying For */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0D0F12] mb-2">
                    Position Applying For <span className="text-red-500 font-bold">*</span>
                  </label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full bg-[#F8FAFC] border ${
                        touched.position && errors.position
                          ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-400"
                          : "border-gray-200 focus:border-[#36963D] focus:bg-white"
                      } rounded-xl pl-10 pr-4 py-3 text-sm text-[#0D0F12] outline-none transition-all cursor-pointer`}
                    >
                      <option value="" disabled>Select an available position...</option>
                      {availableRoles.map((role, rIdx) => (
                        <option key={rIdx} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </div>
                  {touched.position && errors.position && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1 font-medium animate-in fade-in-50 duration-200">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.position}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Row 3: Years of Experience & Portfolio/LinkedIn */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 5. Relevant Experience */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0D0F12] mb-2">
                    Relevant Experience <span className="text-red-500 font-bold">*</span>
                  </label>
                  <div className="relative">
                    <Award className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full bg-[#F8FAFC] border ${
                        touched.experience && errors.experience
                          ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-400"
                          : "border-gray-200 focus:border-[#36963D] focus:bg-white"
                      } rounded-xl pl-10 pr-4 py-3 text-sm text-[#0D0F12] outline-none transition-all cursor-pointer`}
                    >
                      <option value="" disabled>Select your experience level...</option>
                      {experienceOptions.map((opt, idx) => (
                        <option key={idx} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                  {touched.experience && errors.experience && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1 font-medium animate-in fade-in-50 duration-200">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.experience}</span>
                    </p>
                  )}
                </div>

                {/* 6. Portfolio / LinkedIn (Optional) */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0D0F12] mb-2">
                    Portfolio / Website / LinkedIn <span className="text-gray-400 text-[11px] font-normal lowercase">(optional)</span>
                  </label>
                  <div className="relative">
                    <Globe className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="url"
                      name="portfolio"
                      value={formData.portfolio}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="https://linkedin.com/in/username or yoursite.com"
                      className={`w-full bg-[#F8FAFC] border ${
                        touched.portfolio && errors.portfolio
                          ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-400"
                          : "border-gray-200 focus:border-[#36963D] focus:bg-white"
                      } rounded-xl pl-10 pr-4 py-3 text-sm text-[#0D0F12] placeholder-gray-400 outline-none transition-all`}
                    />
                  </div>
                  {touched.portfolio && errors.portfolio && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1 font-medium animate-in fade-in-50 duration-200">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.portfolio}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* 7. Cover Letter / Application Message */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0D0F12]">
                    Cover Letter / Application Message <span className="text-red-500 font-bold">*</span>
                  </label>
                  <span className={`text-[11px] font-medium transition-colors ${
                    formData.coverLetter.trim().length >= 20 ? "text-emerald-600 font-bold" : "text-gray-400"
                  }`}>
                    {formData.coverLetter.trim().length} / 20 min chars
                  </span>
                </div>
                <textarea
                  name="coverLetter"
                  rows={4}
                  value={formData.coverLetter}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Share a brief overview of your background, key technical achievements, and why you are excited to join Tech Solutionor (minimum 20 characters)..."
                  className={`w-full bg-[#F8FAFC] border ${
                    touched.coverLetter && errors.coverLetter
                      ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-400"
                      : "border-gray-200 focus:border-[#36963D] focus:bg-white"
                  } rounded-xl p-4 text-sm text-[#0D0F12] placeholder-gray-400 outline-none transition-all resize-y`}
                />
                {touched.coverLetter && errors.coverLetter && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1 font-medium animate-in fade-in-50 duration-200">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.coverLetter}</span>
                  </p>
                )}
              </div>

              {/* 8. Resume / CV Upload Box */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0D0F12] mb-2">
                  Resume / CV Upload <span className="text-red-500 font-bold">*</span>
                </label>

                {resumeFile ? (
                  /* Attached Valid File Card */
                  <div className="bg-emerald-50/80 border border-emerald-300 rounded-2xl p-4 flex items-center justify-between shadow-2xs">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-[#36963D] text-white flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-[#0D0F12] truncate">{resumeFile.name}</p>
                        <p className="text-xs text-emerald-700 font-medium">
                          {formatFileSize(resumeFile.size)} &bull; Ready for submission
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-white transition-colors cursor-pointer shrink-0 ml-3"
                      title="Remove file"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  /* Drag & Drop Upload Zone */
                  <div
                    id="resume-upload-zone"
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 ${
                      touched.resume && errors.resume
                        ? "border-red-400 bg-red-50/30"
                        : dragActive
                        ? "border-[#36963D] bg-emerald-50/50 scale-[1.01]"
                        : "border-gray-300 hover:border-[#36963D] bg-[#F8FAFC]"
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleFileChange(e.target.files[0]);
                        }
                      }}
                      className="hidden"
                    />

                    <div className={`w-14 h-14 ${
                      touched.resume && errors.resume ? "bg-red-100 text-red-600" : "bg-[#36963D]/10 text-[#36963D]"
                    } rounded-2xl flex items-center justify-center mx-auto mb-3 transition-colors`}>
                      <UploadCloud className="w-7 h-7" />
                    </div>

                    <p className="text-sm font-bold text-[#0D0F12] mb-1">
                      Click to upload your CV, or drag & drop here
                    </p>
                    <p className="text-xs text-[#64748B]">
                      Supported formats: <strong className="text-gray-700">PDF, DOC, DOCX</strong> (Max size: 10MB)
                    </p>
                  </div>
                )}

                {touched.resume && errors.resume && (
                  <p className="text-red-500 text-xs mt-2 flex items-center gap-1 font-medium animate-in fade-in-50 duration-200">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errors.resume}</span>
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={sendingOtp}
                  className="w-full bg-[#36963D] hover:bg-[#2e8234] disabled:opacity-70 text-white py-4 rounded-full font-bold text-base transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2.5"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {sendingOtp ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending Verification Code to Email...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Application</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-[#64748B] mt-4">
                  <span className="text-red-500 font-bold">*</span> Indicates a required field. By submitting your application, you agree that Tech Solutionor may process your personal data for recruitment purposes.
                </p>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* OTP Verification Modal Overlay */}
      {showOtpModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCloseModal();
          }}
        >
          <div 
            className="bg-white rounded-3xl p-6 sm:p-9 max-w-[500px] w-full shadow-2xl border border-gray-100 relative animate-in zoom-in-95 duration-200"
            role="dialog"
            aria-modal="true"
            aria-labelledby="otp-modal-title"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={handleCloseModal}
              disabled={verifyingOtp}
              className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50"
              title="Close and return to form"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Icon */}
            <div className="w-16 h-16 rounded-2xl bg-[#36963D]/10 border border-[#36963D]/20 text-[#36963D] flex items-center justify-center mx-auto mb-4 shadow-xs">
              <ShieldCheck className="w-8 h-8" />
            </div>

            {/* Modal Title */}
            <h3 
              id="otp-modal-title"
              className="text-2xl font-black text-[#0D0F12] text-center mb-2"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Verify Your Email
            </h3>

            {/* Subtitle / Email Address Pill */}
            <p className="text-sm text-gray-600 text-center mb-1 leading-relaxed">
              We&apos;ve sent a 6-digit verification code to:
            </p>
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="font-bold text-[#0D0F12] text-sm bg-gray-100 px-3 py-1 rounded-full truncate max-w-[280px]">
                {formData.email}
              </span>
              <button
                type="button"
                onClick={handleEditEmail}
                disabled={verifyingOtp}
                className="text-xs font-semibold text-[#36963D] hover:underline inline-flex items-center gap-1 cursor-pointer disabled:opacity-50"
                title="Change email address"
              >
                <Edit2 className="w-3 h-3" />
                <span>Edit</span>
              </button>
            </div>

            {/* 6-Digit OTP Inputs */}
            <div className="mb-4">
              <label className="block text-center text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                Enter 6-Digit Code
              </label>
              <div className="flex justify-center items-center gap-2 sm:gap-2.5" onPaste={handleOtpPaste}>
                {otpDigits.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => (otpInputRefs.current[idx] = el)}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    disabled={verifyingOtp}
                    className={`w-11 sm:w-12 h-13 sm:h-14 text-2xl font-black text-center font-mono rounded-xl border ${
                      otpError
                        ? "border-red-400 bg-red-50/30 text-red-700"
                        : digit
                        ? "border-[#36963D] bg-emerald-50/30 text-[#0D0F12]"
                        : "border-gray-300 bg-[#F8FAFC] text-[#0D0F12]"
                    } focus:border-[#36963D] focus:ring-2 focus:ring-[#36963D]/20 focus:bg-white outline-none transition-all disabled:opacity-50`}
                  />
                ))}
              </div>
            </div>

            {/* Error Message Box */}
            {otpError && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2 text-xs text-red-600 animate-in fade-in-50 duration-200">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
                <span className="font-medium">{otpError}</span>
              </div>
            )}

            {/* Resend Cooldown Section */}
            <div className="flex items-center justify-between text-xs text-gray-500 mb-6 px-1">
              <span>Didn&apos;t receive code?</span>
              {resendCooldown > 0 ? (
                <span className="font-semibold text-gray-400">
                  Resend in <strong className="text-gray-700">{resendCooldown}s</strong>
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={resendingOtp || verifyingOtp}
                  className="font-bold text-[#36963D] hover:text-[#2e8234] hover:underline inline-flex items-center gap-1 cursor-pointer disabled:opacity-50"
                >
                  {resendingOtp ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>Resend Code</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={handleVerifyAndSubmit}
                disabled={verifyingOtp || otpDigits.some((d) => !d)}
                className="w-full bg-[#36963D] hover:bg-[#2e8234] disabled:opacity-50 text-white py-3.5 rounded-full font-bold text-sm sm:text-base transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {verifyingOtp ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying Code & Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Verify & Submit Application</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleCloseModal}
                disabled={verifyingOtp}
                className="w-full py-2.5 text-xs font-semibold text-gray-500 hover:text-gray-800 transition-colors cursor-pointer disabled:opacity-50"
              >
                Cancel and return to form
              </button>
            </div>

            <p className="text-[11px] text-gray-400 text-center mt-4">
              Security code expires in 10 minutes. Please check your Spam or Junk folder if you do not see it in your inbox.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
