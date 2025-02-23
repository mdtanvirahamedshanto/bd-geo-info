export interface Division {
  id: string;
  name: string;
  bn_name: string;
  url: string;
}

export interface District {
  id: string;
  division_id: string;
  name: string;
  bn_name: string;
  lat: string;
  lon: string;
  url: string;
}

export interface Upazila {
  id: string;
  district_id: string;
  name: string;
  bn_name: string;
}

export interface Union {
  id: string;
  upazila_id: string;
  name: string;
  bn_name: string;
}

export interface PostCode {
  division_id: string;
  district_id: string;
  upazila: string;
  postOffice: string;
  postCode: string;
}

export interface GeoLocation {
  lat: string;
  lon: string;
}

export interface AddressFormData {
  division?: string;
  district?: string;
  upazila?: string;
  union?: string;
  postCode?: string;
  street?: string;
}

export interface SelectProps {
  value?: string;
  onChange: (value: string) => void;
  language?: 'en' | 'bn';
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}