//ローカルからのデプロイです
const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
    let result = await dynamo.scan({'TableName': 'Cars'}).promise();
    
    let IDs = [];
    for (let i = 0, len = result.Items.length; i < len ; i ++) {
        IDs.push(result.Items[i]['car_id']);
    }

    const ID = Math.max(...IDs) + 1;
    const params = {
        'TableName': 'Cars',
        'Item': {
        'car_id': ID,
        'car_name': event.car_name,
        'car_number': event.car_number
        }
    };
    let months = [];
    for(let i=0;i<2;i++){
        let month = Number(event.date.slice(5,7)) + i;
        if(month < 10){
            months.push(event.date.slice(0,5) + '0' + String(month));
        } else {
            months.push(event.date.slice(0,5) + String(month));
        }
    }
    
    try {
        const carResult = await dynamo.put(params).promise();
        const calenderResult = [];
        for(let i=0,len=months.length;i<len;i++){
            let calenderParams = {
                'TableName': 'calender',
                'Item': {
                    'y_m': months[i],
                    'car_id': ID,
                    '1': "",
                    '2': "",
                    '3': "",
                    '4': "",
                    '5': "",
                    '6': "",
                    '7': "",
                    '8': "",
                    '9': "",
                    '10': "",
                    '11': "",
                    '12': "",
                    '13': "",
                    '14': "",
                    '15': "",
                    '16': "",
                    '17': "",
                    '18': "",
                    '19': "",
                    '20': "",
                    '21': "",
                    '22': "",
                    '23': "",
                    '24': "",
                    '25': "",
                    '26': "",
                    '27': "",
                    '28': "",
                    '29': "",
                    '30': "",
                    '31': ""
                }
            };
            
            calenderResult.push(await dynamo.put(calenderParams).promise());
        }
        let element = {
            cars: carResult.Items,
            calender: calenderResult.Items
        }
        return {
            statusCode: 200,
            body: JSON.stringify(element.Items)
        };
    } catch (error) {
        return {
            statusCode: error.statusCode,
            body: error.message
        };
    }
};
    