import React, {useState, useEffect} from 'react';
import MapView, { Callout } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { StyleSheet, View, Text} from 'react-native';
import * as Location from 'expo-location';
import { WebView } from 'react-native-webview';

const INITIAL_REGION = { //promeni go na sofiq posle, tam neshto s region kato mapview komponent
    latitude: 127.78825,
    longitude: -3.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
};

export default function App() {
    const [location, setLocation] = useState<null | Location.LocationObject>(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [markers, setMarkers] = useState([
        {
            coordinate: {
                latitude: 42.698334,
                longitude: 23.319941,
            },
            title: "AAAAAAA",
            description: "Bobi",
            image: "https://t3.ftcdn.net/jpg/05/73/98/54/360_F_573985491_v7S3mLRqVyvI9dRtUzNMoppSiSxLQRAM.jpg",
        },
        {
            coordinate: {
                latitude: 43.698334,
                longitude: 23.319941,
            },
            title: "BBBBBBB",
            description: "Bobi",
            image: "https://i.pinimg.com/originals/f0/f7/22/f0f72298cbeb0120713b24a259dba7a2.jpg",
        },
    ]);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg("Permission to access location was denied");
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }
    , []);

    return (
        <View style={styles.container}>
        <MapView style={styles.map} initialRegion={INITIAL_REGION} showsUserLocation={true} showsMyLocationButton={true}>
            {markers.map((marker, index) => (
                <Marker key={index} coordinate={marker.coordinate}>
                    <Callout>
                        <View style={styles.calloutContainer}>
                            <Text style={styles.markerTitle}>{marker.title}</Text>
                            <Text style={styles.markerDescription}>{marker.description}</Text>
                            <View>
                                <WebView
                                originWhitelist={['*']}
                                source={{ html: `<img src="${marker.image}" style="width: 400px; height: 400px; auto; margin: 0; padding: 0; object-fit: contain;" />` }}
                                style={styles.image}
                                />
                            </View>
                        </View>
                    </Callout>
                </Marker>
            ))}
        </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    markerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    markerDescription: {
        fontSize: 12,
        marginBottom: 5,
    },
    calloutContainer: {
        padding: 10,
    },
    image: {
        width: 100,
        height: 100,
        flex: 1,
    },
});
