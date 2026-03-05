import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Trash2, Save, Loader2, User, Link, Briefcase, GraduationCap, Award, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { base44 } from "@/api/base44Client";

const TABS = [
  { id: "basic", label: "Basic", Icon: User },
  { id: "social", label: "Socials", Icon: Link },
  { id: "experience", label: "Experience", Icon: Briefcase },
  { id: "education", label: "Education", Icon: GraduationCap },
  { id: "certifications", label: "Certs", Icon: Award },
  { id: "projects", label: "Projects", Icon: FolderOpen },
];

export default function EditProfileModal({ profile, onSave, onClose }) {
  const [data, setData] = useState({
    name: profile.name || "",
    bio: profile.bio || "",
    location: profile.location || "",
    avatar_url: profile.avatar_url || "",
    resume_url: profile.resume_url || "",
    open_to_work: profile.open_to_work || false,
    skills: profile.skills || [],
    social_links: profile.social_links || {},
    experience: profile.experience || [],
    education: profile.education || [],
    certifications: profile.certifications || [],
    projects: profile.projects || [],
  });
  const [tab, setTab] = useState("basic");
  const [skillInput, setSkillInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);

  const set = (key, val) => setData((d) => ({ ...d, [key]: val }));
  const setSocial = (key, val) =>
    setData((d) => ({ ...d, social_links: { ...d.social_links, [key]: val } }));

  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !data.skills.includes(s)) set("skills", [...data.skills, s]);
    setSkillInput("");
  };
  const removeSkill = (idx) => set("skills", data.skills.filter((_, i) => i !== idx));

  // Experience
  const addExp = () => set("experience", [...data.experience, { company: "", role: "", duration: "", description: "" }]);
  const updateExp = (idx, key, val) => set("experience", data.experience.map((e, i) => i === idx ? { ...e, [key]: val } : e));
  const removeExp = (idx) => set("experience", data.experience.filter((_, i) => i !== idx));

  // Education
  const addEdu = () => set("education", [...data.education, { degree: "", field: "", institution: "", start_year: "", end_year: "", grade: "" }]);
  const updateEdu = (idx, key, val) => set("education", data.education.map((e, i) => i === idx ? { ...e, [key]: val } : e));
  const removeEdu = (idx) => set("education", data.education.filter((_, i) => i !== idx));

  // Certifications
  const addCert = () => set("certifications", [...data.certifications, { name: "", organization: "", year: "", credential_url: "" }]);
  const updateCert = (idx, key, val) => set("certifications", data.certifications.map((c, i) => i === idx ? { ...c, [key]: val } : c));
  const removeCert = (idx) => set("certifications", data.certifications.filter((_, i) => i !== idx));

  // Projects
  const addProject = () => set("projects", [...data.projects, { name: "", description: "", tech: "", link: "" }]);
  const updateProject = (idx, key, val) => set("projects", data.projects.map((p, i) => i === idx ? { ...p, [key]: val } : p));
  const removeProject = (idx) => set("projects", data.projects.filter((_, i) => i !== idx));

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingAvatar(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    set("avatar_url", file_url);
    setUploadingAvatar(false);
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingResume(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    set("resume_url", file_url);
    setUploadingResume(false);
  };

  const handleSave = async () => {
    setSaving(true);
    await onSave(data);
    setSaving(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

        <motion.div
          className="relative bg-card w-full sm:max-w-xl rounded-t-3xl sm:rounded-2xl shadow-2xl border border-border/60 max-h-[90vh] flex flex-col"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-border/60 shrink-0">
            <h2 className="text-lg font-bold">Edit Profile</h2>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-secondary hover:bg-muted flex items-center justify-center transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Tabs – scrollable */}
          <div className="flex gap-1 px-4 pt-3 pb-1 overflow-x-auto shrink-0 scrollbar-hide">
            {TABS.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  tab === id ? "gradient-bg text-white shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            ))}
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">

            {/* ── BASIC ── */}
            {tab === "basic" && (
              <>
                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-secondary border border-border/60 shrink-0">
                    {data.avatar_url
                      ? <img src={data.avatar_url} alt="" className="w-full h-full object-cover" />
                      : <div className="w-full h-full gradient-bg flex items-center justify-center text-white text-xl font-bold">{data.name?.charAt(0) || "?"}</div>
                    }
                  </div>
                  <label className="cursor-pointer">
                    <span className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
                      {uploadingAvatar ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Uploading…</> : "Change photo"}
                    </span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} disabled={uploadingAvatar} />
                  </label>
                </div>

                {/* Resume upload */}
                <div className="p-3 rounded-xl bg-secondary/50 border border-border/40 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium">Resume (PDF)</p>
                    <p className="text-xs text-muted-foreground">{data.resume_url ? "Uploaded ✓" : "No resume uploaded"}</p>
                  </div>
                  <label className="cursor-pointer shrink-0">
                    <span className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
                      {uploadingResume ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Uploading…</> : data.resume_url ? "Replace" : "Upload PDF"}
                    </span>
                    <input type="file" accept=".pdf" className="hidden" onChange={handleResumeUpload} disabled={uploadingResume} />
                  </label>
                </div>

                {[
                  { key: "name", label: "Full Name", placeholder: "Your name" },
                  { key: "location", label: "Location", placeholder: "e.g. San Francisco, CA" },
                ].map(({ key, label, placeholder }) => (
                  <div key={key} className="space-y-1.5">
                    <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
                    <Input value={data[key]} onChange={(e) => set(key, e.target.value)} placeholder={placeholder} className="rounded-xl border-border/60" />
                  </div>
                ))}

                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-muted-foreground">Bio / Summary</Label>
                  <Textarea value={data.bio} onChange={(e) => set("bio", e.target.value)} placeholder="A short intro about yourself…" rows={3} className="rounded-xl border-border/60 resize-none" />
                </div>

                {/* Skills */}
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-muted-foreground">Skills</Label>
                  <div className="flex gap-2">
                    <Input value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addSkill()} placeholder="Add a skill…" className="rounded-xl border-border/60" />
                    <Button onClick={addSkill} variant="outline" size="icon" className="rounded-xl shrink-0"><Plus className="w-4 h-4" /></Button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {data.skills.map((s, i) => (
                      <span key={i} className="flex items-center gap-1 pl-3 pr-2 py-1 rounded-xl bg-accent text-accent-foreground text-xs font-medium border border-border/50">
                        {s}
                        <button onClick={() => removeSkill(i)} className="hover:text-destructive transition-colors"><X className="w-3 h-3" /></button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Open to work */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 border border-border/40">
                  <div>
                    <p className="text-sm font-medium">Open to Work</p>
                    <p className="text-xs text-muted-foreground">Show a badge on your profile</p>
                  </div>
                  <Switch checked={data.open_to_work} onCheckedChange={(v) => set("open_to_work", v)} />
                </div>
              </>
            )}

            {/* ── SOCIALS ── */}
            {tab === "social" && (
              <div className="space-y-3">
                {[
                  { key: "linkedin", label: "LinkedIn URL", placeholder: "https://linkedin.com/in/yourname" },
                  { key: "github", label: "GitHub URL", placeholder: "https://github.com/yourname" },
                  { key: "twitter", label: "Twitter / X URL", placeholder: "https://twitter.com/yourname" },
                  { key: "website", label: "Website / Portfolio", placeholder: "https://yoursite.com" },
                  { key: "email", label: "Contact Email", placeholder: "you@example.com" },
                ].map(({ key, label, placeholder }) => (
                  <div key={key} className="space-y-1.5">
                    <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
                    <Input value={data.social_links[key] || ""} onChange={(e) => setSocial(key, e.target.value)} placeholder={placeholder} className="rounded-xl border-border/60" />
                  </div>
                ))}
              </div>
            )}

            {/* ── EXPERIENCE ── */}
            {tab === "experience" && (
              <div className="space-y-4">
                {data.experience.map((exp, idx) => (
                  <div key={idx} className="p-4 rounded-2xl border border-border/60 bg-secondary/30 space-y-3 relative">
                    <button onClick={() => removeExp(idx)} className="absolute top-3 right-3 w-6 h-6 rounded-full bg-destructive/10 hover:bg-destructive/20 text-destructive flex items-center justify-center transition-colors">
                      <Trash2 className="w-3 h-3" />
                    </button>
                    {[{ key: "company", placeholder: "Company name" }, { key: "role", placeholder: "Your role" }, { key: "duration", placeholder: "e.g. Jan 2022 – Present" }].map(({ key, placeholder }) => (
                      <Input key={key} value={exp[key]} onChange={(e) => updateExp(idx, key, e.target.value)} placeholder={placeholder} className="rounded-xl border-border/60 text-sm" />
                    ))}
                    <Textarea value={exp.description} onChange={(e) => updateExp(idx, "description", e.target.value)} placeholder="Description of responsibilities…" rows={2} className="rounded-xl border-border/60 text-sm resize-none" />
                  </div>
                ))}
                <Button onClick={addExp} variant="outline" className="w-full rounded-xl border-dashed gap-2"><Plus className="w-4 h-4" /> Add Position</Button>
              </div>
            )}

            {/* ── EDUCATION ── */}
            {tab === "education" && (
              <div className="space-y-4">
                {data.education.map((edu, idx) => (
                  <div key={idx} className="p-4 rounded-2xl border border-border/60 bg-secondary/30 space-y-3 relative">
                    <button onClick={() => removeEdu(idx)} className="absolute top-3 right-3 w-6 h-6 rounded-full bg-destructive/10 hover:bg-destructive/20 text-destructive flex items-center justify-center transition-colors">
                      <Trash2 className="w-3 h-3" />
                    </button>
                    {[
                      { key: "degree", placeholder: "Degree (e.g. B.Tech, M.Sc)" },
                      { key: "field", placeholder: "Field of Study / Branch" },
                      { key: "institution", placeholder: "Institution / University" },
                      { key: "start_year", placeholder: "Start Year (e.g. 2019)" },
                      { key: "end_year", placeholder: "End Year or Expected (e.g. 2023)" },
                      { key: "grade", placeholder: "Grade / CGPA (optional)" },
                    ].map(({ key, placeholder }) => (
                      <Input key={key} value={edu[key]} onChange={(e) => updateEdu(idx, key, e.target.value)} placeholder={placeholder} className="rounded-xl border-border/60 text-sm" />
                    ))}
                  </div>
                ))}
                <Button onClick={addEdu} variant="outline" className="w-full rounded-xl border-dashed gap-2"><Plus className="w-4 h-4" /> Add Education</Button>
              </div>
            )}

            {/* ── CERTIFICATIONS ── */}
            {tab === "certifications" && (
              <div className="space-y-4">
                {data.certifications.map((cert, idx) => (
                  <div key={idx} className="p-4 rounded-2xl border border-border/60 bg-secondary/30 space-y-3 relative">
                    <button onClick={() => removeCert(idx)} className="absolute top-3 right-3 w-6 h-6 rounded-full bg-destructive/10 hover:bg-destructive/20 text-destructive flex items-center justify-center transition-colors">
                      <Trash2 className="w-3 h-3" />
                    </button>
                    {[
                      { key: "name", placeholder: "Certification Name" },
                      { key: "organization", placeholder: "Issuing Organization" },
                      { key: "year", placeholder: "Year of Completion" },
                      { key: "credential_url", placeholder: "Credential URL (optional)" },
                    ].map(({ key, placeholder }) => (
                      <Input key={key} value={cert[key]} onChange={(e) => updateCert(idx, key, e.target.value)} placeholder={placeholder} className="rounded-xl border-border/60 text-sm" />
                    ))}
                  </div>
                ))}
                <Button onClick={addCert} variant="outline" className="w-full rounded-xl border-dashed gap-2"><Plus className="w-4 h-4" /> Add Certification</Button>
              </div>
            )}

            {/* ── PROJECTS ── */}
            {tab === "projects" && (
              <div className="space-y-4">
                {data.projects.map((proj, idx) => (
                  <div key={idx} className="p-4 rounded-2xl border border-border/60 bg-secondary/30 space-y-3 relative">
                    <button onClick={() => removeProject(idx)} className="absolute top-3 right-3 w-6 h-6 rounded-full bg-destructive/10 hover:bg-destructive/20 text-destructive flex items-center justify-center transition-colors">
                      <Trash2 className="w-3 h-3" />
                    </button>
                    {[
                      { key: "name", placeholder: "Project Name" },
                      { key: "tech", placeholder: "Technologies used (e.g. React, Node.js)" },
                      { key: "link", placeholder: "Project link (optional)" },
                    ].map(({ key, placeholder }) => (
                      <Input key={key} value={proj[key]} onChange={(e) => updateProject(idx, key, e.target.value)} placeholder={placeholder} className="rounded-xl border-border/60 text-sm" />
                    ))}
                    <Textarea value={proj.description} onChange={(e) => updateProject(idx, "description", e.target.value)} placeholder="Project description…" rows={2} className="rounded-xl border-border/60 text-sm resize-none" />
                  </div>
                ))}
                <Button onClick={addProject} variant="outline" className="w-full rounded-xl border-dashed gap-2"><Plus className="w-4 h-4" /> Add Project</Button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-border/60 flex justify-end gap-2 shrink-0">
            <Button onClick={onClose} variant="outline" className="rounded-xl">Cancel</Button>
            <Button onClick={handleSave} disabled={saving} className="gradient-bg text-white border-0 rounded-xl gap-2">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? "Saving…" : "Save Changes"}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}