import { readFileSync, writeFileSync } from 'fs';
import { Resvg } from '@resvg/resvg-js';

// Convert SVG to PNG
function convertSvgToPng(svgPath, pngPath) {
  try {
    const svg = readFileSync(svgPath, 'utf-8');
    const resvg = new Resvg(svg, {
      fitTo: {
        mode: 'original',
      },
      font: {
        loadSystemFonts: false,
      },
    });

    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();

    writeFileSync(pngPath, pngBuffer);
    console.log(`✓ Generated: ${pngPath}`);
  } catch (error) {
    console.error(`✗ Error converting ${svgPath}:`, error.message);
  }
}

// Generate all PNGs
console.log('Generating PNG images from SVGs...\n');

convertSvgToPng('public/icon.svg', 'public/icon.png');
convertSvgToPng('public/og-image.svg', 'public/og-image.png');
convertSvgToPng('public/splash.svg', 'public/splash.png');

console.log('\n✓ All PNG images generated successfully!');
