/* eslint-disable no-underscore-dangle */
/// <reference types="cypress" />

export const DATA_TEST_ID = {
    createNewTrainingButton: 'create-new-training-button',
    modalNoReview: 'modal-no-review',
    modalErrorUserTrainingTitle: 'modal-error-user-training-title',
    modalErrorUserTrainingSubTitle: 'modal-error-user-training-subtitle',
    modalErrorUserTrainingButton: 'modal-error-user-training-button',
    modalErrorUserTrainingButtonClose: 'modal-error-user-training-button-close',
    menuButtonTraining: 'menu-button-training',
    menuButtonCalendar: 'menu-button-calendar',
    menuButtonProfile: 'menu-button-profile',
    modalCreateTraining: 'modal-create-training',
    modalCreateTrainingButtonClose: 'modal-create-training-button-close',
    modalUpdateTrainingEditButton: 'modal-update-training-edit-button',
    modalCreateExercise: 'modal-create-exercise',
    modalCreateExerciseButton: 'modal-create-exercise-button',
    modalCreateExerciseSelect: 'modal-create-exercise-select',
    modalExerciseTrainingButtonClose: 'modal-exercise-training-button-close',

    modalDrawerRight: 'modal-drawer-right',
    modalDrawerRightButtonClose: 'modal-drawer-right-button-close',
    modalDrawerRightInputExercise: 'modal-drawer-right-input-exercise',
    modalDrawerRightCheckboxExercise: 'modal-drawer-right-checkbox-exercise',
    modalDrawerRightInputApproach: 'modal-drawer-right-input-approach',
    modalDrawerRightInputWeight: 'modal-drawer-right-input-weight',
    modalDrawerRightInputQuantity: 'modal-drawer-right-input-quantity',
    modalDrawerRightDatePicker: 'modal-drawer-right-date-picker',
    modalDrawerRightCheckboxPeriod: 'modal-drawer-right-checkbox-period',
    modalDrawerRightSelectPeriod: 'modal-drawer-right-select-period',

    myTrainingsTable: 'my-trainings-table',
    updateMyTrainingTableIcon: 'update-my-training-table-icon',
    createTrainingSuccessAlert: 'create-training-success-alert',
};

const today = new Date().setDate(new Date().getDate());
const dayAfterTomorrow = new Date().setDate(new Date().getDate() + 1);
const dayBeforeToday = new Date().setDate(new Date().getDate() - 1);
const twoDaysLater = new Date().setDate(new Date().getDate() + 2);
const threeDaysLater = new Date().setDate(new Date().getDate() + 3);

const userTraining = [
    {
        _id: '1',
        name: 'Ноги',
        date: today,
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        parameters: {
            jointTraining: false,
            participants: [],
            period: 6,
            repeat: false,
        },
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
        date: today,
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
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
        date: twoDaysLater,
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
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
        date: twoDaysLater,
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
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
        date: twoDaysLater,
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
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
        date: twoDaysLater,
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
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
        date: twoDaysLater,
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
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
        date: threeDaysLater,
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
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
        date: threeDaysLater,
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
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
        date: threeDaysLater,
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
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
        date: threeDaysLater,
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
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

function returnUpdateUserTraining(id, date, isImplementation: boolean) {
    return {
        isImplementation,
        id,
        name: 'Ноги',
        parameters: {
            jointTraining: false,
            participants: [],
            period: 7,
            repeat: true,
        },
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
    userId: '65b809899adc9e39e3660ae0',
    isImplementation: false,
    id: '12',
    name: 'Спина',
    parameters: {
        jointTraining: false,
        participants: [],
        period: 7,
        repeat: false,
    },
    exercises: [
        { name: 'Становая тяга', approaches: 10, weight: 50, replays: 3, index: 0 },
        { name: 'Сведение лопаток', approaches: 10, weight: 50, replays: 3, index: 1 },
    ],
    date: dayAfterTomorrow,
};

function getFormatDate(date, isStandardFormat) {
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
    const day = String(formattedDate.getDate()).padStart(2, '0');

    return isStandardFormat ? `${year}-${month}-${day}` : `${day}.${month}.${year}`;
}

const trainingList = [
    { name: 'Ноги', key: 'legs' },
    { name: 'Руки', key: 'hands' },
    { name: 'Силовая', key: 'strenght' },
    { name: 'Спина', key: 'back' },
    { name: 'Грудь', key: 'chest' },
];

describe('Sprint 6', () => {
    describe('Trainings', () => {
        const resolutionFull = [
            { width: 360, height: 740 },
            { width: 833, height: 900 },
            { width: 1440, height: 900 },
        ];
        const resolutionMobile = [{ width: 360, height: 740 }];
        const resolutionTablet = [{ width: 833, height: 900 }];
        const resolutionLaptop = [{ width: 1440, height: 900 }];

        function takeScreenshots(screenshotName, resolution = resolutionFull) {
            cy.wait(1000);
            for (let i = 0; i < resolution.length; i++) {
                cy.viewport(resolution[i].width, resolution[i].height);
                cy.screenshot(`${screenshotName}_${resolution[i].width}x${resolution[i].height}`, {
                    capture: 'viewport',
                });
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

        function generalBlockCreatingTrainings() {
            cy.get(`[data-test-id=${DATA_TEST_ID.modalDrawerRight}]`).should('be.visible');
            cy.get(`[data-test-id=${DATA_TEST_ID.modalDrawerRight}]`).within(() => {
                cy.contains('Добавление упражнений').should('exist');
                cy.contains('Сохранить').should('be.disabled');
            });
            selectDropdown(`[data-test-id=${DATA_TEST_ID.modalCreateExerciseSelect}]`, 'Спина');
            // TODO проверка, что не можем выбрать для создания сегодняшний день и в прошлом
            cy.get(`[data-test-id=${DATA_TEST_ID.modalDrawerRightDatePicker}]`).click();
            cy.get(`td[title=${getFormatDate(today, true)}]`).should(
                'have.class',
                'ant-picker-cell-disabled',
            );
            cy.get(`td[title=${getFormatDate(dayBeforeToday, true)}]`).should(
                'have.class',
                'ant-picker-cell-disabled',
            );
            cy.get(`td[title=${getFormatDate(dayAfterTomorrow, true)}]`).click();
            cy.get(`[data-test-id=${DATA_TEST_ID.modalDrawerRightCheckboxPeriod}`).check();
            selectDropdown(
                `[data-test-id=${DATA_TEST_ID.modalDrawerRightSelectPeriod}]`,
                '1 раз в неделю',
            );
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
        }

        function generalBlockUpdatingTrainings(screenshotName?: string) {
            cy.get(`[data-test-id=${DATA_TEST_ID.modalDrawerRight}]`).should('be.visible');
            cy.get(`[data-test-id=${DATA_TEST_ID.modalDrawerRight}]`).within(() => {
                cy.contains('Редактирование').should('exist');
                cy.contains('Сохранить').should('not.be.disabled');
            });
            if (screenshotName) {
                cy.screenshot(`${screenshotName}`, {
                    capture: 'viewport',
                });
            }
            cy.get(`[data-test-id=${DATA_TEST_ID.modalDrawerRightCheckboxPeriod}`).check();
            selectDropdown(
                `[data-test-id=${DATA_TEST_ID.modalDrawerRightSelectPeriod}]`,
                '1 раз в неделю',
            );
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
                statusCode: 500,
            }).as('putUserTraining');

            cy.get(`[data-test-id=${DATA_TEST_ID.menuButtonTraining}]`).click();
            cy.url().should('include', '/training');
        }

        function errorModal(screenshotName: string, resolution = resolutionFull) {
            cy.get(`[data-test-id=${DATA_TEST_ID.modalErrorUserTrainingTitle}]`).contains(
                'При сохранении данных произошла ошибка',
            );
            cy.get(`[data-test-id=${DATA_TEST_ID.modalErrorUserTrainingSubTitle}]`).contains(
                'Придётся попробовать ещё раз',
            );
            takeScreenshots(screenshotName, resolution);
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
            cy.intercept('GET', 'user/me', {
                statusCode: 200,
                body: {
                    email: 'valadzkoaliaksei@tut.by',
                    readyForJointTraining: false,
                    sendNotification: false,
                },
            }).as('getUser');
            cy.intercept('GET', 'invite', {
                statusCode: 200,
                body: [],
            }).as('getInvite');
        });

        it('come to trainings', () => {
            cy.viewport(1440, 900);
            cy.intercept('GET', 'training', {
                statusCode: 400,
            }).as('getUserTraining');
            cy.intercept('GET', 'catalogs/training-list', {
                statusCode: 400,
            }).as('getTrainingList');
            cy.get(`[data-test-id=${DATA_TEST_ID.menuButtonTraining}]`).click();
            cy.wait('@getUserTraining');
            takeScreenshots('get-training-error', resolutionLaptop);
            cy.url().should('include', '/main');
            cy.get(`[data-test-id=${DATA_TEST_ID.modalNoReview}]`).within(() => {
                cy.contains('Что-то пошло не так');
                cy.contains('Произошла ошибка, попробуйте ещё раз.');
                cy.contains('Назад').click();
            });
            cy.url().should('include', '/main');
            cy.intercept('GET', 'training', {
                statusCode: 200,
                body: userTraining,
            }).as('getUserTraining');
            cy.get(`[data-test-id=${DATA_TEST_ID.menuButtonTraining}]`).click();
            cy.wait('@getUserTraining');
            cy.wait('@getTrainingList');
            cy.url().should('include', '/training');
            takeScreenshots('get-training-list-error', resolutionLaptop);
            cy.get(`[data-test-id=${DATA_TEST_ID.modalErrorUserTrainingButton}]`).click();
            cy.wait('@getTrainingList');
            cy.get(`[data-test-id=${DATA_TEST_ID.modalErrorUserTrainingButtonClose}]`).click();
            cy.url().should('include', '/training');
            takeScreenshots('empty-calendar-page', resolutionLaptop);
            cy.intercept('GET', 'catalogs/training-list', {
                body: trainingList,
                statusCode: 200,
            }).as('getTrainingList');
            cy.contains('Главная').click();
            cy.get(`[data-test-id=${DATA_TEST_ID.menuButtonTraining}]`).click();
            takeScreenshots('calendar-page', resolutionLaptop);
        });

        it('create new training', () => {
            goToCalendar();
            cy.viewport(1440, 900);

            // TODO Проверка на закрытие боковой модалки и нa несохранение данных в таком случае
            cy.get(`[data-test-id=${DATA_TEST_ID.createNewTrainingButton}]`).click();
            generalBlockCreatingTrainings();
            cy.get(`[data-test-id=${DATA_TEST_ID.modalDrawerRightButtonClose}]`).click();
            cy.get(`[data-test-id=${DATA_TEST_ID.myTrainingsTable}]`).within(() => {
                cy.contains('Периодичность').click();
                cy.contains('1 раз в неделю').should('not.exist');
                cy.contains('Периодичность').click();
                cy.contains('1 раз в неделю').should('not.exist');
                cy.contains('Периодичность').click();
            });

            // TODO  Проверка на ошибку создания тренировки
            cy.get(`[data-test-id=${DATA_TEST_ID.createNewTrainingButton}]`).click();
            generalBlockCreatingTrainings();
            cy.get(`[data-test-id=${DATA_TEST_ID.modalDrawerRight}]`).within(() => {
                cy.contains('Сохранить').click();
            });
            errorModal('create-new-training', resolutionLaptop);
            cy.get(`[data-test-id=${DATA_TEST_ID.myTrainingsTable}]`).within(() => {
                cy.contains('Периодичность').click();
                cy.contains('1 раз в неделю').should('not.exist');
                cy.contains('Периодичность').click();
                cy.contains('1 раз в неделю').should('not.exist');
                cy.contains('Периодичность').click();
            });

            // TODO  Проверка на успех создания тренировки
            cy.get(`[data-test-id=${DATA_TEST_ID.createNewTrainingButton}]`).click();
            generalBlockCreatingTrainings();
            cy.intercept('POST', 'training', {
                statusCode: 200,
            }).as('postUserTraining');
            cy.intercept('GET', 'training', {
                body: [...userTraining, newUserTraining],
                statusCode: 200,
            }).as('getUserTraining');
            cy.get(`[data-test-id=${DATA_TEST_ID.modalDrawerRight}]`).within(() => {
                cy.contains('Сохранить').click();
            });
            cy.get(`[data-test-id=${DATA_TEST_ID.createTrainingSuccessAlert}]`).within(() => {
                cy.contains('Новая тренировка успешно добавлена').should('exist');
            });
            cy.get(`[data-test-id=${DATA_TEST_ID.myTrainingsTable}]`).within(() => {
                cy.contains('Периодичность').click();
                cy.contains('1 раз в неделю').should('not.exist');
                cy.contains('Периодичность').click();
                cy.contains('1 раз в неделю').should('exist');
                cy.contains('Периодичность').click();
            });
        });

        it('update trainings', () => {
            goToCalendar();
            cy.viewport(833, 900);

            // TODO Проверка изменения тренировок с ошибкой сохранения
            cy.get(`[data-test-id=${DATA_TEST_ID.myTrainingsTable}]`).within(() => {
                cy.get(`[data-test-id=${DATA_TEST_ID.updateMyTrainingTableIcon}${7}]`).click();
            });
            generalBlockUpdatingTrainings('update-trainings-1');
            cy.get(`[data-test-id=${DATA_TEST_ID.modalDrawerRight}]`).within(() => {
                cy.contains('Сохранить').click();
            });
            errorModal('update-future-trainings-2', resolutionTablet);
            cy.get(`[data-test-id=${DATA_TEST_ID.myTrainingsTable}]`).within(() => {
                cy.contains('Периодичность').click();
                cy.contains('1 раз в неделю').should('not.exist');
                cy.contains('Периодичность').click();
                cy.contains('1 раз в неделю').should('not.exist');
                cy.contains('Периодичность').click();
            });

            // TODO  Проверка на успех изменения тренировки
            cy.get(`[data-test-id=${DATA_TEST_ID.myTrainingsTable}]`).within(() => {
                cy.get(`[data-test-id=${DATA_TEST_ID.updateMyTrainingTableIcon}${7}]`).click();
            });
            generalBlockUpdatingTrainings();
            cy.intercept('PUT', 'training/8', {
                statusCode: 200,
            }).as('putUserTraining');
            cy.intercept('GET', 'training', {
                body: userTraining.map((el) =>
                    el._id === '8'
                        ? JSON.parse(
                              JSON.stringify(returnUpdateUserTraining('8', threeDaysLater, false)),
                          )
                        : JSON.parse(JSON.stringify(el)),
                ),
                statusCode: 200,
            }).as('getUserTraining');
            cy.get(`[data-test-id=${DATA_TEST_ID.modalDrawerRight}]`).within(() => {
                cy.contains('Сохранить').click();
            });
            cy.get(`[data-test-id=${DATA_TEST_ID.createTrainingSuccessAlert}]`).within(() => {
                cy.contains('Тренировка успешно обновлена').should('exist');
            });
            cy.get(`[data-test-id=${DATA_TEST_ID.myTrainingsTable}]`).within(() => {
                cy.contains('Периодичность').click();
                cy.contains('1 раз в неделю').should('not.exist');
                cy.contains('Периодичность').click();
                cy.contains('1 раз в неделю').should('exist');
                cy.contains('Периодичность').click();
            });
        });

        it.only('joint training', () => {
            goToCalendar();
            cy.intercept('GET', 'training-pals', {
                body: [],
                statusCode: 200,
            }).as('getTrainingPals');
            cy.contains('Совместные тренировки').click();
            cy.contains('У вас пока нет партнёров для совместных тренировок').should('exist');
            cy.contains('Случайный выбор').click();
        });
    });
});
