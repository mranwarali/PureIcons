import * as LucideReactIcons from 'lucide-react';

export const iconCategories = [];
export const iconData = [];

const processedCategories = new Set();
const categoryCounts = {};

// Process LucideReactIcons to populate iconData and iconCategories
for (const iconKey in LucideReactIcons) {
  if (Object.prototype.hasOwnProperty.call(LucideReactIcons, iconKey)) {
    const pascalName = iconKey.charAt(0).toUpperCase() + iconKey.slice(1);
    const reactComponent = LucideReactIcons[pascalName];

    if (reactComponent) {
      const id = iconKey.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
      const name = iconKey.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1 $2').replace(/^./, str => str.toUpperCase());

      // Use a default category since we don't have access to Lucide's categories
      const categories = ['General'];

      iconData.push({
        id: id,
        name: name,
        pascalName: pascalName,
        category: categories[0],
        tags: [], // No tags available without Lucide core
        component: reactComponent,
        svgData: null // No SVG data available without Lucide core
      });

      // Populate categoryCounts and processedCategories for iconCategories
      categories.forEach(cat => {
        if (!processedCategories.has(cat)) {
          processedCategories.add(cat);
          iconCategories.push({ id: cat.toLowerCase(), name: cat, count: 0 });
        }
        categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
      });
    }
  }
}

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

console.log(`Loaded ${iconData.length} icons from Lucide.`);
console.log(`Found ${iconCategories.length} categories.`);