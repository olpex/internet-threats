document.addEventListener('DOMContentLoaded', function() {
    // Індикатор прогресу читання
    const progressBar = document.getElementById('reading-progress');
    
    window.addEventListener('scroll', function() {
        // Розраховуємо відсоток прокрутки сторінки
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        
        // Оновлюємо ширину індикатора прогресу
        progressBar.style.width = scrollPercentage + '%';
    });
    
    // Функціонал перемикача теми
    const themeSwitch = document.getElementById('theme-switch');
    
    // Перевіряємо, чи є збережена тема в localStorage
    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeSwitch.checked = true;
    }
    
    // Обробник події зміни стану перемикача
    themeSwitch.addEventListener('change', function() {
        if (this.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        }
    });

    // Мобільне меню
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            // Змінюємо іконку меню
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Закриття мобільного меню при кліку на посилання
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                // Повертаємо іконку меню
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Активне посилання при прокрутці
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('nav ul li a');

    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // Плавна прокрутка для якірних посилань
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Враховуємо висоту заголовка
                    behavior: 'smooth'
                });
            }
        });
    });

    // Анімація появи елементів при прокрутці
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.card, .tip, .section-header, .hero-content, .protection-tip, .tool-item, .incident-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                // Визначаємо тип анімації в залежності від елемента
                if (element.classList.contains('card')) {
                    element.classList.add('animated', 'fadeInUp');
                } else if (element.classList.contains('section-header')) {
                    element.classList.add('animated', 'fadeIn');
                } else if (element.classList.contains('hero-content')) {
                    element.classList.add('animated', 'fadeInDown');
                } else if (element.classList.contains('protection-tip')) {
                    element.classList.add('animated', 'fadeInLeft');
                } else if (element.classList.contains('tool-item')) {
                    element.classList.add('animated', 'fadeInRight');
                } else if (element.classList.contains('incident-card')) {
                    element.classList.add('animated', 'fadeIn');
                } else {
                    element.classList.add('animated', 'fadeInUp');
                }
            }
        });
    };
    
    // Функція ініціалізації карток була видалена

    // Додаємо анімації для інтерактивних елементів
    const addInteractiveAnimations = function() {
        // Анімація для іконок безпеки
        const securityIcons = document.querySelectorAll('.card-icon i, .logo i');
        securityIcons.forEach(icon => {
            icon.classList.add('shield-animate');
        });

        // Анімація для кнопок
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('mousedown', function() {
                this.classList.add('btn-pop');
                setTimeout(() => {
                    this.classList.remove('btn-pop');
                }, 300);
            });
        });

        // Анімація для попереджень про загрози
        const warningElements = document.querySelectorAll('.card:nth-child(2) .card-icon');
        warningElements.forEach(element => {
            element.classList.add('warning-pulse');
        });

        // Анімація для підказок
        const tipIcons = document.querySelectorAll('.protection-tip i');
        tipIcons.forEach(icon => {
            icon.classList.add('tip-bounce');
        });
    };

    // Запускаємо анімацію при завантаженні та прокрутці
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Запускаємо один раз при завантаженні
    
    // Запускаємо інтерактивні анімації
    addInteractiveAnimations();
    
    // Функції для флеш-карток були видалені
    
    // Додаємо анімацію для елементів, які з'являються з затримкою
    setTimeout(() => {
        const delayedElements = document.querySelectorAll('.hero-content h1, .hero-content p, .hero-content .btn');
        delayedElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('animated', 'fadeInUp');
            }, index * 200);
        });
    }, 500);
    
    // Кнопка "Повернутися вгору"
    const backToTopButton = document.getElementById('back-to-top');
    
    // Показуємо/приховуємо кнопку при прокрутці
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Прокрутка вгору при кліку на кнопку
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Обробка форми підписки
    const subscribeForm = document.querySelector('.subscribe-form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // Тут можна додати код для відправки даних на сервер
                // Для демонстрації просто показуємо повідомлення
                alert(`Дякуємо за підписку! Ми надіслали підтвердження на адресу ${email}`);
                emailInput.value = '';
            }
        });
    }
    
    // Функціонал тесту знань з кібербезпеки
    const quizModal = document.getElementById('quiz-modal');
    const openQuizBtn = document.getElementById('open-quiz-btn');
    
    // Додаємо анімації для модальних вікон
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        // Додаємо анімацію появи для модального вікна
        modal.addEventListener('show', function() {
            this.classList.add('animated', 'fadeIn', 'faster');
            const modalContent = this.querySelector('.modal-content');
            if (modalContent) {
                modalContent.classList.add('animated', 'fadeInDown', 'faster');
            }
        });
        
        // Додаємо анімацію закриття для модального вікна
        const closeButtons = modal.querySelectorAll('.close-modal');
        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const modalContent = modal.querySelector('.modal-content');
                if (modalContent) {
                    modalContent.classList.remove('fadeInDown');
                    modalContent.classList.add('fadeOutUp', 'faster');
                }
                setTimeout(() => {
                    modal.style.display = 'none';
                    if (modalContent) {
                        modalContent.classList.remove('fadeOutUp');
                        modalContent.classList.add('fadeInDown');
                    }
                }, 300);
            });
        });
    });
    const closeModalBtn = document.querySelector('.close-modal');
    const questionText = document.getElementById('question-text');
    const answerButtonsElement = document.getElementById('answer-buttons');
    const nextButton = document.getElementById('next-btn');
    const scoreElement = document.getElementById('score');
    const quizContainer = document.getElementById('quiz-container');
    const quizResults = document.getElementById('quiz-results');
    const finalScoreElement = document.getElementById('final-score');
    const resultMessageElement = document.getElementById('result-message');
    const restartQuizBtn = document.getElementById('restart-quiz-btn');
    
    // Питання для тесту
    const questions = [
        {
            question: 'Що таке фішинг?',
            answers: [
                { text: 'Вид спорту, пов\'язаний з риболовлею', correct: false },
                { text: 'Спроба отримати конфіденційну інформацію обманним шляхом', correct: true },
                { text: 'Тип комп\'ютерного вірусу', correct: false },
                { text: 'Метод шифрування даних', correct: false }
            ]
        },
        {
            question: 'Яке з наступних паролів є найбезпечнішим?',
            answers: [
                { text: '123456', correct: false },
                { text: 'password', correct: false },
                { text: 'P@ssw0rd!2023', correct: true },
                { text: 'qwerty', correct: false }
            ]
        },
        {
            question: 'Що таке двофакторна автентифікація?',
            answers: [
                { text: 'Використання двох різних паролів', correct: false },
                { text: 'Використання додаткового рівня захисту крім пароля', correct: true },
                { text: 'Вхід з двох різних пристроїв', correct: false },
                { text: 'Подвійне шифрування даних', correct: false }
            ]
        },
        {
            question: 'Яка з наступних дій є найбезпечнішою при використанні публічного Wi-Fi?',
            answers: [
                { text: 'Використання VPN', correct: true },
                { text: 'Вхід у всі свої облікові записи', correct: false },
                { text: 'Здійснення банківських операцій', correct: false },
                { text: 'Відключення брандмауера', correct: false }
            ]
        },
        {
            question: 'Що таке програма-вимагач (ransomware)?',
            answers: [
                { text: 'Програма, яка блокує доступ до даних і вимагає викуп', correct: true },
                { text: 'Програма для відновлення видалених файлів', correct: false },
                { text: 'Антивірусне програмне забезпечення', correct: false },
                { text: 'Програма для резервного копіювання даних', correct: false }
            ]
        }
    ];
    
    let currentQuestionIndex = 0;
    let score = 0;
    
    // Відкриття модального вікна з тестом
    openQuizBtn.addEventListener('click', function() {
        quizModal.style.display = 'block';
        startQuiz();
    });
    
    // Закриття модального вікна
    closeModalBtn.addEventListener('click', function() {
        quizModal.style.display = 'none';
    });
    
    // Закриття модального вікна при кліку поза його вмістом
    window.addEventListener('click', function(e) {
        if (e.target === quizModal) {
            quizModal.style.display = 'none';
        }
    });
    
    // Запуск тесту
    function startQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        scoreElement.textContent = score;
        quizContainer.style.display = 'block';
        quizResults.style.display = 'none';
        nextButton.innerHTML = 'Наступне питання';
        showQuestion(questions[currentQuestionIndex]);
    }
    
    // Відображення питання
    function showQuestion(question) {
        questionText.textContent = question.question;
        resetAnswerButtons();
        
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.textContent = answer.text;
            button.dataset.correct = answer.correct;
            button.addEventListener('click', selectAnswer);
            answerButtonsElement.appendChild(button);
        });
    }
    
    // Очищення кнопок відповідей
    function resetAnswerButtons() {
        nextButton.disabled = true;
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild);
        }
    }
    
    // Вибір відповіді
    function selectAnswer(e) {
        const selectedButton = e.target;
        const correct = selectedButton.dataset.correct === 'true';
        
        if (correct) {
            selectedButton.classList.add('correct');
            score++;
            scoreElement.textContent = score;
        } else {
            selectedButton.classList.add('wrong');
        }
        
        Array.from(answerButtonsElement.children).forEach(button => {
            if (button.dataset.correct === 'true') {
                button.classList.add('correct');
            }
            button.disabled = true;
        });
        
        nextButton.disabled = false;
    }
    
    // Обробка кнопки "Наступне питання"
    nextButton.addEventListener('click', function() {
        currentQuestionIndex++;
        
        if (currentQuestionIndex < questions.length) {
            showQuestion(questions[currentQuestionIndex]);
        } else {
            showResults();
        }
    });
    
    // Відображення результатів тесту
    function showResults() {
        quizContainer.style.display = 'none';
        quizResults.style.display = 'block';
        
        finalScoreElement.textContent = `${score} з ${questions.length} правильних відповідей`;
        
        let message = '';
        if (score === questions.length) {
            message = 'Відмінно! Ви справжній експерт з кібербезпеки!';
        } else if (score >= questions.length * 0.7) {
            message = 'Добре! Ви маєте хороші знання з кібербезпеки.';
        } else if (score >= questions.length * 0.5) {
            message = 'Непогано! Але варто покращити свої знання з кібербезпеки.';
        } else {
            message = 'Вам варто більше дізнатися про кібербезпеку. Почніть з матеріалів на нашому сайті!';
        }
        
        resultMessageElement.textContent = message;
    }
    
    // Перезапуск тесту
    restartQuizBtn.addEventListener('click', startQuiz);
    
    // Функціональність для симулятора фішингової атаки
    const phishingModal = document.getElementById('phishing-modal');
    const phishingBtn = document.getElementById('phishing-btn');
    const closePhishingBtn = document.getElementById('close-phishing');
    const phishingContainer = document.getElementById('phishing-simulator-container');
    const phishingExample = document.getElementById('phishing-example');
    const phishingFeedback = document.getElementById('phishing-feedback');
    const phishingNextBtn = document.getElementById('phishing-next-btn');
    const phishingResults = document.getElementById('phishing-results');
    const phishingYesBtn = document.getElementById('phishing-yes-btn');
    const phishingNoBtn = document.getElementById('phishing-no-btn');
    
    // Додаємо анімації для фішингового симулятора
    const addPhishingAnimations = function() {
        // Анімація для прикладів фішингу
        if (phishingExample) {
            phishingExample.classList.add('animated', 'fadeIn');
        }
        
        // Анімація для кнопок відповіді
        if (phishingYesBtn && phishingNoBtn) {
            phishingYesBtn.addEventListener('mouseenter', function() {
                this.classList.add('warning-pulse');
            });
            
            phishingYesBtn.addEventListener('mouseleave', function() {
                this.classList.remove('warning-pulse');
            });
            
            phishingNoBtn.addEventListener('mouseenter', function() {
                this.classList.add('pulse');
            });
            
            phishingNoBtn.addEventListener('mouseleave', function() {
                this.classList.remove('pulse');
            });
        }
        
        // Анімація для зворотного зв'язку
        if (phishingFeedback) {
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                        phishingFeedback.classList.add('animated', 'fadeIn');
                    }
                });
            });
            
            observer.observe(phishingFeedback, { childList: true });
        }
    };

    let currentPhishingIndex = 0;
    let phishingScore = 0;

    const phishingExamples = [
        {
            type: 'email',
            content: `
                <div class="phishing-email">
                    <div class="phishing-email-header">
                        <p><strong>Від:</strong> security@bankofamerica-secure.com</p>
                        <p><strong>Кому:</strong> customer@example.com</p>
                        <p><strong>Тема:</strong> ТЕРМІНОВО: Підозріла активність на вашому рахунку</p>
                    </div>
                    <div class="phishing-email-body">
                        <p>Шановний клієнт,</p>
                        <p>Ми виявили підозрілу активність на вашому банківському рахунку. Ваш рахунок було тимчасово заблоковано для вашої безпеки.</p>
                        <p>Щоб розблокувати ваш рахунок, будь ласка, <a href="#">натисніть тут</a> та підтвердіть вашу особу, ввівши ваші банківські реквізити та пароль.</p>
                        <p>Якщо ви не підтвердите вашу особу протягом 24 годин, ваш рахунок буде заблоковано назавжди.</p>
                        <p>З повагою,<br>Команда безпеки Bank of America</p>
                    </div>
                </div>
            `,
            isPhishing: true,
            feedback: {
                correct: {
                    title: 'Правильно! Це фішинговий лист.',
                    explanation: 'Цей лист має кілька ознак фішингу:',
                    clues: [
                        'Адреса відправника (bankofamerica-secure.com) не є офіційною адресою банку',
                        'Створення відчуття терміновості та загрози',
                        'Запит на введення конфіденційних даних через посилання',
                        'Погрози заблокувати рахунок назавжди'
                    ]
                },
                incorrect: {
                    title: 'Неправильно! Це фішинговий лист.',
                    explanation: 'Ви пропустили ці ознаки фішингу:',
                    clues: [
                        'Адреса відправника (bankofamerica-secure.com) не є офіційною адресою банку',
                        'Створення відчуття терміновості та загрози',
                        'Запит на введення конфіденційних даних через посилання',
                        'Погрози заблокувати рахунок назавжди'
                    ]
                }
            }
        },
        {
            type: 'website',
            content: `
                <div class="phishing-website">
                    <div class="phishing-website-header">
                        <span>🔒</span>
                        <div class="phishing-website-url">https://accounts-google.com/signin</div>
                    </div>
                    <div class="phishing-website-content">
                        <div style="text-align: center; margin-bottom: 20px;">
                            <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" alt="Google" style="width: 150px;">
                        </div>
                        <h2 style="text-align: center; font-size: 1.2rem; margin-bottom: 15px;">Увійдіть в обліковий запис Google</h2>
                        <div style="max-width: 350px; margin: 0 auto;">
                            <div style="margin-bottom: 15px;">
                                <input type="text" placeholder="Електронна пошта або телефон" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
                            </div>
                            <div style="margin-bottom: 15px;">
                                <input type="password" placeholder="Пароль" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
                            </div>
                            <div style="margin-bottom: 15px;">
                                <button style="width: 100%; padding: 10px; background-color: #4285f4; color: white; border: none; border-radius: 4px; cursor: pointer;">Увійти</button>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            isPhishing: true,
            feedback: {
                correct: {
                    title: 'Правильно! Це фішинговий сайт.',
                    explanation: 'Цей сайт має кілька ознак фішингу:',
                    clues: [
                        'URL-адреса (accounts-google.com) не є офіційною адресою Google (має бути accounts.google.com)',
                        'Хоча сайт виглядає як справжній Google, він розміщений на підробленому домені',
                        'Використання логотипу Google для створення відчуття легітимності'
                    ]
                },
                incorrect: {
                    title: 'Неправильно! Це фішинговий сайт.',
                    explanation: 'Ви пропустили ці ознаки фішингу:',
                    clues: [
                        'URL-адреса (accounts-google.com) не є офіційною адресою Google (має бути accounts.google.com)',
                        'Хоча сайт виглядає як справжній Google, він розміщений на підробленому домені',
                        'Використання логотипу Google для створення відчуття легітимності'
                    ]
                }
            }
        },
        {
            type: 'email',
            content: `
                <div class="phishing-email">
                    <div class="phishing-email-header">
                        <p><strong>Від:</strong> newsletter@amazon.com</p>
                        <p><strong>Кому:</strong> customer@example.com</p>
                        <p><strong>Тема:</strong> Ваші щомісячні пропозиції від Amazon</p>
                    </div>
                    <div class="phishing-email-body">
                        <p>Шановний клієнт Amazon,</p>
                        <p>Ось ваші персоналізовані пропозиції на цей місяць, засновані на вашій історії покупок:</p>
                        <ul>
                            <li>Знижка 15% на електроніку</li>
                            <li>Безкоштовна доставка на замовлення від $25</li>
                            <li>Спеціальні пропозиції на книги</li>
                        </ul>
                        <p>Щоб переглянути всі пропозиції, <a href="https://amazon.com/deals">відвідайте наш сайт</a>.</p>
                        <p>З повагою,<br>Команда Amazon</p>
                    </div>
                </div>
            `,
            isPhishing: false,
            feedback: {
                correct: {
                    title: 'Правильно! Цей лист виглядає легітимним.',
                    explanation: 'Цей лист має ознаки справжнього листа:',
                    clues: [
                        'Адреса відправника (newsletter@amazon.com) є офіційною адресою Amazon',
                        'Посилання веде на офіційний сайт Amazon (amazon.com)',
                        'Немає запитів на особисту або фінансову інформацію',
                        'Немає відчуття терміновості або загрози'
                    ]
                },
                incorrect: {
                    title: 'Неправильно! Цей лист виглядає легітимним.',
                    explanation: 'Ви помилково визначили цей лист як фішинговий. Ось ознаки, що це справжній лист:',
                    clues: [
                        'Адреса відправника (newsletter@amazon.com) є офіційною адресою Amazon',
                        'Посилання веде на офіційний сайт Amazon (amazon.com)',
                        'Немає запитів на особисту або фінансову інформацію',
                        'Немає відчуття терміновості або загрози'
                    ]
                }
            }
        }
    ];

    // Відкриття модального вікна з симулятором
    if (phishingBtn) {
        phishingBtn.addEventListener('click', function() {
            phishingModal.style.display = 'block';
            phishingModal.classList.add('animated', 'fadeIn', 'faster');
            const modalContent = phishingModal.querySelector('.modal-content');
            if (modalContent) {
                modalContent.classList.add('animated', 'fadeInDown', 'faster');
            }
            startPhishingSimulator();
            // Запускаємо анімації для фішингового симулятора
            addPhishingAnimations();
        });
    }

    // Закриття модального вікна
    if (closePhishingBtn) {
        closePhishingBtn.addEventListener('click', function() {
            const modalContent = phishingModal.querySelector('.modal-content');
            if (modalContent) {
                modalContent.classList.remove('fadeInDown');
                modalContent.classList.add('fadeOutUp', 'faster');
            }
            setTimeout(() => {
                phishingModal.style.display = 'none';
                if (modalContent) {
                    modalContent.classList.remove('fadeOutUp');
                    modalContent.classList.add('fadeInDown');
                }
            }, 300);
        });
    }

    // Закриття модального вікна при кліку поза його вмістом
    window.addEventListener('click', function(e) {
        if (e.target === phishingModal) {
            phishingModal.style.display = 'none';
        }
    });

    // Запуск симулятора
    function startPhishingSimulator() {
        currentPhishingIndex = 0;
        phishingScore = 0;
        phishingResults.classList.add('hidden');
        phishingContainer.classList.remove('hidden');
        phishingFeedback.classList.add('hidden');
        phishingNextBtn.classList.add('hidden');
        showPhishingExample();
    }

    // Відображення прикладу фішингу
    function showPhishingExample() {
        const currentExample = phishingExamples[currentPhishingIndex];
        phishingExample.innerHTML = currentExample.content;
        phishingFeedback.classList.add('hidden');
        phishingNextBtn.classList.add('hidden');
        phishingYesBtn.disabled = false;
        phishingNoBtn.disabled = false;
    }

    // Перевірка відповіді
    function checkPhishingAnswer(isPhishingAnswer) {
        const currentExample = phishingExamples[currentPhishingIndex];
        const isCorrect = isPhishingAnswer === currentExample.isPhishing;
        
        if (isCorrect) {
            phishingScore++;
            phishingFeedback.classList.add('correct');
            phishingFeedback.classList.remove('incorrect');
            phishingFeedback.innerHTML = `
                <h3>${currentExample.feedback.correct.title}</h3>
                <p>${currentExample.feedback.correct.explanation}</p>
                <ul>
                    ${currentExample.feedback.correct.clues.map(clue => `<li>${clue}</li>`).join('')}
                </ul>
            `;
        } else {
            phishingFeedback.classList.add('incorrect');
            phishingFeedback.classList.remove('correct');
            phishingFeedback.innerHTML = `
                <h3>${currentExample.feedback.incorrect.title}</h3>
                <p>${currentExample.feedback.incorrect.explanation}</p>
                <ul>
                    ${currentExample.feedback.incorrect.clues.map(clue => `<li>${clue}</li>`).join('')}
                </ul>
            `;
        }
        
        phishingFeedback.classList.remove('hidden');
        phishingNextBtn.classList.remove('hidden');
        phishingYesBtn.disabled = true;
        phishingNoBtn.disabled = true;
    }

    // Обробка кнопки "Наступний приклад"
    if (phishingNextBtn) {
        phishingNextBtn.addEventListener('click', function() {
            currentPhishingIndex++;
            if (currentPhishingIndex < phishingExamples.length) {
                showPhishingExample();
            } else {
                showPhishingResults();
            }
        });
    }

    // Відображення результатів
    function showPhishingResults() {
        // Приховуємо контейнер з анімацією
        phishingContainer.classList.add('animated', 'fadeOut', 'faster');
        
        setTimeout(() => {
            phishingContainer.classList.add('hidden');
            phishingContainer.classList.remove('animated', 'fadeOut', 'faster');
            
            // Показуємо результати з анімацією
            phishingResults.classList.remove('hidden');
            phishingResults.classList.add('animated', 'fadeIn');
            
            phishingResults.innerHTML = `
                <h2 class="animated fadeInDown">Ваш результат: ${phishingScore} з ${phishingExamples.length}</h2>
                <p class="animated fadeInUp delay-1s">${getPhishingScoreMessage(phishingScore)}</p>
                <button id="restart-phishing" class="btn animated pulse delay-2s">Спробувати ще раз</button>
            `;
            
            document.getElementById('restart-phishing').addEventListener('click', startPhishingSimulator);
        }, 300);
    }

    // Повідомлення про результат
    function getPhishingScoreMessage(score) {
        if (score === phishingExamples.length) {
            return 'Відмінно! Ви вмієте розпізнавати фішингові атаки!';
        } else if (score >= phishingExamples.length * 0.7) {
            return 'Добре! Ви маєте хороші навички розпізнавання фішингу, але є ще що вдосконалювати.';
        } else if (score >= phishingExamples.length * 0.5) {
            return 'Непогано! Ви маєте базові навички розпізнавання фішингу, але варто дізнатися більше.';
        } else {
            return 'Вам варто більше дізнатися про фішингові атаки. Почніть з вивчення матеріалів на цьому сайті!';
        }
    }

    // Обробка кнопок "Так, це фішинг" та "Ні, це безпечно"
    if (phishingYesBtn) {
        phishingYesBtn.addEventListener('click', function() {
            checkPhishingAnswer(true);
        });
    }

    if (phishingNoBtn) {
        phishingNoBtn.addEventListener('click', function() {
            checkPhishingAnswer(false);
        });
    }
});