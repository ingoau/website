import type { APIRoute } from "astro";
import { DateTime } from "luxon";

export type StatsResponse = {
  quickStats: {
    title: string;
    value: string;
    className: string;
  }[];
  languages: {
    name: string;
    total_seconds: number;
    text: string;
    hours: number;
    minutes: number;
    percent: number;
    digital: string;
  }[];
};

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

export const GET = (async () => {
  const allTimeStatsRequest = await fetch(
    "https://hackatime.hackclub.com/api/v1/users/ingo/stats",
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
    `https://hackatime.hackclub.com/api/v1/users/ingo/stats?start_date=${startOfToday}&end_date=${endOfToday}`,
  );
  const dayStatsData = await dayStats.json();

  const weekStats = await fetch(
    `https://hackatime.hackclub.com/api/v1/users/ingo/stats?start_date=${date7DaysAgo}&end_date=${endOfToday}`,
  );
  const weekStatsData = await weekStats.json();

  const quickStats = [
    {
      title: "Total Coding Time",
      value: allTimeStats.data.human_readable_total.replace(/\s*\d+s$/, ""),
      className: "col-span-14 bg-diagonal-lines",
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
  return new Response(
    JSON.stringify({
      quickStats,
      languages: deduplicateLanguages(allTimeStats.data.languages).slice(0, 10),
    } as StatsResponse),
  );
}) satisfies APIRoute;
