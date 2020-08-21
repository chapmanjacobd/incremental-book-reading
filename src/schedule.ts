import { schedule as cronSchedule } from "node-cron";
import { getText } from "./content";
import { mail } from "./email";
import { initializeBooks } from "./io";
import { Book } from "./types";
import { handleErr, nextCron } from "./utils";

interface ContentConfig {
  wordsPerEmail?: number;
  emailsPerMonth?: number;
}

// 30 emailsPerMonth == 1 per day
// 15 emailsPerMonth == every other day
//  8 emailsPerMonth == 2 per week
//  4 emailsPerMonth == 1 per week

export async function schedule(bookList: Book[], userConfig?: ContentConfig) {
  const opts = { wordsPerEmail: 400, emailsPerMonth: 8 };
  Object.assign(opts, userConfig);

  await emailAndScheduleNext();

  async function emailAndScheduleNext() {
    await mail(getText(bookList, opts.wordsPerEmail));

    cronSchedule(nextCron(opts.emailsPerMonth), async () => emailAndScheduleNext);
  }
}

if (!module.parent)
  (async () => {
    await initializeBooks()
      .then(async (b) => await schedule(b))
      .catch(handleErr);
  })();
