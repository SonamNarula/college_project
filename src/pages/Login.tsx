// src/pages/Login.tsx
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      if (isSignup) {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(cred.user, { displayName: name });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      setError(err.message.replace("Firebase: ", ""));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      setError(err.message.replace("Firebase: ", ""));
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)",
      padding: "1rem",
      fontFamily: "'Inter', sans-serif",
    }}>
      <div style={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "24px",
        padding: "2.5rem 2rem",
        width: "100%",
        maxWidth: "420px",
        display: "flex",
        flexDirection: "column",
        gap: "1.2rem",
        boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
      }}>

        {/* Brand */}
        <div style={{ textAlign: "center", marginBottom: "0.5rem" }}>
          <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>⚡</div>
          <h1 style={{
            fontSize: "2rem",
            fontWeight: "800",
            color: "#fff",
            margin: "0 0 0.3rem",
            letterSpacing: "-0.5px",
          }}>Trackify</h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", margin: 0 }}>
            Student Productivity & Placement Tracker
          </p>
        </div>

        {/* Toggle */}
        <div style={{
          display: "flex",
          background: "rgba(0,0,0,0.3)",
          borderRadius: "12px",
          padding: "4px",
          gap: "4px",
        }}>
          {["Login", "Sign Up"].map((label) => (
            <button
              key={label}
              onClick={() => { setIsSignup(label === "Sign Up"); setError(""); }}
              style={{
                flex: 1,
                padding: "0.6rem",
                border: "none",
                borderRadius: "8px",
                background: (label === "Sign Up") === isSignup
                  ? "linear-gradient(135deg, #6c63ff, #a855f7)"
                  : "transparent",
                color: (label === "Sign Up") === isSignup ? "#fff" : "rgba(255,255,255,0.5)",
                cursor: "pointer",
                fontWeight: (label === "Sign Up") === isSignup ? "700" : "400",
                fontSize: "0.9rem",
                transition: "all 0.2s",
              }}
            >{label}</button>
          ))}
        </div>

        {/* Fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {isSignup && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Password (min 6 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
        </div>

        {/* Error */}
        {error && (
          <div style={{
            color: "#f87171",
            fontSize: "0.82rem",
            background: "rgba(239,68,68,0.15)",
            padding: "0.6rem 0.75rem",
            borderRadius: "8px",
            border: "1px solid rgba(239,68,68,0.3)",
          }}>{error}</div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            padding: "0.9rem",
            background: loading
              ? "rgba(108,99,255,0.4)"
              : "linear-gradient(135deg, #6c63ff, #a855f7)",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            fontSize: "1rem",
            fontWeight: "700",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "all 0.2s",
            letterSpacing: "0.3px",
          }}
        >
          {loading ? "Please wait..." : isSignup ? "Create Account 🚀" : "Login →"}
        </button>

        {/* Divider */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          color: "rgba(255,255,255,0.3)",
          fontSize: "0.85rem",
        }}>
          <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.1)" }} />
          or
          <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.1)" }} />
        </div>

        {/* Google */}
        <button
          onClick={handleGoogle}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
            padding: "0.8rem",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "12px",
            color: "#fff",
            fontSize: "0.95rem",
            cursor: "pointer",
            transition: "all 0.2s",
            fontWeight: "500",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#6c63ff")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")}
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            width={18}
          />
          Continue with Google
        </button>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.8rem 1rem",
  background: "rgba(255,255,255,0.07)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "10px",
  color: "#fff",
  fontSize: "0.95rem",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "inherit",
};