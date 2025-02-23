import { Upazila } from '../types';
import upazilas from '../data/bd-upazilas.json'

export default function getUpazilas(districtId: string | null = null): Upazila[] {
  if (!districtId) {
    return [];
  }

  try {
    return upazilas.upazilas
      .filter((upazila: Upazila) => upazila.district_id === districtId)
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error('Error fetching upazilas:', error);
    return [];
  }
}