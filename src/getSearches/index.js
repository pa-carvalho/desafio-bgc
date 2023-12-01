const { DynamoDBClient, ScanCommand } = require('@aws-sdk/client-dynamodb');

const dynamoDBClient = new DynamoDBClient({ region: 'us-east-1' });

module.exports.handler = async () => {
  try {
    const params = {
      TableName: "amazon-products",
    };

    const scanCommand = new ScanCommand(params);
    const result = await dynamoDBClient.send(scanCommand);
    const searches = result.Items;
      return {
        statusCode: 200,
        body: JSON.stringify({ searches }),
      };
  } catch (error) {
    console.error('Erro:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro ao processar a requisição' }),
    };
  }
};
