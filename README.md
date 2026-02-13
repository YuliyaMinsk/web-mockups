# Web Mockups

A catalog of web design mockups and templates built with pure HTML and CSS. Each mockup is a standalone project that can be viewed, customized, and used as a starting point for your designs.

## 🌐 Live Demo

View the catalog at: `https://<username>.github.io/web-mockups/`

## 📁 Project Structure

```
web-mockups/
├── index.html              # Main catalog page
├── styles/
│   └── catalog.css         # Styles for the catalog page
├── shared/
│   └── css/
│       └── common.css      # Common utilities for mockups
├── mockups/
│   └── example-template/   # Starter template
│       ├── index.html
│       ├── css/
│       │   └── style.css
│       └── assets/
│           └── .gitkeep
├── .gitignore
└── README.md
```

## 🚀 How to Add a New Mockup

1. **Copy the template folder**
   ```bash
   cp -r mockups/example-template/ mockups/your-mockup-name/
   ```

2. **Edit the mockup files**
   - Update `mockups/your-mockup-name/index.html` with your content
   - Customize styles in `mockups/your-mockup-name/css/style.css`
   - Add any images or resources to `mockups/your-mockup-name/assets/`

3. **Add a card to the catalog**
   - Open `index.html` in the root directory
   - Add a new card in the `.catalog` section with your mockup details:
     - Title
     - Description
     - Date
     - Link to `mockups/your-mockup-name/index.html`

4. **Commit and push**
   ```bash
   git add .
   git commit -m "Add new mockup: your-mockup-name"
   git push
   ```

## 📦 Deploy to GitHub Pages

1. Go to your repository settings on GitHub
2. Navigate to **Pages** section
3. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **Save**
5. Your site will be published at `https://<username>.github.io/web-mockups/`

## 🎨 Features

- Pure HTML/CSS - no frameworks or external dependencies
- Dark theme catalog with modern design
- Responsive grid layout
- Hover effects and smooth transitions
- Shared utilities for consistent styling across mockups
- Easy-to-use template for quick mockup creation

## 📝 Notes

- All mockups are standalone - no build process required
- Common CSS utilities are optional - include them as needed
- Keep mockups self-contained in their respective folders
- Use semantic HTML5 elements
- Follow consistent naming conventions

## 🤝 Contributing

Feel free to add your own mockups to this collection! Follow the structure and guidelines above to maintain consistency.
