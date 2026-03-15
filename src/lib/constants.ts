import { type Easing } from "motion";
// import { FaDiscord, FaGit, FaGitAlt, FaGithub, FaGoogle } from "react-icons/fa";
// import { SiGitlab, SiHackclub, SiVercel } from "react-icons/si";

export const NICE_EASE: Easing | Easing[] = [0.165, 0.84, 0.44, 1.0];

export const NAVBAR_ITEMS = [
  { url: "/", label: "Home" },
  { url: "/projects/", label: "Projects" },
  { url: "/blog/", label: "Blog" },
  { url: "/contact/", label: "Contact" },
];

export const OTHER_PAGES = [{ url: "/guestbook", label: "Guestbook" }];

// export const AUTH_PROVIDERS = [
//   { label: "GitHub", id: "github", icon: FaGithub, type: "social" },
//   { label: "Google", id: "google", icon: FaGoogle, type: "social" },
//   { label: "Discord", id: "discord", icon: FaDiscord, type: "social" },
//   { label: "Vercel", id: "vercel", icon: SiVercel, type: "social" },
//   { label: "GitLab", id: "gitlab", icon: SiGitlab, type: "social" },
//   { label: "Hack Club", id: "hackclub", icon: SiHackclub, type: "oauth2" },
//   { label: "git.gay", id: "gitdotgay", icon: FaGitAlt, type: "oauth2" },
// ];
