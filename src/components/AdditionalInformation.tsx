import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';

interface InfoProps {  
  temperatureMin: number
  temperatureMax: number
  wind: number
  humidity: number
}

const AdditionalInformation: React.FC<InfoProps> = ({  
  temperatureMin,
  temperatureMax,
  wind,
  humidity
}) => {
  return (
    <View style={[styles.container]}>
      <View style={styles.cards}>
        <Text style={styles.title} testID='text-temp-min'>Temp. Min</Text>  
        <Text style={styles.description} testID='value-min'>{temperatureMin}°</Text>
      </View>  
      <View style={styles.cards}>
        <Text style={styles.title} testID='text-temp-max'>Temp. Max</Text>  
        <Text style={styles.description} testID='value-max'>{temperatureMax}°</Text>  
      </View>
      <View style={styles.cards}>
        <Text style={styles.title} testID='text-wind'>Vento</Text>  
        <Text style={styles.description} testID='value-wind'>{wind} m/h</Text>  
      </View>
      <View style={styles.cards}>
        <Text style={styles.title} testID='text-humidity'>Umidade</Text> 
        <Text style={styles.description} testID='value-humidity'>{humidity}%</Text> 
      </View>        
    </View>    
  );
}

export default AdditionalInformation;

const { width } = Dimensions.get('window');  

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: width - 40,
    height: 100,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 20,
    backgroundColor: '#00688b'
  },
  cards: {    
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    paddingRight: 10
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
  },
  description: {    
    color: '#f2f2f2',
    marginLeft: 10,
    marginTop: 6,    
  }
});
