/**
 * Portfolio Management System
 * SIG Corporation - Admin & Portfolio Functions
 */

// ==========================================
// Data Management
// ==========================================

let projects = JSON.parse(localStorage.getItem('sigProjects')) || {
    project1: {
        title: "스마트 홈 IoT 기기",
        category: "와디즈 펀딩",
        categoryTag: "wadiz",
        icon: "🚀",
        tag: "와디즈",
        date: "2024년 3월 - 4월 (6주)",
        description: "차별화된 스토리텔링과 3D 모델링 기술을 활용하여 제품의 가치를 극대화했습니다. 사용자 시나리오 중심의 콘텐츠 구성과 전문적인 렌더링으로 펀딩 목표 2,500%를 달성했습니다.",
        gradient: "linear-gradient(135deg, #00d4aa 0%, #008f77 100%)",
        images: [],
        stats: [
            { value: "2,500%", label: "펀딩 달성률" },
            { value: "5,200만원", label: "총 펀딩액" },
            { value: "1,240명", label: "서포터 수" }
        ],
        features: [
            "3D 제품 모델링 및 렌더링",
            "사용자 시나리오 기반 스토리텔링",
            "GIF 애니메이션 30종 제작",
            "타겟 광고 CTR 6.2% 달성",
            "커뮤니티 관리 및 응대",
            "앵콜 펀딩 2회 진행"
        ]
    },
    project2: {
        title: "프리미엄 건강식품",
        category: "와디즈 펀딩 + 마케팅",
        categoryTag: "wadiz",
        icon: "💡",
        tag: "와디즈",
        date: "2024년 1월 - 2월 (4주)",
        description: "과학적 근거 기반의 콘텐츠와 타겟 광고 최적화로 CVR 25%를 달성했습니다. 업계 평균 대비 3배 높은 전환율로 성공적인 펀딩을 이끌어냈습니다.",
        gradient: "linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)",
        images: [],
        stats: [
            { value: "1,850%", label: "펀딩 달성률" },
            { value: "3,700만원", label: "총 펀딩액" },
            { value: "25%", label: "광고 CVR" }
        ],
        features: [
            "과학적 근거 중심 콘텐츠 기획",
            "타겟 광고 최적화 (CVR 25%)",
            "인플루언서 협업 콘텐츠",
            "실시간 광고 성과 모니터링",
            "A/B 테스트 기반 크리에이티브",
            "커뮤니티 관리 및 FAQ 운영"
        ]
    },
    project3: {
        title: "라이프스타일 브랜드",
        category: "스마트스토어 + 브랜딩",
        categoryTag: "commerce",
        icon: "✨",
        tag: "스마트스토어",
        date: "2024년 5월 - 7월 (10주)",
        description: "브랜드 아이덴티티 구축부터 상세페이지, 마케팅까지 통합 솔루션을 제공했습니다. 일관된 브랜드 경험으로 매출 340% 증가를 달성했습니다.",
        gradient: "linear-gradient(135deg, #a8e6cf 0%, #56ab91 100%)",
        images: [],
        stats: [
            { value: "340%", label: "매출 증가" },
            { value: "1,185%", label: "광고 ROAS" },
            { value: "4.2배", label: "재구매율" }
        ],
        features: [
            "브랜드 아이덴티티 설계",
            "로고 및 패키지 디자인",
            "상세페이지 풀패키지",
            "메타 광고 통합 운영",
            "인스타그램 콘텐츠 제작",
            "고객 리뷰 관리 시스템"
        ]
    },
    project4: {
        title: "친환경 생활용품",
        category: "와디즈 펀딩",
        categoryTag: "wadiz",
        icon: "🎯",
        tag: "와디즈",
        date: "2024년 6월 - 7월 (5주)",
        description: "ESG 가치를 강조한 감성적 스토리텔링으로 펀딩에 성공했습니다. 환경 보호 메시지와 제품 기능을 조화롭게 전달하여 앵콜 펀딩까지 진행했습니다.",
        gradient: "linear-gradient(135deg, #ffd93d 0%, #f39c12 100%)",
        images: [],
        stats: [
            { value: "3,200%", label: "펀딩 달성률" },
            { value: "6,400만원", label: "총 펀딩액" },
            { value: "2회", label: "앵콜 펀딩" }
        ],
        features: [
            "ESG 가치 중심 스토리텔링",
            "감성 비주얼 콘텐츠",
            "환경 영향 인포그래픽",
            "커뮤니티 이벤트 기획",
            "언론 보도자료 배포",
            "앵콜 펀딩 2회 성공"
        ]
    },
    project5: {
        title: "뷰티 브랜드 런칭",
        category: "퍼포먼스 마케팅",
        categoryTag: "marketing",
        icon: "🔥",
        tag: "마케팅",
        date: "2024년 4월 - 9월 (6개월)",
        description: "메타 광고 최적화로 CPC 96원을 달성, 업계 평균 대비 90% 비용 절감에 성공했습니다. 데이터 기반의 정교한 타겟팅으로 높은 ROI를 실현했습니다.",
        gradient: "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)",
        images: [],
        stats: [
            { value: "96원", label: "평균 CPC" },
            { value: "7.2%", label: "광고 CTR" },
            { value: "850%", label: "광고 ROAS" }
        ],
        features: [
            "메타 광고 CPC 96원 달성",
            "정교한 타겟 오디언스 설정",
            "크리에이티브 A/B 테스트",
            "실시간 성과 모니터링",
            "리타게팅 캠페인 운영",
            "주간 성과 리포트 제공"
        ]
    },
    project6: {
        title: "F&B 스타트업",
        category: "브랜딩 풀패키지",
        categoryTag: "branding",
        icon: "🌟",
        tag: "브랜딩",
        date: "2024년 2월 - 4월 (12주)",
        description: "로고부터 패키지, 브랜드 필름까지 완벽한 브랜드 런칭을 지원했습니다. 일관된 브랜드 경험 설계로 첫 배치 완판과 높은 재구매율을 달성했습니다.",
        gradient: "linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)",
        images: [],
        stats: [
            { value: "완판", label: "첫 배치" },
            { value: "450%", label: "재구매율" },
            { value: "4.8/5.0", label: "고객 만족도" }
        ],
        features: [
            "브랜드 네이밍 및 로고 개발",
            "패키지 디자인 (3종)",
            "브랜드 필름 제작",
            "매장 인테리어 가이드",
            "소셜미디어 콘텐츠",
            "브랜드 가이드라인 매뉴얼"
        ]
    },
    project7: {
        title: "패션 액세서리",
        category: "와디즈 펀딩",
        categoryTag: "wadiz",
        icon: "🎨",
        tag: "와디즈",
        date: "2024년 8월 - 9월 (4주)",
        description: "감각적인 비주얼과 트렌디한 스토리텔링으로 젊은 층의 호응을 이끌어냈습니다. 인플루언서 마케팅과 연계하여 바이럴 효과를 극대화했습니다.",
        gradient: "linear-gradient(135deg, #3498db 0%, #2980b9 100%)",
        images: [],
        stats: [
            { value: "2,100%", label: "펀딩 달성률" },
            { value: "4,200만원", label: "총 펀딩액" },
            { value: "980명", label: "서포터 수" }
        ],
        features: [
            "트렌디한 비주얼 콘텐츠",
            "인플루언서 협업 마케팅",
            "스타일링 가이드 제공",
            "소셜미디어 바이럴 캠페인",
            "한정판 리워드 기획",
            "패키징 디자인"
        ]
    },
    project8: {
        title: "테크 가젯",
        category: "쿠팡 + 마케팅",
        categoryTag: "commerce",
        icon: "📱",
        tag: "쿠팡",
        date: "2024년 7월 - 10월 (4개월)",
        description: "쿠팡 로켓배송 최적화와 상세페이지 개선으로 매출 620% 증가를 달성했습니다. 키워드 최적화와 광고 운영으로 검색 상위 노출을 유지했습니다.",
        gradient: "linear-gradient(135deg, #f39c12 0%, #e67e22 100%)",
        images: [],
        stats: [
            { value: "620%", label: "매출 증가" },
            { value: "TOP 3", label: "카테고리 순위" },
            { value: "4.9/5.0", label: "상품 평점" }
        ],
        features: [
            "쿠팡 최적화 상세페이지",
            "키워드 SEO 최적화",
            "쿠팡 광고 캠페인 운영",
            "리뷰 관리 시스템",
            "경쟁사 분석 및 대응",
            "프로모션 기획 및 실행"
        ]
    }
};

// ==========================================
// Storage Functions
// ==========================================

function saveProjects() {
    localStorage.setItem('sigProjects', JSON.stringify(projects));
    renderPortfolio();
}

// ==========================================
// Portfolio Rendering
// ==========================================

function renderPortfolio() {
    const grid = document.getElementById('portfolioGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    Object.keys(projects).forEach(projectId => {
        const project = projects[projectId];
        const item = document.createElement('div');
        item.className = 'portfolio-item';
        item.dataset.category = project.categoryTag;
        item.onclick = () => openModal(projectId);
        
        // 이미지가 있으면 표시, 없으면 그라데이션만 (GIF 지원)
        let imageHtml = '';
        if (project.images && project.images.length > 0) {
            const firstImage = project.images[0];
            const isGif = firstImage.toLowerCase().includes('data:image/gif') || firstImage.toLowerCase().endsWith('.gif');
            if (isGif) {
                imageHtml = `<img src="${firstImage}" alt="${project.title}" class="portfolio-item-image portfolio-item-gif">`;
            } else {
                imageHtml = `<img src="${firstImage}" alt="${project.title}" class="portfolio-item-image">`;
            }
        }
        
        item.innerHTML = `
            <div class="portfolio-box" style="background: ${project.gradient}">
                ${imageHtml}
                <div class="portfolio-box-content">
                    <span class="portfolio-tag">${project.tag}</span>
                    <h3 class="portfolio-title">${project.title}</h3>
                </div>
            </div>
        `;
        
        grid.appendChild(item);
    });
}

// ==========================================
// Filter Functions
// ==========================================

function filterProjects(category) {
    const items = document.querySelectorAll('.portfolio-item');
    const buttons = document.querySelectorAll('.filter-btn');
    
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
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
    const password = prompt('관리자 비밀번호를 입력하세요:');
    if (password === 'sig0802') {
        document.getElementById('adminPanel').classList.add('active');
        document.body.style.overflow = 'hidden';
        renderAdminPanel();
    } else if (password !== null) {
        alert('비밀번호가 올바르지 않습니다.');
    }
}

function closeAdmin() {
    document.getElementById('adminPanel').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function renderAdminPanel() {
    const container = document.getElementById('adminProjects');
    container.innerHTML = '';
    
    Object.keys(projects).forEach(projectId => {
        const project = projects[projectId];
        const card = document.createElement('div');
        card.className = 'admin-project-card';
        
        card.innerHTML = `
            <div class="admin-project-header">
                <h3>${project.icon} ${project.title}</h3>
                <div class="admin-actions">
                    <button class="admin-btn edit" onclick="toggleEdit('${projectId}')">수정</button>
                    <button class="admin-btn delete" onclick="deleteProject('${projectId}')">삭제</button>
                </div>
            </div>
            <div id="form-${projectId}" class="admin-form">
                ${generateForm(projectId, project)}
            </div>
        `;
        
        container.appendChild(card);
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
            <button class="file-remove-btn" onclick="removeImage('${projectId}', ${idx})" type="button">×</button>
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
            <div class="file-upload-area" id="${projectId}-upload-area" onclick="document.getElementById('${projectId}-file-input').click()">
                <div class="file-upload-icon">📁</div>
                <div class="file-upload-text">클릭하거나 파일을 드래그하여 업로드</div>
                <div class="file-upload-hint">이미지 파일 (JPG, PNG, GIF 등)</div>
            </div>
            <input type="file" id="${projectId}-file-input" class="file-input" accept="image/*" multiple onchange="handleFileUpload('${projectId}', this.files)">
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
        <button class="admin-save-btn" onclick="saveProject('${projectId}')">💾 저장하기</button>
    `;
}

function toggleEdit(projectId) {
    const form = document.getElementById(`form-${projectId}`);
    form.classList.toggle('active');
}

function saveProject(projectId) {
    const project = projects[projectId];
    
    // Update basic info
    project.title = document.getElementById(`${projectId}-title`).value;
    project.icon = document.getElementById(`${projectId}-icon`).value;
    project.category = document.getElementById(`${projectId}-category`).value;
    project.categoryTag = document.getElementById(`${projectId}-categoryTag`).value;
    project.tag = document.getElementById(`${projectId}-tag`).value;
    project.date = document.getElementById(`${projectId}-date`).value;
    project.gradient = document.getElementById(`${projectId}-gradient`).value;
    project.description = document.getElementById(`${projectId}-description`).value;
    
    // Update stats
    project.stats = [
        {
            value: document.getElementById(`${projectId}-s1v`).value,
            label: document.getElementById(`${projectId}-s1l`).value
        },
        {
            value: document.getElementById(`${projectId}-s2v`).value,
            label: document.getElementById(`${projectId}-s2l`).value
        },
        {
            value: document.getElementById(`${projectId}-s3v`).value,
            label: document.getElementById(`${projectId}-s3l`).value
        }
    ];
    
    // Update features
    const featuresText = document.getElementById(`${projectId}-features`).value;
    project.features = featuresText.split(',').map(f => f.trim()).filter(f => f);
    
    saveProjects();
    alert('✅ 저장이 완료되었습니다!');
    renderAdminPanel();
}

function deleteProject(projectId) {
    if (confirm('⚠️ 정말 이 프로젝트를 삭제하시겠습니까?')) {
        delete projects[projectId];
        saveProjects();
        renderAdminPanel();
        alert('🗑️ 프로젝트가 삭제되었습니다.');
    }
}

function addNewProject() {
    const newId = 'project' + (Object.keys(projects).length + 1);
    
    projects[newId] = {
        title: "새 프로젝트",
        category: "카테고리",
        categoryTag: "wadiz",
        icon: "✨",
        tag: "태그",
        date: "2024년",
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
    };
    
    saveProjects();
    renderAdminPanel();
    alert('➕ 새 프로젝트가 추가되었습니다!');
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
                    <input type="color" id="${projectId}-gradient-color1" class="gradient-color-input" value="${color1}" onchange="updateGradient('${projectId}')">
                    <div class="gradient-color-display" id="${projectId}-gradient-color1-display" style="background: ${color1}" onclick="document.getElementById('${projectId}-gradient-color1').click()"></div>
                </div>
                <label class="gradient-control-label">투명도: <span id="${projectId}-opacity1-value">${Math.round(opacity1 * 100)}%</span></label>
                <input type="range" id="${projectId}-gradient-opacity1" class="gradient-opacity-slider" min="0" max="100" value="${Math.round(opacity1 * 100)}" oninput="updateGradient('${projectId}')">
            </div>
            <div class="gradient-control-group">
                <label class="gradient-control-label">끝 색상</label>
                <div class="gradient-color-input-wrapper">
                    <input type="color" id="${projectId}-gradient-color2" class="gradient-color-input" value="${color2}" onchange="updateGradient('${projectId}')">
                    <div class="gradient-color-display" id="${projectId}-gradient-color2-display" style="background: ${color2}" onclick="document.getElementById('${projectId}-gradient-color2').click()"></div>
                </div>
                <label class="gradient-control-label">투명도: <span id="${projectId}-opacity2-value">${Math.round(opacity2 * 100)}%</span></label>
                <input type="range" id="${projectId}-gradient-opacity2" class="gradient-opacity-slider" min="0" max="100" value="${Math.round(opacity2 * 100)}" oninput="updateGradient('${projectId}')">
            </div>
            <div class="gradient-control-group">
                <label class="gradient-control-label">방향</label>
                <select id="${projectId}-gradient-angle" class="gradient-direction-select" onchange="updateGradient('${projectId}')">
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
        <button type="button" class="gradient-copy-btn" onclick="copyGradientCSS('${projectId}')">📋 CSS 복사</button>
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
    if (!files || files.length === 0) return;
    
    const project = projects[projectId];
    if (!project) return;
    
    if (!project.images) {
        project.images = [];
    }
    
    Array.from(files).forEach(file => {
        // 이미지 파일 (JPG, PNG, GIF 등) 지원
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                project.images.push(e.target.result);
                saveProjects();
                renderAdminPanel();
            };
            reader.readAsDataURL(file);
        } else {
            alert('이미지 파일만 업로드 가능합니다. (JPG, PNG, GIF 등)');
        }
    });
}

function removeImage(projectId, imageIndex) {
    const project = projects[projectId];
    if (!project || !project.images) return;
    
    if (confirm('이 이미지를 삭제하시겠습니까?')) {
        project.images.splice(imageIndex, 1);
        saveProjects();
        renderAdminPanel();
    }
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
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target.id === 'projectModal') {
                closeModal();
            }
        });
    }
    
    // Initialize portfolio on page load
    renderPortfolio();
    
    // Initialize count up animation
    initCountUpAnimation();
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