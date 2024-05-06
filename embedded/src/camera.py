from picamera2 import Picamera2
import os

# Define the directory to save images
IMAGE_DIRECTORY = os.path.join(os.path.dirname(os.path.dirname(__file__)), "images")
CURRENT_IMAGE_FILE = os.path.join(os.path.dirname(__file__), "current_image.txt")
picam2 = Picamera2()


def create_image_directory(directory):
    if not os.path.exists(directory):
        os.makedirs(directory)


def get_current_image_id():
    with open(CURRENT_IMAGE_FILE, "r") as file:
        current_image_id = int(file.read().strip())
    return current_image_id


def capture_and_save_image(picamera, directory, image_filename):
    image_path = os.path.join(directory, image_filename)
    picamera.capture_file(image_path)


def reboot_camera():
    picam2.stop()


def run_camera():
    create_image_directory(IMAGE_DIRECTORY)

    config = picam2.create_still_configuration()
    picam2.configure(config)
    picam2.start(show_preview=True)

    current_image_id = get_current_image_id()
    image_filename = f"image_{current_image_id}.jpg"
    capture_and_save_image(picam2, IMAGE_DIRECTORY, image_filename)

    picam2.stop()

    return True


def main():
    run_camera()


if __name__ == "__main__":
    main()
