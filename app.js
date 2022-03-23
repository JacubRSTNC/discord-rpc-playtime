import RPC from 'discord-rpc';
import axios from 'axios';
import { readFileSync } from 'fs';
const client = new RPC.Client({ transport: 'ipc' });
let config = { steam_api_key: "", steamid64: "", applicationid: "", appid: "" };

let hours = 0; // Set a base value for playtime
function setActivity() {
    // Set the Discord users activity using RPC.
    client.setActivity({ startTimestamp: Date.now() - hours * 3600 * 1000 });
}

async function fetchHours() {
    // Fetch the users playtime from steam
    const response = await axios.get(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${config.steam_api_key}&steamid=${config.steamid64}&include_appinfo=true&include_played_free_games=true&appids_filter[0]=${config.appid}`);
    let data = response.data?.response?.games; // Store the game as an array, because steam api..
    if (!data) {
        console.error("Unable to fetch game data. Are you sure the right api key, steamid & appid was provided?");
        process.exit(1);
    }
    data = data[0]; // Grab the first & only value of the array.
    let total_playtime = data.playtime_forever;
    hours = total_playtime / 60; // Convert the playtime from minutes, into hours.
    hours = hours.toFixed(1); // Make sure the hours are at 1 decimal.
    return hours;
}

client.on('ready', () => {
    // Update the users activity.
    console.log(`RPC Client logged in as ${client.user.username}#${client.user.discriminator}`);
    setActivity();

    setInterval(setActivity, 15000); // Updates the users activity every 15 seconds.
});

async function loadConfig() {
    // Reads the config.json file and parses it.
    let contents = readFileSync("./config.json");
    if (!contents) {
        console.error("Unable to read config.json file.");
        process.exit(1);
    }
    try {
        config = JSON.parse(contents);
    } catch (e) {
        console.error("Unable to parse config.json file");
        console.error(e);
        process.exit(1);
    }
    return;
}

async function main() {
    await loadConfig();
    console.log("Config loaded");
    await fetchHours();
    console.log(`Hours Fetched: ${hours}`);
    setInterval(fetchHours, 30000);
    client.login({ clientId: config.applicationid }); // Initialize the RPC connection to Discord.
}

main();
