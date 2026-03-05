import { motion } from "framer-motion";
import { User, Briefcase } from "lucide-react";

export default function ViewToggle({ view, onChange }) {
  return (
    <div className="flex items-center gap-2 bg-secondary/70 rounded-2xl p-1 border border-border/50 shadow-sm">
      {[
        { id: "candidate", label: "Candidate View", Icon: User },
        { id: "recruiter", label: "Recruiter View", Icon: Briefcase },
      ].map(({ id, label, Icon }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className="relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors z-10"
        >
          {view === id && (
            <motion.div
              layoutId="view-pill"
              className="absolute inset-0 gradient-bg rounded-xl shadow-sm"
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
            />
          )}
          <Icon className={`w-3.5 h-3.5 relative z-10 ${view === id ? "text-white" : "text-muted-foreground"}`} />
          <span className={`relative z-10 ${view === id ? "text-white" : "text-muted-foreground"}`}>{label}</span>
        </button>
      ))}
    </div>
  );
}