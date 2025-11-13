describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the homepage successfully', () => {
    cy.get('h1').should('be.visible');
  });

  it('should display the hero section with name', () => {
    cy.contains('Hi, I\'m').should('be.visible');
    cy.contains('Ricardo').should('be.visible');
  });

  it('should display the hero description', () => {
    cy.contains('Web developer, designer, and technology enthusiast').should('be.visible');
  });

  it('should have working navigation buttons in hero', () => {
    cy.contains('a', 'About Me').should('be.visible').and('have.attr', 'href', '/about');
    cy.contains('a', 'Read Blog').should('be.visible').and('have.attr', 'href', '/blog');
  });

  it('should display featured posts section', () => {
    cy.contains('h2', 'Featured Posts').should('be.visible');
    cy.contains('Latest thoughts and tutorials').should('be.visible');
  });

  it('should display featured posts', () => {
    cy.get('h2:contains("Featured Posts")')
      .parent()
      .parent()
      .find('a[href^="/blog/"]')
      .should('have.length.at.least', 1);
  });

  it('should display post cards with title and excerpt', () => {
    // Check if posts are displayed
    cy.get('a[href^="/blog/"]').first().should('be.visible');
  });

  it('should have clickable post cards', () => {
    cy.get('a[href^="/blog/"]').first().click();
    cy.url().should('include', '/blog/');
  });

  it('should display skills section', () => {
    cy.contains('h2', 'Skills & Expertise').should('be.visible');
    cy.contains('Technologies I work with').should('be.visible');
  });

  it('should display skill cards', () => {
    const expectedSkills = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'UI/UX Design', 'GraphQL', 'DevOps'];

    expectedSkills.forEach(skill => {
      cy.contains(skill).should('be.visible');
    });
  });

  it('should display CTA section', () => {
    cy.contains('Let\'s').should('be.visible');
    cy.contains('Connect').should('be.visible');
    cy.contains('Interested in collaboration or have a question?').should('be.visible');
  });

  it('should have working CTA buttons', () => {
    cy.contains('a', 'Get in Touch').should('be.visible').and('have.attr', 'href', '/about');
    cy.contains('a', 'Read My Work').should('be.visible').and('have.attr', 'href', '/blog');
  });

  it('should have proper meta title', () => {
    cy.title().should('not.be.empty');
  });

  it('should be responsive', () => {
    // Test mobile viewport
    cy.viewport('iphone-x');
    cy.get('h1').should('be.visible');
    cy.contains('Ricardo').should('be.visible');

    // Test tablet viewport
    cy.viewport('ipad-2');
    cy.get('h1').should('be.visible');
    cy.contains('Ricardo').should('be.visible');

    // Test desktop viewport
    cy.viewport(1920, 1080);
    cy.get('h1').should('be.visible');
    cy.contains('Ricardo').should('be.visible');
  });

  it('should have accessible navigation', () => {
    cy.get('nav').should('exist');
    cy.get('a[href="/"]').should('exist');
    cy.get('a[href="/blog"]').should('exist');
  });

  it('should display footer', () => {
    cy.get('footer').should('exist').and('be.visible');
  });
});
