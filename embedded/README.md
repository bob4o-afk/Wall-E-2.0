# Walle Project

## Embedded Setup

To set up Walle on an embedded system, follow these steps:

1. **Connect Camera**: Ensure that the camera module is connected properly to your embedded system.

2. **Install pip**:
   ```bash
   sudo apt update
   sudo apt install -y python3-pip
   ```

3. **Clone the repo**: 
   If you don't have git installed, run:
   ```bash
   sudo apt-get install git-all
   ```
   Clone the Walle project repository:
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

6. **Set Up Virtual Environment**: 
   - Create a virtual environment with system site packages:
     ```bash
     sudo apt install python3-virtualenv
     python3 -m venv /path/to/venv
     virtualenv --system-site-packages /path/to/venv
     ```

   - Activate the virtual environment:
     ```bash
     source /path/to/venv/bin/activate
     ```

     To deactivate the virtual environment, simply type:
     ```bash
     deactivate
     ```
     (NOTE) After running this, you won't be able to run commands with ```pip```

7. **Install Required Python Packages from File**: 
   - Install all the required libraries listed in `requirements.txt` using pip:
     ```bash
     pip install -r requirements.txt
     ```

   - (NOTE) If you get an error ```AttributeError: module 'serial' has no attribute 'Serial'```, run this:
     ```bash
     pip install pyserial --force-reinstall
     ```

8. **Upload the ino code**: 
   - Upload the Arduino code to the Arduino. You can use the Arduino IDE on a different computer or with the [Arduino library for Raspberry Pi](https://medium.com/@kevinlutzer9/programming-an-arduino-device-remotely-using-a-raspberry-pi-f55728bbda8f).

9. **Follow the schematic**: 
   - Use the schematic provided in the `embedded` folder.
   ![Schematic](https://github.com/bob4o-afk/Wall-E-2.0/tree/main/embedded/embedded_schematic.png)

   ***Connections***:
   - **Raspberry Pi Part**:
     - Connect the camera to the Raspberry Pi 4 - [tutorial](https://projects.raspberrypi.org/en/projects/getting-started-with-picamera)
     - Power up the Raspberry Pi 4 with 5V (it can be from Arduino).
   
   - **Arduino Uno R3 Connections**:
     - Connect the [Adafruit 16-channel PWM/Servo Shield](https://learn.adafruit.com/adafruit-16-channel-pwm-slash-servo-shield/overview)
     - Connect the Ultrasonic sensor as following:
       ```
       VCC - 5V
       GND - GND
       Echo - D4
       Trig - D3
       ```
     - Connect the [Robot arm](https://erelement.com/shop/ws-robot-arm-pi/) servos (based on the servo you need to check which wire color stands for what):
       ```
       Yellow wire (PWM) - top pin on the slot
       Red wire (VCC) - middle pin on the slot
       Black wire (GND) - bottom pin on the slot
       ```
       (NOTE) See ![where each servo is](https://github.com/bob4o-afk/Wall-E-2.0/tree/main/embedded/servos_on_robotarm.png)
     - Connect the L298N motor driver as following:
       ```
       Enable A - 5V
       Enable B - 5V
       In1 - D5
       In2 - D6
       In3 - D7
       In4 - D8
       MotorA - the two left motors
       MotorB - the two right motors
       ```
       (NOTE) Check in which direction the motors are moving and change the wires if needed.
     - Power up the Arduino with the Raspberry Pi 4 via USB.
     - Connect the battery to a DC-DC converter and then power up the Shield.
   
10. **Create Environment File for Supabase**: 
   - Create a new file named `.env` in the root directory of your project. This file will hold environment variables for your Supabase configuration.

   - Open the `.env` file in a text editor and add the following lines:
     ```
     SUPABASE_URL=https://your-supabase-url.supabase.co
     SUPABASE_KEY=your-supabase-key
     ```

     Replace `https://your-supabase-url.supabase.co` with the URL of your Supabase project and `your-supabase-key` with your actual Supabase project key.
     (NOTE) They can be found in ```project settings/api```.
   
11. **Run the Code**: 
    - Finally, run the main script:
      ```bash
      python3 main.py
      ```
