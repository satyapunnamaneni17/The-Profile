import { motion } from "framer-motion";
import { Linkedin, Github, Mail, Download, CheckCircle, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProjectsSection from "./ProjectsSection";

const TOP_SKILLS_COUNT = 8;

export default function RecruiterView({ profile }) {
  const topSkills = (profile.skills || []).slice(0, TOP_SKILLS_COUNT);
  const sl = profile.social_links || {};

  const handleResumeDownload = () => {
    if (profile.resume_url) {
      const a = document.createElement("a");
      a.href = profile.resume_url;
      a.download = `${profile.name || "resume"}_resume.pdf`;
      a.target = "_blank";
      a.click();
    }
  };

  return (
    <motion.div
      key="recruiter"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className="space-y-4"
    >
      {/* Quick card */}
      <div className="bg-card rounded-2xl border border-border/60 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-2xl overflow-hidden bg-secondary shrink-0 border border-border/60">
            {profile.avatar_url ? (
              <img src={profile.avatar_url} alt={profile.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full gradient-bg flex items-center justify-center text-white text-2xl font-bold">
                {profile.name?.charAt(0) || "?"}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-bold">{profile.name}</h2>
              {profile.open_to_work && (
                <Badge className="bg-green-500/15 text-green-600 border-green-500/20 text-xs gap-1">
                  <CheckCircle className="w-3 h-3" /> Open to Work
                </Badge>
              )}
            </div>
            {profile.location && (
              <div className="flex items-center gap-1 text-muted-foreground mt-1">
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-sm">{profile.location}</span>
              </div>
            )}

            {/* Quick contact links */}
            <div className="flex flex-wrap gap-2 mt-3">
              {sl.linkedin && (
                <a href={sl.linkedin} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs font-medium hover:opacity-80 transition-opacity border border-blue-200 dark:border-blue-800">
                  <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                </a>
              )}
              {sl.github && (
                <a href={sl.github} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary text-foreground text-xs font-medium hover:opacity-80 transition-opacity border border-border/50">
                  <Github className="w-3.5 h-3.5" /> GitHub
                </a>
              )}
              {sl.email && (
                <a href={`mailto:${sl.email}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-medium hover:opacity-80 transition-opacity border border-emerald-200 dark:border-emerald-800">
                  <Mail className="w-3.5 h-3.5" /> Email
                </a>
              )}
            </div>
          </div>

          {/* Resume download */}
          <div className="shrink-0">
            {profile.resume_url ? (
              <Button
                onClick={handleResumeDownload}
                className="gradient-bg text-white border-0 gap-2 rounded-xl shadow-sm"
              >
                <Download className="w-4 h-4" />
                Resume
              </Button>
            ) : (
              <div className="px-3 py-2 rounded-xl border border-dashed border-border/60 text-xs text-muted-foreground text-center">
                No resume<br />uploaded
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Top Skills */}
      {topSkills.length > 0 && (
        <div className="bg-card rounded-2xl border border-border/60 shadow-sm p-6">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Top Skills</h3>
          <div className="flex flex-wrap gap-2">
            {topSkills.map((skill, i) => (
              <span key={i} className="px-3 py-1.5 rounded-xl text-sm font-semibold gradient-bg text-white shadow-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Key Projects (compact) */}
      <ProjectsSection projects={profile.projects} compact={true} />

      {/* Experience summary */}
      {(profile.experience || []).length > 0 && (
        <div className="bg-card rounded-2xl border border-border/60 shadow-sm p-6">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Experience</h3>
          <div className="space-y-2">
            {profile.experience.map((exp, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-secondary/40 border border-border/40">
                <div className="w-1.5 h-1.5 rounded-full gradient-bg shrink-0" />
                <span className="text-sm font-medium">{exp.role}</span>
                <span className="text-xs text-muted-foreground">@ {exp.company}</span>
                {exp.duration && <span className="text-xs text-muted-foreground ml-auto">{exp.duration}</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}