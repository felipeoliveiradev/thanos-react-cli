import { GluegunToolbox } from 'gluegun'
import {execs} from "../functions/execs";
module.exports = {
  name: 'init',
  description: 'Start The Project (Inicia o Projeto)',
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters
    } = toolbox
    const final = `
-------------------------------------------------------------------
-                                                                 -
-                                                                 -
-         Congratulations You Just Created The Project            -
-                                                                 -
-                                                                 -
-------------------------------------------------------------------
    
    
Now that you have created the project just follow the steps below
    
### Commands
cd ${parameters.first}
    
yarn or npm install
    
    
yarn start or npm start    
    
    
    `
    const commands = [
      `mkdir ${parameters.first}`,
      "git clone https://github.com/felipeoliveiradev/baseTypeReact.git",
      `rm -R ${parameters.first}`,
      `mv baseTypeReact  ${parameters.first}`,
      `\n`
    ]
    execs(commands, final);
    return;

  }
}
