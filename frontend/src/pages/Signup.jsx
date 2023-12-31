import { useEffect, useState } from "react";
// import gmail from "/assets/google-gmail.svg";
import arrow from "/assets/arroww.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";

function Signup() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const user = {
    email,
    password,
    phone,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    password == confirmPassword
      ? axios
          .post("https://medical-agency-api.vercel.app/signup", user)
          .then((response) => {
            setError(false);
            dispatch(login(response.data.user));
            setSuccess(response.data.message);
            const lastLocation = localStorage.getItem("lastLocation");
            setTimeout(() => {
              navigate(lastLocation || "/");
              localStorage.removeItem("lastLocation");
            }, 3000);
          })
          .catch((error) => setError(error.response.data.error))
      : setError("Password doesn't match!");
  };
  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="w-full bg-gray-50/40 grid place-items-center ">
      <section
        className="bg-cover lg:bg-center bg-right flex flex-col items-center lg:items-start justify-center md:pl-48  gap-2  bg-blend-overlay bg-black/20  bg-no-repeat
       bg-[url('/assets/signupBG.jpg')] h-[60vh] w-full">
        <motion.h1
          initial={{ x: "+200vw" }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5, ease: "linear" }}
          className="lg:text-cyan-950 text-white font-semibold text-5xl md:text-6xl ">
          Join Us
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: "linear" }}
          className="flex items-center gap-2">
          <img className="w-[1.2rem] rotate-90" src={arrow} alt="arrow" />
          <h1 className=" font-semibold text-xl lg:text-cyan-50 text-white bg-cyan-700 px-4  ">
            SIGN UP
          </h1>
        </motion.div>
      </section>
      <div className="grid gap-8 p-16 lg:my-10 bg-white w-full shadow-xl place-items-center md:w-[55%]   mx-auto border-2 border-gray-100 rounded ">
        <motion.h1
          initial={{ x: "+200vw" }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: "linear" }}
          className="text-blue-950 md:text-[2rem] text-3xl text-center">
          Welcome To <span className="text-purple-800">Viridis</span>{" "}
          Recruitment Agency!
        </motion.h1>
        <form className="py-4 flex flex-col items-center justify-center gap-8">
          <div className="flex flex-col gap-4 w-full ">
            <div className="flex flex-col gap-1">
              <label
                className="uppercase text-xs text-cyan-800"
                htmlFor="email">
                Email:
              </label>
              <input
                className="outline-none bg-purple-100 focus:shadow-lg p-2 text-xs border-[2px] rounded border-cyan-200 focus:border-cyan-300 caret-blue-400 pl-2 text-gray-500 w-full"
                type="text"
                placeholder="Your Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                className="uppercase text-xs text-cyan-800"
                htmlFor="password">
                Password:
              </label>
              <input
                className="text-xs p-2 outline-none bg-purple-100 focus:shadow-lg pl-2 border-[2px] rounded border-cyan-200 focus:border-cyan-300 caret-blue-400  text-gray-500 w-full"
                type="password"
                placeholder="Your Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                className="uppercase text-xs text-cyan-800"
                htmlFor="email">
                Confirm Password:
              </label>
              <input
                className="outline-none bg-purple-100 focus:shadow-lg p-2 text-xs border-[2px] rounded border-cyan-200 focus:border-cyan-300 caret-blue-400 pl-2 text-gray-500 w-full"
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="uppercase text-xs text-cyan-800" htmlFor="text">
                Phone:
              </label>
              <input
                className="text-xs p-2 outline-none bg-purple-100 focus:shadow-lg pl-2 border-[2px] rounded border-cyan-200 focus:border-cyan-300 caret-blue-400  text-gray-500 w-full"
                type="text"
                placeholder="Your Phone Number"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={handleSubmit}
              className="bg-purple-900 hover:shadow-lg hover:bg-purple-700 transition-colors duration-500 ease-linear rounded text-sm lg:text-[1rem] px-6 lg:px-12 py-2 text-white">
              SIGN UP
            </button>
            <button
              onClick={goToLogin}
              className="bg-white text-sm lg:text-[1rem] border-2 border-purple-950 hover:bg-black hover:text-white transition-colors duration-500 ease-linear rounded lg:px-10 px-6 py-2 text-purple-950">
              LOGIN
            </button>
          </div>
          {/* <div className="bg-cyan-50 w-fit py-3 px-16 border-2 hover:border-gray-300 rounded-sm  hover:bg-cyan-200/75 mx-auto cursor-pointer transition-colors duration-500 ease-linear">
            <button className="flex items-center gap-2 text-sm text-gray-700">
              <img className="w-[1rem]" src={gmail} alt="gmail" />
              Signup with Gmail
            </button>
          </div> */}
          {error && (
            <div className="bg-red-600 border-red-400 w-max text-sm text-white py-2 px-12 border-2  rounded-full  mx-auto ">
              <span> {error} </span>
            </div>
          )}
          {success && (
            <div className="bg-cyan-600 border-cyan-400 w-max text-sm text-white py-2 px-12 border-2  rounded-full  mx-auto ">
              <span> {success} </span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Signup;
