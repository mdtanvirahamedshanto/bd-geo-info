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

## ⚡ Performance & Bundle Size Optimizations

To keep the package **super fast**, **lightweight**, and **low memory**, we implement the following optimizations:
- **$O(1)$ Hash Map Lookups**: Datasets are indexed by parent ID (e.g. upazilas by district ID, unions by upazila ID, villages by upazila ID). This allows instant, direct lookup instead of scanning/filtering thousands of objects.
- **Code Splitting & Dynamic Importing**: Large datasets (like villages and unions) are imported dynamically only when you invoke their query functions, preventing bundle bloat for basic search forms.
- **Build-Time Asset Minification**: All raw JSON data files are minified during the build step, stripping away formatting whitespaces to save ~300 KB of network payload size.

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
  const [upazila, setUpazila] = useState();

  return (
    <div>
      <DivisionSelect
        language="en"
        onChange={setDivision}
        placeholder="Select Division"
        customLabel="Division"
        customError={errors.division}
      />
      <DistrictSelect
        division={division}
        onChange={setDistrict}
        placeholder="Select District"
        customLabel="District"
        showLabels={true}
      />
      <UpazilaSelect
        district={district}
        onChange={setUpazila}
        placeholder="Select Upazila"
        className="custom-select-class"
      />
      <UnionSelect
        upazila={upazila}
        onChange={(union) => console.log(union)}
        language="bn"
        showLabels={true}
      />
    </div>
  );
};
```

### Utility Functions

To support dynamic code-splitting, some of the utilities are asynchronous. Use `await` or `.then()` to retrieve their results:

```typescript
import { 
  getDistricts, 
  getUpazilas, 
  getUnions, 
  getPostCode,
  getVillages
} from 'bd-geo-info';

// 1. Get districts for a division (asynchronous)
const districts = await getDistricts('1', 'en');

// 2. Get upazilas for a district (synchronous)
const upazilas = getUpazilas('1');

// 3. Get unions for an upazila (asynchronous)
const unions = await getUnions('1', 'en');

// 4. Get post code for an area (synchronous)
const postCodes = getPostCode({
  division: '6',
  district: '47',
  upazila: 'Dhaka'
});

// 5. Get villages for an upazila (asynchronous)
const villages = await getVillages('1');
```

## 🎨 Theme Customization

The library provides extensive theme customization options through a theme object:

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

// Example Usage
const theme = {
  colors: {
    primary: '#4f46e5',
    background: '#f9fafb',
    border: '#e5e7eb'
  },
  borderRadius: '0.5rem',
  fontSize: {
    input: '0.875rem',
    label: '0.75rem'
  },
  spacing: {
    input: '0.75rem 1rem',
    label: '0 0 0.5rem'
  }
};
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
  customLabels?: {
    division?: string | React.ReactNode;
    district?: string | React.ReactNode;
    upazila?: string | React.ReactNode;
    union?: string | React.ReactNode;
  };
  customErrors?: {
    division?: string | React.ReactNode;
    district?: string | React.ReactNode;
    upazila?: string | React.ReactNode;
    union?: string | React.ReactNode;
  };
  className?: string;               // Container class
  containerClassName?: string;      // Outer container class
  labelClassName?: string;          // Label class
  errorClassName?: string;          // Error message class
}
```

### Select Components (DivisionSelect, DistrictSelect, UpazilaSelect, UnionSelect)

```typescript
interface SelectProps {
  language?: 'en' | 'bn';          // Display language
  onChange?: (value: T) => void;    // Value change handler
  value?: T;                       // Selected value
  placeholder?: string;            // Placeholder text
  customLabel?: string | React.ReactNode;  // Custom label
  customError?: string | React.ReactNode;  // Error message
  theme?: Theme;                   // Custom theme
  className?: string;              // Select element class
  containerClassName?: string;     // Container class
  labelClassName?: string;         // Label class
  errorClassName?: string;         // Error message class
  showLabels?: boolean;           // Show/hide label
}
```

## 🔍 Validation

The library supports built-in validation with customizable rules:

```typescript
interface AddressFormValidation {
  division?: {
    required?: boolean;
    customValidation?: (value: any) => string | true;
  };
  district?: {
    required?: boolean;
    customValidation?: (value: any) => string | true;
  };
  upazila?: {
    required?: boolean;
    customValidation?: (value: any) => string | true;
  };
  union?: {
    required?: boolean;
    customValidation?: (value: any) => string | true;
  };
}

// Example Usage
const validation = {
  division: {
    required: true,
    customValidation: (value) => {
      if (value === 'restricted') return 'This division is restricted';
      return true;
    }
  },
  district: { required: true },
  upazila: { required: true }
};
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

Made with ❤️ by [Md Tanvir Ahamed Shanto](https://github.com/mdtanvirahamedshanto)