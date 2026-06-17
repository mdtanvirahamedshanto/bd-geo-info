import { Division, District, Upazila, Union, PostCode, UnionData } from '../types';

export const getDivisions = async (language: 'en' | 'bn' = 'en'): Promise<{ value: string; label: string }[]> => {
  const divisions = (await import('../data/bd-divisions.json')).default.divisions;
  return divisions.map((division: Division) => ({
    value: division.id,
    label: language === 'en' ? division.name : division.bn_name
  }));
};

export const getDistricts = async (divisionId: string, language: 'en' | 'bn' = 'en'): Promise<{ value: string; label: string }[]> => {
  const districts = (await import('../data/bd-districts.json')).default.districts;
  return districts
    .filter((district: { id: string; division_id: string; name: string; bn_name: string; lat: string; long: string; url?: string }) => district.division_id === divisionId)
    .map((district): District => ({
      id: district.id,
      division_id: district.division_id,
      name: district.name,
      bn_name: district.bn_name,
      lat: district.lat,
      long: district.long,
      url: district.url || ''
    }))
    .map((district) => ({
      value: district.id,
      label: language === 'en' ? district.name : district.bn_name
    }));
};

export const getUpazilas = async (districtId: string, language: 'en' | 'bn' = 'en'): Promise<{ id: string; district_id: string; name: string; bn_name: string; value: string; label: string; url?: string }[]> => {
  const upazilasData = (await import('../data/bd-upazilas.json')).default as unknown as Record<string, Upazila[]>;
  const upazilaList = upazilasData[districtId] || [];

  return upazilaList.map((upazila) => ({
    id: upazila.id,
    district_id: upazila.district_id,
    name: upazila.name,
    bn_name: upazila.bn_name,
    value: upazila.id,
    label: language === 'en' ? upazila.name : upazila.bn_name,
    url: upazila.url || ''
  }));
};

export const getUnions = async (upazilaId: string, language: 'en' | 'bn' = 'en'): Promise<{ value: string; label: string; url?: string }[]> => {
  const unionsData = (await import('../data/unions.json')).default as unknown as Record<string, UnionData[]>;
  const unionList = unionsData[upazilaId] || [];
  
  return unionList.map((unionData: UnionData) => ({
    value: unionData.id,
    label: language === 'en' ? unionData.name : unionData.bn_name,
    url: unionData.url || ''
  }));
};



export const getPostCodes = async (districtId: string | null = null, upazila?: string): Promise<PostCode[]> => {
  if (!districtId) {
    return [];
  }
  const postcodes = (await import('../data/bd-postcodes.json')).default.postcodes;
  return postcodes.filter((postcode: PostCode) =>
    ((postcode.district_id && postcode.district_id === districtId) || (postcode.district === districtId)) && 
    (!upazila || postcode.upazila === upazila)
  );
};

export const formatAddress = async (
  division: string,
  district: string,
  upazila: string,
  union: string,
  postCode: string,
  street: string,
  language: 'en' | 'bn' = 'en'
): Promise<string> => {
  const [divisions, districts, upazilas, unions] = await Promise.all([
    import('../data/bd-divisions.json'),
    import('../data/bd-districts.json'),
    import('../data/bd-upazilas.json'),
    import('../data/unions.json')
  ]);

  const divisionData = divisions.default.divisions.find((d: Division) => d.id === division);
  const districtData = districts.default.districts.find((d: District) => d.id === district);
  
  const upazilaList = (upazilas.default as unknown as Record<string, Upazila[]>)[district] || [];
  const upazilaData = upazilaList.find((u: Upazila) => u.id === upazila);
  
  const unionList = (unions.default as unknown as Record<string, UnionData[]>)[upazila] || [];
  const unionData = unionList.find((u: UnionData) => u.id === union);

  if (!divisionData || !districtData || !upazilaData || !unionData || !postCode) {
    return '';
  }

  const formattedStreet = street?.trim() || '';
  
  if (language === 'en') {
    const addressParts = [];
    if (formattedStreet) addressParts.push(formattedStreet);
    addressParts.push(unionData.name);
    addressParts.push(upazilaData.name);
    return `${addressParts.join(', ')}, ${districtData.name}-${postCode}, ${divisionData.name}`;
  }
  
  const addressParts = [];
  if (formattedStreet) addressParts.push(formattedStreet);
  addressParts.push(unionData.bn_name);
  addressParts.push(upazilaData.bn_name);
  return `${addressParts.join(', ')}, ${districtData.bn_name}-${postCode}, ${divisionData.bn_name}`;
};

export const validatePostCode = (postCode: string): boolean => {
  return /^\d{4}$/.test(postCode);
};