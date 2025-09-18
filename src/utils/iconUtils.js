export const generateSVGString = (svgData, size = 24, color = 'currentColor', strokeWidth = 2) => {
  if (!svgData || svgData.length === 0) {
    console.error("generateSVGString: No SVG data provided. Returning placeholder.");
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="10" fill="red">No SVG Data</text>
    </svg>`;
  }

  // Construct the full SVG string by wrapping the svgData with the necessary SVG tag and attributes
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">
    ${svgData}
  </svg>`;
};

export const generateReactEmbed = (pascalName) => {
  // Now importing Feather icons directly from feather-icons-react
  return `import { ${pascalName} as Feather${pascalName} } from 'feather-icons-react';

<Feather${pascalName} size={24} />`;
};

export const generateCDNLink = (iconId, size = 24, color = 'currentColor', strokeWidth = 2) => {
  // Feather icons have a CDN, but for simplicity and consistency with the project's current structure,
  // we'll provide a generic placeholder or suggest direct SVG embedding.
  // If you were to use a Feather CDN, it might look like:
  // return `https://cdn.jsdelivr.net/npm/feather-icons/dist/icons/${iconId}.svg`;
  return `<!-- For Feather icons, you can link to a CDN if available, or embed SVG directly. -->
<!-- Example (hypothetical Feather CDN): -->
<!-- <img src="https://cdn.jsdelivr.net/npm/feather-icons/dist/icons/${iconId}.svg" alt="${iconId}" width="${size}" height="${size}" style="color: ${color}; stroke-width: ${strokeWidth}px;" /> -->
<!-- For now, consider direct SVG or React component usage. -->`;
};

export const downloadIcon = (iconId, iconName, format = 'svg', size = 24, svgData) => {
  let content, mimeType, filename;

  if (format === 'svg') {
    content = generateSVGString(svgData, size); // Use the correctly generated SVG string
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

export const copyToClipboard = async (text) => {
  console.log('copyToClipboard called with text:', text);

  // Attempt to use the modern Clipboard API first
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      console.log('Copied to clipboard successfully using Clipboard API!');
      return; // Success, exit early
    } catch (err) {
      console.error('Failed to copy using Clipboard API:', err);
      // Fallback to execCommand if modern API fails (e.g., NotAllowedError)
    }
  } else {
    console.warn('Clipboard API not available. Falling back to document.execCommand.');
  }

  // Fallback using document.execCommand
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed'; // Prevent scrolling to bottom of page in iOS.
    textarea.style.opacity = '0'; // Hide the textarea
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    console.log('Copied to clipboard successfully using document.execCommand!');
  } catch (err) {
    console.error('Failed to copy using document.execCommand:', err);
    alert('Failed to copy to clipboard. Your browser might be blocking clipboard access. Please try manually copying the code.');
    throw err; // Re-throw to propagate the error
  }
};