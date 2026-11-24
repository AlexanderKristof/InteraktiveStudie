/* Angol nyelv (alapok) – extra gyakorlókérdések a Tesztközponthoz
 * Formátum: lásd js/teszt.js. A leckék azonosítói megegyeznek a data/tantargyak/angol.js leckéivel. */
STUDIE.addQuestions('angol', {
  koszones: [
    { q: 'Mit mondasz lefekvés előtt a családodnak?', options: ['Good evening!', 'Good morning!', 'Good night!', 'Good afternoon!'], answer: 2, explain: 'A Good night! elköszönés este, lefekvés előtt. A Good evening! érkezéskor használatos.' },
    { q: 'Mit válaszolsz arra, hogy „Thank you!”?', options: ['Sorry.', 'You’re welcome.', 'Excuse me.', 'Please.'], answer: 1, explain: 'A You’re welcome. jelentése: szívesen. A sorry bocsánatkérés, az excuse me megszólítás.' },
    { q: 'Hogyan írjuk helyesen a 40-et?', options: ['fourty', 'forty', 'fourteen', 'fortty'], answer: 1, explain: 'A 40 helyesen forty, u nélkül – pedig a four (4) szóban van u. A fourteen 14.' },
    { q: 'Melyik szám a „seventy-two”?', options: ['72', '17', '27', '702'], answer: 0, explain: 'Seventy = 70, two = 2, tehát 72.' },
    { q: 'Hány óra van, ha „It’s quarter to ten”?', options: ['10:15', '9:15', '10:45', '9:45'], answer: 3, explain: 'Quarter to ten = negyed óra múlva tíz, vagyis 9:45 (magyarul háromnegyed tíz).' },
    { q: 'Egészítsd ki: „My birthday is ___ March.”', options: ['on', 'at', 'in', 'to'], answer: 2, explain: 'Hónap előtt in kell: in March. Konkrét dátum előtt on lenne: on 3rd March.' },
    { q: 'Hogyan fordítod: „Honnan származol?”', options: ['Where are you from?', 'Where do you go?', 'Where are you?', 'How are you from?'], answer: 0, explain: 'A származásra a Where are you from? kérdéssel kérdezünk. Válasz: I’m from Hungary.' },
    { q: 'Melyik mondat helyes?', options: ['I have twelve years.', 'I am twelve years.', 'I’m twelve years old.', 'I have twelve years old.'], answer: 2, explain: 'Az életkort a be igével mondjuk: I’m twelve vagy I’m twelve years old. A „have” itt tükörfordítás.' },
    { q: 'Melyik a „harmadik” angolul?', options: ['threeth', 'third', 'thirdth', 'three'], answer: 1, explain: 'A first, second, third rendhagyó sorszámnevek. A többi általában -th végű: fourth, fifth.' },
    { q: 'Melyik napot írtuk helyesen?', options: ['wednesday', 'Wensday', 'Wednesday', 'Wednsday'], answer: 2, explain: 'A napok nevét nagybetűvel írjuk, és a Wednesday-ben benne van egy néma d is.' }
  ],
  'to-be': [
    { q: 'Egészítsd ki: „We ___ in the same class.”', options: ['is', 'am', 'be', 'are'], answer: 3, explain: 'A we mellé a be jelen idejű alakja are: we are (we’re).' },
    { q: 'Egészítsd ki: „I ___ not hungry.”', options: ['am', 'is', 'are', 'do'], answer: 0, explain: 'Az I mellé mindig am jár: I am not (I’m not) hungry.' },
    { q: 'Melyik névmás illik ide? „This is my sister. ___ is eleven.”', options: ['He', 'She', 'It', 'Her'], answer: 1, explain: 'A sister (lánytestvér) helyett she áll alanyként. A her birtokos vagy tárgyi alak, alanyként nem jó.' },
    { q: 'Hogyan fordítod: „A tanár kedves.”?', options: ['The teacher nice.', 'The teacher is nice.', 'The teacher are nice.', 'Is the teacher nice.'], answer: 1, explain: 'Az angolban a be ige nem maradhat el: The teacher is nice.' },
    { q: 'Melyik a helyes rövid válasz? „Are you Hungarian?” – „Yes, …”', options: ['I’m.', 'I are.', 'I am.', 'you are.'], answer: 2, explain: 'Rövid igenlő válaszban nem vonjuk össze: Yes, I am.' },
    { q: 'Egészítsd ki: „This is Tom and that is ___ dog.”', options: ['he', 'his', 'him', 'he’s'], answer: 1, explain: 'A birtokos névmás fiúra: his (az ő …-ja). A he alany, a him tárgy.' },
    { q: 'Melyik mondat helyes?', options: ['There is two books on the desk.', 'There are two books on the desk.', 'It are two books on the desk.', 'There be two books on the desk.'], answer: 1, explain: 'Többes számú főnévvel there are kell: There are two books.' },
    { q: 'Mi a tagadása? „They are at school.”', options: ['They aren’t at school.', 'They don’t at school.', 'They isn’t at school.', 'They not are at school.'], answer: 0, explain: 'A be igét a not-tal tagadjuk: they are not = they aren’t.' },
    { q: 'Melyik a helyes? „___ raining today.”', options: ['Its', 'It’s', 'Is', 'It'], answer: 1, explain: 'Az It’s = It is. Az its birtokos névmás (annak a …-ja), itt nem jó.' },
    { q: 'Hogyan fordítod: „Ők a barátaim.”?', options: ['Their are my friends.', 'There are my friends.', 'They’re my friends.', 'They my friends.'], answer: 2, explain: 'They’re = they are (ők …). A their birtokos névmás, a there pedig „ott”, illetve a there is/are szerkezet része.' }
  ],
  'jelen-ido': [
    { q: 'Egészítsd ki: „My dad ___ TV every evening.”', options: ['watch', 'watchs', 'watches', 'is watching'], answer: 2, explain: 'Every evening = szokás, Present Simple. A -ch végű igék harmadik személyben -es-t kapnak: watches.' },
    { q: 'Egészítsd ki: „Listen! Someone ___ at the door.”', options: ['knocks', 'is knocking', 'knock', 'knocking'], answer: 1, explain: 'A Listen! jelzi, hogy most történik: Present Continuous (is knocking).' },
    { q: 'Mi a „study” harmadik személyű alakja?', options: ['studys', 'studyes', 'studies', 'studis'], answer: 2, explain: 'Mássalhangzó + y végű ige: az y-ból ie lesz: studies.' },
    { q: 'Melyik kérdés helyes?', options: ['Does she plays tennis?', 'Do she play tennis?', 'Does she play tennis?', 'She does play tennis?'], answer: 2, explain: 'She után does, és utána a főige alapalakban: Does she play…?' },
    { q: 'Egészítsd ki: „I ___ understand this word.”', options: ['am not', 'doesn’t', 'not', 'don’t'], answer: 3, explain: 'Az understand állapotige, Present Simple-ben áll, tagadása I don’t understand.' },
    { q: 'Hol a helye az „always” szónak?', options: ['She always is late.', 'She is always late.', 'Always she is late.', 'She is late always.'], answer: 1, explain: 'A gyakoriságot kifejező szó a be ige után áll: She is always late. Más igénél az ige elé: She always walks.' },
    { q: 'Hogyan fordítod: „Most éppen leckét írok.”?', options: ['I do my homework now.', 'I’m doing my homework now.', 'I doing my homework now.', 'I am do my homework now.'], answer: 1, explain: 'Most zajló cselekvés: am + -ing: I’m doing my homework now.' },
    { q: 'Melyik mondat HIBÁS?', options: ['I’m wanting a new bike.', 'I want a new bike.', 'She likes chocolate.', 'We know the answer.'], answer: 0, explain: 'A want állapotige, nem szoktuk continuous alakban használni. Helyesen: I want a new bike.' },
    { q: 'Mi a „make” -ing alakja?', options: ['makeing', 'makking', 'making', 'maken'], answer: 2, explain: 'A néma e-re végződő igéknél az e elmarad: make – making.' },
    { q: 'Egészítsd ki: „Water ___ at 0 degrees.”', options: ['is freezing', 'freeze', 'freezing', 'freezes'], answer: 3, explain: 'Általános igazság (természeti törvény): Present Simple, harmadik személy: freezes.' }
  ],
  'mult-ido': [
    { q: 'Mi a „go” múlt ideje?', options: ['goed', 'went', 'gone', 'wented'], answer: 1, explain: 'A go rendhagyó ige: go – went. A gone a harmadik alak (befejezett melléknévi igenév).' },
    { q: 'Egészítsd ki: „She ___ a letter to her friend yesterday.”', options: ['writed', 'writes', 'wrote', 'write'], answer: 2, explain: 'Yesterday = múlt. A write rendhagyó: write – wrote.' },
    { q: 'Mi a „stop” múlt ideje?', options: ['stoped', 'stopped', 'stopt', 'stopeed'], answer: 1, explain: 'Rövid magánhangzó + mássalhangzó: a mássalhangzót megduplázzuk: stopped.' },
    { q: 'Egészítsd ki: „I ___ at home last night.”', options: ['were', 'was', 'am', 'did'], answer: 1, explain: 'Az I mellé a be múlt ideje was.' },
    { q: 'Melyik a helyes tagadás?', options: ['We didn’t saw the match.', 'We don’t saw the match.', 'We didn’t see the match.', 'We not saw the match.'], answer: 2, explain: 'Tagadásban didn’t + alapalak: didn’t see.' },
    { q: 'Melyik kérdés helyes?', options: ['What did you eat for lunch?', 'What did you ate for lunch?', 'What you ate for lunch?', 'What do you ate for lunch?'], answer: 0, explain: 'Kérdőszó + did + alany + alapalak: What did you eat…?' },
    { q: 'Hogyan fordítod: „Tavaly nyáron Görögországban voltunk.”?', options: ['We are in Greece last summer.', 'We was in Greece last summer.', 'We did be in Greece last summer.', 'We were in Greece last summer.'], answer: 3, explain: 'A we mellé were kell. A be igénél nem használunk did-et.' },
    { q: 'Melyik ige rendhagyó?', options: ['play', 'watch', 'bring', 'open'], answer: 2, explain: 'A bring rendhagyó: bring – brought. A többi szabályos (-ed).' },
    { q: 'Mi a „think” múlt ideje?', options: ['thinked', 'thank', 'taught', 'thought'], answer: 3, explain: 'Think – thought. A taught a teach (tanít) múlt ideje.' },
    { q: 'Egészítsd ki: „Did you ___ the new film?”', options: ['seen', 'saw', 'see', 'seeing'], answer: 2, explain: 'A did után a főige alapalakban áll: Did you see…?' }
  ],
  nevelok: [
    { q: 'Melyik névelő kell? „I waited for ___ hour.”', options: ['a', 'an', 'the', '(nem kell)'], answer: 1, explain: 'Az hour szóban a h néma, magánhangzóval ejtjük, ezért an hour.' },
    { q: 'Melyik névelő kell? „She goes to ___ university in Szeged.”', options: ['an', 'the', 'a', '(nem kell)'], answer: 2, explain: 'A university kiejtése [ju…], mássalhangzó-hanggal kezdődik, ezért a university. A kiejtés dönt, nem a betű.' },
    { q: 'Melyik mondat helyes?', options: ['I love the chocolate.', 'I love chocolate.', 'I love a chocolate.', 'I love an chocolate.'], answer: 1, explain: 'Általános értelemben (a csokit általában) nem teszünk névelőt: I love chocolate.' },
    { q: 'Mi a „knife” többes száma?', options: ['knifes', 'knives', 'knifs', 'knivs'], answer: 1, explain: 'Az -f/-fe végű szavak többes száma gyakran -ves: knife – knives.' },
    { q: 'Mi a „tooth” többes száma?', options: ['tooths', 'teeths', 'toothes', 'teeth'], answer: 3, explain: 'Rendhagyó többes szám: tooth – teeth (mint foot – feet).' },
    { q: 'Egészítsd ki: „There aren’t ___ eggs in the fridge.”', options: ['some', 'any', 'much', 'a'], answer: 1, explain: 'Tagadó mondatban any kell: There aren’t any eggs.' },
    { q: 'Egészítsd ki: „How ___ brothers and sisters have you got?”', options: ['many', 'much', 'any', 'lot'], answer: 0, explain: 'A brothers megszámlálható többes szám, ezért How many.' },
    { q: 'Melyik mondat helyes?', options: ['Can you give me an advice?', 'Can you give me some advices?', 'Can you give me some advice?', 'Can you give me many advice?'], answer: 2, explain: 'Az advice megszámlálhatatlan: nincs többes száma, nem áll előtte a/an. Helyesen: some advice vagy a piece of advice.' },
    { q: 'Hogyan fordítod: „Három gyerekük van.”?', options: ['They have three child.', 'They have three childs.', 'They have three children.', 'They have three childrens.'], answer: 2, explain: 'Számnév után többes szám kell, a child többes száma rendhagyó: children.' },
    { q: 'Egészítsd ki: „Would you like ___ tea?”', options: ['any', 'many', 'a', 'some'], answer: 3, explain: 'Kínálásnál, udvarias kérdésben some kell, és a tea itt megszámlálhatatlan.' }
  ],
  kerdesek: [
    { q: 'Melyik kérdés helyes?', options: ['What time the film starts?', 'What time does the film start?', 'What time does the film starts?', 'What time do the film start?'], answer: 1, explain: 'A film = it, ezért does kell, utána a főige alapalakban: does the film start.' },
    { q: 'Melyik kérdőszó illik ide? „___ are you crying? – Because I’m sad.”', options: ['Why', 'Where', 'When', 'Who'], answer: 0, explain: 'A because (mert) válasz miértre felel: Why are you crying?' },
    { q: 'Melyik kérdőszó illik ide? „___ do you go swimming? – Twice a week.”', options: ['How long', 'How often', 'How much', 'How far'], answer: 1, explain: 'A twice a week (hetente kétszer) gyakoriság, ezért How often.' },
    { q: 'Hogyan fordítod: „Ki lakik ebben a házban?”', options: ['Who does live in this house?', 'Who lives in this house?', 'Who live in this house?', 'Who do live in this house?'], answer: 1, explain: 'A who itt az alany, ezért nem kell does, és az ige -s-t kap: Who lives…?' },
    { q: 'Melyik a helyes rövid válasz? „Can you swim?” – „No, …”', options: ['I don’t.', 'I can’t.', 'I’m not.', 'I didn’t.'], answer: 1, explain: 'A rövid válaszban a kérdés segédigéjét ismételjük: can – No, I can’t.' },
    { q: 'Melyik mondat helyes?', options: ['I didn’t see nobody.', 'I didn’t see anybody.', 'I not saw anybody.', 'I don’t saw nobody.'], answer: 1, explain: 'Az angolban nincs kettős tagadás: didn’t + anybody (vagy I saw nobody).' },
    { q: 'Egészítsd ki: „___ bag is this? – It’s Kate’s.”', options: ['Who', 'Who’s', 'Whose', 'Which'], answer: 2, explain: 'A whose = kié. A who’s = who is (ki az), kiejtésre ugyanaz, de jelentésre más.' },
    { q: 'Mi a tagadása? „He can drive.”', options: ['He doesn’t can drive.', 'He can’t drive.', 'He can drive not.', 'He don’t can drive.'], answer: 1, explain: 'A can után közvetlenül jön a not: cannot = can’t. Do/does nem kell mellé.' },
    { q: 'Melyik kérdés kérdez a TÁRGYRA (kit?)?', options: ['Who called Anna?', 'Who did Anna call?', 'Who calls Anna?', 'Who is calling Anna?'], answer: 1, explain: 'A Who did Anna call? = Kit hívott Anna? Itt Anna az alany. A többinél a who az alany (ki hívta Annát?).' },
    { q: 'Hogyan kérdezed meg: „Hol voltál tegnap?”', options: ['Where did you be yesterday?', 'Where were you yesterday?', 'Where you were yesterday?', 'Where was you yesterday?'], answer: 1, explain: 'A be ige múlt ideje you mellett were, és kérdésben az alany elé kerül. Did nem kell.' }
  ],
  szokincs: [
    { q: 'Mit jelent: „cousin”?', options: ['unoka', 'unokatestvér', 'nagynéni', 'sógor'], answer: 1, explain: 'A cousin unokatestvér. Az unoka grandchild (grandson, granddaughter).' },
    { q: 'Hogyan mondod angolul: „nagybácsi”?', options: ['aunt', 'grandfather', 'uncle', 'nephew'], answer: 2, explain: 'Uncle = nagybácsi, aunt = nagynéni, grandfather = nagypapa.' },
    { q: 'Mit jelent az iskolában a „mark”?', options: ['márka', 'jegy, osztályzat', 'jel a füzetben', 'szünet'], answer: 1, explain: 'A mark iskolai jegyet jelent. A márka angolul brand – hamis barát!' },
    { q: 'Mi a „radír” brit angolul?', options: ['ruler', 'rubber', 'rubbish', 'pencil case'], answer: 1, explain: 'Rubber = radír (amerikaiul eraser). A ruler vonalzó, a rubbish szemét.' },
    { q: 'Mit jelent: „pear”?', options: ['barack', 'körte', 'borsó', 'szilva'], answer: 1, explain: 'A pear körte. A szilva plum, a barack peach, a borsó peas.' },
    { q: 'Hogyan kérsz udvariasan egy szendvicset?', options: ['Give me a sandwich.', 'I want sandwich.', 'Can I have a sandwich, please?', 'Sandwich, now.'], answer: 2, explain: 'Udvarias kérés: Can I have…, please? vagy I’d like…' },
    { q: 'Mit jelent: „return ticket”?', options: ['retúrjegy', 'visszaküldött jegy', 'egy útra szóló jegy', 'havi bérlet'], answer: 0, explain: 'A return ticket oda-vissza szóló jegy. Az egy útra szóló jegy single ticket.' },
    { q: 'Melyik a helyes? „I usually go to school ___.”', options: ['by foot', 'on foot', 'with foot', 'in foot'], answer: 1, explain: 'Gyalog: on foot. Járművel viszont by: by bus, by bike.' },
    { q: 'Mit jelent: „charger”?', options: ['töltő', 'kábel', 'akkumulátor', 'billentyűzet'], answer: 0, explain: 'A charger töltő. Az akkumulátor battery, a billentyűzet keyboard.' },
    { q: 'Hogyan fordítod: „Az apukám villanyszerelő.”?', options: ['My dad is electrician.', 'My dad is an electrician.', 'My dad is a electrician.', 'My dad electrician.'], answer: 1, explain: 'Foglalkozás előtt kell határozatlan névelő, és mivel az electrician magánhangzóval kezdődik: an.' }
  ]
});
