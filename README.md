# Walle Project

## Embedded Setup

To set up Walle on an embedded system, follow these steps:

1. **Connect Camera**: Ensure that the camera module is connected properly to your embedded system.

2. **Install pip**:
   ```bash
   sudo apt update
   sudo apt install -y python3-pip
   ```

3. **Clone the repo**: Clone the Walle project repository
    ```bash
   git clone https://github.com/bob4o-afk/Wall-E-2.0.git
   ```

4. **Navigate to the embedded directory**:
   ```bash
   cd Wall-E-2.0/embedded
   ```

5. **Install Required System-Level Dependencies**: Install the required system-level dependencies:
   ```bash
   sudo apt-get install -y libpcap-dev python3-libcamera
   ```

6. **Set Up Virtual Environment**: Create a virtual environment with system site packages:
   ```bash
   sudo apt install python3-virtualenv
   python3 -m venv /path/to/venv
   virtualenv --system-site-packages /path/to/venv
   ```

   Activate the virtual environment:
   ```bash
   source /path/to/venv/bin/activate
   ```

   To deactivate the virtual environment, simply type:
   ```bash
   deactivate
   ```
   (NOTE) After running this you won't be able to run commands with ```pip```

7. **Install Required Python Packages from File**: Install all the required libraries listed in `requirements.txt` using pip:
   ```bash
   pip install -r requirements.txt
   ```

   (NOTE) If you get an error ```AttributeError: module 'serial' has no attribute 'Serial'``` run this:
   ```bash
   pip install pyserial --force-reinstall
   ```

8. **Run the Code**: Finally, run the main script:
   ```bash
   python3 main.py
   ```