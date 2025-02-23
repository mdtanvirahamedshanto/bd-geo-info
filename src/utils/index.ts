import { Division, District, Upazila, Union, PostCode, UnionData } from '../types';
import divisions from '../data/bd-divisions.json';
import districts from '../data/bd-districts.json';
import upazilas from '../data/bd-upazilas.json';
import unions from '../data/unions.json';
import postcodes from '../data/bd-postcodes.json';
import { ReactNode } from 'react';

export const getDivisions = (language: 'en' | 'bn' = 'en'): { value: string; label: string }[] => {
  return divisions.divisions.map((division: Division) => ({
    value: division.id,
    label: language === 'en' ? division.name : division.bn_name
  }));
};

export const getDistricts = (divisionId: string, language: 'en' | 'bn' = 'en'): { value: string; label: string }[] => {
  return (districts.districts as unknown as District[])
    .filter((district) => district.division_id === divisionId)
    .map((district) => ({
      value: district.id,
      label: language === 'en' ? district.name : district.bn_name
    }));
};

export const getUpazilas = (districtId: string, language: 'en' | 'bn' = 'en'): { id: string; district_id: string; name: string; bn_name: string; value: string; label: string }[] => {
  const upazilaList = (upazilas.upazilas as any[]).map(upazila => ({
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

export const getUnions = (upazilaId: string, language: 'en' | 'bn' = 'en'): { value: string; label: string }[] => {
  return unions
    .filter((union: any) => union.data?.find((u: Union) => u.upazila_id === upazilaId))
    .map((union: any) => {
      const unionData = union.data?.find((u: Union) => u.upazila_id === upazilaId);
      return {
        value: unionData?.id || '',
        label: language === 'en' ? unionData?.name : unionData?.bn_name
      };
    });
};

export const getPostCodes = (districtId: string | null = null, upazila?: string): PostCode[] => {
  if (!districtId) {
    return [];
  }
  return postcodes.postcodes.filter((postcode: PostCode) =>
    ((postcode.district_id && postcode.district_id === districtId) || (postcode.district === districtId)) && 
    (!upazila || postcode.upazila === upazila)
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
  const divisionData = divisions.divisions.find((d: Division) => d.id === division);
  const districtData = districts.districts.find((d: { id: string; division_id: string; name: string; bn_name: string; lat: string; long: string; }) => d.id === district);
  const upazilaData = upazilas.upazilas.find((u: Upazila) => u.id === upazila);
  
  const unionData = unions
    .find((union: any) => union.data?.find((u: Union) => u.upazila_id === upazila))
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