const { expect } = require('chai');
import { FrontClient } from '../src/index';

// Load environment variables (dotenv is optional)
try {
  require('dotenv').config();
} catch {
  // dotenv not available, continue without it
}

export { expect };

// Shared test configuration
export const TEST_TIMEOUT = 30000;

// Setup function to initialize client
export function setupClient(): FrontClient {
  const apiToken = process.env.FRONT_API_TOKEN;
  
  if (!apiToken) {
    throw new Error('FRONT_API_TOKEN environment variable is required for tests');
  }
  
  return new FrontClient(apiToken);
}

// Helper function to check if API token is available
export function hasApiToken(): boolean {
  return !!process.env.FRONT_API_TOKEN;
} 