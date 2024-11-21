const TelegramBot = require("node-telegram-bot-api");
const token = process.env?.TG_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const path = require("path");
const fs = require("fs");
const moment = require("moment");
const axios = require("axios");

const Messenger = {
  telegramBook: -1002287710785,
  telegramNews: -1002351009998,
  instagram: "https://www.instagram.com",
  facebook: "https://www.facebook.com",
  site: "https://via.placeholder.com",
  //   site: "https://x.com/boss4227823481",
  // site: "http://localhost:8000",
};

function uploadNewsToTelegram() {
  try {
    let news = [];

    // translator: uzk > uzl
    function toLatin(text) {
      const cyrillicToLatinMap = {
        А: "A",
        а: "a",
        Б: "B",
        б: "b",
        В: "V",
        в: "v",
        Г: "G",
        г: "g",
        Д: "D",
        д: "d",
        Е: "E",
        е: "e",
        Ё: "Yo",
        ё: "yo",
        Ж: "J",
        ж: "j",
        З: "Z",
        з: "z",
        И: "I",
        и: "i",
        Й: "Y",
        й: "y",
        К: "K",
        к: "k",
        Л: "L",
        л: "l",
        М: "M",
        м: "m",
        Н: "N",
        н: "n",
        О: "O",
        о: "o",
        П: "P",
        п: "p",
        Р: "R",
        р: "r",
        С: "S",
        с: "s",
        Т: "T",
        т: "t",
        У: "U",
        у: "u",
        Ф: "F",
        ф: "f",
        Х: "X",
        х: "x",
        Ц: "S",
        ц: "s",
        Ч: "Ch",
        ч: "ch",
        Ш: "Sh",
        ш: "sh",
        Щ: "Sh",
        щ: "sh",
        Ы: "I",
        ы: "i",
        Э: "E",
        э: "e",
        Ю: "Yu",
        ю: "yu",
        Я: "Ya",
        я: "ya",
        Қ: "Q",
        қ: "q",
        Ў: "O‘",
        ў: "o‘",
        Ҳ: "H",
        ҳ: "h",
        Ғ: "G‘",
        ғ: "g‘",
        ъ: "‘",
        Ъ: "‘",
      };

      return text
        .split("")
        .map((char) => cyrillicToLatinMap[char] || char)
        .join("");
    }

    // telegram kanalga yuklash
    const channelPost = async (data, moderator) => {
      try {
        console.log(data, "- dataa on cannelpost");
        // await NewsCategoryModel.populate([data], { path: "newsCategory" });
        let media = [];
        // rasmlarni telegramformatiga moslash
        for (let index = 0; index < data.photos.length; index++) {
          const element = data.photos[index];
          console.log(element, "- each elemntgtttt");
          let file = {};
          if (index == 0) {
            file = {
              type: "photo",
              media: element,
              caption: "",
              parse_mode: "HTML",
              disable_web_page_preview: true,
              caption_entities: [],
            };
          } else {
            file = {
              type: "photo",
              media: element,
              caption_entities: "",
            };
          }
          file.media = "https://via.placeholder.com/600/92c952";
          media.push(file);
        }
        console.log(media, "- meiia after allllll");
        let links = Messenger;
        // let links = await MessangerLinkModel.findOne({ prefix: data?.prefix });
        if (!links) {
          return await bot.sendMessage(
            chatId,
            "Sizga messangerlar linklari biriktirilmagan adminga bog'laning"
          );
        }
        let pastkiLinklar = `<a href="${links?.site}">${
          links?.site.split("//")[1]
        }</a> | <a href="${links?.facebook}">Facebook</a> | <a href="${
          links?.instagram
        }">Instagram</a>`;

        let tilBuyicha = "";

        if (data.title?.UZK) {
          tilBuyicha += `${data.title?.UZK}
      ${data.tgTextUZK?.replace(
        /#(.*?)#/g,
        `<a href="https://${links?.site.split("//")[1]}/news/${
          data?._id
        }?language=UZK">$1</a>`
      )}`;
        } else {
          tilBuyicha += `${data.tgTextUZK?.replace(
            /#(.*?)#/g,
            `<a href="https://${links?.site.split("//")[1]}/news/${
              data?._id
            }?language=UZK">$1</a>`
          )}`;
        }

        if (data.title?.RUS) {
          tilBuyicha += `\n—\n${data?.title?.RUS}
      ${data.tgTextRUS?.replace(
        /#(.*?)#/g,
        `<a href="https://${links?.site.split("//")[1]}/news/${
          data?._id
        }?language=RUS">$1</a>`
      )}`;
        } else {
          if (data.title?.RUS) {
            tilBuyicha += `\n—\n${data.tgTextRUS?.replace(
              /#(.*?)#/g,
              `<a href="https://${links?.site.split("//")[1]}/news/${
                data?._id
              }?language=RUS">$1</a>`
            )}`;
          }
        }

        if (data.title?.ENG) {
          tilBuyicha += `\n—\n${data?.title?.ENG}
      ${data.tgTextENG?.replace(
        /#(.*?)#/g,
        `<a href="https://${links?.site.split("//")[1]}/news/${
          data?._id
        }?language=ENG">$1</a>`
      )}`;
        } else {
          if (data.title?.ENG) {
            tilBuyicha += `\n—\n${data.tgTextENG?.replace(
              /#(.*?)#/g,
              `<a href="https://${links?.site.split("//")[1]}/news/${
                data?._id
              }?language=ENG">$1</a>`
            )}`;
          }
        }
        let caption = `${tilBuyicha}\n\n${pastkiLinklar}`;
        //     let pastkiLinklar = `
        // <a href="${links?.site}">${links?.site.split("//")[1]}</a> | <a href="${
        //       links?.facebook
        //     }">Facebook</a> | <a href="${
        //       links?.instagram
        //     }">Instagram</a> | <a href="${links?.youtube}">Youtube</a>`;

        //     let tilBuyicha = "";
        //     if (data.title?.UZK) {
        //       tilBuyicha += `${data.title?.UZK}
        // ${data.tgTextUZK?.replace(
        //   /#(.*?)#/g,
        //   `<a href="https://${links?.site.split("//")[1]}/news/${
        //     data?._id
        //   }?language=UZK">$1</a>`
        // )}`;
        //     } else {
        //       tilBuyicha += `
        // ${data.tgTextUZK?.replace(
        //   /#(.*?)#/g,
        //   `<a href="https://${links?.site.split("//")[1]}/news/${
        //     data?._id
        //   }?language=UZK">$1</a>`
        // )}`;
        //     }

        //     if (data.title?.RUS) {
        //       tilBuyicha += `\n—\n${data?.title?.RUS}
        // ${data.tgTextRUS?.replace(
        //   /#(.*?)#/g,
        //   `<a href="https://${links?.site.split("//")[1]}/news/${
        //     data?._id
        //   }?language=RUS">$1</a>`
        // )}`;
        //     } else {
        //       if (data.title?.RUS) {
        //         tilBuyicha += `\n—\n${data.tgTextRUS?.replace(
        //           /#(.*?)#/g,
        //           `<a href="https://${links?.site.split("//")[1]}/news/${
        //             data?._id
        //           }?language=RUS">$1</a>`
        //         )}`;
        //       }
        //     }

        //     if (data.title?.ENG) {
        //       tilBuyicha += `\n—\n${data?.title?.ENG}
        // ${data.tgTextENG?.replace(
        //   /#(.*?)#/g,
        //   `<a href="https://${links?.site.split("//")[1]}/news/${
        //     data?._id
        //   }?language=ENG">$1</a>`
        // )}`;
        //     } else {
        //       if (data.title?.ENG) {
        //         tilBuyicha += `\n—\n${data.tgTextENG?.replace(
        //           /#(.*?)#/g,
        //           `<a href="https://${links?.site.split("//")[1]}/news/${
        //             data?._id
        //           }?language=ENG">$1</a>`
        //         )}`;
        //       }
        //     }
        //     let caption = `${tilBuyicha}\n${pastkiLinklar}`;
        media[0]["caption"] = caption;
        console.log(media, "- mediaaaaaaaa");
        if (links.telegramNews) {
          // if (moderator?.telegramChannelId) {
          let uploaded = await bot.sendMediaGroup(
            links.telegramNews,
            // moderator?.telegramChannelId,
            media
          );
          console.log(uploaded, "natijaaaaaaaaaaaaaaaaaaaaa");
        } else {
          return console.log("Yangiliklar telegram kanal biriktirilmagan");
        }
        return "ok";
      } catch (err) {
        // console.log(err, "- error on channelPost");
        return err;
      }
    };

    // shaxsiy post, botni o'ziga tashlanadigan
    const selfPost = async (data, moderator, chatId) => {
      try {
        // await NewsCategoryModel.populate([data], { path: "newsCategory" });
        let confirmationOptions = {
          parse_mode: "Markdown",
          reply_markup: {
            one_time_keyboard: true,
            resize_keyboard: true,
            inline_keyboard: [
              [
                {
                  text: "Tasdiqlash ✅",
                  callback_data: `done_${data?._id}_${chatId}`,
                },
                // {
                //   text: "Keyinroq",
                //   callback_data: `next_${data?._id}_${chatId}`,
                // },
              ],
            ],
          },
        };
        let addButton = [];
        if (
          !data.title.RUS &&
          (data?.languageCount == 2 || data?.languageCount == 3)
        ) {
          addButton.push({
            text: "Ruscha",
            callback_data: `rus_${data?._id}_${chatId}`,
          });
        }
        if (!data.title.ENG && data?.languageCount == 3) {
          addButton.push({
            text: "Inglizcha",
            callback_data: `eng_${data?._id}_${chatId}`,
          });
        }

        if (addButton?.length > 0) {
          confirmationOptions.reply_markup.inline_keyboard.unshift(addButton);
        }

        let media = [];
        console.log(data.photos, "- photossss");
        // rasmlarni telegramformatiga moslash
        for (let index = 0; index < data.photos.length; index++) {
          const element = data.photos[index];
          let file = {};
          if (index == 0) {
            file = {
              type: "photo",
              media: element,
              caption: "",
              parse_mode: "HTML",
              disable_web_page_preview: true,
              caption_entities: [],
            };
          } else {
            file = {
              type: "photo",
              media: element,
              caption_entities: "",
            };
          }
          file.media = "https://via.placeholder.com/600/92c952";
          media.push(file);
        }

        // data.photos.forEach((element, index) => {
        //   let file = {};
        //   if (index == 0) {
        //     file = {
        //       type: "photo",
        //       media: element,
        //       caption: "",
        //       parse_mode: "HTML",
        //       disable_web_page_preview: true,
        //       caption_entities: [],
        //     };
        //   } else {
        //     file = {
        //       type: "photo",
        //       media: element,
        //       caption_entities: "",
        //     };
        //   }
        //   media.push(file);
        // });

        let links = Messenger;
        // let links = await Messenger.findOne();
        // let links = await MessangerLinkModel.findOne({ prefix: data?.prefix });
        if (!links) {
          return await bot.sendMessage(
            chatId,
            "Sizga messenjerlar linklari biriktirilmagan adminga bog'laning"
          );
        }
        let pastkiLinklar = `<a href="${links?.site}">${
          links?.site.split("//")[1]
        }</a> | <a href="${links?.facebook}">Facebook</a> | <a href="${
          links?.instagram
        }">Instagram</a>`;

        let tilBuyicha = "";

        if (data.title?.UZK) {
          tilBuyicha += `${data.title?.UZK}
      ${data.tgTextUZK?.replace(
        /#(.*?)#/g,
        `<a href="https://${links?.site.split("//")[1]}/news/${
          data?._id
        }?language=UZK">$1</a>`
      )}`;
        } else {
          tilBuyicha += `${data.tgTextUZK?.replace(
            /#(.*?)#/g,
            `<a href="https://${links?.site.split("//")[1]}/news/${
              data?._id
            }?language=UZK">$1</a>`
          )}`;
        }

        if (data.title?.RUS) {
          tilBuyicha += `\n—\n${data?.title?.RUS}
      ${data.tgTextRUS?.replace(
        /#(.*?)#/g,
        `<a href="https://${links?.site.split("//")[1]}/news/${
          data?._id
        }?language=RUS">$1</a>`
      )}`;
        } else {
          if (data.title?.RUS) {
            tilBuyicha += `\n—\n${data.tgTextRUS?.replace(
              /#(.*?)#/g,
              `<a href="https://${links?.site.split("//")[1]}/news/${
                data?._id
              }?language=RUS">$1</a>`
            )}`;
          }
        }

        if (data.title?.ENG) {
          tilBuyicha += `\n—\n${data?.title?.ENG}
      ${data.tgTextENG?.replace(
        /#(.*?)#/g,
        `<a href="https://${links?.site.split("//")[1]}/news/${
          data?._id
        }?language=ENG">$1</a>`
      )}`;
        } else {
          if (data.title?.ENG) {
            tilBuyicha += `\n—\n${data.tgTextENG?.replace(
              /#(.*?)#/g,
              `<a href="https://${links?.site.split("//")[1]}/news/${
                data?._id
              }?language=ENG">$1</a>`
            )}`;
          }
        }
        let caption = `${tilBuyicha}\n\n${pastkiLinklar}`;
        console.log(caption.length, "222222222222222222222222222222");
        media[0]["caption"] = caption;
        console.log(media, "- mediaaaaaa");
        let foo = await bot.sendMediaGroup(chatId, media);
        console.log(foo, "- bot.sendMediaGroupppp");
        await bot.sendMessage(
          chatId,
          "Quyidagilardan birini tanlang:",
          confirmationOptions
        );
        return "ok";
      } catch (err) {
        console.log(err, "- error on selfPost");
        return err;
      }
    };
    const phoneShareOptions = {
      parse_mode: "Markdown",
      reply_markup: {
        resize_keyboard: true,
        one_time_keyboard: true,
        keyboard: [[{ text: "Telefon raqam ulashish", request_contact: true }]],
      },
    };
    const removeKeyboard = {
      reply_markup: {
        remove_keyboard: true,
      },
    };
    const addNewOptions = {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Yangiliklar yaratish", callback_data: "addNew" }],
        ],
      },
    };
    const saveImagesButtonOptions = {
      parse_mode: "Markdown",
      reply_markup: {
        resize_keyboard: true,
        one_time_keyboard: true,
        keyboard: [[{ text: "Rasmlarni saqlash" }]],
      },
    };

    bot.on("message", async (ctx) => {
      try {
        const chat_id = ctx.chat.id;
        const text = ctx.text;
        const news_channel_id = -1002351009998;
        const phone = "605325993";
        // const phone = "901234567";
        let contact = ctx.contact;
        let photo = ctx.photo;
        let chalaNew = news.find((elem) => elem.chatId == chat_id);
        // const databaseUser = await User.findOne({ where: { role: 'admin' } })
        // console.log(text, "- texttt", contact, "- contactttt");
        if (text === "/start") {
          let indexOfObject = news.findIndex((object) => {
            return object.chatId == chat_id;
          });
          console.log(text, '- texttt')
          news.splice(indexOfObject, 1);
          const response = await bot.sendMessage(
            chat_id,
            "Telefon raqamingizni kiriting:",
            phoneShareOptions
          );
          console.log(response, '- res from telegram send')
        }

        // phone share
        if (contact) {
          if (contact.phone_number.length == 13) {
            contact.phone_number = contact.phone_number.slice(4, 13);
          } else {
            contact.phone_number = contact.phone_number.slice(3, 12);
          }

          if (chat_id != contact?.user_id) {
            return await bot.sendMessage(
              chat_id,
              "Iltimos tugma orgali kiriting:"
            );
          }

          if (phone !== contact.phone_number) {
            return await bot.sendMessage(
              chat_id,
              "Siz ro'yhatdan o'tmagansiz!!!",
              removeKeyboard
            );
          } else {
            // const removePhoneShareKeyboard = {
            //   reply_markup: {
            //     remove_keyboard: true,
            //   },
            // };

            await bot.sendMessage(chat_id, "✅", removeKeyboard);

            return await bot.sendMessage(
              chat_id,
              `Xush kelibsiz!`,
              addNewOptions
            );
          }
        }

        if (chalaNew) {
          // chalaNew.status - 1 > title: uzl, uzk, 2 > desc: uzl, uzk,
          // 3 > photos 4 > save photos, 5 > title: rus, eng,
          // 6 > desc: rus, eng, 7 > done,

          if (chalaNew?.status == 7) {
            // let result = await verifyCode(moderUser, text);
            // if (result) {
            /// bu joy to'girlanishi kerak
            // if (chalaNew.messangerlar.includes("telegram")) {
            //   await kanalPost(chalaNew, moderUser);
            // }
            // if (chalaNew.messangerlar.includes("meta")) {
            //   await facebookPost(chalaNew, moderUser);
            // }
            // if (chalaNew.messangerlar.includes("site")) {
            //   chalaNew.active = true;
            // } else {
            //   chalaNew.active = false;
            // }
            // chalaNew.checking = true;
            await channelPost(chalaNew, "moderUser");
            chalaNew.date = moment().format("YYYY-MM-DD HH:mm");
            delete chalaNew?.language;
            delete chalaNew?.status;
            delete chalaNew?.tgText;
            // await NewsModel.findByIdAndUpdate(chalaNew?._id, chalaNew);
            //  3. facebook kanalga tashlash
            let indexOfObject = news.findIndex((object) => {
              return object.chatId == chat_id;
            });
            news.splice(indexOfObject, 1);
            await bot.sendMessage(
              chat_id,
              "Yangilik qabul qilindi.",
              addNewOptions
            );
            return;
            // } else {
            //   await bot.sendMessage(chat_id, "Tasdiqlash kodi noto'g'ri!");
            //   return;
            // }
          }

          // desc: rus/eng
          if (chalaNew?.status == 6) {
            let maxlength = 300;
            if (chalaNew.languageCount == 2) {
              // if (chalaNew.titleCheck == "true") {
              //   maxlength = 350;
              // } else {
              maxlength = 450;
              // }
            }

            if (chalaNew.languageCount == 3) {
              // if (chalaNew.titleCheck == "true") {
              //   maxlength = 200;
              // } else {
              maxlength = 300;
              // }
            }
            if (text.split("!!!")[0]?.length > maxlength) {
              return await bot.sendMessage(
                chat_id,
                `Matnda ${maxlength}-ta belgi bo'lishi mumkin, matnni qisqartiring:`
              );
            }
            chalaNew.desc[chalaNew?.language] = text
              .split("!!!")
              .join("")
              ?.replace(/#/g, "");
            chalaNew[`tgText${chalaNew?.language}`] = text.split("!!!")[0];
            chalaNew.status = 7;
            // await NewsModel.findByIdAndUpdate(chalaNew?._id, chalaNew);
            await selfPost(chalaNew, "moderUser", chat_id);
            return;
          }

          // title: rus/eng
          if (chalaNew?.status == 5) {
            if (text?.length > 100 || text?.length < 50) {
              return await bot.sendMessage(
                chat_id,
                "Sarlavhada 50 tadan 100 tagacha belgi bo'lishi mumkin, qayta kiriting:"
              );
            }
            chalaNew.title[chalaNew?.language] = text;
            chalaNew.status = 6;
            await bot.sendMessage(
              chat_id,
              `Sarlavha qabul qilindi,${
                chalaNew?.language == "RUS" ? " ruscha" : " inglizcha"
              } matnini kiriting:`
            );
            return;
          }

          //saqlash tugmasini qabul qilish
          if (
            chalaNew?.status == 3 &&
            chalaNew?.photos.length > 0 &&
            text == "Rasmlarni saqlash"
          ) {
            chalaNew.status = 4;
            // let doc = await NewsModel.create(chalaNew);
            // chalaNew["_id"] = doc?._id;
            // doc["tgTextUZK"] = chalaNew?.tgTextUZK;
            await selfPost(chalaNew, "moderUser", chat_id);
            return;
          }

          // images
          if (photo?.length > 0 && chalaNew?.status == 3) {
            // if (
            //   photo[photo.length - 1]?.width >= 400 &&
            //   photo[photo.length - 1]?.height >= 150
            // ) {
            console.log(photo, "- photo");
            let TgPhotoLink = photo[photo.length - 1].file_id;

            const savePath = path.join(
              __dirname,
              "./uploads/news"
              // "../../uploads/news"
              // `${prefixMode}/news`
            ); // Fayl saqlanadigan papka
            if (!fs.existsSync(savePath)) {
              fs.mkdirSync(savePath, { recursive: true }); // Agar papka yo'q bo'lsa, uni yaratish
            }
            //-----------------

            const file = await bot.getFile(TgPhotoLink);
            console.log(file, "- bot.getFile");
            const fileUrl = `https://api.telegram.org/file/bot${token}/${file.file_path}`;

            // Rasmni URL orqali yuklab olish
            const response = await axios.get(fileUrl, {
              responseType: "arraybuffer",
            });
            const imageBuffer = Buffer.from(response.data, "binary");
            console.log(imageBuffer, "- imagebufferrr");
            let imageName = `news_${Date.now()}.jpg`;
            const filePath = path.join(savePath, imageName);

            await fs.promises.writeFile(filePath, imageBuffer);
            //   const outputFilePath = path.join(savePath, imageName);
            //-----------------------
            //   const imageMetadata = await sharp(imageBuffer).metadata();
            //   const watermarkMetadata = await sharp(watermarkPath).metadata();

            //   const imageWidth = imageMetadata.width;
            //   const imageHeight = imageMetadata.height;
            //   const watermarkWidth = watermarkMetadata.width;
            //   const watermarkHeight = watermarkMetadata.height;

            //   // O'ngdan 5% joy qoldirib offset hisoblash
            //   const horizontalOffset = Math.round(imageWidth * 0.05); // O'ngdan 5%
            //   const xPos = imageWidth - watermarkWidth - horizontalOffset; // O'ngdan 5% joy qoldirib qo'yish
            //   const verticalOffset = Math.round(imageHeight * 0.02); // Yuqoriga 2%
            //   const yPos = imageHeight - watermarkHeight - verticalOffset; // Yuqoriga ko'tarilgan pozitsiya

            //------------------
            //   await sharp(imageBuffer)
            //     .composite([
            //       {
            //         input: watermarkPath,
            //         gravity: "southeast",
            //         left: xPos, // O'ngdan 5% joy qoldirish
            //         top: yPos, // Pastki qism
            //       },
            //     ]) // O'ng pastki burchak
            //     .toFile(outputFilePath);
            //   chalaNew.prefix = prefixMode;
            chalaNew.photos.push(
              `${process.env.URL}/uploads/news/${imageName}`
              //   `${process.env.URL}/files/news/${imageName}`
              // `${process.env.URL}/files/${prefixMode}/news/${imageName}`
            );

            //-----------------

            // await bot
            //   .downloadFile(TgPhotoLink, savePath)
            //   .then((nat) => {
            //     chalaNew.photos.push(
            //       `${process.env.URL}/files/news/${path.basename(nat)}`
            //     );
            //   })
            //   .catch((error) => {
            //     console.error("Rasmni yuklab olishda xatolik:", error);
            //     return bot.sendMessage(chatId, "Rasmni saqlab bo'lmadi.");
            //   });
            if (chalaNew?.photos.length == 1) {
              await bot.sendMessage(
                chat_id,
                "Rasmlar qabul qilindi! Saqlash uchun tugmani bosing ⬇️",
                saveImagesButtonOptions
              );
            }
            return;
            // } else {
            //   return await bot.sendMessage(
            //     chat_id,
            //     "Iltimos sifatli rasm yuboring"
            //   );
            // }
          }

          if (chalaNew.status == 2) {
            let maxlength = 850;
            if (chalaNew.languageCount == 1) {
              maxlength = 950;
            }

            if (chalaNew.languageCount == 2) {
              maxlength = 450;
            }

            if (chalaNew.languageCount == 3) {
              maxlength = 300;
            }

            if (text.split("!!!")[0]?.length > maxlength) {
              return await bot.sendMessage(
                chat_id,
                `Matnda belgilar soni ${maxlength}-ta dan ortib ketti, matnni qisqartiring!`
              );
            }
            let latin = await toLatin(text);
            chalaNew.desc.UZK = text.split("!!!").join("")?.replace(/#/g, "");
            chalaNew.desc.UZL = latin.split("!!!").join("")?.replace(/#/g, ""); // bu joyda Krildan lotinga o'tkazib UZL ga yozish kerak
            chalaNew.tgTextUZK = text.split("!!!")[0];
            chalaNew.status = 3;
            return await bot.sendMessage(
              chat_id,
              `Matn qabul qilindi!\nYangilik rasmlarini yuboring. Rasmlarni sonini 10 tadan oshirmang. Barcha rasmlarni yuborib bo'lgach, 'Saqlash' tugmasini bosing`
            );
          }

          // title - uzl, uzk
          if (chalaNew.status == 1) {
            if (text?.length > 100 || text?.length < 50) {
              return await bot.sendMessage(
                chat_id,
                "Sarlavhada 50tadan 100 tagacha belgi bolishi mumkin, qayta kiriting:"
              );
            }
            const latin = await toLatin(text);
            chalaNew.title.UZL = latin;
            chalaNew.title.UZK = text;
            chalaNew.status = 2;
            console.log(chalaNew, "- chala onnnnn");
            return await bot.sendMessage(
              chat_id,
              "Sarlavha qabul qilindi!\nYangiliklar matnini kiriting. Matnni kiritayotganda telegram guruh uchun nazarda tutilgan qismini !!! (ketma-ket uchta undov belgisi) yordamida ajratib qo'ying"
            );
          }
          console.log(chalaNew, "- chala afterrr");
        }
      } catch (err) {
        console.log(err, "- error on telegram bot");
      }
    });

    bot.on("callback_query", async (cbQuery) => {
      const chat_id = cbQuery.message.chat.id;
      const message_id = cbQuery.message.message_id;
      const text = cbQuery.data;
      let chalaNew = news.find((elem) => elem?.chatId == chat_id);

      bot.deleteMessage(chat_id, message_id);
      console.log(text, "- messsss");
      // if (message?.split("_")[0] == "lang") {
      // }
      if (text === "addNew") {
        let indexOfObject = news.findIndex((object) => {
          return object.chatId == chat_id;
        });
        console.log(news, "- newsss on addnew");
        news.splice(indexOfObject, 1);
        news.push({
          _id: null,
          chatId: chat_id,
          title: {
            UZL: null,
            RUS: null,
            UZK: null,
            ENG: null,
          },
          desc: {
            UZL: null,
            RUS: null,
            UZK: null,
            ENG: null,
          },
          photos: [],
          date: "",
          status: 0,
          tgTextUZK: "",
          tgTextRUS: "",
          tgTextENG: "",
          language: "UZK",
          languageCount: 1, // nechta tilda kiritilishi
        });
        console.log(news, "- newsss afterrr addnew");
        await bot.sendMessage(
          chat_id,
          "Yangilik yaratish tanlandi. Ma'lumotlar qaysi tillarda bo'lishi kerak? Quyidagilardan birini tanlang:",
          {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "UZ",
                    callback_data: "newLan_1",
                  },
                  {
                    text: "UZ/RU",
                    callback_data: "newLan_2",
                  },
                  {
                    text: "UZ/RU/EN",
                    callback_data: "newLan_3",
                  },
                ],
              ],
            },
          }
        );
      }

      if (chalaNew) {
        if (text?.split("_")[0] == "newLan") {
          chalaNew.languageCount = text?.split("_")[1] * 1;
          chalaNew.status = 1;
          return await bot.sendMessage(
            chat_id,
            "Sarlavhani O'zbekcha formatini kiriting:"
          );
        }

        // oxirgi tasdiqlash, messenjer va kanallarga yuklanadi
        if (text?.split("_")[0] == "done") {
          chalaNew.status = 7;
          // await bot.sendMessage(chat_id, "Yangilik qabul qilindi.");
          // return;
          const posted = await channelPost(chalaNew, "moderUser");
          console.log(posted, "- posteddd");
          chalaNew.date = moment().format("YYYY-MM-DD HH:mm");
          delete chalaNew?.language;
          delete chalaNew?.status;
          delete chalaNew?.tgText;
          // await NewsModel.findByIdAndUpdate(chalaNew?._id, chalaNew);
          //  3. facebook kanalga tashlash
          let indexOfObject = news.findIndex((object) => {
            return object.chatId == chat_id;
          });
          news.splice(indexOfObject, 1);
          await bot.sendMessage(
            chat_id,
            "Yangilik qabul qilindi.",
            addNewOptions
          );
          return;
        }

        // if (text?.split("_")[0] == "next") {
        //   // chalaNew.active = false;
        //   // chalaNew.checking = false;
        //   delete chalaNew?.language;
        //   delete chalaNew?.status;
        //   delete chalaNew?.tgText;
        //   await NewsModel.findByIdAndUpdate(chalaNew?._id, chalaNew);
        //   //  2. telegram kanalga tashlash
        //   //  3. facebook kanalga tashlash
        //   let indexOfObject = newsArray.findIndex((object) => {
        //     return object.chatId == chat_id;
        //   });
        //   newsArray.splice(indexOfObject, 1);
        //   await bot.sendMessage(
        //     chat_id,
        //     "Yangilik qabul qilindi. Admin panel orqali tasdiqlashingiz mumkin.",
        //     addNew
        //   );
        //   return;
        // }

        if (text?.split("_")[0] == "rus") {
          chalaNew.language = "RUS";
          chalaNew.status = 5;
          await bot.sendMessage(chat_id, "Ruschadagi sarlavhani kiriting:");
          return;
        }

        if (text?.split("_")[0] == "eng") {
          chalaNew.language = "ENG";
          chalaNew.status = 5;
          await bot.sendMessage(chat_id, "Inglizcha sarlavhani kiriting:");
          return;
        }
      }

      // if (cbQuery.data === "addNew") {
      //   bot.sendMessage(
      //     chat_id,
      //     "Yangilik yaratish tanlandi. Ma'lumotlar qaysi tillarda bo'lishi kerak? Quyidagilardan birini tanlang:",
      //     {
      //       reply_markup: {
      //         inline_keyboard: [
      //           [
      //             {
      //               text: "UZ",
      //               callback_data: "lang_uz",
      //             },
      //             {
      //               text: "UZ/RU",
      //               callback_data: "lang_uz_ru",
      //             },
      //             {
      //               text: "UZ/RU/EN",
      //               callback_data: "lang_uz_ru_en",
      //             },
      //           ],
      //         ],
      //       },
      //     }
      //   );
      // }
      bot.answerCallbackQuery(cbQuery.id);
    });
    console.log(news, "- newssss");
  } catch (err) {
    console.log(err, "- error on uploadNewsToTelegram");
  }
}

module.exports = { uploadNewsToTelegram };
