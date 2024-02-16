/// <reference types="cypress" />

import { DATA_TEST_ID } from '../mocks/data-test-id';

const userTraining = [
    {
        _id: '1',
        name: 'Ноги',
        date: '2024-01-01T00:00:00.000Z',
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        exercises: [
            {
                _id: '1',
                name: 'Упражнение',
                replays: 1,
                weight: 0,
                approaches: 3,
            },
        ],
    },
    {
        _id: '2',
        name: 'Руки',
        date: '2024-01-01T00:00:00.000Z',
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        exercises: [
            {
                _id: '2',
                name: 'Упражнение',
                replays: 1,
                weight: 0,
                approaches: 3,
            },
        ],
    },
];

describe('Sprint 3', () => {
    describe('Feedbacks', () => {
        const resolutions = [
            { width: 360, height: 740 },
            { width: 833, height: 900 },
            { width: 1440, height: 900 },
        ];

        function takeScreenshots(screenshotName: string) {
            cy.wait(1000);
            for (let i = 0; i < resolutions.length; i++) {
                cy.viewport(resolutions[i].width, resolutions[i].height);
                cy.screenshot(
                    `${screenshotName}_${resolutions[i].width}x${resolutions[i].height}`,
                    {
                        capture: 'viewport',
                    },
                );
            }
        }

        beforeEach(() => {
            cy.visit('/');
            cy.intercept('POST', 'auth/login', { accessToken: 'SUPERUSER' }).as('login');
            cy.viewport(1440, 900);
            cy.visit('/auth');
            cy.get('[data-test-id=login-email]').type('valadzkoaliaksei@tut.by');
            cy.get('[data-test-id=login-password]').type('1234qqQQ');
            cy.get('[data-test-id=login-submit-button]').click();
            cy.url().should('include', '/main');
            cy.clock(new Date('2024-01-01'));
        });

        it('First review', () => {
            cy.intercept('GET', 'training', {
                body: { message: 'some error' },
                statusCode: 500,
            }).as('getUserTraining');

            cy.get(`[data-test-id=${DATA_TEST_ID.menuButtonCalendar}]`).click();

            cy.wait('@getUserTraining').should(({ request }) => {
                expect(request.headers, 'request headers').to.include({
                    authorization: 'Bearer SUPERUSER',
                });
            });
            cy.url().should('include', '/calendar');
            cy.get(`[data-test-id=${DATA_TEST_ID.modalNoReview}]`).should('be.exist');
            cy.get(`[data-test-id=${DATA_TEST_ID.modalNoReview}]`).contains('Что-то пошло не так');
            cy.get(`[data-test-id=${DATA_TEST_ID.modalNoReview}]`).contains(
                'Произошла ошибка, попробуйте ещё раз.',
            );
            cy.get(`[data-test-id=${DATA_TEST_ID.modalNoReviewButton}]`).contains('Назад').click();
            cy.url().should('include', '/main');
        });

        it('First review', () => {
            cy.intercept('GET', 'catalogs/training-list', {
                body: { message: 'some error' },
                statusCode: 500,
            }).as('getTrainingList');

            cy.intercept('GET', 'training', {
                body: userTraining,
                statusCode: 200,
            }).as('getUserTraining');

            cy.get(`[data-test-id=${DATA_TEST_ID.menuButtonCalendar}]`).click();
            cy.wait('@getUserTraining').should(({ request }) => {
                expect(request.headers, 'request headers').to.include({
                    authorization: 'Bearer SUPERUSER',
                });
            });
            cy.wait('@getTrainingList').should(({ request }) => {
                expect(request.headers, 'request headers').to.include({
                    authorization: 'Bearer SUPERUSER',
                });
            });
            cy.url().should('include', '/calendar');
            cy.get(`[data-test-id=${DATA_TEST_ID.modalErrorUserTrainingTitle}]`).contains(
                'При открытии данных произошла ошибка',
            );
            cy.get(`[data-test-id=${DATA_TEST_ID.modalErrorUserTrainingSubTitle}]`).contains(
                'Попробуйте ещё раз.',
            );
            cy.get(`[data-test-id=${DATA_TEST_ID.modalErrorUserTrainingButton}]`)
                .contains('Обновить')
                .click();
            cy.wait('@getTrainingList').should(({ request }) => {
                expect(request.headers, 'request headers').to.include({
                    authorization: 'Bearer SUPERUSER',
                });
            });
            cy.get(`[data-test-id=${DATA_TEST_ID.modalErrorUserTrainingButton}]`).click();
            cy.wait('@getTrainingList').should(({ request }) => {
                expect(request.headers, 'request headers').to.include({
                    authorization: 'Bearer SUPERUSER',
                });
            });
            cy.get(`[data-test-id=${DATA_TEST_ID.modalErrorUserTrainingButton}]`).click();
            cy.wait('@getTrainingList').should(({ request }) => {
                expect(request.headers, 'request headers').to.include({
                    authorization: 'Bearer SUPERUSER',
                });
            });
            cy.get(`[data-test-id=${DATA_TEST_ID.modalErrorUserTrainingButtonClose}]`).click();
            cy.get('[title=2024-01-01]').should('not.include.text', 'Ноги');
        });

        it('First review', () => {
            cy.intercept('GET', 'catalogs/training-list', {
                body: [
                    { name: 'Ноги' },
                    { name: 'Кардио' },
                    { name: 'Силовая' },
                    { name: 'Спина' },
                    { name: 'Грудь' },
                ],
                statusCode: 200,
            }).as('getTrainingList');

            cy.intercept('GET', 'training', {
                body: userTraining,
                statusCode: 200,
            }).as('getUserTraining');

            cy.get(`[data-test-id=${DATA_TEST_ID.menuButtonCalendar}]`).click();
            cy.wait('@getUserTraining').should(({ request }) => {
                expect(request.headers, 'request headers').to.include({
                    authorization: 'Bearer SUPERUSER',
                });
            });
            cy.wait('@getTrainingList').should(({ request }) => {
                expect(request.headers, 'request headers').to.include({
                    authorization: 'Bearer SUPERUSER',
                });
            });
            cy.url().should('include', '/calendar');
            cy.get('[title=2024-01-01]').contains('Ноги');
            cy.get('[title=2024-01-01]').click();
        });
    });
});
