import OTPInput from "./OTPInput";

export default function Signup({ user, handleChange, otp, showLogin }) {
  return (
    <>
      <h1 className="text-4xl mb-8 font-bold leading-[0.8]">
        Register on <span className="font-[gt-super]">Memories</span>
      </h1>
      <input
        className="rounded-md px-5 py-4 text-black text-2xl"
        type="text"
        placeholder="Enter name"
        name="name"
        value={user.name}
        onChange={handleChange}
      />
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
        Already have an account
        <span onClick={showLogin}>Login here</span>
      </p>
    </>
  );
}
