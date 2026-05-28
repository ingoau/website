// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { cn } from "@/lib/utils";
import { DateTime } from "luxon";

export function HackatimeSkeleton() {
  const quickStats = [
    {
      title: "Total Coding Time",
      className: "col-span-14 bg-striped-gradient bg-size-[80px_80px]",
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
    <div className="w-full mx-auto max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-32 border-l border-dashed">
        {quickStats.map((stat, index) => (
          <div
            key={index}
            className={cn(
              stat.className,
              "p-4 flex flex-col border-r border-dashed border-b h-28 items-center justify-center",
            )}
          >
            <div className="h-9 w-32 bg-muted rounded mb-2"></div>
            <div className="h-4 w-24 bg-muted rounded"></div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 border-l border-dashed">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-row border-r border-b border-dashed items-center"
          >
            <div className="size-14 flex justify-center items-center text-xl border-r border-dashed z-10 aspect-square bg-card">
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

// Helper function to deduplicate and merge languages
function deduplicateLanguages(
  languages: Array<{
    name: string;
    total_seconds: number;
    text: string;
    hours: number;
    minutes: number;
    percent: number;
    digital: string;
  }>,
) {
  const languageMap = new Map();

  // Combine duplicate languages
  languages.forEach((lang) => {
    const existing = languageMap.get(lang.name);
    if (existing) {
      existing.total_seconds += lang.total_seconds;
    } else {
      languageMap.set(lang.name, { ...lang });
    }
  });

  // Convert back to array and recalculate percentages
  const merged = Array.from(languageMap.values());
  const totalSeconds = merged.reduce(
    (sum, lang) => sum + lang.total_seconds,
    0,
  );

  // Recalculate all fields based on new total_seconds
  merged.forEach((lang) => {
    lang.percent =
      Math.round((lang.total_seconds / totalSeconds) * 100 * 100) / 100;
    lang.hours = Math.floor(lang.total_seconds / 3600);
    lang.minutes = Math.floor((lang.total_seconds % 3600) / 60);
    const seconds = lang.total_seconds % 60;
    lang.digital = `${String(lang.hours).padStart(2, "0")}:${String(lang.minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    lang.text =
      lang.hours > 0 ? `${lang.hours}h ${lang.minutes}m` : `${lang.minutes}m`;
  });

  // Sort by total_seconds descending
  return merged.sort((a, b) => b.total_seconds - a.total_seconds);
}

export default async function Hackatime() {
  const allTimeStatsRequest = await fetch(
    "https://hackatime.hackclub.com/api/v1/users/inw/stats",
  );
  const allTimeStats = await allTimeStatsRequest.json();

  // I hate timezones i hate timezones i hate timezones i hate timezones i hate timezones i hate timezones i hate timezones i hate timezones i hate timezones i hate timezones i hate timezones i hate timezones i hate timezones i hate timezones i hate timezones i hate timezones i hate timezones i hate timezones
  const startOfToday = DateTime.now()
    .setZone("Australia/Sydney")
    .startOf("day")
    .toUTC()
    .toISO();

  const endOfToday = DateTime.now()
    .setZone("Australia/Sydney")
    .startOf("day")
    .plus({ hours: 24 })
    .toUTC()
    .toISO();

  const date7DaysAgo = DateTime.now()
    .setZone("Australia/Sydney")
    .startOf("day")
    .minus({ days: 6 })
    .toUTC()
    .toISO();

  const dayStats = await fetch(
    `https://hackatime.hackclub.com/api/v1/users/inw/stats?start_date=${startOfToday}&end_date=${endOfToday}`,
  );
  const dayStatsData = await dayStats.json();

  const weekStats = await fetch(
    `https://hackatime.hackclub.com/api/v1/users/inw/stats?start_date=${date7DaysAgo}&end_date=${endOfToday}`,
  );
  const weekStatsData = await weekStats.json();

  const quickStats = [
    {
      title: "Total Coding Time",
      value: allTimeStats.data.human_readable_total.replace(/\s*\d+s$/, ""),
      className: "col-span-14 bg-striped-gradient bg-size-[80px_80px]",
    },
    {
      title: "This Week",
      value: weekStatsData.data.human_readable_total.replace(/\s*\d+s$/, ""),
      className: "col-span-9",
    },
    {
      title: "Today",
      value: dayStatsData.data.human_readable_total.replace(/\s*\d+s$/, ""),
      className: "col-span-9",
    },
  ];
  return (
    <div className="w-full mx-auto max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-32 border-l border-dashed">
        {quickStats.map((stat, index) => (
          <div
            key={index}
            className={cn(
              stat.className,
              "p-4 flex flex-col border-r border-dashed border-b h-28 items-center justify-center",
            )}
          >
            <div className="text-4xl text-primary font-mono">{stat.value}</div>
            <div>{stat.title}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 border-l border-dashed">
        {deduplicateLanguages(allTimeStats.data.languages)
          .slice(0, 10)
          .map(
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
                    className="bg-card bg-striped-gradient bg-size-[80px_80px] absolute top-0 left-0 h-full z-0 animate-in slide-in-from-left"
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
  );
}
