const buildQuestion = (state, rerender) => {
    const { currentQuestionId, questions } = state;
    const currentQuestionData = questions[currentQuestionId];

    /*создание формы*/
    const form = document.createElement("form");

    /*создание номера вопроса*/
    const header = document.createElement("h3");
    header.className = "number";
    header.innerHTML = `Вопрос ${currentQuestionId + 1}`;

    /*создание вопроса*/
    const question = document.createElement("p");
    question.className = "question";
    question.textContent = currentQuestionData.question;

    /*создание вариантов ответа*/
    const answerOptions = document.createElement("div");
    /*проходимся по вариантам*/
    currentQuestionData.options.forEach((option) => {
        /*один из вариантов*/
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "answer";
        radio.value = option;

        /*подпись*/
        const label = document.createElement("label");
        label.className = "choice-text";
        label.appendChild(radio);

        /*добавление label в html документ*/
        answerOptions.appendChild(label);
        radio.insertAdjacentHTML("afterend", `   ${option}<br>`);
    });

    /*создание кнопки*/
    const submitBtn = document.createElement("input");
    submitBtn.className = "btn";
    submitBtn.type = "submit";
    submitBtn.value = "Продолжить";

    /*действует при нажатии на кнопку*/
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        /*получение ответа*/
        const answer = new FormData(e.target).get("answer");
        /*добавление ответа*/
        state.answers.push(answer);
        state.currentQuestionId += 1;

        /*если номер больше или равен длины доступных вопрос, то присваиваем ключ результата*/
        if (state.currentQuestionId >= state.questions.length) {
            state.mode = "result";
        }

        rerender(state);
    });

    form.appendChild(header);
    form.appendChild(question);
    form.appendChild(answerOptions);
    form.appendChild(submitBtn);

    return form;
};

/*результат*/
const buildResult = (state) => {
    const { results, answers } = state;

    const result = results.reduce(
        (acc, { name, options }) => {
            /*считаем все совпадения*/
            const coincidence = answers.filter((item) => options.includes(item)).length;
            return coincidence >= acc.count ? { name, count: coincidence } : acc;
        },
        { name: state.default, count: 0 }
    );

    /*вывод результата*/
    const resultElement = document.createElement("div");
    resultElement.classList.add("result-form");
    resultElement.innerHTML = `Поздравляем, ты ${result.name}!`;

    return resultElement;
};

const render = (element) => (state) => {
    /*изначально результат пуст*/
    element.innerHTML = "";

    switch (state.mode) {
        /*если ключ равен вопросу, то вызываем функцию построения вопроса*/
        case "question": {
            const questionElement = buildQuestion(state, render(element));
            element.appendChild(questionElement);
            break;
        }
        /*если ключ равен результату, то вызываем функция построения результата*/
        case "result": {
            const resultElement = buildResult(state);
            element.appendChild(resultElement);
            break;
        }
        /*неизвестый ключ*/
        default: {
            throw new Error(`Unknown mode: ${state.mode}`);
        }
    }
};


const initialize = (name) => {
    /*инициализация элементов*/
    const state = {
        currentQuestionId: 0,
        questions: config[name].questions,
        results: config[name].results,
        answers: [],
        default: config.default,
        mode: "question"
    };

    /*поиск элемента, в котором будет показан результат, и вызов основной функции*/
    const root = document.getElementById("result");
    render(root)(state);
};


/*ДАННЫЕ*/
const config = {
    winx: {
        questions: [
            {
                question: "Выбери качество, которое лучше всего тебя описывает:",
                options: [
                    "Умная",
                    "Спонтанная",
                    "Творческая",
                    "Спортивная",
                    "Милая",
                    "Храбрая"
                ]
            },
            {
                question: "Что ты смотришь по телевизору?",
                options: [
                    "Документальные фильмы о путешествиях и природе",
                    "Кулинарные программы",
                    "Сериалы",
                    "Модные реалити-шоу",
                    "Музыкальные клипы и шоу талантов",
                    "Спортивные каналы"
                ]
            },
            {
                question: "Твой любимый цвет:",
                options: [
                    "Фиолетовый",
                    "Зеленый",
                    "Красный",
                    "Голубой",
                    "Желтый",
                    "Синий"
                ]
            },
            {
                question: "Выбери специалиста:",
                options: [
                    "Скай",
                    "Брендон",
                    "Тимми",
                    "Ривен",
                    "Гелия",
                    "Некс"
                ]
            },
            {
                question: "Твое любимое хобби:",
                options: [
                    "Садоводство",
                    "Чтение",
                    "Видеоигры",
                    "Шопинг",
                    "Музыка",
                    "Спорт"
                ]
            }
        ],
        results: [
            {
                name: "Блум",
                options: [
                    "Храбрая",
                    "Кулинарные программы",
                    "Красный",
                    "Скай",
                    "Чтение"
                ]
            },
            {
                name: "Стелла",
                options: [
                    "Спонтанная",
                    "Модные реалити-шоу",
                    "Желтый",
                    "Брендон",
                    "Шопинг"
                ]
            },
            {
                name: "Флора",
                options: [
                    "Милая",
                    "Документальные фильмы о путешествиях и природе",
                    "Зеленый",
                    "Гелия",
                    "Садоводство"
                ]
            },
            {
                name: "Муза",
                options: [
                    "Творческая",
                    "Музыкальные клипы и шоу талантов",
                    "Голубой",
                    "Ривен",
                    "Музыка"
                ]
            },
            {
                name: "Текна",
                options: [
                    "Умная",
                    "Сериалы",
                    "Фиолетовый",
                    "Тимми",
                    "Видеоигры"
                ]
            },
            {
                name: "Лейла",
                options: [
                    "Спортивная",
                    "Спортивные каналы",
                    "Синий",
                    "Некс",
                    "Спорт"
                ]
            }
        ]
    },
    pony: {
        questions: [
            {
                question: "Твой любимый цвет:",
                options: [
                    "Розовый",
                    "Желтый",
                    "Фиолетовый",
                    "Белый",
                    "Оранжевый",
                    "Голубой"
                ]
            },
            {
                question: "Кем бы ты хотел быть?",
                options: [
                    "Обычная пони",
                    "Аликорн",
                    "Пегас"
                ]
            },
            {
                question: "Что любишь делать на выходных?",
                options: [
                    "Веселюсь с друзьями",
                    "Сижу с домашними животными",
                    "Читаю книги",
                    "Готовлю вкусняшки",
                    "Покупаю новую одежду",
                    "Играю в видеоигры"
                ]
            },
            {
                question: "Сколько времени проводите с друзьями?",
                options: [
                    "Много, не могу без них жить",
                    "Не часто, но провожу",
                    "Мало, всегда занята",
                    "Кто это?"
                ]
            },
            {
                question: "Какой элемент выберешь ты?",
                options: [
                    "Смех",
                    "Доброта",
                    "Магия",
                    "Честность",
                    "Щедрость",
                    "Верность"
                ]
            }
        ],
        results: [
            {
                name: "Сумеречная Искорка",
                options: [
                    "Фиолетовый",
                    "Аликорн",
                    "Читаю книги",
                    "Мало, всегда занята",
                    "Магия"
                ]
            },
            {
                name: "Пинки Пай",
                options: [
                    "Розовый",
                    "Обычная пони",
                    "Веселюсь с друзьями",
                    "Много, не могу без них жить",
                    "Смех"
                ]
            },
            {
                name: "Флаттершай",
                options: [
                    "Желтый",
                    "Пегас",
                    "Сижу с домашними животными",
                    "Не часто, но провожу",
                    "Доброта"
                ]
            },
            {
                name: "Радуга Деш",
                options: [
                    "Голубой",
                    "Пегас",
                    "Играю в видеоигры",
                    "Много, не могу без них жить",
                    "Верность"
                ]
            },
            {
                name: "Рарити",
                options: [
                    "Белый",
                    "Аликорн",
                    "Покупаю новую одежду",
                    "Кто это?",
                    "Щедрость"
                ]
            },
            {
                name: "Эплджек",
                options: [
                    "Оранжевый",
                    "Обычная пони",
                    "Готовлю вкусняшки",
                    "Не часто, но провожу",
                    "Честность"
                ]
            }
        ]
    },
    star: {
        questions: [
            {
                question: "Твой любимый персонаж:",
                options: [
                    "Из семейства Стар(Стар, король, слуга и т.д.)",
                    "Из семейства и друзей Марко(Джекки, мама, Марко и т.д.)",
                    "Из \"других\"(Пониголовая, Том, Пикси и т.д.)",
                    "Из злодеев(Людо, Тоффи и т.д)"
                ]
            },
            {
                question: "Твой характер:",
                options: [
                    "Веселая, активная, смешная",
                    "Ленивая, веселая, реалист",
                    "Нервная, пессимист, \"злая\"",
                    "Властная, врунья, (в глубине души) добрая"
                ]
            },
            {
                question: "Похожее на твой стиль одежды:",
                options: [
                    "Милый(платья, балетки, ободочки)",
                    "Удобный( штаны, кофта, кеды)",
                    "Свободный(футболка, шорты, сланцы)",
                    "Строгий, устрашающий"
                ]
            },
            {
                question: "Приближенное к твоему хобби:",
                options: [
                    "Рисовать и гулять",
                    "Готовить и спорт",
                    "Спорт и просмотр полезных передач",
                    "Устраивать праздники и мастерить"
                ]
            },
            {
                question: "Похожее на твои страхи:",
                options: [
                    "Монстры",
                    "Высота",
                    "Другие люди",
                    "Темнота"
                ]
            }
        ],
        results: [
            {
                name: "Стар Баттерфляй",
                options: [
                    "Из семейства Стар(Стар, король, слуга и т.д.)",
                    "Веселая, активная, смешная",
                    "Милый(платья, балетки, ободочки)",
                    "Рисовать и гулять",
                    "Высота"
                ]
            },
            {
                name: "Марко Диаз",
                options: [
                    "Из семейства и друзей Марко(Джекки, мама, Марко и т.д.)",
                    "Ленивая, веселая, реалист",
                    "Удобный( штаны, кофта, кеды)",
                    "Готовить и спорт",
                    "Монстры"
                ]
            },
            {
                name: "Пониголовая",
                options: [
                    "Из \"других\"(Пониголовая, Том, Пикси и т.д.)",
                    "Властная, врунья, (в глубине души) добрая",
                    "Свободный(футболка, шорты, сланцы)",
                    "Устраивать праздники и мастерить",
                    "Темнота"
                ]
            },
            {
                name: "Людо",
                options: [
                    "Из злодеев(Людо, Тоффи и т.д)",
                    "Нервная, пессимист, \"злая\"",
                    "Строгий, устрашающий",
                    "Спорт и просмотр полезных передач",
                    "Другие люди"
                ]
            }
        ]
    }
};

