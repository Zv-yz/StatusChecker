const { Client, GatewayIntentBits } = require('discord.js');
const Express = require('express');
const WebSocket = require('ws');

const Bot = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences]})
const wss = process.env.WS_PORT ? new WebSocket.Server({ port: process.env.WS_PORT }) : null;
const App = Express();

App.use(Express.json());

const getUser = () => {
    if (!Bot.isReady()) return { user: null, message: 'not ready' };
    let User = Bot.guilds?.cache.get(process.env.GUILD_ID)?.members?.cache.get(process.env.USER_ID);
    if (!User) return { user: null, message: 'not found' };
    return { user: User, message: 'found' };
};

Bot.on('presenceUpdate', async (Old, New) => {
    if (New.userId !== process.env.USER_ID) return;
    if (Old.status == New.status) return; // avoid two websocket sending
	wss?.clients.forEach((Clients) => {
        if (Clients.readyState == WebSocket.OPEN){
            Clients.send(`{"status": "${New.status}"}`);
        };
    })
});

Bot.on('ready', () => {
    console.log(`Logged in as ${Bot.user.tag}`);
});

App.get('/status', (req, res) => {
    let { user, message } = getUser();
    if (user) {
        return res.json({"status": user.presence.status});
    } else {
        return res.json({"status": "N/A", "message": message});
    }
});

Bot.login(process.env.TOKEN);
App.listen(process.env.PORT, () => {
    console.log(`Running Server on port ${process.env.PORT}`);
});
wss?.on('listening', () => {
    console.log(`Running WebSocket on port ${process.env.WS_PORT}`);
})