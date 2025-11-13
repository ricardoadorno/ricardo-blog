# Cypress E2E Tests

This directory contains end-to-end tests for the Ricardo Blog using Cypress.

## Test Coverage

### 1. Homepage Tests (`homepage.cy.ts`)
- Hero section rendering
- Featured posts display
- Skills section
- CTA section
- Navigation buttons
- Responsive design
- Accessibility

### 2. Blog Listing Tests (`blog-listing.cy.ts`)
- Page rendering
- Search functionality
- Tag cloud display
- Post cards
- Filtering
- Responsive design

### 3. Blog Post Tests (`blog-post.cy.ts`)
- Individual post rendering
- Post metadata
- Content display
- Code blocks with syntax highlighting
- Breadcrumbs
- Related posts
- Table of contents
- Responsive design

### 4. Search and Tags Tests (`search-and-tags.cy.ts`)
- Search input functionality
- Real-time filtering
- Case-insensitive search
- Tag cloud navigation
- Tag filtering pages
- Combined tag + search filtering
- Tag navigation from posts

### 5. Dark Mode Tests (`dark-mode.cy.ts`)
- Theme toggle button
- Theme persistence across navigation
- Theme persistence across reloads
- Dark mode styles application
- Theme toggle availability
- Icon changes based on theme
- Keyboard accessibility
- Code block visibility in dark mode

### 6. MDX Components Tests (`mdx-components.cy.ts`)
- Callout components (success, info, warning, error)
- Code blocks with syntax highlighting
- Copy to clipboard functionality
- Multiple programming languages
- Headings with anchor links
- Table of contents
- Lists and formatting
- Links (internal/external)
- Responsive design
- Accessibility

### 7. Navigation Tests (`navigation.cy.ts`)
- Header navigation
- Footer display
- Breadcrumbs
- Skip links
- Page transitions
- 404 error page
- Keyboard navigation
- SEO and meta tags
- Loading states
- External links
- Mobile menu
- Performance

## Running the Tests

### Interactive Mode (Cypress UI)
```bash
npm run cypress:open
```

### Headless Mode (CI/CD)
```bash
npm run cypress:run
```

### Run Tests with Dev Server
```bash
# Start dev server and run tests
npm run test:e2e

# Start dev server and open Cypress UI
npm run test:e2e:open
```

## Test Structure

```
cypress/
├── e2e/                    # Test files
│   ├── homepage.cy.ts
│   ├── blog-listing.cy.ts
│   ├── blog-post.cy.ts
│   ├── search-and-tags.cy.ts
│   ├── dark-mode.cy.ts
│   ├── mdx-components.cy.ts
│   └── navigation.cy.ts
├── fixtures/               # Test data
├── support/                # Support files
│   ├── commands.ts         # Custom commands
│   └── e2e.ts             # Global configuration
└── README.md              # This file
```

## Custom Commands

### `shouldBeVisible()`
Asserts that an element is visible on the page.

```typescript
cy.get('.element').shouldBeVisible()
```

### `toggleDarkMode()`
Toggles the dark mode theme.

```typescript
cy.toggleDarkMode()
```

### `verifyTheme(theme)`
Verifies that a specific theme is active.

```typescript
cy.verifyTheme('dark')
cy.verifyTheme('light')
```

## Configuration

The Cypress configuration is in `cypress.config.ts`:
- Base URL: `http://localhost:3000`
- Viewport: 1280x720
- Video recording: Disabled
- Screenshots on failure: Enabled

## Writing New Tests

When adding new tests:

1. Create a new `.cy.ts` file in the `cypress/e2e` directory
2. Use descriptive test names
3. Group related tests with `describe` blocks
4. Use `beforeEach` for common setup
5. Test both desktop and mobile viewports
6. Include accessibility checks
7. Test error states and edge cases

Example:

```typescript
describe('My Feature', () => {
  beforeEach(() => {
    cy.visit('/my-page');
  });

  it('should display the feature', () => {
    cy.get('.my-feature').should('be.visible');
  });

  it('should be responsive', () => {
    cy.viewport('iphone-x');
    cy.get('.my-feature').should('be.visible');
  });
});
```

## Best Practices

1. **Use data-testid attributes** for stable selectors
2. **Avoid hardcoded waits** - use `cy.wait()` sparingly
3. **Test user behavior** - not implementation details
4. **Keep tests independent** - each test should work in isolation
5. **Use custom commands** - for repeated actions
6. **Test accessibility** - include ARIA and keyboard navigation tests
7. **Mock external dependencies** - when appropriate

## Continuous Integration

These tests can be run in CI/CD pipelines:

```yaml
- name: Run Cypress tests
  run: npm run test:e2e
```

## Troubleshooting

### Tests failing locally?
1. Make sure dev server is running: `npm run dev`
2. Clear Cypress cache: `npx cypress cache clear`
3. Reinstall Cypress: `npm install --save-dev cypress`

### Tests timing out?
1. Increase timeout in `cypress.config.ts`
2. Check network conditions
3. Verify server is running properly

### Element not found?
1. Check if element exists with correct selector
2. Wait for element to be rendered
3. Use `cy.get().should('exist')` before interacting

## Resources

- [Cypress Documentation](https://docs.cypress.io)
- [Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Custom Commands](https://docs.cypress.io/api/cypress-api/custom-commands)
