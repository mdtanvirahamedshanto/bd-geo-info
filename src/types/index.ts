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
  long: string;
  url?: string;
}

export interface Upazila {
  id: string;
  district_id: string;
  name: string;
  bn_name: string;
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

export interface AddressFormProps {
  onSubmit?: (data: AddressFormData) => void;
  onChange?: (data: AddressFormData) => void;
  defaultValues?: Partial<AddressFormData>;
  errors?: AddressFormErrors;
  className?: string;
  showPostCode?: boolean;
  showStreet?: boolean;
  showUnion?: boolean;
  showLabels?: boolean;
  labels?: {
    division?: string | React.ReactNode;
    district?: string | React.ReactNode;
    upazila?: string | React.ReactNode;
    union?: string | React.ReactNode;
    postCode?: string | React.ReactNode;
    street?: string | React.ReactNode;
    submit?: string | React.ReactNode;
  };
  placeholders?: {
    division?: string;
    district?: string;
    upazila?: string;
    union?: string;
    postCode?: string;
    street?: string;
  };
  disabled?: boolean;
  submitButtonProps?: {
    className?: string;
    disabled?: boolean;
  };
  children?: React.ReactNode;
  theme?: Theme;
  validation?: AddressFormValidation;
  customLabels?: AddressFormLabels;
  customErrors?: AddressFormErrors;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  inputContainerClassName?: string;
  language?: 'en' | 'bn';
}

export interface AddressFormData {
  division?: string;
  district?: string;
  upazila?: string;
  union?: string;
  postCode?: string;
  street?: string;
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

export interface SelectProps<T = string> {
  value?: T;
  onChange?: (value: T) => void;
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

export interface ValidationRules {
  required?: boolean;
  customValidation?: (value: any) => string | true;
}

export interface AddressFormLabels {
  division?: string | React.ReactNode;
  district?: string | React.ReactNode;
  upazila?: string | React.ReactNode;
  union?: string | React.ReactNode;
  postCode?: string | React.ReactNode;
  street?: string | React.ReactNode;
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

export interface AddressFormProps {
  language?: 'en' | 'bn';
  onChange?: (address: AddressFormData) => void;
  onSubmit?: (data: AddressFormData) => void;
  defaultValues?: Partial<AddressFormData>;
  errors?: AddressFormErrors;
  className?: string;
  children?: React.ReactNode;
  theme?: Theme;
  validation?: AddressFormValidation;
  showPostCode?: boolean;
  showStreet?: boolean;
  showUnion?: boolean;
  showLabels?: boolean;
  labels?: {
    division?: string | React.ReactNode;
    district?: string | React.ReactNode;
    upazila?: string | React.ReactNode;
    union?: string | React.ReactNode;
    postCode?: string | React.ReactNode;
    street?: string | React.ReactNode;
    submit?: string | React.ReactNode;
  };
  placeholders?: {
    division?: string;
    district?: string;
    upazila?: string;
    union?: string;
    postCode?: string;
    street?: string;
  };
  customLabels?: AddressFormLabels;
  customErrors?: AddressFormErrors;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  inputContainerClassName?: string;
  disabled?: boolean;
  submitButtonProps?: {
    className?: string;
    disabled?: boolean;
  };
}