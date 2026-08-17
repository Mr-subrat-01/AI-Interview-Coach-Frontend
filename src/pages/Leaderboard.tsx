import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navigation/Navbar";
import api from "../services/api";
import { Trophy, Flame, User as UserIcon } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  id: number;
  name: string;
  photo?: string | null;
  total_sessions: number;
  avg_score: number;
}

export const LeaderboardPage: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await api.get("/leaderboard");
        setLeaderboard(response.data || []);
      } catch (err) {
        console.error("Failed to load leaderboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  const topThree = leaderboard.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />

      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-10 w-full relative z-10 space-y-10">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 mx-auto flex items-center justify-center text-amber-400 mb-3 shadow-lg shadow-amber-500/10">
            <Trophy size={30} />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Top 10 Candidate Leaderboard</h1>
          <p className="text-xs text-slate-400">Rankings based on practice consistency and average AI evaluation score</p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-8 h-8 rounded-full border-3 border-amber-500 border-t-transparent animate-spin" />
            <span className="text-xs text-slate-400 font-mono">Loading rankings...</span>
          </div>
        ) : leaderboard.length === 0 ? (
          <div className="glass-card p-12 rounded-3xl border border-slate-800 text-center space-y-4 max-w-md mx-auto my-12">
            <Trophy size={40} className="mx-auto text-slate-600" />
            <h3 className="text-lg font-bold text-white">Leaderboard Empty</h3>
            <p className="text-xs text-slate-400">No practice sessions have been evaluated yet. Complete an interview practice session to claim the #1 rank!</p>
          </div>
        ) : (
          <>
            {/* Top 3 Podium */}
            {topThree.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto items-end pt-4">
                {/* 2nd Place Silver */}
                {topThree[1] ? (
                  <div className="glass-card p-6 rounded-3xl border border-slate-700 text-center space-y-3 bg-gradient-to-b from-slate-800/80 to-slate-950/80 relative order-2 md:order-1">
                    <div className="w-10 h-10 rounded-full bg-slate-700 border border-slate-600 text-slate-200 font-bold text-sm mx-auto flex items-center justify-center shadow-md">
                      🥈 2
                    </div>
                    <h3 className="text-base font-bold text-white truncate">{topThree[1].name}</h3>
                    <div className="text-xs text-slate-400 font-mono">{topThree[1].total_sessions} sessions</div>
                    <div className="text-xl font-extrabold text-slate-200">
                      {topThree[1].avg_score} <span className="text-xs text-slate-500 font-normal">/ 10</span>
                    </div>
                  </div>
                ) : <div className="hidden md:block" />}

                {/* 1st Place Gold */}
                {topThree[0] && (
                  <div className="glass-card p-8 rounded-3xl border border-amber-500/40 text-center space-y-4 bg-gradient-to-b from-amber-950/30 to-slate-950/90 relative order-1 md:order-2 shadow-2xl shadow-amber-500/10 transform md:-translate-y-4">
                    <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-extrabold text-base mx-auto flex items-center justify-center shadow-lg shadow-amber-500/20">
                      🥇 1
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 block mb-1">Top Candidate</span>
                      <h3 className="text-lg font-black text-white truncate">{topThree[0].name}</h3>
                    </div>
                    <div className="text-xs text-slate-400 font-mono flex items-center justify-center gap-1">
                      <Flame size={14} className="text-amber-400" />
                      <span>{topThree[0].total_sessions} sessions</span>
                    </div>
                    <div className="text-3xl font-black text-amber-400">
                      {topThree[0].avg_score} <span className="text-xs text-slate-500 font-normal">/ 10</span>
                    </div>
                  </div>
                )}

                {/* 3rd Place Bronze */}
                {topThree[2] ? (
                  <div className="glass-card p-6 rounded-3xl border border-slate-700 text-center space-y-3 bg-gradient-to-b from-amber-950/10 to-slate-950/80 relative order-3">
                    <div className="w-10 h-10 rounded-full bg-amber-900/40 border border-amber-700/50 text-amber-400 font-bold text-sm mx-auto flex items-center justify-center shadow-md">
                      🥉 3
                    </div>
                    <h3 className="text-base font-bold text-white truncate">{topThree[2].name}</h3>
                    <div className="text-xs text-slate-400 font-mono">{topThree[2].total_sessions} sessions</div>
                    <div className="text-xl font-extrabold text-amber-200">
                      {topThree[2].avg_score} <span className="text-xs text-slate-500 font-normal">/ 10</span>
                    </div>
                  </div>
                ) : <div className="hidden md:block" />}
              </div>
            )}

            {/* Candidate Rankings Table */}
            <div className="glass-card rounded-3xl border border-slate-800 overflow-hidden max-w-4xl mx-auto">
              <div className="px-6 py-4 border-b border-slate-800/80 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Candidate Rankings</span>
                <span className="text-xs font-mono text-slate-500">Sorted by Avg AI Score</span>
              </div>

              <div className="divide-y divide-slate-800/60">
                {leaderboard.map((entry) => (
                  <div
                    key={entry.id}
                    className="px-6 py-4 flex items-center justify-between gap-4 hover:bg-slate-800/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        entry.rank === 1 ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" :
                        entry.rank === 2 ? "bg-slate-700 text-slate-200 border border-slate-600" :
                        entry.rank === 3 ? "bg-amber-900/30 text-amber-400 border border-amber-700/40" :
                        "bg-slate-800 text-slate-400 border border-slate-700"
                      }`}>
                        {entry.rank}
                      </span>

                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-xs">
                          <UserIcon size={16} />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white">{entry.name}</h4>
                          <span className="text-[11px] text-slate-400 font-mono">Verified Candidate</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-right">
                      <div className="hidden sm:block">
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Sessions</span>
                        <span className="text-xs font-mono text-slate-300">{entry.total_sessions}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Avg Score</span>
                        <span className="text-sm font-bold text-emerald-400">{entry.avg_score} / 10</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};
