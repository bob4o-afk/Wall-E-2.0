import React, {useState, useEffect} from 'react';
import MapView, { Callout } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import * as Location from 'expo-location';
import { WebView } from 'react-native-webview';
import { supabase } from '@/lib/supabase';
import { Buffer } from 'buffer';

const INITIAL_REGION = { //promeni go na sofiq posle, tam neshto s region kato mapview komponent
    latitude: 127.78825,
    longitude: -3.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
};

type Marker = { 
    coordinate: {
        latitude: number;
        longitude: number;
    };
    type_trash: string;
    img: string;
}

export default function App() {
    const [location, setLocation] = useState<null | Location.LocationObject>(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [title, setTitle] = useState(1);
    const [isLoaded, setIsLoaded] = useState(false);
    const [markers, setMarkers] = useState([] as Marker[]);
    const [processedImages, setProcessedImages] = useState({});

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

    useEffect(() => {
        const fetchDatabase = async () => {
                const { data, error } = await supabase.storage.from('trash_image_bucket').list();
                let markerNew : Marker = {coordinate: {latitude: 0, longitude: 0}, type_trash: "", img: ""};

                if (error || !data) 
                    throw new Error("Failed to fetch data");

                console.log(data.length);

                for(let j = 0; j < data.length - 1; j++) {
                    const { data: extractedData, error: extractedError } = await supabase.storage.from('trash_image_bucket').list(`${data[j].name}`);

                    if(extractedError || !extractedData || extractedData.length == 0) 
                        throw new Error("Failed to fetch data");

                    const { data: extractedImage } = await supabase.storage
                            .from('trash_image_bucket')
                            .getPublicUrl(`${data[j].name}/${extractedData[0].name}`);

                    markerNew.img = extractedImage.publicUrl;

                    const { data: blob} = await supabase.storage
                        .from('trash_image_bucket')
                        .getPublicUrl(`${data[j].name}/${extractedData[1].name}`);

                    const text = await fetch(blob.publicUrl).then((res) => res.text());
                    const words = text.split(', ');
                    markerNew.type_trash = words[2];
                    markerNew.coordinate.latitude = parseFloat(words[4]);
                    markerNew.coordinate.longitude = parseFloat(words[3]);

                    setMarkers((prevMarkers) => [...prevMarkers, markerNew]);
                }

                setIsLoaded(true);
        }
        fetchDatabase();
    }, []);

    return (
        <View style={styles.container}>
        {isLoaded ? <MapView style={styles.map} initialRegion={INITIAL_REGION} showsUserLocation={true} showsMyLocationButton={true}>
            {markers.map((marker, index) => (
                <Marker key={index} coordinate={{latitude: marker.coordinate.latitude, longitude: marker.coordinate.longitude}}>
                    <Callout>
                        <View style={styles.calloutContainer}>
                            <Text style={styles.markerTitle}>{marker.type_trash}</Text>
                            <View>
                                <WebView
                                originWhitelist={['*']}
                                source={{ html: `<img src="${marker.img}" style="width: 400px; height: 400px; auto; margin: 0; padding: 0; object-fit: contain;" />` }}
                                style={styles.image}
                                />
                            </View>
                        </View>
                    </Callout>
                </Marker>
            ))}
        </MapView> : <ActivityIndicator size="large" style={styles.activityIndc}/>}
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
    activityIndc: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
