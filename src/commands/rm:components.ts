
import { CheckDirectory } from '../functions/checkDirectory'
import { filesystem } from 'gluegun'
import { Capitalize, Normal } from '../functions/fonts'
import { Replace } from '../functions/replace'
import {execs} from '../functions/execs';

module.exports = {
  name: 'rm:component',
  description: 'Remove Component (Remove o Component)',
  run: async toolbox => {
    const {
      parameters,
      print: { success, error }
    } = toolbox

    const name = parameters.first

    if (!name) {
      error(
        'Component Name Was Not Passed ( O Nome do Seu Component Não Foi Passado )'
      )
      return
    } else {
      const raiz = filesystem.path(`src/components/${Capitalize(name)}`)
      const raizIndex = filesystem.path(`src/components/index.ts`)
      const value = `export { ${Capitalize(name)} } from "./${Capitalize(name)}/${Normal(name)}";`;
      const log = CheckDirectory(raiz)
      const command = [
        `yarn lint --fix`
      ]
      if (log) {
        filesystem.remove(`src/components/${Capitalize(name)}`);
        Replace(raizIndex, value, "");
        execs(command);
        success("Successfully Removed ( Removido com Successo )");
        return
      } else {
        error('This Component Not Exist (Esse Component Não Existe)')
        return
      }
    }
  }
}
