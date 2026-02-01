// Theme Management
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Load theme from localStorage
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// URL Shortener Logic
class URLShortener {
    constructor() {
        this.links = this.loadLinks();
        this.baseUrl = window.location.origin + window.location.pathname;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderLinks();
        this.handleRedirect();
    }

    setupEventListeners() {
        document.getElementById('shortenBtn').addEventListener('click', () => this.shortenURL());
        document.getElementById('longUrl').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.shortenURL();
        });
        document.getElementById('copyBtn').addEventListener('click', () => this.copyToClipboard());
        document.getElementById('qrBtn').addEventListener('click', () => this.generateQRCode());
        document.getElementById('clearAllBtn').addEventListener('click', () => this.clearAllLinks());
    }

    generateSlug(customSlug = '') {
        if (customSlug) {
            // Validate custom slug
            const slug = customSlug.trim().toLowerCase().replace(/[^a-z0-9-_]/g, '');
            if (this.links[slug]) {
                throw new Error('This custom slug is already taken!');
            }
            return slug;
        }

        // Generate random slug
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let slug;
        do {
            slug = '';
            for (let i = 0; i < 6; i++) {
                slug += chars.charAt(Math.floor(Math.random() * chars.length));
            }
        } while (this.links[slug]);
        
        return slug;
    }

    validateURL(url) {
        try {
            const urlObj = new URL(url);
            return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
        } catch {
            return false;
        }
    }

    shortenURL() {
        const longUrlInput = document.getElementById('longUrl');
        const customSlugInput = document.getElementById('customSlug');
        const errorMessage = document.getElementById('errorMessage');
        const longUrl = longUrlInput.value.trim();
        const customSlug = customSlugInput.value.trim();

        // Clear previous error
        errorMessage.classList.remove('show');
        errorMessage.textContent = '';

        if (!longUrl) {
            this.showError('Please enter a URL');
            return;
        }

        if (!this.validateURL(longUrl)) {
            this.showError('Please enter a valid URL (must start with http:// or https://)');
            return;
        }

        try {
            const slug = this.generateSlug(customSlug);
            const shortUrl = `${this.baseUrl}?s=${slug}`;
            
            this.links[slug] = {
                original: longUrl,
                short: shortUrl,
                slug: slug,
                clicks: 0,
                created: new Date().toISOString()
            };

            this.saveLinks();
            this.showResult(slug);
            this.renderLinks();

            // Clear inputs
            longUrlInput.value = '';
            customSlugInput.value = '';
            
            this.showToast('✨ URL shortened successfully!');
        } catch (error) {
            this.showError(error.message);
        }
    }

    showError(message) {
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.textContent = message;
        errorMessage.classList.add('show');
    }

    showResult(slug) {
        const resultSection = document.getElementById('resultSection');
        const shortenedUrlInput = document.getElementById('shortenedUrl');
        const clickCount = document.getElementById('clickCount');
        const createDate = document.getElementById('createDate');
        const qrCode = document.getElementById('qrCode');

        const link = this.links[slug];
        shortenedUrlInput.value = link.short;
        clickCount.textContent = link.clicks;
        createDate.textContent = new Date(link.created).toLocaleDateString();

        // Clear QR code
        qrCode.innerHTML = '';
        qrCode.classList.add('hidden');

        resultSection.classList.remove('hidden');
        resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    copyToClipboard() {
        const shortenedUrlInput = document.getElementById('shortenedUrl');
        shortenedUrlInput.select();
        document.execCommand('copy');
        this.showToast('📋 Copied to clipboard!');
    }

    generateQRCode() {
        const qrCodeDiv = document.getElementById('qrCode');
        const shortenedUrl = document.getElementById('shortenedUrl').value;

        qrCodeDiv.innerHTML = '';
        qrCodeDiv.classList.remove('hidden');

        new QRCode(qrCodeDiv, {
            text: shortenedUrl,
            width: 200,
            height: 200,
            colorDark: '#667eea',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        });

        this.showToast('📱 QR Code generated!');
    }

    renderLinks() {
        const linksList = document.getElementById('linksList');
        const links = Object.values(this.links).reverse();

        if (links.length === 0) {
            linksList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-link"></i>
                    <p>No shortened links yet. Create your first one above!</p>
                </div>
            `;
            return;
        }

        linksList.innerHTML = links.map(link => `
            <div class="link-item" data-slug="${link.slug}">
                <div class="link-info">
                    <div class="link-short">${link.short}</div>
                    <div class="link-original" title="${link.original}">${link.original}</div>
                    <div class="link-meta">
                        <span><i class="fas fa-mouse-pointer"></i> ${link.clicks} clicks</span>
                        <span><i class="fas fa-calendar"></i> ${new Date(link.created).toLocaleDateString()}</span>
                    </div>
                </div>
                <div class="link-actions">
                    <button onclick="urlShortener.visitLink('${link.slug}')" title="Visit URL">
                        <i class="fas fa-external-link-alt"></i>
                    </button>
                    <button onclick="urlShortener.copyLink('${link.slug}')" title="Copy">
                        <i class="fas fa-copy"></i>
                    </button>
                    <button class="delete-btn" onclick="urlShortener.deleteLink('${link.slug}')" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    visitLink(slug) {
        if (this.links[slug]) {
            this.links[slug].clicks++;
            this.saveLinks();
            this.renderLinks();
            window.open(this.links[slug].original, '_blank');
        }
    }

    copyLink(slug) {
        if (this.links[slug]) {
            const textarea = document.createElement('textarea');
            textarea.value = this.links[slug].short;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            this.showToast('📋 Link copied!');
        }
    }

    deleteLink(slug) {
        if (confirm('Are you sure you want to delete this link?')) {
            delete this.links[slug];
            this.saveLinks();
            this.renderLinks();
            this.showToast('🗑️ Link deleted');
        }
    }

    clearAllLinks() {
        if (confirm('Are you sure you want to delete all links? This cannot be undone.')) {
            this.links = {};
            this.saveLinks();
            this.renderLinks();
            document.getElementById('resultSection').classList.add('hidden');
            this.showToast('🗑️ All links cleared');
        }
    }

    handleRedirect() {
        const urlParams = new URLSearchParams(window.location.search);
        const slug = urlParams.get('s');

        if (slug && this.links[slug]) {
            this.links[slug].clicks++;
            this.saveLinks();
            window.location.replace(this.links[slug].original);
        }
    }

    showToast(message) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    loadLinks() {
        const stored = localStorage.getItem('shortenedLinks');
        return stored ? JSON.parse(stored) : {};
    }

    saveLinks() {
        localStorage.setItem('shortenedLinks', JSON.stringify(this.links));
    }
}

// Initialize the app
const urlShortener = new URLShortener();
