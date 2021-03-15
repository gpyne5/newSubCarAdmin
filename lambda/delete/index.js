const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {

    console.log(typeof Number(event.queryStringParameters['id']))
    
    const params = {
        'TableName': 'Cars',
        'Key': {
            'car_id': Number(event.queryStringParameters['id'])
        }
    }
    await dynamo.delete(params).promise();
    
    return {
        statusCode: 200,

    }
}