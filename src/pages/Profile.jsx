import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { Loader2 } from "lucide-react";

import ProfileHero from "@/components/profile/ProfileHero";
import ProfileStats from "@/components/profile/ProfileStats";
import SocialLinks from "@/components/profile/SocialLinks";
import SkillsSection from "@/components/profile/SkillsSection";
import ExperienceSection from "@/components/profile/ExperienceSection";
import EducationSection from "@/components/profile/EducationSection";
import CertificationsSection from "@/components/profile/CertificationsSection";
import ProjectsSection from "@/components/profile/ProjectsSection";
import EditProfileModal from "@/components/profile/EditProfileModal";
import ViewToggle from "@/components/profile/ViewToggle";
import RecruiterView from "@/components/profile/RecruiterView";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [profileId, setProfileId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [view, setView] = useState("candidate"); // "candidate" | "recruiter"

  useEffect(() => { loadProfile(); }, []);

  const loadProfile = async () => {
    setLoading(true);
    const records = await base44.entities.Profile.list("-created_date", 1);
    if (records.length > 0) {
      setProfile(records[0]);
      setProfileId(records[0].id);
    }
    setLoading(false);
  };

  const handleSave = async (updatedData) => {
    let updated;
    if (profileId) {
      updated = await base44.entities.Profile.update(profileId, updatedData);
    } else {
      updated = await base44.entities.Profile.create(updatedData);
      setProfileId(updated.id);
    }
    setProfile(updated);
    setEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-3">
        <p className="text-muted-foreground">No profile found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="sticky top-0 z-30 glass border-b border-border/40">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="text-sm font-bold gradient-text tracking-tight">Profile.page</span>
          <ViewToggle view={view} onChange={setView} />
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 py-6 pb-16 space-y-4">
        <AnimatePresence mode="wait">
          {view === "candidate" ? (
            <motion.div
              key="candidate"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              {/* Hero */}
              <div className="bg-card rounded-2xl border border-border/60 shadow-sm">
                <ProfileHero profile={profile} onEdit={() => setEditing(true)} />
              </div>

              {/* Stats */}
              <ProfileStats profile={profile} />

              {/* Main grid */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="md:col-span-3 space-y-4">
                  <SocialLinks links={profile.social_links} />
                  <ExperienceSection experience={profile.experience} />
                  <EducationSection education={profile.education} />
                  <ProjectsSection projects={profile.projects} />
                </div>
                <div className="md:col-span-2 space-y-4">
                  <SkillsSection skills={profile.skills} />
                  <CertificationsSection certifications={profile.certifications} />
                </div>
              </div>
            </motion.div>
          ) : (
            <RecruiterView key="recruiter" profile={profile} />
          )}
        </AnimatePresence>
      </main>

      {editing && (
        <EditProfileModal
          profile={profile}
          onSave={handleSave}
          onClose={() => setEditing(false)}
        />
      )}
    </div>
  );
}