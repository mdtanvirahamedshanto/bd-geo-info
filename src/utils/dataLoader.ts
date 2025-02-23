import { Division, District, Upazila, UnionData, PostCode } from '../types';

const loadDivisions = async (): Promise<Division[]> => {
  try {
    const divisions = (await import('../data/bd-divisions.json')).default.divisions;
    return divisions;
  } catch (error) {
    console.error('Error loading divisions:', error);
    return [];
  }
};

const loadDistricts = async (divisionId: string | null = null): Promise<District[]> => {
  if (!divisionId) return [];
  try {
    const districts = (await import(`../data/districts/division-${divisionId}.json`)).default;
    return districts.map((district: { id: string; division_id: string; name: string; bn_name: string; lat: string; long: string }): District => ({
      id: district.id,
      division_id: district.division_id,
      name: district.name,
      bn_name: district.bn_name,
      lat: district.lat,
      lon: district.long,
      url: ''
    })).sort((a: District, b: District) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error(`Error loading districts for division ${divisionId}:`, error);
    return [];
  }
};

const loadPostcodes = async (divisionId: string | null = null): Promise<PostCode[]> => {
  if (!divisionId) return [];
  try {
    const { postcodes } = await import(`../data/postcodes/division-${divisionId}.json`);
    return postcodes;
  } catch (error) {
    console.error(`Error loading postcodes for division ${divisionId}:`, error);
    return [];
  }
};

const loadUpazilas = async (districtId: string | null = null): Promise<Upazila[]> => {
  if (!districtId) return [];
  const upazilas = (await import('../data/bd-upazilas.json')).default.upazilas;

  return upazilas
    .filter((upazila: Upazila) => upazila.district_id === districtId)
    .sort((a: Upazila, b: Upazila) => a.name.localeCompare(b.name));
};

const loadUnions = async (upazilaId: string | null = null): Promise<UnionData[]> => {
  if (!upazilaId) return [];
  const unions = (await import('../data/unions.json')).default;
  
  const filteredUnions = unions
    .filter((union: { data?: { id: string; upazilla_id: string; name: string; bn_name: string; url: string }[] }) => 
      union.data?.some(u => u.upazilla_id === upazilaId)
    )
    .flatMap((union: { data?: { id: string; upazilla_id: string; name: string; bn_name: string; url: string }[] }) => 
      (union.data || []).map(item => ({
        id: item.id,
        upazila_id: item.upazilla_id,
        name: item.name,
        bn_name: item.bn_name,
        url: item.url
      }))
    )
    .filter((union: UnionData) => union.upazila_id === upazilaId);

  return filteredUnions;
};

export { loadDivisions, loadDistricts, loadUpazilas, loadUnions, loadPostcodes };