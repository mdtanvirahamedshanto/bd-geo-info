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
- 🔍 Error handling and data validation
- 🎯 Zero dependencies

## Installation

```bash
npm install bd-geo-info
# or
yarn add bd-geo-info
# or
pnpm add bd-geo-info
```

## Quick Start

### Basic Usage with AddressForm

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

### Individual Components Usage

```tsx
import {
  DivisionSelect,
  DistrictSelect,
  UpazilaSelect,
  UnionSelect
} from 'bd-geo-info';

function CustomForm() {
  const [division, setDivision] = useState<Division>();
  const [district, setDistrict] = useState<District>();
  const [upazila, setUpazila] = useState<Upazila>();
  const [union, setUnion] = useState<UnionData>();

  return (
    <div>
      <DivisionSelect
        value={division}
        onChange={setDivision}
        language="bn"
        theme={{
          primaryColor: '#4CAF50',
          borderRadius: '8px'
        }}
      />
      <DistrictSelect
        division={division?.id}
        value={district}
        onChange={setDistrict}
        language="bn"
      />
      <UpazilaSelect
        district={district?.id}
        value={upazila}
        onChange={setUpazila}
        language="bn"
      />
      <UnionSelect
        upazila={upazila?.id}
        value={union}
        onChange={setUnion}
        language="bn"
      />
    </div>
  );
}
```

## Common Use Cases

### 1. Custom Styled Form

```tsx
import { AddressForm } from 'bd-geo-info';

function StyledAddressForm() {
  return (
    <AddressForm
      theme={{
        primaryColor: '#2196F3',
        borderRadius: '4px',
        fontSize: '16px',
        padding: '12px',
        borderColor: '#E0E0E0'
      }}
      containerClassName="custom-form"
      labelClassName="custom-label"
      errorClassName="custom-error"
      inputContainerClassName="custom-input-container"
    />
  );
}
```

### 2. Form with Validation

```tsx
import { AddressForm } from 'bd-geo-info';

function ValidatedForm() {
  return (
    <AddressForm
      validation={{
        division: { required: true },
        district: { required: true },
        upazila: { required: true },
        union: { required: false },
        postCode: { required: true }
      }}
      customErrors={{
        division: 'Please select a division',
        district: 'Please select a district',
        upazila: 'Please select an upazila',
        postCode: 'Please enter a valid postcode'
      }}
    />
  );
}
```

### 3. Bilingual Form with Custom Labels

```tsx
import { AddressForm } from 'bd-geo-info';

function BilingualForm() {
  return (
    <AddressForm
      language="bn"
      customLabels={{
        division: 'বিভাগ নির্বাচন করুন',
        district: 'জেলা নির্বাচন করুন',
        upazila: 'উপজেলা নির্বাচন করুন',
        union: 'ইউনিয়ন নির্বাচন করুন',
        postCode: 'পোস্ট কোড'
      }}
    />
  );
}
```

### 4. Using Utility Functions

```typescript
import {
  getDistricts,
  getUpazilas,
  getUnions,
  getPostCode
} from 'bd-geo-info';

// Get districts for a division
const districts = getDistricts(divisionId);

// Get upazilas for a district
const upazilas = getUpazilas(districtId);

// Get unions for an upazila
const unions = getUnions(upazilaId);

// Get postcodes with flexible filtering
const postcodes = getPostCode({
  division: divisionId,
  district: districtId,
  upazila: upazilaId
});
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
| containerClassName | string | '' | CSS class for the form container |
| labelClassName | string | '' | CSS class for labels |
| errorClassName | string | '' | CSS class for error messages |
| inputContainerClassName | string | '' | CSS class for input containers |

### Theme Customization

```typescript
interface Theme {
  primaryColor?: string;
  borderRadius?: string;
  fontSize?: string;
  padding?: string;
  borderColor?: string;
  errorColor?: string;
  backgroundColor?: string;
  textColor?: string;
  placeholderColor?: string;
}
```

## Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on how to submit pull requests, report issues, and contribute to the project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support 💖

If you find this package helpful, please consider giving it a star on GitHub! For issues and feature requests, please use the [GitHub Issues](https://github.com/mdtanvirahamedshanto/bd-geo-info/issues) page.

## Acknowledgments
- Thanks to the contributors and maintainers for their valuable work.

## Contact
- Email: [EMAIL](mailto:mdtanvirahamedshanto@gmail.com)
- GitHub: [GitHub Profile](https://github.com/mdtanvirahamedshanto)
- LinkedIn: [LinkedIn Profile](https://linkedin.com/in/mdtanvirahamedshanto/)
- Protfolio: [Portfolio](https://mdtanvirahamedshanto.vercel.app/)
---
Made with ❤️ by [Md Tanvir Ahamed Shanto](https://mdtanvirahamedshanto.vercel.app/) for the Bangla community