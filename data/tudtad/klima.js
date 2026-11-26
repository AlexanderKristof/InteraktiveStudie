/* Tudtad? – Környezet és klíma. Formátum: js/tudtad.js */
STUDIE.addFacts([
  {
    id: 'klima-tyndall', cat: 'fold',
    q: 'az üvegházhatást már az **1850-es években** laboratóriumban kimutatták?',
    why: '**Eunice Foote** amerikai kutató 1856-ban üvegedényekben mutatta meg, hogy a napon a szén-dioxiddal töltött edény jobban felmelegszik. **John Tyndall** 1859-től pontos mérésekkel igazolta, hogy a vízgőz és a CO₂ elnyeli a hősugárzást. **Svante Arrhenius** 1896-ban már kiszámolta, hogy a CO₂ duplázódása több fokos melegedést okozna. A klímaváltozás fizikája tehát nem új elmélet, hanem több mint 150 éves tudás.',
    links: ['lecke:klima/uveghazhatas', 'lecke:fizika/hullamok-feny']
  },
  {
    id: 'klima-legzo-gorbe', cat: 'fold',
    q: 'a Föld **„lélegzik”**: a légkör CO₂-tartalma minden tavasszal és nyáron csökken, ősszel és télen nő?',
    why: 'A szárazföldek nagy része az **északi féltekén** van. Tavasszal kihajtanak a levelek, és a fotoszintézis rengeteg CO₂-t köt meg; ősszel a lehullott levelek bomlanak, és a szén visszajut a levegőbe. Ezért rajzol a Mauna Loa-i **Keeling-görbe** évente kb. 6 ppm-es „fűrészfogat” – miközben az egész görbe évről évre feljebb kúszik.',
    links: ['lecke:klima/szenkorforgas', 'lecke:termeszet/novenyek']
  },
  {
    id: 'klima-jegbuborek', cat: 'fold',
    q: 'az Antarktisz jegébe zárt apró **légbuborékokban** 800 000 éves levegőt lehet megvizsgálni?',
    why: 'A lehullott hó évről évre összepréselődik, és a mélyben jéggé válik, a pórusaiban lévő levegő pedig bezárul. A kifúrt, több km hosszú **jégmagokból** a régi légkör CO₂- és metántartalma közvetlenül megmérhető. Eszerint 800 000 éven át a CO₂ kb. 180 és 300 ppm között ingadozott – a mai 420 ppm feletti érték messze kívül esik ezen.',
    links: ['lecke:klima/bizonyitekok']
  },
  {
    id: 'klima-magyar-napelem', cat: 'technika',
    q: 'Magyarországon 2025-ben a hazai áram kb. **28%-át napelemek** termelték, ami az EU-ban a legmagasabb arány volt?',
    why: 'A beépített napelemes teljesítmény néhány év alatt 1 GW alól **8 GW körülire** nőtt (háztartási rendszerekkel együtt). Napos nyári délben a napelemek ma már többet termelnek, mint a paksi atomerőmű. A kihívás az este és a tél: ilyenkor a napelem keveset vagy semmit sem ad, ezért kellenek a tárolók, a rugalmas fogyasztás és a szabályozható erőművek. (Forrás: Ember, 2026.)',
    links: ['lecke:klima/energia', 'lecke:napelem/mukodes']
  },
  {
    id: 'klima-sztratoszfera', cat: 'fold',
    q: 'a légkör felső része, a **sztratoszféra hűl**, miközben a felszín melegszik?',
    why: 'Ez az üvegházhatás erősödésének egyik „ujjlenyomata". Ha a Nap erősödése okozná a melegedést, a légkör minden rétege melegedne. Több CO₂ esetén viszont az alsó légkör több hőt tart vissza, a felső rétegekben pedig a CO₂ több hőt sugároz ki a világűrbe – ezért ott hűlés történik. A műholdas mérések pont ezt mutatják.',
    links: ['lecke:klima/bizonyitekok', 'lecke:foldrajz/legkor']
  },
  {
    id: 'klima-marha-bab', cat: 'etel',
    q: 'egy kiló **marhahús** előállítása átlagosan több tucatszor annyi üvegházgázzal jár, mint egy kiló **babé vagy lencséé**?',
    why: 'A kérődzők emésztése során **metán** keletkezik, a marhák tartásához pedig nagy legelő- és takarmányterület kell, ami gyakran erdőirtással jár. Egy nagy, 2018-as összesítő tanulmány (Poore és Nemecek) szerint a húsmarha átlagosan kb. 100 kg CO₂e-vel jár kilónként (tejelő állományból kb. 33 kg), a borsó kb. 1 kg-mal. Az élelmiszerek kibocsátásában a szállítás általában csak kis rész – az számít leginkább, **mit** eszünk.',
    links: ['lecke:klima/megoldasok', 'lecke:klima/mit-tehetsz']
  },
  {
    id: 'klima-balaton', cat: 'fold',
    q: 'a Balaton átlagosan csak kb. **3 méter mély**, ezért nyáron gyorsan felmelegszik és sokat párolog?',
    why: 'A sekély tó vize szorosan követi a levegő hőmérsékletét: 2022 nyarán Siófoknál 30,2 °C-os vizet mértek. Forró, aszályos nyáron a párolgás több vizet visz el, mint amennyit a csapadék és a Zala pótol, ezért esik a vízszint – 2026 júliusában kb. 64 cm volt az átlagos vízállás. A meleg víz kedvez az algásodásnak, és csökkenti az oldott oxigént.',
    links: ['lecke:klima/hatasok', 'lecke:foldrajz/vizburok']
  },
  {
    id: 'klima-hoszivattyu-negy', cat: 'technika',
    q: 'egy hőszivattyú **1 kWh áramból 3–4 kWh hőt** ad, és ez nem sérti az energiamegmaradást?',
    why: 'A hőszivattyú nem „termeli” a hőt, hanem **szállítja**: a kinti levegőből (télen is!), a talajból vagy a vízből vonja el, és magasabb hőmérsékleten adja le a lakásban – ugyanúgy, ahogy a hűtőszekrény a belsejéből a hátoldalára szállítja a hőt. Az áram csak a kompresszort hajtja. Ezért a hőszivattyús fűtés sokkal kevesebb energiát igényel, mint a villanyfűtés vagy a gázkazán.',
    links: ['lecke:klima/megoldasok', 'lecke:hoszivattyu/cop']
  },
  {
    id: 'klima-aluminium', cat: 'kemia',
    q: 'egy alumíniumdoboz újraolvasztásához csak kb. **5%** annyi energia kell, mint az új alumínium előállításához?',
    why: 'Az alumíniumot a bauxitból nyert timföldből **elektrolízissel** állítják elő, ami rengeteg áramot igényel. A fémet viszont minőségromlás nélkül újra lehet olvasztani, sokszor egymás után. Ezért az alumínium visszagyűjtése (pl. a betétdíjas REpont-rendszerben) a klímának is sokat ér.',
    links: ['lecke:klima/hulladek', 'lecke:kemia/szerves-elektrokemia']
  },
  {
    id: 'klima-ocean-ho', cat: 'fold',
    q: 'az óceánok évente kb. **18-szor annyi** többletenergiát nyelnek el, mint amennyi energiát az emberiség egy év alatt felhasznál?',
    why: 'A Föld energiamérlegének többletéből a hő **több mint 90%-a** az óceánba kerül. A WMO 2025-ös jelentése szerint az óceán az elmúlt két évtizedben évente kb. 18-szor annyi hőt nyelt el, mint az emberiség teljes éves energiafelhasználása, és 2025-ben az óceán hőtartalma rekordon volt. A víz nagy hőkapacitása miatt az óceán lassítja a felszín melegedését, de a hőt évszázadokig megtartja.',
    links: ['lecke:klima/bizonyitekok']
  }
]);
