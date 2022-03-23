# discord-rpc-playtime
### Shows the users playtime on Discord.

## Installation / Setup
1. [Ensure Node.JS is installed](https://nodejs.org/dist/v16.14.2/node-v16.14.2-x64.msi "Ensure Node.JS is installed")
2. Clone / Download the repository.
3. Run `npm install` in the application directory to download the necessary dependencies.
4. Fill out the config.json file with the necessary values. (If you need more details, refer to the next section)
5. Run `node .` to start the application.

## Configuration

The configuration file contains 4 keys / values. Some are already filled out, however you may edit these if you'd like. All of them are mandatory to be filled out.

| Key  | Value  | Default |
| ------------ | ------------ | ------------ |
| steam_api_key | [Get a Steam Web API key (domain can be anything)](https://steamcommunity.com/dev/apikey "Get a Steam Web API key (domain can be anything)") | Empty |
| appid | Steam application ID | 4000 (Garry's Mod) |
| steamid64  | [Your SteamID64](https://www.steamidfinder.com/ "Your SteamID64") | Empty |
| applicationid | [Discord Application ID](https://discord.com/developers/applications "Discord Application ID") | 955756058180190239 (Garry's Mod) |
