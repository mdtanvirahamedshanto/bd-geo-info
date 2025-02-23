import { District } from '../types';
import districts from '../data/bd-districts.json';

export default function getDistricts(divisionId: string | null = null): District[] {
  if (!divisionId) {
    return [];
  }

  try {
    return districts.districts
      .filter((district: { 
        id: string; 
        division_id: string; 
        name: string; 
        bn_name: string; 
        lat: string; 
        long: string; 
      }) => district.division_id === divisionId)
      .map((district): District => ({
        ...district,
        lon: district.long,
        url: ''
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error('Error fetching districts:', error);
    return [];
  }
}