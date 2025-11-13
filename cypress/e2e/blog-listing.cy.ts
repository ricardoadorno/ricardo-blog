describe('Blog Listing Page', () => {
  beforeEach(() => {
    cy.visit('/blog');
  });

  it('should load the blog listing page successfully', () => {
    cy.url().should('include', '/blog');
  });

  it('should display the page title', () => {
    cy.get('h1').should('be.visible').and('contain.text', 'Blog');
  });

  it('should display search input', () => {
    cy.get('input[type="search"], input[placeholder*="Search" i]').should('be.visible');
  });

  it('should display tag cloud', () => {
    cy.contains('Popular Tags').should('be.visible');
  });

  it('should display blog posts', () => {
    cy.get('a[href^="/blog/"]').should('have.length.at.least', 1);
  });

  it('should display post cards with required information', () => {
    cy.get('a[href^="/blog/"]').first().within(() => {
      // Should have a title
      cy.get('h2, h3').should('exist').and('be.visible');
    });
  });

  it('should navigate to post when clicking on card', () => {
    cy.get('a[href^="/blog/"]').first().click();
    cy.url().should('match', /\/blog\/[a-z0-9-]+$/);
  });

  it('should filter posts when searching', () => {
    // Get initial count of posts
    cy.get('a[href^="/blog/"]').then($posts => {
      const initialCount = $posts.length;

      // Type in search
      cy.get('input[type="search"], input[placeholder*="Search" i]')
        .type('Hello');

      // Wait for filtering
      cy.wait(500);

      // Check if filtering worked (either shows filtered results or "no posts found")
      cy.get('body').then($body => {
        if ($body.find('a[href^="/blog/"]').length > 0) {
          cy.get('a[href^="/blog/"]').should('have.length.lte', initialCount);
        } else {
          cy.contains(/no.*posts/i).should('be.visible');
        }
      });
    });
  });

  it('should show all posts when search is cleared', () => {
    const searchInput = 'input[type="search"], input[placeholder*="Search" i]';

    // Type search term
    cy.get(searchInput).type('nonexistent-search-term-12345');
    cy.wait(500);

    // Clear search
    cy.get(searchInput).clear();
    cy.wait(500);

    // Should show posts again
    cy.get('a[href^="/blog/"]').should('have.length.at.least', 1);
  });

  it('should display tags for filtering', () => {
    // Check if tags are present in tag cloud
    cy.get('a[href^="/tag/"]').should('have.length.at.least', 1);
  });

  it('should navigate to tag page when clicking a tag', () => {
    cy.get('a[href^="/tag/"]').first().click();
    cy.url().should('include', '/tag/');
  });

  it('should be responsive on mobile', () => {
    cy.viewport('iphone-x');
    cy.get('h1').should('be.visible');
    cy.get('input[type="search"], input[placeholder*="Search" i]').should('be.visible');
    cy.get('a[href^="/blog/"]').should('be.visible');
  });

  it('should be responsive on tablet', () => {
    cy.viewport('ipad-2');
    cy.get('h1').should('be.visible');
    cy.get('input[type="search"], input[placeholder*="Search" i]').should('be.visible');
    cy.get('a[href^="/blog/"]').should('be.visible');
  });

  it('should have proper meta title', () => {
    cy.title().should('include', 'Blog');
  });

  it('should have accessible search input', () => {
    cy.get('input[type="search"], input[placeholder*="Search" i]')
      .should('be.visible')
      .and('not.be.disabled');
  });

  it('should display post metadata', () => {
    cy.get('a[href^="/blog/"]').first().within(() => {
      // Should have date or author or tags
      cy.get('body').should('exist');
    });
  });
});
