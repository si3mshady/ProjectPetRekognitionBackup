import boto3

dynamodb = boto3.client('dynamodb')

table_name = 'DogGoneGPT'

key_schema = [
    {
        'AttributeName': 'ImageID',
        'KeyType': 'HASH'  # Partition key
    },
    {
        'AttributeName': 'GPS',
        'KeyType': 'RANGE'  # String (Additional attribute)
    }
]

attribute_definitions = [
    {
        'AttributeName': 'ImageID',
        'AttributeType': 'S'  # base64String
    },
   
    {
        'AttributeName': 'GPS',
        'AttributeType': 'S'  # {lat:888,long:5555}
    }
]

provisioned_throughput = {
    'ReadCapacityUnits': 5,
    'WriteCapacityUnits': 5
}

dynamodb.create_table(
    TableName=table_name,
    KeySchema=key_schema,
    AttributeDefinitions=attribute_definitions,
    ProvisionedThroughput=provisioned_throughput
)
