const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();
const commands = require("./commands");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const COMMAND_PREFIX = "&";

client.on("ready", () => {
  console.log(`✅ Connecté en tant que ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.content.startsWith(COMMAND_PREFIX)) return;

  const args = message.content.slice(COMMAND_PREFIX.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (commands.has(commandName)) {
    try {
      await commands.get(commandName).execute(message, args);
    } catch (error) {
      console.error(`Erreur dans la commande ${commandName}:`, error);
      message.reply(
        "❌ Une erreur s'est produite en exécutant cette commande."
      );
    }
  } else {
    message.reply("❓ Commande inconnue ! Tape `&help` pour voir la liste.");
  }
});

client.login(process.env.BOT_TOKEN);
