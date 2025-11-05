/**
 * Services Page - Interactive Service Tabs & Animations
 * SIG Corporation
 */

// 서비스 카테고리별 데이터
const servicesCatalog = {
    funding: {
        category: "펀딩",
        services: {
            wadiz: {
                title: "와디즈 펀딩",
                description: "평균 2,000% 이상의 펀딩률을 자랑하는 검증된 노하우",
                features: [
                    "펀딩 전략 기획 및 컨설팅",
                    "상세페이지 디자인 및 제작",
                    "3D 모델링 & 렌더링",
                    "제품 촬영 및 편집",
                    "스토리텔링 콘텐츠 기획",
                    "타겟 광고 운영",
                    "커뮤니티 관리",
                    "리워드 발송 지원"
                ],
                steps: [
                    { number: 1, title: "전략 수립", description: "시장 분석 및 펀딩 전략 기획" },
                    { number: 2, title: "콘텐츠 제작", description: "상세페이지 및 홍보 자료 제작" },
                    { number: 3, title: "펀딩 오픈", description: "펀딩 오픈 및 광고 운영" },
                    { number: 4, title: "운영 관리", description: "커뮤니티 관리 및 성과 분석" }
                ],
                portfolio: ["project1", "project2", "project4"],
                pricing: [
                    {
                        name: "Basic",
                        price: "300만원~",
                        features: [
                            "상세페이지 디자인",
                            "기본 콘텐츠 제작",
                            "간단한 리터칭",
                            "2주 제작 기간"
                        ]
                    },
                    {
                        name: "Premium",
                        price: "500만원~",
                        features: [
                            "풀패키지 상세페이지",
                            "3D 모델링 포함",
                            "광고 운영 1개월",
                            "커뮤니티 관리",
                            "4주 제작 기간"
                        ],
                        featured: true
                    },
                    {
                        name: "Enterprise",
                        price: "협의",
                        features: [
                            "브랜딩 포함",
                            "영상 제작",
                            "장기 마케팅 운영",
                            "전담 매니저 배정",
                            "맞춤 제작 기간"
                        ]
                    }
                ]
            }
        }
    },
    commerce: {
        category: "커머스",
        services: {
            commerce: {
                title: "커머스 마케팅",
                description: "네이버, 쿠팡, 11번가 등 주요 플랫폼 최적화 및 광고 운영",
                features: [
                    "스마트스토어 상세페이지",
                    "쿠팡 최적화 페이지",
                    "키워드 SEO 최적화",
                    "네이버 쇼핑 광고",
                    "메타(페이스북/인스타) 광고",
                    "구글 쇼핑 광고",
                    "리뷰 관리 시스템",
                    "실시간 성과 리포팅"
                ],
                steps: [
                    { number: 1, title: "진단 분석", description: "현황 분석 및 개선점 도출" },
                    { number: 2, title: "페이지 최적화", description: "전환율 높이는 상세페이지 제작" },
                    { number: 3, title: "광고 운영", description: "타겟 광고 집행 및 최적화" },
                    { number: 4, title: "성과 분석", description: "데이터 기반 개선 및 확장" }
                ],
                portfolio: ["project3", "project8"],
                pricing: [
                    {
                        name: "Starter",
                        price: "200만원~",
                        features: [
                            "스마트스토어 상세페이지",
                            "기본 SEO 최적화",
                            "1개월 광고 운영",
                            "2주 제작 기간"
                        ]
                    },
                    {
                        name: "Professional",
                        price: "400만원~",
                        features: [
                            "다중 플랫폼 최적화",
                            "고급 SEO 최적화",
                            "3개월 광고 운영",
                            "리뷰 관리 시스템",
                            "4주 제작 기간"
                        ],
                        featured: true
                    },
                    {
                        name: "Enterprise",
                        price: "협의",
                        features: [
                            "전체 플랫폼 최적화",
                            "실시간 성과 리포팅",
                            "장기 광고 운영",
                            "전담 매니저 배정",
                            "맞춤 제작 기간"
                        ]
                    }
                ]
            }
        }
    },
    branding: {
        category: "브랜딩",
        services: {
            branding: {
                title: "브랜딩 & 디자인",
                description: "차별화된 브랜드 아이덴티티 구축",
                features: [
                    "브랜드 네이밍",
                    "로고 디자인",
                    "패키지 디자인",
                    "브랜드 가이드라인",
                    "명함/리플렛 디자인",
                    "SNS 콘텐츠 디자인",
                    "브랜드 필름 제작",
                    "홈페이지 디자인"
                ],
                steps: [
                    { number: 1, title: "리서치", description: "시장 및 경쟁사 분석" },
                    { number: 2, title: "컨셉 도출", description: "브랜드 아이덴티티 정립" },
                    { number: 3, title: "디자인 개발", description: "로고 및 디자인 시스템 구축" },
                    { number: 4, title: "적용 확장", description: "다양한 매체로 확장 적용" }
                ],
                portfolio: ["project6", "project3"],
                pricing: [
                    {
                        name: "Basic",
                        price: "150만원~",
                        features: [
                            "로고 디자인",
                            "기본 브랜드 가이드라인",
                            "명함 디자인",
                            "2주 제작 기간"
                        ]
                    },
                    {
                        name: "Premium",
                        price: "300만원~",
                        features: [
                            "브랜드 네이밍",
                            "로고 & 패키지 디자인",
                            "브랜드 가이드라인",
                            "SNS 콘텐츠 디자인",
                            "4주 제작 기간"
                        ],
                        featured: true
                    },
                    {
                        name: "Enterprise",
                        price: "협의",
                        features: [
                            "통합 브랜딩",
                            "브랜드 필름 제작",
                            "홈페이지 디자인",
                            "전담 매니저 배정",
                            "맞춤 제작 기간"
                        ]
                    }
                ]
            }
        }
    },
    marketing: {
        category: "마케팅",
        services: {
            marketing: {
                title: "통합 마케팅",
                description: "데이터 기반 통합 마케팅 전략",
                features: [
                    "마케팅 전략 수립",
                    "타겟 분석 및 세그멘테이션",
                    "캠페인 기획 및 운영",
                    "다채널 광고 집행",
                    "성과 분석 및 최적화",
                    "브랜드 마케팅",
                    "콘텐츠 마케팅",
                    "인플루언서 마케팅"
                ],
                steps: [
                    { number: 1, title: "전략 수립", description: "목표 설정 및 전략 기획" },
                    { number: 2, title: "캠페인 기획", description: "타겟 설정 및 메시지 개발" },
                    { number: 3, title: "광고 집행", description: "다채널 광고 운영" },
                    { number: 4, title: "최적화", description: "실시간 모니터링 및 개선" }
                ],
                portfolio: ["project5", "project2"],
                pricing: [
                    {
                        name: "Starter",
                        price: "250만원~",
                        features: [
                            "마케팅 전략 수립",
                            "1개월 광고 운영",
                            "기본 성과 분석",
                            "2주 제작 기간"
                        ]
                    },
                    {
                        name: "Professional",
                        price: "500만원~",
                        features: [
                            "통합 마케팅 전략",
                            "다채널 광고 운영",
                            "3개월 성과 분석",
                            "콘텐츠 마케팅",
                            "4주 제작 기간"
                        ],
                        featured: true
                    },
                    {
                        name: "Enterprise",
                        price: "협의",
                        features: [
                            "종합 마케팅 솔루션",
                            "장기 마케팅 운영",
                            "인플루언서 마케팅",
                            "전담 매니저 배정",
                            "맞춤 제작 기간"
                        ]
                    }
                ]
            }
        }
    }
};

// 호환성을 위한 기존 구조
const servicesData = {
    wadiz: servicesCatalog.funding.services.wadiz,
    commerce: servicesCatalog.commerce.services.commerce,
    branding: servicesCatalog.branding.services.branding,
    marketing: servicesCatalog.marketing.services.marketing
};

// 포트폴리오 데이터 가져오기
function getPortfolioData() {
    try {
        return JSON.parse(localStorage.getItem('sigProjects')) || {};
    } catch {
        return {};
    }
}

// 서비스 탭 전환
function switchService(serviceId) {
    // 탭 버튼 활성화
    document.querySelectorAll('.service-tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-service="${serviceId}"]`).classList.add('active');
    
    const service = servicesData[serviceId];
    const projects = getPortfolioData();
    
    // 서비스 내용 업데이트
    updateServiceContent(service, projects);
    
    // 가격 섹션 업데이트
    updatePricingSection(service);
}


// 서비스 상세 내용 렌더링 (기능 포함)
function updateServiceContent(service, projects) {
    const container = document.getElementById('serviceContent');
    
    // 단계별 원형 - 원 안에는 제목만, 설명은 아래에
    const stepsHtml = service.steps.map(step => `
        <div class="process-circle-wrapper">
            <div class="process-circle" data-step="${step.number}">
                <div class="circle-number">${step.number}</div>
                <div class="circle-title">${step.title}</div>
            </div>
            <div class="circle-description">
                <p>${step.description}</p>
            </div>
        </div>
    `).join('');
    
    // 제공 서비스 목록
    const featuresHtml = service.features ? `
        <div class="service-features-section">
            <h3 class="service-section-title">제공 서비스</h3>
            <ul class="service-features-list">
                ${service.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        </div>
    ` : '';
    
    // 포트폴리오 카드 - 정확히 3개만 가로 배치
    const portfolioItems = service.portfolio.slice(0, 3).map(projectId => {
        const project = projects[projectId];
        if (!project) return '';
        
        const image = project.images && project.images.length > 0 ? project.images[0] : '';
        const isGif = image && (image.toLowerCase().includes('data:image/gif') || image.toLowerCase().endsWith('.gif'));
        const imageHtml = image ? `<img src="${image}" alt="${project.title}" class="service-portfolio-image ${isGif ? 'portfolio-item-gif' : ''}">` : '';
        
        return `
            <div class="service-portfolio-card" onclick="openModal('${projectId}')">
                <div class="service-portfolio-box" style="background: ${project.gradient}">
                    ${imageHtml}
                </div>
                <h4>${project.title}</h4>
                <p>${project.tag || project.category}</p>
            </div>
        `;
    }).filter(html => html);
    
    const portfolioHtml = portfolioItems.length > 0 ? `
        <div class="service-portfolio-section">
            <h3 class="service-portfolio-title">대표 포트폴리오</h3>
            <div class="service-portfolio-grid">
                ${portfolioItems.join('')}
            </div>
        </div>
    ` : '';
    
    container.innerHTML = `
        <div class="service-header-content">
            <h2>${service.title}</h2>
            <p class="service-description">${service.description}</p>
        </div>
        
        ${featuresHtml}
        
        <div class="service-process-section">
            <h3 class="service-section-title">작업 과정</h3>
            <div class="service-process-circles">
                ${stepsHtml}
            </div>
        </div>
        
        ${portfolioHtml}
    `;
}

// 초기화
document.addEventListener('DOMContentLoaded', function() {
    // 첫 번째 서비스로 시작 (기본값)
    const defaultService = 'wadiz';
    if (document.getElementById('serviceContent')) {
        switchService(defaultService);
    }
    
    // 탭 버튼 이벤트
    document.querySelectorAll('.service-tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            switchService(this.dataset.service);
        });
    });
    
    // 초기 가격 섹션 표시
    const defaultServiceData = servicesData[defaultService];
    if (defaultServiceData && document.getElementById('pricingGrid')) {
        updatePricingSection(defaultServiceData);
    }
});

// 가격 섹션 업데이트
function updatePricingSection(service) {
    const pricingContainer = document.getElementById('pricingGrid');
    if (!pricingContainer || !service.pricing) return;
    
    const pricingHtml = service.pricing.map(pkg => `
        <div class="pricing-card ${pkg.featured ? 'featured' : ''}">
            <h3>${pkg.name}</h3>
            <div class="price">${pkg.price}</div>
            <ul>
                ${pkg.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            <a href="contact.html" class="btn">문의하기</a>
        </div>
    `).join('');
    
    pricingContainer.innerHTML = pricingHtml;
}

// 모달 열기 (portfolio.js의 함수 사용)
function openModal(projectId) {
    if (typeof window.openModal === 'function') {
        window.openModal(projectId);
    }
}

