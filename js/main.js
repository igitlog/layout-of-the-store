// Улучшенная функция удаления классов
const removeClasses = (elements, className) => {
  elements.forEach(element => {
    if (element.classList.contains(className)) {
      element.classList.remove(className);
    }
  });
};

// Проверка, является ли устройство мобильным
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Функция для выполнения действий при загрузке документа
const initialize = () => {
  // Обработчик события клика по документу
  document.addEventListener("click", handleDocumentClick);

  // Обработчик прокрутки шапки
  const headerElement = document.querySelector('.header');
  const headerObserver = new IntersectionObserver(entries => {
    headerElement.classList.toggle('_scroll', !entries[0].isIntersecting);
  });
  headerObserver.observe(headerElement);

  // Инициализация спойлеров
  const spollersArray = document.querySelectorAll('[data-spollers]');
  if (spollersArray.length > 0) {
    initializeSpollers(spollersArray);
  }
};

document.addEventListener("click", (event) => {
  if (event.target.classList.contains('header__dropdown-button')) {
    console.log('clickclickclickclick');
    event.preventDefault();
    let parentEl = event.target.closest('.dropdown');
    let content = document.querySelector('.header__dropdown-content');
    content.classList.toggle('show');
    content.style.top = '40px';
  }
})
function clickOutside(element, callback, ignoreElement) {
  function handleClickOutside(event) {
      if (!element.contains(event.target) && event.target !== ignoreElement) {
          callback();
      }
  }

  document.addEventListener('click', handleClickOutside);

  return {
      remove: function () {
          document.removeEventListener('click', handleClickOutside);
      }
  };
}

// Пример использования:
let dropdownContent = document.querySelector('.header__dropdown-content');
let dropdownButton = document.querySelector('.header__dropdown-button');

let clickOutsideHandler = clickOutside(dropdownContent, function () {
  dropdownContent.classList.remove('show');
}, dropdownButton);

dropdownButton.addEventListener('click', function (event) {
  event.stopPropagation(); // Остановить всплытие события, чтобы не срабатывал "clickoutside"
  dropdownContent.classList.toggle('show');
});

// Функция для обработки события клика по документу
const handleDocumentClick = (event) => {
  const targetElement = event.target;

  if (window.innerWidth > 768 && isMobile) {
    handleMobileMenu(targetElement);
  }  

  handleSearchForm(targetElement);
  handleBurger(targetElement);
};

// Функция для обработки мобильного меню
const handleMobileMenu = (targetElement) => {
  if (targetElement.classList.contains('btn-icon')) {
    targetElement.closest('.menu__item').classList.toggle('_hover');
  } else if (!targetElement.closest('.menu__item') && document.querySelectorAll('._hover').length > 0) {
    removeClasses(document.querySelectorAll('.menu__item._hover'), "_hover");
  }
};

// Функция для обработки поисковой формы
const handleSearchForm = (targetElement) => {
  const searchForm = document.querySelector('.search-form');
  if (targetElement.classList.contains('search-form__icon')) {
    searchForm.classList.toggle('_active');
  } else if (!targetElement.closest('.search-form') && searchForm.classList.contains('_active')) {
    searchForm.classList.remove('_active');
  }
};

// Функция для обработки бургера
const handleBurger = (targetElement) => {
  const iconMenu = document.querySelector('.icon-menu');
  const menuBody = document.querySelector('.menu__body');

  if (targetElement.classList.contains('icon-menu')) {
    iconMenu.classList.toggle('active');
    menuBody.classList.toggle('_active');
  }
};

// Функция для инициализации спойлеров
const initializeSpollers = (spollersArray) => {
  spollersArray.forEach(spollersBlock => {
    const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
    if (spollerTitles.length > 0) {
      spollerTitles.forEach(spollerTitle => {
        const spollerBody = spollerTitle.nextElementSibling;
        spollerTitle.addEventListener("click", () => {
          spollerTitle.classList.toggle('_active');
          spollerBody.hidden = !spollerTitle.classList.contains('_active');
        });
      });
    }
  });
};

// Функции анимации
const slideUp = (target, duration = 500) => {
  if (!target.classList.contains('_slide')) {
    target.style.transition = 'height, margin, padding';
    target.style.height = target.offsetHeight + 'px';
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    setTimeout(() => {
      target.hidden = true;
      target.style.removeProperty('height');
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition');
      target.classList.remove('_slide');
    }, duration);
  }
};

const slideDown = (target, duration = 500) => {
  if (!target.classList.contains('_slide')) {
    target.style.transition = 'height, margin, padding';
    target.style.display = 'block';
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.height = target.scrollHeight + 'px';
    target.style.paddingTop = '';
    target.style.paddingBottom = '';
    target.style.marginTop = '';
    target.style.marginBottom = '';
    setTimeout(() => {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition');
      target.classList.remove('_slide');
    }, duration);
  }
};

const slideToggle = (target, duration = 500) => {
  if (target.hidden) {
    slideDown(target, duration);
  } else {
    slideUp(target, duration);
  }
};

// Запуск кода после загрузки документа
window.onload = initialize;