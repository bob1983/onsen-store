import { OnsenClient } from '../lib/onsen_client'

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
}
