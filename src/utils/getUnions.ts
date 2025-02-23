import { Union } from '../types';
import unions from '../data/unions.json';

export default function getUnions(upazilaId: string): Union[] {
  if (!upazilaId) {
    return [];
  }

  try {
    return unions.data
      .filter((union: Union) => union.upazila_id === upazilaId)
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error('Error fetching unions:', error);
    return [];
  }
}