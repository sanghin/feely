const fs = require('node:fs');
const path = require('node:path');

const slashCommands = [];
// Grab all the command folders from the commands directory you created earlier
const foldersPath = path.join(__dirname, 'slash-commands');
const commandFolders = fs.readdirSync(foldersPath);

/*
* Allow for 2 level structure commands directory
* parent_dir/
* ├── folder1/
* │   ├── command1.js
* │   ├── command2.js
* │   └── command3.js
* └── folder2/
*     ├── command1.js
*     ├── command2.js
*     └── command3.js
*/
for (const folder of commandFolders) {
    // Grab all the command files from the commands directory you created earlier
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            slashCommands.push(command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

module.exports = { slashCommands };
