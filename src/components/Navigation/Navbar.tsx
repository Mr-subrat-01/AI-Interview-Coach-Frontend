import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BrainCircuit, PlayCircle, History as HistoryIcon, Trophy, Home as HomeIcon, Menu, X } from "lucide-react";
import { GoogleLoginButton } from "../Auth/GoogleLogin";
import { useAuth } from "../../context/AuthContext";

export const Navbar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/", icon: HomeIcon },
    { name: "Start Interview", path: "/interview", icon: PlayCircle },
    { name: "Session History", path: "/history", icon: HistoryIcon },
    { name: "Leaderboard", path: "/leaderboard", icon: Trophy }
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0b0f19]/80 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
            <BrainCircuit className="text-white" size={22} />
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight text-white">AI Interview <span className="gradient-text">Coach</span></span>
            <span className="block text-[10px] text-slate-400 font-mono">AI Practice & Analytics</span>
          </div>
        </Link>

        {/* Desktop Navigation Links - Only visible when user is logged in */}
        {user && (
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                  }`}
                >
                  <Icon size={15} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>
        )}

        {/* Right Section: Auth Profile & Mobile Toggle */}
        <div className="flex items-center gap-3">
          {user && <GoogleLoginButton />}

          {/* Mobile Menu Hamburger Toggle (Visible only when logged in on small screens) */}
          {user && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700/60 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navigation Drawer Dropdown */}
      {user && mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#0b0f19]/95 px-6 py-4 space-y-2 animate-in slide-in-from-top-2 duration-150">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                }`}
              >
                <Icon size={18} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
