
const mojarManushProjectJson = {
  id: 'mojar-manush',
  metadata: {
    title: 'Mojar Manush',
    artists: ['Anusheh Anadil', 'Palki Ahmad'],
    source: 'The Saints of Sin',
    language: 'Bengali',
    songUrl: 'https://music.youtube.com/watch?v=G6OCJa1jBdY',
  },
  theme: 'particle_dream',
  lyrics: [
    {
      id: 'line-01',
      native: 'তুই তো মজার মানুষ, হালকা জলের ফানুস',
      romanization: 'Tui to mojar manush, halka joler phanus',
      translation:
        'You are such a fascinating person, like a weightless lantern of water.',
      hints: {
        mood: 'wonder',
        intensity: 0.46,
        tags: ['water', 'light'],
      },
    },
    {
      id: 'line-02',
      native: 'আকাশে ভাসিস হেসে কি দারুণ মেঘের বেশে।',
      romanization: 'Akashey bhashis heshe ki darun megher beshe',
      translation:
        'Floating across the sky with a smile, looking so wonderful in the guise of clouds.',
      hints: {
        mood: 'weightless',
        intensity: 0.52,
        tags: ['sky', 'cloud'],
      },
    },
    {
      id: 'line-03',
      native: 'লীলা করে হাওয়ার সাথে, যেন ভেলা বাহার দেখাস',
      romanization: 'Leela kore hawar sathe, jeno bhela bahar dekhas',
      translation:
        'Playing games with the wind, as if showcasing a beautiful spectacle on a raft.',
      hints: {
        mood: 'playful',
        intensity: 0.58,
        tags: ['wind', 'flow'],
      },
    },
    {
      id: 'line-04',
      native: 'এমনই রঙবাজি তোর যেন সে তোরই আকাশ।',
      romanization: 'Emon-i rongbaji tor jeno shey tor-i akash',
      translation:
        'Such are your colorful displays, as if the entire sky belongs only to you.',
      hints: {
        mood: 'radiant',
        intensity: 0.68,
        tags: ['color', 'sky'],
      },
    },
    {
      id: 'line-05',
      native: 'লীলা তুই অহংকারে জলধের জলান্তরে,',
      romanization: 'Leela tui ohonkare jolodher jolantore',
      translation:
        'You play your divine games with pride, passing between oceans and cosmic waters.',
      hints: {
        mood: 'vast',
        intensity: 0.62,
        tags: ['ocean', 'water'],
      },
    },
    {
      id: 'line-06',
      native: 'তোকে তুই হারিয়ে পাস আমাকে রূপান্তরে।',
      romanization: 'Toke tui hariye pash amake rupantore',
      translation:
        'Losing yourself, you find your reflection transformed into me.',
      hints: {
        mood: 'reflective',
        intensity: 0.56,
        tags: ['mirror', 'transformation'],
      },
    },
    {
      id: 'line-07',
      native: 'ভারেতে আমার জনম, বরষনে পাই যে মোরে।',
      romanization: 'Bharete amar jonom, borshone pai je more',
      translation:
        'My birth lies in heavy burdens, yet I find my true self when the rain pours down.',
      hints: {
        mood: 'heavy',
        intensity: 0.6,
        tags: ['rain', 'earth'],
      },
      overrides: {
        intensity: 0.88,
        glowOpacity: 0.56,
        particleOpacity: 0.64,
        emphasis: 0.86,
      },
    },
    {
      id: 'line-08',
      native: 'ঝরে যে ধরার পরে খুঁজি সেই আবার তোরে।',
      romanization: 'Jhore je dhorar pore khuji shei abar tore',
      translation:
        'Falling upon the earth, I begin searching for you all over again.',
      hints: {
        mood: 'searching',
        intensity: 0.5,
        tags: ['falling', 'earth'],
      },
    },
    {
      id: 'line-09',
      native: 'কেমনে হালকা হব এইতো আমার আকার,',
      romanization: 'Kemone halka hobo eito amar akar',
      translation:
        'How can I ever become weightless? This heavy form is my very shape.',
      hints: {
        mood: 'burdened',
        intensity: 0.44,
        tags: ['weight', 'body'],
      },
    },
    {
      id: 'line-10',
      native: 'আমাকে টানছে মাটি, জল ছাড়া তার হাহাকার।',
      romanization: 'Amake tanche mati, jol chara tar hahakor',
      translation:
        'The gravity of the earth pulls me down; without water, it cries out in despair.',
      hints: {
        mood: 'desolate',
        intensity: 0.42,
        tags: ['earth', 'dryness'],
      },
    },
    {
      id: 'line-11',
      native: 'মিষ্টি বৃষ্টি বেশে তোকে দেই থাকতে হেসে,',
      romanization: 'Mishti brishti beshe toke dei thakte heshe',
      translation:
        'In the guise of sweet rain, I allow you to live happily with a smile.',
      hints: {
        mood: 'gentle',
        intensity: 0.54,
        tags: ['rain', 'smile'],
      },
    },
    {
      id: 'line-12',
      native: 'তুই তোর রঙবাজি কর দিস মোরে কাঁদতে শেষে।',
      romanization: 'Tui tor rongbaji kor, dish more kadte sheshe',
      translation:
        'You keep playing your games with colors, leaving me to weep in the end.',
      hints: {
        mood: 'wounded',
        intensity: 0.5,
        tags: ['color', 'tears'],
      },
    },
    {
      id: 'line-13',
      native: 'তুই আমি একই তবু দুই রূপে বিরাজ করি,',
      romanization: 'Tui ami eki tobu dui rupe biraj kori',
      translation:
        'You and I are one and the same, yet we exist in two completely different forms.',
      hints: {
        mood: 'dual',
        intensity: 0.62,
        tags: ['union', 'duality'],
      },
    },
    {
      id: 'line-14',
      native: 'কিছুতেই মন মানেনা তোকে আমি কেমনে ধরি।',
      romanization: 'Kichutei mon manena toke ami kemone dhori',
      translation:
        'My heart simply refuses to accept this; how do I ever hold onto you?',
      hints: {
        mood: 'longing',
        intensity: 0.66,
        tags: ['love', 'loss'],
      },
    },
  ],
}



export const bihariniProjectJson = {
  "id": "mayabono-biharini",
  "metadata": {
    "title": "Mayabono Biharini",
    "artists": ["Rabindranath Tagore"],
    "source": "Rabindra Sangeet",
    "language": "Bengali",
    "songUrl": "https://music.youtube.com/watch?v=mbpi6o4cktk"
  },
  "theme": "particle_dream",
  "lyrics": [
    {
      "id": "line-01",
      "native": "মায়াবন বিহারিনী হরিণী",
      "romanization": "Mayabono biharini horini",
      "translation": "The doe that wanders in the enchanted forest",
      "hints": {
        "mood": "wonder",
        "intensity": 0.55,
        "tags": ["forest", "dream", "nature", "light"]
      }
    },
    {
      "id": "line-02",
      "native": "গহন স্বপন সঞ্চারিণী",
      "romanization": "Gohono shopono shoncharini",
      "translation": "The one who traverses deep dreams",
      "hints": {
        "mood": "wonder",
        "intensity": 0.65,
        "tags": ["dream", "mist", "night", "cloud"]
      }
    },
    {
      "id": "line-03",
      "native": "কেন তারে ধরিবারে করি পণ",
      "romanization": "Keno tare dhoribare kori pon",
      "translation": "Why do I make a vow to capture her?",
      "hints": {
        "mood": "longing",
        "intensity": 0.72,
        "tags": ["love", "desire", "wind"]
      }
    },
    {
      "id": "line-04",
      "native": "অকারণ",
      "romanization": "Okaron",
      "translation": "Without any reason",
      "hints": {
        "mood": "reflective",
        "intensity": 0.42,
        "tags": ["silence", "echo", "dream"]
      },
      "overrides": {
        "particleDensity": 0.3,
        "particleSpeed": 0.25,
        "glow": 0.45
      }
    },
    {
      "id": "line-05",
      "native": "মায়াবন বিহারিনী",
      "romanization": "Mayabono biharini",
      "translation": "The doe that wanders in the enchanted forest",
      "hints": {
        "mood": "wonder",
        "intensity": 0.55,
        "tags": ["forest", "light", "nature"]
      }
    },
    {
      "id": "line-06",
      "native": "থাক থাক নিজমনে দূরেতে",
      "romanization": "Thak thak nijomone durete",
      "translation": "Stay, stay in your own mind, at a distance",
      "hints": {
        "mood": "gentle",
        "intensity": 0.45,
        "tags": ["distance", "wind", "silence"]
      }
    },
    {
      "id": "line-07",
      "native": "আমি শুধু বাঁশরীর সুরেতে",
      "romanization": "Ami shudhu banshoriro shurete",
      "translation": "I shall only reach you through the melody of the flute",
      "hints": {
        "mood": "gentle",
        "intensity": 0.55,
        "tags": ["music", "wind", "love"]
      }
    },
    {
      "id": "line-08",
      "native": "পরশ করিব ওর প্রাণমন",
      "romanization": "Porosho koribo or pranomon",
      "translation": "I will touch her heart and soul",
      "hints": {
        "mood": "longing",
        "intensity": 0.74,
        "tags": ["love", "light", "heart"]
      }
    },
    {
      "id": "line-09",
      "native": "অকারণ",
      "romanization": "Okaron",
      "translation": "Without any reason",
      "hints": {
        "mood": "reflective",
        "intensity": 0.4,
        "tags": ["echo", "dream"]
      },
      "overrides": {
        "particleDensity": 0.28,
        "particleSpeed": 0.22,
        "glow": 0.42
      }
    },
    {
      "id": "line-10",
      "native": "চমকিবে ফাগুনেরও পবনে",
      "romanization": "Chomokibe faguner-o pobone",
      "translation": "She will startle in the spring breeze",
      "hints": {
        "mood": "radiant",
        "intensity": 0.78,
        "tags": ["wind", "spring", "light", "flowers"]
      }
    },
    {
      "id": "line-11",
      "native": "পশিবে আকাশবাণী শ্রবণে",
      "romanization": "Poshibe akashbani shrobone",
      "translation": "A celestial message will enter her ears",
      "hints": {
        "mood": "wonder",
        "intensity": 0.82,
        "tags": ["sky", "light", "voice", "cloud"]
      }
    },
    {
      "id": "line-12",
      "native": "চিত্ত আকুল হবে অনুখন",
      "romanization": "Chitto akul hobe anukhon",
      "translation": "Her heart will grow restless every moment",
      "hints": {
        "mood": "longing",
        "intensity": 0.84,
        "tags": ["heart", "love", "wind"]
      }
    },
    {
      "id": "line-13",
      "native": "অকারণ",
      "romanization": "Okaron",
      "translation": "Without any reason",
      "hints": {
        "mood": "reflective",
        "intensity": 0.4,
        "tags": ["echo", "silence"]
      },
      "overrides": {
        "particleDensity": 0.28,
        "particleSpeed": 0.22,
        "glow": 0.42
      }
    },
    {
      "id": "line-14",
      "native": "দূর হতে আমি তারে সাধিব",
      "romanization": "Dur hote ami tare sadhibo",
      "translation": "From a distance, I shall woo her",
      "hints": {
        "mood": "longing",
        "intensity": 0.7,
        "tags": ["distance", "love", "wind"]
      }
    },
    {
      "id": "line-15",
      "native": "গোপনে বিরহডোরে বাঁধিব",
      "romanization": "Gopone biroho dore bandhibo",
      "translation": "In secret, I will bind her with the bonds of separation",
      "hints": {
        "mood": "heavy",
        "intensity": 0.88,
        "tags": ["love", "tears", "distance"]
      }
    },
    {
      "id": "line-16",
      "native": "বন্ধন বিহীন সেই যে বাঁধন",
      "romanization": "Bandhono bihin sei je badhon",
      "translation": "That bond which is without physical ties",
      "hints": {
        "mood": "reflective",
        "intensity": 0.76,
        "tags": ["love", "light", "spirit"]
      }
    },
    {
      "id": "line-17",
      "native": "অকারণ",
      "romanization": "Okaron",
      "translation": "Without any reason",
      "hints": {
        "mood": "reflective",
        "intensity": 0.35,
        "tags": ["silence", "echo", "dream"]
      },
      "overrides": {
        "particleDensity": 0.18,
        "particleSpeed": 0.12,
        "glow": 0.35,
        "fadeDuration": 2.5
      }
    },
    {
      "id": "line-18",
      "native": "মায়াবন বিহারিনী হরিণী",
      "romanization": "Mayabono biharini horini",
      "translation": "The doe that wanders in the enchanted forest",
      "hints": {
        "mood": "wonder",
        "intensity": 0.55,
        "tags": ["forest", "dream", "nature", "light"]
      }
    },
    {
      "id": "line-19",
      "native": "গহন স্বপন সঞ্চারিণী",
      "romanization": "Gohono shopono shoncharini",
      "translation": "The one who traverses deep dreams",
      "hints": {
        "mood": "wonder",
        "intensity": 0.65,
        "tags": ["dream", "mist", "night", "cloud"]
      }
    },
    {
      "id": "line-20",
      "native": "কেন তারে ধরিবারে করি পণ",
      "romanization": "Keno tare dhoribare kori pon",
      "translation": "Why do I make a vow to capture her?",
      "hints": {
        "mood": "longing",
        "intensity": 0.72,
        "tags": ["love", "desire", "wind"]
      }
    },
    {
      "id": "line-21",
      "native": "অকারণ",
      "romanization": "Okaron",
      "translation": "Without any reason",
      "hints": {
        "mood": "reflective",
        "intensity": 0.42,
        "tags": ["silence", "echo", "dream"]
      },
      "overrides": {
        "particleDensity": 0.3,
        "particleSpeed": 0.25,
        "glow": 0.45
      }
    },
    {
      "id": "line-22",
      "native": "মায়াবন বিহারিনী",
      "romanization": "Mayabono biharini",
      "translation": "The doe that wanders in the enchanted forest",
      "hints": {
        "mood": "wonder",
        "intensity": 0.55,
        "tags": ["forest", "light", "nature"]
      }
    },
  ]
}

export const tomarGhore = {
  "id": "tomar-ghore-bosot-kore-koyjona",
  "metadata": {
    "title": "Tomar Ghore Bosot Kore Koyjona",
    "artists": ["Anusheh Anadil"],
    "source": "Lalon Shah (Baul)",
    "language": "Bengali",
    "songUrl": "https://music.youtube.com/watch?v=DDHaR_hrxt8"
  },
  "theme": "particle_dream",
  "lyrics": [
    {
      "id": "line-01",
      "native": "তোমার ঘরে বাস করে কারা ও মন জানো না",
      "romanization": "Tomar ghore bash kore kara o mon jano na",
      "translation": "Who lives in your house, O mind, do you not know?",
      "hints": {
        "mood": "reflective",
        "intensity": 0.72,
        "tags": ["mind", "home", "spirit", "mystery"]
      }
    },
    {
      "id": "line-02",
      "native": "তোমার ঘরে বসৎ করে কয়জনা",
      "romanization": "Tomar ghore bosot kore koyjona",
      "translation": "How many reside in your house?",
      "hints": {
        "mood": "reflective",
        "intensity": 0.68,
        "tags": ["mind", "question", "echo"]
      },
      "overrides": {
        "particleDensity": 0.35,
        "particleSpeed": 0.25,
        "glow": 0.45
      }
    },
    {
      "id": "line-03",
      "native": "একজনে ছবি আঁকে এক মনে ও মন",
      "romanization": "Ekjone chobi aanke ek mone o mon",
      "translation": "One paints a picture with total focus, O mind",
      "hints": {
        "mood": "wonder",
        "intensity": 0.62,
        "tags": ["art", "creation", "color", "focus"]
      }
    },
    {
      "id": "line-04",
      "native": "আরেকজনে বসে বসে রং মাখে",
      "romanization": "Arekjone boshe boshe rong makhe",
      "translation": "Another sits and applies the colors",
      "hints": {
        "mood": "radiant",
        "intensity": 0.7,
        "tags": ["color", "creation", "light"]
      }
    },
    {
      "id": "line-05",
      "native": "আবার সে ছবিখান নষ্ট করে কোন্ জনা",
      "romanization": "Abar se chobikhan noshto kore kon jona",
      "translation": "And yet another destroys that very picture",
      "hints": {
        "mood": "heavy",
        "intensity": 0.86,
        "tags": ["destruction", "shadow", "conflict"]
      }
    },
    {
      "id": "line-06",
      "native": "তোমার ঘরে বসৎ করে কয়জনা",
      "romanization": "Tomar ghore bosot kore koyjona",
      "translation": "How many reside in your house?",
      "hints": {
        "mood": "reflective",
        "intensity": 0.66,
        "tags": ["mind", "echo", "question"]
      },
      "overrides": {
        "particleDensity": 0.32,
        "particleSpeed": 0.22,
        "glow": 0.42
      }
    },
    {
      "id": "line-07",
      "native": "একজনে সুর তোলে এক তারে ও মন",
      "romanization": "Ekjone shur tole ek tare o mon",
      "translation": "One tunes the single string, O mind",
      "hints": {
        "mood": "gentle",
        "intensity": 0.58,
        "tags": ["music", "harmony", "sound"]
      }
    },
    {
      "id": "line-08",
      "native": "আরেকজনে মন্দিরাতে তাল তোলে",
      "romanization": "Arekjone mondirate taal tole",
      "translation": "Another keeps the rhythm with the cymbals",
      "hints": {
        "mood": "radiant",
        "intensity": 0.72,
        "tags": ["music", "rhythm", "temple"]
      }
    },
    {
      "id": "line-09",
      "native": "আবার বেসুর আসুর ঘরে দেয় যে হানা",
      "romanization": "Abar beshur ashur ghore dey je haana",
      "translation": "And again, the dissonant one raids the house",
      "hints": {
        "mood": "wounded",
        "intensity": 0.9,
        "tags": ["conflict", "chaos", "shadow"]
      }
    },
    {
      "id": "line-10",
      "native": "তোমার ঘরে বসৎ করে কয়জনা",
      "romanization": "Tomar ghore bosot kore koyjona",
      "translation": "How many reside in your house?",
      "hints": {
        "mood": "reflective",
        "intensity": 0.66,
        "tags": ["mind", "echo", "question"]
      },
      "overrides": {
        "particleDensity": 0.32,
        "particleSpeed": 0.22,
        "glow": 0.42
      }
    },
    {
      "id": "line-11",
      "native": "রস খাইয়া হইয়া মাতাল ওই দেখো",
      "romanization": "Rosh khaiya hoiya matal oi dekho",
      "translation": "Having consumed the nectar, intoxicated, look there",
      "hints": {
        "mood": "playful",
        "intensity": 0.76,
        "tags": ["nectar", "ecstasy", "spirit"]
      }
    },
    {
      "id": "line-12",
      "native": "হাত ফস্কে যায় ঘোড়ার লাগাম",
      "romanization": "Haat foske jaay ghorar lagaam",
      "translation": "The horse's reins slip from the hand",
      "hints": {
        "mood": "heavy",
        "intensity": 0.82,
        "tags": ["control", "journey", "motion"]
      }
    },
    {
      "id": "line-13",
      "native": "সে লাগামখানা ধরে দেখো কোন্ জনা",
      "romanization": "Se lagaamkhana dhore dekho kon jona",
      "translation": "See who it is that holds those reins",
      "hints": {
        "mood": "wonder",
        "intensity": 0.74,
        "tags": ["control", "fate", "mystery"]
      }
    },
    {
      "id": "line-14",
      "native": "তোমার ঘরে বসৎ করে কয়জনা",
      "romanization": "Tomar ghore bosot kore koyjona",
      "translation": "How many reside in your house?",
      "hints": {
        "mood": "reflective",
        "intensity": 0.55,
        "tags": ["mind", "echo", "silence"]
      },
      "overrides": {
        "particleDensity": 0.18,
        "particleSpeed": 0.12,
        "glow": 0.35,
        "fadeDuration": 2.8
      }
    }
  ]
}

const lasetusProjectJson = {
  "id": "lasetus-song",
  "metadata": {
    "title": "Lasetus",
    "artists": ["Varttina"],
    "source": "My Projects",
    "language": "Finnish",
    "songUrl": "https://music.youtube.com/watch?v=x8iRbXoiD04"
  },
  "theme": "particle_dream",
  "lyrics": [
    {
      "id": "line-01",
      "native": "Kulki, kulki kolme luonnotarta, Laulajat laajoilt lainehilta",
      "romanization": "Kulki, kulki kolme luonnotarta, Laulajat laajoilt lainehilta",
      "translation": "Traveled the nature maidens, singers from the vast waters.",
      "hints": {
        "mood": "wonder",
        "intensity": 0.35,
        "tags": ["water", "ocean", "wind"]
      }
    },
    {
      "id": "line-02",
      "native": "Suoltivat suen suu-suusanoilla, Laskivat laulut lappehilla",
      "romanization": "Suoltivat suen suu-suusanoilla, Laskivat laulut lappehilla",
      "translation": "Uttering the words of a wolf, singing across the lands.",
      "hints": {
        "mood": "reflective",
        "intensity": 0.45,
        "tags": ["earth", "wind"]
      }
    },
    {
      "id": "line-03",
      "native": "Noilla noijan, noijan noroilla, Näijen neitoin, neitoin neuvoilla",
      "romanization": "Noilla noijan, noijan noroilla, Näijen neitoin, neitoin neuvoilla",
      "translation": "At those creeks of a witch, with these maidens' knowledge.",
      "hints": {
        "mood": "wonder",
        "intensity": 0.55,
        "tags": ["water", "earth"]
      }
    },
    {
      "id": "line-04",
      "native": "Laativat loihtua lietsomahan, laulun lasettajan laulattamaan",
      "romanization": "Laativat loihtua lietsomahan, laulun lasettajan laulattamaan",
      "translation": "They began to cast a spell, for the song-singer to sing.",
      "hints": {
        "mood": "radiant",
        "intensity": 0.65,
        "tags": ["light", "wind"]
      }
    },
    {
      "id": "line-05",
      "native": "Virret vierivät veneen veriä, Laulut laskivat lainehilla",
      "romanization": "Virret vierivät veneen veriä, Laulut laskivat lainehilla",
      "translation": "The songs cast beside the boat, set free above the ripples.",
      "hints": {
        "mood": "gentle",
        "intensity": 0.45,
        "tags": ["water", "ocean"]
      }
    },
    {
      "id": "line-06",
      "native": "Noilla noijan, noijan noroilla, Näijen neitoin, neitoin neuvoilla",
      "romanization": "Noilla noijan, noijan noroilla, Näijen neitoin, neitoin neuvoilla",
      "translation": "At those creeks of a witch, with these maidens' knowledge.",
      "hints": {
        "mood": "reflective",
        "intensity": 0.5,
        "tags": ["water", "earth"]
      }
    },
    {
      "id": "line-07",
      "native": "Koittavat koiraset koputella, Kielen kelkettäjän käsillä",
      "romanization": "Koittavat koiraset koputella, Kielen kelkettäjän käsillä",
      "translation": "Manlings try to reach for them, with their hands of song-utterers.",
      "hints": {
        "mood": "playful",
        "intensity": 0.55,
        "tags": ["wind", "earth"]
      }
    },
    {
      "id": "line-08",
      "native": "Viekuttajaa vie-viekotteleepi, Virren vierittäjää vierittämään",
      "romanization": "Viekuttajaa vie-viekotteleepi, Virren vierittäjää vierittämään",
      "translation": "Alluring the seductress, to coax the song-casters.",
      "hints": {
        "mood": "wonder",
        "intensity": 0.65,
        "tags": ["wind", "light"]
      }
    },
    {
      "id": "line-09",
      "native": "Viekuttaja, vie-viekuttajat",
      "romanization": "Viekuttaja, vie-viekuttajat",
      "translation": "Seductress, seducers.",
      "hints": {
        "mood": "playful",
        "intensity": 0.5,
        "tags": ["wind"]
      }
    },
    {
      "id": "line-10",
      "native": "Laulun lasettajaa laulattaa, Laulun lasettajat lau-laulaa",
      "romanization": "Laulun lasettajaa laulattaa, Laulun lasettajat lau-laulaa",
      "translation": "Song-singers feel like singing, song-singers sing.",
      "hints": {
        "mood": "radiant",
        "intensity": 0.75,
        "tags": ["light", "sky"]
      }
    },
    {
      "id": "line-11",
      "native": "Kielen kelkettäjät kelkettää, Virren vierittäjää vierittää",
      "romanization": "Kielen kelkettäjät kelkettää, Virren vierittäjää vierittää",
      "translation": "Song-utterers utter, song-casters cast.",
      "hints": {
        "mood": "radiant",
        "intensity": 0.75,
        "tags": ["wind", "light"]
      }
    },
    {
      "id": "line-12",
      "native": "Lasettajia lau-laulattaa, Laulun lasettajat lau-laulaa",
      "romanization": "Lasettajia lau-laulattaa, Laulun lasettajat lau-laulaa",
      "translation": "Song-singers feel like singing, song-singers sing.",
      "hints": {
        "mood": "radiant",
        "intensity": 0.8,
        "tags": ["light", "sky"]
      }
    },
    {
      "id": "line-13",
      "native": "Kielen kelkettäjät kelkettää, hele-Helettäjät helettää.",
      "romanization": "Kielen kelkettäjät kelkettää, hele-Helettäjät helettää.",
      "translation": "Song-utterers utter, bright-singers sing.",
      "hints": {
        "mood": "radiant",
        "intensity": 0.85,
        "tags": ["light", "color"]
      }
    },
    {
      "id": "line-14",
      "native": "Nousi norosta nuo-nuorukainen, Maan ma-manalta mierolainen",
      "romanization": "Nousi norosta nuo-nuorukainen, Maan ma-manalta mierolainen",
      "translation": "Arose from the creek a manling, a stranger from the dead ground.",
      "hints": {
        "mood": "wonder",
        "intensity": 0.65,
        "tags": ["earth", "water"]
      }
    },
    {
      "id": "line-15",
      "native": "Kulkija kuita kujerteleepi, Sulosanoja suoltelevi",
      "romanization": "Kulkija kuita kujerteleepi, Sulosanoja suoltelevi",
      "translation": "A wanderer cooing the moons, uttering sweet words.",
      "hints": {
        "mood": "gentle",
        "intensity": 0.55,
        "tags": ["sky", "light"]
      }
    },
    {
      "id": "line-16",
      "native": "Näitä neitoloita nauramahan, Laulu-lauluja laittamahan",
      "romanization": "Näitä neitoloita nauramahan, Laulu-lauluja laittamahan",
      "translation": "Making the maidens laugh, making the maidens sing.",
      "hints": {
        "mood": "playful",
        "intensity": 0.6,
        "tags": ["light", "wind"]
      }
    },
    {
      "id": "line-17",
      "native": "Koittavat koiraset koputella, Kielen kelkettäjää kelkettämään",
      "romanization": "Koittavat koiraset koputella, Kielen kelkettäjää kelkettämään",
      "translation": "Manlings try to reach for them, with their hands of song-utterers.",
      "hints": {
        "mood": "playful",
        "intensity": 0.65,
        "tags": ["earth", "wind"]
      }
    },
    {
      "id": "line-18",
      "native": "Kelkettäjät, kel-kelkettäjät",
      "romanization": "Kelkettäjät, kel-kelkettäjät",
      "translation": "Utterers, utterers.",
      "hints": {
        "mood": "playful",
        "intensity": 0.55,
        "tags": ["wind"]
      }
    },
    {
      "id": "line-19",
      "native": "Laulun lasettajaa laulattaa, Laulun lasettajat lau-laulaa",
      "romanization": "Laulun lasettajaa laulattaa, Laulun lasettajat lau-laulaa",
      "translation": "Song-singers feel like singing, song-singers sing.",
      "hints": {
        "mood": "radiant",
        "intensity": 0.8,
        "tags": ["light", "sky"]
      }
    },
    {
      "id": "line-20",
      "native": "Kielen kelkettäjät kelkettää, Virren vierittäjää vierittää",
      "romanization": "Kielen kelkettäjät kelkettää, Virren vierittäjää vierittää",
      "translation": "Song-utterers utter, song-casters cast.",
      "hints": {
        "mood": "radiant",
        "intensity": 0.8,
        "tags": ["wind", "light"]
      }
    },
    {
      "id": "line-21",
      "native": "Lasettajia lau-laulattaa, Laulun lasettajat lau-laulaa",
      "romanization": "Lasettajia lau-laulattaa, Laulun lasettajat lau-laulaa",
      "translation": "Song-singers feel like singing, song-singers sing.",
      "hints": {
        "mood": "radiant",
        "intensity": 0.85,
        "tags": ["light", "color"]
      }
    },
    {
      "id": "line-22",
      "native": "Kielen kelkettäjät kelkettää, hele-Helettäjät helettää.",
      "romanization": "Kielen kelkettäjät kelkettää, hele-Helettäjät helettää.",
      "translation": "Song-utterers utter, bright-singers sing.",
      "hints": {
        "mood": "radiant",
        "intensity": 0.9,
        "tags": ["light", "color", "sky"]
      }
    },
    {
      "id": "line-23",
      "native": "Laulun lasettajaa laulattaa, Laulun Lasettajat lau-laulaa",
      "romanization": "Laulun lasettajaa laulattaa, Laulun Lasettajat lau-laulaa",
      "translation": "Song-singers feel like singing, song-singers sing.",
      "hints": {
        "mood": "radiant",
        "intensity": 0.9,
        "tags": ["light", "sky"]
      }
    },
    {
      "id": "line-24",
      "native": "Kielen kelkettäjät kelkettää, Virren vierittäjää vierittää",
      "romanization": "Kielen kelkettäjät kelkettää, Virren vierittäjää vierittää",
      "translation": "Song-utterers utter, song-casters cast.",
      "hints": {
        "mood": "radiant",
        "intensity": 0.9,
        "tags": ["wind", "light"]
      }
    },
    {
      "id": "line-25",
      "native": "Lasettajia lau-laulattaa, Laulun Lasettajat lau-laulaa",
      "romanization": "Lasettajia lau-laulattaa, Laulun Lasettajat lau-laulaa",
      "translation": "Song-singers feel like singing, song-singers sing.",
      "hints": {
        "mood": "radiant",
        "intensity": 0.95,
        "tags": ["light", "color"]
      }
    },
    {
      "id": "line-26",
      "native": "Kielen kelkettäjät kelkettää, hele-Helettäjät helettää.",
      "romanization": "Kielen kelkettäjät kelkettää, hele-Helettäjät helettää.",
      "translation": "Song-utterers utter, bright-singers sing.",
      "hints": {
        "mood": "radiant",
        "intensity": 1.0,
        "tags": ["light", "color", "sky"]
      }
    }
  ]
}

const madGirlProjectJson = {
  "id": "f7319578-1c0d-493e-89ad-2030b38eccd3",
  "metadata": {
    "title": "Mad Girl's Love Song",
    "artists": ["Sylvia Plath"],
    "source": "My Projects",
    "language": "English"
  },
  "theme": "particle_dream",
  "lyrics": [
    {
      "id": "line-01",
      "native": "...",
      "romanization": "\"I shut my eyes and all the world drops dead;",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-02",
      "native": "...",
      "romanization": "I lift my lids and all is born again.",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-03",
      "native": "...",
      "romanization": "(I think I made you up inside my head.)",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-04",
      "native": "...",
      "romanization": "The stars go waltzing out in blue and red,",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-05",
      "native": "...",
      "romanization": "And arbitrary blackness gallops in:",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-06",
      "native": "...",
      "romanization": "I shut my eyes and all the world drops dead.",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-07",
      "native": "...",
      "romanization": "I dreamed that you bewitched me into bed",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-08",
      "native": "...",
      "romanization": "And sung me moon-struck, kissed me quite insane.",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-09",
      "native": "...",
      "romanization": "(I think I made you up inside my head.)",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-10",
      "native": "...",
      "romanization": "God topples from the sky, hell's fires fade:",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-11",
      "native": "...",
      "romanization": "Exit seraphim and Satan's men:",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-12",
      "native": "...",
      "romanization": "I shut my eyes and all the world drops dead.",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-13",
      "native": "...",
      "romanization": "I fancied you'd return the way you said,",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-14",
      "native": "...",
      "romanization": "But I grow old and I forget your name.",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-15",
      "native": "...",
      "romanization": "(I think I made you up inside my head.)",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-16",
      "native": "...",
      "romanization": "I should have loved a thunderbird instead;",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-17",
      "native": "...",
      "romanization": "At least when spring comes they roar back again.",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-18",
      "native": "...",
      "romanization": "I shut my eyes and all the world drops dead.",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-19",
      "native": "...",
      "romanization": "(I think I made you up inside my head.)\"",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    }
  ]
}
const ladyLazrusProjectJson = {
  "id": "394ff597-b833-483c-af53-80e50aec8cc5",
  "metadata": {
    "title": "Lady Lazarus",
    "artists": [
      "Sylvia Plath"
    ],
    "source": "My Projects",
    "language": "English"
  },
  "theme": "particle_dream",
  "lyrics": [
    {
      "id": "line-01",
      "native": "...",
      "romanization": "I have done it again.",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-02",
      "native": "...",
      "romanization": "One year in every ten",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-03",
      "native": "...",
      "romanization": "I manage it——",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-04",
      "native": "...",
      "romanization": "A sort of walking miracle, my skin",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-05",
      "native": "...",
      "romanization": "Bright as a Nazi lampshade,",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-06",
      "native": "...",
      "romanization": "My right foot",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-07",
      "native": "...",
      "romanization": "A paperweight,",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-08",
      "native": "...",
      "romanization": "My face a featureless, fine",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-09",
      "native": "...",
      "romanization": "Jew linen.",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-10",
      "native": "...",
      "romanization": "Peel off the napkin",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-11",
      "native": "...",
      "romanization": "O my enemy.",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-12",
      "native": "...",
      "romanization": "Do I terrify?——",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-13",
      "native": "...",
      "romanization": "The nose, the eye pits, the full set of teeth?",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-14",
      "native": "...",
      "romanization": "The sour breath",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-15",
      "native": "...",
      "romanization": "Will vanish in a day.",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-16",
      "native": "...",
      "romanization": "Soon, soon the flesh",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-17",
      "native": "...",
      "romanization": "The grave cave ate will be",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-18",
      "native": "...",
      "romanization": "At home on me",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-19",
      "native": "...",
      "romanization": "And I a smiling woman.",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-20",
      "native": "...",
      "romanization": "I am only thirty.",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-21",
      "native": "...",
      "romanization": "And like the cat I have nine times to die.",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-22",
      "native": "...",
      "romanization": "This is Number Three.",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-23",
      "native": "...",
      "romanization": "What a trash",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-24",
      "native": "...",
      "romanization": "To annihilate each decade.",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-25",
      "native": "...",
      "romanization": "What a million filaments.",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-26",
      "native": "...",
      "romanization": "The peanut-crunching crowd",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-27",
      "native": "...",
      "romanization": "Shoves in to see",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-28",
      "native": "...",
      "romanization": "Them unwrap me hand and foot——",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-29",
      "native": "...",
      "romanization": "The big strip tease.",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-30",
      "native": "...",
      "romanization": "Gentlemen, ladies",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-31",
      "native": "...",
      "romanization": "These are my hands",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-32",
      "native": "...",
      "romanization": "My knees.",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-33",
      "native": "...",
      "romanization": "I may be skin and bone,",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-34",
      "native": "...",
      "romanization": "Nevertheless, I am the same, identical woman.",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-35",
      "native": "...",
      "romanization": "The first time it happened I was ten.",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-36",
      "native": "...",
      "romanization": "It was an accident.",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-37",
      "native": "...",
      "romanization": "The second time I meant",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-38",
      "native": "...",
      "romanization": "To last it out and not come back at all.",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-39",
      "native": "...",
      "romanization": "I rocked shut",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-40",
      "native": "...",
      "romanization": "As a seashell.",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-41",
      "native": "...",
      "romanization": "They had to call and call",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-42",
      "native": "...",
      "romanization": "And pick the worms off me like sticky pearls.",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-43",
      "native": "...",
      "romanization": "Dying",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-44",
      "native": "...",
      "romanization": "Is an art, like everything else.",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-45",
      "native": "...",
      "romanization": "I do it exceptionally well.",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-46",
      "native": "...",
      "romanization": "I do it so it feels like hell.",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-47",
      "native": "...",
      "romanization": "I do it so it feels real.",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-48",
      "native": "...",
      "romanization": "I guess you could say I’ve a call.",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-49",
      "native": "...",
      "romanization": "It’s easy enough to do it in a cell.",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-50",
      "native": "...",
      "romanization": "It’s easy enough to do it and stay put.",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-51",
      "native": "...",
      "romanization": "It’s the theatrical",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-52",
      "native": "...",
      "romanization": "Comeback in broad day",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-53",
      "native": "...",
      "romanization": "To the same place, the same face, the same brute",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-54",
      "native": "...",
      "romanization": "Amused shout:",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-55",
      "native": "...",
      "romanization": "‘A miracle!’",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-56",
      "native": "...",
      "romanization": "That knocks me out.",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-57",
      "native": "...",
      "romanization": "There is a charge",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-58",
      "native": "...",
      "romanization": "For the eyeing of my scars, there is a charge",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-59",
      "native": "...",
      "romanization": "For the hearing of my heart——",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-60",
      "native": "...",
      "romanization": "It really goes.",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-61",
      "native": "...",
      "romanization": "And there is a charge, a very large charge",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-62",
      "native": "...",
      "romanization": "For a word or a touch",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-63",
      "native": "...",
      "romanization": "Or a bit of blood",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-64",
      "native": "...",
      "romanization": "Or a piece of my hair or my clothes.",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-65",
      "native": "...",
      "romanization": "So, so, Herr Doktor.",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-66",
      "native": "...",
      "romanization": "So, Herr Enemy.",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-67",
      "native": "...",
      "romanization": "I am your opus,",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-68",
      "native": "...",
      "romanization": "I am your valuable,",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-69",
      "native": "...",
      "romanization": "The pure gold baby",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-70",
      "native": "...",
      "romanization": "That melts to a shriek.",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-71",
      "native": "...",
      "romanization": "I turn and burn.",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-72",
      "native": "...",
      "romanization": "Do not think I underestimate your great concern.",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-73",
      "native": "...",
      "romanization": "Ash, ash—",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-74",
      "native": "...",
      "romanization": "You poke and stir.",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-75",
      "native": "...",
      "romanization": "Flesh, bone, there is nothing there——",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-76",
      "native": "...",
      "romanization": "A cake of soap,",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-77",
      "native": "...",
      "romanization": "A wedding ring,",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-78",
      "native": "...",
      "romanization": "A gold filling.",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-79",
      "native": "...",
      "romanization": "Herr God, Herr Lucifer",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-80",
      "native": "...",
      "romanization": "Beware",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-81",
      "native": "...",
      "romanization": "Beware.",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-82",
      "native": "...",
      "romanization": "Out of the ash",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-83",
      "native": "...",
      "romanization": "I rise with my red hair",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    },
    {
      "id": "line-84",
      "native": "...",
      "romanization": "And I eat men like air.",
      "translation": "...",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": []
      }
    }
  ]
}


export const featuredJsons = [
  mojarManushProjectJson,
  bihariniProjectJson,
  tomarGhore,
  lasetusProjectJson,
  madGirlProjectJson,
  ladyLazrusProjectJson
]

