import { APIGatewayProxyHandler } from "aws-lambda";
import { ProgramsService } from "../services/programs.service";

export const fetchProgramsHandler: APIGatewayProxyHandler = async (
  event,
  _context
) => {
  const service = new ProgramsService()
  try {
    const programs = await service.fetchPrograms();
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
