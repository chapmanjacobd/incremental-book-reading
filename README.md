# incremental-book-reading
Send book passages to yourself eight times a week

## Quickstart

### step 1) Add books

```
mv -iv samplebooks/ books/
```

If you don't like emails then you can just do this:

```
ts-node src/content.ts
```

It works surprisingly fast for ad-hoc use. A few seconds on 80,000 txt files (most of it is typescript transpiling time. If you used this often then just compile it to js and use with node instead of ts-node).

### step 2) Configure email address

```
tee src/env.ts
export const env = {
  from: "<fromYou@you.me>",
  to: "Иван Васильевич <toEmail@gmail.ne>",
};
```

### step 3) Configure mail transport

You will need your own mail transport :/

You _can_ use Gmail but I prefer to use a local SMTP server.


### step 3b) optional. configure how often you get emails, how many words per email in schedule.ts line 15

Run it like this (and keep it running 24/7 so that it can send the emails, duh):
```
ts-node src/schedule.ts
```

## Test Email

You can test email like this:

```
ts-node src/email.ts
```
