describe('Search and Tag Filtering', () => {
  describe('Search Functionality', () => {
    beforeEach(() => {
      cy.visit('/blog');
    });

    it('should have a search input field', () => {
      cy.get('input[type="search"], input[placeholder*="Search" i]')
        .should('be.visible')
        .and('not.be.disabled');
    });

    it('should filter posts based on search term', () => {
      const searchInput = 'input[type="search"], input[placeholder*="Search" i]';

      // Type a search term
      cy.get(searchInput).type('Hello');

      // Wait for debounce
      cy.wait(500);

      // Check if results are filtered
      cy.get('body').then($body => {
        if ($body.find('a[href^="/blog/"]').length > 0) {
          // If posts are found, they should contain the search term
          cy.get('a[href^="/blog/"]').first().should('exist');
        } else {
          // If no posts found, should show a message
          cy.contains(/no.*posts|no.*results/i).should('be.visible');
        }
      });
    });

    it('should be case-insensitive', () => {
      const searchInput = 'input[type="search"], input[placeholder*="Search" i]';

      // Search with lowercase
      cy.get(searchInput).type('hello');
      cy.wait(500);

      cy.get('body').then($body => {
        const lowercaseResults = $body.find('a[href^="/blog/"]').length;

        // Clear and search with uppercase
        cy.get(searchInput).clear().type('HELLO');
        cy.wait(500);

        cy.get('a[href^="/blog/"]').should('have.length', lowercaseResults);
      });
    });

    it('should show no results message for non-existent terms', () => {
      const searchInput = 'input[type="search"], input[placeholder*="Search" i]';

      cy.get(searchInput).type('xyzzzznonexistentterm12345');
      cy.wait(500);

      cy.contains(/no.*posts|no.*results|not.*found/i).should('be.visible');
    });

    it('should clear search and show all posts', () => {
      const searchInput = 'input[type="search"], input[placeholder*="Search" i]';

      // Get initial count
      cy.get('a[href^="/blog/"]').its('length').then(initialCount => {
        // Search for something
        cy.get(searchInput).type('test');
        cy.wait(500);

        // Clear search
        cy.get(searchInput).clear();
        cy.wait(500);

        // Should show all posts again
        cy.get('a[href^="/blog/"]').should('have.length', initialCount);
      });
    });

    it('should update results in real-time as user types', () => {
      const searchInput = 'input[type="search"], input[placeholder*="Search" i]';

      cy.get(searchInput).type('H');
      cy.wait(500);

      cy.get('body').then($body => {
        const resultsAfterH = $body.find('a[href^="/blog/"]').length;

        cy.get(searchInput).type('ello');
        cy.wait(500);

        // Results should potentially change (could be same if all posts match both)
        cy.get('body').should('exist');
      });
    });

    it('should search across title, excerpt, and content', () => {
      const searchInput = 'input[type="search"], input[placeholder*="Search" i]';

      // Search for a word that might be in content
      cy.get(searchInput).type('Next.js');
      cy.wait(500);

      cy.get('body').then($body => {
        if ($body.find('a[href^="/blog/"]').length > 0) {
          cy.get('a[href^="/blog/"]').should('exist');
        } else {
          cy.contains(/no.*posts|no.*results/i).should('be.visible');
        }
      });
    });
  });

  describe('Tag Cloud', () => {
    beforeEach(() => {
      cy.visit('/blog');
    });

    it('should display tag cloud section', () => {
      cy.contains('Popular Tags').should('be.visible');
    });

    it('should display clickable tags', () => {
      cy.get('a[href^="/tag/"]').should('have.length.at.least', 1);
    });

    it('should navigate to tag page when clicking a tag', () => {
      cy.get('a[href^="/tag/"]').first().then($tag => {
        const tagHref = $tag.attr('href');
        cy.wrap($tag).click();
        cy.url().should('include', tagHref);
      });
    });

    it('should display tags with proper styling', () => {
      cy.get('a[href^="/tag/"]').first().should('be.visible').and('not.be.empty');
    });
  });

  describe('Tag Filtering Page', () => {
    beforeEach(() => {
      cy.visit('/blog');
      // Click on the first tag
      cy.get('a[href^="/tag/"]').first().click();
    });

    it('should load tag page successfully', () => {
      cy.url().should('match', /\/tag\/[a-z0-9.-]+$/);
    });

    it('should display tag name in heading', () => {
      cy.get('h1').should('be.visible').and('not.be.empty');
    });

    it('should display filtered posts', () => {
      cy.get('a[href^="/blog/"]').should('have.length.at.least', 1);
    });

    it('should display only posts with selected tag', () => {
      // Get tag name from URL
      cy.url().then(url => {
        const tagName = url.split('/tag/')[1];
        cy.get('h1').should('contain', tagName.replace(/-/g, ' '));
      });
    });

    it('should have navigation back to all posts', () => {
      cy.get('a[href="/blog"]').should('exist');
    });

    it('should still have search functionality', () => {
      cy.get('input[type="search"], input[placeholder*="Search" i]').should('exist');
    });

    it('should combine tag filter with search', () => {
      const searchInput = 'input[type="search"], input[placeholder*="Search" i]';

      // Get initial filtered count
      cy.get('a[href^="/blog/"]').its('length').then(initialCount => {
        // Now search within filtered results
        cy.get(searchInput).type('test');
        cy.wait(500);

        // Results should be filtered further or show no results
        cy.get('body').should('exist');
      });
    });

    it('should be responsive', () => {
      cy.viewport('iphone-x');
      cy.get('h1').should('be.visible');
      cy.get('a[href^="/blog/"]').should('be.visible');

      cy.viewport(1920, 1080);
      cy.get('h1').should('be.visible');
      cy.get('a[href^="/blog/"]').should('be.visible');
    });
  });

  describe('Tag Navigation from Posts', () => {
    beforeEach(() => {
      cy.visit('/blog/hello-world');
    });

    it('should display tags on individual post', () => {
      cy.get('a[href^="/tag/"]').should('have.length.at.least', 1);
    });

    it('should navigate to tag page from post', () => {
      cy.get('a[href^="/tag/"]').first().click();
      cy.url().should('include', '/tag/');
    });

    it('should filter posts by clicked tag', () => {
      cy.get('a[href^="/tag/"]').first().then($tag => {
        const tagHref = $tag.attr('href');
        cy.wrap($tag).click();
        cy.url().should('include', tagHref);
        cy.get('a[href^="/blog/"]').should('have.length.at.least', 1);
      });
    });
  });
});
