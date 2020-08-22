import { createTransport } from "nodemailer";
import { err } from "./utils";

if (!module.parent)
  (async () => {
    await mail({ title: "test", body: "this is a test LMAO" }).catch(err);
  })();

export async function mail({ body, title }) {
  // Create a SMTP transporter object
  let transporter = createTransport({
    port: 25,
    host: "localhost",
    tls: {
      rejectUnauthorized: false,
    },
  });

  // Message object
  let message = {
    from: "Jacob <jacob@unli.xyz>",

    // Comma separated list of recipients
    to: "Jacob Chapman <chapmanjacobd@gmail.com>",

    // Subject of the message
    subject: title,

    // plaintext body
    text: body,

    // HTML body
    // html:
    //   '<p><b>Hello</b> to myself <img src="cid:note@example.com"/></p>' +
    //   '<p>Here\'s a nyan cat for you as an embedded attachment:<br/><img src="cid:nyan@example.com"/></p>',
  };

  let info = await transporter.sendMail(message);
  console.log("Message sent successfully as %s", info.messageId);
}
