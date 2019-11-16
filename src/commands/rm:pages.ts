
import { CheckDirectory } from '../functions/checkDirectory'
import { filesystem } from 'gluegun'
import { Capitalize, Normal } from '../functions/fonts'
import { Replace } from '../functions/replace'
import {execs} from '../functions/execs';

module.exports = {
  name: 'rm:page',
  description: 'Remove Page (Remove a sua Página)',
  run: async toolbox => {
    const {
      parameters,
      print: { success, error }
    } = toolbox

    const name = parameters.first

    if (!name) {
      error(
        'Page name must be specified ( O Nome da sua página não foi passado )'
      )
      return
    } else {
      const raiz = filesystem.path(`src/pages/${Capitalize(name)}`)
      const raizIndex = filesystem.path(`src/pages/index.ts`)
      const value = `export { ${Capitalize(name)} } from "./${Capitalize(name)}/${Normal(name)}";`;
      const log = CheckDirectory(raiz)
      const command = [
        `yarn lint --fix`
      ]
      if (log) {
        filesystem.remove(`src/pages/${Capitalize(name)}`);
        Replace(raizIndex, value, "");
        execs(command);
        success("Successfully Removed ( Removido com Successo )");
        return
      } else {
        error('This Page Not Exist (Essa Página Não Existe)')
        return
      }
    }
  }
}
