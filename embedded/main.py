# import serial      #later for the arduino connection
from time import sleep         #for delaying 
import requests   #for the db
from datetime import datetime
import cv2

from src.object_detection_image import recognize
from src.camera import *
from src.add_to_db import add_to_db


def get_local_datetime():
    return datetime.now().strftime('%Y-%m-%d %H:%M:%S')


def write_time_on_image(image_path):
    image = cv2.imread(image_path)
    if image is not None:
        current_time = get_local_datetime()
        font = cv2.FONT_HERSHEY_SIMPLEX
        bottom_left_corner = (10, image.shape[0] - 10)
        font_scale = 3
        font_color = (255, 255, 255)  # White color in BGR
        line_type = 1
        cv2.putText(image, current_time, bottom_left_corner, font, font_scale, font_color, line_type)
        cv2.imwrite(image_path, image)
    else:
        print(f"Failed to load image from path: {image_path}")



if "__main__" in __name__:
    run_camera()
    current_file = "images/image"
    image_path = f"{current_file}_{get_current_image_id()}.jpg" 
    write_time_on_image(image_path)
    type_trash, path_to_image = recognize()
    add_to_db(type_trash, path_to_image)


