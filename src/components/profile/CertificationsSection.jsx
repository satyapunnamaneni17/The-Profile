import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";

export default function CertificationsSection({ certifications = [] }) {
  if (!certifications.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.22 }}
      className="bg-card rounded-2xl border border-border/60 p-6 shadow-sm"
    >
      <div className="flex items-center gap-2 mb-5">
        <Award className="w-4 h-4 text-primary" />
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Certifications
        </h2>
      </div>

      <div className="space-y-3">
        {certifications.map((cert, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 * idx }}
            className="flex items-start gap-3 p-3 rounded-xl bg-secondary/40 border border-border/40"
          >
            <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center shrink-0">
              <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm leading-snug">{cert.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {cert.organization}{cert.year ? ` · ${cert.year}` : ""}
              </p>
            </div>
            {cert.credential_url && (
              <a
                href={cert.credential_url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-primary hover:text-primary/70 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}