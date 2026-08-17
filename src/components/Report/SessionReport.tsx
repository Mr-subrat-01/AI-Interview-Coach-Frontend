import React from "react";
import { Award, RefreshCw, MessageSquare } from "lucide-react";

export interface EvaluatedQuestion {
  id?: number;
  question: string;
  difficulty: string;
  user_answer: string;
  score: number;
  ai_feedback: string;
}

interface SessionReportProps {
  overallScore: number;
  questions: EvaluatedQuestion[];
  onRestart: () => void;
}

export const SessionReport: React.FC<SessionReportProps> = ({ overallScore, questions, onRestart }) => {
  const getScoreBadgeColor = (score: number) => {
    if (score >= 8) return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
    if (score >= 5) return "bg-amber-500/10 text-amber-400 border-amber-500/30";
    return "bg-rose-500/10 text-rose-400 border-rose-500/30";
  };

  const getOverallGradeText = (score: number) => {
    if (score >= 8.5) return { text: "Outstanding Performance!", color: "text-emerald-400" };
    if (score >= 7.0) return { text: "Strong Technical Knowledge", color: "text-indigo-400" };
    if (score >= 5.0) return { text: "Good Effort — Areas for Growth", color: "text-amber-400" };
    return { text: "Needs Practice & Review", color: "text-rose-400" };
  };

  const gradeInfo = getOverallGradeText(overallScore);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 relative z-10">
      {/* Top Banner Score Card */}
      <div className="glass-card p-8 rounded-3xl border border-slate-800 text-center relative overflow-hidden bg-gradient-to-b from-slate-900/90 to-slate-950/90 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 mx-auto flex items-center justify-center text-indigo-400 mb-4 shadow-inner">
          <Award size={32} />
        </div>

        <span className="text-xs font-semibold uppercase tracking-widest text-slate-400 block mb-1">
          Interview Session Evaluation Report
        </span>

        <div className="text-5xl font-black text-white tracking-tight mb-2 flex items-center justify-center gap-2">
          <span>{overallScore}</span>
          <span className="text-2xl font-normal text-slate-500">/ 10</span>
        </div>

        <p className={`text-base font-bold ${gradeInfo.color} mb-6`}>
          {gradeInfo.text}
        </p>

        <button
          onClick={onRestart}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg shadow-indigo-500/25 active:scale-95 text-sm"
        >
          <RefreshCw size={16} />
          <span>Start New Interview Session</span>
        </button>
      </div>

      {/* Individual Question Feedback Cards */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-white px-2">Detailed Question Feedback</h3>

        {questions.map((q, idx) => (
          <div
            key={idx}
            className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4 hover:border-slate-700 transition-all"
          >
            {/* Header: Question + Difficulty + Score */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center">
                  #{idx + 1}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border bg-slate-800 text-slate-300 border-slate-700">
                  {q.difficulty}
                </span>
              </div>

              <div className={`px-4 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${getScoreBadgeColor(q.score)}`}>
                <Award size={14} />
                <span>Score: {q.score} / 10</span>
              </div>
            </div>

            {/* Question Text */}
            <h4 className="text-base font-semibold text-white leading-relaxed">
              {q.question}
            </h4>

            {/* Candidate Answer */}
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-900">
              <span className="text-[11px] font-semibold text-slate-400 block mb-1 uppercase tracking-wider">
                Your Answer:
              </span>
              <p className="text-xs text-slate-200 font-mono whitespace-pre-wrap leading-relaxed">
                {q.user_answer || <span className="text-slate-500 italic">No answer provided.</span>}
              </p>
            </div>

            {/* AI Feedback Box */}
            <div className="bg-indigo-950/20 border border-indigo-500/20 p-4 rounded-xl flex items-start gap-3">
              <MessageSquare className="text-indigo-400 flex-shrink-0 mt-0.5" size={18} />
              <div>
                <span className="text-xs font-bold text-indigo-300 block mb-1">
                  AI Feedback & Evaluation:
                </span>
                <p className="text-xs text-indigo-200/90 leading-relaxed">
                  {q.ai_feedback}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
