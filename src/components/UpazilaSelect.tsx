import React, { useState, useEffect } from 'react';
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
  const [upazilas, setUpazilas] = useState<Upazila[]>([]);

  useEffect(() => {
    const loadUpazilas = async () => {
      if (district) {
        const upazilaData = await getUpazilas(district.id);
        setUpazilas(upazilaData);
      } else {
        setUpazilas([]);
      }
    };
    loadUpazilas();
  }, [district]);

  return (
    <div className={containerClassName}>
      {customLabel && <label className={labelClassName}>{customLabel}</label>}
      <select
        value={value?.id || ''}
        onChange={(e) => {
          const upazila = upazilas.find((u: Upazila) => u.id === e.target.value);
          if (upazila) {
            onChange?.(upazila);
          }
        }}
        className={className}
        disabled={!district}
      >
        <option value="">{placeholder}</option>
        {upazilas.map((upazila: Upazila) => (
          <option key={upazila.id} value={upazila.id}>
            {language === 'bn' ? upazila.bn_name : upazila.name}
          </option>
        ))}
      </select>
      {customError && <div className={errorClassName}>{customError}</div>}
    </div>
  );
}