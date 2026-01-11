import React, { useState } from "react";
import { registerAPI, loginAPI } from "../services/allApi";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Auth = () => {
  const [tab, setTab] = useState("login");
  const navigate = useNavigate();

  // LOGIN STATE
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // REGISTER STATE
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    cPassword: "",
    phone: "",
    location: "",
    gender: "",
    dob: "",
    bloodGroup: "",
    height: "",
    weight: "",
  });

  // AGE CALCULATION
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  // REGISTER
  const handleRegister = async () => {
    const {
      username,
      email,
      password,
      cPassword,
      phone,
      location,
      gender,
      dob,
      bloodGroup,
      height,
      weight,
    } = registerData;

    if (
      !username ||
      !email ||
      !password ||
      !cPassword ||
      !phone ||
      !location ||
      !gender ||
      !dob ||
      !bloodGroup ||
      !height ||
      !weight
    ) {
      toast.warning("Please fill all required fields");
      return;
    }

    if (password !== cPassword) {
      toast.warning("Passwords do not match");
      return;
    }

    const age = calculateAge(dob);
    if (age < 18) {
      toast.warning("You must be at least 18 years old to register");
      return;
    }

    const result = await registerAPI(registerData);

    if (result?.status === 200) {
      toast.success("Registration successful");
      setRegisterData({
        username: "",
        email: "",
        password: "",
        cPassword: "",
        phone: "",
        location: "",
        gender: "",
        dob: "",
        bloodGroup: "",
        height: "",
        weight: "",
      });
      setTab("login");
    } else {
      toast.error(result?.data || "Registration failed");
    }
  };

  // LOGIN
  const handleLogin = async () => {
    const { email, password } = loginData;

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    const result = await loginAPI({ email, password });

    if (result?.status === 200) {
      toast.success("Login successful");

      sessionStorage.setItem("token", result.data.token);
      sessionStorage.setItem("user", JSON.stringify(result.data.user));

      if (result.data.user.role === "admin") {
        navigate("/admin-home");
      } else {
        navigate("/");
      }
    } else {
      toast.error(result?.data || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-200 flex flex-col justify-center">
      {/* LOGIN */}
      {tab === "login" && (
        <div className="flex justify-center items-center py-20">
          <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-black">
            <h2 className="text-3xl font-bold text-center mb-6">
              Welcome Back
            </h2>

            <div className="flex flex-col gap-5">
              <input
                type="email"
                placeholder="Email"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                className="p-3 border border-black rounded-lg"
              />

              <input
                type="password"
                placeholder="Password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                className="p-3 border border-black rounded-lg"
              />

              <button
                onClick={handleLogin}
                className="w-full bg-red-500 py-3 rounded-lg font-semibold"
              >
                Login
              </button>
            </div>

            <p className="text-center mt-5 text-sm">
              New here?{" "}
              <button
                onClick={() => setTab("register")}
                className="text-red-600 hover:underline"
              >
                Become a Donor
              </button>
            </p>
          </div>
        </div>
      )}

      {/* REGISTER */}
      {tab === "register" && (
        <div className="container mx-auto px-6 py-14">
          <div className="bg-white p-10 rounded-2xl border border-black">
            <h2 className="text-3xl font-semibold mb-10 text-center">
              Become a Donor
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                placeholder="Full Name"
                value={registerData.username}
                onChange={(e) =>
                  setRegisterData({ ...registerData, username: e.target.value })
                }
                className="p-3 border border-black rounded"
              />

              <input
                placeholder="Email"
                value={registerData.email}
                onChange={(e) =>
                  setRegisterData({ ...registerData, email: e.target.value })
                }
                className="p-3 border border-black rounded"
              />

              <input
                type="password"
                placeholder="Password"
                value={registerData.password}
                onChange={(e) =>
                  setRegisterData({ ...registerData, password: e.target.value })
                }
                className="p-3 border border-black rounded"
              />

              <input
                type="password"
                placeholder="Confirm Password"
                value={registerData.cPassword}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    cPassword: e.target.value,
                  })
                }
                className="p-3 border border-black rounded"
              />

              <input
                placeholder="Phone"
                value={registerData.phone}
                onChange={(e) =>
                  setRegisterData({ ...registerData, phone: e.target.value })
                }
                className="p-3 border border-black rounded"
              />

              <input
                placeholder="Location"
                value={registerData.location}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    location: e.target.value,
                  })
                }
                className="p-3 border border-black rounded"
              />

              <select
                value={registerData.gender}
                onChange={(e) =>
                  setRegisterData({ ...registerData, gender: e.target.value })
                }
                className="p-3 border border-black rounded"
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>

              <input
                type="date"
                value={registerData.dob}
                onChange={(e) =>
                  setRegisterData({ ...registerData, dob: e.target.value })
                }
                className="p-3 border border-black rounded"
              />

              <select
                value={registerData.bloodGroup}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    bloodGroup: e.target.value,
                  })
                }
                className="p-3 border border-black rounded"
              >
                <option value="">Select Blood Group</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>O+</option>
                <option>O-</option>
                <option>AB+</option>
                <option>AB-</option>
              </select>

              <input
                type="number"
                placeholder="Height (cm)"
                value={registerData.height}
                onChange={(e) =>
                  setRegisterData({ ...registerData, height: e.target.value })
                }
                className="p-3 border border-black rounded"
              />

              <input
                type="number"
                placeholder="Weight (kg)"
                value={registerData.weight}
                onChange={(e) =>
                  setRegisterData({ ...registerData, weight: e.target.value })
                }
                className="p-3 border border-black rounded"
              />
            </div>

            <div className="mt-10 flex justify-center">
              <button
                onClick={handleRegister}
                className="px-10 py-3 bg-red-500 rounded-lg font-semibold"
              >
                Register
              </button>
            </div>

            <p className="text-center mt-5 text-sm">
              Already a Donor?{" "}
              <button
                onClick={() => setTab("login")}
                className="text-red-600 hover:underline"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      )}

      <ToastContainer theme="colored" position="top-center" autoClose={2000} />
    </div>
  );
};

export default Auth;
