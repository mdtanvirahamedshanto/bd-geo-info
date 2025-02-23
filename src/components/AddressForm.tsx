import React, { useState } from 'react';
import { AddressFormProps, AddressData } from '..';
import DivisionSelect from './DivisionSelect';
import DistrictSelect from './DistrictSelect';
import UpazilaSelect from './UpazilaSelect';
import UnionSelect from './UnionSelect';
import { getPostCode } from '..';

export default function AddressForm({
  language = 'en',
  onChange,
  className = '',
  children,
}: AddressFormProps) {
  const [address, setAddress] = useState<AddressData>({});

  const handleChange = (newData: Partial<AddressData>) => {
    const updatedAddress = { ...address, ...newData };

    // Reset dependent fields when parent field changes
    if ('division' in newData) {
      updatedAddress.district = undefined;
      updatedAddress.upazila = undefined;
      updatedAddress.union = undefined;
      updatedAddress.postCode = undefined;
    } else if ('district' in newData) {
      updatedAddress.upazila = undefined;
      updatedAddress.union = undefined;
      updatedAddress.postCode = undefined;
    } else if ('upazila' in newData) {
      updatedAddress.union = undefined;
      // Update postcode when upazila changes
      const postcodes = getPostCode({
        division: updatedAddress.division?.name,
        district: updatedAddress.district?.name,
        upazila: updatedAddress.upazila?.name,
      });
      updatedAddress.postCode = postcodes[0]?.postCode;
    }

    setAddress(updatedAddress);
    onChange?.(updatedAddress);
  };

  return (
    <div className={className}>
      <DivisionSelect
        value={address.division}
        onChange={(division) => handleChange({ division })}
        language={language}
        placeholder={language === 'bn' ? 'বিভাগ নির্বাচন করুন' : 'Select Division'}
      />
      <DistrictSelect
        division={address.division}
        value={address.district}
        onChange={(district) => handleChange({ district })}
        language={language}
        placeholder={language === 'bn' ? 'জেলা নির্বাচন করুন' : 'Select District'}
      />
      <UpazilaSelect
        district={address.district}
        value={address.upazila}
        onChange={(upazila) => handleChange({ upazila })}
        language={language}
        placeholder={language === 'bn' ? 'উপজেলা নির্বাচন করুন' : 'Select Upazila'}
      />
      <UnionSelect
        upazila={address.upazila}
        value={address.union}
        onChange={(union) => handleChange({ union })}
        language={language}
        placeholder={language === 'bn' ? 'ইউনিয়ন নির্বাচন করুন' : 'Select Union'}
      />
      {address.postCode && (
        <div>
          <label>{language === 'bn' ? 'পোস্ট কোড:' : 'Post Code:'}</label>
          <span>{address.postCode}</span>
        </div>
      )}
      {children}
    </div>
  );
}