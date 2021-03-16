const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

const header =  {
    "Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS,PUT,DELETE,POST,GET"
};
exports.handler = async event => {

    let data = JSON.parse(event.body);

    console.log(typeof event.queryStringParameters['id'])
    console.log(Number(event.queryStringParameters['id']))
    console.log(Number(data.dateStart))
    console.log(Number(data.dateEnd))
    console.log(data.customerName)

    
    try {
        const params = {
            'TableName': 'calender',
            'Key': {
                'y_m': data.currentMonth,
                'car_id': Number(event.queryStringParameters['id'])
            },
            'ExpressionAttributeNames': {
                '#dateStart': Number(data.dateStart),
                '#dateEnd': Number(data.dateEnd)
            },
            'ExpressionAttributeValues': {
                ':customerName': data.customerName
            },
            'UpdateExpression': 'SET #dateStart = :customerName, #dateEnd = :customerName'
        }
        await dynamo.update(params).promise()

        console.log(params)
        return {
            statusCode: 200,
            headers: header
        }
    } catch {
        return {
            //statusCode: error.statusCode,
            headers: header
        }

    }
    
}