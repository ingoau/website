import { cn } from "@/lib/utils";
import { GitBranch } from "lucide-react";
import { FaReact, FaHtml5, FaCss3, FaNodeJs } from "react-icons/fa";
import {
  RiNextjsFill,
  RiTailwindCssFill,
  RiSvelteFill,
  RiMicrosoftFill,
} from "react-icons/ri";
import {
  SiBun,
  SiDocker,
  SiDrizzle,
  SiFortinet,
  SiGithubactions,
  SiGnubash,
  SiLinux,
  SiNixos,
  SiReactrouter,
  SiSanity,
  SiTraefikproxy,
  SiTypescript,
  SiUbiquiti,
} from "react-icons/si";
import { VscAzure } from "react-icons/vsc";

const technologies = {
  frontend: {
    title: "Frontend",
    items: [
      {
        name: "React",
        icon: FaReact,
      },
      {
        name: "Next.js",
        icon: RiNextjsFill,
      },
      {
        name: "TypeScript",
        icon: SiTypescript,
      },
      {
        name: "Tailwind",
        icon: RiTailwindCssFill,
      },
      {
        name: "Svelte",
        icon: RiSvelteFill,
      },
      {
        name: "React Router",
        icon: SiReactrouter,
      },
      {
        name: "HTML",
        icon: FaHtml5,
      },
      {
        name: "CSS",
        icon: FaCss3,
      },
    ],
  },
  backend: {
    title: "Backend",
    items: [
      {
        name: "Bun",
        icon: SiBun,
      },
      {
        name: "Node.js",
        icon: FaNodeJs,
      },
      {
        name: "Convex",
        icon: ConvexIcon,
      },
      {
        name: "Drizzle ORM",
        icon: SiDrizzle,
      },
      {
        name: "TypeScript",
        icon: SiTypescript,
      },
      {
        name: "Sanity CMS",
        icon: SiSanity,
      },
    ],
  },
  infrastructure: {
    title: "Infrastructure",
    items: [
      {
        name: "Docker",
        icon: SiDocker,
      },
      {
        name: "Traefik",
        icon: SiTraefikproxy,
      },
      {
        name: "Linux",
        icon: SiLinux,
      },
      {
        name: "Github Actions",
        icon: SiGithubactions,
      },
      {
        name: "Nix",
        icon: SiNixos,
      },
      {
        name: "Bash",
        icon: SiGnubash,
      },
      {
        name: "Git",
        icon: GitBranch,
      },
    ],
  },
  enterprise: {
    title: "Enterprise",
    items: [
      {
        name: "Entra ID",
        icon: RiMicrosoftFill,
      },
      {
        name: "Intune",
        icon: RiMicrosoftFill,
      },
      {
        name: "Microsoft 365",
        icon: RiMicrosoftFill,
      },
      {
        name: "Azure",
        icon: VscAzure,
      },
      {
        name: "UniFi",
        icon: SiUbiquiti,
      },
      {
        name: "Fortinet",
        icon: SiFortinet,
      },
    ],
  },
};

function ConvexIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="184"
      height="188"
      viewBox="0 0 184 188"
      version="1.1"
      id="svg3"
      fill="currentColor"
    >
      <defs id="defs3" />
      <path
        d="m 115.48354,146.56652 c 26.5102,-2.94493 51.50417,-17.07125 65.26566,-40.64821 -6.51737,58.31487 -70.2843,95.17466 -122.334559,72.54481 -4.796237,-2.07954 -8.924685,-5.53962 -11.75783,-9.98766 -11.697123,-18.36714 -15.542168,-41.73833 -10.017433,-62.94825 15.785001,27.2428 47.881238,43.94192 78.844162,41.03931 z"
        id="path1"
      />
      <path
        d="M 35.67155,88.415825 C 24.925473,113.24853 24.460093,142.32425 37.634496,166.25144 -8.7290369,131.37051 -8.2230868,56.725429 37.067838,22.193423 c 4.189156,-3.191703 9.167518,-5.086207 14.388713,-5.374425 21.471722,-1.132587 43.287555,7.1659 58.586599,22.63014 -31.084191,0.308794 -61.359036,20.220929 -74.3716,48.966687 z"
        id="path2"
      />
      <path
        d="M 125.03486,47.090049 C 109.35143,25.221827 84.803434,10.334169 57.908108,9.8811922 109.89722,-13.716776 173.84656,24.542362 180.80903,81.107349 c 0.64795,5.25082 -0.20284,10.604668 -2.53048,15.340635 -9.7133,19.726506 -27.72437,35.026136 -48.77084,40.688336 15.42075,-28.60143 13.51778,-63.544964 -4.47285,-90.046271 z"
        id="path3"
      />
    </svg>
  );
}

export default function Technologies() {
  return (
    <div className="w-full mx-auto max-w-5xl border-b sm:px-10 bg-diagonal-lines sm:border-x">
      <div className="border-b border-x p-4">
        <h2 className="text-primary text-2xl">Technologies I know</h2>
      </div>
      <div className="w-full grid grid-cols-3 md:grid-cols-5 border-l border-t group -my-px bg-background">
        {technologies.backend.items.map((item, index) => (
          <div
            key={item.name}
            className={cn(
              "flex flex-col gap-2 items-center justify-center aspect-square text-center border-b border-r group-hover:opacity-75 group-hover:hover:opacity-100 group-hover:hover:bg-card duration-200 hover:border-border/75",
              index % 2 === 0 ? "" : "bg-diagonal-lines",
            )}
          >
            <item.icon className="size-10" />
            <span className="text-lg">{item.name}</span>
          </div>
        ))}
        <Placeholders
          cols={3}
          className="block md:hidden"
          length={technologies.backend.items.length}
        />
        <Placeholders
          cols={5}
          className="md:block hidden"
          length={technologies.backend.items.length}
        />
      </div>
    </div>
  );
}

function Placeholders({
  cols,
  className,
  length,
}: {
  cols: number;
  className: string;
  length: number;
}) {
  if (length % cols === 0) return;
  return (
    <>
      {Array(cols - (length % cols))
        .fill(null)
        .map((_, index) => (
          <div
            key={index}
            className={cn(
              "border-b border-r group-hover:opacity-50 group-hover:hover:opacity-100 group-hover:hover:bg-card duration-200",
              (length + index) % 2 === 0 ? "" : "bg-diagonal-lines",
              className,
            )}
          ></div>
        ))}
    </>
  );
}
