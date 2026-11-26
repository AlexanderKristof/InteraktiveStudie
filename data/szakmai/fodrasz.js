/* Egyetemi / szakmai réteg: Fodrász és kozmetikus */
STUDIE.addLessonUni('fodrasz', {
  'hajszerkezet': {
    text: 'A hajszár keresztmetszetében a **kutikula** átfedő, kb. 0,5 µm vastag lapos sejtekből áll; felszínét kovalensen kötött zsírsavréteg (főként **18-metil-eikozánsav**, 18-MEA) teszi hidrofóbbá. A lúgos és oxidatív kezelések ezt a lipidréteget leépítik, ezért lesz a kezelt haj hidrofilebb, gubancosabb.\n\nA **kéreg** (cortex) kortikális sejtekből épül fel; ezekben a **keratin intermedier filamentumok** (α-hélixes, coiled-coil szerkezetű fehérjék) a kéntartalmú **keratinasszociált fehérjék** (KAP) mátrixába ágyazódnak. A keratin nagy **ciszteintartalma** miatt sok a diszulfid-keresztkötés, ez adja a haj kémiai ellenállását.\n\n**Mechanika:** a nedves haj Young-modulusa jelentősen kisebb, mint a száraz hajé, mert a víz megbontja a hidrogénkötéseket. Nyújtáskor az α-hélixek egy része β-redő szerkezetbe megy át (α–β átmenet), ezért a haj számottevő megnyúlásra képes szakadás előtt.\n\n**Tartós hullámosítás kémiája:** a tioglikolsav (pH kb. 8,5–9,5) a cisztin diszulfidhídját két cisztein-tiollá redukálja (R–S–S–R + 2 R′SH → 2 R–SH + R′–S–S–R′); a fixálás hidrogén-peroxiddal oxidálja vissza őket az új geometriában. A savas dauer (glicerin-monotioglikolát) kíméletesebb, de lassabb. A lúgos egyenesítők (nátrium- vagy guanidin-hidroxid) **lantioninná** alakítják a cisztint, ez irreverzibilis.\n\n**Hajciklus:** a tüsző ciklusát a dermális papilla jelzései (pl. Wnt-, BMP-útvonalak) szabályozzák; az androgénfüggő kopaszodásban a dihidrotesztoszteron rövidíti az anagént és miniatürizálja a tüszőt.',
    glossary: [
      { hu: 'kutikula', en: 'cuticle', def: 'A hajszár külső, átfedő pikkelysejtekből álló védőrétege.' },
      { hu: 'kéreg', en: 'cortex', latin: 'cortex', def: 'A hajszár keratinrostokat és melanint tartalmazó fő tömege.' },
      { hu: 'velő', en: 'medulla', latin: 'medulla', def: 'A hajszár központi, laza szerkezetű része.' },
      { hu: 'diszulfidhíd', en: 'disulfide bond', def: 'Két cisztein kénatomja közötti kovalens kötés.' },
      { hu: 'tartós hullámosítás', en: 'permanent wave', def: 'A diszulfidhidak redukciója és új geometriájú reoxidációja.' },
      { hu: 'növekedési szakasz', en: 'anagen', def: 'A hajtüsző aktív, több évig tartó növekedési fázisa.' },
      { hu: 'nyugalmi szakasz', en: 'telogen', def: 'A tüsző nyugalmi fázisa, amelynek végén a szál kihullik.' }
    ]
  },
  'festes': {
    text: 'Az **oxidációs hajfestés** elsődleges intermedierei (**prekurzorok**, pl. p-fenilén-diamin, toluol-2,5-diamin, p-aminofenol) hidrogén-peroxiddal lúgos közegben (pH kb. 9–10) **kinon-diiminné** oxidálódnak. Ezek elektrofilként reagálnak a **kapcsolókkal** (pl. rezorcin, m-aminofenol, 1-naftol), és először leuko-, majd oxidáció után színes **indo-festékek** (di- és trinukleáris vegyületek) keletkeznek. A végső szín a prekurzor–kapcsoló kombinációtól függ.\n\nA lúgosító szerepe kettős: megduzzasztja a keratint (a diffúzió gyorsul), és a H₂O₂-ból **perhidroxil-aniont** (HO₂⁻) képez, amely a **melanin** oxidatív lebontásáért felel. Az **eumelanin** nehezebben bomlik, mint a feomelanin, ezért jelenik meg világosításkor a meleg „alapfény”.\n\n**Szőkítés:** a perszulfátok (ammónium-, kálium-perszulfát) erősítik az oxidációt; mellékhatásként a cisztin egy része **ciszteinsavvá** oxidálódik, ami a szál mechanikai szilárdságát tartósan csökkenti. A **kötéserősítő** adalékok (pl. maleinsav-származékok) e károsodás mérséklésére szolgálnak.\n\n**Szabályozás:** az EU kozmetikai rendelete (**1223/2009/EK**) a hajfesték-összetevőket a III. mellékletben (korlátozott anyagok) sorolja fel koncentrációs határértékekkel és kötelező címkefeliratokkal; a fogyasztóbiztonsági tudományos bizottság (SCCS) értékelése alapján számos festékanyagot kitiltottak. A színmérés objektív eszköze a **CIELAB** színtér (`L*`, `a*`, `b*` koordináták), amellyel a szín és a fakulás számszerűsíthető.',
    glossary: [
      { hu: 'oxidációs festék', en: 'oxidative hair dye', def: 'Prekurzorokból és kapcsolókból a hajban oxidációval képződő tartós festék.' },
      { hu: 'előanyag', en: 'primary intermediate (precursor)', def: 'Oxidálható aromás amin, amely a kapcsolóval színes molekulát képez.' },
      { hu: 'kapcsolóanyag', en: 'coupler', def: 'A prekurzor oxidált formájával reagáló, a színárnyalatot meghatározó vegyület.' },
      { hu: 'oxidálószer', en: 'developer (oxidizing agent)', def: 'Hidrogén-peroxid oldat vagy krém, erősségét %-ban vagy vol-ban adják meg.' },
      { hu: 'szőkítés', en: 'bleaching (lightening)', def: 'A melanin oxidatív lebontása, gyakran perszulfátokkal fokozva.' },
      { hu: 'eumelanin', en: 'eumelanin', def: 'Barna-fekete pigment, nehezebben bomlik.' },
      { hu: 'feomelanin', en: 'pheomelanin', def: 'Vöröses-sárgás, kéntartalmú pigment.' }
    ]
  },
  'allergia': {
    text: 'A **para-fenilén-diamin (PPD)** maga is **prehaptén**: a bőrben oxidálódva reaktív kinon-diiminné és **Bandrowski-bázissá** alakul, amely fehérjékhez kötődve hapténként működik. Az **allergiás kontakt dermatitisz** IV. típusú (késleltetett, T-sejtes) túlérzékenységi reakció két fázisa: a **szenzibilizáció** (a hapténnel módosított fehérjét a Langerhans- és dermális dendritikus sejtek a nyirokcsomóba viszik, ahol specifikus T-sejtek szaporodnak), majd az **elicitáció** (újabb expozíciónál a memória-T-sejtek 24–72 órán belül gyulladást váltanak ki).\n\nA PPD-vel **keresztreakció** lehetséges más para-amino-vegyületekkel (pl. toluol-2,5-diamin, egyes azofestékek, benzokain, szulfonamidok). A diagnózist a bőrgyógyász **epikután tesztje** (patch test) állítja fel standard sorozattal.\n\nA szalonban végzett „bőrpróba” (self-test) a gyártók által előírt elővigyázatossági lépés; érzékenysége és specificitása korlátozott, negatív eredménye nem zárja ki az allergiát. Ugyanakkor a pozitív reakció után a termék használata ellenjavallt.\n\n**Foglalkozási szempontok:** a fodrászok körében gyakori a kéz irritatív és allergiás kontakt ekcémája (nedves munka, perszulfátok, tioglikolátok, festékek, latex, nikkel). A **perszulfátok** belélegezve légúti szenzibilizációt, foglalkozási asztmát okozhatnak. A megelőzés hierarchiája: helyettesítés (pormentes termékek), műszaki védelem (elszívás), szervezési intézkedések, egyéni védőeszköz (nitrilkesztyű), bőrvédelmi program.',
    glossary: [
      { hu: 'allergiás kontakt dermatitisz', en: 'allergic contact dermatitis', def: 'Késleltetett típusú, T-sejtes bőrreakció egy kontaktallergénre.' },
      { hu: 'irritatív kontakt dermatitisz', en: 'irritant contact dermatitis', def: 'Nem immunológiai, közvetlen bőrkárosodás.' },
      { hu: 'haptén', en: 'hapten', def: 'Kis molekula, amely fehérjéhez kötődve válik immunogénné.' },
      { hu: 'szenzibilizáció', en: 'sensitization', def: 'Az immunrendszer első „megtanuló” fázisa az allergénnel szemben.' },
      { hu: 'epikután teszt', en: 'patch test', def: 'Bőrgyógyászati vizsgálat a kontaktallergén azonosítására.' },
      { hu: 'keresztreakció', en: 'cross-reactivity', def: 'Reakció egy kémiailag hasonló, másik anyagra.' }
    ]
  },
  'bortipusok': {
    text: 'Az **epidermisz** rétegei alulról felfelé: **stratum basale** (osztódó keratinociták, melanociták, Merkel-sejtek), **stratum spinosum** (Langerhans-sejtek), **stratum granulosum**, a tenyéren és talpon **stratum lucidum**, végül a **stratum corneum**. A szaruréteg „tégla-habarcs” modell szerint corneocytákból (téglák) és sejtközötti lipidekből (ceramidok, koleszterin, szabad zsírsavak) álló habarcsból épül fel; ez a **bőrbarrier** alapja. Működése a **transzepidermális vízvesztés** (TEWL) mérésével jellemezhető.\n\nA bőrfelszín pH-ja (kb. 4,5–5,5) a barrier-lipidek képződésében részt vevő enzimek működéséhez és a kommenzális mikrobióta egyensúlyához is fontos. A **faggyú** (sebum) trigliceridekből, viaszészterekből, szkvalénből áll; termelését androgének szabályozzák, ezért pubertáskor nő.\n\nA kozmetikai bőrdiagnosztika műszeres eszközei: **corneométer** (a szaruréteg hidratáltsága kapacitásméréssel), **sebuméter** (faggyúmennyiség), **TEWL-mérő**, pH-mérő, Wood-lámpa. A **Fitzpatrick-féle fototípus** a bőr UV-válaszát kérdőívesen osztályozza; az UV-sugárzás hatásait a **minimális erythemadózis** (MED) számszerűsíti.\n\n**Fényvédelem:** az **SPF** az UVB okozta erythema elleni védelmet jelzi, laboratóriumi körülmények között 2 mg/cm² felvitt mennyiségnél; a valóságban általában kevesebbet kennek fel, így a tényleges védelem kisebb. Az UVA-védelmet az EU ajánlása szerint az SPF legalább harmadának megfelelő UVA-faktorral kell biztosítani.',
    glossary: [
      { hu: 'hám', en: 'epidermis', latin: 'epidermis', def: 'A bőr külső, többrétegű elszarusodó laphámja.' },
      { hu: 'irha', en: 'dermis', latin: 'dermis (corium)', def: 'Kollagén- és elasztinrostos kötőszöveti réteg.' },
      { hu: 'szaruréteg', en: 'stratum corneum', latin: 'stratum corneum', def: 'A hám legkülső, elhalt sejtekből és lipidekből álló barrierrétege.' },
      { hu: 'transzepidermális vízvesztés', en: 'transepidermal water loss (TEWL)', def: 'A bőrön át elpárolgó víz mennyisége, a barrierfunkció mérőszáma.' },
      { hu: 'faggyú', en: 'sebum', def: 'A faggyúmirigyek zsíros váladéka.' },
      { hu: 'fénytípus', en: 'skin phototype', def: 'A bőr UV-sugárzásra adott válasza szerinti osztályozás.' },
      { hu: 'fényvédő faktor', en: 'sun protection factor (SPF)', def: 'Az UVB okozta bőrpír elleni védelem mértéke.' }
    ]
  },
  'vagas': {
    text: 'A hajvágás geometriája a **fej gömbfelületén** értelmezett vágóvonalak és **kiemelési szögek** rendszere. A szakirodalom (pl. a Sassoon-iskola óta) három alapformát különít el: **tömör forma** (solid, 0°, nincs rétegzés, a hosszak egy vonalban), **graduált forma** (kis–közepes szög, a rétegek egymásra rakódnak, súlyvonal alakul ki) és **réteges forma** (nagy szög; egyenletes rétegzésnél a fej görbületére merőleges 90°-os emeléssel minden pontban azonos hossz). A **túlvetítés** (overdirection) – a tincsek eltolása a természetes esési irányukból – hosszgradienst hoz létre.\n\nA vágóvonal és a **fejpontok** (tetőpont, nyakszirtcsont, fültő, halánték) viszonya határozza meg a forma súlypontját. A **keresztellenőrzés** az ortogonális irányú újraemeléssel mutatja ki a hibákat.\n\n**Eszközök:** a szakmai ollók pengeacélja jellemzően keményített rozsdamentes acél; a konvex élű („japán”) penge csúszóvágásra, a mikrofogazott penge pontos tompa vágásra alkalmas. A hajvágógépek toldófésűinek névleges hossza a márkák között eltérhet, ezért a szalonban egységesen kell kezelni.\n\n**Ergonómia:** a fodrászok körében gyakori a felső végtag és a nyak-váll régió **munkával összefüggő mozgásszervi rendellenessége** (WMSD), pl. ínhüvelygyulladás, kéztőalagút-szindróma. Kockázati tényező a tartósan emelt kar (vállabdukció), a csukló szélsőséges helyzete és az ismétlődő ollómozdulat. Megelőzés: állítható szék, ergonomikus (pl. elforduló hüvelykujjgyűrűs) olló, mikroszünetek, váltott testhelyzet.',
    glossary: [
      { hu: 'emelési szög', en: 'elevation (projection) angle', def: 'A tincs fejtől való elemelésének szöge vágás előtt.' },
      { hu: 'vezetőtincs', en: 'guideline (guide)', def: 'Az első vágott tincs, amelyhez a többit igazítják.' },
      { hu: 'tömör forma', en: 'solid form (one-length cut)', def: 'Rétegzés nélküli, egy vonalban végződő vágás.' },
      { hu: 'lépcsőzés', en: 'graduation', def: 'Kis–közepes szögű rétegzés, súlyvonal kialakításával.' },
      { hu: 'réteges vágás', en: 'layering', def: 'Nagy szögű rétegzés könnyed, mozgékony formához.' },
      { hu: 'túlvetítés', en: 'overdirection', def: 'A tincs eltolása a természetes esési irányából, hosszgradienst ad.' },
      { hu: 'kiritkítás', en: 'texturizing (thinning)', def: 'A tömeg csökkentése és a végek lazítása.' }
    ]
  },
  'higienia': {
    text: 'A fertőtlenítőszerek hatásspektrumát európai szabványos vizsgálatok (EN-szabványok) igazolják: **baktericid**, **fungicid** (illetve **levurocid**), **virucid** (teljes vagy korlátozott spektrumú) és **sporocid** hatás. A hatás feltétele a megadott **koncentráció** és **behatási idő**; a szerves szennyeződés (fehérje, vér) jelentősen csökkenti a hatékonyságot („tiszta” és „piszkos” körülmények közötti vizsgálat).\n\nA **Spaulding-féle** osztályozás szerint az eszközök kockázata attól függ, mivel érintkeznek: **kritikus** (steril szövetbe hatol: sterilizálás vagy egyszer használatos eszköz), **szemikritikus** (nyálkahártyával, sérült bőrrel érintkezik: magas szintű fertőtlenítés), **nem kritikus** (ép bőrrel érintkezik: tisztítás és alacsony–közepes szintű fertőtlenítés). A szépségiparban a bőrt átszúró eszközök (pl. mikroblading, tűs kezelések) kritikusnak számítanak.\n\nA vérrel terjedő vírusok kockázata: a **HBV** beszáradva is napokig fertőzőképes, és nagyon kis vérmennyiség is fertőzhet; a **HCV** szintén ellenálló, a **HIV** a környezetben kevésbé stabil. Expozíció után a **posztexpozíciós profilaxis** (PEP) időkritikus.\n\nA hazai szabályozás keretét a népegészségügyi hatóság (NNGYK, kormányhivatalok) előírásai és módszertani levelei adják; a biocid termékeket engedélyezni kell, a vegyi anyagok kezelésére a **biztonsági adatlap** (SDS) és a munkavédelmi kockázatértékelés vonatkozik.',
    glossary: [
      { hu: 'fertőtlenítés', en: 'disinfection', def: 'A kórokozók számának jelentős csökkentése, spórák nélkül.' },
      { hu: 'sterilizálás', en: 'sterilization', def: 'Minden mikroorganizmus, köztük a spórák elpusztítása.' },
      { hu: 'behatási idő', en: 'contact time', def: 'Az az idő, ameddig a szernek érintkeznie kell a felülettel.' },
      { hu: 'biocid termék', en: 'biocidal product', def: 'Kártékony szervezetek elpusztítására szolgáló, engedélyköteles termék.' },
      { hu: 'posztexpozíciós profilaxis', en: 'post-exposure prophylaxis (PEP)', def: 'Fertőzésveszélyes expozíció után adott megelőző kezelés.' },
      { hu: 'biztonsági adatlap', en: 'safety data sheet (SDS)', def: 'A vegyi anyag veszélyeit és biztonságos kezelését leíró dokumentum.' }
    ]
  },
  'vendeg': {
    text: 'A szolgáltatásminőség klasszikus modellje, a **SERVQUAL** öt dimenzióban méri a vevői elvárás és az észlelt teljesítmény közötti **rést**: kézzelfogható tényezők (környezet, eszközök), megbízhatóság, reagálókészség, szakértelem/biztonságérzet, empátia. A szalon szolgáltatása „hiteltulajdonság”-ban gazdag (credence attributes): a vendég a szakmai minőséget csak részben tudja megítélni, ezért a bizalom és a kommunikáció különösen fontos.\n\n**Kommunikációelmélet:** a konzultáció a **motivációs interjú** és a **kliensközpontú** megközelítés elemeit használja: nyitott kérdések, reflektív hallgatás, összegzés. Az elvárások kezelésénél a **vizuális referencia** (fénykép, színkártya) csökkenti a szemantikai félreértést.\n\n**Panaszkezelés:** a „szolgáltatási paradoxon” szerint a jól kezelt panasz után a vendég elégedettsége akár meg is haladhatja a hiba nélküli esetét. A hazai fogyasztóvédelmi szabályozás előírja a panaszok kezelését és nyilvántartását.\n\n**Adatvédelem:** a GDPR szerint az egészségügyi adat (allergia, bőrbetegség) a 9. cikk szerinti különleges kategória, kezeléséhez kifejezett hozzájárulás vagy más jogalap kell; érvényesül az **adattakarékosság**, a **célhoz kötöttség** és az **elszámoltathatóság** elve. A vendéget **adatkezelési tájékoztatóban** kell informálni.',
    glossary: [
      { hu: 'szolgáltatásminőség', en: 'service quality', def: 'Az elvárt és az észlelt szolgáltatás közötti különbség.' },
      { hu: 'aktív hallgatás', en: 'active listening', def: 'Figyelő, visszajelző, összegző hallgatási technika.' },
      { hu: 'nyitott kérdés', en: 'open question', def: 'Kifejtő választ igénylő kérdés.' },
      { hu: 'panaszkezelés', en: 'complaint handling', def: 'A vevői panasz fogadása, kivizsgálása és megoldása.' },
      { hu: 'különleges adat', en: 'special category data', def: 'Pl. egészségügyi adat; a GDPR szerint fokozott védelmet élvez.' },
      { hu: 'adattakarékosság', en: 'data minimisation', def: 'Csak a célhoz szükséges adat kezelhető.' }
    ]
  },
  'vallalkozas': {
    text: 'A szolgáltató vállalkozás kulcsmutatója a **kapacitáskihasználtság**: a ténylegesen értékesített munkaórák aránya a rendelkezésre álló órákhoz. Mivel a szolgáltatás **nem raktározható** (az üres időpont elvész), a jövedelmezőséget nagyban befolyásolja az időpontkezelés, a **no-show** (meg nem jelenés) aránya és a **dinamikus árazás** lehetősége (pl. csúcsidőn kívüli kedvezmény).\n\n**Költségszerkezet:** fix költségek (bérleti díj, biztosítás, könyvelés, eszközök értékcsökkenése) és változó költségek (anyag, jutalék). A **fedezeti pont** (break-even) az a forgalom, amelynél a fedezet éppen a fix költségeket fedezi: `fedezeti pont = fix költség / (egységár − egységnyi változó költség)`. Az **óradíj-kalkuláció** a fix költségeket az éves értékesíthető órákra osztja, és ehhez adja a bérköltséget.\n\n**Árképzési módszerek:** költségalapú (önköltség + haszonkulcs), versenytárs-alapú, értékalapú. A **vevői életérték** (CLV) azt mutatja, mekkora haszon várható egy vendégtől a kapcsolat teljes ideje alatt; a szépségiparban a visszatérő vendég megtartása általában olcsóbb, mint az új megszerzése.\n\n**Jogi keret:** a vállalkozási és adózási formák (egyéni vállalkozó, társas vállalkozás, különféle adózási módok) szabályai gyakran változnak, ezért a döntéshez mindig az aktuális jogszabályokat és szakértő (könyvelő, adótanácsadó) véleményét kell figyelembe venni.',
    glossary: [
      { hu: 'önköltség', en: 'unit cost', def: 'Egy szolgáltatás előállításának teljes költsége.' },
      { hu: 'haszonkulcs', en: 'markup', def: 'Az önköltségre rakott, százalékban kifejezett haszon.' },
      { hu: 'fedezeti pont', en: 'break-even point', def: 'Az a forgalom, amelynél a bevétel éppen fedezi a költségeket.' },
      { hu: 'fix költség', en: 'fixed cost', def: 'A forgalomtól független költség (pl. bérleti díj).' },
      { hu: 'kapacitáskihasználtság', en: 'capacity utilisation', def: 'A ténylegesen kihasznált és a rendelkezésre álló kapacitás aránya.' },
      { hu: 'vevői életérték', en: 'customer lifetime value (CLV)', def: 'Egy vevőtől a kapcsolat teljes ideje alatt várható haszon.' }
    ]
  }
});
