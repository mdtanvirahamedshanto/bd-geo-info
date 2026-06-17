// Core utility functions (framework-agnostic)
export { getDivisions, getDistricts, getUpazilas, getUnions, getPostCodes, formatAddress, validatePostCode } from './utils';

// Individual util exports for backwards compatibility
export { getDistricts as getDistrictsList } from './utils/getDistricts';
export { default as getUpazilasList } from './utils/getUpazilas';
export { getUnions as getUnionsList, getUnionsList as getUnionsSync } from './utils/getUnions';
export { default as getPostCode } from './utils/getPostCode';

// Core types (no React dependency)
export type {
  Division,
  District,
  Upazila,
  UnionData,
  Union,
  PostCode,
  AddressFormData,
  AddressFormValidation,
  ValidationRules,
  Theme,
} from './types';
