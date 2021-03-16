const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

const header =  {
    "Access-Control-Allow-Headers" : "Content-Type",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS,PUT,DELETE"
};
exports.handler = async event => {

    /*
    const params = {
        'TableName': 'calender',
        'KeyConditionExpression': 'y_m = :currentMonth and car_id = :id',
        'ExpressionAttributeValues': {
            //':currentMonth': event.data.currentMonth,
            ':id': event.queryStringParameters['id']
        }
    }
    */
    console.log(event)

    return {
        statusCode: 200,
        headers: header
    }
    
}