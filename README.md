# Walle Project

## Embedded Setup

To set up Walle on an embedded system, follow these steps:

1. **Connect Camera**: Ensure that the camera module is connected properly to your embedded system.

2. **Install pip**:
   ```bash
   sudo apt install python3-pip
   ```

3. **Clone the repo**: Clone the Walle project repository
    ```bash
   git clone https://github.com/bob4o-afk/Wall-E-2.0.git
   ```

4. **Install Requirements**: Install the required Python packages using the provided `setup.sh`:
   ```bash
   cd Wall-E-2.0/embedded
   ./setup.sh
   ```

5. **Run the code**: Run the main script:
   ```bash
   python3 main.py
   ```

