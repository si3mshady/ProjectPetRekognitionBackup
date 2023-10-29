provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "example" {
  ami           = "ami-0dbc3d7bc646e8516"
  instance_type = "t2.micro"
  key_name      = "sreuni"
  user_data     = <<-EOF
                  #!/bin/bash
                  echo "Hello, World!" > index.html
                  nohup python -m SimpleHTTPServer 80 &
                  EOF

  vpc_security_group_ids = [aws_security_group.homebase.id]

  tags = {
    Name = "mvp"
  }
}

resource "aws_eip" "eip" {
  vpc = true
}

resource "aws_security_group" "homebase" {
  name_prefix = "homebase"
}

resource "aws_security_group_rule" "ingress" {
  type        = "ingress"
  from_port   = 0
  to_port     = 0
  protocol    = "tcp"
  cidr_blocks = ["76.183.21.156/32"]
  security_group_id = aws_security_group.homebase.id
}

resource "aws_security_group_rule" "egress" {
  type        = "egress"
  from_port   = 0
  to_port     = 0
  protocol    = "tcp"
  cidr_blocks = ["0.0.0.0/0"]
  security_group_id = aws_security_group.homebase.id
}

resource "aws_route53_zone" "r53" {
  name = "sreuniversity.org"
}

resource "aws_route53_record" "update" {
  zone_id = "Z08654031QGJY8UEMAS55"
  name    = "mvp.sreuniversity.org"
  type    = "A"
  ttl     = "300"
  records = [aws_eip.eip.public_ip]
}