// ============================
// Модальное окно заявки
// ============================

const orderDialog = document.getElementById('order-dialog');
const orderButtons = document.querySelectorAll('.product-card__button');
const closeDialogButton = document.getElementById('close-order-dialog');
const closeDialogButtonX = document.getElementById('close-order-dialog-x');
const selectedProductInput = document.getElementById('selected-product');
const selectedProductTitle = document.getElementById('selected-product-title');
const orderForm = document.getElementById('order-form');
const successMessage = document.getElementById('success-message');

// Открытие модального окна по кнопкам «Заказать»
orderButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const productName = button.dataset.product || 'Товар';

    if (!orderDialog) {
      window.location.href = 'order.html';
      return;
    }

    if (selectedProductInput) selectedProductInput.value = productName;
    if (selectedProductTitle) selectedProductTitle.textContent = productName;

    orderDialog.showModal();
  });
});

// Закрытие модального окна — обе кнопки
if (closeDialogButton) {
  closeDialogButton.addEventListener('click', () => orderDialog?.close());
}
if (closeDialogButtonX) {
  closeDialogButtonX.addEventListener('click', () => orderDialog?.close());
}

// Обработка отправки формы
if (orderForm) {
  orderForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formElements = Array.from(orderForm.elements);
    formElements.forEach((element) => {
      if (element.willValidate) {
        element.removeAttribute('aria-invalid');
      }
    });

    if (!orderForm.checkValidity()) {
      formElements.forEach((element) => {
        if (element.willValidate && !element.checkValidity()) {
          element.setAttribute('aria-invalid', 'true');
        }
      });
      orderForm.reportValidity();
      return;
    }

    if (successMessage) successMessage.hidden = false;
    orderForm.reset();
    orderDialog?.close();
  });
}

// ============================
// Фиксированная кнопка «Наверх»
// ============================

const toTopButton = document.getElementById('to-top');

if (toTopButton) {
  // Плавное появление/скрытие через класс --visible
  const toggleToTop = () => {
    if (window.scrollY > 300) {
      toTopButton.classList.add('to-top--visible');
      toTopButton.setAttribute('aria-hidden', 'false');
    } else {
      toTopButton.classList.remove('to-top--visible');
      toTopButton.setAttribute('aria-hidden', 'true');
    }
  };

  // Плавная прокрутка наверх
  toTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Слушаем скролл
  window.addEventListener('scroll', toggleToTop);

  // Проверяем при загрузке (если страница открыта не с самого верха)
  toggleToTop();
}