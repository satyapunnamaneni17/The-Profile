import { motion } from "framer-motion";
import { GraduationCap, Calendar } from "lucide-react";

export default function EducationSection({ education = [] }) {
  if (!education.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.18 }}
      className="bg-card rounded-2xl border border-border/60 p-6 shadow-sm"
    >
      <div className="flex items-center gap-2 mb-5">
        <GraduationCap className="w-4 h-4 text-primary" />
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Education
        </h2>
      </div>

      <div className="space-y-5">
        {education.map((edu, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.07 * idx }}
            className="flex gap-4"
          >
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-xl bg-violet-100 dark:bg-violet-950/60 flex items-center justify-center shrink-0">
                <GraduationCap className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
              </div>
              {idx < education.length - 1 && (
                <div className="w-px flex-1 bg-border/60 mt-2" />
              )}
            </div>
            <div className="pb-4">
              <p className="font-semibold text-sm leading-snug">
                {edu.degree}{edu.field ? ` in ${edu.field}` : ""}
              </p>
              <p className="text-primary text-sm font-medium mt-0.5">{edu.institution}</p>
              {(edu.start_year || edu.end_year) && (
                <div className="flex items-center gap-1 text-muted-foreground mt-1">
                  <Calendar className="w-3 h-3" />
                  <span className="text-xs">
                    {edu.start_year}{edu.end_year ? ` – ${edu.end_year}` : ""}
                  </span>
                </div>
              )}
              {edu.grade && (
                <span className="inline-block mt-1.5 text-xs px-2 py-0.5 rounded-lg bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800">
                  Grade: {edu.grade}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}