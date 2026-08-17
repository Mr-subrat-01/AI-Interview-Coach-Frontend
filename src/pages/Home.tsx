import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navigation/Navbar";
import { useAuth } from "../context/AuthContext";
import { GoogleLoginButton } from "../components/Auth/GoogleLogin";
import { Zap, BrainCircuit, Target, Award, ArrowRight } from "lucide-react";

export const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col relative overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[140px] pointer-events-none glow-orb" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[140px] pointer-events-none glow-orb" />

      {/* Header / Navbar */}
      <Navbar />

      {/* Hero Section */}
      <main className="flex-1 max-w-6xl mx-auto px-6 py-16 flex flex-col justify-center items-center text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/90 border border-slate-700/60 text-xs text-indigo-300 mb-8 backdrop-blur-md">
          <Zap size={14} className="text-purple-400" />
          <span>AI Technical Interview Practice & Feedback</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-4xl leading-tight mb-6">
          Master Technical Interviews with <span className="gradient-text">Real-Time AI Feedback</span>
        </h1>

        <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mb-10 leading-relaxed">
          Paste any Job Description. Our AI extracts core skills, generates custom role-specific questions, and evaluates your responses with detailed scoring out of 10.
        </p>

        <div className="flex flex-col items-center justify-center gap-4">
          {user ? (
            <Link
              to="/interview"
              className="flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all shadow-xl shadow-indigo-500/25 active:scale-95"
            >
              <span>Start Interview Session</span>
              <ArrowRight size={18} />
            </Link>
          ) : (
            <div className="flex flex-col items-center gap-3 p-2">
              <GoogleLoginButton />
              <span className="text-xs text-slate-500">Sign in with Google to start practicing</span>
            </div>
          )}
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 text-left w-full">
          <div className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
              <Target size={24} />
            </div>
            <h3 className="font-semibold text-lg text-white mb-2">1. Paste Job Description</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              AI parses your target job posting and automatically identifies key technical skills and requirements.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
              <BrainCircuit size={24} />
            </div>
            <h3 className="font-semibold text-lg text-white mb-2">2. AI Generated Questions</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Receive 5-10 tailored technical questions with difficulty badges (Easy, Medium, Hard).
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
              <Award size={24} />
            </div>
            <h3 className="font-semibold text-lg text-white mb-2">3. Score & Detailed Feedback</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Submit your answers to get instant AI scoring out of 10 along with actionable recommendations.
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-800/60 py-6 text-center text-xs text-slate-500 relative z-10">
        AI Interview Coach © 2026 • Real-Time AI Practice System
      </footer>
    </div>
  );
};
