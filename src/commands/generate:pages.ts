const fs = require(`fs`)
import { Capitalize, Normal } from '../functions/fonts'
import { CheckDirectory } from '../functions/checkDirectory'
import { filesystem } from 'gluegun'
module.exports = {
  name: 'generate:pages',
  description: 'Create new pages (Cria uma nova página)',
  run: async toolbox => {
    const {
      parameters,
      template,
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
      const log = CheckDirectory(raiz)
      if (log) {
        error('This Page Exist (Essa Página Já Existe)')
        return
      } else {
        const addLine = `
export { ${Capitalize(name)} } from "./${Capitalize(name)}/${Normal(name)}";`

        await template.generate({
          template: 'components/component.tsx.ejs',
          target: `src/pages/${Capitalize(name)}/${Normal(name)}.tsx`,
          props: { name: Capitalize(name) }
        })
        await template.generate({
          template: 'styles/style.ts.ejs',
          target: `src/pages/${Capitalize(name)}/style.ts`
        })
        await template.generate({
          template: 'interface/type.ts.ejs',
          target: `src/pages/${Capitalize(name)}/types.ts`,
          props: { name: Capitalize(name) }
        })

        await fs.appendFile('src/pages/index.ts', addLine, function(err) {
          if (err) return console.log(err)
          success('Added a page index. (Adicionado a página index)')
        })
        success(`Generated ${name} page. (A sua página foi gerada)`)
      }
    }
  }
}
