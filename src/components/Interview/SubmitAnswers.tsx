import React, { useState } from "react";
import { Send, ArrowLeft, CheckCircle2 } from "lucide-react";
import type { Question } from "./QuestionCard";

interface SubmitAnswersProps {
  questions: Question[];
  onSubmit: (answers: { id?: number; question: string; difficulty: string; answer: string }[]) => void;
  onBack: () => void;
  isSubmitting: boolean;
}

export const SubmitAnswers: React.FC<SubmitAnswersProps> = ({
  questions,
  onSubmit,
  onBack,
  isSubmitting
}) => {
  const [answers, setAnswers] = useState<{ [index: number]: string }>({});

  const handleAnswerChange = (index: number, text: string) => {
    setAnswers((prev) => ({ ...prev, [index]: text }));
  };

  const answeredCount = Object.values(answers).filter((val) => val.trim().length > 0).length;
  const progressPercentage = Math.round((answeredCount / questions.length) * 100);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = questions.map((q, idx) => ({
      id: (q as any).id,
      question: q.question,
      difficulty: q.difficulty,
      answer: answers[idx] || ""
    }));

    onSubmit(payload);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 relative z-10">
      {/* Top Header Card with Progress */}
      <div className="glass-card p-6 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h2 className="text-xl font-bold text-white">Answer Technical Questions</h2>
            <p className="text-xs text-slate-400">Provide clear answers to test your knowledge</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-xs font-medium text-slate-400">Progress</span>
            <div className="text-sm font-bold text-indigo-400">
              {answeredCount} / {questions.length} answered
            </div>
          </div>
          <div className="w-24 h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Answer Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {questions.map((q, idx) => (
          <div
            key={idx}
            className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold text-xs flex items-center justify-center">
                  Q{idx + 1}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border bg-slate-800 text-slate-300 border-slate-700">
                  {q.difficulty}
                </span>
              </div>
              {answers[idx]?.trim() && (
                <span className="flex items-center gap-1 text-xs text-emerald-400 font-medium">
                  <CheckCircle2 size={14} /> Answered
                </span>
              )}
            </div>

            <h3 className="text-base font-semibold text-white leading-relaxed">
              {q.question}
            </h3>

            <div className="relative">
              <textarea
                value={answers[idx] || ""}
                onChange={(e) => handleAnswerChange(idx, e.target.value)}
                placeholder="Type your technical response here..."
                rows={4}
                className="w-full bg-slate-950/90 text-slate-100 placeholder-slate-500 rounded-xl p-4 text-sm border border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all resize-y font-mono leading-relaxed"
              />
              <div className="absolute bottom-3 right-4 text-[11px] text-slate-500">
                {(answers[idx] || "").length} chars
              </div>
            </div>
          </div>
        ))}

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 transition-all shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-3 text-base active:scale-98"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                <span>Evaluating Answers with AI (Scoring /10)...</span>
              </>
            ) : (
              <>
                <Send size={20} />
                <span>Submit All Answers for AI Evaluation</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
