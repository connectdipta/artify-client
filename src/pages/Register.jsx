import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase"; // Assuming this is ../firebase.js
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { FiUser, FiImage, FiMail, FiLock } from "react-icons/fi";

const Register = () => {
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // All your functions are perfect and remain unchanged
  const validatePassword = (pwd) => {
    return /[A-Z]/.test(pwd) && /[a-z]/.test(pwd) && pwd.length >= 6;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      Swal.fire(
        "Invalid Password",
        "Must be 6+ characters with uppercase and lowercase letters.",
        "error"
      );
      return;
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photoURL || null,
      });
      Swal.fire("Success!", "Account created successfully", "success");
      navigate("/");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      Swal.fire("Success!", "Signed up with Google", "success");
      navigate("/");
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
        
        {/* === Branding Column with Your Image === */}
        <div 
          className="hidden md:flex relative flex-col items-center justify-center p-12 text-neutral-content text-center bg-cover bg-center"
          // This is your requested image
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
            <h3 className="text-2xl font-semibold mb-2">Welcome, Artist!</h3>
            <p className="text-neutral-content/80">
              Join our vibrant community to share, discover, and celebrate
              creativity.
            </p>
          </div>
        </div>

        {/* === Form Column === */}
        <div className="card-body p-8 md:p-12">
          <h2 className="text-3xl font-bold text-center mb-6">Create Your Account</h2>
          <form onSubmit={handleRegister} className="space-y-4">
            
            <label className="input input-bordered input-primary flex items-center gap-2">
              <FiUser className="text-base-content/50" />
              <input
                type="text"
                placeholder="Name"
                className="grow"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>

            <label className="input input-bordered input-primary flex items-center gap-2">
              <FiImage className="text-base-content/50" />
              <input
                type="text"
                placeholder="Photo URL"
                className="grow"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
              />
            </label>

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
            
            <p className="text-xs text-base-content/60 -mt-2 pl-1">
              Must be 6+ characters with uppercase and lowercase letters.
            </p>

            <button type="submit" className="btn btn-primary w-full rounded-full" disabled={loading}>
              {loading ? <span className="loading loading-spinner"></span> : "Create Account"}
            </button>
          </form>

          <div className="divider my-4">OR</div>

          <button 
            onClick={handleGoogleSignup} 
            className="btn btn-outline w-full rounded-full" 
            disabled={loading}
          >
            <FcGoogle className="text-2xl" />
            {loading ? "Please wait..." : "Continue with Google"}
          </button>

          <p className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="link link-secondary font-bold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;