"use client";

import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaLock, FaEnvelope, FaRedo } from 'react-icons/fa';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function BlogCommentForm({ blogId }) {
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [comment, setComment] = useState('');
  const [otp, setOtp] = useState('');

  const [step, setStep] = useState('input'); // 'input' | 'otp' | 'success'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  // Timer countdown for resend OTP
  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCooldown]);

  // Step 1: Send OTP to user's email
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');

    const trimmedName = authorName.trim();
    const trimmedEmail = authorEmail.trim().toLowerCase();
    const trimmedComment = comment.trim();

    if (!trimmedName) {
      setError('Please enter your name.');
      return;
    }

    if (!trimmedEmail) {
      setError('Please enter your email address.');
      return;
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setError('Please enter a valid email address (e.g. name@domain.com).');
      return;
    }

    if (!trimmedComment) {
      setError('Please write your comment.');
      return;
    }

    if (trimmedComment.length < 3) {
      setError('Comment must be at least 3 characters long.');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to send verification code.');
      }

      setStep('otp');
      setResendCooldown(30); // 30-second cooldown
      setError('');
    } catch (err) {
      setError(err.message || 'An error occurred while sending the verification code.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Resend OTP
  const handleResendOtp = async () => {
    if (resendCooldown > 0 || loading) return;
    setError('');
    const trimmedEmail = authorEmail.trim().toLowerCase();

    try {
      setLoading(true);
      const res = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to resend code.');
      }

      setResendCooldown(30);
    } catch (err) {
      setError(err.message || 'Failed to resend verification code.');
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Verify OTP & submit comment
  const handleVerifyAndSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const trimmedOtp = otp.trim();
    if (!trimmedOtp) {
      setError('Please enter the 6-digit verification code.');
      return;
    }

    if (trimmedOtp.length !== 6) {
      setError('Verification code must be exactly 6 digits.');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/blogs/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          blogId,
          authorName: authorName.trim(),
          authorEmail: authorEmail.trim().toLowerCase(),
          comment: comment.trim(),
          otp: trimmedOtp,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Verification failed. Please check the code and try again.');
      }

      setStep('success');
      setComment('');
      setOtp('');
      setError('');
    } catch (err) {
      setError(err.message || 'An error occurred while verifying your comment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50/80 border border-gray-100 rounded-2xl p-6 md:p-8 mt-10 shadow-xs">
      <h3 className="text-xl font-bold text-gray-900 mb-2">Leave a Reply</h3>
      <p className="text-xs text-gray-500 mb-6">
        Your email will be verified with an OTP code and will not be published. Required fields are marked *
      </p>

      {/* Success State */}
      {step === 'success' && (
        <div className="p-6 bg-green-50 border border-green-200 rounded-2xl text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-green-100 text-[#41b349] mx-auto flex items-center justify-center text-2xl">
            <FaCheckCircle />
          </div>
          <div>
            <h4 className="text-lg font-bold text-green-900">Comment Submitted!</h4>
            <p className="text-sm text-green-700 mt-1.5 leading-relaxed max-w-md mx-auto">
              Thank you! Your email <strong className="font-semibold">{authorEmail}</strong> has been successfully verified. Your comment has been submitted and will appear once approved by our moderation team.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setStep('input');
              setComment('');
              setOtp('');
            }}
            className="px-5 py-2 bg-[#41b349] hover:bg-black text-white text-xs font-semibold rounded-full transition-colors cursor-pointer"
          >
            Post Another Comment
          </button>
        </div>
      )}

      {/* Error Alert */}
      {error && step !== 'success' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs sm:text-sm flex items-start gap-2.5">
          <FaExclamationCircle className="text-red-500 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Step 1: Initial Comment Input Form */}
      {step === 'input' && (
        <form onSubmit={handleSendOtp} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="e.g. Alex Johnson"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-[#41b349] focus:ring-1 focus:ring-[#41b349] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={authorEmail}
                onChange={(e) => setAuthorEmail(e.target.value)}
                placeholder="alex@example.com"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-[#41b349] focus:ring-1 focus:ring-[#41b349] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Comment <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts, questions, or insights..."
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#41b349] focus:ring-1 focus:ring-[#41b349] transition-all resize-y"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-[#41b349] hover:bg-black text-white font-semibold text-sm rounded-full transition-all duration-200 shadow-sm cursor-pointer disabled:opacity-50 inline-flex items-center gap-2"
          >
            {loading ? (
              <span>Sending Code...</span>
            ) : (
              <>
                <FaEnvelope size={13} />
                <span>Post Comment</span>
              </>
            )}
          </button>
        </form>
      )}

      {/* Step 2: OTP Verification Step */}
      {step === 'otp' && (
        <form onSubmit={handleVerifyAndSubmit} className="space-y-5 bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#41b349] bg-[#41b349]/10 px-3 py-1 rounded-full mb-2">
                <FaLock size={10} /> Email Verification Required
              </span>
              <h4 className="text-base font-bold text-gray-900">Enter Verification Code</h4>
              <p className="text-xs text-gray-600 mt-1">
                We sent a 6-digit code to <strong className="text-gray-800">{authorEmail}</strong>
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setStep('input');
                setError('');
              }}
              className="text-xs text-[#41b349] hover:underline font-semibold cursor-pointer"
            >
              Change Email
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              6-Digit Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              maxLength={6}
              autoFocus
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
              placeholder="123456"
              className="w-full max-w-[200px] bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-center text-lg font-mono tracking-widest text-gray-900 outline-none focus:border-[#41b349] focus:bg-white transition-all"
            />
          </div>

          <div className="flex items-center gap-3 pt-1 flex-wrap">
            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="px-6 py-2.5 bg-[#41b349] hover:bg-black text-white font-semibold text-sm rounded-full transition-all duration-200 shadow-sm cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify & Submit Comment'}
            </button>

            <button
              type="button"
              disabled={resendCooldown > 0 || loading}
              onClick={handleResendOtp}
              className="text-xs font-medium text-gray-500 hover:text-[#41b349] transition-colors cursor-pointer disabled:opacity-50 inline-flex items-center gap-1.5 px-3 py-2"
            >
              <FaRedo size={11} />
              {resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : 'Resend Code'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
