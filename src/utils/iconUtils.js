export const generateSVGString = (svgData, size = 24, color = 'currentColor', strokeWidth = 2) => {
  // Since we don't have access to Lucide core, we'll create a simple placeholder
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
  </svg>`;
};

export const generateReactEmbed = (pascalName) => {
  return `import { ${pascalName} } from 'lucide-react';\n\n<${pascalName} size={24} />`;
};

export const generateCDNLink = (iconId, format = 'svg') => {
  // Since we don't have access to Lucide core, we'll return a placeholder
  return `<!-- No direct CDN for individual Lucide SVGs. Consider embedding directly or using a React component. -->`;
};

export const downloadIcon = (iconId, iconName, format = 'svg', size = 24, svgData) => {
  let content, mimeType, filename;

  if (format === 'svg') {
    content = generateSVGString(svgData, size);
    mimeType = 'image/svg+xml';
    filename = `${iconId}.svg`;
  } else if (format === 'png') {
    alert('PNG download is not fully implemented yet. Please download as SVG.');
    return;
  }

  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = filename;
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
};

export const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(() => {
    console.log('Copied to clipboard');
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
};