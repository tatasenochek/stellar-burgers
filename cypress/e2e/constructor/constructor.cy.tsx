let baseUrl: string;
beforeEach(() => {
  baseUrl = 'http://localhost:4000/';
  cy.visit(baseUrl);
  cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
    'getIngredients'
  );
  cy.wait('@getIngredients');
});

const authUser = (isAuth: boolean) => {
  if (isAuth) {
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.setCookie('accessToken', 'accessToken');
    localStorage.setItem('refreshToken', 'refreshToken');
  } else {
    cy.clearCookie('accessToken');
  }
};

describe('проверяем функциональность навигационного меню', () => {
  it('проверяем, что ссылка "Конструктор" работает', () => {
    cy.get("[data-cy='constructor-link']").click();
    cy.url().should('equal', baseUrl);
  });

  it('проверяем, что ссылка "Лента заказов" работает', () => {
    cy.get("[data-cy='feed-link']").click();
    cy.url().should('equal', baseUrl + 'feed');
  });

  it('проверяем, что ссылка "Личный кабинет" работает для неавторизованного пользователя', () => {
    authUser(false);
    cy.get("[data-cy='profile-link']").click();
    cy.url().should('equal', baseUrl + 'register');
  });

  it('проверяем, что ссылка "Личный кабинет" работает для авторизованного пользователя', () => {
    authUser(true);
    cy.visit(baseUrl + 'register');
    cy.wait('@getUser');
    cy.get("[data-cy='profile-link']").click();
    cy.url().should('equal', baseUrl + 'profile');
  });
});

describe('проверяем функциональность работы конструтора бургера', () => {
  it('проверяем, что при клике на ингредиент открывается модально окно', () => {
    cy.get('ul li').eq(0).click();

    cy.get("[data-cy='openModal']").should('be.visible');
    cy.get("[data-cy='ingredientDetails']").should(
      'contain',
      'Краторная булка N-200i'
    );

    cy.get("[data-cy='closeModal']").click();
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('проверяем, что при клике на оверлей закрывается модально окно', () => {
    cy.get('ul li').eq(0).click();

    cy.get("[data-cy='openModal']").should('be.visible');
    cy.get("[data-cy='ingredientDetails']").should(
      'contain',
      'Краторная булка N-200i'
    );

    cy.get("[data-cy='closeByOverlayModal']").click('left', { force: true });
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('проверяем, что ингредиенты добавляются в конструкторе', () => {
    cy.get('ul li').eq(0).contains('Добавить').click();
    cy.get('ul li').eq(1).contains('Добавить').click();
    cy.get('ul li').eq(2).contains('Добавить').click();

    cy.get("[data-cy='selectedTopBun']").should(
      'contain',
      'Краторная булка N-200i'
    );
    cy.get("[data-cy='selectedBottomBun']").should(
      'contain',
      'Краторная булка N-200i'
    );
    cy.get("[data-cy='selectedIngredients']").should(
      'contain',
      'Биокотлета из марсианской Магнолии'
    );
    cy.get("[data-cy='selectedIngredients']").should('contain', 'Соус Spicy-X');
  });
});

describe('проверяем функциональность отправки заказа', () => {
  it('проверяем, что неавторизированный пользователь не сможет офoрмить заказ', () => {
    authUser(false);

    cy.get('ul li').eq(0).contains('Добавить').click();
    cy.get('ul li').eq(1).contains('Добавить').click();

    cy.get("[data-cy='orderButton']").click();
    cy.url().should('equal', baseUrl + 'register');
  });

  it('проверяем, что авторизированный пользователь может офoрмить заказ', () => {
    authUser(true);
    cy.visit(baseUrl + 'register');
    cy.wait('@getUser');
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as(
      'postOrder'
    );

    cy.get('ul li').eq(0).contains('Добавить').click();
    cy.get('ul li').eq(1).contains('Добавить').click();

    cy.get("[data-cy='orderButton']").click();
    cy.wait('@postOrder').its('response.statusCode').should('eq', 200);
    cy.get("[data-cy='openModal']").should('contain', '57707');
    cy.get("[data-cy='closeModal']").click();
    cy.get("[data-cy='selectedIngredients']").should(
      'contain',
      'Выберите начинку'
    );
  });
});
