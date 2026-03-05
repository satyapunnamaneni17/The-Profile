import { motion } from "framer-motion";
import { Code2, Layers, Star } from "lucide-react";

export default function ProfileStats({ profile }) {
  const stats = [
    {
      label: "Skills",
      value: (profile.skills || []).length,
      Icon: Code2,
      color: "text-violet-500",
      bg: "bg-violet-50 dark:bg-violet-950/50",
    },
    {
      label: "Positions",
      value: (profile.experience || []).length,
      Icon: Layers,
      color: "text-blue-500",
      bg: "bg-blue-50 dark:bg-blue-950/50",
    },
    {
      label: "Connections",
      value: Object.values(profile.social_links || {}).filter(Boolean).length,
      Icon: Star,
      color: "text-amber-500",
      bg: "bg-amber-50 dark:bg-amber-950/50",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
      className="grid grid-cols-3 gap-3"
    >
      {stats.map(({ label, value, Icon, color, bg }) => (
        <div
          key={label}
          className="bg-card rounded-2xl border border-border/60 p-4 flex flex-col items-center gap-1.5 text-center shadow-sm"
        >
          <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center`}>
            <Icon className={`w-4 h-4 ${color}`} />
          </div>
          <span className="text-2xl font-bold tracking-tight">{value}</span>
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
      ))}
    </motion.div>
  );
}