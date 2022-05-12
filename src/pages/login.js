import { useNavigate } from "react-router-dom";
import { saveUser } from "../util/localStorage.util";
import bg from "../images/bg.jpg";
import { useState } from "react";
import { login, register, verify } from "../axios/requests.axios";
import Signup from "../components/Signup";
import Login from "../components/Login";
import OTP from "../components/OTP";
import Snack from "../components/Snack";

export default function LoginPage() {
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
    message: "",
    type: "",
  });

  console.log(state);
  console.log(user);

  const showLogin = () => setState({ ...state, login: true, signup: false });
  const showSignup = () => setState({ ...state, login: false, signup: true });
  const showOTP = () => setState({ ...state, otp: true });

  const handleErorr = (error) =>
    setSnack({
      show: true,
      message: "Something went wrong. Please try again.",
      type: "error",
    });

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
    try {
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
    } catch (err) {
      console.log(err);
      handleErorr();
    }
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
      handleErorr();
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setUser((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const inputClasses = "rounded-md px-5 py-2 text-black text-2xl mb-2";

  return (
    <div
      className={`h-screen w-screen relative grid place-content-center text-white relative`}
    >
      {<Snack {...snack} setSnack={setSnack} classes="top-[50px]" />}
      <img
        src={bg}
        alt="library"
        className="absolute -z-10 h-screen w-screen object-cover"
      />
      <div className="z-10 glass-card px-4 md:px-16 py-16 md:py-20 w-[350px] md:w-auto">
        {state.login ? (
          <Login
            user={user}
            handleChange={handleChange}
            otp={state.otp}
            showSignup={showSignup}
            inputClasses={inputClasses}
          />
        ) : (
          <Signup
            user={user}
            handleChange={handleChange}
            otp={state.otp}
            showLogin={showLogin}
            inputClasses={inputClasses}
          />
        )}

        <OTP
          otp={state.otp}
          handleSubmit={handleSubmit}
          handleVerify={handleVerify}
        />
      </div>
    </div>
  );
}
