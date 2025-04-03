const { EmbedBuilder } = require("discord.js");
const axios = require("axios");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const courage = [
  "Le succès, c'est la capacité de passer d'échec en échec sans perdre son enthousiasme. - Nana Churchill",
  "La vie est comme une boîte de chocolats, on ne sait jamais sur quoi on va tomber. Donc mange - Nana Gump",
  "'T'es bien comme tu es tkt' - Nana",
  "La vie c'est comme le pain, un jour tu en as plus - Nana Sasha",
];

const commandes = {
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

const help = {
  name: "help",
  description: "Affiche la liste des commandes disponibles",
  execute: (message) => {
    let reply = "### THY COMMAND'S\nVoici la liste des commandes :\n";
    Object.entries(commandes).forEach(([key, description]) => {
      reply += `\n- **${key}** : ${description}`;
    });
    message.channel.send(reply);
  },
};

const meme = {
  name: "meme",
  description: "Affiche un mème aléatoire",
  execute: async (message) => {
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
};

const ping = {
  name: "ping",
  description: "Répond avec Pong!",
  execute: (message) => message.reply("Pong."),
};

const news = {
  name: "news",
  description: "Affiche les prochaines nouveautés du bot",
  execute: (message) => message.channel.send("Mise à jour en cours..."),
};

const nana = {
  name: "nana",
  description: "Affiche une citation motivante",
  execute: (message) => {
    const randomIndex = Math.floor(Math.random() * courage.length);
    message.channel.send(`${courage[randomIndex]}`);
  },
};

const roll6 = {
  name: "roll6",
  description: "Lance un dé à 6 faces",
  execute: async (message) => {
    const rollingMessage = await message.channel.send("🎲 Le dé roule...");
    setTimeout(() => {
      const roll = Math.floor(Math.random() * 6) + 1;
      rollingMessage.edit(`🎲 **Résultat : ${roll}**!`);
    }, 1000);
  },
};

const roll20 = {
  name: "roll20",
  description: "Lance un dé à 20 faces",
  execute: async (message) => {
    const rollingMessage = await message.channel.send("🎲 Le dé roule...");
    setTimeout(() => {
      const roll = Math.floor(Math.random() * 20) + 1;
      rollingMessage.edit(`🎲 **Résultat : ${roll}**!`);
    }, 1000);
  },
};

const thybot = {
  name: "thybot",
  description: "Pose une question à ThyBot",
  execute: (message, args) => {
    if (args.length === 0) {
      return message.channel.send("Pose-moi une vraie question, bg !");
    }
    const answers = ["Oui", "Non", "Peut-être", "Demande à Nana", "waya"];
    const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
    message.channel.send(`${message.author} **→** ${randomAnswer}`);
  },
};

const facts = {
  name: "facts",
  description: "Affiche un fait aléatoire",
  execute: async (message) => {
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

// Exportation individuelle
module.exports = { help, meme, ping, news, nana, roll6, roll20, thybot, facts };
