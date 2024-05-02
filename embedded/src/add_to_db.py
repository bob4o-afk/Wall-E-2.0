import os
from dotenv import load_dotenv
import base64
from supabase import create_client, Client
from src.coordinates import get_current_location

def add_to_db(type_trash, image_path):
    load_dotenv()

    url = os.getenv("SUPABASE_URL")
    key = os.getenv("SUPABASE_KEY")
    supabase: Client = create_client(url, key)

    with open(image_path, "rb") as file:
        image_data = base64.b64encode(file.read()).decode('utf-8')

    try:
        latitude, longitude = get_current_location()
        if latitude is None and longitude is None:
            return "Error"
        data, count = supabase.table('trash').insert({"type_trash":type_trash, "latitude": float(latitude), "longitude": float(longitude), "img": image_data}).execute()
    except Exception as e:
        print("Error:", e)

# Example usage:
# image_path = "/home/bobi/finised/Wall-E-2.0/embedded/recognized/image_0_bottle.jpg"
# add_to_db("bottle",image_path)
