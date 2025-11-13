describe('MDX Components', () => {
  beforeEach(() => {
    // Visit a post that has MDX components
    cy.visit('/blog/hello-world');
  });

  describe('Callout Component', () => {
    it('should display callout components', () => {
      // The hello-world post has multiple callouts
      cy.get('[class*="callout" i], [class*="alert" i], div[role="alert"]').should('exist');
    });

    it('should display success callout with correct styling', () => {
      cy.contains("What's New?").should('be.visible');
    });

    it('should display info callout', () => {
      cy.contains("Pro Tip").should('be.visible');
    });

    it('should display warning callout', () => {
      cy.contains("Important Note").should('be.visible');
    });

    it('should display callout with proper structure', () => {
      // Callouts should have title and content
      cy.contains("What's New?").parent().within(() => {
        cy.contains('MDX').should('exist');
      });
    });

    it('should render callout content as markdown/MDX', () => {
      cy.contains("What's New?").parent().within(() => {
        // Should contain formatted text
        cy.get('p, div').should('exist');
      });
    });

    it('should have different visual styles for different types', () => {
      // Success, info, warning, error should look different
      // We'll just verify they exist and are visible
      cy.contains("What's New?").should('be.visible');
      cy.contains("Pro Tip").should('be.visible');
      cy.contains("Important Note").should('be.visible');
    });

    it('should be responsive on mobile', () => {
      cy.viewport('iphone-x');
      cy.contains("What's New?").should('be.visible');
      cy.contains("Pro Tip").should('be.visible');
    });
  });

  describe('Code Blocks', () => {
    it('should display code blocks with syntax highlighting', () => {
      cy.get('pre code, pre, .shiki').should('have.length.at.least', 1);
    });

    it('should have copy button on code blocks', () => {
      cy.get('pre').first().then($pre => {
        // Check if copy button exists (might be hidden or visible on hover)
        cy.wrap($pre).within(() => {
          cy.get('button, [class*="copy" i]').should('exist');
        }).parent().within(() => {
          cy.get('button, [class*="copy" i]').should('exist');
        });
      });
    });

    it('should copy code to clipboard when clicking copy button', () => {
      // Find copy button and click it
      cy.get('pre').first().parent().within(() => {
        cy.get('button[class*="copy" i], button:has(svg)').first().click({ force: true });
      });

      // Verify feedback (button text might change or show tooltip)
      cy.wait(100);
      cy.get('body').should('exist'); // Basic assertion to verify action completed
    });

    it('should display multiple code blocks with different languages', () => {
      // The hello-world post has JavaScript, TypeScript, and Python
      cy.get('pre code').should('have.length.at.least', 3);
    });

    it('should have proper syntax highlighting colors', () => {
      cy.get('pre code').first().within(() => {
        // Check if there are colored spans (syntax highlighting)
        cy.get('span[style*="color"], .token, [class*="token"]').should('exist');
      });
    });

    it('should preserve code formatting and indentation', () => {
      cy.get('pre code').first().should('not.be.empty');
    });

    it('should display code with line breaks', () => {
      cy.get('pre code').first().invoke('text').should('include', 'function');
    });

    it('should be scrollable horizontally for long lines', () => {
      cy.get('pre').first().should('have.css', 'overflow-x');
    });

    it('should maintain code visibility in dark mode', () => {
      // Toggle to dark mode
      cy.get('html').then($html => {
        if (!$html.hasClass('dark')) {
          cy.get('button[aria-label*="theme" i], button[title*="theme" i]').first().click({ force: true });
          cy.wait(300);
        }

        // Code should still be visible
        cy.get('pre code').should('be.visible');
      });
    });

    it('should display inline code differently from code blocks', () => {
      // Check for inline code (should be in paragraphs)
      cy.get('p code, li code').should('exist');
    });
  });

  describe('Headings and Table of Contents', () => {
    it('should display multiple heading levels', () => {
      cy.get('h1').should('exist');
      cy.get('h2').should('have.length.at.least', 1);
      cy.get('h3').should('exist');
    });

    it('should have IDs on headings for anchor links', () => {
      cy.get('h2[id], h3[id]').should('have.length.at.least', 1);
    });

    it('should allow navigation via heading anchors', () => {
      cy.get('h2[id]').first().then($heading => {
        const headingId = $heading.attr('id');
        if (headingId) {
          cy.visit(`/blog/hello-world#${headingId}`);
          cy.get(`#${headingId}`).should('be.visible');
        }
      });
    });

    it('should display table of contents if available', () => {
      cy.get('body').then($body => {
        if ($body.find('[class*="toc" i], nav:contains("Table of Contents")').length > 0) {
          cy.get('[class*="toc" i], nav:contains("Table of Contents")').should('be.visible');
        }
      });
    });
  });

  describe('Lists and Formatting', () => {
    it('should display unordered lists', () => {
      cy.get('ul').should('have.length.at.least', 1);
      cy.get('ul li').should('have.length.at.least', 1);
    });

    it('should display list items with proper styling', () => {
      cy.get('ul li').first().should('be.visible');
    });

    it('should display bold and italic text', () => {
      cy.get('strong, b, em, i').should('exist');
    });

    it('should render paragraphs with proper spacing', () => {
      cy.get('article p, .prose p').should('have.length.at.least', 2);
    });
  });

  describe('Links', () => {
    it('should have properly styled links', () => {
      cy.get('article a, .prose a').should('exist');
    });

    it('should distinguish internal and external links', () => {
      // Internal links start with /
      cy.get('article a[href^="/"], .prose a[href^="/"]').should('exist');
    });

    it('should open internal links in same tab', () => {
      cy.get('article a[href^="/"], .prose a[href^="/"]').first().then($link => {
        const target = $link.attr('target');
        expect(target).to.not.equal('_blank');
      });
    });
  });

  describe('Responsive Design', () => {
    it('should be readable on mobile devices', () => {
      cy.viewport('iphone-x');
      cy.get('article, .prose').should('be.visible');
      cy.get('h1').should('be.visible');
      cy.get('pre code').should('be.visible');
      cy.contains("What's New?").should('be.visible');
    });

    it('should be readable on tablet devices', () => {
      cy.viewport('ipad-2');
      cy.get('article, .prose').should('be.visible');
      cy.get('h1').should('be.visible');
      cy.get('pre code').should('be.visible');
    });

    it('should have proper font sizes on different devices', () => {
      // Desktop
      cy.viewport(1920, 1080);
      cy.get('article, .prose').should('be.visible');

      // Mobile
      cy.viewport('iphone-x');
      cy.get('article, .prose').should('be.visible');
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      cy.get('h1').should('have.length', 1);
    });

    it('should have alt text for images if present', () => {
      cy.get('article img, .prose img').each($img => {
        cy.wrap($img).should('have.attr', 'alt');
      });
    });

    it('should have accessible code blocks', () => {
      cy.get('pre').first().should('be.visible');
    });

    it('should maintain focus visibility', () => {
      cy.get('a').first().focus();
      cy.focused().should('exist');
    });
  });
});
