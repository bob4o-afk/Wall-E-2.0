import requests

def get_current_location():
    try:
        response = requests.get('https://ipinfo.io/json')
        data = response.json()
        location = data['loc'].split(',')
        latitude = float(location[0])
        longitude = float(location[1])
        return latitude, longitude
    except Exception as e:
        print("Error:", e)
        return None, None


if __name__ == "__main__":
    latitude, longitude = get_current_location()

