import React, { useState, useEffect } from 'react';
import { Upazila, Village } from '../types';
import getVillages from '../utils/getVillages';

interface VillageSelectProps {
  upazila?: Upazila;
  value?: Village;
  onChange?: (village: Village) => void;
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

export default function VillageSelect({
  upazila,
  value,
  onChange,
  language = 'en',
  className = '',
  placeholder = 'Select Village/Mouza',
  customLabel,
  customError,
  theme,
  errorClassName = '',
  labelClassName = '',
  containerClassName = '',
  showLabels = true,
}: VillageSelectProps) {
  const [villages, setVillages] = useState<Village[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadVillages = async () => {
      if (upazila?.id) {
        setLoading(true);
        try {
          const villageData = await getVillages(upazila.id);
          setVillages(villageData);
        } catch (err) {
          console.error('Failed to load villages', err);
          setVillages([]);
        } finally {
          setLoading(false);
        }
      } else {
        setVillages([]);
      }
    };
    loadVillages();
  }, [upazila]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const village = villages.find((v) => v.id === e.target.value);
    if (village) {
      onChange?.(village);
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
          disabled={loading || !villages.length}
          style={{
            minHeight: '2.75rem',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
          }}
        >
          <option value="" className="text-gray-500">
            {loading 
              ? (language === 'bn' ? 'লোড হচ্ছে...' : 'Loading...')
              : (placeholder || (language === 'bn' ? 'গ্রাম/মৌজা নির্বাচন করুন' : 'Select Village/Mouza'))
            }
          </option>
          {villages.map((village) => (
            <option 
              key={village.id} 
              value={village.id}
              className="py-2 text-gray-900"
            >
              {village.name} {village.jl ? `(J.L. ${village.jl})` : ''} {village.survey ? `[${village.survey}]` : ''}
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
