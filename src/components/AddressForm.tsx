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
    handleChange({ division: language === 'bn' ? division.bn_name : division.name });
  };

  const handleDistrictChange = (district: District) => {
    setSelectedDistrict(district);
    handleChange({ district: language === 'bn' ? district.bn_name : district.name });
  };

  const handleUpazilaChange = (upazila: Upazila) => {
    setSelectedUpazila(upazila);
    handleChange({ upazila: language === 'bn' ? upazila.bn_name : upazila.name });
  };

  const handleUnionChange = (union: UnionData) => {
    setSelectedUnion(union);
    handleChange({ union: language === 'bn' ? union.bn_name : union.name });
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
    if (!theme) {
      return {
        '--primary-color': '#3b82f6',
        '--background-color': '#ffffff',
        '--border-color': '#e5e7eb',
        '--border-radius': '0.375rem',
        '--font-size': '0.875rem',
        '--padding': '0.625rem 0.875rem',
        '--margin': '0.5rem',
        '--select-height': '2.5rem',
        '--transition': 'all 0.2s ease-in-out',
        '--hover-border-color': '#93c5fd',
        '--hover-bg-color': '#f8fafc',
        '--error-color': '#ef4444',
        '--label-color': '#374151',
        '--placeholder-color': '#9ca3af',
        '--mobile-width': '100%',
        '--desktop-width': '24rem'
      } as React.CSSProperties;
    }
    return {
      '--primary-color': theme.colors?.primary || '#3b82f6',
      '--background-color': theme.colors?.background || '#ffffff',
      '--border-color': theme.colors?.border || '#e5e7eb',
      '--border-radius': theme.borderRadius || '0.375rem',
      '--font-size': theme.fontSize?.input || '0.875rem',
      '--padding': theme.spacing?.input || '0.625rem 0.875rem',
      '--margin': theme.spacing?.label || '0.5rem',
      '--select-height': '2.5rem',
      '--transition': 'all 0.2s ease-in-out',
      '--hover-border-color': '#93c5fd',
      '--hover-bg-color': '#f8fafc',
      '--error-color': '#ef4444',
      '--label-color': '#374151',
      '--placeholder-color': '#9ca3af',
      '--mobile-width': '100%',
      '--desktop-width': '24rem'
    } as React.CSSProperties;
  };

  const selectProps = {
    theme,
    errorClassName: `${errorClassName} text-[var(--error-color)] text-xs mt-1`,
    labelClassName: `${labelClassName} block text-[var(--label-color)] text-sm font-medium mb-2`,
    containerClassName: `${inputContainerClassName} flex flex-col mb-6 w-full md:w-[var(--desktop-width)]`,
    language,
    className: `w-full h-[var(--select-height)] px-4 py-2.5 bg-[var(--background-color)] border border-[var(--border-color)] rounded-[var(--border-radius)] text-[var(--font-size)] transition-[var(--transition)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent hover:border-[var(--hover-border-color)] hover:bg-[var(--hover-bg-color)] disabled:opacity-50 disabled:cursor-not-allowed shadow-sm`
  };

  return (
    <div className={`${containerClassName} flex flex-col gap-4 p-6 bg-white rounded-lg shadow-sm w-full`} style={{
      ...getStyles(),
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      maxWidth: '100%'
    }}>
      <div className="flex flex-wrap gap-4 w-full" style={{ rowGap: '1rem' }}>
        <div className="w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(33.33%-0.67rem)]">
          <DivisionSelect
            {...selectProps}
            value={selectedDivision}
            onChange={handleDivisionChange}
            placeholder={language === 'bn' ? 'বিভাগ নির্বাচন করুন' : 'Select Division'}
            customLabel={customLabels?.division}
            customError={customErrors?.division || errors.division}
          />
        </div>
        <div className="w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(33.33%-0.67rem)]">
          <DistrictSelect
            {...selectProps}
            division={selectedDivision}
            value={selectedDistrict}
            onChange={handleDistrictChange}
            placeholder={language === 'bn' ? 'জেলা নির্বাচন করুন' : 'Select District'}
            customLabel={customLabels?.district}
            customError={customErrors?.district || errors.district}
          />
        </div>
        <div className="w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(33.33%-0.67rem)]">
          <UpazilaSelect
            {...selectProps}
            district={selectedDistrict}
            value={selectedUpazila}
            onChange={handleUpazilaChange}
            placeholder={language === 'bn' ? 'উপজেলা নির্বাচন করুন' : 'Select Upazila'}
            customLabel={customLabels?.upazila}
            customError={customErrors?.upazila || errors.upazila}
          />
        </div>
        <div className="w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(33.33%-0.67rem)]">
          <UnionSelect
            {...selectProps}
            upazila={selectedUpazila}
            value={selectedUnion}
            onChange={handleUnionChange}
            placeholder={language === 'bn' ? 'ইউনিয়ন নির্বাচন করুন' : 'Select Union'}
            customLabel={customLabels?.union}
            customError={customErrors?.union || errors.union}
          />
        </div>
      </div>
      {children}
    </div>
  );
}