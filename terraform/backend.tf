terraform {
  backend "s3" {
    region         = "ap-south-1"
    dynamodb_table = "lock-table"
  }
}
