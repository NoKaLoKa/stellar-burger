describe('constructor tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000/')

    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients' })
  })

  describe('ingredient tests', () => {
    it('adding ingredient to constructor', () => {
      cy.get(`[data-cy='Краторная булка N-200i'] button`).click();
      cy.get('div.constructor-element span.constructor-element__text').contains('Краторная булка N-200i');
    }) 
  })

  describe('modal tests', () => {
    beforeEach(() => {
      cy.get(`[data-cy='Краторная булка N-200i']`).click();
    })

    it('opening modal', () => {
      cy.contains('Краторная булка N-200i');
      cy.contains('Калории, ккал');
      cy.contains('420');
    })

    it('closing modal by click on button', () => {
      cy.get(`[data-cy='modalClose']`).click();
      cy.get(`[data-cy='modal']`).should('not.exist');
    })

    it('closing modal by click on overlay', () => {
      cy.get(`[data-cy='modal_overlay']`).click('topRight', {force: true});
      cy.get(`[data-cy='modal']`).should('not.exist');
    })
  })

  describe('order tests', () => {
    beforeEach(() => {
      cy.setCookie('accessToken', login.accessToken);
      localStorage.setItem('refreshToken', login.refreshToken);
    })
    
    afterEach(() => {
      cy.clearCookie('accessToken');
      localStorage.removeItem('refreshToken');
    });
    
    it('creating order', () => {
      cy.intercept('POST', 'api/auth/login', { fixture: 'login.json' });
      cy.intercept('POST', 'api/orders', { fixture: 'order.json' });

      cy.get(`[data-cy='Краторная булка N-200i'] button`).click();
      cy.get(`[data-cy='Биокотлета из марсианской Магнолии'] button`).click();
      cy.get(`[data-cy='orderButton']`).click();
      cy.get(`[data-cy='login_form'] button`).click();
      cy.get(`[data-cy='orderButton']`).click();
      cy.get(`[data-cy='orderNumber']`).should('have.text', '38108');
      cy.get(`[data-cy='modalClose']`).click();
      cy.get(`[data-cy='chooseBun']`).should('exist')
      cy.get(`[data-cy='orderPrice']`).should('have.text', '0')
    })
  })
})

import login from '../fixtures/login.json';
