/**
 * Переключение роли участнику.
 *
 * @param {Message} msg
 * @param {Role}    role
 * @param {Number}  user ID пользователя
 */
module.exports = (msg, role, user, silent) => {
	const member = guild.member(user);

	if(!member)
		return send.error(msg, 'Пользователь с ID:' + user + ' не найден');

	let action = { val : 'add', text : 'выдана' };
	if(member._roles.includes(role.id))
		action = { val : 'remove', text : 'убрана у' };

	member.roles[action.val](role, 'По требованию ' + member2name(msg.member, 1));
	const text = 'Роль <@&' + role.id + '> ' + action.text + ' <@' + member.id + '>';
	if(!silent) send.success(msg, text);
	return text;
};
