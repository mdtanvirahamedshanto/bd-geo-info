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
            const upazila = upazilas.find((u: Upazila) => u.id === e.target.value);
            if (upazila) {
              onChange?.(upazila);
            }
          }}
          className={`${className} w-full px-4 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-500 transition-all duration-300 ease-in-out appearance-none cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed`}
          disabled={!district}
          style={{
            minHeight: '2.75rem',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
          }}
        >
          <option value="" className="text-gray-500">{placeholder}</option>
          {upazilas.map((upazila: Upazila) => (
            <option 
              key={upazila.id} 
              value={upazila.id}
              className="py-2 text-gray-900"
            >
              {language === 'bn' ? upazila.bn_name : upazila.name}
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