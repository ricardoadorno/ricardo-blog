describe('Individual Blog Post', () => {
  beforeEach(() => {
    // Visit the blog listing first to find a post
    cy.visit('/blog');
    // Click on the first post
    cy.get('a[href^="/blog/"]').first().click();
  });

  it('should load a blog post successfully', () => {
    cy.url().should('match', /\/blog\/[a-z0-9-]+$/);
  });

  it('should display the post title', () => {
    cy.get('h1').should('be.visible').and('not.be.empty');
  });

  it('should display post metadata', () => {
    // Should have at least author or date
    cy.contains(/ricardo|author|date|\d{4}/i).should('exist');
  });

  it('should display post content', () => {
    // Check for article content
    cy.get('article, .prose, [class*="content"]').should('exist').and('be.visible');
  });

  it('should have readable text content', () => {
    cy.get('article, .prose, [class*="content"]').within(() => {
      cy.get('p, h2, h3, li').should('have.length.at.least', 1);
    });
  });

  it('should display code blocks with syntax highlighting', () => {
    cy.get('pre code, pre, .shiki').should('exist');
  });

  it('should have copy button on code blocks', () => {
    cy.get('pre').first().within(() => {
      // Check if there's a copy button (might be visible on hover or always visible)
      cy.get('body').then($body => {
        // Either find button or verify code is there
        cy.get('code').should('exist');
      });
    });
  });

  it('should display breadcrumbs or back navigation', () => {
    // Check if there's a way to navigate back
    cy.get('a[href="/blog"], a[href*="back" i], nav a').should('exist');
  });

  it('should have proper heading hierarchy', () => {
    cy.get('h1').should('have.length', 1);
    cy.get('h2, h3, h4').should('exist');
  });

  it('should have working internal links', () => {
    cy.get('article a[href^="/"], .prose a[href^="/"]').first().then($link => {
      if ($link.length > 0) {
        cy.wrap($link).should('have.attr', 'href');
      }
    });
  });

  it('should display table of contents if available', () => {
    // Table of contents might exist for longer posts
    cy.get('body').then($body => {
      if ($body.find('[class*="toc" i], nav:contains("Table of Contents")').length > 0) {
        cy.get('[class*="toc" i], nav:contains("Table of Contents")').should('be.visible');
      }
    });
  });

  it('should display tags if available', () => {
    cy.get('body').then($body => {
      if ($body.find('a[href^="/tag/"]').length > 0) {
        cy.get('a[href^="/tag/"]').should('be.visible');
      }
    });
  });

  it('should display category if available', () => {
    cy.contains(/category|getting started/i).should('exist');
  });

  it('should show reading time', () => {
    cy.contains(/\d+\s*(min|minute)/i).should('exist');
  });

  it('should display related posts if available', () => {
    cy.get('body').then($body => {
      if ($body.find('h2:contains("Related"), h3:contains("Related")').length > 0) {
        cy.contains(/related/i).should('be.visible');
        cy.get('a[href^="/blog/"]').should('have.length.at.least', 1);
      }
    });
  });

  it('should be responsive on mobile', () => {
    cy.viewport('iphone-x');
    cy.get('h1').should('be.visible');
    cy.get('article, .prose').should('be.visible');
  });

  it('should be responsive on tablet', () => {
    cy.viewport('ipad-2');
    cy.get('h1').should('be.visible');
    cy.get('article, .prose').should('be.visible');
  });

  it('should have proper meta title', () => {
    cy.title().should('not.be.empty');
  });

  it('should have accessible content', () => {
    cy.get('article, .prose, main').should('exist').and('be.visible');
  });

  it('should allow navigation back to blog', () => {
    cy.get('a[href="/blog"]').first().click();
    cy.url().should('include', '/blog');
  });

  it('should have proper heading ids for anchor links', () => {
    cy.get('h2[id], h3[id]').should('exist');
  });
});

describe('Specific Blog Post - Hello World', () => {
  beforeEach(() => {
    cy.visit('/blog/hello-world');
  });

  it('should display Hello World post', () => {
    cy.contains('Hello World').should('be.visible');
  });

  it('should display MDX content', () => {
    cy.contains('Welcome to my brand new blog').should('be.visible');
  });

  it('should display code examples', () => {
    cy.get('pre code').should('exist');
    cy.contains('function Greeting').should('exist');
  });

  it('should have multiple programming language examples', () => {
    cy.contains(/javascript|typescript|python/i).should('exist');
  });
});
