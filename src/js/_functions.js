const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelector('.dots');
const arrowPrev = document.querySelector('.arrow-prev');
const arrowNext = document.querySelector('.arrow-next');

for (let i = 0; i < slides.length; i++) {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  dots.appendChild(dot);
}

const dotItems = document.querySelectorAll('.dot');
let currentSlide = 0;
let touchStartX = 0;
let touchEndX = 0;

slides[currentSlide].style.display = 'flex';
dotItems[currentSlide].classList.add('active');

function changeSlide(index) {

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  for (let i = 0; i < dotItems.length; i++) {
    dotItems[i].classList.remove('active');
  }

  slides[index].style.display = 'flex';
  dotItems[index].classList.add('active');
}


for (let i = 0; i < dotItems.length; i++) {
  dotItems[i].addEventListener('click', function (e) {
    const dotIndex = Array.prototype.indexOf.call(dotItems, e.target);
    changeSlide(dotIndex);
  });
}


arrowPrev.addEventListener('click', function () {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  changeSlide(currentSlide);
});

arrowNext.addEventListener('click', function () {
  currentSlide = (currentSlide + 1) % slides.length;
  changeSlide(currentSlide);
});


slider.addEventListener('touchstart', function (e) {
  touchStartX = e.touches[0].clientX;
});

slider.addEventListener('touchend', function (e) {
  touchEndX = e.changedTouches[0].clientX;
  handleSwipe();
});


slider.addEventListener('mousedown', function (e) {
  touchStartX = e.clientX;
});

slider.addEventListener('mouseup', function (e) {
  touchEndX = e.clientX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const touchDiff = touchEndX - touchStartX;

  if (touchDiff > swipeThreshold) {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    changeSlide(currentSlide);
  } else if (touchDiff < -swipeThreshold) {

    currentSlide = (currentSlide + 1) % slides.length;
    changeSlide(currentSlide);
  }
}

const burgerMenu = document.getElementById('burgerMenu');
const menuList = document.querySelector('.menu-list');
const menuItems = menuList.getElementsByTagName('a');
let menuOpen = false;

burgerMenu.addEventListener('click', toggleMenu);

for (let i = 0; i < menuItems.length; i++) {
  menuItems[i].addEventListener('click', closeMenu);
}

function toggleMenu() {
  const lines = document.getElementsByClassName('line');
  if (menuOpen) {
    closeMenu(lines);
    menuOpen = false;
  } else {
    openMenu(lines);
    menuOpen = true;
  }
}

function openMenu(lines) {
  lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
  lines[1].style.opacity = '0';
  lines[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  if (window.innerWidth <= 768) {
    menuList.style.display = 'block';
  }
}

function closeMenu() {
  const lines = document.getElementsByClassName('line');
  lines[0].style.transform = 'none';
  lines[1].style.opacity = '1';
  lines[2].style.transform = 'none';
  if (window.innerWidth <= 768) {
    menuList.style.display = 'none';
    menuOpen = false;
  }
}

const input1 = document.getElementById('input1');
const input2 = document.getElementById('input2');
const input3 = document.getElementById('input3');
const input4 = document.getElementById('input4');
const mobileBlock = document.getElementById('mobile');
const subscribeBtn = document.getElementById('subscribeBtn');

const validateCode = () => {
  const code = input1.value + input2.value + input3.value + input4.value;
  if (code === '4231') {
    subscribeBtn.style.background = 'linear-gradient(180deg, #32E28E 0%, #19C974 100%)';
    mobileBlock.style.display = 'block';
  } else {
    subscribeBtn.style.backgroundColor = '';
    mobileBlock.style.display = 'none';
  }
};

input1.addEventListener('input', validateCode);
input2.addEventListener('input', validateCode);
input3.addEventListener('input', validateCode);
input4.addEventListener('input', validateCode);

const validatePIN = () => {
  const pin = input1.value + input2.value + input3.value + input4.value;
  const pinRegex = /^\d{4}$/;

  if (pinRegex.test(pin)) {
    if (pin === '4231') {
      subscribeBtn.disabled = false;
    }
  } else {
    subscribeBtn.disabled = true;
  }
};

const moveToNextInput = (currentInput, nextInput) => {
  if (currentInput.value.length === 1) {
    nextInput.focus();
  }
};

input1.addEventListener('input', () => {
  validatePIN();
  moveToNextInput(input1, input2);
});
input2.addEventListener('input', () => {
  validatePIN();
  moveToNextInput(input2, input3);
});
input3.addEventListener('input', () => {
  validatePIN();
  moveToNextInput(input3, input4);
});
input4.addEventListener('input', () => {
  validatePIN();
  moveToNextInput(input4, subscribeBtn);
});

const inputElement = document.getElementById('maskedInput');

inputElement.addEventListener('input', function(event) {
  const doneNum = document.getElementById('done');
  const phoneNumberFormBtn = document.getElementById('phoneNumberFormBtn');
  const input = event.target.value.replace(/\D/g, '');
  const formattedValue = formatNumber(input);

  event.target.value = formattedValue;

  if (input.length > 10) {
    doneNum.style.display = 'flex';
    phoneNumberFormBtn.style.background = 'linear-gradient(180deg, #32E28E 0%, #19C974 100%)';
    phoneNumberFormBtn.disabled = false;
  } else {
    doneNum.style.display = 'none';
    phoneNumberFormBtn.style.background = 'linear-gradient(180deg, #797C7B 0%, #797C7B 100%);';
    phoneNumberFormBtn.disabled = true;
  }
});

function formatNumber(input) {
  const regex = /^(\d{0,3})(\d{0,7})$/;
  const match = input.match(regex);

  if (match) {
    const formattedValue = match.slice(1).filter(Boolean).join('-');
    return formattedValue;
  } else {
    return input.slice(0, 10);
  }
}


