import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateSitemap } from './generate-sitemap.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogDir = path.join(__dirname, '../blog');

console.log('👀 Watching for changes in blog directory...');
console.log(`📁 Monitoring: ${blogDir}`);

// Generate initial sitemap
generateSitemap();

// Watch for changes in the blog directory
if (fs.existsSync(blogDir)) {
  fs.watch(blogDir, { recursive: true }, (eventType, filename) => {
    if (filename && filename.endsWith('.md')) {
      console.log(`📝 Blog file ${eventType}: ${filename}`);
      console.log('🔄 Regenerating sitemap...');
      
      // Add a small delay to ensure file operations are complete
      setTimeout(() => {
        try {
          generateSitemap();
        } catch (error) {
          console.error('❌ Error regenerating sitemap:', error);
        }
      }, 500);
    }
  });
  
  console.log('✅ Watcher started. Press Ctrl+C to stop.');
} else {
  console.log('⚠️  Blog directory not found. Creating initial sitemap only.');
}
