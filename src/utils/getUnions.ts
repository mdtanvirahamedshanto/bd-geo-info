import { UnionData } from '../types';

interface Union {
  data?: UnionData[];
}

export const getUnions = async (upazilaId: string, language: 'en' | 'bn' = 'en'): Promise<{ value: string; label: string }[]> => {
  try {
    const unions = (await import('../data/unions.json')).default;
    return unions
      .filter((union: Union) => union.data?.some((u: UnionData) => u.upazilla_id === upazilaId))
      .map((union: Union) => {
        const unionData = union.data?.find((u: UnionData) => u.upazilla_id === upazilaId);
        if (!unionData) return null;
        return {
          value: unionData.id,
          label: language === 'en' ? unionData.name : unionData.bn_name
        };
      })
      .filter((union): union is { value: string; label: string } => union !== null);
  } catch (error) {
    console.error('Error fetching unions:', error);
    return [];
  }
};

export function getUnionsList(upazilaId: string): UnionData[] {
  if (!upazilaId) {
    return [];
  }

  try {
    const unions = (require('../data/unions.json')).default;
    return unions
      .filter((union: Union) => union.data?.some((u: UnionData) => u.upazilla_id === upazilaId))
      .flatMap((union: Union) => union.data || [])
      .filter((union: UnionData) => union.upazilla_id === upazilaId)
      .sort((a: { name: string; }, b: { name: any; }) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error('Error fetching unions:', error);
    return [];
  }
}