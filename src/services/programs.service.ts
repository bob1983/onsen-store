import { DocumentClient } from 'aws-sdk/clients/dynamodb'

export class ProgramsService {
  private dynamodbClient: DocumentClient

  constructor() {
    this.dynamodbClient = new DocumentClient()
  }

  public async fetchProgram(titleAlias: string): Promise<any> {
    console.log('titleAlias: ', titleAlias)

    const result = await this.dynamodbClient.get({
      TableName: process.env.PROGRAMS_TABLE_NAME,
      Key: {
        titleAlias
      }
    }).promise()

    console.log('Result: ', result)
    return result.Item
  }
}
