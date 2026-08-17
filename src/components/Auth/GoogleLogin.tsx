import React, { useState, useRef, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { LogOut, User as UserIcon, AlertTriangle } from "lucide-react";

export const GoogleLoginButton: React.FC = () => {
  const { user, logout, loginWithGoogle, isLoading } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
        setShowConfirmLogout(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await logout();
      toast.success("Logged out successfully");
    } catch (err) {
      toast.error("Failed to log out");
    } finally {
      setIsLoggingOut(false);
      setDropdownOpen(false);
      setShowConfirmLogout(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-slate-400 text-sm px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 animate-pulse">
        <div className="w-4 h-4 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin" />
        <span>Authenticating...</span>
      </div>
    );
  }

  if (user) {
    return (
      <div className="relative" ref={dropdownRef}>
        {/* User Profile Avatar Icon Button (No full name in navbar) */}
        <button
          onClick={() => {
            setDropdownOpen(!dropdownOpen);
            setShowConfirmLogout(false);
          }}
          className="relative focus:outline-none ring-2 ring-indigo-500/40 hover:ring-indigo-400 transition-all rounded-full p-0.5"
          title={user.name}
        >
          {user.photo ? (
            <img src={user.photo} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
          ) : (
            <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-semibold">
              {user.name ? user.name.charAt(0).toUpperCase() : <UserIcon size={16} />}
            </div>
          )}
        </button>

        {/* Profile Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-3 w-64 glass-card bg-[#0f172a] border border-slate-700 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
            {/* User Info Header */}
            <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
              {user.photo ? (
                <img src={user.photo} alt={user.name} className="w-10 h-10 rounded-full ring-2 ring-indigo-500/50" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white text-base font-bold">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
              )}
              <div className="overflow-hidden">
                <h4 className="text-sm font-bold text-slate-100 truncate">{user.name}</h4>
                <p className="text-xs text-slate-400 truncate">{user.email}</p>
              </div>
            </div>

            {/* Logout Section with Confirmation */}
            <div className="pt-3">
              {showConfirmLogout ? (
                <div className="bg-slate-900/90 border border-amber-500/30 rounded-xl p-3 text-center space-y-2">
                  <div className="flex items-center justify-center gap-1.5 text-amber-400 text-xs font-semibold">
                    <AlertTriangle size={15} />
                    <span>Confirm Sign Out?</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="flex-1 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1"
                    >
                      {isLoggingOut ? (
                        <div className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      ) : (
                        "Yes, Sign Out"
                      )}
                    </button>
                    <button
                      onClick={() => setShowConfirmLogout(false)}
                      disabled={isLoggingOut}
                      className="flex-1 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-300 text-xs font-medium border border-slate-700"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowConfirmLogout(true)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/30 hover:text-rose-300 transition-all border border-transparent hover:border-rose-900/40"
                >
                  <span className="flex items-center gap-2">
                    <LogOut size={15} />
                    <span>Sign Out</span>
                  </span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[40px]">
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          if (credentialResponse.credential) {
            try {
              await loginWithGoogle(credentialResponse.credential);
              toast.success("Signed in with Google!");
            } catch (err) {
              toast.error("Google sign in failed. Please try again.");
            }
          }
        }}
        onError={() => {
          toast.error("Google login failed.");
        }}
        useOneTap={true}
        auto_select={true}
        theme="filled_blue"
        shape="pill"
        size="large"
        text="signin_with"
      />
    </div>
  );
};
