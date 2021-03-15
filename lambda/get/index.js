const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
    const header =  {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    };

    //console.log(event.queryStringParameters.y_m)

    
    
    /*

    queryを使ってworkingMonthが変わるたびに取得した方がいいのか、一度scanしてしまった方が良いのかわからないので
    scanします

    let ID = [];
    for(let i=0,len=cars.Items.length;i<len;i++){
        ID.push(cars.Items[i]['car_id'])
    }

    const queryParams = {
        'TableName': 'calender',
        'KeyConditionExpression': 'y_m = :target and car_id between :startId and :endId',
        'ExpressionAttributeValues': {
            ":startId": Math.min(...ID),
            ":endId": Math.max(...ID),
            ":target": event.queryStringParameters.y_m
        }
    }
    */

        try {
            const params = {'TableName': 'Cars'}
            const calenderParams = {'TableName': 'calender'}
            const cars = await dynamo.scan(params).promise();
            const calender = await dynamo.scan(calenderParams).promise();
            const element = {
                cars: cars.Items,
                calender: calender.Items
            }
            return {
                statusCode: 200,
                headers: header,
                body: JSON.stringify(element)
            };
        } catch (error) {
            return {
                statusCode: error.statusCode,
                headers: header,
                body: error.message
            }
        }
    
    
    /*
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: '成功しているといいなあ',
            input: event
        }, null, 2)
    }
    */
};