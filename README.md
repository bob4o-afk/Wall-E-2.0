# Wall-E: Trash Collecting Robot

Welcome to Wall-E, a project that combines both a mobile application and an embedded system to create a smart trash-collecting robot. Wall-E utilizes artificial intelligence to detect trash, pick it up with a robotic hand, and save relevant information such as image, coordinates, type of trash, and timestamp.

## Features

- **Trash Detection**: Wall-E employs AI algorithms to detect trash in its vicinity.
- **Robotic Hand**: Equipped with a robotic hand, Wall-E can pick up the detected trash.
- **Data Logging**: Wall-E saves relevant data such as images, coordinates, type of trash, and timestamps to a database.
- **Mobile Application**: Allows users to interact with Wall-E, monitor its activities, and receive notifications.

## Technologies Used

### Mobile Application (App)

- **React Native**: Utilized for developing the mobile application interface.
- **Supabase**: Chosen as the database solution for storing trash-related data.

### Embedded System (Embedded)

- **Python and C++**: Used for programming the embedded system's functionality.
- **Raspberry Pi**: Acts as the central processing unit for controlling Wall-E's operations.
- **Arduino Uno**: Manages the robotic hand and interfaces with sensors for trash detection.

## Project Structure

```
wall-e/
│
├── App/                    # Mobile application code
│   ├── app/
│   ├── assets/
│   ├── components/
│   ├── constants/
│   ├── .gitignore
│   ├── app.json
│   ├── babel.config.js
│   ├── package-lock.json
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md           # Readme for the mobile application
│
├── embedded/               # Embedded system code
│   ├── config_files/       # Set up for the trash recognition
│   ├── images/             # Where the raw captured images will be stored
│   ├── recognized/         # Where the processed images will be stored
│   ├── src/                # Main files that will be used for the embedded part
│   ├── embedded_shematic.png
│   ├── main.py             # Main raspberry pi code
│   ├── requirements.txt    # Necessary libraries
│   ├── sevos_on_robotarm.png
│   ├── setup.sh            # Run this to install necessary libraries
│   └── README.md           # Readme for the embedded system
│
└── README.md               # Main Readme for the entire project
```

## Getting Started

To set up and run Wall-E, follow the instructions provided in each respective folder (app and embedded).

## Contributing

Contributions to Wall-E are welcome! If you have any ideas for improvement or bug fixes, please submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

We would like to thank the open-source community for their valuable contributions that made this project possible. Special thanks to the developers of React Native, Supabase, Raspberry Pi, and Arduino Uno for their excellent tools and resources.
