import { OnsenClient } from '../lib/onsen_client'
import { Program } from '../lib/program'

export class ProgramNotFoundError extends Error {}

export class ProgramsService {
  client: OnsenClient

  constructor() {
    this.client = OnsenClient.client()
  }

  async fetchPrograms(): Promise<string[]> {
    const programs = await this.client.fetchPrograms()
    return programs
      .filter(name => {
        return !name.match(/niconama/g)
      })
      .filter(name => {
        return !name.match(/(_|-)ex$/)
      })
  }

  async fetchProgram(name: string): Promise<Program> {
    try {
      return await this.client.fetchProgram(name)
    } catch (error) {
      throw new ProgramNotFoundError(`Program: ${name} not found`)
    }
  }
}
