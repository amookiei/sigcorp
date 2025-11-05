/**
 * Full Page Scroll with Animations
 * SIG Corporation - nasmedia.co.kr style
 */

(function() {
    'use strict';

    let currentSection = 0;
    let isScrolling = false;
    let sections = [];
    let totalSections = 0;

    // 페이지 섹션 설정
    const pageConfig = [
        {
            id: 'hero',
            bgColor: '#000000',
            animation: 'rollIn'
        },
        {
            id: 'stats',
            bgColor: '#000000',
            animation: 'fadeUp'
        },
        {
            id: 'features',
            bgColor: '#ffffff',
            animation: 'slideIn'
        },
        {
            id: 'cta',
            bgColor: '#083516',
            animation: 'scaleIn'
        }
    ];

    // 초기화
    function init() {
        // 섹션 수집
        sections = Array.from(document.querySelectorAll('.fullpage-section'));
        totalSections = sections.length;

        if (totalSections === 0) return;

        // 배경 컨테이너 생성
        createBackgroundContainer();
        
        // 인디케이터 생성
        createIndicators();
        
        // 이벤트 리스너
        setupEventListeners();
        
        // 초기 섹션 설정
        goToSection(0);
        
        // 애니메이션 초기화
        initAnimations();
    }

    // 배경 컨테이너 생성
    function createBackgroundContainer() {
        // 기존 배경 제거
        const existing = document.getElementById('fullpage-bg');
        if (existing) existing.remove();

        const bgContainer = document.createElement('div');
        bgContainer.id = 'fullpage-bg';
        bgContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -2;
            transition: background-color 1.2s cubic-bezier(0.4, 0, 0.2, 1);
            background-color: ${pageConfig[0]?.bgColor || '#000000'};
            pointer-events: none;
        `;
        document.body.insertBefore(bgContainer, document.body.firstChild);
    }

    // 우측 인디케이터 생성
    function createIndicators() {
        // 기존 인디케이터 제거
        const existing = document.getElementById('fullpage-indicators');
        if (existing) existing.remove();

        const indicatorContainer = document.createElement('div');
        indicatorContainer.id = 'fullpage-indicators';
        indicatorContainer.style.cssText = `
            position: fixed;
            right: 30px;
            top: 50%;
            transform: translateY(-50%);
            z-index: 1000;
            display: flex;
            flex-direction: column;
            gap: 15px;
        `;

        sections.forEach((section, index) => {
            const dot = document.createElement('div');
            dot.className = 'indicator-dot';
            dot.dataset.index = index;
            dot.style.cssText = `
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                cursor: pointer;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                border: 2px solid rgba(255, 255, 255, 0.5);
            `;

            dot.addEventListener('click', () => goToSection(index));
            indicatorContainer.appendChild(dot);
        });

        document.body.appendChild(indicatorContainer);
        updateIndicators(0);
    }

    // 인디케이터 업데이트
    function updateIndicators(index) {
        const dots = document.querySelectorAll('.indicator-dot');
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.style.background = '#3D9D5A';
                dot.style.transform = 'scale(1.5)';
                dot.style.borderColor = '#3D9D5A';
                dot.style.width = '16px';
                dot.style.height = '16px';
            } else {
                dot.style.background = 'rgba(255, 255, 255, 0.3)';
                dot.style.transform = 'scale(1)';
                dot.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                dot.style.width = '12px';
                dot.style.height = '12px';
            }
        });
    }

    // 이벤트 리스너 설정
    function setupEventListeners() {
        let wheelTimeout;
        let touchStartY = 0;
        let touchEndY = 0;

        // 마우스 휠
        window.addEventListener('wheel', (e) => {
            e.preventDefault();
            
            if (isScrolling) return;

            clearTimeout(wheelTimeout);
            wheelTimeout = setTimeout(() => {
                if (e.deltaY > 0) {
                    goToNext();
                } else {
                    goToPrev();
                }
            }, 100);
        }, { passive: false });

        // 터치 이벤트
        window.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        }, { passive: true });

        window.addEventListener('touchend', (e) => {
            touchEndY = e.changedTouches[0].clientY;
            const diff = touchStartY - touchEndY;
            
            if (Math.abs(diff) > 50 && !isScrolling) {
                if (diff > 0) {
                    goToNext();
                } else {
                    goToPrev();
                }
            }
        }, { passive: true });

        // 키보드
        window.addEventListener('keydown', (e) => {
            if (isScrolling) return;
            
            if (e.key === 'ArrowDown' || e.key === 'PageDown') {
                e.preventDefault();
                goToNext();
            } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                e.preventDefault();
                goToPrev();
            }
        });
    }

    // 다음 섹션으로
    function goToNext() {
        if (currentSection < totalSections - 1) {
            goToSection(currentSection + 1);
        }
    }

    // 이전 섹션으로
    function goToPrev() {
        if (currentSection > 0) {
            goToSection(currentSection - 1);
        }
    }

    // 특정 섹션으로 이동
    function goToSection(index) {
        if (isScrolling || index < 0 || index >= totalSections) return;
        
        isScrolling = true;
        currentSection = index;

        // 섹션 스크롤
        sections[index].scrollIntoView({ behavior: 'smooth', block: 'start' });

        // 배경색 변경
        const bgColor = pageConfig[index]?.bgColor || '#000000';
        const bgContainer = document.getElementById('fullpage-bg');
        if (bgContainer) {
            bgContainer.style.backgroundColor = bgColor;
        }

        // 인디케이터 업데이트
        updateIndicators(index);

        // 애니메이션 트리거
        triggerSectionAnimation(index);

        // 스크롤 잠금 해제
        setTimeout(() => {
            isScrolling = false;
        }, 1000);
    }

    // 섹션 애니메이션 트리거
    function triggerSectionAnimation(index) {
        const section = sections[index];
        const config = pageConfig[index];
        
        if (!section || !config) return;

        // 애니메이션 클래스 추가
        section.classList.add('animate-active');
        
        // 애니메이션 타입별 처리
        switch(config.animation) {
            case 'rollIn':
                createRollingCircle(section);
                break;
            case 'fadeUp':
                animateFadeUp(section);
                break;
            case 'slideIn':
                animateSlideIn(section);
                break;
            case 'scaleIn':
                animateScaleIn(section);
                break;
        }
    }

    // 굴러가는 원 애니메이션
    function createRollingCircle(section) {
        // 기존 원 제거
        const existing = section.querySelector('.rolling-circle');
        if (existing) existing.remove();

        const circle = document.createElement('div');
        circle.className = 'rolling-circle';
        circle.style.cssText = `
            position: absolute;
            width: 200px;
            height: 200px;
            border-radius: 50%;
            background: linear-gradient(135deg, #3D9D5A, #083516);
            opacity: 0.1;
            animation: roll 20s linear infinite;
            pointer-events: none;
        `;

        section.style.position = 'relative';
        section.style.overflow = 'hidden';
        section.appendChild(circle);

        // CSS 애니메이션 추가
        if (!document.getElementById('rolling-animation-style')) {
            const style = document.createElement('style');
            style.id = 'rolling-animation-style';
            style.textContent = `
                @keyframes roll {
                    0% {
                        transform: translate(-100px, -100px) rotate(0deg);
                    }
                    100% {
                        transform: translate(calc(100vw + 100px), calc(100vh + 100px)) rotate(360deg);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // 페이드 업 애니메이션
    function animateFadeUp(section) {
        const elements = section.querySelectorAll('.stat-item');
        elements.forEach((el, i) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
            setTimeout(() => {
                el.style.transition = 'all 0.6s ease';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, i * 100);
        });
    }

    // 슬라이드 인 애니메이션
    function animateSlideIn(section) {
        const cards = section.querySelectorAll('.feature-card');
        cards.forEach((card, i) => {
            card.style.opacity = '0';
            card.style.transform = 'translateX(-100px)';
            setTimeout(() => {
                card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                card.style.opacity = '1';
                card.style.transform = 'translateX(0)';
            }, i * 100);
        });
    }

    // 스케일 인 애니메이션
    function animateScaleIn(section) {
        const elements = section.querySelectorAll('h2, p, a');
        elements.forEach((el, i) => {
            el.style.opacity = '0';
            el.style.transform = 'scale(0.8)';
            setTimeout(() => {
                el.style.transition = 'all 0.5s ease';
                el.style.opacity = '1';
                el.style.transform = 'scale(1)';
            }, i * 150);
        });
    }

    // 애니메이션 초기화
    function initAnimations() {
        // 첫 번째 섹션 애니메이션
        triggerSectionAnimation(0);
    }

    // DOM 로드 완료 시 초기화
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // 전역 함수로 노출
    window.fullpageScroll = {
        goToSection,
        goToNext,
        goToPrev,
        getCurrentSection: () => currentSection
    };
})();

