
const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../src/data');

// 1. Optimize unions.json
const unionsPath = path.join(dataDir, 'unions.json');
if (fs.existsSync(unionsPath)) {
  console.log('Optimizing unions.json...');
  const unionsRaw = JSON.parse(fs.readFileSync(unionsPath, 'utf8'));
  
  // Find the table data
  const unionsTable = unionsRaw.find(item => item.type === 'table' && item.name === 'unions');
  if (unionsTable && unionsTable.data) {
    const grouped = {};
    unionsTable.data.forEach(union => {
      const upazilaId = union.upazilla_id;
      if (!grouped[upazilaId]) {
        grouped[upazilaId] = [];
      }
      grouped[upazilaId].push(union);
    });
    
    // Write optimized JSON back
    fs.writeFileSync(unionsPath, JSON.stringify(grouped), 'utf8');
    console.log(`Successfully optimized unions.json. Grouped by upazila ID.`);
  } else {
    console.error('Could not find unions table data in unions.json');
  }
} else {
  console.error('unions.json not found!');
}

// 2. Optimize bd-upazilas.json
const upazilasPath = path.join(dataDir, 'bd-upazilas.json');
if (fs.existsSync(upazilasPath)) {
  console.log('Optimizing bd-upazilas.json...');
  const upazilasRaw = JSON.parse(fs.readFileSync(upazilasPath, 'utf8'));
  
  if (upazilasRaw.upazilas) {
    const grouped = {};
    upazilasRaw.upazilas.forEach(upazila => {
      const districtId = upazila.district_id;
      if (!grouped[districtId]) {
        grouped[districtId] = [];
      }
      grouped[districtId].push(upazila);
    });
    
    // Write optimized JSON back
    fs.writeFileSync(upazilasPath, JSON.stringify(grouped), 'utf8');
    console.log(`Successfully optimized bd-upazilas.json. Grouped by district ID.`);
  } else {
    console.error('Could not find upazilas array in bd-upazilas.json');
  }
} else {
  console.error('bd-upazilas.json not found!');
}
