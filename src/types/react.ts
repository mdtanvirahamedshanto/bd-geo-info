import type { ReactNode } from 'react';
import type {
  AddressFormData,
  AddressFormValidation,
  Division,
  District,
  Upazila,
  PostCode,
  Theme,
  ValidationRules,
} from './index';

export interface AddressFormErrors {
  division?: string | ReactNode;
  district?: string | ReactNode;
  upazila?: string | ReactNode;
  union?: string | ReactNode;
  postCode?: string | ReactNode;
  street?: string | ReactNode;
}

export interface AddressFormLabels {
  division?: string | ReactNode;
  district?: string | ReactNode;
  upazila?: string | ReactNode;
  union?: string | ReactNode;
  postCode?: string | ReactNode;
  street?: string | ReactNode;
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
    division?: string | ReactNode;
    district?: string | ReactNode;
    upazila?: string | ReactNode;
    union?: string | ReactNode;
    postCode?: string | ReactNode;
    street?: string | ReactNode;
    submit?: string | ReactNode;
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
  children?: ReactNode;
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
  customLabel?: string | ReactNode;
  customError?: string | ReactNode;
}

export interface PostOfficeSelectProps {
  division?: Division;
  district?: District;
  upazila?: Upazila;
  value?: PostCode;
  onChange?: (postOffice: PostCode) => void;
  language?: 'en' | 'bn';
  className?: string;
  placeholder?: string;
  customLabel?: string | ReactNode;
  customError?: string | ReactNode;
  theme?: Theme;
  errorClassName?: string;
  labelClassName?: string;
  containerClassName?: string;
}
