provider "aws" {
  region = "ap-south-1"
}

locals {
  project_name = var.project_name
}

resource "aws_security_group" "postgres_sg" {
  name        = "${local.project_name}-sg"
  description = "Allow PostgresSQL traffic"

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # SSH
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  #  allow all traffic
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "postgres_instance" {
  instance_type = "t2.micro"
  # https://api.netcubed.de/latest/ami/lookup?platform=amzn2
  ami = "ami-06dd70926a11a0d15" # Amazon Linux 2 AMI (HVM), SSD Volume Type

  vpc_security_group_ids = [aws_security_group.postgres_sg.id]

  key_name = "swift-stack-master"

  tags = {
    Name = "${local.project_name}-postgres"
  }

  user_data = <<-EOF
              #!/bin/bash
              sudo yum -y update
              sudo yum -y install docker
              sudo systemctl start docker
              sudo systemctl enable docker
              sudo usermod -aG docker ec2-user
              docker pull postgres:latest
              docker pull postgrest/postgrest:latest
              docker run --name postgres -e POSTGRES_PASSWORD=${var.postgres_password} -p 5432:5432 -d postgres

              sleep 10

              docker run --name postgrest \
                --link postgres:postgres \
                -p 3000:3000 \
                -e PGRST_DB_URI="postgres://postgres:${var.postgres_password}@postgres:5432/postgres" \
                -e PGRST_DB_SCHEMA="public" \
                -e PGRST_DB_ANON_ROLE="anonymous" \
                -e PGRST_DB_POOL="10" \
                -e PGRST_SERVER_PROXY_URI="http://localhost:3000" \
                -d postgrest/postgrest
              EOF
}

output "instance_public_ip" {
  value = aws_instance.postgres_instance.public_ip
}
