const { DynamoDBClient, ScanCommand } = require('@aws-sdk/client-dynamodb');

const dynamoDBClient = new DynamoDBClient({ region: 'us-east-1' });

module.exports.handler = async (event) => {
  try {
    // Consulta os três primeiros itens na tabela DynamoDB
    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Limit: 3, // Limita a consulta aos três primeiros itens
    };

    const scanCommand = new ScanCommand(params);
    const result = await dynamoDBClient.send(scanCommand);
    const products = result.Items.map(item => {
      return {
        id: item.id.S,
        nome: item.nome.S,
        preco: parseFloat(item.preco.N),
        // ... outros atributos
      };
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ products }),
    };
  } catch (error) {
    console.error('Erro:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro ao processar a requisição' }),
    };
  }
};
