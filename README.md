# 🔗 QuickLink - URL Shortener

A beautiful, fast, and privacy-focused URL shortener that runs entirely in your browser. No backend required!

![QuickLink Screenshot](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

- **🚀 Instant Shortening** - Create short URLs in milliseconds
- **🎨 Beautiful UI** - Modern, responsive design with smooth animations
- **🌓 Dark Mode** - Easy on the eyes, day or night
- **📱 QR Code Generation** - Generate QR codes for your shortened URLs
- **📊 Analytics** - Track click counts for each link
- **🔒 Privacy First** - All data stored locally in your browser (localStorage)
- **✏️ Custom Slugs** - Create memorable short URLs with custom slugs
- **📋 One-Click Copy** - Copy shortened URLs to clipboard instantly
- **🎯 No Backend** - Static site, works entirely client-side
- **♻️ Link Management** - View, manage, and delete your shortened URLs

## 🚀 Live Demo

Visit the live demo: [Your GitHub Pages URL]

## 🛠️ How It Works

QuickLink is a client-side URL shortener that uses:
1. **LocalStorage** - Stores all URL mappings in your browser
2. **Query Parameters** - Uses `?s=slug` to redirect to original URLs
3. **QRCode.js** - Generates QR codes for sharing
4. **Font Awesome** - Beautiful icons throughout the UI

When you shorten a URL:
1. A unique slug is generated (or you can provide a custom one)
2. The mapping is stored in localStorage
3. Your short URL becomes: `https://yourdomain.com/?s=slug`
4. When someone visits the short URL, they're instantly redirected

## 📦 Installation

### Deploy to GitHub Pages

1. **Fork or clone this repository**
   ```bash
   git clone https://github.com/yourusername/url-shortener.git
   cd url-shortener
   ```

2. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/url-shortener.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "main" branch as source
   - Click Save
   - Your site will be live at `https://yourusername.github.io/url-shortener/`

### Local Development

Simply open `index.html` in your browser:

```bash
open index.html
```

Or use a local server:

```bash
# Python 3
python -m http.server 8000

# Node.js (with http-server)
npx http-server

# PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## 📖 Usage

### Shorten a URL

1. Enter your long URL in the input field
2. (Optional) Enter a custom slug for a memorable short URL
3. Click "Shorten URL"
4. Your shortened URL is ready!

### Features

- **Copy**: Click the copy button to copy the short URL
- **QR Code**: Generate a QR code for mobile sharing
- **Visit**: Click the external link icon to open the original URL
- **Delete**: Remove unwanted shortened URLs
- **Clear All**: Delete all saved links at once

### Custom Slugs

Want a memorable URL? Use custom slugs:
- Original: `https://example.com/very/long/url`
- Custom slug: `mylink`
- Result: `https://yourdomain.com/?s=mylink`

## 🎨 Customization

### Change Colors

Edit `style.css` and modify the CSS variables:

```css
:root {
    --primary-color: #667eea;
    --primary-dark: #5a67d8;
    --secondary-color: #764ba2;
    /* ... more colors */
}
```

### Change Domain Display

The shortened URLs use your GitHub Pages domain by default. To use a custom domain:

1. Add a `CNAME` file with your domain
2. Configure DNS settings as per [GitHub's custom domain guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

## 🔧 Technologies Used

- **HTML5** - Structure
- **CSS3** - Styling with CSS Variables and Animations
- **Vanilla JavaScript** - Logic (no frameworks!)
- **LocalStorage API** - Data persistence
- **QRCode.js** - QR code generation
- **Font Awesome** - Icons

## ⚠️ Limitations

Since this is a client-side solution:
- Links only work on the device/browser where they were created
- Sharing requires the recipient to have accessed your GitHub Pages site
- No centralized database (each user has their own links)
- Best used for personal link management

For a production URL shortener with centralized database and custom domains, consider:
- Using a backend (Node.js, Python, etc.)
- Storing links in a database (MongoDB, PostgreSQL)
- Deploying to a cloud platform (Vercel, Netlify, Heroku)

## 📝 License

MIT License - Feel free to use this project for personal or commercial purposes!

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 🐛 Issues

Found a bug? Have a suggestion? [Open an issue](https://github.com/yourusername/url-shortener/issues)

## 🌟 Show Your Support

Give a ⭐️ if you like this project!

## 📧 Contact

Created with ❤️ by [Your Name]

---

**Note**: This is a client-side demo project. For production use with shared links across users, you'll need a backend service to store and serve the URL mappings.
