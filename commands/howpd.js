const { AttachmentBuilder, EmbedBuilder } = require("discord.js");
const { description } = require("./fight");

module.exports = {
  name: "howpd",
  description: "Vérifie ton niveau d'hétéro pour la journée ",
  async execute(message) {
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
