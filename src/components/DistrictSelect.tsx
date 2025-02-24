import React, { useEffect, useState } from 'react';
import { District, Division, SelectProps } from '../types/index';
import { getDistricts } from '../utils';

interface DistrictSelectProps extends SelectProps<District> {
  division?: Division;
  value?: District;
  onChange?: (district: District) => void;
}

export default function DistrictSelect({
  division,
  value,
  onChange,
  language = 'en',
  className = '',
  placeholder = 'Select District',
  customLabel,
  customError,
  theme,
  errorClassName = '',
  labelClassName = '',
  containerClassName = '',
  disabled = false
}: DistrictSelectProps) {
  const [districts, setDistricts] = useState<District[]>([]);

  useEffect(() => {
    const loadData = async () => {
      if (division) {
        const districtData = await getDistricts(division.id, language);
        setDistricts(districtData.map(d => ({
          id: d.value,
          division_id: division.id,
          name: d.label,
          bn_name: d.label,
          lat: '',
          long: '',
          url: ''
        })));
      } else {
        setDistricts([]);
      }
    };
    loadData();
  }, [division, language]);

  return (
    <div className={containerClassName}>
      {customLabel && <label className={labelClassName}>{customLabel}</label>}
      <select
        value={value?.id || ''}
        onChange={(e) => {
          const district = districts.find((d) => d.id === e.target.value);
          if (district) {
            onChange?.(district);
          }
        }}
        className={className}
        disabled={disabled || !districts.length}
      >
        <option value="">{placeholder}</option>
        {districts.map((district) => (
          <option key={district.id} value={district.id}>
            {language === 'bn' ? district.bn_name : district.name}
          </option>
        ))}
      </select>
      {customError && <div className={errorClassName}>{customError}</div>}
    </div>
  );
}