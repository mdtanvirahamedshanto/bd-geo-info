import { ReactNode } from 'react';

export interface Division {
  id: string;
  name: string;
  bn_name: string;
}

export interface District {
  id: string;
  division_id: string;
  name: string;
  bn_name: string;
  lat?: string;
  lon?: string;
  url?: string;
}

export interface Upazila {
  id: string;
  district_id: string;
  name: string;
  bn_name: string;
  url?: string;
}

export interface Union {
  id: string;
  upazilla_id: string;
  name: string;
  bn_name: string;
  url?: string;
}

export interface PostCode {
  id: string;
  postCode: string;
  upazila: string;
  district: string;
  division: string;
}

export interface AddressFormProps {
  language?: 'en' | 'bn';
  onChange?: (address: AddressData) => void;
  className?: string;
  children?: ReactNode;
}

export interface AddressData {
  division?: Division;
  district?: District;
  upazila?: Upazila;
  union?: Union;
  postCode?: string;
  street?: string;
}

// Export data
export { default as divisions } from './data/bd-divisions.json';
export { default as districts } from './data/bd-districts.json';
export { default as upazilas } from './data/bd-upazilas.json';
export { default as unions } from './data/unions.json';
export { default as postcodes } from './data/bd-postcodes.json';

// Export components
export { default as AddressForm } from './components/AddressForm';
export { default as DivisionSelect } from './components/DivisionSelect';
export { default as DistrictSelect } from './components/DistrictSelect';
export { default as UpazilaSelect } from './components/UpazilaSelect';
export { default as UnionSelect } from './components/UnionSelect';

// Export utilities
export { default as getDistricts } from './utils/getDistricts';
export { default as getUpazilas } from './utils/getUpazilas';
export { default as getUnions } from './utils/getUnions';
export { default as getPostCode } from './utils/getPostCode';