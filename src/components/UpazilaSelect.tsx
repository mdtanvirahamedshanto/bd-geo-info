import React from 'react';
import { District, Upazila } from "../types/index";
import { getUpazilas } from '../utils';

interface UpazilaSelectProps {
  district?: District;
  value?: Upazila;
  onChange?: (upazila: Upazila) => void;
  language?: 'en' | 'bn';
  className?: string;
  placeholder?: string;
  customLabel?: string | React.ReactNode;
  customError?: string | React.ReactNode;
  theme?: any;
  errorClassName?: string;
  labelClassName?: string;
  containerClassName?: string;
}

export default function UpazilaSelect({
  district,
  value,
  onChange,
  language = 'en',
  className = '',
  placeholder = 'Select Upazila',
  customLabel,
  customError,
  theme,
  errorClassName = '',
  labelClassName = '',
  containerClassName = '',
}: UpazilaSelectProps) {
  const upazilas = district ? getUpazilas(district.id) : [];

  return (
    <div className={containerClassName}>
      {customLabel && <label className={labelClassName}>{customLabel}</label>}
      <select
        value={value?.id || ''}
        onChange={(e) => {
          const upazila = upazilas.find((u) => u.id === e.target.value);
          if (upazila) {
            onChange?.(upazila);
          }
        }}
        className={className}
        disabled={!district}
      >
        <option value="">{placeholder}</option>
        {upazilas.map((upazila) => (
          <option key={upazila.id} value={upazila.id}>
            {language === 'bn' ? upazila.bn_name : upazila.name}
          </option>
        ))}
      </select>
      {customError && <div className={errorClassName}>{customError}</div>}
    </div>
  );
}