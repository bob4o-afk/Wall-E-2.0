import time

def receive(ser):
    try:
        if ser.in_waiting > 0:
            received_data = ser.readline().decode().strip()
            print("Received data from Arduino:", received_data)
            return True
    except Exception as e:
        print(e)
    return False


def communicate(ser, message):
    try:
        # Convert the input string to bytes and send it to Arduino
        ser.write(message.encode())
        time.sleep(0.1)  # Allow time for Arduino to process data
        response = ser.readline().decode().strip()
        print("Response from Arduino:", response)
    except Exception as e:
        print(e)



# if __name__ == "__main__":
#     ser = serial.Serial('/dev/ttyUSB0', 9600) # Adjust port name if necessary
#     try:
#         while True:
#             if receive(ser):
#                 communicate(ser, "2")
#             time.sleep(0.1)
#     except KeyboardInterrupt:
#         print("Exiting program")
#         ser.close()

