const categories = [
  { id: "league", label: "由ш렇?ㅻ툕?덉쟾?? },
  { id: "valorant", label: "諛쒕줈??? },
  { id: "academy", label: "?뚯뒪?? },
];

const API_BASE_URL = "https://lucid-chzzk-auth.onrender.com";
const ADMIN_TOKEN_KEY = "coach-admin-token";
const THEME_KEY = "coach-theme";
const RESERVATION_STATUSES = ["?좉퇋", "?곷떞以?, "?덉빟?뺤젙", "?꾨즺", "痍⑥냼"];
const COACH_API_TIMEOUT_MS = 6500;

const filterSets = {
  league: {
    type: [
      { id: "all", label: "?꾩껜" },
      { id: "value", label: "媛?깅퉬 由ы뵆?덉씠" },
      { id: "low", label: "?낅Ц/??곗뼱" },
      { id: "high", label: "怨좏떚???꾨줈吏留? },
      { id: "team", label: "?寃뚯엫/?ㅽ겕由? },
    ],
    segment: [
      { id: "all", label: "?꾩껜 ?쇱씤" },
      { id: "top", label: "?? },
      { id: "mid", label: "誘몃뱶" },
      { id: "jungle", label: "?뺢?" },
      { id: "adc", label: "?먮뵜" },
      { id: "support", label: "?쒗뤏" },
    ],
  },
  valorant: {
    type: [
      { id: "all", label: "?꾩껜" },
      { id: "value", label: "媛?깅퉬 由ы뵆?덉씠" },
      { id: "low", label: "?낅Ц/??곗뼱" },
      { id: "high", label: "怨좏떚???꾨줈吏留? },
      { id: "team", label: "?寃뚯엫/?ㅽ겕由? },
    ],
    segment: [
      { id: "all", label: "?꾩껜 ??븷" },
      { id: "duelist", label: "?寃⑸?" },
      { id: "controller", label: "?꾨왂媛" },
      { id: "initiator", label: "泥숉썑?" },
      { id: "sentinel", label: "媛먯떆?? },
      { id: "aim", label: "?먯엫/?쇳궧" },
    ],
  },
  academy: {
    type: [
      { id: "all", label: "?꾩껜" },
      { id: "entry", label: "?낅Ц" },
      { id: "curriculum", label: "而ㅻ━?섎읆" },
      { id: "branding", label: "釉뚮옖?? },
    ],
    segment: [
      { id: "all", label: "?꾩껜 怨쇱젙" },
      { id: "coach-basic", label: "湲곗큹 怨쇱젙" },
      { id: "coach-advanced", label: "?ы솕 怨쇱젙" },
      { id: "operation", label: "?댁쁺/愿由? },
    ],
  },
};

const purposes = Object.values(filterSets).flatMap((set) => [...set.type, ...set.segment]).filter(
  (item, index, array) => item.id !== "all" && array.findIndex((candidate) => candidate.id === item.id) === index
);

const adminLineOptions = {
  league: ["??, "誘몃뱶", "?뺢?", "?먮뵜", "?쒗뤏"],
  valorant: ["?寃⑸?", "泥숉썑?", "媛먯떆??, "?꾨왂媛"],
  academy: ["湲곗큹 怨쇱젙", "?ы솕 怨쇱젙", "?댁쁺/愿由?],
};

const adminFieldOptions = {
  league: ["?댁쁺", "?쇱씤??, "?쒗?", "?ㅻ툕?앺듃", "?쒖빞", "怨좏떚??],
  valorant: ["?먯엫", "?쇳궧", "?뷀듃由?, "?ㅽ겕由?, "由ы뵆?덉씠", "? ?쇰뱶諛?],
  academy: ["肄붿튂 ?낅Ц", "而ㅻ━?섎읆", "?쇰뱶諛?, "釉뚮옖??, "?댁쁺", "?섍컯??愿由?],
};

const priceUnits = {
  time: ["30遺?, "1?쒓컙", "1.5?쒓컙", "2?쒓컙"],
  game: ["1寃뚯엫", "2寃뚯엫", "3寃뚯엫"],
};

const badgeOptions = ["?좊쾭?쒕뜑", "理쒖슦??, "?곗닔", "異붿쿇", "?쇰컲", "?媛 ?낅Ц", "?낅Ц 異붿쿇", "由щ럭 ?곗닔", "? ?쇰뱶諛?媛??];

const text = {
  navMarket: "媛뺤쓽 紐⑸줉",
  navBookings: "?덉빟 愿由?,
  navAdmin: "肄붿튂 愿由?,
  navCoachSelf: "肄붿튂 媛쒖씤 愿由?,
  sideLabel: "?덉빟 ?덈궡",
  sideCopy: "肄붿튂 紐⑸줉?먯꽌 ?먰븯???곹뭹??怨좊Ⅴ硫??곸꽭 ?뺣낫? ?덉빟 ?좎껌??諛붾줈 ?대┰?덈떎.",
  heroEyebrow: "LoL 由ы뵆?덉씠 遺꾩꽍 쨌 ?쇱씤??援먯젙 쨌 ? ?쇰뱶諛?,
  heroTitle: "LoL 肄붿묶 ?뚮옯??,
  metricCoachesLabel: "媛뺤쓽",
  metricBookingsLabel: "?덉빟",
  metricRatingLabel: "?됱젏",
  searchLabel: "寃??,
  searchPlaceholder: "肄붿튂紐? ?쇱씤, 梨뷀뵾?? 媛뺤쓽紐?,
  bookingEyebrow: "愿由ъ옄 ?붾㈃",
  bookingTitle: "?덉빟 ?좎껌 紐⑸줉",
  clearBookingsBtn: "?덉빟 ?덈줈怨좎묠",
  thStatus: "?곹깭",
  thStudent: "?섍컯??,
  thLesson: "媛뺤쓽",
  thTime: "?щ쭩 ?쒓컙",
  thContact: "?곕씫泥?,
  thMemo: "硫붾え",
  adminEyebrow: "濡쒖뺄 ?몄쭛",
  adminTitle: "肄붿튂/媛뺤쓽 愿由?,
  resetCoachesBtn: "媛뺤쓽 ?섑뵆 珥덇린??,
  labelCategory: "移댄뀒怨좊━",
  labelName: "肄붿튂紐?,
  labelTagline: "??以??뚭컻",
  labelPurpose: "遺꾨쪟",
  labelRoles: "?꾨Ц 遺꾩빞",
  labelPrice: "媛寃?,
  labelImage: "?대?吏 寃쎈줈",
  labelImagePosition: "?대?吏 ?꾩튂",
  labelBadges: "諛곗?",
  labelBio: "?곸꽭 ?ㅻ챸",
  optLeague: "由ш렇?ㅻ툕?덉쟾??,
  optValorant: "諛쒕줈???,
  optAcademy: "?뚯뒪??,
  saveCoachBtn: "???,
  newCoachBtn: "??媛뺤쓽",
  deleteCoachBtn: "??젣",
  bookingStudentLabel: "?섍컯???대쫫",
  bookingContactLabel: "Riot ID / Discord",
  bookingTimeLabel: "?щ쭩 ?쒓컙",
  bookingMemoLabel: "?붿껌?ы빆",
  bookingSubmitBtn: "?덉빟 ?좎껌",
  featuredTitle: "異붿쿇 肄붿묶 ?곹뭹",
  featuredHint: "?꾧린? ?ъ삁?쎈쪧??醫뗭? 媛뺤쓽",
  expertTitle: "肄붿묶 ?곹뭹 李얘린",
  expertHint: "?ъ??? ?곗뼱, ?寃뚯엫 湲곗??쇰줈 怨⑤씪蹂댁꽭??",
};

const samples = [
  {
    id: "lol-1",
    category: "league",
    name: "?섎Ⅴ?뚮굹 肄붿튂",
    tier: "理쒖슦??,
    tagline: "???쇱씤??二쇰룄沅? ?⑥씠釉?愿由? ?ъ씠???댁쁺 ?ㅺ퀎",
    purpose: ["top", "high"],
    roles: ["??, "?댁쁺", "怨좏떚??],
    price: "70,000??/ 1?쒓컙",
    image: "assets/personacoach.png",
    imagePosition: "center 8%",
    badges: ["理쒖슦??, "異붿쿇"],
    rating: 4.9,
    lessons: 248,
    bio: "???쇱씤?꾩쓽 ?쒓탳 ??대컢, ?⑥씠釉?怨좎젙怨??몄돩 ?좏깮, ?ъ씠???댁쁺 ?꾪솚源뚯? 由ы뵆?덉씠 湲곗??쇰줈 ?뺣━?댁＜??1:1 肄붿묶?낅땲??",
    reviews: [
      ["由ъ“??, "?쇱씤?꾩뿉????怨꾩냽 ?먰빐蹂대뒗吏 泥섏쓬?쇰줈 ?댄빐?덉뼱?? ?ㅼ쓬 ?먮???CS媛 ???섏뿀?듬땲??"],
      ["遊?, "?곷? ?뺢? ?꾩튂瑜?洹쇨굅濡??뚮젅?댄븯??踰뺤쓣 諛곗썙??寃뚯엫?????붾뱾?몄뒿?덈떎."],
    ],
  },
  {
    id: "lol-2",
    category: "league",
    name: "Lucid Macro",
    tier: "理쒖슦??,
    tagline: "? 寃뚯엫 愿?먯쓽 以묓썑諛??댁쁺, ?ㅻ뜑, ?쒖빞 而⑦듃濡?,
    purpose: ["team", "high"],
    roles: ["?뺢?", "?쒗뤏", "?댁쁺"],
    price: "75,000??/ 1?쒓컙",
    image: "assets/KakaoTalk_20250810_005153132_04.jpg",
    imagePosition: "center 8%",
    badges: ["理쒖슦??, "異붿쿇"],
    rating: 5.0,
    lessons: 212,
    bio: "?붾옲怨??댁쟾 由ы뵆?덉씠瑜??④퍡 蹂대ŉ ?쒖빞 ?μ븙, ?ㅻ툕?앺듃 ??以鍮? ?ъ씠???뺣컯, 肄??곗꽑?쒖쐞瑜??뺣━?⑸땲??",
    reviews: [
      ["?ъ씠?덉뒪??, "蹂듦린?섎㈃???쒓? 留듭쓣 嫄곗쓽 ??蹂닿퀬 ?덉뿀?ㅻ뒗 嫄?源⑤떖?섏뼱??"],
      ["硫붾줎", "???닿린??寃뚯엫??援대━吏 紐삵뻽?붿? ?먮쫫 ?⑥쐞濡??ㅻ챸?댁쨾??醫뗭븯?듬땲??"],
    ],
  },
  {
    id: "lol-3",
    category: "league",
    name: "誘몃Ⅴ 肄붿튂",
    tier: "?곗닔",
    tagline: "?뺢? 泥??숈꽑, 媛???대컢, ?ㅻ툕?앺듃 ?먮떒 吏묒쨷 肄붿묶",
    purpose: ["jungle", "low"],
    roles: ["?뺢?", "?숈꽑", "?ㅻ툕?앺듃"],
    price: "45,000??/ 1?쒓컙",
    image: "assets/mireucoach.png",
    imagePosition: "center 8%",
    badges: ["?곗닔", "異붿쿇"],
    rating: 4.7,
    lessons: 121,
    bio: "泥?諛뷀??댄썑 ?댁씠 ?щ씪吏???뺢??щ? ?꾪빐 ?쇱씤 ?곹깭, 罹좏봽 由ъ젨, ?ㅻ툕?앺듃 ??대컢??湲곗??쇰줈 紐⑹쟻 ?덈뒗 ?숈꽑???≪븘以띾땲??",
    reviews: [
      ["?띾낫?쒕쾭", "留ㅻ쾲 媛먯쑝濡??섎뜕 嫄?湲곗??쇰줈 諛붽씀?덇퉴 寃뚯엫?????붾뱾?몄뒿?덈떎."],
      ["寃뚯뒪??, "?댁쟾 由ы뵆?덉씠濡??ㅻ챸?댁쨾???댄빐媛 鍮⑤옄?댁슂."],
    ],
  },
  {
    id: "lol-4",
    category: "league",
    name: "Luna Mid Lab",
    tier: "?곗닔",
    tagline: "誘몃뱶 硫붿씠吏 ?쇱씤?? 濡쒕컢 ??대컢, ?쒖빞 ?ㅺ퀎",
    purpose: ["mid", "high"],
    roles: ["誘몃뱶", "硫붿씠吏", "濡쒕컢"],
    price: "42,000??/ 1?쒓컙",
    image: "assets/KakaoTalk_20250810_005153132_06.jpg",
    imagePosition: "center 8%",
    badges: ["?곗닔", "異붿쿇"],
    rating: 4.8,
    lessons: 136,
    bio: "梨뷀뵾???숇젴?꾨낫??癒쇱? ?≪븘????誘몃땲留??쒖꽑, ???ъ슜, 洹????대컢??以묒떖?쇰줈 ?쇰뱶諛깊빀?덈떎.",
    reviews: [
      ["?뚯뒪??, "移쒖젅?쒕뜲 ?듭떖? ?뺥솗?댁꽌 留뚯”?덉뒿?덈떎."],
      ["誘몃뱶?곗뒿以?, "?쇱씤??諛?댁빞 ???뚯? 諛쏆븘?????뚭? 援щ텇?먯뼱??"],
    ],
  },
  {
    id: "lol-5",
    category: "league",
    name: "硫뷀뵾 肄붿튂",
    tier: "?곗닔",
    tagline: "?먮뵜/?쒗뤏 諛뷀? ?쇱씤?꾧낵 2:2 援먯쟾 ?ㅺ퀎",
    purpose: ["adc", "support", "team"],
    roles: ["?먮뵜", "?쒗뤏", "???],
    price: "48,000??/ 1?쒓컙",
    image: "assets/mephicoach.png",
    imagePosition: "72% 12%",
    badges: ["?곗닔", "異붿쿇"],
    rating: 4.8,
    lessons: 103,
    bio: "諛뷀? 議고빀蹂?1?덈꺼 ?댁쁺, ?쇱씤 二쇰룄沅?援먰솚, ?먮뵜怨??쒗뤏??援먯쟾 媛곸쓣 ?ㅼ젣 由ы뵆?덉씠濡??뺣━?⑸땲??",
    reviews: [
      ["?덈꼍諛?, "?섏씠 留먯씠 ??留욎븘??吏???먯씠 以꾩뿀?듬땲??"],
      ["誘쇳듃", "?쒗뤏 ?숈꽑???먮뵜 ?깆옣???쇰쭏???곗? 泥닿컧?덉뼱??"],
    ],
  },
  {
    id: "lol-6",
    category: "league",
    name: "???쇱씤??30遺?吏꾨떒",
    tier: "?쇰컲",
    tagline: "??寃쎄린留?蹂닿퀬 ?쇱씤???먰빐 ?먯씤 3媛吏瑜?吏싳뼱二쇰뒗 ?낅Ц ?곹뭹",
    purpose: ["value", "top", "low"],
    roles: ["?媛 ?낅Ц", "??, "?쇱씤??],
    price: "9,900??/ 30遺?,
    image: "assets/personacoach.png",
    imagePosition: "center 8%",
    badges: ["?媛 ?낅Ц"],
    rating: 4.5,
    lessons: 61,
    bio: "遺???놁씠 ?쒖옉?????덈뒗 吏㏃? 吏꾨떒 ?곹뭹?낅땲?? ??寃쎄린 由ы뵆?덉씠瑜?湲곗??쇰줈 ?⑥씠釉? ?쒓탳 ??대컢, 媛??뚰뵾 ???以?媛???먰빐媛 ??3媛吏瑜??뺣━?⑸땲??",
    reviews: [
      ["?묒쑀?", "臾댁옉???몄슦???듦???怨좎낀?듬땲??"],
      ["?섎Ⅴ?곗뒿", "?곸꽦 ?ㅻ챸???ъ썙??醫뗭븯?댁슂."],
    ],
  },
  {
    id: "lol-7",
    category: "league",
    name: "?쒗뤏 ?쒖빞 ?낅Ц 泥댄겕",
    tier: "?쇰컲",
    tagline: "????꾩튂蹂대떎 癒쇱? ?≪븘?????쒖빞 ??대컢 鍮좊Ⅸ ?먭?",
    purpose: ["value", "support", "low"],
    roles: ["?媛 ?낅Ц", "?쒗뤏", "?쒖빞"],
    price: "12,000??/ 30遺?,
    image: "assets/mephicoach.png",
    imagePosition: "center 8%",
    badges: ["?媛 ?낅Ц"],
    rating: 4.4,
    lessons: 54,
    bio: "??쒕? ?대뵒??諛뺣뒗吏蹂대떎 ??洹???대컢???吏곸씠?붿?瑜?癒쇱? ?≪븘二쇰뒗 ?낅Ц 肄붿묶?낅땲??",
    reviews: [
      ["?쒗뤏泥섏쓬", "誘몃뱶 濡쒕컢 ??대컢??泥섏쓬 ?뚯븯?듬땲??"],
      ["遊?, "?쒖빞 ?먯닔媛 ?꾨땲???섎? ?덈뒗 ?쒖빞瑜?諛곗썱?댁슂."],
    ],
  },
  {
    id: "lol-8",
    category: "league",
    name: "?먮뵜 ?쒗? ?앹〈 ?대━??,
    tier: "?쇰컲",
    tagline: "二쎈뒗 ?쒗? ?λ㈃留?怨⑤씪 ?ъ????듦???怨좎튂???媛 ?곹뭹",
    purpose: ["value", "adc", "low"],
    roles: ["?媛 ?낅Ц", "?먮뵜", "?쒗?"],
    price: "14,900??/ 30遺?,
    image: "assets/mephicoach.png",
    imagePosition: "center 8%",
    badges: ["?媛 ?낅Ц"],
    rating: 4.6,
    lessons: 72,
    bio: "二쎌? ?딄퀬 ?쒗븯???꾩튂, ?욌씪??嫄곕━ ?좎?, ?ㅽ렆 泥댄겕, ?쒗? ???湲??꾩튂瑜?以묒떖?쇰줈 遊낅땲??",
    reviews: [
      ["?먮뵜?곗뒿", "?욌Т鍮숉븯??二쎈뒗 ?λ㈃???뺥솗??吏싳뼱以ъ뒿?덈떎."],
      ["?ㅻ쾭?덉텧", "?쒗? ?꾩뿉 ?쒕뒗 ?꾩튂媛 諛붾뚮땲源??쒕웾???щ옄?댁슂."],
    ],
  },
  {
    id: "lol-9",
    category: "league",
    name: "梨뷀뵾?명룺 20遺??곷떞",
    tier: "?쇰컲",
    tagline: "OP.GG? ?뚮젅???깊뼢 湲곗??쇰줈 ?곗뒿 梨뷀뵾??2~3媛?異붿쿇",
    purpose: ["value", "aim", "low"],
    roles: ["?媛 ?낅Ц", "梨뷀뵾?명룺", "?붾옲"],
    price: "7,900??/ 20遺?,
    image: "assets/KakaoTalk_20250810_005153132_06.jpg",
    imagePosition: "center 8%",
    badges: ["?媛 ?낅Ц"],
    rating: 4.3,
    lessons: 39,
    bio: "?꾩옱 ?곗뼱, ?좏샇 ?뚮젅?? ?쇱씤蹂??쎌젏??蹂닿퀬 臾대━ ?놁씠 ?곗뒿 媛?ν븳 梨뷀뵾??2~3媛쒕? 異붿쿇?⑸땲??",
    reviews: [
      ["梨뷀봽怨좊?", "愿쒗엳 ?대젮??梨뷀봽留??↔퀬 ?덉뿀?ㅻ뒗 嫄??뚯븯?댁슂."],
      ["?낅Ц??, "?곗뒿 ?쒖꽌媛 ?앷꺼????겕媛 ??臾댁꽌?뚯죱?듬땲??"],
    ],
  },
  {
    id: "lol-10",
    category: "league",
    name: "Replay Quick Check",
    tier: "?쇰컲",
    tagline: "吏㏃? 由ы뵆?덉씠 吏꾨떒怨?諛붾줈 怨좎튌 3媛吏 怨쇱젣",
    purpose: ["value", "low"],
    roles: ["由ы뵆?덉씠", "?쇰뱶諛?, "?낅Ц"],
    price: "9,900??/ 30遺?,
    image: "assets/mephicoach.png",
    imagePosition: "72% 12%",
    badges: ["?媛 ?낅Ц"],
    rating: 4.5,
    lessons: 84,
    bio: "??寃쎄린 由ы뵆?덉씠瑜?鍮좊Ⅴ寃?蹂대ŉ 媛???먰빐媛 ???듦? 3媛쒖? ?ㅼ쓬 ?먯뿉??諛붾줈 ?대낵 怨쇱젣瑜??④퉩?덈떎.",
    reviews: [
      ["寃뚯뒪??, "吏㏐쾶 遊ㅻ뒗?곕룄 怨좎튌 寃?紐낇솗?덉뒿?덈떎."],
      ["??겕?꾩궗", "媛寃?遺???놁씠 ?먭?諛쏄린 醫뗭븘??"],
    ],
  },
  {
    id: "val-1",
    category: "valorant",
    name: "Astra Aim Room",
    tagline: "?먯엫 猷⑦떞怨??쇳궧 ?듦? 援먯젙",
    purpose: ["value", "low"],
    roles: ["?먯엫", "?쇳궧", "媛먮룄"],
    price: "32,000??/ 1?쒓컙",
    image: "assets/KakaoTalk_20250810_005153132_06.jpg",
    imagePosition: "center 8%",
    badges: ["?낅Ц 異붿쿇", "由щ럭 ?곗닔"],
    rating: 4.8,
    lessons: 88,
    bio: "?곗뒪留ㅼ튂留?留롮씠 ?섎뒗 諛⑹떇?먯꽌 踰쀬뼱?? ?ㅼ젣 ??겕?먯꽌 ?섏삤??援먯쟾 媛곷룄? ?щ줈?ㅽ뿤???꾩튂瑜?怨좎묩?덈떎.",
    reviews: [
      ["?덈꼍諛?, "媛먮룄遺???덈젴 猷⑦떞源뚯? ??踰덉뿉 ?뺣━?쇱꽌 醫뗭븯?댁슂."],
      ["誘쇳듃", "??癒쇱? ?섍퀬??吏?붿? ?뺥솗??吏싳뼱以ъ뒿?덈떎."],
    ],
  },
  {
    id: "val-2",
    category: "valorant",
    name: "Duelist Clinic",
    tagline: "?뷀듃由???대컢, ?ㅽ궗 ?곌퀎, ?ъ씠??吏꾩엯",
    purpose: ["team", "duelist"],
    roles: ["??쇰━?ㅽ듃", "?뷀듃由?, "?ㅽ겕由?],
    price: "38,000??/ 1?쒓컙",
    image: "assets/KakaoTalk_20250810_005153132_17.jpg",
    imagePosition: "72% 12%",
    badges: ["? ?쇰뱶諛?媛??],
    rating: 4.6,
    lessons: 73,
    bio: "?쇱옄 ?ㅼ뼱媛??二쎈뒗 吏꾩엯??????곕씪?????덈뒗 吏꾩엯?쇰줈 諛붽씀????吏묒쨷?⑸땲??",
    reviews: [
      ["?뚮옒李띿옄", "吏꾩엯 ??대컢?대옉 肄쒖쓣 媛숈씠 遊먯쨾??? 寃뚯엫???ъ썙議뚯뼱??"],
      ["彛?, "怨듦꺽 ?쇱슫?쒓? ?듬떟?덈뒗???좏깮吏媛 ?앷꼈?듬땲??"],
    ],
  },
  {
    id: "academy-1",
    category: "academy",
    name: "?좉퇋 肄붿튂 踰좎씠吏?4二?,
    tagline: "肄붿묶 吏꾪뻾踰? 由ы뵆?덉씠 遺꾩꽍, ?섍컯??愿由?,
    purpose: ["entry", "curriculum", "coach-basic"],
    roles: ["肄붿튂 ?낅Ц", "而ㅻ━?섎읆", "?쇰뱶諛?],
    price: "300,000??/ 4二?,
    image: "assets/KakaoTalk_20250810_005153132_01.jpg",
    imagePosition: "center 8%",
    badges: ["?섎즺 諛곗?", "?뚮옯???낆젏 ?곌퀎"],
    rating: 4.9,
    lessons: 42,
    bio: "寃뚯엫???섑븯???щ엺???ㅼ젣濡??덉쓣 諛쏄퀬 媛瑜댁튌 ???덈뒗 肄붿튂濡?留뚮뱶??湲곗큹 怨쇱젙?낅땲??",
    reviews: [
      ["?섎즺??A", "留먮줈 ?ㅻ챸?섎뒗 踰뺤쓣 諛곗슦?덇퉴 肄붿묶???⑥뵮 ?덉젙?먯뒿?덈떎."],
      ["?섎즺??B", "?쇰뱶諛??쒗뵆由우씠 ?덉뼱??泥??좊즺 媛뺤쓽源뚯? 諛붾줈 ?댁뼱議뚯뼱??"],
    ],
  },
  {
    id: "academy-2",
    category: "academy",
    name: "?곗닔 肄붿튂 ?꾪솚諛?,
    tagline: "?꾧린 愿由? ?곹뭹?? ?κ린 ?섍컯 ?ㅺ퀎",
    purpose: ["branding", "coach-advanced", "operation"],
    roles: ["怨좉툒諛?, "釉뚮옖??, "?댁쁺"],
    price: "180,000??/ 2二?,
    image: "assets/lollogo.png",
    imagePosition: "center center",
    badges: ["?섏닔猷?媛먮㈃ ?꾨낫"],
    rating: 4.7,
    lessons: 26,
    bio: "媛뺤쓽 ?④?瑜??щ━怨?諛섎났 ?덉빟??留뚮뱾湲??꾪븳 ?곷떞 諛⑹떇怨??⑦궎吏 援ъ꽦???ㅻ９?덈떎.",
    reviews: [
      ["肄붿튂K", "媛뺤쓽 ?뚭컻瑜?諛붽엥?붾땲 臾몄쓽媛 ??援ъ껜?곸쑝濡??ㅼ뼱?붿뒿?덈떎."],
      ["肄붿튂M", "?꾧린 ?붿껌 諛⑹떇 ?섎굹留?諛붽퓭??李⑥씠媛 而몄뼱??"],
    ],
  },
];

const bookingSamples = [
  {
    status: "?좉퇋",
    student: "由ъ“??KR1",
    lesson: "Coach Shineast",
    time: "8/10 21:00",
    contact: "discord: risotto",
    memo: "???쇱씤??蹂듦린? 梨뷀봽???곷떞",
  },
  {
    status: "?곷떞以?,
    student: "?뚯뒪???뚯뒪??,
    lesson: "?좉퇋 肄붿튂 踰좎씠吏?4二?,
    time: "8/12 20:00",
    contact: "discord: testcoach",
    memo: "肄붿튂 ?깅줉 ?꾩뿉 而ㅻ━?섎읆??蹂닿퀬 ?띠쓬",
  },
];

const imageMigration = {
  "../assets/champions/Aatrox.png": "assets/KakaoTalk_20250810_005153132_05.jpg",
  "../assets/champions/Ahri.png": "assets/KakaoTalk_20250810_005153132_04.jpg",
  "../assets/champions/LeeSin.png": "assets/KakaoTalk_20250810_005153132_11.jpg",
  "../assets/champions/Caitlyn.png": "assets/KakaoTalk_20250810_005153132_06.jpg",
  "../assets/champions/Zed.png": "assets/KakaoTalk_20250810_005153132_17.jpg",
  "../assets/champions/Lux.png": "assets/lollogo.png",
  "../assets/emojis/misc/lollogo.png": "assets/lollogo.png",
};

const tierRank = { "?좊쾭?쒕뜑": 0, "理쒖슦??: 1, "?곗닔": 2, "?쇰컲": 3 };

const leagueCoachProfiles = {
  shineast: {
    name: "?ㅼ씠?덉뒪??肄붿튂",
    tier: "理쒖슦??,
    tagline: "?꾨줈? 異쒖떊 쨌 ???쇱씤 ?쇰뱶諛?쨌 ?寃뚯엫 ?댁쁺源뚯? 媛??,
    roles: ["???쇱씤", "?寃뚯엫", "?댁쁺", "?꾨줈? 寃쏀뿕"],
    image: "assets/KakaoTalk_20250810_005153132_04.jpg",
    imagePosition: "center 12%",
    featuredImagePosition: "center 16%",
  },
  mireu: {
    name: "?뺣?瑜?肄붿튂",
    tier: "?곗닔",
    tagline: "?숆탳 媛뺤쓽 寃쏀뿕 쨌 ??곗뼱/?쇰컲??移쒗솕 쨌 媛?깅퉬 ?寃뚯엫 ?쇰뱶諛?,
    roles: ["?뺢?", "??곗뼱", "?寃뚯엫", "?낅Ц"],
    image: "assets/mireucoach.png",
    imagePosition: "center 8%",
    featuredImagePosition: "center 8%",
  },
  persona: {
    name: "?섎Ⅴ?뚮굹 肄붿튂",
    tier: "?곗닔",
    tagline: "???쇱씠??異쒖떊 쨌 ?꾪깂???대줎 쨌 怨좏떚???쇱씤???댁쁺",
    roles: ["??, "?대줎", "怨좏떚??, "?쇱씤??],
    image: "assets/personacoach.png",
    imagePosition: "center 8%",
    featuredImagePosition: "center 8%",
  },
  mephi: {
    name: "硫뷀뵾 肄붿튂",
    tier: "?좊쾭?쒕뜑",
    tagline: "?꾪봽濡?諛뷀? ?쇱씠??쨌 ?쒖쫵5遺??梨뚮┛? ?좎? 쨌 ?寃뚯엫 ?쇰뱶諛?,
    roles: ["諛뷀?", "???쇱씤", "?寃뚯엫", "?꾪봽濡?],
    image: "assets/mephicoach.png",
    imagePosition: "72% 12%",
    featuredImagePosition: "72% 12%",
  },
};

const leagueLessonOverrides = {
  "lol-1": {
    coachKey: "persona",
    name: "???쇱씤???대줎 肄붿묶",
    purpose: ["top", "high"],
    roles: ["??, "?쇱씤??, "怨좏떚??],
    price: "45,000??/ 1?쒓컙",
    tagline: "???쇱씤??二쇰룄沅? ?⑥씠釉?愿由? ?ъ씠???댁쁺 ?ㅺ퀎",
  },
  "lol-2": {
    coachKey: "shineast",
    name: "?꾨줈????寃뚯엫 ?댁쁺 ?쇰뱶諛?,
    purpose: ["team", "high"],
    roles: ["???쇱씤", "?寃뚯엫", "?ㅻ뜑", "?댁쁺"],
    price: "100,000??/ 1?쒓컙",
    tagline: "?꾨줈? 異쒖떊 愿?먯쑝濡?蹂대뒗 以묓썑諛??댁쁺, ?ㅻ뜑, ?쒖빞 而⑦듃濡?,
  },
  "lol-3": {
    coachKey: "mireu",
    name: "?뺢? ??곗뼱 ?덉텧 肄붿묶",
    purpose: ["jungle", "low"],
    roles: ["?뺢?", "??곗뼱", "?숈꽑", "?ㅻ툕?앺듃"],
    price: "35,000??/ 1?쒓컙",
    tagline: "?뺢? 泥??숈꽑, 媛???대컢, ?ㅻ툕?앺듃 ?먮떒 吏묒쨷 肄붿묶",
  },
  "lol-4": {
    coachKey: "shineast",
    name: "???쇱씤 ?붾옲 由ы뵆?덉씠 遺꾩꽍",
    purpose: ["high"],
    roles: ["??, "?뺢?", "誘몃뱶", "?먮뵜", "?쒗뤏"],
    price: "90,000??/ 1?쒓컙",
    tagline: "?쇱씤 ?곴??놁씠 ?밸━ ?뚮옖怨??ㅼ닔 ?⑦꽩???≪븘二쇰뒗 怨좉툒 ?쇰뱶諛?,
  },
  "lol-5": {
    coachKey: "mephi",
    name: "諛뷀? ?쇱씤??2:2 肄붿묶",
    purpose: ["adc", "support", "team"],
    roles: ["?먮뵜", "?쒗뤏", "諛뷀?", "???],
    price: "70,000??/ 1?쒓컙",
    tagline: "?먮뵜/?쒗뤏 諛뷀? ?쇱씤?꾧낵 2:2 援먯쟾 ?ㅺ퀎",
  },
  "lol-6": {
    coachKey: "persona",
    name: "???쇱씤??30遺?吏꾨떒",
    purpose: ["value", "top", "low"],
    roles: ["??, "?쇱씤??, "?낅Ц"],
    price: "14,900??/ 30遺?,
  },
  "lol-7": {
    coachKey: "mephi",
    name: "?쒗뤏 ?쒖빞 ?낅Ц 泥댄겕",
    purpose: ["value", "support", "low"],
    roles: ["?쒗뤏", "?쒖빞", "?낅Ц"],
    price: "20,000??/ 30遺?,
  },
  "lol-8": {
    coachKey: "mephi",
    name: "?먮뵜 ?쒗? ?앹〈 ?대━??,
    purpose: ["value", "adc", "low"],
    roles: ["?먮뵜", "?쒗?", "?ъ???],
    price: "25,000??/ 30遺?,
  },
  "lol-9": {
    coachKey: "mireu",
    name: "梨뷀뵾?명룺 20遺??곷떞",
    purpose: ["value", "low"],
    roles: ["??곗뼱", "梨뷀뵾?명룺", "?붾옲"],
    price: "9,900??/ 20遺?,
  },
  "lol-10": {
    coachKey: "mireu",
    name: "媛?깅퉬 ?寃뚯엫 ?쇰뱶諛?,
    purpose: ["value", "team", "low"],
    roles: ["?寃뚯엫", "?뺢?", "??곗뼱", "?ㅻ뜑"],
    price: "30,000??/ 1?쒓컙",
    tagline: "? ?⑥쐞 ?댁쟾/?ㅽ겕由쇱쓣 ??댄븯寃??먭??섎뒗 ?댁쁺 ?쇰뱶諛?,
  },
};

const state = {
  activeView: "market",
  category: "league",
  type: "all",
  segment: "all",
  selectedCoachId: null,
  selectedCoachKey: null,
  recentCoachKeys: [],
  coachSelfKey: "shineast",
  coachSelfLessonId: null,
  query: "",
  coachExplorerQuery: "",
  coachExplorerRole: "all",
  coachExplorerTier: "all",
  coaches: [],
  coachLoadState: "idle",
  bookings: [],
  bookingLoadState: "idle",
  bookingLoadError: "",
  bookingFilterStatus: "all",
  bookingQuery: "",
  selectedBookingId: null,
  cropSourceImage: "",
  cropTarget: null,
};

function $(id) {
  return document.getElementById(id);
}

function migrateCoachImages(coaches) {
  return normalizeCoachProfiles(coaches.map((coach) => ({
    ...coach,
    image: imageMigration[coach.image] || coach.image || "assets/lollogo.png",
    featuredImage: imageMigration[coach.featuredImage] || coach.featuredImage || "",
    detailImage: imageMigration[coach.detailImage] || coach.detailImage || "",
    bannerImage: imageMigration[coach.bannerImage] || coach.bannerImage || "",
    imagePosition: coach.imagePosition || "center 8%",
  })));
}

function inferLeagueCoachKey(coach) {
  if (coach.coachKey && leagueCoachProfiles[coach.coachKey]) return coach.coachKey;
  const id = String(coach.id || "");
  if (leagueLessonOverrides[id]?.coachKey) return leagueLessonOverrides[id].coachKey;
  const haystack = [coach.name, coach.tagline, coach.bio, ...(coach.roles || [])].join(" ").toLowerCase();
  if (haystack.includes("硫뷀뵾") || haystack.includes("諛뷀?") || haystack.includes("?먮뵜") || haystack.includes("?쒗뤏")) return "mephi";
  if (haystack.includes("誘몃Ⅴ") || haystack.includes("?뺢?") || haystack.includes("??곗뼱")) return "mireu";
  if (haystack.includes("?섎Ⅴ?뚮굹") || haystack.includes("??)) return "persona";
  return "shineast";
}

function normalizeCoachProfiles(coaches) {
  return coaches.map((coach) => {
    if (coach.category !== "league") {
      return {
        ...coach,
        coachKey: coach.coachKey || coach.id,
        coachProfileName: coach.coachProfileName || coach.name,
      };
    }
    const override = leagueLessonOverrides[coach.id] || {};
    const lessonDefaults = coach.manualCoachEdit ? {} : override;
    const coachKey = override.coachKey || inferLeagueCoachKey(coach);
    const profile = leagueCoachProfiles[coachKey] || leagueCoachProfiles.shineast;
    return {
      ...coach,
      ...lessonDefaults,
      coachKey,
      coachProfileName: profile.name,
      coachTier: profile.tier,
      coachSummary: profile.tagline,
      tier: profile.tier,
      image: coach.image && coach.manualCoachEdit ? coach.image : profile.image,
      imagePosition: profile.imagePosition,
      featuredImagePosition: (coach.featuredImage || coach.manualCoachEdit)
        ? (coach.featuredImagePosition || profile.featuredImagePosition || profile.imagePosition)
        : (profile.featuredImagePosition || profile.imagePosition),
      detailImagePosition: (coach.detailImage || coach.manualCoachEdit)
        ? (coach.detailImagePosition || profile.featuredImagePosition || profile.imagePosition)
        : (profile.featuredImagePosition || profile.imagePosition),
      badges: [profile.tier, ...(coach.badges || []).filter((badge) => badge !== profile.tier)].slice(0, 3),
    };
  });
}

function boot() {
  applyTheme(localStorage.getItem(THEME_KEY) || "light");
  Object.entries(text).forEach(([id, value]) => {
    const el = $(id);
    if (!el) return;
    if (el.tagName === "INPUT") el.placeholder = value;
    else el.textContent = value;
  });
  $("navStudent").textContent = "내 정보";
  $("navCoachSearch").textContent = "맞춤 강의 검색";
  $("searchInput").placeholder = text.searchPlaceholder;
  $("coachImagePosition").placeholder = "?? center 8%, 72% 12%";
  state.coaches = migrateCoachImages(structuredClone(samples));
  state.coachLoadState = "loaded";
  render();
  bindEvents();
  loadCoachesFromApi();
}

function bindEvents() {
  $("homeLogo").addEventListener("click", () => {
    state.activeView = "market";
    state.category = "league";
    state.type = "all";
    state.segment = "all";
    state.selectedCoachId = null;
    state.selectedCoachKey = null;
    state.query = "";
    $("searchInput").value = "";
    render();
  });

  document.querySelectorAll(".nav-item").forEach((button) => {
    button.addEventListener("click", async () => {
      if (button.dataset.action === "coachSearch") {
        openCoachExplorer();
        return;
      }
      const nextView = button.dataset.view;
      if (!nextView) return;
      if (["bookings", "admin", "coachSelf"].includes(nextView)) {
        const allowed = await ensureAdminAccess();
        if (!allowed) return;
      }
      state.activeView = nextView;
      render();
      if (state.activeView === "bookings") {
        loadReservations({ promptForLogin: false });
      }
    });
  });

  document.querySelectorAll("[data-admin-view]").forEach((button) => {
    button.addEventListener("click", async () => {
      const nextView = button.dataset.adminView;
      const allowed = await ensureAdminAccess();
      if (!allowed) return;
      state.activeView = nextView;
      document.querySelector(".admin-menu")?.removeAttribute("open");
      render();
      if (state.activeView === "bookings") {
        loadReservations({ promptForLogin: false });
      }
    });
  });

  $("searchInput").addEventListener("input", (event) => {
    state.query = event.target.value.trim().toLowerCase();
    renderMarket();
  });
  $("coachExplorerCloseBtn")?.addEventListener("click", closeCoachExplorer);
  $("coachExplorerModal")?.addEventListener("click", (event) => {
    if (event.target.id === "coachExplorerModal") closeCoachExplorer();
  });
  $("coachExplorerSearch")?.addEventListener("input", (event) => {
    state.coachExplorerQuery = event.target.value.trim().toLowerCase();
    renderCoachExplorer();
  });
  $("lessonDetailCloseBtn")?.addEventListener("click", closeLessonDetail);
  $("lessonDetailModal")?.addEventListener("click", (event) => {
    if (event.target.id === "lessonDetailModal") closeLessonDetail();
  });
  $("themeToggleBtn")?.addEventListener("click", toggleTheme);
  $("loginOpenBtn")?.addEventListener("click", () => openAuthModal("login"));
  $("guestBuyOpenBtn")?.addEventListener("click", () => openAuthModal("guest"));
  $("authCloseBtn")?.addEventListener("click", closeAuthModal);
  $("authModal")?.addEventListener("click", (event) => {
    if (event.target.id === "authModal") closeAuthModal();
  });
  document.querySelectorAll("[data-auth-mode]").forEach((button) => {
    button.addEventListener("click", () => openAuthModal(button.dataset.authMode));
  });

  $("coachForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    await saveCoachFromForm();
  });

  $("newCoachBtn").addEventListener("click", () => fillCoachForm());
  $("deleteCoachBtn").addEventListener("click", deleteSelectedCoach);
  $("coachCategory").addEventListener("change", () => {
    renderAdminChoiceControls([], [], []);
  });
  if ($("addCoachBadgeBtn")) $("addCoachBadgeBtn").addEventListener("click", addSelectedBadge);
  if ($("coachBadgeChoices")) {
    $("coachBadgeChoices").addEventListener("change", () => {
      renderBadgePicker(getCheckedValues("coachBadgeChoice"));
    });
  }
  $("coachPriceUnitType").addEventListener("change", () => {
    renderPriceUnitOptions($("coachPriceUnitType").value);
    updateCoachPriceValue();
  });
  $("coachPriceAmount").addEventListener("input", updateCoachPriceValue);
  $("coachPriceUnit").addEventListener("change", updateCoachPriceValue);
  $("resetCoachesBtn").addEventListener("click", async () => {
    await resetCoachesToSamples();
  });
  $("clearBookingsBtn").addEventListener("click", () => {
    loadReservations();
  });
  $("coachImage")?.addEventListener("input", () => updateCoachImagePreview());
  $("coachImageFile").addEventListener("change", handleCoachImageFile);
  $("coachFeaturedImageFile").addEventListener("change", (event) => handleWideCoachImageFile(event, "coachFeaturedImage", "coachFeaturedImagePreview", "?곷떒 異붿쿇 ?대?吏"));
  $("coachDetailImageFile").addEventListener("change", (event) => handleWideCoachImageFile(event, "coachDetailImage", "coachDetailImagePreview", "?곸꽭 ?ㅻ챸 ?대?吏"));
  $("openFeaturedCropBtn").addEventListener("click", () => openCropModal({
    inputId: "coachFeaturedImage",
    previewId: "coachFeaturedImagePreview",
    width: 1200,
    height: 675,
    label: "?곷떒 異붿쿇 ?대?吏",
  }));
  $("openCropBtn").addEventListener("click", () => openCropModal({
    inputId: "coachImage",
    previewId: "coachImagePreview",
    width: 520,
    height: 520,
    label: "?쇰컲 紐⑸줉 ?대?吏",
  }));
  $("openDetailCropBtn").addEventListener("click", () => openCropModal({
    inputId: "coachDetailImage",
    previewId: "coachDetailImagePreview",
    width: 1200,
    height: 675,
    label: "?곸꽭 ?ㅻ챸 ?대?吏",
  }));
  $("cropCloseBtn").addEventListener("click", closeCropModal);
  $("applyCropBtn").addEventListener("click", applyImageCrop);
  $("cropImage").addEventListener("load", updateCropBox);
  ["cropX", "cropY", "cropSize"].forEach((id) => $(id).addEventListener("input", updateCropBox));
  $("cropBox").addEventListener("pointerdown", startCropDrag);
  document.querySelector(".crop-stage").addEventListener("pointerdown", moveCropToPointer);
  $("bookingStatusFilter").addEventListener("change", (event) => {
    state.bookingFilterStatus = event.target.value;
    renderBookings();
  });
  $("bookingSearchInput").addEventListener("input", (event) => {
    state.bookingQuery = event.target.value.trim().toLowerCase();
    renderBookings();
  });
}

function render() {
  document.querySelectorAll(".nav-item").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === state.activeView);
  });
  document.querySelectorAll(".view").forEach((view) => view.classList.remove("active"));
  $(`${state.activeView}View`).classList.add("active");
  renderMetrics();
  renderSidebarCoaches();
  renderMarket();
  renderStudentHome();
  renderBookings();
  renderAdmin();
  renderCoachSelf();
}

function renderMetrics() {
  const ratings = state.coaches.map((coach) => coach.rating).filter(Boolean);
  const average = ratings.length ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;
  $("metricCoaches").textContent = state.coaches.length;
  $("metricBookings").textContent = state.bookings.length;
  $("metricRating").textContent = average.toFixed(1);
}

function applyTheme(theme) {
  const nextTheme = theme === "dark" ? "dark" : "light";
  document.body.dataset.theme = nextTheme;
  localStorage.setItem(THEME_KEY, nextTheme);
  const button = $("themeToggleBtn");
  if (button) {
    button.textContent = nextTheme === "dark" ? "?쇱씠?몃え?? : "?ㅽ겕紐⑤뱶";
    button.setAttribute("aria-pressed", String(nextTheme === "dark"));
  }
}

function toggleTheme() {
  applyTheme(document.body.dataset.theme === "dark" ? "light" : "dark");
}

function closeAuthModal() {
  const modal = $("authModal");
  if (modal) modal.hidden = true;
}

function openAuthModal(mode = "login") {
  const modal = $("authModal");
  const body = $("authBody");
  if (!modal || !body) return;
  const nextMode = ["login", "signup", "guest"].includes(mode) ? mode : "login";
  document.querySelectorAll("[data-auth-mode]").forEach((button) => {
    button.classList.toggle("active", button.dataset.authMode === nextMode);
  });
  body.innerHTML = renderAuthMarkup(nextMode);
  modal.hidden = false;
}

function renderAuthMarkup(mode) {
  if (mode === "signup") {
    return `
      <div class="auth-content">
        <span class="eyebrow">?뚯썝媛??/span>
        <h2 id="authTitle">?섍컯??怨꾩젙 留뚮뱾湲?/h2>
        <p>媛뺤쓽 援щℓ ?댁뿭, ?덉빟 ?쒓컙, ?꾧린 ?묒꽦 沅뚰븳??怨꾩젙????ν븯???붾㈃?낅땲??</p>
        <label>?됰꽕??input placeholder="?? ?됰꽕??KR1"></label>
        <label>?대찓??input placeholder="example@email.com"></label>
        <label>鍮꾨?踰덊샇<input type="password" placeholder="鍮꾨?踰덊샇"></label>
        <button class="primary" type="button" disabled>?뚯썝媛??以鍮꾩쨷</button>
      </div>
    `;
  }
  if (mode === "guest") {
    const selected = state.coaches.find((coach) => coach.id === state.selectedCoachId);
    return `
      <div class="auth-content">
        <span class="eyebrow">鍮꾪쉶??援щℓ</span>
        <h2 id="authTitle">怨꾩젙 ?놁씠 ?덉빟?섍린</h2>
        <p>濡쒓렇???놁씠???곕씫泥섏? Riot ID瑜??④꺼 ?덉빟?????덇쾶 ???덉젙?낅땲?? 援щℓ ?댁뿭 議고쉶??二쇰Ц踰덊샇/?곕씫泥섎줈 ?뺤씤?섎뒗 ?먮쫫?낅땲??</p>
        ${selected ? `<div class="guest-selected"><span>?좏깮 媛뺤쓽</span><strong>${escapeHtml(selected.name)}</strong><em>${escapeHtml(selected.price)}</em></div>` : ""}
        <label>?섍컯???대쫫<input placeholder="?? ?됰꽕??KR1"></label>
        <label>Riot ID / Discord<input placeholder="?곕씫 媛?ν븳 ID"></label>
        <label>?곕씫泥?input placeholder="?붿뒪肄붾뱶 ?먮뒗 ?대찓??></label>
        <button class="primary" type="button" disabled>鍮꾪쉶??援щℓ 以鍮꾩쨷</button>
      </div>
    `;
  }
  return `
    <div class="auth-content">
      <span class="eyebrow">濡쒓렇??/span>
      <h2 id="authTitle">??媛뺤쓽 ?댁뼱蹂닿린</h2>
      <p>異⑹쟾 湲덉븸, 媛뺤쓽 援щℓ ?댁뿭, ?덉빟 ?쒓컙, ?꾧린 ?묒꽦 媛??媛뺤쓽瑜??뺤씤?섎뒗 ?섍컯??濡쒓렇???붾㈃?낅땲??</p>
      <label>?대찓???먮뒗 Discord ID<input placeholder="example@email.com"></label>
      <label>鍮꾨?踰덊샇<input type="password" placeholder="鍮꾨?踰덊샇"></label>
      <button class="primary" type="button" disabled>濡쒓렇??以鍮꾩쨷</button>
    </div>
  `;
}

function renderStudentHome() {
  const container = $("studentViewContent");
  if (!container) return;
  const leagueLessons = state.coaches.filter((coach) => coach.category === "league");
  const recommended = leagueLessons.slice(0, 3);
  const nextLesson = state.bookings[0];
  const historyRows = recommended.map((coach, index) => ({
    lesson: coach.name,
    coach: coach.coachProfileName || coach.name,
    price: coach.price,
    status: ["예약 확정", "수강 완료", "후기 완료"][index] || "구매 완료",
    time: ["8/14 21:00", "8/10 20:00", "8/02 22:00"][index] || "시간 조율 중",
    reviewStatus: ["후기 작성 가능 +1,000P", "후기 작성 가능 +1,000P", "후기 작성 완료"][index] || "후기 대기",
  }));
  const reviewRows = historyRows.filter((row) => row.status.includes("완료"));

  container.innerHTML = `
    <section class="student-hero">
      <article class="student-hero-card">
        <span>내 지갑</span>
        <strong>0원</strong>
        <p>강의 결제와 포인트 보상이 여기에 쌓입니다.</p>
        <div class="student-actions">
          <button class="primary" type="button" disabled>포인트 충전</button>
          <button class="secondary" type="button" disabled>결제수단</button>
        </div>
      </article>
      <article class="student-hero-card highlight">
        <span>다음 일정</span>
        <strong>${nextLesson ? escapeHtml(nextLesson.time || "시간 확인 중") : "예약 대기"}</strong>
        <p>${nextLesson ? escapeHtml(nextLesson.lesson || "예약 강의") : "강의 상세보기에서 신청하면 이곳에 표시됩니다."}</p>
        <em>${nextLesson ? escapeHtml(nextLesson.status || "접수") : "예약된 강의 없음"}</em>
      </article>
      <article class="student-hero-card reward">
        <span>후기 보상</span>
        <strong>+1,000P</strong>
        <p>수강 완료 강의에 후기를 남기면 포인트를 받을 수 있습니다.</p>
        <em>${reviewRows.length}개 작성 가능</em>
      </article>
    </section>

    <section class="student-flow">
      <div><span>1</span><strong>강의 선택</strong><p>목록이나 맞춤 검색에서 코치를 고릅니다.</p></div>
      <div><span>2</span><strong>예약 신청</strong><p>희망 시간과 연락처를 남깁니다.</p></div>
      <div><span>3</span><strong>수강 후 후기</strong><p>후기 작성 시 포인트 보상이 표시됩니다.</p></div>
    </section>

    <section class="student-main-grid">
      <article class="student-panel student-history-panel">
        <div class="student-panel-head">
          <span>내역</span>
          <strong>강의 구매 / 신청 내역</strong>
        </div>
        <div class="student-timeline">
          ${historyRows.map((row) => `
            <div class="student-row">
              <em>${escapeHtml(row.status)}</em>
              <span>
                <strong>${escapeHtml(row.lesson)}</strong>
                <small>${escapeHtml(row.coach)} · ${escapeHtml(row.price)} · ${escapeHtml(row.time)}</small>
                <small class="student-review-state">${escapeHtml(row.reviewStatus)}</small>
              </span>
            </div>
          `).join("") || `
            <div class="student-empty">
              <strong>?댁뿭???놁뒿?덈떎.</strong>
              <span>援щℓ???덉빟???앷린硫???紐⑸줉?먯꽌 ?뺤씤?⑸땲??</span>
            </div>
          `}
        </div>
      </article>

      <article class="student-panel student-review-panel">
        <div class="student-panel-head">
          <span>후기</span>
          <strong>후기 작성 보상</strong>
        </div>
        ${reviewRows.length ? `
          <div class="student-review-list">
            ${reviewRows.map((row, index) => `
              <div class="student-review-card">
                <strong>${escapeHtml(row.lesson)}</strong>
                <span>${escapeHtml(row.coach)} · ${escapeHtml(row.time)}</span>
                <p>${index === 0 ? "수강 완료 후 별점과 후기를 남기면 포인트 보상이 지급되는 예시입니다." : "이미 후기를 작성한 강의는 완료 상태로 표시됩니다."}</p>
                <button class="${index === 0 ? "primary" : "secondary"}" type="button" disabled>${index === 0 ? "후기 작성 + 1,000P" : "후기 작성 완료"}</button>
              </div>
            `).join("")}
          </div>
        ` : `
          <div class="student-empty">
            <strong>?묒꽦 媛?ν븳 ?꾧린媛 ?놁뒿?덈떎.</strong>
            <span>媛뺤쓽媛 ?꾨즺?섎㈃ ?꾧린 ?묒꽦 踰꾪듉???쒖떆?⑸땲??</span>
          </div>
        `}
      </article>
    </section>
  `;
}

function getCoachKey(coach) {
  return String(coach?.coachKey || coach?.id || "");
}

function getCoachIdentityFromGroup(coachKey, coaches) {
  const first = coaches[0] || {};
  const profile = first.category === "league" ? leagueCoachProfiles[coachKey] : null;
  return {
    key: coachKey,
    name: profile?.name || first.coachProfileName || first.name || "肄붿튂",
    tier: profile?.tier || first.coachTier || first.tier || "?쇰컲",
    tagline: profile?.tagline || first.coachSummary || first.tagline || "肄붿묶 ?곹뭹",
    roles: profile?.roles || first.roles || [],
    image: profile?.image || first.image || "assets/lollogo.png",
    imagePosition: profile?.imagePosition || first.imagePosition || "center 8%",
    lessons: coaches.length,
    rating: coaches.reduce((sum, coach) => sum + Number(coach.rating || 0), 0) / Math.max(coaches.length, 1),
    products: coaches,
  };
}

function getCoachIdentities(category = state.category) {
  const grouped = new Map();
  state.coaches
    .filter((coach) => coach.category === category)
    .forEach((coach) => {
      const key = getCoachKey(coach);
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key).push(coach);
    });
  return Array.from(grouped.entries())
    .map(([key, coaches]) => getCoachIdentityFromGroup(key, coaches))
    .sort((a, b) => (tierRank[a.tier] ?? 9) - (tierRank[b.tier] ?? 9) || a.name.localeCompare(b.name, "ko-KR"));
}

function selectCoachIdentity(coachKey) {
  state.selectedCoachKey = coachKey;
  state.selectedCoachId = null;
  state.query = "";
  state.type = "all";
  state.segment = "all";
  state.recentCoachKeys = [coachKey, ...state.recentCoachKeys.filter((key) => key !== coachKey)].slice(0, 3);
  if ($("searchInput")) $("searchInput").value = "";
}

function renderSidebarCoaches() {
  const target = $("sideCoachList");
  if (!target) return;
  const identities = getCoachIdentities();
  const selected = identities.find((coach) => coach.key === state.selectedCoachKey);
  const recent = state.recentCoachKeys
    .map((key) => identities.find((coach) => coach.key === key))
    .filter(Boolean)
    .slice(0, 3);

  target.innerHTML = `
    <button class="coach-explorer-open" id="openCoachExplorerBtn" type="button">
      <span>
        <strong>肄붿튂 紐⑸줉 ?닿린</strong>
        <small>${escapeHtml(categoryLabel(state.category))} ${identities.length}紐?쨌 ${state.coaches.filter((coach) => coach.category === state.category).length}媛?媛뺤쓽</small>
      </span>
      <em>?좏깮</em>
    </button>
    ${selected ? `
      <button class="selected-side-coach active" type="button" data-side-coach-key="${escapeHtml(selected.key)}">
        <img src="${selected.image}" alt="">
        <span>
          <strong>${escapeHtml(selected.name)}</strong>
          <small>${escapeHtml(selected.lessons)}媛?媛뺤쓽 쨌 ${escapeHtml(selected.tier)}</small>
        </span>
      </button>
    ` : `<p class="side-empty">?꾩쭅 ?좏깮??肄붿튂媛 ?놁뒿?덈떎.</p>`}
    ${recent.length ? `
      <div class="recent-side-coaches">
        <span>理쒓렐 ?좏깮</span>
        ${recent.map((coach) => `
          <button class="recent-side-coach ${coach.key === state.selectedCoachKey ? "active" : ""}" type="button" data-side-coach-key="${escapeHtml(coach.key)}">
            <img src="${coach.image}" alt="">
            <strong>${escapeHtml(coach.name)}</strong>
          </button>
        `).join("")}
      </div>
    ` : ""}
  `;

  $("openCoachExplorerBtn")?.addEventListener("click", openCoachExplorer);
  target.querySelectorAll("[data-side-coach-key]").forEach((button) => {
    button.addEventListener("click", () => {
      selectCoachIdentity(button.dataset.sideCoachKey);
      state.activeView = "market";
      render();
    });
  });
}

function openCoachExplorer() {
  const modal = $("coachExplorerModal");
  if (!modal) return;
  modal.hidden = false;
  if ($("coachExplorerSearch")) $("coachExplorerSearch").value = state.coachExplorerQuery;
  renderCoachExplorer();
  setTimeout(() => $("coachExplorerSearch")?.focus(), 0);
}

function closeCoachExplorer() {
  const modal = $("coachExplorerModal");
  if (modal) modal.hidden = true;
}

function getCoachExplorerFilters() {
  const activeSet = getActiveFilterSet();
  const roleFilters = activeSet.segment.filter((item) => item.id !== "all");
  const tierFilters = ["?좊쾭?쒕뜑", "理쒖슦??, "?곗닔", "?쇰컲"]
    .filter((tier) => getCoachIdentities().some((coach) => coach.tier === tier))
    .map((tier) => ({ id: tier, label: tier }));
  return { roleFilters, tierFilters };
}

function getVisibleExplorerCoaches() {
  return getCoachIdentities().filter((coach) => {
    const products = coach.products || [];
    const inRole = state.coachExplorerRole === "all" || products.some((product) => getCoachPurposes(product).includes(state.coachExplorerRole));
    const inTier = state.coachExplorerTier === "all" || coach.tier === state.coachExplorerTier;
    const productText = products.map((product) => {
      const purposeLabel = getPurposeLabels(product.purpose).join(" ");
      return [product.name, product.tagline, product.bio, purposeLabel, ...(product.roles || []), ...(product.badges || [])].join(" ");
    }).join(" ");
    const haystack = [coach.name, coach.tier, coach.tagline, ...(coach.roles || []), productText].join(" ").toLowerCase();
    return inRole && inTier && (!state.coachExplorerQuery || haystack.includes(state.coachExplorerQuery));
  });
}

function renderCoachExplorer() {
  const modal = $("coachExplorerModal");
  if (!modal || modal.hidden) return;
  const { roleFilters, tierFilters } = getCoachExplorerFilters();
  if (state.coachExplorerRole !== "all" && !roleFilters.some((filter) => filter.id === state.coachExplorerRole)) {
    state.coachExplorerRole = "all";
  }
  if (state.coachExplorerTier !== "all" && !tierFilters.some((filter) => filter.id === state.coachExplorerTier)) {
    state.coachExplorerTier = "all";
  }
  $("coachExplorerTitle").textContent = `${categoryLabel(state.category)} 肄붿튂 紐⑸줉`;
  $("coachExplorerMeta").textContent = `${getCoachIdentities().length}紐?쨌 ${state.coaches.filter((coach) => coach.category === state.category).length}媛?媛뺤쓽`;
  $("coachExplorerRoleFilters").innerHTML = [{ id: "all", label: "?꾩껜" }, ...roleFilters].map((filter) => `
    <button class="explorer-filter ${state.coachExplorerRole === filter.id ? "active" : ""}" type="button" data-explorer-role="${escapeHtml(filter.id)}">
      ${escapeHtml(filter.label)}
    </button>
  `).join("");
  $("coachExplorerTierFilters").innerHTML = [{ id: "all", label: "?꾩껜 ?깃툒" }, ...tierFilters].map((filter) => `
    <button class="explorer-filter ${state.coachExplorerTier === filter.id ? "active" : ""}" type="button" data-explorer-tier="${escapeHtml(filter.id)}">
      ${escapeHtml(filter.label)}
    </button>
  `).join("");

  const visible = getVisibleExplorerCoaches();
  $("coachExplorerGrid").innerHTML = visible.length ? visible.map(renderCoachExplorerCard).join("") : `
    <div class="empty">議곌굔??留욌뒗 肄붿튂媛 ?놁뒿?덈떎.</div>
  `;
  document.querySelectorAll("[data-explorer-role]").forEach((button) => {
    button.addEventListener("click", () => {
      state.coachExplorerRole = button.dataset.explorerRole;
      renderCoachExplorer();
    });
  });
  document.querySelectorAll("[data-explorer-tier]").forEach((button) => {
    button.addEventListener("click", () => {
      state.coachExplorerTier = button.dataset.explorerTier;
      renderCoachExplorer();
    });
  });
  document.querySelectorAll("[data-explorer-coach-key]").forEach((button) => {
    button.addEventListener("click", () => {
      selectCoachIdentity(button.dataset.explorerCoachKey);
      closeCoachExplorer();
      state.activeView = "market";
      render();
      $("coachDetail")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function renderCoachExplorerCard(coach) {
  const productCount = coach.lessons || 0;
  const roleText = (coach.roles || []).slice(0, 4).join(" 쨌 ");
  const badges = ["異붿쿇", coach.tier].slice(0, 2).map((badge) => `<span>${escapeHtml(badge)}</span>`).join("");
  return `
    <button class="explorer-coach-card ${coach.key === state.selectedCoachKey ? "active" : ""}" type="button" data-explorer-coach-key="${escapeHtml(coach.key)}">
      <img src="${coach.image}" alt="" style="object-position: ${coach.imagePosition};">
      <span class="explorer-coach-body">
        <span class="explorer-card-head">
          <strong>${escapeHtml(coach.name)}</strong>
          <em>${escapeHtml(coach.tier)}</em>
        </span>
        <small>${escapeHtml(coach.tagline || "肄붿묶 ?곹뭹")}</small>
        <span class="explorer-card-meta">${escapeHtml(roleText || "媛뺤쓽")}</span>
        <span class="explorer-card-foot">
          <span>${badges}</span>
          <b>${productCount}媛?媛뺤쓽</b>
        </span>
      </span>
    </button>
  `;
}

function getVisibleCoaches() {
  return state.coaches.filter((coach) => {
    const inCategory = coach.category === state.category;
    const inSelectedCoach = !state.selectedCoachKey || getCoachKey(coach) === state.selectedCoachKey;
    const coachPurposes = getCoachPurposes(coach);
    const inType = state.type === "all" || coachPurposes.includes(state.type);
    const inSegment = state.segment === "all" || coachPurposes.includes(state.segment);
    const purposeLabel = getPurposeLabels(coach.purpose).join(" ");
    const haystack = [coach.name, coach.coachProfileName, coach.tier, coach.tagline, coach.bio, purposeLabel, ...(coach.roles || []), ...(coach.badges || [])]
      .join(" ")
      .toLowerCase();
    return inCategory && inSelectedCoach && inType && inSegment && (!state.query || haystack.includes(state.query));
  }).sort((a, b) => {
    const tierDiff = (tierRank[a.tier] ?? 9) - (tierRank[b.tier] ?? 9);
    if (tierDiff) return tierDiff;
    return (b.rating || 0) - (a.rating || 0);
  });
}

function renderMarket() {
  const filters = getActiveFilterSet();
  $("categoryTabs").innerHTML = categories.map((category) => `
    <button class="tab ${category.id === state.category ? "active" : ""}" data-category="${category.id}">
      ${category.label}
    </button>
  `).join("");

  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      state.category = tab.dataset.category;
      state.type = "all";
      state.segment = "all";
      state.selectedCoachId = null;
      state.selectedCoachKey = null;
      renderMarket();
      renderSidebarCoaches();
    });
  });

  $("typeTabs").innerHTML = filters.type.map((filter) => `
    <button class="purpose-tab ${filter.id === state.type ? "active" : ""}" data-type="${filter.id}">
      ${filter.label}
    </button>
  `).join("");

  $("segmentTabs").innerHTML = filters.segment.map((filter) => `
    <button class="purpose-tab ${filter.id === state.segment ? "active" : ""}" data-segment="${filter.id}">
      ${filter.label}
    </button>
  `).join("");

  document.querySelectorAll("[data-type]").forEach((tab) => {
    tab.addEventListener("click", () => {
      state.type = tab.dataset.type;
      state.selectedCoachId = null;
      state.selectedCoachKey = null;
      renderMarket();
    });
  });

  document.querySelectorAll("[data-segment]").forEach((tab) => {
    tab.addEventListener("click", () => {
      state.segment = tab.dataset.segment;
      state.selectedCoachId = null;
      state.selectedCoachKey = null;
      renderMarket();
    });
  });

  if (state.coachLoadState === "idle" || state.coachLoadState === "loading") {
    $("featuredSection").hidden = true;
    $("featuredList").innerHTML = "";
    $("coachList").innerHTML = `<div class="empty">肄붿튂 紐⑸줉??遺덈윭?ㅻ뒗 以묒엯?덈떎.</div>`;
    state.selectedCoachId = null;
    renderDetail();
    return;
  }

  if (state.coachLoadState === "error") {
    $("featuredSection").hidden = true;
    $("featuredList").innerHTML = "";
    $("coachList").innerHTML = `<div class="empty">肄붿튂 紐⑸줉??遺덈윭?ㅼ? 紐삵뻽?듬땲??</div>`;
    state.selectedCoachId = null;
    renderDetail();
    return;
  }

  const visible = getVisibleCoaches();
  if (state.selectedCoachId && !visible.some((coach) => coach.id === state.selectedCoachId)) {
    state.selectedCoachId = null;
    renderSidebarCoaches();
  }
  if (state.selectedCoachKey && !state.selectedCoachId && visible.length) {
    state.selectedCoachId = visible[0].id;
  }

  renderFeatured(visible);
  const featuredIds = new Set(
    state.query ? [] : Array.from(document.querySelectorAll("#featuredList [data-coach-id]")).map((card) => card.dataset.coachId)
  );
  const listed = visible.filter((coach) => !featuredIds.has(coach.id));
  $("coachList").innerHTML = listed.length ? listed.map(renderCoachCard).join("") : `
    <div class="empty">寃??寃곌낵媛 ?놁뒿?덈떎.</div>
  `;
  document.querySelectorAll("[data-coach-id]").forEach((card) => {
    card.addEventListener("click", (event) => {
      if (event.target.closest("[data-detail-id]")) return;
      state.selectedCoachId = card.dataset.coachId;
      renderMarket();
    });
  });
  document.querySelectorAll("[data-detail-id]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      openLessonDetail(button.dataset.detailId);
    });
  });
  renderDetail();
}

function getActiveFilterSet() {
  return filterSets[state.category] || filterSets.league;
}

function renderFeatured(visible) {
  const featured = getFeaturedCoachSlots(visible);
  const section = $("featuredSection");
  if (!featured.length || state.query) {
    section.hidden = true;
    $("featuredList").innerHTML = "";
    return;
  }
  section.hidden = false;
  $("featuredList").innerHTML = featured.map(renderFeaturedCard).join("");
}

function getFeaturedScore(coach) {
  return Number(coach.lessons || 0) * 10 + Number(coach.reviews?.length || 0);
}

function chooseFeaturedCoachLesson(coaches) {
  const promoted = coaches
    .filter((coach) => coach.featuredAd)
    .sort((a, b) => String(b.featuredAdUpdatedAt || "").localeCompare(String(a.featuredAdUpdatedAt || "")) || getFeaturedScore(b) - getFeaturedScore(a))[0];
  if (promoted) return promoted;
  return [...coaches].sort((a, b) => getFeaturedScore(b) - getFeaturedScore(a))[0];
}

function getFeaturedCoachSlots(visible) {
  const eligible = visible.filter((coach) => coach.category === state.category && ["?좊쾭?쒕뜑", "理쒖슦??].includes(coach.tier));
  const grouped = new Map();
  eligible.forEach((coach) => {
    const key = getCoachKey(coach);
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(coach);
  });
  return [...grouped.values()]
    .map(chooseFeaturedCoachLesson)
    .filter(Boolean)
    .sort((a, b) => (tierRank[a.tier] ?? 9) - (tierRank[b.tier] ?? 9) || getFeaturedScore(b) - getFeaturedScore(a));
}

function renderFeaturedCard(coach) {
  const originalPrice = getOriginalPrice(coach.price);
  const featuredImage = getFeaturedImage(coach);
  const purposeText = getPurposeLabels(coach.purpose).slice(0, 2).join(" 쨌 ");
  return `
    <article class="featured-card ${getTierClass(coach)}" data-coach-id="${coach.id}">
      <div class="featured-image">
        <img src="${featuredImage}" alt="" style="${getWideImageStyle(coach, "featuredImagePosition")}">
        <span class="ad-label">異붿쿇</span>
        <span class="tier-ribbon">${coach.tier}</span>
      </div>
      <div class="featured-body">
        <h3>${coach.name}</h3>
        <p class="coach-owner">${escapeHtml(coach.coachProfileName || coach.name)}</p>
        <p class="purpose-label">${purposeText}</p>
        <p class="featured-summary">${coach.tagline}</p>
        <div class="featured-rating">??${coach.rating.toFixed(1)} <span>(${coach.lessons || 0})</span></div>
        <div class="featured-price">
          <strong>${coach.price}</strong>
          ${originalPrice ? `<del>${originalPrice}</del>` : ""}
        </div>
        <button class="detail-link" type="button" data-detail-id="${escapeHtml(coach.id)}">?곸꽭蹂닿린</button>
      </div>
    </article>
  `;
}

function getOriginalPrice(price) {
  const amount = Number(String(price || "").replace(/[^\d]/g, ""));
  if (!amount) return "";
  return `${Math.round(amount * 1.7).toLocaleString("ko-KR")}??;
}

function renderCoachCard(coach) {
  const badges = getCoachBadges(coach);
  const imageStyle = getImageStyle(coach);
  const purposeText = getPurposeLabels(coach.purpose).slice(0, 2).join(" 쨌 ");
  return `
    <article class="coach-card ${coach.id === state.selectedCoachId ? "active" : ""} ${getTierClass(coach)}" data-coach-id="${coach.id}">
      <div class="avatar-frame"><img class="avatar" src="${coach.image}" alt="" style="${imageStyle}"></div>
      <div class="coach-main">
        ${badges.length ? `<div class="rank-badges">${badges.map(renderBadge).join("")}</div>` : ""}
        <h3>${coach.name}</h3>
        <span class="coach-owner">${escapeHtml(coach.coachProfileName || coach.name)}</span>
        <span class="purpose-label">${purposeText}</span>
        <p>${coach.tagline}</p>
        <div class="chips">${(coach.roles || []).map((role) => `<span class="chip">${role}</span>`).join("")}</div>
      </div>
      <div class="card-foot">
        <span>??${coach.rating.toFixed(1)} 쨌 ?꾧린 ${coach.reviews?.length || 0}</span>
        <span class="price">${coach.price}</span>
      </div>
      <button class="detail-link card-detail-link" type="button" data-detail-id="${escapeHtml(coach.id)}">?곸꽭蹂닿린</button>
    </article>
  `;
}

function getCoachBadges(coach) {
  if (coach.tier === "?좊쾭?쒕뜑") return ["異붿쿇", "?좊쾭?쒕뜑"];
  if (coach.tier === "理쒖슦??) return ["異붿쿇", "理쒖슦??];
  if (coach.tier === "?곗닔") return ["異붿쿇", "?곗닔"];
  return coach.badges || [];
}

function renderBadge(label) {
  const className = label === "異붿쿇" ? "badge recommend" : ["理쒖슦??, "?좊쾭?쒕뜑"].includes(label) ? "badge best" : "badge good";
  return `<span class="${className}">${label}</span>`;
}

function getTierClass(coach) {
  if (["理쒖슦??, "?좊쾭?쒕뜑"].includes(coach.tier)) return "tier-best";
  if (coach.tier === "?곗닔") return "tier-good";
  return "tier-normal";
}

function getImageStyle(coach) {
  return `object-position: ${coach.imagePosition || "center center"};`;
}

function getFeaturedImage(coach) {
  return coach.featuredImage || coach.bannerImage || coach.heroImage || coach.image || "assets/lollogo.png";
}

function getDetailImage(coach) {
  return coach.detailImage || coach.bannerImage || coach.heroImage || coach.featuredImage || coach.image || "assets/lollogo.png";
}

function getWideImageStyle(coach, positionKey) {
  return `object-position: ${coach[positionKey] || coach.bannerImagePosition || "center center"};`;
}

function getCoachPurposes(coach) {
  const raw = Array.isArray(coach?.purpose) ? coach.purpose : String(coach?.purpose || "").split(",");
  return raw.map((item) => String(item).trim()).filter(Boolean);
}

function getPurposeLabels(value) {
  const ids = Array.isArray(value) ? value : String(value || "").split(",");
  const labels = ids
    .map((id) => purposes.find((purpose) => purpose.id === String(id).trim())?.label || String(id).trim())
    .filter(Boolean);
  return labels.length ? labels : ["遺꾨쪟 誘몄???];
}

function renderDetail() {
  const coach = state.coaches.find((item) => item.id === state.selectedCoachId);
  if (!coach) {
    $("coachDetail").innerHTML = `
      <div class="detail-empty">
        <strong>?곹뭹???좏깮?섎㈃ 誘몃━蹂닿린媛 ?쒖떆?⑸땲??</strong>
        <span>?곸꽭蹂닿린?먯꽌 ?ㅻ챸, ?꾧린, ?덉빟 ?좎껌????踰덉뿉 ?뺤씤?????덉뒿?덈떎.</span>
      </div>
    `;
    return;
  }

  const reviews = coach.reviews || [];
  $("coachDetail").innerHTML = `
    <div class="detail-hero"><img src="${getDetailImage(coach)}" alt="" style="${getWideImageStyle(coach, "detailImagePosition")}"></div>
    <div class="detail-body">
      <div class="rank-badges">${getCoachBadges(coach).map(renderBadge).join("")}</div>
      <h2>${coach.name}</h2>
      <p class="detail-owner">${escapeHtml(coach.coachProfileName || coach.name)} 쨌 ${escapeHtml(coach.coachSummary || coach.tier || "肄붿튂")}</p>
      <div class="detail-trust">
        <strong>??${coach.rating.toFixed(1)} <span>(${coach.lessons || 0})</span></strong>
        <em>${reviews.length}媛??꾧린</em>
      </div>
      <p>${coach.tagline || coach.bio}</p>
      <div class="detail-summary">
        <div><span>媛寃?/span><strong>${coach.price}</strong></div>
        <div><span>?꾨Ц 遺꾩빞</span><strong>${(coach.roles || []).slice(0, 4).join(", ")}</strong></div>
      </div>
      <button class="primary detail-panel-button" type="button" data-detail-id="${escapeHtml(coach.id)}">?곸꽭蹂닿린</button>
    </div>
  `;
  $("coachDetail").querySelector("[data-detail-id]")?.addEventListener("click", () => openLessonDetail(coach.id));
}

function openLessonDetail(coachId) {
  const coach = state.coaches.find((item) => item.id === coachId);
  const modal = $("lessonDetailModal");
  if (!coach || !modal) return;
  state.selectedCoachId = coach.id;
  $("lessonDetailBody").innerHTML = renderLessonDetailMarkup(coach);
  mountBookingForm("lessonBookingMount", coach);
  modal.hidden = false;
}

function closeLessonDetail() {
  const modal = $("lessonDetailModal");
  if (modal) modal.hidden = true;
}

function getLessonFocusItems(coach) {
  const roles = (coach.roles || []).slice(0, 4);
  const purposeLabels = getPurposeLabels(coach.purpose).slice(0, 3);
  const fallback = ["由ы뵆?덉씠 ?듭떖 ?λ㈃ ?먭?", "?쇱씤???듦? 援먯젙", "?ㅼ쓬 寃뚯엫 ?곸슜 怨쇱젣 ?뺣━"];
  return [...roles, ...purposeLabels, ...fallback]
    .map((item) => String(item).trim())
    .filter(Boolean)
    .filter((item, index, array) => array.indexOf(item) === index)
    .slice(0, 6);
}

function getCoachDetailTone(coach) {
  const key = getCoachKey(coach);
  if (key === "shineast") return "?꾨줈? ?댁쁺 愿?먯쑝濡??쇱씤?? ?ㅻ뜑, ?寃뚯엫 ?먮떒源뚯? ?볤쾶 遊낅땲??";
  if (key === "mephi") return "?꾪봽濡?諛뷀? ?쇱씠??愿?먯쑝濡????쇱씤 ?쇰뱶諛깃낵 ?寃뚯엫 由щ럭源뚯? 媛?ν빀?덈떎.";
  if (key === "mireu") return "??곗뼱? ?쇰컲 ?섍컯?앹씠 諛붾줈 ?곕씪 ?????덇쾶 ?숈꽑怨??먮떒 湲곗????쎄쾶 ?뺣━?⑸땲??";
  if (key === "persona") return "???쇱씤 以묒떖???대줎怨?留ㅼ튂???댄빐?꾨? 李⑤텇?섍쾶 ?뺣━?⑸땲??";
  return "?꾩옱 ?뚮젅?댁뿉??諛붾줈 怨좎튌 ???덈뒗 ?듦?怨??ㅼ쓬 ?곗뒿 怨쇱젣瑜??뺣━?⑸땲??";
}

function renderLessonInfoBlocks(coach) {
  const focusItems = getLessonFocusItems(coach);
  const reviewCount = coach.reviews?.length || 0;
  return `
    <section class="lesson-info-grid">
      <article>
        <span>??媛뺤쓽?먯꽌 蹂대뒗 寃?/span>
        <ul>${focusItems.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </article>
      <article>
        <span>吏꾪뻾 諛⑹떇</span>
        <ul>
          <li>?붿뒪肄붾뱶 ?붾㈃怨듭쑀 ?먮뒗 由ы뵆?덉씠 由щ럭</li>
          <li>?듭떖 ?λ㈃ ?꾩＜濡??먯씤怨???덉쓣 ?뺣━</li>
          <li>?앸굹湲????ㅼ쓬 ?곗뒿 怨쇱젣 ?뺤씤</li>
        </ul>
      </article>
      <article>
        <span>異붿쿇 ???/span>
        <p>${escapeHtml(getCoachDetailTone(coach))}</p>
        <small>?먮ℓ ${coach.lessons || 0}??쨌 ?꾧린 ${reviewCount}媛?쨌 ?됱젏 ${coach.rating.toFixed(1)}</small>
      </article>
    </section>
  `;
}

function renderLessonDetailMarkup(coach) {
  const reviews = coach.reviews || [];
  return `
    <div class="lesson-detail-hero"><img src="${getDetailImage(coach)}" alt="" style="${getWideImageStyle(coach, "detailImagePosition")}"></div>
    <div class="lesson-detail-body">
      <div class="rank-badges">${getCoachBadges(coach).map(renderBadge).join("")}</div>
      <h2 id="lessonDetailTitle">${escapeHtml(coach.name)}</h2>
      <p class="detail-owner">${escapeHtml(coach.coachProfileName || coach.name)} 쨌 ${escapeHtml(coach.coachSummary || coach.tier || "肄붿튂")}</p>
      <div class="detail-trust">
        <strong>??${coach.rating.toFixed(1)} <span>(${coach.lessons || 0})</span></strong>
        <em>${reviews.length}媛??꾧린</em>
      </div>
      <p>${escapeHtml(coach.bio || coach.tagline || "")}</p>
      <div class="detail-summary">
        <div><span>媛寃?/span><strong>${escapeHtml(coach.price)}</strong></div>
        <div><span>?꾨Ц 遺꾩빞</span><strong>${escapeHtml((coach.roles || []).slice(0, 5).join(", "))}</strong></div>
      </div>
      ${renderLessonInfoBlocks(coach)}
      ${reviews.length ? `
        <section class="review-preview full">
          <div>
            <strong>?꾧린</strong>
            <span>${reviews.length}媛?/span>
          </div>
          ${reviews.slice(0, 3).map(([name, body]) => `<p><b>${escapeHtml(name)}</b> ${escapeHtml(body)}</p>`).join("")}
        </section>
      ` : ""}
      <section class="booking-panel">
        <div class="booking-panel-head">
          <div>
            <strong>?덉빟 ?좎껌</strong>
            <span>Riot ID? ?щ쭩 ?쒓컙???④린硫??댁쁺吏꾩씠 ?뺤씤?⑸땲??</span>
          </div>
          <em>${escapeHtml(coach.price)}</em>
        </div>
        <div class="booking-note">
          ?붿뒪肄붾뱶 ?붾㈃怨듭쑀 ?먮뒗 由ы뵆?덉씠 由щ럭濡?吏꾪뻾?⑸땲??
        </div>
        <div class="booking-route">
          <button class="secondary" type="button" onclick="openAuthModal('login')">?뚯썝?쇰줈 ?덉빟</button>
          <button class="secondary" type="button" onclick="openAuthModal('guest')">鍮꾪쉶??援щℓ</button>
        </div>
        <div id="lessonBookingMount"></div>
      </section>
    </div>
  `;
}

function mountBookingForm(mountId, coach) {
  const mount = $(mountId);
  if (!mount) return;
  const form = $("bookingFormTemplate").content.cloneNode(true);
  mount.appendChild(form);
  $("bookingStudentLabel").textContent = text.bookingStudentLabel;
  $("bookingContactLabel").textContent = text.bookingContactLabel;
  $("bookingTimeLabel").textContent = text.bookingTimeLabel;
  $("bookingMemoLabel").textContent = text.bookingMemoLabel;
  $("bookingSubmitBtn").textContent = text.bookingSubmitBtn;
  $("bookingForm").student.placeholder = "?? ?됰꽕??KR1";
  $("bookingForm").contact.placeholder = "?? Discord ID";
  $("bookingForm").time.placeholder = "?? 8/10 21:00";
  $("bookingForm").memo.placeholder = "?쇱씤, 梨뷀뵾?? 怨좊????곸뼱二쇱꽭??";
  $("bookingForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const submitButton = $("bookingSubmitBtn");
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = "?덉빟 ?꾩넚 以?;
    const data = new FormData(event.target);
    const reservation = {
      coachId: coach.id,
      coachName: coach.name,
      coachCategory: coach.category,
      coachPrice: coach.price,
      student: data.get("student"),
      contact: data.get("contact"),
      time: data.get("time"),
      memo: data.get("memo") || "",
    };

    try {
      await submitReservation(reservation);
      await loadReservations({ promptForLogin: false, silent: true });
      event.target.reset();
      alert("?덉빟 ?좎껌???묒닔?먯뒿?덈떎. ?댁쁺吏꾩씠 ?곕씫?쒕┫寃뚯슂.");
      render();
    } catch (error) {
      alert(`?덉빟 ?좎껌????ν븯吏 紐삵뻽?듬땲??\n${error.message}`);
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  });
}

async function submitReservation(reservation) {
  if (!API_BASE_URL || API_BASE_URL.includes("YOUR-COACH-API")) {
    throw new Error("?덉빟 API 二쇱냼媛 ?꾩쭅 ?ㅼ젙?섏? ?딆븯?듬땲??");
  }
  const response = await fetch(`${API_BASE_URL.replace(/\/$/, "")}/api/reservations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reservation),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || !result.ok) {
    const detail = result.error ? `?ㅻ쪟: ${result.error}` : `HTTP ${response.status}`;
    throw new Error(detail);
  }
  return result.reservation || {};
}

async function ensureAdminAccess() {
  if (sessionStorage.getItem(ADMIN_TOKEN_KEY)) return true;
  return loginForReservations();
}

async function loginForReservations() {
  const password = window.prompt("愿由ъ옄 鍮꾨?踰덊샇瑜??낅젰?섏꽭??");
  if (!password) return false;

  const response = await fetch(`${API_BASE_URL.replace(/\/$/, "")}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ password }),
  });
  const result = await response.json().catch(() => ({}));
  if (response.ok && result.ok && result.adminToken) {
    sessionStorage.setItem(ADMIN_TOKEN_KEY, result.adminToken);
  }
  return response.ok && result.ok;
}

async function fetchReservations() {
  const adminToken = sessionStorage.getItem(ADMIN_TOKEN_KEY);
  const response = await fetch(`${API_BASE_URL.replace(/\/$/, "")}/api/reservations`, {
    method: "GET",
    credentials: "include",
    headers: adminToken ? { Authorization: `Bearer ${adminToken}` } : {},
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || !result.ok) {
    const error = new Error(result.error || `HTTP ${response.status}`);
    error.status = response.status;
    throw error;
  }
  return (result.reservations || []).map(mapReservationFromApi);
}

async function loadReservations(options = {}) {
  const { promptForLogin = true, silent = false } = options;
  if (!API_BASE_URL || API_BASE_URL.includes("YOUR-COACH-API")) return;
  if (!silent) {
    state.bookingLoadState = "loading";
    state.bookingLoadError = "";
    renderBookings();
  }

  try {
    state.bookings = await fetchReservations();
    state.bookingLoadState = "loaded";
    state.bookingLoadError = "";
    renderMetrics();
    renderBookings();
  } catch (error) {
    if (error.status === 401 && promptForLogin) {
      const loggedIn = await loginForReservations();
      if (loggedIn) {
        return loadReservations({ promptForLogin: false, silent });
      }
    }
    if (!silent) {
      state.bookingLoadState = "error";
      state.bookingLoadError = "?덉빟 紐⑸줉??遺덈윭?ㅼ? 紐삵뻽?듬땲??";
      renderBookings();
    }
  }
}

function mapReservationFromApi(reservation) {
  const feedback = reservation.feedback_metadata || {};
  return {
    id: reservation.id || "",
    status: reservation.status || "?좉퇋",
    createdAt: reservation.created_at || "",
    createdAtText: formatDateTime(reservation.created_at),
    coachName: reservation.coach_name || "-",
    coachPrice: reservation.coach_price || "-",
    source: reservation.source || "-",
    feedback,
    isDiscordFeedback: reservation.source === "discord-feedback",
    studentName: reservation.student_name || "-",
    preferredTime: reservation.preferred_time || "-",
    student: reservation.student_name || "-",
    lesson: reservation.coach_name || "-",
    time: reservation.preferred_time || "-",
    contact: reservation.contact || "-",
    memo: reservation.memo || "-",
  };
}

function getAdminHeaders(includeJson = false) {
  const adminToken = sessionStorage.getItem(ADMIN_TOKEN_KEY);
  return {
    ...(includeJson ? { "Content-Type": "application/json" } : {}),
    ...(adminToken ? { Authorization: `Bearer ${adminToken}` } : {}),
  };
}

async function runAdminRequest(callback) {
  try {
    return await callback();
  } catch (error) {
    if (error.status === 401) {
      const loggedIn = await loginForReservations();
      if (loggedIn) return callback();
    }
    throw error;
  }
}

async function loadCoachesFromApi() {
  if (!API_BASE_URL || API_BASE_URL.includes("YOUR-COACH-API")) {
    state.coaches = migrateCoachImages(structuredClone(samples));
    state.coachLoadState = "loaded";
    render();
    return;
  }
  const hasFallbackCoaches = state.coaches.length > 0;
  if (!hasFallbackCoaches) {
    state.coachLoadState = "loading";
    render();
  }
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), COACH_API_TIMEOUT_MS);
  try {
    const response = await fetch(`${API_BASE_URL.replace(/\/$/, "")}/api/coaches`, {
      signal: controller.signal,
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || !result.ok) throw new Error(result.error || `HTTP ${response.status}`);
    if (Array.isArray(result.coaches) && result.coaches.length) {
      state.coaches = migrateCoachImages(result.coaches);
      if (state.selectedCoachId && !state.coaches.some((coach) => coach.id === state.selectedCoachId)) {
        state.selectedCoachId = null;
      }
      state.coachLoadState = "loaded";
      render();
    } else {
      state.coachLoadState = hasFallbackCoaches ? "loaded" : "empty";
      render();
    }
  } catch (error) {
    state.coachLoadState = hasFallbackCoaches ? "loaded" : "error";
    console.warn("肄붿튂 紐⑸줉??遺덈윭?ㅼ? 紐삵뻽?듬땲??", error);
    render();
  } finally {
    clearTimeout(timeoutId);
  }
}

async function saveCoachToApi(coach, sortOrder) {
  const response = await fetch(`${API_BASE_URL.replace(/\/$/, "")}/api/coaches/${encodeURIComponent(coach.id)}`, {
    method: "PATCH",
    headers: getAdminHeaders(true),
    credentials: "include",
    body: JSON.stringify({ ...coach, sortOrder }),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || !result.ok) {
    const error = new Error(result.error || `HTTP ${response.status}`);
    error.status = response.status;
    throw error;
  }
  return result.coach || coach;
}

async function deleteCoachFromApi(id) {
  const response = await fetch(`${API_BASE_URL.replace(/\/$/, "")}/api/coaches/${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: getAdminHeaders(),
    credentials: "include",
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || !result.ok) {
    const error = new Error(result.error || `HTTP ${response.status}`);
    error.status = response.status;
    throw error;
  }
}

async function resetCoachesToSamples() {
  const nextCoaches = structuredClone(samples);
  try {
    const response = await runAdminRequest(async () => {
      const request = await fetch(`${API_BASE_URL.replace(/\/$/, "")}/api/coaches/reset`, {
        method: "POST",
        headers: getAdminHeaders(true),
        credentials: "include",
        body: JSON.stringify({ coaches: nextCoaches }),
      });
      const result = await request.json().catch(() => ({}));
      if (!request.ok || !result.ok) {
        const error = new Error(result.error || `HTTP ${request.status}`);
        error.status = request.status;
        throw error;
      }
      return result;
    });
    state.coaches = migrateCoachImages(response.coaches || nextCoaches);
    state.selectedCoachId = null;
    render();
  } catch (error) {
    alert(`肄붿튂 ?섑뵆??DB????ν븯吏 紐삵뻽?듬땲??\n${error.message}`);
  }
}

async function updateReservationStatus(id, status) {
  const response = await fetch(`${API_BASE_URL.replace(/\/$/, "")}/api/reservations/${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: getAdminHeaders(true),
    credentials: "include",
    body: JSON.stringify({ status }),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || !result.ok) {
    const error = new Error(result.error || `HTTP ${response.status}`);
    error.status = response.status;
    throw error;
  }
  return mapReservationFromApi(result.reservation || {});
}

async function deleteReservation(id) {
  const response = await fetch(`${API_BASE_URL.replace(/\/$/, "")}/api/reservations/${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: getAdminHeaders(),
    credentials: "include",
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || !result.ok) {
    const error = new Error(result.error || `HTTP ${response.status}`);
    error.status = response.status;
    throw error;
  }
}

async function changeReservationStatus(id, status) {
  const previousBookings = structuredClone(state.bookings);
  state.bookings = state.bookings.map((booking) => booking.id === id ? { ...booking, status } : booking);
  renderBookings();

  try {
    const updated = await updateReservationStatus(id, status);
    state.bookings = state.bookings.map((booking) => booking.id === id ? updated : booking);
    renderBookings();
  } catch (error) {
    state.bookings = previousBookings;
    renderBookings();
    if (error.status === 401) {
      const loggedIn = await loginForReservations();
      if (loggedIn) return changeReservationStatus(id, status);
    }
    alert(`?덉빟 ?곹깭瑜?蹂寃쏀븯吏 紐삵뻽?듬땲??\n${error.message}`);
  }
}

async function completeReservation(id) {
  await changeReservationStatus(id, "?꾨즺");
  if (state.bookingFilterStatus !== "all" && state.bookingFilterStatus !== "?꾨즺") {
    renderBookings();
  }
}

async function removeReservation(id) {
  if (!window.confirm("???덉빟???꾩쟾????젣?좉퉴?? ??젣?섎㈃ 紐⑸줉?먯꽌 ?щ씪吏묐땲??")) return;
  try {
    await runAdminRequest(() => deleteReservation(id));
    state.bookings = state.bookings.filter((booking) => booking.id !== id);
    if (state.selectedBookingId === id) state.selectedBookingId = null;
    renderMetrics();
    renderBookings();
  } catch (error) {
    alert(`?덉빟????젣?섏? 紐삵뻽?듬땲??\n${error.message}`);
  }
}

function getFilteredBookings() {
  return state.bookings.filter((booking) => {
    const statusMatches = state.bookingFilterStatus === "all" || booking.status === state.bookingFilterStatus;
    const haystack = [booking.studentName, booking.coachName, booking.contact, booking.memo].join(" ").toLowerCase();
    return statusMatches && (!state.bookingQuery || haystack.includes(state.bookingQuery));
  });
}

function renderStatusOptions(selectedStatus) {
  return RESERVATION_STATUSES.map((status) => `
    <option value="${status}" ${status === selectedStatus ? "selected" : ""}>${status}</option>
  `).join("");
}

function renderBookingDetail() {
  const panel = $("bookingDetail");
  const booking = state.bookings.find((item) => item.id === state.selectedBookingId);
  if (!booking) {
    panel.hidden = true;
    panel.innerHTML = "";
    return;
  }
  if (booking.isDiscordFeedback) {
    const attachment = booking.feedback?.attachment || {};
    panel.hidden = false;
    panel.innerHTML = `
      <h3>Discord /?쇰뱶諛??묒닔</h3>
      <div class="booking-detail-grid">
        ${renderDetailItem("?좎껌 ?쒓컙", booking.createdAtText)}
        ${renderDetailItem("?섍컯??Riot ID", booking.studentName)}
        ${renderDetailItem("梨뷀뵾??諛?K/D/A", booking.coachPrice)}
        ${renderDetailItem("?꾩옱 ?곹깭", booking.status)}
        ${renderDetailItem("Discord ?좎껌??, `${booking.feedback?.discord_display_name || "-"} (${booking.feedback?.discord_user_id || "-"})`)}
        ${renderDetailItem("?쒕쾭 / 梨꾨꼸", `${booking.feedback?.guild_name || "-"} / ${booking.feedback?.channel_name || "-"}`)}
        ${renderDetailLink("ROFL ?뚯씪", attachment.filename, attachment.url)}
        ${renderDetailItem("臾몄쓽?ы빆", booking.feedback?.inquiry || booking.memo, true)}
      </div>
    `;
    return;
  }
  panel.hidden = false;
  panel.innerHTML = `
    <h3>?덉빟 ?곸꽭</h3>
    <div class="booking-detail-grid">
      ${renderDetailItem("?덉빟 ID", booking.id)}
      ${renderDetailItem("?좎껌 ?쒓컙", booking.createdAtText)}
      ${renderDetailItem("肄붿튂紐?, booking.coachName)}
      ${renderDetailItem("?곹뭹 媛寃?, booking.coachPrice)}
      ${renderDetailItem("?묒닔 寃쎈줈", booking.source)}
      ${renderDetailItem("?섍컯??Riot ID", booking.studentName)}
      ${renderDetailItem("?곕씫泥?, booking.contact)}
      ${renderDetailItem("?щ쭩 ?쒓컙", booking.preferredTime)}
      ${renderDetailItem("?꾩옱 ?곹깭", booking.status)}
      ${renderDetailItem("?붿껌?ы빆", booking.memo, true)}
    </div>
  `;
}

function renderDetailItem(label, value, wide = false) {
  return `
    <div class="booking-detail-item ${wide ? "wide" : ""}">
      <span>${label}</span>
      <strong>${escapeHtml(value || "-")}</strong>
    </div>
  `;
}

function renderDetailLink(label, text, url) {
  const link = url ? `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(text || "?ㅼ슫濡쒕뱶")}</a>` : "-";
  return `
    <div class="booking-detail-item">
      <span>${label}</span>
      <strong>${link}</strong>
    </div>
  `;
}

function formatDateTime(value) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("ko-KR", { dateStyle: "short", timeStyle: "short" });
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderBookings() {
  $("bookingStatusFilter").innerHTML = `
    <option value="all">?꾩껜 ?곹깭</option>
    ${renderStatusOptions(state.bookingFilterStatus)}
  `;
  $("bookingStatusFilter").value = state.bookingFilterStatus;
  $("bookingSearchInput").value = state.bookingQuery;

  if (state.bookingLoadState === "loading") {
    $("bookingRows").innerHTML = `<tr><td colspan="7">?덉빟 紐⑸줉??遺덈윭?ㅻ뒗 以묒엯?덈떎.</td></tr>`;
    renderBookingDetail();
    return;
  }
  if (state.bookingLoadState === "error") {
    $("bookingRows").innerHTML = `<tr><td colspan="7">${state.bookingLoadError || "?덉빟 紐⑸줉??遺덈윭?ㅼ? 紐삵뻽?듬땲??"}</td></tr>`;
    renderBookingDetail();
    return;
  }
  const visibleBookings = getFilteredBookings();
  if (state.selectedBookingId && !state.bookings.some((booking) => booking.id === state.selectedBookingId)) {
    state.selectedBookingId = null;
  }

  $("bookingRows").innerHTML = visibleBookings.length ? visibleBookings.map((booking) => `
    <tr class="booking-row" data-booking-id="${escapeHtml(booking.id)}">
      <td>
        <select class="status-select" data-booking-status="${escapeHtml(booking.id)}">
          ${renderStatusOptions(booking.status)}
        </select>
      </td>
      <td>${escapeHtml(booking.student)}</td>
      <td>${escapeHtml(booking.lesson)}</td>
      <td>${escapeHtml(booking.time)}</td>
      <td>${escapeHtml(booking.contact)}</td>
      <td>${escapeHtml(booking.memo)}</td>
      <td>
        <div class="booking-actions">
          <button type="button" class="mini primary-mini" data-booking-complete="${escapeHtml(booking.id)}">?꾨즺</button>
          <button type="button" class="mini danger-mini" data-booking-delete="${escapeHtml(booking.id)}">??젣</button>
        </div>
      </td>
    </tr>
  `).join("") : `<tr><td colspan="7">?덉빟???놁뒿?덈떎.</td></tr>`;

  document.querySelectorAll("[data-booking-id]").forEach((row) => {
    row.addEventListener("click", () => {
      state.selectedBookingId = row.dataset.bookingId;
      renderBookingDetail();
    });
  });
  document.querySelectorAll("[data-booking-status]").forEach((select) => {
    select.addEventListener("click", (event) => event.stopPropagation());
    select.addEventListener("change", (event) => {
      changeReservationStatus(select.dataset.bookingStatus, event.target.value);
    });
  });
  document.querySelectorAll("[data-booking-complete]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      completeReservation(button.dataset.bookingComplete);
    });
  });
  document.querySelectorAll("[data-booking-delete]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      removeReservation(button.dataset.bookingDelete);
    });
  });
  renderBookingDetail();
}

function renderAdmin() {
  const groups = new Map();
  state.coaches.forEach((coach) => {
    const name = String(coach.coachProfileName || coach.name || "?대쫫 ?놁쓬").trim();
    if (!groups.has(name)) groups.set(name, []);
    groups.get(name).push(coach);
  });

  $("adminCoachList").innerHTML = groups.size ? [...groups.entries()].map(([name, coaches]) => `
    <section class="admin-coach-group">
      <div class="admin-coach-head">
        <strong>${name}</strong>
        <span>${coaches.length}媛?媛뺤쓽</span>
      </div>
      ${coaches.map((coach) => `
        <button class="admin-row" type="button" data-id="${coach.id}">
          <img src="${coach.image}" alt="">
          <span>
            <h4>${coach.tagline || coach.name}</h4>
            <p>${categoryLabel(coach.category)} 쨌 ${coach.price}</p>
          </span>
          <span class="chip">?섏젙</span>
        </button>
      `).join("")}
    </section>
  `).join("") : `<div class="empty">?깅줉??媛뺤쓽媛 ?놁뒿?덈떎.</div>`;

  document.querySelectorAll(".admin-row").forEach((row) => {
    row.addEventListener("click", () => fillCoachForm(state.coaches.find((coach) => coach.id === row.dataset.id)));
  });
}

function getCoachSelfLessons() {
  return state.coaches.filter((coach) => coach.category === "league" && getCoachKey(coach) === state.coachSelfKey);
}

function renderCoachSelf() {
  if (!$("coachSelfTabs") || !$("coachSelfLessonGrid") || !$("coachSelfEditor")) return;
  const identities = getCoachIdentities("league");
  if (!identities.some((coach) => coach.key === state.coachSelfKey)) {
    state.coachSelfKey = identities[0]?.key || "shineast";
  }
  const current = identities.find((coach) => coach.key === state.coachSelfKey);
  $("coachSelfTabs").innerHTML = identities.map((coach) => `
    <button class="coach-self-tab ${coach.key === state.coachSelfKey ? "active" : ""}" type="button" data-self-coach-key="${escapeHtml(coach.key)}">
      ${escapeHtml(coach.name)}
    </button>
  `).join("");
  $("coachSelfName").textContent = current ? current.name : "肄붿튂 ?좏깮";
  $("coachSelfHint").textContent = current ? `${current.tier} 쨌 ${current.lessons}媛?媛뺤쓽` : "媛뺤쓽瑜??좏깮?섎㈃ ?ㅻⅨ履쎌뿉???섏젙?⑸땲??";

  const lessons = getCoachSelfLessons();
  if (state.coachSelfLessonId && !lessons.some((lesson) => lesson.id === state.coachSelfLessonId)) {
    state.coachSelfLessonId = null;
  }
  $("coachSelfLessonGrid").innerHTML = lessons.length ? lessons.map((lesson) => `
    <button class="coach-self-card ${lesson.id === state.coachSelfLessonId ? "active" : ""}" type="button" data-self-lesson-id="${escapeHtml(lesson.id)}">
      <img src="${lesson.image}" alt="" style="${getImageStyle(lesson)}">
      <span>
        <strong>${escapeHtml(lesson.name)}</strong>
        <small>${escapeHtml(lesson.tagline || "媛뺤쓽 ?ㅻ챸 ?놁쓬")}</small>
        <em>${escapeHtml(lesson.price || "媛寃??곷떞")}</em>
      </span>
    </button>
  `).join("") : `<div class="empty">??肄붿튂?먭쾶 ?곌껐??媛뺤쓽媛 ?놁뒿?덈떎.</div>`;

  document.querySelectorAll("[data-self-coach-key]").forEach((button) => {
    button.addEventListener("click", () => {
      state.coachSelfKey = button.dataset.selfCoachKey;
      state.coachSelfLessonId = null;
      renderCoachSelf();
    });
  });
  document.querySelectorAll("[data-self-lesson-id]").forEach((button) => {
    button.addEventListener("click", () => {
      state.coachSelfLessonId = button.dataset.selfLessonId;
      renderCoachSelf();
    });
  });
  renderCoachSelfEditor();
}

function renderCoachSelfEditor() {
  const editor = $("coachSelfEditor");
  const lesson = state.coaches.find((coach) => coach.id === state.coachSelfLessonId);
  if (!lesson) {
    editor.innerHTML = `
      <div class="detail-empty">
        <strong>媛뺤쓽瑜??좏깮?댁＜?몄슂.</strong>
        <span>?좏깮??肄붿튂??媛뺤쓽留??ш린?먯꽌 媛쒕퀎 ?섏젙?????덉뒿?덈떎.</span>
      </div>
    `;
    return;
  }
  const amount = String(lesson.price || "").match(/[\d,]+/)?.[0]?.replace(/[^\d]/g, "") || "";
  const unitType = String(lesson.price || "").includes("寃뚯엫") ? "game" : "time";
  const unit = String(lesson.price || "").split("/")[1]?.trim() || (unitType === "game" ? "1寃뚯엫" : "1?쒓컙");
  const filters = filterSets.league;
  const purposeOptions = filters.type.filter((item) => item.id !== "all");
  const selectedPurposes = getCoachPurposes(lesson);
  const selectedRoles = lesson.roles || [];
  editor.innerHTML = `
    <form class="coach-self-form" id="coachSelfForm">
      <input type="hidden" id="coachSelfLessonId" value="${escapeHtml(lesson.id)}">
      <div class="coach-self-editor-head">
        <div>
          <span>${escapeHtml(lesson.coachProfileName || "肄붿튂")}</span>
          <h3>${escapeHtml(lesson.name)}</h3>
        </div>
        <button type="submit" class="primary" id="coachSelfSaveBtn">???/button>
      </div>
      <label>媛뺤쓽紐?input id="coachSelfLessonName" required value="${escapeHtml(lesson.name)}"></label>
      <label>??以??뚭컻<input id="coachSelfTagline" required value="${escapeHtml(lesson.tagline || "")}"></label>
      <div class="price-builder">
        <label><span>媛寃?/span><input id="coachSelfPriceAmount" inputmode="numeric" value="${escapeHtml(amount)}"></label>
        <label><span>湲곗?</span>
          <select id="coachSelfPriceUnitType">
            <option value="time" ${unitType === "time" ? "selected" : ""}>?쒓컙</option>
            <option value="game" ${unitType === "game" ? "selected" : ""}>寃뚯엫</option>
          </select>
        </label>
        <label><span>?⑥쐞</span><select id="coachSelfPriceUnit"></select></label>
        <input id="coachSelfPrice" type="hidden">
      </div>
      ${["?좊쾭?쒕뜑", "理쒖슦??].includes(lesson.tier) ? `
        <label class="toggle-line">
          <input id="coachSelfFeaturedAd" type="checkbox" ${lesson.featuredAd ? "checked" : ""}>
          <span>??媛뺤쓽瑜??곷떒 異붿쿇 愿묎퀬濡??몄텧</span>
        </label>
      ` : ""}
      <fieldset class="choice-field">
        <legend>遺꾨쪟</legend>
        <div class="choice-grid">
          ${purposeOptions.map((item) => `<label><input type="checkbox" name="coachSelfPurposeChoice" value="${item.id}" ${selectedPurposes.includes(item.id) ? "checked" : ""}> ${item.label}</label>`).join("")}
        </div>
      </fieldset>
      <fieldset class="choice-field">
        <legend>?꾨Ц 遺꾩빞</legend>
        <div class="choice-grid">
          ${[...adminLineOptions.league, ...adminFieldOptions.league].map((role) => `<label><input type="checkbox" name="coachSelfRoleChoice" value="${role}" ${selectedRoles.includes(role) ? "checked" : ""}> ${role}</label>`).join("")}
        </div>
      </fieldset>
      <label>?곸꽭 ?ㅻ챸<textarea id="coachSelfBio" rows="7">${escapeHtml(lesson.bio || "")}</textarea></label>
      <div class="form-actions">
        <button type="button" class="secondary" id="coachSelfOpenFullEditBtn">?꾩껜 ?몄쭛 ?붾㈃?먯꽌 ?닿린</button>
        <span class="save-status" id="coachSelfSaveStatus" aria-live="polite"></span>
      </div>
    </form>
  `;
  renderCoachSelfPriceUnitOptions(unitType, unit);
  updateCoachSelfPriceValue();
  $("coachSelfPriceUnitType").addEventListener("change", () => {
    renderCoachSelfPriceUnitOptions($("coachSelfPriceUnitType").value);
    updateCoachSelfPriceValue();
  });
  $("coachSelfPriceAmount").addEventListener("input", updateCoachSelfPriceValue);
  $("coachSelfPriceUnit").addEventListener("change", updateCoachSelfPriceValue);
  $("coachSelfForm").addEventListener("submit", saveCoachSelfLesson);
  $("coachSelfOpenFullEditBtn").addEventListener("click", () => {
    state.activeView = "admin";
    render();
    fillCoachForm(lesson);
  });
}

function renderCoachSelfPriceUnitOptions(type, selected = "") {
  const units = priceUnits[type] || priceUnits.time;
  $("coachSelfPriceUnit").innerHTML = units.map((item) => `<option value="${item}" ${item === selected ? "selected" : ""}>${item}</option>`).join("");
}

function updateCoachSelfPriceValue() {
  const amount = Number(String($("coachSelfPriceAmount")?.value || "").replace(/[^\d]/g, ""));
  const amountText = amount ? `${amount.toLocaleString("ko-KR")}?? : "媛寃??곷떞";
  if ($("coachSelfPrice")) $("coachSelfPrice").value = `${amountText} / ${$("coachSelfPriceUnit").value}`;
}

async function saveCoachSelfLesson(event) {
  event.preventDefault();
  const id = $("coachSelfLessonId").value;
  const previous = state.coaches.find((coach) => coach.id === id);
  if (!previous) return;
  const saveButton = $("coachSelfSaveBtn");
  saveButton.disabled = true;
  $("coachSelfSaveStatus").textContent = "???以?..";
  $("coachSelfSaveStatus").className = "save-status loading";
  const next = {
    ...previous,
    manualCoachEdit: true,
    name: $("coachSelfLessonName").value.trim(),
    tagline: $("coachSelfTagline").value.trim(),
    price: (updateCoachSelfPriceValue(), $("coachSelfPrice").value.trim() || "媛寃??곷떞"),
    featuredAd: Boolean($("coachSelfFeaturedAd")?.checked),
    featuredAdUpdatedAt: $("coachSelfFeaturedAd")?.checked ? new Date().toISOString() : "",
    purpose: getCheckedValues("coachSelfPurposeChoice"),
    roles: getCheckedValues("coachSelfRoleChoice"),
    bio: $("coachSelfBio").value.trim(),
  };
  const previousIndex = state.coaches.findIndex((coach) => coach.id === id);
  try {
    const savedCoach = await runAdminRequest(() => saveCoachToApi(next, previousIndex));
    state.coaches = state.coaches.map((coach) => coach.id === id ? migrateCoachImages([savedCoach])[0] : coach);
    $("coachSelfSaveStatus").textContent = "????꾨즺";
    $("coachSelfSaveStatus").className = "save-status success";
    renderCoachSelf();
  } catch (error) {
    $("coachSelfSaveStatus").textContent = "????ㅽ뙣";
    $("coachSelfSaveStatus").className = "save-status error";
    alert(`媛뺤쓽 ?뺣낫瑜???ν븯吏 紐삵뻽?듬땲??\n${error.message}`);
  } finally {
    saveButton.disabled = false;
  }
}

function fillCoachForm(coach) {
  $("coachId").value = coach?.id || "";
  $("coachCategory").value = coach?.category || state.category;
  $("coachName").value = coach?.name || "";
  $("coachTagline").value = coach?.tagline || "";
  renderAdminChoiceControls(getCoachPurposes(coach), coach?.roles || [], coach?.badges || []);
  setPriceFields(coach?.price || "");
  $("coachImage").value = coach?.image || "assets/lollogo.png";
  $("coachFeaturedImage").value = coach?.featuredImage || coach?.bannerImage || "";
  $("coachDetailImage").value = coach?.detailImage || coach?.bannerImage || "";
  $("coachImagePosition").value = coach?.imagePosition || "center center";
  $("coachBio").value = coach?.bio || "";
  $("coachImageFile").value = "";
  $("coachFeaturedImageFile").value = "";
  $("coachDetailImageFile").value = "";
  updateCoachImagePreview();
  updateWideImagePreview("coachFeaturedImage", "coachFeaturedImagePreview");
  updateWideImagePreview("coachDetailImage", "coachDetailImagePreview");
}

function renderAdminChoiceControls(selectedPurposes = [], selectedRoles = [], selectedBadges = []) {
  const category = $("coachCategory").value || state.category || "league";
  const filters = filterSets[category] || filterSets.league;
  const purposeOptions = filters.type.filter((item) => item.id !== "all");
  if ($("coachPurposeChoices")) $("coachPurposeChoices").innerHTML = purposeOptions.map((item) => `
    <label><input type="checkbox" name="coachPurposeChoice" value="${item.id}" ${selectedPurposes.includes(item.id) ? "checked" : ""}> ${item.label}</label>
  `).join("");

  const lineOptions = adminLineOptions[category] || adminLineOptions.league;
  const fieldOptions = adminFieldOptions[category] || adminFieldOptions.league;
  if ($("coachRoleChoices")) $("coachRoleChoices").innerHTML = `
    <div class="choice-subgroup">
      <span>?쇱씤</span>
      <div class="choice-grid">
        ${lineOptions.map((role) => `<label><input type="checkbox" name="coachRoleChoice" value="${role}" ${selectedRoles.includes(role) ? "checked" : ""}> ${role}</label>`).join("")}
      </div>
    </div>
    <div class="choice-subgroup">
      <span>遺꾩빞</span>
      <div class="choice-grid">
        ${fieldOptions.map((role) => `<label><input type="checkbox" name="coachRoleChoice" value="${role}" ${selectedRoles.includes(role) ? "checked" : ""}> ${role}</label>`).join("")}
      </div>
    </div>
  `;

  if ($("coachBadgeChoices") && $("coachBadgeSelect")) {
    renderBadgePicker(selectedBadges);
  } else if ($("coachBadges")) {
    $("coachBadges").value = selectedBadges.join(", ");
  }
}

function renderBadgePicker(selectedBadges = []) {
  const selected = [...new Set(selectedBadges.filter(Boolean))];
  if (!$("coachBadgeSelect") || !$("coachBadgeChoices")) return;
  $("coachBadgeSelect").innerHTML = `
    <option value="">諛곗? ?좏깮</option>
    ${badgeOptions
      .filter((badge) => !selected.includes(badge))
      .map((badge) => `<option value="${badge}">${badge}</option>`)
      .join("")}
  `;
  $("coachBadgeChoices").innerHTML = selected.length ? selected.map((badge) => `
    <label><input type="checkbox" name="coachBadgeChoice" value="${badge}" checked> ${badge}</label>
  `).join("") : `<span class="choice-empty">?좏깮??諛곗? ?놁쓬</span>`;
}

function addSelectedBadge() {
  if (!$("coachBadgeSelect")) return;
  const badge = $("coachBadgeSelect").value;
  if (!badge) return;
  renderBadgePicker([...getCheckedValues("coachBadgeChoice"), badge]);
}

function getCheckedValues(name) {
  return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map((input) => input.value);
}

function getTierFromBadges(badges, fallback = "?쇰컲") {
  if (badges.includes("?좊쾭?쒕뜑")) return "?좊쾭?쒕뜑";
  if (badges.includes("理쒖슦??)) return "理쒖슦??;
  if (badges.includes("?곗닔")) return "?곗닔";
  if (badges.includes("?쇰컲")) return "?쇰컲";
  return fallback || "?쇰컲";
}

function setCoachSaveStatus(message = "", type = "") {
  const status = $("coachSaveStatus");
  if (!status) return;
  status.textContent = message;
  status.className = `save-status ${type}`.trim();
}

function renderPriceUnitOptions(type, selected = "") {
  const units = priceUnits[type] || priceUnits.time;
  $("coachPriceUnit").innerHTML = units.map((unit) => `<option value="${unit}" ${unit === selected ? "selected" : ""}>${unit}</option>`).join("");
}

function setPriceFields(price) {
  const textPrice = String(price || "");
  const amount = textPrice.match(/[\d,]+/)?.[0]?.replace(/[^\d]/g, "") || "";
  const unit = textPrice.includes("寃뚯엫") ? "game" : "time";
  const unitText = textPrice.split("/")[1]?.trim() || (unit === "game" ? "1寃뚯엫" : "1?쒓컙");
  $("coachPriceAmount").value = amount;
  $("coachPriceUnitType").value = unit;
  renderPriceUnitOptions(unit, unitText);
  updateCoachPriceValue();
}

function updateCoachPriceValue() {
  const amount = Number(String($("coachPriceAmount").value || "").replace(/[^\d]/g, ""));
  const amountText = amount ? `${amount.toLocaleString("ko-KR")}?? : "媛寃??곷떞";
  $("coachPrice").value = `${amountText} / ${$("coachPriceUnit").value}`;
}

function updateCoachImagePreview() {
  const preview = $("coachImagePreview");
  preview.style.backgroundImage = `url("${$("coachImage").value.trim() || "assets/lollogo.png"}")`;
  preview.style.backgroundPosition = "center center";
  preview.style.backgroundSize = "cover";
}

function updateWideImagePreview(inputId, previewId) {
  const preview = $(previewId);
  if (!preview) return;
  const image = $(inputId).value.trim();
  preview.style.backgroundImage = image ? `url("${image}")` : "none";
  preview.style.backgroundPosition = "center center";
  preview.style.backgroundSize = "cover";
}

function handleCoachImageFile(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    alert("?대?吏 ?뚯씪留??좏깮?????덉뒿?덈떎.");
    event.target.value = "";
    return;
  }
  if (file.size > 1024 * 1024) {
    alert("?대?吏??1MB ?댄븯濡??щ젮二쇱꽭?? ???대?吏???덊럹?댁? ???怨듦컙??湲덈갑 梨꾩썎?덈떎.");
    event.target.value = "";
    return;
  }
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    state.cropSourceImage = String(reader.result || "");
    $("coachImage").value = state.cropSourceImage;
    updateCoachImagePreview();
    openCropModal({
      inputId: "coachImage",
      previewId: "coachImagePreview",
      width: 520,
      height: 520,
      label: "?쇰컲 紐⑸줉 ?대?吏",
    });
  });
  reader.readAsDataURL(file);
}

function handleWideCoachImageFile(event, inputId, previewId, label) {
  const file = event.target.files?.[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    alert("?대?吏 ?뚯씪留??좏깮?????덉뒿?덈떎.");
    event.target.value = "";
    return;
  }
  if (file.size > 3 * 1024 * 1024) {
    alert(`${label}??3MB ?댄븯濡??щ젮二쇱꽭??`);
    event.target.value = "";
    return;
  }
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    state.cropSourceImage = String(reader.result || "");
    $(inputId).value = state.cropSourceImage;
    updateWideImagePreview(inputId, previewId);
    openCropModal({ inputId, previewId, width: 1200, height: 675, label });
  });
  reader.readAsDataURL(file);
}

function openCropModal(target = null) {
  state.cropTarget = target || {
    inputId: "coachImage",
    previewId: "coachImagePreview",
    width: 520,
    height: 520,
    label: "?쇰컲 紐⑸줉 ?대?吏",
  };
  const image = state.cropSourceImage || $(state.cropTarget.inputId).value.trim();
  if (!image) return;
  $("cropImage").src = image;
  $("cropTitle").textContent = `${state.cropTarget.label} 踰붿쐞 吏??;
  $("cropModal").hidden = false;
  $("cropX").value = 50;
  $("cropY").value = 50;
  $("cropSize").value = 60;
  setTimeout(updateCropBox, 0);
}

function closeCropModal() {
  $("cropModal").hidden = true;
}

function getCropRect() {
  const image = $("cropImage");
  const stage = image.getBoundingClientRect();
  const target = state.cropTarget || { width: 520, height: 520 };
  const ratio = target.width / target.height;
  const scale = Number($("cropSize").value) / 100;
  let maxWidth = stage.width;
  let maxHeight = maxWidth / ratio;
  if (maxHeight > stage.height) {
    maxHeight = stage.height;
    maxWidth = maxHeight * ratio;
  }
  const width = maxWidth * scale;
  const height = maxHeight * scale;
  const maxX = Math.max(0, stage.width - width);
  const maxY = Math.max(0, stage.height - height);
  const left = stage.left + maxX * (Number($("cropX").value) / 100);
  const top = stage.top + maxY * (Number($("cropY").value) / 100);
  return { left, top, width, height, imageRect: stage };
}

function updateCropBox() {
  const rect = getCropRect();
  const parentRect = document.querySelector(".crop-stage").getBoundingClientRect();
  const box = $("cropBox");
  box.style.width = `${rect.width}px`;
  box.style.height = `${rect.height}px`;
  box.style.left = `${rect.left - parentRect.left}px`;
  box.style.top = `${rect.top - parentRect.top}px`;
}

function setCropCenterFromPointer(event) {
  const rect = getCropRect();
  const imageRect = rect.imageRect;
  const maxX = Math.max(1, imageRect.width - rect.width);
  const maxY = Math.max(1, imageRect.height - rect.height);
  const left = Math.max(0, Math.min(maxX, event.clientX - imageRect.left - rect.width / 2));
  const top = Math.max(0, Math.min(maxY, event.clientY - imageRect.top - rect.height / 2));
  $("cropX").value = Math.round((left / maxX) * 100);
  $("cropY").value = Math.round((top / maxY) * 100);
  updateCropBox();
}

function moveCropToPointer(event) {
  if (event.target === $("cropImage")) {
    setCropCenterFromPointer(event);
  }
}

function startCropDrag(event) {
  event.preventDefault();
  event.stopPropagation();
  $("cropBox").setPointerCapture(event.pointerId);
  const onMove = (moveEvent) => setCropCenterFromPointer(moveEvent);
  const onEnd = () => {
    $("cropBox").removeEventListener("pointermove", onMove);
    $("cropBox").removeEventListener("pointerup", onEnd);
    $("cropBox").removeEventListener("pointercancel", onEnd);
  };
  $("cropBox").addEventListener("pointermove", onMove);
  $("cropBox").addEventListener("pointerup", onEnd);
  $("cropBox").addEventListener("pointercancel", onEnd);
}

function applyImageCrop() {
  const image = $("cropImage");
  if (!image.complete || !image.naturalWidth) return;
  const rect = getCropRect();
  const scaleX = image.naturalWidth / rect.imageRect.width;
  const scaleY = image.naturalHeight / rect.imageRect.height;
  const sourceX = Math.max(0, (rect.left - rect.imageRect.left) * scaleX);
  const sourceY = Math.max(0, (rect.top - rect.imageRect.top) * scaleY);
  const sourceWidth = rect.width * scaleX;
  const sourceHeight = rect.height * scaleY;
  const target = state.cropTarget || {
    inputId: "coachImage",
    previewId: "coachImagePreview",
    width: 520,
    height: 520,
  };
  const canvas = document.createElement("canvas");
  canvas.width = target.width;
  canvas.height = target.height;
  const context = canvas.getContext("2d");
  context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, canvas.width, canvas.height);
  $(target.inputId).value = canvas.toDataURL("image/jpeg", 0.78);
  if (target.inputId === "coachImage") {
    $("coachImagePosition").value = "center center";
    updateCoachImagePreview();
  } else {
    updateWideImagePreview(target.inputId, target.previewId);
  }
  state.cropSourceImage = "";
  state.cropTarget = null;
  closeCropModal();
}

async function saveCoachFromForm() {
  const saveButton = $("saveCoachBtn");
  saveButton.disabled = true;
  setCoachSaveStatus("???以?..", "loading");
  const id = $("coachId").value || `coach-${Date.now()}`;
  const previous = state.coaches.find((coach) => coach.id === id);
  const previousIndex = state.coaches.findIndex((coach) => coach.id === id);
  const selectedPurposes = getCheckedValues("coachPurposeChoice");
  const selectedBadges = $("coachBadgeChoices")
    ? getCheckedValues("coachBadgeChoice")
    : splitCsv($("coachBadges")?.value || (previous?.badges || []).join(", "));
  const next = {
    id,
    category: $("coachCategory").value,
    name: $("coachName").value.trim(),
    tier: getTierFromBadges(selectedBadges, previous?.tier),
    tagline: $("coachTagline").value.trim(),
    purpose: selectedPurposes.length ? selectedPurposes : ["value"],
    roles: getCheckedValues("coachRoleChoice"),
    price: (updateCoachPriceValue(), $("coachPrice").value.trim() || "媛寃??곷떞"),
    image: $("coachImage").value.trim() || "assets/lollogo.png",
    featuredImage: $("coachFeaturedImage").value.trim(),
    featuredImagePosition: "center center",
    detailImage: $("coachDetailImage").value.trim(),
    detailImagePosition: "center center",
    imagePosition: $("coachImagePosition").value.trim() || "center center",
    imageScale: 1,
    badges: selectedBadges,
    featuredAd: Boolean(previous?.featuredAd),
    featuredAdUpdatedAt: previous?.featuredAdUpdatedAt || "",
    manualCoachEdit: Boolean(previous?.manualCoachEdit),
    rating: previous?.rating || 4.8,
    lessons: previous?.lessons || 0,
    bio: $("coachBio").value.trim(),
    reviews: previous?.reviews || [["泥??꾧린", "愿由ъ옄媛 ?낅젰???섑뵆 ?꾧린?낅땲??"]],
  };
  try {
    const savedCoach = await runAdminRequest(() => saveCoachToApi(next, previousIndex >= 0 ? previousIndex : state.coaches.length));
    await loadCoachesFromApi();
    if (!state.coaches.some((coach) => coach.id === savedCoach.id)) {
      state.coaches = state.coaches.filter((coach) => coach.id !== id).concat(savedCoach);
    }
    state.category = savedCoach.category;
    state.selectedCoachId = savedCoach.id;
    render();
    fillCoachForm(savedCoach);
    setCoachSaveStatus("????꾨즺", "success");
    setTimeout(() => {
      if ($("coachSaveStatus")?.textContent === "????꾨즺") setCoachSaveStatus();
    }, 2200);
  } catch (error) {
    setCoachSaveStatus("????ㅽ뙣", "error");
    alert(`肄붿튂 ?뺣낫瑜???ν븯吏 紐삵뻽?듬땲??\n${error.message}`);
  } finally {
    saveButton.disabled = false;
  }
}

async function deleteSelectedCoach() {
  const id = $("coachId").value;
  if (!id) return;
  try {
    await runAdminRequest(() => deleteCoachFromApi(id));
    state.coaches = state.coaches.filter((coach) => coach.id !== id);
    state.selectedCoachId = null;
    fillCoachForm();
    render();
  } catch (error) {
    alert(`肄붿튂 ?뺣낫瑜???젣?섏? 紐삵뻽?듬땲??\n${error.message}`);
  }
}

function splitCsv(value) {
  return value.split(",").map((item) => item.trim()).filter(Boolean);
}

function categoryLabel(id) {
  return categories.find((category) => category.id === id)?.label || id;
}

boot();
