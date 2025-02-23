import React from 'react';
import { District, Division } from '..';
import { getDistricts } from '../utils';

interface DistrictSelectProps {
  division?: Division;
  value?: District;
  onChange?: (district: District) => void;
  language?: 'en' | 'bn';
  className?: string;
  placeholder?: string;
}

export default function DistrictSelect({
  division,
  value,
  onChange,
  language = 'en',
  className = '',
  placeholder = 'Select District',
}: DistrictSelectProps) {
  const districts = division ? getDistricts(division.id) : [];

  return (
    <select
      value={value?.id || ''}
      onChange={(e) => {
        const district = districts.find((d) => d.id === e.target.value);
        onChange?.(district);
      }}
      className={className}
      disabled={!division}
    >
      <option value="">{placeholder}</option>
      {districts.map((district) => (
        <option key={district.id} value={district.id}>
          {language === 'bn' ? district.bn_name : district.name}
        </option>
      ))}
    </select>
  );
}