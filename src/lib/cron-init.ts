export function getCronSchedule() {
  return "0 0 * * *"
}

export function generateCronConfig() {
  return {
    schedule: getCronSchedule(),
    url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/cron`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.CRON_SECRET || ""}`,
    },
    timezone: "Africa/Algiers",
    retries: 2,
  }
}
