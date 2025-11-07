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
            notifyAuthChange();
            closeModal();
            flushPendingActions();
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
        setState(null);
        notifyAuthChange();
    }

    function updateAuthControls() {
        const buttons = document.querySelectorAll('[data-auth-control="button"]');
        const state = getState();

        buttons.forEach((button) => {
            if (!button.dataset.initialLabel) {
                button.dataset.initialLabel = button.textContent.trim() || '로그인';
            }

            if (isAdmin()) {
                button.textContent = '관리자 로그아웃';
                button.classList.add('is-admin');
                button.setAttribute('aria-pressed', 'true');
            } else {
                button.textContent = button.dataset.initialLabel;
                button.classList.remove('is-admin');
                button.setAttribute('aria-pressed', 'false');
            }
        });

        document.body.classList.toggle('auth-admin-active', isAdmin());

        const authBadge = document.querySelector('[data-auth-state="badge"]');
        if (authBadge) {
            if (isAdmin()) {
                authBadge.textContent = state?.name || '관리자';
                authBadge.classList.add('visible');
            } else {
                authBadge.textContent = '';
                authBadge.classList.remove('visible');
            }
        }
    }

    function notifyAuthChange() {
        updateAuthControls();
        const detail = {
            isAdmin: isAdmin(),
            state: getState()
        };
        document.dispatchEvent(new CustomEvent(AUTH_EVENT, { detail }));
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

    document.addEventListener('DOMContentLoaded', () => {
        ensureModal();
        bindControls();
        updateAuthControls();
        notifyAuthChange();
    });

    // 퍼블릭 API 노출
    window.SIGAuth = {
        isAdmin,
        openModal,
        logout,
        requireAdmin,
        getState
    };
})();

