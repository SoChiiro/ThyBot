const Discord = require("discord.js");
const { GatewayIntentBits } = require("discord.js");
const { Client, MessageAttachment } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

require("dotenv").config();
const TOKEN = process.env.BOT_TOKEN;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
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
  "Il n'y a que deux jours dans l'année où l'on ne peut rien faire. Un s'appelle hier et l'autre s'appelle demain, alors aujourd'hui est le jour parfait pour aimer, croire, faire et principalement vivre. - Nana Lama",
  "Le courage, c'est de se lever et de dire : 'je n'ai pas peur.' donc grouille toi' - Nana Marley",
  "On n'est pas en vie pour accumuler des choses, on est en vie pour créer de la valeur. - Nana Sinek",
  "'T'es bien comme tu es tkt' - Nana",
  "Je pense qu'il faut que tu bouge ton cul la - Nana Chirac",
  "Il suffit que tu traverse le trottoir pour y arriver - Nana Macron",
  "Tu sais, tu peux toujours essayer - Nana Obama",
  "La vie c'est comme le pain, un jour tu en a plus, et il faut pas qu'il y en ai plus - Nana Sasha",
  "La force et le courage font ta vérité- Nana Zelda",
  "Vie ta vie comme il faut zebi - Nana 94",
  "Tu es triste ? arrete- Nana Babac",
  "Pas de pitié pour les faibles, tu es faible toi? - Nana Amor",
  "Eh la vasy hein - Nana Mariotte",
  "Tu veux un conseil ? - Nana Conseil",
  "La réussite c'est que si tu as de la chance en vrai nan ? - Nana noLucky Luke",
];

const COMMAND_PREFIX = "&";

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Command handler
const commandHandlers = {
  help: (message) => {
    let reply =
      "### THY COMMAND'S \n Voici la liste des commandes que je peux exécuter mon chère bg :\n";
    for (const [name, description] of Object.entries(commands)) {
      reply += `\n- **${name}** : ${description}`;
    }
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
      message.channel.send(
        "Désolé, je n'ai pas pu récupérer de mème pour le moment."
      );
    }
  },

  pong: (message) => {
    message.reply("Ping.");
  },

  ping: (message) => {
    message.reply("Pong.");
  },

  news: (message) => {
    message.channel.send(
      "Je suis en pleine mise à jour, mon créateur à fait de la merde mais en tout cas on va recréer de vrais commandes avec les vrais."
    );
  },

  nana: (message) => {
    const randomIndex = Math.floor(Math.random() * courage.length);
    message.channel.send(`${courage[randomIndex]}`);
  },

  waya: (message) => {
    message.delete();
    message.channel.send("waya");
  },

  roll6: async (message) => {
    const rollingMessage = await message.channel.send("🎲 Le dé roule...");

    setTimeout(() => {
      const randomNumber = Math.floor(Math.random() * 6) + 1;
      const emoji =
        randomNumber === 6 ? "🔥" : randomNumber === 1 ? "💀" : "🎲";

      rollingMessage.edit(
        `🎲 **Le dé s'arrête sur...** **${randomNumber}** ! ${emoji}`
      );
    }, 1000);
  },

  roll20: async (message) => {
    const rollingMessage = await message.channel.send("🎲 Le dé roule...");

    setTimeout(() => {
      const randomNumber = Math.floor(Math.random() * 20) + 1;
      let emoji = "🎲";

      if (randomNumber === 20) emoji = "🌟 **REUSSITE CRITIQUE !!** 🎉";
      else if (randomNumber === 1) emoji = "💀 **ÉCHEC CRITIQUE !** 😱";

      rollingMessage.edit(
        `🎲 **Le dé s'arrête sur...** **${randomNumber}** ! ${emoji}`
      );
    }, 1000);
  },

  howpd: (message) => {
    const randomNumber = Math.floor(Math.random() * 101);
    console.log(randomNumber);
    if (randomNumber === 0) {
      message.channel.send(`Ton score est de : ${randomNumber}`);
      message.channel.send("**Oh...**");
      message.channel.send("Mon fils....");
      message.channel.send({
        files: [
          "https://www.institut-repere.com/info/wp-content/uploads/2009/02/pouvoirs-divin-1200x905.jpg",
        ],
      });
    } else if (randomNumber === 1) {
      message.channel.send(`Ton score est de : ${randomNumber}`);
      message.channel.send("Tu es fait ton Jey sale batard ?");
    } else if (randomNumber >= 2 && randomNumber <= 10) {
      message.channel.send(`Ton score est de : ${randomNumber}`);
      message.channel.send("Grrrr, Hétéro ? J'aime ça... ");
      message.channel.send({
        files: [
          "https://resize-elle.ladmedia.fr/rcrop/638,,forcex/img/var/plain_site/storage/images/people/la-vie-des-people/news/comment-tomber-amoureuse-de-james-franco-en-20-gifs/le-clin-d-oeil/43591737-1-fre-FR/Le-clin-d-oeil.gif",
        ],
      });
    } else if (randomNumber <= 20 && randomNumber >= 11) {
      message.channel.send(`Ton score est de : ${randomNumber}`);
      message.channel.send("Vous êtes un maitre de l'heterotitude");
      message.channel.send({
        files: ["https://media.tenor.com/yPUAJMwL2uwAAAAC/gigachad.gif"],
      });
    } else if (randomNumber <= 30 && randomNumber >= 21) {
      message.channel.send(`Ton score est de : ${randomNumber}`);
      message.channel.send("ntm sale hetero vite fait");
    } else if (randomNumber <= 40 && randomNumber >= 31) {
      message.channel.send(`Ton score est de : ${randomNumber}`);
      message.channel.send(
        "Je vois que tu deviens **curieux**... Intéressant... "
      );
    } else if (randomNumber <= 49 && randomNumber >= 41) {
      message.channel.send(`Ton score est de : ${randomNumber}`);
      message.channel.send(
        "Attention vous êtes presque pd et ça c'est très **pd**"
      );
    } else if (randomNumber === 50) {
      message.channel.send(`Ton score est de : ${randomNumber}`);
      message.channel.send("Bravo tu es **bi**");
      message.channel.send({
        files: ["https://media.tenor.com/li3czQCU734AAAAC/bisexual.gif"],
      });
    } else if (randomNumber <= 60 && randomNumber >= 51) {
      message.channel.send(`Ton score est de : ${randomNumber}`);
      message.channel.send("Tu es un petit coquin toi...");
      message.channel.send("ça mange à tous les râteliers !");
    } else if (randomNumber <= 68 && randomNumber >= 61) {
      message.channel.send(`Ton score est de : ${randomNumber}`);
      message.channel.send("OH COMMENT TU ES PD TOI");
    } else if (randomNumber === 69) {
      message.channel.send(`Ton score est de : ${randomNumber}`);
      message.channel.send("**Met toi à quatre pattes mon cochon**");
      message.channel.send({
        files: [
          "https://media.tenor.com/mdWFxHBHuusAAAAM/%ED%98%BC%EB%82%B4%EC%95%BC%EA%B2%A0%EC%96%B4-whip.gif",
        ],
      });
    } else if (randomNumber >= 70 && randomNumber <= 79) {
      message.channel.send(`Ton score est de : ${randomNumber}`);
      message.channel.send(
        "Tu es proche mais vraiment très très proche mais genre, trèèèèèèèèèèèèèèèèèèèèèèèèès proche de ce qu'on appelle la limite que je me suis accordé pour que je puisse encore ne serais-ce t'adresser la parole... Ou même te bloquer... mais genre vraiment très proche. "
      );
    } else if (randomNumber >= 80 && randomNumber <= 89) {
      message.channel.send(`Ton score est de : ${randomNumber}`);
      message.channel.send(
        "Si je devais te donner un surnom, je te donnerais celui de **pd** car t'es vraiment pd tema le score."
      );
    } else if (randomNumber >= 90 && randomNumber <= 98) {
      message.channel.send(`Ton score est de : ${randomNumber}`);
      message.channel.send("Arrête de te voiler la face mon reuf");
      message.channel.send("Je te vois comme ça");
      message.channel.send({
        files: ["https://media1.giphy.com/media/Y2hpDhq5tD80xLzao8/giphy.gif"],
      });
    } else if (randomNumber === 99) {
      message.channel.send(`Ton score est de : ${randomNumber}`);
      message.channel.send(
        "Ouf t'es pas passé loin... Mais bon, tu es quand même pd"
      );
    } else if (randomNumber === 100) {
      message.channel.send(`Ton score est de : ${randomNumber}`);
      message.channel.send("Ah... C'est donc comme ça...");
      message.channel.send(
        "Si tu devais te faire réincarner en une personne dans une autre vie, tu serais surement...."
      );
      message.channel.send({
        files: ["https://i.ytimg.com/vi/06rM3wqb0yY/maxresdefault.jpg"],
      });
      message.channel.send("Thé lavabo");
    } else if (randomNumber === 101) {
      message.channel.send(`Ton score est de : ${randomNumber}`);
      message.channel.send({
        files: [
          "https://media.tenor.com/EANWDmJZRtcAAAAd/lil-nas-x-montero.gif",
        ],
      });
    }
  },
};

commandHandlers.love = async (message, args) => {
  if (args.length !== 2) {
    return message.channel.send(
      "💔 **Il faut mentionner deux personnes pour les shipper !**"
    );
  }

  const [firstUser, secondUser] = args;
  let randomPercentage = Math.floor(Math.random() * 101);

  console.log(
    `💘 Compatibilité entre ${firstUser} et ${secondUser} : ${randomPercentage}%`
  );

  const progressBar = (percentage) => {
    const full = "🟥";
    const empty = "⬛";
    const progress = Math.round((percentage / 100) * 10);
    return full.repeat(progress) + empty.repeat(10 - progress);
  };

  const suspenseMessage = await message.channel.send(
    `💞 **Analyse de la compatibilité entre ${firstUser} et ${secondUser}...**`
  );

  // Définition des groupes de noms qui donnent 100%
  const specialNames1 = [
    "Thy",
    "SoChiiro",
    "Thomas",
    "T",
    "thy",
    "sochiiro",
    "thomas",
    "t",
  ];
  const specialNames2 = [
    "Ryuk",
    "Riouque",
    "Myriam",
    "ryuk",
    "riouque",
    "myriam",
  ];
  const specialNames3 = [
    "Jey",
    "Jeremi",
    "Jérémi",
    "Jeyo",
    "J",
    "jey",
    "jeremi",
    "jérémi",
    "jeyo",
    "j",
  ];

  // Vérification si un utilisateur appartient à `specialNames1` et l'autre à `specialNames2`
  if (
    (specialNames1.includes(firstUser) && specialNames2.includes(secondUser)) ||
    (specialNames2.includes(firstUser) && specialNames1.includes(secondUser))
  ) {
    randomPercentage = 100;
    console.log(`${firstUser} et ${secondUser} sont ensemble !`);
  } else if (
    (specialNames1.includes(firstUser) && specialNames3.includes(secondUser)) ||
    (specialNames3.includes(firstUser) && specialNames1.includes(secondUser))
  ) {
    randomPercentage = 0;
  }

  setTimeout(() => {
    let response = `💖 **Résultat final :**\n💑 **${firstUser}** ❤️ **${secondUser}**\n\n`;
    response += `💘 Compatibilité : **${randomPercentage}%**\n`;
    response += `📊 ${progressBar(randomPercentage)}\n\n`;

    if (randomPercentage === 100) {
      response += `💍 **Inshallah c'est le mariage** 💕🥰`;
    } else if (randomPercentage >= 80) {
      response += `🔥 **Shessssssssssssssssssssh** 💓`;
    } else if (randomPercentage >= 50) {
      response += `😏 **Oh.... Pas mal** 💫`;
    } else if (randomPercentage >= 30) {
      response += `🤔 **Bon bah psartek hein**`;
    } else {
      response += `💔 **Ah ok** 😭`;
    }

    suspenseMessage.edit(response);
  }, 2000);
};

commandHandlers.fight = async (message, args) => {
  if (args.length !== 2) {
    return message.channel.send("🥊 **Il faut mentionner deux combattants !**");
  }

  const [fighter1, fighter2] = args;
  let fighter1HP = 100;
  let fighter2HP = 100;

  const attacks = [
    "💥 Coup de poing",
    "🦶 Coup de pied",
    "🔥 Uppercut enflammé",
    "⚡ Coup de genou foudroyant",
    "💨 Esquive éclair",
    "🗡️ Attaque tranchante",
    "🔄 Contre-attaque",
    "🎯 Coup précis",
    "💫 Kamehameha",
    "🌪️ Rasengan",
    "⚔️ Chidori",
    "🌌 Genjutsu",
    "🌀 Rasen Shuriken",
    "🌌 Ultra Big Bang Kamehameha",
    "🌌 Stardust Breaker",
    "💨 Hollow Purple",
    "🎮 Attaque spéciale",
    "🕹️ Attaque ultime",
    "💣 Attaque explosive",
    "⚔️ Attaque de zone",
    "🌀 Attaque éclair",
    "🌪️ Attaque cyclonique",
    "💥 Attaque de choc",
    "🔥 Attaque de feu",
    "❄️ Attaque de glace",
    "⚡ Attaque électrique",
    "🌊 Attaque aquatique",
  ];

  const finalAttacks = [
    "💫 Kamehameha",
    "⚔️ Chidori",
    "🌀 Stardust Breaker",
    "🌌 Ultra Big Bang Kamehameha",
    "💨 Hollow Purple",
  ];

  const finalGifs = {
    "💫 Kamehameha": "./asset/kamehameha.gif",
    "⚔️ Chidori": "./asset/chidori.gif",
    "🌀 Stardust Breaker": "./asset/Stardustbreaker.webp",
    "🌌 Ultra Big Bang Kamehameha": "./asset/UBK.gif",
    "💨 Hollow Purple": "./asset/hollowPurple.gif",
  };

  let fightMessage = await message.channel.send(
    `🥊 **COMBAT ENTRE ${fighter1} ET ${fighter2} !** 🥊\n🚀 **Préparez-vous !**`
  );

  await new Promise((resolve) => setTimeout(resolve, 2000));

  while (fighter1HP > 0 && fighter2HP > 0) {
    const attacker = Math.random() < 0.5 ? fighter1 : fighter2;
    const defender = attacker === fighter1 ? fighter2 : fighter1;
    const attack = attacks[Math.floor(Math.random() * attacks.length)];
    const damage = Math.floor(Math.random() * 20) + 10;

    if (attacker === fighter1) {
      fighter2HP = Math.max(0, fighter2HP - damage);
    } else {
      fighter1HP = Math.max(0, fighter1HP - damage);
    }

    await fightMessage.edit(
      `🥊 **${attacker} attaque !**\n` +
        `${attack} sur ${defender} ! (-${damage} HP)\n\n` +
        `❤️ ${fighter1}: **${fighter1HP} HP**\n` +
        `💙 ${fighter2}: **${fighter2HP} HP**`
    );

    await new Promise((resolve) => setTimeout(resolve, 800));

    if (
      finalAttacks.includes(attack) &&
      (fighter1HP <= 15 || fighter2HP <= 15)
    ) {
      const finalAttacker = attacker;
      const finalAttack = attack;
      const finalGif = finalGifs[finalAttack];

      await fightMessage.edit(
        `⚡ **${finalAttacker} prépare une attaque finale...**`
      );
      await new Promise((resolve) => setTimeout(resolve, 1500));

      await fightMessage.edit(`💥 **ATTAQUE FINALE !!**`);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (finalGif.includes("youtube.com")) {
        await message.channel.send(
          `🔥 **${finalAttacker} déclenche ${finalAttack} !!**\n` +
            `${finalGif}`
        );
      } else {
        await message.channel.send({
          content: `🔥 **${finalAttacker} déclenche ${finalAttack} !!**`,
          files: [finalGif],
        });
      }

      await new Promise((resolve) => setTimeout(resolve, 600));
      await fightMessage.edit(
        `❤️ ${fighter1}: **${fighter1HP} HP**\n` +
          `💙 ${fighter2}: **${fighter2HP} HP**`
      );
      message.channel.send(
        `🏆 **VICTOIRE ABSOLUE DE ${finalAttacker} !** 🎉🥊`
      );

      return;
    }
  }

  const winner = fighter1HP > 0 ? fighter1 : fighter2;
  await new Promise((resolve) => setTimeout(resolve, 800));

  await fightMessage.edit(
    `🥊 **${winner} a gagné le combat !** 🎉\n\n` +
      `❤️ ${fighter1}: **${fighter1HP} HP**\n` +
      `💙 ${fighter2}: **${fighter2HP} HP**`
  );

  message.channel.send(`🏆 **VICTOIRE DE ${winner} !** 🎉🥊`);
};

commandHandlers.thybot = (message, args) => {
  if (args.length === 0) {
    return message.channel.send("Pose-moi une vraie question, bg !");
  }

  const answers = [
    "Oui",
    "Non",
    "Peut-être",
    "Demande à Nana",
    "waya",
    "Demande à Chat GPT",
    "Evidemment",
    "C'est sur !",
    "Mouais je suis pas sûr",
    "Wallah oui",
    "Wallah non",
  ];
  const randomIndex = Math.floor(Math.random() * answers.length);
  message.channel.send(`${message.author} **→** ${answers[randomIndex]}`);
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

const axios = require("axios");

commandHandlers.facts = async (message) => {
  try {
    const response = await axios.get(
      "https://uselessfacts.jsph.pl/random.json?language=fr"
    );
    const fact = response.data.text;

    message.channel.send(`🧠 **Le saviez-vous ?**\n>>> ${fact}`);
  } catch (error) {
    console.error("Erreur lors de la récupération du fait aléatoire :", error);
    message.channel.send(
      "Désolé, je n'ai pas pu récupérer un fait aléatoire pour le moment."
    );
  }
};

client.login(TOKEN);
