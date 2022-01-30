import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { LinearGradient } from 'expo-linear-gradient';
import getCurrentWeather from './src/services/api';
import AdditionalInformation from './src/components/AdditionalInformation';
import convertToKelvin from './src/utils/convertToKelvin';
import { StatusBar } from 'expo-status-bar';
interface propsCoords {
  latitude: number
  longitude: number  
}

export default function App() {
  const [locationCoords, setLocationCoords] = useState<propsCoords>({
    latitude: -22.0905194,
    longitude: -51.3729107,    
  });
  const [currentTemperature, setCurrentTemperature] = useState(0);
  const [temperatureMin, setTemperatureMin] = useState(0);
  const [temperatureMax, setTemperatureMax] = useState(0);
  const [locationName, setLocationName] = useState('');
  const [wind, setWind] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [icon, setIcon] = useState('');

  useEffect(() => {
    
    (async function() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const BestForNavigation = 6;
        let location = await Location.getCurrentPositionAsync({ accuracy: BestForNavigation });        
        setLocationCoords(location.coords);
      } else {
        throw new Error(`Location permission not granted`);
      }      
    })();    
    
    updateWeather()
  }, [])

  const updateWeather = async () => {
    const data = await getCurrentWeather(locationCoords);
    setCurrentTemperature(convertToKelvin(data[0]));
    setTemperatureMin(convertToKelvin(data[1]));
    setTemperatureMax(convertToKelvin(data[2]));
    setLocationName(data[3]);
    setWind(data[4]);
    setHumidity(data[5]);
    setIcon(data[6]);
  }

  const handleUpdateWeather = () => {
    updateWeather()
    Alert.alert('Infomação', 'Atualizado com sucesso!')
  }
  
  return (
    <SafeAreaView  style={styles.safeAreaView}>      
      <StatusBar style='light' />      
      <View style={styles.container}>
        <LinearGradient
          colors={['rgba(0,0,0,0.8)', 'transparent']}
          style={styles.background}
        >
          <View style={styles.content}>
            <View style={styles.contentHeader}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                <Text style={styles.title}>{currentTemperature}°c</Text>  
                <Image 
                  style={{ width: '44%', height: '90%', marginLeft: 12 }} 
                  source={{ uri: `https://openweathermap.org/img/wn/${icon}@2x.png`}}
                />
              </View>          
              <Text style={styles.description}>{locationName}</Text>    
              <AdditionalInformation                 
                 temperatureMin={temperatureMin}
                 temperatureMax={temperatureMax}
                 wind={wind}
                 humidity={humidity}
              />              
            </View>             
            <View style={styles.contentFooter}>             
              <TouchableOpacity 
                style={styles.buttonUpdate}
                onPress={handleUpdateWeather}
                testID='click-update'
              >
                <Text style={{ color: '#f2f2f2', fontWeight: 'bold' }}>Atualizar</Text>
              </TouchableOpacity>
            </View>            
          </View>
        </LinearGradient>        
      </View>
           
      <MapView
        style={styles.map}
        initialRegion={{ ...locationCoords, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
        showsUserLocation
        zoomEnabled
        loadingEnabled
        focusable
        zoomControlEnabled
      >   
        <Marker        
          coordinate={locationCoords}
          title={'Localização'}
          description={locationName}
        />
      </MapView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    backgroundColor: '#152fb1',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  content: {
    flex: 1,        
    flexDirection: 'column',
    justifyContent: 'space-around',    
  },
  map: {
    flex: 0.5,
  },
  safeAreaView: {
    flex: 1    
  },
  buttonUpdate: {    
    width: '80%',
    height: 40,    
    borderColor: '#f2f2f2',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 50,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'    
  },
  contentHeader: {
    top: 20,
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'flex-start'
  },
  contentFooter: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 90,
    marginLeft: 10,
    color: '#f2f2f2',
  },
  description: {
    fontWeight: 'bold',    
    color: '#f2f2f2',
    marginLeft: 10,
    marginTop: 6,
  }
});
