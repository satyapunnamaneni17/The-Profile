import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";

export default function ExperienceSection({ experience = [] }) {
  if (!experience.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-card rounded-2xl border border-border/60 p-6 shadow-sm"
    >
      <div className="flex items-center gap-2 mb-5">
        <Briefcase className="w-4 h-4 text-primary" />
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Experience
        </h2>
      </div>

      <div className="space-y-5">
        {experience.map((exp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.07 * idx }}
            className="flex gap-4"
          >
            {/* Timeline dot */}
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-xl gradient-bg flex items-center justify-center shadow-sm shrink-0">
                <Briefcase className="w-3.5 h-3.5 text-white" />
              </div>
              {idx < experience.length - 1 && (
                <div className="w-px flex-1 bg-border/60 mt-2" />
              )}
            </div>

            {/* Content */}
            <div className="pb-4">
              <p className="font-semibold text-sm leading-snug">{exp.role}</p>
              <p className="text-primary text-sm font-medium mt-0.5">{exp.company}</p>
              {exp.duration && (
                <div className="flex items-center gap-1 text-muted-foreground mt-1">
                  <Calendar className="w-3 h-3" />
                  <span className="text-xs">{exp.duration}</span>
                </div>
              )}
              {exp.description && (
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  {exp.description}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}