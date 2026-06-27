import type { Locale } from "@/i18n/config";

// All translatable UI copy. Contact *values* (phone, email, address) are NOT
// here — they live in `siteConfig` (env-driven). This file holds only labels
// and marketing copy, so the wording can be localised independently of data.

export interface Dictionary {
  meta: { title: string; description: string; keywords: string };
  nav: { home: string; coverage: string; fleet: string; contact: string; book: string };
  hero: {
    eyebrow: string;
    titleA: string;
    titleAccent: string;
    titleB: string;
    sub: string;
    book: string;
    secondary: string;
  };
  calc: {
    title: string; live: string; from: string; to: string; passengers: string;
    vehicle: string; returnLabel: string; estimate: string; distance: string;
    eta: string; seats: string; perMile: string; oneWay: string; returnW: string;
    book: string; booked: string; samePlace: string;
  };
  band: { title: string; sub: string };
  how: { kicker: string; title: string; sub: string };
  fleet: { kicker: string; title: string; sub: string; from: string };
  coverage: { kicker: string; title: string; sub: string };
  reviews: { kicker: string; title: string };
  cta: { title: string; sub: string; button: string };
  foot: { tagline: string; callUs: string; rightsReserved: string; licence: string };
  veh: Record<
    | "saloon" | "estate" | "mpv" | "executive"
    | "saloonDesc" | "estateDesc" | "mpvDesc" | "executiveDesc",
    string
  >;
  steps: { glyph: string; title: string; desc: string }[];
  reviewItems: { name: string; city: string; text: string }[];
  coverageStats: { num: string; label: string }[];
  heroStats: { num: string; label: string }[];
  footCols: { title: string; links: string[] }[];
  unit: { mi: string; hr: string; min: string; pax: string };
  contact: {
    kicker: string; title: string; sub: string; phoneLabel: string;
    emailLabel: string; officeLabel: string; hoursLabel: string; hours: string;
    formTitle: string; name: string; namePh: string; emailPh: string; msg: string;
    msgPh: string; send: string; sent: string;
  };
}

const en: Dictionary = {
  meta: {
    title: "Instant fixed-price taxis across Britain",
    description:
      "Apex Ride is a licensed UK private-hire operator. See a transparent, fixed fare before you ride — no surge, no surprises. Airport transfers and door-to-door travel nationwide.",
    keywords:
      "taxi, private hire, airport transfer, cab booking, fixed price taxi, UK taxi, executive cars, minicab",
  },
  nav: { home: "Home", coverage: "Areas we cover", fleet: "Fleet", contact: "Contact us", book: "Book now" },
  hero: { eyebrow: "Licensed across the UK", titleA: "Your fare,", titleAccent: "estimated instantly", titleB: ".", sub: "Pick up and drop off anywhere in Britain and see a transparent price before you ride — no surge, no surprises, just one clear number.", book: "Get my estimate", secondary: "View the fleet" },
  calc: { title: "Estimate your fare", live: "Live", from: "Pickup", to: "Drop-off", passengers: "Passengers", vehicle: "Vehicle", returnLabel: "Trip type", estimate: "Estimated fare", distance: "Distance", eta: "Est. time", seats: "seats", perMile: "/mi", oneWay: "One-way", returnW: "Return", book: "Book this ride", booked: "Ride requested — a driver is on the way", samePlace: "Pickup and drop-off must be different" },
  band: { title: "Britain, door to door.", sub: "City centres, suburbs and every major airport in between." },
  how: { kicker: "Simple", title: "Three taps to a fixed price", sub: "No accounts, no waiting on hold. Price your journey in seconds and ride with total confidence." },
  fleet: { kicker: "The fleet", title: "Choose your ride", sub: "From everyday saloons to chauffeur-grade executive travel — every car licensed and tracked.", from: "from" },
  coverage: { kicker: "Coverage", title: "We cover Britain", sub: "Door to door across major cities, towns and every UK airport — book a local hop or a cross-country run." },
  reviews: { kicker: "Reviews", title: "Riders love the ride" },
  cta: { title: "Ready when you are.", sub: "Get a fixed estimate now and have a licensed driver at your door in minutes.", button: "Estimate my fare" },
  foot: { tagline: "A licensed private-hire operator moving Britain, one fixed-price journey at a time.", callUs: "Call us, 24/7", rightsReserved: "All rights reserved.", licence: "Licensed PHV operator · UK" },
  veh: {
    saloon: "Saloon", estate: "Estate", mpv: "MPV", executive: "Executive",
    saloonDesc: "Comfortable everyday travel for up to four passengers with hand luggage.",
    estateDesc: "Extra boot space for the airport run — same seats, far more room for bags.",
    mpvDesc: "A six-seater for groups, families and the bigger nights out.",
    executiveDesc: "Premium saloons with a professional chauffeur for business and special occasions.",
  },
  steps: [
    { glyph: "➜", title: "Enter your route", desc: "Choose pickup and drop-off from any city, town or airport we serve." },
    { glyph: "£", title: "Get an instant price", desc: "See a clear, fixed estimate across every vehicle class at once." },
    { glyph: "✓", title: "Ride with confidence", desc: "A licensed driver arrives — you pay exactly the price you were shown." },
  ],
  reviewItems: [
    { name: "Aisha Rahman", city: "Birmingham", text: "Priced the airport run in seconds and it matched to the penny. The cleanest cab booking I have used." },
    { name: "Tom Whitfield", city: "Leeds", text: "No surge nonsense at 2am. The estimate was the price, the driver was early, and the car was spotless." },
    { name: "Priya Shah", city: "London", text: "I book the executive for client pickups every week. Reliable, professional and always on time." },
  ],
  coverageStats: [ { num: "120+", label: "Towns & cities" }, { num: "14", label: "UK airports" } ],
  heroStats: [ { num: "1.2M", label: "rides a year" }, { num: "4.9★", label: "average rating" }, { num: "24/7", label: "every day" } ],
  footCols: [
    { title: "Company", links: ["About us", "Careers", "Driver partners", "Contact"] },
    { title: "Services", links: ["Airport transfers", "Business accounts", "Events & groups", "Pre-book"] },
    { title: "Support", links: ["Help centre", "Lost property", "Terms", "Privacy"] },
  ],
  unit: { mi: "mi", hr: "h", min: "min", pax: "passengers" },
  contact: { kicker: "Contact", title: "Talk to a human, any hour", sub: "Our Manchester control room is staffed 24/7 — call, email, or send a message and we will reply within minutes.", phoneLabel: "Phone (24/7)", emailLabel: "Email", officeLabel: "Head office", hoursLabel: "Opening hours", hours: "Bookings 24/7 · Office Mon–Fri 9–6", formTitle: "Send us a message", name: "Your name", namePh: "Jane Smith", emailPh: "jane@email.com", msg: "Message", msgPh: "How can we help?", send: "Send message", sent: "Thanks — your message is on its way. We will reply shortly." },
};

const ar: Dictionary = {
  meta: {
    title: "سيارات أجرة بأسعار ثابتة فورية في جميع أنحاء بريطانيا",
    description:
      "أبكس رايد مشغّل نقل خاص مرخّص في المملكة المتحدة. اطّلع على سعر ثابت وواضح قبل أن تركب — بلا زيادات ولا مفاجآت. نقل المطارات والتنقل من الباب إلى الباب في جميع أنحاء البلاد.",
    keywords: "سيارة أجرة, نقل خاص, نقل المطار, حجز سيارة, سعر ثابت, تاكسي بريطانيا, سيارات فاخرة",
  },
  nav: { home: "الرئيسية", coverage: "مناطق الخدمة", fleet: "الأسطول", contact: "اتصل بنا", book: "احجز الآن" },
  hero: { eyebrow: "مرخّصة في جميع أنحاء المملكة المتحدة", titleA: "سعر رحلتك،", titleAccent: "يُحسب فورًا", titleB: ".", sub: "انطلق من أي مكان في بريطانيا وإليه، واطّلع على سعر واضح قبل أن تركب — بلا زيادات ولا مفاجآت، رقم واحد واضح فقط.", book: "احسب السعر", secondary: "تصفّح الأسطول" },
  calc: { title: "احسب سعر رحلتك", live: "مباشر", from: "نقطة الانطلاق", to: "الوجهة", passengers: "الركاب", vehicle: "السيارة", returnLabel: "نوع الرحلة", estimate: "السعر التقديري", distance: "المسافة", eta: "الوقت", seats: "مقاعد", perMile: "/ميل", oneWay: "ذهاب فقط", returnW: "ذهاب وعودة", book: "احجز هذه الرحلة", booked: "تم طلب الرحلة — السائق في الطريق إليك", samePlace: "يجب أن تختلف نقطة الانطلاق عن الوجهة" },
  band: { title: "بريطانيا، من الباب إلى الباب.", sub: "مراكز المدن والضواحي وكل مطار رئيسي بينها." },
  how: { kicker: "بسيط", title: "ثلاث نقرات إلى سعر ثابت", sub: "بلا حسابات وبلا انتظار. احسب رحلتك في ثوانٍ واركب بثقة تامة." },
  fleet: { kicker: "الأسطول", title: "اختر سيارتك", sub: "من سيارات السالون اليومية إلى الرحلات الفاخرة بسائق — كل سيارة مرخّصة ومتتبَّعة.", from: "يبدأ من" },
  coverage: { kicker: "التغطية", title: "نغطّي كل بريطانيا", sub: "من الباب إلى الباب عبر المدن والبلدات وجميع المطارات — رحلة قصيرة أو عبر البلاد." },
  reviews: { kicker: "التقييمات", title: "عملاؤنا يحبّون رحلاتهم" },
  cta: { title: "جاهزون متى كنت جاهزًا.", sub: "احصل على سعر ثابت الآن وسيصلك سائق مرخّص خلال دقائق.", button: "احسب سعر رحلتي" },
  foot: { tagline: "مشغّل نقل خاص مرخّص يحرّك بريطانيا، رحلة بسعر ثابت في كل مرة.", callUs: "اتصل بنا على مدار الساعة", rightsReserved: "جميع الحقوق محفوظة.", licence: "مشغّل نقل خاص مرخّص · المملكة المتحدة" },
  veh: {
    saloon: "سالون", estate: "ستيشن", mpv: "سيارة عائلية", executive: "فاخرة",
    saloonDesc: "تنقّل يومي مريح لما يصل إلى أربعة ركاب مع أمتعة يدوية.",
    estateDesc: "مساحة أمتعة إضافية لرحلة المطار — المقاعد نفسها وحيّز أكبر للحقائب.",
    mpvDesc: "ست مقاعد للمجموعات والعائلات والمناسبات الكبيرة.",
    executiveDesc: "سيارات سالون فاخرة بسائق محترف للأعمال والمناسبات الخاصة.",
  },
  steps: [
    { glyph: "➜", title: "أدخل وجهتك", desc: "اختر نقطتي الانطلاق والوصول من أي مدينة أو بلدة أو مطار نخدمه." },
    { glyph: "£", title: "احصل على سعر فوري", desc: "شاهد سعرًا واضحًا وثابتًا لكل فئات السيارات دفعة واحدة." },
    { glyph: "✓", title: "اركب بثقة", desc: "يصل سائق مرخّص وتدفع تمامًا السعر الذي رأيته." },
  ],
  reviewItems: [
    { name: "عائشة رحمان", city: "برمنغهام", text: "حسبت رحلة المطار في ثوانٍ وتطابق السعر تمامًا. أسهل حجز سيارة استخدمته." },
    { name: "توم ويتفيلد", city: "ليدز", text: "لا زيادات أسعار في الثانية صباحًا. السعر التقديري هو ما دفعته، والسائق وصل مبكرًا والسيارة نظيفة." },
    { name: "بريا شاه", city: "لندن", text: "أحجز الفئة الفاخرة لاستقبال العملاء أسبوعيًا. موثوقة ومحترفة ودائمًا في الموعد." },
  ],
  coverageStats: [ { num: "+١٢٠", label: "بلدة ومدينة" }, { num: "١٤", label: "مطارًا" } ],
  heroStats: [ { num: "١٫٢ مليون", label: "رحلة سنويًا" }, { num: "٤٫٩★", label: "متوسط التقييم" }, { num: "٢٤/٧", label: "كل يوم" } ],
  footCols: [
    { title: "الشركة", links: ["من نحن", "الوظائف", "شركاء القيادة", "تواصل معنا"] },
    { title: "الخدمات", links: ["نقل المطارات", "حسابات الأعمال", "الفعاليات والمجموعات", "الحجز المسبق"] },
    { title: "الدعم", links: ["مركز المساعدة", "المفقودات", "الشروط", "الخصوصية"] },
  ],
  unit: { mi: "ميل", hr: "س", min: "د", pax: "ركاب" },
  contact: { kicker: "تواصل", title: "تحدّث إلى إنسان في أي وقت", sub: "غرفة التحكم لدينا في مانشستر تعمل على مدار الساعة — اتصل أو راسلنا برسالة وسنرد خلال دقائق.", phoneLabel: "الهاتف (٢٤/٧)", emailLabel: "البريد الإلكتروني", officeLabel: "المكتب الرئيسي", hoursLabel: "ساعات العمل", hours: "الحجوزات ٢٤/٧ · المكتب الإثنين–الجمعة ٩–٦", formTitle: "أرسل لنا رسالة", name: "الاسم", namePh: "سارة أحمد", emailPh: "sara@email.com", msg: "الرسالة", msgPh: "كيف يمكننا المساعدة؟", send: "إرسال الرسالة", sent: "شكرًا — رسالتك في طريقها إلينا. سنرد قريبًا." },
};

const fr: Dictionary = {
  meta: {
    title: "Taxis à prix fixe instantané partout en Grande-Bretagne",
    description:
      "Apex Ride est un opérateur de transport privé agréé au Royaume-Uni. Voyez un tarif fixe et transparent avant de partir — sans majoration, sans surprise. Transferts aéroport et trajets de porte à porte.",
    keywords: "taxi, VTC, transfert aéroport, réservation taxi, prix fixe, taxi Royaume-Uni, voiture avec chauffeur",
  },
  nav: { home: "Accueil", coverage: "Zones desservies", fleet: "Flotte", contact: "Contact", book: "Réserver" },
  hero: { eyebrow: "Agréé dans tout le Royaume-Uni", titleA: "Votre tarif,", titleAccent: "estimé instantanément", titleB: ".", sub: "Montez et descendez partout en Grande-Bretagne et voyez un prix transparent avant de partir — sans majoration, sans surprise, un seul chiffre clair.", book: "Obtenir mon estimation", secondary: "Voir la flotte" },
  calc: { title: "Estimez votre tarif", live: "En direct", from: "Départ", to: "Arrivée", passengers: "Passagers", vehicle: "Véhicule", returnLabel: "Type de trajet", estimate: "Tarif estimé", distance: "Distance", eta: "Durée est.", seats: "places", perMile: "/mi", oneWay: "Aller simple", returnW: "Aller-retour", book: "Réserver ce trajet", booked: "Trajet demandé — un chauffeur arrive", samePlace: "Le départ et l’arrivée doivent être différents" },
  band: { title: "La Grande-Bretagne, de porte à porte.", sub: "Centres-villes, banlieues et chaque grand aéroport entre les deux." },
  how: { kicker: "Simple", title: "Trois clics vers un prix fixe", sub: "Sans compte, sans attente. Estimez votre trajet en quelques secondes et voyagez en toute confiance." },
  fleet: { kicker: "La flotte", title: "Choisissez votre véhicule", sub: "De la berline du quotidien au véhicule de prestige avec chauffeur — chaque voiture agréée et suivie.", from: "à partir de" },
  coverage: { kicker: "Zones desservies", title: "Nous couvrons la Grande-Bretagne", sub: "De porte à porte dans les grandes villes, les villages et tous les aéroports — d’un court trajet à une traversée du pays." },
  reviews: { kicker: "Avis", title: "Nos clients adorent" },
  cta: { title: "Prêts quand vous l’êtes.", sub: "Obtenez une estimation fixe maintenant et un chauffeur agréé à votre porte en quelques minutes.", button: "Estimer mon tarif" },
  foot: { tagline: "Un opérateur de transport privé agréé qui fait bouger la Grande-Bretagne, un trajet à prix fixe à la fois.", callUs: "Appelez-nous, 24h/24", rightsReserved: "Tous droits réservés.", licence: "Opérateur VTC agréé · R-U" },
  veh: {
    saloon: "Berline", estate: "Break", mpv: "Monospace", executive: "Affaires",
    saloonDesc: "Trajet quotidien confortable pour jusqu’à quatre passagers avec bagages à main.",
    estateDesc: "Coffre supplémentaire pour l’aéroport — mêmes places, bien plus de place pour les bagages.",
    mpvDesc: "Un six places pour les groupes, les familles et les grandes sorties.",
    executiveDesc: "Berlines haut de gamme avec chauffeur professionnel pour affaires et occasions spéciales.",
  },
  steps: [
    { glyph: "➜", title: "Saisissez votre trajet", desc: "Choisissez le départ et l’arrivée parmi les villes et aéroports desservis." },
    { glyph: "£", title: "Obtenez un prix instantané", desc: "Voyez une estimation claire et fixe pour chaque catégorie de véhicule." },
    { glyph: "✓", title: "Voyagez en confiance", desc: "Un chauffeur agréé arrive — vous payez exactement le prix affiché." },
  ],
  reviewItems: [
    { name: "Aisha Rahman", city: "Birmingham", text: "Estimé le trajet vers l’aéroport en quelques secondes, au centime près. La réservation la plus claire que j’ai utilisée." },
    { name: "Tom Whitfield", city: "Leeds", text: "Aucune majoration à 2h du matin. L’estimation était le prix, le chauffeur en avance, la voiture impeccable." },
    { name: "Priya Shah", city: "Londres", text: "Je réserve la berline Affaires pour mes clients chaque semaine. Fiable, professionnel et toujours à l’heure." },
  ],
  coverageStats: [ { num: "120+", label: "Villes et villages" }, { num: "14", label: "Aéroports" } ],
  heroStats: [ { num: "1,2 M", label: "trajets par an" }, { num: "4,9★", label: "note moyenne" }, { num: "24/7", label: "tous les jours" } ],
  footCols: [
    { title: "Société", links: ["À propos", "Carrières", "Chauffeurs partenaires", "Contact"] },
    { title: "Services", links: ["Transferts aéroport", "Comptes entreprise", "Événements & groupes", "Pré-réservation"] },
    { title: "Aide", links: ["Centre d’aide", "Objets trouvés", "Conditions", "Confidentialité"] },
  ],
  unit: { mi: "mi", hr: "h", min: "min", pax: "passagers" },
  contact: { kicker: "Contact", title: "Parlez à un humain, à toute heure", sub: "Notre centre de Manchester est ouvert 24h/24 — appelez, écrivez ou envoyez un message et nous répondons en quelques minutes.", phoneLabel: "Téléphone (24h/24)", emailLabel: "E-mail", officeLabel: "Siège", hoursLabel: "Horaires", hours: "Réservations 24h/24 · Bureau lun–ven 9h–18h", formTitle: "Envoyez-nous un message", name: "Votre nom", namePh: "Jeanne Dupont", emailPh: "jeanne@email.com", msg: "Message", msgPh: "Comment pouvons-nous aider ?", send: "Envoyer le message", sent: "Merci — votre message est parti. Nous répondrons sous peu." },
};

const de: Dictionary = {
  meta: {
    title: "Sofortige Festpreis-Taxis in ganz Großbritannien",
    description:
      "Apex Ride ist ein lizenzierter Mietwagenbetreiber im Vereinigten Königreich. Sehen Sie einen transparenten Festpreis vor der Fahrt — kein Aufschlag, keine Überraschungen. Flughafentransfers und Tür-zu-Tür-Fahrten landesweit.",
    keywords: "Taxi, Mietwagen, Flughafentransfer, Taxi buchen, Festpreis, Taxi Großbritannien, Chauffeur",
  },
  nav: { home: "Start", coverage: "Servicegebiete", fleet: "Flotte", contact: "Kontakt", book: "Buchen" },
  hero: { eyebrow: "Lizenziert in ganz Großbritannien", titleA: "Ihr Fahrpreis,", titleAccent: "sofort geschätzt", titleB: ".", sub: "Steigen Sie überall in Großbritannien ein und aus und sehen Sie einen transparenten Preis vor der Fahrt — kein Aufschlag, keine Überraschungen, nur eine klare Zahl.", book: "Preis schätzen", secondary: "Flotte ansehen" },
  calc: { title: "Schätzen Sie Ihren Preis", live: "Live", from: "Abholung", to: "Ziel", passengers: "Fahrgäste", vehicle: "Fahrzeug", returnLabel: "Fahrttyp", estimate: "Geschätzter Preis", distance: "Distanz", eta: "Dauer ca.", seats: "Sitze", perMile: "/mi", oneWay: "Einfache Fahrt", returnW: "Hin & zurück", book: "Diese Fahrt buchen", booked: "Fahrt angefragt — ein Fahrer ist unterwegs", samePlace: "Abholung und Ziel müssen unterschiedlich sein" },
  band: { title: "Großbritannien, von Tür zu Tür.", sub: "Stadtzentren, Vororte und jeder große Flughafen dazwischen." },
  how: { kicker: "Einfach", title: "Drei Tipps zum Festpreis", sub: "Kein Konto, keine Warteschleife. Schätzen Sie Ihre Fahrt in Sekunden und fahren Sie mit voller Sicherheit." },
  fleet: { kicker: "Die Flotte", title: "Wählen Sie Ihr Fahrzeug", sub: "Von der Alltagslimousine bis zur Chauffeur-Oberklasse — jedes Auto lizenziert und verfolgt.", from: "ab" },
  coverage: { kicker: "Servicegebiete", title: "Wir decken Großbritannien ab", sub: "Von Tür zu Tür in Großstädten, Orten und jedem Flughafen — von der kurzen Fahrt bis quer durchs Land." },
  reviews: { kicker: "Bewertungen", title: "Fahrgäste lieben die Fahrt" },
  cta: { title: "Bereit, wenn Sie es sind.", sub: "Holen Sie sich jetzt einen Festpreis und einen lizenzierten Fahrer in Minuten vor die Tür.", button: "Preis schätzen" },
  foot: { tagline: "Ein lizenzierter Mietwagenbetreiber, der Großbritannien bewegt — eine Festpreisfahrt nach der anderen.", callUs: "Rufen Sie uns an, rund um die Uhr", rightsReserved: "Alle Rechte vorbehalten.", licence: "Lizenzierter Mietwagenbetreiber · UK" },
  veh: {
    saloon: "Limousine", estate: "Kombi", mpv: "Van", executive: "Business",
    saloonDesc: "Komfortable Alltagsfahrt für bis zu vier Fahrgäste mit Handgepäck.",
    estateDesc: "Extra Kofferraum für die Flughafenfahrt — gleiche Sitze, viel mehr Platz für Gepäck.",
    mpvDesc: "Ein Sechssitzer für Gruppen, Familien und größere Abende.",
    executiveDesc: "Premium-Limousinen mit professionellem Chauffeur für Geschäft und besondere Anlässe.",
  },
  steps: [
    { glyph: "➜", title: "Route eingeben", desc: "Wählen Sie Abholung und Ziel aus jeder Stadt, jedem Ort oder Flughafen, den wir bedienen." },
    { glyph: "£", title: "Sofortpreis erhalten", desc: "Sehen Sie eine klare, feste Schätzung für jede Fahrzeugklasse auf einmal." },
    { glyph: "✓", title: "Sicher fahren", desc: "Ein lizenzierter Fahrer kommt — Sie zahlen genau den angezeigten Preis." },
  ],
  reviewItems: [
    { name: "Aisha Rahman", city: "Birmingham", text: "Die Flughafenfahrt in Sekunden geschätzt — auf den Penny genau. Die sauberste Buchung, die ich genutzt habe." },
    { name: "Tom Whitfield", city: "Leeds", text: "Kein Aufschlag-Unsinn um 2 Uhr nachts. Die Schätzung war der Preis, der Fahrer früh da, das Auto makellos." },
    { name: "Priya Shah", city: "London", text: "Ich buche jede Woche die Business-Klasse für Kundenabholungen. Zuverlässig, professionell und immer pünktlich." },
  ],
  coverageStats: [ { num: "120+", label: "Städte & Orte" }, { num: "14", label: "Flughäfen" } ],
  heroStats: [ { num: "1,2 Mio.", label: "Fahrten pro Jahr" }, { num: "4,9★", label: "Ø Bewertung" }, { num: "24/7", label: "jeden Tag" } ],
  footCols: [
    { title: "Unternehmen", links: ["Über uns", "Karriere", "Fahrerpartner", "Kontakt"] },
    { title: "Leistungen", links: ["Flughafentransfers", "Firmenkonten", "Events & Gruppen", "Vorbuchung"] },
    { title: "Support", links: ["Hilfecenter", "Fundsachen", "AGB", "Datenschutz"] },
  ],
  unit: { mi: "mi", hr: "Std", min: "Min", pax: "Fahrgäste" },
  contact: { kicker: "Kontakt", title: "Sprechen Sie mit einem Menschen — jederzeit", sub: "Unsere Leitstelle in Manchester ist rund um die Uhr besetzt — rufen Sie an, schreiben Sie eine E-Mail oder senden Sie eine Nachricht, wir antworten in Minuten.", phoneLabel: "Telefon (24/7)", emailLabel: "E-Mail", officeLabel: "Hauptsitz", hoursLabel: "Öffnungszeiten", hours: "Buchungen 24/7 · Büro Mo–Fr 9–18 Uhr", formTitle: "Senden Sie uns eine Nachricht", name: "Ihr Name", namePh: "Anna Müller", emailPh: "anna@email.com", msg: "Nachricht", msgPh: "Wie können wir helfen?", send: "Nachricht senden", sent: "Danke — Ihre Nachricht ist unterwegs. Wir antworten in Kürze." },
};

export const dictionaries: Record<Locale, Dictionary> = { en, fr, de, ar };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}
