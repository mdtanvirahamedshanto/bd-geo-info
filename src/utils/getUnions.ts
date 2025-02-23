import { Union } from '../types';
import unions from '../data/unions.json';

export default function getUnions(upazilaId: string): Union[] {
  if (!upazilaId) {
    return [];
  }

  try {
    // First convert to unknown, then assert the type to handle the unions array structure
    const unionsData = (unions as unknown) as Union[];
    return unionsData
      .filter((union: Union) => union.upazila_id === upazilaId)
      .sort((a, b) => {
        if (!a.name || !b.name) return 0;
        return a.name.localeCompare(b.name);
      });
  } catch (error) {
    console.error('Error fetching unions:', error);
    return [];
  }
}