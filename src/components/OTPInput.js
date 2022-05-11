export default function OTPInput({ user, handleChange }) {
  return (
    <input
      className="rounded-md px-5 py-4 text-black text-2xl"
      type="text"
      placeholder="Enter OTP"
      maxLength="6"
      name="otp"
      value={user.otp}
      onChange={handleChange}
    />
  );
}
