/**
 * Формирует имя участника гильдии
 *
 * @param  {GuildMember} m   Объект участника гильдии
 * @param  {Boolean}     dis Если true - добавляет к нику дискриминатор
 * @param  {Boolean}     id  Если true - добавляет к результату ID
 * @return {String}
 */
module.exports = (m, dis, id) => {
  let text = m.displayName || m.nickname;

  if(dis) text += '#' + m.discriminator;

  if(id){
    if(m.user.bot) text = 'bot:' + text;
    text = m.user.id + ':' + text;
  }

  return text;
};
