import { Upazila } from '../types';
import upazilasData from '../data/bd-upazilas.json';

const upazilas = upazilasData as unknown as Record<string, Upazila[]>;

export default function getUpazilas(districtId: string | null = null): Upazila[] {
  if (!districtId) {
    return [];
  }

  try {
    const list = upazilas[districtId] || [];
    return [...list].sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error('Error fetching upazilas:', error);
    return [];
  }
}