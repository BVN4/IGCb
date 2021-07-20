global.Discord = require('discord.js');
global.client = new Discord.Client({intents : Discord.Intents.ALL});
global.config = require('./config.json');
global.DB = new (require('sync-mysql'))(config.mysql);
global.fs = require('fs');

client.on('ready', msg => {
  global.guild = client.guilds.cache.get(config.home);
  global.everyone = guild.roles.cache.get('433242520034738186');

  fs.readdirSync('./functions/').forEach(file => {
    global[file.split('.')[0]] = require('./functions/' + file);
  });

  global.commands = require('./commands');
  client.user.setActivity('i!help', {type: 'LISTENING'});
  log.start('== Bot ready ==');
});

client.on('message', msg => {

  // Проверка на канал и наличие префикса
  if(msg.author.id == client.user.id) return;
  if(msg.channel.type == 'dm') return send.error(msg, 'Лс для пидоров');
  if(msg.channel.guild.id != config.home) return;

  if(msg.channel.id == 500300930466709515) reaction.opinion(msg); // Реакции в #предложения
  if(msg.channel.id == 572472723624951839) reaction.event(msg); // Реакции в #ивенты
  if(msg.channel.id == 612280548777525249) reaction.opinion(msg); // Реакции в #выборы

  if(msg.content.substr(0, config.prefix.length) != config.prefix) return;

  const content = msg.content.substr(config.prefix.length).split(/\s+/);
  const command = commands.get(content.shift());

  if(!command) return;

  log.info(member2name(msg.member, 1, 1), 'used', msg.content);
  command.call(msg, content);
});

client.login(config.token);
