/**
 * Supabase 설정 파일
 * 로컬 개발 시 이 파일을 수정하세요
 */

// 로컬 개발용 Supabase 설정
// Supabase 대시보드 > Settings > API에서 확인하세요
const LOCAL_SUPABASE_CONFIG = {
    url: '', // 예: 'https://xxxxx.supabase.co'
    anonKey: '' // 예: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
};

// 로컬 스토리지에서 설정 불러오기 (우선순위 높음)
function getLocalSupabaseConfig() {
    try {
        const stored = localStorage.getItem('supabase_config');
        if (stored) {
            const config = JSON.parse(stored);
            if (config.url && config.anonKey) {
                return config;
            }
        }
    } catch (error) {
        console.warn('[Config] 로컬 스토리지에서 설정을 불러올 수 없습니다.', error);
    }
    
    // 로컬 스토리지에 없으면 파일의 기본값 사용
    if (LOCAL_SUPABASE_CONFIG.url && LOCAL_SUPABASE_CONFIG.anonKey) {
        return LOCAL_SUPABASE_CONFIG;
    }
    
    return null;
}

// 로컬 스토리지에 설정 저장
function saveLocalSupabaseConfig(url, anonKey) {
    try {
        localStorage.setItem('supabase_config', JSON.stringify({
            url: url,
            anonKey: anonKey
        }));
        console.log('[Config] Supabase 설정이 저장되었습니다.');
        return true;
    } catch (error) {
        console.error('[Config] 설정 저장 중 오류:', error);
        return false;
    }
}

// 전역으로 노출 (다른 파일에서 사용 가능)
if (typeof window !== 'undefined') {
    window.SIGConfig = {
        getLocalSupabaseConfig,
        saveLocalSupabaseConfig,
        LOCAL_SUPABASE_CONFIG
    };
}

