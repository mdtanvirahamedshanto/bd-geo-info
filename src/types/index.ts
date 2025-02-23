export interface Division {
  id: string;
  name: string;
  bn_name: string;
  lat: string;
  long: string;
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

export interface UnionData {
  id: string;
  upazila_id: string;
  name: string;
  bn_name: string;
  url: string;
}

export interface Union {
  upazila_id: string;
  type: string;
  name?: string;
  database?: string;
  data: UnionData[];
}

export interface PostCode {
  district?: string;
  division_id: string;
  district_id?: string;
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

export interface Theme {
  primaryColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: string;
  fontSize?: string;
  padding?: string;
  margin?: string;
  hoverBackgroundColor?: string;
  focusBorderColor?: string;
  errorColor?: string;
  disabledOpacity?: string;
  labelColor?: string;
  placeholderColor?: string;
  transition?: string;
  boxShadow?: string;
  errorFontSize?: string;
  labelFontSize?: string;
}

export interface ValidationRules {
  required?: boolean;
  customValidation?: (value: any) => boolean | string;
}

export interface AddressFormLabels {
  division?: string | React.ReactNode;
  district?: string | React.ReactNode;
  upazila?: string | React.ReactNode;
  union?: string | React.ReactNode;
  postCode?: string | React.ReactNode;
  street?: string | React.ReactNode;
}

export interface AddressFormErrors {
  division?: string | React.ReactNode;
  district?: string | React.ReactNode;
  upazila?: string | React.ReactNode;
  union?: string | React.ReactNode;
  postCode?: string | React.ReactNode;
  street?: string | React.ReactNode;
}

export interface AddressFormValidation {
  division?: ValidationRules;
  district?: ValidationRules;
  upazila?: ValidationRules;
  union?: ValidationRules;
  postCode?: ValidationRules;
  street?: ValidationRules;
}

export interface SelectProps {
  value?: string;
  onChange: (value: string) => void;
  language?: 'en' | 'bn';
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  theme?: Theme;
  validation?: ValidationRules;
  errorClassName?: string;
  labelClassName?: string;
  containerClassName?: string;
  customLabel?: string | React.ReactNode;
  customError?: string | React.ReactNode;
}

export interface AddressFormProps {
  language?: 'en' | 'bn';
  onChange?: (address: AddressFormData) => void;
  className?: string;
  children?: React.ReactNode;
  theme?: Theme;
  validation?: AddressFormValidation;
  showPostCode?: boolean;
  showLabels?: boolean;
  customLabels?: AddressFormLabels;
  customErrors?: AddressFormErrors;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  inputContainerClassName?: string;
}