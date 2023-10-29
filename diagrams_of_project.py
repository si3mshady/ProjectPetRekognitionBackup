from diagrams import Diagram, Cluster
from diagrams.aws.compute import EC2
from diagrams.aws.storage import S3
from diagrams.aws.ml import Rekognition
from diagrams.onprem.client import User
from diagrams.custom import Custom

# Create a custom icon for DynamoDB
with Diagram("Elliotts MVP Photo Processing Workflow", show=False, outformat="png"):
    with Cluster("Your App"):
        user = User("User")
        with Cluster("Capturing"):
            camera = EC2("Camera")
            user >> camera

        with Cluster("Processing"):
            image = EC2("Image")
            camera >> image
            image >> S3("Amazon S3")
            image >> Rekognition("Amazon Rekognition")
            # Use a custom icon for DynamoDB
            image >> Custom("DynamoDB", "DynamoDB.png")
            # Replace "./dynamodb.png" with the path to your DynamoDB custom icon image

        user >> image
