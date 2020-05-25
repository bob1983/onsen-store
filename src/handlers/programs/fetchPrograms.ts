import { APIGatewayProxyHandler } from "aws-lambda";
import { ProgramsService } from '../../services/programs.service'

const service = new ProgramsService()

const fetchProgramsHandler: APIGatewayProxyHandler = async (
  _event,
  _context
) => {
  try {
    const programs = await service.fetchPrograms()
    return {
      statusCode: 200,
      body: JSON.stringify({ data: programs }, null, 2),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "something went wrong" }),
    };
  }
};

export const handler = fetchProgramsHandler

export const fetchProgramHandler: APIGatewayProxyHandler = async (
  event,
  _context
) => {
  const name = event.pathParameters.name
  try {
    const program = await service.fetchProgram(name)
    return {
      statusCode: 200,
      body: JSON.stringify({ data: program }, null, 2)
    }
  } catch (error) {
    return {
      statusCode: 404,
      body: JSON.stringify( { error: error.message }, null, 2)
    }
  }
}
