const Command = require('../structures/command.js');

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: "removenote",
      aliases: [],
      ltu: client.constants.perms.staff
    });
  }

  async execute(message) {
    // removeNote(message, user, nNum)
    const match = /(?:removenote)\s+(?:(?:<@)?(\d{17,20})>?)(?:\s+(\d+))/.exec(message.content);
    if (!match) return message.reply("Invalid Syntax: removenote <user-id/mention> <note #>");

    const user = await this.client.users.fetch(match[1]);

    this.client.handlers.modNotes.removeNote(message, user, match[2])
      .then(() => message.reply(`Note for ${user.tag} added`))
      .catch(e => message.reply(`ERR: ${e}`));
  }
};