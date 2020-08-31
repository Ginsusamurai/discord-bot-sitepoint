const Discord = require('discord.js');
require('dotenv').config();
const findBonusAndDescription = require('../lib/findBnsAndDesc.js');

module.exports = {


  name: '$d',
  description: 'Custom Roll',
  async execute(msg, args) {

    console.log('args', args);

    const client = process.env.CLIENT;


    const rollResultEmbed = new Discord.MessageEmbed();


    const dieMin = 1;
    const dieMax = args[0];
    let rollBonus = 0;
    // let description = null;

    if(dieMax <= 1) {
      msg.reply(`Please provide a die size larger than 1`);
      return;
    }

    //below section handles bonus and descriptor info
    let bonusRegex = /^[+-]\d*/;
    let descRegex = /^[#]/;

    let helper = findBonusAndDescription(args, bonusRegex, descRegex, dieMax, dieMin);
    
    if(helper.errorMsg){
      msg.reply(helper.errorMsg);
      return;
    }
    
    helper.rollResult = helper.rollResult <= 0 ? 1 : helper.rollResult;

    let rollNotes = `Rolling 1d${dieMax}`;
    if(helper.rollBonus != 0){
      rollNotes += helper.rollBonus > 0 ? `+${helper.rollBonus}` : `${helper.rollBonus}`;
    }

    rollResultEmbed
      .setTitle(`Custom Roll`)
      .setDescription("")
      .setColor(`#0062ff`)
      .addFields(
        { name: `${rollNotes} => `, value: `${helper.rollResult}!`}
      );

    let y = JSON.stringify(msg.guild.members.cache);
    let q = JSON.parse(y).find(ele => ele.userID == msg.author.id);
    let z = q.displayName;
    // console.log(z);

    rollResultEmbed
      .setFooter(`In response to ${z}`);
    
    

    rollResultEmbed
    .setDescription(helper.description ? helper.description : "");

    msg.channel.send(rollResultEmbed);

    return;
}
};