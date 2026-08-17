import React from "react";
import { HelpCircle, ArrowRight, RefreshCw, CheckCircle } from "lucide-react";

export interface Question {
  question: string;
  difficulty: "easy" | "medium" | "hard";
}

interface QuestionCardProps {
  skills: string[];
  questions: Question[];
  onReset: () => void;
  onConfirm: () => void;
}

export const QuestionCardList: React.FC<QuestionCardProps> = ({ skills, questions, onReset, onConfirm }) => {
  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "medium":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "hard":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 relative z-10">
      {/* Top Header Card */}
      <div className="glass-card p-6 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider block mb-1">
            Target Technical Skills Extracted ({skills.length})
          </span>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-colors border border-slate-700"
        >
          <RefreshCw size={14} />
          <span>New Job Description</span>
        </button>
      </div>

      {/* Questions Header */}
      <div className="flex items-center justify-between px-2">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <HelpCircle className="text-indigo-400" size={20} />
          <span>AI Generated Questions ({questions.length})</span>
        </h3>
        <span className="text-xs text-slate-400">Ready for candidate response</span>
      </div>

      {/* Question Cards List */}
      <div className="space-y-4">
        {questions.map((q, index) => (
          <div
            key={index}
            className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all flex items-start gap-4 group"
          >
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-300 flex-shrink-0 mt-0.5">
              {index + 1}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className={`px-3 py-0.5 rounded-full text-[11px] font-semibold border uppercase tracking-wider ${getDifficultyBadge(q.difficulty)}`}>
                  {q.difficulty}
                </span>
              </div>
              <p className="text-slate-100 font-medium leading-relaxed text-base">
                {q.question}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Banner */}
      <div className="glass-card p-6 rounded-2xl border border-indigo-500/30 flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-indigo-950/30 to-purple-950/30">
        <div className="flex items-center gap-3">
          <CheckCircle className="text-emerald-400" size={24} />
          <div>
            <h4 className="font-bold text-white text-base">Question Set Saved to Database</h4>
            <p className="text-xs text-slate-400">Ready to answer each question and get real-time AI scoring out of 10</p>
          </div>
        </div>

        <button
          onClick={onConfirm}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg shadow-indigo-500/25 active:scale-95"
        >
          <span>Proceed to Answer Questions</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
