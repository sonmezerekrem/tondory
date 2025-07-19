#!/usr/bin/env node

// This script generates PWA icons from a source image
// You'll need to install sharp: npm install sharp
// Then run: node scripts/generate-icons.js

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const sourceImage = path.join(__dirname, '..', 'public', 'logo.png'); // Change this to your logo path
const outputDir = path.join(__dirname, '..', 'public', 'icons');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generateIcons() {
  if (!fs.existsSync(sourceImage)) {
    console.error(`Source image not found: ${sourceImage}`);
    console.log('Please add a logo.png file to the public directory and run this script again.');
    return;
  }

  try {
    for (const size of sizes) {
      await sharp(sourceImage)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png()
        .toFile(path.join(outputDir, `icon-${size}x${size}.png`));
      
      console.log(`Generated icon-${size}x${size}.png`);
    }

    // Generate favicon
    await sharp(sourceImage)
      .resize(32, 32)
      .png()
      .toFile(path.join(__dirname, '..', 'public', 'favicon-32x32.png'));

    await sharp(sourceImage)
      .resize(16, 16)
      .png()
      .toFile(path.join(__dirname, '..', 'public', 'favicon-16x16.png'));

    // Generate apple touch icon
    await sharp(sourceImage)
      .resize(180, 180)
      .png()
      .toFile(path.join(__dirname, '..', 'public', 'apple-touch-icon.png'));

    console.log('✅ All PWA icons generated successfully!');
    console.log('\nGenerated files:');
    console.log('- PWA icons: /public/icons/icon-*x*.png');
    console.log('- Favicons: /public/favicon-*.png');
    console.log('- Apple touch icon: /public/apple-touch-icon.png');
    
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generateIcons();