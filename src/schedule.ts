import { schedule as cronSchedule } from "node-cron";
import { mail } from "./email";

// 30 emailsPerMonth == 1 per day
// 15 emailsPerMonth == every other day
//  8 emailsPerMonth == 2 per week
//  4 emailsPerMonth == 1 per week
export async function schedule(bookPaths, emailsPerMonth = 8) {
  bookPaths;

  const content = { title: "", body: "" };

  return cronSchedule("", async () => await mail(content));
}
