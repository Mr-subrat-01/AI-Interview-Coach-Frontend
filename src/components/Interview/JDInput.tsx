import React, { useState } from "react";
import { Zap, Clipboard, Trash2, Plus, X, Briefcase } from "lucide-react";
import toast from "react-hot-toast";

interface JDInputProps {
  onSubmit: (jdText: string, manualSkills: string[]) => void;
  isLoading: boolean;
}

const SAMPLE_JDS = [
  {
    title: "Full Stack Engineer (Node.js & React)",
    text: "We are seeking a Full Stack Engineer experienced in Node.js, Express.js, React, TypeScript, and PostgreSQL. Key responsibilities include designing RESTful APIs, building responsive frontend components, optimizing database queries, and setting up Docker containerization."
  },
  {
    title: "Frontend Developer (React & TypeScript)",
    text: "Looking for a Frontend Developer proficient in React, Next.js, Tailwind CSS, TypeScript, and Redux Toolkit. Experience with Web Performance Optimization, accessibility standards, and Jest testing is highly preferred."
  },
  {
    title: "Backend Engineer (Node.js & Microservices)",
    text: "Join our team as a Backend Engineer. Requirements: Node.js, Express, PostgreSQL, Redis caching, Kafka message queues, Docker, and AWS deployments. Must have strong understanding of system design, database indexing, and authentication using JWT & OAuth2."
  }
];

export const JDInput: React.FC<JDInputProps> = ({ onSubmit, isLoading }) => {
  const [jdText, setJdText] = useState("");
  const [manualSkillInput, setManualSkillInput] = useState("");
  const [manualSkills, setManualSkills] = useState<string[]>([]);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setJdText(text);
      toast.success("Pasted job description from clipboard");
    } catch (err) {
      toast.error("Could not read clipboard. Please paste directly using Ctrl+V or Cmd+V.");
    }
  };

  const handleAddSkill = () => {
    if (manualSkillInput.trim() && !manualSkills.includes(manualSkillInput.trim())) {
      setManualSkills([...manualSkills, manualSkillInput.trim()]);
      setManualSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setManualSkills(manualSkills.filter(s => s !== skillToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jdText.trim() && manualSkills.length === 0) {
      toast.error("Please paste a job description or add skills manually.");
      return;
    }
    onSubmit(jdText, manualSkills);
  };

  return (
    <div className="w-full max-w-4xl mx-auto glass-card p-8 rounded-3xl border border-slate-800 shadow-2xl relative z-10">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Briefcase size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Target Job Description</h2>
            <p className="text-xs text-slate-400">Paste your job posting to extract skills & generate questions</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePaste}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-colors border border-slate-700"
          >
            <Clipboard size={14} />
            <span>Paste Clipboard</span>
          </button>
          {jdText && (
            <button
              type="button"
              onClick={() => setJdText("")}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 transition-colors border border-slate-700"
              title="Clear text"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Preset Sample JD Buttons */}
      <div className="mb-4">
        <span className="text-xs font-medium text-slate-400 block mb-2">Or try a sample Job Description:</span>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_JDS.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setJdText(sample.text);
                toast.success(`Loaded sample: ${sample.title}`);
              }}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-indigo-950/40 border border-slate-700/60 hover:border-indigo-500/40 text-slate-300 transition-all text-left"
            >
              + {sample.title}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <textarea
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            placeholder="Paste Job Description here... (e.g. 'We are looking for a Senior React & Node.js Engineer...')"
            rows={7}
            className="w-full bg-slate-950/80 text-slate-100 placeholder-slate-500 rounded-2xl p-4 text-sm border border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all resize-y font-mono leading-relaxed"
          />
          <div className="absolute bottom-3 right-4 text-[11px] text-slate-500">
            {jdText.length} characters
          </div>
        </div>

        {/* Manual Skills Fallback Section */}
        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          <label className="text-xs font-medium text-slate-300 block mb-2">
            Optional / Additional Manual Skills
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={manualSkillInput}
              onChange={(e) => setManualSkillInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSkill())}
              placeholder="e.g. Docker, GraphQL, System Design"
              className="flex-1 bg-slate-950 text-slate-200 text-xs px-3 py-2 rounded-lg border border-slate-800 focus:border-indigo-500 outline-none"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-indigo-300 border border-slate-700 flex items-center gap-1"
            >
              <Plus size={14} /> Add
            </button>
          </div>

          {manualSkills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {manualSkills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:text-rose-400 transition-colors"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || (!jdText.trim() && manualSkills.length === 0)}
          className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-3 text-base active:scale-98"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
              <span>Analyzing Job Description & Generating Questions with AI...</span>
            </>
          ) : (
            <>
              <Zap size={20} className="text-purple-200" />
              <span>Generate Tailored Interview Questions</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
