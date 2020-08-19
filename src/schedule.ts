import { readFileSync } from "fs";
import { schedule as cronSchedule } from "node-cron";
import { setItem } from "node-persist";
import { mail } from "./email";
import { Book } from "./types";
import { nextCron } from "./utils";

// 30 emailsPerMonth == 1 per day
// 15 emailsPerMonth == every other day
//  8 emailsPerMonth == 2 per week
//  4 emailsPerMonth == 1 per week
export async function schedule(bookPaths: Book[], emailsPerMonth = 8, wordsPerEmail = 400) {
  await emailAndScheduleNext();

  async function emailAndScheduleNext() {
    await mail(getText());

    cronSchedule(nextCron(emailsPerMonth), async () => emailAndScheduleNext);
  }

  function getText() {
    let nextBook = bookPaths.filter((x) => !x.finished)[0];

    const nextBookContents = readFileSync(nextBook.filename, { encoding: "utf-8" }).split(" ");

    const startIndex = 0 + nextBook.progress;
    const endIndex = nextBook.progress + wordsPerEmail;

    const nextEmailWords = nextBookContents.slice(startIndex, endIndex);

    nextBook.progress = endIndex;
    nextBook.finished = endIndex >= nextBookContents.length;

    setItem("bookList", [...bookPaths, nextBook]);

    const percent = ((endIndex / nextBookContents.length) * 100).toFixed(0);

    return {
      title: `${nextBook.filename} (${percent}%)`,
      body: nextEmailWords,
    };
  }
}
