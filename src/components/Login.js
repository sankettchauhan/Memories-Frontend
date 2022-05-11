import OTPInput from "./OTPInput";

export default function Login({ user, handleChange, showSignup }) {
  return (
    <>
      <h1 className="text-4xl mb-8 font-bold leading-[0.8]">
        Login to <span className="font-[gt-super]">Memories</span>
      </h1>
      <input
        className="rounded-md px-5 py-4 text-black text-2xl"
        type="text"
        placeholder="Enter phone number"
        maxLength="10"
        name="phone"
        value={user.phone}
        onChange={handleChange}
      />
      {user.otp && <OTPInput user={user} handleChange={handleChange} />}

      <p>
        Don't have an account
        <span onClick={showSignup}>Register here</span>
      </p>
    </>
  );
}
