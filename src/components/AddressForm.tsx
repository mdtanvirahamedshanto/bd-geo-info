import React, { useState } from 'react';
import { AddressFormData, AddressFormProps, AddressFormValidation, Division, District, Upazila, UnionData } from "../types/index";
import DivisionSelect from './DivisionSelect';
import DistrictSelect from './DistrictSelect';
import UpazilaSelect from './UpazilaSelect';
import UnionSelect from './UnionSelect';
import getPostCode from '../utils/getPostCode';

export default function AddressForm({
  language = 'en',
  onChange,
  className = '',
  children,
  theme,
  validation,
  showPostCode = true,
  showLabels = true,
  customLabels,
  customErrors,
  containerClassName = '',
  labelClassName = '',
  errorClassName = '',
  inputContainerClassName = ''
}: AddressFormProps) {
  const [address, setAddress] = useState<AddressFormData>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedDivision, setSelectedDivision] = useState<Division>();
  const [selectedDistrict, setSelectedDistrict] = useState<District>();
  const [selectedUpazila, setSelectedUpazila] = useState<Upazila>();
  const [selectedUnion, setSelectedUnion] = useState<UnionData>();

  const handleDivisionChange = (division: Division) => {
    setSelectedDivision(division);
    handleChange({ division: division.id });
  };

  const handleDistrictChange = (district: District) => {
    setSelectedDistrict(district);
    handleChange({ district: district.id });
  };

  const handleUpazilaChange = (upazila: Upazila) => {
    setSelectedUpazila(upazila);
    handleChange({ upazila: upazila.id });
  };

  const handleUnionChange = (union: UnionData) => {
    setSelectedUnion(union);
    handleChange({ union: union.id });
  };

  const validateField = (field: keyof AddressFormValidation, value: any) => {
    if (!validation?.[field]) return true;
    
    if (validation[field]?.required && !value) {
      return language === 'bn' ? 'এই ক্ষেত্রটি আবশ্যক' : 'This field is required';
    }

    if (validation[field]?.customValidation) {
      return validation[field]?.customValidation!(value);
    }

    return true;
  };

  const handleChange = (newData: Partial<AddressFormData>) => {
    const updatedAddress = { ...address, ...newData };
    const newErrors: Record<string, string> = {};

    // Reset dependent fields when parent field changes
    if ('division' in newData) {
      updatedAddress.district = undefined;
      updatedAddress.upazila = undefined;
      updatedAddress.union = undefined;
      updatedAddress.postCode = undefined;
    } else if ('district' in newData) {
      updatedAddress.upazila = undefined;
      updatedAddress.union = undefined;
      updatedAddress.postCode = undefined;
    } else if ('upazila' in newData) {
      updatedAddress.union = undefined;
      // Update postcode when upazila changes
      const postcodes = getPostCode({
        division: updatedAddress.division?.toString() || '',
        district: updatedAddress.district?.toString() || '',
        upazila: updatedAddress.upazila?.toString() || '',
      });
      updatedAddress.postCode = postcodes[0]?.postCode;
    }

    // Validate fields
    Object.keys(updatedAddress).forEach((key) => {
      const validationResult = validateField(key as keyof AddressFormValidation, updatedAddress[key as keyof AddressFormData]);
      if (typeof validationResult === 'string') {
        newErrors[key] = validationResult;
      }
    });

    setErrors(newErrors);
    setAddress(updatedAddress);
    onChange?.(updatedAddress);
  };

  const getStyles = () => {
    if (!theme) return {};
    return {
      '--primary-color': theme.colors?.primary,
      '--background-color': theme.colors?.background,
      '--border-color': theme.colors?.border,
      '--border-radius': theme.borderRadius,
      '--font-size': theme.fontSize?.input,
      '--padding': theme.spacing?.input,
      '--margin': theme.spacing?.label,
    } as React.CSSProperties;
  };

  const selectProps = {
    theme,
    errorClassName,
    labelClassName,
    containerClassName: inputContainerClassName,
    language
  };

  return (
    <div className={containerClassName} style={getStyles()}>
      <DivisionSelect
        {...selectProps}
        value={selectedDivision}
        onChange={handleDivisionChange}
        placeholder={language === 'bn' ? 'বিভাগ নির্বাচন করুন' : 'Select Division'}
        customLabel={customLabels?.division}
        customError={customErrors?.division || errors.division}
      />
      <DistrictSelect
        {...selectProps}
        division={selectedDivision}
        value={selectedDistrict}
        onChange={handleDistrictChange}
        placeholder={language === 'bn' ? 'জেলা নির্বাচন করুন' : 'Select District'}
        customLabel={customLabels?.district}
        customError={customErrors?.district || errors.district}
      />
      <UpazilaSelect
        {...selectProps}
        district={selectedDistrict}
        value={selectedUpazila}
        onChange={handleUpazilaChange}
        placeholder={language === 'bn' ? 'উপজেলা নির্বাচন করুন' : 'Select Upazila'}
        customLabel={customLabels?.upazila}
        customError={customErrors?.upazila || errors.upazila}
      />
      <UnionSelect
        {...selectProps}
        upazila={selectedUpazila}
        value={selectedUnion}
        onChange={handleUnionChange}
        placeholder={language === 'bn' ? 'ইউনিয়ন নির্বাচন করুন' : 'Select Union'}
        customLabel={customLabels?.union}
        customError={customErrors?.union || errors.union}
      />
      {showPostCode && address.postCode && (
        <div className={inputContainerClassName}>
          {showLabels && (
            <label className={labelClassName}>
              {customLabels?.postCode || (language === 'bn' ? 'পোস্ট কোড:' : 'Post Code:')}
            </label>
          )}
          <span>{address.postCode}</span>
        </div>
      )}
      {children}
    </div>
  );
}