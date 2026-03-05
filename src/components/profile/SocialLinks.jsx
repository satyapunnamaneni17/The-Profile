import { motion } from "framer-motion";
import { Linkedin, Github, Twitter, Globe, Mail, ExternalLink } from "lucide-react";

const SOCIALS = [
  { key: "linkedin", label: "LinkedIn", Icon: Linkedin, color: "hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/50" },
  { key: "github", label: "GitHub", Icon: Github, color: "hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800" },
  { key: "website", label: "Website", Icon: Globe, color: "hover:text-primary hover:bg-accent" },
  { key: "email", label: "Email", Icon: Mail, color: "hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/50" },
];

export default function SocialLinks({ links = {} }) {
  const available = SOCIALS.filter((s) => links[s.key]);
  if (!available.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-card rounded-2xl border border-border/60 p-6 shadow-sm"
    >
      <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
        Connect
      </h2>
      <div className="flex flex-wrap gap-2">
        {available.map(({ key, label, Icon, color }) => {
          const href = key === "email" ? `mailto:${links[key]}` : links[key];
          return (
            <a
              key={key}
              href={href}
              target={key !== "email" ? "_blank" : undefined}
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium text-muted-foreground border border-border/50 transition-all duration-200 ${color}`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
              {key !== "email" && <ExternalLink className="w-3 h-3 opacity-60" />}
            </a>
          );
        })}
      </div>
    </motion.div>
  );
}