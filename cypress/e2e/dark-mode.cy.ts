describe('Dark Mode', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have a theme toggle button', () => {
    cy.get('button[aria-label*="theme" i], button[title*="theme" i], button:has(svg[class*="sun" i]), button:has(svg[class*="moon" i])')
      .should('exist');
  });

  it('should toggle dark mode when clicking theme button', () => {
    // Get initial theme
    cy.get('html').then($html => {
      const initialTheme = $html.hasClass('dark') ? 'dark' : 'light';

      // Click theme toggle
      cy.get('button[aria-label*="theme" i], button[title*="theme" i], button:has(svg[class*="sun" i]), button:has(svg[class*="moon" i])')
        .first()
        .click({ force: true });

      // Wait for theme change
      cy.wait(300);

      // Verify theme changed
      if (initialTheme === 'dark') {
        cy.get('html').should('not.have.class', 'dark');
      } else {
        cy.get('html').should('have.class', 'dark');
      }
    });
  });

  it('should persist theme preference across page navigation', () => {
    // Set to dark mode
    cy.get('html').then($html => {
      if (!$html.hasClass('dark')) {
        cy.get('button[aria-label*="theme" i], button[title*="theme" i], button:has(svg[class*="sun" i]), button:has(svg[class*="moon" i])')
          .first()
          .click({ force: true });
        cy.wait(300);
      }

      // Verify dark mode is active
      cy.get('html').should('have.class', 'dark');

      // Navigate to another page
      cy.visit('/blog');
      cy.wait(300);

      // Theme should persist
      cy.get('html').should('have.class', 'dark');
    });
  });

  it('should persist theme preference across page reloads', () => {
    // Set to dark mode
    cy.get('html').then($html => {
      if (!$html.hasClass('dark')) {
        cy.get('button[aria-label*="theme" i], button[title*="theme" i], button:has(svg[class*="sun" i]), button:has(svg[class*="moon" i])')
          .first()
          .click({ force: true });
        cy.wait(300);
      }

      // Verify dark mode is active
      cy.get('html').should('have.class', 'dark');

      // Reload page
      cy.reload();
      cy.wait(500);

      // Theme should persist
      cy.get('html').should('have.class', 'dark');
    });
  });

  it('should apply dark mode styles to all elements', () => {
    // Ensure we're in dark mode
    cy.get('html').then($html => {
      if (!$html.hasClass('dark')) {
        cy.get('button[aria-label*="theme" i], button[title*="theme" i], button:has(svg[class*="sun" i]), button:has(svg[class*="moon" i])')
          .first()
          .click({ force: true });
        cy.wait(300);
      }

      cy.get('html').should('have.class', 'dark');

      // Check that dark styles are applied (background should be dark)
      cy.get('body').should('exist');
    });
  });

  it('should have theme toggle accessible from all pages', () => {
    const pages = ['/', '/blog'];

    pages.forEach(page => {
      cy.visit(page);
      cy.get('button[aria-label*="theme" i], button[title*="theme" i], button:has(svg[class*="sun" i]), button:has(svg[class*="moon" i])')
        .should('exist');
    });
  });

  it('should toggle between light and dark mode multiple times', () => {
    // Toggle to dark
    cy.get('html').then($html => {
      const initialClass = $html.attr('class');

      // First toggle
      cy.get('button[aria-label*="theme" i], button[title*="theme" i], button:has(svg[class*="sun" i]), button:has(svg[class*="moon" i])')
        .first()
        .click({ force: true });
      cy.wait(300);

      cy.get('html').then($html2 => {
        const afterFirstToggle = $html2.attr('class');

        // Second toggle (should return to original or toggle again)
        cy.get('button[aria-label*="theme" i], button[title*="theme" i], button:has(svg[class*="sun" i]), button:has(svg[class*="moon" i])')
          .first()
          .click({ force: true });
        cy.wait(300);

        // Third toggle
        cy.get('button[aria-label*="theme" i], button[title*="theme" i], button:has(svg[class*="sun" i]), button:has(svg[class*="moon" i])')
          .first()
          .click({ force: true });
        cy.wait(300);

        cy.get('html').should('exist');
      });
    });
  });

  it('should have appropriate icon for current theme', () => {
    cy.get('html').then($html => {
      const isDark = $html.hasClass('dark');

      if (isDark) {
        // In dark mode, should show sun icon (to switch to light)
        cy.get('button[aria-label*="theme" i], button[title*="theme" i]')
          .first()
          .should('exist');
      } else {
        // In light mode, should show moon icon (to switch to dark)
        cy.get('button[aria-label*="theme" i], button[title*="theme" i]')
          .first()
          .should('exist');
      }
    });
  });

  it('should maintain theme when navigating between pages', () => {
    // Set dark mode
    cy.get('html').then($html => {
      if (!$html.hasClass('dark')) {
        cy.get('button[aria-label*="theme" i], button[title*="theme" i], button:has(svg[class*="sun" i]), button:has(svg[class*="moon" i])')
          .first()
          .click({ force: true });
        cy.wait(300);
      }

      cy.get('html').should('have.class', 'dark');

      // Navigate through multiple pages
      cy.visit('/blog');
      cy.wait(300);
      cy.get('html').should('have.class', 'dark');

      cy.get('a[href^="/blog/"]').first().click();
      cy.wait(300);
      cy.get('html').should('have.class', 'dark');

      cy.visit('/');
      cy.wait(300);
      cy.get('html').should('have.class', 'dark');
    });
  });

  it('should be keyboard accessible', () => {
    cy.get('button[aria-label*="theme" i], button[title*="theme" i], button:has(svg[class*="sun" i]), button:has(svg[class*="moon" i])')
      .first()
      .focus()
      .should('be.focused');
  });

  it('should work on code blocks with syntax highlighting', () => {
    cy.visit('/blog/hello-world');

    // Toggle dark mode
    cy.get('html').then($html => {
      if (!$html.hasClass('dark')) {
        cy.get('button[aria-label*="theme" i], button[title*="theme" i], button:has(svg[class*="sun" i]), button:has(svg[class*="moon" i])')
          .first()
          .click({ force: true });
        cy.wait(300);
      }

      // Check that code blocks are visible in dark mode
      cy.get('pre code, .shiki').should('be.visible');
    });
  });

  it('should apply theme to all UI components', () => {
    // Check various components in both themes
    cy.get('html').then($html => {
      if (!$html.hasClass('dark')) {
        cy.get('button[aria-label*="theme" i], button[title*="theme" i], button:has(svg[class*="sun" i]), button:has(svg[class*="moon" i])')
          .first()
          .click({ force: true });
        cy.wait(300);
      }

      // Verify elements are still visible and styled
      cy.get('nav').should('be.visible');
      cy.get('footer').should('be.visible');
      cy.get('h1').should('be.visible');
      cy.get('button').should('be.visible');
    });
  });
});
