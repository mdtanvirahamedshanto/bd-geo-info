const fs = require('fs');
const path = require('path');

// Read the districts data
const districtsData = require('../src/data/bd-districts.json');

// Create the districts directory if it doesn't exist
const districtsDir = path.join(__dirname, '../src/data/districts');
if (!fs.existsSync(districtsDir)) {
  fs.mkdirSync(districtsDir, { recursive: true });
}

// Group districts by division
const districtsByDivision = districtsData.districts.reduce((acc, district) => {
  const divisionId = district.division_id;
  if (!acc[divisionId]) {
    acc[divisionId] = [];
  }
  acc[divisionId].push(district);
  return acc;
}, {});

// Write separate files for each division's districts
Object.entries(districtsByDivision).forEach(([divisionId, districts]) => {
  const filePath = path.join(districtsDir, `division-${divisionId}.json`);
  fs.writeFileSync(filePath, JSON.stringify(districts, null, 2));
  console.log(`Created ${filePath}`);
});

console.log('District data splitting complete!');