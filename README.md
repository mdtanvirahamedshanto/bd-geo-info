# bd-geo-info
[![npm version](https://img.shields.io/npm/v/bd-geo-info.svg)](https://www.npmjs.com/package/bd-geo-info)
![npm](https://img.shields.io/npm/v/bd-geo-info)
![typescript](https://img.shields.io/badge/TypeScript-Ready-blue)

A comprehensive Bangladesh geographical data package with hierarchical selection and address form components for React applications. This package provides ready-to-use components for handling Bangladesh's administrative divisions, districts, upazilas, unions, and postcodes with bilingual support (English/Bangla).

## Features

- 🗺️ Complete geographical data of Bangladesh
- 🔄 Hierarchical selection components
- 📝 Ready-to-use address form component
- 🌐 Bilingual support (English/বাংলা)
- 📮 Integrated postcode lookup
- 🎨 Customizable styling
- ✅ Form validation support
- 📱 TypeScript support

## Installation

```bash
npm install bd-geo-info
# or
yarn add bd-geo-info
```

## Usage

### Basic Usage

```tsx
import { AddressForm } from 'bd-geo-info';

function App() {
  const handleAddressChange = (addressData) => {
    console.log('Address Data:', addressData);
  };

  return (
    <AddressForm
      language="en"
      onChange={handleAddressChange}
      showPostCode={true}
      showLabels={true}
    />
  );
}
```

### Individual Components

```tsx
import {
  DivisionSelect,
  DistrictSelect,
  UpazilaSelect,
  UnionSelect
} from 'bd-geo-info';

function CustomForm() {
  const [division, setDivision] = useState();
  const [district, setDistrict] = useState();
  const [upazila, setUpazila] = useState();
  const [union, setUnion] = useState();

  return (
    <div>
      <DivisionSelect
        value={division}
        onChange={setDivision}
        language="bn"
      />
      <DistrictSelect
        division={division}
        value={district}
        onChange={setDistrict}
        language="bn"
      />
      <UpazilaSelect
        district={district}
        value={upazila}
        onChange={setUpazila}
        language="bn"
      />
      <UnionSelect
        upazila={upazila}
        value={union}
        onChange={setUnion}
        language="bn"
      />
    </div>
  );
}
```

### Utility Functions

```typescript
import {
  getDivisions,
  getDistricts,
  getUpazilas,
  getUnions,
  getPostCodes,
  formatAddress
} from 'bd-geo-info';

// Get divisions list
const divisions = getDivisions('en');

// Get districts for a division
const districts = getDistricts(divisionId, 'en');

// Get upazilas for a district
const upazilas = getUpazilas(districtId, 'en');

// Get unions for an upazila
const unions = getUnions(upazilaId, 'en');

// Get postcodes
const postcodes = getPostCodes(districtId, upazilaId);

// Format address
const formattedAddress = formatAddress(
  division,
  district,
  upazila,
  union,
  postCode,
  street,
  'en'
);
```

## API Reference

### AddressForm

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| language | 'en' \| 'bn' | 'en' | Language for labels and values |
| onChange | (data: AddressFormData) => void | - | Callback when form data changes |
| className | string | '' | CSS class for form container |
| theme | Theme | - | Custom theme object |
| validation | AddressFormValidation | - | Validation rules |
| showPostCode | boolean | true | Show/hide postcode field |
| showLabels | boolean | true | Show/hide field labels |
| customLabels | AddressFormLabels | - | Custom label text |
| customErrors | AddressFormErrors | - | Custom error messages |

### Select Components (Division/District/Upazila/Union)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | T | - | Selected value |
| onChange | (value: T) => void | - | Change handler |
| language | 'en' \| 'bn' | 'en' | Display language |
| className | string | '' | CSS class name |
| placeholder | string | 'Select...' | Placeholder text |
| customLabel | string \| ReactNode | - | Custom label |
| customError | string \| ReactNode | - | Custom error message |
| theme | Theme | - | Custom theme object |

## Types

```typescript
interface AddressFormData {
  division?: string;
  district?: string;
  upazila?: string;
  union?: string;
  postCode?: string;
  street?: string;
}

interface Theme {
  primaryColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: string;
  // ... other theme properties
}

interface ValidationRules {
  required?: boolean;
  customValidation?: (value: any) => boolean | string;
}
```

## Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on how to submit pull requests, report issues, and contribute to the project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## Support 💖

If you find this package helpful, please consider giving it a star on GitHub! For issues and feature requests, please use the GitHub issue tracker.

---

Made with ❤️ by [Md Tanvir Ahamed Shanto](https://mdtanvirahamedshanto.vercel.app/) for the Bangla community