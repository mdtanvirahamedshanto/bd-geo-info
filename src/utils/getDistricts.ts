import { District } from '../types';
import districts from '../data/districts.json';

export default function getDistricts(divisionId: string | null = null): District[] {
  if (!divisionId) {
    return [];
  }

  try {
    return districts.data
      .filter((district: District) => district.division_id === divisionId)
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error('Error fetching districts:', error);
    return [];
  }
}