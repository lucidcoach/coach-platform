const categories = [
  { id: "league", label: "리그오브레전드" },
  { id: "valorant", label: "발로란트" },
  { id: "academy", label: "테스트" },
];

const API_BASE_URL = "https://lucid-chzzk-auth.onrender.com";
const ADMIN_TOKEN_KEY = "coach-admin-token";
const RESERVATION_STATUSES = ["신규", "상담중", "예약확정", "완료", "취소"];

const filterSets = {
  league: {
    type: [
      { id: "all", label: "전체" },
      { id: "value", label: "가성비 리플레이" },
      { id: "low", label: "입문/저티어" },
      { id: "high", label: "고티어/프로지망" },
      { id: "team", label: "팀게임/스크림" },
    ],
    segment: [
      { id: "all", label: "전체 라인" },
      { id: "top", label: "탑" },
      { id: "mid", label: "미드" },
      { id: "jungle", label: "정글" },
      { id: "adc", label: "원딜" },
      { id: "support", label: "서폿" },
    ],
  },
  valorant: {
    type: [
      { id: "all", label: "전체" },
      { id: "value", label: "가성비 리플레이" },
      { id: "low", label: "입문/저티어" },
      { id: "high", label: "고티어/프로지망" },
      { id: "team", label: "팀게임/스크림" },
    ],
    segment: [
      { id: "all", label: "전체 역할" },
      { id: "duelist", label: "타격대" },
      { id: "controller", label: "전략가" },
      { id: "initiator", label: "척후대" },
      { id: "sentinel", label: "감시자" },
      { id: "aim", label: "에임/피킹" },
    ],
  },
  academy: {
    type: [
      { id: "all", label: "전체" },
      { id: "entry", label: "입문" },
      { id: "curriculum", label: "커리큘럼" },
      { id: "branding", label: "브랜딩" },
    ],
    segment: [
      { id: "all", label: "전체 과정" },
      { id: "coach-basic", label: "기초 과정" },
      { id: "coach-advanced", label: "심화 과정" },
      { id: "operation", label: "운영/관리" },
    ],
  },
};

const purposes = Object.values(filterSets).flatMap((set) => [...set.type, ...set.segment]).filter(
  (item, index, array) => item.id !== "all" && array.findIndex((candidate) => candidate.id === item.id) === index
);

const adminLineOptions = {
  league: ["탑", "미드", "정글", "원딜", "서폿"],
  valorant: ["타격대", "척후대", "감시자", "전략가"],
  academy: ["기초 과정", "심화 과정", "운영/관리"],
};

const adminFieldOptions = {
  league: ["운영", "라인전", "한타", "오브젝트", "시야", "고티어"],
  valorant: ["에임", "피킹", "엔트리", "스크림", "리플레이", "팀 피드백"],
  academy: ["코치 입문", "커리큘럼", "피드백", "브랜딩", "운영", "수강생 관리"],
};

const priceUnits = {
  time: ["30분", "1시간", "1.5시간", "2시간"],
  game: ["1게임", "2게임", "3게임"],
};

const badgeOptions = ["엠버서더", "최우수", "우수", "추천", "일반", "저가 입문", "입문 추천", "리뷰 우수", "팀 피드백 가능"];

const text = {
  navMarket: "강의 탐색",
  navBookings: "예약 관리",
  navAdmin: "코치 관리",
  sideLabel: "예약 안내",
  sideCopy: "원하는 강의를 고르고 Riot ID와 디스코드 연락처를 남기면 운영진이 시간 조율을 도와드립니다.",
  heroEyebrow: "LoL 리플레이 분석 · 라인전 교정 · 팀 피드백",
  heroTitle: "LoL 코칭 플랫폼",
  metricCoachesLabel: "코치",
  metricBookingsLabel: "예약",
  metricRatingLabel: "평점",
  searchLabel: "검색",
  searchPlaceholder: "코치명, 라인, 챔피언, 강의명",
  bookingEyebrow: "관리자 화면",
  bookingTitle: "예약 신청 목록",
  clearBookingsBtn: "예약 새로고침",
  thStatus: "상태",
  thStudent: "수강생",
  thLesson: "강의",
  thTime: "희망 시간",
  thContact: "연락처",
  thMemo: "메모",
  adminEyebrow: "로컬 편집",
  adminTitle: "코치 목록 수정",
  resetCoachesBtn: "코치 샘플 초기화",
  labelCategory: "카테고리",
  labelName: "코치/상품명",
  labelTagline: "한 줄 소개",
  labelPurpose: "분류",
  labelRoles: "전문 분야",
  labelPrice: "가격",
  labelImage: "이미지 경로",
  labelImagePosition: "이미지 위치",
  labelBadges: "배지",
  labelBio: "상세 설명",
  optLeague: "리그오브레전드",
  optValorant: "발로란트",
  optAcademy: "테스트",
  saveCoachBtn: "저장",
  newCoachBtn: "새 코치",
  deleteCoachBtn: "삭제",
  bookingStudentLabel: "수강생 이름",
  bookingContactLabel: "Riot ID / Discord",
  bookingTimeLabel: "희망 시간",
  bookingMemoLabel: "요청사항",
  bookingSubmitBtn: "예약 신청",
  featuredTitle: "추천 코칭 상품",
  featuredHint: "후기와 재예약률이 좋은 강의",
  expertTitle: "코칭 상품 찾기",
  expertHint: "포지션, 티어, 팀게임 기준으로 골라보세요.",
};

const samples = [
  {
    id: "lol-1",
    category: "league",
    name: "페르소나 코치",
    tier: "최우수",
    tagline: "탑 라인전 주도권, 웨이브 관리, 사이드 운영 설계",
    purpose: ["top", "high"],
    roles: ["탑", "운영", "고티어"],
    price: "70,000원 / 1시간",
    image: "assets/personacoach.png",
    imagePosition: "center 8%",
    badges: ["최우수", "추천"],
    rating: 4.9,
    lessons: 248,
    bio: "탑 라인전의 딜교 타이밍, 웨이브 고정과 푸쉬 선택, 사이드 운영 전환까지 리플레이 기준으로 정리해주는 1:1 코칭입니다.",
    reviews: [
      ["리조토", "라인전에서 왜 계속 손해보는지 처음으로 이해했어요. 다음 판부터 CS가 확 늘었습니다."],
      ["봄", "상대 정글 위치를 근거로 플레이하는 법을 배워서 게임이 덜 흔들렸습니다."],
    ],
  },
  {
    id: "lol-2",
    category: "league",
    name: "Lucid Macro",
    tier: "최우수",
    tagline: "팀 게임 관점의 중후반 운영, 오더, 시야 컨트롤",
    purpose: ["team", "high"],
    roles: ["정글", "서폿", "운영"],
    price: "75,000원 / 1시간",
    image: "assets/KakaoTalk_20250810_005153132_04.jpg",
    imagePosition: "center 8%",
    badges: ["최우수", "추천"],
    rating: 5.0,
    lessons: 212,
    bio: "솔랭과 내전 리플레이를 함께 보며 시야 장악, 오브젝트 전 준비, 사이드 압박, 콜 우선순위를 정리합니다.",
    reviews: [
      ["사이니스트", "복기하면서 제가 맵을 거의 안 보고 있었다는 걸 깨달았어요."],
      ["메론", "왜 이기는 게임을 굴리지 못했는지 흐름 단위로 설명해줘서 좋았습니다."],
    ],
  },
  {
    id: "lol-3",
    category: "league",
    name: "미르 코치",
    tier: "우수",
    tagline: "정글 첫 동선, 갱 타이밍, 오브젝트 판단 집중 코칭",
    purpose: ["jungle", "low"],
    roles: ["정글", "동선", "오브젝트"],
    price: "45,000원 / 1시간",
    image: "assets/mireucoach.png",
    imagePosition: "center 8%",
    badges: ["우수", "추천"],
    rating: 4.7,
    lessons: 121,
    bio: "첫 바퀴 이후 턴이 사라지는 정글러를 위해 라인 상태, 캠프 리젠, 오브젝트 타이밍을 기준으로 목적 있는 동선을 잡아줍니다.",
    reviews: [
      ["홍보서버", "매번 감으로 하던 걸 기준으로 바꾸니까 게임이 덜 흔들렸습니다."],
      ["게스트", "내전 리플레이로 설명해줘서 이해가 빨랐어요."],
    ],
  },
  {
    id: "lol-4",
    category: "league",
    name: "Luna Mid Lab",
    tier: "우수",
    tagline: "미드 메이지 라인전, 로밍 타이밍, 시야 설계",
    purpose: ["mid", "high"],
    roles: ["미드", "메이지", "로밍"],
    price: "42,000원 / 1시간",
    image: "assets/KakaoTalk_20250810_005153132_06.jpg",
    imagePosition: "center 8%",
    badges: ["우수", "추천"],
    rating: 4.8,
    lessons: 136,
    bio: "챔피언 숙련도보다 먼저 잡아야 할 미니맵 시선, 턴 사용, 귀환 타이밍을 중심으로 피드백합니다.",
    reviews: [
      ["테스트", "친절한데 핵심은 정확해서 만족했습니다."],
      ["미드연습중", "라인을 밀어야 할 때와 받아야 할 때가 구분됐어요."],
    ],
  },
  {
    id: "lol-5",
    category: "league",
    name: "메피 코치",
    tier: "우수",
    tagline: "원딜/서폿 바텀 라인전과 2:2 교전 설계",
    purpose: ["adc", "support", "team"],
    roles: ["원딜", "서폿", "듀오"],
    price: "48,000원 / 1시간",
    image: "assets/mephicoach.png",
    imagePosition: "72% 12%",
    badges: ["우수", "추천"],
    rating: 4.8,
    lessons: 103,
    bio: "바텀 조합별 1레벨 운영, 라인 주도권 교환, 원딜과 서폿의 교전 각을 실제 리플레이로 정리합니다.",
    reviews: [
      ["새벽반", "둘이 말이 안 맞아서 지던 판이 줄었습니다."],
      ["민트", "서폿 동선이 원딜 성장에 얼마나 큰지 체감했어요."],
    ],
  },
  {
    id: "lol-6",
    category: "league",
    name: "탑 라인전 30분 진단",
    tier: "일반",
    tagline: "한 경기만 보고 라인전 손해 원인 3가지를 짚어주는 입문 상품",
    purpose: ["value", "top", "low"],
    roles: ["저가 입문", "탑", "라인전"],
    price: "9,900원 / 30분",
    image: "assets/personacoach.png",
    imagePosition: "center 8%",
    badges: ["저가 입문"],
    rating: 4.5,
    lessons: 61,
    bio: "부담 없이 시작할 수 있는 짧은 진단 상품입니다. 한 경기 리플레이를 기준으로 웨이브, 딜교 타이밍, 갱 회피 와드 중 가장 손해가 큰 3가지를 정리합니다.",
    reviews: [
      ["탑유저", "무작정 싸우던 습관을 고쳤습니다."],
      ["나르연습", "상성 설명이 쉬워서 좋았어요."],
    ],
  },
  {
    id: "lol-7",
    category: "league",
    name: "서폿 시야 입문 체크",
    tier: "일반",
    tagline: "와드 위치보다 먼저 잡아야 할 시야 타이밍 빠른 점검",
    purpose: ["value", "support", "low"],
    roles: ["저가 입문", "서폿", "시야"],
    price: "12,000원 / 30분",
    image: "assets/mephicoach.png",
    imagePosition: "center 8%",
    badges: ["저가 입문"],
    rating: 4.4,
    lessons: 54,
    bio: "와드를 어디에 박는지보다 왜 그 타이밍에 움직이는지를 먼저 잡아주는 입문 코칭입니다.",
    reviews: [
      ["서폿처음", "미드 로밍 타이밍을 처음 알았습니다."],
      ["봄", "시야 점수가 아니라 의미 있는 시야를 배웠어요."],
    ],
  },
  {
    id: "lol-8",
    category: "league",
    name: "원딜 한타 생존 클리닉",
    tier: "일반",
    tagline: "죽는 한타 장면만 골라 포지션 습관을 고치는 저가 상품",
    purpose: ["value", "adc", "low"],
    roles: ["저가 입문", "원딜", "한타"],
    price: "14,900원 / 30분",
    image: "assets/mephicoach.png",
    imagePosition: "center 8%",
    badges: ["저가 입문"],
    rating: 4.6,
    lessons: 72,
    bio: "죽지 않고 딜하는 위치, 앞라인 거리 유지, 스펠 체크, 한타 전 대기 위치를 중심으로 봅니다.",
    reviews: [
      ["원딜연습", "앞무빙하다 죽는 장면을 정확히 짚어줬습니다."],
      ["실버탈출", "한타 전에 서는 위치가 바뀌니까 딜량이 올랐어요."],
    ],
  },
  {
    id: "lol-9",
    category: "league",
    name: "챔피언폭 20분 상담",
    tier: "일반",
    tagline: "OP.GG와 플레이 성향 기준으로 연습 챔피언 2~3개 추천",
    purpose: ["value", "aim", "low"],
    roles: ["저가 입문", "챔피언폭", "솔랭"],
    price: "7,900원 / 20분",
    image: "assets/KakaoTalk_20250810_005153132_06.jpg",
    imagePosition: "center 8%",
    badges: ["저가 입문"],
    rating: 4.3,
    lessons: 39,
    bio: "현재 티어, 선호 플레이, 라인별 약점을 보고 무리 없이 연습 가능한 챔피언 2~3개를 추천합니다.",
    reviews: [
      ["챔프고민", "괜히 어려운 챔프만 잡고 있었다는 걸 알았어요."],
      ["입문러", "연습 순서가 생겨서 랭크가 덜 무서워졌습니다."],
    ],
  },
  {
    id: "lol-10",
    category: "league",
    name: "Replay Quick Check",
    tier: "일반",
    tagline: "짧은 리플레이 진단과 바로 고칠 3가지 과제",
    purpose: ["value", "low"],
    roles: ["리플레이", "피드백", "입문"],
    price: "9,900원 / 30분",
    image: "assets/mephicoach.png",
    imagePosition: "72% 12%",
    badges: ["저가 입문"],
    rating: 4.5,
    lessons: 84,
    bio: "한 경기 리플레이를 빠르게 보며 가장 손해가 큰 습관 3개와 다음 판에서 바로 해볼 과제를 남깁니다.",
    reviews: [
      ["게스트", "짧게 봤는데도 고칠 게 명확했습니다."],
      ["랭크전사", "가격 부담 없이 점검받기 좋아요."],
    ],
  },
  {
    id: "val-1",
    category: "valorant",
    name: "Astra Aim Room",
    tagline: "에임 루틴과 피킹 습관 교정",
    purpose: ["value", "low"],
    roles: ["에임", "피킹", "감도"],
    price: "32,000원 / 1시간",
    image: "assets/KakaoTalk_20250810_005153132_06.jpg",
    imagePosition: "center 8%",
    badges: ["입문 추천", "리뷰 우수"],
    rating: 4.8,
    lessons: 88,
    bio: "데스매치만 많이 하는 방식에서 벗어나, 실제 랭크에서 나오는 교전 각도와 크로스헤어 위치를 고칩니다.",
    reviews: [
      ["새벽반", "감도부터 훈련 루틴까지 한 번에 정리돼서 좋았어요."],
      ["민트", "왜 먼저 쏘고도 지는지 정확히 짚어줬습니다."],
    ],
  },
  {
    id: "val-2",
    category: "valorant",
    name: "Duelist Clinic",
    tagline: "엔트리 타이밍, 스킬 연계, 사이트 진입",
    purpose: ["team", "duelist"],
    roles: ["듀얼리스트", "엔트리", "스크림"],
    price: "38,000원 / 1시간",
    image: "assets/KakaoTalk_20250810_005153132_17.jpg",
    imagePosition: "72% 12%",
    badges: ["팀 피드백 가능"],
    rating: 4.6,
    lessons: 73,
    bio: "혼자 들어가다 죽는 진입을 팀이 따라올 수 있는 진입으로 바꾸는 데 집중합니다.",
    reviews: [
      ["플래찍자", "진입 타이밍이랑 콜을 같이 봐줘서 팀 게임이 쉬워졌어요."],
      ["쭈", "공격 라운드가 답답했는데 선택지가 생겼습니다."],
    ],
  },
  {
    id: "academy-1",
    category: "academy",
    name: "신규 코치 베이직 4주",
    tagline: "코칭 진행법, 리플레이 분석, 수강생 관리",
    purpose: ["entry", "curriculum", "coach-basic"],
    roles: ["코치 입문", "커리큘럼", "피드백"],
    price: "300,000원 / 4주",
    image: "assets/KakaoTalk_20250810_005153132_01.jpg",
    imagePosition: "center 8%",
    badges: ["수료 배지", "플랫폼 입점 연계"],
    rating: 4.9,
    lessons: 42,
    bio: "게임을 잘하는 사람을 실제로 돈을 받고 가르칠 수 있는 코치로 만드는 기초 과정입니다.",
    reviews: [
      ["수료생 A", "말로 설명하는 법을 배우니까 코칭이 훨씬 안정됐습니다."],
      ["수료생 B", "피드백 템플릿이 있어서 첫 유료 강의까지 바로 이어졌어요."],
    ],
  },
  {
    id: "academy-2",
    category: "academy",
    name: "우수 코치 전환반",
    tagline: "후기 관리, 상품화, 장기 수강 설계",
    purpose: ["branding", "coach-advanced", "operation"],
    roles: ["고급반", "브랜딩", "운영"],
    price: "180,000원 / 2주",
    image: "assets/lollogo.png",
    imagePosition: "center center",
    badges: ["수수료 감면 후보"],
    rating: 4.7,
    lessons: 26,
    bio: "강의 단가를 올리고 반복 예약을 만들기 위한 상담 방식과 패키지 구성을 다룹니다.",
    reviews: [
      ["코치K", "강의 소개를 바꿨더니 문의가 더 구체적으로 들어왔습니다."],
      ["코치M", "후기 요청 방식 하나만 바꿔도 차이가 컸어요."],
    ],
  },
];

const bookingSamples = [
  {
    status: "신규",
    student: "리조토#KR1",
    lesson: "Coach Shineast",
    time: "8/10 21:00",
    contact: "discord: risotto",
    memo: "탑 라인전 복기와 챔프폭 상담",
  },
  {
    status: "상담중",
    student: "테스트#테스트",
    lesson: "신규 코치 베이직 4주",
    time: "8/12 20:00",
    contact: "discord: testcoach",
    memo: "코치 등록 전에 커리큘럼을 보고 싶음",
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

const tierRank = { "엠버서더": 0, "최우수": 1, "우수": 2, "일반": 3 };

const state = {
  activeView: "market",
  category: "league",
  type: "all",
  segment: "all",
  selectedCoachId: null,
  query: "",
  coaches: [],
  coachLoadState: "idle",
  bookings: [],
  bookingLoadState: "idle",
  bookingLoadError: "",
  bookingFilterStatus: "all",
  bookingQuery: "",
  selectedBookingId: null,
  cropSourceImage: "",
};

function $(id) {
  return document.getElementById(id);
}

function migrateCoachImages(coaches) {
  return coaches.map((coach) => ({
    ...coach,
    image: imageMigration[coach.image] || coach.image || "assets/lollogo.png",
    imagePosition: coach.imagePosition || "center 8%",
  }));
}

function boot() {
  Object.entries(text).forEach(([id, value]) => {
    const el = $(id);
    if (!el) return;
    if (el.tagName === "INPUT") el.placeholder = value;
    else el.textContent = value;
  });
  $("searchInput").placeholder = text.searchPlaceholder;
  $("coachImagePosition").placeholder = "예: center 8%, 72% 12%";
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
    state.query = "";
    $("searchInput").value = "";
    render();
  });

  document.querySelectorAll(".nav-item").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeView = button.dataset.view;
      render();
      if (state.activeView === "bookings") {
        loadReservations();
      }
    });
  });

  $("searchInput").addEventListener("input", (event) => {
    state.query = event.target.value.trim().toLowerCase();
    renderMarket();
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
  $("openCropBtn").addEventListener("click", openCropModal);
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
  renderMarket();
  renderBookings();
  renderAdmin();
}

function renderMetrics() {
  const ratings = state.coaches.map((coach) => coach.rating).filter(Boolean);
  const average = ratings.length ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;
  $("metricCoaches").textContent = state.coaches.length;
  $("metricBookings").textContent = state.bookings.length;
  $("metricRating").textContent = average.toFixed(1);
}

function getVisibleCoaches() {
  return state.coaches.filter((coach) => {
    const inCategory = coach.category === state.category;
    const coachPurposes = getCoachPurposes(coach);
    const inType = state.type === "all" || coachPurposes.includes(state.type);
    const inSegment = state.segment === "all" || coachPurposes.includes(state.segment);
    const purposeLabel = getPurposeLabels(coach.purpose).join(" ");
    const haystack = [coach.name, coach.tier, coach.tagline, coach.bio, purposeLabel, ...(coach.roles || []), ...(coach.badges || [])]
      .join(" ")
      .toLowerCase();
    return inCategory && inType && inSegment && (!state.query || haystack.includes(state.query));
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
      renderMarket();
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
      renderMarket();
    });
  });

  document.querySelectorAll("[data-segment]").forEach((tab) => {
    tab.addEventListener("click", () => {
      state.segment = tab.dataset.segment;
      state.selectedCoachId = null;
      renderMarket();
    });
  });

  if (state.coachLoadState === "idle" || state.coachLoadState === "loading") {
    $("featuredSection").hidden = true;
    $("featuredList").innerHTML = "";
    $("coachList").innerHTML = `<div class="empty">코치 목록을 불러오는 중입니다.</div>`;
    state.selectedCoachId = null;
    renderDetail();
    return;
  }

  if (state.coachLoadState === "error") {
    $("featuredSection").hidden = true;
    $("featuredList").innerHTML = "";
    $("coachList").innerHTML = `<div class="empty">코치 목록을 불러오지 못했습니다.</div>`;
    state.selectedCoachId = null;
    renderDetail();
    return;
  }

  const visible = getVisibleCoaches();
  if (state.selectedCoachId && !visible.some((coach) => coach.id === state.selectedCoachId)) {
    state.selectedCoachId = null;
  }

  renderFeatured(visible);
  const featuredIds = new Set(
    state.query ? [] : Array.from(document.querySelectorAll("#featuredList [data-coach-id]")).map((card) => card.dataset.coachId)
  );
  const listed = visible.filter((coach) => !featuredIds.has(coach.id));
  $("coachList").innerHTML = listed.length ? listed.map(renderCoachCard).join("") : `
    <div class="empty">검색 결과가 없습니다.</div>
  `;
  document.querySelectorAll("[data-coach-id]").forEach((card) => {
    card.addEventListener("click", () => {
      state.selectedCoachId = card.dataset.coachId;
      renderMarket();
    });
  });
  renderDetail();
}

function getActiveFilterSet() {
  return filterSets[state.category] || filterSets.league;
}

function renderFeatured(visible) {
  const featured = visible
    .filter((coach) => coach.category === state.category && ["엠버서더", "최우수"].includes(coach.tier))
    .slice(0, state.category === "league" ? 5 : 3);
  const section = $("featuredSection");
  if (!featured.length || state.query) {
    section.hidden = true;
    $("featuredList").innerHTML = "";
    return;
  }
  section.hidden = false;
  $("featuredList").innerHTML = featured.map(renderFeaturedCard).join("");
}

function renderFeaturedCard(coach) {
  const originalPrice = getOriginalPrice(coach.price);
  const imageStyle = getImageStyle(coach);
  const purposeText = getPurposeLabels(coach.purpose).slice(0, 2).join(" · ");
  return `
    <article class="featured-card ${getTierClass(coach)}" data-coach-id="${coach.id}">
      <div class="featured-image">
        <img src="${coach.image}" alt="" style="${imageStyle}">
        <span class="ad-label">추천</span>
        <span class="tier-ribbon">${coach.tier}</span>
      </div>
      <div class="featured-body">
        <h3>${coach.name}</h3>
        <p class="purpose-label">${purposeText}</p>
        <p class="featured-summary">${coach.tagline}</p>
        <div class="featured-rating">★ ${coach.rating.toFixed(1)} <span>(${coach.lessons || 0})</span></div>
        <div class="featured-price">
          <strong>${coach.price}</strong>
          ${originalPrice ? `<del>${originalPrice}</del>` : ""}
        </div>
      </div>
    </article>
  `;
}

function getOriginalPrice(price) {
  const amount = Number(String(price || "").replace(/[^\d]/g, ""));
  if (!amount) return "";
  return `${Math.round(amount * 1.7).toLocaleString("ko-KR")}원`;
}

function renderCoachCard(coach) {
  const badges = getCoachBadges(coach);
  const imageStyle = getImageStyle(coach);
  const purposeText = getPurposeLabels(coach.purpose).slice(0, 2).join(" · ");
  return `
    <article class="coach-card ${coach.id === state.selectedCoachId ? "active" : ""} ${getTierClass(coach)}" data-coach-id="${coach.id}">
      <div class="avatar-frame"><img class="avatar" src="${coach.image}" alt="" style="${imageStyle}"></div>
      <div class="coach-main">
        ${badges.length ? `<div class="rank-badges">${badges.map(renderBadge).join("")}</div>` : ""}
        <h3>${coach.name}</h3>
        <span class="purpose-label">${purposeText}</span>
        <p>${coach.tagline}</p>
        <div class="chips">${(coach.roles || []).map((role) => `<span class="chip">${role}</span>`).join("")}</div>
      </div>
      <div class="card-foot">
        <span>★ ${coach.rating.toFixed(1)} · 후기 ${coach.reviews?.length || 0}</span>
        <span class="price">${coach.price}</span>
      </div>
    </article>
  `;
}

function getCoachBadges(coach) {
  if (coach.tier === "엠버서더") return ["추천", "엠버서더"];
  if (coach.tier === "최우수") return ["추천", "최우수"];
  if (coach.tier === "우수") return ["추천", "우수"];
  return coach.badges || [];
}

function renderBadge(label) {
  const className = label === "추천" ? "badge recommend" : ["최우수", "엠버서더"].includes(label) ? "badge best" : "badge good";
  return `<span class="${className}">${label}</span>`;
}

function getTierClass(coach) {
  if (["최우수", "엠버서더"].includes(coach.tier)) return "tier-best";
  if (coach.tier === "우수") return "tier-good";
  return "tier-normal";
}

function getImageStyle(coach) {
  return `object-position: ${coach.imagePosition || "center center"};`;
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
  return labels.length ? labels : ["분류 미지정"];
}

function renderDetail() {
  const coach = state.coaches.find((item) => item.id === state.selectedCoachId);
  if (!coach) {
    $("coachDetail").innerHTML = `
      <div class="detail-empty">
        <strong>상품을 선택하면 상세 정보가 표시됩니다.</strong>
        <span>왼쪽 카드에서 원하는 코칭 상품을 눌러 가격, 후기, 예약 신청 양식을 확인하세요.</span>
      </div>
    `;
    return;
  }

  $("coachDetail").innerHTML = `
    <div class="detail-hero"><img src="${coach.image}" alt="" style="${getImageStyle(coach)}"></div>
    <div class="detail-body">
      <div class="rank-badges">${getCoachBadges(coach).map(renderBadge).join("")}</div>
      <h2>${coach.name}</h2>
      <p>${coach.bio}</p>
      <div class="booking-note">
        <strong>예약 전 확인</strong>
        <span>진행 방식: 디스코드 화면공유 또는 리플레이 리뷰</span>
        <span>준비물: Riot ID, 최근 경기 리플레이, 궁금한 장면</span>
        <span>접수 후 운영진이 희망 시간과 연락처를 확인합니다.</span>
      </div>
      <div class="detail-grid">
        <div class="info-box"><span>가격</span><strong>${coach.price}</strong></div>
        <div class="info-box"><span>진행 수</span><strong>${coach.lessons || 0}회</strong></div>
        <div class="info-box"><span>평점</span><strong>★ ${coach.rating.toFixed(1)}</strong></div>
        <div class="info-box"><span>전문 분야</span><strong>${(coach.roles || []).join(", ")}</strong></div>
        <div class="info-box"><span>분류</span><strong>${getPurposeLabels(coach.purpose).join(", ")}</strong></div>
      </div>
      <h3>후기</h3>
      ${(coach.reviews || []).map(([name, body]) => `
        <div class="review"><strong>${name}</strong><p>${body}</p></div>
      `).join("")}
      <div id="bookingMount"></div>
    </div>
  `;

  const form = $("bookingFormTemplate").content.cloneNode(true);
  $("bookingMount").appendChild(form);
  $("bookingStudentLabel").textContent = text.bookingStudentLabel;
  $("bookingContactLabel").textContent = text.bookingContactLabel;
  $("bookingTimeLabel").textContent = text.bookingTimeLabel;
  $("bookingMemoLabel").textContent = text.bookingMemoLabel;
  $("bookingSubmitBtn").textContent = text.bookingSubmitBtn;
  $("bookingForm").student.placeholder = "예: 닉네임#KR1";
  $("bookingForm").contact.placeholder = "예: Discord ID";
  $("bookingForm").time.placeholder = "예: 8/10 21:00";
  $("bookingForm").memo.placeholder = "라인, 챔피언, 고민을 적어주세요.";
  $("bookingForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const submitButton = $("bookingSubmitBtn");
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = "예약 전송 중";
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
      alert("예약 신청이 접수됐습니다. 운영진이 연락드릴게요.");
      render();
    } catch (error) {
      alert(`예약 신청을 저장하지 못했습니다.\n${error.message}`);
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  });
}

async function submitReservation(reservation) {
  if (!API_BASE_URL || API_BASE_URL.includes("YOUR-COACH-API")) {
    throw new Error("예약 API 주소가 아직 설정되지 않았습니다.");
  }
  const response = await fetch(`${API_BASE_URL.replace(/\/$/, "")}/api/reservations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reservation),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || !result.ok) {
    const detail = result.error ? `오류: ${result.error}` : `HTTP ${response.status}`;
    throw new Error(detail);
  }
  return result.reservation || {};
}

async function loginForReservations() {
  const password = window.prompt("예약 관리 비밀번호를 입력하세요.");
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
      state.bookingLoadError = "예약 목록을 불러오지 못했습니다.";
      renderBookings();
    }
  }
}

function mapReservationFromApi(reservation) {
  const feedback = reservation.feedback_metadata || {};
  return {
    id: reservation.id || "",
    status: reservation.status || "신규",
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
    state.coaches = structuredClone(samples);
    state.coachLoadState = "loaded";
    render();
    return;
  }
  state.coachLoadState = "loading";
  try {
    const response = await fetch(`${API_BASE_URL.replace(/\/$/, "")}/api/coaches`);
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
      state.coachLoadState = "empty";
      render();
    }
  } catch (error) {
    state.coachLoadState = "error";
    console.warn("코치 목록을 불러오지 못했습니다.", error);
    render();
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
    alert(`코치 샘플을 DB에 저장하지 못했습니다.\n${error.message}`);
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
    alert(`예약 상태를 변경하지 못했습니다.\n${error.message}`);
  }
}

async function completeReservation(id) {
  await changeReservationStatus(id, "완료");
  if (state.bookingFilterStatus !== "all" && state.bookingFilterStatus !== "완료") {
    renderBookings();
  }
}

async function removeReservation(id) {
  if (!window.confirm("이 예약을 완전히 삭제할까요? 삭제하면 목록에서 사라집니다.")) return;
  try {
    await runAdminRequest(() => deleteReservation(id));
    state.bookings = state.bookings.filter((booking) => booking.id !== id);
    if (state.selectedBookingId === id) state.selectedBookingId = null;
    renderMetrics();
    renderBookings();
  } catch (error) {
    alert(`예약을 삭제하지 못했습니다.\n${error.message}`);
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
      <h3>Discord /피드백 접수</h3>
      <div class="booking-detail-grid">
        ${renderDetailItem("신청 시간", booking.createdAtText)}
        ${renderDetailItem("수강생 Riot ID", booking.studentName)}
        ${renderDetailItem("챔피언 및 K/D/A", booking.coachPrice)}
        ${renderDetailItem("현재 상태", booking.status)}
        ${renderDetailItem("Discord 신청자", `${booking.feedback?.discord_display_name || "-"} (${booking.feedback?.discord_user_id || "-"})`)}
        ${renderDetailItem("서버 / 채널", `${booking.feedback?.guild_name || "-"} / ${booking.feedback?.channel_name || "-"}`)}
        ${renderDetailLink("ROFL 파일", attachment.filename, attachment.url)}
        ${renderDetailItem("문의사항", booking.feedback?.inquiry || booking.memo, true)}
      </div>
    `;
    return;
  }
  panel.hidden = false;
  panel.innerHTML = `
    <h3>예약 상세</h3>
    <div class="booking-detail-grid">
      ${renderDetailItem("예약 ID", booking.id)}
      ${renderDetailItem("신청 시간", booking.createdAtText)}
      ${renderDetailItem("코치명", booking.coachName)}
      ${renderDetailItem("상품 가격", booking.coachPrice)}
      ${renderDetailItem("접수 경로", booking.source)}
      ${renderDetailItem("수강생 Riot ID", booking.studentName)}
      ${renderDetailItem("연락처", booking.contact)}
      ${renderDetailItem("희망 시간", booking.preferredTime)}
      ${renderDetailItem("현재 상태", booking.status)}
      ${renderDetailItem("요청사항", booking.memo, true)}
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
  const link = url ? `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(text || "다운로드")}</a>` : "-";
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
    <option value="all">전체 상태</option>
    ${renderStatusOptions(state.bookingFilterStatus)}
  `;
  $("bookingStatusFilter").value = state.bookingFilterStatus;
  $("bookingSearchInput").value = state.bookingQuery;

  if (state.bookingLoadState === "loading") {
    $("bookingRows").innerHTML = `<tr><td colspan="7">예약 목록을 불러오는 중입니다.</td></tr>`;
    renderBookingDetail();
    return;
  }
  if (state.bookingLoadState === "error") {
    $("bookingRows").innerHTML = `<tr><td colspan="7">${state.bookingLoadError || "예약 목록을 불러오지 못했습니다."}</td></tr>`;
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
          <button type="button" class="mini primary-mini" data-booking-complete="${escapeHtml(booking.id)}">완료</button>
          <button type="button" class="mini danger-mini" data-booking-delete="${escapeHtml(booking.id)}">삭제</button>
        </div>
      </td>
    </tr>
  `).join("") : `<tr><td colspan="7">예약이 없습니다.</td></tr>`;

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
  $("adminCoachList").innerHTML = state.coaches.map((coach) => `
    <button class="admin-row" type="button" data-id="${coach.id}">
      <img src="${coach.image}" alt="">
      <span>
        <h4>${coach.name}</h4>
        <p>${categoryLabel(coach.category)} · ${coach.price}</p>
      </span>
      <span class="chip">수정</span>
    </button>
  `).join("");

  document.querySelectorAll(".admin-row").forEach((row) => {
    row.addEventListener("click", () => fillCoachForm(state.coaches.find((coach) => coach.id === row.dataset.id)));
  });
}

function fillCoachForm(coach) {
  $("coachId").value = coach?.id || "";
  $("coachCategory").value = coach?.category || state.category;
  $("coachName").value = coach?.name || "";
  $("coachTagline").value = coach?.tagline || "";
  renderAdminChoiceControls(getCoachPurposes(coach), coach?.roles || [], coach?.badges || []);
  setPriceFields(coach?.price || "");
  $("coachImage").value = coach?.image || "assets/lollogo.png";
  $("coachImagePosition").value = coach?.imagePosition || "center center";
  $("coachBio").value = coach?.bio || "";
  $("coachImageFile").value = "";
  updateCoachImagePreview();
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
      <span>라인</span>
      <div class="choice-grid">
        ${lineOptions.map((role) => `<label><input type="checkbox" name="coachRoleChoice" value="${role}" ${selectedRoles.includes(role) ? "checked" : ""}> ${role}</label>`).join("")}
      </div>
    </div>
    <div class="choice-subgroup">
      <span>분야</span>
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
    <option value="">배지 선택</option>
    ${badgeOptions
      .filter((badge) => !selected.includes(badge))
      .map((badge) => `<option value="${badge}">${badge}</option>`)
      .join("")}
  `;
  $("coachBadgeChoices").innerHTML = selected.length ? selected.map((badge) => `
    <label><input type="checkbox" name="coachBadgeChoice" value="${badge}" checked> ${badge}</label>
  `).join("") : `<span class="choice-empty">선택된 배지 없음</span>`;
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

function getTierFromBadges(badges, fallback = "일반") {
  if (badges.includes("엠버서더")) return "엠버서더";
  if (badges.includes("최우수")) return "최우수";
  if (badges.includes("우수")) return "우수";
  if (badges.includes("일반")) return "일반";
  return fallback || "일반";
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
  const unit = textPrice.includes("게임") ? "game" : "time";
  const unitText = textPrice.split("/")[1]?.trim() || (unit === "game" ? "1게임" : "1시간");
  $("coachPriceAmount").value = amount;
  $("coachPriceUnitType").value = unit;
  renderPriceUnitOptions(unit, unitText);
  updateCoachPriceValue();
}

function updateCoachPriceValue() {
  const amount = Number(String($("coachPriceAmount").value || "").replace(/[^\d]/g, ""));
  const amountText = amount ? `${amount.toLocaleString("ko-KR")}원` : "가격 상담";
  $("coachPrice").value = `${amountText} / ${$("coachPriceUnit").value}`;
}

function updateCoachImagePreview() {
  const preview = $("coachImagePreview");
  preview.style.backgroundImage = `url("${$("coachImage").value.trim() || "assets/lollogo.png"}")`;
  preview.style.backgroundPosition = "center center";
  preview.style.backgroundSize = "cover";
}

function handleCoachImageFile(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    alert("이미지 파일만 선택할 수 있습니다.");
    event.target.value = "";
    return;
  }
  if (file.size > 1024 * 1024) {
    alert("이미지는 1MB 이하로 올려주세요. 큰 이미지는 홈페이지 저장 공간을 금방 채웁니다.");
    event.target.value = "";
    return;
  }
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    state.cropSourceImage = String(reader.result || "");
    $("coachImage").value = state.cropSourceImage;
    updateCoachImagePreview();
    openCropModal();
  });
  reader.readAsDataURL(file);
}

function openCropModal() {
  const image = state.cropSourceImage || $("coachImage").value.trim();
  if (!image) return;
  $("cropImage").src = image;
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
  const size = Math.min(stage.width, stage.height) * (Number($("cropSize").value) / 100);
  const maxX = Math.max(0, stage.width - size);
  const maxY = Math.max(0, stage.height - size);
  const left = stage.left + maxX * (Number($("cropX").value) / 100);
  const top = stage.top + maxY * (Number($("cropY").value) / 100);
  return { left, top, size, imageRect: stage };
}

function updateCropBox() {
  const rect = getCropRect();
  const parentRect = document.querySelector(".crop-stage").getBoundingClientRect();
  const box = $("cropBox");
  box.style.width = `${rect.size}px`;
  box.style.height = `${rect.size}px`;
  box.style.left = `${rect.left - parentRect.left}px`;
  box.style.top = `${rect.top - parentRect.top}px`;
}

function setCropCenterFromPointer(event) {
  const rect = getCropRect();
  const imageRect = rect.imageRect;
  const maxX = Math.max(1, imageRect.width - rect.size);
  const maxY = Math.max(1, imageRect.height - rect.size);
  const left = Math.max(0, Math.min(maxX, event.clientX - imageRect.left - rect.size / 2));
  const top = Math.max(0, Math.min(maxY, event.clientY - imageRect.top - rect.size / 2));
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
  const sourceSize = Math.min(rect.size * scaleX, rect.size * scaleY);
  const canvas = document.createElement("canvas");
  canvas.width = 520;
  canvas.height = 520;
  const context = canvas.getContext("2d");
  context.drawImage(image, sourceX, sourceY, sourceSize, sourceSize, 0, 0, canvas.width, canvas.height);
  $("coachImage").value = canvas.toDataURL("image/jpeg", 0.78);
  $("coachImagePosition").value = "center center";
  updateCoachImagePreview();
  state.cropSourceImage = "";
  closeCropModal();
}

async function saveCoachFromForm() {
  const saveButton = $("saveCoachBtn");
  saveButton.disabled = true;
  setCoachSaveStatus("저장 중...", "loading");
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
    price: (updateCoachPriceValue(), $("coachPrice").value.trim() || "가격 상담"),
    image: $("coachImage").value.trim() || "assets/lollogo.png",
    imagePosition: $("coachImagePosition").value.trim() || "center center",
    imageScale: 1,
    badges: selectedBadges,
    rating: previous?.rating || 4.8,
    lessons: previous?.lessons || 0,
    bio: $("coachBio").value.trim(),
    reviews: previous?.reviews || [["첫 후기", "관리자가 입력한 샘플 후기입니다."]],
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
    setCoachSaveStatus("저장 완료", "success");
    setTimeout(() => {
      if ($("coachSaveStatus")?.textContent === "저장 완료") setCoachSaveStatus();
    }, 2200);
  } catch (error) {
    setCoachSaveStatus("저장 실패", "error");
    alert(`코치 정보를 저장하지 못했습니다.\n${error.message}`);
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
    alert(`코치 정보를 삭제하지 못했습니다.\n${error.message}`);
  }
}

function splitCsv(value) {
  return value.split(",").map((item) => item.trim()).filter(Boolean);
}

function categoryLabel(id) {
  return categories.find((category) => category.id === id)?.label || id;
}

boot();
