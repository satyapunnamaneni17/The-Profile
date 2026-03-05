import { motion } from "framer-motion";
import { FolderOpen, ExternalLink } from "lucide-react";

export default function ProjectsSection({ projects = [], compact = false }) {
  if (!projects.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-card rounded-2xl border border-border/60 p-6 shadow-sm"
    >
      <div className="flex items-center gap-2 mb-5">
        <FolderOpen className="w-4 h-4 text-primary" />
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Projects
        </h2>
      </div>

      <div className="space-y-3">
        {projects.map((proj, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 * idx }}
            className="p-4 rounded-xl bg-secondary/40 border border-border/40"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="font-semibold text-sm">{proj.name}</p>
              {proj.link && (
                <a
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 text-primary hover:text-primary/70 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
            {proj.tech && (
              <p className="text-xs text-primary/70 font-medium mt-1">{proj.tech}</p>
            )}
            {!compact && proj.description && (
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{proj.description}</p>
            )}
            {compact && proj.description && (
              <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{proj.description}</p>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}