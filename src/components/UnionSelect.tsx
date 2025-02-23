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
          upazila_id: upazila.id,
          name: union.label,
          bn_name: union.label,
          url: ''
        } as UnionData)));
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
    <div className={containerClassName}>
      {showLabels && (
        <label className={labelClassName}>
          {customLabel || (language === 'bn' ? 'ইউনিয়ন:' : 'Union:')}
        </label>
      )}
      <select
        value={value?.id || ''}
        onChange={handleChange}
        className={className}
        disabled={!unions.length}
      >
        <option value="">
          {placeholder || (language === 'bn' ? 'ইউনিয়ন নির্বাচন করুন' : 'Select Union')}
        </option>
        {unions.map((union) => (
          <option key={union.id} value={union.id}>
            {language === 'bn' ? union.bn_name : union.name}
          </option>
        ))}
      </select>
      {customError && <div className={errorClassName}>{customError}</div>}
    </div>
  );
}