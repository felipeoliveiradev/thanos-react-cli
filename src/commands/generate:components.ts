import { filesystem } from 'gluegun'
import { CheckDirectory } from '../functions/checkDirectory'

const fs = require(`fs`)
const { Capitalize, Normal } = require('../functions/fonts')
module.exports = {
  name: 'generate:component',
  description: 'Create new component (Cria o Component)',
  run: async toolbox => {
    const {
      parameters,
      template,
      print: { success, error }
    } = toolbox

    const name = parameters.first

    if (!name) {
      error(
        'Component name must be specified ( O Nome do component não foi passado )'
      )
      return
    } else {
      const raiz = filesystem.path(`src/components/${Capitalize(name)}`)
      const log = CheckDirectory(raiz)
      if (log) {
        error("This Component exist (Esse Component Já Existe)")
      } else {
        const addLine = `
export { ${Capitalize(name)} } from "./${Capitalize(name)}/${Normal(name)}";`

        switch (parameters.options.type) {
          case 'class':
            await template.generate({
              template: 'components/classComponent.tsx.ejs',
              target: `src/components/${Capitalize(name)}/${Normal(name)}.tsx`,
              props: { name: Capitalize(name) }
            })
            break
          case 'func':
            await template.generate({
              template: 'components/funcComponent.tsx.ejs',
              target: `src/components/${Capitalize(name)}/${Normal(name)}.tsx`,
              props: { name: Capitalize(name) }
            })
            break
          default:
            await template.generate({
              template: 'components/component.tsx.ejs',
              target: `src/components/${Capitalize(name)}/${Normal(name)}.tsx`,
              props: { name: Capitalize(name) }
            })
            break
        }

        await template.generate({
          template: 'styles/style.ts.ejs',
          target: `src/components/${Capitalize(name)}/style.ts`
        })
        await template.generate({
          template: 'interface/type.ts.ejs',
          target: `src/components/${Capitalize(name)}/types.ts`,
          props: { name: Capitalize(name) }
        })

        await fs.appendFile('src/components/index.ts', addLine, function(err) {
          if (err) return console.log(err)
          success('Added a page index. (Adicionado a página index)')
        })
        success(`Generated ${name} component. (O componente foi gerado)`)
      }
    }
  }
}
