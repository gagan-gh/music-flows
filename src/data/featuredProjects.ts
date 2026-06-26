export type LyricLine = {
  id: string
  native: string
  romanization: string
  translation: string
}

export type LyricProject = {
  id: string
  metadata: {
    title: string
    artists: string[]
    source: string
    language: string
  }
  theme: string
  lyrics: LyricLine[]
}

export const mojarManushProject: LyricProject = {
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
    },
    {
      id: 'line-02',
      native: 'আকাশে ভাসিস হেসে কি দারুণ মেঘের বেশে।',
      romanization: 'Akashey bhashis heshe ki darun megher beshe',
      translation:
        'Floating across the sky with a smile, looking so wonderful in the guise of clouds.',
    },
    {
      id: 'line-03',
      native: 'লীলা করে হাওয়ার সাথে, যেন ভেলা বাহার দেখাস',
      romanization: 'Leela kore hawar sathe, jeno bhela bahar dekhas',
      translation:
        'Playing games with the wind, as if showcasing a beautiful spectacle on a raft.',
    },
    {
      id: 'line-04',
      native: 'এমনই রঙবাজি তোর যেন সে তোরই আকাশ।',
      romanization: 'Emon-i rongbaji tor jeno shey tor-i akash',
      translation:
        'Such are your colorful displays, as if the entire sky belongs only to you.',
    },
    {
      id: 'line-05',
      native: 'লীলা তুই অহংকারে জলধের জলান্তরে,',
      romanization: 'Leela tui ohonkare jolodher jolantore',
      translation:
        'You play your divine games with pride, passing between oceans and cosmic waters.',
    },
    {
      id: 'line-06',
      native: 'তোকে তুই হারিয়ে পাস আমাকে রূপান্তরে।',
      romanization: 'Toke tui hariye pash amake rupantore',
      translation:
        'Losing yourself, you find your reflection transformed into me.',
    },
    {
      id: 'line-07',
      native: 'ভারেতে আমার জনম, বরষনে পাই যে মোরে।',
      romanization: 'Bharete amar jonom, borshone pai je more',
      translation:
        'My birth lies in heavy burdens, yet I find my true self when the rain pours down.',
    },
    {
      id: 'line-08',
      native: 'ঝরে যে ধরার পরে খুঁজি সেই আবার তোরে।',
      romanization: 'Jhore je dhorar pore khuji shei abar tore',
      translation:
        'Falling upon the earth, I begin searching for you all over again.',
    },
    {
      id: 'line-09',
      native: 'কেমনে হালকা হব এইতো আমার আকার,',
      romanization: 'Kemone halka hobo eito amar akar',
      translation:
        'How can I ever become weightless? This heavy form is my very shape.',
    },
    {
      id: 'line-10',
      native: 'আমাকে টানছে মাটি, জল ছাড়া তার হাহাকার।',
      romanization: 'Amake tanche mati, jol chara tar hahakor',
      translation:
        'The gravity of the earth pulls me down; without water, it cries out in despair.',
    },
    {
      id: 'line-11',
      native: 'মিষ্টি বৃষ্টি বেশে তোকে দেই থাকতে হেসে,',
      romanization: 'Mishti brishti beshe toke dei thakte heshe',
      translation:
        'In the guise of sweet rain, I allow you to live happily with a smile.',
    },
    {
      id: 'line-12',
      native: 'তুই তোর রঙবাজি কর দিস মোরে কাঁদতে শেষে।',
      romanization: 'Tui tor rongbaji kor, dish more kadte sheshe',
      translation:
        'You keep playing your games with colors, leaving me to weep in the end.',
    },
    {
      id: 'line-13',
      native: 'তুই আমি একই তবু দুই রূপে বিরাজ করি,',
      romanization: 'Tui ami eki tobu dui rupe biraj kori',
      translation:
        'You and I are one and the same, yet we exist in two completely different forms.',
    },
    {
      id: 'line-14',
      native: 'কিছুতেই মন মানেনা তোকে আমি কেমনে ধরি।',
      romanization: 'Kichutei mon manena toke ami kemone dhori',
      translation:
        'My heart simply refuses to accept this; how do I ever hold onto you?',
    },
  ],
}
