import { APIGatewayProxyHandler } from "aws-lambda";
import { OnsenProgramsService } from '../../services/onsen_programs.service'

const service = new OnsenProgramsService()

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
