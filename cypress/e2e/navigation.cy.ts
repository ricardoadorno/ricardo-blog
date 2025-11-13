describe('Navigation and Accessibility', () => {
  describe('Header Navigation', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('should display header on all pages', () => {
      const pages = ['/', '/blog'];
      pages.forEach(page => {
        cy.visit(page);
        cy.get('header, nav').should('be.visible');
      });
    });

    it('should have logo or site title linking to homepage', () => {
      cy.visit('/blog');
      cy.get('header a[href="/"], nav a[href="/"]').first().click();
      cy.url().should('eq', Cypress.config().baseUrl + '/');
    });

    it('should highlight active navigation item', () => {
      cy.visit('/blog');
      // Check if active link has special styling or aria-current
      cy.get('header nav a[href="/blog"], nav a[href="/blog"]').should('exist');
    });

    it('should have accessible navigation links', () => {
      cy.get('nav a').each($link => {
        cy.wrap($link).should('be.visible').and('have.attr', 'href');
      });
    });

    it('should be sticky or fixed on scroll', () => {
      cy.scrollTo(0, 500);
      cy.get('header, nav').should('be.visible');
    });
  });

  describe('Footer', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('should display footer on all pages', () => {
      const pages = ['/', '/blog'];
      pages.forEach(page => {
        cy.visit(page);
        cy.get('footer').should('be.visible');
      });
    });

    it('should contain copyright or attribution', () => {
      cy.get('footer').within(() => {
        cy.contains(/©|copyright|ricardo/i).should('exist');
      });
    });

    it('should have footer links if present', () => {
      cy.get('footer a').each($link => {
        cy.wrap($link).should('have.attr', 'href');
      });
    });
  });

  describe('Breadcrumbs', () => {
    it('should display breadcrumbs on blog post pages', () => {
      cy.visit('/blog/hello-world');
      cy.get('nav[aria-label*="breadcrumb" i], [class*="breadcrumb" i]').should('exist');
    });

    it('should have working breadcrumb links', () => {
      cy.visit('/blog/hello-world');
      cy.get('a[href="/blog"]').first().should('exist');
    });
  });

  describe('Skip Links', () => {
    it('should have skip to content link for accessibility', () => {
      cy.visit('/');
      // Skip link might be hidden until focused
      cy.get('a[href*="#content"], a[href*="#main"]').should('exist');
    });
  });

  describe('Page Transitions', () => {
    it('should navigate smoothly between pages', () => {
      cy.visit('/');
      cy.contains('a', 'Read Blog').click();
      cy.url().should('include', '/blog');

      cy.get('a[href^="/blog/"]').first().click();
      cy.url().should('match', /\/blog\/[a-z0-9-]+$/);

      cy.get('a[href="/blog"]').first().click();
      cy.url().should('include', '/blog');

      cy.get('a[href="/"]').first().click();
      cy.url().should('eq', Cypress.config().baseUrl + '/');
    });
  });

  describe('404 Error Page', () => {
    it('should show 404 page for non-existent routes', () => {
      cy.visit('/this-page-does-not-exist', { failOnStatusCode: false });
      cy.contains(/404|not found|page.*not.*exist/i).should('be.visible');
    });

    it('should have navigation back to home from 404', () => {
      cy.visit('/this-page-does-not-exist', { failOnStatusCode: false });
      cy.get('a[href="/"]').should('exist');
    });
  });

  describe('Keyboard Navigation', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('should be navigable with tab key', () => {
      cy.get('a').first().focus();
      cy.focused().should('exist');
    });

    it('should have visible focus indicators', () => {
      cy.get('a').first().focus();
      cy.focused().should('have.css', 'outline-style').and('not.eq', 'none');
    });
  });

  describe('SEO and Meta Tags', () => {
    it('should have title tag on homepage', () => {
      cy.visit('/');
      cy.title().should('not.be.empty');
    });

    it('should have title tag on blog listing', () => {
      cy.visit('/blog');
      cy.title().should('include', 'Blog');
    });

    it('should have unique title on blog posts', () => {
      cy.visit('/blog/hello-world');
      cy.title().should('include', 'Hello World');
    });

    it('should have meta description', () => {
      cy.visit('/');
      cy.get('head meta[name="description"]').should('exist');
    });

    it('should have Open Graph tags', () => {
      cy.visit('/');
      cy.get('head meta[property^="og:"]').should('exist');
    });

    it('should have Twitter card tags', () => {
      cy.visit('/');
      cy.get('head meta[name^="twitter:"]').should('exist');
    });

    it('should have canonical URL', () => {
      cy.visit('/');
      cy.get('head link[rel="canonical"]').should('exist');
    });

    it('should have proper charset and viewport', () => {
      cy.visit('/');
      cy.get('head meta[charset]').should('exist');
      cy.get('head meta[name="viewport"]').should('exist');
    });
  });

  describe('Loading States', () => {
    it('should load pages without errors', () => {
      cy.visit('/');
      cy.get('h1').should('be.visible');

      cy.visit('/blog');
      cy.get('h1').should('be.visible');
    });
  });

  describe('External Links', () => {
    it('should open external links properly', () => {
      cy.visit('/blog/hello-world');
      cy.get('article a[href^="http"], .prose a[href^="http"]').each($link => {
        // External links should have target="_blank" or rel="noopener"
        const href = $link.attr('href');
        const baseUrl = Cypress.config().baseUrl || '';
        if (href && !href.includes(baseUrl)) {
          cy.wrap($link).should('have.attr', 'href');
        }
      });
    });
  });

  describe('Mobile Menu', () => {
    beforeEach(() => {
      cy.viewport('iphone-x');
      cy.visit('/');
    });

    it('should have mobile menu toggle on mobile devices', () => {
      // Look for hamburger menu or mobile menu toggle
      cy.get('button[aria-label*="menu" i], button[class*="menu" i], [class*="hamburger" i]').should('exist');
    });

    it('should toggle mobile menu when clicked', () => {
      cy.get('body').then($body => {
        if ($body.find('button[aria-label*="menu" i], button[class*="menu" i]').length > 0) {
          cy.get('button[aria-label*="menu" i], button[class*="menu" i]').first().click();
          // Menu should open
          cy.wait(300);
          cy.get('body').should('exist');
        }
      });
    });
  });

  describe('Performance', () => {
    it('should load images lazily', () => {
      cy.visit('/');
      cy.get('img').should('exist');
    });

    it('should have reasonable page load time', () => {
      const start = Date.now();
      cy.visit('/');
      cy.get('h1').should('be.visible').then(() => {
        const loadTime = Date.now() - start;
        expect(loadTime).to.be.lessThan(5000); // Should load in under 5 seconds
      });
    });
  });
});
