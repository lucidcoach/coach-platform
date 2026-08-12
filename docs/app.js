const categories = [
  { id: "league", label: "리그오브레전드" },
  { id: "valorant", label: "발로란트" },
  { id: "academy", label: "테스트" },
];

const API_BASE_URL = "https://lucid-chzzk-auth.onrender.com";
const ADMIN_TOKEN_KEY = "coach-admin-token";
const THEME_KEY = "coach-theme";
const EMAIL_MAX_LENGTH = 254;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 128;
const RESERVATION_STATUSES = ["신규", "상담중", "예약확정", "완료", "취소"];
const COACH_API_TIMEOUT_MS = 6500;

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
  league: ["운영", "라인전", "시야", "오브젝트", "팀게임", "고티어"],
  valorant: ["에임", "피킹", "엔트리", "스크림", "리플레이", "팀 피드백"],
  academy: ["코치 입문", "커리큘럼", "피드백", "브랜딩", "운영", "수강생 관리"],
};

const priceUnits = {
  time: ["30분", "1시간", "1.5시간", "2시간"],
  game: ["1게임", "2게임", "3게임"],
};

const badgeOptions = ["엠버서더", "최우수", "우수", "추천", "일반", "저티어 입문", "입문 추천", "리뷰 우수", "팀 피드백 가능"];

const text = {
  navMarket: "강의 목록",
  navBookings: "예약 관리",
  navAdmin: "코치 관리",
  navUsers: "회원 관리",
  sideLabel: "예약 안내",
  sideCopy: "코치 목록에서 원하는 상품을 고르면 상세 정보와 예약 신청을 바로 확인할 수 있습니다.",
  heroEyebrow: "LoL 리플레이 분석 · 라인전 교정 · 팀 피드백",
  heroTitle: "LoL 코칭 플랫폼",
  metricCoachesLabel: "강의",
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
  adminTitle: "코치/강의 관리",
  resetCoachesBtn: "4명 · 8강의로 초기화",
  labelCategory: "카테고리",
  labelName: "코치명",
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
  newCoachBtn: "새 강의",
  deleteCoachBtn: "삭제",
  bookingStudentLabel: "수강생 이름",
  bookingContactLabel: "Riot ID / Discord",
  bookingTimeLabel: "희망 시간",
  bookingMemoLabel: "요청사항",
  bookingSubmitBtn: "예약 신청",
  featuredTitle: "추천 코칭 상품",
  featuredHint: "후기와 재예약률이 좋은 강의",
  expertTitle: "코칭 상품 찾기",
  expertHint: "라인, 티어, 팀게임 기준으로 골라보세요.",
};

const samples = [
  { id: "coach-shineast", category: "league", name: "샤이니스트 코치", coachKey: "shineast", coachProfileName: "샤이니스트 코치", tier: "최우수", coachTier: "최우수", coachSummary: "프로팀 출신 · 모든 라인 피드백 · 팀게임 운영까지 가능", tagline: "프로팀식 운영, 라인전 교정, 팀게임 피드백까지 보는 고급 코칭", bio: "모든 라인과 팀게임을 프로팀 관점으로 점검합니다. 미니맵 시선, 턴 사용, 귀환 타이밍, 오더와 시야 컨트롤처럼 승패를 가르는 선택을 리플레이로 정리합니다.", purpose: ["value", "team", "high", "mid"], roles: ["탑", "정글", "미드", "원딜", "서폿", "팀게임"], price: "100,000원 / 1시간", image: "assets/shineast.png", featuredImage: "assets/shineast2.png", detailImage: "assets/shineast2.png", imagePosition: "center center", featuredImagePosition: "center center", detailImagePosition: "center center", rating: 5.0, lessons: 212, reviews: [["사이니스트", "복기하면서 제가 맵을 거의 안 보고 있었다는 걸 깨달았어요."], ["미드연습중", "라인을 밀어야 할 때와 받아야 할 때가 구분됐어요."]], badges: ["최우수", "추천"], featuredAd: true },
  { id: "coach-shineast-mid-value", category: "league", name: "미드 가성비 리플레이", coachKey: "shineast", coachProfileName: "샤이니스트 코치", tier: "최우수", coachTier: "최우수", coachSummary: "프로팀 출신 · 모든 라인 피드백 · 팀게임 운영까지 가능", tagline: "미드 라인전, 로밍 타이밍, 한타 합류를 핵심 장면 중심으로 빠르게 교정", bio: "미드 리플레이를 중심으로 라인 주도권, 귀환 타이밍, 정글과의 턴 사용, 사이드 합류 판단을 압축해서 봅니다. 부담 없는 리플레이 점검형 상품입니다.", purpose: ["value", "mid"], roles: ["미드", "라인전", "로밍", "리플레이"], price: "50,000원 / 1게임", image: "assets/shineast.png", featuredImage: "assets/shineast2.png", detailImage: "assets/shineast2.png", imagePosition: "center center", featuredImagePosition: "center center", detailImagePosition: "center center", rating: 4.9, lessons: 84, reviews: [["미드연습중", "로밍을 가야 하는 타이밍이 명확해졌어요."], ["아지르유저", "라인을 밀고 뭘 해야 하는지 정리가 됐습니다."]], badges: ["추천", "리뷰 우수"] },
  { id: "coach-mireu", category: "league", name: "정미르 코치", coachKey: "mireu", coachProfileName: "정미르 코치", tier: "우수", coachTier: "우수", coachSummary: "우수 수강생 · 저티어 친화 · 정글/팀게임 피드백", tagline: "저티어와 일반 수강생에게 쉬운 정글 동선, 갱각, 오브젝트 판단 코칭", bio: "학교 강의 경험을 바탕으로 입문자와 저티어가 바로 적용할 수 있는 판단 기준을 쉽게 정리합니다. 정글 첫 동선, 갱각, 오브젝트 판단과 팀게임 피드백을 부담 없는 가격대로 진행합니다.", purpose: ["jungle", "low", "team", "value"], roles: ["정글", "저티어", "팀게임", "입문"], price: "35,000원 / 1시간", image: "assets/mireu.png", featuredImage: "assets/mireu2.png", detailImage: "assets/mireu2.png", imagePosition: "center center", featuredImagePosition: "center center", detailImagePosition: "center center", rating: 4.6, lessons: 72, reviews: [["게스트", "이전 리플레이로 설명해주셔서 이해가 빨랐어요."], ["입문자", "연습 순서가 생겨서 좋았습니다."]], badges: ["우수", "입문 추천"] },
  { id: "coach-mireu-jungle-basic", category: "league", name: "저티어 정글 동선 입문", coachKey: "mireu", coachProfileName: "정미르 코치", tier: "우수", coachTier: "우수", coachSummary: "우수 수강생 · 저티어 친화 · 정글/팀게임 피드백", tagline: "첫 동선, 갱각, 오브젝트 판단을 저티어 기준으로 쉽게 정리하는 입문 코칭", bio: "정글을 막 시작했거나 동선이 자주 꼬이는 수강생에게 맞춘 강의입니다. 첫 캠프 선택, 라인 상태 읽기, 갱킹 타이밍, 용과 전령 판단을 쉬운 기준으로 정리합니다.", purpose: ["jungle", "low", "value"], roles: ["정글", "저티어", "입문", "오브젝트"], price: "25,000원 / 1게임", image: "assets/mireu.png", featuredImage: "assets/mireu2.png", detailImage: "assets/mireu2.png", imagePosition: "center center", featuredImagePosition: "center center", detailImagePosition: "center center", rating: 4.6, lessons: 38, reviews: [["브론즈정글", "첫 동선 기준이 생겼어요."], ["누누연습", "오브젝트를 언제 쳐야 하는지 알겠어요."]], badges: ["입문 추천", "저티어 입문"] },
  { id: "coach-persona", category: "league", name: "페르소나 코치", coachKey: "persona", coachProfileName: "페르소나 코치", tier: "우수", coachTier: "우수", coachSummary: "탑 라이너 출신 · 이론 중심 · 고티어까지 가능", tagline: "탑 라인 매치업, 웨이브, 텔 타이밍을 이론 중심으로 정리하는 코칭", bio: "탑 라인에서 손해를 보는 구간을 매치업과 웨이브 기준으로 분석합니다. 라인전 이론, 텔레포트 타이밍, 사이드 운영처럼 탑 라이너에게 중요한 판단을 리플레이로 점검합니다.", purpose: ["top", "high", "value"], roles: ["탑", "라인전", "고티어", "이론"], price: "45,000원 / 1시간", image: "assets/persona2.png", featuredImage: "assets/persona.png", detailImage: "assets/persona.png", imagePosition: "center center", featuredImagePosition: "center center", detailImagePosition: "center center", rating: 4.5, lessons: 41, reviews: [["게스트", "지게 보는 각도 고칠 게 명확했습니다."], ["초보탑", "뭘 몰라서 지는지 알게 됐어요."]], badges: ["우수"] },
  { id: "coach-persona-top-matchup", category: "league", name: "탑 매치업 집중 리플레이", coachKey: "persona", coachProfileName: "페르소나 코치", tier: "우수", coachTier: "우수", coachSummary: "탑 라이너 출신 · 이론 중심 · 고티어까지 가능", tagline: "탑 라인 매치업과 웨이브 손해 구간을 한 게임 단위로 짚는 리플레이 코칭", bio: "탑 라인에서 솔킬각, 웨이브 위치, 귀환 타이밍, 텔레포트 사용을 매치업별로 점검합니다. 특정 챔피언 상대법을 빠르게 정리하고 싶은 수강생에게 맞춘 상품입니다.", purpose: ["top", "value"], roles: ["탑", "매치업", "라인전", "웨이브"], price: "30,000원 / 1게임", image: "assets/persona2.png", featuredImage: "assets/persona.png", detailImage: "assets/persona.png", imagePosition: "center center", featuredImagePosition: "center center", detailImagePosition: "center center", rating: 4.5, lessons: 29, reviews: [["탑연습", "상성 때문에 지는 줄 알았는데 웨이브가 문제였어요."], ["잭스유저", "딜교 타이밍이 훨씬 명확해졌습니다."]], badges: ["추천", "우수"] },
  { id: "coach-mephi", category: "league", name: "메피 코치", coachKey: "mephi", coachProfileName: "메피 코치", tier: "엠버서더", coachTier: "엠버서더", coachSummary: "전프로 바텀 라이너 · 전 라인 피드백 · 팀게임 리뷰 가능", tagline: "바텀 라인전과 전 라인 리플레이를 전프로 관점으로 보는 코칭", bio: "시즌 5부터 현재까지 챌린저를 유지한 바텀 라이너 관점으로 라인전, 교전, 한타 포지션을 점검합니다. 전 라인 피드백과 팀게임 리뷰까지 가능하며, 운영과 시야 컨트롤도 함께 봅니다.", purpose: ["adc", "support", "team", "high"], roles: ["원딜", "서폿", "전 라인", "팀게임"], price: "70,000원 / 1시간", image: "assets/mephi.png", featuredImage: "assets/mephi2.png", detailImage: "assets/mephi2.png", imagePosition: "center center", featuredImagePosition: "center center", detailImagePosition: "center center", rating: 4.8, lessons: 103, reviews: [["리조또", "라인전 전에 계속 뭘 봐야 하는지 처음으로 이해됐어요."], ["봄", "상대 정글 위치를 근거로 플레이하는 법을 배웠습니다."]], badges: ["엠버서더", "추천"], featuredAd: true },
  { id: "coach-mephi-bot-lane", category: "league", name: "바텀 라인전 듀오 피드백", coachKey: "mephi", coachProfileName: "메피 코치", tier: "엠버서더", coachTier: "엠버서더", coachSummary: "전프로 바텀 라이너 · 전 라인 피드백 · 팀게임 리뷰 가능", tagline: "원딜과 서폿의 라인전 합, 선2렙, 교전각을 전프로 관점으로 점검", bio: "바텀 듀오 또는 원딜/서폿 개인에게 맞춘 상품입니다. 선2렙 설계, 미니언 웨이브, 시야 타이밍, 용 전 교전 준비를 리플레이로 정리합니다.", purpose: ["adc", "support", "high", "value"], roles: ["원딜", "서폿", "라인전", "교전"], price: "55,000원 / 1게임", image: "assets/mephi.png", featuredImage: "assets/mephi2.png", detailImage: "assets/mephi2.png", imagePosition: "center center", featuredImagePosition: "center center", detailImagePosition: "center center", rating: 4.8, lessons: 67, reviews: [["원딜유저", "서폿이랑 언제 싸워야 하는지 알게 됐어요."], ["서폿연습", "와드 타이밍이 훨씬 깔끔해졌습니다."]], badges: ["엠버서더", "리뷰 우수"] },
];

const initialBookings = [];

const imageMigration = {
  "assets/logo.png": "assets/logo.jpg",
  "assets/lol-logo.png": "assets/logo.jpg",
  "assets/lollogo.png": "assets/logo.jpg",
  "assets/NSshineast.jpg": "assets/shineast.png",
  "assets/mephicoach.png": "assets/mephi.png",
  "assets/mireucoach.png": "assets/mireu.png",
  "assets/personacoach.png": "assets/persona2.png",
};
const tierRank = { "엠버서더": 0, "최우수": 1, "우수": 2, "일반": 3 };

const leagueCoachProfiles = {
  shineast: { name: "샤이니스트 코치", tier: "최우수", tagline: "프로팀 출신 · 모든 라인 피드백 · 팀게임 운영까지 가능", roles: ["탑", "정글", "미드", "원딜", "서폿", "팀게임"], image: "assets/shineast.png", imagePosition: "center center", featuredImagePosition: "center center" },
  mireu: { name: "정미르 코치", tier: "우수", tagline: "저티어와 일반 수강생에게 쉬운 정글/팀게임 피드백", roles: ["정글", "저티어", "팀게임", "입문"], image: "assets/mireu.png", imagePosition: "center center", featuredImagePosition: "center center" },
  persona: { name: "페르소나 코치", tier: "우수", tagline: "탑 라인 중심의 이론과 매치업 이해도 피드백", roles: ["탑", "이론", "고티어", "라인전"], image: "assets/persona2.png", imagePosition: "center center", featuredImagePosition: "center center" },
  mephi: { name: "메피 코치", tier: "엠버서더", tagline: "전프로 바텀 라이너 · 전 라인 피드백 · 팀게임 리뷰 가능", roles: ["바텀", "전 라인", "팀게임", "전프로"], image: "assets/mephi.png", imagePosition: "center center", featuredImagePosition: "center center" },
};

const leagueLessonOverrides = {
  "coach-shineast": { coachKey: "shineast", purpose: ["value", "team", "high", "mid"] },
  "coach-mireu": { coachKey: "mireu" },
  "coach-persona": { coachKey: "persona" },
  "coach-mephi": { coachKey: "mephi" },
};
const legacyCoachKeys = { "lol-1": "persona", "lol-2": "shineast", "lol-3": "mireu", "lol-5": "mephi" };
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
  coachDashboardLoadState: "idle",
  coachDashboardLoadError: "",
  bookingFilterStatus: "all",
  bookingQuery: "",
  selectedBookingId: null,
  users: [],
  userLoadState: "idle",
  userLoadError: "",
  userSaveStates: {},
  coachRequests: [],
  coachRequestLoadState: "idle",
  coachRequestLoadError: "",
  cropSourceImage: "",
  cropTarget: null,
  currentUser: null,
  authLoadState: "idle",
  authRequestId: 0,
};

function $(id) {
  return document.getElementById(id);
}

function migrateCoachImages(coaches) {
  return normalizeCoachProfiles(coaches.map((coach) => ({
    ...coach,
    image: imageMigration[coach.image] || coach.image || "assets/logo.jpg",
    featuredImage: imageMigration[coach.featuredImage] || coach.featuredImage || "",
    detailImage: imageMigration[coach.detailImage] || coach.detailImage || "",
    bannerImage: imageMigration[coach.bannerImage] || coach.bannerImage || "",
    imagePosition: coach.imagePosition || "center 8%",
  })));
}

function getPublicCatalogCoaches(coaches) {
  return migrateCoachImages(coaches);
}

function inferLeagueCoachKey(coach) {
  if (coach.coachKey) return coach.coachKey;
  const id = String(coach.id || "");
  if (leagueLessonOverrides[id]?.coachKey) return leagueLessonOverrides[id].coachKey;
  return legacyCoachKeys[id] || id;
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
    const profile = leagueCoachProfiles[coachKey] || {
      name: coach.coachProfileName || coach.name || "신규 코치",
      tier: coach.coachTier || coach.tier || "일반",
      tagline: coach.coachSummary || coach.tagline || "",
      image: coach.image || "assets/logo.jpg",
      imagePosition: coach.imagePosition || "center center",
      featuredImagePosition: coach.featuredImagePosition || coach.imagePosition || "center center",
    };
    const imagePath = imageMigration[coach.image] || coach.image || "";
    const shouldUseProfileImage = !coach.manualCoachEdit || !imagePath || imagePath === "assets/logo.jpg" || imagePath === "assets/logo.png" || imagePath === "assets/lollogo.png" || imagePath === "assets/shineast.png";
    return {
      ...coach,
      ...lessonDefaults,
      coachKey,
      coachProfileName: profile.name,
      coachTier: profile.tier,
      coachSummary: profile.tagline,
      tier: profile.tier,
      image: shouldUseProfileImage ? profile.image : imagePath,
      imagePosition: shouldUseProfileImage ? profile.imagePosition : (coach.imagePosition || profile.imagePosition),
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
  $("coachImagePosition").placeholder = "예: center 8%, 72% 12%";
  state.coaches = getPublicCatalogCoaches(structuredClone(samples));
  state.coachLoadState = "loaded";
  render();
  bindEvents();
  showOAuthResult();
  loadCurrentUser();
  loadCoachesFromApi();
}

function showOAuthResult() {
  const url = new URL(window.location.href);
  const error = url.searchParams.get("oauth_error");
  const success = url.searchParams.get("oauth") === "success";
  if (!error && !success) return;
  url.searchParams.delete("oauth");
  url.searchParams.delete("oauth_error");
  history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  if (error) {
    openAuthModal("login");
    const messages = {
      account_link_required: "같은 이메일의 기존 계정이 있습니다. 기존 방식으로 로그인해 주세요.",
      oauth_cancelled: "소셜 로그인이 취소되었습니다.",
      invalid_oauth_state: "로그인 요청이 만료되었습니다. 다시 시도해 주세요.",
    };
    const status = $("authStatus");
    if (status) status.textContent = messages[error] || "소셜 로그인에 실패했습니다. 다시 시도해 주세요.";
  }
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
      let nextView = button.dataset.view;
      if (!nextView) return;
      if (["bookings", "admin"].includes(nextView)) {
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
      await openAdminView(button.dataset.adminView);
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
  $("guestBuyOpenBtn")?.addEventListener("click", () => {
    if (state.currentUser) logoutUser();
    else openAuthModal("guest");
  });
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
    if (!window.confirm("전 버전 기준 4명 × 2강의만 남기고 나머지 코치·강의를 숨길까요?")) return;
    await resetCoachesToSamples();
  });
  $("clearBookingsBtn").addEventListener("click", () => {
    loadReservations();
  });
  $("coachImage")?.addEventListener("input", () => updateCoachImagePreview());
  $("coachImageFile").addEventListener("change", handleCoachImageFile);
  $("coachFeaturedImageFile").addEventListener("change", (event) => handleWideCoachImageFile(event, "coachFeaturedImage", "coachFeaturedImagePreview", "상단 추천 이미지"));
  $("coachDetailImageFile").addEventListener("change", (event) => handleWideCoachImageFile(event, "coachDetailImage", "coachDetailImagePreview", "상세 설명 이미지"));
  $("openFeaturedCropBtn").addEventListener("click", () => openCropModal({
    inputId: "coachFeaturedImage",
    previewId: "coachFeaturedImagePreview",
    width: 1200,
    height: 675,
    label: "상단 추천 이미지",
  }));
  $("openCropBtn").addEventListener("click", () => openCropModal({
    inputId: "coachImage",
    previewId: "coachImagePreview",
    width: 520,
    height: 520,
    label: "일반 목록 이미지",
  }));
  $("openDetailCropBtn").addEventListener("click", () => openCropModal({
    inputId: "coachDetailImage",
    previewId: "coachDetailImagePreview",
    width: 1200,
    height: 675,
    label: "상세 설명 이미지",
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
  $("reloadUsersBtn")?.addEventListener("click", () => loadUsers());
  $("coachApplyForm")?.addEventListener("submit", submitCoachApplication);
}

function render() {
  document.querySelectorAll(".nav-item").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === state.activeView);
  });
  document.querySelectorAll(".view").forEach((view) => view.classList.remove("active"));
  $(`${state.activeView}View`).classList.add("active");
  renderMetrics();
  renderUserActions();
  renderRoleMenu();
  renderSidebarCoaches();
  renderMarket();
  renderStudentHome();
  renderBookings();
  renderAdmin();
  renderUsers();
  renderCoachRequests();
  renderCoachSelf();
  maybeLoadCoachDashboardReservations();
}

function renderMetrics() {
  const ratings = state.coaches.map((coach) => coach.rating).filter(Boolean);
  const average = ratings.length ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;
  if ($("metricCoaches")) $("metricCoaches").textContent = state.coaches.length;
  if ($("metricBookings")) $("metricBookings").textContent = state.bookings.length;
  if ($("metricRating")) $("metricRating").textContent = average.toFixed(1);
}

async function openAdminView(nextView) {
  if (!["bookings", "admin", "users", "coachSelf"].includes(nextView)) return;
  const allowed = await ensureAdminAccess();
  if (!allowed) return;
  if (nextView === "coachSelf" && state.currentUser?.role !== "admin") {
    state.coachSelfKey = getFallbackCoachKey();
  }
  state.activeView = nextView;
  document.querySelector(".admin-menu")?.removeAttribute("open");
  render();
  if (nextView === "bookings") {
    loadReservations({ promptForLogin: false });
  } else if (nextView === "users") {
    loadUsers();
  }
}

function hasCoachMenuAccess() {
  return Boolean(state.currentUser);
}

function getFallbackCoachKey(user = state.currentUser) {
  if (!user) return "";
  const knownKey = getKnownCoachKeyForUser(user);
  if (user.coachKey || knownKey) return user.coachKey || knownKey;
  return String(user.displayName || user.email || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getKnownCoachKeyForUser(user = state.currentUser) {
  const name = String(user?.displayName || "").toLowerCase();
  if (name.includes("샤이니스트") || name.includes("shineast")) return "shineast";
  if (name.includes("메피") || name.includes("mephi")) return "mephi";
  if (name.includes("정미르") || name.includes("미르") || name.includes("mireu")) return "mireu";
  if (name.includes("페르소나") || name.includes("persona")) return "persona";
  return "";
}

function hasCoachLikeAccount() {
  return state.currentUser?.role === "admin" || state.currentUser?.role === "coach" || Boolean(getKnownCoachKeyForUser());
}

function renderRoleMenu() {
  const menu = $("sideRoleMenu");
  if (!menu) return;
  if (!hasCoachMenuAccess()) {
    menu.hidden = true;
    menu.innerHTML = "";
    return;
  }
  const canManageLessons = hasCoachLikeAccount();
  menu.hidden = false;
  menu.innerHTML = `
    <span class="label">${canManageLessons ? "코치 메뉴" : "계정 메뉴"}</span>
    ${canManageLessons ? `<button class="role-menu-button ${state.activeView === "coachSelf" ? "active" : ""}" id="openCoachSelfMenuBtn" type="button">내 강의 관리</button>` : ""}
    ${state.currentUser?.role === "student" ? `<button class="role-menu-button ${state.activeView === "coachApply" ? "active" : ""}" id="openCoachApplyMenuBtn" type="button">코치 등록 요청</button>` : ""}
  `;
  $("openCoachSelfMenuBtn")?.addEventListener("click", () => {
    if (state.currentUser?.role !== "admin") state.coachSelfKey = getFallbackCoachKey();
    state.activeView = "coachSelf";
    render();
  });
  $("openCoachApplyMenuBtn")?.addEventListener("click", () => {
    state.activeView = "coachApply";
    render();
  });
}

function renderUserActions() {
  const loginButton = $("loginOpenBtn");
  const guestButton = $("guestBuyOpenBtn");
  if (!loginButton || !guestButton) return;
  if (state.currentUser) {
    loginButton.textContent = state.currentUser.displayName || state.currentUser.email || "내 계정";
    loginButton.classList.add("active-user");
    guestButton.textContent = "로그아웃";
  } else {
    loginButton.textContent = "로그인";
    loginButton.classList.remove("active-user");
    guestButton.textContent = "비회원 상담";
  }
}

function applyTheme(theme) {
  const nextTheme = theme === "dark" ? "dark" : "light";
  document.body.dataset.theme = nextTheme;
  localStorage.setItem(THEME_KEY, nextTheme);
  const button = $("themeToggleBtn");
  if (button) {
    button.textContent = nextTheme === "dark" ? "라이트모드" : "다크모드";
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
  bindAuthForm(nextMode);
  bindPasswordToggles(body);
  modal.hidden = false;
}

function bindPasswordToggles(root = document) {
  root.querySelectorAll("[data-toggle-password]").forEach((button) => {
    button.addEventListener("click", () => {
      const input = button.closest(".password-field")?.querySelector("input");
      if (!input) return;
      const shouldShow = input.type === "password";
      input.type = shouldShow ? "text" : "password";
      button.textContent = shouldShow ? "숨김" : "보기";
      button.setAttribute("aria-label", shouldShow ? "비밀번호 숨기기" : "비밀번호 보기");
      button.title = shouldShow ? "비밀번호 숨기기" : "비밀번호 보기";
    });
  });
}

function renderAuthMarkup(mode) {
  if (mode === "signup") {
    return `
      <form class="auth-content" id="authForm">
        <span class="eyebrow">회원가입</span>
        <h2 id="authTitle">수강생 계정 만들기</h2>
        <p>강의 구매 내역, 예약 시간, 후기 작성 권한을 계정에 저장합니다.</p>
        <label>닉네임<input name="displayName" required placeholder="닉네임"></label>
        <label>이메일<input name="email" type="email" required maxlength="${EMAIL_MAX_LENGTH}" autocomplete="email" placeholder="example@email.com"></label>
        <label>비밀번호
          <span class="password-field">
            <input name="password" type="password" required minlength="${PASSWORD_MIN_LENGTH}" maxlength="${PASSWORD_MAX_LENGTH}" autocomplete="new-password" placeholder="8자 이상, 128자 이하">
            <button class="password-toggle" type="button" data-toggle-password aria-label="비밀번호 보기" title="비밀번호 보기">보기</button>
          </span>
        </label>
        <button class="primary" type="submit">회원가입</button>
        <span class="auth-status" id="authStatus" aria-live="polite"></span>
      </form>
    `;
  }
  if (mode === "guest") {
    const selected = state.coaches.find((coach) => coach.id === state.selectedCoachId);
    return `
      <form class="auth-content" id="guestConsultForm">
        <span class="eyebrow">비회원 상담</span>
        <h2 id="authTitle">계정 없이 문의하기</h2>
        <p>로그인 없이 Riot ID와 연락처를 남기면 운영진이 확인 후 상담을 이어갑니다.</p>
        ${selected ? `<div class="guest-selected"><span>선택 강의</span><strong>${escapeHtml(selected.name)}</strong><em>${escapeHtml(selected.price)}</em></div>` : ""}
        <label>Riot 닉네임#태그<input name="riotId" required placeholder="Riot 닉네임#태그"></label>
        <label>연락처<input name="contact" required placeholder="디스코드 또는 이메일"></label>
        <label>받고싶은 피드백 라인 및 포인트<textarea name="feedbackPoint" required rows="4" placeholder="예: 탑 라인, 가렌 1/5/10 게임 라인전이 잘 안풀려서 피드백 받고 싶습니다."></textarea></label>
        <label>강의 방식<textarea name="lessonStyle" required rows="3" placeholder="예: 주2회 한달 강의 희망합니다."></textarea></label>
        <button class="primary" type="submit">비회원 상담 문의</button>
        <span class="auth-status" id="guestConsultStatus" aria-live="polite"></span>
      </form>
    `;
  }
  return `
    <form class="auth-content" id="authForm">
      <span class="eyebrow">로그인</span>
      <h2 id="authTitle">내 강의 이어보기</h2>
      <p>예약 내역과 후기 작성 가능 강의를 계정으로 이어서 확인합니다.</p>
      <div class="social-auth" aria-label="소셜 로그인">
        <button class="google" type="button" data-oauth-provider="google">Google로 계속하기</button>
        <button class="naver" type="button" data-oauth-provider="naver">네이버로 계속하기</button>
      </div>
      <label>이메일<input name="email" type="email" required maxlength="${EMAIL_MAX_LENGTH}" autocomplete="email" placeholder="example@email.com"></label>
      <label>비밀번호
        <span class="password-field">
          <input name="password" type="password" required minlength="${PASSWORD_MIN_LENGTH}" maxlength="${PASSWORD_MAX_LENGTH}" autocomplete="current-password" placeholder="비밀번호">
          <button class="password-toggle" type="button" data-toggle-password aria-label="비밀번호 보기" title="비밀번호 보기">보기</button>
        </span>
      </label>
      <button class="primary" type="submit">로그인</button>
      <span class="auth-status" id="authStatus" aria-live="polite"></span>
    </form>
  `;
}

function bindAuthForm(mode) {
  if (mode === "guest") {
    bindGuestConsultForm();
    return;
  }
  const form = $("authForm");
  if (!form) return;
  form.querySelectorAll("[data-oauth-provider]").forEach((button) => {
    button.addEventListener("click", () => {
      window.location.assign(`${API_BASE_URL.replace(/\/$/, "")}/api/auth/oauth/${button.dataset.oauthProvider}/start`);
    });
  });
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = form.querySelector("button[type='submit']");
    const status = $("authStatus");
    const originalText = button.textContent;
    button.disabled = true;
    button.textContent = mode === "signup" ? "가입 중" : "로그인 중";
    if (status) status.textContent = "";
    const data = new FormData(form);
    try {
      const user = mode === "signup"
        ? await signupUser({
            displayName: data.get("displayName"),
            email: data.get("email"),
            password: data.get("password"),
          })
        : await loginUser({
            email: data.get("email"),
            password: data.get("password"),
          });
      state.currentUser = user;
      if (state.currentUser?.coachKey) state.coachSelfKey = state.currentUser.coachKey;
      state.coachDashboardLoadState = "idle";
      state.coachDashboardLoadError = "";
      state.bookings = [];
      closeAuthModal();
      render();
    } catch (error) {
      if (status) status.textContent = getAuthErrorMessage(error.message);
    } finally {
      button.disabled = false;
      button.textContent = originalText;
    }
  });
}

function bindGuestConsultForm() {
  const form = $("guestConsultForm");
  if (!form) return;
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const selected = state.coaches.find((coach) => coach.id === state.selectedCoachId);
    const button = form.querySelector("button[type='submit']");
    const status = $("guestConsultStatus");
    const originalText = button.textContent;
    const data = new FormData(form);
    button.disabled = true;
    button.textContent = "문의 접수 중";
    if (status) status.textContent = "";
    try {
      await submitGuestConsultation({
        selectedCoach: selected,
        riotId: data.get("riotId"),
        contact: data.get("contact"),
        feedbackPoint: data.get("feedbackPoint"),
        lessonStyle: data.get("lessonStyle"),
      });
      form.reset();
      closeAuthModal();
      alert("비회원 상담 문의가 접수되었습니다. 운영진이 연락드릴게요.");
    } catch (error) {
      if (status) status.textContent = error.message || "문의를 접수하지 못했습니다.";
    } finally {
      button.disabled = false;
      button.textContent = originalText;
    }
  });
}

function renderStudentHome() {
  const container = $("studentViewContent");
  if (!container) return;
  if (state.currentUser?.role === "coach") {
    renderCoachDashboard(container);
    return;
  }
  setStudentHeader(false);
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
              <strong>내역이 없습니다.</strong>
              <span>구매나 예약이 생기면 이 목록에서 확인합니다.</span>
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
            <strong>작성 가능한 후기가 없습니다.</strong>
            <span>강의가 완료되면 후기 작성 버튼이 표시됩니다.</span>
          </div>
        `}
      </article>
    </section>
  `;
}

function setStudentHeader(isCoach) {
  const head = $("studentView")?.querySelector(".student-head");
  if (!head) return;
  const eyebrow = head.querySelector(".eyebrow");
  const title = head.querySelector("h2");
  const balance = head.querySelector(".student-balance");
  if (isCoach) {
    if (eyebrow) eyebrow.textContent = "코치 개인 화면";
    if (title) title.textContent = "내 정보";
    if (balance) balance.innerHTML = "<span>집계 기준</span><strong>완료 예약</strong>";
  } else {
    if (eyebrow) eyebrow.textContent = "수강생 화면";
    if (title) title.textContent = "내 강의 홈";
    if (balance) balance.innerHTML = "<span>사용 가능 포인트</span><strong>0원</strong>";
  }
}

function parseReservationPrice(value) {
  const textValue = String(value || "");
  const amount = Number((textValue.match(/[\d,]+/)?.[0] || "").replace(/,/g, "")) || 0;
  const unitMatch = textValue.match(/(\d+(?:\.\d+)?)\s*(시간|hour|hours|게임)/i);
  const unit = unitMatch?.[2] || "";
  const units = Number(unitMatch?.[1] || 1) || 1;
  return { amount, hours: /시간|hour/i.test(unit) ? units : 0 };
}

function formatWon(value) {
  return `${Math.round(Number(value) || 0).toLocaleString("ko-KR")}원`;
}

function renderCoachDashboard(container) {
  setStudentHeader(true);
  if (state.coachDashboardLoadState === "loading") {
    container.innerHTML = `
      <section class="student-panel coach-dashboard-state">
        <strong>코치 예약 통계를 불러오는 중입니다.</strong>
        <span>완료된 예약과 수강생 목록을 확인하고 있습니다.</span>
      </section>
    `;
    return;
  }
  if (state.coachDashboardLoadState === "error") {
    container.innerHTML = `
      <section class="student-panel coach-dashboard-state error">
        <strong>코치 예약 통계를 불러오지 못했습니다.</strong>
        <span>${escapeHtml(state.coachDashboardLoadError || "잠시 후 다시 시도해주세요.")}</span>
      </section>
    `;
    return;
  }

  const reservations = state.bookings;
  const completed = reservations.filter((booking) => String(booking.status || "") === "완료");
  const active = reservations.filter((booking) => String(booking.status || "") !== "취소");
  const totals = completed.reduce((result, booking) => {
    const parsed = parseReservationPrice(booking.coachPrice);
    result.hours += parsed.hours;
    result.revenue += parsed.amount;
    return result;
  }, { hours: 0, revenue: 0 });
  const students = new Set(completed.map((booking) => `${booking.student || ""}|${booking.contact || ""}`).filter((value) => value !== "|"));
  const history = reservations.slice(0, 30);

  container.innerHTML = `
    <section class="coach-summary-grid">
      <article class="coach-summary-card"><span>판매 시간</span><strong>${totals.hours.toLocaleString("ko-KR")}시간</strong><small>완료된 시간제 강의 기준</small></article>
      <article class="coach-summary-card"><span>예상 매출</span><strong>${formatWon(totals.revenue)}</strong><small>결제 연동 전 예약 금액 합계</small></article>
      <article class="coach-summary-card"><span>완료 수강생</span><strong>${students.size.toLocaleString("ko-KR")}명</strong><small>완료 예약의 고유 수강생</small></article>
      <article class="coach-summary-card"><span>전체 예약</span><strong>${active.length.toLocaleString("ko-KR")}건</strong><small>취소 제외 · 완료 ${completed.length.toLocaleString("ko-KR")}건</small></article>
    </section>
    <section class="student-panel coach-history-panel">
      <div class="student-panel-head">
        <span>예약 내역</span>
        <strong>내 강의 수강생 목록</strong>
      </div>
      <p class="coach-dashboard-note">매출과 판매 시간은 현재 <b>완료</b> 상태인 예약만 집계합니다. 결제 연동 후 실제 결제 금액으로 교체됩니다.</p>
      <div class="coach-history-list">
        ${history.length ? history.map((booking) => `
          <div class="coach-history-row">
            <em>${escapeHtml(booking.status || "신규")}</em>
            <span><strong>${escapeHtml(booking.student || "수강생")}</strong><small>${escapeHtml(booking.lesson || booking.coachName || "강의")} · ${escapeHtml(booking.time || "시간 미정")} · ${escapeHtml(booking.contact || "연락처 없음")}</small></span>
            <small>${escapeHtml(booking.createdAtText || "-")} · ${escapeHtml(booking.coachPrice || "가격 상담")}</small>
          </div>
        `).join("") : `
          <div class="student-empty"><strong>예약 내역이 없습니다.</strong><span>예약이 접수되면 이곳에서 수강생과 상태를 확인할 수 있습니다.</span></div>
        `}
      </div>
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
    name: profile?.name || first.coachProfileName || first.name || "코치",
    tier: profile?.tier || first.coachTier || first.tier || "일반",
    tagline: profile?.tagline || first.coachSummary || first.tagline || "코칭 상품",
    roles: profile?.roles || first.roles || [],
    image: profile?.image || first.image || "assets/logo.jpg",
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
        <strong>코치 목록 열기</strong>
        <small>${escapeHtml(categoryLabel(state.category))} ${identities.length}명 · ${state.coaches.filter((coach) => coach.category === state.category).length}개 강의</small>
      </span>
      <em>선택</em>
    </button>
    ${selected ? `
      <button class="selected-side-coach active" type="button" data-side-coach-key="${escapeHtml(selected.key)}">
        <img src="${selected.image}" alt="">
        <span>
          <strong>${escapeHtml(selected.name)}</strong>
          <small>${escapeHtml(selected.lessons)}개 강의 · ${escapeHtml(selected.tier)}</small>
        </span>
      </button>
    ` : `<p class="side-empty">아직 선택한 코치가 없습니다.</p>`}
    ${recent.length ? `
      <div class="recent-side-coaches">
        <span>최근 선택</span>
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
  const tierFilters = ["엠버서더", "최우수", "우수", "일반"]
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
  $("coachExplorerTitle").textContent = `${categoryLabel(state.category)} 코치 목록`;
  $("coachExplorerMeta").textContent = `${getCoachIdentities().length}명 · ${state.coaches.filter((coach) => coach.category === state.category).length}개 강의`;
  $("coachExplorerRoleFilters").innerHTML = [{ id: "all", label: "전체" }, ...roleFilters].map((filter) => `
    <button class="explorer-filter ${state.coachExplorerRole === filter.id ? "active" : ""}" type="button" data-explorer-role="${escapeHtml(filter.id)}">
      ${escapeHtml(filter.label)}
    </button>
  `).join("");
  $("coachExplorerTierFilters").innerHTML = [{ id: "all", label: "전체 등급" }, ...tierFilters].map((filter) => `
    <button class="explorer-filter ${state.coachExplorerTier === filter.id ? "active" : ""}" type="button" data-explorer-tier="${escapeHtml(filter.id)}">
      ${escapeHtml(filter.label)}
    </button>
  `).join("");

  const visible = getVisibleExplorerCoaches();
  $("coachExplorerGrid").innerHTML = visible.length ? visible.map(renderCoachExplorerCard).join("") : `
    <div class="empty">조건에 맞는 코치가 없습니다.</div>
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
  const roleText = (coach.roles || []).slice(0, 4).join(" · ");
  const badges = ["추천", coach.tier].slice(0, 2).map((badge) => `<span>${escapeHtml(badge)}</span>`).join("");
  return `
    <button class="explorer-coach-card ${coach.key === state.selectedCoachKey ? "active" : ""}" type="button" data-explorer-coach-key="${escapeHtml(coach.key)}">
      <img src="${coach.image}" alt="" style="object-position: ${coach.imagePosition};">
      <span class="explorer-coach-body">
        <span class="explorer-card-head">
          <strong>${escapeHtml(coach.name)}</strong>
          <em>${escapeHtml(coach.tier)}</em>
        </span>
        <small>${escapeHtml(coach.tagline || "코칭 상품")}</small>
        <span class="explorer-card-meta">${escapeHtml(roleText || "강의")}</span>
        <span class="explorer-card-foot">
          <span>${badges}</span>
          <b>${productCount}개 강의</b>
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
    renderSidebarCoaches();
  }
  if (state.selectedCoachKey && !state.selectedCoachId && visible.length) {
    state.selectedCoachId = visible[0].id;
  }

  renderFeatured(visible);
  const featuredIds = new Set(
    Array.from(document.querySelectorAll("#featuredList [data-coach-id]")).map((card) => card.dataset.coachId)
  );
  const listed = visible.filter((coach) => !featuredIds.has(coach.id));
  $("coachList").innerHTML = listed.length ? listed.map(renderCoachCard).join("") : `
    <div class="empty">검색 결과가 없습니다.</div>
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
  const isMainCatalog = !state.query && !state.selectedCoachKey && state.type === "all" && state.segment === "all";
  if (!featured.length || !isMainCatalog) {
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
  const eligible = visible.filter((coach) => coach.category === state.category && ["엠버서더", "최우수"].includes(coach.tier));
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
  const purposeText = getPurposeLabels(coach.purpose).slice(0, 2).join(" · ");
  return `
    <article class="featured-card ${getTierClass(coach)}" data-coach-id="${coach.id}">
      <div class="featured-image">
        <img src="${featuredImage}" alt="" style="${getWideImageStyle(coach, "featuredImagePosition")}">
        <span class="ad-label">추천</span>
        <span class="tier-ribbon">${coach.tier}</span>
      </div>
      <div class="featured-body">
        <h3>${coach.name}</h3>
        <p class="coach-owner">${escapeHtml(coach.coachProfileName || coach.name)}</p>
        <p class="purpose-label">${purposeText}</p>
        <p class="featured-summary">${coach.tagline}</p>
        <div class="featured-rating">★ ${coach.rating.toFixed(1)} <span>(${coach.lessons || 0})</span></div>
        <div class="featured-price">
          <strong>${coach.price}</strong>
          ${originalPrice ? `<del>${originalPrice}</del>` : ""}
        </div>
        <button class="detail-link" type="button" data-detail-id="${escapeHtml(coach.id)}">상세보기</button>
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
        <span class="coach-owner">${escapeHtml(coach.coachProfileName || coach.name)}</span>
        <span class="purpose-label">${purposeText}</span>
        <p>${coach.tagline}</p>
        <div class="chips">${(coach.roles || []).map((role) => `<span class="chip">${role}</span>`).join("")}</div>
      </div>
      <div class="card-foot">
        <span>★ ${coach.rating.toFixed(1)} · 후기 ${coach.reviews?.length || 0}</span>
        <span class="price">${coach.price}</span>
      </div>
      <button class="detail-link card-detail-link" type="button" data-detail-id="${escapeHtml(coach.id)}">상세보기</button>
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

function getFeaturedImage(coach) {
  return coach.featuredImage || coach.bannerImage || coach.heroImage || coach.image || "assets/logo.jpg";
}

function getDetailImage(coach) {
  return coach.detailImage || coach.bannerImage || coach.heroImage || coach.featuredImage || coach.image || "assets/logo.jpg";
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
  return labels.length ? labels : ["분류 미지정"];
}

function renderDetail() {
  const coach = state.coaches.find((item) => item.id === state.selectedCoachId);
  if (!coach) {
    $("coachDetail").innerHTML = `
      <div class="detail-empty">
        <strong>상품을 선택하면 미리보기가 표시됩니다.</strong>
        <span>상세보기에서 설명, 후기, 예약 신청을 한 번에 확인할 수 있습니다.</span>
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
      <p class="detail-owner">${escapeHtml(coach.coachProfileName || coach.name)} · ${escapeHtml(coach.coachSummary || coach.tier || "코치")}</p>
      <div class="detail-trust">
        <strong>★ ${coach.rating.toFixed(1)} <span>(${coach.lessons || 0})</span></strong>
        <em>${reviews.length}개 후기</em>
      </div>
      <p>${coach.tagline || coach.bio}</p>
      <div class="detail-summary">
        <div><span>가격</span><strong>${coach.price}</strong></div>
        <div><span>전문 분야</span><strong>${(coach.roles || []).slice(0, 4).join(", ")}</strong></div>
      </div>
      <button class="primary detail-panel-button" type="button" data-detail-id="${escapeHtml(coach.id)}">상세보기</button>
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
  const fallback = ["리플레이 핵심 장면 점검", "라인전 습관 교정", "다음 게임 적용 과제 정리"];
  return [...roles, ...purposeLabels, ...fallback]
    .map((item) => String(item).trim())
    .filter(Boolean)
    .filter((item, index, array) => array.indexOf(item) === index)
    .slice(0, 6);
}

function getCoachDetailTone(coach) {
  const key = getCoachKey(coach);
  if (key === "shineast") return "프로팀 운영 관점으로 라인전, 오더, 팀게임 판단까지 넓게 봅니다.";
  if (key === "mephi") return "전프로 바텀 라이너 관점으로 전 라인 피드백과 팀게임 리뷰까지 가능합니다.";
  if (key === "mireu") return "저티어와 일반 수강생이 바로 따라 할 수 있게 동선과 판단 기준을 쉽게 정리합니다.";
  if (key === "persona") return "탑 라인 중심의 이론과 매치업 이해도를 차분하게 정리합니다.";
  return "현재 플레이에서 바로 고칠 수 있는 습관과 다음 연습 과제를 정리합니다.";
}

function renderLessonInfoBlocks(coach) {
  const focusItems = getLessonFocusItems(coach);
  const reviewCount = coach.reviews?.length || 0;
  return `
    <section class="lesson-info-grid">
      <article>
        <span>이 강의에서 보는 것</span>
        <ul>${focusItems.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </article>
      <article>
        <span>진행 방식</span>
        <ul>
          <li>디스코드 화면공유 또는 리플레이 리뷰</li>
          <li>핵심 장면 위주로 원인과 대안을 정리</li>
          <li>끝나기 전 다음 연습 과제 확인</li>
        </ul>
      </article>
      <article>
        <span>추천 대상</span>
        <p>${escapeHtml(getCoachDetailTone(coach))}</p>
        <small>판매 ${coach.lessons || 0}회 · 후기 ${reviewCount}개 · 평점 ${coach.rating.toFixed(1)}</small>
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
      <p class="detail-owner">${escapeHtml(coach.coachProfileName || coach.name)} · ${escapeHtml(coach.coachSummary || coach.tier || "코치")}</p>
      <div class="detail-trust">
        <strong>★ ${coach.rating.toFixed(1)} <span>(${coach.lessons || 0})</span></strong>
        <em>${reviews.length}개 후기</em>
      </div>
      <p>${escapeHtml(coach.bio || coach.tagline || "")}</p>
      <div class="detail-summary">
        <div><span>가격</span><strong>${escapeHtml(coach.price)}</strong></div>
        <div><span>전문 분야</span><strong>${escapeHtml((coach.roles || []).slice(0, 5).join(", "))}</strong></div>
      </div>
      ${renderLessonInfoBlocks(coach)}
      ${reviews.length ? `
        <section class="review-preview full">
          <div>
            <strong>후기</strong>
            <span>${reviews.length}개</span>
          </div>
          ${reviews.slice(0, 3).map(([name, body]) => `<p><b>${escapeHtml(name)}</b> ${escapeHtml(body)}</p>`).join("")}
        </section>
      ` : ""}
      <section class="booking-panel">
        <div class="booking-panel-head">
          <div>
            <strong>예약 신청</strong>
            <span>Riot ID와 희망 시간을 남기면 운영진이 확인합니다.</span>
          </div>
          <em>${escapeHtml(coach.price)}</em>
        </div>
        <div class="booking-note">
          디스코드 화면공유 또는 리플레이 리뷰로 진행됩니다.
        </div>
        <div class="booking-route">
          <button class="secondary" type="button" onclick="openAuthModal('login')">회원으로 예약</button>
          <button class="secondary" type="button" onclick="openAuthModal('guest')">비회원 상담</button>
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
  $("bookingForm").student.placeholder = "예: 닉네임#KR1";
  $("bookingForm").contact.placeholder = "예: Discord ID";
  $("bookingForm").time.placeholder = "예: 8/10 21:00";
  $("bookingForm").memo.placeholder = "라인, 챔피언, 고민을 적어주세요.";
  if (state.currentUser) {
    $("bookingForm").student.value = state.currentUser.displayName || "";
    $("bookingForm").contact.value = state.currentUser.email || "";
  }
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
      alert("예약 신청이 접수되었습니다. 운영진이 연락드릴게요.");
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
    credentials: "include",
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

async function submitGuestConsultation({ selectedCoach, riotId, contact, feedbackPoint, lessonStyle }) {
  const cleanRiotId = String(riotId || "").trim();
  const cleanContact = String(contact || "").trim();
  const cleanFeedbackPoint = String(feedbackPoint || "").trim();
  const cleanLessonStyle = String(lessonStyle || "").trim();
  if (!cleanRiotId || !cleanContact || !cleanFeedbackPoint || !cleanLessonStyle) {
    throw new Error("필수 항목을 모두 입력해주세요.");
  }
  return submitReservation({
    coachId: selectedCoach?.id || "guest-consultation",
    coachName: selectedCoach ? `${selectedCoach.name} 상담 문의` : "비회원 상담 문의",
    coachCategory: selectedCoach?.category || "league",
    coachPrice: selectedCoach?.price || "상담 문의",
    student: cleanRiotId,
    contact: cleanContact,
    time: cleanLessonStyle,
    memo: cleanFeedbackPoint,
    source: "guest-consultation",
    feedbackMetadata: {
      inquiry: cleanFeedbackPoint,
      lesson_style: cleanLessonStyle,
      selected_lesson: selectedCoach ? {
        id: selectedCoach.id,
        name: selectedCoach.name,
        price: selectedCoach.price,
        coach: selectedCoach.coachProfileName || selectedCoach.name,
      } : null,
    },
  });
}

async function loadCurrentUser() {
  if (!API_BASE_URL || API_BASE_URL.includes("YOUR-COACH-API")) return;
  const requestId = ++state.authRequestId;
  state.authLoadState = "loading";
  try {
    const response = await fetch(`${API_BASE_URL.replace(/\/$/, "")}/api/auth/me`, {
      method: "GET",
      credentials: "include",
    });
    const result = await response.json().catch(() => ({}));
    if (requestId !== state.authRequestId) return;
    state.currentUser = response.ok && result.ok ? result.user : null;
    if (state.currentUser?.coachKey) state.coachSelfKey = state.currentUser.coachKey;
    state.coachDashboardLoadState = "idle";
    state.coachDashboardLoadError = "";
    state.bookings = [];
    state.authLoadState = "loaded";
    render();
  } catch {
    if (requestId !== state.authRequestId) return;
    state.currentUser = null;
    state.authLoadState = "error";
    render();
  }
}

async function signupUser(payload) {
  return requestAuth("/api/auth/signup", payload);
}

async function loginUser(payload) {
  return requestAuth("/api/auth/login", payload);
}

async function requestAuth(path, payload) {
  const response = await fetch(`${API_BASE_URL.replace(/\/$/, "")}${path}`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || !result.ok || !result.user) {
    throw new Error(result.error || `HTTP ${response.status}`);
  }
  return result.user;
}

async function logoutUser() {
  state.authRequestId += 1;
  try {
    await fetch(`${API_BASE_URL.replace(/\/$/, "")}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  } finally {
    state.currentUser = null;
    state.coachDashboardLoadState = "idle";
    state.coachDashboardLoadError = "";
    state.bookings = [];
    render();
  }
}

function getAuthErrorMessage(error) {
  const messages = {
    invalid_email: "이메일 형식을 확인해주세요.",
    weak_password: "비밀번호는 8자 이상이어야 합니다.",
    password_too_long: "비밀번호는 128자 이하로 입력해주세요.",
    missing_display_name: "닉네임을 입력해주세요.",
    email_already_exists: "이미 가입된 이메일입니다.",
    display_name_already_exists: "이미 사용 중인 닉네임입니다.",
    missing_credentials: "이메일과 비밀번호를 입력해주세요.",
    invalid_credentials: "이메일 또는 비밀번호가 맞지 않습니다.",
  };
  return messages[error] || "처리하지 못했습니다. 잠시 후 다시 시도해주세요.";
}

async function ensureAdminAccess() {
  if (sessionStorage.getItem(ADMIN_TOKEN_KEY)) return true;
  return loginForReservations();
}

async function loginForReservations() {
  const password = window.prompt("관리자 비밀번호를 입력하세요.");
  if (!password) return false;

  try {
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
    if (response.ok && result.ok && !result.adminToken) {
      alert("관리자 인증 응답에 토큰이 없습니다. 서버를 최신 코드로 다시 배포해주세요.");
      return false;
    }
    if (!response.ok || !result.ok) {
      alert("관리자 비밀번호가 맞지 않거나 인증 서버에 연결할 수 없습니다.");
      return false;
    }
    return true;
  } catch (error) {
    alert("관리자 인증 요청이 브라우저에서 차단되었습니다. 백엔드 CORS 허용 도메인에 현재 사이트 주소를 추가하고 서버를 다시 배포해야 합니다.");
    console.warn("관리자 인증 실패", error);
    return false;
  }
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

async function fetchCoachReservations() {
  const response = await fetch(`${API_BASE_URL.replace(/\/$/, "")}/api/coach/reservations`, {
    method: "GET",
    credentials: "include",
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || !result.ok) {
    const error = new Error(result.error || `HTTP ${response.status}`);
    error.status = response.status;
    throw error;
  }
  return (result.reservations || []).map(mapReservationFromApi);
}

function maybeLoadCoachDashboardReservations() {
  if (state.activeView !== "student" || state.currentUser?.role !== "coach" || state.coachDashboardLoadState !== "idle") return;
  loadCoachReservations();
}

async function loadCoachReservations() {
  if (state.currentUser?.role !== "coach") return;
  if (!API_BASE_URL || API_BASE_URL.includes("YOUR-COACH-API")) {
    state.coachDashboardLoadState = "error";
    state.coachDashboardLoadError = "예약 API 주소가 아직 설정되지 않았습니다.";
    renderStudentHome();
    return;
  }
  state.coachDashboardLoadState = "loading";
  state.coachDashboardLoadError = "";
  state.bookings = [];
  renderStudentHome();
  try {
    state.bookings = await fetchCoachReservations();
    state.coachDashboardLoadState = "loaded";
    renderMetrics();
    renderStudentHome();
  } catch (error) {
    state.bookings = [];
    state.coachDashboardLoadState = "error";
    state.coachDashboardLoadError = error.status === 401
      ? "코치 계정 인증이 만료되었습니다. 다시 로그인해주세요."
      : "코치 전용 예약 API가 배포되지 않았거나 일시적으로 사용할 수 없습니다.";
    renderStudentHome();
  }
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
    coachId: reservation.coach_id || reservation.coachId || "",
    status: reservation.status || "신규",
    createdAt: reservation.created_at || "",
    createdAtText: formatDateTime(reservation.created_at),
    coachName: reservation.coach_name || "-",
    coachPrice: reservation.coach_price || "-",
    source: reservation.source || "-",
    feedback,
    isDiscordFeedback: reservation.source === "discord-feedback",
    isGuestConsultation: reservation.source === "guest-consultation",
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
      sessionStorage.removeItem(ADMIN_TOKEN_KEY);
      const loggedIn = await loginForReservations();
      if (loggedIn) return callback();
    }
    throw error;
  }
}

async function loadCoachesFromApi() {
  if (!API_BASE_URL || API_BASE_URL.includes("YOUR-COACH-API")) {
    state.coaches = getPublicCatalogCoaches(structuredClone(samples));
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
      state.coaches = getPublicCatalogCoaches(result.coaches);
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
    console.warn("코치 목록을 불러오지 못했습니다.", error);
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

async function fetchUsers() {
  const response = await fetch(`${API_BASE_URL.replace(/\/$/, "")}/api/users`, {
    method: "GET",
    headers: getAdminHeaders(),
    credentials: "include",
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || !result.ok) {
    const error = new Error(result.error || `HTTP ${response.status}`);
    error.status = response.status;
    throw error;
  }
  return result.users || [];
}

async function loadUsers() {
  state.userLoadState = "loading";
  state.coachRequestLoadState = "loading";
  state.userLoadError = "";
  state.coachRequestLoadError = "";
  renderUsers();
  renderCoachRequests();
  try {
    const [users, requests] = await Promise.all([
      runAdminRequest(fetchUsers),
      runAdminRequest(fetchCoachRequests),
    ]);
    state.users = users;
    state.coachRequests = requests;
    state.userLoadState = "loaded";
    state.coachRequestLoadState = "loaded";
    renderUsers();
    renderCoachRequests();
  } catch (error) {
    state.userLoadState = "error";
    state.coachRequestLoadState = "error";
    state.userLoadError = "회원 목록을 불러오지 못했습니다.";
    state.coachRequestLoadError = "코치 등록 요청을 불러오지 못했습니다.";
    renderUsers();
    renderCoachRequests();
  }
}

async function updateUserRole(id, payload) {
  const response = await fetch(`${API_BASE_URL.replace(/\/$/, "")}/api/users/${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: getAdminHeaders(true),
    credentials: "include",
    body: JSON.stringify(payload),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || !result.ok) {
    const error = new Error(result.error || `HTTP ${response.status}`);
    error.status = response.status;
    throw error;
  }
  return result.user;
}

async function saveUserRole(id) {
  const role = findUserRoleSelect(id)?.value || "student";
  const coachKey = role === "coach" ? (findUserCoachSelect(id)?.value || "") : "";
  if (role === "coach" && !coachKey) {
    state.userSaveStates = { ...state.userSaveStates, [id]: "코치 선택 필요" };
    renderUsers();
    return;
  }
  state.userSaveStates = { ...state.userSaveStates, [id]: "저장 중..." };
  renderUsers();
  try {
    const user = await runAdminRequest(() => updateUserRole(id, { role, coachKey }));
    state.users = state.users.map((item) => item.id === id ? user : item);
    state.userSaveStates = { ...state.userSaveStates, [id]: "저장 완료" };
    renderUsers();
    if (user.id === state.currentUser?.id) {
      state.currentUser = user;
      if (user.coachKey) state.coachSelfKey = user.coachKey;
      renderRoleMenu();
    }
  } catch (error) {
    state.userSaveStates = { ...state.userSaveStates, [id]: "저장 실패" };
    renderUsers();
  }
}

async function submitCoachApplication(event) {
  event.preventDefault();
  if (!state.currentUser) {
    openAuthModal("login");
    return;
  }
  const form = event.currentTarget;
  const button = $("coachApplySubmitBtn");
  const status = $("coachApplyStatus");
  const originalText = button?.textContent || "요청 보내기";
  const data = new FormData(form);
  if (button) {
    button.disabled = true;
    button.textContent = "전송 중";
  }
  if (status) {
    status.textContent = "";
    status.className = "save-status loading";
  }
  try {
    await createCoachRequest({
      coachName: data.get("coachName"),
      game: data.get("game"),
      mainRole: data.get("mainRole"),
      tier: data.get("tier"),
      price: data.get("price"),
      contact: data.get("contact"),
      intro: data.get("intro"),
      sample: data.get("sample"),
    });
    form.reset();
    if (status) {
      status.textContent = "요청이 접수되었습니다. 관리자가 확인 후 승인합니다.";
      status.className = "save-status success";
    }
  } catch (error) {
    if (status) {
      status.textContent = getCoachRequestErrorMessage(error.message);
      status.className = "save-status error";
    }
  } finally {
    if (button) {
      button.disabled = false;
      button.textContent = originalText;
    }
  }
}

async function createCoachRequest(payload) {
  const response = await fetch(`${API_BASE_URL.replace(/\/$/, "")}/api/coach-requests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || !result.ok) {
    const error = new Error(result.error || `HTTP ${response.status}`);
    error.status = response.status;
    throw error;
  }
  return result.request;
}

async function fetchCoachRequests() {
  const response = await fetch(`${API_BASE_URL.replace(/\/$/, "")}/api/coach-requests`, {
    method: "GET",
    headers: getAdminHeaders(),
    credentials: "include",
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || !result.ok) {
    const error = new Error(result.error || `HTTP ${response.status}`);
    error.status = response.status;
    throw error;
  }
  return result.requests || [];
}

async function decideCoachRequest(id, action) {
  const response = await fetch(`${API_BASE_URL.replace(/\/$/, "")}/api/coach-requests/${encodeURIComponent(id)}/${action}`, {
    method: "POST",
    headers: getAdminHeaders(true),
    credentials: "include",
    body: JSON.stringify({}),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || !result.ok) {
    const error = new Error(result.error || `HTTP ${response.status}`);
    error.status = response.status;
    throw error;
  }
  return result;
}

async function approveCoachRequest(id) {
  try {
    const result = await runAdminRequest(() => decideCoachRequest(id, "approve"));
    state.coachRequests = state.coachRequests.map((item) => item.id === id ? result.request : item);
    if (result.user) state.users = state.users.map((item) => item.id === result.user.id ? result.user : item);
    if (result.coach) {
      state.coaches = getPublicCatalogCoaches([...state.coaches.filter((coach) => coach.id !== result.coach.id), result.coach]);
    }
    renderUsers();
    renderCoachRequests();
    renderMarket();
  } catch (error) {
    alert(`코치 등록 요청을 승인하지 못했습니다.\n${error.message}`);
  }
}

async function rejectCoachRequest(id) {
  try {
    const result = await runAdminRequest(() => decideCoachRequest(id, "reject"));
    state.coachRequests = state.coachRequests.map((item) => item.id === id ? result.request : item);
    renderCoachRequests();
  } catch (error) {
    alert(`코치 등록 요청을 거절하지 못했습니다.\n${error.message}`);
  }
}

function getCoachRequestErrorMessage(error) {
  const messages = {
    login_required: "로그인 후 코치 등록 요청을 보낼 수 있습니다.",
    already_coach: "이미 코치 권한이 있는 계정입니다.",
    missing_coach_name: "코치 이름을 입력해주세요.",
    pending_request_exists: "이미 확인 대기 중인 코치 등록 요청이 있습니다.",
  };
  return messages[error] || "요청을 보내지 못했습니다. 잠시 후 다시 시도해주세요.";
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
      <h3>Discord / ROFL 접수</h3>
      <div class="booking-detail-grid">
        ${renderDetailItem("요청 시간", booking.createdAtText)}
        ${renderDetailItem("수강생 / Riot ID", booking.studentName)}
        ${renderDetailItem("챔피언 및 K/D/A", booking.coachPrice)}
        ${renderDetailItem("현재 상태", booking.status)}
        ${renderDetailItem("Discord 요청자", `${booking.feedback?.discord_display_name || "-"} (${booking.feedback?.discord_user_id || "-"})`)}
        ${renderDetailItem("서버 / 채널", `${booking.feedback?.guild_name || "-"} / ${booking.feedback?.channel_name || "-"}`)}
        ${renderDetailLink("ROFL 파일", attachment.filename, attachment.url)}
        ${renderDetailItem("문의사항", booking.feedback?.inquiry || booking.memo, true)}
      </div>
    `;
    return;
  }
  if (booking.isGuestConsultation) {
    const selected = booking.feedback?.selected_lesson || {};
    panel.hidden = false;
    panel.innerHTML = `
      <h3>비회원 상담 문의</h3>
      <div class="booking-detail-grid">
        ${renderDetailItem("접수 시간", booking.createdAtText)}
        ${renderDetailItem("Riot 닉네임#태그", booking.studentName)}
        ${renderDetailItem("연락처", booking.contact)}
        ${renderDetailItem("선택 강의", selected.name ? `${selected.name} · ${selected.price || "-"}` : booking.coachName)}
        ${renderDetailItem("현재 상태", booking.status)}
        ${renderDetailItem("받고싶은 피드백 라인 및 포인트", booking.feedback?.inquiry || booking.memo, true)}
        ${renderDetailItem("강의 방식", booking.feedback?.lesson_style || booking.preferredTime, true)}
      </div>
    `;
    return;
  }
  panel.hidden = false;
  panel.innerHTML = `
    <h3>예약 상세</h3>
    <div class="booking-detail-grid">
      ${renderDetailItem("예약 ID", booking.id)}
      ${renderDetailItem("요청 시간", booking.createdAtText)}
      ${renderDetailItem("코치명", booking.coachName)}
      ${renderDetailItem("상품 가격", booking.coachPrice)}
      ${renderDetailItem("접수 경로", booking.source)}
      ${renderDetailItem("수강생 / Riot ID", booking.studentName)}
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
  const groups = new Map();
  state.coaches.forEach((coach) => {
    const name = String(coach.coachProfileName || coach.name || "이름 없음").trim();
    if (!groups.has(name)) groups.set(name, []);
    groups.get(name).push(coach);
  });

  $("adminCoachList").innerHTML = groups.size ? [...groups.entries()].map(([name, coaches]) => `
    <section class="admin-coach-group">
      <div class="admin-coach-head">
        <strong>${name}</strong>
        <span>${coaches.length}개 강의</span>
      </div>
      ${coaches.map((coach) => `
        <button class="admin-row" type="button" data-id="${coach.id}">
          <img src="${coach.image}" alt="">
          <span>
            <h4>${coach.tagline || coach.name}</h4>
            <p>${categoryLabel(coach.category)} · ${coach.price}</p>
          </span>
          <span class="chip">수정</span>
        </button>
      `).join("")}
    </section>
  `).join("") : `<div class="empty">등록된 강의가 없습니다.</div>`;

  document.querySelectorAll(".admin-row").forEach((row) => {
    row.addEventListener("click", () => fillCoachForm(state.coaches.find((coach) => coach.id === row.dataset.id)));
  });
}

function renderUsers() {
  const target = $("userRows");
  if (!target) return;
  if (state.userLoadState === "idle") {
    target.innerHTML = `<tr><td colspan="4">회원 목록을 불러오려면 새로고침을 눌러주세요.</td></tr>`;
    return;
  }
  if (state.userLoadState === "loading") {
    target.innerHTML = `<tr><td colspan="4">회원 목록을 불러오는 중입니다.</td></tr>`;
    return;
  }
  if (state.userLoadState === "error") {
    target.innerHTML = `<tr><td colspan="4">${escapeHtml(state.userLoadError || "회원 목록을 불러오지 못했습니다.")}</td></tr>`;
    return;
  }
  const coachOptions = getCoachIdentities("league");
  target.innerHTML = state.users.length ? state.users.map((user) => `
    <tr>
      <td>${escapeHtml(user.displayName || "-")}</td>
      <td>${escapeHtml(user.email || "-")}</td>
      <td>
        <select data-user-role="${escapeHtml(user.id)}">
          ${["student", "coach", "admin"].map((role) => `<option value="${role}" ${role === user.role ? "selected" : ""}>${getRoleLabel(role)}</option>`).join("")}
        </select>
        <select data-user-coach="${escapeHtml(user.id)}" ${user.role === "coach" ? "" : "hidden"}>
          <option value="">코치 선택</option>
          ${coachOptions.map((coach) => `<option value="${escapeHtml(coach.key)}" ${coach.key === user.coachKey ? "selected" : ""}>${escapeHtml(coach.name)}</option>`).join("")}
        </select>
        ${user.role === "coach" ? `<small>${escapeHtml(getUserCoachLabel(user))}</small>` : ""}
      </td>
      <td>
        <div class="inline-save">
          <button class="mini primary-mini" type="button" data-user-save="${escapeHtml(user.id)}">저장</button>
          <span class="save-status ${getUserSaveClass(user.id)}">${escapeHtml(state.userSaveStates[user.id] || "")}</span>
        </div>
      </td>
    </tr>
  `).join("") : `<tr><td colspan="4">가입한 회원이 없습니다.</td></tr>`;

  document.querySelectorAll("[data-user-save]").forEach((button) => {
    button.addEventListener("click", () => saveUserRole(button.dataset.userSave));
  });
  document.querySelectorAll("[data-user-role]").forEach((select) => {
    select.addEventListener("change", () => {
      const coachSelect = findUserCoachSelect(select.dataset.userRole);
      if (coachSelect) coachSelect.hidden = select.value !== "coach";
    });
  });
}

function renderCoachRequests() {
  const target = $("coachRequestRows");
  if (!target) return;
  if (state.coachRequestLoadState === "idle") {
    target.innerHTML = `<tr><td colspan="5">회원 목록 새로고침을 누르면 코치 등록 요청도 함께 불러옵니다.</td></tr>`;
    return;
  }
  if (state.coachRequestLoadState === "loading") {
    target.innerHTML = `<tr><td colspan="5">코치 등록 요청을 불러오는 중입니다.</td></tr>`;
    return;
  }
  if (state.coachRequestLoadState === "error") {
    target.innerHTML = `<tr><td colspan="5">${escapeHtml(state.coachRequestLoadError || "코치 등록 요청을 불러오지 못했습니다.")}</td></tr>`;
    return;
  }
  target.innerHTML = state.coachRequests.length ? state.coachRequests.map((request) => `
    <tr>
      <td>
        <strong>${escapeHtml(request.displayName || "-")}</strong>
        <small>${escapeHtml(request.email || "")}</small>
      </td>
      <td>
        <strong>${escapeHtml(request.coachName || "-")}</strong>
        <small>${escapeHtml([request.game, request.mainRole, request.tier].filter(Boolean).join(" · "))}</small>
      </td>
      <td>
        <span>${escapeHtml(request.intro || "-")}</span>
        <small>${escapeHtml(request.price || "가격 미입력")} · ${escapeHtml(request.contact || "연락처 없음")}</small>
      </td>
      <td>${getCoachRequestStatusLabel(request.status)}</td>
      <td>
        ${request.status === "pending" ? `
          <div class="booking-actions">
            <button class="mini primary-mini" type="button" data-request-approve="${escapeHtml(request.id)}">승인</button>
            <button class="mini danger-mini" type="button" data-request-reject="${escapeHtml(request.id)}">거절</button>
          </div>
        ` : `<span class="chip">${escapeHtml(request.coachKey || "-")}</span>`}
      </td>
    </tr>
  `).join("") : `<tr><td colspan="5">접수된 코치 등록 요청이 없습니다.</td></tr>`;

  document.querySelectorAll("[data-request-approve]").forEach((button) => {
    button.addEventListener("click", () => approveCoachRequest(button.dataset.requestApprove));
  });
  document.querySelectorAll("[data-request-reject]").forEach((button) => {
    button.addEventListener("click", () => rejectCoachRequest(button.dataset.requestReject));
  });
}

function getCoachRequestStatusLabel(status) {
  return { pending: "대기중", approved: "승인됨", rejected: "거절됨" }[status] || status;
}

function getUserCoachLabel(user) {
  const key = user.coachKey;
  const coach = getCoachIdentities("league").find((item) => item.key === key);
  return coach ? `${coach.name} 연결됨` : "코치 프로필 자동 생성 대상";
}

function getUserSaveClass(id) {
  const message = state.userSaveStates[id] || "";
  if (message.includes("완료")) return "success";
  if (message.includes("실패")) return "error";
  if (message.includes("저장 중")) return "loading";
  return "";
}

function getRoleLabel(role) {
  return { student: "수강생", coach: "코치", admin: "관리자" }[role] || role;
}

function findUserRoleSelect(id) {
  return [...document.querySelectorAll("[data-user-role]")].find((select) => select.dataset.userRole === id);
}

function findUserCoachSelect(id) {
  return [...document.querySelectorAll("[data-user-coach]")].find((select) => select.dataset.userCoach === id);
}

function getCoachSelfLessons() {
  const allowedKey = state.currentUser?.role !== "admin" ? getFallbackCoachKey() : state.coachSelfKey;
  return state.coaches.filter((coach) => coach.category === "league" && getCoachKey(coach) === allowedKey);
}

function renderCoachSelf() {
  if (!$("coachSelfTabs") || !$("coachSelfLessonGrid") || !$("coachSelfEditor")) return;
  const currentCoachKey = getFallbackCoachKey();
  const identities = getCoachIdentities("league").filter((coach) => (
    state.currentUser?.role === "admin" || coach.key === currentCoachKey
  ));
  if (!identities.some((coach) => coach.key === state.coachSelfKey)) {
    state.coachSelfKey = identities[0]?.key || currentCoachKey || "shineast";
  }
  const current = identities.find((coach) => coach.key === state.coachSelfKey);
  const canSwitchCoach = state.currentUser?.role === "admin";
  $("coachSelfTabs").hidden = !canSwitchCoach;
  $("coachSelfTabs").innerHTML = canSwitchCoach ? identities.map((coach) => `
    <button class="coach-self-tab ${coach.key === state.coachSelfKey ? "active" : ""}" type="button" data-self-coach-key="${escapeHtml(coach.key)}">
      ${escapeHtml(coach.name)}
    </button>
  `).join("") : "";
  $("coachSelfName").textContent = current ? current.name : "코치 선택";
  $("coachSelfHint").textContent = current ? `${current.tier} · ${current.lessons}개 강의` : "강의를 선택하면 오른쪽에서 수정할 수 있습니다.";

  const lessons = getCoachSelfLessons();
  if (state.coachSelfLessonId && !lessons.some((lesson) => lesson.id === state.coachSelfLessonId)) {
    state.coachSelfLessonId = null;
  }
  $("coachSelfLessonGrid").innerHTML = lessons.length ? lessons.map((lesson) => `
    <button class="coach-self-card ${lesson.id === state.coachSelfLessonId ? "active" : ""}" type="button" data-self-lesson-id="${escapeHtml(lesson.id)}">
      <img src="${lesson.image}" alt="" style="${getImageStyle(lesson)}">
      <span>
        <strong>${escapeHtml(lesson.name)}</strong>
        <small>${escapeHtml(lesson.tagline || "강의 설명 없음")}</small>
        <em>${escapeHtml(lesson.price || "가격 상담")}</em>
      </span>
    </button>
  `).join("") : `<div class="empty">이 코치에게 연결된 강의가 없습니다.</div>`;

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
        <strong>강의를 선택해주세요.</strong>
        <span>선택한 코치의 강의만 여기에서 개별 수정할 수 있습니다.</span>
      </div>
    `;
    return;
  }
  const amount = String(lesson.price || "").match(/[\d,]+/)?.[0]?.replace(/[^\d]/g, "") || "";
  const unitType = String(lesson.price || "").includes("게임") ? "game" : "time";
  const unit = String(lesson.price || "").split("/")[1]?.trim() || (unitType === "game" ? "1게임" : "1시간");
  const filters = filterSets.league;
  const purposeOptions = filters.type.filter((item) => item.id !== "all");
  const selectedPurposes = getCoachPurposes(lesson);
  const selectedRoles = lesson.roles || [];
  editor.innerHTML = `
    <form class="coach-self-form" id="coachSelfForm">
      <input type="hidden" id="coachSelfLessonId" value="${escapeHtml(lesson.id)}">
      <div class="coach-self-editor-head">
        <div>
          <span>${escapeHtml(lesson.coachProfileName || "코치")}</span>
          <h3>${escapeHtml(lesson.name)}</h3>
        </div>
        <button type="submit" class="primary" id="coachSelfSaveBtn">저장</button>
      </div>
      <label>강의명<input id="coachSelfLessonName" required value="${escapeHtml(lesson.name)}"></label>
      <label>한 줄 소개<input id="coachSelfTagline" required value="${escapeHtml(lesson.tagline || "")}"></label>
      <div class="price-builder">
        <label><span>가격</span><input id="coachSelfPriceAmount" inputmode="numeric" value="${escapeHtml(amount)}"></label>
        <label><span>기준</span>
          <select id="coachSelfPriceUnitType">
            <option value="time" ${unitType === "time" ? "selected" : ""}>시간</option>
            <option value="game" ${unitType === "game" ? "selected" : ""}>게임</option>
          </select>
        </label>
        <label><span>단위</span><select id="coachSelfPriceUnit"></select></label>
        <input id="coachSelfPrice" type="hidden">
      </div>
      ${["엠버서더", "최우수"].includes(lesson.tier) ? `
        <label class="toggle-line">
          <input id="coachSelfFeaturedAd" type="checkbox" ${lesson.featuredAd ? "checked" : ""}>
          <span>이 강의를 상단 추천 광고로 노출</span>
        </label>
      ` : ""}
      <fieldset class="choice-field">
        <legend>분류</legend>
        <div class="choice-grid">
          ${purposeOptions.map((item) => `<label><input type="checkbox" name="coachSelfPurposeChoice" value="${item.id}" ${selectedPurposes.includes(item.id) ? "checked" : ""}> ${item.label}</label>`).join("")}
        </div>
      </fieldset>
      <fieldset class="choice-field">
        <legend>전문 분야</legend>
        <div class="choice-grid">
          ${[...adminLineOptions.league, ...adminFieldOptions.league].map((role) => `<label><input type="checkbox" name="coachSelfRoleChoice" value="${role}" ${selectedRoles.includes(role) ? "checked" : ""}> ${role}</label>`).join("")}
        </div>
      </fieldset>
      <label>상세 설명<textarea id="coachSelfBio" rows="7">${escapeHtml(lesson.bio || "")}</textarea></label>
      <div class="form-actions">
        <button type="button" class="secondary" id="coachSelfOpenFullEditBtn">전체 편집 화면에서 열기</button>
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
  const amountText = amount ? `${amount.toLocaleString("ko-KR")}원` : "가격 상담";
  if ($("coachSelfPrice")) $("coachSelfPrice").value = `${amountText} / ${$("coachSelfPriceUnit").value}`;
}

async function saveCoachSelfLesson(event) {
  event.preventDefault();
  const id = $("coachSelfLessonId").value;
  const previous = state.coaches.find((coach) => coach.id === id);
  if (!previous) return;
  const saveButton = $("coachSelfSaveBtn");
  saveButton.disabled = true;
  $("coachSelfSaveStatus").textContent = "저장 중...";
  $("coachSelfSaveStatus").className = "save-status loading";
  const next = {
    ...previous,
    manualCoachEdit: true,
    name: $("coachSelfLessonName").value.trim(),
    tagline: $("coachSelfTagline").value.trim(),
    price: (updateCoachSelfPriceValue(), $("coachSelfPrice").value.trim() || "가격 상담"),
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
    $("coachSelfSaveStatus").textContent = "저장 완료";
    $("coachSelfSaveStatus").className = "save-status success";
    renderCoachSelf();
  } catch (error) {
    $("coachSelfSaveStatus").textContent = "저장 실패";
    $("coachSelfSaveStatus").className = "save-status error";
    alert(`강의 정보를 저장하지 못했습니다.\n${error.message}`);
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
  $("coachImage").value = coach?.image || "assets/logo.jpg";
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
  `).join("") : `<span class="choice-empty">선택한 배지 없음</span>`;
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
  preview.style.backgroundImage = `url("${$("coachImage").value.trim() || "assets/logo.jpg"}")`;
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
    alert("이미지 파일만 선택할 수 있습니다.");
    event.target.value = "";
    return;
  }
  if (file.size > 1024 * 1024) {
    alert("이미지는 1MB 이하로 올려주세요. 큰 이미지는 저장 공간을 빠르게 채울 수 있습니다.");
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
      label: "일반 목록 이미지",
    });
  });
  reader.readAsDataURL(file);
}

function handleWideCoachImageFile(event, inputId, previewId, label) {
  const file = event.target.files?.[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    alert("이미지 파일만 선택할 수 있습니다.");
    event.target.value = "";
    return;
  }
  if (file.size > 3 * 1024 * 1024) {
    alert(`${label}는 3MB 이하로 올려주세요.`);
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
    label: "일반 목록 이미지",
  };
  const image = state.cropSourceImage || $(state.cropTarget.inputId).value.trim();
  if (!image) return;
  $("cropImage").src = image;
  $("cropTitle").textContent = `${state.cropTarget.label} 범위 지정`;
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
    image: $("coachImage").value.trim() || "assets/logo.jpg",
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
