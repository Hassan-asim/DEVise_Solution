# Automatic Sitemap Generation System

This project includes an automated sitemap generation system that creates an XML sitemap for your website, automatically including all static pages and blog posts.

## 🎯 Features

- **Automatic sitemap generation** during build process
- **Dynamic blog post detection** from the `blog/` directory
- **Manual generation** with npm scripts
- **File watching** for development (automatically regenerates when blog posts change)
- **SEO optimized** with proper priorities and change frequencies

## 📁 Generated Output

The sitemap is automatically generated at: `public/sitemap.xml`

## 🚀 Usage

### Automatic Generation (Recommended)

The sitemap is automatically generated when you build the project:

```bash
npm run build
```

This will:
1. Generate the sitemap
2. Build the project with Vite
3. Include the sitemap in the `public/` directory

### Manual Generation

Generate the sitemap manually at any time:

```bash
npm run generate-sitemap
```

### Development Mode with File Watching

For development, you can run a watcher that automatically regenerates the sitemap when blog posts are added or modified:

```bash
npm run watch-sitemap
```

This will:
- Generate an initial sitemap
- Watch the `blog/` directory for changes
- Automatically regenerate the sitemap when `.md` files are added/modified/deleted

## 🗺️ Sitemap Structure

The generated sitemap includes:

### Static Pages (Priority: 0.8-1.0)
- `/` (Homepage - Priority: 1.0, Weekly updates)
- `/services`, `/about`, `/founders`, `/projects`, `/contact`, `/payments`, `/blogs` (Priority: 0.8, Monthly updates)

### Blog Posts (Priority: 0.7)
- All `.md` files from the `blog/` directory
- Dynamic URLs: `/#/blog/{slug}`
- Uses actual file modification dates
- Monthly change frequency

## ⚙️ Configuration

### Update Your Domain

Edit `scripts/generate-sitemap.js` and update the `SITE_URL` constant:

```javascript
const SITE_URL = 'https://your-actual-domain.com';
```

### Modify Routes

To add or remove static routes, edit the `staticRoutes` array in `scripts/generate-sitemap.js`:

```javascript
const staticRoutes = [
  '/',
  '/services',
  '/about',
  // Add your new routes here
];
```

### Customize Priorities and Frequencies

You can modify the SEO settings in the `generateSitemap()` function:

```javascript
// For static pages
const priority = route === '/' ? '1.0' : '0.8';
const changefreq = route === '/' ? 'weekly' : 'monthly';

// For blog posts
xml += '    <changefreq>monthly</changefreq>\n';
xml += '    <priority>0.7</priority>\n';
```

## 📂 File Structure

```
scripts/
├── generate-sitemap.js    # Main sitemap generation logic
├── build-sitemap.js       # Build integration script
└── watch-sitemap.js       # Development watcher script

public/
└── sitemap.xml           # Generated sitemap (auto-created)
```

## 🔧 How It Works

1. **Route Discovery**: Scans predefined static routes from your React Router configuration
2. **Blog Detection**: Reads all `.md` files from the `blog/` directory
3. **XML Generation**: Creates a properly formatted XML sitemap with:
   - URLs with hash routing support (`#/route`)
   - Last modification dates (actual file dates for blog posts)
   - SEO-optimized priorities and change frequencies
4. **File Output**: Saves the sitemap to `public/sitemap.xml`

## 🌐 SEO Benefits

- **Search Engine Discovery**: Helps search engines find all your pages
- **Indexing Priority**: Tells search engines which pages are most important
- **Update Frequency**: Indicates how often pages change
- **Last Modified**: Shows when content was last updated

## 🔍 Verification

After generation, you can:

1. **View the sitemap**: Check `public/sitemap.xml`
2. **Validate**: Use online XML sitemap validators
3. **Submit to Search Engines**: Add to Google Search Console, Bing Webmaster Tools

## ⚠️ Important Notes

- The system uses hash routing (`#/route`) to match your React Router setup
- Blog posts are automatically detected from `.md` files
- The sitemap is regenerated on every build to ensure it's always up-to-date
- Remember to update the `SITE_URL` to your actual domain before deploying

## 🚀 Deployment

The sitemap will automatically be included in your build output and served at:
`https://your-domain.com/sitemap.xml`

Make sure to submit this URL to search engines for optimal SEO.
