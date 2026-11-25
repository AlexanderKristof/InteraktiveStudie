/* Portugál nyelvtanfolyam (A1–A2, európai/portugáliai portugál; a brazil eltéréseket egy tipp mutatja be) */
STUDIE.addLangCourse({
  id: 'portugal', title: 'Portugál', flag: '🇵🇹', tts: 'pt-PT', badge: 'A1–A2',
  noSpaces: false, script: false,
  intro: 'A portugált kb. 260 millió ember beszéli négy kontinensen – Portugáliától Brazílián át Angoláig és Mozambikig –, és ebből a nyelvből való a híres, szinte lefordíthatatlan „saudade” szó is: édes-bús vágyakozás valami vagy valaki után.',
  units: [
    {
      id: 'koszones', title: 'Köszönés és bemutatkozás', icon: '👋',
      tip: 'A portugál írás ismerősnek tűnik, de a kiejtés (főleg Portugáliában) tartogat meglepetéseket:\n\n' +
        '- **ão, õe, ã** = orrhangok, mintha az „au”, „oj”, „a” hangot az orrodon át mondanád: `não` (nem), `limões` (citromok), `amanhã` (holnap)\n' +
        '- **ç** = **sz**: `açúcar` (cukor), `maçã` (alma); a **c** e és i előtt szintén sz: `cinco`\n' +
        '- **lh** = kb. **lj**: `filho`, `olhar`; **nh** = **ny**: `vinho`, `senhora`\n' +
        '- **x** többnyire **s**: `peixe` (pejs), `xadrez` (sakk); néha **ksz** vagy **z**: `táxi`, `exame`\n' +
        '- **s** a szó végén és mássalhangzó előtt = **s**: `dois` (dojs), `escola` (iskóla)\n' +
        '- **Elnyelt magánhangzók:** Portugáliában a hangsúlytalan **e** szinte eltűnik, a hangsúlytalan **o** pedig **u**-nak hangzik: `obrigado` ≈ obrigádu, `telefone` ≈ tlfón\n\n' +
        'A magyarral ellentétben a hangsúly nem az első szótagon van, hanem általában az utolsó előttin; az ékezet (`á, é, ô`) jelzi, ha máshol. A szó eleji **r** és az **rr** erős, torokban képzett hang.',
      words: [
        ['olá', 'szia'], ['bom dia', 'jó reggelt'], ['boa tarde', 'jó napot (délután)'], ['boa noite', 'jó estét'],
        ['adeus', 'viszontlátásra'], ['até logo', 'majd találkozunk'], ['até amanhã', 'holnap találkozunk'],
        ['obrigado', 'köszönöm (férfi mondja)'], ['obrigada', 'köszönöm (nő mondja)'], ['por favor', 'kérem'],
        ['de nada', 'szívesen'], ['sim', 'igen'], ['não', 'nem'], ['desculpe', 'bocsánat'],
        ['chamo-me', 'a nevem'], ['o senhor', 'az úr'], ['a senhora', 'a hölgy'], ['muito prazer', 'örvendek'], ['bem', 'jól']
      ],
      sentences: [
        ['Olá, chamo-me Ana.', 'Szia, Anának hívnak.', ['Olá, eu chamo-me Ana.', 'Olá, sou a Ana.'], ['Szia, a nevem Ana.', 'Szia, Ana vagyok.']],
        ['Como te chamas?', 'Hogy hívnak?', [], ['Mi a neved?']],
        ['Bom dia, como está?', 'Jó reggelt, hogy van?', [], ['Jó napot, hogy van?']],
        ['Estou bem, obrigado.', 'Jól vagyok, köszönöm.', ['Estou bem, obrigada.', 'Bem, obrigado.', 'Bem, obrigada.'], ['Köszönöm, jól vagyok.']],
        ['Muito prazer, chamo-me Pedro.', 'Örvendek, Pedrónak hívnak.', ['Muito prazer, sou o Pedro.'], ['Örvendek, a nevem Pedro.', 'Örvendek, Pedro vagyok.']],
        ['E tu, como estás?', 'És te hogy vagy?', [], ['És te, hogy vagy?']],
        ['Adeus, até amanhã.', 'Viszontlátásra, holnap találkozunk.', [], ['Viszlát, holnap találkozunk.']],
        ['Boa noite, senhora Silva.', 'Jó estét, Silva asszony.', [], ['Jó éjszakát, Silva asszony.']],
        ['Muito obrigada, senhor.', 'Nagyon köszönöm, uram.', ['Muito obrigado, senhor.'], []],
        ['Desculpe, não sou a Ana.', 'Bocsánat, nem Ana vagyok.', [], ['Elnézést, nem Ana vagyok.', 'Bocsánat, én nem Ana vagyok.']],
        ['Obrigado! De nada.', 'Köszönöm! Szívesen.', ['Obrigada! De nada.'], []],
        ['Sim, sou o Pedro.', 'Igen, Pedro vagyok.', ['Sim, eu sou o Pedro.'], ['Igen, én Pedro vagyok.']]
      ]
    },
    {
      id: 'szamok', title: 'Számok és életkor', icon: '🔢',
      tip: 'A számok:\n\n' +
        '- 1–10: `um, dois, três, quatro, cinco, seis, sete, oito, nove, dez`\n' +
        '- 11–19: `onze, doze, treze, catorze, quinze, dezasseis, dezassete, dezoito, dezanove`\n' +
        '- tízesek: `vinte, trinta, quarenta, cinquenta, sessenta, setenta, oitenta, noventa, cem`\n\n' +
        'Az 1-nek és a 2-nek **nőnemű alakja** is van: `um livro` (egy könyv), de `uma caneta` (egy toll); `dois irmãos`, de `duas irmãs`.\n\n' +
        'A tízesek és az egyesek közé **e** (és) kerül: `vinte e um` (21), `trinta e cinco` (35). A 100 önmagában `cem`, de összetételben `cento`: `cento e dois` (102).\n\n' +
        'Az életkort a **ter** (birtokolni) igével mondjuk, szó szerint „12 évem van”: `Tenho doze anos.` Kérdés: `Quantos anos tens?` (Hány éves vagy?)\n\n' +
        'Brazíliában a 16, 17, 19 írása kicsit más: `dezesseis, dezessete, dezenove`.',
      words: [
        ['um', 'egy'], ['dois', 'kettő'], ['três', 'három'], ['quatro', 'négy'], ['cinco', 'öt'], ['seis', 'hat'],
        ['sete', 'hét (szám)'], ['oito', 'nyolc'], ['nove', 'kilenc'], ['dez', 'tíz'], ['onze', 'tizenegy'], ['doze', 'tizenkettő'],
        ['quinze', 'tizenöt'], ['vinte', 'húsz'], ['cem', 'száz'], ['o ano', 'az év'], ['o número', 'a szám'], ['quantos?', 'hány?']
      ],
      sentences: [
        ['Tenho doze anos.', 'Tizenkét éves vagyok.', ['Eu tenho doze anos.'], ['Tizenkétéves vagyok.', 'Én tizenkét éves vagyok.']],
        ['Quantos anos tens?', 'Hány éves vagy?', ['Tens quantos anos?'], ['Te hány éves vagy?']],
        ['A Ana tem quinze anos.', 'Ana tizenöt éves.', [], ['Ana tizenötéves.']],
        ['O Pedro tem vinte anos.', 'Pedro húszéves.', [], ['Pedro húsz éves.']],
        ['Dois e três são cinco.', 'Kettő meg három az öt.', ['Dois mais três são cinco.'], ['Kettő meg három öt.', 'Kettő és három az öt.', 'Kettő plusz három az öt.']],
        ['Quatro mais quatro são oito.', 'Négy meg négy az nyolc.', ['Quatro e quatro são oito.'], ['Négy plusz négy az nyolc.', 'Négy meg négy nyolc.']],
        ['Dez menos um são nove.', 'Tíz mínusz egy az kilenc.', [], ['Tíz mínusz egy kilenc.', 'Tízből egy az kilenc.']],
        ['Um ano tem doze meses.', 'Egy évben tizenkét hónap van.', [], ['Egy év tizenkét hónapból áll.']],
        ['Tens onze anos?', 'Tizenegy éves vagy?', ['Tu tens onze anos?'], ['Tizenegyéves vagy?']],
        ['Não, tenho dez anos.', 'Nem, tíz éves vagyok.', ['Não, eu tenho dez anos.'], ['Nem, tízéves vagyok.']],
        ['Cinco mais cinco são dez.', 'Öt meg öt az tíz.', ['Cinco e cinco são dez.'], ['Öt plusz öt az tíz.', 'Öt meg öt tíz.']]
      ]
    },
    {
      id: 'csalad', title: 'Család', icon: '👨‍👩‍👧',
      tip: 'A magyarban nincs nyelvtani nem, a portugálban viszont minden főnév **hímnemű** vagy **nőnemű**, és ehhez igazodik a névelő:\n\n' +
        '- hímnem: `o` (a, az), `um` (egy), többes szám `os`: `o pai`, `os pais`\n' +
        '- nőnem: `a`, `uma`, többes szám `as`: `a mãe`, `as mães`\n\n' +
        'Ökölszabály: az **-o** végű szavak többnyire hímneműek (`o livro`), az **-a** végűek nőneműek (`a casa`), a **-ção** végűek is nőneműek (`a estação`). De vannak kivételek: `o dia` (a nap), `o mapa` (a térkép), `a mão` (a kéz) – ezért mindig a névelővel együtt tanuld a szavakat!\n\n' +
        'Családtagoknál a nem gyakran csak a végződésben látszik: `o irmão` / `a irmã` (fiú- / lánytestvér), `o avô` / `a avó` (nagyapa / nagymama – figyelj az ékezetre!).\n\n' +
        'Portugáliában a birtokos névmás elé **névelő** is kell: `o meu pai` (az apám), `a minha mãe` (az anyám), `os meus avós` (a nagyszüleim).',
      words: [
        ['o pai', 'az apa'], ['a mãe', 'az anya'], ['os pais', 'a szülők'], ['o irmão', 'a fiútestvér'], ['a irmã', 'a lánytestvér'],
        ['o filho', 'a fiúgyermek'], ['a filha', 'a lánygyermek'], ['o avô', 'a nagyapa'], ['a avó', 'a nagymama'],
        ['o tio', 'a nagybácsi'], ['a tia', 'a nagynéni'], ['o primo', 'az unokatestvér (fiú)'], ['a prima', 'az unokatestvér (lány)'],
        ['o marido', 'a férj'], ['a mulher', 'a feleség'], ['o bebé', 'a kisbaba'], ['a família', 'a család'], ['o cão', 'a kutya'], ['o gato', 'a macska']
      ],
      sentences: [
        ['Esta é a minha mãe.', 'Ő az anyukám.', [], ['Ez az anyukám.', 'Ő az anyám.', 'Ez az anyám.']],
        ['O meu pai chama-se Paulo.', 'Az apámat Paulónak hívják.', ['O meu pai é o Paulo.'], ['Apámat Paulónak hívják.', 'Az apám neve Paulo.', 'Apukámat Paulónak hívják.']],
        ['Tenho um irmão e uma irmã.', 'Van egy fiútestvérem és egy lánytestvérem.', ['Eu tenho um irmão e uma irmã.'], ['Van egy fiú- és egy lánytestvérem.']],
        ['A minha avó tem setenta anos.', 'A nagymamám hetvenéves.', [], ['A nagymamám hetven éves.', 'Nagymamám hetvenéves.']],
        ['Os meus pais são simpáticos.', 'A szüleim kedvesek.', [], ['Szüleim kedvesek.']],
        ['Tens irmãos?', 'Vannak testvéreid?', ['Tu tens irmãos?'], ['Van testvéred?']],
        ['Não, sou filho único.', 'Nem, egyke vagyok.', ['Não, sou filha única.'], ['Nem, egyedüli gyerek vagyok.']],
        ['O meu tio tem um cão.', 'A nagybácsimnak van egy kutyája.', [], ['Nagybácsimnak van egy kutyája.']],
        ['A minha prima tem dois gatos.', 'Az unokatestvéremnek két macskája van.', [], ['Unokatestvéremnek két macskája van.', 'Az unokatestvéremnek van két macskája.']],
        ['A minha família é grande.', 'A családom nagy.', [], ['Nagy a családom.']],
        ['O bebé chama-se Tiago.', 'A kisbabát Tiagónak hívják.', [], ['A kisbaba neve Tiago.', 'A baba neve Tiago.']],
        ['Este é o meu irmão.', 'Ő a fiútestvérem.', [], ['Ez a fiútestvérem.', 'Ő a bátyám.', 'Ő az öcsém.', 'Ez a bátyám.', 'Ez az öcsém.']]
      ]
    },
    {
      id: 'iskola', title: 'Iskola és tárgyak', icon: '🎒',
      tip: '**Hogyan szólítsunk meg valakit? tu, você, o senhor**\n\n' +
        '- `tu` = **te**: barátoknak, családtagoknak, gyerekeknek, osztálytársaknak. Az ige 2. személyű: `Tu tens uma caneta?` (Van tollad?)\n' +
        '- `o senhor` / `a senhora` = **Ön** (szó szerint „az úr / a hölgy”): tanárnak, idegen felnőttnek. Az ige **3. személyű**, pont mint a magyar „Ön”-nél: `O senhor tem um lápis?` (Önnek van ceruzája?)\n' +
        '- `você` Portugáliában kényes szó: kissé távolságtartó, szemtől szembe akár udvariatlannak is hathat. Ezért inkább elhagyják, és csak az igét mondják: `Tem um lápis?` (Van ceruzája?)\n\n' +
        'Többes számban mindenkinek `vocês` (ti / Önök), szintén 3. személyű igével: `Vocês têm livros?`\n\n' +
        'A tanárt egyszerűen így szólítják: `professor` / `professora` (tanár úr / tanárnő). Brazíliában más a helyzet: ott a `você` a hétköznapi, baráti „te” – erről a közlekedéses egységben olvashatsz.',
      words: [
        ['a escola', 'az iskola'], ['a sala de aula', 'az osztályterem'], ['o professor', 'a tanár'], ['a professora', 'a tanárnő'],
        ['o aluno', 'a diák (fiú)'], ['a aluna', 'a diáklány'], ['o colega', 'az osztálytárs'], ['a aula', 'a tanóra'],
        ['o livro', 'a könyv'], ['o caderno', 'a füzet'], ['a caneta', 'a toll'], ['o lápis', 'a ceruza'], ['a borracha', 'a radír'],
        ['a mochila', 'az iskolatáska'], ['a mesa', 'az asztal'], ['a cadeira', 'a szék'], ['o quadro', 'a tábla'], ['o computador', 'a számítógép']
      ],
      sentences: [
        ['Tenho um livro e um caderno.', 'Van egy könyvem és egy füzetem.', ['Eu tenho um livro e um caderno.'], []],
        ['A professora é simpática.', 'A tanárnő kedves.', [], []],
        ['Onde está a minha caneta?', 'Hol van a tollam?', [], []],
        ['A mochila está na cadeira.', 'Az iskolatáska a széken van.', [], ['A táska a széken van.', 'A széken van az iskolatáska.']],
        ['O senhor é o professor?', 'Ön a tanár?', [], ['Ön a tanár úr?', 'Maga a tanár?']],
        ['Tens uma borracha?', 'Van radírod?', ['Tu tens uma borracha?'], ['Van egy radírod?']],
        ['A senhora tem um lápis?', 'Önnek van ceruzája?', [], ['Van Önnek ceruzája?', 'Van ceruzája?']],
        ['A escola é muito grande.', 'Az iskola nagyon nagy.', [], ['Nagyon nagy az iskola.']],
        ['O computador está na mesa.', 'A számítógép az asztalon van.', [], ['Az asztalon van a számítógép.']],
        ['A aula começa às oito.', 'Az óra nyolckor kezdődik.', [], ['A tanóra nyolckor kezdődik.']],
        ['O Rui é o meu colega.', 'Rui az osztálytársam.', [], []],
        ['Os alunos estão na sala de aula.', 'A diákok az osztályteremben vannak.', [], ['A diákok a teremben vannak.']]
      ]
    },
    {
      id: 'etel', title: 'Étel és ital', icon: '🍞',
      tip: '**gostar de = szeretni valamit**\n\n' +
        'A magyarban azt mondjuk: „szeretem a kenyeret”. A portugálban a `gostar` ige után **mindig** `de` elöljárószó áll: `Gosto de pão.` (Szeretem a kenyeret.)\n\n' +
        'Ha a főnév előtt névelő van, a `de` összeolvad vele: `de + o = do`, `de + a = da`: `Gosto do Porto.` (Szeretem Portót.), `Gosto da praia.` (Szeretem a tengerpartot.)\n\n' +
        'Ige is állhat utána: `Gosto de nadar.` (Szeretek úszni.)\n\n' +
        'A ragozás (szabályos -ar ige):\n\n' +
        '- `eu gosto` (szeretem), `tu gostas`, `ele / ela gosta`\n' +
        '- `nós gostamos`, `eles / elas gostam`\n\n' +
        'Tagadás: a `não` az ige elé kerül: `Não gosto de leite.` Ha udvariasan kérsz valamit, mondd így: `Queria um café, por favor.` (Egy kávét kérnék.) Portugáliában a presszókávé neve `uma bica` (Lisszabonban) vagy `um cimbalino` (Portóban).',
      words: [
        ['o pão', 'a kenyér'], ['a água', 'a víz'], ['o leite', 'a tej'], ['o café', 'a kávé'], ['o chá', 'a tea'],
        ['o sumo', 'a gyümölcslé'], ['a fruta', 'a gyümölcs'], ['a maçã', 'az alma'], ['a laranja', 'a narancs'],
        ['o queijo', 'a sajt'], ['o peixe', 'a hal'], ['a carne', 'a hús'], ['o arroz', 'a rizs'], ['a sopa', 'a leves'],
        ['o bolo', 'a torta'], ['a batata', 'a krumpli'], ['o pequeno-almoço', 'a reggeli'], ['o almoço', 'az ebéd'], ['o jantar', 'a vacsora']
      ],
      sentences: [
        ['Eu gosto de pão.', 'Szeretem a kenyeret.', ['Gosto de pão.'], ['Én szeretem a kenyeret.']],
        ['Gostas de peixe?', 'Szereted a halat?', ['Tu gostas de peixe?'], ['Te szereted a halat?']],
        ['Não gosto de leite.', 'Nem szeretem a tejet.', ['Eu não gosto de leite.'], ['Én nem szeretem a tejet.']],
        ['Eu bebo água.', 'Vizet iszom.', ['Bebo água.'], ['Én vizet iszom.', 'Iszom vizet.']],
        ['Ela gosta muito de bolo.', 'Ő nagyon szereti a tortát.', [], ['Nagyon szereti a tortát.']],
        ['Um café, por favor.', 'Egy kávét kérek.', ['Uma bica, por favor.'], ['Egy kávét, kérem.', 'Egy kávét kérnék.']],
        ['Comemos arroz com peixe.', 'Rizst eszünk hallal.', ['Nós comemos arroz com peixe.'], ['Mi rizst eszünk hallal.']],
        ['O jantar é às oito.', 'A vacsora nyolckor van.', [], ['Nyolckor van a vacsora.']],
        ['Ao pequeno-almoço como pão com queijo.', 'Reggelire kenyeret eszem sajttal.', ['Como pão com queijo ao pequeno-almoço.'], ['Reggelire sajtos kenyeret eszem.']],
        ['A sopa está muito boa.', 'A leves nagyon finom.', [], ['Nagyon finom a leves.']],
        ['Queres uma maçã ou uma laranja?', 'Kérsz egy almát vagy egy narancsot?', ['Tu queres uma maçã ou uma laranja?'], []],
        ['Gostamos de fruta.', 'Szeretjük a gyümölcsöt.', ['Nós gostamos de fruta.'], ['Mi szeretjük a gyümölcsöt.']]
      ]
    },
    {
      id: 'szinek', title: 'Színek és ruhák', icon: '👕',
      tip: '**Két „lenni” ige: ser és estar**\n\n' +
        'A magyar „van” helyett a portugálban két ige közül kell választani:\n\n' +
        '- `ser` = **tartós** tulajdonság, ami valakinek vagy valaminek a lényege: név, származás, foglalkozás, jellem, alapszín. `Sou húngaro.` (Magyar vagyok.) `A camisa é branca.` (Az ing fehér.)\n' +
        '- `estar` = **átmeneti** állapot és **hely**: `Estou cansado.` (Fáradt vagyok.) `As calças estão sujas.` (A nadrág koszos – most.) `Onde está o livro?` (Hol van a könyv?)\n\n' +
        'Ragozás: `sou, és, é, somos, são` (ser) és `estou, estás, está, estamos, estão` (estar). A magyarban harmadik személyben nincs ige („Az ing fehér”), a portugálban mindig kell!\n\n' +
        'A színek melléknevek, így igazodnak a főnév neméhez és számához: `um casaco preto`, `uma saia preta`, `sapatos pretos`. Az **-e** végűek csak számban változnak: `verde` → `verdes`. A melléknév általában a főnév **után** áll.',
      words: [
        ['vermelho', 'piros'], ['azul', 'kék'], ['verde', 'zöld'], ['amarelo', 'sárga'], ['branco', 'fehér'], ['preto', 'fekete'],
        ['cor-de-rosa', 'rózsaszín'], ['castanho', 'barna'], ['cinzento', 'szürke'], ['a cor', 'a szín'],
        ['a camisola', 'a pulóver'], ['a camisa', 'az ing'], ['a t-shirt', 'a póló'], ['as calças', 'a nadrág'], ['a saia', 'a szoknya'],
        ['o vestido', 'a ruha (női)'], ['os sapatos', 'a cipő'], ['o casaco', 'a kabát'], ['o chapéu', 'a kalap']
      ],
      sentences: [
        ['A minha camisola é azul.', 'A pulóverem kék.', [], ['Kék a pulóverem.']],
        ['O vestido é muito bonito.', 'A ruha nagyon szép.', [], ['Nagyon szép a ruha.']],
        ['Gosto de sapatos pretos.', 'Szeretem a fekete cipőket.', ['Eu gosto de sapatos pretos.'], ['Én szeretem a fekete cipőket.']],
        ['As calças estão sujas.', 'A nadrág koszos.', [], ['Koszos a nadrág.']],
        ['Qual é a tua cor preferida?', 'Mi a kedvenc színed?', [], ['Melyik a kedvenc színed?']],
        ['A minha cor preferida é verde.', 'A kedvenc színem a zöld.', ['A minha cor preferida é o verde.'], ['Kedvenc színem a zöld.']],
        ['Ela tem uma saia vermelha.', 'Neki van egy piros szoknyája.', [], ['Van egy piros szoknyája.']],
        ['O casaco castanho é do meu pai.', 'A barna kabát az apámé.', [], ['A barna kabát apámé.', 'A barna kabát az apukámé.']],
        ['O céu está cinzento.', 'Az ég szürke.', [], ['Szürke az ég.']],
        ['A camisa branca é nova.', 'A fehér ing új.', [], []],
        ['Hoje estou muito contente.', 'Ma nagyon boldog vagyok.', [], ['Ma nagyon vidám vagyok.']],
        ['O chapéu amarelo é bonito.', 'A sárga kalap szép.', [], []]
      ]
    },
    {
      id: 'ido', title: 'Napok, hónapok, idő', icon: '📅',
      tip: '**Az igék három csoportja: -ar, -er, -ir**\n\n' +
        'A portugál igék főnévi igenéve **-ar**, **-er** vagy **-ir** végű. Jelen időben a tő után ezek a végződések jönnek:\n\n' +
        '- `falar` (beszélni): `falo, falas, fala, falamos, falam`\n' +
        '- `comer` (enni): `como, comes, come, comemos, comem`\n' +
        '- `partir` (indulni): `parto, partes, parte, partimos, partem`\n\n' +
        'A sorrend: én, te, ő/Ön, mi, ők/Önök. Ahogy a magyarban, a személyes névmás (`eu, tu, ele…`) elhagyható, mert a végződés elárulja a személyt: `Falo português.` (Beszélek portugálul.)\n\n' +
        'A hét napjai érdekesek: hétfőtől péntekig sorszámok + `feira` (vásár): `segunda-feira` = „második nap”, `terça-feira` = „harmadik nap”… A hétvége: `sábado, domingo`. A napokat és a hónapokat **kisbetűvel** írjuk. „Hétfőn” = `na segunda-feira`, „hétfőnként” = `à segunda-feira`; „júliusban” = `em julho`.',
      words: [
        ['a segunda-feira', 'a hétfő'], ['a terça-feira', 'a kedd'], ['a quarta-feira', 'a szerda'], ['a quinta-feira', 'a csütörtök'],
        ['a sexta-feira', 'a péntek'], ['o sábado', 'a szombat'], ['o domingo', 'a vasárnap'], ['hoje', 'ma'], ['amanhã', 'holnap'],
        ['ontem', 'tegnap'], ['a semana', 'a hét'], ['o mês', 'a hónap'], ['janeiro', 'január'], ['julho', 'július'], ['dezembro', 'december'],
        ['a hora', 'az óra (időpont)'], ['a manhã', 'a reggel'], ['a noite', 'az este']
      ],
      sentences: [
        ['Hoje é segunda-feira.', 'Ma hétfő van.', [], []],
        ['Amanhã é sábado.', 'Holnap szombat lesz.', [], ['Holnap szombat van.']],
        ['À terça-feira estudo português.', 'Keddenként portugált tanulok.', ['Estudo português à terça-feira.', 'Eu estudo português à terça-feira.'], ['Kedden portugált tanulok.', 'Keddenként portugálul tanulok.', 'Kedden portugálul tanulok.']],
        ['Ao domingo não trabalho.', 'Vasárnap nem dolgozom.', ['Não trabalho ao domingo.'], ['Vasárnaponként nem dolgozom.']],
        ['Que horas são?', 'Hány óra van?', [], ['Mennyi az idő?']],
        ['Ele bebe café de manhã.', 'Reggel kávét iszik.', [], ['Ő reggel kávét iszik.', 'Reggelente kávét iszik.']],
        ['Vivo em Lisboa.', 'Lisszabonban lakom.', ['Eu vivo em Lisboa.', 'Moro em Lisboa.'], ['Lisszabonban élek.', 'Én Lisszabonban lakom.']],
        ['Partimos na quinta-feira.', 'Csütörtökön indulunk.', ['Nós partimos na quinta-feira.'], ['Csütörtökön elutazunk.']],
        ['A semana tem sete dias.', 'Egy hétben hét nap van.', [], ['A hét hét napból áll.']],
        ['O meu aniversário é em julho.', 'A születésnapom júliusban van.', [], ['Júliusban van a születésnapom.']],
        ['Ontem foi sexta-feira.', 'Tegnap péntek volt.', [], []],
        ['Em dezembro faz frio.', 'Decemberben hideg van.', ['Em dezembro está frio.'], []]
      ]
    },
    {
      id: 'otthon', title: 'Otthon és a város', icon: '🏠',
      tip: '**Összevonások: no, na, do, da, ao**\n\n' +
        'Ahol a magyar ragot használ (-ban, -ból, -ba), ott a portugál elöljárószót, ami **összeolvad** a névelővel:\n\n' +
        '- `em` (-ban/-ben, -on/-en) + `o / a` = `no / na`: `no jardim` (a kertben), `na cozinha` (a konyhában)\n' +
        '- `de` (-ból/-ből, -tól/-től, -é) + `o / a` = `do / da`: `da praia` (a tengerpartról), `do meu pai` (az apámé)\n' +
        '- `a` (-ba/-be, -hoz) + `o / a` = `ao / à`: `ao parque` (a parkba), `à escola` (az iskolába)\n\n' +
        'Többes számban: `nos, nas, dos, das, aos, às`. A határozatlan névelővel is összeolvad: `em + uma = numa` (`numa casa` = egy házban), és a mutató névmással is: `em + esta = nesta` (ebben).\n\n' +
        'Az összevonás **kötelező** – `em o jardim` hibás! Épületek, helyek helyére gyakran a `ficar` igét használják: `O museu fica na praça.` (A múzeum a téren található.)',
      words: [
        ['a casa', 'a ház'], ['o apartamento', 'a lakás'], ['o quarto', 'a hálószoba'], ['a cozinha', 'a konyha'],
        ['a casa de banho', 'a fürdőszoba'], ['a sala', 'a nappali'], ['a porta', 'az ajtó'], ['a janela', 'az ablak'], ['a cama', 'az ágy'],
        ['o jardim', 'a kert'], ['a rua', 'az utca'], ['a cidade', 'a város'], ['a praça', 'a tér'], ['o parque', 'a park'],
        ['a igreja', 'a templom'], ['o supermercado', 'a szupermarket'], ['o museu', 'a múzeum'], ['a praia', 'a tengerpart']
      ],
      sentences: [
        ['Moro numa casa grande.', 'Egy nagy házban lakom.', ['Vivo numa casa grande.', 'Eu moro numa casa grande.'], ['Nagy házban lakom.']],
        ['O gato está no jardim.', 'A macska a kertben van.', [], ['A kertben van a macska.']],
        ['A minha mãe está na cozinha.', 'Az anyám a konyhában van.', [], ['Anyukám a konyhában van.', 'Az anyukám a konyhában van.']],
        ['O livro está em cima da cama.', 'A könyv az ágyon van.', [], ['Az ágyon van a könyv.']],
        ['Vou ao parque.', 'Megyek a parkba.', ['Eu vou ao parque.'], ['A parkba megyek.']],
        ['Venho da praia.', 'A tengerpartról jövök.', ['Eu venho da praia.'], ['Jövök a tengerpartról.', 'A strandról jövök.']],
        ['O museu fica na praça.', 'A múzeum a téren van.', ['O museu está na praça.'], ['A téren van a múzeum.']],
        ['Onde fica a casa de banho?', 'Hol van a fürdőszoba?', ['Onde é a casa de banho?'], ['Hol a fürdőszoba?', 'Hol van a mosdó?']],
        ['A janela do quarto é grande.', 'A hálószoba ablaka nagy.', [], ['Nagy a hálószoba ablaka.']],
        ['Lisboa é uma cidade bonita.', 'Lisszabon szép város.', [], ['Lisszabon egy szép város.']],
        ['O supermercado fica nesta rua.', 'A szupermarket ebben az utcában van.', [], ['Ebben az utcában van a szupermarket.']],
        ['A igreja fica perto do parque.', 'A templom a park közelében van.', [], ['A templom közel van a parkhoz.']]
      ]
    },
    {
      id: 'kozlekedes', title: 'Közlekedés és utazás', icon: '🚋',
      tip: '**Portugáliai és brazil portugál**\n\n' +
        'A portugálul beszélők többsége (több mint 200 millió ember) Brazíliában él. A két változat jól érti egymást, de vannak különbségek:\n\n' +
        '- **Megszólítás:** Brazíliában a `você` a hétköznapi „te” (a `tu` csak egyes vidékeken él), és a „mi” helyett gyakran `a gente`.\n' +
        '- **Kiejtés:** a brazilok nem nyelik el a magánhangzókat, ezért nekünk könnyebb érteni őket. A `de, te, di, ti` ott dzsi, csi: `dia` ≈ dzsia, `noite` ≈ nojcsi.\n' +
        '- **Szavak:** busz = `autocarro` (PT) / `ônibus` (BR), vonat = `comboio` / `trem`, mobil = `telemóvel` / `celular`, villamos = `elétrico` / `bonde`, reggeli = `pequeno-almoço` / `café da manhã`, fürdőszoba = `casa de banho` / `banheiro`.\n' +
        '- **Nyelvtan:** „beszélek éppen” = `estou a falar` (PT) / `estou falando` (BR); „a nevem” = `chamo-me` (PT) / `me chamo` (BR).\n\n' +
        'Útbaigazításnál: `à esquerda` (balra), `à direita` (jobbra), `em frente` (egyenesen).',
      words: [
        ['o autocarro', 'a busz'], ['o comboio', 'a vonat'], ['o metro', 'a metró'], ['o elétrico', 'a villamos'], ['o carro', 'az autó'],
        ['a bicicleta', 'a bicikli'], ['o avião', 'a repülőgép'], ['o barco', 'a hajó'], ['a estação', 'az állomás'], ['o aeroporto', 'a repülőtér'],
        ['o bilhete', 'a jegy'], ['o telemóvel', 'a mobiltelefon'], ['a mala', 'a bőrönd'], ['o mapa', 'a térkép'], ['o hotel', 'a szálloda'],
        ['à esquerda', 'balra'], ['à direita', 'jobbra'], ['em frente', 'egyenesen előre']
      ],
      sentences: [
        ['Vou de autocarro para a escola.', 'Busszal megyek az iskolába.', ['Eu vou de autocarro para a escola.', 'Vou para a escola de autocarro.'], ['Az iskolába busszal megyek.']],
        ['O comboio parte às dez.', 'A vonat tízkor indul.', [], ['Tízkor indul a vonat.']],
        ['Onde fica a estação?', 'Hol van az állomás?', ['Onde é a estação?'], ['Hol az állomás?', 'Hol van a pályaudvar?']],
        ['Um bilhete para o Porto, por favor.', 'Egy jegyet kérek Portóba.', [], ['Kérek egy jegyet Portóba.', 'Egy jegyet Portóba, legyen szíves.']],
        ['Vire à esquerda.', 'Forduljon balra.', [], ['Forduljon el balra.']],
        ['O hotel fica à direita.', 'A szálloda jobbra van.', [], ['Jobbra van a szálloda.', 'A szálloda a jobb oldalon van.']],
        ['Siga em frente.', 'Menjen egyenesen előre.', [], ['Menjen egyenesen.']],
        ['Tenho o mapa no telemóvel.', 'A térkép a mobilomon van.', [], ['A mobilomon van a térkép.', 'A telefonomon van a térkép.']],
        ['Em Lisboa há elétricos amarelos.', 'Lisszabonban sárga villamosok vannak.', [], ['Lisszabonban vannak sárga villamosok.']],
        ['O avião chega ao aeroporto.', 'A repülőgép megérkezik a repülőtérre.', [], ['A repülő megérkezik a repülőtérre.', 'A repülőgép a repülőtérre érkezik.']],
        ['A minha mala é muito grande.', 'A bőröndöm nagyon nagy.', [], ['Nagyon nagy a bőröndöm.']],
        ['Vamos de metro ou de carro?', 'Metróval vagy autóval megyünk?', [], ['Metróval megyünk vagy autóval?']]
      ]
    },
    {
      id: 'hobbi', title: 'Hobbi, tervek és múlt', icon: '⚽',
      tip: '**Jövő: ir + főnévi igenév**\n\n' +
        'A közeli jövőt úgy mondjuk, mint a magyar „fogok + ige”: az `ir` (menni) ige jelen idejű alakja + főnévi igenév: `vou, vais, vai, vamos, vão`. `Vou estudar.` (Tanulni fogok.) `Vamos jogar futebol.` (Focizni fogunk.)\n\n' +
        '**Múlt: pretérito perfeito**\n\n' +
        'A befejezett, egyszeri múltbeli eseményre:\n\n' +
        '- `falar`: `falei, falaste, falou, falámos, falaram`\n' +
        '- `comer`: `comi, comeste, comeu, comemos, comeram`\n' +
        '- `partir`: `parti, partiste, partiu, partimos, partiram`\n\n' +
        'Az -ar igéknél a „mi” alakban Portugáliában ékezet van (`falámos` = beszéltünk), így különbözik a jelen időtől (`falamos` = beszélünk). Helyesírási apróság: `jogar` → `joguei` (hogy a g kemény maradjon).\n\n' +
        'Az `ir` (menni) és a `ser` (lenni) múlt ideje ugyanaz: `fui, foste, foi, fomos, foram` – a `Fomos a Portugal.` jelentése „Portugáliába mentünk”, de érthető úgy is: „Portugáliában voltunk”.',
      words: [
        ['o futebol', 'a foci'], ['a música', 'a zene'], ['o desporto', 'a sport'], ['o jogo', 'a játék (meccs)'], ['o filme', 'a film'],
        ['o cinema', 'a mozi'], ['a guitarra', 'a gitár'], ['nadar', 'úszni'], ['jogar', 'játszani (sportot, játékot)'], ['tocar', 'zenélni (hangszeren)'],
        ['ler', 'olvasni'], ['dançar', 'táncolni'], ['cantar', 'énekelni'], ['viajar', 'utazni'], ['o fim de semana', 'a hétvége'],
        ['as férias', 'a szünidő'], ['o ano passado', 'tavaly'], ['na próxima semana', 'jövő héten']
      ],
      sentences: [
        ['Gosto de jogar futebol.', 'Szeretek focizni.', ['Eu gosto de jogar futebol.'], ['Szeretek focit játszani.']],
        ['Vou ver um filme amanhã.', 'Holnap megnézek egy filmet.', ['Amanhã vou ver um filme.', 'Eu vou ver um filme amanhã.'], ['Holnap filmet fogok nézni.', 'Holnap meg fogok nézni egy filmet.', 'Holnap egy filmet fogok nézni.']],
        ['No fim de semana vamos ao cinema.', 'Hétvégén moziba megyünk.', ['Vamos ao cinema no fim de semana.'], ['Hétvégén elmegyünk moziba.', 'Hétvégén megyünk moziba.']],
        ['Vou viajar nas férias.', 'A szünidőben utazni fogok.', ['Nas férias vou viajar.'], ['Utazni fogok a szünidőben.', 'A szünidőben el fogok utazni.', 'A szünetben utazni fogok.']],
        ['Ontem joguei futebol.', 'Tegnap fociztam.', ['Joguei futebol ontem.'], ['Tegnap focit játszottam.']],
        ['Ela tocou guitarra.', 'Ő gitározott.', [], ['Gitározott.', 'Ő gitáron játszott.']],
        ['Ontem comi um bolo.', 'Tegnap ettem egy tortát.', ['Comi um bolo ontem.'], ['Tegnap egy tortát ettem.']],
        ['O ano passado fomos a Portugal.', 'Tavaly Portugáliába mentünk.', ['No ano passado fomos a Portugal.'], ['Tavaly Portugáliában voltunk.']],
        ['Gostas de ler?', 'Szeretsz olvasni?', ['Tu gostas de ler?'], ['Te szeretsz olvasni?']],
        ['Na próxima semana vou nadar.', 'Jövő héten úszni fogok.', ['Vou nadar na próxima semana.'], ['Jövő héten úszni megyek.', 'Jövő héten megyek úszni.']],
        ['Ontem dançámos e cantámos.', 'Tegnap táncoltunk és énekeltünk.', ['Ontem dançamos e cantamos.'], []],
        ['O jogo foi muito bom.', 'A meccs nagyon jó volt.', [], ['A játék nagyon jó volt.']]
      ]
    }
  ]
});
