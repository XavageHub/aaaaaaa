var Discord = require("discord.js-selfbot-v13");
var momentD = require("moment-duration-format");
var moment = require("moment");
const keep_alive = require('./keep_alive.js')
var express = require("express");
var client = new Discord.Client({


  checkUpdate: false
});



var config = {
  token: process.env.token, //โทเคน

  url: "https://www.youtube.com/watch?v=xMaasONDom0", //ลิงค์สำหรับปุ่ม "ดู" ใส่ได้แค่ลิงค์ Youtube (50/50)
  statusTexts: {
    enable: false, //ปิดเปิดปุ่ม true = เปิด false = ปิด
    texts: [
      "A",
      "B",
      "C"
    ]
  }, //ข้อความที่จะเปลี่ยนสถานะกำหนดเอง
  stateTexts: [
    "𝐗𝐈𝐂𝐊𝐀𝐈𝐒𝐑𝐄𝐀𝐋𝐁𝐈𝐓𝐂𝐇",
    "𝕾𝖚𝖈𝖐 𝖒𝖆 𝖉𝖎𝖈𝖐 𝖕𝖚𝖘𝖘𝖞"
  ], //ข้อความที่จะโชว์ตรงกลางในเม็ดม่วง
  //ข้อความด้านบนสุดของเม็ดม่วง

  images: { //หมวดรูปภาพ
    large: [
      "https://cdn.discordapp.com/attachments/1202493531961163848/1230705159529562202/7bd19f30da7db79a.gif?ex=66344a7f&is=6621d57f&hm=73235344e9c2da13c2329c32d062a78a883992f11aa8e54fdbd15372009b9034&"

    ], //ลิงค์รูปใหญ่
    small: [
      "https://cdn.discordapp.com/attachments/1202493531961163848/1230705138914693223/gifs.gif?ex=66344a7a&is=6621d57a&hm=37062b4cc4dc804cd0ec7eb1c9ce2257d58cb792d507754c8b780f8c5af2fa7c&"

    ] //ลิงค์รูปเล็ก
  },
  buttons: {
    first: { //ปุ่มที่ 1
      enable: false, //ปิดเปิดปุ่ม true = เปิด false = ปิด
      name: [
        "INSTAGRAM ☄"

      ], //ชื่อปุ่ม
      link: [
        "https://www.instagram.com/realxicka/",
        
      ] //ลิงค์นำทางของปุ่ม
    },
    two: { //ปุ่มที่ 2
      enable: true, //ปิดเปิดปุ่ม true = เปิด false = ปิด
      name: [
        "INSTAGRAM ☄☥"

      ], //ชื่อปุ่ม
      link: [
        "https://www.instagram.com/realxicka/ ",

      ] //ลิงค์นำทางของปุ่ม
    }
  }
};

var nowAt = { topTexts: 0, stateTexts: 0, statusTexts: { texts: 0 }, images: { large: 0, small: 0 }, buttons: { first: { name: 0, link: 0 }, two: { name: 0, link: 0 } } }

client.on("ready", async () => {
  console.log(`🟢: ${client.user.tag}`)
  var startedWhen = Date.now();
  var temperature = getTemperature();
  var RPresence = new Discord.RichPresence()
    .setApplicationId('1121867777867788309')
    .setType('STREAMING')
    .setURL(config['url'])
    .setStartTimestamp(startedWhen)
    .setState(`Loading`)
    .setDetails(`《URMOM》 ☠ 《${getTime()}》`)
    .setName(`Sup Store`)
    .setAssetsLargeImage(config['images']['large'][nowAt['images']['large']])
    .setAssetsSmallImage(config['images']['small'][nowAt['images']['small']])
    .setAssetsLargeText(`⊹ 𝕏𝕖𝕟𝕠𝕫𝔽𝕦𝕔𝕜𝕦ℍ𝕆𝕖 ✞`);

  client.user.setActivity(RPresence);

  if (config['statusTexts']['enable']) {
    try {
      await client.settings.setCustomStatus({
        text: config['statusTexts']['texts'][nowAt['statusTexts']['texts']],
        expires: null,
      })
    } catch { }

    setInterval(async () => {
      try {
        await client.settings.setCustomStatus({
          text: config['statusTexts']['texts'][nowAt['statusTexts']['texts']],
          expires: null,
        })
      } catch { }
      nowAt['statusTexts']['texts'] = (nowAt['statusTexts']['texts'] + 1) % config['statusTexts']['texts'].length;
    }, 5000)
  }

  setInterval(async () => {
    var temperature = getTemperature();
    var RPresence = new Discord.RichPresence()
      .setApplicationId('1121867777867788309')
      .setType('STREAMING')
      .setURL(config['url'])
      .setStartTimestamp(startedWhen)
      .setState(`${config['stateTexts'][nowAt['stateTexts']]}`)
      .setDetails(`《URMOM》 ☠ 《${getTime()}》`)
      .setName(`Sup Store`)
      .setAssetsLargeImage(config['images']['large'][nowAt['images']['large']])
      .setAssetsSmallImage(config['images']['small'][nowAt['images']['small']])
      .setAssetsLargeText(`⊹ 𝕏𝕖𝕟𝕠𝕫𝔽𝕦𝕔𝕜𝕦ℍ𝕆𝕖 ✞ `);

    if (config['buttons']['first']['enable']) { RPresence.addButton(config['buttons']['first']['name'][nowAt['buttons']['first']['name']], config['buttons']['first']['link'][nowAt['buttons']['first']['link']]) };
    if (config['buttons']['two']['enable']) { RPresence.addButton(config['buttons']['two']['name'][nowAt['buttons']['two']['name']], config['buttons']['two']['link'][nowAt['buttons']['two']['link']]) };

    client.user.setActivity(RPresence);


    nowAt['stateTexts'] = (nowAt['stateTexts'] + 1) % config['stateTexts'].length;

    nowAt['buttons']['first']['name'] = (nowAt['buttons']['first']['name'] + 1) % config['buttons']['first']['name'].length;
    nowAt['buttons']['first']['link'] = (nowAt['buttons']['first']['link'] + 1) % config['buttons']['first']['link'].length;
    nowAt['buttons']['two']['name'] = (nowAt['buttons']['two']['name'] + 1) % config['buttons']['two']['name'].length;
    nowAt['buttons']['two']['link'] = (nowAt['buttons']['two']['link'] + 1) % config['buttons']['two']['link'].length;
    nowAt['images']['large'] = (nowAt['images']['large'] + 1) % config['images']['large'].length;
    nowAt['images']['small'] = (nowAt['images']['small'] + 1) % config['images']['small'].length;
  }, 6000)
})

function getTemperature() {
  var hour = (new Date()).toLocaleString([], { timeZone: "Asia/Bangkok", hour: 'numeric' });

  if (hour > 17 || hour == 18 || hour == 19) {
    return randomNum(20, 23);
  } else if (hour < 5 || hour == 0 || hour == 24) {
    return randomNum(20, 23);
  } else if (hour < 17 || hour > 5) {
    return randomNum(31, 40);
  } else {
    return randomNum(31, 40);
  }
}

function randomNum(min, max) {
  return ((Math.random() * (max - min)) + min).toFixed(1);
}
function getTime() {
  return (new Date()).toLocaleString([], { timeZone: "Asia/Bangkok", hour: "numeric", minute: "numeric", hour12: false });
}
function getDate() {
  return (new Date()).toLocaleString([], { timeZone: "Asia/Bangkok", year: "numeric", month: "numeric", day: "numeric" });
}

client.login(config['token']); //เข้าสู่ระบบ?
