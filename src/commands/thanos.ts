
import { GluegunToolbox } from 'gluegun'


module.exports = {
  name: 'thanos',
  description: 'Cli da thanos',
  run: async (toolbox: GluegunToolbox) => {
    const { print } = toolbox
    print.success(`
    
    -------------------------------------------------------------------
    -                                                                 -
    -                                                                 -
    -     Welcome to CLI of thanos (Bem Vindos ao cli da thanos)        -
    -                                                                 -
    -                                                                 -
    -------------------------------------------------------------------
    
    
    To start your project just type the command

    ### Command
    thanos init project-name


    
    
    `)
  },
}
