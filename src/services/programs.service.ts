import { DocumentClient } from 'aws-sdk/clients/dynamodb'

export class ProgramsService {
  private dynamodbClient: DocumentClient

  constructor() {
    this.dynamodbClient = new DocumentClient()
  }

  public async fetchProgram(title: string): Promise<any> {
    const result = await this.dynamodbClient.get({
      TableName: process.env.PROGRAMS_TABLE_NAME,
      Key: {
        title
      }
    }).promise()
    return result
  }
}
