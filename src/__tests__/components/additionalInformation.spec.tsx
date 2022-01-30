import React from 'react';
import { render } from '@testing-library/react-native';
import AdditionalInformation from '../../components/AdditionalInformation';

describe('Component AdditionalInformation.tsx', () => {

  const defaultProps = {
    humidity: 100,
    temperatureMax: 30,
    temperatureMin: 20,
    wind: 5
  }

  it('should render title correctly', () => {  
    const { getByTestId } = render(
      <AdditionalInformation {...defaultProps} />
    );  
  
    const textTempMin = getByTestId('text-temp-min');
    const textTempMax = getByTestId('text-temp-max');
    const textWind = getByTestId('text-wind');
    const textHumidity = getByTestId('text-humidity');
  
    expect(textTempMin.props.children).toContain('Temp. Min');
    expect(textTempMax.props.children).toContain('Temp. Max');
    expect(textWind.props.children).toContain('Vento');
    expect(textHumidity.props.children).toContain('Umidade');
  });
  
  it('should render value correctly', () => {  
    const { getByTestId } = render(
      <AdditionalInformation {...defaultProps} />
    );  
  
    const textTempMin = getByTestId('value-min');
    const textTempMax = getByTestId('value-max');
    const textWind = getByTestId('value-wind');
    const textHumidity = getByTestId('value-humidity');
  
    expect(textTempMin.props.children).toContain(20);
    expect(textTempMax.props.children).toContain(30);
    expect(textWind.props.children).toContain(5);
    expect(textHumidity.props.children).toContain(100);
  });
  
})


