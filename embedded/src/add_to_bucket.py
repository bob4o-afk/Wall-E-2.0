import os
from dotenv import load_dotenv
from supabase import create_client, Client
from src.coordinates import get_current_location
from datetime import datetime


def write_info_to_file(id, date, type_trash, longitude, latitude):
    with open("src/info.txt", "w") as file:
        file.write(f"{id}, {date}, {type_trash}, {longitude}, {latitude}")


def add_to_bucket(id, type_trash, image_path):
    load_dotenv()

    url = os.getenv("SUPABASE_URL")
    key = os.getenv("SUPABASE_KEY")
    supabase: Client = create_client(url, key)

    latitude, longitude = get_current_location()
    if latitude is None and longitude is None:
        return "Error"
    
    date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    write_info_to_file(id, date, type_trash, longitude, latitude)
    info_file = os.path.join(os.path.dirname(__file__), "info.txt")
    supabase.storage.from_("trash_image_bucket").upload(f"{str(id)}/info.txt", info_file, {"content-type": "text/plain"})

    supabase.storage.from_("trash_image_bucket").upload(f"{str(id)}/{os.path.basename(image_path)}",image_path , {"content-type": "image/png"})

 
