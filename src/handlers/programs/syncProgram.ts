import { APIGatewayProxyHandler } from 'aws-lambda'
import { OnsenProgramsService } from '../../services/onsen_programs.service'
import { SyncOnsenProgramsService } from '../../services/sync_onsen_programs.service'
import { ProgramsService } from '../../services/programs.service'

const onsenProgramsService = new OnsenProgramsService()
const programsService = new ProgramsService()
const syncOnsenProgramsService = new SyncOnsenProgramsService(
  onsenProgramsService,
  programsService,
)

const syncProgramHandler: APIGatewayProxyHandler = async (event, _context) => {
  const titleAlias = event.pathParameters.titleAlias

  try {
    const program = await syncOnsenProgramsService.syncProgram(titleAlias)
    return {
      statusCode: 200,
      body: JSON.stringify({ data: program }, null, 2),
    }
  } catch (error) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: error.message }, null, 2),
    }
  }
}

export const handler = syncProgramHandler
