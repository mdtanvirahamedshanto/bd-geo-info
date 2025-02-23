import React from 'react';
import { Division } from '..';
import { divisions } from '..';

interface DivisionSelectProps {
  value?: Division;
  onChange?: (division: Division) => void;
  language?: 'en' | 'bn';
  className?: string;
  placeholder?: string;
}

export default function DivisionSelect({
  value,
  onChange,
  language = 'en',
  className = '',
  placeholder = 'Select Division',
}: DivisionSelectProps) {
  const divisionData: Division[] = divisions || [];

  return (
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
  );
}