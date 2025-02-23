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
    return (postcodes.postcodes as PostCode[])
      .filter((postcode) => {
        const postcodeData = postcode as {
          division_id: string;
          district_id: string;
          district?: string;
          upazila: string;
          postOffice: string;
          postCode: string;
        };

        if (params.division && postcodeData.division_id.toLowerCase() !== params.division.toLowerCase()) return false;
        if (params.district && (postcodeData.district_id?.toLowerCase() !== params.district.toLowerCase() && postcodeData.district?.toLowerCase() !== params.district.toLowerCase())) return false;
        if (params.upazila && postcodeData.upazila.toLowerCase() !== params.upazila.toLowerCase()) return false;
        return true;
      })
      .sort((a, b) => a.postCode.localeCompare(b.postCode));
  } catch (error) {
    console.error('Error fetching postcodes:', error);
    return [];
  }
}