/**
 * Portfolio Management System
 * SIG Corporation - Admin & Portfolio Functions
 */

// ==========================================
// Data Management
// ==========================================

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const LOCAL_STORAGE_KEY = 'sigProjects';
const SUPABASE_TABLE = 'portfolio_projects';

const DEFAULT_PROJECTS = {
    project1: {
        order: 1,
        title: "이마트 & 노브랜드",
        category: "패키지 디자인",
        categoryTag: "branding",
        icon: "📦",
        tag: "패키지",
        date: "2024년",
        description: "글로벌 유통 브랜드 이마트 중국 수출 상품의 패키지 개발 파트너로 참여하여, 노브랜드 스낵류 봉지 패키지 디자인을 포함한 다수의 제품 패키지를 제작했습니다. 현지 유통 환경과 중국 소비자 취향을 반영해 레이블 구조, 컬러 톤, 제품 USP 노출 방식을 현지화 기준에 맞게 재정비하였으며, 브랜드의 심플한 아이덴티티를 유지하면서도 수출 패키지에 필요한 법규·표기 요소를 정확히 충족하도록 설계했습니다.",
        gradient: "linear-gradient(135deg, #236242 0%, #1a4d33 100%)",
        images: [],
        stats: [
            { value: "이마트", label: "중국 수출" },
            { value: "노브랜드", label: "스낵류" },
            { value: "현지화", label: "패키지" }
        ],
        features: [
            "노브랜드 스낵류 봉지 패키지 디자인",
            "중국 수출 상품 패키지 제작",
            "현지 유통 환경 반영",
            "법규·표기 요소 충족",
            "브랜드 아이덴티티 유지",
            "레이블 구조 및 컬러 톤 현지화"
        ]
    },
    project2: {
        order: 2,
        title: "유캔 캔시머",
        category: "쿠팡, 배민, 와디즈 입점",
        categoryTag: "commerce",
        icon: "🥫",
        tag: "커머스",
        date: "2024년",
        description: "유캔 자동 & 수동 캔시머 상세페이지 · 배너 · 광고 디자인 및 와디즈 A-Z 스텝 가이드&전담 대행을 진행한 퍼포먼스 중심 프로젝트입니다. 유캔 수동·자동 캔시머는 \"시간이 곧 매출\"이라는 실 사용자들의 고민에서 탄생한 제품으로, 포장 속도·밀봉력·가격 경쟁력이라는 강력한 USP를 갖고 있습니다. 시그코퍼레이션은 이 핵심 가치를 소비자가 한눈에 이해하고 즉시 구매로 이어지도록 상세페이지 기획부터 촬영, 배너 디자인, 광고 콘텐츠 제작까지 전 과정을 총괄했습니다.",
        gradient: "linear-gradient(135deg, #0F7B6C 0%, #083516 100%)",
        images: [],
        stats: [
            { value: "와디즈", label: "A-Z 대행" },
            { value: "퍼포먼스", label: "중심" },
            { value: "3채널", label: "입점" }
        ],
        features: [
            "상세페이지 기획 및 디자인",
            "배너 디자인 제작",
            "광고 콘텐츠 제작",
            "와디즈 전담 대행",
            "촬영 기획 및 디렉팅",
            "USP 중심 스토리텔링"
        ]
    },
    project3: {
        order: 3,
        title: "M3AT",
        category: "VIP 폐쇄몰 입점",
        categoryTag: "branding",
        icon: "🥩",
        tag: "브랜딩",
        date: "2024년",
        description: "상위 0.1% 미식 경험을, 수준 높은 브랜드 경험으로 재해석한 프로젝트입니다. 브랜드 핵심은 미슐랭 파인다이닝의 맛·품격·희소성을 일반 소비자도 '집에서 경험할 수 있는 미식'으로 전달하는 것. 이를 위해 상위 0.1% 한우의 정체성을 로고 시스템·키 메시지·색채·카피 톤 등 브랜드 아이덴티티 전반에 재정의했습니다. 패키지 디자인은 청와대 납품 박스의 톤을 계승한 리넨 텍스처·블랙&골드 포일·리본 스텝 구조 등 고급스러운 선물 경험을 강화하는 방향으로 설계했습니다.",
        gradient: "linear-gradient(135deg, #32D27F 0%, #236242 100%)",
        images: [],
        stats: [
            { value: "VIP", label: "폐쇄몰" },
            { value: "미슐랭", label: "파인다이닝" },
            { value: "프리미엄", label: "브랜딩" }
        ],
        features: [
            "브랜드 로고 시스템 개발",
            "브랜드 총괄 기획",
            "패키지 디자인 (리넨 텍스처, 골드 포일)",
            "상세페이지 디자인",
            "판매전략 기획",
            "선물 경험 강화 설계"
        ]
    },
    project4: {
        order: 4,
        title: "WATER FOX",
        category: "와디즈 입점",
        categoryTag: "wadiz",
        icon: "💧",
        tag: "와디즈",
        date: "2024년",
        description: "워터폭스 애프터 샤워 미스트의 전략 기획 · 상세페이지 디자인 · 광고 크리에이티브 제작을 진행했습니다. \"샤워 직후 3분의 골든타임\"을 성분 중심의 스토리로 재해석한 프로젝트입니다. 화장품 카테고리에서 가장 중요한 '성분의 신뢰도'와 워터폭스만의 강점인 엑토인·나이아신아마이드·병풀수 기반의 고효능 조합을 소비자가 쉽고 명확하게 이해할 수 있도록 과학적 스토리텔링 중심 구조로 설계했습니다.",
        gradient: "linear-gradient(135deg, #6940A5 0%, #2e0d5c 100%)",
        images: [],
        stats: [
            { value: "와디즈", label: "입점" },
            { value: "골든타임", label: "3분" },
            { value: "성분", label: "중심" }
        ],
        features: [
            "판매전략 기획",
            "상세페이지 디자인",
            "광고 디자인",
            "과학적 스토리텔링 구조",
            "5STEP 구조 재정리",
            "성분 신뢰도 강화"
        ]
    },
    project5: {
        order: 5,
        title: "미래회관",
        category: "카카오메이커스, 와디즈 입점",
        categoryTag: "wadiz",
        icon: "🍖",
        tag: "와디즈",
        date: "2024년",
        description: "미래회관 프리미엄 패키지 디자인 & 상세페이지 기획을 진행했습니다. 26년 경력 장인의 드라이에이징 기술을 브랜딩 관점에서 재해석한 풀 프로세스 펀딩 프로젝트입니다. 미래회관은 20년 넘게 드라이에이징 기술을 연구해온 장인의 노하우를 기반으로, 한돈·한우 숙성육을 최고의 퀄리티로 제공하는 브랜드입니다. 시그코퍼레이션은 이 브랜드의 핵심 가치 \"정직한 선별육, 프리미엄 숙성 기술, 선물에 걸맞은 완성도\"를 소비자에게 명확하게 전달하기 위해 패키지 디자인, 촬영, 상세페이지 기획·구성을 전체 총괄했습니다.",
        gradient: "linear-gradient(135deg, #0B6E99 0%, #052a40 100%)",
        images: [],
        stats: [
            { value: "26년", label: "장인 기술" },
            { value: "드라이에이징", label: "숙성육" },
            { value: "프리미엄", label: "패키지" }
        ],
        features: [
            "패키지 디자인",
            "상세페이지 디자인",
            "판매전략 기획",
            "촬영 기획 및 디렉팅",
            "GIF 디렉팅",
            "브랜딩 관점 풀 프로세스"
        ]
    },
    project6: {
        order: 6,
        title: "이브봇",
        category: "CJ펀샵, 와디즈 입점",
        categoryTag: "wadiz",
        icon: "🖨️",
        tag: "와디즈",
        date: "2024년",
        description: "이브봇 프린트펜 상세페이지 제작 및 썸네일·광고 이미지 디자인을 진행했습니다. 4년 만의 업그레이드로 돌아온 이브봇 프린트펜의 강점인 휴대성, 항공기 소재 바디, 3,500회 이상 인쇄 가능한 카트리지, 식용 잉크, 어떤 질감에도 인쇄 가능한 성능을 소비자가 직관적으로 이해할 수 있도록 상세페이지 구조를 기획하고 카피·이미지 흐름을 설계했습니다. \"생각만 해왔던 커스텀, 이젠 쉬워집니다\"라는 메시지를 중심으로, 학교·회사·카페·육아·브랜드 팝업 등 다양한 사용 시나리오를 스토리텔링으로 풀어냈습니다.",
        gradient: "linear-gradient(135deg, #C78500 0%, #8b4a00 100%)",
        images: [],
        stats: [
            { value: "4년만", label: "업그레이드" },
            { value: "3,500회", label: "인쇄 가능" },
            { value: "커스텀", label: "프린터" }
        ],
        features: [
            "광고 디자인",
            "상세페이지 디자인",
            "판매전략 기획",
            "썸네일·메인 이미지 제작",
            "광고용 크리에이티브",
            "사용 시나리오 스토리텔링"
        ]
    },
    project7: {
        order: 7,
        title: "투뿔한우 NO.9",
        category: "우리은행, 토스 와디즈 입점",
        categoryTag: "wadiz",
        icon: "🥩",
        tag: "와디즈",
        date: "2024년",
        description: "투뿔한우 3CM 브랜드 기획 & NO.9 선물세트 패키지·상세페이지 디자인을 진행했습니다. 205시간 숙성 한우의 프리미엄 가치를, 브랜드 경험 전반으로 확장한 프로젝트입니다. 투뿔한우 No.9의 핵심 자산인 3cm 채끝·안심 콘셉트를 중심으로, 브랜드 네이밍·키 메시지·3CM 전용 리워드 구조를 기획하고 상세페이지 카피/구성 흐름을 설계했습니다. 청와대 귀빈용 패키지 톤을 계승한 블랙·그린·블루 라벨 선물세트 패키지와 인쇄물(감사 카드, 레시피 카드 등)을 디자인했습니다.",
        gradient: "linear-gradient(135deg, #64473A 0%, #2f1a0f 100%)",
        images: [],
        stats: [
            { value: "205시간", label: "숙성" },
            { value: "3CM", label: "채끝·안심" },
            { value: "프리미엄", label: "선물세트" }
        ],
        features: [
            "상세페이지 디자인",
            "인쇄물 디자인",
            "광고 디자인",
            "패키지 디자인",
            "판매전략 기획",
            "브랜드 네이밍 및 키 메시지"
        ]
    },
    project8: {
        order: 8,
        title: "오드리 마켓",
        category: "더벤티 입점",
        categoryTag: "commerce",
        icon: "🍠",
        tag: "커머스",
        date: "2024년",
        description: "오드리마켓 감자·고구마빵 브랜딩 & 로고·패키지·상세페이지 제작을 진행했습니다. 문경 감자와 논산 고구마의 '진짜 원물 가치'를 일상 간식으로 재해석한 프로젝트입니다. 브랜드 네이밍 톤·로고·컬러 시스템부터 패키지 구조, 그리고 감자 원산지 데이터(지역별 생산량 그래프)와 70년 장인 베이커리 스토리, HACCP 인증, 대기업 납품 이력 등 신뢰 요소를 한 번에 읽히도록 설계한 상세페이지 브랜딩을 진행했습니다.",
        gradient: "linear-gradient(135deg, #2E3A8C 0%, #0b1030 100%)",
        images: [],
        stats: [
            { value: "문경 감자", label: "논산 고구마" },
            { value: "70년", label: "장인 베이커리" },
            { value: "HACCP", label: "인증" }
        ],
        features: [
            "상세페이지 디자인",
            "로고 디자인",
            "패키지 디자인",
            "판매전략 기획",
            "브랜드 네이밍 및 컬러 시스템",
            "원산지 데이터 시각화"
        ]
    },
    project9: {
        order: 9,
        title: "일상이상",
        category: "와디즈 입점",
        categoryTag: "wadiz",
        icon: "✨",
        tag: "와디즈",
        date: "2024년",
        description: "웰니스 브랜드, 일상이상 전 과정 총괄 프로젝트입니다. 로고 제작부터 양산, 판매, 부스 기획까지 진행했습니다. 일상이상 괄사 브랜드 로고 디자인, 패키지 디자인 (기프트 박스 & 쇼핑백), 상세페이지 아트 디렉션 및 UX 카피라이팅, 온라인 광고 및 오프라인 홍보물(포스터, 엽서 등) 디자인, 디자인 코리아 2024 전시 부스 공간 디자인, 3D 모델링 기반 괄사 제품 디자인 및 양산 설계까지 전 과정을 총괄했습니다.",
        gradient: "linear-gradient(135deg, #D9730D 0%, #944600 100%)",
        images: [],
        stats: [
            { value: "웰니스", label: "브랜드" },
            { value: "디자인 코리아", label: "2024 전시" },
            { value: "양산", label: "설계" }
        ],
        features: [
            "상세페이지 디자인",
            "로고 디자인",
            "패키지 디자인",
            "광고 디자인",
            "공간 디자인",
            "제품 디자인 및 양산"
        ]
    },
    project10: {
        order: 10,
        title: "FMK 푸드머신코리아: 공기전도 선글라스·모자",
        category: "와디즈 입점",
        categoryTag: "wadiz",
        icon: "🕶️",
        tag: "와디즈",
        date: "2024년",
        description: "공기전도 선글라스·모자 상세페이지 제작 & 광고 크리에이티브 디자인을 진행했습니다. 스포츠·일상·안전성까지 아우르는 오픈이어 사운드 경험을 시각 언어로 재정의한 프로젝트입니다. HAKII의 공기전도 라인업(WIND II 선글라스 & WIND 모자)을 \"열린 귀의 자유와 고성능 음향의 결합\"이라는 메시지로 재정의하고, 소비자가 기능을 직관적으로 이해하도록 상세페이지 구조와 광고 크리에이티브를 설계했습니다.",
        gradient: "linear-gradient(135deg, #0B6E99 0%, #052a40 100%)",
        images: [],
        stats: [
            { value: "공기전도", label: "기술" },
            { value: "오픈이어", label: "사운드" },
            { value: "안전성", label: "강화" }
        ],
        features: [
            "판매전략 기획",
            "상세페이지 디자인",
            "광고 디자인",
            "기능 직관적 전달",
            "시각 언어 재정의",
            "오픈이어 사운드 경험 설계"
        ]
    },
    project11: {
        order: 11,
        title: "FMK 푸드머신코리아: 캠핑카트 & 오토릴선",
        category: "와디즈 입점",
        categoryTag: "wadiz",
        icon: "🏕️",
        tag: "와디즈",
        date: "2024년",
        description: "캠핑카트 & 오토릴선 상세페이지 디자인·기획 & 광고 크리에이티브 제작을 진행했습니다. 캠핑의 '준비–사용–철수' 전 과정을 가볍고 편리하게 재해석한 프로젝트입니다. 캠핑의 가장 큰 불편 요소인 짐 운반·전기 연결·정리 과정을 해결하는 캠핑카트 & 오토릴선 세트의 장점을 소비자가 자연스럽게 이해하도록 상세페이지 전체 흐름과 크리에이티브 톤을 설계했습니다.",
        gradient: "linear-gradient(135deg, #0F7B6C 0%, #083516 100%)",
        images: [],
        stats: [
            { value: "캠핑", label: "혁신 세트" },
            { value: "짐 운반", label: "전기 연결" },
            { value: "편리함", label: "강화" }
        ],
        features: [
            "판매전략 기획",
            "상세페이지 디자인",
            "광고 디자인",
            "스토리텔링 구조",
            "모션 중심 이미지",
            "캠핑 혁신 메시지 전달"
        ]
    },
    project12: {
        order: 12,
        title: "을화푸드",
        category: "컬리, 쿠팡(직매입) 입점",
        categoryTag: "commerce",
        icon: "🍱",
        tag: "커머스",
        date: "2024년",
        description: "을화푸드 물회 패키지 디자인 & 상세페이지 기획을 진행했습니다. 광어·도다리 물회 브랜드의 전통성과 미식을 시각 언어로 재해석한 프로젝트입니다. 서울 3대 물회집 레시피를 그대로 담은 을화푸드의 광어/도다리 물회를 브랜딩 관점에서 다시 정의하고, 패키지 디자인부터 상세페이지 기획·촬영·구성까지 전 과정을 진행했습니다. 30년의 장인정신·계절의 맛·정성 어린 상차림이라는 브랜드 핵심을 디자인과 콘텐츠 전체 흐름에 자연스럽게 녹여내는 것을 목표로 기획했습니다.",
        gradient: "linear-gradient(135deg, #6940A5 0%, #2e0d5c 100%)",
        images: [],
        stats: [
            { value: "서울 3대", label: "물회집" },
            { value: "30년", label: "장인정신" },
            { value: "전통", label: "미식" }
        ],
        features: [
            "패키지 디자인",
            "상세페이지 디자인",
            "판매전략 기획",
            "촬영 기획 및 디렉팅",
            "브랜딩 관점 재정의",
            "전통성과 미식 조화"
        ]
    },
    project13: {
        order: 13,
        title: "서예담",
        category: "네이버 스마트스토어 입점",
        categoryTag: "commerce",
        icon: "🎭",
        tag: "커머스",
        date: "2024년",
        description: "서예담 브랜드 상세페이지 기획 & 디자인을 진행했습니다. 전통무용인의 삶과 태도를 담아낸, 실용적인 굿즈 시리즈입니다. 한국무용수·국악 연주자·전통소리꾼을 핵심 타깃으로, 버선케이스·슈즈케이스·한삼+옷걸이 세트·헤어 옷핀 세트·버선키링까지 전 제품의 상세페이지 구조를 설계하고 디자인했습니다. 버선케이스·한삼세트·버선키링은 '춤을 대하는 마음'과 '행운'의 상징성을 강조한 스토리형 구성으로, 슈즈케이스·헤어 옷핀 세트는 사이즈·수납력·구성품을 직관적으로 비교할 수 있는 상품설명형으로 구분해 설계했습니다.",
        gradient: "linear-gradient(135deg, #64473A 0%, #2f1a0f 100%)",
        images: [],
        stats: [
            { value: "전통무용", label: "굿즈" },
            { value: "실용성", label: "강조" },
            { value: "전통", label: "공연용" }
        ],
        features: [
            "판매전략 기획",
            "상세페이지 디자인",
            "스토리형 구성",
            "상품설명형 구성",
            "전통 공연용 굿즈 브랜딩",
            "타깃 맞춤 설계"
        ]
    }
};

let projects = {};
let supabaseClient = null;
let supabaseAvailable = false;
let projectsLoaded = false;

function cloneDefaultProjects() {
    return JSON.parse(JSON.stringify(DEFAULT_PROJECTS));
}

function normalizeProjectShape(project = {}) {
    const normalized = {
        order: Number.isFinite(project.order) ? project.order : 0,
        title: project.title || '새 프로젝트',
        category: project.category || '카테고리',
        categoryTag: project.categoryTag || 'wadiz',
        icon: project.icon || '✨',
        tag: project.tag || '태그',
        date: project.date || new Date().getFullYear() + '년',
        description: project.description || '프로젝트 설명을 입력하세요.',
        gradient: project.gradient || 'linear-gradient(135deg, #00d4aa 0%, #008f77 100%)',
        images: Array.isArray(project.images) ? project.images : [],
        stats: Array.isArray(project.stats) ? project.stats.slice(0, 3) : [],
        features: Array.isArray(project.features) ? project.features.filter(Boolean) : []
    };

    while (normalized.stats.length < 3) {
        normalized.stats.push({ value: "0", label: `통계 ${normalized.stats.length + 1}` });
    }

    if (!normalized.features.length) {
        normalized.features = ["특징 1", "특징 2", "특징 3"];
    }

    return normalized;
}

function loadProjectsFromLocal() {
    try {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed && typeof parsed === 'object') {
                const normalized = {};
                Object.entries(parsed).forEach(([id, project]) => {
                    normalized[id] = normalizeProjectShape(project);
                });
                ensureProjectOrder(normalized);
                return normalized;
            }
        }
    } catch (error) {
        console.warn('[Portfolio] 로컬 프로젝트 데이터를 불러오는 중 오류가 발생했습니다.', error);
    }
    const defaults = cloneDefaultProjects();
    storeProjectsToLocal(defaults);
    return defaults;
}

function storeProjectsToLocal(data = projects) {
    try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.warn('[Portfolio] 로컬 프로젝트 데이터를 저장하는 중 오류가 발생했습니다.', error);
    }
}

function ensureProjectOrder(target = projects) {
    const entries = Object.entries(target)
        .sort((a, b) => (a[1]?.order ?? Number.MAX_SAFE_INTEGER) - (b[1]?.order ?? Number.MAX_SAFE_INTEGER));
    entries.forEach(([id, project], index) => {
        if (project) {
            project.order = index + 1;
        }
    });
    return target;
}

function getSortedProjectEntries() {
    return Object.entries(projects)
        .sort((a, b) => (a[1]?.order ?? 0) - (b[1]?.order ?? 0));
}

function getNextOrder() {
    const entries = getSortedProjectEntries();
    return entries.length ? (entries[entries.length - 1][1].order ?? entries.length) + 1 : 1;
}

function createProjectId() {
    return `project-${Date.now()}`;
}

function projectToRow(projectId, project) {
    const normalized = normalizeProjectShape(project);
    return {
        id: projectId,
        title: normalized.title,
        category: normalized.category,
        category_tag: normalized.categoryTag,
        icon: normalized.icon,
        tag: normalized.tag,
        date: normalized.date,
        description: normalized.description,
        gradient: normalized.gradient,
        images: normalized.images,
        stats: normalized.stats,
        features: normalized.features,
        display_order: normalized.order ?? 0
    };
}

function normalizeSupabaseProject(row) {
    if (!row) return null;
    return normalizeProjectShape({
        order: row.display_order ?? row.order ?? 0,
        title: row.title,
        category: row.category,
        categoryTag: row.category_tag,
        icon: row.icon,
        tag: row.tag,
        date: row.date,
        description: row.description,
        gradient: row.gradient,
        images: row.images,
        stats: row.stats,
        features: row.features
    });
}

async function fetchSupabaseConfig() {
    try {
        const response = await fetch('/api/supabase-config');
        if (!response.ok) return null;
        const data = await response.json();
        if (data?.url && data?.anonKey) {
            return { url: data.url, anonKey: data.anonKey };
        }
    } catch (error) {
        console.warn('[Portfolio] Supabase 설정을 불러오는 중 오류가 발생했습니다.', error);
    }
    return null;
}

async function initializeSupabase() {
    const config = await fetchSupabaseConfig();
    if (!config) {
        supabaseAvailable = false;
        return;
    }
    try {
        supabaseClient = createClient(config.url, config.anonKey, { auth: { persistSession: false } });
        supabaseAvailable = true;
    } catch (error) {
        supabaseAvailable = false;
        console.warn('[Portfolio] Supabase 초기화 중 오류가 발생했습니다.', error);
    }
}

async function syncAllProjectsToSupabase(target = projects) {
    if (!supabaseAvailable || !supabaseClient) return;
    const rows = Object.entries(target).map(([id, project]) => projectToRow(id, project));
    if (!rows.length) return;
    const { error } = await supabaseClient.from(SUPABASE_TABLE).upsert(rows);
    if (error) {
        throw error;
    }
}

async function persistProject(projectId) {
    ensureProjectOrder();
    storeProjectsToLocal();
    if (!supabaseAvailable || !supabaseClient) return;
    const project = projects[projectId];
    if (!project) return;
    const { error } = await supabaseClient
        .from(SUPABASE_TABLE)
        .upsert(projectToRow(projectId, project), { onConflict: 'id' });
    if (error) {
        throw error;
    }
}

async function removeProjectFromSupabase(projectId) {
    if (!supabaseAvailable || !supabaseClient) return;
    const { error } = await supabaseClient
        .from(SUPABASE_TABLE)
        .delete()
        .eq('id', projectId);
    if (error) {
        throw error;
    }
}

async function loadProjects() {
    projects = loadProjectsFromLocal();
    ensureProjectOrder();

    if (supabaseAvailable && supabaseClient) {
        try {
            const { data, error } = await supabaseClient
                .from(SUPABASE_TABLE)
                .select('*')
                .order('display_order', { ascending: true })
                .order('created_at', { ascending: true });

            if (!error && Array.isArray(data) && data.length) {
                const remoteProjects = {};
                data.forEach((row) => {
                    const normalized = normalizeSupabaseProject(row);
                    if (normalized) {
                        remoteProjects[row.id] = normalized;
                    }
                });
                ensureProjectOrder(remoteProjects);
                projects = remoteProjects;
                storeProjectsToLocal();
            } else if (!error && (!data || !data.length)) {
                await syncAllProjectsToSupabase(projects);
            }
        } catch (error) {
            console.warn('[Portfolio] Supabase에서 프로젝트를 가져오는 중 오류가 발생했습니다.', error);
            supabaseAvailable = false;
        }
    }

    projectsLoaded = true;
    renderPortfolio();
}

async function ensureProjectsLoaded() {
    if (projectsLoaded) return;
    await loadProjects();
}

// ==========================================
// Portfolio Rendering
// ==========================================

function renderPortfolio() {
    const grid = document.getElementById('portfolioGrid');
    if (!grid) {
        console.warn('[Portfolio] portfolioGrid 요소를 찾을 수 없습니다.');
        return;
    }
    
    const entries = getSortedProjectEntries();
    if (!entries || entries.length === 0) {
        console.warn('[Portfolio] 표시할 프로젝트가 없습니다.');
        grid.innerHTML = '<p style="text-align: center; padding: 3rem; color: var(--text-gray);">표시할 프로젝트가 없습니다.</p>';
        return;
    }
    
    grid.innerHTML = '';
    
    // 관리자 상태 확인
    const isAdmin = window.SIGAuth?.isAdmin?.() || false;
    
    entries.forEach(([projectId, project], index) => {
        if (!project) return;

        const item = document.createElement('div');
        item.className = 'portfolio-item';
        // First item spans 2 columns for featured layout
        if (index === 0) item.classList.add('portfolio-item--large');
        item.dataset.category = project.categoryTag || 'all';
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';

        // 이미지가 있으면 표시, 없으면 그라데이션 배경
        let imageHtml = '';
        if (project.images && project.images.length > 0) {
            const firstImage = project.images[0];
            imageHtml = `<img src="${firstImage}" alt="${project.title || '프로젝트'}" class="portfolio-item-image">`;
        } else {
            imageHtml = `<div style="width: 100%; height: 100%; background: ${project.gradient || 'linear-gradient(135deg, #171717 0%, #404040 100%)'};"></div>`;
        }

        // 관리자 모드일 때만 편집 버튼 표시
        const editButton = isAdmin ? `
            <button class="portfolio-item-edit-btn" onclick="event.stopPropagation(); openEditModal('${projectId}')" aria-label="편집" style="display: flex;">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.333 2.00001C11.5084 1.82445 11.7163 1.68506 11.9447 1.59127C12.1731 1.49747 12.4173 1.45117 12.6637 1.45501C12.91 1.45885 13.1523 1.51275 13.3767 1.61353C13.6011 1.71431 13.803 1.85955 13.97 2.04068C14.137 2.22181 14.2658 2.43494 14.3489 2.66671C14.432 2.89849 14.4676 3.14422 14.4533 3.38935C14.439 3.63448 14.3751 3.87408 14.2657 4.09268C14.1563 4.31128 14.0039 4.50426 13.818 4.66001L6.24733 12.2333L2.66667 13.3333L3.76667 9.75334L11.333 2.00001Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        ` : '';

        item.innerHTML = `
            ${editButton}
            <div class="portfolio-item-image-wrapper">
                ${imageHtml}
            </div>
            <div class="portfolio-item-body">
                <h3 class="portfolio-item-title">${project.title || '제목 없음'}</h3>
                <p class="portfolio-item-tags">${project.category || project.tag || ''}</p>
                <span class="portfolio-item-cta">View Project →</span>
            </div>
        `;

        // 클릭 이벤트 - project detail page 또는 모달
        item.addEventListener('click', (e) => {
            if (!e.target.closest('.portfolio-item-edit-btn')) {
                // index.html에서는 project.html로 이동, portfolio.html에서는 모달
                const isMainPage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
                if (isMainPage) {
                    window.location.href = `project.html?id=${projectId}`;
                } else {
                    openModal(projectId);
                }
            }
        });

        grid.appendChild(item);

        // 애니메이션
        setTimeout(() => {
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// ==========================================
// Filter Functions
// ==========================================

function filterProjects(evt, category) {
    const items = document.querySelectorAll('.portfolio-item');
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach((btn) => {
        const buttonCategory = btn.dataset.filter || 'all';
        const isActive = btn === (evt?.currentTarget || evt?.target) || (!evt && buttonCategory === category);
        btn.classList.toggle('active', isActive);
    });

    items.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// ==========================================
// Modal Functions
// ==========================================

function openModal(projectId) {
    const project = projects[projectId];
    if (!project) return;
    
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalCategory').textContent = project.category;
    document.getElementById('modalDate').textContent = project.date;
    document.getElementById('modalDescription').textContent = project.description;
    
    // Set statistics
    document.getElementById('statValue1').textContent = project.stats[0].value;
    document.getElementById('statLabel1').textContent = project.stats[0].label;
    document.getElementById('statValue2').textContent = project.stats[1].value;
    document.getElementById('statLabel2').textContent = project.stats[1].label;
    document.getElementById('statValue3').textContent = project.stats[2].value;
    document.getElementById('statLabel3').textContent = project.stats[2].label;
    
    // Set features
    const featuresContainer = document.getElementById('modalFeatures');
    featuresContainer.innerHTML = '';
    project.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresContainer.appendChild(li);
    });
    
    // Set images if available
    const modalBody = document.querySelector('.modal-body');
    let imagesContainer = document.getElementById('modalImages');
    
    if (project.images && project.images.length > 0) {
        if (!imagesContainer) {
            imagesContainer = document.createElement('div');
            imagesContainer.id = 'modalImages';
            imagesContainer.className = 'modal-images';
            imagesContainer.style.cssText = 'margin-top: 2rem; display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem;';
            modalBody.insertBefore(imagesContainer, modalBody.querySelector('.project-stats'));
        }
        
        imagesContainer.innerHTML = '';
        project.images.forEach((img, idx) => {
            const imgElement = document.createElement('img');
            imgElement.src = img;
            imgElement.alt = `${project.title} 이미지 ${idx + 1}`;
            imgElement.style.cssText = 'width: 100%; height: 200px; object-fit: cover; border-radius: 10px; cursor: pointer; border: 2px solid var(--border-color);';
            imgElement.onclick = () => {
                window.open(img, '_blank');
            };
            imagesContainer.appendChild(imgElement);
        });
    } else if (imagesContainer) {
        imagesContainer.remove();
    }
    
    document.getElementById('projectModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('projectModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ==========================================
// Admin Functions
// ==========================================

function showAdminLogin() {
    if (window.SIGAuth) {
        if (window.SIGAuth.isAdmin()) {
            openAdminPanel();
        } else {
            window.SIGAuth.requireAdmin(openAdminPanel);
        }
        return;
    }

    const password = prompt('관리자 비밀번호를 입력하세요:');
    if (password === 'sig0802') {
        openAdminPanel();
    } else if (password !== null) {
        alert('비밀번호가 올바르지 않습니다.');
    }
}

function closeAdmin() {
    document.getElementById('adminPanel').classList.remove('active');
    document.body.style.overflow = 'auto';
}

async function openAdminPanel() {
    await ensureProjectsLoaded();
    document.getElementById('adminPanel').classList.add('active');
    document.body.style.overflow = 'hidden';
    renderAdminPanel();
}

function renderAdminPanel() {
    const container = document.getElementById('adminProjects');
    container.innerHTML = '';
    
    getSortedProjectEntries().forEach(([projectId, project]) => {
        const card = document.createElement('div');
        card.className = 'admin-project-card';
        
        card.innerHTML = `
            <div class="admin-project-header">
                <h3>${project.icon} ${project.title}</h3>
                <div class="admin-actions">
                    <button class="admin-btn edit" data-action="edit" data-project-id="${projectId}">수정</button>
                    <button class="admin-btn delete" data-action="delete" data-project-id="${projectId}">삭제</button>
                </div>
            </div>
            <div id="form-${projectId}" class="admin-form">
                ${generateForm(projectId, project)}
            </div>
        `;
        
        container.appendChild(card);
    });
    
    // 이벤트 위임으로 버튼 이벤트 처리
    container.addEventListener('click', function(e) {
        const btn = e.target.closest('[data-action]');
        if (!btn) return;
        
        const action = btn.dataset.action;
        const projectId = btn.dataset.projectId;
        
        if (action === 'edit' && projectId) {
            toggleEdit(projectId);
        } else if (action === 'delete' && projectId) {
            deleteProject(projectId);
        }
    });
    
    // 저장 버튼 이벤트 위임
    container.addEventListener('click', function(e) {
        const saveBtn = e.target.closest('.admin-save-btn');
        if (!saveBtn) return;
        
        const projectId = saveBtn.dataset.projectId || saveBtn.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
        if (projectId) {
            saveProject(projectId);
        }
    });
    
    // 파일 업로드 영역 클릭 이벤트
    container.addEventListener('click', function(e) {
        const uploadArea = e.target.closest('.file-upload-area');
        if (uploadArea) {
            const projectId = uploadArea.id.replace('-upload-area', '');
            const fileInput = document.getElementById(`${projectId}-file-input`);
            if (fileInput) {
                fileInput.click();
            }
        }
    });
    
    // 파일 입력 변경 이벤트
    container.addEventListener('change', function(e) {
        if (e.target.classList.contains('file-input')) {
            const projectId = e.target.dataset.projectId || e.target.id.replace('-file-input', '');
            handleFileUpload(projectId, e.target.files);
        }
        
        // 그라데이션 컨트롤 변경 이벤트
        if (e.target.classList.contains('gradient-color-input') || 
            e.target.classList.contains('gradient-opacity-slider') ||
            e.target.classList.contains('gradient-direction-select')) {
            const projectId = e.target.dataset.projectId;
            if (projectId) {
                updateGradient(projectId);
            }
        }
    });
    
    // 그라데이션 컨트롤 input 이벤트
    container.addEventListener('input', function(e) {
        if (e.target.classList.contains('gradient-opacity-slider')) {
            const projectId = e.target.dataset.projectId;
            if (projectId) {
                updateGradient(projectId);
            }
        }
    });
    
    // 그라데이션 색상 표시 클릭 이벤트
    container.addEventListener('click', function(e) {
        const colorDisplay = e.target.closest('.gradient-color-display');
        if (colorDisplay) {
            const targetInputId = colorDisplay.dataset.targetInput;
            const targetInput = document.getElementById(targetInputId);
            if (targetInput) {
                targetInput.click();
            }
        }
        
        // 그라데이션 CSS 복사 버튼
        const copyBtn = e.target.closest('.gradient-copy-btn');
        if (copyBtn) {
            const projectId = copyBtn.dataset.projectId;
            if (projectId) {
                copyGradientCSS(projectId);
            }
        }
    });
    
    // 이미지 삭제 버튼 이벤트
    container.addEventListener('click', function(e) {
        const removeBtn = e.target.closest('.file-remove-btn');
        if (removeBtn) {
            const projectId = removeBtn.dataset.projectId;
            const imageIndex = removeBtn.dataset.imageIndex;
            if (projectId && imageIndex !== undefined) {
                removeImage(projectId, parseInt(imageIndex));
            }
        }
    });
    
    // 드래그 앤 드롭 설정을 다시 적용
    setTimeout(() => {
        setupDragAndDrop();
        // 그라데이션 미리보기 초기화
        Object.keys(projects).forEach(projectId => {
            const gradientInput = document.getElementById(`${projectId}-gradient-color1`);
            if (gradientInput) {
                updateGradient(projectId);
            }
        });
    }, 100);
}

function generateForm(projectId, project) {
    const images = project.images || [];
    const imagesHtml = images.map((img, idx) => `
        <div class="uploaded-file-item">
            <img src="${img}" alt="업로드된 이미지 ${idx + 1}" class="uploaded-file-image">
            <button class="file-remove-btn" data-project-id="${projectId}" data-image-index="${idx}" type="button">×</button>
            <div class="uploaded-file-info">
                <div class="uploaded-file-name">이미지 ${idx + 1}</div>
                <div class="uploaded-file-size">업로드됨</div>
            </div>
        </div>
    `).join('');
    
    return `
        <div class="admin-form-group">
            <label>프로젝트 제목</label>
            <input type="text" id="${projectId}-title" value="${project.title}">
        </div>
        <div class="admin-form-group">
            <label>아이콘 (이모지)</label>
            <input type="text" id="${projectId}-icon" value="${project.icon}">
        </div>
        <div class="admin-form-group">
            <label>카테고리</label>
            <input type="text" id="${projectId}-category" value="${project.category}">
        </div>
        <div class="admin-form-group">
            <label>카테고리 태그</label>
            <select id="${projectId}-categoryTag">
                <option value="wadiz" ${project.categoryTag === 'wadiz' ? 'selected' : ''}>와디즈</option>
                <option value="commerce" ${project.categoryTag === 'commerce' ? 'selected' : ''}>커머스</option>
                <option value="branding" ${project.categoryTag === 'branding' ? 'selected' : ''}>브랜딩</option>
                <option value="marketing" ${project.categoryTag === 'marketing' ? 'selected' : ''}>마케팅</option>
            </select>
        </div>
        <div class="admin-form-group">
            <label>태그 이름</label>
            <input type="text" id="${projectId}-tag" value="${project.tag}">
        </div>
        <div class="admin-form-group">
            <label>작업 기간</label>
            <input type="text" id="${projectId}-date" value="${project.date}">
        </div>
        <div class="admin-form-group full gradient-picker-container">
            <label class="gradient-picker-label">배경 그라데이션 설정</label>
            ${generateGradientPicker(projectId, project.gradient)}
        </div>
        <div class="admin-form-group full">
            <label>프로젝트 설명</label>
            <textarea id="${projectId}-description">${project.description}</textarea>
        </div>
        <div class="admin-form-group full file-upload-container">
            <label class="file-upload-label">프로젝트 이미지 업로드</label>
            <div class="file-upload-area" id="${projectId}-upload-area" data-project-id="${projectId}">
                <div class="file-upload-icon">📁</div>
                <div class="file-upload-text">클릭하거나 파일을 드래그하여 업로드</div>
                <div class="file-upload-hint">이미지 파일 (JPG, PNG, GIF 등)</div>
            </div>
            <input type="file" id="${projectId}-file-input" class="file-input" accept="image/*" multiple data-project-id="${projectId}">
            ${imagesHtml ? `<div class="uploaded-files">${imagesHtml}</div>` : ''}
        </div>
        <div class="admin-form-group">
            <label>통계 1 - 값</label>
            <input type="text" id="${projectId}-s1v" value="${project.stats[0].value}">
        </div>
        <div class="admin-form-group">
            <label>통계 1 - 라벨</label>
            <input type="text" id="${projectId}-s1l" value="${project.stats[0].label}">
        </div>
        <div class="admin-form-group">
            <label>통계 2 - 값</label>
            <input type="text" id="${projectId}-s2v" value="${project.stats[1].value}">
        </div>
        <div class="admin-form-group">
            <label>통계 2 - 라벨</label>
            <input type="text" id="${projectId}-s2l" value="${project.stats[1].label}">
        </div>
        <div class="admin-form-group">
            <label>통계 3 - 값</label>
            <input type="text" id="${projectId}-s3v" value="${project.stats[2].value}">
        </div>
        <div class="admin-form-group">
            <label>통계 3 - 라벨</label>
            <input type="text" id="${projectId}-s3l" value="${project.stats[2].label}">
        </div>
        <div class="admin-form-group full">
            <label>프로젝트 특징 (쉼표로 구분)</label>
            <textarea id="${projectId}-features">${project.features.join(', ')}</textarea>
        </div>
        <button class="admin-save-btn" data-project-id="${projectId}">💾 저장하기</button>
    `;
}

function toggleEdit(projectId) {
    const form = document.getElementById(`form-${projectId}`);
    if (form) {
        form.classList.toggle('active');
    }
}

function openEditModal(projectId) {
    const project = projects[projectId];
    if (!project) return;
    
    const modal = document.getElementById('editProjectModal');
    const modalBody = document.getElementById('editModalBody');
    
    if (!modal || !modalBody) return;
    
    modalBody.innerHTML = generateForm(projectId, project);
    
    // 그라데이션 미리보기 초기화
    setTimeout(() => {
        const gradientInput = document.getElementById(`${projectId}-gradient-color1`);
        if (gradientInput) {
            updateGradient(projectId);
        }
    }, 100);
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeEditModal() {
    const modal = document.getElementById('editProjectModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

async function saveProject(projectId) {
    const project = projects[projectId];
    if (!project) return;
    
    // Update basic info
    const titleEl = document.getElementById(`${projectId}-title`);
    const iconEl = document.getElementById(`${projectId}-icon`);
    const categoryEl = document.getElementById(`${projectId}-category`);
    const categoryTagEl = document.getElementById(`${projectId}-categoryTag`);
    const tagEl = document.getElementById(`${projectId}-tag`);
    const dateEl = document.getElementById(`${projectId}-date`);
    const gradientEl = document.getElementById(`${projectId}-gradient`);
    const descriptionEl = document.getElementById(`${projectId}-description`);
    
    if (titleEl) project.title = titleEl.value;
    if (iconEl) project.icon = iconEl.value;
    if (categoryEl) project.category = categoryEl.value;
    if (categoryTagEl) project.categoryTag = categoryTagEl.value;
    if (tagEl) project.tag = tagEl.value;
    if (dateEl) project.date = dateEl.value;
    if (gradientEl) project.gradient = gradientEl.value;
    if (descriptionEl) project.description = descriptionEl.value;
    
    // Update stats
    const s1vEl = document.getElementById(`${projectId}-s1v`);
    const s1lEl = document.getElementById(`${projectId}-s1l`);
    const s2vEl = document.getElementById(`${projectId}-s2v`);
    const s2lEl = document.getElementById(`${projectId}-s2l`);
    const s3vEl = document.getElementById(`${projectId}-s3v`);
    const s3lEl = document.getElementById(`${projectId}-s3l`);
    
    if (s1vEl && s1lEl && s2vEl && s2lEl && s3vEl && s3lEl) {
        project.stats = [
            { value: s1vEl.value, label: s1lEl.value },
            { value: s2vEl.value, label: s2lEl.value },
            { value: s3vEl.value, label: s3lEl.value }
        ];
    }

    // Update features
    const featuresEl = document.getElementById(`${projectId}-features`);
    if (featuresEl) {
        const featuresText = featuresEl.value;
        project.features = featuresText.split(',').map(f => f.trim()).filter(f => f);
    }

    const normalized = normalizeProjectShape(project);
    projects[projectId] = normalized;

    try {
        await persistProject(projectId);
        renderPortfolio();
        renderAdminPanel();
        closeEditModal();
        alert(supabaseAvailable
            ? '✅ 저장이 완료되었습니다!'
            : '⚠️ Supabase가 설정되지 않아 로컬 저장소에만 저장되었습니다.');
    } catch (error) {
        console.error('[Portfolio] 프로젝트 저장 중 오류가 발생했습니다.', error);
        alert('프로젝트를 저장하는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
}

function deleteProject(projectId) {
    if (!projects[projectId]) return;
    if (!confirm('⚠️ 정말 이 프로젝트를 삭제하시겠습니까?')) return;

    (async () => {
        try {
            delete projects[projectId];
            ensureProjectOrder();
            storeProjectsToLocal();
            renderPortfolio();
            renderAdminPanel();

            if (supabaseAvailable) {
                await removeProjectFromSupabase(projectId);
                await syncAllProjectsToSupabase();
                alert('🗑️ 프로젝트가 삭제되었습니다.');
            } else {
                alert('Supabase가 설정되지 않아 로컬 저장소에서만 삭제되었습니다.');
            }
        } catch (error) {
            console.error('[Portfolio] 프로젝트 삭제 중 오류가 발생했습니다.', error);
            alert('프로젝트를 삭제하는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        }
    })();
}

function addNewProject() {
    const newId = createProjectId();
    const newProject = normalizeProjectShape({
        order: getNextOrder(),
        title: "새 프로젝트",
        category: "카테고리",
        categoryTag: "wadiz",
        icon: "✨",
        tag: "태그",
        date: new Date().getFullYear() + "년",
        description: "프로젝트 설명을 입력하세요.",
        gradient: "linear-gradient(135deg, #00d4aa 0%, #008f77 100%)",
        images: [],
        stats: [
            { value: "0%", label: "통계 1" },
            { value: "0", label: "통계 2" },
            { value: "0", label: "통계 3" }
        ],
        features: [
            "특징 1",
            "특징 2",
            "특징 3"
        ]
    });

    projects[newId] = newProject;
    ensureProjectOrder();
    storeProjectsToLocal();
    renderPortfolio();
    renderAdminPanel();

    (async () => {
        try {
            await persistProject(newId);
            alert(supabaseAvailable
                ? '➕ 새 프로젝트가 추가되었습니다!'
                : 'Supabase가 설정되지 않아 로컬 저장소에만 추가되었습니다.');
        } catch (error) {
            console.error('[Portfolio] 새 프로젝트 추가 중 오류가 발생했습니다.', error);
            alert('새 프로젝트를 저장하는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        }
    })();
}

// ==========================================
// Gradient Picker Functions
// ==========================================

function generateGradientPicker(projectId, currentGradient) {
    // 기존 그라데이션에서 색상과 각도 추출
    let color1 = '#00d4aa';
    let color2 = '#008f77';
    let angle = '135deg';
    let opacity1 = 1;
    let opacity2 = 1;
    
    if (currentGradient) {
        // linear-gradient(135deg, rgba(...) 0%, rgba(...) 100%) 또는 linear-gradient(135deg, #hex 0%, #hex 100%) 형식 파싱
        const angleMatch = currentGradient.match(/linear-gradient\((\d+deg|to\s+\w+)/);
        if (angleMatch) {
            angle = angleMatch[1];
        }
        
        // 색상과 투명도 추출
        const colorPattern = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)|#([a-f\d]{6}|[a-f\d]{3})/gi;
        const colors = currentGradient.match(colorPattern);
        
        if (colors && colors.length >= 2) {
            // 첫 번째 색상
            const rgbaMatch1 = colors[0].match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
            if (rgbaMatch1) {
                opacity1 = rgbaMatch1[4] ? parseFloat(rgbaMatch1[4]) : 1;
                color1 = rgbToHex(parseInt(rgbaMatch1[1]), parseInt(rgbaMatch1[2]), parseInt(rgbaMatch1[3]));
            } else if (colors[0].startsWith('#')) {
                color1 = colors[0].length === 4 ? '#' + colors[0][1] + colors[0][1] + colors[0][2] + colors[0][2] + colors[0][3] + colors[0][3] : colors[0];
                opacity1 = 1;
            }
            
            // 두 번째 색상
            const rgbaMatch2 = colors[1].match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
            if (rgbaMatch2) {
                opacity2 = rgbaMatch2[4] ? parseFloat(rgbaMatch2[4]) : 1;
                color2 = rgbToHex(parseInt(rgbaMatch2[1]), parseInt(rgbaMatch2[2]), parseInt(rgbaMatch2[3]));
            } else if (colors[1].startsWith('#')) {
                color2 = colors[1].length === 4 ? '#' + colors[1][1] + colors[1][1] + colors[1][2] + colors[1][2] + colors[1][3] + colors[1][3] : colors[1];
                opacity2 = 1;
            }
        }
    }
    
    return `
        <div class="gradient-picker-controls">
            <div class="gradient-control-group">
                <label class="gradient-control-label">시작 색상</label>
                <div class="gradient-color-input-wrapper">
                    <input type="color" id="${projectId}-gradient-color1" class="gradient-color-input" value="${color1}" data-project-id="${projectId}">
                    <div class="gradient-color-display" id="${projectId}-gradient-color1-display" style="background: ${color1}" data-target-input="${projectId}-gradient-color1"></div>
                </div>
                <label class="gradient-control-label">투명도: <span id="${projectId}-opacity1-value">${Math.round(opacity1 * 100)}%</span></label>
                <input type="range" id="${projectId}-gradient-opacity1" class="gradient-opacity-slider" min="0" max="100" value="${Math.round(opacity1 * 100)}" data-project-id="${projectId}">
            </div>
            <div class="gradient-control-group">
                <label class="gradient-control-label">끝 색상</label>
                <div class="gradient-color-input-wrapper">
                    <input type="color" id="${projectId}-gradient-color2" class="gradient-color-input" value="${color2}" data-project-id="${projectId}">
                    <div class="gradient-color-display" id="${projectId}-gradient-color2-display" style="background: ${color2}" data-target-input="${projectId}-gradient-color2"></div>
                </div>
                <label class="gradient-control-label">투명도: <span id="${projectId}-opacity2-value">${Math.round(opacity2 * 100)}%</span></label>
                <input type="range" id="${projectId}-gradient-opacity2" class="gradient-opacity-slider" min="0" max="100" value="${Math.round(opacity2 * 100)}" data-project-id="${projectId}">
            </div>
            <div class="gradient-control-group">
                <label class="gradient-control-label">방향</label>
                <select id="${projectId}-gradient-angle" class="gradient-direction-select" data-project-id="${projectId}">
                    <option value="0deg" ${angle === '0deg' ? 'selected' : ''}>→ 오른쪽</option>
                    <option value="45deg" ${angle === '45deg' ? 'selected' : ''}>↗ 오른쪽 위</option>
                    <option value="90deg" ${angle === '90deg' ? 'selected' : ''}>↑ 위</option>
                    <option value="135deg" ${angle === '135deg' ? 'selected' : ''}>↖ 왼쪽 위</option>
                    <option value="180deg" ${angle === '180deg' ? 'selected' : ''}>← 왼쪽</option>
                    <option value="225deg" ${angle === '225deg' ? 'selected' : ''}>↙ 왼쪽 아래</option>
                    <option value="270deg" ${angle === '270deg' ? 'selected' : ''}>↓ 아래</option>
                    <option value="315deg" ${angle === '315deg' ? 'selected' : ''}>↘ 오른쪽 아래</option>
                </select>
            </div>
        </div>
        <div class="gradient-preview" id="${projectId}-gradient-preview"></div>
        <div class="gradient-preview-label">미리보기</div>
        <div class="gradient-css-output" id="${projectId}-gradient-css">${currentGradient || 'linear-gradient(135deg, #00d4aa 0%, #008f77 100%)'}</div>
        <input type="hidden" id="${projectId}-gradient" value="${currentGradient || 'linear-gradient(135deg, #00d4aa 0%, #008f77 100%)'}">
        <button type="button" class="gradient-copy-btn" data-project-id="${projectId}">📋 CSS 복사</button>
    `;
}

function updateGradient(projectId) {
    const color1 = document.getElementById(`${projectId}-gradient-color1`).value;
    const color2 = document.getElementById(`${projectId}-gradient-color2`).value;
    const opacity1 = document.getElementById(`${projectId}-gradient-opacity1`).value / 100;
    const opacity2 = document.getElementById(`${projectId}-gradient-opacity2`).value / 100;
    const angle = document.getElementById(`${projectId}-gradient-angle`).value;
    
    // 투명도 값 표시 업데이트
    document.getElementById(`${projectId}-opacity1-value`).textContent = Math.round(opacity1 * 100) + '%';
    document.getElementById(`${projectId}-opacity2-value`).textContent = Math.round(opacity2 * 100) + '%';
    
    // 색상 표시 업데이트
    document.getElementById(`${projectId}-gradient-color1-display`).style.background = color1;
    document.getElementById(`${projectId}-gradient-color2-display`).style.background = color2;
    
    // RGB로 변환
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    
    // rgba 형식으로 그라데이션 생성
    const gradientCSS = `linear-gradient(${angle}, rgba(${rgb1.r}, ${rgb1.g}, ${rgb1.b}, ${opacity1}) 0%, rgba(${rgb2.r}, ${rgb2.g}, ${rgb2.b}, ${opacity2}) 100%)`;
    
    // 미리보기 업데이트
    const preview = document.getElementById(`${projectId}-gradient-preview`);
    preview.style.background = gradientCSS;
    
    // CSS 출력 업데이트
    document.getElementById(`${projectId}-gradient-css`).textContent = gradientCSS;
    
    // 숨겨진 입력 필드 업데이트
    document.getElementById(`${projectId}-gradient`).value = gradientCSS;
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 0, g: 212, b: 170 };
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function copyGradientCSS(projectId) {
    const css = document.getElementById(`${projectId}-gradient-css`).textContent;
    navigator.clipboard.writeText(css).then(() => {
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = '✓ 복사됨!';
        btn.style.background = '#4caf50';
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 2000);
    }).catch(() => {
        alert('복사에 실패했습니다. 직접 선택해서 복사해주세요.');
    });
}

// ==========================================
// File Upload Functions
// ==========================================

function handleFileUpload(projectId, files) {
    if (!files || !files.length) return;

    const project = projects[projectId];
    if (!project) return;

    if (!project.images) {
        project.images = [];
    }

    Array.from(files).forEach((file) => {
        if (!file.type.startsWith('image/')) {
            alert('이미지 파일만 업로드 가능합니다. (JPG, PNG, GIF 등)');
            return;
        }

        const reader = new FileReader();
        reader.onload = async (event) => {
            project.images.push(event.target.result);
            projects[projectId] = normalizeProjectShape(project);
            ensureProjectOrder();
            storeProjectsToLocal();
            renderPortfolio();
            renderAdminPanel();

            if (supabaseAvailable) {
                try {
                    await persistProject(projectId);
                } catch (error) {
                    console.error('[Portfolio] 이미지 업로드 후 저장 중 오류가 발생했습니다.', error);
                }
            }
        };
        reader.readAsDataURL(file);
    });
}

function removeImage(projectId, imageIndex) {
    const project = projects[projectId];
    if (!project || !project.images) return;

    if (!confirm('이 이미지를 삭제하시겠습니까?')) {
        return;
    }

    project.images.splice(imageIndex, 1);
    projects[projectId] = normalizeProjectShape(project);
    ensureProjectOrder();
    storeProjectsToLocal();
    renderPortfolio();
    renderAdminPanel();

    (async () => {
        if (!supabaseAvailable) return;
        try {
            await persistProject(projectId);
        } catch (error) {
            console.error('[Portfolio] 이미지 삭제 후 저장 중 오류가 발생했습니다.', error);
        }
    })();
}

// Drag and Drop 기능 추가
document.addEventListener('DOMContentLoaded', function() {
    // 드래그 앤 드롭 이벤트 리스너는 동적으로 생성되는 요소에 대해서는 
    // 이벤트 위임을 사용하거나 renderAdminPanel 후에 추가해야 함
    setTimeout(() => {
        setupDragAndDrop();
    }, 100);
});

function setupDragAndDrop() {
    document.querySelectorAll('.file-upload-area').forEach(area => {
        area.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('dragover');
        });
        
        area.addEventListener('dragleave', function(e) {
            e.preventDefault();
            this.classList.remove('dragover');
        });
        
        area.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('dragover');
            
            const files = e.dataTransfer.files;
            const projectId = this.id.replace('-upload-area', '');
            handleFileUpload(projectId, files);
        });
    });
}

// ==========================================
// Count Up Animation
// ==========================================

function animateCountUp(element) {
    const target = parseFloat(element.dataset.count);
    const suffix = element.dataset.suffix || '';
    const isPercentage = element.textContent.includes('%') && !suffix;
    const duration = 2000; // 2초
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = target * easeOut;
        
        if (isPercentage) {
            element.textContent = Math.floor(current).toLocaleString() + '%';
        } else if (suffix) {
            if (target < 10) {
                element.textContent = Math.floor(current) + suffix;
            } else {
                element.textContent = current.toFixed(target % 1 !== 0 ? 2 : 0) + suffix;
            }
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            // 최종 값 보장
            if (isPercentage) {
                element.textContent = Math.floor(target).toLocaleString() + '%';
            } else if (suffix) {
                element.textContent = (target % 1 !== 0 ? target.toFixed(2) : target) + suffix;
            } else {
                element.textContent = Math.floor(target).toLocaleString();
            }
        }
    }
    
    requestAnimationFrame(update);
}

function initCountUpAnimation() {
    const statItems = document.querySelectorAll('.stat-item h3[data-count]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCountUp(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statItems.forEach(item => observer.observe(item));
}

// ==========================================
// Event Listeners
// ==========================================

// Modal close on outside click
document.addEventListener('DOMContentLoaded', async function() {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target.id === 'projectModal') {
                closeModal();
            }
        });
    }
    
    const editModal = document.getElementById('editProjectModal');
    if (editModal) {
        editModal.addEventListener('click', function(e) {
            if (e.target.id === 'editProjectModal') {
                closeEditModal();
            }
        });
    }
    
    // 모달 닫기 버튼
    const modalClose = document.getElementById('modalClose');
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    const editModalClose = document.getElementById('editModalClose');
    if (editModalClose) {
        editModalClose.addEventListener('click', closeEditModal);
    }
    
    // 관리자 트리거 버튼
    const adminTrigger = document.getElementById('adminTrigger');
    if (adminTrigger) {
        adminTrigger.addEventListener('click', showAdminLogin);
    }
    
    // 관리자 패널 닫기 버튼
    const adminClose = document.getElementById('adminClose');
    if (adminClose) {
        adminClose.addEventListener('click', closeAdmin);
    }
    
    // 새 프로젝트 추가 버튼
    const adminAddProject = document.getElementById('adminAddProject');
    if (adminAddProject) {
        adminAddProject.addEventListener('click', addNewProject);
    }
    
    // 필터 버튼 이벤트
    const portfolioFilter = document.getElementById('portfolioFilter');
    if (portfolioFilter) {
        portfolioFilter.addEventListener('click', function(e) {
            if (e.target.classList.contains('filter-btn')) {
                const category = e.target.dataset.filter || 'all';
                filterProjects(e, category);
            }
        });
    }

    await initializeSupabase();
    await loadProjects();
    initCountUpAnimation();
});

Object.assign(window, {
    filterProjects,
    showAdminLogin,
    closeAdmin,
    addNewProject,
    toggleEdit,
    openEditModal,
    closeEditModal,
    saveProject,
    deleteProject,
    handleFileUpload,
    removeImage,
    updateGradient,
    copyGradientCSS
});

// 인증 상태 변경 이벤트 리스너 추가
document.addEventListener('sig-auth-changed', function(event) {
    const isAdmin = event?.detail?.isAdmin || false;
    
    console.log('[Portfolio] 인증 상태 변경 감지:', isAdmin);
    
    // 관리자 패널이 열려있고 관리자가 아니면 닫기
    if (!isAdmin) {
        closeAdmin();
    }
    
    // 포트폴리오 다시 렌더링 (편집 버튼 표시/숨김)
    if (projectsLoaded) {
        renderPortfolio();
    }
    
    // 관리자 트리거 버튼 표시/숨김
    const adminTrigger = document.getElementById('adminTrigger');
    if (adminTrigger) {
        adminTrigger.style.display = isAdmin ? 'flex' : 'none';
    }
});

// Prevent form submission on Enter key in admin panel
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
        const adminPanel = document.getElementById('adminPanel');
        if (adminPanel && adminPanel.classList.contains('active')) {
            e.preventDefault();
        }
    }
});