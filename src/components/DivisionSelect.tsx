import React from 'react';
import { Division } from '../types';
import { divisions } from '../data/bd-divisions.json';

interface DivisionSelectProps {
  value?: Division;
  onChange?: (division: Division) => void;
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

export default function DivisionSelect({
  value,
  onChange,
  language = 'en',
  className = '',
  placeholder = 'Select Division',
  customLabel,
  customError,
  theme,
  errorClassName = '',
  labelClassName = '',
  containerClassName = '',
}: DivisionSelectProps) {
  const divisionData: Division[] = divisions || [];

  return (
    <div className={containerClassName}>
      {customLabel && <label className={labelClassName}>{customLabel}</label>}
      <select
        value={value?.id || ''}
        onChange={(e) => {
          const division = divisionData.find((d) => d.id === e.target.value);
          if (division) {
            onChange?.(division);
          }
        }}
        className={className}
      >
        <option value="">{placeholder}</option>
        {divisionData.map((division) => (
          <option key={division.id} value={division.id}>
            {language === 'bn' ? division.bn_name : division.name}
          </option>
        ))}
      </select>
      {customError && <div className={errorClassName}>{customError}</div>}
    </div>
  );
}