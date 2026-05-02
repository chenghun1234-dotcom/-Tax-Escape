/**
 * Simple Validator for Tax Escape Data
 * Run with: node validator.js
 */

const { TAX_GUIDE_STRUCTURE, TAX_DATA_CONTENT } = require('./data.js');

function validate() {
    console.log("🔍 Checking Tax Escape Data Structure...");
    
    // Check IDs
    const contentIds = TAX_DATA_CONTENT.map(item => item.id);
    let missingIds = [];

    Object.values(TAX_GUIDE_STRUCTURE.tax_guide).forEach(category => {
        category.items.forEach(item => {
            if (!contentIds.includes(item.id)) {
                missingIds.push(item.id);
            }
        });
    });

    if (missingIds.length > 0) {
        console.error("❌ Error: Some IDs in structure are missing in content:", missingIds);
    } else {
        console.log("✅ Success: All structure IDs have matching content!");
    }

    console.log(`📊 Statistics: ${TAX_DATA_CONTENT.length} guide items loaded.`);
}

validate();
