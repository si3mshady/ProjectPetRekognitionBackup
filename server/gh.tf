# terraform/main.tf


variable "token" {
  default = "ghp*******L1WaAoh"
}

variable "repo_name" {
  default = "cicd_for_doggone"
}

variable "access_key" {
  default = "APK********SJWT"
}

variable "secret_access_key" {
  default = "t*******fMJhz"
}

provider "github" {
  token = var.token
}

resource "github_repository" "cicd_for_doggone" {
  name        = var.repo_name
  description = "cicd_for_doggone"
  visibility  = "private" # Change to "public" if needed
}

resource "github_actions_secret" "aws_secret_key" {
  repository = github_repository.cicd_for_doggone.name
  secret_name = "ACCESS_KEY"
  plaintext_value = var.access_key
}

resource "github_actions_secret" "my_secret" {
  repository = github_repository.cicd_for_doggone.name
  secret_name = "SECRET_ACCESS_KEY"
  plaintext_value = var.secret_access_key
}
