import { UnionData } from '../types';

export const getUnions = async (upazilaId: string, language: 'en' | 'bn' = 'en'): Promise<{ value: string; label: string }[]> => {
  try {
    const unionsData = (await import('../data/unions.json')).default as unknown as Record<string, UnionData[]>;
    const list = unionsData[upazilaId] || [];
    return list.map((union: UnionData) => ({
      value: union.id,
      label: language === 'en' ? union.name : union.bn_name
    }));
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
    const unionsData = require('../data/unions.json');
    const data = (unionsData && (unionsData as any).default) ? (unionsData as any).default : unionsData;
    const list = data[upazilaId] || [];
    return [...list].sort((a: UnionData, b: UnionData) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error('Error fetching unions:', error);
    return [];
  }
}