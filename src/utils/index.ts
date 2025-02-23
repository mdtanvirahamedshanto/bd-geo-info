import { Division, District, Upazila, Union, PostCode } from '../types';
import divisions from '../data/divisions.json';
import districts from '../data/districts.json';
import upazilas from '../data/upazilas.json';
import unions from '../data/unions.json';
import postcodes from '../data/bd-postcodes.json';

export const getDivisions = (language: 'en' | 'bn' = 'en'): { value: string; label: string }[] => {
  return divisions.data.map((division: Division) => ({
    value: division.id,
    label: language === 'en' ? division.name : division.bn_name
  }));
};

export const getDistricts = (divisionId: string, language: 'en' | 'bn' = 'en'): { value: string; label: string }[] => {
  return districts.data
    .filter((district: District) => district.division_id === divisionId)
    .map((district: District) => ({
      value: district.id,
      label: language === 'en' ? district.name : district.bn_name
    }));
};

export const getUpazilas = (districtId: string, language: 'en' | 'bn' = 'en'): { value: string; label: string }[] => {
  return upazilas.data
    .filter((upazila: Upazila) => upazila.district_id === districtId)
    .map((upazila: Upazila) => ({
      value: upazila.id,
      label: language === 'en' ? upazila.name : upazila.bn_name
    }));
};

export const getUnions = (upazilaId: string, language: 'en' | 'bn' = 'en'): { value: string; label: string }[] => {
  return unions.data
    .filter((union: Union) => union.upazila_id === upazilaId)
    .map((union: Union) => ({
      value: union.id,
      label: language === 'en' ? union.name : union.bn_name
    }));
};

export const getPostCodes = (districtId: string | null = null, upazila?: string): PostCode[] => {
  if (!districtId) {
    return [];
  }
  return postcodes.data.filter(
    (postcode: PostCode) =>
      postcode.district_id === districtId && (!upazila || postcode.upazila === upazila)
  );
};

export const formatAddress = (
  division: string,
  district: string,
  upazila: string,
  union: string,
  postCode: string,
  street: string,
  language: 'en' | 'bn' = 'en'
): string => {
  const divisionData = divisions.data.find((d: Division) => d.id === division);
  const districtData = districts.data.find((d: District) => d.id === district);
  const upazilaData = upazilas.data.find((u: Upazila) => u.id === upazila);
  const unionData = unions.data.find((u: Union) => u.id === union);

  if (language === 'en') {
    return `${street}, ${unionData?.name}, ${upazilaData?.name}, ${districtData?.name}-${postCode}, ${divisionData?.name}`;
  }
  return `${street}, ${unionData?.bn_name}, ${upazilaData?.bn_name}, ${districtData?.bn_name}-${postCode}, ${divisionData?.bn_name}`;
};

export const validatePostCode = (postCode: string): boolean => {
  return /^\d{4}$/.test(postCode);
};