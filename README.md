# bd-geo-info

[![npm version](https://img.shields.io/npm/v/bd-geo-info.svg)](https://www.npmjs.com/package/bd-geo-info)
![typescript](https://img.shields.io/badge/TypeScript-Ready-blue)

A comprehensive React component library for handling Bangladesh's geographical data, providing hierarchical selection components and a complete address form solution. Built with TypeScript and zero dependencies, it offers bilingual support (English/Bangla) for divisions, districts, upazilas, unions, and postcodes.

## 🚀 Key Features

- 🗺️ Complete geographical data of Bangladesh
- 🔄 Hierarchical selection components (Division → District → Upazila → Union)
- 📝 Ready-to-use address form component with validation
- 🌐 Bilingual support (English/বাংলা)
- 📮 Integrated postcode lookup system
- 🎨 Highly customizable styling with theme support
- ✅ Built-in form validation
- 📱 Full TypeScript support
- 🔍 Comprehensive error handling
- 🎯 Zero dependencies

## 📦 Installation

```bash
npm install bd-geo-info
# or
yarn add bd-geo-info
# or
pnpm add bd-geo-info
```

## 🎯 Quick Start

### Complete Address Form

```tsx
import { AddressForm } from 'bd-geo-info';

const MyForm = () => {
  return (
    <AddressForm
      language="en"
      onChange={(values) => console.log(values)}
      theme={{
        colors: {
          primary: '#007bff',
          background: '#ffffff',
          border: '#ced4da'
        },
        borderRadius: '4px',
        fontSize: {
          input: '1rem'
        }
      }}
      validation={{
        division: { required: true },
        district: { required: true }
      }}
    />
  );
};
```

### Individual Components

```tsx
import { 
  DivisionSelect, 
  DistrictSelect, 
  UpazilaSelect, 
  UnionSelect 
} from 'bd-geo-info';

const LocationSelector = () => {
  const [division, setDivision] = useState();
  const [district, setDistrict] = useState();

  return (
    <div>
      <DivisionSelect
        language="en"
        onChange={(div) => setDivision(div)}
        placeholder="Select Division"
      />
      <DistrictSelect
        division={division}
        onChange={(dist) => setDistrict(dist)}
        placeholder="Select District"
      />
      <UpazilaSelect
        district={district}
        onChange={(upazila) => console.log(upazila)}
        placeholder="Select Upazila"
      />
    </div>
  );
};
```

### Utility Functions

```typescript
import { 
  getDistricts, 
  getUpazilas, 
  getUnions, 
  getPostCode 
} from 'bd-geo-info';

// Get districts for a division
const districts = getDistricts('3'); // Returns districts in Dhaka division

// Get upazilas for a district
const upazilas = getUpazilas('26'); // Returns upazilas in Dhaka district

// Get unions for an upazila
const unions = getUnions('123'); // Returns unions in specific upazila

// Get post code for an area
const postCodes = getPostCode({
  division: '3',
  district: '26',
  upazila: '123'
});
```

## 🎨 Theme Customization

```typescript
interface Theme {
  colors?: {
    primary?: string;    // Primary color for interactive elements
    background?: string; // Background color
    border?: string;     // Border color
  };
  borderRadius?: string;  // Border radius for components
  fontSize?: {
    input?: string;      // Font size for inputs
    label?: string;      // Font size for labels
  };
  spacing?: {
    input?: string;      // Padding for inputs
    label?: string;      // Margin for labels
  };
}
```

## 📋 Component Props

### AddressForm

```typescript
interface AddressFormProps {
  language?: 'en' | 'bn';           // Display language
  onChange?: (data: AddressFormData) => void; // Form data change handler
  theme?: Theme;                    // Custom theme
  validation?: AddressFormValidation; // Validation rules
  showPostCode?: boolean;           // Show/hide post code
  showLabels?: boolean;             // Show/hide labels
  customLabels?: Record<string, string>; // Custom label text
  customErrors?: Record<string, string>; // Custom error messages
  className?: string;               // Container class
}
```

### Select Components

```typescript
interface SelectProps {
  language?: 'en' | 'bn';
  onChange: (value: T) => void;
  value?: T;
  placeholder?: string;
  customLabel?: string;
  customError?: string;
  theme?: Theme;
  className?: string;
}
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details on how to submit pull requests, report issues, and contribute to the project.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💪 Support

If you find this package helpful, please consider giving it a star on GitHub! For issues and feature requests, please use the [GitHub Issues](https://github.com/mdtanvirahamedshanto/bd-geo-info/issues) page.

## 📫 Contact

- Email: [mdtanvirahamedshanto@gmail.com](mailto:mdtanvirahamedshanto@gmail.com)
- GitHub: [GitHub Profile](https://github.com/mdtanvirahamedshanto)
- LinkedIn: [LinkedIn Profile](https://linkedin.com/in/mdtanvirahamedshanto/)
- Portfolio: [Portfolio](https://mdtanvirahamedshanto.vercel.app/)

---

Made with ❤️ by [Md Tanvir Ahamed Shanto](https://mdtanvirahamedshanto.vercel.app/) for the Bangla community