export interface Division {
  id: string;
  name: string;
  bn_name: string;
  lat: string;
  long: string;
  url?: string;
}

export interface District {
  id: string;
  division_id: string;
  name: string;
  bn_name: string;
  lat: string;
  long: string;
  url?: string;
}

export interface Upazila {
  id: string;
  district_id: string;
  name: string;
  bn_name: string;
  url?: string;
}

export interface UnionData {
  id: string;
  upazilla_id: string;
  name: string;
  bn_name: string;
  url: string;
}

export interface Union {
  type: string;
  name?: string;
  database?: string;
  data?: UnionData[];
}

export interface PostCode {
  district?: string;
  division_id: string;
  district_id?: string;
  upazila: string;
  postOffice: string;
  postCode: string;
}

export interface AddressFormData {
  division?: string;
  district?: string;
  upazila?: string;
  union?: string;
  postCode?: string;
  street?: string;
}

export interface AddressFormValidation {
  division?: ValidationRules;
  district?: ValidationRules;
  upazila?: ValidationRules;
  union?: ValidationRules;
  postCode?: ValidationRules;
  street?: ValidationRules;
}

export interface ValidationRules {
  required?: boolean;
  customValidation?: (value: any) => string | true;
}

export interface Theme {
  colors?: {
    primary?: string;
    background?: string;
    border?: string;
  };
  borderRadius?: string;
  fontSize?: {
    input?: string;
  };
  spacing?: {
    input?: string;
    label?: string;
  };
}