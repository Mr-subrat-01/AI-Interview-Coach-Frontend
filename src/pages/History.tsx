import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Navbar } from "../components/Navigation/Navbar";
import api from "../services/api";
import { History as HistoryIcon, Calendar, Award, ExternalLink, X, MessageSquare, Briefcase } from "lucide-react";

interface SessionSummary {
  id: number;
  jd_text: string;
  skills: string[];
  overall_score: number | null;
  created_at: string;
  question_count?: number;
}

interface SessionDetail extends SessionSummary {
  questions: Array<{
    id: number;
    question: string;
    difficulty: string;
    user_answer: string;
    ai_feedback: string;
    score: number;
  }>;
}

export const HistoryPage: React.FC = () => {
  const [sessions, setSessions] = useState<SessionSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState<SessionDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get("/reports");
        setSessions(response.data || []);
      } catch (err) {
        console.error("Failed to load history reports:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const handleOpenDetail = async (id: number) => {
    setLoadingDetail(true);
    try {
      const response = await api.get(`/reports/${id}`);
      setSelectedSession(response.data);
    } catch (err) {
      console.error("Failed to load report details:", err);
      toast.error("Could not load session detail.");
    } finally {
      setLoadingDetail(false);
    }
  };

  const getScoreBadgeColor = (score: number | null) => {
    if (!score) return "bg-slate-800 text-slate-400 border-slate-700";
    if (score >= 8) return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
    if (score >= 5) return "bg-amber-500/10 text-amber-400 border-amber-500/30";
    return "bg-rose-500/10 text-rose-400 border-rose-500/30";
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />

      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-10 w-full relative z-10 space-y-8">
        {/* Header Title */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <HistoryIcon size={26} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Interview Session History</h1>
              <p className="text-xs text-slate-400">Review past practice reports, scores, and AI evaluations</p>
            </div>
          </div>
          <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
            Total Sessions: {sessions.length}
          </span>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-8 h-8 rounded-full border-3 border-indigo-500 border-t-transparent animate-spin" />
            <span className="text-xs text-slate-400 font-mono">Loading practice reports...</span>
          </div>
        ) : sessions.length === 0 ? (
          <div className="glass-card p-12 rounded-3xl border border-slate-800 text-center space-y-4 max-w-md mx-auto my-12">
            <Briefcase size={40} className="mx-auto text-slate-600" />
            <h3 className="text-lg font-bold text-white">No Sessions Yet</h3>
            <p className="text-xs text-slate-400">You haven't completed any AI practice sessions yet. Start your first session now!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4 group"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                      <Calendar size={13} />
                      {new Date(session.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </span>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1 ${getScoreBadgeColor(session.overall_score)}`}>
                      <Award size={13} />
                      <span>{session.overall_score ? `${session.overall_score} / 10` : "In Progress"}</span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white line-clamp-2 mb-3">
                    {session.jd_text ? session.jd_text.slice(0, 100) + "..." : "Technical Practice Session"}
                  </h3>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {(session.skills || []).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-md text-[11px] bg-slate-900 text-slate-300 border border-slate-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleOpenDetail(session.id)}
                  disabled={loadingDetail}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-indigo-300 border border-slate-700 transition-colors flex items-center justify-center gap-2"
                >
                  <ExternalLink size={14} />
                  <span>View Full AI Evaluation Report</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Session Details Modal */}
      {selectedSession && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="glass-card max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-3xl p-6 border border-slate-700 space-y-6 bg-[#0e1424]">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">Detailed Report Details</h3>
                <span className="text-xs text-slate-400 font-mono">
                  {new Date(selectedSession.created_at).toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => setSelectedSession(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              {selectedSession.questions && selectedSession.questions.length > 0 ? (
                selectedSession.questions.map((q, idx) => (
                  <div key={idx} className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-indigo-400">Question #{idx + 1} ({q.difficulty})</span>
                      <span className="text-xs font-bold text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full bg-emerald-500/10">
                        Score: {q.score} / 10
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-white">{q.question}</p>
                    <div className="bg-slate-950 p-3 rounded-xl text-xs font-mono text-slate-300">
                      <strong>Your Answer:</strong> {q.user_answer || "No answer provided"}
                    </div>
                    <div className="flex items-start gap-2 text-xs text-indigo-200 bg-indigo-950/40 p-3 rounded-xl border border-indigo-500/20">
                      <MessageSquare size={16} className="text-indigo-400 flex-shrink-0 mt-0.5" />
                      <span>{q.ai_feedback}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400">No questions recorded for this session.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
