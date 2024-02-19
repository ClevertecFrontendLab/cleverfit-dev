/// <reference types="cypress" />

import moment from 'moment';

import { FORMAT_D_M_Y_POINT, FORMAT_Y_M_D } from '../../src/utils/format-date';
import { DATA_TEST_ID } from '../mocks/data-test-id';

const userTraining = [
    {
        _id: '1',
        name: 'Ноги',
        date: moment(),
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        exercises: [
            {
                _id: '1',
                name: 'Присяд',
                replays: 3,
                weight: 50,
                approaches: 10,
            },
            {
                _id: '2',
                name: 'Толкание нагрузки',
                replays: 3,
                weight: 70,
                approaches: 10,
            },
        ],
    },
    {
        _id: '2',
        name: 'Руки',
        date: moment(),
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
    {
        _id: '3',
        name: 'Ноги',
        date: moment().add(2, 'day'),
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
        _id: '4',
        name: 'Руки',
        date: moment().add(2, 'day'),
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
        _id: '5',
        name: 'Силовая',
        date: moment().add(2, 'day'),
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
        _id: '6',
        name: 'Спина',
        date: moment().add(2, 'day'),
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
        _id: '7',
        name: 'Грудь',
        date: moment().add(2, 'day'),
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
        _id: '8',
        name: 'Ноги',
        date: moment().add(3, 'day'),
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        exercises: [
            {
                _id: '1',
                name: 'Присяд',
                replays: 3,
                weight: 50,
                approaches: 10,
            },
            {
                _id: '2',
                name: 'Толкание нагрузки',
                replays: 3,
                weight: 70,
                approaches: 10,
            },
        ],
    },
    {
        _id: '9',
        name: 'Руки',
        date: moment().add(3, 'day'),
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
        _id: '10',
        name: 'Силовая',
        date: moment().add(3, 'day'),
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
        _id: '11',
        name: 'Грудь',
        date: moment().add(3, 'day'),
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
];

const postUserTraining = {
    isImplementation: false,
    id: '',
    name: 'Спина',
    exercises: [
        { name: 'Становая тяга', approaches: 10, weight: 50, replays: 3, index: 0 },
        { name: 'Сведение лопаток', approaches: 10, weight: 50, replays: 3, index: 1 },
    ],
    date: moment().add(1, 'day'),
};

function returnUpdateUserTraining(id: string, date: moment.Moment, isImplementation: boolean) {
    return {
        isImplementation,
        id,
        name: 'Ноги',
        exercises: [
            {
                _id: '1',
                name: 'Присяд',
                replays: 3,
                weight: 50,
                approaches: 10,
            },
            {
                _id: '2',
                name: 'Прыжки с нагрузкой',
                replays: 3,
                weight: 50,
                approaches: 10,
                isImplementation: false,
            },
        ],
        date,
    };
}

const newUserTraining = {
    _id: '3',
    name: 'Спина',
    date: moment().add(1, 'day'),
    isImplementation: false,
    userId: '65b809899adc9e39e3660ae0',
    exercises: [
        {
            _id: '3',
            name: 'Становая тяга',
            replays: 3,
            weight: 50,
            approaches: 10,
        },
        {
            _id: '4',
            name: 'Сведение лопаток',
            replays: 3,
            weight: 50,
            approaches: 10,
        },
    ],
};

const trainingList = [
    { name: 'Ноги' },
    { name: 'Руки' },
    { name: 'Силовая' },
    { name: 'Спина' },
    { name: 'Грудь' },
];

const trainingArray = ['Ноги', 'Руки', 'Силовая', 'Спина', 'Грудь'];

function reduceItem(arr1: any[], arr2: string[], data: moment.Moment) {
    return arr2.filter(
        (training) =>
            !arr1.some(
                (userTrainingItem) =>
                    userTrainingItem.date.isSame(data) && userTrainingItem.name === training,
            ),
    );
}

const remainingSelectOptions = reduceItem(userTraining, trainingArray, moment().add(3, 'day'));

describe('Sprint 4', () => {
    describe('Calendar', () => {
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

        function selectDropdown(testId: string, optionText: string) {
            cy.get(testId).click();

            return cy
                .get('.ant-select-dropdown :not(.ant-select-dropdown-hidden)')
                .find('.ant-select-item-option')
                .each((el) => {
                    if (el.text() === optionText) {
                        cy.wrap(el).click();
                    }
                });
        }

        function limitedSelectDropdown(testId: string) {
            cy.get(testId).click();

            return cy
                .get('.ant-select-dropdown :not(.ant-select-dropdown-hidden)')
                .find('.ant-select-item-option')
                .should('have.length', remainingSelectOptions.length)
                .each((el) => {
                    cy.wrap(el)
                        .invoke('text')
                        .then((text) => {
                            expect(remainingSelectOptions).to.include(text.trim());
                        });
                });
        }

        function generalBlockCreatingTrainings() {
            // TODO нужен скриншот
            cy.get(`[data-test-id=${DATA_TEST_ID.modalCreateTraining}]`)
                .should('be.exist')
                .contains('Создать тренировку')
                .click();
            cy.get(`[data-test-id=${DATA_TEST_ID.modalCreateExercise}]`)
                .should('be.exist')
                .contains('Добавить упражнения')
                .should('be.disabled');
            cy.get(`[data-test-id=${DATA_TEST_ID.modalExerciseTrainingButtonClose}]`).click();
            cy.get(`[data-test-id=${DATA_TEST_ID.modalCreateTraining}]`)
                .should('be.exist')
                .contains('Создать тренировку')
                .click();
            selectDropdown(`[data-test-id=${DATA_TEST_ID.modalCreateExerciseSelect}]`, 'Спина');
            cy.get(`[data-test-id=${DATA_TEST_ID.modalCreateExercise}]`)
                .contains('Добавить упражнения')
                .click();
            // TODO нужен скриншот
            cy.get(`[data-test-id=${DATA_TEST_ID.modalDrawerRight}]`).should('be.visible');
            cy.get(`[data-test-id=${DATA_TEST_ID.modalDrawerRightButtonClose}]`).click();
            cy.get(`[data-test-id=${DATA_TEST_ID.modalCreateExercise}]`).within(() => {
                cy.contains('Сохранить').should('be.disabled');
                cy.contains('Добавить упражнения').click();
            });
            cy.get(`[data-test-id=${DATA_TEST_ID.modalDrawerRight}]`).within(() => {
                cy.contains('Добавление упражнений').should('exist');
                cy.contains(`${moment().add(1, 'day').format(FORMAT_D_M_Y_POINT)}`).should('exist');
                cy.contains('Спина').should('exist');
            });
            cy.get(`[data-test-id=${DATA_TEST_ID.modalDrawerRightInputExercise}${0}]`).type(
                'Становая тяга',
            );
            cy.get(`[data-test-id=${DATA_TEST_ID.modalDrawerRightInputApproach}${0}]`)
                .clear()
                .type('3');
            cy.get(`[data-test-id=${DATA_TEST_ID.modalDrawerRightInputWeight}${0}]`)
                .clear()
                .type('50');
            cy.get(`[data-test-id=${DATA_TEST_ID.modalDrawerRightInputQuantity}${0}]`)
                .clear()
                .type('10');
            cy.contains('Добавить ещё').click();
            cy.get(`[data-test-id=${DATA_TEST_ID.modalDrawerRightInputExercise}${1}]`).type(
                'Сведение лопаток',
            );
            cy.get(`[data-test-id=${DATA_TEST_ID.modalDrawerRightInputApproach}${1}]`)
                .clear()
                .type('3');
            cy.get(`[data-test-id=${DATA_TEST_ID.modalDrawerRightInputWeight}${1}]`)
                .clear()
                .type('50');
            cy.get(`[data-test-id=${DATA_TEST_ID.modalDrawerRightInputQuantity}${1}]`)
                .clear()
                .type('10');
            // TODO нужен скриншот
            cy.get(`[data-test-id=${DATA_TEST_ID.modalDrawerRightButtonClose}]`).click();
        }

        function generalBlockUpdatingTrainings(data: moment.Moment) {
            cy.get(`[data-test-id=${DATA_TEST_ID.modalUpdateTrainingEditButton}${0}]`)
                .should('be.visible')
                .click();
            cy.get(`[data-test-id=${DATA_TEST_ID.modalCreateExercise}]`).within(() => {
                cy.contains('Присяд').should('exist');
                cy.contains('Толкание нагрузки').should('exist');
            });
            cy.get(`[data-test-id=${DATA_TEST_ID.modalUpdateTrainingEditButton}${0}]`)
                .should('be.visible')
                .click();
            cy.get(`[data-test-id=${DATA_TEST_ID.modalDrawerRight}]`).within(() => {
                cy.contains('Редактирование').should('exist');
                cy.contains(`${data.format(FORMAT_D_M_Y_POINT)}`).should('exist');
                cy.contains('Ноги').should('exist');
                cy.contains('Удалить').should('be.disabled');
            });
            cy.get(`[data-test-id=${DATA_TEST_ID.modalDrawerRightInputExercise}${0}]`)
                .invoke('val')
                .should('equal', 'Присяд');
            cy.get(`[data-test-id=${DATA_TEST_ID.modalDrawerRightInputExercise}${1}]`)
                .invoke('val')
                .should('equal', 'Толкание нагрузки');
            cy.contains('Добавить ещё').click();
            cy.get(`[data-test-id=${DATA_TEST_ID.modalDrawerRightInputExercise}${2}]`).type(
                'Прыжки с нагрузкой',
            );
            cy.get(`[data-test-id=${DATA_TEST_ID.modalDrawerRightInputApproach}${2}]`)
                .clear()
                .type('3');
            cy.get(`[data-test-id=${DATA_TEST_ID.modalDrawerRightInputWeight}${2}]`)
                .clear()
                .type('50');
            cy.get(`[data-test-id=${DATA_TEST_ID.modalDrawerRightInputQuantity}${2}]`)
                .clear()
                .type('10');
            cy.get(`[data-test-id=${DATA_TEST_ID.modalDrawerRightCheckboxExercise}${1}]`).check();
            cy.contains('Удалить').click();
            cy.get(`[data-test-id=${DATA_TEST_ID.modalDrawerRightInputExercise}${1}]`)
                .invoke('val')
                .should('equal', 'Прыжки с нагрузкой');
            cy.get(`[data-test-id=${DATA_TEST_ID.modalDrawerRightButtonClose}]`).click();
        }
        function goToCalendar() {
            cy.intercept('GET', 'catalogs/training-list', {
                body: trainingList,
                statusCode: 200,
            }).as('getTrainingList');

            cy.intercept('GET', 'training', {
                body: userTraining,
                statusCode: 200,
            }).as('getUserTraining');

            cy.intercept('POST', 'training', {
                statusCode: 500,
            }).as('postUserTraining');

            cy.intercept('PUT', 'training/8', {
                statusCode: 404,
            }).as('putUserTraining');

            cy.get(`[data-test-id=${DATA_TEST_ID.menuButtonCalendar}]`).click();
            cy.wait('@getUserTraining');
            cy.wait('@getTrainingList');
            cy.url().should('include', '/calendar');
            cy.get(`[title=${moment().format(FORMAT_Y_M_D)}]`).contains('Ноги');
        }

        function errorModal() {
            cy.get(`[data-test-id=${DATA_TEST_ID.modalErrorUserTrainingTitle}]`).contains(
                'При сохранении данных произошла ошибка',
            );
            cy.get(`[data-test-id=${DATA_TEST_ID.modalErrorUserTrainingSubTitle}]`).contains(
                'Придётся попробовать ещё раз',
            );
            takeScreenshots('update-training');
            cy.get(`[data-test-id=${DATA_TEST_ID.modalErrorUserTrainingButton}]`)
                .contains('Закрыть')
                .click();
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

        it('come to calendar', () => {
            cy.intercept('GET', 'training', {
                statusCode: 404,
            }).as('getUserTraining');
            cy.intercept('GET', 'catalogs/training-list', {
                statusCode: 500,
            }).as('getTrainingList');
            cy.get(`[data-test-id=${DATA_TEST_ID.menuButtonCalendar}]`).click();
            cy.wait('@getUserTraining');
            cy.url().should('include', '/main');
            takeScreenshots('get-training-error');
            cy.get(`[data-test-id=${DATA_TEST_ID.modalNoReview}]`).within(() => {
                cy.contains('Что-то пошло не так');
                cy.contains('Произошла ошибка, попробуйте ещё раз.');
                cy.contains('Назад').click();
            });
            cy.url().should('include', '/main');
            cy.intercept('GET', 'training', {
                body: userTraining,
                statusCode: 200,
            }).as('getUserTraining');
            cy.get(`[data-test-id=${DATA_TEST_ID.menuButtonCalendar}]`).click();
            cy.wait('@getUserTraining');
            cy.wait('@getTrainingList');
            cy.url().should('include', '/calendar');
            takeScreenshots('get-training-list-error');
            cy.get(`[data-test-id=${DATA_TEST_ID.modalErrorUserTrainingButton}]`).click();
            cy.wait('@getTrainingList');
            cy.get(`[data-test-id=${DATA_TEST_ID.modalErrorUserTrainingButtonClose}]`).click();
            cy.url().should('include', '/calendar');
            takeScreenshots('empty-calendar-page');
            cy.contains('Ноги').should('not.exist');
            cy.intercept('GET', 'catalogs/training-list', {
                body: trainingList,
                statusCode: 200,
            }).as('getTrainingList');
            cy.contains('Главная').click();
            cy.get(`[data-test-id=${DATA_TEST_ID.menuButtonCalendar}]`).click();
            cy.wait('@getUserTraining');
            cy.wait('@getTrainingList');
            cy.wait(1000);
            takeScreenshots('calendar-page');
            cy.contains('Ноги').should('be.exist');
        });

        it('create new training', () => {
            goToCalendar();
            // TODO Проверка на закрытие модалки
            cy.get(`[title=${moment().format(FORMAT_Y_M_D)}]`).click();
            cy.get(`[data-test-id=${DATA_TEST_ID.modalCreateTrainingButtonClose}]`).click();
            cy.get(`[data-test-id=${DATA_TEST_ID.modalCreateTraining}]`).should('not.exist');
            // TODO Проверка на то что нельзя создать новую тренировку сегодня и в прошлом
            cy.get(`[title=${moment().format(FORMAT_Y_M_D)}]`).click();
            cy.get(`[data-test-id=${DATA_TEST_ID.modalCreateTraining}]`)
                .should('be.exist')
                .contains('Создать тренировку')
                .should('be.disabled');
            cy.get(`[title=${moment().subtract(1, 'day').format(FORMAT_Y_M_D)}]`).click();
            cy.get(`[data-test-id=${DATA_TEST_ID.modalCreateTraining}]`)
                .should('be.exist')
                .contains('Создать тренировку')
                .should('be.disabled');
            // TODO: Нужен скриншот
            // TODO  Проверка на ошибку создания тренировки
            cy.get(`[title=${moment().add(1, 'day').format(FORMAT_Y_M_D)}]`).click();
            generalBlockCreatingTrainings();
            cy.get(`[data-test-id=${DATA_TEST_ID.modalCreateExercise}]`).within(() => {
                cy.contains('Становая тяга').should('exist');
                cy.contains('Сведение лопаток').should('exist');
                // TODO: Нужен скриншот
                cy.contains('Сохранить').click();
            });
            cy.wait('@postUserTraining');
            errorModal();
            cy.get(`[title=${moment().add(1, 'day').format(FORMAT_Y_M_D)}]`)
                .contains('Спина')
                .should('not.exist');
            // TODO  Проверка на успех создания тренировки
            cy.get(`[title=${moment().add(1, 'day').format(FORMAT_Y_M_D)}]`).click();
            generalBlockCreatingTrainings();
            cy.intercept('POST', 'training', {
                body: postUserTraining,
                statusCode: 200,
            }).as('postUserTraining');
            cy.intercept('GET', 'training', {
                body: [...userTraining, newUserTraining],
                statusCode: 200,
            }).as('getUserTraining');
            cy.get(`[data-test-id=${DATA_TEST_ID.modalCreateExercise}]`).within(() => {
                cy.contains('Становая тяга').should('exist');
                cy.contains('Сведение лопаток').should('exist');
                cy.contains('Сохранить').click();
            });
            cy.wait('@postUserTraining');
            cy.wait('@getUserTraining');
            cy.get(`[title=${moment().add(1, 'day').format(FORMAT_Y_M_D)}]`)
                .contains('Спина')
                .should('exist');
            cy.get(`[data-test-id=${DATA_TEST_ID.modalCreateTrainingButtonClose}]`).click();
            // TODO Проверка на то, что если заполнены все пять типов тренировок в этот день, то больше тренировки нельзя создать
            cy.get(`[title=${moment().add(2, 'day').format(FORMAT_Y_M_D)}]`).click();
            cy.get(`[data-test-id=${DATA_TEST_ID.modalCreateTraining}]`)
                .should('be.exist')
                .contains('Создать тренировку')
                .should('be.disabled');
            cy.get(`[data-test-id=${DATA_TEST_ID.modalCreateTrainingButtonClose}]`).click();
            // TODO Проверка на наличие в селекте только тех значений тренировок, которые ещё не выбраны
            cy.get(`[title=${moment().add(3, 'day').format(FORMAT_Y_M_D)}]`).click();
            cy.get(`[data-test-id=${DATA_TEST_ID.modalCreateTraining}]`)
                .contains('Создать тренировку')
                .click();
            limitedSelectDropdown(`[data-test-id=${DATA_TEST_ID.modalCreateExerciseSelect}]`);
        });
        it('update future trainings', () => {
            goToCalendar();
            // TODO Проверка изменения тренировок будущего с ошибкой сохранения
            cy.get(`[title=${moment().add(3, 'day').format(FORMAT_Y_M_D)}]`).click();
            generalBlockUpdatingTrainings(moment().add(3, 'day'));
            cy.get(`[data-test-id=${DATA_TEST_ID.modalCreateExercise}]`).within(() => {
                cy.contains('Присяд').should('exist');
                cy.contains('Прыжки с нагрузкой').should('exist');
                cy.contains('Толкание нагрузки').should('not.exist');
                // TODO: Нужен скриншот
                cy.contains('Сохранить').click();
            });
            cy.wait('@putUserTraining');
            errorModal();
            // TODO  Проверка на успех изменения тренировки
            cy.get(`[title=${moment().add(3, 'day').format(FORMAT_Y_M_D)}]`).click();
            generalBlockUpdatingTrainings(moment().add(3, 'day'));
            cy.intercept('PUT', 'training/8', {
                statusCode: 200,
            }).as('putUserTraining');
            cy.intercept('GET', 'training', {
                body: userTraining.map((el) =>
                    el._id === '8'
                        ? JSON.parse(
                              JSON.stringify(
                                  returnUpdateUserTraining('8', moment().add(3, 'day'), false),
                              ),
                          )
                        : JSON.parse(JSON.stringify(el)),
                ),
                statusCode: 200,
            }).as('getUserTraining');
            cy.get(`[data-test-id=${DATA_TEST_ID.modalCreateExercise}]`).within(() => {
                cy.contains('Присяд').should('exist');
                cy.contains('Прыжки с нагрузкой').should('exist');
                cy.contains('Сохранить').click();
            });
            cy.wait('@putUserTraining');
            cy.wait('@getUserTraining');
            cy.wait(1000);
            cy.get(`[data-test-id=${DATA_TEST_ID.modalUpdateTrainingEditButton}${0}]`)
                .should('be.visible')
                .click();
            cy.get(`[data-test-id=${DATA_TEST_ID.modalCreateExercise}]`).within(() => {
                cy.contains('Присяд').should('exist');
                cy.contains('Прыжки с нагрузкой').should('exist');
            });
            // TODO сделать скриншот
        });
        it('update past trainings', () => {
            goToCalendar();
            cy.intercept('PUT', 'training/1', {
                statusCode: 404,
            }).as('putUserTraining');
            // TODO Проверка изменения тренировок из проошлого с ошибкой сохранения
            cy.get(`[title=${moment().format(FORMAT_Y_M_D)}]`).click();
            generalBlockUpdatingTrainings(moment());
            cy.get(`[data-test-id=${DATA_TEST_ID.modalCreateExercise}]`).within(() => {
                cy.contains('Присяд').should('exist');
                cy.contains('Прыжки с нагрузкой').should('exist');
                cy.contains('Толкание нагрузки').should('not.exist');
                // TODO: Нужен скриншот
                cy.contains('Сохранить изменения').click();
            });
            cy.wait('@putUserTraining');
            errorModal();
            // TODO  Проверка на успех изменения тренировки
            cy.get(`[title=${moment().format(FORMAT_Y_M_D)}]`).click();
            generalBlockUpdatingTrainings(moment());
            cy.intercept('PUT', 'training/1', {
                statusCode: 200,
            }).as('putUserTraining');
            cy.intercept('GET', 'training', {
                body: userTraining.map((el) =>
                    el._id === '1'
                        ? JSON.parse(JSON.stringify(returnUpdateUserTraining('1', moment(), true)))
                        : JSON.parse(JSON.stringify(el)),
                ),
                statusCode: 200,
            }).as('getUserTraining');
            cy.get(`[data-test-id=${DATA_TEST_ID.modalCreateExercise}]`).within(() => {
                cy.contains('Присяд').should('exist');
                cy.contains('Прыжки с нагрузкой').should('exist');
                cy.contains('Сохранить изменения').click();
            });
            cy.wait('@putUserTraining');
            cy.wait('@getUserTraining');
            cy.wait(1000);
            cy.get(`[data-test-id=${DATA_TEST_ID.modalUpdateTrainingEditButton}${0}]`).should(
                'be.disabled',
            );
        });
    });
});
