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
        disabled={disabled}
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