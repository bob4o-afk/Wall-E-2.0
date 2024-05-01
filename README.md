# Walle Project

## Embedded Setup

To set up Walle on an embedded system, follow these steps:

1. **Connect Camera**: Ensure that the camera module is connected properly to your embedded system.

2. **Install pip**:
   ```bash
   sudo apt install python3-pip
   ```

3. **Install Requirements**: Install the required Python packages using the provided `setup.sh`:
   ```bash
   cd embedded
   ./setup.sh
   ```

4. **Clone Repository and Run**: Clone the Walle project repository and run the main script:
   ```bash
   git clone https://github.com/bob4o-afk/Wall-E-2.0.git
   cd walle
   python3 main.py
   ```

