import { motion } from "framer-motion";
import { MapPin, CheckCircle, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ProfileHero({ profile, onEdit }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 md:p-8"
    >
      <div className="flex flex-col sm:flex-row gap-5 items-start">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden border-2 border-border/60 shadow-lg bg-secondary">
            {profile.avatar_url ? (
              <img src={profile.avatar_url} alt={profile.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full gradient-bg flex items-center justify-center">
                <span className="text-4xl font-bold text-white">{profile.name?.charAt(0) || "?"}</span>
              </div>
            )}
          </div>
          {profile.open_to_work && (
            <span className="absolute -bottom-1 -right-1 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full ring-2 ring-background flex items-center gap-1">
              <CheckCircle className="w-2.5 h-2.5" /> Open
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{profile.name}</h1>
                {profile.open_to_work && (
                  <Badge className="bg-green-500/15 text-green-600 border-green-500/20 text-xs">
                    Open to Work
                  </Badge>
                )}
              </div>
              {profile.location && (
                <div className="flex items-center gap-1.5 text-muted-foreground mt-1.5">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span className="text-sm">{profile.location}</span>
                </div>
              )}
            </div>
            <Button
              onClick={onEdit}
              variant="outline"
              className="h-9 gap-2 rounded-xl border-border/60 hover:border-primary/50 hover:bg-accent transition-all shrink-0"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Edit Profile
            </Button>
          </div>

          {profile.bio && (
            <p className="text-sm text-foreground/75 leading-relaxed mt-3 max-w-xl">
              {profile.bio}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}