terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "6.38.0"
    }
  }
}
resource "google_compute_network" "vpc_network" {
  name = "terraformd2s-network"
  project = var.project_id
}
resource "google_compute_instance" "vm_instance" {
  name         = "jianjiao-instance-3"
  machine_type = "e2-micro"

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-11"
    }
  }

  network_interface {
    network = google_compute_network.vpc_network.name
    access_config {
    }
  }
}
