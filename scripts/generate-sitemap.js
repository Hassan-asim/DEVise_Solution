import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const SITE_URL = 'https://devise-solutions.com'; // Update this with your actual domain
const OUTPUT_PATH = path.join(__dirname, '../public/sitemap.xml');

// Static routes from your React Router configuration
const staticRoutes = [
  '/',
  '/services',
  '/about',
  '/founders',
  '/projects',
  '/contact',
  '/payments',
  '/blogs'
];

// Get all blog posts from the blog directory
function getBlogPosts() {
  const blogDir = path.join(__dirname, '../blog');
  
  if (!fs.existsSync(blogDir)) {
    console.log('Blog directory not found, skipping blog posts...');
    return [];
  }

  const files = fs.readdirSync(blogDir);
  const markdownFiles = files.filter(file => file.endsWith('.md'));
  
  return markdownFiles.map(file => {
    const slug = path.basename(file, '.md');
    const filePath = path.join(blogDir, file);
    const stats = fs.statSync(filePath);
    
    return {
      slug,
      lastModified: stats.mtime.toISOString()
    };
  });
}

// Generate XML sitemap
function generateSitemap() {
  console.log('🗺️  Generating sitemap...');
  
  const blogPosts = getBlogPosts();
  const currentDate = new Date().toISOString();
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  // Add static routes
  staticRoutes.forEach(route => {
    const priority = route === '/' ? '1.0' : '0.8';
    const changefreq = route === '/' ? 'weekly' : 'monthly';
    
    xml += '  <url>\n';
    xml += `    <loc>${SITE_URL}${route === '/' ? '' : '#' + route}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${changefreq}</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += '  </url>\n';
  });
  
  // Add blog posts
  blogPosts.forEach(post => {
    xml += '  <url>\n';
    xml += `    <loc>${SITE_URL}/#/blog/${post.slug}</loc>\n`;
    xml += `    <lastmod>${post.lastModified}</lastmod>\n`;
    xml += '    <changefreq>monthly</changefreq>\n';
    xml += '    <priority>0.7</priority>\n';
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  
  // Ensure public directory exists
  const publicDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  // Write sitemap to file
  fs.writeFileSync(OUTPUT_PATH, xml, 'utf8');
  
  console.log(`✅ Sitemap generated successfully!`);
  console.log(`📁 Location: ${OUTPUT_PATH}`);
  console.log(`📄 Static pages: ${staticRoutes.length}`);
  console.log(`📝 Blog posts: ${blogPosts.length}`);
  console.log(`🔗 Total URLs: ${staticRoutes.length + blogPosts.length}`);
}

// Run the sitemap generation if this file is executed directly
const isMainModule = process.argv[1] && process.argv[1].endsWith('generate-sitemap.js');
if (isMainModule) {
  try {
    generateSitemap();
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

export { generateSitemap };
