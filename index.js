const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const axios = require("axios");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
require("dotenv").config();

const TOKEN = process.env.BOT_TOKEN;
const COMMAND_PREFIX = "&";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers,
  ],
});

const commands = {
  news: "Affiche les prochaines nouveautés du bot",
  ping: "Vérifie si le bot est en ligne.",
  waya: "waya",
  howpd: "Vérifie ton niveau d'hétéro pour la journée",
  nana: "Vous trouverez de la sincérité dans ses propos",
  roll6: "Lance un dé à 6 faces",
  roll20: "Lance un dé à 20 faces",
  meme: "Affiche un mème aléatoire",
  facts: "Affiche un fait aléatoire",
  love: "Ship deux personnes pour voir leur compatibilité moooooooo",
  fight: "Fait combattre deux personnes dans un combat épique",
  thybot: "Pose une question à ThyBot",
  help: "Affiche cette liste de commandes.",
};

const courage = [
  "Le succès, c'est la capacité de passer d'échec en échec sans perdre son enthousiasme. - Nana Churchill",
  "La vie est comme une boîte de chocolats, on ne sait jamais sur quoi on va tomber. Donc mange - Nana Gump",
  "'T'es bien comme tu es tkt' - Nana",
  "La vie c'est comme le pain, un jour tu en as plus - Nana Sasha",
];

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const commandHandlers = {
  help: (message) => {
    let reply = "### THY COMMAND'S\nVoici la liste des commandes :\n";
    Object.entries(commands).forEach(([name, description]) => {
      reply += `\n- **${name}** : ${description}`;
    });
    message.channel.send(reply);
  },

  meme: async (message) => {
    try {
      const response = await fetch("https://meme-api.com/gimme");
      const data = await response.json();
      const memeEmbed = new EmbedBuilder()
        .setTitle(data.title)
        .setImage(data.url)
        .setFooter({ text: `From r/${data.subreddit}` })
        .setColor("#FF4500");
      message.channel.send({ embeds: [memeEmbed] });
    } catch (error) {
      console.error("Erreur lors de la récupération du mème :", error);
      message.channel.send("Désolé, pas de mème dispo maintenant.");
    }
  },

  ping: (message) => message.reply("Pong."),

  news: (message) => message.channel.send("Mise à jour en cours..."),

  nana: (message) => {
    const randomIndex = Math.floor(Math.random() * courage.length);
    message.channel.send(`${courage[randomIndex]}`);
  },

  roll6: async (message) => {
    const rollingMessage = await message.channel.send("🎲 Le dé roule...");
    setTimeout(() => {
      const roll = Math.floor(Math.random() * 6) + 1;
      rollingMessage.edit(`🎲 **Résultat : ${roll}**!`);
    }, 1000);
  },

  roll20: async (message) => {
    const rollingMessage = await message.channel.send("🎲 Le dé roule...");
    setTimeout(() => {
      const roll = Math.floor(Math.random() * 20) + 1;
      rollingMessage.edit(`🎲 **Résultat : ${roll}**!`);
    }, 1000);
  },

  thybot: (message, args) => {
    if (args.length === 0) {
      return message.channel.send("Pose-moi une vraie question, bg !");
    }
    const answers = ["Oui", "Non", "Peut-être", "Demande à Nana", "waya"];
    const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
    message.channel.send(`${message.author} **→** ${randomAnswer}`);
  },

  facts: async (message) => {
    try {
      const response = await axios.get(
        "https://uselessfacts.jsph.pl/random.json?language=fr"
      );
      message.channel.send(
        `🧠 **Le saviez-vous ?**\n>>> ${response.data.text}`
      );
    } catch (error) {
      console.error("Erreur lors de la récupération du fait :", error);
      message.channel.send("Désolé, pas de fait dispo maintenant.");
    }
  },
};

client.on("messageCreate", (message) => {
  if (!message.content.startsWith(COMMAND_PREFIX) || message.author.bot) return;
  const args = message.content.slice(COMMAND_PREFIX.length).trim().split(/\s+/);
  const command = args.shift().toLowerCase();

  if (commandHandlers[command]) {
    commandHandlers[command](message, args);
  } else {
    message.channel.send("Je ne connais pas cette commande bg/blg");
  }
});

client.login(TOKEN);
