/**
 * Blog Experience - Channel.io 스타일 블로그 + 노션형 에디터
 */

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const BLOG_STORAGE_KEY = 'sigBlogPosts';
const SUPABASE_TABLE = 'blog_posts';
const BLOG_CATEGORIES = [
    { id: 'all', label: '전체', accent: '#083516', gradient: 'linear-gradient(135deg, #0f7b6c 0%, #083516 100%)' },
    { id: 'success', label: '성공사례', accent: '#0F7B6C', gradient: 'linear-gradient(135deg, #0f7b6c 0%, #0c1f12 100%)' },
    { id: 'tips', label: '채널톡 사용팁', accent: '#0B6E99', gradient: 'linear-gradient(135deg, #0b6e99 0%, #052a40 100%)' },
    { id: 'insight', label: '비즈 인사이트', accent: '#6940A5', gradient: 'linear-gradient(135deg, #6940a5 0%, #2e0d5c 100%)' },
    { id: 'workbook', label: '워크북', accent: '#C78500', gradient: 'linear-gradient(135deg, #c78500 0%, #8b4a00 100%)' },
    { id: 'concept', label: '개념허브', accent: '#64473A', gradient: 'linear-gradient(135deg, #64473a 0%, #2f1a0f 100%)' },
    { id: 'news', label: '뉴스룸', accent: '#2E3A8C', gradient: 'linear-gradient(135deg, #2e3a8c 0%, #0b1030 100%)' },
    { id: 'event', label: '이벤트', accent: '#D9730D', gradient: 'linear-gradient(135deg, #d9730d 0%, #944600 100%)' }
];

const DEFAULT_BLOG_POSTS = [
    {
        id: 'post-20251030-alf',
        title: '퇴사하지 않는 10년 차 CX 시니어, ALF와 함께 성장하는 부스터스',
        author: 'Rosa',
        category: 'success',
        tags: ['성공사례', 'ALF', 'CX'],
        summary: '부스터스의 CX 리더가 AI 상담 에이전트 ALF와 함께 누적 고객 해결률을 높이며 커리어를 확장한 실제 사례를 소개합니다.',
        content: `
            <p>ALF가 실제 현장에서 어떻게 활용되는지, 그리고 경험 많은 CX 시니어가 어떤 방식으로 AI와 협업하며 성장했는지 궁금하다면 부스터스의 이야기를 주목해주세요.</p>
            <h2>AI와 함께 성장한 CX 시니어의 10년</h2>
            <p>ALF를 도입한 이후 반복 상담은 자동화하고, 상담사는 더 높은 난도의 고객 경험 설계에 집중할 수 있었습니다. 특히 장기 고객의 이탈율이 18% 감소하며, CX팀의 핵심 KPI가 모두 개선되었습니다.</p>
            <blockquote>“ALF가 팀의 새로운 동료가 되면서, 우리는 고객 경험의 본질에 더욱 집중할 수 있게 되었습니다.”</blockquote>
            <p>부스터스 팀은 AI 에이전트와 사람 사이의 매끄러운 협업 프로세스를 구축했고, 도입 6개월만에 평균 해결 시간이 37% 단축되는 성과를 냈습니다.</p>
        `,
        coverGradient: 'linear-gradient(135deg, rgba(24,64,45,0.8) 0%, rgba(8,24,16,0.95) 100%)',
        featured: true,
        date: '2025-10-30'
    },
    {
        id: 'post-20251022-cafe24',
        title: '카페24 고객 데이터 마케팅에 200% 활용하기',
        author: 'Curtis',
        category: 'tips',
        tags: ['채널톡 사용팁', '커머스', '마케팅'],
        summary: '카페24 연동 데이터를 기반으로 캠페인 피로도는 낮추고 전환율을 높인 세그먼트 운영 노하우를 공유합니다.',
        content: `
            <p>카페24와 채널톡을 연동하면 고객 행동 데이터를 실시간으로 받아볼 수 있습니다. 본문에서는 캠페인 세그먼트 설계, 타겟 메시지, 후속 자동화까지 실전에서 바로 적용 가능한 방법을 정리했습니다.</p>
            <h2>데이터 드리븐 세그먼트 설계</h2>
            <p>구매 주기/금액/상품 조합을 기준으로 6개의 핵심 세그먼트를 구축했고, 각 군집별로 메시지와 제안을 다르게 설계해 마케팅 비용 대비 ROAS를 200% 이상 끌어올렸습니다.</p>
            <p>특히 휴면 고객 그룹에는 ALF 챗봇이 먼저 맞춤 쿠폰을 제안하고, 상담사가 후속 제안을 진행하는 2단계 플로우가 효과적이었습니다.</p>
        `,
        coverGradient: 'linear-gradient(135deg, rgba(11,110,153,0.85) 0%, rgba(5,42,64,0.95) 100%)',
        featured: false,
        date: '2025-10-22'
    },
    {
        id: 'post-20251016-alfv2',
        title: '채널톡이 먼저 써본 ALF v2, 해결률 80% 달성!',
        author: 'Beige',
        category: 'success',
        tags: ['ALF', '자동화', '사내사례'],
        summary: 'ALF v2 베타를 내부 CX 셀프테스트로 검증한 결과, AI 단독 해결률 80%를 달성하며 상담 효율이 크게 향상되었습니다.',
        content: `
            <p>ALF v2는 대화 이해도와 문서 검색 능력을 동시에 강화했습니다. 실제 채널톡 CX팀이 4주간 테스트한 결과, 인입 10건 중 8건은 AI가 스스로 해결하고 상담사는 고난도 이슈에 집중할 수 있었습니다.</p>
            <h2>세 가지 핵심 개선 포인트</h2>
            <ul>
                <li>고객 의도 분류 정확도 25% 향상</li>
                <li>KB(지식베이스) 문서 추천 속도 42% 단축</li>
                <li>다중 질문 컨텍스트 유지 기능 신설</li>
            </ul>
            <p>이번 사례는 도입을 고민하는 기업에게도 충분한 비교 지표가 될 수 있습니다.</p>
        `,
        coverGradient: 'linear-gradient(135deg, rgba(15,123,108,0.9) 0%, rgba(8,53,22,0.95) 100%)',
        featured: true,
        date: '2025-10-16'
    },
    {
        id: 'post-20251010-channelcon',
        title: '채널코퍼레이션, ‘채널콘 2025’ 개최',
        author: 'Channel Talk',
        category: 'news',
        tags: ['행사', 'AI', 'REAL CASES'],
        summary: 'AI REAL CASES ONLY를 주제로 업계 혁신 사례를 공유한 채널콘 2025 현장 분위기와 핵심 아젠다를 정리했습니다.',
        content: `
            <p>올해 채널콘은 “AI REAL CASES ONLY”라는 주제로, 실제 도입 사례에 초점을 맞춘 프로그램을 구성했습니다. 오프닝 키노트에서는 가명 처리된 고객 데이터를 활용해 CX 자동화를 구현한 사례가 공유되었습니다.</p>
            <p>현장에서는 ALF 고객/팀 에이전트 로드맵, 파트너 생태계 확장 전략, 그리고 AI 전화 상담 베타 로드쇼가 동시에 진행되어 높은 관심을 받았습니다.</p>
        `,
        coverGradient: 'linear-gradient(135deg, rgba(46,58,140,0.85) 0%, rgba(11,16,48,0.95) 100%)',
        featured: false,
        date: '2025-10-10'
    },
    {
        id: 'post-20250512-ai-report',
        title: '2025 AI 고객 상담 성공사례 리포트',
        author: 'Tena',
        category: 'workbook',
        tags: ['리포트', 'AI 성공사례'],
        summary: '1,400개 기업의 AI 상담 데이터를 분석해 성공 패턴과 실패를 가르는 포인트를 정리한 연간 리포트입니다.',
        content: `
            <p>본 리포트는 업종별 AI 상담 전환율, 도입 후 고객 만족도, 운영 인력 절감 효과 등의 지표를 비교 분석합니다. SaaS, 커머스, 금융 업종에서 유의미한 차이가 발견되었습니다.</p>
            <p>또한 ALF를 포함한 AI 상담 에이전트가 어떤 데이터를 학습해야 높은 해결률을 달성할 수 있는지에 대한 가이드도 담았습니다.</p>
        `,
        coverGradient: 'linear-gradient(135deg, rgba(199,133,0,0.85) 0%, rgba(139,74,0,0.95) 100%)',
        featured: false,
        date: '2025-05-12'
    },
    {
        id: 'post-20250401-mcp',
        title: 'MCP는 AI 업계의 표준이 될까요?',
        author: 'Tena',
        category: 'concept',
        tags: ['개념허브', '플랫폼'],
        summary: 'Multi Channel Platform(MCP)가 촉발할 AI 생태계 변화를 살펴보고, 다양한 앱이 연결되는 미래를 전망합니다.',
        content: `
            <p>MCP는 메시징, 전화, 이메일, 커머스 등 여러 앱을 AI가 중개하는 구조를 지칭합니다. 본문에서는 MCP 아키텍처, 채널 간 데이터 동기화 전략, 그리고 보안·개인정보 이슈까지 폭넓게 다룹니다.</p>
            <p>AI가 단일 채널에 종속되지 않고 생태계 전체를 연결하는 시대가 머지않았습니다.</p>
        `,
        coverGradient: 'linear-gradient(135deg, rgba(100,71,58,0.9) 0%, rgba(47,26,15,0.95) 100%)',
        featured: false,
        date: '2025-04-01'
    },
    {
        id: 'post-20240930-event',
        title: '채널콘 2025 - AI: REAL CASES ONLY',
        author: 'Ken',
        category: 'event',
        tags: ['이벤트', 'AI'],
        summary: 'AI 도입을 고민하는 실무자를 위한 대규모 컨퍼런스 채널콘 2025 참가 신청 안내입니다.',
        content: `
            <p>AI가 실제로 비즈니스에 어떤 임팩트를 주는지, 채널톡 고객사의 생생한 사례로 확인해보세요. 참가자에게는 세션 녹화본과 실전 가이드 워크북이 제공됩니다.</p>
            <p>안내 기사에는 행사 세션 구성, 연사 라인업, 얼리버드 혜택 등 실용적인 정보를 담았습니다.</p>
        `,
        coverGradient: 'linear-gradient(135deg, rgba(217,115,13,0.88) 0%, rgba(148,70,0,0.95) 100%)',
        featured: false,
        date: '2024-09-30'
    }
];

const TEXT_COLORS = [
    { name: '회색', value: '#9B9A97' },
    { name: '갈색', value: '#64473A' },
    { name: '주황', value: '#D9730D' },
    { name: '노랑', value: '#C19A00' },
    { name: '초록', value: '#0F7B6C' },
    { name: '파랑', value: '#0B6E99' },
    { name: '보라', value: '#6940A5' }
];

const BACKGROUND_COLORS = [
    { name: '회색', value: '#F1F1EF' },
    { name: '갈색', value: '#F5E9DA' },
    { name: '주황', value: '#FBE4D0' },
    { name: '노랑', value: '#FBF4D0' },
    { name: '초록', value: '#E3F6F2' },
    { name: '파랑', value: '#E1F2FA' },
    { name: '보라', value: '#EAE4F6' }
];

let blogPosts = [];
let activeCategory = 'all';
let pendingFilterTimeout;

const editorState = {
    coverImage: null,
    savedRange: null
};

const colorState = {
    textSwatches: [],
    backgroundSwatches: [],
    activeText: null,
    activeBackground: null
};

let supabaseClient = null;
let supabaseAvailable = false;

const elements = {};
let editingPostId = null;

document.addEventListener('DOMContentLoaded', async () => {
    cacheDom();
    await initializeSupabase();
    await refreshPosts();
    renderCategoryFilters();
    renderAll();
    bindUI();
    updateAdminUI(window.SIGAuth?.isAdmin?.() ?? false);
});

document.addEventListener('sig-auth-changed', (event) => {
    updateAdminUI(event?.detail?.isAdmin ?? false);
});

/** ----------------------------------------------------------------------
 * Data Handling & Supabase Integration
 * ------------------------------------------------------------------- */

function loadLocalPosts() {
    try {
        const stored = JSON.parse(localStorage.getItem(BLOG_STORAGE_KEY));
        if (Array.isArray(stored) && stored.length) {
            return sortPosts(stored);
        }
        localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(DEFAULT_BLOG_POSTS));
    } catch (error) {
        console.warn('[Blog] 로컬 데이터 불러오기 중 오류가 발생했습니다.', error);
    }
    return sortPosts(DEFAULT_BLOG_POSTS.slice());
}

function saveLocalPosts(posts) {
    try {
        localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(posts));
    } catch (error) {
        console.warn('[Blog] 로컬 데이터 저장 중 오류가 발생했습니다.', error);
    }
}

async function fetchSupabaseConfig() {
    try {
        const response = await fetch('/api/supabase-config');
        if (!response.ok) return null;
        const data = await response.json();
        if (data?.url && data?.anonKey) {
            return {
                url: data.url,
                anonKey: data.anonKey
            };
        }
    } catch (error) {
        console.warn('[Blog] Supabase 설정을 불러오는 중 오류가 발생했습니다.', error);
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
        supabaseClient = createClient(config.url, config.anonKey, {
            auth: { persistSession: false }
        });
        supabaseAvailable = true;
    } catch (error) {
        supabaseAvailable = false;
        console.warn('[Blog] Supabase 클라이언트 초기화 중 오류가 발생했습니다.', error);
    }
}

function normalizeSupabasePost(row) {
    if (!row) return null;
    const tags = Array.isArray(row.tags)
        ? row.tags
        : typeof row.tags === 'string' && row.tags.trim().length
            ? row.tags.split(',').map((tag) => tag.trim()).filter(Boolean)
            : [];

    const categoryId = row.category || 'success';
    const categoryMeta = getCategoryMeta(categoryId);

    return {
        id: row.id,
        title: row.title || '',
        author: row.author || 'SIG팀',
        category: categoryId,
        tags,
        summary: row.summary || '',
        content: row.content || '',
        coverImage: row.cover_image || null,
        coverGradient: row.cover_gradient || categoryMeta?.gradient || getCategoryMeta('success').gradient,
        featured: !!row.featured,
        date: row.created_at || row.date || new Date().toISOString()
    };
}

async function refreshPosts() {
    if (supabaseAvailable && supabaseClient) {
        try {
            const { data, error } = await supabaseClient
                .from(SUPABASE_TABLE)
                .select('*')
                .order('created_at', { ascending: false });

            if (!error && Array.isArray(data)) {
                blogPosts = sortPosts(
                    data.map(normalizeSupabasePost).filter(Boolean)
                );
                return;
            }

            if (error) {
                console.warn('[Blog] Supabase에서 데이터를 가져오는 중 오류가 발생했습니다.', error);
            }
        } catch (error) {
            console.warn('[Blog] Supabase 통신 중 오류가 발생했습니다.', error);
        }
    }

    blogPosts = loadLocalPosts();
}

function sortPosts(posts) {
    return posts.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
}

function getCategoryMeta(id) {
    return BLOG_CATEGORIES.find((cat) => cat.id === id) || BLOG_CATEGORIES[0];
}

function getCoverVisual(post) {
    if (post.coverImage) {
        return `url(${post.coverImage})`;
    }
    if (post.coverGradient) {
        return post.coverGradient;
    }
    return getCategoryMeta(post.category).gradient;
}

function renderAdminActions(postId) {
    return `
        <div class="blog-card-actions" data-post-actions="${postId}">
            <button type="button" class="blog-card-action-toggle" data-post-action-toggle aria-label="게시글 옵션">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <div class="blog-card-action-menu">
                <button type="button" data-post-edit="${postId}">수정</button>
                <button type="button" data-post-delete="${postId}">삭제</button>
            </div>
        </div>
    `;
}

function applyAdminActions(container, postId) {
    if (!container) return;
    container.querySelectorAll('.blog-card-actions').forEach((actions) => actions.remove());
    if (!postId) return;
    container.insertAdjacentHTML('afterbegin', renderAdminActions(postId));
}

function closeAllPostMenus() {
    document.querySelectorAll('.blog-card-actions.is-open').forEach((menu) => {
        menu.classList.remove('is-open');
    });
}

function isActionClick(event) {
    return event.target.closest('.blog-card-actions');
}

/** ----------------------------------------------------------------------
 * Rendering
 * ------------------------------------------------------------------- */

function renderAll() {
    const filtered = activeCategory === 'all'
        ? blogPosts
        : blogPosts.filter((post) => post.category === activeCategory);

    renderHero(filtered);
    renderRecentPosts(filtered);
    renderFeaturedPosts(filtered);
    renderCategoryArchive(activeCategory === 'all' ? blogPosts : []);
    closeAllPostMenus();
}

function renderHero(posts) {
    if (!elements.heroPrimary) return;

    if (!posts.length) {
        elements.heroPrimary.classList.add('empty');
        elements.heroCategory.textContent = 'BLOG';
        elements.heroTitle.textContent = '곧 새로운 스토리가 업데이트됩니다';
        elements.heroExcerpt.textContent = '관리자로 로그인하면 첫 번째 블로그 글을 작성할 수 있습니다.';
        elements.heroAuthor.textContent = 'SIG팀';
        elements.heroDate.textContent = formatDate(new Date().toISOString());
        elements.heroCover.style.backgroundImage = 'linear-gradient(135deg, #1f5e3a 0%, #0c1f12 100%)';
        elements.heroSecondary.innerHTML = '';
        applyAdminActions(elements.heroPrimary, null);
        return;
    }

    const heroPost = posts.find((post) => post.featured) || posts[0];
    const meta = getCategoryMeta(heroPost.category);

    elements.heroPrimary.classList.remove('empty');
    elements.heroPrimary.dataset.postId = heroPost.id;
    elements.heroCategory.textContent = meta.label.toUpperCase();
    elements.heroTitle.textContent = heroPost.title;
    elements.heroExcerpt.textContent = heroPost.summary;
    elements.heroAuthor.textContent = heroPost.author;
    elements.heroDate.textContent = formatDate(heroPost.date);
    elements.heroCover.style.backgroundImage = getCoverVisual(heroPost);
    applyAdminActions(elements.heroPrimary, heroPost.id);

    const secondaryPosts = posts.filter((post) => post.id !== heroPost.id).slice(0, 3);
    elements.heroSecondary.innerHTML = secondaryPosts.map((post) => {
        const cat = getCategoryMeta(post.category);
        return `
            <article class="blog-hero-card" data-post-id="${post.id}">
                ${renderAdminActions(post.id)}
                <span class="blog-tag light" style="background:${cat.gradient}; border: 1px solid rgba(255,255,255,0.25);">${cat.label}</span>
                <h3>${post.title}</h3>
                <p>${post.summary}</p>
            </article>
        `;
    }).join('');

    bindCardOpen(elements.heroSecondary);
}

function renderRecentPosts(posts) {
    if (!elements.recentGrid) return;
    if (!posts.length) {
        elements.recentGrid.innerHTML = `
            <div class="blog-empty-state">
                <h3>해당 카테고리의 글이 아직 없어요</h3>
                <p>관리자로 로그인하여 첫 번째 글을 발행해보세요.</p>
            </div>
        `;
        return;
    }

    const recent = posts.slice(0, 6);
    elements.recentGrid.innerHTML = recent.map(createBlogCardHTML).join('');
    bindCardOpen(elements.recentGrid);
}

function renderFeaturedPosts(posts) {
    if (!elements.featuredGrid || !elements.featuredSection) return;
    const featured = blogPosts.filter((post) => post.featured);
    if (!featured.length) {
        elements.featuredSection.hidden = true;
        return;
    }

    const filteredFeatured = activeCategory === 'all'
        ? featured
        : featured.filter((post) => post.category === activeCategory);

    if (!filteredFeatured.length) {
        elements.featuredSection.hidden = true;
        return;
    }

    elements.featuredSection.hidden = false;
    elements.featuredGrid.innerHTML = filteredFeatured.map(createBlogCardHTML).join('');
    bindCardOpen(elements.featuredGrid);
}

function renderCategoryArchive(posts) {
    if (!elements.categorySections) return;

    if (!posts.length) {
        elements.categorySections.innerHTML = '';
        elements.categoryArchiveSection.hidden = true;
        return;
    }

    elements.categoryArchiveSection.hidden = false;
    const groups = BLOG_CATEGORIES.filter((cat) => cat.id !== 'all')
        .map((cat) => {
            const categoryPosts = posts.filter((post) => post.category === cat.id).slice(0, 3);
            if (!categoryPosts.length) return '';
            return `
                <section class="blog-category-group">
                    <div class="blog-category-group-header">
                        <h3>${cat.label}</h3>
                        <a href="javascript:void(0)" data-category-jump="${cat.id}">모든 글 보기</a>
                    </div>
                    <div class="blog-card-grid">
                        ${categoryPosts.map(createBlogCardHTML).join('')}
                    </div>
                </section>
            `;
        })
        .filter(Boolean)
        .join('');

    elements.categorySections.innerHTML = groups || `
        <div class="blog-empty-state">
            <h3>아직 등록된 글이 없습니다</h3>
            <p>새 글을 발행하면 카테고리별 아카이브가 자동으로 채워집니다.</p>
        </div>
    `;

    elements.categorySections.querySelectorAll('[data-category-jump]').forEach((link) => {
        link.addEventListener('click', () => {
            setActiveCategory(link.dataset.categoryJump);
        });
    });

    bindCardOpen(elements.categorySections);
}

function createBlogCardHTML(post) {
    const meta = getCategoryMeta(post.category);
    const cover = getCoverVisual(post);
    const hasImage = post.coverImage ? 'has-image' : '';
    return `
        <article class="blog-card ${hasImage}" data-post-id="${post.id}">
            ${renderAdminActions(post.id)}
            <div class="blog-card-cover" style="background:${post.coverImage ? '#000' : meta.gradient}; --cover-image:${cover};"></div>
            <div class="blog-card-body">
                <span class="blog-card-tag">${meta.label}</span>
                <h3 class="blog-card-title">${post.title}</h3>
                <p class="blog-card-excerpt">${post.summary}</p>
                <div class="blog-card-meta">
                    <span class="blog-meta-author">${post.author}</span>
                    <span class="blog-meta-dot"></span>
                    <span>${formatDate(post.date)}</span>
                </div>
            </div>
        </article>
    `;
}

function bindCardOpen(root) {
    root.querySelectorAll('[data-post-id]').forEach((card) => {
        card.addEventListener('click', (event) => {
            if (isActionClick(event)) return;
            if (!card.dataset.postId) return;
            openBlogArticle(card.dataset.postId);
        });
    });
}

/** ----------------------------------------------------------------------
 * Category Filter UI
 * ------------------------------------------------------------------- */

function renderCategoryFilters() {
    if (!elements.categoryFilter) return;
    elements.categoryFilter.innerHTML = BLOG_CATEGORIES.map((cat) => `
        <button type="button" class="blog-category-chip ${cat.id === activeCategory ? 'active' : ''}" data-category="${cat.id}">
            ${cat.label}
        </button>
    `).join('');

    elements.categoryFilter.querySelectorAll('[data-category]').forEach((btn) => {
        btn.addEventListener('click', () => {
            setActiveCategory(btn.dataset.category);
        });
    });
}

function setActiveCategory(categoryId) {
    if (categoryId === activeCategory) return;
    activeCategory = categoryId;

    elements.categoryFilter.querySelectorAll('[data-category]').forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.category === activeCategory);
    });

    clearTimeout(pendingFilterTimeout);
    pendingFilterTimeout = setTimeout(() => {
        renderAll();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 120);
}

/** ----------------------------------------------------------------------
 * Article Modal
 * ------------------------------------------------------------------- */

function openBlogArticle(postId) {
    const post = blogPosts.find((item) => item.id === postId);
    if (!post || !elements.articleModal) return;
    closeAllPostMenus();

    const meta = getCategoryMeta(post.category);
    elements.modalCategory.textContent = meta.label;
    elements.modalTitle.textContent = post.title;
    elements.modalAuthor.textContent = post.author;
    elements.modalDate.textContent = formatDate(post.date);
    elements.modalBody.innerHTML = post.content;

    if (post.coverImage) {
        elements.modalCover.hidden = false;
        const img = elements.modalCover.querySelector('img');
        img.src = post.coverImage;
        img.alt = `${post.title} 대표 이미지`;
    } else {
        elements.modalCover.hidden = true;
    }

    elements.articleModal.dataset.postId = postId;
    elements.articleModal.classList.add('active');
    document.body.classList.add('auth-modal-open');
}

function closeBlogArticle() {
    if (!elements.articleModal) return;
    elements.articleModal.classList.remove('active');
    document.body.classList.remove('auth-modal-open');
    delete elements.articleModal.dataset.postId;
}

/** ----------------------------------------------------------------------
 * Editor & Admin Features
 * ------------------------------------------------------------------- */

function openEditor(postId = null) {
    if (!elements.editorOverlay) return;
    closeAllPostMenus();
    const post = postId ? blogPosts.find((item) => item.id === postId) : null;
    editingPostId = post ? post.id : null;
    populateEditor(post);
    elements.editorOverlay.classList.add('active');
    document.body.classList.add('auth-modal-open');
    elements.editorTitle.focus();
}

function closeEditor() {
    if (!elements.editorOverlay) return;
    elements.editorOverlay.classList.remove('active');
    document.body.classList.remove('auth-modal-open');
    editingPostId = null;
    editorState.savedRange = null;
}

function populateEditor(post) {
    elements.editorTitle.value = post ? post.title : '';
    elements.editorAuthor.value = post ? post.author : 'SIG팀';
    elements.editorTags.value = post?.tags ? post.tags.join(', ') : '';

    elements.editorCategory.innerHTML = BLOG_CATEGORIES
        .filter((cat) => cat.id !== 'all')
        .map((cat) => `<option value="${cat.id}">${cat.label}</option>`)
        .join('');

    const defaultCategory = BLOG_CATEGORIES.find((cat) => cat.id !== 'all');
    elements.editorCategory.value = post ? post.category : (defaultCategory ? defaultCategory.id : '');

    elements.editorFeatured.checked = !!post?.featured;
    elements.editorContent.innerHTML = post ? post.content : '';

    editorState.coverImage = post?.coverImage || null;

    if (editorState.coverImage) {
        elements.editorCoverPreview.innerHTML = `<img src="${editorState.coverImage}" alt="썸네일 미리보기">`;
        elements.editorCoverPreview.classList.add('has-image');
    } else {
        elements.editorCoverPreview.innerHTML = '썸네일을 업로드하거나 비워두면 자동 그라데이션이 적용됩니다.';
        elements.editorCoverPreview.classList.remove('has-image');
    }
}

async function handleEditorSave() {
    const title = elements.editorTitle.value.trim();
    const author = elements.editorAuthor.value.trim() || 'SIG팀';
    const category = elements.editorCategory.value;
    const tags = elements.editorTags.value.split(',').map((tag) => tag.trim()).filter(Boolean);
    const content = elements.editorContent.innerHTML.trim();

    if (!title) {
        alert('제목을 입력해주세요.');
        elements.editorTitle.focus();
        return;
    }

    if (!content || stripHtml(content).length < 10) {
        alert('본문을 조금 더 작성해주세요.');
        elements.editorContent.focus();
        return;
    }

    const summary = extractSummary(content, 160);
    const baseGradient = editorState.coverImage ? null : getCategoryMeta(category).gradient;
    const payload = {
        title,
        author,
        category,
        tags,
        summary,
        content,
        coverImage: editorState.coverImage,
        coverGradient: baseGradient,
        featured: elements.editorFeatured.checked
    };

    const isEditing = Boolean(editingPostId);

    if (supabaseAvailable && supabaseClient) {
        try {
            if (isEditing) {
                const { error } = await supabaseClient
                    .from(SUPABASE_TABLE)
                    .update({
                        title: payload.title,
                        author: payload.author,
                        category: payload.category,
                        tags: payload.tags,
                        summary: payload.summary,
                        content: payload.content,
                        cover_image: payload.coverImage,
                        cover_gradient: payload.coverGradient,
                        featured: payload.featured
                    })
                    .eq('id', editingPostId);

                if (error) {
                    throw error;
                }
            } else {
                const { error } = await supabaseClient
                    .from(SUPABASE_TABLE)
                    .insert([{
                        title: payload.title,
                        author: payload.author,
                        category: payload.category,
                        tags: payload.tags,
                        summary: payload.summary,
                        content: payload.content,
                        cover_image: payload.coverImage,
                        cover_gradient: payload.coverGradient,
                        featured: payload.featured
                    }]);

                if (error) {
                    throw error;
                }
            }

            await refreshPosts();
            renderCategoryFilters();
            renderAll();
            closeEditor();
            alert(isEditing ? '블로그 글이 수정되었습니다.' : '블로그 글이 발행되었습니다.');
            return;
        } catch (error) {
            console.error('[Blog] Supabase 저장 중 오류가 발생했습니다.', error);
            alert('Supabase에 글을 저장하는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
            return;
        }
    }

    const localPosts = [...blogPosts];

    if (isEditing) {
        const index = localPosts.findIndex((post) => post.id === editingPostId);
        if (index !== -1) {
            localPosts[index] = {
                ...localPosts[index],
                ...payload
            };
        }
    } else {
        localPosts.unshift({
            id: `post-${Date.now()}`,
            date: new Date().toISOString(),
            ...payload
        });
    }

    blogPosts = sortPosts(localPosts);
    saveLocalPosts(blogPosts);
    closeEditor();
    renderCategoryFilters();
    renderAll();
    alert(isEditing
        ? 'Supabase가 설정되지 않아 로컬 저장소에서 글이 수정되었습니다.'
        : 'Supabase가 설정되지 않아 로컬 저장소에만 글이 저장되었습니다.');
}

function stripHtml(html) {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || '';
}

function extractSummary(html, length) {
    const text = stripHtml(html).replace(/\s+/g, ' ').trim();
    return text.length > length ? text.slice(0, length) + '…' : text;
}

function updateAdminUI(isAdmin) {
    if (elements.createButton) {
        elements.createButton.hidden = !isAdmin;
    }
    if (!isAdmin) {
        closeAllPostMenus();
    }
}

/** ----------------------------------------------------------------------
 * Editor Toolbar & Slash Menu
 * ------------------------------------------------------------------- */

function bindToolbar() {
    if (!elements.editorToolbar) return;

    elements.editorToolbar.addEventListener('mousedown', saveEditorRange, true);
    elements.editorToolbar.addEventListener('touchstart', saveEditorRange, true);

    elements.editorToolbar.querySelectorAll('[data-command]').forEach((button) => {
        button.addEventListener('click', () => {
            const command = button.dataset.command;
            if (command === 'inline-image') {
                saveEditorRange();
                hideSlashMenu();
                if (elements.inlineImageInput) {
                    elements.inlineImageInput.value = '';
                    elements.inlineImageInput.click();
                }
                return;
            }

            ensureEditorSelection();
            switch (command) {
                case 'paragraph':
                    document.execCommand('formatBlock', false, 'p');
                    break;
                case 'heading1':
                    document.execCommand('formatBlock', false, 'h1');
                    break;
                case 'heading2':
                    document.execCommand('formatBlock', false, 'h2');
                    break;
                case 'quote':
                    document.execCommand('formatBlock', false, 'blockquote');
                    break;
                case 'clear':
                    document.execCommand('removeFormat');
                    document.execCommand('formatBlock', false, 'p');
                    break;
            }
            saveEditorRange();
        });
    });

    const textPalette = elements.editorToolbar.querySelector('[data-toolbar="text-color"]');
    const backgroundPalette = elements.editorToolbar.querySelector('[data-toolbar="background-color"]');

    if (textPalette) {
        textPalette.innerHTML = `
            <button type="button" class="toolbar-button" data-color-reset="text">기본</button>
            ${TEXT_COLORS.map((color) => `<span class="toolbar-swatch" style="background:${color.value}" title="${color.name}" data-color="${color.value}" data-color-type="text"></span>`).join('')}
        `;
    }

    if (backgroundPalette) {
        backgroundPalette.innerHTML = `
            <button type="button" class="toolbar-button" data-color-reset="background">기본</button>
            ${BACKGROUND_COLORS.map((color) => `<span class="toolbar-swatch" style="background:${color.value}" title="${color.name}" data-color="${color.value}" data-color-type="background"></span>`).join('')}
        `;
    }

    colorState.textSwatches = textPalette ? Array.from(textPalette.querySelectorAll('[data-color-type="text"]')) : [];
    colorState.backgroundSwatches = backgroundPalette ? Array.from(backgroundPalette.querySelectorAll('[data-color-type="background"]')) : [];

    elements.editorToolbar.querySelectorAll('[data-color]').forEach((swatch) => {
        swatch.addEventListener('click', () => {
            handleColorSwatchClick(swatch);
        });
    });

    elements.editorToolbar.querySelectorAll('[data-color-reset]').forEach((button) => {
        button.addEventListener('click', () => {
            ensureEditorSelection();
            const type = button.dataset.colorReset;
            if (type === 'text') {
                execWithCss('foreColor', '#1a1a1a');
                setActiveSwatch('text', null);
            } else {
                applyHighlight('transparent');
                execWithCss('backColor', 'transparent');
                setActiveSwatch('background', null);
            }
            saveEditorRange();
        });
    });
}

function bindSlashMenu() {
    elements.editorContent.addEventListener('keydown', (event) => {
        if (event.key === '/' && !event.shiftKey) {
            event.preventDefault();
            saveEditorRange();
            showSlashMenu();
        } else if (event.key === 'Escape') {
            hideSlashMenu();
        }
    });

    document.addEventListener('click', (event) => {
        if (!elements.slashMenu.contains(event.target)) {
            hideSlashMenu();
        }
    });

    const slashOptions = [
        { label: '대제목', description: '큰 제목 블록', command: 'heading1' },
        { label: '소제목', description: '중간 크기 제목', command: 'heading2' },
        { label: '본문', description: '기본 텍스트', command: 'paragraph' },
        { label: '인용문', description: '강조하고 싶은 문장을 인용으로', command: 'quote' }
    ];

    elements.slashMenu.innerHTML = slashOptions.map((item) => `
        <button type="button" class="slash-menu-item" data-command="${item.command}">
            <strong>${item.label}</strong>
            <span>${item.description}</span>
        </button>
    `).join('');

    elements.slashMenu.querySelectorAll('[data-command]').forEach((button) => {
        button.addEventListener('click', () => {
            restoreEditorRange();
            elements.editorContent.focus();
            const command = button.dataset.command;
            document.execCommand('formatBlock', false, command === 'paragraph' ? 'p' : command === 'heading1' ? 'h1' : command === 'heading2' ? 'h2' : 'blockquote');
            hideSlashMenu();
        });
    });
}

function saveEditorRange() {
    if (!elements.editorContent) return;
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    const range = selection.getRangeAt(0);
    if (!isNodeInEditor(range.startContainer) || !isNodeInEditor(range.endContainer)) return;
    editorState.savedRange = range.cloneRange();
}

function restoreEditorRange() {
    if (!editorState.savedRange) return false;
    restoreRange(editorState.savedRange.cloneRange());
    return true;
}

function isNodeInEditor(node) {
    if (!elements.editorContent) return false;
    if (!node) return false;
    return node === elements.editorContent || elements.editorContent.contains(node);
}

function ensureEditorSelection() {
    if (!elements.editorContent) return;
    if (!restoreEditorRange()) {
        elements.editorContent.focus();
        const selection = window.getSelection();
        if (!selection) return;
        const range = document.createRange();
        range.selectNodeContents(elements.editorContent);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
        editorState.savedRange = range.cloneRange();
    }
}

function setActiveSwatch(type, swatch) {
    const groupKey = type === 'text' ? 'textSwatches' : 'backgroundSwatches';
    const activeKey = type === 'text' ? 'activeText' : 'activeBackground';
    colorState[groupKey].forEach((item) => item.classList.remove('active'));
    if (swatch) {
        swatch.classList.add('active');
        colorState[activeKey] = swatch;
    } else {
        colorState[activeKey] = null;
    }
}

function handleColorSwatchClick(swatch) {
    if (!swatch) return;
    ensureEditorSelection();
    const type = swatch.dataset.colorType;
    const value = swatch.dataset.color;
    if (type === 'text') {
        execWithCss('foreColor', value);
        setActiveSwatch('text', swatch);
    } else {
        applyHighlight(value);
        setActiveSwatch('background', swatch);
    }
    saveEditorRange();
}

function handleEditorSelectionChange() {
    if (!elements.editorContent) return;
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    const range = selection.getRangeAt(0);
    if (!isNodeInEditor(range.startContainer) || !isNodeInEditor(range.endContainer)) return;
    editorState.savedRange = range.cloneRange();
}

function showSlashMenu() {
    const range = window.getSelection().getRangeAt(0);
    const rect = range.getBoundingClientRect();
    const editorRect = elements.editorContent.getBoundingClientRect();
    elements.slashMenu.style.top = `${rect.bottom - editorRect.top + elements.editorContent.scrollTop + 10}px`;
    elements.slashMenu.style.left = `${Math.max(rect.left - editorRect.left, 16)}px`;
    elements.slashMenu.classList.add('active');
}

function hideSlashMenu() {
    elements.slashMenu.classList.remove('active');
}

/** ----------------------------------------------------------------------
 * Event Binding & Helpers
 * ------------------------------------------------------------------- */

function cacheDom() {
    elements.heroPrimary = document.getElementById('blogHeroPrimary');
    elements.heroCover = document.getElementById('blogHeroCover');
    elements.heroCategory = document.getElementById('blogHeroCategory');
    elements.heroTitle = document.getElementById('blogHeroTitle');
    elements.heroExcerpt = document.getElementById('blogHeroExcerpt');
    elements.heroAuthor = document.getElementById('blogHeroAuthor');
    elements.heroDate = document.getElementById('blogHeroDate');
    elements.heroSecondary = document.getElementById('blogHeroSecondary');
    elements.categoryFilter = document.getElementById('blogCategoryFilter');
    elements.recentGrid = document.getElementById('recentPostsGrid');
    elements.featuredSection = document.getElementById('featuredSection');
    elements.featuredGrid = document.getElementById('featuredPostsGrid');
    elements.categoryArchiveSection = document.getElementById('categoryArchiveSection');
    elements.categorySections = document.getElementById('categorySections');
    elements.createButton = document.getElementById('openBlogEditor');
    elements.editorOverlay = document.getElementById('blogEditorOverlay');
    elements.editorTitle = document.getElementById('editorTitle');
    elements.editorCategory = document.getElementById('editorCategory');
    elements.editorAuthor = document.getElementById('editorAuthor');
    elements.editorTags = document.getElementById('editorTags');
    elements.editorFeatured = document.getElementById('editorFeatured');
    elements.editorContent = document.getElementById('editorContent');
    elements.editorCoverPreview = document.getElementById('editorCoverPreview');
    elements.editorCoverInput = document.getElementById('editorCoverInput');
    elements.editorToolbar = document.querySelector('.editor-toolbar');
    elements.inlineImageInput = document.getElementById('editorInlineImageInput');
    elements.slashMenu = document.getElementById('editorSlashMenu');
    elements.articleModal = document.getElementById('blogArticleModal');
    elements.modalCategory = document.getElementById('modalArticleCategory');
    elements.modalTitle = document.getElementById('modalArticleTitle');
    elements.modalAuthor = document.getElementById('modalArticleAuthor');
    elements.modalDate = document.getElementById('modalArticleDate');
    elements.modalCover = document.getElementById('modalArticleCover');
    elements.modalBody = document.getElementById('modalArticleBody');

    if (elements.heroPrimary) {
        elements.heroPrimary.addEventListener('click', (event) => {
            if (isActionClick(event)) return;
            const postId = elements.heroPrimary.dataset.postId;
            if (postId) {
                openBlogArticle(postId);
            }
        });
    }
}

function bindUI() {
    if (elements.createButton) {
        elements.createButton.addEventListener('click', () => {
            if (window.SIGAuth) {
                window.SIGAuth.requireAdmin(openEditor);
            } else {
                openEditor();
            }
        });
    }

    elements.editorOverlay?.querySelector('[data-editor-action="close"]').addEventListener('click', closeEditor);
    elements.editorOverlay?.querySelector('[data-editor-action="save"]').addEventListener('click', () => {
        handleEditorSave().catch((error) => {
            console.error('[Blog] 글 저장 중 예기치 않은 오류가 발생했습니다.', error);
            alert('글을 저장하는 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
        });
    });
    elements.editorOverlay?.querySelector('[data-editor-action="upload-cover"]').addEventListener('click', () => elements.editorCoverInput.click());
    elements.editorOverlay?.querySelector('[data-editor-action="remove-cover"]').addEventListener('click', () => {
        editorState.coverImage = null;
        elements.editorCoverPreview.innerHTML = '썸네일을 업로드하거나 비워두면 자동 그라데이션이 적용됩니다.';
        elements.editorCoverPreview.classList.remove('has-image');
    });

    elements.editorCoverInput?.addEventListener('change', handleCoverUpload);
    elements.inlineImageInput?.addEventListener('change', handleInlineImageSelection);

    bindToolbar();
    bindSlashMenu();

    elements.articleModal?.querySelectorAll('[data-blog-modal-close]').forEach((el) => {
        el.addEventListener('click', closeBlogArticle);
    });

    elements.editorContent?.addEventListener('paste', handleEditorPaste);
    elements.editorContent?.addEventListener('dragover', handleEditorDragOver);
    elements.editorContent?.addEventListener('drop', handleEditorDrop);
    elements.editorContent?.addEventListener('keyup', handleEditorSelectionChange);
    elements.editorContent?.addEventListener('mouseup', handleEditorSelectionChange);
    elements.editorContent?.addEventListener('touchend', handleEditorSelectionChange);
    elements.editorContent?.addEventListener('focus', handleEditorSelectionChange);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeEditor();
            closeBlogArticle();
        }
    });

    document.addEventListener('click', handlePostActionInteractions);
}

function handleCoverUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드할 수 있습니다.');
        return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
        editorState.coverImage = e.target.result;
        elements.editorCoverPreview.innerHTML = `<img src="${editorState.coverImage}" alt="썸네일 미리보기">`;
        elements.editorCoverPreview.classList.add('has-image');
    };
    reader.readAsDataURL(file);
}

function handleInlineImageSelection(event) {
    const files = event.target.files;
    if (!files || !files.length) return;
    const initialRange = editorState.savedRange ? editorState.savedRange.cloneRange() : getCurrentRangeClone();
    hideSlashMenu();
    processImageFiles(files, initialRange);
    event.target.value = '';
}

function handleEditorPaste(event) {
    const clipboardItems = Array.from(event.clipboardData?.items || []);
    const imageFiles = clipboardItems
        .filter((item) => item.kind === 'file' && item.type.startsWith('image/'))
        .map((item) => item.getAsFile())
        .filter(Boolean);

    if (!imageFiles.length) return;

    event.preventDefault();
    hideSlashMenu();
    const range = getCurrentRangeClone();
    processImageFiles(imageFiles, range);
}

function handleEditorDragOver(event) {
    event.preventDefault();
}

function handleEditorDrop(event) {
    event.preventDefault();
    let range = null;

    if (document.caretRangeFromPoint) {
        range = document.caretRangeFromPoint(event.clientX, event.clientY);
    } else if (event.rangeParent) {
        range = document.createRange();
        range.setStart(event.rangeParent, event.rangeOffset || 0);
    }

    if (range) {
        editorState.savedRange = range.cloneRange();
    }

    hideSlashMenu();
    processImageFiles(event.dataTransfer?.files, range || getCurrentRangeClone());
}

function processImageFiles(fileList, initialRange) {
    if (!elements.editorContent) return;
    const queue = Array.from(fileList || []).filter((file) => file && file.type && file.type.startsWith('image/'));
    if (!queue.length) return;

    let workingRange = initialRange ? initialRange.cloneRange() : getCurrentRangeClone();

    const insertNext = () => {
        if (!queue.length) return;
        const file = queue.shift();
        const reader = new FileReader();
        reader.onload = (e) => {
            if (workingRange) {
                restoreRange(workingRange.cloneRange ? workingRange.cloneRange() : workingRange);
            } else {
                elements.editorContent.focus();
            }
            insertInlineImage(e.target.result);
            workingRange = getCurrentRangeClone();
            if (workingRange) {
                editorState.savedRange = workingRange.cloneRange();
            }
            insertNext();
        };
        reader.readAsDataURL(file);
    };

    insertNext();
}

function insertInlineImage(src) {
    elements.editorContent.focus();
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
        const range = document.createRange();
        range.selectNodeContents(elements.editorContent);
        range.collapse(false);
        selection.addRange(range);
    }

    const range = selection.getRangeAt(0);
    const img = document.createElement('img');
    img.src = src;
    img.alt = '블로그 이미지';

    range.insertNode(img);

    const spacer = document.createElement('br');
    img.parentNode.insertBefore(spacer, img.nextSibling);

    const newRange = document.createRange();
    newRange.setStartAfter(spacer);
    newRange.collapse(true);

    selection.removeAllRanges();
    selection.addRange(newRange);
    saveEditorRange();
}

function handlePostActionInteractions(event) {
    if (!document.body.classList.contains('auth-admin-active')) return;

    const toggle = event.target.closest('[data-post-action-toggle]');
    if (toggle) {
        event.preventDefault();
        event.stopPropagation();
        const container = toggle.closest('[data-post-actions]');
        if (!container) return;
        if (container.classList.contains('is-open')) {
            container.classList.remove('is-open');
        } else {
            closeAllPostMenus();
            container.classList.add('is-open');
        }
        return;
    }

    const editButton = event.target.closest('[data-post-edit]');
    if (editButton) {
        event.preventDefault();
        event.stopPropagation();
        closeAllPostMenus();
        startEditPost(editButton.dataset.postEdit);
        return;
    }

    const deleteButton = event.target.closest('[data-post-delete]');
    if (deleteButton) {
        event.preventDefault();
        event.stopPropagation();
        closeAllPostMenus();
        const promise = deletePost(deleteButton.dataset.postDelete);
        if (promise instanceof Promise) {
            promise.catch((error) => {
                console.error('[Blog] 게시글 삭제 중 오류가 발생했습니다.', error);
            });
        }
        return;
    }

    if (!event.target.closest('.blog-card-actions')) {
        closeAllPostMenus();
    }
}

function startEditPost(postId) {
    const post = blogPosts.find((item) => item.id === postId);
    if (!post) return;
    if (elements.articleModal?.classList.contains('active')) {
        closeBlogArticle();
    }
    openEditor(postId);
}

async function deletePost(postId) {
    const post = blogPosts.find((item) => item.id === postId);
    if (!post) return;
    const confirmed = confirm('선택한 블로그 글을 삭제하시겠습니까?');
    if (!confirmed) return;
    if (supabaseAvailable && supabaseClient) {
        try {
            const { error } = await supabaseClient
                .from(SUPABASE_TABLE)
                .delete()
                .eq('id', postId);

            if (error) {
                throw error;
            }

            await refreshPosts();
            renderCategoryFilters();
            renderAll();
            if (elements.articleModal?.dataset.postId === postId) {
                closeBlogArticle();
            }
            alert('블로그 글이 삭제되었습니다.');
            return;
        } catch (error) {
            console.error('[Blog] Supabase에서 글 삭제 중 오류가 발생했습니다.', error);
            alert('Supabase에서 글을 삭제하는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
            return;
        }
    }

    blogPosts = blogPosts.filter((item) => item.id !== postId);
    saveLocalPosts(blogPosts);
    if (elements.articleModal?.dataset.postId === postId) {
        closeBlogArticle();
    }
    renderCategoryFilters();
    renderAll();
    alert('Supabase가 설정되지 않아 로컬 저장소에서만 글이 삭제되었습니다.');
}

function execWithCss(command, value) {
    try {
        document.execCommand('styleWithCSS', false, true);
    } catch (error) {
        // noop
    }
    const result = document.execCommand(command, false, value);
    try {
        document.execCommand('styleWithCSS', false, false);
    } catch (error) {
        // noop
    }
    return result;
}

function applyHighlight(value) {
    if (!execWithCss('hiliteColor', value)) {
        execWithCss('backColor', value);
    }
}

function getCurrentRangeClone() {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return null;
    return selection.getRangeAt(0).cloneRange();
}

function restoreRange(range) {
    if (!range || !elements.editorContent) return;
    elements.editorContent.focus();
    const selection = window.getSelection();
    if (!selection) return;
    selection.removeAllRanges();
    selection.addRange(range);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return dateString;
    const formatter = new Intl.DateTimeFormat('ko', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    return formatter.format(date);
}


