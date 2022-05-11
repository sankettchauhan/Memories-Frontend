import { useNavigate } from "react-router-dom";
import { saveUser } from "../util/localStorage.util";
import bg from "../images/bg.jpg";
import { useEffect, useState } from "react";
import { login, register, verify } from "../axios/requests.axios";

export default function Login() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    login: false,
    signup: true,
    otp: false,
  });
  const [user, setUser] = useState({
    name: "",
    phone: "",
    otp: "",
    userId: "",
  });
  const [snack, setSnack] = useState({
    show: false,
    message: null,
    type: null,
  });

  console.log(state);
  console.log(user);

  const showLogin = () => setState({ ...state, login: true, signup: false });
  const showSignup = () => setState({ ...state, login: false, signup: true });
  const showOTP = () => setState({ ...state, otp: true });

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const resLogin = await login({ phone: user.phone });
      const {
        data: {
          data: { userId },
          message: messageSent,
        },
      } = resLogin;
      setUser((state) => ({ ...state, userId }));
      console.log(messageSent);
      showOTP();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const resSignup = await register({
      name: user.name,
      phone: user.phone,
    });
    const {
      data: {
        data: { userId },
        message: messageSent,
      },
    } = resSignup;
    setUser((user) => ({ ...user, userId }));
    console.log(messageSent);
    showOTP();
  };

  const handleSubmit = (e) => (state.login ? handleLogin(e) : handleSignup(e));

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const resVerify = await verify({ userId: user.userId, otp: user.otp });
      const {
        data: {
          data: { token },
        },
        message: messageVerify,
      } = resVerify;
      console.log(messageVerify);
      if (token) {
        saveUser(token);
        navigate("/");
      }
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setUser((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  return (
    <div
      className={`h-screen w-screen relative grid place-content-center text-white`}
    >
      {snack.show && <div>{snack.message}</div>}
      <img
        src={bg}
        alt="library"
        className="absolute -z-10 h-screen w-screen object-cover"
      />
      <div className="z-10 glass-card px-16 py-20">
        {state.login ? (
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
          </>
        ) : (
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
          </>
        )}

        {state.otp && (
          <input
            className="rounded-md px-5 py-4 text-black text-2xl"
            type="text"
            placeholder="Enter OTP"
            maxLength="6"
            name="otp"
            value={user.otp}
            onChange={handleChange}
          />
        )}

        {state.login ? (
          <>
            <p>
              Don't have an account
              <span onClick={showSignup}>Register here</span>
            </p>
          </>
        ) : (
          <>
            <p>
              Already have an account
              <span onClick={showLogin}>Login here</span>
            </p>
          </>
        )}

        {state.otp ? (
          <button
            className="bg-white text-black uppercase w-[fit-content] px-4 py-1 rounded-md"
            onClick={handleVerify}
          >
            Verify OTP
          </button>
        ) : (
          <button
            className="bg-white text-black uppercase w-[fit-content] px-4 py-1 rounded-md"
            onClick={handleSubmit}
          >
            Send OTP
          </button>
        )}
      </div>
    </div>
  );
}
