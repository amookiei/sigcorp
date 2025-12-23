/**
 * Global Authentication Utilities
 * - 간단한 관리자 로그인 상태 관리 (로컬 스토리지)
 * - 헤더 로그인/로그아웃 버튼 및 인증 연동
 */

(function() {
    const STORAGE_KEY = 'sigAuthState';
    const AUTH_EVENT = 'sig-auth-changed';
    const ADMIN_ROLE = 'admin';
    const ADMIN_EMAIL = 'admin@sigcorp.com';
    const ADMIN_PASSWORD = 'sig0802!';
    const ADMIN_NAME = 'SIG 관리자';

    const pendingAdminActions = [];
    let authModal;
    let authForm;
    let emailInput;
    let passwordInput;
    let errorBox;

    function getState() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch (error) {
            console.warn('[SIGAuth] 저장된 인증 상태를 읽는 중 오류가 발생했습니다.', error);
            return null;
        }
    }

    function setState(state) {
        if (!state) {
            localStorage.removeItem(STORAGE_KEY);
            return;
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }

    function isAdmin() {
        const state = getState();
        return !!(state && state.role === ADMIN_ROLE);
    }

    function ensureModal() {
        if (authModal) return;

        authModal = document.createElement('div');
        authModal.id = 'authModal';
        authModal.className = 'auth-modal';
        authModal.innerHTML = `
            <div class="auth-modal-backdrop" data-auth-close></div>
            <div class="auth-modal-content" role="dialog" aria-labelledby="authModalTitle">
                <button type="button" class="auth-modal-close" data-auth-close aria-label="닫기">×</button>
                <div class="auth-modal-header">
                    <div>
                        <p class="auth-modal-eyebrow">SIG 관리자 전용</p>
                        <h2 id="authModalTitle">관리자 로그인</h2>
                        <p class="auth-modal-subtitle">등록된 관리자 계정으로 로그인하면 블로그 작성 및 포트폴리오 관리 도구를 사용할 수 있습니다.</p>
                    </div>
                </div>
                <form class="auth-form" id="authForm">
                    <label for="authEmail">이메일</label>
                    <input type="email" id="authEmail" placeholder="admin@sigcorp.com" required>
                    <label for="authPassword">비밀번호</label>
                    <input type="password" id="authPassword" placeholder="비밀번호를 입력하세요" required>
                    <p class="auth-error" id="authError" aria-live="polite"></p>
                    <button type="submit" class="auth-submit">로그인</button>
                </form>
                <p class="auth-hint">* 데모 계정: admin@sigcorp.com / sig0802!</p>
            </div>
        `;

        document.body.appendChild(authModal);

        authForm = document.getElementById('authForm');
        emailInput = document.getElementById('authEmail');
        passwordInput = document.getElementById('authPassword');
        errorBox = document.getElementById('authError');

        authModal.querySelectorAll('[data-auth-close]').forEach((el) => {
            el.addEventListener('click', closeModal);
        });

        authModal.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeModal();
            }
        });

        authForm.addEventListener('submit', handleSubmit);
    }

    function openModal() {
        ensureModal();
        authModal.classList.add('active');
        document.body.classList.add('auth-modal-open');
        clearError();
        if (emailInput) {
            emailInput.value = ADMIN_EMAIL;
            emailInput.focus();
            emailInput.select();
        }
        if (passwordInput) {
            passwordInput.value = '';
        }
    }

    function closeModal() {
        if (!authModal) return;
        authModal.classList.remove('active');
        document.body.classList.remove('auth-modal-open');
    }

    function clearError() {
        if (errorBox) {
            errorBox.textContent = '';
        }
    }

    function showError(message) {
        if (errorBox) {
            errorBox.textContent = message;
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        clearError();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!email || !password) {
            showError('이메일과 비밀번호를 모두 입력해주세요.');
            return;
        }

        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            setState({
                role: ADMIN_ROLE,
                email: ADMIN_EMAIL,
                name: ADMIN_NAME,
                loggedInAt: new Date().toISOString()
            });
            closeModal();
            notifyAuthChange();
            flushPendingActions();
            
            // 로그인 성공 알림
            alert('✅ 관리자 로그인에 성공했습니다!');
        } else {
            showError('로그인 정보가 올바르지 않습니다. 다시 확인해주세요.');
        }
    }

    function flushPendingActions() {
        if (!pendingAdminActions.length) return;
        const actions = pendingAdminActions.splice(0, pendingAdminActions.length);
        actions.forEach((callback) => {
            if (typeof callback === 'function') {
                try {
                    callback();
                } catch (error) {
                    console.error('[SIGAuth] 보류된 관리자 작업 실행 중 오류', error);
                }
            }
        });
    }

    function logout() {
        if (confirm('관리자 모드에서 로그아웃하시겠습니까?')) {
            setState(null);
            notifyAuthChange();
            alert('로그아웃되었습니다.');
        }
    }

    function updateAuthControls() {
        const buttons = document.querySelectorAll('[data-auth-control="button"]');
        const state = getState();
        const adminActive = isAdmin();

        buttons.forEach((button) => {
            if (!button.dataset.initialLabel) {
                button.dataset.initialLabel = button.textContent.trim() || '로그인';
            }

            if (adminActive) {
                button.textContent = '관리자 로그아웃';
                button.classList.add('is-admin');
                button.setAttribute('aria-pressed', 'true');
            } else {
                button.textContent = button.dataset.initialLabel;
                button.classList.remove('is-admin');
                button.setAttribute('aria-pressed', 'false');
            }
        });

        // body에 관리자 클래스 추가/제거
        document.body.classList.toggle('auth-admin-active', adminActive);

        const authBadge = document.querySelector('[data-auth-state="badge"]');
        if (authBadge) {
            if (adminActive) {
                authBadge.textContent = state?.name || '관리자';
                authBadge.classList.add('visible');
            } else {
                authBadge.textContent = '';
                authBadge.classList.remove('visible');
            }
        }

        // 블로그 글쓰기 버튼 표시/숨김
        const createButton = document.getElementById('openBlogEditor');
        if (createButton) {
            createButton.style.display = adminActive ? 'flex' : 'none';
        }

        // 포트폴리오 관리자 트리거 버튼 표시/숨김
        const adminTrigger = document.getElementById('adminTrigger');
        if (adminTrigger) {
            adminTrigger.style.display = adminActive ? 'flex' : 'none';
        }

        // 포트폴리오 편집 버튼들 표시/숨김
        document.querySelectorAll('.portfolio-item-edit-btn').forEach(btn => {
            btn.style.display = adminActive ? 'flex' : 'none';
        });

        // 블로그 포스트 액션 버튼 표시/숨김
        document.querySelectorAll('.blog-card-actions').forEach(actions => {
            actions.style.display = adminActive ? 'block' : 'none';
        });
    }

    function notifyAuthChange() {
        updateAuthControls();
        const detail = {
            isAdmin: isAdmin(),
            state: getState()
        };
        document.dispatchEvent(new CustomEvent(AUTH_EVENT, { detail }));
        
        console.log('[SIGAuth] 인증 상태 변경:', detail);
    }

    function requireAdmin(callback) {
        if (isAdmin()) {
            if (typeof callback === 'function') {
                callback();
            }
            return;
        }

        if (typeof callback === 'function') {
            pendingAdminActions.push(callback);
        }

        openModal();
    }

    function bindControls() {
        // 로그인 버튼은 숨겨져 있으므로 이벤트 바인딩 제거
        // 대신 로고 이스터에그 기능 추가
        
        // 로고 이스터에그: 5초 이상 누르면 로그인 창 열기
        const logo = document.querySelector('.logo, .logo-img');
        if (logo) {
            let pressStartTime = null;
            let pressTimer = null;
            
            logo.addEventListener('mousedown', function(e) {
                pressStartTime = Date.now();
                pressTimer = setTimeout(() => {
                    // 5초 이상 누르고 있으면 로그인 창 열기
                    if (Date.now() - pressStartTime >= 5000) {
                        e.preventDefault();
                        openModal();
                    }
                }, 5000);
            });
            
            logo.addEventListener('mouseup', function() {
                if (pressTimer) {
                    clearTimeout(pressTimer);
                    pressTimer = null;
                }
                pressStartTime = null;
            });
            
            logo.addEventListener('mouseleave', function() {
                if (pressTimer) {
                    clearTimeout(pressTimer);
                    pressTimer = null;
                }
                pressStartTime = null;
            });
            
            // 터치 이벤트 지원 (모바일)
            logo.addEventListener('touchstart', function(e) {
                pressStartTime = Date.now();
                pressTimer = setTimeout(() => {
                    if (Date.now() - pressStartTime >= 5000) {
                        e.preventDefault();
                        openModal();
                    }
                }, 5000);
            });
            
            logo.addEventListener('touchend', function() {
                if (pressTimer) {
                    clearTimeout(pressTimer);
                    pressTimer = null;
                }
                pressStartTime = null;
            });
            
            logo.addEventListener('touchcancel', function() {
                if (pressTimer) {
                    clearTimeout(pressTimer);
                    pressTimer = null;
                }
                pressStartTime = null;
            });
        }
        
        // 기존 로그인 버튼 이벤트는 유지 (숨겨져 있지만 관리자 로그아웃용)
        document.querySelectorAll('[data-auth-control="button"]').forEach((button) => {
            button.addEventListener('click', () => {
                if (isAdmin()) {
                    logout();
                } else {
                    openModal();
                }
            });
        });
    }

    // 페이지 로드시 초기화
    function initialize() {
        ensureModal();
        
        // DOM이 완전히 로드된 후 바인딩 (로고 요소가 있을 때)
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                bindControls();
                updateAuthControls();
            });
        } else {
            // 약간의 지연을 두어 모든 요소가 로드되도록
            setTimeout(() => {
                bindControls();
                updateAuthControls();
            }, 100);
        }
        
        // 초기 상태 알림
        if (isAdmin()) {
            console.log('[SIGAuth] 관리자로 로그인되어 있습니다.');
        }
        
        // 다른 모듈들에게 초기 상태 알림
        setTimeout(() => {
            notifyAuthChange();
        }, 200);
    }

    // DOM 로드 완료시 초기화
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }

    // 퍼블릭 API 노출
    window.SIGAuth = {
        isAdmin,
        openModal,
        logout,
        requireAdmin,
        getState
    };
})();
