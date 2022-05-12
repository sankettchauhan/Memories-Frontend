import OTPInput from "./OTPInput";

export default function Login({
  user,
  handleChange,
  showSignup,
  otp,
  inputClasses,
}) {
  return (
    <>
      <h1 className="text-4xl mb-8 font-bold leading-[0.8]">
        Login to <span className="font-[gt-super]">Memories</span>
      </h1>
      <div className="flex flex-col">
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
        Don't have an account?&nbsp;
        <span onClick={showSignup} className="underline">
          Register here
        </span>
      </p>
    </>
  );
}
