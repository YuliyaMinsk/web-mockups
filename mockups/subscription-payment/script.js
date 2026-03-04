const TARIFF_DATA = [
  { months: 1,  pricePerMonth: 10,   name: 'Стандарт' },
  { months: 3,  pricePerMonth: 3200, name: 'Хит' },
  { months: 6,  pricePerMonth: 3100, name: 'Комфорт' },
  { months: 12, pricePerMonth: 2950, name: 'Смарт' }
];

const RU_MONTHS_GEN = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
const RU_MONTHS_NOM = ['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь'];

function isUnpaid() {
  return document.body.dataset.billing === 'unpaid';
}

function getEndDate(months) {
  const today = new Date();
  const offset = isUnpaid() ? 0 : 1;
  return new Date(today.getFullYear(), today.getMonth() + months + offset, 0);
}

function getCurrentEndDate() {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth() + 1, 0);
}

function formatDateRu(d) {
  return d.getDate() + ' ' + RU_MONTHS_GEN[d.getMonth()] + ' ' + d.getFullYear();
}

function daysUntil(endDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((endDate - today) / 86400000);
}

function daysWord(n) {
  const m10 = n % 10, m100 = n % 100;
  if (m100 >= 11 && m100 <= 19) return 'дней';
  if (m10 === 1) return 'день';
  if (m10 >= 2 && m10 <= 4) return 'дня';
  return 'дней';
}

function monthsWord(n) {
  if (n === 1) return 'месяц';
  if (n >= 2 && n <= 4) return 'месяца';
  return 'месяцев';
}

function getAddedRange(months) {
  const today = new Date();
  const offset = isUnpaid() ? 0 : 1;
  const startIdx = (today.getMonth() + offset) % 12;
  const endIdx = (today.getMonth() + offset + months - 1) % 12;
  if (months === 1) return RU_MONTHS_NOM[startIdx];
  return RU_MONTHS_NOM[startIdx] + ' \u2014 ' + RU_MONTHS_NOM[endIdx];
}

function updateVariant(variantEl, data) {
  const endDate = getEndDate(data.months);
  const currentEnd = getCurrentEndDate();
  const days = daysUntil(endDate);
  const total = data.pricePerMonth * data.months;

  const statusBar = variantEl.querySelector('.status-bar');
  if (statusBar) {
    if (isUnpaid()) {
      statusBar.innerHTML =
        '<div>\u26a0\ufe0f Касса не оплачена</div>' +
        '<div class="status-added">Добавляется: ' + data.months + '\u00a0' + monthsWord(data.months) + ' (' + getAddedRange(data.months) + ')</div>';
    } else {
      statusBar.innerHTML =
        '<div><span>&#9989;</span> Оплачена по: ' + formatDateRu(currentEnd) + '</div>' +
        '<div class="status-added">Добавляется: ' + data.months + '\u00a0' + monthsWord(data.months) + ' (' + getAddedRange(data.months) + ')</div>';
    }
  }

  const priceEl = variantEl.querySelector('.summary-row.total .price');
  if (priceEl) priceEl.textContent = total.toLocaleString('ru') + '\u20B8';

  const detailRows = variantEl.querySelectorAll('.summary-row.detail');
  if (detailRows[0]) detailRows[0].querySelector('span:first-child').textContent = 'Лицензия ' + data.name.toLowerCase();
  if (detailRows[1]) {
    detailRows[1].querySelector('span:first-child').textContent = 'Будет оплачено по';
    detailRows[1].querySelector('span:last-child').textContent = formatDateRu(endDate) + ' (' + days + ' ' + daysWord(days) + ')';
  }
}

function showVariant(v) {
  document.querySelectorAll('.variant').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.variant-btn').forEach(el => el.classList.remove('active'));
  document.getElementById('variant' + v).classList.add('active');
  event.target.classList.add('active');
}

document.querySelectorAll('.variant').forEach(variantEl => {
  const cards = variantEl.querySelectorAll('.tariff-card');
  cards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      updateVariant(variantEl, TARIFF_DATA[idx]);
    });
  });
  const selected = variantEl.querySelector('.tariff-card.selected');
  if (selected) {
    const idx = Array.from(cards).indexOf(selected);
    if (idx >= 0) updateVariant(variantEl, TARIFF_DATA[idx]);
  }
});
