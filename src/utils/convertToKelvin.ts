export default function convertToKelvin(kelvin: number): number {
  const result = (kelvin - 273.15).toString();
  return Number.parseInt(result);
}