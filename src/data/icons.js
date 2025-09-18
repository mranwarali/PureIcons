import * as FeatherReactIcons from 'feather-icons-react'; // Import all Feather React components
import feather from 'feather-icons'; // Rely on Vite to pick up the ES module version from package.json

export const iconCategories = [];
export const iconData = [];

const processedCategories = new Set();
const categoryCounts = {};
const allIconsMap = new Map(); // Use a Map to ensure unique IDs

let featherAddedCount = 0;

// Get all icon names directly from feather.icons, which is the most reliable source
const featherIconNames = Object.keys(feather.icons);
console.log(`Found ${featherIconNames.length} raw Feather icon names from 'feather-icons'.`);

for (const iconId of featherIconNames) {
  // Convert kebab-case iconId (e.g., 'arrow-left') to PascalCase (e.g., 'ArrowLeft')
  const pascalName = iconId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
  
  // Try to find the corresponding React component from feather-icons-react
  const FeatherComponent = FeatherReactIcons[pascalName];

  // Get the raw SVG data using the original iconId
  const rawFeatherSvg = feather.icons[iconId] ? feather.icons[iconId].toSvg({ class: 'feather-icon' }) : null;

  // Extract inner SVG content (paths, circles, etc.) from the raw SVG string
  let featherSvgData = '';
  if (rawFeatherSvg) {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(rawFeatherSvg, 'image/svg+xml');
      const svgElement = doc.querySelector('svg');
      if (svgElement) {
        featherSvgData = svgElement.innerHTML;
      }
    } catch (e) {
      console.error(`Error parsing SVG for icon '${iconId}':`, e);
    }
  }

  if (FeatherComponent && featherSvgData) {
    // Generate a user-friendly name (e.g., "Arrow Left")
    const name = pascalName.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1 $2').replace(/^./, str => str.toUpperCase());
    
    const category = 'Feather'; // Default category for Feather icons
    const tags = [iconId, name.toLowerCase(), 'feather'];

    allIconsMap.set(iconId, {
      id: iconId,
      name: name,
      pascalName: pascalName, // Keep PascalCase for component import
      category: category,
      tags: tags,
      component: FeatherComponent,
      svgData: featherSvgData,
      source: 'feather'
    });
    featherAddedCount++;
  } else {
    // Log detailed reasons for skipping
    console.warn(`Feather Icons: Skipping icon '${iconId}'. Reason:`);
    if (!FeatherComponent) console.warn(`  - React component '${pascalName}' not found in 'feather-icons-react'.`);
    if (!feather.icons[iconId]) console.warn(`  - Raw Feather SVG data (feather.icons['${iconId}']) not found.`);
    if (feather.icons[iconId] && !rawFeatherSvg) console.warn(`  - toSvg() method failed for '${iconId}'.`);
    if (rawFeatherSvg && !featherSvgData) console.warn(`  - DOMParser failed to extract inner SVG for '${iconId}'.`);
  }
}
console.log(`Successfully loaded ${featherAddedCount} Feather icons into iconData.`);


// Convert map values to the final iconData array
iconData.push(...Array.from(allIconsMap.values()));

// Populate categories and counts
iconData.forEach(icon => {
  const iconCategory = icon.category;
  if (!processedCategories.has(iconCategory)) {
    processedCategories.add(iconCategory);
    iconCategories.push({ id: iconCategory.toLowerCase(), name: iconCategory, count: 0 });
  }
  categoryCounts[iconCategory] = (categoryCounts[iconCategory] || 0) + 1;
});

// Add 'All Icons' category first
iconCategories.unshift({ id: 'all', name: 'All Icons', count: iconData.length });

// Update counts for other categories
iconCategories.forEach(category => {
  if (category.id !== 'all') {
    category.count = categoryCounts[category.name] || 0;
  }
});

// Sort categories alphabetically, keeping 'All Icons' at the top
iconCategories.sort((a, b) => {
  if (a.id === 'all') return -1;
  if (b.id === 'all') return 1;
  return a.name.localeCompare(b.name);
});

console.log(`Finished processing icons. Total unique icons in iconData: ${iconData.length}.`);
console.log(`Found ${iconCategories.length} categories.`);