# bd-geo-info

A comprehensive Bangladesh geographical data package with hierarchical selection and address form components. This package provides both backend utilities and frontend React components for handling Bangladesh's administrative divisions, districts, upazilas, unions, and postal codes.

## Features

- Complete geographical data of Bangladesh
- Bilingual support (English and Bangla)
- React components for address forms
- Utility functions for data retrieval
- TypeScript support
- Postal code lookup
- Cascading dropdowns
- Zero dependencies (except React)

## Installation

```bash
npm install bd-geo-info
# or
yarn add bd-geo-info
```

## Usage

### Using the Address Form Component

```jsx
import { AddressForm } from 'bd-geo-info';

function App() {
  const handleAddressChange = (address) => {
    console.log('Selected address:', address);
  };

  return (
    <AddressForm
      language="en" // or 'bn' for Bangla
      onChange={handleAddressChange}
      className="custom-form-class"
    />
  );
}
```

### Using Individual Components

```jsx
import {
  DivisionSelect,
  DistrictSelect,
  UpazilaSelect,
  UnionSelect
} from 'bd-geo-info';

function CustomAddressForm() {
  const [division, setDivision] = useState(null);
  const [district, setDistrict] = useState(null);

  return (
    <div>
      <DivisionSelect
        value={division}
        onChange={setDivision}
        language="en"
      />
      <DistrictSelect
        division={division}
        value={district}
        onChange={setDistrict}
        language="en"
      />
    </div>
  );
}
```

### Using Utility Functions

```javascript
import {
  getDistricts,
  getUpazilas,
  getUnions,
  getPostCode
} from 'bd-geo-info';

// Get districts of a division
const districts = getDistricts('3');

// Get upazilas of a district
const upazilas = getUpazilas('10');

// Get unions of an upazila
const unions = getUnions('100');

// Get post code information
const postcodes = getPostCode({
  division: 'Dhaka',
  district: 'Dhaka',
  upazila: 'Gulshan'
});
```

## API Reference

### Components

#### `<AddressForm />`

| Prop | Type | Description |
|------|------|-------------|
| language | 'en' \| 'bn' | Language for labels and placeholders |
| onChange | (address: AddressData) => void | Callback when address changes |
| className | string | Custom CSS class |
| children | ReactNode | Additional form elements |

#### `<DivisionSelect />`, `<DistrictSelect />`, `<UpazilaSelect />`, `<UnionSelect />`

| Prop | Type | Description |
|------|------|-------------|
| value | Division \| District \| Upazila \| Union | Selected value |
| onChange | (value: T) => void | Change handler |
| language | 'en' \| 'bn' | Display language |
| placeholder | string | Placeholder text |

### Utility Functions

#### `getDistricts(divisionId: string): District[]`
Returns an array of districts for the given division ID.

#### `getUpazilas(districtId: string): Upazila[]`
Returns an array of upazilas for the given district ID.

#### `getUnions(upazilaId: string): Union[]`
Returns an array of unions for the given upazila ID.

#### `getPostCode(params: { division?: string; district?: string; upazila?: string }): PostCode[]`
Returns an array of matching post codes based on the provided parameters.

## Types

```typescript
interface Division {
  id: string;
  name: string;
  bn_name: string;
}

interface District {
  id: string;
  division_id: string;
  name: string;
  bn_name: string;
  lat?: string;
  lon?: string;
  url?: string;
}

interface Upazila {
  id: string;
  district_id: string;
  name: string;
  bn_name: string;
  url?: string;
}

interface Union {
  id: string;
  upazilla_id: string;
  name: string;
  bn_name: string;
  url?: string;
}

interface PostCode {
  id: string;
  postCode: string;
  upazila: string;
  district: string;
  division: string;
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.