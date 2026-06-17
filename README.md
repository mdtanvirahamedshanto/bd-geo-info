# bd-geo-info

[![npm version](https://img.shields.io/npm/v/bd-geo-info.svg)](https://www.npmjs.com/package/bd-geo-info)
![typescript](https://img.shields.io/badge/TypeScript-Ready-blue)

A comprehensive Bangladesh geographical data package — divisions, districts, upazilas, unions, and postcodes. The **core utilities are 100% framework-agnostic**, working in any JS/TS environment. React components are available as an optional subpath import.

## 🚀 Key Features

- 🗺️ Complete geographical data of Bangladesh
- ⚡ Framework-agnostic core — works with Vue, Angular, Svelte, NestJS, Next.js, plain Node.js, or any JS/TS project
- ⚛️ Optional React components via `bd-geo-info/react`
- 🔄 Hierarchical data (Division → District → Upazila → Union)
- 🌐 Bilingual support (English / বাংলা)
- 📮 Postcode lookup
- 📱 Full TypeScript support with separate types for core and React
- 🎯 Zero required dependencies — React is optional

## ⚡ Performance & Bundle Size

- **O(1) hash-map lookups** — upazilas indexed by district ID, unions by upazila ID
- **Dynamic imports** — large datasets are code-split and loaded on demand
- **Build-time JSON minification** — ~300 KB savings on network payload

## 📦 Installation

```bash
npm install bd-geo-info
# or
yarn add bd-geo-info
# or
pnpm add bd-geo-info
```

React components require React as a peer dependency:

```bash
npm install bd-geo-info react react-dom
```

---

## Usage by Framework

### Vanilla JS / TypeScript / Node.js / NestJS

```typescript
import { getDivisions, getDistricts, getUpazilas, getUnions, getPostCode } from 'bd-geo-info';

// Get all divisions
const divisions = await getDivisions('en');

// Get districts for a division
const districts = await getDistricts('3', 'en');

// Get upazilas for a district
const upazilas = await getUpazilas('20', 'en');

// Get unions for an upazila
const unions = await getUnions('100', 'en');

// Postcode lookup (synchronous)
const postcodes = getPostCode({ division: '3', district: '20', upazila: 'Mirpur' });
```

NestJS service example:

```typescript
import { Injectable } from '@nestjs/common';
import { getDivisions, getDistricts, getUpazilas } from 'bd-geo-info';

@Injectable()
export class GeoService {
  getDivisions(lang: 'en' | 'bn' = 'en') {
    return getDivisions(lang);
  }

  getDistricts(divisionId: string, lang: 'en' | 'bn' = 'en') {
    return getDistricts(divisionId, lang);
  }

  getUpazilas(districtId: string, lang: 'en' | 'bn' = 'en') {
    return getUpazilas(districtId, lang);
  }
}
```

---

### Vue 3 (Composition API)

```vue
<script setup lang="ts">
import { ref, watch } from 'vue';
import { getDivisions, getDistricts, getUpazilas, getUnions } from 'bd-geo-info';
import type { Division } from 'bd-geo-info';

const divisions = ref<{ value: string; label: string }[]>([]);
const districts = ref<{ value: string; label: string }[]>([]);
const selectedDivision = ref('');
const selectedDistrict = ref('');

// Load divisions on mount
getDivisions('en').then(data => { divisions.value = data; });

// Reactively load districts when division changes
watch(selectedDivision, async (divId) => {
  selectedDistrict.value = '';
  districts.value = divId ? await getDistricts(divId, 'en') : [];
});
</script>

<template>
  <select v-model="selectedDivision">
    <option value="">Select Division</option>
    <option v-for="d in divisions" :key="d.value" :value="d.value">
      {{ d.label }}
    </option>
  </select>

  <select v-model="selectedDistrict" :disabled="!selectedDivision">
    <option value="">Select District</option>
    <option v-for="d in districts" :key="d.value" :value="d.value">
      {{ d.label }}
    </option>
  </select>
</template>
```

---

### Angular

```typescript
// geo.service.ts
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { getDivisions, getDistricts, getUpazilas, getUnions } from 'bd-geo-info';

@Injectable({ providedIn: 'root' })
export class GeoService {
  getDivisions(lang: 'en' | 'bn' = 'en') {
    return from(getDivisions(lang));
  }
  getDistricts(divisionId: string, lang: 'en' | 'bn' = 'en') {
    return from(getDistricts(divisionId, lang));
  }
  getUpazilas(districtId: string, lang: 'en' | 'bn' = 'en') {
    return from(getUpazilas(districtId, lang));
  }
  getUnions(upazilaId: string, lang: 'en' | 'bn' = 'en') {
    return from(getUnions(upazilaId, lang));
  }
}
```

```typescript
// address.component.ts
import { Component, OnInit } from '@angular/core';
import { GeoService } from './geo.service';

@Component({
  selector: 'app-address',
  template: `
    <select (change)="onDivisionChange($event)">
      <option value="">Select Division</option>
      <option *ngFor="let d of divisions" [value]="d.value">{{ d.label }}</option>
    </select>

    <select [disabled]="!districts.length">
      <option value="">Select District</option>
      <option *ngFor="let d of districts" [value]="d.value">{{ d.label }}</option>
    </select>
  `
})
export class AddressComponent implements OnInit {
  divisions: { value: string; label: string }[] = [];
  districts: { value: string; label: string }[] = [];

  constructor(private geo: GeoService) {}

  ngOnInit() {
    this.geo.getDivisions('en').subscribe(data => this.divisions = data);
  }

  onDivisionChange(event: Event) {
    const id = (event.target as HTMLSelectElement).value;
    this.districts = [];
    if (id) {
      this.geo.getDistricts(id, 'en').subscribe(data => this.districts = data);
    }
  }
}
```

---

### Svelte

```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  import { getDivisions, getDistricts, getUpazilas } from 'bd-geo-info';

  let divisions: { value: string; label: string }[] = [];
  let districts: { value: string; label: string }[] = [];
  let selectedDivision = '';
  let selectedDistrict = '';

  onMount(async () => {
    divisions = await getDivisions('en');
  });

  async function handleDivisionChange() {
    selectedDistrict = '';
    districts = selectedDivision ? await getDistricts(selectedDivision, 'en') : [];
  }
</script>

<select bind:value={selectedDivision} on:change={handleDivisionChange}>
  <option value="">Select Division</option>
  {#each divisions as d}
    <option value={d.value}>{d.label}</option>
  {/each}
</select>

<select bind:value={selectedDistrict} disabled={!selectedDivision}>
  <option value="">Select District</option>
  {#each districts as d}
    <option value={d.value}>{d.label}</option>
  {/each}
</select>
```

---

### React

Import from `bd-geo-info/react` to get the pre-built components:

```tsx
import { AddressForm, DivisionSelect, DistrictSelect, UpazilaSelect, UnionSelect } from 'bd-geo-info/react';

// Complete address form
const MyForm = () => (
  <AddressForm
    language="en"
    onChange={(values) => console.log(values)}
    showPostCode
    showUnion
    validation={{
      division: { required: true },
      district: { required: true },
    }}
    theme={{
      colors: { primary: '#007bff', background: '#ffffff', border: '#ced4da' },
      borderRadius: '4px',
    }}
  />
);
```

Individual components:

```tsx
import { useState } from 'react';
import { DivisionSelect, DistrictSelect, UpazilaSelect, UnionSelect } from 'bd-geo-info/react';
import type { Division, District, Upazila, UnionData } from 'bd-geo-info/react';

const LocationSelector = () => {
  const [division, setDivision] = useState<Division>();
  const [district, setDistrict] = useState<District>();
  const [upazila, setUpazila] = useState<Upazila>();

  return (
    <div>
      <DivisionSelect language="en" onChange={setDivision} placeholder="Select Division" />
      <DistrictSelect division={division} onChange={setDistrict} placeholder="Select District" />
      <UpazilaSelect district={district} onChange={setUpazila} placeholder="Select Upazila" />
      <UnionSelect upazila={upazila} onChange={(u) => console.log(u)} language="bn" />
    </div>
  );
};
```

You can also use the raw utilities directly in React (useful for custom UI libraries):

```tsx
import { getDivisions, getDistricts } from 'bd-geo-info';
```

---

### Next.js

Works with both App Router and Pages Router. Use the core utilities server-side:

```typescript
// app/api/districts/route.ts
import { getDistricts } from 'bd-geo-info';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const divisionId = searchParams.get('divisionId') ?? '';
  const districts = await getDistricts(divisionId, 'en');
  return Response.json(districts);
}
```

For client components, use `bd-geo-info/react`:

```tsx
'use client';
import { DivisionSelect } from 'bd-geo-info/react';
```

---

## Core API Reference

All functions are exported from `bd-geo-info` (no React required).

```typescript
import {
  getDivisions,   // (lang?) => Promise<{ value, label }[]>
  getDistricts,   // (divisionId, lang?) => Promise<{ value, label }[]>
  getUpazilas,    // (districtId, lang?) => Promise<{ value, label }[]>
  getUnions,      // (upazilaId, lang?) => Promise<{ value, label }[]>
  getPostCodes,   // (districtId, upazila?) => Promise<PostCode[]>
  getPostCode,    // ({ division?, district?, upazila? }) => PostCode[]  (sync)
  formatAddress,  // (div, dist, upa, union, post, street, lang?) => Promise<string>
  validatePostCode, // (postCode: string) => boolean
} from 'bd-geo-info';
```

## Types

Core types (no React dependency):

```typescript
import type {
  Division, District, Upazila, UnionData, Union,
  PostCode, AddressFormData, AddressFormValidation,
  ValidationRules, Theme
} from 'bd-geo-info';
```

React-specific types:

```typescript
import type {
  AddressFormProps, AddressFormErrors, AddressFormLabels,
  SelectProps, PostOfficeSelectProps
} from 'bd-geo-info/react';
```

---

## 🤝 Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## 📄 License

MIT — see [LICENSE](LICENSE).

## 📫 Contact

- Email: [mdtanvirahamedshanto@gmail.com](mailto:mdtanvirahamedshanto@gmail.com)
- GitHub: [mdtanvirahamedshanto](https://github.com/mdtanvirahamedshanto)
- LinkedIn: [mdtanvirahamedshanto](https://linkedin.com/in/mdtanvirahamedshanto/)

---

Made with ❤️ by [Md Tanvir Ahamed Shanto](https://github.com/mdtanvirahamedshanto)
