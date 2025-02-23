import React from 'react';
import { Upazila, Union } from '..';
import unions from '../data/unions.json';

interface UnionSelectProps {
  upazila?: Upazila;
  value?: Union;
  onChange?: (union: Union) => void;
  language?: 'en' | 'bn';
  className?: string;
  placeholder?: string;
}

export default function UnionSelect({
  upazila,
  value,
  onChange,
  language = 'en',
  className = '',
  placeholder = 'Select Union',
}: UnionSelectProps) {
  const unionList = upazila
    ? unions.find((item: any) => item.type === 'table' && item.name === 'unions')?.data
        .filter((union: Union) => union.upazilla_id === upazila.id) || []
    : [];

  return (
    <select
      value={value?.id || ''}
      onChange={(e) => {
        const union = unionList.find((u) => u.id === e.target.value);
        onChange?.(union);
      }}
      className={className}
      disabled={!upazila}
    >
      <option value="">{placeholder}</option>
      {unionList.map((union) => (
        <option key={union.id} value={union.id}>
          {language === 'bn' ? union.bn_name : union.name}
        </option>
      ))}
    </select>
  );
}