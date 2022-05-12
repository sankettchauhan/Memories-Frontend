export default function OTPInput({ user, handleChange, inputClasses }) {
  return (
    <input
      className={`${inputClasses}`}
      type="text"
      placeholder="Enter OTP"
      maxLength="6"
      name="otp"
      value={user.otp}
      onChange={handleChange}
    />
  );
}
