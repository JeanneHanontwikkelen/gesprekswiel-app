
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui";
import { Button } from "./ui";
import { Badge } from "./ui";
import { Progress } from "./ui";

// ---------------------------------------------------------------
// Data: de vier knoppen van het gesprekswiel (Van den Berg & Kanters, 2018)
// ---------------------------------------------------------------
const KNOPPEN = [
  {
    id: "uitpraten",
    naam: "Elkaar uit laten praten",
    tandwiel: "Interactie",
    kleur: "#2563eb",
    startvraag:
      "Hoelang moet jij je uitspreken voordat je je écht gehoord voelt? Tel maar eens mee in je hoofd.",
    uit: "De ander onderbreekt je steeds: vult je zinnen aan, springt op eigen verhalen, of kapittelt jouw gezichtspunt.",
    gevolgUit:
      "Je houdt informatie achter, je zinnen worden korter, je voelt je niet serieus genomen. De cliënt noemt de cruciale feiten vaak pas op het einde – als de interrupteur die zin niet meer hoort.",
    aan: "Je laat minimaal 10 seconden stilte vallen na elke zin van de ander. Niemand vult iets aan.",
    gevolgAan:
      "De ander vertelt méér dan in de eerste ronde: ook de details, de twijfels en de emotie. Stilte is geen leegte maar uitnodiging.",
    oefening: "Werkvorm 1 – De interruptie-marathon",
    juridisch:
      "In een intakegesprek zit de belangrijkste informatie soms in de laatste zin. Wie niet laat uitpraten, mist het dossier.",
  },
  {
    id: "luisteren",
    naam: "Luisteren",
    tandwiel: "Gespreksvaardigheden",
    kleur: "#16a34a",
    startvraag:
      "Wanneer heb jij je voor het laatst écht gehoord gevoeld – en wat deed de ander toen precies?",
    uit: "Je luistert met een oordeel: terwijl de ander praat, bepaal jij stilletjes wie er schuld heeft. Je hoort alleen wat jouw verwachting bevestigt.",
    gevolgUit:
      "Selectief luisteren: je mist wat tussen de regels klinkt en wat de lichaamstaal zegt. De ander merkt het aan je reacties en klapt dicht.",
    aan: "Je parkeert je oordeel, vat om de twee minuten samen wat de ander zei en benoemt wat je signaleert.",
    gevolgAan:
      "De ander corrigeert en verfijnt: 'Ja, zo was het' of 'Nee, eigenlijk…'. Samenvatten zonder oordeel maakt het gesprek preciezer én veiliger.",
    oefening: "Werkvorm 2 – De echo",
    juridisch:
      "Een jurist die oordeelt vóórdat alle feiten op tafel liggen, bevestigt alleen zijn eigen hypothese. Luisteren = feiten verzamelen, niet pleiten.",
  },
  {
    id: "vragen",
    naam: "Vragen stellen",
    tandwiel: "Gespreksvaardigheden",
    kleur: "#d97706",
    startvraag:
      "Stel: je cliënt zegt alleen 'Ik wil van mijn baas af.' Welke vraag stel je om erachter te komen wat er écht speelt?",
    uit: "Je stelt alleen gesloten vragen: 'Was het onvrijwillig? Ging het om salaris?' Het antwoord is ja of nee.",
    gevolgUit:
      "Het gesprek levert brokjes informatie op, maar geen verhaal. Je bouwt een dossier van gaten en moet alles zelf invullen.",
    aan: "Je stelt open vragen en je vraagt door: 'Wat speelde er precies? Wat heb je toen gedaan? Wat betekent dit voor jou?'",
    gevolgAan:
      "De ander onthult details die niemand zag aankomen. Eén goede doorvraag levert vaak meer dan tien gesloten vragen.",
    oefening: "Werkvorm 3 – De vraagmachine",
    juridisch:
      "De feiten van een zaak komen naar boven door vragen, niet door veronderstellingen. Vraagtechniek is feitenverzameling.",
  },
  {
    id: "omgeving",
    naam: "Omgeving",
    tandwiel: "Sfeer & omgeving",
    kleur: "#9333ea",
    startvraag:
      "Waar voer jij een slechtnieuwsgesprek: op je kamer, of tijdens een wandeling met de cliënt? Leg je keuze uit.",
    uit: "Het gesprek vindt plaats in een drukke kantine: lawaai, telefoons, mensen die storen. Hetzelfde verhaal, andere impact.",
    gevolgUit:
      "Ruis en afleiding maken de boodschap kil of onduidelijk. De cliënt hoort 'je zaak is niet kansrijk' tussen twee koffiebestellingen.",
    aan: "Je plant de plek: rustig, ongestoord, soms zelfs wandelend. In een slechtnieuwsgesprek snel en duidelijk, maar niet kil.",
    gevolgAan:
      "Een rustige plek geeft veiligheid; wandelen brengt het gesprek letterlijk en figuurlijk in beweging. De relatie met de cliënt blijft intact.",
    oefening: "Werkvorm 4 – Het gesprek verhuizen",
    juridisch:
      "'Plan de plek voor je gesprek': een formele setting oogt eerder als een vonnis, een informele setting houdt de relatie in stand.",
  },
  {
    id: "nonverbaal",
    naam: "Non-verbale communicatie",
    tandwiel: "Non-verbale communicatie",
    kleur: "#e11d48",
    startvraag:
      "Denk aan je laatste gesprek dat stroef liep: wat zei de lichaamstaal van de ander – en wat deed die van jou?",
    uit: "Je woorden zijn correct, maar je blik dwaalt af, je armen zijn over elkaar geslagen en je kijkt op je horloge als de ander iets gevoeligs vertelt.",
    gevolgUit:
      "De non-verbale laag 'zegt' meer dan de woorden: de ander voelt dat de deur dicht is, hoe beleefd je zinnen ook zijn. Je signaleert bovendien niets bij de ander – je mist de aarzeling, de rode kleur, de dichtgeklapte houding.",
    aan: "Je stemt je lichaam af op je woorden: oogcontact, open houding, je leunt mee. En je benoemt wat je signaleert als de lichaamstaal niet aansluit bij de woorden.",
    gevolgAan:
      "Woorden en houding vertellen hetzelfde verhaal: de ander voelt zich veilig. En door te benoemen wat je ziet ('Ik merk dat je twijfelt') haal je het ongezegde toch naar boven.",
    oefening: "Werkvorm – De menselijke spiegel",
    juridisch:
      "Een jurist die alleen naar de inhoud luistert, mist het grootste deel van de boodschap: twijfel over een verklaring, angst voor een werkgever of onzekerheid over een keuze zit vaak niet in de woorden.",
  },
  {
    id: "emoties",
    naam: "Emoties / gevoelens",
    tandwiel: "Emoties / gevoelens",
    kleur: "#0d9488",
    startvraag:
      "Wanneer werd een gesprek voor jou pas echt goed – op het moment dat iemand jouw emotie benoemde of erkende?",
    uit: "Je gaat voorbij aan wat je voelt en ziet: emoties blijven onbenoemd, je blijft 'zakelijk' doorpraten over feiten alsof er niets aan de hand is.",
    gevolgUit:
      "De emotie blijft in de kamer hangen en blokkeert het gesprek: de cliënt die hoort dat hij zijn zaak verliest, hoort daarna geen woord meer. Irritatie of onzekerheid die niet benoemd wordt, blijft de sfeer bepalen.",
    aan: "Je benoemt wat je signaleert en erkent het gevoel: 'Ik zie dat dit hard aankomt – dat is heel begrijpelijk. Wil je even, of zullen we doorgaan?'",
    gevolgAan:
      "Het benoemen van emoties kan een gesprek stoppen, vlot trekken of in een stroomversnelling brengen. Erkenning geeft lucht: de ander voelt zich gezien en kan daarna weer naar de inhoud luisteren.",
    oefening: "Werkvorm – Het emotie-etiket",
    juridisch:
      "In een slechtnieuwsgesprek verwerkingst de cliënt vaak geen woord meer na de boodschap. Wie de emotie benoemt en er ruimte voor geeft, houdt de relatie én de zaak behouden: de cliënt hoort pas later wat de vervolgstappen zijn.",
  },
];

const ANDERE_TANDWIELEN = [
  { naam: "Proces" },
  { naam: "Inhoud" },
];

// ---------------------------------------------------------------
// Interactiemanieren bij de knop 'elkaar wel of niet laten uitpraten'
// ---------------------------------------------------------------
const INTERACTIEMANIEREN = [
  {
    id: 1,
    titel: "De zin-afmaker",
    gedrag:
      "Je maakt de zinnen van de ander af: 'Dus jij voelde dat je baas jou niet zag zitten, en toen…'",
    effect:
      "Soms zit je invulling er helemaal naast, en dan raakt de ander de draad kwijt. Zelfs als je goed gokt, voelt het alsof jij het verhaal overneemt. De ander praat daarna behoedzamer en oppervlakkiger.",
    uitleg:
      "Alleen laten uitpraten betekent ook: de ánder bepalen hoe de zin eindigt. Wie afmaakt, hoort alleen zijn eigen versie van het verhaal.",
  },
  {
    id: 2,
    titel: "De onderwerpspringer",
    gedrag:
      "Zodra je een woord herkent, spring je op je eigen verhaal: 'Oh, onvrijwillig ontslag? Mijn neef had dat ook, die…'",
    effect:
      "De aandacht verschuift van de ander naar jou. De cliënt vertelt niet meer over zijn zaak, maar luistert beleefd naar jouw anecdote. De cruciale feiten blijven ongezegd.",
    uitleg:
      "Herkenning is nuttig als brug, niet als afleiding. Noteer je eigen verhaal voor later en geef het woord terug: 'Wat gebeurde er toen bij jou?'",
  },
  {
    id: 3,
    titel: "De ja-maar-kenner",
    gedrag:
      "Je laat de ander technisch uitpraten, maar reageert meteen met: 'Ja, maar dat staat in je contract, dus…'",
    effect:
      "De ander voelt zich gehoord als een dossier, niet als een mens. Feitelijke correcties op het verkeerde moment dempen de verteldrang: de rest van het verhaal komt niet meer of komt pas bij een volgende gesprekspartner.",
    uitleg:
      "Uitpraten laten = eerst het hele verhaal ontvangen, daást pas reageren. 'Ja-maar' is een interruptie in nette kleren.",
  },
  {
    id: 4,
    titel: "De stilte-vanger",
    gedrag:
      "Je laat na elke zin minimaal 5 tot 10 seconden stilte vallen. Je knikt niet eens, je wacht gewoon.",
    effect:
      "De stilte voelt eerst ongemakkelijk, maar daarna vult de ander hem – met precies datgene wat de eerste keer nog niet gezegd werd: de twijfel, het detail, de echte vraag.",
    uitleg:
      "Dit is de knop op zijn best: stilte is geen leegte maar uitnodiging. De belangrijkste informatie komt ná de stilte.",
  },
  {
    id: 5,
    titel: "De teruggever",
    gedrag:
      "Je vat om de twee minuten samen wat de ander zei – zonder oordeel – en geeft terug: 'Klopt het dat ik je zo begrijp: …?'",
    effect:
      "De ander voelt zich écht gehoord en corrigeert waar nodig: 'Ja, zo was het' of 'Nee, eigenlijk…'. Het gesprek wordt preciezer én veiliger.",
    uitleg:
      "Samenvatten is uitpraten laten in slow motion: je toont dat je bij bent gebleven, en de ander vult rustig de gaten aan.",
  },
];

// ---------------------------------------------------------------
// Manieren bij de knop 'luisteren'
// ---------------------------------------------------------------
const LUISTERMANIEREN = [
  {
    id: 1,
    titel: "De oordeel-luisteraar",
    gedrag:
      "Terwijl de ander praat, bepaal jij stilletjes wie er schuld heeft. Je knikt al op de momenten die jouw beeld bevestigen.",
    effect:
      "Je hoort alleen wat in je hypothese past. Feiten die je oordeel tegenspreken schuif je weg als 'detail'. De ander merkt aan je reacties dat er een vonnis klaarligt en houdt zich op de vlakte.",
    uitleg:
      "Luisteren = feiten verzamelen, niet pleiten. Parkéér je oordeel letterlijk: schrijf het op een papiertje en leg het naast je, om het pas ná het gesprek weer op te pakken.",
  },
  {
    id: 2,
    titel: "De antwoord-registrator",
    gedrag:
      "Je luistert niet naar het verhaal, maar naar je eigen volgende zin: je wacht tot de ander uitgesproken is zodat jij kunt reageren.",
    effect:
      "Je reacties raken het verhaal nét niet. De ander merkt dat je 'bezig' bent in plaats van aanwezig en vertelt steeds vlakker.",
    uitleg:
      "Echt luisteren voelt als vertragen: als je antwoord formuleert, luister je al niet meer. Adem in, laat de zin van de ander landen, en zie dan wat je wilt vragen.",
  },
  {
    id: 3,
    titel: "De tussen-de-regels-lezer",
    gedrag:
      "Je let op wat níét gezegd wordt: de aarzeling vóór een antwoord, de plotselinge zakdoek, de zin die ineens ophoudt. Je benoemt het: 'Ik zie je twijfelen – zit er meer achter?'",
    effect:
      "De ander voelt zich gezien in plaats van aangehoord en vertelt wat er echt speelt: de angst voor de werkgever, de schaamte over het geld, de echte reden van de vraag.",
    uitleg:
      "Luisteren gaat ook over non-verbale communicatie: als de lichaamstaal niet aansluit bij de woorden, signaleer dat dan. Dit is de knop op zijn best.",
  },
  {
    id: 4,
    titel: "De woordelijke luisteraar",
    gedrag:
      "Je vangt de letterlijke woorden: 'ontslag', 'contract', 'geld'. Alles wat daarbuiten valt – toon, tempo, gezicht – negeer je.",
    effect:
      "Je krijgt een correcte samenvatting van de feiten, maar mis de mens erachter. Bij een slechtnieuwsgesprek klinkt jouw reactie daardoor kil, hoe netjes je formulering ook is.",
    uitleg:
      "De inhoud vertelt je WAT er speelt; de non-verbale laag vertelt je HOE het valt. Beide horen bij het dossier.",
  },
  {
    id: 5,
    titel: "De stiltedurver",
    gedrag:
      "Als de ander stopt met praten, spring je niet in. Je laat de stilte staan, kijkt vriendelijk, en wacht.",
    effect:
      "In negen van de tien gevallen komt er nog een zin – vaak de belangrijkste: 'Nou, eigenlijk ben ik vooral bang dat…'. De stilte haalt de boodschap naar boven die de ander zelf nog niet had geformuleerd.",
    uitleg:
      "Stilte is een gespreksvaardigheid: op tijd een stilte laten vallen kan een gesprek maken of breken.",
  },
];

// ---------------------------------------------------------------
// Manieren bij de knop 'vragen stellen'
// ---------------------------------------------------------------
const VRAGENMANIEREN = [
  {
    id: 1,
    titel: "De ja/nee-machine",
    gedrag:
      "Je stelt alleen gesloten vragen: 'Was het onvrijwillig? Ging het om salaris? Stond het in je contract?'",
    effect:
      "Je krijgt brokjes: ja, nee, nee. Je bouwt een dossier van gaten en moet zelf invullen wat er tussen de antwoorden zit – en dat invullen is precies waar een juridisch foutje begint.",
    uitleg:
      "Gesloten vragen zijn alleen een eindstation: gebruik ze om te vérifie­ren wat je al weet, niet om te ontdekken wat je nog niet weet.",
  },
  {
    id: 2,
    titel: "De waarom-graaf",
    gedrag:
      "Elke zin van de ander antwoord je met 'Waarom?': waarom nam je die functie aan, waarom zei je niets, waarom nu pas?",
    effect:
      "Los sta je vraag misschien, maar na de derde 'waarom' voelt het als een verhoor. De ander gaat zich verdedigen in plaats van vertellen.",
    uitleg:
      "'Waarom' klinkt als verwijt. Vraag lieder verwijt-vrij door: 'Wat speelde er toen voor jou?' of 'Hoe kwam je tot die keuze?'",
  },
  {
    id: 3,
    titel: "De aanklager",
    gedrag:
      "Je stelt suggestieve vragen waarin het antwoord al zit: 'Je wist toen toch best dat dat risico liep?'",
    effect:
      "De ander voelt zich in de hoek gedreven en gaat mee in jouw frame – of dicht. De feiten die je zo verzamelt zijn gekleurd door hoe je de vraag stelde.",
    uitleg:
      "Wie de vraag stuurt, stuurt het antwoord. In een intake wil je juist een ongestuurd verhaal: open vragen, geen suggesties.",
  },
  {
    id: 4,
    titel: "De open-deur-steller",
    gedrag:
      "Je stelt grote open vragen en vraagt door op het antwoord: 'Wat speelde er precies? En wat deed je toen? Wat betekent dit voor jou?'",
    effect:
      "De ander onthult details die niemand zag aankomen: de e-mail die al weken ligt te wachten, de collega die meer weet. Eén goede doorvraag levert meer dan tien gesloten vragen.",
    uitleg:
      "Dit is de knop op zijn best: open vragen openen, doorvragen verdiept. De volgorde is: eerst het hele verhaal, dán de details verifiëren.",
  },
  {
    id: 5,
    titel: "De klokkenluider",
    gedrag:
      "Je stelt maar één vraag en zwijgt dan volledig: je wacht af of de ander zelf doorgaat.",
    effect:
      "Soms een gouden zet – de ander doorbreekt de stilte met nieuws. Soms een doodlopende weg: de ander weet niet dat hij meer mag vertellen en stopt ook.",
    uitleg:
      "Één vraag stellen is een vaardigheid, maar de knop vragen stellen vraagt ook om te méten of de deur open genoeg was: 'Ik hoor het graag wat uitgebreider, als dat kan.'",
  },
];

// ---------------------------------------------------------------
// Manieren bij de knop 'omgeving'
// ---------------------------------------------------------------
const OMGEVINGSMANIEREN = [
  {
    id: 1,
    titel: "De kantinegesprekker",
    gedrag:
      "Je voert het gesprek in een drukke kantine: lawaai, telefoons, collega's die tussendoor roepen.",
    effect:
      "Ruis en afleiding maken de boodschap kil of onduidelijk. De cliënt hoort 'je zaak is niet kansrijk' tussen twee koffiebestellingen – en kan de boodschap niet plaatsen, noch de emotie ervan kwijt.",
    uitleg:
      "Een omgeving kan een gesprek inspireren, maar het ook doodslaan. Dit is de knop die op 'uit' staat.",
  },
  {
    id: 2,
    titel: "De bureau-bouwheer",
    gedrag:
      "Je zit aan een breed bureau, recht tegenover de cliënt, dossier tussen jullie in, deur dicht.",
    effect:
      "Rustig en ongestoord, maar de tafel werkt als een scheidsrechter: het voelt als een hoorzitting. Slecht nieuws oogt eerder als een vonnis.",
    uitleg:
      "Kleine verandering, groot effect: ga niet recht tegenover, maar schuin naast elkaar zitten en leg het dossier opzij tot het nodig is.",
  },
  {
    id: 3,
    titel: "De wandelaar",
    gedrag:
      "Je stelt voor het gesprek buiten voort te zetten, wandelend, zonder tafel tussen jullie.",
    effect:
      "Het lopen brengt het gesprek letterlijk én figuurlijk in beweging: de ander praat makkelijker over lastige dingen, zinnen komen losser, en de gedeelde beweging schept gelijkwaardigheid.",
    uitleg:
      "Uit het bronboek: 'buiten lopen brengt het gesprek letterlijk en figuurlijk in beweging'. Let wel op privacy: buiten kun je gestoord worden door iets anders dan kantine-lawaai.",
  },
  {
    id: 4,
    titel: "De schermkijker",
    gedrag:
      "Je voert het gesprek met je blik op een beeldscherm: je typt aantekeningen, kijkt mail erbij, beantwoordt ondertussen 'nog even snel' iets.",
    effect:
      "'Aandacht voor het scherm of voor elkaar!' – de ander voelt zich een inlooppunt. Bovendien mis je alle non-verbale signalen die jij nodig hebt om te begrijpen hoe de boodschap valt.",
    uitleg:
      "Notities zijn nodig, maar plan ze: benoem vooraf 'ik maal af en toe een notitie' of typ na het gesprek. De knop omgeving draait óók om jouw aandacht als meubelstuk.",
  },
  {
    id: 5,
    titel: "De plekplanner",
    gedrag:
      "Je plant de plek vóór het gesprek: rustige kamer, deur op 'niet storen', koffie klaar, en je opent met een agenda-afspraak: 'Wat gaan we bespreken en hoe?'",
    effect:
      "De structuur werkt door in alles: de cliënt weet waar hij aan toe is, het slechtnieuws komt snel en duidelijk maar niet kil, en er is ruimte om het te laten landen.",
    uitleg:
      "'Plan de plek voor je gesprek' – omgeving en proces horen bij elkaar. Dit is de knop op zijn best.",
  },
];

// ---------------------------------------------------------------
// Manieren bij de knop 'non-verbale communicatie'
// ---------------------------------------------------------------
const NONVERBAALMANIEREN = [
  {
    id: 1,
    titel: "De schermkijker-ogen",
    gedrag:
      "Je praat vriendelijk, maar je ogen blijven op je notities of beeldscherm gericht. hooguit af en toe een snelle blik.",
    effect:
      "De ander praat door, maar vertelt steeds minder: zonder oogcontact voelt het alsof je verhaal nergens heen gaat. En jij ziet ondertussen niets van wat er bij de ander gebeurt.",
    uitleg:
      "Oogcontact is de eenvoudigste vorm van aanwezigheid: kijk op als de ander iets vertelt en typ je notities na het gesprek.",
  },
  {
    id: 2,
    titel: "De gesloten muur",
    gedrag:
      "Je zit met over elkaar geslagen armen en benen, achterover geleund, onderuitgezakt. Je gezicht is neutraal.",
    effect:
      "Je bedoelt niets kwaads – misschien zit je gewoon comfortabel – maar de ander leest er afwezigheid of wantrouwen in en houdt zich in.",
    uitleg:
      "Bedenk dat de ander jouw houding altijd interpreteert, of je het nu zo bedoelt of niet. Open houding, licht voorover: kleine signalen, groot effect.",
  },
  {
    id: 3,
    titel: "De stem-kalibraar",
    gedrag:
      "Je past je stem aan de ander aan: rustiger en lager bij een emotioneel moment, iets energieker als het gesprek stroef loopt.",
    effect:
      "De ander onbewust mee: een rustige stem dempt een gespannen moment, een warme toon nodigt uit om door te vertellen. Tempo, intonatie en luidheid 'zeggen' meer dan de woorden.",
    uitleg:
      "Je stem is non-verbale communicatie die je kunt sturen. Bij slecht nieuws: vertraag, verlaag, pauzeer. Dat maakt de boodschap duidelijk zonder kil te zijn.",
  },
  {
    id: 4,
    titel: "De spiegel",
    gedrag:
      "Je spiegelt subtiel de houding van de ander: leunt die voorover, dan doe je mee; praat die langzaam, dan vertraag jij ook.",
    effect:
      "De ander voelt zich onverklaarbaar op haar gemak – 'er was klik'. Onbewust synchroniseren bouwt vertrouwen en gelijkwaardigheid op.",
    uitleg:
      "Dit is de knop op zijn best, mits het subtiel blijft: te nadrukkelijk spiegelen voelt als nabootsen en werkt averechts.",
  },
  {
    id: 5,
    titel: "De signaleerder",
    gedrag:
      "De lichaamstaal van de ander past niet bij haar woorden – 'alles is prima' zegt ze, terwijl ze wegkijkt en op haar nagels bijt. Je zegt: 'Ik zie dat je twijfelt – zit er meer achter?'",
    effect:
      "Je tovert het ongezegde naar boven: de ander voelt zich echt gezien en vertelt wat er werkelijk speelt. Of ze zegt 'nee hoor' – maar weet dan dat je goed oplet.",
    uitleg:
      "Uit het bronboek: als de lichaamstaal niet aansluit bij wat iemand zegt, zeg dan wat je signaleert. Niet interpreteren, benoemen: beschrijf wat je ziet en vraag door.",
  },
];

// ---------------------------------------------------------------
// Manieren bij de knop 'emoties / gevoelens'
// ---------------------------------------------------------------
const EMOTIEMANIEREN = [
  {
    id: 1,
    titel: "De doordraver",
    gedrag:
      "Je merkt dat de ander schrikt, stil valt of tranen wegpinkt – maar je praat gewoon door over de vervolgstappen van de procedure.",
    effect:
      "De emotie wordt genegeerd, niet opgelost. De ander hoort daarna geen woord meer: alles na het slechte nieuws komt binnen als ruis. Volgende keer komt ze liever niet meer.",
    uitleg:
      "De knop op 'uit': emoties benoemen of juist negeren kan een gesprek stoppen. Voorbijgaan aan een duidelijke emotie is nooit zakelijk – het is vermoeiend voor de relatie.",
  },
  {
    id: 2,
    titel: "De analyzeplank",
    gedrag:
      "Je benoemt de emotie wel, maar meteen met een verklaring: 'Je bent boos, dat is logisch, want de uitkomst valt je tegen. Maar kijk eens naar de mogelijkheden die er nog zijn…'",
    effect:
      "De erkenning staat er, maar de 'maar' veegt hem meteen van tafel. De ander voelt zich begrepen tot het moment dat je doorschuift naar je eigen punt.",
    uitleg:
      "Eerst erkenning, dán inhoud – en nooit in dezelfde zin. Laat de erkenning landen; de feiten komen vanzelf, de ander vraagt er vanzelf om.",
  },
  {
    id: 3,
    titel: "De emotie-etiketteerder",
    gedrag:
      "Je benoemt zakelijk wat je ziet en checkt: 'Ik zie dat dit je raakt – is het verdriet, of vooral boosheid?' Je wacht daadwerkelijk op het antwoord.",
    effect:
      "De ander hoeft haar eigen gevoel niet meer te verbergen en kan het plaatsen. Het benoemen trekt het gesprek vlot: de emotie krijgt een plek, zodat er weer naar de inhoud geluisterd kan worden.",
    uitleg:
      "Het etiket hoeft niet perfect te zijn – checken is de kracht. 'Klopt dat?' werkt beter dan een diagnose stellen.",
  },
  {
    id: 4,
    titel: "De ruimtegever",
    gedrag:
      "Je benoemt de emotie en geeft de keuze: 'Ik zie dat dit hard aankomt. Wil je even, of zullen we doorgaan?' Je accepteert beide antwoorden zonder haast te tonen.",
    effect:
      "De ander behoudt regie over haar eigen gesprek – dat is precies wat ze in een juridisch proces vaak mist. Na de stilte komt meestal de vraag: 'Oké, vertel maar wat de volgende stap is.'",
    uitleg:
      "Emoties kunnen een gesprek in een stroomversnelling brengen, maar alleen als er ruimte voor is. Zwijgen met aandacht is een vaardigheid, geen gemis.",
  },
  {
    id: 5,
    titel: "De eigen-huid-toonder",
    gedrag:
      "Je durft je eigen emotie te benoemen: 'Ik merk dat ik dit gesprek ook niet licht vind – ik had gehoopt dat de uitkomst anders zou zijn.'",
    effect:
      "Gelijkwaardigheid en vertrouwen groeien: de ander ziet een professional, geen procedure-automaat. Dit is 'het achterste van je tong laten zien' – met lef.",
    uitleg:
      "Uit het bronboek: als je echt lef hebt, laat je het achterste van je tong zien. Transparantie over eigen irritatie of ongemak maakt de interactie eerlijk – mits zakelijk en passend.",
  },
];

const MANIEREN_PER_KNOP = {
  uitpraten: INTERACTIEMANIEREN,
  luisteren: LUISTERMANIEREN,
  vragen: VRAGENMANIEREN,
  omgeving: OMGEVINGSMANIEREN,
  nonverbaal: NONVERBAALMANIEREN,
  emoties: EMOTIEMANIEREN,
};

// ---------------------------------------------------------------
// Gespreksstarters: 15 open vragen over het eigen leven (middercirkel)
// ---------------------------------------------------------------
const GESPREKSSTARTERS = [
  "Wat vind je tot nu toe het mooiste of verrassendste aan je opleiding?",
  "Als je een jaar helemaal vrij had en onbeperkt geld: wat zou je doen?",
  "Wat is het beste advies dat je ooit hebt gekregen – en van wie?",
  "Waar word jij, zonder dat je het gepland hebt, altijd blij van?",
  "Wat deed je als kind het liefst, en mis je dat nog?",
  "Als je overal ter wereld zou kunnen wonen: waar zou dat zijn, en waarom?",
  "Wat is het avontuurlijkste of gekste dat je ooit hebt gedaan?",
  "Wie bewonder jij het meest, en wat maakt die persoon bijzonder?",
  "Wat zou je doen als je zeker wist dat je niet kon falen?",
  "Welke song hoort op dit moment bij jouw leven, en waarom?",
  "Waar loop jij tegenaan dat anderen misschien klein vinden?",
  "Waar hoop je over tien jaar te staan, en wat doe je daar nu al voor?",
  "Welke plek in Nederland moet iedereen één keer gezien hebben, volgens jou?",
  "Wat is het leukste, vreemdste of meest leerzame bijbaantje dat je ooit hebt gehad of zou willen?",
  "Waar schaam jij je voor, terwijl dat eigenlijk nergens voor nodig is?",
];

// ---------------------------------------------------------------
// Het wiel als SVG
// ---------------------------------------------------------------
function Wiel({ actief, onSelect, onCenter }) {
  const segmenten = [
    ...KNOPPEN.map((k) => ({ id: k.id, naam: k.naam, kleur: k.kleur, knop: true })),
    ...ANDERE_TANDWIELEN.map((t, i) => ({ id: "t" + i, naam: t.naam, kleur: "#cbd5e1", knop: false })),
  ];
  return (
    <svg viewBox="0 0 400 400" className="w-full max-w-[420px] mx-auto">
      <circle cx="200" cy="200" r="150" fill="none" stroke="#e2e8f0" strokeWidth="2" />
      <g onClick={onCenter} style={{ cursor: "pointer" }}>
        <circle cx="200" cy="200" r="58" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
        <text x="200" y="192" textAnchor="middle" fill="#64748b" fontSize="10">
          DRAAI HET
        </text>
        <text x="200" y="204" textAnchor="middle" fill="#334155" fontSize="11" fontWeight="bold">
          GESPREKS-
        </text>
        <text x="200" y="216" textAnchor="middle" fill="#334155" fontSize="11" fontWeight="bold">
          WIEL
        </text>
        <text x="200" y="228" textAnchor="middle" fill="#2563eb" fontSize="8">
          klik voor starter
        </text>
      </g>
      {segmenten.map((s, i) => {
        const hoek = (i / segmenten.length) * 2 * Math.PI - Math.PI / 2;
        const x = 200 + 108 * Math.cos(hoek);
        const y = 200 + 108 * Math.sin(hoek);
        const isActief = actief === s.id;
        return (
          <g key={s.id} onClick={() => s.knop && onSelect(s.id)} style={{ cursor: s.knop ? "pointer" : "default" }}>
            <circle
              cx={x}
              cy={y}
              r={isActief ? 42 : 34}
              fill={s.knop ? s.kleur : "#cbd5e1"}
              opacity={s.knop ? (isActief ? 1 : 0.85) : 0.7}
              stroke={isActief ? "#0f172a" : "none"}
              strokeWidth="3"
            />
            {s.naam.split(" ").map((woord, j, arr) => (
              <text
                key={j}
                x={x}
                y={y + (j - (arr.length - 1) / 2) * 9 + 3}
                textAnchor="middle"
                fontSize={s.knop ? "9.5" : "8"}
                fill={s.knop ? "#fff" : "#475569"}
                fontWeight={s.knop ? "bold" : "normal"}
              >
                {woord}
              </text>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

// ---------------------------------------------------------------
// Oefenscherm per knop: knop-draai-schakelaar
// ---------------------------------------------------------------
function KnopPaneel({ knop, markeerBezocht }) {
  const [stand, setStand] = useState("uit"); // "uit" of "aan"
  React.useEffect(() => {
    markeerBezocht(knop.id);
    setStand("uit");
  }, [knop.id]);
  const isAan = stand === "aan";
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-block w-3 h-3 rounded-full" style={{ background: knop.kleur }} />
        <h3 className="text-lg font-bold">{knop.naam}</h3>
        <Badge variant="outline">Tandwiel: {knop.tandwiel}</Badge>
      </div>

      <Card className="border-l-4" style={{ borderLeftColor: knop.kleur }}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-slate-500">Startvraag</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="italic">"{knop.startvraag}"</p>
        </CardContent>
      </Card>

      <div className="rounded-lg border p-4 bg-slate-50">
        <p className="text-sm text-slate-600 mb-3">
          Draai aan de knop en zie wat er met het gesprek gebeurt. Vergelijk beide standen met je
          groepsgenoten in de oefening <strong>{knop.oefening}</strong>.
        </p>
        <div className="flex gap-2 mb-4">
          <Button variant={isAan ? "outline" : "default"} size="sm" onClick={() => setStand("uit")}>
            Knop laat los
          </Button>
          <Button
            variant={isAan ? "default" : "outline"}
            size="sm"
            style={isAan ? { background: knop.kleur } : {}}
            onClick={() => setStand("aan")}
          >
            Draai aan de knop
          </Button>
        </div>
        <div className="rounded-md p-3 text-white" style={{ background: isAan ? knop.kleur : "#475569" }}>
          <p className="font-semibold text-sm mb-1">{isAan ? "✅ Knop aan:" : "❌ Knop uit:"}</p>
          <p className="text-sm">{isAan ? knop.aan : knop.uit}</p>
        </div>
        <div className="mt-3 rounded-md p-3 bg-white border">
          <p className="font-semibold text-sm mb-1 text-slate-700">Wat gebeurt er?</p>
          <p className="text-sm text-slate-600">{isAan ? knop.gevolgAan : knop.gevolgUit}</p>
        </div>
      </div>

      {MANIEREN_PER_KNOP[knop.id] && (
        <InteractieTrekker
          manieren={MANIEREN_PER_KNOP[knop.id]}
          kleur={knop.kleur}
          knopnaam={knop.naam}
        />
      )}

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-slate-500">Juridische inkadering</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-700">{knop.juridisch}</p>
        </CardContent>
      </Card>
    </div>
  );
}

// ---------------------------------------------------------------
// Interactietrekker: elke druk toont 1 van de 5 interactiemanieren
// ---------------------------------------------------------------
function InteractieTrekker({ manieren, kleur, knopnaam }) {
  const [optie, setOptie] = useState(null);
  const [teller, setTeller] = useState(0);
  const trek = () => {
    let volgende = Math.floor(Math.random() * manieren.length);
    if (manieren.length > 1 && optie && manieren[volgende].id === optie.id) {
      volgende = (volgende + 1) % manieren.length;
    }
    setOptie(manieren[volgende]);
    setTeller((t) => t + 1);
  };
  return (
    <div className="rounded-lg border p-4 bg-slate-50">
      <p className="text-sm text-slate-600 mb-3">
        Druk op de knop en speel de manier die verschijnt in je tweegesprek. Er zijn vijf manieren
        rondom <strong>{knopnaam.toLowerCase()}</strong> – telkens verschijnt er één.
      </p>
      <Button onClick={trek}>🎲 Trek een manier</Button>
      {optie && (
        <div className="mt-4 rounded-md bg-white border p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="font-bold text-sm" style={{ color: kleur }}>
              {teller}. {optie.titel}
            </p>
            <Badge variant="outline">{optie.id}/5</Badge>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">Jouw gedrag</p>
            <p className="text-sm text-slate-700">{optie.gedrag}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">Wat gebeurt er met de ander?</p>
            <p className="text-sm text-slate-700">{optie.effect}</p>
          </div>
          <div className="rounded p-2 bg-slate-50">
            <p className="text-xs font-semibold text-slate-500 uppercase">Waarom dit werkt (of niet)</p>
            <p className="text-sm text-slate-600">{optie.uitleg}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------
// Knop-poker: trek een geheime knop-opdracht
// ---------------------------------------------------------------
function KnopPoker() {
  const [kaart, setKaart] = useState(null);
  const [verborgen, setVerborgen] = useState(true);
  const trek = () => {
    const k = KNOPPEN[Math.floor(Math.random() * KNOPPEN.length)];
    setKaart(k);
    setVerborgen(true);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Knop-poker: trek je geheime knop-opdracht</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-slate-600">
          Rolverdeling in een rollenspel van vier: iedereen krijgt in stilte één knop-opdracht. Voer
          het gesprek (bijv. twee zaakwaarnemers over een misgelopen deadline). Na afdeel legt de groep
          raden welke knop jij hebt gedraaid – en wanneer ze het merkten.
        </p>
        <Button onClick={trek}>🃏 Trek een kaart</Button>
        {kaart && (
          <div className="rounded-lg border p-4" style={{ borderColor: kaart.kleur }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 rounded-full" style={{ background: kaart.kleur }} />
              <span className="font-semibold text-sm">Knop: {kaart.naam}</span>
            </div>
            {verborgen ? (
              <Button variant="outline" size="sm" onClick={() => setVerborgen(false)}>
                Toon mijn geheime opdracht
              </Button>
            ) : (
              <p className="text-sm font-medium">{kaart.aan}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------
// Reflectie met zelfevaluatie per knop
// ---------------------------------------------------------------
function Reflectie({ selfscores, setSelfscores }) {
  const vragen = [
    "Hoe stapte ik in het gesprek?",
    "Wat deed ik goed? / Wat dacht ik, maar zei ik niet?",
    "Hoe sterk ervoer ik het contact op een schaal van 1–10?",
    "Welke knop draaide ik – en welke liet ik liggen?",
    "Wat doe ik de volgende keer anders?",
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reflectie: het gesprek met jezelf</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-3">
          <p className="text-sm font-medium text-slate-700">
            Hoe soepel draait elke knop bij jou? (1 = vastgeroest, 10 = soepel)
          </p>
          {KNOPPEN.map((k) => (
            <div key={k.id} className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: k.kleur }} />
              <span className="text-sm w-44 shrink-0">{k.naam}</span>
              <input
                type="range"
                min="1"
                max="10"
                value={selfscores[k.id] || 5}
                onChange={(e) => setSelfscores({ ...selfscores, [k.id]: Number(e.target.value) })}
                className="flex-1"
              />
              <span className="w-8 text-sm font-semibold text-right">{selfscores[k.id] || 5}</span>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-700">
            Schrijf je antwoorden uit in je portfolio:
          </p>
          {vragen.map((v) => (
            <div key={v} className="rounded-md border bg-white p-2 text-sm text-slate-600">
              {v}
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-400">
          Tip voor de docent: laat studenten hun scores en antwoorden indienen via de leeromgeving –
          zo ontstaat een dashboard waarin zichtbaar is wie aan welke knop nog moet werken.
        </p>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------
// Hoofdapp
// ---------------------------------------------------------------
export default function App() {
  const [actieveKnop, setActieveKnop] = useState(KNOPPEN[0].id);
  const [bezocht, setBezocht] = useState(new Set());
  const [selfscores, setSelfscores] = useState({});
  const [starter, setStarter] = useState(null);

  const trekStarter = () => {
    setStarter(GESPREKSSTARTERS[Math.floor(Math.random() * GESPREKSSTARTERS.length)]);
  };

  const knop = KNOPPEN.find((k) => k.id === actieveKnop);
  const markeerBezocht = (id) =>
    setBezocht((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });

  const voortgang = Math.round((bezocht.size / KNOPPEN.length) * 100);

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">Het Gesprekswiel – oefenapp</h1>
            <p className="text-sm text-slate-500">
              HBO-rechten, jaar 1 · naar Van den Berg &amp; Kanters (2018), <em>Gesprekken die werken</em>
            </p>
          </div>
          <div className="w-56">
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span>Knoppen geoefend</span>
              <span>
                {bezocht.size}/{KNOPPEN.length}
              </span>
            </div>
            <Progress value={voortgang} />
          </div>
        </header>

        <Tabs defaultValue="wiel" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
            <TabsTrigger value="wiel">🔄 Het wiel</TabsTrigger>
            <TabsTrigger value="oefen">🎯 Oefenscherm</TabsTrigger>
            <TabsTrigger value="spel">🃏 Knop-poker</TabsTrigger>
            <TabsTrigger value="reflectie">📋 Reflectie</TabsTrigger>
          </TabsList>

          <TabsContent value="wiel">
            <Card>
              <CardHeader>
                <CardTitle>Klik op een gekleurde knop om te oefenen</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-6 items-center">
                <Wiel
                  actief={actieveKnop}
                  onSelect={(id) => setActieveKnop(id)}
                  onCenter={trekStarter}
                />
                <div className="space-y-3">
                  <p className="text-sm text-slate-600">
                    Het gesprekswiel heeft acht tandwielen die er áltijd allemaal zijn: je kunt ze
                    onderscheiden, maar niet scheiden. In deze app oef je met zes knoppen. Draai je
                    eraan, dan verandert het hele gesprek.
                  </p>
                  <div className="space-y-2">
                    {KNOPPEN.map((k) => (
                      <button
                        key={k.id}
                        onClick={() => setActieveKnop(k.id)}
                        className={`w-full text-left rounded-lg border p-3 transition ${
                          actieveKnop === k.id
                            ? "border-slate-900 bg-white shadow"
                            : "border-slate-200 bg-white/60 hover:bg-white"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ background: k.kleur }}
                          />
                          <span className="font-medium text-sm">{k.naam}</span>
                          {bezocht.has(k.id) && <Badge variant="secondary">geoefend</Badge>}
                        </div>
                        <p className="text-xs text-slate-500 mt-1">{k.oefening}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>✨ Gespreksstarters uit het midden van het wiel</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-slate-600">
                  Klik op de cirkel in het midden van het wiel (of op de knop hieronder) en je krijgt
                  een willekeurige startvraag voor je oefengesprek. De ander moet vooral véél kunnen
                  vertellen – dan pas merk je wat uitpraten, luisteren en doorvragen doen.
                </p>
                <Button onClick={trekStarter}>✨ Trek een startvraag</Button>
                {starter && (
                  <div className="rounded-lg border-l-4 border-blue-600 bg-white p-4 shadow-sm">
                    <p className="text-xs font-semibold text-slate-500 uppercase mb-1">
                      Jullie startvraag
                    </p>
                    <p className="font-medium italic">"{starter}"</p>
                  </div>
                )}
                <div className="rounded-lg border bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-700 mb-2">
                    Alle 15 gespreksstarters:
                  </p>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-slate-600">
                    {GESPREKSSTARTERS.map((v, i) => (
                      <li key={i}>{v}</li>
                    ))}
                  </ol>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="oefen">
            <Card>
              <CardHeader>
                <CardTitle>Oefenscherm: {knop.naam}</CardTitle>
              </CardHeader>
              <CardContent>
                <KnopPaneel knop={knop} markeerBezocht={markeerBezocht} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="spel">
            <KnopPoker />
          </TabsContent>

          <TabsContent value="reflectie">
            <Reflectie selfscores={selfscores} setSelfscores={setSelfscores} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
