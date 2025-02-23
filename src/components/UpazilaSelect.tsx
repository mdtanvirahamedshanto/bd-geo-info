import React from 'react';
import { District, Upazila } from '..';
import { getUpazilas } from '../utils';

interface UpazilaSelectProps {
  district?: District;
  value?: Upazila;
  onChange?: (upazila: Upazila) => void;
  language?: 'en' | 'bn';
  className?: string;
  placeholder?: string;
}

export default function UpazilaSelect({
  district,
  value,
  onChange,
  language = 'en',
  className = '',
  placeholder = 'Select Upazila',
}: UpazilaSelectProps) {
  const upazilas = district ? getUpazilas(district.id) : [];

  return (
    <select
      value={value?.id || ''}
      onChange={(e) => {
        const upazila = upazilas.find((u) => u.id === e.target.value);
        onChange?.(upazila);
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
  );
}