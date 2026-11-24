/* Egyetemi / szakmai réteg: Fizika (7–8. osztály) */
STUDIE.addLessonUni('fiz-alap', {
  'energia-munka': {
    text: 'A **mechanikai munka** általános definíciója vonalintegrál: `W = ∫ F · ds`, állandó erő és egyenes pálya esetén `W = F · s · cos α`, ahol α az erő és az elmozdulás szöge. A munka **skalár**, előjeles mennyiség; mértékegysége a joule (`1 J = 1 N · m`). Merőleges erő (pl. körpályán a centripetális erő) nem végez munkát.\n\nA **munkatétel** (munka–energia tétel): a testre ható erők eredőjének munkája egyenlő a mozgási energia megváltozásával, `W_eredő = ΔE_kin`, ahol `E_kin = ½ m v²`. **Konzervatív** az az erő, amelynek munkája csak a kezdő- és végponttól függ, zárt görbén nulla; ilyen a nehézségi erő és a rugóerő. Ezekhez **potenciális energia** rendelhető: `E_h = m g h` (homogén nehézségi erőtérben), `E_rug = ½ k x²` (Hooke-törvény szerinti rugó). A **mechanikai energia megmaradása** csak konzervatív erők esetén érvényes; súrlódáskor a mechanikai energia egy része belső energiává alakul, a teljes energia azonban megmarad (a termodinamika első főtétele).\n\nA **teljesítmény** a munkavégzés sebessége: `P = dW/dt`, állandó erőnél `P = F · v`. Egysége a watt (`1 W = 1 J/s`). A gyakorlatban használt egységek: `1 kWh = 3,6 MJ`; a régi metrikus lóerő kb. 735,5 W. A **hatásfok** `η = W_hasznos / W_befektetett < 1`, mert minden valós folyamatban van disszipáció.\n\nAz **egyszerű gépek** (emelő, csiga, csigasor, lejtő, ék, csavar, hengerkerék) az erő nagyságát vagy irányát változtatják meg, munkát azonban nem takarítanak meg: ez a **mechanika aranyszabálya**. Az emelő egyensúlyának feltétele a **forgatónyomatékok** egyenlősége: `F₁ · k₁ = F₂ · k₂` (k az erőkar). A **mechanikai előny** (erőáttétel) a terhelő erő és a kifejtendő erő hányadosa; ideális lejtőn `F = m g · sin α`, `n` tartókötélágú csigasoron `F = m g / n`, cserébe a kötelet `n`-szer hosszabb úton kell húzni. Vizsgán tipikus az energia-megmaradás és a munkatétel összekapcsolása súrlódásos feladatokban.',
    glossary: [
      { hu: 'mechanikai munka', en: 'work', def: 'Az erő és az elmozdulás skaláris szorzata (általánosan vonalintegrálja); egysége a joule.' },
      { hu: 'munkatétel', en: 'work–energy theorem', def: 'Az eredő erő munkája egyenlő a mozgási energia megváltozásával.' },
      { hu: 'mozgási energia', en: 'kinetic energy', def: 'A mozgó test energiája: E = ½ m v².' },
      { hu: 'helyzeti energia', en: 'potential energy', def: 'Konzervatív erőtérben a test helyzetétől függő energia, pl. m g h.' },
      { hu: 'konzervatív erő', en: 'conservative force', def: 'Olyan erő, amelynek munkája csak a kezdő- és végponttól függ, az úttól nem.' },
      { hu: 'teljesítmény', en: 'power', def: 'Az időegység alatt végzett munka, P = dW/dt; egysége a watt.' },
      { hu: 'hatásfok', en: 'efficiency', def: 'A hasznos és a befektetett munka (energia) hányadosa, η < 1.' },
      { hu: 'forgatónyomaték', en: 'torque (moment of force)', def: 'Az erő és az erőkar szorzata; a forgást előidéző hatás mértéke.' },
      { hu: 'mechanikai előny', en: 'mechanical advantage', def: 'Egyszerű gépnél a terhelő erő és a kifejtett erő hányadosa.' }
    ]
  }
});
