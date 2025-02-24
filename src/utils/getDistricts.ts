import { District } from '../types';
import districts from '../data/bd-districts.json';

interface RawDistrict {
  id: string;
  division_id: string;
  name: string;
  bn_name: string;
  lat: string;
  long: string;
}

interface DistrictsData {
  districts: RawDistrict[];
}

export const getDistricts = async (divisionId: string, language: 'en' | 'bn' = 'en'): Promise<District[]> => {
  const districts = (await import('../data/bd-districts.json')).default.districts;
  return districts
    .filter((district) => district.division_id === divisionId)
    .map((district): District => ({
      id: district.id,
      division_id: district.division_id,
      name: district.name,
      bn_name: district.bn_name,
      lat: district.lat,
      long: district.long,
      url: ''
    }));
};