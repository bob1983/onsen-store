import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { OnsenClient } from './src/lib/onsen_client'

export const hello: APIGatewayProxyHandler = async (event, _context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
      input: event,
    }, null, 2),
  };
}

export const fetchPrograms: APIGatewayProxyHandler = async (event, _context) => {
  const client = OnsenClient.client()
  try {
    const programs = await client.fetchPrograms()
    return {
      statusCode: 200,
      body: JSON.stringify({ data: programs }, null, 2)
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'something went wrong' })
    }
  }
}
