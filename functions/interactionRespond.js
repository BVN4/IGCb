module.exports = {

	send 				: function(int, data, status){ this.call(int, data, 4, status); },
	defSend 			: function(int, status){ this.call(int, null, 5, status); },
	update 				: function(int, data, status){ this.call(int, data, 7, status); },
	defUpdate 			: function(int, data, status){ this.call(int, data, 6, status); },
	autocompleteResult 	: function(int, data, status){ this.call(int, data, 8, status); },

	/**
	 * @param {Object} int          interactions
	 * @param {Object} data         Объект с данными
	 * @param {Array}  data.embeds  Массив эмбедов. По умолчанию: undefined
	 * @param {String} data.content Текст сообщения. По умолчанию: undefined
	 * @param {Number} data.flags   Флаги. По умолчанию: undefined
	 * @param {Number} type         Тип ответа итерации
	 * @param {String} status       Статус ответа, для прикрепления эмодзи
	 */
	call : (int, data, type, status) => {
		if(data){
			if(data.content && status)
				data.content = (reaction.emoji[status] || '') + ' ' + data.content;
			if(!data.allowed_mentions) data.allowed_mentions = {parse: []};
		};
		client.api.interactions(int.id, int.token).callback.post({
			data : { type : type, data : data }
		});

	},

	editOriginal : (int, data) => {
		client.api.webhooks(client.user.id, int.token).messages('@original').patch({data});
	},

	deleteOriginal : (int) => {
		client.api.webhooks(client.user.id, int.token).messages('@original')
			.delete()
	},

};
