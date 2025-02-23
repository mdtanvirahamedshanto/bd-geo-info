import React, { useEffect, useState } from 'react';
import { District, Division } from '../types/index';
import { loadDistricts } from '../utils/dataLoader';

interface DistrictSelectProps {
  division?: Division;
  value?: District;
  onChange?: (district: District) => void;
  language?: 'en' | 'bn';
  className?: string;
  placeholder?: string;
  customLabel?: string | React.ReactNode;
  customError?: string | React.ReactNode;
  theme?: any;
  errorClassName?: string;
  labelClassName?: string;
  containerClassName?: string;
  showLabels?: boolean;
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
  showLabels = true,
}: DistrictSelectProps) {
  const [districts, setDistricts] = useState<any[]>([]);

  useEffect(() => {
    if (division) {
      loadDistricts(division.id).then(setDistricts);
    }
  }, [division]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const district = districts.find((d) => d.value === e.target.value);
    if (district) {
      const districtData: District = {
        id: district.value,
        division_id: division?.id || '',
        name: district.label,
        bn_name: district.label,
        lat: '',
        lon: '',
        url: ''
      };
      onChange?.(districtData);
    }
  };

  return (
    <div className={containerClassName}>
      {showLabels && (
        <label className={labelClassName}>
          {customLabel || (language === 'bn' ? 'জেলা:' : 'District:')}
        </label>
      )}
      <select
        value={value?.id || ''}
        onChange={handleChange}
        className={className}
        disabled={!districts.length}
      >
        <option value="">
          {placeholder || (language === 'bn' ? 'জেলা নির্বাচন করুন' : 'Select District')}
        </option>
        {districts.map((district) => (
          <option key={district.value} value={district.value}>
            {district.label}
          </option>
        ))}
      </select>
      {customError && <div className={errorClassName}>{customError}</div>}
    </div>
  );
}