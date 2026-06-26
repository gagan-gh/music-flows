import { parseLyricProject } from './projectSchema'

const mojarManushProjectJson = {
  id: 'mojar-manush',
  metadata: {
    title: 'Mojar Manush',
    artists: ['Anusheh Anadil', 'Palki Ahmad'],
    source: 'The Saints of Sin',
    language: 'Bengali',
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

export const mojarManushProject = parseLyricProject(mojarManushProjectJson)

const mojarManushFractalJson = {
  ...mojarManushProjectJson,
  id: 'mojar-manush-fractal',
  theme: 'fractal_garden',
  lyrics: mojarManushProjectJson.lyrics.map((line, idx) =>
    idx === 3
      ? {
        ...line,
        hints: {
          ...line.hints,
          mood: 'radiant',
          intensity: Math.min(1, (line.hints.intensity ?? 0.5) + 0.18),
        },
        overrides: {
          ...(line.overrides ?? {}),
          bgStart: '#071018',
          bgMiddle: '#0b2a1f',
          bgEnd: '#123028',
          emphasis: 0.78,
        },
      }
      : idx === 6
        ? {
          ...line,
          overrides: {
            ...(line.overrides ?? {}),
            intensity: 0.74,
            glowOpacity: 0.5,
            particleOpacity: 0.46,
          },
        }
        : line,
  ),
}

const mojarManushInkJson = {
  ...mojarManushProjectJson,
  id: 'mojar-manush-ink',
  theme: 'ink_painting',
  lyrics: mojarManushProjectJson.lyrics.map((line, idx) =>
    idx === 0
      ? {
        ...line,
        hints: {
          ...line.hints,
          mood: 'wonder',
          intensity: 0.6,
        },
        overrides: {
          ...(line.overrides ?? {}),
          bgStart: '#0b0b0d',
          bgMiddle: '#1b1a1f',
          bgEnd: '#2b2730',
          emphasis: 0.6,
        },
      }
      : idx === 11
        ? {
          ...line,
          overrides: {
            ...(line.overrides ?? {}),
            intensity: 0.72,
            glowOpacity: 0.38,
            particleOpacity: 0.22,
            emphasis: 0.5,
          },
        }
        : line,
  ),
}

export const mojarManushFractalProject = parseLyricProject(mojarManushFractalJson)
export const mojarManushInkProject = parseLyricProject(mojarManushInkJson)
