const CARDS = [
  {
    name: "The Fool",
    path: "cards/fool.html",
    summary: "A leap of faith, fresh starts, curiosity."
  },
  {
    name: "The Magician",
    path: "cards/major_arcana/magician.html",
    summary: "Focused action, resourcefulness, and confidence."
  },
  {
    name: "The High Priestess",
    path: "cards/major_arcana/high_priestess.html",
    summary: "Inner knowing, intuition, and sacred stillness."
  },
  {
    name: "The Empress",
    path: "cards/major_arcana/empress.html",
    summary: "Nurturing energy, creativity, and abundance."
  },
  {
    name: "The Emperor",
    path: "cards/major_arcana/emperor.html",
    summary: "Structure, stability, and healthy leadership."
  },
  {
    name: "The Hierophant",
    path: "cards/major_arcana/hierophant.html",
    summary: "Tradition, guidance, and shared wisdom."
  },
  {
    name: "The Lovers",
    path: "cards/major_arcana/lovers.html",
    summary: "Aligned choices and heartfelt connection."
  },
  {
    name: "The Chariot",
    path: "cards/major_arcana/chariot.html",
    summary: "Momentum, courage, and decisive movement."
  },
  {
    name: "Strength",
    path: "cards/major_arcana/strength.html",
    summary: "Gentle power, patience, and resilience."
  },
  {
    name: "The Hermit",
    path: "cards/major_arcana/hermit.html",
    summary: "Introspection, solitude, and inner guidance."
  },
  {
    name: "Wheel of Fortune",
    path: "cards/major_arcana/wheel_of_fortune.html",
    summary: "Cycles, change, and turning points."
  },
  {
    name: "Justice",
    path: "cards/major_arcana/justice.html",
    summary: "Truth, balance, and accountability."
  },
  {
    name: "The Hanged Man",
    path: "cards/major_arcana/hanged_man.html",
    summary: "Surrender, perspective, and pause."
  },
  {
    name: "Death",
    path: "cards/major_arcana/death.html",
    summary: "Endings, transformation, and renewal."
  },
  {
    name: "Temperance",
    path: "cards/major_arcana/temperance.html",
    summary: "Balance, harmony, and integration."
  },
  {
    name: "The Devil",
    path: "cards/major_arcana/devil.html",
    summary: "Attachment, temptation, and shadow work."
  },
  {
    name: "The Tower",
    path: "cards/major_arcana/tower.html",
    summary: "Sudden change, revelation, and rebuilding."
  },
  {
    name: "The Star",
    path: "cards/major_arcana/star.html",
    summary: "Hope, renewal, and spiritual guidance."
  },
  {
    name: "The Moon",
    path: "cards/major_arcana/moon.html",
    summary: "Intuition, mystery, and emotional tides."
  },
  {
    name: "The Sun",
    path: "cards/major_arcana/sun.html",
    summary: "Joy, clarity, and vitality."
  },
  {
    name: "Judgement",
    path: "cards/major_arcana/judgement.html",
    summary: "Awakening, reflection, and calling."
  },
  {
    name: "The World",
    path: "cards/major_arcana/world.html",
    summary: "Completion, integration, and fulfillment."
  },
  {
    name: "Ace of Cups",
    path: "cards/ace_of_cups.html",
    summary: "Emotional renewal, heartfelt openness."
  }
];

const NFC_STORAGE_KEY = "tarotNfcSpread";

const randomCard = () => {
  const index = Math.floor(Math.random() * CARDS.length);
  return CARDS[index];
};

const normalize = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const CARD_BY_SLUG = CARDS.reduce((lookup, card) => {
  lookup[normalize(card.name)] = card;
  return lookup;
}, {});

const setText = (id, value) => {
  const node = document.getElementById(id);
  if (node) {
    node.textContent = value;
  }
};

const setLink = (id, value) => {
  const node = document.getElementById(id);
  if (node) {
    node.href = value;
  }
};

const setVisible = (id, visible) => {
  const node = document.getElementById(id);
  if (node) {
    node.hidden = !visible;
  }
};

const parseSpreadCards = () => {
  try {
    const raw = localStorage.getItem(NFC_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveSpreadCards = (cards) => {
  localStorage.setItem(NFC_STORAGE_KEY, JSON.stringify(cards.slice(0, 3)));
};

const clearSpreadCards = () => {
  localStorage.removeItem(NFC_STORAGE_KEY);
};

const addTappedCard = (slug) => {
  const card = CARD_BY_SLUG[slug];
  if (!card) {
    return;
  }

  const cards = parseSpreadCards();
  if (cards.length === 3) {
    cards.shift();
  }

  cards.push(card);
  saveSpreadCards(cards);
};

const getUrlParams = () => new URLSearchParams(window.location.search);

const renderDailyDraw = () => {
  const card = randomCard();
  setText("daily-card-name", card.name);
  setText("daily-card-summary", card.summary);
  setLink("daily-card-link", card.path);
};

const renderSpread = () => {
  const slots = ["past", "present", "future"];
  const params = getUrlParams();
  const tappedSlug = params.get("tap");

  if (tappedSlug) {
    addTappedCard(normalize(tappedSlug));
    window.history.replaceState({}, "", window.location.pathname);
  }

  const tappedCards = parseSpreadCards();
  const useTappedCards = tappedCards.length > 0;

  const spreadCards = useTappedCards
    ? slots.map((_, index) => tappedCards[index] || null)
    : slots.map(() => randomCard());

  slots.forEach((slot, index) => {
    const card = spreadCards[index];
    if (!card) {
      setText(`${slot}-name`, "Waiting for tap...");
      setText(`${slot}-summary`, "Tap another NFC card to fill this position.");
      setLink(`${slot}-link`, "cards/index.html");
      return;
    }

    setText(`${slot}-name`, card.name);
    setText(`${slot}-summary`, card.summary);
    setLink(`${slot}-link`, card.path);
  });

  setVisible("nfc-progress", useTappedCards);
  setText("nfc-progress", `Tapped cards: ${tappedCards.length}/3`);
};

const bindControls = () => {
  const clearButton = document.getElementById("clear-spread");
  if (clearButton) {
    clearButton.addEventListener("click", () => {
      clearSpreadCards();
      window.location.reload();
    });
  }
};

const init = () => {
  if (document.getElementById("daily-card-name")) {
    renderDailyDraw();
  }
  if (document.getElementById("past-name")) {
    renderSpread();
  }
  bindControls();
};

document.addEventListener("DOMContentLoaded", init);
