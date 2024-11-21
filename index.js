// const moment = require("moment");

// // const sample = [
// //   {
// //     date: "2024-11-01",
// //     isEmpty: false
// //   },
// //   {
// //     date: "2024-11-01",
// //     isEmpty: true
// //   },
// // ]

// const data = [
//   {
//     start_date: "2024-11-01",
//     end_date: "2024-11-05",
//   },
//   {
//     start_date: "2024-11-10",
//     end_date: "2024-11-12",
//   },
//   {
//     start_date: "2024-11-22",
//     end_date: "2024-11-27",
//   },
// ];

// const dates = getDaysOfMonth("2024-11");
// const report = getEmptyDays(dates, data);

// console.log(report, "- repp");

// // console.log(dates);

// function getEmptyDays(dates, data) {
//   const result = [];
//   outerLoop: for (let obj = 0; obj < data.length; obj++) {
//     const { start_date, end_date } = data[obj];
//     const index = dates.indexOf(start_date);
//     if (index === -1) {
//       result.push({
//         date: start_date,
//         isEmpty: true,
//       });
//     } else {
//       const endIndex = dates.indexOf(end_date);
//       const length = endIndex - index;
//       for (let day = index; day <= length; day++) {
//         const currentDay = dates[day];
//         if (currentDay != end_date) {
//           result.push({
//             date: currentDay,
//             isEmpty: false,
//           });
//           continue;
//         } else {
//           result.push({
//             date: currentDay,
//             isEmpty: false,
//           });
//           continue outerLoop;
//         }
//       }
//     }
//   }
//   return result;
// }

// // function getEmptyDays(dates) {
// //   const result = []
// //   for (let day = 0; day < dates.length; day++) {
// //     const currentDay = dates[day]
// //     const doc = data.find(d => d.start_date == currentDay)
// //     if (!doc) {
// //       result.push({
// //       date: currentDay,
// //       isEmpty: true
// //     })
// //     } else {

// //     }
// //   }
// //   return result
// // }

// function getDaysOfMonth(date) {
//   const month = moment(date, "YYYY-MM");
//   const daysInMonth = month.daysInMonth();
//   const dates = [];

//   for (let day = 1; day <= daysInMonth; day++) {
//     dates.push(month.clone().date(day).format("YYYY-MM-DD"));
//   }

//   return dates;
// }

// 222222222222222

// const moment = require("moment");

// // const sample = [
// //   {
// //     date: "2024-11-01",
// //     isEmpty: false
// //   },
// //   {
// //     date: "2024-11-01",
// //     isEmpty: true
// //   },
// // ]

// const data = [
//   {
//     start_date: "2024-11-01",
//     end_date: "2024-11-05",
//   },
//   {
//     start_date: "2024-11-10",
//     end_date: "2024-11-12",
//   },
//   {
//     start_date: "2024-11-22",
//     end_date: "2024-11-27",
//   },
// ];

// const dates = getDaysOfMonth("2024-11");
// const report = getEmptyDays(dates, data);

// console.log(report, "- report");

// // console.log(dates);

// function getEmptyDays(dates, data) {
//   const result = [];
//   outerLoop: for (let obj = 0; obj < data.length; obj++) {

//     const { start_date, end_date } = data[obj];
//     middleLoop: for (let day = 0; day < dates.length; day++) {

//       const monthDay = dates[day];
//       const index = dates.indexOf(start_date);
//       if (index === -1) {
//         result.push({
//           date: monthDay,
//           isEmpty: true
//         })
//       }
//     }
//   }
//   return result;
// }

// // function getEmptyDays(dates) {
// //   const result = []
// //   for (let day = 0; day < dates.length; day++) {
// //     const currentDay = dates[day]
// //     const doc = data.find(d => d.start_date == currentDay)
// //     if (!doc) {
// //       result.push({
// //       date: currentDay,
// //       isEmpty: true
// //     })
// //     } else {

// //     }
// //   }
// //   return result
// // }

// function getDaysOfMonth(date) {
//   const month = moment(date, "YYYY-MM");
//   const daysInMonth = month.daysInMonth();
//   const dates = [];

//   for (let day = 1; day <= daysInMonth; day++) {
//     dates.push(month.clone().date(day).format("YYYY-MM-DD"));
//   }

//   return dates;
// }

// /////////////////////

// const moment = require("moment");

// // const sample = [
// //   {
// //     date: "2024-11-01",
// //     isEmpty: false
// //   },
// //   {
// //     date: "2024-11-02",
// //     isEmpty: true
// //   },
// // ]

// const data = [
//   {
//     start_date: "2024-11-01",
//     end_date: "2024-11-05",
//   },
//   {
//     start_date: "2024-11-10",
//     end_date: "2024-11-12",
//   },
//   {
//     start_date: "2024-11-22",
//     end_date: "2024-11-27",
//   },
// ];

// const dates = getDaysOfMonth("2024-11");
// const report = getEmptyDays(dates, data);

// console.log(report, "- report");

// // console.log(dates);

// function getEmptyDays(dates, data) {
//   const result = [];
//   outerLoop: for (let day = 0; day < dates.length; day++) {

//     const monthDay = dates[day]
//     const doc = data.find(d => d.start_date == monthDay)
//     if (!doc) {
//       result.push({
//         date: monthDay,
//         isEmpty: true
//       })
//     } else {
//       const startIndex = dates.indexOf(doc?.start_date)
//       const endIndex = dates.indexOf(doc?.end_date)

//       if (monthDay != existEndDate) {
//         result.push({
//           date: monthDay,
//           isEmpty: false
//         })
//       } else {
//         console.log('123');
//       }
//     }
//   }
//   return result;
// }

// // function getEmptyDays(dates) {
// //   const result = []
// //   for (let day = 0; day < dates.length; day++) {
// //     const currentDay = dates[day]
// //     const doc = data.find(d => d.start_date == currentDay)
// //     if (!doc) {
// //       result.push({
// //       date: currentDay,
// //       isEmpty: true
// //     })
// //     } else {

// //     }
// //   }
// //   return result
// // }

// function getDaysOfMonth(date) {
//   const month = moment(date, "YYYY-MM");
//   const daysInMonth = month.daysInMonth();
//   const dates = [];

//   for (let day = 1; day <= daysInMonth; day++) {
//     dates.push(month.clone().date(day).format("YYYY-MM-DD"));
//   }

//   return dates;
// }

// lasttt ////////////////

// const moment = require("moment");

// // const sample = [
// //   {
// //     date: "2024-11-01",
// //     isEmpty: false
// //   },
// //   {
// //     date: "2024-11-02",
// //     isEmpty: true
// //   },
// // ]

// // const reservations = [
// //   {
// //     start_date: "2024-11-01",
// //     end_date: "2024-11-05",
// //   },
// //   {
// //     start_date: "2024-11-10",
// //     end_date: "2024-11-12",
// //   },
// //   {
// //     start_date: "2024-11-22",
// //     end_date: "2024-11-27",
// //   },
// //   {
// //     start_date: "2024-11-30",
// //     end_date: "2024-12-02",
// //   },
// // ];
// const reservations = [
//   {
//     start_date: "2024-12-01",
//     end_date: "2024-12-05",
//   },
//   {
//     start_date: "2024-12-10",
//     end_date: "2024-12-12",
//   },
//   {
//     start_date: "2024-12-22",
//     end_date: "2024-12-27",
//   },
//   {
//     start_date: "2024-12-31",
//     end_date: "2025-02-02",
//   },
// ];

// const dates = getDaysOfMonth("2024-12");
// const report = getEmptyDays(dates, reservations);

// console.log(report, "- report");

// // console.log(dates);

// function getEmptyDays(dates, data) {
//   const result = [];
//   for (let day = 0; day < dates.length; day++) {
//     const monthDay = dates[day];
//     const reservation = data.find((d) => d?.start_date == monthDay);
//     if (!reservation) {
//       result.push({
//         date: monthDay,
//         isEmpty: true,
//       });
//     } else {
//       const startIndex = dates.indexOf(reservation?.start_date);
//       const endIndex = dates.indexOf(reservation?.end_date);
//       const foo = dates.slice(startIndex, endIndex + 1);
//       const splittedOrg = monthDay.split("-");
//       const splittedClause = reservation?.end_date.split("-");
//       if (
//         Number(splittedClause[1]) > Number(splittedOrg[1]) ||
//         Number(splittedClause[0]) > Number(splittedOrg[0])
//       ) {
//         // case: 2024-11-30 -- 2024-12-02
//         let docs = getDateRange(monthDay, reservation?.end_date);
//         for (let j = 0; j < docs.length; j++) {
//           result.push({
//             date: docs[j],
//             isEmpty: false,
//           });
//         }
//       } else {
//         for (let k = 0; k < foo.length; k++) {
//           result.push({
//             date: foo[k],
//             isEmpty: false,
//           });
//         }
//         day = endIndex;
//       }
//     }
//   }
//   return result;
// }

// function getDaysOfMonth(date) {
//   const month = moment(date, "YYYY-MM");
//   const daysInMonth = month.daysInMonth();
//   const dates = [];

//   for (let day = 1; day <= daysInMonth; day++) {
//     dates.push(month.clone().date(day).format("YYYY-MM-DD"));
//   }

//   return dates;
// }

// function getDateRange(startDate, endDate) {
//   const start = moment(startDate);
//   const end = moment(endDate);
//   const dateArray = [];

//   while (start.isSameOrBefore(end)) {
//     dateArray.push(start.format("YYYY-MM-DD"));
//     start.add(1, "days");
//   }

//   return dateArray;
// }

// let start = '2024-10-28'
// let end = '01'

// console.log(start.split('-'))

// //////////////////////////////////////////////

require("dotenv").config();
const express = require("express");
const app = express();
const env = process.env;
const cors = require("cors");
const { uploadNewsToTelegram, bot } = require("./telegram");

const TOKEN = process.env.TG_BOT_TOKEN; // tg token
const webhook_path = "webhook";

// prod
const server_url = "https://test-telegram-bot-36on.onrender.com";
const webhook_url = `${server_url}/${webhook_path}${TOKEN}`;

// dev
// const NGROK_URL = "https://b2ca-93-188-86-111.ngrok-free.app";
// const webhook_url = `${NGROK_URL}/${webhook_path}${TOKEN}`;

app.use(express.json());
app.use(cors());
app.use(express.static(process.env.UPLOAD_PATH));

app.post(`/webhook${TOKEN}`, async (req, res) => {
  try {
    const updated = bot.processUpdate(req.body);
    console.log(updated, '- updated on /webhook${TOKEN}')
    res.status(200).send("ok");
  } catch (err) {
    console.error("Error processing update:", err);
    res.status(500).send("Internal Server Error");
  }
});

async function setTelegramWebHook() {
  try {
    const response = await bot.setWebHook(webhook_url);
    console.log("Webhook set response:", response);
  } catch (err) {
    console.error("Failed to set webhook:", err.message);
  }
}

setTelegramWebHook();

uploadNewsToTelegram();

app.listen(env.PORT, () => console.log(`${env.PORT}'s listening...`));
