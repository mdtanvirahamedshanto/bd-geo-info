import { Division, District, Upazila, Union, PostCode, UnionData } from '../types';
import { ReactNode } from 'react';

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
    .filter((district: { id: string; division_id: string; name: string; bn_name: string; lat: string; long: string }) => district.division_id === divisionId)
    .map((district): District => ({
      id: district.id,
      division_id: district.division_id,
      name: district.name,
      bn_name: district.bn_name,
      lat: district.lat,
      lon: district.long,
      url: ''
    }))
    .map((district) => ({
      value: district.id,
      label: language === 'en' ? district.name : district.bn_name
    }));
};

export const getUpazilas = async (districtId: string, language: 'en' | 'bn' = 'en'): Promise<{ id: string; district_id: string; name: string; bn_name: string; value: string; label: string }[]> => {
  const upazilas = (await import('../data/bd-upazilas.json')).default.upazilas;
  const upazilaList = upazilas.map(upazila => ({
    id: upazila.id,
    district_id: upazila.district_id,
    name: upazila.name,
    bn_name: upazila.bn_name,
    value: upazila.id,
    label: language === 'en' ? upazila.name : upazila.bn_name
  }));

  return upazilaList
    .filter((upazila) => upazila.district_id === districtId)
    .map((upazila) => ({
      id: upazila.id,
      district_id: upazila.district_id,
      name: upazila.name,
      bn_name: upazila.bn_name,
      value: upazila.id,
      label: language === 'en' ? upazila.name : upazila.bn_name
    }));
};

export const getUnions = async (upazilaId: string, language: 'en' | 'bn' = 'en'): Promise<{ value: string; label: string }[]> => {
  const unions = (await import('../data/unions.json')).default;
  const filteredUnions = unions
    .filter((union: { data?: { id: string; upazilla_id: string; name: string; bn_name: string; url: string }[] }) => 
      union.data?.some(u => u.upazilla_id === upazilaId)
    )
    .map((union: { data?: { id: string; upazilla_id: string; name: string; bn_name: string; url: string }[] }) => {
      const unionData = union.data?.find(u => u.upazilla_id === upazilaId);
      if (!unionData) return null;
      return {
        value: unionData.id,
        label: language === 'en' ? unionData.name : unionData.bn_name
      };
    })
    .filter((union): union is { value: string; label: string } => union !== null);
  
  return filteredUnions;
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
  const districtData = districts.default.districts.find((d: { id: string; division_id: string; name: string; bn_name: string; lat: string; long: string; }) => d.id === district);
  const upazilaData = upazilas.default.upazilas.find((u: Upazila) => u.id === upazila);
  
  const unionData = unions.default
    .find((union: { data?: { id: string; upazilla_id: string; name: string; bn_name: string; url: string }[] }) => 
      union.data?.some(u => u.upazilla_id === upazila))
    ?.data?.find((u: { id: string; upazilla_id: string; name: string; bn_name: string; url: string }) => u.upazilla_id === upazila);

  if (!divisionData || !districtData || !upazilaData || !unionData || !postCode) {
    return '';
  }

  const formattedStreet = street?.trim() || '';
  
  if (language === 'en') {
    return formattedStreet ? 
      `${formattedStreet}, ${unionData.name}, ${upazilaData.name}, ${districtData.name}-${postCode}, ${divisionData.name}` :
      `${unionData.name}, ${upazilaData.name}, ${districtData.name}-${postCode}, ${divisionData.name}`;
  }
  
  return formattedStreet ? 
    `${formattedStreet}, ${unionData.bn_name}, ${upazilaData.bn_name}, ${districtData.bn_name}-${postCode}, ${divisionData.bn_name}` :
    `${unionData.bn_name}, ${upazilaData.bn_name}, ${districtData.bn_name}-${postCode}, ${divisionData.bn_name}`;
};

export const validatePostCode = (postCode: string): boolean => {
  return /^\d{4}$/.test(postCode);
};