variable "project_id" {
  description = "GCP project ID where resources will be created"
  type        = string
  validation {
    condition     = can(regex("^[a-z0-9-]+$",var.project_id))
    error_message = "bucket_name 只能包含小写字母、数字和短横线。"
  }
}
variable "env" {
  description = "Environment name (e.g., dev, stg, prod)"
  type        = string
}