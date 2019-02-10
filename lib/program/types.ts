import * as Command from './command/types'

export type ProgramCommands = {
  [slug: string]: Command.Command
}

export type NpmInfo = {
  name: string
  description: string
  version: string
  bin: {
    [key: string]: string
  }
  [key: string]: any
}

export interface Program extends Command.Command {
  info(npmInfo: NpmInfo): this
  name(name: string): this
  version(version: string): this

  command(slug: string): Command.Command

  init(): void
}
