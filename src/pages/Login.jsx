import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase"; // Assuming this is ../firebase.js
import Swal from "sweetalert2";
// Import icons
import { FcGoogle } from "react-icons/fc";
import { FiMail, FiLock } from "react-icons/fi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // All your functions are perfect and remain unchanged
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Swal.fire("Success!", "Logged in successfully", "success");
      navigate(from, { replace: true });
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      Swal.fire("Success!", "Logged in with Google", "success");
      navigate(from, { replace: true });
    } catch (error) {
      if (error.code !== "auth/cancelled-popup-request") {
        Swal.fire("Error", error.message, "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-4xl bg-base-100 shadow-2xl grid md:grid-cols-2 overflow-hidden rounded-2xl">
        
        {/* === Branding Column (Same as Register page) === */}
        <div 
          className="hidden md:flex relative flex-col items-center justify-center p-12 text-neutral-content text-center bg-cover bg-center"
          style={{ backgroundImage: `url(https://i.pinimg.com/1200x/bd/3f/e7/bd3fe7f1f083633030d63e915894844d.jpg)` }}
        >
          {/* Dark Overlay for Readability */}
          <div className="absolute inset-0 bg-black/60"></div>
          
          {/* Content (on top of overlay) */}
          <div className="relative z-10">
            <Link
              to="/"
              className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4 drop-shadow-md"
            >
              Artify
            </Link>
            <h3 className="text-2xl font-semibold mb-2">Welcome Back!</h3>
            <p className="text-neutral-content/80">
              Sign in to continue your creative journey.
            </p>
          </div>
        </div>

        {/* === Form Column === */}
        <div className="card-body p-8 md:p-12">
          <h2 className="text-3xl font-bold text-center mb-6">Login to Your Account</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Email Input with Icon */}
            <label className="input input-bordered input-primary flex items-center gap-2">
              <FiMail className="text-base-content/50" />
              <input
                type="email"
                placeholder="Email"
                className="grow"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            {/* Password Input with Icon */}
            <label className="input input-bordered input-primary flex items-center gap-2">
              <FiLock className="text-base-content/50" />
              <input
                type="password"
                placeholder="Password"
                className="grow"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            
            <button type="submit" className="btn btn-primary w-full rounded-full" disabled={loading}>
              {loading ? <span className="loading loading-spinner"></span> : "Login"}
            </button>
          </form>

          <div className="divider my-4">OR</div>

          <button 
            onClick={handleGoogleLogin} 
            className="btn btn-outline w-full rounded-full" 
            disabled={loading}
          >
            <FcGoogle className="text-2xl" />
            {loading ? "Please wait..." : "Continue with Google"}
          </button>

          <p className="mt-6 text-center text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="link link-secondary font-bold">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;