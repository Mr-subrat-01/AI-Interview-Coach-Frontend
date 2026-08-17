import React, { useState } from "react";
import toast from "react-hot-toast";
import { Navbar } from "../components/Navigation/Navbar";
import { JDInput } from "../components/Interview/JDInput";
import { QuestionCardList } from "../components/Interview/QuestionCard";
import type { Question } from "../components/Interview/QuestionCard";
import { SubmitAnswers } from "../components/Interview/SubmitAnswers";
import { SessionReport } from "../components/Report/SessionReport";
import type { EvaluatedQuestion } from "../components/Report/SessionReport";
import api from "../services/api";

export const Interview: React.FC = () => {
  const [stage, setStage] = useState<"input" | "review" | "answering" | "report">("input");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [skills, setSkills] = useState<string[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [sessionId, setSessionId] = useState<number | null>(null);

  const [overallScore, setOverallScore] = useState<number>(0);
  const [evaluatedQuestions, setEvaluatedQuestions] = useState<EvaluatedQuestion[]>([]);

  const handleStartInterview = async (jdText: string, manualSkills: string[]) => {
    setIsLoading(true);
    try {
      const response = await api.post("/interview/start", { jdText, manualSkills });
      setSkills(response.data.skills || []);
      setQuestions(response.data.questions || []);
      setSessionId(response.data.sessionId);
      setStage("review");
      toast.success("Interview questions generated successfully!");
    } catch (err: any) {
      console.error("Failed to generate questions:", err);
      const message = err.response?.data?.message || "Failed to analyze Job Description with AI. Make sure server is running.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitAnswers = async (
    userAnswers: { id?: number; question: string; difficulty: string; answer: string }[]
  ) => {
    setIsSubmitting(true);
    try {
      const response = await api.post("/interview/submit", {
        sessionId,
        userAnswers
      });
      setOverallScore(response.data.overallScore || 0);
      setEvaluatedQuestions(response.data.evaluatedQuestions || []);
      setStage("report");
      toast.success("Answers submitted & evaluated successfully!");
    } catch (err: any) {
      console.error("Failed to submit answers:", err);
      const message = err.response?.data?.message || "Failed to evaluate answers. Make sure server is running.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setStage("input");
    setSkills([]);
    setQuestions([]);
    setSessionId(null);
    setOverallScore(0);
    setEvaluatedQuestions([]);
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col relative overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none glow-orb" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none glow-orb" />

      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-10 w-full">
        {stage === "input" && (
          <JDInput onSubmit={handleStartInterview} isLoading={isLoading} />
        )}

        {stage === "review" && (
          <QuestionCardList
            skills={skills}
            questions={questions}
            onReset={handleReset}
            onConfirm={() => setStage("answering")}
          />
        )}

        {stage === "answering" && (
          <SubmitAnswers
            questions={questions}
            onSubmit={handleSubmitAnswers}
            onBack={() => setStage("review")}
            isSubmitting={isSubmitting}
          />
        )}

        {stage === "report" && (
          <SessionReport
            overallScore={overallScore}
            questions={evaluatedQuestions}
            onRestart={handleReset}
          />
        )}
      </main>

      <footer className="border-t border-slate-800/60 py-6 text-center text-xs text-slate-500 relative z-10">
        AI Interview Coach © 2026 • Real-Time AI Practice
      </footer>
    </div>
  );
};
