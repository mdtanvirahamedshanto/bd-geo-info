import { Village } from '../types';

/**
 * Fetches all villages/mouzas for a given upazila ID.
 * The village data is loaded dynamically to prevent bloating the main bundle.
 * 
 * @param upazilaId The ID of the upazila to fetch villages for
 * @returns A promise that resolves to an array of Village objects sorted by name
 */
export default async function getVillages(upazilaId: string | null = null): Promise<Village[]> {
  if (!upazilaId) {
    return [];
  }

  try {
    const villagesData = (await import('../data/bd-villages.json')).default;
    const villages = (villagesData as any)[upazilaId] || [];
    return villages.map(([id, name, jl, survey]: [string, string, string, string | null]): Village => ({
      id,
      name,
      jl,
      survey
    }));
  } catch (error) {
    console.error('Error fetching villages:', error);
    return [];
  }
}
