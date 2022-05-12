import OTPInput from "./OTPInput";

export default function Signup({
  user,
  handleChange,
  showLogin,
  otp,
  inputClasses,
}) {
  return (
    <>
      <h1 className="text-4xl mb-8 font-bold leading-[0.8]">
        Register on{" "}
        <span className="text-4xl" style={{ fontFamily: "Water Brush" }}>
          Memories
        </span>
      </h1>
      <div className="flex flex-col">
        <input
          className={`${inputClasses}`}
          type="text"
          placeholder="Enter name"
          name="name"
          value={user.name}
          onChange={handleChange}
        />
        <input
          className={`${inputClasses}`}
          type="text"
          placeholder="Enter phone number"
          maxLength="10"
          name="phone"
          value={user.phone}
          onChange={handleChange}
        />
        {otp && (
          <OTPInput
            inputClasses={inputClasses}
            user={user}
            handleChange={handleChange}
          />
        )}
      </div>
      <p className="mb-2">
        Already have an account?&nbsp;
        <span onClick={showLogin} className="underline">
          Login here
        </span>
      </p>
    </>
  );
}
