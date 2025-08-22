import { generateSitemap } from './generate-sitemap.js';

// This script is called during the build process to automatically generate sitemap
console.log('🔨 Running automatic sitemap generation during build...');

try {
  generateSitemap();
  console.log('🎉 Sitemap generation completed successfully during build!');
} catch (error) {
  console.error('❌ Error generating sitemap during build:', error);
  process.exit(1);
}
