import { cn } from "@/lib/utils";
import type { StatsResponse } from "@/pages/api/hackatime/stats";
import { useEffect, useState } from "react";

function HackatimeSkeleton() {
  const quickStats = [
    {
      title: "Total Coding Time",
      className: "col-span-14 bg-diagonal-lines",
    },
    {
      title: "This Week",
      className: "col-span-9",
    },
    {
      title: "Today",
      className: "col-span-9",
    },
  ];

  return (
    <div className="w-full mx-auto max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-32 border-l">
        {quickStats.map((stat, index) => (
          <div
            key={index}
            className={cn(
              stat.className,
              "p-4 flex flex-col border-r border-b h-28 items-center justify-center",
            )}
          >
            <div className="h-9 w-32 bg-muted rounded mb-2"></div>
            <div className="h-4 w-24 bg-muted rounded"></div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 border-l">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-row border-r border-b items-center"
          >
            <div className="size-14 flex justify-center items-center text-xl border-r z-10 aspect-square bg-card">
              <div className="h-6 w-6 bg-muted rounded"></div>
            </div>
            <div className="w-full flex flex-row relative p-4">
              <div className="h-5 w-24 bg-muted rounded"></div>
              <div className="grow"></div>
              <div className="h-5 w-16 bg-muted rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Hackatime() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<StatsResponse | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const statsRequest = await fetch("/api/hackatime/stats");
      setData(await statsRequest.json());
      setLoading(false);
    };

    fetchStats();
  }, []);

  if (loading) {
    return <HackatimeSkeleton />;
  }

  return (
    <>
      <div className="w-full mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-32 border-l border-dashed">
          {data?.quickStats.map((stat, index) => (
            <div
              key={index}
              className={cn(
                stat.className,
                "p-4 flex flex-col border-r border-dashed border-b h-28 items-center justify-center",
              )}
            >
              <div className="text-4xl text-primary font-mono">
                {stat.value}
              </div>
              <div>{stat.title}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 border-l border-dashed">
          {data?.languages.map(
            (
              lang: {
                name: string;
                total_seconds: number;
                text: string;
                hours: number;
                minutes: number;
                percent: number;
                digital: string;
              },
              index: number,
            ) => (
              <div
                key={index}
                className="flex flex-row border-r border-b border-dashed items-center"
              >
                <div className="size-14 flex justify-center items-center text-xl border-r border-dashed z-10 aspect-square bg-card font-mono">
                  {index + 1}
                </div>
                <div className="w-full flex flex-row relative overflow-hidden">
                  <div className="p-4 z-10">{lang.name}</div>
                  <div className="grow"></div>
                  <div className="p-4 z-10 font-mono">
                    {lang.percent.toFixed(2)}%
                  </div>
                  <div
                    className="bg-card bg-striped-gradient absolute top-0 left-0 h-full z-0 animate-in slide-in-from-left"
                    style={{
                      width: `${lang.percent}%`,
                    }}
                  ></div>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </>
  );
}
