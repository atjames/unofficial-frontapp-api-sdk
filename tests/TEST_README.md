# Front API SDK - Test Suite

This directory contains simple tests for the Front API SDK. The tests focus on verifying that API requests work and the client is created properly.

## Test Structure

```
tests/
├── setup.ts                           # Shared test utilities
├── client/
│   └── client.test.ts                 # Client initialization tests
├── accounts/
│   ├── accounts.list.test.ts          # Accounts list() endpoint
│   ├── accounts.get.test.ts           # Accounts get() endpoint  
│   ├── accounts.listAll.test.ts       # Accounts listAll() method
│   └── accounts.create.test.ts        # Accounts create() endpoint
├── conversations/
│   ├── conversations.list.test.ts     # Conversations list() endpoint
│   └── conversations.get.test.ts      # Conversations get() endpoint
└── integration/
    └── integration.test.ts            # Basic workflow tests
```

## Prerequisites

1. **Environment Setup**: Create a `.env` file in the root directory:
   ```
   FRONT_API_TOKEN=your_front_api_token_here
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

## Running Tests

### All Tests
```bash
npm test
```

### Specific Test Categories
```bash
npm run test:client        # Client creation tests
npm run test:accounts      # All accounts API tests
npm run test:conversations # All conversations API tests
npm run test:integration   # Basic workflow tests
```

## Test Focus

These tests are designed to be simple and focused on basic functionality:

- **Client Creation**: Verifies the FrontClient can be instantiated and has expected API methods
- **API Requests**: Tests that each endpoint can be called successfully
- **Basic Workflows**: Ensures common operations work together

The tests do **not** include:
- Complex error handling scenarios  
- Edge cases
- Extensive validation
- Performance testing

## Test Output

Tests provide console output showing:
- ✅ Successful operations
- ⚠️ Skipped operations (due to permissions/data availability)
- ℹ️ Informational messages

## Notes

- Tests automatically skip if `FRONT_API_TOKEN` is not provided
- Account creation tests may be skipped due to API permissions
- Some tests depend on existing data in your Front workspace 