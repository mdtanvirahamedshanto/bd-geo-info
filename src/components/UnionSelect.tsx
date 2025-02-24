import React, { useState, useEffect } from 'react';
import { Upazila, UnionData } from '../types';
import { getUnions } from '../utils';

interface UnionSelectProps {
  upazila?: Upazila;
  value?: UnionData;
  onChange?: (union: UnionData) => void;
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

export default function UnionSelect({
  upazila,
  value,
  onChange,
  language = 'en',
  className = '',
  placeholder = 'Select Union',
  customLabel,
  customError,
  theme,
  errorClassName = '',
  labelClassName = '',
  containerClassName = '',
  showLabels = true,
}: UnionSelectProps) {
  const [unions, setUnions] = useState<UnionData[]>([]);

  useEffect(() => {
    const loadUnions = async () => {
      if (upazila) {
        const unionData = await getUnions(upazila.id);
        setUnions(unionData.map(union => ({
          id: union.value,
          upazilla_id: upazila?.id || '',
          name: union.label,
          bn_name: union.label,
          url: ''
        })));
      } else {
        setUnions([]);
      }
    };
    loadUnions();
  }, [upazila]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const union = unions.find((u) => u.id === e.target.value);
    if (union) {
      onChange?.(union);
    }
  };

  return (
    <div className={`${containerClassName} relative flex flex-col gap-2`}
      style={{
        width: '100%',
        transition: 'all 0.3s ease-in-out'
      }}>
      {showLabels && customLabel && (
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
          onChange={handleChange}
          className={`${className} w-full px-4 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-500 transition-all duration-300 ease-in-out appearance-none cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed`}
          disabled={!unions.length}
          style={{
            minHeight: '2.75rem',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
            backgroundPosition: 'right 0.5rem center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '1.5em 1.5em'
          }}
        >
          <option value="" className="text-gray-500">
            {placeholder || (language === 'bn' ? 'ইউনিয়ন নির্বাচন করুন' : 'Select Union')}
          </option>
          {unions.map((union) => (
            <option 
              key={union.id} 
              value={union.id}
              className="py-2 text-gray-900"
            >
              {language === 'bn' ? union.bn_name : union.name}
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