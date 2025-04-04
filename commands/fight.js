const { AttachmentBuilder } = require("discord.js");
const path = require("path");

module.exports = {
  name: "fight",
  description: "Organise un combat entre deux joueurs",
  async execute(message, args) {
    if (args.length !== 2) {
      return message.channel.send(
        "🥊 **Il faut mentionner deux combattants !**"
      );
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

    // const finalGifs = {
    //   "💫 Kamehameha": "../assets/kamehameha.gif",
    //   "⚔️ Chidori": "../assets/chidori.gif",
    //   "🌀 Stardust Breaker": "../assets/Stardustbreaker.webp",
    //   "🌌 Ultra Big Bang Kamehameha": "../assets/UBK.gif",
    //   "💨 Hollow Purple": "../assets/hollowPurple.gif",
    // };

    const path = require("path");

    const finalGifs = {
      "💫 Kamehameha": path.resolve(__dirname, "../asset/kamehameha.gif"),
      "⚔️ Chidori": path.resolve(__dirname, "../asset/chidori.gif"),
      "🌀 Stardust Breaker": path.resolve(
        __dirname,
        "../asset/StardustBreaker.webp"
      ),
      "🌌 Ultra Big Bang Kamehameha": path.resolve(
        __dirname,
        "../asset/UBK.gif"
      ),
      "💨 Hollow Purple": path.resolve(__dirname, "../asset/hollowPurple.gif"),
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
        const finalGifPath = finalGifs[finalAttack];

        await fightMessage.edit(
          `⚡ **${finalAttacker} prépare une attaque finale...**`
        );
        await new Promise((resolve) => setTimeout(resolve, 1500));

        await fightMessage.edit(`💥 **ATTAQUE FINALE !!**`);
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const attachment = new AttachmentBuilder(finalGifPath);
        await message.channel.send({
          content: `🔥 **${finalAttacker} déclenche ${finalAttack} !!**`,
          files: [attachment],
        });

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
  },
};
