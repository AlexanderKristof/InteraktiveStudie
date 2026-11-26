/* Tantárgy: Motorsport-szerelő és versenymérnök */
STUDIE.addSubject({
  id: 'motorsport',
  stage: 'szakma',
  title: 'Motorsport-szerelő és versenymérnök',
  icon: '🏁',
  color: '#e4572e',
  description: 'Versenyhétvége, gumik, futómű-geometria, rugózás, aerodinamika, fékek, setup, telemetria és boxbiztonság: így dolgozik egy versenycsapat a kulisszák mögött.',
  intro: 'Ez a tananyag a versenyautók **szerelésének és mérnöki hangolásának** alapjait tanítja: mit csinál a szerelő a gépátvételtől a boxkiállásig, és hogyan gondolkodik a versenymérnök, amikor a pilóta azt mondja, hogy „nem fordul az autó”. Az anyag **elméleti**: a versenyautón végzett valódi munkát (emelés, fékek, üzemanyag, nagyfeszültségű hibridrendszer) csak képzett szakember felügyelete mellett, a csapat és a sorozat szabályai szerint szabad végezni. Az előismeretekhez jól jön az [[#/tantargy/autoszereles|Autószerelés]] és a [[#/lecke/sport/forma1|Forma–1: technika és fizika]] lecke.',
  lessons: [
    /* ───────────────────────── 1. ALAPOK ───────────────────────── */
    {
      id: 'alapok',
      title: 'A versenycsapat és a versenyhétvége',
      level: 1, minutes: 13,
      summary: 'Ki kicsoda egy versenycsapatban, hogyan zajlik egy versenyhétvége, milyen papírok kellenek, és mit néznek a gépátvételen.',
      tags: ['versenycsapat', 'versenymérnök', 'szerelő', 'versenyhétvége', 'gépátvétel', 'technikai átvétel', 'licenc', 'versenykiírás', 'parc fermé', 'nyomatékjelölés', 'homologizáció'],
      models: ['f1-auto'],
      sections: [
        {
          title: 'Ki kicsoda egy versenycsapatban?',
          text: 'Egy versenyautó körül a kis klubcsapatban 3–5, egy Forma–1-es istállóban a versenyhelyszínen is több tucat ember dolgozik. A szerepek nevei sorozatonként eltérnek, de a feladatok hasonlók:\n\n- **Csapatfőnök / csapatvezető**: szervezés, költségvetés, kapcsolat a rendezővel és a szövetséggel.\n- **Versenymérnök (race engineer)**: a pilóta „párja”. Ő dönt a beállításokról (setup), ő beszél a pilótával rádión, és ő fordítja le a pilóta érzéseit műszaki változtatásokra.\n- **Teljesítmény- és adatmérnök**: a telemetriát elemzi, összehasonlítja a köröket, és javaslatot tesz.\n- **Autófelelős szerelő (car chief, „number one”)**: ő felel azért, hogy az autón minden munka elkészüljön és ellenőrizve legyen.\n- **Szerelők**: futómű, fékek, hajtáslánc, váltó, elektronika; a boxkiálláson ők cserélik a kereket.\n- **Gumimérnök / gumis**: nyomások, hőmérsékletek, gumikészletek nyilvántartása.\n\nKisebb csapatban egy ember több szerepet visz: gyakori, hogy a versenymérnök maga méri a gumikat, a szerelő pedig az adatokat is letölti.'
        },
        {
          title: 'Egy versenyhétvége menetrendje',
          text: 'Egy tipikus pályaverseny hétvégéje (a pontos menetrendet mindig a **versenykiírás** és az időrend adja meg):\n\n1. **Érkezés és berendezkedés**: kipakolás, a box és a szerszámok felállítása, áram, sűrített levegő, tűzoltó készülékek kihelyezése.\n2. **Adminisztratív átvétel**: licencek, nevezés, a pilóta és a csapattagok belépői.\n3. **Gépátvétel (technikai átvétel)**: a technikai biztosok ellenőrzik az autót és a pilóta biztonsági felszerelését.\n4. **Pilótaeligazítás (briefing)**: a versenyigazgató ismerteti a pálya sajátosságait, a boxutca szabályait, a rajteljárást.\n5. **Szabadedzések**: itt dől el a setup iránya. Minden kimenet után adatletöltés, gumimérés, megbeszélés (debrief).\n6. **Időmérő edzés**: a rajtsorrend kialakítása.\n7. **Futam(ok)**.\n8. **Parc fermé és utólagos ellenőrzés**: az autót a rendező által kijelölt zárt területen tartják, és ellenőrizhetik a tömegét, méreteit, üzemanyagát.\n\nA szerelő hétvégéje hosszú: este, az edzések után jön a „feladatlista” (job list) – alkatrészcserék, átnézés, a következő napi beállítás előkészítése.',
          tip: 'Minden hétvégére készíts **időrendi táblát** a csapat számára: mikor van gépátvétel, briefing, edzés, és mennyi idő marad közte a munkára. A legtöbb hiba kapkodásból születik.'
        },
        {
          title: 'Papírmunka: licenc, kiírás, gépkönyv',
          text: 'A motorsport szabályai egy **hierarchiába** rendeződnek:\n\n- Legfelül az **FIA Nemzetközi Sportkódexe (International Sporting Code)** áll.\n- Alatta a **nemzeti szövetség** szabályai (Magyarországon a nemzeti autósport-szövetség, az MNASZ).\n- Majd a **bajnokság sportszabályai és technikai szabályai**.\n- Végül az adott verseny **versenykiírása** (supplementary regulations) és a hétvégén kiadott **végrehajtási utasítások (bulletinek)**.\n\nA pilótának a sorozathoz előírt **versenyzői licenc** kell. Az autóhoz tartozhat **homologizációs lap** (mit gyártott és engedélyeztetett a gyártó) és **technikai útlevél / gépkönyv**, amelybe a biztosok bejegyzik az ellenőrzéseket.\n\nA csapat saját papírjai legalább ennyire fontosak: **setup-lap**, alkatrész-élettartam napló (hány km-t futott a váltó, a hajtótengely), gumikészlet-nyilvántartás.',
          tip: 'A szabályokat mindig az **aktuális évi** változatból olvasd! A technikai szabályok évről évre változnak, egy tavalyi PDF alapján épített alkatrész könnyen szabálytalan lehet.'
        },
        {
          title: 'Gépátvétel: mit ellenőriznek?',
          text: 'A gépátvétel célja elsősorban a **biztonság**, másodsorban a **szabályosság**. Tipikus ellenőrzési pontok:\n\n- **Bukókeret** (bukócső) épsége, homologizációja, párnázása a sisak közelében.\n- **Ülés és biztonsági öv**: a címkén szereplő homologizáció és **lejárati idő**; az öv rögzítési pontjai.\n- **Tűzoltó rendszer**: kézi tűzoltó készülék rögzítése, a beépített oltórendszer töltöttsége és plombája.\n- **Áramtalanító főkapcsoló**: belülről és kívülről is elérhető, a kocsitesten jelölve.\n- **Vonószemek** elöl és hátul, jól látható jelöléssel.\n- **Üzemanyagrendszer**: biztonsági tartály, vezetékek, szivárgás.\n- **Pilóta felszerelése**: sisak, HANS, overall, alsóruházat, kesztyű, cipő – mind érvényes homologizációval.\n- Szükség szerint **tömegmérés**, méretek, plombák (pl. motoron, turbón).\n\nHa valami nem felel meg, az autó nem állhat rajthoz, amíg ki nem javították és újra be nem mutatták.',
          warn: 'A lejárt biztonsági öv, sisak vagy HANS nem „papírhiba”: ezek anyaga öregszik, és baleset esetén nem biztos, hogy megtartják a pilótát. Soha ne próbáld eltitkolni vagy átcímkézni!'
        },
        {
          title: 'A szerelő munkamódszere: ellenőrzés és dokumentálás',
          text: 'Versenyautón a munka minősége életeket véd. Bevált szabályok:\n\n1. **Feladatlista**: minden munka felírva, a végén kipipálva és aláírva.\n2. **Nyomatékra húzás**: a kritikus csavarokat (kerékanya, futómű, fék) nyomatékkulccsal, a gyártói értékre húzzuk.\n3. **Nyomatékjelölés**: a meghúzott csavarra és az alapra festékcsíkot húzunk. Ha a csík elcsúszik, a csavar elmozdult.\n4. **Kettős ellenőrzés**: a kritikus munkát egy második ember is ellenőrzi („second pair of eyes”).\n5. **„Nut and bolt” átnézés**: minden kimenet előtt végigmegyünk az autón: csavarok, csatlakozók, szivárgás, sérülés, hűtőnyílások tisztasága.\n6. **Szerszámszámlálás**: a munka végén minden szerszám a helyén? Egy autóban felejtett kulcs a pályán katasztrófát okozhat.',
          warn: 'Fékbe, kormányba, futóműbe soha ne szerelj „majd megnézem később” alapon! Ha bizonytalan vagy, szólj az autófelelősnek, és a munka maradjon nyitott a listán.'
        },
        {
          title: 'Parc fermé és utólagos ellenőrzés',
          text: 'A **parc fermé** (zárt park) a rendező által felügyelt terület, ahol a szabályzatban meghatározott időszakokban **tilos** az autón dolgozni, vagy csak engedéllyel szabad. Célja, hogy az időmérő és a futam után ellenőrizni lehessen az autót abban az állapotban, ahogy versenyzett.\n\nAz utólagos ellenőrzésen mérhetik a **tömeget** (pilótával együtt vagy anélkül, a szabály szerint), a **méreteket**, az **üzemanyag-mintát**, és például a **padló alatti csúszólap kopását**.\n\nValódi példa: a 2023-as **Egyesült Államok Nagydíján** Lewis Hamiltont és Charles Leclerc-t utólag **kizárták**, mert az autójuk padlója alatti csúszólap (plank) túlkopott. A szabály szerint az új, 10 mm vastag lap legfeljebb **9 mm-ig** kophat. A túl alacsony hasmagasság gyorsabb lehet, de a szabály pont ezt korlátozza.',
          tip: 'Ezért fontos, hogy a mérnök a hasmagasságot **biztonsági tartalékkal** állítsa be: a szabálytalanság nem a hétvége végén, hanem a setup-döntésnél dől el.'
        }
      ],
      quiz: [
        { q: 'Kinek a feladata elsősorban a setup-döntés és a rádiókapcsolat a pilótával?', options: ['A gumimérnöké', 'A versenymérnöké', 'A technikai biztosé', 'A csapatfőnöké'], answer: 1, explain: 'A versenymérnök a pilóta „párja”: ő fordítja le a pilóta visszajelzését beállítás-változtatásokra.' },
        { q: 'Mi a gépátvétel elsődleges célja?', options: ['A csapatok pénzügyeinek ellenőrzése', 'A köridők mérése', 'A biztonság és a szabályosság ellenőrzése', 'A gumik kiosztása'], answer: 2, explain: 'A technikai biztosok elsősorban a biztonsági elemeket (bukókeret, öv, tűzoltó, felszerelés), másodsorban a szabályosságot nézik.' },
        { q: 'Mire való a nyomatékjelölés (festékcsík a csavaron)?', options: ['Látható, ha a meghúzott csavar elmozdult', 'Díszítés', 'A csavar méretét jelzi', 'Megakadályozza a rozsdásodást'], answer: 0, explain: 'Ha a csík a csavar és az alap között elcsúszik, a csavar elfordult, újra ellenőrizni kell.' },
        { q: 'Mi a parc fermé?', options: ['A csapatok parkolója', 'A pilóták pihenője', 'A tartalék alkatrészek raktára', 'Felügyelt zárt terület, ahol az autón csak a szabály szerint lehet dolgozni'], answer: 3, explain: 'A parc fermé célja, hogy az autót abban az állapotban lehessen ellenőrizni, ahogy versenyzett.' },
        { q: 'Miért zárták ki Hamiltont és Leclerc-t a 2023-as USA Nagydíjról?', options: ['Túl könnyű volt az autójuk', 'A padló alatti csúszólap túlkopott', 'Szabálytalan üzemanyagot használtak', 'Előztek sárga zászló alatt'], answer: 1, explain: 'A 10 mm-es csúszólap legfeljebb 9 mm-ig kophat; az autóik ennél jobban kopott lapot mutattak.' },
        { q: 'Melyik a legfelső szint a motorsport szabályainak hierarchiájában?', options: ['A versenykiírás', 'A csapat belső szabályzata', 'Az FIA Nemzetközi Sportkódexe', 'A pilóta szerződése'], answer: 2, explain: 'A Sportkódex alatt a nemzeti szövetség, a bajnokság szabályai és végül az adott verseny kiírása és bulletinjei állnak.' },
        { q: 'Mi a teendő, ha a sisak homologizációja lejárt?', options: ['Új, érvényes sisakot kell használni', 'Le kell ragasztani a címkét', 'Elég, ha a pilóta óvatosabban vezet', 'Csak az edzésen szabad használni'], answer: 0, explain: 'A lejárt felszerelés nem mehet versenyre; az anyagok öregszenek, a védelem nem garantált.' },
        { q: 'Miért számolják meg a szerelők a szerszámokat a munka végén?', options: ['A leltár miatt', 'Mert a szabály minden szerszámot megszámoz', 'Hogy ne maradjon szerszám az autóban, ami a pályán veszélyes lehet', 'Hogy kiderüljön, ki dolgozott többet'], answer: 2, explain: 'Egy kulcs a pedálok vagy a futómű közelében elakadhat, vagy kieshet a pályára.' }
      ]
    },

    /* ───────────────────────── 2. GUMIK ───────────────────────── */
    {
      id: 'gumik',
      title: 'Versenyabroncsok: keverék, hőablak, nyomás, kopás',
      level: 2, minutes: 16,
      summary: 'Miért tapad a versenygumi, mi a hőablak, hogyan olvasd a gumihőmérsékletet és a nyomást, és miért fogy el a gumi a verseny végére.',
      tags: ['gumi', 'abroncs', 'slick', 'esőgumi', 'keverék', 'hőablak', 'guminyomás', 'pirométer', 'gumimelegítő', 'graining', 'blistering', 'degradáció', 'kopás'],
      models: ['f1-auto'],
      sections: [
        {
          title: 'Slick, intermediate, esőgumi – és a keverékek',
          text: 'A versenygumi az autó egyetlen kapcsolata a pályával: minden gyorsító, fékező és kanyarodó erő a négy, nagyjából tenyérnyi **érintkezési felületen** (kontaktfolt) adódik át.\n\n- **Slick**: mintázat nélküli, száraz pályára. A teljes futófelület érintkezik az aszfalttal.\n- **Intermediate („inter”)**: nedves, száradó pályára, sekélyebb mintázattal.\n- **Esőgumi (full wet)**: mély barázdákkal, amelyek elvezetik a vizet. A Pirelli szerint az F1-es esőgumi **300 km/h-nál kerékenként akár 85 liter vizet** is kiszór másodpercenként.\n\nA **keverék** (compound) a gumi anyagának receptje:\n\n- **Lágyabb keverék**: több tapadás, gyorsabban melegszik, de **gyorsabban kopik** és hamarabb túlhevül.\n- **Keményebb keverék**: kevesebb tapadás, de tartósabb és nagyobb hőterhelést bír.\n\nA gumiszállító versenyenként kijelöli, mely keverékek közül választhatnak a csapatok; ebből fakad a futamstratégia.',
          tip: 'A gumi tapadása nem csak súrlódás: a lágy gumi „beleömlik” az aszfalt apró egyenetlenségeibe (mechanikus kapcsolódás), és molekuláris szinten is tapad. Mindkettőhöz a megfelelő hőmérséklet kell.'
        },
        {
          title: 'A hőablak: túl hidegen és túl melegen is lassú',
          text: 'Minden keveréknek van egy **hőablaka** (operating window): egy hőmérséklet-tartomány, amelyben a legjobban tapad. Alatta a gumi kemény és „csúszkál”, fölötte túlhevül.\n\nTipikus hibák:\n\n- **Graining (dörzsölődés)**: ha a gumi túl hideg vagy túl sokat csúszik, a felületéről apró gumicsomók tépődnek le és rátapadnak a futófelületre. Az autó átmenetileg sokat veszít a tapadásából.\n- **Blistering (hólyagosodás)**: ha a gumi belseje túlhevül, a futófelületben buborékok keletkeznek, majd darabok szakadnak ki.\n- **Túlmelegedés**: a pilóta azt érzi, hogy a gumi „elfogy”, a köridők romlanak.\n\nA hőmérsékletet **pirométerrel** mérjük: infravörös (felületi) vagy tűs (a futófelületbe szúrt, a belső hőt mérő) kivitelben. Pályán közvetlenül a kiállás után, mindig **ugyanabban a sorrendben** mérünk, mert a gumi gyorsan hűl.',
          warn: 'Hideg gumival az első kör a legveszélyesebb: a tapadás jóval kisebb, mint amit a pilóta az előző kimenet végéről megszokott. Boxból kijövet és a biztonsági autós szakasz után különösen óvatosan kell gyorsítani!'
        },
        {
          title: 'Guminyomás: hidegen beállítani, melegen mérni',
          text: 'A gumiban lévő gáz melegedéskor kitágul, ezért a nyomás a kör során **nő**. A mérnök a **meleg (üzemi) nyomásra** céloz, de a boxban csak **hidegen** tudja beállítani.\n\n**Szemléltető számítás** (ideális gáz, állandó térfogat): ha 20 °C-on 1,5 bar a túlnyomás (ez abszolút kb. 2,5 bar), akkor 80 °C-on az abszolút nyomás 2,5 · 353 / 293 ≈ 3,0 bar, vagyis a túlnyomás kb. **2,0 bar**. A melegedés tehát fél bart is hozzáadhat.\n\nA nyomás hatása:\n\n- **Túl magas**: a kontaktfolt kisebb, a gumi középen hordoz, gyorsabban melegszik a közepe, kevesebb a tapadás.\n- **Túl alacsony**: az oldalfal sokat hajlik, a gumi a széleken hordoz és túlmelegszik, az autó „lomha”.\n\nSok csapat **száraz nitrogénnel** tölt: a levegő nedvességtartalma kiszámíthatatlanabb nyomásnövekedést okoz. A gumiszállító gyakran **minimális nyomást** ír elő biztonsági okból – ezt be kell tartani.',
          tip: 'Írd fel minden kimenetnél a hideg nyomást, a pálya- és levegőhőmérsékletet, és a kiállás utáni meleg nyomást. Néhány kimenet után már előre meg tudod becsülni, mennyit kell hidegen beállítani.'
        },
        {
          title: 'A gumi hőmérsékleti képe: belső – közép – külső',
          text: 'A pirométerrel minden gumin **három pontban** mérünk: belső szélen, középen és külső szélen. A három szám sokat elárul:\n\n- **Középen a legmelegebb** → valószínűleg **túl nagy a nyomás**.\n- **Mindkét szélen melegebb, középen hidegebb** → **túl kicsi a nyomás**.\n- **A belső szél sokkal melegebb** → túl sok a **negatív dőlésszög** (camber), vagy túl sok az összetartás.\n- **A külső szél melegebb** → kevés a negatív camber, a gumi kanyarban a külső vállára „gördül”.\n\nNegatív camber mellett normális, ha a belső szél valamivel (gyakran 5–10 °C-kal, ez szemléltető érték) melegebb, hiszen kanyarban a terhelés a külső kerékre kerül, és a gumi felegyenesedik. A pontos célt a gumiszállító ajánlása és a saját adataid adják.\n\nA dőlésszögről részletesen a **Futómű-geometria** leckében lesz szó.'
        },
        {
          title: 'Melegítés: gumimelegítő és bemelegítő kör',
          text: 'A gumit a hőablakba kell juttatni, mielőtt a pilóta teljes tempót megy.\n\n- **Gumimelegítő takaró (tyre blanket)**: elektromos fűtőtakaró a kerékre. Az F1-ben a megengedett hőmérsékletet csökkentették: a korábbi kb. 100 °C-ról **70 °C-ra**, és 2025-ben a futófelületen mérve is ellenőrizték. Sok sorozatban a takaró egyáltalán nem engedélyezett.\n- **Bemelegítő kör (out-lap)**: fokozatos gyorsítás és fékezés, kanyarokban növekvő tempó. A cikázás (weaving) főleg a felületet melegíti, a gumi belsejét kevésbé.\n- **Fékek**: a fékező kerék a fékek hőjét a felni felé is vezeti, ami a guminyomást is emeli.\n\nA gumikészleteket **nyilvántartjuk** (vonalkód / sorszám), mert a hőciklusok száma (hányszor melegedett fel és hűlt le) is befolyásolja a teljesítményt.',
          warn: 'A gumimelegítő elektromos berendezés: csak ép kábellel, a gyártó szerint használd, és ne hagyd felügyelet nélkül, főleg esőben. A fűtött kerék is forró – kesztyűvel fogd meg.'
        },
        {
          title: 'Kopás, degradáció és biztonságos gumikezelés',
          text: 'Két különböző dolgot kell elválasztani:\n\n- **Kopás (wear)**: fogy a futófelület anyaga. Mérése **mélységmérővel** vagy a gumiba fúrt **kopásjelző lyukakkal** történik.\n- **Degradáció**: a gumi tapadása csökken (hő, kémiai változás), akkor is, ha még van rajta anyag. A köridő körönként romlik – ezt a stratégák „deg”-nek hívják. Előfordul, hogy a teljesítmény hirtelen zuhan („cliff”).\n\nA kopást csökkenti a kevesebb csúszás: finomabb kormányzás, jól beállított geometria, megfelelő nyomás és egyensúlyos autó.\n\n**Biztonság a gumiszerelésnél:**\n\n- A gumit felnire szerelni és felfújni **gumiszerelő géppel, felfújó ketrecben** vagy védőburkolat mögött kell: a felperemeléskor a gumi robbanásszerűen ugorhat a helyére.\n- A versenykerekek gyakran **központi anyával** rögzülnek; a légkulcs nagy nyomatéka miatt a kéz és az ujjak legyenek távol.\n- A sérült (vágott, átütött oldalfalú) gumit ne használd újra – jelöld meg és tedd félre.',
          warn: 'Soha ne fújj fel gumit a megengedett szerelési nyomás fölé „hogy jobban üljön”! A felrobbanó gumi és a lerepülő peremrész súlyos sérülést okozhat.'
        }
      ],
      quiz: [
        { q: 'Mi igaz a lágyabb gumikeverékre?', options: ['Kevesebb tapadás, hosszabb élettartam', 'Több tapadás, gyorsabb kopás', 'Csak esőben használható', 'Nem kell melegíteni'], answer: 1, explain: 'A lágyabb keverék jobban tapad, gyorsabban melegszik, de hamarabb kopik és túlhevül.' },
        { q: 'A pirométer szerint a gumi közepe sokkal melegebb, mint a szélei. Mire gyanakszol?', options: ['Túl kicsi a nyomás', 'Túl sok a negatív camber', 'Túl nagy a nyomás', 'Hibás a fék'], answer: 2, explain: 'Túl nagy nyomásnál a gumi kidomborodik és a közepén hordoz, ott melegszik a legjobban.' },
        { q: 'Mit jelent a graining?', options: ['A gumi felületéről letépődő gumicsomók rátapadnak a futófelületre', 'A gumi oldalfala kireped', 'A felni elgörbül', 'A gumi belső levegője kiszökik'], answer: 0, explain: 'Hideg vagy sokat csúszó gumin jelentkezik, és átmenetileg nagy tapadásvesztést okoz.' },
        { q: 'Miért nő a guminyomás a kör során?', options: ['Mert a gumi kopik', 'Mert a felni összehúzódik', 'Mert a szelep szivárog', 'Mert a gumiban lévő gáz melegszik és tágulni akar'], answer: 3, explain: 'Állandó térfogaton a gáz nyomása az abszolút hőmérséklettel arányos.' },
        { q: 'Miért töltenek sok csapatnál száraz nitrogént a gumiba?', options: ['Mert olcsóbb', 'Mert kiszámíthatóbb a nyomásnövekedés, nincs benne nedvesség', 'Mert könnyebb a gumi', 'Mert a szabály minden sorozatban kötelezővé teszi'], answer: 1, explain: 'A levegő változó páratartalma miatt a nyomásnövekedés kevésbé kiszámítható.' },
        { q: 'Mi a különbség a kopás és a degradáció között?', options: ['Nincs különbség', 'A kopás csak esőben van', 'A kopás az anyag fogyása, a degradáció a tapadás csökkenése', 'A degradáció a felni sérülése'], answer: 2, explain: 'Egy gumi lehet degradált (lassú), miközben még bőven van rajta futófelület.' },
        { q: 'Mekkora a megengedett gumimelegítő-hőmérséklet az F1-ben slickeknél (2025-ös állapot)?', options: ['70 °C', '30 °C', '150 °C', 'Nincs korlát'], answer: 0, explain: 'A korábbi kb. 100 °C-os határt 70 °C-ra csökkentették; 2025-ben a futófelületen is mérték.' },
        { q: 'Miért kell felfújó ketrecben vagy védőburkolat mögött felfújni a felnire szerelt gumit?', options: ['Hogy gyorsabban menjen', 'A pontosabb nyomásmérés miatt', 'Mert a ketrec melegíti a gumit', 'Mert a gumi és a perem robbanásszerűen elmozdulhat'], answer: 3, explain: 'A felperemeléskor és hibás szerelésnél a gumi vagy a felni része nagy erővel elrepülhet.' }
      ]
    },

    /* ───────────────────────── 3. GEOMETRIA ───────────────────────── */
    {
      id: 'geometria',
      title: 'Futómű-geometria: camber, toe, caster, Ackermann',
      level: 2, minutes: 16,
      summary: 'A kerekek szöghelyzete dönti el, mennyit tapad a gumi: dőlésszög, összetartás, utánfutás, Ackermann és a kormány-legördülési sugár.',
      tags: ['futómű', 'geometria', 'dőlésszög', 'camber', 'összetartás', 'toe', 'utánfutás', 'caster', 'csapdőlés', 'Ackermann', 'scrub radius', 'futóműállítás', 'setup pad'],
      models: ['f1-auto'],
      sections: [
        {
          title: 'Miért számít néhány tized fok?',
          text: 'A futómű-geometria a kerekek **szöghelyzetét** írja le az autóhoz és az úthoz képest. Néhány tized fok eltérés is megváltoztatja, hogyan terhelődik a gumi kontaktfoltja, mennyire melegszik, és mennyi oldalerőt tud átadni.\n\nA geometriát mindig **ugyanolyan, ismételhető körülmények** között mérjük:\n\n- **sík, vízszintesre állított felületen** (setup pad, kiegyenlített mérőlapok),\n- beállított **guminyomással**,\n- a **pilóta tömegével** (a pilóta ül benne, vagy azonos tömegű ballaszt),\n- meghatározott **üzemanyag-mennyiséggel**,\n- és miután az autót kicsit megrugóztattuk és gurítottuk, hogy a futómű „leüljön”.\n\nA beállítás szokásos sorrendje: **hasmagasság → dőlésszög (camber) → utánfutás (caster) → összetartás (toe)**. Az összetartás a végére marad, mert az összes többi változtatás elállítja.',
          warn: 'A méréshez vagy állításhoz a megemelt autót mindig tengelytámaszra (bakra) engedd le, és csak azután nyúlj a futóműhöz. Részletek az [[#/lecke/autoszereles/biztonsag|Autószerelés – Biztonság]] leckében.'
        },
        {
          title: 'Dőlésszög (camber)',
          text: 'A **dőlésszög** a kerék függőlegestől való dőlése elölről nézve.\n\n- **Negatív camber**: a kerék teteje befelé, az autó felé dől.\n- **Pozitív camber**: a kerék teteje kifelé dől.\n\nKanyarban a karosszéria kifelé dől, a külső kerék gumija pedig oldalirányban deformálódik. Ezért a versenyautók **negatív** dőlésszöggel futnak: kanyarban a külső kerék gumija „felegyenesedik”, és a teljes futófelület dolgozik. **Szemléltető tartomány**: sok versenyautón elöl −2° és −4° között, hátul kevesebb.\n\nA túl sok negatív camber ára:\n\n- **egyenesben fékezéskor és gyorsításkor** kisebb a kontaktfolt (a gumi a belső szélén áll),\n- a belső szél túlmelegszik és jobban kopik.\n\nA helyes értéket a **gumi hőmérsékleti képe** (belső–közép–külső) és a köridő együtt mutatja meg.',
          tip: 'Ha a gumi belső széle 15–20 °C-kal is melegebb a külsőnél, és a pilóta fékezéskor instabilitásról panaszkodik, valószínűleg túl sok a negatív camber. (Szemléltető számok – a cél gumitípusonként más.)'
        },
        {
          title: 'Összetartás (toe)',
          text: 'Az **összetartás** azt mutatja, hogy felülről nézve a kerekek **eleje** közelebb van-e egymáshoz, mint a hátulja.\n\n- **Toe-in (összetartás)**: a kerekek eleje befelé fordul. Stabilitást ad, főleg **hátul**, gyorsításkor és nagy sebességen.\n- **Toe-out (szétfutás)**: a kerekek eleje kifelé fordul. Elöl **gyorsabb, élénkebb bekormányzást** ad, mert a belső kerék már a kanyar felé „néz”.\n\nAz összetartást **milliméterben** (a felniperem elejének és hátuljának távolságkülönbsége) vagy **fokban** adják meg. Mérése: lézeres futóműállító, vagy egyszerűbben **zsinóros módszer** (string box) és **toe-lemezek**.\n\nA túl sok összetartás bármelyik irányban **gördülési ellenállást, hőt és kopást** okoz, mert a kerekek egyenesben is egymás ellen dolgoznak.',
          warn: 'A hátsó szétfutás (toe-out) instabillá, hirtelen túlkormányzottá teheti az autót. Hátul szinte mindig kis összetartást használnak.'
        },
        {
          title: 'Utánfutás (caster) és csapdőlés',
          text: 'Az **utánfutás** a kormányzási tengely (a felső és alsó gömbcsukló vonala) dőlése **oldalról** nézve. Ha a tengely felül hátrafelé dől, az utánfutás **pozitív**: a tengely meghosszabbítása a kerék felfekvési pontja **előtt** döfi az utat.\n\nHatásai:\n\n- **Visszatérítő nyomaték**: a kerék egyenesbe akar állni, mint a bevásárlókocsi kereke. A pilóta ezt **kormányerőként és visszajelzésként** érzi.\n- **Dinamikus camber**: kormányzáskor a külső kerék negatív dőlésszöge **nő**, a belsőé csökken – ez kanyarban kifejezetten előnyös.\n- Több utánfutás = **nehezebb kormány**.\n\nA **csapdőlés (KPI, kingpin inclination)** ugyanennek a tengelynek az elölnézeti dőlése. Kormányzáskor kissé megemeli az autót, ami szintén visszatérítő hatású.'
        },
        {
          title: 'Ackermann-geometria',
          text: 'Kanyarban a **belső kerék kisebb ívet** fut be, mint a külső. Ha a két első kerék tengelyének meghosszabbítása a hátsó tengely vonalán egy pontban találkozik, a kerekek csúszás nélkül gördülnek: ez a **100%-os Ackermann**. Ilyenkor a belső kerék jobban fordul, mint a külső.\n\nAz elvet **Georg Lankensperger** müncheni kocsigyártó dolgozta ki 1816-ban, angliai szabadalmát ügynöke, **Rudolph Ackermann** nyújtotta be 1818-ban – ezért viseli az ő nevét.\n\nVersenyautón azonban a gumik mindig **csúszási szöggel** (slip angle) dolgoznak, és a terhelt külső kerék a fontosabb. Ezért sok versenyautó **kevesebb Ackermannt, párhuzamos kormányzást vagy akár fordított (anti-) Ackermannt** használ. A beállítás a kormányösszekötő (kormánykar) csuklópontjainak helyzetével változtatható.\n\nLassú, szűk kanyarokban (pl. hajtűkanyar) több Ackermann segít, gyors kanyarokban kevesebb.'
        },
        {
          title: 'Kormány-legördülési sugár (scrub radius)',
          text: 'A **kormány-legördülési sugár** a kormányzási tengely útdöféspontja és a kerék **kontaktfoltjának közepe** közötti távolság, elölről nézve.\n\n- **Pozitív**: a döféspont a kontaktfolt belső oldalára esik.\n- **Negatív**: a döféspont a kontaktfolton kívül van.\n- **Nulla közeli**: a kerék „helyben” fordul.\n\nMiért fontos?\n\n- Nagy pozitív sugárnál **egyenetlen fékezéskor** vagy egy kátyúnál a kormány **megrántja** a pilóta kezét.\n- A kis sugár csökkenti a kormányerőt és a rángatást, de **kevesebb visszajelzést** ad.\n\nA sugarat a **felni beépülési mélysége (ET)**, a **nyomtávszélesítő (spacer)** és a gumi szélessége is megváltoztatja – ezért egy „csak szélesebb” felni is átírja a kormányzás érzetét.',
          tip: 'Ha a pilóta szerint új felnik óta „rángat a kormány fékezéskor”, nézd meg, változott-e a felni ET-je vagy került-e fel nyomtávszélesítő.'
        }
      ],
      quiz: [
        { q: 'Mit jelent a negatív dőlésszög (camber)?', options: ['A kerék teteje kifelé dől', 'A kerék teteje befelé, az autó felé dől', 'A kerekek eleje összetart', 'A kormánytengely hátrafelé dől'], answer: 1, explain: 'Negatív camber esetén a kerék teteje befelé dől; kanyarban így a külső gumi felegyenesedik.' },
        { q: 'Miért marad az összetartás (toe) beállítása a sor végére?', options: ['Mert az a legkönnyebb', 'Mert a szabály így írja elő', 'Mert a hasmagasság, a camber és a caster állítása is elállítja', 'Mert csak melegen mérhető'], answer: 2, explain: 'A többi geometriai érték változtatása mindig módosítja az összetartást.' },
        { q: 'Mit ad elöl a kis szétfutás (toe-out)?', options: ['Élénkebb, gyorsabb bekormányzást', 'Több stabilitást egyenesben', 'Kisebb gumikopást', 'Nagyobb végsebességet'], answer: 0, explain: 'A belső kerék már a kanyar felé néz, így az autó gyorsabban reagál a kormányra.' },
        { q: 'Milyen hatása van a pozitív utánfutásnak (caster)?', options: ['Könnyebb kormányt ad', 'Csökkenti a gumik hőmérsékletét', 'Növeli a végsebességet', 'Visszatérítő nyomatékot és kormányzáskor dinamikus negatív camber-t ad'], answer: 3, explain: 'A kerék egyenesbe akar állni, és kanyarban a külső kerék negatív dőlésszöge nő.' },
        { q: 'Mit jelent a 100%-os Ackermann-geometria?', options: ['A két első kerék azonos szögben fordul', 'A belső kerék jobban fordul, a tengelyvonalak a hátsó tengely vonalán találkoznak', 'A külső kerék jobban fordul', 'A hátsó kerekek is kormányoznak'], answer: 1, explain: 'Így a kerekek csúszás nélkül gördülnek koncentrikus íveken.' },
        { q: 'Ki dolgozta ki eredetileg az Ackermann-kormányzást?', options: ['Georg Lankensperger', 'Rudolph Diesel', 'Karl Benz', 'Ferdinand Porsche'], answer: 0, explain: 'Lankensperger 1816-ban dolgozta ki; ügynöke, Rudolph Ackermann szabadalmaztatta Angliában 1818-ban.' },
        { q: 'Mi befolyásolja a kormány-legördülési sugarat (scrub radius)?', options: ['Csak a kormánykerék átmérője', 'A fékfolyadék típusa', 'A felni beépülési mélysége (ET) és a nyomtávszélesítő', 'A motor teljesítménye'], answer: 2, explain: 'Ha a kerék kifelé kerül, a kontaktfolt közepe távolodik a kormánytengely döféspontjától.' },
        { q: 'Miért kell a geometriát a pilóta tömegével (vagy ballaszttal) mérni?', options: ['Mert így könnyebb az autót tolni', 'Mert a pilóta nélkül nem kapcsol be a műszer', 'Mert a szabály szerint a pilótának mindig az autóban kell ülnie', 'Mert a terhelés megváltoztatja a hasmagasságot és vele a szögeket'], answer: 3, explain: 'A rugók behajlanak, a hasmagasság és vele a camber, a toe is változik.' }
      ]
    },

    /* ───────────────────────── 4. RUGÓZÁS ───────────────────────── */
    {
      id: 'rugozas',
      title: 'Rugózás és csillapítás, sarokterhelés',
      level: 3, minutes: 18,
      summary: 'Rugómerevség és áttétel, stabilizátor, lengéscsillapító, hasmagasság, súlyelosztás és a sarokterhelések beállítása mérlegen.',
      tags: ['rugózás', 'rugómerevség', 'kerékmerevség', 'motion ratio', 'sajátfrekvencia', 'stabilizátor', 'lengéscsillapító', 'bump', 'rebound', 'hasmagasság', 'súlyelosztás', 'sarokterhelés', 'corner weights', 'cross weight'],
      models: ['f1-auto'],
      terms: ['mechanika/hooke', 'mechanika/csillapitas', 'mechanika/szabad-rezges', 'mechanika/rezonancia'],
      sections: [
        {
          title: 'Rugómerevség, áttétel és sajátfrekvencia',
          text: 'A rugó **merevsége** (k) megmondja, hány newton erő kell 1 mm összenyomáshoz: pl. `k = 100 N/mm`. A kerékre azonban nem ez hat, mert a rugó a lengőkaron egy **áttételen** (motion ratio, MR) keresztül dolgozik:\n\n`kerékmerevség = k · MR²`, ahol `MR = rugó elmozdulása / kerék elmozdulása`.\n\n**Példa**: 100 N/mm-es rugó, MR = 0,8 → kerékmerevség = 100 · 0,64 = **64 N/mm**. Az áttétel négyzetesen számít, ezért a rugó rögzítési pontja nagyon fontos.\n\nA rugózás „keménységét” a **sajátfrekvenciával** érdemes összehasonlítani:\n\n`f = (1 / 2π) · √(k_kerék / m)`\n\nahol m az adott sarokra jutó rugózott tömeg. 64 000 N/m és 200 kg esetén f ≈ (1 / 6,28) · √320 ≈ **2,8 Hz**. **Szemléltető tartományok**: kényelmes személyautó kb. 1–1,5 Hz, aerodinamikára épülő versenyautó 3–5 Hz vagy több.',
          tip: 'A rugó merevségét a rugóvizsgálóban ellenőrizd: a ráírt érték és a valós érték között néhány százalék eltérés is lehet, és a párokat érdemes összeválogatni.'
        },
        {
          title: 'Stabilizátor és a dőlési merevség eloszlása',
          text: 'A **stabilizátor** (anti-roll bar) egy csavarrugóként működő rúd, amely a két oldali kereket köti össze. Ha mindkét kerék **egyszerre** rugózik be, nem csinál semmit; ha **egyik oldal** jobban rugózik (kanyarban, a dőléskor), ellenáll.\n\nA kulcsfogalom a **dőlési merevség eloszlása**: kanyarban a külső kerekekre áthelyeződő terhelést az a tengely „viseli” nagyobb arányban, amelyiken merevebb a dőléssel szembeni ellenállás. A gumi tapadása a terheléssel **nem egyenesen arányosan** nő, ezért amelyik tengely több terhelésáthelyeződést kap, az **veszít** relatíve több tapadást.\n\n- **Merevebb első stabilizátor** → az első tengely veszít több tapadást → **több alulkormányzottság**.\n- **Merevebb hátsó stabilizátor** → a hátsó tengely veszít több tapadást → **több túlkormányzottság**.\n\nA stabilizátor merevsége gyakran a **karhossz** állításával (több furat) vagy pengés stabilizátornál a penge elforgatásával változtatható – ez a leggyorsabb egyensúly-hangoló eszköz a boxban.'
        },
        {
          title: 'Lengéscsillapító: bump és rebound',
          text: 'A rugó **tárolja**, a lengéscsillapító **elnyeli** (hővé alakítja) a mozgás energiáját. Csillapítás nélkül az autó minden bukkanó után sokáig lengene.\n\n- **Bump (összenyomás)**: a kerék felfelé mozog, a csillapító összenyomódik.\n- **Rebound (kihúzás)**: a kerék visszafelé mozog.\n\nA csillapítóerő a **dugattyúsebességtől** függ, ezért két tartományt különböztetünk meg:\n\n- **Alacsony sebességű** csillapítás: a karosszéria lassú mozgásai (bedőlés, bólintás fékezéskor, guggolás gyorsításkor). Ez a **kezelést és az átmeneteket** hangolja.\n- **Nagy sebességű** csillapítás: padkák, bukkanók, kerékre érkező ütések. Ez a **tapadást egyenetlen pályán** és a padkán való átjutást hangolja.\n\nAz állítás jellemzően **kattanásokban (klikk)** történik; a 0 pont lehet a teljesen nyitott vagy zárt állás – ezt a setup-lapon mindig rögzíteni kell!',
          warn: 'A versenycsillapítók belül nagy nyomású nitrogént tartalmaznak. Szétszerelni, gáztölteni csak megfelelő szerszámmal és képzettséggel szabad – a hirtelen kiugró rúd vagy fedél sérülést okozhat.'
        },
        {
          title: 'Hasmagasság és ütközők',
          text: 'A **hasmagasság** (ride height) a padló vagy egy kijelölt referenciapont távolsága a talajtól, elöl és hátul mérve. Különbségük a **rake** (orrlejtés).\n\n- Alacsonyabb autó → **alacsonyabb súlypont**, és a padló alatti aerodinamika is erősebb lehet.\n- Túl alacsony autó → felütközik, a padló kopik, a rugózás „elfogy”, és a csúszólap-szabályt is megsértheti.\n\nA rugóút végén **ütközők (bump stop)** vagy alátétek (packer) akadályozzák meg a felütközést. Az aerodinamikára érzékeny autóknál ezekkel szándékosan **korlátozzák** a hasmagasság-változást nagy sebességen.\n\nA hasmagasságot a rugótányér **állítóanyájával** (spring perch) vagy a rúdhosszal állítjuk, mindig a pilótával/ballaszttal terhelt, kigördített autón mérve.',
          tip: 'Minden állítás után számold újra: a hasmagasság változtatása a camber-t, a toe-t és a sarokterheléseket is módosítja.'
        },
        {
          title: 'Súlyelosztás és sarokterhelés (corner weights)',
          text: 'A **sarokterhelés** azt mutatja, hány kilogramm (newton) jut az egyes kerekekre. Mérése **négy kerékmérlegen**, vízszintesre állított felületen, pilótával (vagy ballaszttal), beállított üzemanyaggal és guminyomással történik.\n\n**Példa** (szemléltető, kg-ban): bal első 160, jobb első 150, bal hátsó 180, jobb hátsó 170. Összesen 660 kg.\n\n- **Első tengely aránya**: (160 + 150) / 660 = **47%**.\n- **Bal oldal aránya**: (160 + 180) / 660 = **51,5%**.\n- **Keresztsúly (cross weight)**: (bal első + jobb hátsó) / összes = (160 + 170) / 660 = **50%**.\n\nKörpályás autónál a cél általában az **50%-os keresztsúly**: így bal- és jobbkanyarban ugyanúgy viselkedik az autó. Ha eltér, az autó az egyik irányban alul-, a másikban túlkormányzott lesz – akkor is, ha az első/hátsó arány tökéletes.\n\nAz állítás a rugótányérok emelésével/süllyesztésével történik: ha egy sarkot **megemelünk**, az a sarok és vele átlósan szemközti sarok **több** terhelést kap. Ez olyan, mint egy négylábú asztal billegésének megszüntetése.',
          tip: 'Sarokterhelés mérésekor a **stabilizátort kösd ki** (vagy lazítsd a kapcsolórudat), különben előfeszülhet és meghamisítja az eredményt.'
        },
        {
          title: 'A beállítás menete a gyakorlatban',
          text: 'Egy tipikus „setup pad” munkamenet:\n\n1. **Előkészítés**: guminyomások beállítva, üzemanyag a megadott szinten, pilóta vagy ballaszt az ülésben.\n2. **Kiegyenlítés**: a mérlegeket és a lapokat vízszintbe állítjuk.\n3. **Leültetés**: az autót megrugóztatjuk és előre-hátra gurítjuk, hogy a futómű súrlódásmentes, nyugalmi helyzetbe kerüljön.\n4. **Hasmagasság** beállítása.\n5. **Sarokterhelés** a stabilizátorok kikötött állapotában; kis lépésekben, a rugótányérokkal.\n6. **Geometria**: camber, caster, majd toe.\n7. **Ellenőrző mérés**: a stabilizátort visszakötjük úgy, hogy ne legyen előfeszítve, és mindent újra mérünk.\n8. **Dokumentálás** a setup-lapon.\n\nA munka **iteratív**: minden állítás hat a többire, ezért többször körbe kell menni, amíg minden érték a tűréshatáron belül van.',
          warn: 'Rugócserénél a rugót csak rugóösszenyomóval vagy a lengéscsillapító teljes tehermentesítése után szabad kiszerelni. Az előfeszített rugóban tárolt energia súlyos sérülést okozhat.'
        }
      ],
      quiz: [
        { q: '100 N/mm-es rugó, 0,5-ös áttétellel (motion ratio). Mekkora a kerékmerevség?', options: ['50 N/mm', '25 N/mm', '100 N/mm', '200 N/mm'], answer: 1, explain: 'Kerékmerevség = k · MR² = 100 · 0,25 = 25 N/mm. Az áttétel négyzetesen számít.' },
        { q: 'Mikor dolgozik a stabilizátor?', options: ['Ha mindkét kerék egyszerre rugózik be', 'Csak fékezéskor', 'Ha a két oldali kerék eltérően rugózik, pl. kanyarban dőléskor', 'Csak egyenesben, nagy sebességen'], answer: 2, explain: 'A stabilizátor a két oldal közötti különbségnek áll ellen, tehát a dőlésnek.' },
        { q: 'Merevebb első stabilizátor általában milyen irányba viszi az egyensúlyt?', options: ['Alulkormányzottság felé', 'Túlkormányzottság felé', 'Nem hat az egyensúlyra', 'Csak a fékezést befolyásolja'], answer: 0, explain: 'Az első tengely több terhelésáthelyeződést kap, így relatíve több tapadást veszít.' },
        { q: 'Mit hangol elsősorban az alacsony sebességű csillapítás?', options: ['A padkákon való átjutást', 'A motor teljesítményét', 'A gumik hőmérsékletét közvetlenül', 'A karosszéria lassú mozgásait: bedőlés, bólintás, guggolás'], answer: 3, explain: 'A lassú dugattyúsebesség a karosszéria mozgásaihoz tartozik, ez a kezelés és az átmenetek hangolása.' },
        { q: 'Sarokterhelés: BE 160, JE 150, BH 180, JH 170 kg. Mekkora a keresztsúly (BE + JH)?', options: ['47%', '50%', '51,5%', '53%'], answer: 1, explain: '(160 + 170) / 660 = 0,50, azaz 50%.' },
        { q: 'Miért kell sarokterhelés-méréskor kikötni a stabilizátort?', options: ['Hogy ne feszüljön elő és ne hamisítsa meg az eredményt', 'Mert a mérleg nem bírja a súlyát', 'Mert különben nem lehet mérni a hasmagasságot', 'Mert a szabály tiltja a stabilizátort'], answer: 0, explain: 'Az előfeszített stabilizátor terhet visz át egyik kerékről a másikra.' },
        { q: 'Mi történik, ha egy sarok rugótányérját megemeljük (az autó azon a sarkon feljebb kerül)?', options: ['Az a sarok kevesebb terhelést kap', 'Csak a hasmagasság változik', 'Az a sarok és az átlósan szemközti sarok több terhelést kap', 'Csak az első tengely terhelése változik'], answer: 2, explain: 'Mint a billegő asztalnál: a „hosszabb láb” és a vele átlós láb kap több terhet.' },
        { q: 'Miért veszélyes a versenycsillapító szakszerűtlen szétszerelése?', options: ['Mert olajos lesz a kéz', 'Mert elveszhetnek a klikkek', 'Mert lejár a garancia', 'Mert nagy nyomású nitrogén van benne, alkatrészek kiugorhatnak'], answer: 3, explain: 'A gáztöltésű csillapítót csak megfelelő szerszámmal és képzettséggel szabad szétszedni.' }
      ]
    },

    /* ───────────────────────── 5. AERO ───────────────────────── */
    {
      id: 'aero',
      title: 'Aerodinamika: leszorítóerő, légellenállás, egyensúly',
      level: 3, minutes: 16,
      summary: 'Hogyan termel a versenyautó leszorítóerőt, mibe kerül ez légellenállásban, mit jelent az aero-egyensúly, és miért érzékeny a padló a hasmagasságra.',
      tags: ['aerodinamika', 'leszorítóerő', 'downforce', 'légellenállás', 'drag', 'szárnyszög', 'átesés', 'aero-egyensúly', 'nyomásközéppont', 'talajhatás', 'Venturi', 'diffúzor', 'porpoising', 'flow-vis'],
      models: ['f1-auto'],
      terms: ['e-mobilitas/legellenallas'],
      sections: [
        {
          title: 'Leszorítóerő és légellenállás',
          text: 'A versenyautó szárnyai és padlója úgy terelik a levegőt, hogy az autó **fölött nagyobb, alatta kisebb** legyen a nyomás. Az eredő erő lefelé nyom: ez a **leszorítóerő** (downforce). Ingyen nincs: minden terelés **légellenállással** (drag) jár.\n\n`F_le = ½ · ρ · v² · c_L · A` és `F_ell = ½ · ρ · v² · c_D · A`\n\nahol ρ ≈ 1,2 kg/m³ a levegő sűrűsége, v a sebesség, A a homlokfelület, c_L és c_D a leszorítási és ellenállási tényező.\n\nA lényeg a **v²**: **kétszeres sebességnél négyszeres** a leszorítóerő és a légellenállás is. Ezért az aerodinamika gyors kanyarokban számít igazán, lassú kanyarokban a **mechanikai tapadás** (gumik, rugózás) a fontosabb.\n\nA hatékonyság mérőszáma az **L/D arány** (leszorítóerő / légellenállás): mennyi leszorítást kapunk egységnyi ellenállásért.',
          tip: 'A [[#/lecke/sport/forma1|Forma–1: technika és fizika]] lecke számpéldán mutatja meg, mekkora leszorítóerő keletkezik egy F1-es autón nagy sebességnél. A szárnyakat a [[#/felfedezo/f1-auto?resz=elso-szarny|F1-es autó felfedezőjében]] is megnézheted.'
        },
        {
          title: 'Szárnyszög és átesés',
          text: 'A szárny **állásszögét** (angle of attack) növelve a leszorítóerő nő – de csak egy határig. Túl nagy szögnél a levegő **leválik** a szárny alsó (szívó) oldaláról: a szárny **átesik** (stall), a leszorítóerő hirtelen csökken, a légellenállás pedig nagy marad.\n\nGyakorlati eszközök:\n\n- **Szárnylap (flap) állítása**: a többelemes szárny hátsó lapjának szöge a boxban, akár kiálláskor is állítható (első szárny).\n- **Gurney-lap**: a szárny kilépőélére merőlegesen szerelt néhány mm-es léc. Kis felületért sok leszorítást ad, ellenállás árán.\n- **Pályafüggő választás**: nagy sebességű pályán (pl. Monza) lapos szárny a végsebességért, lassú, kanyargós pályán (pl. Monaco) meredek szárny a tapadásért.\n- **DRS és aktív aerodinamika**: az F1-ben 2011 és 2025 között a **DRS** (az egyenesben nyitható hátsó szárnylap) segítette az előzést. A **2026-os szabályoktól** nincs DRS: helyette **aktív aerodinamika** van – az egyenesekben minden pilóta laposabbra állíthatja az első és a hátsó szárnyat (kis légellenállású „egyenes mód”), a kanyarokban visszaáll a nagy leszorítás. Az előzést egy **előzési üzemmód** (plusz elektromos energia, ha a pilóta 1 másodpercen belül van az előtte haladóhoz) segíti.'
        },
        {
          title: 'Aero-egyensúly: hol hat az erő?',
          text: 'Nem csak az számít, **mennyi** a leszorítóerő, hanem az is, **hol** hat. Az **aero-egyensúlyt** (aero balance) általában úgy adják meg, hogy a teljes leszorítóerő hány százaléka jut az **első tengelyre**. A ponton, ahol az eredő erő támad, a **nyomásközéppont** van.\n\n- Ha az aero-egyensúly **túl hátul** van, az autó gyors kanyarban **alulkormányzott** (az eleje „nem fordul”).\n- Ha **túl elöl**, nagy sebességen **túlkormányzott**, ideges lesz.\n\nAz egyensúly **sebességfüggő** is: lassú kanyarban a mechanikai egyensúly (rugózás, stabilizátor, gumik) dominál, gyors kanyarban az aero. Gyakori helyzet: az autó lassú kanyarban jó, gyorsban alulkormányzott → az **első szárnylapon** érdemes állítani, nem a stabilizátoron.\n\nFékezéskor az autó orra lesüllyed, a hasmagasság és vele a nyomásközéppont is változik – ezért az egyensúly a kanyar fázisaiban is eltér.'
        },
        {
          title: 'Padló, talajhatás és hasmagasság-érzékenység',
          text: 'A modern versenyautók leszorítóerejének nagy részét a **padló** adja. A padló alatt a levegő egy szűkülő-táguló csatornán (**Venturi-csatorna**) áramlik át: a szűkületben felgyorsul és a nyomása leesik, majd a hátsó **diffúzor** lassítja és visszavezeti a környezeti nyomásra. Ez a **talajhatás** (ground effect).\n\nTörténeti háttér: az F1-ben az 1970-es évek végén megjelent talajhatású autók miatt túl nagyra nőttek a kanyarsebességek, ezért **1983-tól sík padlót** írtak elő. A **2022-es** szabályokkal a Venturi-csatornás padló visszatért.\n\nA padló nagyon **érzékeny a hasmagasságra**:\n\n- Közelebb a talajhoz általában **több** leszorítóerő…\n- …de egy határ alatt az áramlás leválik és a padló **átesik**: a leszorítás hirtelen csökken, az autó felemelkedik, újra leszorít – ez a nagy sebességű pattogás, a **porpoising**.\n\nEzért kell a rugózást, az ütközőket és a hasmagasságot az aerodinamikával **együtt** hangolni.',
          warn: 'A padló és a csúszólap túl alacsony beállítása nemcsak szabálytalanságot (csúszólap-kopás), hanem a pilóta számára veszélyes, kiszámíthatatlan tapadásvesztést is okozhat.'
        },
        {
          title: 'Hogyan mérik az aerodinamikát?',
          text: '- **Szélcsatorna**: méretarányos modellel, mozgó talajszalaggal. Az F1-ben a futásidőt szabályok korlátozzák.\n- **CFD** (számítógépes áramlástan): az áramlás numerikus szimulációja.\n- **Pályán**:\n  - **Aero rake**: pitot-csövek (nyomásmérő csövek) rácsa, amely az áramlást méri egy-egy elem mögött.\n  - **Flow-vis festék**: paraffinos, gyakran fluoreszcens festék, amely a menet közben megszárad, és megmutatja a felületen az áramlás irányát.\n  - **Hasmagasság-érzékelők** (lézer) és rugóelmozdulás-érzékelők: ezekből és a rugómerevségből a leszorítóerő is becsülhető.\n  - **Állandó sebességű egyenes menetek** és **kigurulási teszt** (coastdown): a lassulásból a légellenállás számolható.\n\nA mérnök a pályán mért adatokat a szélcsatorna- és CFD-eredményekkel **korrelálja**: ha nem egyeznek, a modellt kell javítani.'
        },
        {
          title: 'A szerelő feladatai és a karbonelemek biztonsága',
          text: 'A szerelő aerodinamikai munkái:\n\n- szárnyszög és szárnylap állítása a setup-lap szerint, **mindkét oldalon azonosan**,\n- az elemek **illesztése és tömítése** (a résen át szivárgó levegő rontja a hatást),\n- sérülések keresése: repedés, leváló élek, laza rögzítés – egy szárnyelem nagy sebességnél leszakadhat,\n- a flow-vis festék felvitele és lemosása,\n- a padló és a csúszólap mérése, kopásellenőrzés.\n\nA karbonszálas (szénszál-erősítésű) elemek **törésfelülete éles**, csiszoláskor és fúráskor **finom, irritáló por** keletkezik.',
          warn: 'Karbonelem csiszolásakor, fúrásakor viselj **porálarcot (legalább FFP2/FFP3)**, védőszemüveget és kesztyűt, és használj elszívást. A szénszálas por irritálja a bőrt és a légutakat, és elektromosan vezető is: bejuthat az elektronikába.'
        }
      ],
      quiz: [
        { q: 'Hányszorosára nő a leszorítóerő, ha a sebesség kétszeresére nő?', options: ['Kétszeresére', 'Háromszorosára', 'Négyszeresére', 'Nem változik'], answer: 2, explain: 'A leszorítóerő a sebesség négyzetével arányos: 2² = 4.' },
        { q: 'Mi történik, ha egy szárny állásszögét túl nagyra növeljük?', options: ['A szárny átesik: a leszorítás csökken, az ellenállás nagy marad', 'A leszorítás korlátlanul nő', 'A légellenállás nullára csökken', 'A szárny emelőerőt kezd termelni felfelé'], answer: 0, explain: 'Túl nagy szögnél az áramlás leválik a szívóoldalról.' },
        { q: 'Mit jelent az L/D arány?', options: ['A hossz és a szélesség arányát', 'A leszorítóerő és a légellenállás arányát', 'A bal és jobb oldali terhelés arányát', 'A lökettérfogat és a teljesítmény arányát'], answer: 1, explain: 'Megmutatja, mennyi leszorítóerő jut egységnyi légellenállásra – az aerodinamikai hatékonyság mérőszáma.' },
        { q: 'Az autó lassú kanyarban jó, gyors kanyarban alulkormányzott. Mit érdemes először állítani?', options: ['A hátsó stabilizátort puhítani', 'A guminyomást mind a négy keréken emelni', 'A fékerőelosztást hátra vinni', 'Az első szárnylapot meredekebbre állítani (több első leszorítás)'], answer: 3, explain: 'A sebességfüggő egyensúlyhibát aerodinamikai eszközzel kezeljük, a mechanikai egyensúly lassú kanyarban jó.' },
        { q: 'Melyik évtől írtak elő sík padlót az F1-ben a talajhatás korlátozására?', options: ['1983', '1966', '2009', '2022'], answer: 0, explain: '1983-tól kötelező lett a sík padló; a Venturi-csatornás padló 2022-ben tért vissza.' },
        { q: 'Mi a porpoising?', options: ['A gumik hólyagosodása', 'A fékek túlmelegedése', 'Nagy sebességű pattogás a padló átesése és újra leszorítása miatt', 'A motor fordulatszám-ingadozása'], answer: 2, explain: 'A túl alacsonyra kerülő padló átesik, az autó felemelkedik, majd újra leszorít – ciklikusan.' },
        { q: 'Mire való a flow-vis festék?', options: ['A karbon elemek védelmére', 'A felületi áramlás irányának láthatóvá tételére', 'A szponzorlogók felvitelére', 'A gumik jelölésére'], answer: 1, explain: 'A menet közben megszáradó festék csíkjai megmutatják, merre áramlik a levegő a felületen.' },
        { q: 'Milyen védőeszköz kell karbonelem csiszolásához?', options: ['Csak hallásvédő', 'Semmi, a karbon ártalmatlan', 'Csak vastag pulóver', 'Porálarc, védőszemüveg, kesztyű és elszívás'], answer: 3, explain: 'A szénszálas por irritálja a bőrt és a légutakat, és elektromosan vezető.' }
      ]
    },

    /* ───────────────────────── 6. FÉKEK ÉS HAJTÁSLÁNC ───────────────────────── */
    {
      id: 'fekek-hajtas',
      title: 'Fékek és hajtáslánc: fékerőelosztás, hő, differenciálmű, áttételek',
      level: 3, minutes: 17,
      summary: 'Miért kell az első kerekekre több fékerő, mennyi hőt nyel el egy féktárcsa, hogyan hangolják a differenciálművet, és hogyan választanak áttételt.',
      tags: ['fék', 'fékerőelosztás', 'brake bias', 'mérlegrúd', 'féktárcsa', 'karbon fék', 'fékfolyadék', 'fading', 'differenciálmű', 'önzáró differenciálmű', 'LSD', 'áttétel', 'sebességváltó', 'végsebesség'],
      models: ['f1-auto', 'benzinmotor', 'elektromos-auto'],
      sections: [
        {
          title: 'Fékerőelosztás: miért kap az eleje többet?',
          text: 'Fékezéskor a súlypont előtti tehetetlenség miatt terhelés kerül **a hátsó tengelyről az elsőre**:\n\n`ΔF = m · a · h / L`\n\nahol m a tömeg, a a lassulás, h a súlypont magassága, L a tengelytáv.\n\n**Szemléltető példa**: 1000 kg-os klubautó, 1,2 g lassulás, h = 0,45 m, L = 2,5 m → ΔF = 1000 · 1,2 · 9,81 · 0,45 / 2,5 ≈ **2100 N**, vagyis kb. 215 kg-nyi terhelés vándorol előre. A terhelt első gumik többet tudnak fékezni, ezért kapnak több fékerőt.\n\nA **fékerőelosztást** (brake bias) versenyautón gyakran **mérlegrúd** (balance bar) állítja, amely két külön főfékhengert (elsőt és hátsót) működtet. A pilóta menet közben is állíthatja egy gombbal vagy forgatógombbal.\n\n- **Túl sok hátra** → a hátsó kerekek blokkolnak először → az autó **megpördülhet**.\n- **Túl sok előre** → az első kerekek blokkolnak → az autó **egyenesen tolja**, nem kormányozható, de stabil.',
          warn: 'A fékrendszer életvédelmi rendszer. Fékbetétet, fékvezetéket, főfékhengert cserélni, fékrendszert légteleníteni csak felügyelet mellett, ellenőrzött munkával szabad – és utána mindig próba (pedálérzet, szivárgás) következik.'
        },
        {
          title: 'Hő a fékben: tárcsa, betét, folyadék',
          text: 'A fék a mozgási energiát **hővé** alakítja: `E = ½ · m · v²`.\n\n**Szemléltető számítás**: 800 kg-os autó 300 km/h-ról (83,3 m/s) 100 km/h-ra (27,8 m/s) lassít: E = ½ · 800 · (83,3² − 27,8²) ≈ **2,5 MJ** – néhány másodperc alatt.\n\n- Az F1-es **karbon-karbon** tárcsáknak a fékezés elején kb. **350–600 °C**-on kell lenniük, csúcsban 1000 °C fölé is melegszenek. A Brembo F1-es első tárcsáin akár **1480 hűtőfurat** van.\n- Klubsportban **öntöttvas/acél** tárcsák dolgoznak: túlhevülve a betét súrlódása csökken (**fading**), a tárcsa megvetemedhet vagy megrepedhet.\n- A **fékfolyadék** felforrhat: a buborékos folyadék összenyomható, a **pedál „puha” lesz vagy leesik**. A folyadék nedvszívó, ezért rendszeresen cserélni kell.\n\nA hőt **hűtőcsatornák** viszik el; a hőfestékkel vagy hőmatricával jelölt tárcsán utólag látható, milyen hőmérsékletet ért el.',
          tip: 'Új betéteket és tárcsákat **be kell járatni** (bedding-in): fokozatosan erősödő fékezésekkel, amelyek során a betét anyagából vékony réteg kerül a tárcsára. Bejáratás nélkül a fék rángathat és rosszul fog.'
        },
        {
          title: 'Differenciálmű: nyitott és önzáró',
          text: 'Kanyarban a **külső kerék gyorsabban forog**, mint a belső. A differenciálmű ezt teszi lehetővé (alapjai: [[#/lecke/autoszereles/eroatvitel|Erőátvitel]] lecke).\n\nA **nyitott differenciálmű** mindig **azonos nyomatékot** ad a két kerékre. Ha a belső kerék kanyarkijáratnál tehermentesül, kipörög, és a külső kerék sem kap több nyomatékot – elvész a gyorsítás.\n\nAz **önzáró differenciálmű (LSD)** korlátozza a két kerék fordulatszám-különbségét:\n\n- **Lamellás (tárcsás)**: súrlódó lamellák; a **rámpaszögek** szabják meg, mennyire zár gázadáskor (power) és motorfékezéskor (coast), az **előfeszítés** pedig nyomaték nélkül is.\n- **Torsen**: csigakerekes, nyomatékérzékelő.\n- **Viszkó**: szilikonolajos, fordulatkülönbségre reagál.\n\nHangolás:\n\n- **Több zárás gázadáskor** → jobb kigyorsítás, de a kanyar közepén alulkormányzottabb.\n- **Több zárás motorfékezéskor** → stabilabb bejárat, de nehezebb befordulni.\n\nAz F1-ben elektronikusan vezérelt differenciálmű van, amelyet a pilóta a kormányon kanyarfázisonként állíthat.'
        },
        {
          title: 'Áttételek és végsebesség',
          text: 'A kerék kerületi sebessége a motorfordulatból:\n\n`v = (n · 2π · r) / (60 · i_fokozat · i_végáttétel)`\n\nahol n a fordulatszám (1/perc), r a kerék gördülési sugara (m), i az áttétel.\n\n**Példa**: n = 8000/perc, i_fokozat = 1,0, i_végáttétel = 3,9, r = 0,31 m → kerékfordulat 8000 / 3,9 ≈ 2051/perc → ω ≈ 214,8 rad/s → v ≈ 66,6 m/s ≈ **240 km/h**.\n\nAz áttételválasztás szempontjai:\n\n- A **legmagasabb fokozat** a leghosszabb egyenes végén (akár szélárnyékban) ne csapjon le túl korán a fordulatszám-határoló, de ne is legyen túl hosszú.\n- A fokozatok legyenek **sűrűk**, hogy váltás után a motor a legjobb nyomatéktartományban maradjon.\n- A lassú kanyarokhoz illő fokozat ne essen két fokozat közé.\n\nVersenyváltók gyakran **szekvenciálisak, kutyafogas** (dog box) kapcsolással: gyors, de nagy igénybevételű – rendszeres ellenőrzést igényel.',
          tip: 'A gumi sugara a nyomással, a kopással és a sebességgel is változik. A pontos végsebesség-számításhoz a gördülési sugarat mérésből (GPS-sebesség és kerékfordulat) érdemes venni.'
        },
        {
          title: 'Hajtáslánc karbantartás és hibrid fékrendszer',
          text: 'A hajtáslánc-alkatrészek élettartamát **kilométerben vagy órában** nyilvántartjuk, és előírt időközönként cseréljük, mielőtt eltörnének.\n\n- **Váltóolaj-csere** és a **mágneses leeresztőcsavar** ellenőrzése: a rátapadt fémpor mennyisége és jellege korai figyelmeztetés a fogaskerekek vagy csapágyak kopására.\n- **Versenykuplung** (többtárcsás, kis átmérőjű): nem a csúsztatásra való; a rajt utáni kopást mérni kell.\n- **Hajtótengelyek, homokinetikus csuklók**: gumiharang épsége, kotyogás.\n\nA **hibrid** versenyautókban a hátsó tengely fékezését részben a villanymotor-generátor végzi (**rekuperáció**), ezért a hátsó fék elektronikusan vezérelt (**brake-by-wire**): a rendszer kiszámolja, mennyit fékez a generátor, és a maradékot adja hidraulikusan. A visszanyerés elvét az [[elektromos-auto|elektromos autó felfedezőjében]] és a [[#/lecke/elektromos-auto/motor-inverter|Villanymotor, inverter, rekuperáció]] leckében találod.',
          warn: 'Hibrid versenyautón a hajtáslánc közelében nagyfeszültségű kábelek és alkatrészek vannak. Ezekhez csak a csapat nagyfeszültségű eljárása szerint, képzett és felhatalmazott személy nyúlhat (lásd a **Boxkiállás, munkabiztonság** leckét).'
        }
      ],
      quiz: [
        { q: 'Miért kap az első tengely több fékerőt?', options: ['Mert az első kerekek nagyobbak', 'Mert fékezéskor terhelés kerül hátulról előre', 'Mert a motor elöl van', 'Mert a szabály így írja elő'], answer: 1, explain: 'A tehetetlenség miatt a súlypont „előre dől”, az első gumik jobban terhelődnek, többet tudnak fékezni.' },
        { q: 'Mi történik, ha a fékerőelosztás túlságosan hátra van állítva?', options: ['Az autó egyenesen tolja, nem fordul', 'Semmi különös', 'Csak a gumik kopnak jobban elöl', 'A hátsó kerekek blokkolnak először, az autó megpördülhet'], answer: 3, explain: 'A blokkoló hátsó kerekek elvesztik az oldaltapadást, az autó instabillá válik.' },
        { q: 'Mit jelent a fading?', options: ['A fék hatásának csökkenése túlhevülés miatt', 'A fékbetét bejáratását', 'A fékpedál rezgését ABS-nél', 'A féktárcsa rozsdásodását'], answer: 0, explain: 'Túl magas hőmérsékleten a betét súrlódási tényezője csökken.' },
        { q: 'Miért lesz „puha” a fékpedál, ha a fékfolyadék felforr?', options: ['Mert a folyadék besűrűsödik', 'Mert a betét elkopik', 'Mert a gőzbuborékok összenyomhatók', 'Mert a tárcsa kitágul'], answer: 2, explain: 'A folyadék összenyomhatatlan, a gáz nem – a pedálút a buborékok összenyomására megy el.' },
        { q: 'Mi a nyitott differenciálmű hátránya kanyarkijáratnál?', options: ['Túl erősen zár', 'Ha a belső kerék kipörög, a külső sem kap több nyomatékot', 'Nem engedi a kerekeket eltérő sebességgel forogni', 'Túl nehéz'], answer: 1, explain: 'A nyitott diff a két kerékre azonos nyomatékot ad, így a kipörgő kerék korlátozza az egészet.' },
        { q: 'Mit okoz általában a több zárás gázadáskor (power) az önzáró diffben?', options: ['Jobb kigyorsítást, de a kanyar közepén több alulkormányzottságot', 'Rosszabb kigyorsítást', 'Stabilabb fékezést', 'Kevesebb gumikopást minden esetben'], answer: 0, explain: 'A zárt diff egyenesbe akarja vinni az autót, ezért a kanyar közepén nehezebben fordul.' },
        { q: 'n = 8000/perc, összáttétel 3,9, r = 0,31 m. Körülbelül mekkora a sebesség?', options: ['120 km/h', '180 km/h', '320 km/h', '240 km/h'], answer: 3, explain: '8000 / 3,9 ≈ 2051/perc → ω ≈ 214,8 rad/s → v ≈ 66,6 m/s ≈ 240 km/h.' },
        { q: 'Mire figyelmeztet a mágneses leeresztőcsavarra tapadt sok fémpor?', options: ['A váltóolaj túl hideg', 'Ez mindig normális, nincs teendő', 'Fogaskerék- vagy csapágykopásra', 'Túl sok olaj van a váltóban'], answer: 2, explain: 'A fémpor mennyisége és jellege korai jele lehet egy alkatrész tönkremenetelének.' }
      ]
    },

    /* ───────────────────────── 7. SETUP ───────────────────────── */
    {
      id: 'setup',
      title: 'Setup-mérnökség: diagnózis, egyesével változtatás, setup-lap',
      level: 3, minutes: 18,
      summary: 'Alul- és túlkormányzottság felismerése kanyarfázisonként, a „változtass egyszerre egyet” elv, a setup-lap és egy setup-szimulátor kipróbálása.',
      tags: ['setup', 'alulkormányzottság', 'túlkormányzottság', 'understeer', 'oversteer', 'kanyarfázis', 'egyensúly', 'setup-lap', 'debrief', 'A-B-A teszt', 'baseline', 'szimulátor'],
      models: ['f1-auto'],
      widgets: [{ type: 'setup-szim' }],
      sections: [
        {
          title: 'Alul- és túlkormányzottság',
          text: '- **Alulkormányzottság (understeer)**: az első kerekek érik el előbb a tapadási határt. Az autó **szélesebb íven** megy, mint amit a kormány kér, „tolja az orrát”.\n- **Túlkormányzottság (oversteer)**: a hátsó kerekek érik el előbb a határt. Az autó **hátulja kicsúszik**, a pilótának ellenkormányoznia kell.\n\nA diagnózis kulcsa, hogy **hol és mikor** jelentkezik a jelenség. A kanyart fázisokra bontjuk:\n\n1. **Bejárat (entry)**: fékezés és bekormányzás.\n2. **Közép (mid-corner, apex)**: legkisebb sebesség, egyensúlyi állapot.\n3. **Kijárat (exit)**: gázadás, kiegyenesedés.\n\nÉs a **sebesség** szerint: **lassú** kanyarban a mechanikai beállítások (gumik, rugózás, stabilizátor, diff), **gyors** kanyarban az **aerodinamika** dominál.',
          tip: 'A „nem fordul az autó” még nem diagnózis. Kérdezz rá: melyik kanyarban, melyik fázisban, lassú vagy gyors kanyarban, és az első vagy a sokadik körben?'
        },
        {
          title: 'Tünet → lehetséges beavatkozás',
          text: 'Tipikus kiindulási irányok (egyik sem „recept”, az autótól és a pályától függ):\n\n**Alulkormányzottság a kanyar közepén, lassú kanyarban**\n- puhább első stabilizátor vagy merevebb hátsó,\n- több negatív camber elöl (ha a gumi hőképe indokolja),\n- első guminyomás optimalizálása,\n- kevesebb zárás a differenciálműben gázadáskor.\n\n**Alulkormányzottság gyors kanyarban**\n- több első szárnylap (aero-egyensúly előre),\n- hasmagasság / rake ellenőrzése.\n\n**Túlkormányzottság bejáratnál (fékezés közben)**\n- fékerőelosztás előre,\n- motorfék-zárás (coast) növelése a diffben,\n- több hátsó összetartás.\n\n**Túlkormányzottság kijáratnál (gázadáskor)**\n- puhább hátsó stabilizátor vagy rugó,\n- diff gázadási zárásának módosítása,\n- több hátsó szárny,\n- kipörgésgátló / gázreakció (ha szabályos), és a pilóta gázkezelése.',
          warn: 'A pilóta vezetési stílusa is okozhat „setup-hibát”: például a túl korai, durva gázadás kijárati túlkormányzottságot. Mielőtt az autóhoz nyúlsz, nézd meg az adatokat is.'
        },
        {
          title: 'Egyszerre csak egyet!',
          text: 'A setup-munka **kísérlet**, és a jó kísérletnek szabályai vannak:\n\n1. **Kiinduló beállítás (baseline)**: egy ismert, dokumentált setup, amihez viszonyítasz.\n2. **Egy változtatás egyszerre**: ha egyszerre állítod a stabilizátort és a szárnyat, nem fogod tudni, melyik hatott – vagy hogy kioltották-e egymást.\n3. **Értelmes lépésköz**: túl kicsi változtatás elveszik a zajban (pályahő, szél, gumikopás), túl nagy átbillenti az autót.\n4. **Azonos körülmények**: hasonló üzemanyag-mennyiség, gumiállapot, pályahőmérséklet. Ezek maguk is változtatják az egyensúlyt!\n5. **A-B-A teszt**: alapbeállítás → változtatás → vissza az alapra. Ha az első és harmadik kimenet eredménye egyezik, a különbség tényleg a változtatásé.\n6. **Mérd és kérdezd**: köridő, szektoridők, telemetria **és** a pilóta érzése.\n\nA versenyhétvégén kevés az idő, ezért a mérnök előre **tervet** készít: milyen sorrendben, mit próbálnak ki.'
        },
        {
          title: 'A setup-lap',
          text: 'A setup-lap az autó **teljes állapotának** írásos rögzítése egy adott kimenethez. Tipikus tartalma:\n\n- **Körülmények**: dátum, pálya, kimenet száma, levegő- és aszfalthőmérséklet, szél, pályaállapot.\n- **Gumik**: készlet száma, keverék, hideg és meleg nyomás, hőmérsékletek (belső–közép–külső), körök száma.\n- **Geometria**: camber, toe, caster mind a négy keréken.\n- **Rugózás**: rugók, stabilizátor-állás, csillapító-klikkek (bump/rebound, alacsony/nagy sebesség), ütközők, hasmagasságok, sarokterhelések.\n- **Aero**: szárnyszögek, Gurney-lapok.\n- **Fékek és hajtás**: fékerőelosztás, betét/tárcsa típusa, diff-beállítás, áttételek.\n- **Üzemanyag** és **tömeg**.\n- **Eredmény**: köridők, legjobb szektorok, **pilóta-megjegyzések** kanyaronként.\n\nA setup-lap alapján bármikor **vissza lehet állni** egy korábbi, jól működő beállításra – és a következő évben ugyanezen a pályán ebből indul a munka.',
          tip: 'Rögzítsd azt is, hogy az állítóelemeknél **mi a nulla** (pl. „klikk számolva teljesen zárt állástól”). Egy rosszul értelmezett klikkszám teljesen más autót eredményez.'
        },
        {
          title: 'Próbáld ki: setup-szimulátor',
          text: 'A lecke alján található **setup-szimulátor** egy kitalált, GT-szerű versenyautó egyszerűsített modelljén mutatja meg, hogyan változik a **becsült köridő**, az **egyensúly** (alul-/túlkormányzottság), a **gumihő** és a **kopás** az egyes beállításoktól – és minden változtatásnál kiírja, mit nyertél és mit vesztettél vele. Így próbáld:\n\n1. Válassz **pályát** (vegyes, gyors, lassú-kanyargós vagy vizes), és indulj az **alap setupból** (baseline).\n2. Nézd meg, mit jelez a modell az egyensúlyról, és fogalmazz meg **hipotézist**: „ha puhítom az első stabilizátort, csökken az alulkormányzottság.”\n3. **Egyetlen** paramétert változtass, és figyeld az eredményt.\n4. Ha nem azt kaptad, amit vártál, állítsd vissza (A-B-A), és gondold végig, miért.\n5. Hasonlítsd össze a kész előbeállításokat (kis leszorítás, nagy leszorítás, esős setup) különböző pályákon: miért gyorsabb az egyik itt, a másik ott?\n6. A **Setup-lap** gombbal kinyomtathatod a beállításodat – pont úgy, mint egy valódi csapatnál.\n\nA szimulátor nem valódi autó: a valóságban a hatások függnek a pályától, a gumitól és egymástól is. A gondolkodásmódot viszont pontosan ugyanígy kell használni.'
        },
        {
          title: 'Beszélgetés a pilótával',
          text: 'A pilóta érzése a legérzékenyebb „szenzor”, de **le kell fordítani**. Bevált debrief-szerkezet:\n\n1. **Általános benyomás** egy mondatban.\n2. **Kanyarról kanyarra**: bejárat – közép – kijárat, lassú és gyors kanyarok külön.\n3. **Fékezés és stabilitás** egyenesben.\n4. **Gumik**: mikor érte el a hőablakot, hogyan változott a tapadás a kimenet során.\n5. **Változás az előző kimenethez képest**: jobb, rosszabb, más?\n\nJó kérdések: „Az autó a kanyar elején vagy a közepén kezd tolni?”, „A hátulja gázadásra vagy már gáz nélkül is mozog?”. Rossz kérdés: „Ugye jobb lett?” – mert a pilóta könnyen azt mondja, amit hallani szeretnél.\n\nA pilóta szavait **mindig vesd össze az adatokkal** (lásd a **Telemetria** leckét): a kettő együtt adja a megbízható diagnózist.'
        }
      ],
      quiz: [
        { q: 'Mit jelent az alulkormányzottság?', options: ['Az első kerekek érik el előbb a tapadási határt, az autó szélesebb íven megy', 'A hátsó kerekek csúsznak ki először', 'Az autó túl gyorsan fordul', 'A kormány túl könnyű'], answer: 0, explain: 'Alulkormányzottnál az autó „tolja az orrát”, kevésbé fordul, mint amit a kormány kér.' },
        { q: 'Miért kell egyszerre csak egy beállítást változtatni?', options: ['Mert a szabály tiltja a több változtatást', 'Mert így gyorsabb', 'Mert különben nem tudod, melyik változtatás okozta a hatást', 'Mert a szerelőknek kevesebb a munka'], answer: 2, explain: 'Két egyidejű változtatás hatása összekeveredik, sőt ki is olthatják egymást.' },
        { q: 'Mi az A-B-A teszt lényege?', options: ['Két pilóta vezet felváltva', 'Alap → változtatás → vissza az alapra, így kiszűrhető a körülmények változása', 'Az autót háromszor mérik le', 'Három különböző gumival mennek'], answer: 1, explain: 'Ha az első és a harmadik kimenet egyezik, a különbség a változtatásnak tulajdonítható.' },
        { q: 'Gyors kanyarban alulkormányzott, lassúban jó az autó. Hol keresed először a megoldást?', options: ['A differenciálműben', 'A guminyomásban', 'A fékerőelosztásban', 'Az aero-egyensúlyban (pl. első szárnylap)'], answer: 3, explain: 'A sebességfüggő probléma aerodinamikai eredetű lehet; lassú kanyarban a mechanikai egyensúly rendben van.' },
        { q: 'Fékezés közben, a kanyar bejáratánál túlkormányzott az autó. Melyik lehet logikus első próbálkozás?', options: ['Fékerőelosztás előrébb állítása', 'Hátsó szárny csökkentése', 'Hátsó stabilizátor keményítése', 'Hátsó szétfutás (toe-out) beállítása'], answer: 0, explain: 'Több első fékerő csökkenti a hátsó kerekek terhelését a fékezésben, stabilabb a bejárat.' },
        { q: 'Mi NEM tartozik feltétlenül a setup-lapra?', options: ['A guminyomások hidegen és melegen', 'A csillapító-klikkek', 'A pálya- és levegőhőmérséklet', 'A szerelők kedvenc étele'], answer: 3, explain: 'A setup-lap az autó állapotát és a körülményeket rögzíti.' },
        { q: 'Miért rossz kérdés a debriefen: „Ugye jobb lett?”', options: ['Mert túl hosszú', 'Mert a pilóta nem ért hozzá', 'Mert sugalmazó: a pilóta hajlamos a várt választ adni', 'Mert a rádión tilos kérdezni'], answer: 2, explain: 'Nyitott, konkrét kérdésekkel (hol, mikor, melyik fázis) kapsz használható visszajelzést.' },
        { q: 'Miért kell rögzíteni, hogy a csillapító-klikkeket honnan számolod?', options: ['Mert a nulla lehet a teljesen nyitott vagy a teljesen zárt állás', 'Mert a klikkek idővel eltűnnek', 'Mert a szabály ezt írja elő', 'Nem kell rögzíteni'], answer: 0, explain: 'Ugyanaz a klikkszám az ellenkező irányból számolva teljesen más csillapítást jelent.' }
      ]
    },

    /* ───────────────────────── 8. TELEMETRIA ───────────────────────── */
    {
      id: 'telemetria',
      title: 'Adatgyűjtés és telemetria',
      level: 3, minutes: 17,
      summary: 'Milyen szenzorok vannak egy versenyautón, mi az a csatorna és a számított csatorna, hogyan hasonlíts össze két kört, és hogyan kapcsold össze az adatot a pilóta szavaival.',
      tags: ['telemetria', 'adatgyűjtés', 'adatrögzítő', 'logger', 'szenzor', 'csatorna', 'mintavételezés', 'CAN-busz', 'köridő-elemzés', 'delta idő', 'elméleti legjobb kör', 'kalibrálás', 'debrief'],
      models: ['f1-auto'],
      terms: ['szabalyozas/mintavetelezes'],
      sections: [
        {
          title: 'Az adatgyűjtő rendszer és a szenzorok',
          text: 'A versenyautó **adatrögzítője** (data logger) a szenzorok jeleit és a vezérlőegységek (ECU) adatait gyűjti, gyakran a **CAN-buszon** keresztül (a busz alapjait lásd az [[#/lecke/autoszereles/diagnosztika|Autószerelés – Diagnosztika]] leckében).\n\nTipikus szenzorok:\n\n- **Kerékfordulat** (sebesség), **motorfordulat**, **fokozat**.\n- **Gázpedál-állás**, **féknyomás** elöl és hátul.\n- **Kormányszög**.\n- **Gyorsulásmérők** (hossz- és oldalirányú g) és **giroszkóp** (legyezési szögsebesség).\n- **GPS** a pozícióhoz.\n- **Lengéscsillapító-elmozdulás** (lineáris potenciométerek) és **hasmagasság-lézerek**.\n- **Gumihőmérséklet és -nyomás** (TPMS, infravörös szenzorok).\n- **Hőmérsékletek és nyomások**: olaj, víz, üzemanyag, fékek; **lambdaszonda**.\n\nEgy F1-es autón a becslések szerint **250–300 szenzor** dolgozik, és másodpercenként nagyjából **1,1 millió adatpontot** küldenek.'
        },
        {
          title: 'Csatornák, mintavételezés, számított csatornák',
          text: 'Minden mért mennyiség egy **csatorna**: időben (vagy a megtett úton) felvett számsor. A rendszer minden csatornát a saját **mintavételi frekvenciáján** rögzít:\n\n- gyorsan változó jelek (pl. lengéscsillapító-elmozdulás): akár **több száz Hz**,\n- lassú jelek (pl. vízhőmérséklet): néhány Hz is elég.\n\nA mintavételi szabály: a frekvencia legyen **legalább kétszerese** a jel legnagyobb frekvenciájának (Nyquist-feltétel), különben hamis jelet látsz.\n\nA **számított (math) csatornák** a mért csatornákból készülnek, például:\n\n- **Csillapító-sebesség**: az elmozdulás idő szerinti deriváltja – ebből látszik, alacsony vagy nagy sebességű tartományban dolgozik-e a csillapító.\n- **Fékerőelosztás**: első féknyomás / (első + hátsó).\n- **Alulkormányzottság-csatorna**: a kormányszög összevetése azzal, amit az autó tényleges fordulása (oldalgyorsulás, legyezési sebesség) indokolna.\n- **Hasmagasság** a lengéscsillapító-elmozdulásokból.',
          tip: 'Két kör összehasonlításakor a vízszintes tengely legyen a **megtett út**, ne az idő: így a kanyarok egymás alá kerülnek.'
        },
        {
          title: 'Köridő-elemzés: hol vész el az idő?',
          text: 'A legfontosabb eszköz két kör **egymásra rajzolása** (overlay): pl. a pilóta legjobb köre és a csapattárs legjobb köre, vagy a setup-változtatás előtti és utáni kör.\n\n1. **Delta idő** (variance) görbe: a pálya mentén mutatja, mennyit nyer vagy veszít az egyik kör a másikhoz képest. Ahol meredeken változik, ott történik valami.\n2. **Sebességgörbe**: a **féktáv kezdete**, a **minimális kanyarsebesség** és a **gázadás pontja** kanyaronként.\n3. **Pedálok és kormány**: gáz- és fékgörbe alakja, kormánykorrekciók (a sok korrekció instabil autóra vagy bizonytalan pilótára utal).\n4. **Szektoridők**: a pálya részekre bontva. Az egyes szektorok legjobbjainak összege az **elméleti legjobb kör** – megmutatja, mennyi idő van még a pilótában és az autóban.\n\nA kérdés mindig az: a különbség **vezetési** (később fékez, korábban ad gázt), vagy **autóbeli** (nem engedi a gumi, nem fordul az autó)?'
        },
        {
          title: 'Adat és pilóta-visszajelzés együtt',
          text: 'Az adat nem helyettesíti a pilótát, és a pilóta sem az adatot:\n\n- A pilóta érzi a **tapadás jellegét** és a **bizalmat**, amit a szenzor nem mér.\n- Az adat **pontosan** megmutatja, **hol** és **mennyi**, amit a pilóta emlékezetből gyakran rossz kanyarhoz köt.\n\nPélda: a pilóta szerint „a 4-es kanyarban tol az orr”. Az adatban a kormányszög nő, miközben az oldalgyorsulás nem → valóban **alulkormányzottság**. Ha viszont az oldalgyorsulás is nő, és csak a kormányszög nagyobb, mint a csapattársé, lehet, hogy a **vezetési vonal** más.\n\nJó gyakorlat a debrief után **közösen** nézni az adatot a pilótával: ő magyarázza el, mit érzett az adott ponton, a mérnök pedig megmutatja, mit mért a rendszer.'
        },
        {
          title: 'Telemetria vagy adatrögzítés?',
          text: '- **Adatrögzítés (logging)**: az adat az autóban tárolódik, és kiállás után kábellel vagy Wi-Fi-n töltik le.\n- **Élő telemetria**: rádiókapcsolaton valós időben jut a boxba. Így a mérnök menet közben látja, ha például esik az olajnyomás, és szólhat a pilótának.\n\nSok sorozatban a telemetria használatát a szabály **korlátozza** vagy tiltja, és az autó beállításait a boxból távolról **nem** lehet módosítani: ezt a pilótának kell megtennie a kormányon, utasításra.\n\nAz adatmennyiség óriási: a becslések szerint egy F1-es autó egy versenyhétvége alatt (a feldolgozott adatokkal, videóval együtt) **több száz gigabájttól akár egy terabájtnál is több** adatot termel.'
        },
        {
          title: 'Szenzorszerelés és kalibrálás',
          text: 'Rossz adatból rossz döntés születik. A szerelő és az adatmérnök feladatai:\n\n1. **Szerelés**: a szenzor rögzítése rezgésálló legyen, a kábel ne dörzsölődjön, ne érjen forró alkatrészhez, és ne akadjon a futómű mozgásába.\n2. **Csatlakozók**: versenycsatlakozók (bajonettzáras), tisztán és szárazon. A kontakthiba „ugráló” jelként jelentkezik.\n3. **Kalibrálás**: a nyers jel (pl. volt) átváltása fizikai mennyiségre (mm, bar, fok). Pl. a kormányszög-szenzor **nullázása** egyenesbe állított kerekekkel, a csillapító-potenciométerek nullázása a setup padon.\n4. **Hihetőség-ellenőrzés**: minden kimenet után gyors átnézés – a négy kerékfordulat egyenesben egyezik? Az oldalgyorsulás jobb- és balkanyarban szimmetrikus?\n\nHa egy csatorna gyanús, előbb a **szenzort és a kábelt** ellenőrizd, és csak utána higgy az autó „hibájában”.',
          warn: 'Hibrid vagy elektromos versenyautón a szenzorkábelek nagyfeszültségű alkatrészek közelében futhatnak. A narancssárga kábelekhez és az általuk táplált egységekhez csak a nagyfeszültségű eljárás szerint, felhatalmazott személy nyúlhat.'
        }
      ],
      quiz: [
        { q: 'Mit mér a lineáris potenciométer a futóművön?', options: ['A motor fordulatszámát', 'A lengéscsillapító elmozdulását', 'A gumi hőmérsékletét', 'A levegő sebességét'], answer: 1, explain: 'Ebből a rugózás mozgása, a hasmagasság és a csillapító-sebesség is számolható.' },
        { q: 'Mi a Nyquist-feltétel lényege?', options: ['A mintavételi frekvencia legyen legalább kétszerese a jel legnagyobb frekvenciájának', 'Minden csatornát 1 Hz-en kell rögzíteni', 'A mintavétel legyen lassabb, mint a jel', 'Csak digitális szenzort szabad használni'], answer: 0, explain: 'Túl ritka mintavételnél hamis (aliasing) jelet kapunk.' },
        { q: 'Miért érdemes két kört a megtett út szerint egymásra rajzolni, nem az idő szerint?', options: ['Mert így kevesebb az adat', 'Mert a szabály így írja elő', 'Mert így a kanyarok egymás alá kerülnek, összehasonlíthatók', 'Mert az idő nem mérhető pontosan'], answer: 2, explain: 'Az idő szerinti ábrán a gyorsabb kör kanyarjai „elcsúsznak” a lassabbéhoz képest.' },
        { q: 'Mi az elméleti legjobb kör?', options: ['A pálya rekordja', 'A szimulátorban futott kör', 'Az időmérő legjobb köre', 'Az egyes szektorok legjobb idejének összege'], answer: 3, explain: 'Megmutatja, mennyi idő lenne elérhető, ha minden szektort a legjobban sikerült volna teljesíteni.' },
        { q: 'Mi egy számított (math) csatorna?', options: ['Mért csatornákból képlettel előállított új csatorna', 'Egy hibás szenzor jele', 'A pilóta rádióüzenete', 'A versenyigazgatóság jelzése'], answer: 0, explain: 'Pl. a csillapító-sebesség az elmozdulás deriváltja, a fékerőelosztás a féknyomásokból számolható.' },
        { q: 'A pilóta szerint a 4-es kanyarban „tol az orr”. Mi erősítené meg az adatban az alulkormányzottságot?', options: ['Nő a motorfordulat', 'Nő a kormányszög, miközben az oldalgyorsulás nem nő', 'A féknyomás nulla', 'A GPS-jel kiesik'], answer: 1, explain: 'Több kormány nem hoz több fordulást – az első tengely a tapadási határon van.' },
        { q: 'Mi a különbség az adatrögzítés és az élő telemetria között?', options: ['Nincs különbség', 'A telemetria csak a pilóta hangját továbbítja', 'Az adatrögzítés csak papíron történik', 'A rögzített adat kiállás után kerül letöltésre, a telemetria valós időben jut a boxba'], answer: 3, explain: 'A telemetria rádiókapcsolatot használ, és sok sorozatban korlátozott.' },
        { q: 'Mit tegyél először, ha egy csatorna jele gyanúsan „ugrál”?', options: ['Azonnal változtass a setupon', 'Hagyd figyelmen kívül', 'Ellenőrizd a szenzort, a kábelt és a csatlakozót', 'Cseréld le a pilótát'], answer: 2, explain: 'A kontakthiba vagy sérült kábel tipikusan ugráló jelet ad; rossz adatból rossz döntés születik.' }
      ]
    },

    /* ───────────────────────── 9. BOX ÉS BIZTONSÁG ───────────────────────── */
    {
      id: 'box-biztonsag',
      title: 'Boxkiállás, munkabiztonság és szabályzat',
      level: 2, minutes: 18,
      summary: 'A boxkiállás koreográfiája, tűz- és üzemanyag-biztonság, a pilóta biztonsági felszerelése, nagyfeszültség a hibrid versenyautókban, zászlójelzések.',
      tags: ['boxkiállás', 'pit stop', 'boxutca', 'tűzvédelem', 'üzemanyag', 'tankolás', 'HANS', 'halo', 'overall', 'nagyfeszültség', 'ERS', 'hibrid', 'zászlók', 'munkavédelem', 'hallásvédelem'],
      models: ['f1-auto', 'elektromos-auto'],
      sections: [
        {
          title: 'A boxkiállás koreográfiája',
          text: 'Egy F1-es boxkiálláson kb. húsz ember dolgozik egyszerre, mindenki egyetlen, begyakorolt feladattal:\n\n- **Keréknként 3 fő**: légkulcsos (anyát old és húz), a régi kereket leemelő, az új kereket feltevő.\n- **Első és hátsó emelős**, oldalt az autót **stabilizáló** szerelők.\n- Szükség esetén az **első szárny** állítója.\n- **Kiengedés**: ma jellemzően lámparendszer, amely csak akkor vált zöldre, ha minden légkulcs jelezte, hogy a kerék rögzítve van.\n\nA világrekord a **McLaren** nevéhez fűződik: a 2023-as **Katari Nagydíjon** Lando Norris autóján **1,80 másodperc** alatt cseréltek kereket.\n\nA gyorsaság mögött rengeteg **gyakorlás** és szigorú rend áll: minden szerszám a helyén, minden mozdulat ugyanúgy. A kisebb sorozatokban kevesebb szerelő dolgozhat, gyakran kötelező kiállás, sőt pilótacsere is van – ott a szabályzat azt is előírja, hány ember dolgozhat az autón egyszerre.',
          warn: 'A **nem biztonságos kiengedés** (unsafe release) – amikor az autó rosszul rögzített kerékkel vagy egy másik autó útjába indul – súlyos büntetést von maga után, és életveszélyes a boxutcában dolgozókra. A boxutcában sebességkorlátozás van (pályától függően jellemzően 60–80 km/h).'
        },
        {
          title: 'Tűz és üzemanyag',
          text: 'Az üzemanyag a box legnagyobb tűzveszélye.\n\n- Az F1-ben **2010 óta tilos** a futam közbeni tankolás – biztonsági és költségokokból. (Korábban több boxtűz is történt tankolás közben.)\n- Más sorozatokban (pl. hosszútávú versenyek) ma is van tankolás, szigorú szabályokkal: tűzálló ruházat és sisak a tankolónak, **tűzoltó készülékkel** készenlétben álló szerelő, földelés.\n\nAlapszabályok a boxban:\n\n- Üzemanyagot csak **erre szolgáló, jelölt, zárt kannában**, a szabályzat szerinti helyen tárolj.\n- Tankoláskor az autót és a kannát **földeld**: a statikus szikra begyújthatja a benzingőzt.\n- **Dohányzás, nyílt láng, köszörülés** tilos az üzemanyag közelében.\n- A versenyautóban **biztonsági üzemanyagtartály** (deformálható, homologizált tartály) és **beépített oltórendszer** van. Kívülről a kocsitesten jelölés mutatja, hol lehet az oltórendszert és az **áramtalanító főkapcsolót** működtetni.\n- Egyes versenyüzemanyagok (pl. metanol) lángja nappal **szinte láthatatlan** – ezért is kell mindig oltóval készenlétben lenni.',
          warn: 'Benzin- vagy olajtűzre soha ne önts vizet! Használd a megfelelő (por-, hab- vagy speciális) tűzoltó készüléket, és ha a tűz nem oltható el azonnal, hagyd el a veszélyzónát, és riaszd a pályabírókat.'
        },
        {
          title: 'A pilóta biztonsági felszerelése',
          text: 'A pilóta felszerelésének minden darabja **FIA-homologizált**, címkével és gyakran lejárati idővel:\n\n- **Sisak**: többrétegű kompozit héj, tűzálló bélés.\n- **HANS** (fej- és nyaktámasz): a sisakot hevederekkel a vállon fekvő kerethez köti, frontális ütközéskor megakadályozza, hogy a fej előrecsapódjon és a nyak túlterhelődjön. Feltalálója **Dr. Robert Hubbard** amerikai biomechanikai mérnök és sógora, **Jim Downing** versenyző; az F1-ben **2003-tól kötelező**.\n- **Overall, alsóruházat, maszk, kesztyű, cipő**: tűzálló anyagból. Az **FIA 8856-2018** szabvány a korábbinál kb. 20%-kal jobb hővédelmet ír elő: az overallnak legalább **12 másodpercig** kell késleltetnie a hő átjutását (a mérőszabvány szerinti vizsgálatban).\n- **Ülés és 6 pontos öv**, homologizált rögzítéssel.\n- Az F1-ben 2018 óta a **halo** fejvédő keret véd a repülő tárgyaktól és ütközéstől.\n\nA 2020-as **Bahreini Nagydíjon** Romain Grosjean autója kettészakadt és lángba borult; a halo és a felszerelés együtt mentette meg az életét – kb. fél percig volt a tűzben, és égési sérülésekkel megúszta.'
        },
        {
          title: 'Nagyfeszültség a hibrid és elektromos versenyautókban',
          text: 'A hibrid versenyautók energia-visszanyerő rendszere (ERS) **nagyfeszültségű**: az akkumulátor és a villanymotor-generátor a tapintásvédelmi határt (60 V egyenfeszültség) messze meghaladó feszültségen dolgozik. A 2026-os F1-es szabályok szerint az MGU-K teljesítménye **350 kW**-ra nőtt, tehát a rendszer még nagyobb energiát kezel.\n\nBiztonsági elemek:\n\n- **Állapotjelző lámpák** az autón: **zöld** = a rendszer biztonságos, az autó megérinthető. Ha a lámpa **nem zöld** (pl. piros vagy más szín), az autót **tilos** szigetelő kesztyű nélkül megérinteni. Ugyanez az elv érvényes rali- és más elektromos versenyautókon is.\n- **Szigetelő kesztyű** (feszültségosztályhoz megfelelő), **szigetelt mentőkampó**, képzett pályabírók.\n- A rendszer kikapcsolása és a **feszültségmentesség ellenőrzése** a csapat írásos eljárása szerint, csak **felhatalmazott, képzett személy** végezheti.\n\nAz alapelveket részletesen a [[#/lecke/elektromos-auto/hv-biztonsag|Nagyfeszültségű biztonság]] lecke tárgyalja.',
          warn: 'Baleset után az álló hibrid autó is lehet „élő”. Soha ne nyúlj hozzá, amíg az állapotjelző nem zöld, és nem kaptál engedélyt. A sérült akkumulátor később is kigyulladhat.'
        },
        {
          title: 'Munkabiztonság a boxban',
          text: 'A versenybox ipari munkahely, csak sokkal szűkebb időben. A munkavédelem általános szabályai itt is érvényesek (Magyarországon a munkavédelemről szóló **1993. évi XCIII. törvény** az alap):\n\n- **Hallásvédelem**: a járó versenymotor és a légkulcsok zaja tartósan halláskárosító.\n- **Égési veszély**: kipufogó, fékek, turbó, motor – kiállás után percekig forrók.\n- **Emelés**: a gyors emelők is csak emelésre valók; ha valaki az autó alá nyúl, az autó **bakon** álljon.\n- **Sűrített levegő és gázpalackok**: rögzítve, sérülésmentes tömlőkkel; a légkulcs nagy nyomatéka elkaphatja a kezet.\n- **Vegyi anyagok**: üzemanyag, fékfolyadék, tisztítószerek – biztonsági adatlap szerint, védőkesztyűvel.\n- **Fáradtság**: a hosszú éjszakai munka a hibák forrása. Sok sorozat (pl. az F1) korlátozza, mikor dolgozhat a csapat éjjel a pályán.\n\nA rend nem csak esztétika: a padlón heverő kábel, szerszám vagy olajfolt a rohanó boxkiállásnál balesetet okoz.'
        },
        {
          title: 'Szabályzat és zászlójelzések',
          text: 'A pálya mentén a pályabírók **zászlókkal** (és fényjelzőkkel) kommunikálnak. A legfontosabbak:\n\n- **Sárga**: veszély a pályán, lassíts, **előzni tilos**. Dupla sárga: még nagyobb veszély, készülj a megállásra.\n- **Zöld**: a veszélyes szakasz vége.\n- **Kék**: gyorsabb autó érkezik mögéd (köröző autó) – engedd el.\n- **Piros**: a futamot vagy edzést **megszakították**, lassan vissza a boxba.\n- **Fekete**: a pilóta ki van zárva / azonnal a boxba kell hajtania.\n- **Fekete narancssárga körrel**: műszaki hiba az autón, a boxba kell hajtani.\n- **Kockás**: a futam vagy edzés vége.\n\nEmellett a **biztonsági autó (Safety Car)** és a **virtuális biztonsági autó (VSC)** eljárásait is ismerni kell. A szerelőnek is tudnia kell, mit jelent a rádión vagy a monitoron megjelenő jelzés – pl. piros zászlónál a boxban azonnal készülni kell az autó fogadására.\n\nA szabályok betű szerinti betartása mellett a **szabályok szelleme** is számít: a „kiskapu”, ami a biztonságot veszélyezteti, nem okos megoldás, hanem kockázat.',
          tip: 'A zászlók jelentése sorozatonként kissé eltérhet. Mindig a bajnokság sportszabályzatát és a pilótaeligazítást vedd alapul.'
        }
      ],
      quiz: [
        { q: 'Mennyi a boxkiállás világrekordja, és ki tartja (2023-as adat)?', options: ['1,82 s, Red Bull', '1,80 s, McLaren', '2,40 s, Ferrari', '1,50 s, Mercedes'], answer: 1, explain: 'A McLaren 2023-ban Katarban, Lando Norris autóján 1,80 s alatt cserélt kereket, megdöntve a Red Bull 2019-es 1,82 s-os rekordját.' },
        { q: 'Mióta tilos a futam közbeni tankolás az F1-ben?', options: ['1994 óta', '2003 óta', '2010 óta', '2022 óta'], answer: 2, explain: '2010-től biztonsági és költségokokból tiltották be.' },
        { q: 'Miért kell tankoláskor földelni az autót és a kannát?', options: ['A statikus feltöltődésből keletkező szikra begyújthatja a benzingőzt', 'Hogy gyorsabban folyjon az üzemanyag', 'Hogy ne hűljön le az üzemanyag', 'A szabályzat nem írja elő, csak szokás'], answer: 0, explain: 'A benzingőz nagyon kis energiájú szikrától is meggyulladhat.' },
        { q: 'Mit csinál a HANS?', options: ['Hűti a pilóta fejét', 'Rádiót tartalmaz', 'Védi a pilóta szemét', 'Frontális ütközéskor megakadályozza, hogy a fej előrecsapódjon'], answer: 3, explain: 'A sisakot a vállon fekvő kerethez köti, így a nyakat nem éri túlzott terhelés.' },
        { q: 'Hibrid versenyautón milyen színű állapotjelző jelzi, hogy az autó megérinthető?', options: ['Zöld', 'Piros', 'Kék', 'Sárga villogó'], answer: 0, explain: 'Csak zöld jelzésnél biztonságos; minden más esetben szigetelő kesztyű és felhatalmazott személy kell.' },
        { q: 'Mit jelent a kék zászló?', options: ['Veszély a pályán, előzni tilos', 'A futam vége', 'Gyorsabb (köröző) autó érkezik mögéd, engedd el', 'Műszaki hiba az autón'], answer: 2, explain: 'A kék zászló a lekörözés előtt álló autónak szól.' },
        { q: 'Miért kell oltóval készenlétben állni metanolos üzemanyagnál?', options: ['Mert a metanol nem ég', 'Mert nappal a lángja szinte láthatatlan', 'Mert a metanol fagyveszélyes', 'Mert a metanol radioaktív'], answer: 1, explain: 'A láthatatlan láng miatt a tüzet későn vehetik észre.' },
        { q: 'Mit írtak elő az FIA 8856-2018 szabványban az overallok hővédelmére?', options: ['Semmit, csak a színt', 'Legalább 2 másodpercet', 'Pontosan 60 másodpercet', 'Kb. 20%-kal jobb hővédelmet, legalább 12 s hőátjutási időt'], answer: 3, explain: 'A korábbi kb. 11 s-os átlagról legalább 12 s-ra emelték a hőátjutási mutatót.' }
      ]
    }
  ]
});
