import React, { useEffect, useState } from 'react';
import { Division, SelectProps } from '../types';
import divisions from '../data/bd-divisions.json';

interface DivisionSelectProps extends SelectProps<Division> {
  value?: Division;
  onChange?: (division: Division) => void;
}

export default function DivisionSelect({
  value,
  onChange,
  language = 'en',
  placeholder = 'Select Division',
  className = '',
  theme,
  customLabel,
  customError,
  errorClassName = '',
  labelClassName = '',
  containerClassName = '',
  disabled = false
}: DivisionSelectProps) {
  const [divisionData, setDivisionData] = useState<Division[]>([]);

  useEffect(() => {
    setDivisionData(divisions.divisions);
  }, []);

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
            const division = divisionData.find((d) => d.id === e.target.value);
            if (division) {
              onChange?.(division);
            }
          }}
          className={`${className} w-full px-4 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-500 transition-all duration-300 ease-in-out appearance-none cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed`}
          disabled={disabled}
          style={{
            minHeight: '2.75rem',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
            backgroundPosition: 'right 0.5rem center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '1.5em 1.5em'
          }}
        >
          <option value="" className="text-gray-500">{placeholder}</option>
          {divisionData.map((division) => (
            <option 
              key={division.id} 
              value={division.id}
              className="py-2 text-gray-900"
            >
              {language === 'bn' ? division.bn_name : division.name}
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