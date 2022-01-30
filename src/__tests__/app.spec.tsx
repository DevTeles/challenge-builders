import convertToKelvin from '../utils/convertToKelvin';

describe('Function convertToKelvin.ts', () => {
  
  it('should test function kelvin', async () => {        
    expect(convertToKelvin(273.15)).toBe(0);
    expect(convertToKelvin(274.15)).toBe(1);
  });
  
})


