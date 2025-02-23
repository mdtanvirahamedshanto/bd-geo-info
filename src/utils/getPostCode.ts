import { PostCode } from '../types';
import postcodes from '../data/bd-postcodes.json';

export default function getPostCode(params: {
  division?: string;
  district?: string;
  upazila?: string;
} | null = null): PostCode[] {
  if (!params) {
    return [];
  }

  try {
    return postcodes.data
      .filter((postcode: PostCode) => {
        if (params.division && postcode.division_id.toLowerCase() !== params.division.toLowerCase()) return false;
        if (params.district && postcode.district_id.toLowerCase() !== params.district.toLowerCase()) return false;
        if (params.upazila && postcode.upazila.toLowerCase() !== params.upazila.toLowerCase()) return false;
        return true;
      })
      .sort((a, b) => a.postCode.localeCompare(b.postCode));
  } catch (error) {
    console.error('Error fetching postcodes:', error);
    return [];
  }
}