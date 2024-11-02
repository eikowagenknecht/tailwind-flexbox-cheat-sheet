# Tailwind Flexbox Cheat Sheet

A dynamic, interactive Flexbox cheat sheet built with React and Tailwind CSS, with automatic PDF generation capabilities.
See my [blog post](https://eikowagenknecht.de/posts/tailwind-flexbox-cheat-sheet/) for more information and a live demo.

## Features

- 🎨 Live, interactive examples of all major Flexbox properties
- 📄 Automatic A4 landscape PDF generation for offline reference
- 🎯 Organized into logical sections for quick reference
- 🔧 Built with React and Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm (or npm/yarn if you prefer)

### Installation

Clone the repository:

```bash
git clone https://github.com/eikowagenknecht/tailwind-flexbox-cheatsheet.git
cd tailwind-flexbox-cheatsheet
```

Install dependencies:

```bash
pnpm install
```

### Development

Run the development server:

```bash
pnpm dev
```

The sheet will be available at `http://localhost:5173`

### Building

To build the project and generate the PDF:

```bash
pnpm build
```

This command will:

1. Build the React application
2. Generate a PDF version of the cheat sheet
3. Output the PDF to `generated/tailwind-flexbox-cheatsheet.pdf`

## PDF Generation

The PDF generation is handled by a custom TypeScript script using Puppeteer.
It:

- Spins up a local server to serve the built React app
- Captures the page in a headless browser
- Generates a high-quality PDF with proper formatting

### Configuration

PDF generation can be customized in the `PDFGenerator` class:

- Page format (A4/Letter/Legal)
- Orientation (portrait/landscape)
- Margins
- Scale
- Output path

It's a bit hacked together, but you will find the configuration options in the `PDFGenerator` class.

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production and generate PDF
- `pnpm lint` - Lint and format code
- `pnpm pdfgen` - Generate PDF only

## License

This project is licensed under the MIT License - see the LICENSE file for details.
