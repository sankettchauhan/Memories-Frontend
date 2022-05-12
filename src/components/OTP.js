import React from "react";

export default function OTP({ otp, handleSubmit, handleVerify }) {
  if (!otp) {
    return (
      <button
        className="bg-white text-black uppercase w-[fit-content] px-4 py-1 rounded-md"
        onClick={handleSubmit}
      >
        Send OTP
      </button>
    );
  }
  return (
    <button
      className="bg-white text-black uppercase w-[fit-content] px-4 py-1 rounded-md"
      onClick={handleVerify}
    >
      Verify OTP
    </button>
  );
}
