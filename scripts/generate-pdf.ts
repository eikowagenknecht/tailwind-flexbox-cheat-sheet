import type { Server } from "node:http";
import express, { type Express } from "express";
import puppeteer, { type Browser, type Page, type PDFOptions } from "puppeteer";

// Configuration interfaces
interface ServerConfig {
  port: number;
  staticDir: string;
}

interface ViewportConfig {
  width: number;
  height: number;
  deviceScaleFactor: number;
}

interface PDFGenerationConfig {
  outputPath: string;
  pageFormat: "A4" | "Letter" | "Legal";
  orientation: "portrait" | "landscape";
  margin: {
    top: string;
    right: string;
    bottom: string;
    left: string;
  };
}

class PDFGenerator {
  private server: Server | null = null;
  private browser: Browser | null = null;
  private readonly config: ServerConfig;
  private readonly viewport: ViewportConfig;
  private readonly pdfConfig: PDFGenerationConfig;

  constructor() {
    // Server configuration
    this.config = {
      port: 3000,
      staticDir: "dist",
    };

    // Viewport configuration (A4 landscape at 96 DPI)
    this.viewport = {
      width: 1123,
      height: 794,
      deviceScaleFactor: 2,
    };

    // PDF generation configuration
    this.pdfConfig = {
      outputPath: "generated/tailwind-flexbox-cheatsheet.pdf",
      pageFormat: "A4",
      orientation: "landscape",
      margin: {
        top: "15px",
        right: "15px",
        bottom: "15px",
        left: "15px",
      },
    };
  }

  private createServer(): Express {
    const app = express();
    app.use(express.static(this.config.staticDir));
    return app;
  }

  private async setupServer(): Promise<void> {
    return new Promise((resolve) => {
      const app = this.createServer();
      this.server = app.listen(this.config.port, () => {
        console.log(
          `Server running on http://localhost:${this.config.port.toFixed(0)}`,
        );
        resolve();
      });
    });
  }

  private async setupBrowser(): Promise<void> {
    this.browser = await puppeteer.launch({
      headless: true,
    });
  }

  private async configurePage(page: Page): Promise<void> {
    await page.setViewport(this.viewport);
  }

  private getPDFOptions(): PDFOptions {
    return {
      path: this.pdfConfig.outputPath,
      format: this.pdfConfig.pageFormat,
      landscape: this.pdfConfig.orientation === "landscape",
      printBackground: true,
      margin: this.pdfConfig.margin,
      scale: 0.7,
    };
  }

  private async cleanup(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
    }
    if (this.server) {
      await new Promise<void>((resolve) => {
        this.server?.close(() => {
          resolve();
        });
      });
    }
  }

  public async generate(): Promise<void> {
    try {
      // Setup
      await this.setupServer();
      await this.setupBrowser();

      if (!this.browser) {
        throw new Error("Browser failed to initialize");
      }

      // Create and configure page
      const page = await this.browser.newPage();
      await this.configurePage(page);

      // Navigate and wait for content
      await page.goto(`http://localhost:${this.config.port.toFixed(0)}`, {
        waitUntil: "networkidle0",
      });

      // Generate PDF
      await page.pdf(this.getPDFOptions());

      console.log("PDF generated successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      throw error;
    } finally {
      await this.cleanup();
    }
  }
}

// Execute PDF generation
const generator = new PDFGenerator();
generator.generate().catch((error: unknown) => {
  console.error("Failed to generate PDF:", error);
  process.exit(1);
});
