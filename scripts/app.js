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

const randomCard = () => {
  const index = Math.floor(Math.random() * CARDS.length);
  return CARDS[index];
};

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

const renderDailyDraw = () => {
  const card = randomCard();
  setText("daily-card-name", card.name);
  setText("daily-card-summary", card.summary);
  setLink("daily-card-link", card.path);
};

const renderSpread = () => {
  const slots = ["past", "present", "future"].map((slot) => ({
    slot,
    card: randomCard()
  }));

  slots.forEach(({ slot, card }) => {
    setText(`${slot}-name`, card.name);
    setText(`${slot}-summary`, card.summary);
    setLink(`${slot}-link`, card.path);
  });
};

const init = () => {
  if (document.getElementById("daily-card-name")) {
    renderDailyDraw();
  }
  if (document.getElementById("past-name")) {
    renderSpread();
  }
};

document.addEventListener("DOMContentLoaded", init);
