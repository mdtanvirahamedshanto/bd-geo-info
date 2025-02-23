import { Division, District, Upazila, UnionData, PostCode } from '../types';

const loadDivisions = async (): Promise<Division[]> => {
  const divisions = (await import('../data/bd-divisions.json')).default.divisions;
  return divisions;
};

const loadDistricts = async (divisionId: string | null = null): Promise<District[]> => {
  if (!divisionId) return [];
  const districts = (await import('../data/bd-districts.json')).default.districts;
  
  return districts
    .filter((district: { id: string; division_id: string; name: string; bn_name: string; lat: string; long: string; }) => 
      district.division_id === divisionId
    )
    .map((district): District => ({
      id: district.id,
      division_id: district.division_id,
      name: district.name,
      bn_name: district.bn_name,
      lat: district.lat,
      lon: district.long,
      url: ''
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
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
      union.data || []
    )
    .filter((union: { id: string; upazilla_id: string; name: string; bn_name: string; url: string }) => 
      union.upazilla_id === upazilaId
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return filteredUnions.map(union => ({
    id: union.id,
    upazila_id: union.upazilla_id,
    name: union.name,
    bn_name: union.bn_name,
    url: union.url
  }));
};

const loadPostCodes = async (params: {
  division?: string;
  district?: string;
  upazila?: string;
} | null = null): Promise<PostCode[]> => {
  if (!params) return [];
  const postcodes = (await import('../data/bd-postcodes.json')).default.postcodes;

  return postcodes
    .filter((postcode: PostCode) => {
      if (params.division && postcode.division_id.toLowerCase() !== params.division.toLowerCase()) return false;
      if (params.district && postcode.district_id?.toLowerCase() !== params.district.toLowerCase()) return false;
      if (params.upazila && postcode.upazila.toLowerCase() !== params.upazila.toLowerCase()) return false;
      return true;
    })
    .sort((a: PostCode, b: PostCode) => a.postCode.localeCompare(b.postCode));
};

export { loadDivisions, loadDistricts, loadUpazilas, loadUnions, loadPostCodes };