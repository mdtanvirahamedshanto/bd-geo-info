const fs = require('fs');
const path = require('path');

// Read the postcodes data
const postcodesData = require('../src/data/bd-postcodes.json');

// Create a directory for split files if it doesn't exist
const outputDir = path.join(__dirname, '../src/data/postcodes');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Group postcodes by division_id
const postcodesByDivision = postcodesData.postcodes.reduce((acc, postcode) => {
  const divisionId = postcode.division_id;
  if (!acc[divisionId]) {
    acc[divisionId] = [];
  }
  acc[divisionId].push(postcode);
  return acc;
}, {});

// Write each division's postcodes to a separate file
Object.entries(postcodesByDivision).forEach(([divisionId, postcodes]) => {
  const filePath = path.join(outputDir, `division-${divisionId}.json`);
  fs.writeFileSync(filePath, JSON.stringify({ postcodes }, null, 2));
  console.log(`Created ${filePath} with ${postcodes.length} postcodes`);
});

console.log('Postcode splitting complete!');