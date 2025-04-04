const { AttachmentBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "love",
  description: "Affiche un message d'amour",
  async execute(message, args) {
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
      (specialNames1.includes(firstUser) &&
        specialNames2.includes(secondUser)) ||
      (specialNames2.includes(firstUser) && specialNames1.includes(secondUser))
    ) {
      randomPercentage = 100;
      console.log(`${firstUser} et ${secondUser} sont ensemble !`);
    } else if (
      (specialNames1.includes(firstUser) &&
        specialNames3.includes(secondUser)) ||
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
  },
};
