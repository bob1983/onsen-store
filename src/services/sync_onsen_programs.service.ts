import { OnsenProgramsService } from "./onsen_programs.service";
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { ProgramsService } from "./programs.service";

export class SyncOnsenProgramsService {
  private dynamodbClient: DocumentClient

  constructor(
    private onsenProgramsService: OnsenProgramsService,
    private programsService: ProgramsService
  ) {
    this.dynamodbClient = new DocumentClient()
  }

  public async syncProgram(title: string): Promise<{}> {
    const program = await this.onsenProgramsService.fetchProgram(title)

    const syncedProgram = await this.programsService.fetchProgram(title)

    console.log(syncedProgram)

    let result
    if (!syncedProgram) {
      result = await this.dynamodbClient.put({
        TableName: process.env.PROGRAMS_TABLE_NAME,
        Item: program
      }).promise()
    }

    console.log(result)
    return result
  }
}
