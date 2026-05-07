// открытие модалки

const buttonOpenModal = document.querySelector("#buttonOpenModal");
if (buttonOpenModal) {
  buttonOpenModal.addEventListener("click", () => {
    const modal = document.querySelector("#navigation");
    const header = document.querySelector(".header");
    modal.classList.toggle("header__nav_open");
    header.classList.toggle("header__modal_active");
    buttonOpenModal.classList.toggle("header__burger_open");
    document.body.classList.toggle("no-scroll");
  });
}

//  копирование промокода
const copyBtn = document.querySelector("#promoCopy");
const codeEl = document.querySelector("#promoCode");

if (copyBtn && codeEl) {
  copyBtn.addEventListener("click", async () => {
    const text = codeEl.textContent.trim();
    if (!text) return;

    const flashCopied = () => {
      const original = copyBtn.textContent;
      copyBtn.textContent = "Скопировано";
      copyBtn.classList.add("promo__copy_copied");
      setTimeout(() => {
        copyBtn.textContent = original;
        copyBtn.classList.remove("promo__copy_copied");
      }, 1500);
    };

    const fallback = () => {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.cssText = "position:absolute;left:-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        flashCopied();
      } catch {}
      document.body.removeChild(textarea);
    };

    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        flashCopied();
      } catch {
        fallback();
      }
    } else {
      fallback();
    }
  });
}

// аккордеон
const faqItems = document.querySelectorAll(".faq__item");

const closeFaq = (item) => {
  item.classList.remove("faq__item_open");
  const content = item.querySelector(".faq__answer");
  if (!content) return;

  content.style.height = `${content.scrollHeight}px`;
  content.style.height = "0px";
};

const openFaq = (item) => {
  item.classList.add("faq__item_open");
  const content = item.querySelector(".faq__answer");
  if (!content) return;

  content.style.height = "0px";
  content.style.height = `${content.scrollHeight}px`;

  const onEnd = (e) => {
    if (e.propertyName !== "height") return;
    content.removeEventListener("transitionend", onEnd);
    content.style.height = "auto";
  };
  content.addEventListener("transitionend", onEnd);
};

faqItems.forEach((item) => {
  const question = item.querySelector(".faq__question");
  if (!question) return;

  question.addEventListener("click", () => {
    if (item.classList.contains("faq__item_open")) {
      closeFaq(item);
      return;
    }

    faqItems.forEach((other) => {
      if (other !== item && other.classList.contains("faq__item_open")) {
        closeFaq(other);
      }
    });
    openFaq(item);
  });
});

// таблица с выигрышами в реальном времени
function addLiveRow(game, coef, win, player = "", bet = "") {
  const body = document.querySelector('[role="rowgroup"]');
  if (!body) return;

  const row = document.createElement("div");
  row.className = "live__row live__row-new live__row-table";
  row.setAttribute("role", "row");

  row.innerHTML = `
    <span class="live__cell" role="cell">${escapeHtml(game)}</span>
    <span class="live__cell" role="cell">${escapeHtml(player)}</span>
    <span class="live__cell" role="cell">${escapeHtml(bet)}</span>
    <span class="live__cell" role="cell"><span class="live__coef">${escapeHtml(coef)}</span></span>
    <span class="live__cell" role="cell">${escapeHtml(win)}</span>
  `;

  body.prepend(row);

  const rows = body.querySelectorAll(".live__row");
  if (rows.length > 8) {
    rows[rows.length - 1].remove();
  }

  const container = document.querySelector(".live__container");
  if (container) {
    container.scrollTo({ top: 0, behavior: "smooth" });
  }

  row.addEventListener(
    "animationend",
    () => {
      row.classList.remove("live__row-new");
    },
    { once: true },
  );
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(text));
  return div.innerHTML;
}

setInterval(() => {
  const games = [
    "Piramid Linx",
    "Fortune Rabbit",
    "Crazy Monkey",
    "Book of Ra",
    "Lucky Of Tiger",
    "Candy Burst",
    "Dolphin's Pearl",
    "Arowanas Luck",
    "Fruit Cocktail",
    "Resident",
  ];
  const players = [
    "Max_747",
    "LuckyOne",
    "SpinKing",
    "GamerGirl",
    "BetMaster",
    "JackpotJoe",
    "SlotQueen",
    "HighRoller",
    "LuckyLuke",
    "SpinWizard",
  ];
  const randomGame = games[Math.floor(Math.random() * games.length)];
  const randomPlayer = players[Math.floor(Math.random() * players.length)];
  const randomBet = Math.floor(Math.random() * 500 + 50);
  const randomCoef = (Math.random() * 15 + 1.2).toFixed(1);
  const randomWin = Math.floor(randomBet * parseFloat(randomCoef));

  addLiveRow(
    randomGame,
    `x${randomCoef}`,
    `${randomWin} ₽`,
    randomPlayer,
    `${randomBet} ₽`,
  );
}, 4000);
