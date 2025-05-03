const cards = document.querySelectorAll('.card');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const showLessBtn = document.getElementById('showLessBtn');
const filterButtons = document.querySelectorAll('.filter-buttons button');

let visibleCount = 6;
let currentFilter = 'all';

// Показ карточек с учётом фильтра
function showCards() {
    let shown = 0;
    cards.forEach(card => {
        const region = card.getAttribute('data-region');
        const matches = currentFilter === 'all' || region === currentFilter;

        if (matches && shown < visibleCount) {
            card.style.display = 'block';
            shown++;
        } else {
            card.style.display = 'none';
        }
    });

    const matchingCards = Array.from(cards).filter(card => {
        const region = card.getAttribute('data-region');
        return currentFilter === 'all' || region === currentFilter;
    });

    if (visibleCount >= matchingCards.length) {
        loadMoreBtn.style.display = 'none';
        showLessBtn.style.display = matchingCards.length > 6 ? 'inline-block' : 'none';
    } else {
        loadMoreBtn.style.display = 'inline-block';
        showLessBtn.style.display = 'none';
    }
}

// Инициализация
showCards();

// Показать больше карточек
loadMoreBtn.addEventListener('click', () => {
    visibleCount += 6;
    showCards();
});

// Скрыть все кроме первых 6д
showLessBtn.addEventListener('click', () => {
    visibleCount = 3;
    showCards();

    // Прокрутка к началу карточек
    const firstCard = document.querySelector('.card');
    if (firstCard) {
        firstCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
});


// Обработчик фильтров
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        currentFilter = btn.getAttribute('data-filter');
        visibleCount = 6;
        showCards();
    });
});


// ====== МОДАЛЬНОЕ ОКНО ======

const modal = document.getElementById("contactModal");
const btn = document.getElementById("contactBtn");
const span = document.querySelector(".close");
const form = document.getElementById("contactForm");
const emailInput = document.getElementById("email");
const emailError = document.getElementById("emailError");
const phoneInput = document.getElementById("phone");
const phoneError = document.createElement("div");

phoneError.className = "error-message";
phoneInput.parentNode.insertBefore(phoneError, phoneInput.nextSibling);

btn.onclick = () => modal.style.display = "block";
span.onclick = () => modal.style.display = "none";
window.onclick = (event) => {
    if (event.target === modal) modal.style.display = "none";
};

form.addEventListener("submit", function (e) {
    let hasError = false;

    emailError.textContent = "";
    phoneError.textContent = "";

    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailError.textContent = "Пожалуйста, введите корректный email.";
        emailInput.focus();
        hasError = true;
    }

    if (!/^\d{10,}$/.test(phone)) {
        phoneError.textContent = "Пожалуйста, введите корректный номер (только цифры, минимум 10).";
        if (!hasError) phoneInput.focus();
        hasError = true;
    }

    if (hasError) {
        e.preventDefault();
    }
});

const toggle = document.getElementById('menuToggle');
const menu = document.getElementById('overlayMenu');
const bg = document.getElementById('overlayBg');

// Открытие/закрытие меню и фона
toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
    bg.classList.toggle('active');
});

// Закрытие при клике на ссылку
document.querySelectorAll('.overlay_menu_list a').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('active');
        bg.classList.remove('active');
    });
});

// Закрытие при клике по фону
bg.addEventListener('click', () => {
    menu.classList.remove('active');
    bg.classList.remove('active');
});
