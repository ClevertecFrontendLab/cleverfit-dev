/// <reference types="cypress" />

import { DATA_TEST_ID } from '../mocks/data-test-id';

describe('Sprint 5', () => {
    const resolutions = [
        { width: 360, height: 740 },
        { width: 833, height: 900 },
        { width: 1440, height: 900 },
    ];

    function takeScreenshots(screenshotName: string) {
        cy.wait(1000);
        for (let i = 0; i < resolutions.length; i++) {
            cy.viewport(resolutions[i].width, resolutions[i].height);
            cy.screenshot(`${screenshotName}_${resolutions[i].width}x${resolutions[i].height}`, {
                capture: 'viewport',
            });
        }
    }

    beforeEach(() => {
        cy.visit('/');
        cy.intercept('POST', 'auth/login', { accessToken: 'SUPERUSER' }).as('login');
        cy.visit('/auth');
        cy.get('[data-test-id=login-email]').type('valadzkoaliaksei@tut.by');
        cy.get('[data-test-id=login-password]').type('1234qqQQ');
        cy.get('[data-test-id=login-submit-button]').click();
        cy.url().should('include', '/main');
    });

    it('profile page', () => {
        cy.intercept('GET', 'me', {
            statusCode: 200,
            body: {
                email: 'valadzkoaliaksei@tut.by',
                readyForJointTraining: false,
                sendNotification: false,
            },
        }).as('getUser');
        cy.wait('@getUser');
        cy.get(`[data-test-id=${DATA_TEST_ID.menuButtonProfile}]`).click();
        cy.url().should('include', '/profile');

        takeScreenshots('default-profile-page');
        cy.get('[data-test-id=profile-avatar]').contains('Загрузить фото профиля');
        cy.get('[data-test-id=profile-name]').invoke('val').should('equal', '');
        cy.get('[data-test-id=profile-surname]').invoke('val').should('equal', '');
        cy.get('[data-test-id=profile-birthday]').invoke('val').should('equal', '');
        cy.get('[data-test-id=profile-email]')
            .invoke('val')
            .should('equal', 'valadzkoaliaksei@tut.by');
        cy.get('[data-test-id=profile-password]').invoke('val').should('equal', '');
        cy.get('[data-test-id=profile-repeat-password]').invoke('val').should('equal', '');
        cy.get('[data-test-id=profile-submit]').should('be.disabled');

        cy.get('input[type=file]').selectFile('cypress/fixtures/image.png', {
            force: true,
        });
        cy.intercept('POST', 'upload-image', {
            statusCode: 409,
            error: 'Conflict',
            message: 'Файл слишком большой',
        }).as('uploadBigFile');
        cy.wait('@uploadBigFile');
        cy.get('[data-test-id=profile-modal-close-button').should('be.visible');
        takeScreenshots('modal-big-photo');
        cy.get('[data-test-id=profile-modal-close-button').click();
        cy.get('[data-test-id=profile-submit]').should('be.disabled');
        takeScreenshots('uploading-avatar-error');

        cy.get('input[type=file]').selectFile('cypress/fixtures/image2.png', {
            force: true,
        });
        cy.intercept('POST', 'upload-image', {
            statusCode: 200,
            body: {
                name: '65df1fc091548a261a8f8c97.png',
                url: '/media/avatar/65df1fc091548a261a8f8c97.png',
            },
        }).as('uploadFile');
        cy.wait('@uploadFile');
        cy.get('[data-test-id=profile-submit]').should('be.enabled');

        cy.intercept('PUT', 'user', {
            statusCode: 200,
            body: {
                imgSrc: 'https://training-api.clevertec.ru/media/avatar/65df1fc091548a261a8f8c97.png',
                firstName: 'Виктор',
                lastName: 'Бадунов',
                birthday: '2000-02-05T17:18:46.204Z',
                email: 'victorbyden@gmail.com',
            },
        }).as('updateUser');
        cy.get('[data-test-id=profile-name]').type('Виктор');
        cy.get('[data-test-id=profile-surname]').type('Бадунов');
        cy.get('[data-test-id=profile-email]').clear();
        cy.get('[data-test-id=profile-email]').type('victorbyden@gmail.com');
        cy.get('[data-test-id=profile-birthday]').click();
        cy.get('[data-test-id=profile-birthday]').type('05.02.2000{enter}');
        cy.get('[data-test-id=profile-birthday]').invoke('val').should('equal', '05.02.2000');
        cy.get('[data-test-id=profile-password]').type('1234qqQQ');
        cy.get('[data-test-id=profile-repeat-password]').type('1234qqQQ');
        cy.get('[data-test-id=profile-submit]').click();
        cy.wait('@updateUser');
        cy.wait(1000);
        cy.get('[data-test-id=alert]')
            .should('be.visible')
            .contains('Данные профиля успешно обновлены');
        cy.get('[data-test-id=profile-submit]').should('be.disabled');
        takeScreenshots('modal-success');
        cy.get('[data-test-id=alert]').within(() => cy.get('button').click());

        cy.get('[data-test-id=sidebar-achivements]').click();
        cy.get('[data-test-id=sidebar-profile]').click();
        cy.url().should('include', '/profile');
        cy.get('[data-test-id=profile-avatar]').within(() => {
            cy.get('img')
                .should('have.attr', 'src')
                .should(
                    'include',
                    'https://training-api.clevertec.ru/media/avatar/65df1fc091548a261a8f8c97.png',
                );
        });
        cy.get('[data-test-id=profile-name]').invoke('val').should('equal', 'Виктор');
        cy.get('[data-test-id=profile-surname]').invoke('val').should('equal', 'Бадунов');
        cy.get('[data-test-id=profile-birthday]').invoke('val').should('equal', '05.02.2000');
        cy.get('[data-test-id=profile-email]')
            .invoke('val')
            .should('equal', 'victorbyden@gmail.com');
        cy.get('[data-test-id=profile-password]').invoke('val').should('equal', '');
        cy.get('[data-test-id=profile-repeat-password]').invoke('val').should('equal', '');
        cy.get('[data-test-id=profile-submit]').should('be.disabled');

        cy.intercept('PUT', 'user', {
            statusCode: 500,
            body: {
                error: '',
                message: '',
            },
        }).as('updateUserWithError');
        cy.get('[data-test-id=profile-name]').clear();
        cy.get('[data-test-id=profile-name]').type('Матвей');
        cy.get('[data-test-id=profile-password]').type('1234qqQQ');
        cy.get('[data-test-id=profile-repeat-password]').type('1234qqQQ');
        cy.get('[data-test-id=profile-submit]').should('be.enabled');
        cy.get('[data-test-id=profile-submit]').click();
        cy.wait('@updateUserWithError');
        cy.wait(1000);
        cy.get('[data-test-id=profile-error-button]').should('be.visible');
        takeScreenshots('modal-error');
    });

    it('profile page with google photo', () => {
        cy.intercept('GET', 'me', {
            statusCode: 200,
            body: {
                email: 'valadzkoaliaksei@tut.by',
                imgSrc: 'https://lh3.googleusercontent.com/a/ACg8ocK7Zxx6eMSuA-4_oUDsUIoh-RERhwB6mjReSs5L_kjQeg=s96-c',
                readyForJointTraining: false,
                sendNotification: false,
            },
        }).as('getUser');
        cy.wait('@getUser');
        cy.get(`[data-test-id=${DATA_TEST_ID.menuButtonProfile}]`).click();
        cy.url().should('include', '/profile');
        cy.get('[data-test-id=profile-avatar]').within(() => {
            cy.get('img')
                .should('have.attr', 'src')
                .should(
                    'include',
                    'https://lh3.googleusercontent.com/a/ACg8ocK7Zxx6eMSuA-4_oUDsUIoh-RERhwB6mjReSs5L_kjQeg=s96-c',
                );
        });
        cy.get('[data-test-id=profile-submit]').should('be.disabled');

        cy.get('[data-test-id=settings]').click();
        cy.url().should('include', '/settings');
        cy.get('[data-test-id=settings-back]').click();
        cy.url().should('include', '/profile');
    });

    it('settings page', () => {
        cy.intercept('GET', 'me', {
            statusCode: 200,
            body: {
                email: 'valadzkoaliaksei@tut.by',
                readyForJointTraining: false,
                sendNotification: false,
            },
        }).as('getUser');
        cy.intercept('GET', 'tariff-list', {
            statusCode: 200,
            body: [
                {
                    _id: '65df21ca9013cb64beacbd56',
                    name: 'Pro',
                    periods: [
                        {
                            text: '6 месяцев',
                            cost: 5.5,
                            days: 182,
                        },
                        {
                            text: '9 месяцев',
                            cost: 8.5,
                            days: 274,
                        },
                        {
                            text: '12 месяцев',
                            cost: 10,
                            days: 365,
                        },
                    ],
                },
            ],
        }).as('getTarifList');
        cy.wait('@getUser');

        cy.get('[data-test-id=settings]').click();
        cy.url().should('include', '/settings');
        cy.get('[data-test-id=settings-back]').click();
        cy.url().should('include', '/main');
        cy.get('[data-test-id=settings]').click();

        // карточки
        cy.wait('@getTarifList');
        cy.get('[data-test-id=pro-tarif-card]').within(() => {
            cy.get('[data-test-id=activate-tarif]').should('be.visible');
        });

        // опции
        cy.get('[data-test-id=tarif-trainings]').should('have.attr', 'aria-checked', 'false');
        cy.get('[data-test-id=tarif-notifications]').should('have.attr', 'aria-checked', 'false');
        cy.get('[data-test-id=tarif-theme]').should('have.attr', 'aria-checked', 'false');
        cy.get('[data-test-id=tarif-theme]').should('be.disabled');
        takeScreenshots('default-settings-page');
        cy.get('[data-test-id=tarif-trainings-icon]').trigger('mouseover');
        cy.contains('включеная функция позволит участвовать в совместных тренировках').should(
            'be.visible',
        );
        cy.get('[data-test-id=tarif-trainings-icon]').trigger('mouseout');
        cy.get('[data-test-id=tarif-notifications-icon]').trigger('mouseover');
        cy.contains('включеная функция позволит получать уведомления об активностях').should(
            'be.visible',
        );
        cy.get('[data-test-id=tarif-notifications-icon]').trigger('mouseout');
        cy.get('[data-test-id=tarif-theme-icon]').trigger('mouseover');
        cy.contains('темная тема доступна для PRO tarif').should('be.visible');
        takeScreenshots('hover-option');
        cy.get('[data-test-id=tarif-theme-icon]').trigger('mouseout');

        // отобразить тарифы,дизейбл кнопки
        cy.get('[data-test-id=compare-tarifs]').should('not.exist');
        cy.get('[data-test-id=free-tarif-card]').within(() => {
            cy.contains('Подробнее').click();
        });
        cy.get('[data-test-id=compare-tarifs]').should('exist').should('be.visible');
        cy.get('[data-test-id=tarif-cost]').contains('6 месяцев');
        cy.get('[data-test-id=tarif-cost]').contains('9 месяцев');
        cy.get('[data-test-id=tarif-cost]').contains('12 месяцев');
        cy.get('[data-test-id=tarif-cost]').contains('5,5');
        cy.get('[data-test-id=tarif-cost]').contains('8,5');
        cy.get('[data-test-id=tarif-cost]').contains('10');
        takeScreenshots('settings-page-with-sider');

        // отправить запрос, модалка
        cy.intercept('POST', 'tariff', {
            statusCode: 200,
            body: {},
        }).as('buyTarif');
        cy.get('[data-test-id=tarif-submit]').should('be.disabled');
        cy.get('[data-test-id=tarif-10]').click();
        cy.get('[data-test-id=tarif-submit]').should('be.enabled');
        cy.get('[data-test-id=tarif-submit]').click();
        cy.wait('@buyTarif');
        cy.get('[data-test-id=tarif-modal-success]')
            .contains('valadzkoaliaksei@tut.by')
            .should('be.visible');
        cy.get('[data-test-id=compare-tarifs]').should('not.exist');
        takeScreenshots('buy-tarif-success');
        cy.get('[data-test-id=tarif-modal-success]').within(() => {
            cy.get('button').first().click();
        });
        cy.url().should('include', '/auth');
    });

    it('settings page pro', () => {
        cy.intercept('GET', 'me', {
            statusCode: 200,
            body: {
                email: 'valadzkoaliaksei@tut.by',
                readyForJointTraining: true,
                sendNotification: false,
                tariff: {
                    tariffId: '65df21ca9013cb64beacbd56',
                    expired: '2025-02-27T21:21:39.381Z',
                },
            },
        }).as('getUser');
        cy.intercept('GET', 'tariff-list', {
            statusCode: 200,
            body: [
                {
                    _id: '65df21ca9013cb64beacbd56',
                    name: 'Pro',
                    periods: [
                        {
                            text: '6 месяцев',
                            cost: 5.5,
                            days: 182,
                        },
                        {
                            text: '9 месяцев',
                            cost: 8.5,
                            days: 274,
                        },
                        {
                            text: '12 месяцев',
                            cost: 10,
                            days: 365,
                        },
                    ],
                },
            ],
        }).as('getTarifList');
        cy.wait('@getUser');
        cy.get('[data-test-id=settings]').click();

        // карточки
        cy.wait('@getTarifList');
        cy.get('[data-test-id=pro-tarif-card]').within(() => {
            cy.contains('активен до 02.28').should('be.visible');
        });
        takeScreenshots('settings-pro-cards');

        // опции
        cy.intercept('PUT', 'user', {
            statusCode: 200,
            body: {
                email: 'valadzkoaliaksei@tut.by',
                readyForJointTraining: false,
                sendNotification: false,
                tariff: {
                    tariffId: '65df21ca9013cb64beacbd56',
                    expired: '2025-02-27T21:21:39.381Z',
                },
            },
        }).as('updateUserTrainings');
        cy.get('[data-test-id=tarif-trainings]').should('have.attr', 'aria-checked', 'true');
        cy.get('[data-test-id=tarif-notifications]').should('have.attr', 'aria-checked', 'false');
        cy.get('[data-test-id=tarif-theme]').should('have.attr', 'aria-checked', 'false');
        cy.get('[data-test-id=tarif-theme]').should('be.enabled');
        cy.get('[data-test-id=tarif-trainings]').click();
        cy.wait('@updateUserTrainings');
        cy.intercept('PUT', 'user', {
            statusCode: 200,
            body: {
                email: 'valadzkoaliaksei@tut.by',
                readyForJointTraining: false,
                sendNotification: true,
                tariff: {
                    tariffId: '65df21ca9013cb64beacbd56',
                    expired: '2025-02-27T21:21:39.381Z',
                },
            },
        }).as('updateUserNotifications');
        cy.get('[data-test-id=tarif-trainings]').should('have.attr', 'aria-checked', 'false');
        cy.get('[data-test-id=tarif-notifications]').click();
        cy.wait('@updateUserNotifications');
        cy.get('[data-test-id=tarif-notifications]').should('have.attr', 'aria-checked', 'true');
        takeScreenshots('settings-options-pro');

        // сайдер
        cy.get('[data-test-id=free-tarif-card]').within(() => {
            cy.contains('Подробнее').click();
        });
        cy.get('[data-test-id=compare-tarifs]')
            .should('exist')
            .should('be.visible')
            .within(() => {
                cy.contains('Ваш PRO tarif активен до 02.28').should('be.visible');
                cy.contains('Выбрать и оплатить').should('not.exist');
                cy.get('[data-test-id=tarif-cost]').should('not.exist');
            });
        takeScreenshots('settings-sider-pro');
    });

    it('feedbacks', () => {
        cy.intercept('GET', 'me', {
            statusCode: 200,
            body: {
                email: 'valadzkoaliaksei@tut.by',
                readyForJointTraining: false,
                sendNotification: false,
            },
        }).as('getUser');
        cy.intercept('GET', 'tariff-list', {
            statusCode: 200,
            body: [
                {
                    _id: '65df21ca9013cb64beacbd56',
                    name: 'Pro',
                    periods: [
                        {
                            text: '6 месяцев',
                            cost: 5.5,
                            days: 182,
                        },
                        {
                            text: '9 месяцев',
                            cost: 8.5,
                            days: 274,
                        },
                        {
                            text: '12 месяцев',
                            cost: 10,
                            days: 365,
                        },
                    ],
                },
            ],
        }).as('getTarifList');
        cy.wait('@getUser');
        cy.get('[data-test-id=settings]').click();
        cy.wait('@getTarifList');
        cy.intercept('GET', 'feedback', {
            statusCode: 200,
            body: [
                {
                    id: '65e4566b55c4a5796d525bd7',
                    fullName: 'Геннадий Сугаков',
                    imageSrc:
                        'https://lh3.googleusercontent.com/a/ACg8ocIs5m7cLVsb2UqRVPpFTv_imE_EOSlNMdwidbUNPqE0=s96-c',
                    message: 'really cool app',
                    rating: 5,
                    createdAt: '2024-03-03T10:52:27.796Z',
                },
                {
                    id: '65e4568855c4a5796d525e57',
                    fullName: null,
                    imageSrc: null,
                    message: 'sadfsdafsd',
                    rating: 3,
                    createdAt: '2024-03-03T10:52:56.749Z',
                },
                {
                    id: '65e4568855c4a5796d525e58',
                    fullName: null,
                    imageSrc: null,
                    message: 'sadfsdafsd',
                    rating: 3,
                    createdAt: '2024-03-03T10:52:57.749Z',
                },
                {
                    id: '65e4568855c4a5796d525579',
                    fullName: null,
                    message: 'sadfsdafsd',
                    rating: 3,
                    imageSrc:
                        'https://training-api.clevertec.ru/media/avatar/65df1fc091548a261a8f8c97.png',
                    createdAt: '2024-03-03T10:52:58.749Z',
                },
            ],
        }).as('getFeedbacks');

        cy.contains('Смотреть все отзывы').click();
        cy.url().should('include', '/feedbacks');
        cy.wait('@getFeedbacks');
        cy.get('[data-test-id=reviews-cards]').within(() => {
            cy.get('img').each(($el, idx) => {
                if (idx === 0) {
                    cy.wrap($el)
                        .should('have.attr', 'src')
                        .should(
                            'include',
                            'https://lh3.googleusercontent.com/a/ACg8ocIs5m7cLVsb2UqRVPpFTv_imE_EOSlNMdwidbUNPqE0=s96-c',
                        );
                }

                if (idx === 3) {
                    cy.wrap($el)
                        .should('have.attr', 'src')
                        .should(
                            'include',
                            'https://training-api.clevertec.ru/media/avatar/65df1fc091548a261a8f8c97.png',
                        );
                }
            });
        });
        takeScreenshots('feedbacks with photo');
        cy.go('back');

        cy.contains('Написать отзыв').click();
        cy.get('[data-test-id=new-review-submit-button]').should('be.visible');
    });
});
