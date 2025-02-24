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
    <div className={`${containerClassName} relative flex flex-col gap-2`}
      style={{
        width: '100%',
        transition: 'all 0.3s ease-in-out'
      }}>
      {customLabel && (
        <label 
          className={`${labelClassName} text-sm font-medium text-gray-700 mb-1`}
          style={{
            display: 'block',
            transition: 'color 0.3s ease'
          }}
        >
          {customLabel}
        </label>
      )}
      <div className="relative w-full">
        <select
          value={value?.id || ''}
          onChange={(e) => {
            const district = districts.find((d) => d.id === e.target.value);
            if (district) {
              onChange?.(district);
            }
          }}
          className={`${className} w-full px-4 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-500 transition-all duration-300 ease-in-out appearance-none cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed`}
          disabled={disabled || !districts.length}
          style={{
            minHeight: '2.75rem',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
          }}
        >
          <option value="" className="text-gray-500">{placeholder}</option>
          {districts.map((district) => (
            <option 
              key={district.id} 
              value={district.id}
              className="py-2 text-gray-900"
            >
              {language === 'bn' ? district.bn_name : district.name}
            </option>
          ))}
        </select>
      </div>
      {customError && (
        <div 
          className={`${errorClassName} text-sm text-red-600 mt-1`}
          style={{
            animation: 'fadeIn 0.3s ease-in-out'
          }}
        >
          {customError}
        </div>
      )}
    </div>
  );
}