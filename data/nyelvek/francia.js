/* Francia nyelvtanfolyam (A1–A2) – 12 egység */
STUDIE.addLangCourse({
  id: 'francia', title: 'Francia', flag: '🇫🇷', tts: 'fr-FR', badge: 'A1–A2',
  noSpaces: false, script: false,
  intro: 'A franciát öt kontinensen több mint 300 millió ember beszéli – és a magyarba is rengeteg szót adott: büfé, garázs, sofőr, parfüm, butik!',
  units: [
    {
      id: 'koszones', title: 'Köszönés és bemutatkozás', icon: '👋',
      tip: 'A franciában sok betűt **leírunk, de nem ejtünk ki**:\n\n- A szóvégi mássalhangzó többnyire néma: `salut` [szalü], `Paris` [pari]. Gyakori kivétel a c, r, f, l: `bonjour`, `avec`, `neuf`.\n- A szóvégi -e néma: `madame` [madam].\n- A `h` mindig néma: `hôtel` [otel].\n\nÉkezetek és különleges betűk:\n\n- `é` zárt, rövid é: `café`\n- `è` és `ê` nyílt e, közel a magyar e-hez: `très`, `fête`\n- `ç` mindig sz: `ça va` [sza va]\n- `ou` = u (`bonjour`), `u` = ü (`salut`), `oi` = oá (`au revoir`), `au` = o\n\nA hangsúly mindig az **utolsó** szótagra esik – a magyarral épp fordítva!',
      words: [
        ['bonjour', 'jó napot'], ['salut', 'szia'], ['bonsoir', 'jó estét'], ['au revoir', 'viszontlátásra'], ['bonne nuit', 'jó éjszakát'],
        ['merci', 'köszönöm'], ['de rien', 'szívesen'], ['s\'il te plaît', 'légy szíves'], ['s\'il vous plaît', 'legyen szíves'],
        ['oui', 'igen'], ['non', 'nem'], ['pardon', 'elnézést'], ['monsieur', 'uram'], ['madame', 'hölgyem'],
        ['bien', 'jól'], ['très', 'nagyon'], ['comment', 'hogyan'], ['à bientôt', 'nemsokára találkozunk']
      ],
      sentences: [
        ['Bonjour, je m\'appelle Paul.', 'Jó napot, Paul vagyok.', [], ['Jó napot, Paulnak hívnak.', 'Jó napot, a nevem Paul.']],
        ['Salut, ça va?', 'Szia, hogy vagy?', ['Salut, comment ça va?'], ['Szia, minden rendben?']],
        ['Ça va bien, merci.', 'Jól vagyok, köszönöm.', ['Je vais bien, merci.'], ['Jól, köszönöm.']],
        ['Comment tu t\'appelles?', 'Hogy hívnak?', ['Tu t\'appelles comment?'], ['Mi a neved?']],
        ['Comment vous appelez-vous?', 'Önt hogy hívják?', [], ['Hogy hívják Önt?', 'Mi az Ön neve?']],
        ['Merci beaucoup, madame.', 'Nagyon köszönöm, hölgyem.', [], ['Köszönöm szépen, hölgyem.']],
        ['Au revoir, monsieur.', 'Viszontlátásra, uram.'],
        ['À bientôt, Marie!', 'Nemsokára találkozunk, Marie!', [], ['Viszlát nemsokára, Marie!']],
        ['Oui, s\'il te plaît.', 'Igen, légy szíves.', [], ['Igen, kérlek.']],
        ['Pardon, monsieur.', 'Elnézést, uram.'],
        ['Bonsoir, madame.', 'Jó estét, hölgyem.']
      ]
    },
    {
      id: 'szamok', title: 'Számok 0–20', icon: '🔢',
      tip: '**Orrhangok:** ha egy magánhangzó után n vagy m jön (és utána nem magánhangzó), a magánhangzót az orron át ejtjük, az n-t pedig nem mondjuk ki külön:\n\n- `an`, `en` → mély orrhangú a: `trente`, `enfant`\n- `in`, `ain`, `un` → orrhangú e: `cinq`, `vingt`, `un`\n- `on` → orrhangú o: `onze`, `bonjour`\n\n**Kötés (liaison):** a néma szóvégi mássalhangzó megszólal, ha a következő szó magánhangzóval vagy néma h-val kezdődik. Az s és az x ilyenkor z-nek hangzik:\n\n- `deux ans` [döz an], `trois amis` [troáz ami], `vous avez` [vuz avé]\n\nA `six` és a `dix` önmagában [sziisz, diisz], mássalhangzó előtt néma a végük (`six chats` [szi sa]), magánhangzó előtt z (`six ans` [sziz an]).',
      words: [
        ['zéro', 'nulla'], ['un', 'egy'], ['deux', 'kettő'], ['trois', 'három'], ['quatre', 'négy'], ['cinq', 'öt'],
        ['six', 'hat'], ['sept', 'hét'], ['huit', 'nyolc'], ['neuf', 'kilenc'], ['dix', 'tíz'], ['onze', 'tizenegy'],
        ['douze', 'tizenkettő'], ['treize', 'tizenhárom'], ['quatorze', 'tizennégy'], ['quinze', 'tizenöt'], ['seize', 'tizenhat'], ['vingt', 'húsz']
      ],
      sentences: [
        ['J\'ai douze ans.', 'Tizenkét éves vagyok.'],
        ['Tu as quel âge?', 'Hány éves vagy?', ['Quel âge as-tu?', 'Quel âge tu as?']],
        ['Il a seize ans.', 'Tizenhat éves.', [], ['Ő tizenhat éves.']],
        ['Elle a quinze ans.', 'Tizenöt éves.', [], ['Ő tizenöt éves.']],
        ['Tu as treize ans?', 'Tizenhárom éves vagy?'],
        ['Non, j\'ai onze ans.', 'Nem, tizenegy éves vagyok.'],
        ['Deux et trois font cinq.', 'Kettő meg három egyenlő öttel.', [], ['Kettő plusz három egyenlő öttel.', 'Kettő meg három az öt.']],
        ['Dix moins quatre font six.', 'Tíz mínusz négy egyenlő hattal.', [], ['Tízből négy az hat.']],
        ['Quatorze et six font vingt.', 'Tizennégy meg hat egyenlő hússzal.', [], ['Tizennégy plusz hat egyenlő hússzal.']],
        ['Nous sommes vingt.', 'Húszan vagyunk.'],
        ['J\'ai neuf euros.', 'Kilenc eurom van.']
      ]
    },
    {
      id: 'csalad', title: 'Család', icon: '👨‍👩‍👧',
      tip: 'A franciában minden főnévnek van **neme**: hímnem vagy nőnem. Ezt a névelő mutatja, ezért a szavakat mindig névelővel együtt tanuld!\n\n- határozott névelő: `le` (hímnem), `la` (nőnem), `les` (többes szám) – a magyar a/az\n- magánhangzó és néma h előtt `le` és `la` helyett `l\'`: `l\'oncle`, `l\'amie`\n- határozatlan névelő: `un` (hímnem), `une` (nőnem), `des` (többes szám)\n\nBirtokos névmás (az én …-m): `mon père`, `ma mère`, `mes parents`. Magánhangzó előtt nőnemben is `mon` áll: `mon amie`.\n\nA többes szám jele általában -s, de **nem ejtjük ki**: `le chat` [lö sa] és `les chats` [lé sa] csak a névelőben különbözik.',
      words: [
        ['la famille', 'család'], ['le père', 'apa'], ['la mère', 'anya'], ['les parents', 'szülők'], ['le frère', 'fiútestvér'], ['la sœur', 'lánytestvér'],
        ['le garçon', 'fiú'], ['la fille', 'lány'], ['le grand-père', 'nagyapa'], ['la grand-mère', 'nagymama'], ['l\'oncle', 'nagybácsi'], ['la tante', 'nagynéni'],
        ['le cousin', 'unokatestvér'], ['le bébé', 'kisbaba'], ['le chien', 'kutya'], ['le chat', 'macska'], ['l\'ami', 'barát'], ['l\'amie', 'barátnő']
      ],
      sentences: [
        ['Voici ma famille.', 'Ez a családom.', [], ['Íme a családom.']],
        ['J\'ai un frère et une sœur.', 'Van egy fiútestvérem és egy lánytestvérem.', [], ['Van egy fiú- és egy lánytestvérem.']],
        ['Mon père s\'appelle Marc.', 'Az apámat Marcnak hívják.', [], ['Apámat Marcnak hívják.', 'Az apám neve Marc.']],
        ['Ma mère est très gentille.', 'Az anyám nagyon kedves.', [], ['Anyám nagyon kedves.']],
        ['J\'ai un chien et deux chats.', 'Van egy kutyám és két macskám.'],
        ['Le bébé dort.', 'A kisbaba alszik.'],
        ['Mon cousin a dix ans.', 'Az unokatestvérem tízéves.', [], ['Az unokatestvérem tíz éves.']],
        ['Tu as des frères?', 'Vannak fiútestvéreid?', ['Est-ce que tu as des frères?', 'As-tu des frères?'], ['Van fiútestvéred?']],
        ['C\'est la sœur de Paul.', 'Ez Paul lánytestvére.', [], ['Ő Paul lánytestvére.', 'Ő Paul húga.', 'Ő Paul nővére.']],
        ['Mon oncle a un chat.', 'A nagybátyámnak van egy macskája.'],
        ['La fille et le garçon sont amis.', 'A lány és a fiú barátok.']
      ]
    },
    {
      id: 'iskola', title: 'Iskola és tárgyak', icon: '🎒',
      tip: '**Tu vagy vous?** A `tu` a tegeződés: barátok, család, gyerekek egymás közt. A `vous` kétféle: magázódás (tanár, idegen felnőtt, eladó) és a többes szám második személy (ti). A tanárodat tehát `vous`-zal szólítod meg!\n\nAz **être** (lenni) ige rendhagyó, ezt kívülről kell tudni:\n\n- `je suis` – vagyok\n- `tu es` – vagy\n- `il / elle est` – ő (van)\n- `nous sommes` – vagyunk\n- `vous êtes` – vagytok / Ön (van)\n- `ils / elles sont` – ők (vannak)\n\nA magyarral ellentétben a létige harmadik személyben sem maradhat el, és a személyes névmás is kötelező: `Il est élève.` – Ő diák. Foglalkozás előtt nincs névelő: `Je suis élève.`',
      words: [
        ['l\'école', 'iskola'], ['la classe', 'osztály'], ['le professeur', 'tanár'], ['l\'élève', 'diák'], ['le livre', 'könyv'], ['le cahier', 'füzet'],
        ['le stylo', 'toll'], ['le crayon', 'ceruza'], ['la gomme', 'radír'], ['le sac', 'táska'], ['la table', 'asztal'], ['la chaise', 'szék'],
        ['le tableau', 'tábla'], ['la règle', 'vonalzó'], ['les devoirs', 'házi feladat'], ['le cours', 'tanóra'], ['facile', 'könnyű'], ['difficile', 'nehéz']
      ],
      sentences: [
        ['Je suis élève.', 'Diák vagyok.', [], ['Tanuló vagyok.']],
        ['Vous êtes le professeur?', 'Ön a tanár?', ['Êtes-vous le professeur?', 'Est-ce que vous êtes le professeur?'], ['Maga a tanár?']],
        ['Le livre est sur la table.', 'A könyv az asztalon van.'],
        ['J\'ai un stylo et un cahier.', 'Van egy tollam és egy füzetem.'],
        ['Nous sommes en classe.', 'Órán vagyunk.', [], ['Az osztályban vagyunk.']],
        ['Le français est facile.', 'A francia könnyű.', [], ['A francia nyelv könnyű.']],
        ['Les devoirs sont difficiles.', 'A házi feladat nehéz.'],
        ['Où est ma gomme?', 'Hol van a radírom?'],
        ['C\'est mon école.', 'Ez az én iskolám.', [], ['Ez az iskolám.']],
        ['Tu es dans ma classe.', 'Az osztályomba jársz.', [], ['Az én osztályomba jársz.', 'Az osztályomban vagy.']],
        ['Le sac est sous la chaise.', 'A táska a szék alatt van.']
      ]
    },
    {
      id: 'etel', title: 'Étel és ital', icon: '🥐',
      tip: 'Ha **meghatározatlan mennyiségről** beszélünk (valamennyit eszünk, iszunk), a franciában **részelő névelő** kell – a magyarban ilyenkor csak tárgyrag van:\n\n- `du` (hímnem): `du pain` – kenyeret\n- `de la` (nőnem): `de la soupe` – levest\n- `de l\'` (magánhangzó előtt): `de l\'eau` – vizet\n- `des` (többes szám): `des frites` – sült krumplit\n\nTagadás után mindegyikből `de` (magánhangzó előtt `d\'`) lesz: `Je ne mange pas de viande.` – Nem eszem húst.\n\nHa azt mondod, mit szeretsz **általában**, határozott névelő kell: `J\'aime le chocolat.` – Szeretem a csokit (úgy általában, nem egy darabot belőle).',
      words: [
        ['le pain', 'kenyér'], ['le fromage', 'sajt'], ['le lait', 'tej'], ['l\'eau', 'víz'], ['le jus d\'orange', 'narancslé'], ['la pomme', 'alma'],
        ['la viande', 'hús'], ['le poisson', 'hal'], ['le poulet', 'csirke'], ['les frites', 'sült krumpli'], ['le gâteau', 'sütemény'], ['le chocolat', 'csokoládé'],
        ['la soupe', 'leves'], ['le petit-déjeuner', 'reggeli'], ['le déjeuner', 'ebéd'], ['le dîner', 'vacsora'], ['manger', 'enni'], ['boire', 'inni']
      ],
      sentences: [
        ['Je mange du pain.', 'Kenyeret eszem.'],
        ['Tu bois de l\'eau?', 'Vizet iszol?', ['Est-ce que tu bois de l\'eau?', 'Bois-tu de l\'eau?']],
        ['Elle mange de la soupe.', 'Levest eszik.', [], ['Ő levest eszik.']],
        ['Je ne mange pas de viande.', 'Nem eszem húst.'],
        ['Il boit du lait.', 'Tejet iszik.', [], ['Ő tejet iszik.']],
        ['J\'aime le chocolat.', 'Szeretem a csokoládét.', [], ['Szeretem a csokit.']],
        ['Nous mangeons du poulet et des frites.', 'Csirkét és sült krumplit eszünk.'],
        ['Un jus d\'orange, s\'il vous plaît.', 'Egy narancslevet kérek.', [], ['Egy narancslét kérek.', 'Egy narancslevet, legyen szíves.']],
        ['Le gâteau est délicieux.', 'A sütemény finom.', [], ['A sütemény nagyon finom.']],
        ['Au petit-déjeuner, je mange une pomme.', 'Reggelire egy almát eszem.', ['Je mange une pomme au petit-déjeuner.'], ['Reggelire almát eszem.']],
        ['Je voudrais du fromage.', 'Sajtot szeretnék.', [], ['Sajtot kérnék.']]
      ]
    },
    {
      id: 'szinek', title: 'Színek és ruhák', icon: '👕',
      tip: 'Az **avoir** (birtokolni, „van valamije”) ige is rendhagyó:\n\n- `j\'ai`, `tu as`, `il / elle a`\n- `nous avons`, `vous avez`, `ils / elles ont`\n\nA magyar „van egy pulóverem” franciául `J\'ai un pull.` (szó szerint: bírok egy pulóvert). Az életkort is az avoir fejezi ki: `J\'ai douze ans.`\n\nA **melléknév** általában a főnév **után** áll, és egyezik vele nemben és számban:\n\n- nőnem: +e → `vert` → `verte`, `bleu` → `bleue`\n- többes szám: +s → `noirs`, `noires`\n- rendhagyó: `blanc` → `blanche`\n- ami eleve -e-re végződik, nem változik nőnemben: `rouge`, `jaune`; a `marron` pedig soha nem változik.',
      words: [
        ['rouge', 'piros'], ['bleu', 'kék'], ['vert', 'zöld'], ['jaune', 'sárga'], ['noir', 'fekete'], ['blanc', 'fehér'],
        ['gris', 'szürke'], ['rose', 'rózsaszín'], ['marron', 'barna'], ['le pantalon', 'nadrág'], ['la jupe', 'szoknya'], ['la robe', 'ruha'],
        ['le t-shirt', 'póló'], ['la chemise', 'ing'], ['le pull', 'pulóver'], ['les chaussures', 'cipő'], ['le chapeau', 'kalap'], ['le manteau', 'kabát']
      ],
      sentences: [
        ['J\'ai un pull rouge.', 'Van egy piros pulóverem.'],
        ['Elle a une robe blanche.', 'Van egy fehér ruhája.', [], ['Neki van egy fehér ruhája.']],
        ['Le pantalon est noir.', 'A nadrág fekete.'],
        ['Mes chaussures sont grises.', 'A cipőm szürke.', [], ['A cipőim szürkék.']],
        ['Tu as un t-shirt vert?', 'Van zöld pólód?', ['Est-ce que tu as un t-shirt vert?', 'As-tu un t-shirt vert?'], ['Van egy zöld pólód?']],
        ['La chemise est bleue.', 'Az ing kék.'],
        ['Nous avons des chapeaux jaunes.', 'Sárga kalapjaink vannak.', [], ['Vannak sárga kalapjaink.']],
        ['Il porte un manteau marron.', 'Barna kabátot visel.', [], ['Barna kabát van rajta.', 'Ő barna kabátot visel.']],
        ['Quelle est ta couleur préférée?', 'Mi a kedvenc színed?'],
        ['Ma couleur préférée est le rose.', 'A kedvenc színem a rózsaszín.'],
        ['Ils ont deux chats noirs.', 'Két fekete macskájuk van.', [], ['Nekik két fekete macskájuk van.']]
      ]
    },
    {
      id: 'ido', title: 'Napok, idő, nagy számok', icon: '📅',
      tip: 'A francia számok 60 fölött **húszasával** számolnak – ez a régi kelta–gall húszas számrendszer emléke:\n\n- 70 = `soixante-dix` (60 + 10), 75 = `soixante-quinze` (60 + 15)\n- 80 = `quatre-vingts` (4 × 20)\n- 90 = `quatre-vingt-dix` (4 × 20 + 10)\n- 97 = `quatre-vingt-dix-sept` (4 × 20 + 17)!\n\nBelgiumban és Svájcban egyszerűbb: `septante` (70), `nonante` (90).\n\nA 21, 31, 41, 51, 61, 71 kötőszóval áll: `vingt et un`, `soixante et onze`; a többi kötőjellel: `vingt-deux`, `trente-cinq`.\n\nA napok neve **kisbetűs**. Névelő nélkül egy adott napot jelent (`lundi` – hétfőn), névelővel ismétlődést: `le lundi` – hétfőnként.\n\nAz idő: `Il est huit heures.` – Nyolc óra van.',
      words: [
        ['lundi', 'hétfő'], ['mardi', 'kedd'], ['mercredi', 'szerda'], ['jeudi', 'csütörtök'], ['vendredi', 'péntek'], ['samedi', 'szombat'], ['dimanche', 'vasárnap'],
        ['aujourd\'hui', 'ma'], ['demain', 'holnap'], ['hier', 'tegnap'], ['la semaine', 'hét (7 nap)'], ['l\'heure', 'óra (időpont)'],
        ['trente', 'harminc'], ['quarante', 'negyven'], ['cinquante', 'ötven'], ['soixante', 'hatvan'], ['soixante-dix', 'hetven'],
        ['quatre-vingts', 'nyolcvan'], ['quatre-vingt-dix', 'kilencven'], ['cent', 'száz']
      ],
      sentences: [
        ['Aujourd\'hui, c\'est lundi.', 'Ma hétfő van.', ['Nous sommes lundi.', 'On est lundi.']],
        ['Demain, c\'est samedi!', 'Holnap szombat van!', [], ['Holnap szombat!']],
        ['Il est quelle heure?', 'Hány óra van?', ['Quelle heure est-il?']],
        ['Il est huit heures.', 'Nyolc óra van.'],
        ['Mon grand-père a soixante-dix ans.', 'A nagyapám hetvenéves.', [], ['A nagyapám hetven éves.']],
        ['Ma grand-mère a quatre-vingts ans.', 'A nagymamám nyolcvanéves.', [], ['A nagymamám nyolcvan éves.']],
        ['Le dimanche, je mange chez ma grand-mère.', 'Vasárnaponként a nagymamámnál eszem.', [], ['Vasárnap a nagymamámnál eszem.']],
        ['Nous avons français le jeudi.', 'Csütörtökönként van franciaóránk.', [], ['Csütörtökön van franciaóránk.', 'Csütörtökön van franciánk.']],
        ['Une semaine a sept jours.', 'Egy hétben hét nap van.', [], ['Egy hét hét napból áll.']],
        ['Ça fait quatre-vingt-dix euros.', 'Ez kilencven euró.', [], ['Összesen kilencven euró.']],
        ['Cent moins trente font soixante-dix.', 'Száz mínusz harminc egyenlő hetvennel.', [], ['Száz mínusz harminc az hetven.']]
      ]
    },
    {
      id: 'otthon', title: 'Otthon', icon: '🏠',
      tip: 'A francia igék legnagyobb csoportja **-er** végű (`parler`, `habiter`, `aimer`). Ezeket mind ugyanígy ragozzuk: levágjuk az -er-t, és hozzátesszük a végződést:\n\n- `je parle`, `tu parles`, `il / elle parle`\n- `nous parlons`, `vous parlez`, `ils / elles parlent`\n\nJó hír: a `parle`, `parles`, `parlent` kiejtése **ugyanaz** [parl], mert az -e, -es, -ent néma! Épp ezért a franciában mindig ki kell tenni a személyes névmást (magyarul elég annyi: beszélek).\n\nMagánhangzó és néma h előtt a `je` → `j\'`: `j\'habite`, `j\'aime`, `j\'écoute`.\n\nA -ger végű igéknél a nous alakban megmarad egy e, hogy a g lágy maradjon: `nous mangeons`.',
      words: [
        ['la maison', 'ház'], ['l\'appartement', 'lakás'], ['la chambre', 'hálószoba'], ['la cuisine', 'konyha'], ['la salle de bains', 'fürdőszoba'], ['le salon', 'nappali'],
        ['le jardin', 'kert'], ['la porte', 'ajtó'], ['la fenêtre', 'ablak'], ['le lit', 'ágy'], ['le canapé', 'kanapé'], ['la télé', 'tévé'],
        ['habiter', 'lakni'], ['regarder', 'nézni'], ['écouter', 'hallgatni'], ['aimer', 'szeretni'], ['parler', 'beszélni'], ['travailler', 'dolgozni']
      ],
      sentences: [
        ['J\'habite dans une maison.', 'Egy házban lakom.', [], ['Házban lakom.']],
        ['Nous habitons dans un appartement.', 'Egy lakásban lakunk.', [], ['Lakásban lakunk.']],
        ['Tu regardes la télé?', 'Nézed a tévét?', ['Est-ce que tu regardes la télé?'], ['Tévézel?']],
        ['Ma mère travaille dans la cuisine.', 'Az anyám a konyhában dolgozik.', [], ['Anyám a konyhában dolgozik.']],
        ['Le chat aime le canapé.', 'A macska szereti a kanapét.'],
        ['J\'écoute de la musique dans ma chambre.', 'A szobámban zenét hallgatok.', [], ['Zenét hallgatok a szobámban.', 'A hálószobámban zenét hallgatok.']],
        ['Vous parlez français?', 'Beszél franciául?', ['Parlez-vous français?', 'Est-ce que vous parlez français?'], ['Beszéltek franciául?', 'Ön beszél franciául?']],
        ['Le jardin est très grand.', 'A kert nagyon nagy.'],
        ['Ils regardent par la fenêtre.', 'Kinéznek az ablakon.', [], ['Az ablakon néznek ki.']],
        ['La salle de bains est petite.', 'A fürdőszoba kicsi.'],
        ['Il ferme la porte.', 'Becsukja az ajtót.', [], ['Ő becsukja az ajtót.']]
      ]
    },
    {
      id: 'varos', title: 'Város és közlekedés', icon: '🚲',
      tip: 'A tagadás a franciában **két részből** áll, és közrefogja az igét: `ne` + ige + `pas`.\n\n- `Je parle.` → `Je ne parle pas.` – Nem beszélek.\n- Magánhangzó előtt `ne` → `n\'`: `Il n\'aime pas le métro.`, `Ce n\'est pas ma voiture.`\n- Tagadás után az `un / une / du / de la / des` helyett `de` áll: `J\'ai un vélo.` → `Je n\'ai pas de vélo.`\n\nA beszélt nyelvben a `ne` gyakran elmarad (`Je sais pas.`), de írásban mindig kell!\n\n**Hova?** Az `à` (-ba, -be, -hoz) összeolvad a névelővel: `à` + `le` = `au`, `à` + `les` = `aux`. Tehát `au cinéma`, `au parc`, de `à la piscine`, `à l\'école`.',
      words: [
        ['la ville', 'város'], ['la rue', 'utca'], ['le magasin', 'bolt'], ['la boulangerie', 'pékség'], ['le parc', 'park'], ['la gare', 'pályaudvar'],
        ['la piscine', 'uszoda'], ['le cinéma', 'mozi'], ['le musée', 'múzeum'], ['l\'hôpital', 'kórház'], ['le bus', 'busz'], ['le train', 'vonat'],
        ['le vélo', 'bicikli'], ['la voiture', 'autó'], ['le métro', 'metró'], ['à pied', 'gyalog'], ['à gauche', 'balra'], ['à droite', 'jobbra']
      ],
      sentences: [
        ['Je ne vais pas au cinéma.', 'Nem megyek moziba.', [], ['Nem megyek el a moziba.']],
        ['Où est la gare?', 'Hol van a pályaudvar?', [], ['Hol van a vasútállomás?']],
        ['La piscine est à gauche.', 'Az uszoda balra van.', [], ['Az uszoda bal oldalon van.']],
        ['Le musée n\'est pas loin.', 'A múzeum nincs messze.'],
        ['Je vais à l\'école à pied.', 'Gyalog megyek iskolába.', [], ['Gyalog megyek az iskolába.', 'Gyalog járok iskolába.']],
        ['Il n\'aime pas le métro.', 'Nem szereti a metrót.', [], ['Ő nem szereti a metrót.']],
        ['Nous allons au parc à vélo.', 'Biciklivel megyünk a parkba.', ['Nous allons au parc en vélo.']],
        ['Tu n\'habites pas en ville?', 'Nem a városban laksz?', [], ['Nem városban laksz?']],
        ['La boulangerie est à droite.', 'A pékség jobbra van.', [], ['A pékség jobb oldalon van.']],
        ['Ce n\'est pas ma voiture.', 'Ez nem az én autóm.', [], ['Ez nem az autóm.']],
        ['Il y a un magasin dans la rue.', 'Van egy bolt az utcában.', [], ['Az utcában van egy bolt.']]
      ]
    },
    {
      id: 'hobbi', title: 'Hobbi és sport', icon: '⚽',
      tip: 'Hobbiról és sportról három fontos szerkezet:\n\n- `jouer à` + játék vagy sport: `jouer au foot`, `jouer aux jeux vidéo` (à + le = au, à + les = aux)\n- `jouer de` + hangszer: `jouer du piano`, `jouer de la guitare`\n- `faire de` + tevékenység: `faire du vélo`, `faire de la natation`, `faire du sport`\n\nSzeretni valamit csinálni: `aimer` + **főnévi igenév**, pont mint a magyarban: `J\'aime lire.` – Szeretek olvasni. `Nous aimons danser.` – Szeretünk táncolni.\n\nA gyakoriságot jelentő szó (`souvent` – gyakran) általában közvetlenül az ige **után** áll: `Il joue souvent.` – Gyakran játszik.',
      words: [
        ['le foot', 'foci'], ['le tennis', 'tenisz'], ['le basket', 'kosárlabda'], ['la natation', 'úszás'], ['la danse', 'tánc'], ['la musique', 'zene'],
        ['la guitare', 'gitár'], ['le piano', 'zongora'], ['le dessin', 'rajzolás'], ['les jeux vidéo', 'videojátékok'], ['jouer', 'játszani'], ['chanter', 'énekelni'],
        ['nager', 'úszni'], ['lire', 'olvasni'], ['danser', 'táncolni'], ['faire', 'csinálni'], ['le week-end', 'hétvége'], ['souvent', 'gyakran']
      ],
      sentences: [
        ['Je joue au foot le samedi.', 'Szombatonként focizom.', [], ['Szombaton focizom.']],
        ['Tu joues de la guitare?', 'Gitározol?', ['Est-ce que tu joues de la guitare?'], ['Játszol gitáron?']],
        ['Elle fait de la natation.', 'Úszni jár.', [], ['Ő úszni jár.', 'Úszik.']],
        ['J\'aime lire.', 'Szeretek olvasni.'],
        ['Nous aimons danser.', 'Szeretünk táncolni.'],
        ['Il joue souvent aux jeux vidéo.', 'Gyakran videojátékozik.', [], ['Gyakran játszik videojátékokkal.']],
        ['Tu aimes chanter?', 'Szeretsz énekelni?', ['Est-ce que tu aimes chanter?', 'Aimes-tu chanter?']],
        ['Le week-end, je fais du vélo.', 'Hétvégén biciklizem.', ['Je fais du vélo le week-end.'], ['Hétvégente biciklizem.']],
        ['Mon frère joue du piano.', 'A fiútestvérem zongorázik.', [], ['A bátyám zongorázik.', 'Az öcsém zongorázik.']],
        ['Je ne nage pas souvent.', 'Nem úszom gyakran.', [], ['Nem gyakran úszom.']],
        ['Qu\'est-ce que tu fais le week-end?', 'Mit csinálsz hétvégén?', [], ['Mit csinálsz a hétvégén?']]
      ]
    },
    {
      id: 'utazas', title: 'Vásárlás és utazás', icon: '✈️',
      tip: 'Az **aller** (menni) rendhagyó ige:\n\n- `je vais`, `tu vas`, `il / elle va`\n- `nous allons`, `vous allez`, `ils / elles vont`\n\nHa az aller után **főnévi igenév** áll, **közeli jövőt** fejez ki (futur proche) – olyan, mint a magyar „fog”:\n\n- `Je vais acheter un billet.` – Venni fogok egy jegyet.\n- `Nous allons voyager.` – Utazni fogunk.\n\nTagadáskor a ne…pas az aller-t fogja közre: `Je ne vais pas partir.` – Nem fogok elutazni.\n\nAz `on` a beszélt nyelvben nagyon gyakori, sokszor „mi” jelentésben: `On va au marché?` – Megyünk a piacra? Utána az ige egyes szám harmadik személyben áll.',
      words: [
        ['acheter', 'vásárolni'], ['combien', 'mennyi'], ['l\'argent', 'pénz'], ['le marché', 'piac'], ['le billet', 'jegy'], ['la valise', 'bőrönd'],
        ['l\'avion', 'repülőgép'], ['la mer', 'tenger'], ['la plage', 'strand'], ['la montagne', 'hegy'], ['les vacances', 'szünidő'], ['l\'hôtel', 'szálloda'],
        ['la carte', 'térkép'], ['cher', 'drága'], ['voyager', 'utazni'], ['visiter', 'megnézni (látnivalót)'], ['aller', 'menni']
      ],
      sentences: [
        ['Je vais acheter un billet.', 'Venni fogok egy jegyet.', [], ['Jegyet fogok venni.', 'Veszek egy jegyet.']],
        ['Nous allons voyager en avion.', 'Repülővel fogunk utazni.', [], ['Repülővel utazunk.']],
        ['Combien ça coûte?', 'Mennyibe kerül?', ['Ça coûte combien?'], ['Ez mennyibe kerül?']],
        ['C\'est trop cher!', 'Ez túl drága!'],
        ['Tu vas à la plage?', 'Strandra mész?', ['Est-ce que tu vas à la plage?'], ['A strandra mész?']],
        ['Pendant les vacances, je vais visiter Paris.', 'A szünidőben megnézem Párizst.', ['Je vais visiter Paris pendant les vacances.'], ['A szünidőben meg fogom nézni Párizst.', 'A szünidőben meglátogatom Párizst.']],
        ['Ils vont skier à la montagne.', 'Síelni fognak a hegyekben.', [], ['A hegyekben fognak síelni.']],
        ['Ma valise est très grande.', 'A bőröndöm nagyon nagy.'],
        ['Je n\'ai pas d\'argent.', 'Nincs pénzem.'],
        ['On va au marché demain?', 'Holnap megyünk a piacra?', ['Nous allons au marché demain?'], ['Megyünk holnap a piacra?']],
        ['L\'hôtel est près de la mer.', 'A szálloda a tenger közelében van.', [], ['A szálloda közel van a tengerhez.']],
        ['Elle va regarder la carte.', 'Meg fogja nézni a térképet.', [], ['Megnézi a térképet.']]
      ]
    },
    {
      id: 'mult', title: 'Múlt idő és tervek', icon: '⏳',
      tip: 'A beszélt nyelv leggyakoribb múlt ideje a **passé composé** (összetett múlt). Két részből áll: segédige (`avoir` vagy `être`) jelen időben + a főige **múlt idejű melléknévi igeneve** (participe passé):\n\n- -er igék: -er → -é: `manger` → `j\'ai mangé`, `regarder` → `j\'ai regardé`\n- -ir igék: `finir` → `j\'ai fini`\n- rendhagyók: `faire` → `fait`, `voir` → `vu`, `boire` → `bu`\n\nA legtöbb ige az **avoir**-t kapja. Néhány mozgást, változást jelentő ige (`aller`, `arriver`, `partir`) az **être**-t – ilyenkor a participe egyezik az alannyal: `il est allé`, `elle est allée`. Ha lány beszél: `je suis allée` (a kiejtés ugyanaz).\n\nTagadáskor a ne…pas a segédigét fogja közre: `Je n\'ai pas vu le film.`',
      words: [
        ['j\'ai mangé', 'ettem'], ['j\'ai bu', 'ittam'], ['j\'ai joué', 'játszottam'], ['j\'ai regardé', 'néztem'], ['j\'ai fini', 'befejeztem'], ['j\'ai fait', 'csináltam'],
        ['j\'ai vu', 'láttam'], ['j\'ai acheté', 'vettem (vásároltam)'], ['je suis allé', 'elmentem'], ['je suis arrivé', 'megérkeztem'],
        ['hier soir', 'tegnap este'], ['ce matin', 'ma reggel'], ['le week-end dernier', 'múlt hétvégén'], ['l\'été dernier', 'tavaly nyáron'],
        ['déjà', 'már'], ['l\'année prochaine', 'jövőre'], ['plus tard', 'később']
      ],
      sentences: [
        ['Hier, j\'ai joué au foot.', 'Tegnap fociztam.', ['J\'ai joué au foot hier.']],
        ['J\'ai mangé une pizza.', 'Ettem egy pizzát.'],
        ['Tu as fini tes devoirs?', 'Befejezted a házi feladatodat?', ['Est-ce que tu as fini tes devoirs?'], ['Megcsináltad a házi feladatodat?']],
        ['Nous avons regardé un film.', 'Megnéztünk egy filmet.', [], ['Néztünk egy filmet.']],
        ['Elle a acheté une robe rouge.', 'Vett egy piros ruhát.', [], ['Ő vett egy piros ruhát.']],
        ['Je suis allé à Paris l\'été dernier.', 'Tavaly nyáron elmentem Párizsba.', ['L\'été dernier, je suis allé à Paris.', 'Je suis allée à Paris l\'été dernier.'], ['Tavaly nyáron Párizsba mentem.', 'Tavaly nyáron Párizsban voltam.']],
        ['Il est arrivé ce matin.', 'Ma reggel érkezett meg.', [], ['Ma reggel megérkezett.', 'Ő ma reggel érkezett.']],
        ['Qu\'est-ce que tu as fait le week-end dernier?', 'Mit csináltál múlt hétvégén?', [], ['Mit csináltál a múlt hétvégén?']],
        ['Je n\'ai pas vu le film.', 'Nem láttam a filmet.'],
        ['Demain, je vais nager.', 'Holnap úszni fogok.', ['Je vais nager demain.'], ['Holnap úszni megyek.', 'Holnap úszom.']],
        ['L\'année prochaine, nous allons voyager.', 'Jövőre utazni fogunk.', ['Nous allons voyager l\'année prochaine.'], ['Jövőre utazunk.']],
        ['Tu as déjà mangé?', 'Ettél már?', ['Est-ce que tu as déjà mangé?', 'As-tu déjà mangé?'], ['Már ettél?']]
      ]
    }
  ]
});
