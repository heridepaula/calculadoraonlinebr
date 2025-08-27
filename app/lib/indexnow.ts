/**
 * IndexNow Implementation for CalculadoraOnlineBR
 * 
 * IndexNow is a protocol that allows website owners to notify search engines
 * about URL changes immediately, improving indexing speed and search visibility.
 * 
 * @see https://www.indexnow.org/documentation
 */

interface IndexNowSubmissionResponse {
  success: boolean;
  status: number;
  message: string;
  submittedUrls?: string[];
}

interface IndexNowBulkPayload {
  host: string;
  key: string;
  keyLocation?: string;
  urlList: string[];
}

class IndexNowService {
  private readonly key: string;
  private readonly host: string;
  private readonly keyLocation: string;
  
  // Supported search engines endpoints
  private readonly searchEngines = [
    'https://api.indexnow.org/indexnow',  // Main IndexNow endpoint
    'https://www.bing.com/indexnow',       // Microsoft Bing
    // Note: Google doesn't support IndexNow yet, but included for future compatibility
  ];

  constructor() {
    // Get from environment variables or use default
    this.key = process.env.INDEXNOW_KEY || 'd4b3a37c56c70c96d0fc36378e111d16a64e5e8f113a7d28aba467aef6d28cbb';
    this.host = process.env.INDEXNOW_HOST || 'calculadoraonlinebr.com.br';
    this.keyLocation = process.env.INDEXNOW_KEY_LOCATION || `https://${this.host}/${this.key}.txt`;
  }

  /**
   * Validates if the provided key meets IndexNow requirements
   */
  private validateKey(key: string): boolean {
    // Key must be 8-128 hexadecimal characters
    const hexPattern = /^[a-fA-F0-9]{8,128}$/;
    return hexPattern.test(key);
  }

  /**
   * Validates if URL belongs to the configured host
   */
  private validateUrl(url: string): boolean {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname === this.host || urlObj.hostname === `www.${this.host}`;
    } catch {
      return false;
    }
  }

  /**
   * Submits a single URL to IndexNow
   */
  async submitUrl(url: string): Promise<IndexNowSubmissionResponse> {
    if (!this.validateKey(this.key)) {
      return {
        success: false,
        status: 400,
        message: 'Invalid IndexNow key format'
      };
    }

    if (!this.validateUrl(url)) {
      return {
        success: false,
        status: 400,
        message: `URL does not belong to host ${this.host}`
      };
    }

    const results: IndexNowSubmissionResponse[] = [];
    
    // Submit to all supported search engines
    for (const endpoint of this.searchEngines) {
      try {
        const submitUrl = `${endpoint}?url=${encodeURIComponent(url)}&key=${this.key}`;
        
        const response = await fetch(submitUrl, {
          method: 'GET',
          headers: {
            'User-Agent': 'CalculadoraOnlineBR IndexNow Client/1.0'
          }
        });

        results.push({
          success: response.ok,
          status: response.status,
          message: response.ok ? 'URL submitted successfully' : `HTTP ${response.status}: ${response.statusText}`,
          submittedUrls: [url]
        });

      } catch (error) {
        results.push({
          success: false,
          status: 500,
          message: `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
      }
    }

    // Return the first successful result or the last failed one
    const successfulResult = results.find(r => r.success);
    return successfulResult || results[results.length - 1];
  }

  /**
   * Submits multiple URLs to IndexNow (bulk submission)
   * Maximum 10,000 URLs per request as per IndexNow documentation
   */
  async submitUrls(urls: string[]): Promise<IndexNowSubmissionResponse> {
    if (!this.validateKey(this.key)) {
      return {
        success: false,
        status: 400,
        message: 'Invalid IndexNow key format'
      };
    }

    // Validate all URLs
    const validUrls = urls.filter(url => this.validateUrl(url));
    
    if (validUrls.length === 0) {
      return {
        success: false,
        status: 400,
        message: 'No valid URLs provided'
      };
    }

    if (validUrls.length > 10000) {
      return {
        success: false,
        status: 400,
        message: 'Maximum 10,000 URLs allowed per request'
      };
    }

    const payload: IndexNowBulkPayload = {
      host: this.host,
      key: this.key,
      keyLocation: this.keyLocation,
      urlList: validUrls
    };

    const results: IndexNowSubmissionResponse[] = [];
    
    // Submit to all supported search engines
    for (const endpoint of this.searchEngines) {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'User-Agent': 'CalculadoraOnlineBR IndexNow Client/1.0'
          },
          body: JSON.stringify(payload)
        });

        results.push({
          success: response.ok,
          status: response.status,
          message: response.ok ? `${validUrls.length} URLs submitted successfully` : `HTTP ${response.status}: ${response.statusText}`,
          submittedUrls: validUrls
        });

      } catch (error) {
        results.push({
          success: false,
          status: 500,
          message: `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
      }
    }

    // Return the first successful result or the last failed one
    const successfulResult = results.find(r => r.success);
    return successfulResult || results[results.length - 1];
  }

  /**
   * Submits URLs for a specific calculator page
   */
  async submitCalculatorUrls(calculatorPath: string): Promise<IndexNowSubmissionResponse> {
    const baseUrl = `https://${this.host}`;
    const urls = [
      `${baseUrl}${calculatorPath}`,
      // Also submit the category index if it's a calculator page
      calculatorPath.includes('/calculadoras/') ? `${baseUrl}/calculadoras` : null,
      // Submit specific category index
      calculatorPath.match(/\/calculadoras\/([^/]+)\//) ? 
        `${baseUrl}/calculadoras/${calculatorPath.match(/\/calculadoras\/([^/]+)\//)?.[1]}` : null
    ].filter(Boolean) as string[];

    return this.submitUrls(urls);
  }

  /**
   * Submits all main pages for indexing
   */
  async submitMainPages(): Promise<IndexNowSubmissionResponse> {
    const baseUrl = `https://${this.host}`;
    const urls = [
      baseUrl,
      `${baseUrl}/calculadoras`,
      `${baseUrl}/calculadoras/saude`,
      `${baseUrl}/calculadoras/financas`,
      `${baseUrl}/calculadoras/matematica`,
      `${baseUrl}/calculadoras/trabalhista`,
      `${baseUrl}/sobre`,
      `${baseUrl}/privacidade`,
      `${baseUrl}/termos-de-uso`,
    ];

    return this.submitUrls(urls);
  }

  /**
   * Gets the current IndexNow configuration
   */
  getConfig() {
    return {
      key: this.key,
      host: this.host,
      keyLocation: this.keyLocation,
      searchEngines: this.searchEngines,
      keyValid: this.validateKey(this.key)
    };
  }
}

// Export singleton instance
export const indexNowService = new IndexNowService();

// Export types for use in other files
export type { IndexNowSubmissionResponse };