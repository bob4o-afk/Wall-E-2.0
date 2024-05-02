#!/bin/bash

# Install system-level dependencies
sudo apt update
sudo apt install -y python3-serial python3-requests python3-picamera2 python3-opencv

# Install required dependencies
sudo apt-get install -y libpcap-dev python3-libcamera

# Set up virtual environment
sudo apt install python3-virtualenv

