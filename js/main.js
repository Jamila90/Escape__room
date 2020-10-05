'use strict';

let mainHeader = document.querySelector('.main-header');
let mainNav = document.querySelector('.nav');
let toggleBtn = document.querySelector('.main-header__toggle');
let mainHeaderLink = document.querySelector('.main-header__link-wrap');
let footer = document.querySelector('.footer-page');
let linkCity = document.querySelector('.main-header__link');
let modalCity = document.querySelector('.modal');
let modalForm = document.querySelector('.modal__form');
let questionModal = document.querySelector('.modal-form');
let modalToggle = document.querySelector('.modal__toggle');
let questionClose = document.querySelector('.modal-form__toggle');
let questionBtn = document.querySelector('.footer-page__button');
let modalFormQuestion = document.querySelector('.modal-form__question');
let element = document.querySelector('.quest-order__text-wrap');
let name = document.querySelector('.modal-form__item input[name]');
let email = document.querySelector('.modal-form__item input[email]');
let nameId = document.getElementById('name');
let emailId = document.getElementById('email');
let scrollPos = 0;
let isStorageSupport = true;
let storage = '';

mainHeader.classList.remove('main-header--nojs');
mainNav.classList.remove('nav--nojs');
mainHeaderLink.classList.remove('main-header__link-wrap--nojs');
toggleBtn.classList.remove('main-header__toggle--nojs');
footer.classList.remove('footer-page--nojs');

toggleBtn.addEventListener('click', function () {
  mainNav.classList.toggle('nav--closed');
  mainHeaderLink.classList.toggle('main-header__link-wrap--closed');
  footer.classList.toggle('footer-page--closed');
});

toggleBtn.addEventListener('click', function () {
  toggleBtn.classList.toggle('main-header__toggle--closed');
});

linkCity.addEventListener('click', function () {
  modalCity.classList.add('modal--show');
});

modalToggle.addEventListener('click', function () {
  modalCity.classList.remove('modal--show');
});

try {
  storage = localStorage.getItem('name');
} catch (err) {
  isStorageSupport = false;
}

questionBtn.addEventListener('click', function (e) {
  e.preventDefault();
  questionModal.classList.add('modal-form--show');
  if (storage) {
    nameId.value = storage;
    emailId.focus();
  } if (storage !== '') {
    nameId.focus();
  } else {
    nameId.focus();
  }
});

modalFormQuestion.addEventListener('submit', function (e) {
  e.preventDefault();
  if (isStorageSupport) {
    localStorage.setItem('name', name.value);
    name.value = localStorage.getItem('name');
    localStorage.setItem('email', email.value);
    email.value = localStorage.getItem('email');
  }
});

questionClose.addEventListener('click', function () {
  questionModal.classList.remove('modal-form--show');
});

if (modalCity) {
  modalCity.addEventListener('click', function () {
    modalCity.classList.remove('modal--show');
  });

  if (modalForm) {
    modalForm.addEventListener('click', function (e) {
      e.stopPropagation();
    });
  }
}

if (questionModal) {
  questionModal.addEventListener('click', function () {
    questionModal.classList.remove('modal-form--show');
  });

  if (modalFormQuestion) {
    modalFormQuestion.addEventListener('click', function (e) {
      e.stopPropagation();
    });
  }
}

document.addEventListener('keyup', function (e) {
  if (e.key === 'Escape') {
    modalCity.classList.remove('modal--show');
    questionModal.classList.remove('modal-form--show');
  }
});

function checkPosition(e) {
  let windowY = window.scrollY;
  if (windowY < scrollPos) {
    // Scrolling UP
    element.classList.remove('quest-order__text-wrap--hidden');
  } else if (!element) {
    e.preventDefault();
  } else {
    // Scrolling DOWN
    element.classList.add('quest-order__text-wrap--hidden');
    scrollPos = windowY;
  }
}

window.addEventListener('scroll', checkPosition);

$(document).ready(function () {
  $('.modal-form__item input').on('input', function (e) {
    let $this = $(e.target);
    if ($this.val() === '') {
      $this.removeClass('modal-form__item-filled');
    } else {
      $this.addClass('modal-form__item-filled');
    }
  });

  $('.modal-form__question').validate({
    rules: {
      name: true,
      minlength: 2
    },
    email: {
      required: true,
      email: true
    },
    messages: {
      email: {
        required: 'Пожалуйста заполните поле',
        email: 'Введён некорректный e-mail, попробуйте заново'
      },
      name: {
        required: 'Пожалуйста заполните поле',
        minlength: 'Введите не менее 2х символов'
      },
      check: {
        required: 'Пожалуйста поставьте галочку'
      },
    },
    submitHandler: function (form) {
      form.submit();
      form.reset();
    }
  });

  $('.modal-form__button, .modal-form__list input, .modal-form__checkbox input ').on('blur input keyup', function () {
    if ($('.modal-form__question').valid()) {
      $('.modal-form__button').addClass('modal-form__button--checked');
    } else {
      $('.modal-form__button').removeClass('modal-form__button--checked');
    }
  });
});
