/**
 * Contact Form - Supabase 연동
 */

// Supabase 동적 로딩 (모듈 import 대신)
let createClient = null;

async function loadSupabase() {
    if (createClient) return;
    
    try {
        // CDN에서 동적으로 로드
        const script = document.createElement('script');
        script.type = 'module';
        script.textContent = `
            import { createClient as create } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
            window.__supabaseCreateClient = create;
        `;
        document.head.appendChild(script);
        
        // 로드 완료 대기
        await new Promise((resolve) => {
            const checkInterval = setInterval(() => {
                if (window.__supabaseCreateClient) {
                    clearInterval(checkInterval);
                    createClient = window.__supabaseCreateClient;
                    resolve();
                }
            }, 100);
            
            // 타임아웃 (5초)
            setTimeout(() => {
                clearInterval(checkInterval);
                console.warn('[Contact] Supabase 로드 실패');
                resolve();
            }, 5000);
        });
    } catch (error) {
        console.warn('[Contact] Supabase 로드 중 오류:', error);
    }
}

const SUPABASE_TABLE = 'contact_inquiries';
let supabaseClient = null;
let supabaseAvailable = false;

async function fetchSupabaseConfig() {
    // 1. 로컬 개발 환경: 로컬 스토리지에서 설정 가져오기
    try {
        const stored = localStorage.getItem('supabase_config');
        if (stored) {
            const config = JSON.parse(stored);
            if (config.url && config.anonKey) {
                console.log('[Contact] 로컬 Supabase 설정을 사용합니다.');
                return {
                    url: config.url,
                    anonKey: config.anonKey
                };
            }
        }
    } catch (error) {
        console.warn('[Contact] 로컬 스토리지에서 설정을 불러올 수 없습니다.', error);
    }
    
    // 2. config.js에서 설정 가져오기 (fallback)
    if (typeof window !== 'undefined' && window.SIGConfig) {
        const localConfig = window.SIGConfig.getLocalSupabaseConfig();
        if (localConfig && localConfig.url && localConfig.anonKey) {
            console.log('[Contact] config.js에서 Supabase 설정을 사용합니다.');
            return localConfig;
        }
    }
    
    // 3. 프로덕션 환경: API 엔드포인트에서 설정 가져오기
    try {
        const response = await fetch('/api/supabase-config');
        if (!response.ok) {
            console.warn('[Contact] API 엔드포인트를 찾을 수 없습니다. (로컬 개발 환경일 수 있습니다)');
            return null;
        }
        const data = await response.json();
        if (data?.url && data?.anonKey) {
            console.log('[Contact] API에서 Supabase 설정을 가져왔습니다.');
            return {
                url: data.url,
                anonKey: data.anonKey
            };
        }
    } catch (error) {
        // 로컬 개발 환경에서는 404가 정상입니다
        console.warn('[Contact] Supabase 설정을 불러오는 중 오류가 발생했습니다. (로컬 개발 환경일 수 있습니다)', error);
    }
    
    // 설정이 없으면 안내 메시지
    console.warn('[Contact] Supabase 설정이 없습니다. setup-supabase.html 페이지에서 설정하세요.');
    return null;
}

async function initializeSupabase() {
    const config = await fetchSupabaseConfig();
    if (!config) {
        supabaseAvailable = false;
        console.warn('⚠️ [Contact] Supabase 설정이 없어 로컬 스토리지만 사용합니다.');
        console.info('💡 [Contact] Supabase를 사용하려면:');
        console.info('   1. http://127.0.0.1:8000/setup-supabase.html 접속');
        console.info('   2. 또는 브라우저 콘솔에서:');
        console.info('      localStorage.setItem("supabase_config", JSON.stringify({url: "YOUR_URL", anonKey: "YOUR_KEY"}));');
        return;
    }

    try {
        if (!createClient) {
            await loadSupabase();
        }
        if (createClient) {
            supabaseClient = createClient(config.url, config.anonKey, {
                auth: { persistSession: false }
            });
            supabaseAvailable = true;
            console.log('[Contact] Supabase 초기화 완료');
        } else {
            supabaseAvailable = false;
            console.warn('[Contact] Supabase 클라이언트를 로드할 수 없습니다.');
        }
    } catch (error) {
        supabaseAvailable = false;
        console.warn('[Contact] Supabase 클라이언트 초기화 중 오류가 발생했습니다.', error);
    }
}

async function saveContactToSupabase(formData) {
    if (!supabaseAvailable || !supabaseClient) {
        console.warn('[Contact] Supabase를 사용할 수 없습니다. 로컬 스토리지에 저장합니다.');
        return false;
    }

    try {
        const contactData = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            company: formData.get('company') || null,
            inquiry_type: formData.get('inquiry_type'),
            budget: formData.get('budget') || null,
            message: formData.get('message'),
            created_at: new Date().toISOString(),
            status: 'new' // new, contacted, completed
        };

        const { data, error } = await supabaseClient
            .from(SUPABASE_TABLE)
            .insert([contactData])
            .select();

        if (error) {
            throw error;
        }

        console.log('[Contact] 상담 신청이 Supabase에 저장되었습니다:', data);
        return true;
    } catch (error) {
        console.error('[Contact] Supabase 저장 중 오류:', error);
        return false;
    }
}

function saveContactToLocal(formData) {
    try {
        const contacts = JSON.parse(localStorage.getItem('sigContactInquiries') || '[]');
        const contactData = {
            id: `contact-${Date.now()}`,
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            company: formData.get('company') || null,
            inquiry_type: formData.get('inquiry_type'),
            budget: formData.get('budget') || null,
            message: formData.get('message'),
            created_at: new Date().toISOString(),
            status: 'new'
        };
        contacts.push(contactData);
        localStorage.setItem('sigContactInquiries', JSON.stringify(contacts));
        console.log('[Contact] 상담 신청이 로컬 스토리지에 저장되었습니다.');
        return true;
    } catch (error) {
        console.warn('[Contact] 로컬 스토리지 저장 중 오류:', error);
        return false;
    }
}

function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        successMessage.classList.add('show');
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // 5초 후 메시지 숨기기
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
    }
}

function showErrorMessage(message) {
    // 에러 메시지 표시 (필요시 구현)
    console.error('[Contact] 오류:', message);
    alert('상담 신청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
}

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    
    // 버튼 비활성화
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = '전송 중...';
    }

    try {
        // Supabase에 저장 시도
        let saved = false;
        if (supabaseAvailable) {
            saved = await saveContactToSupabase(formData);
        }
        
        // Supabase 저장 실패 시 로컬 스토리지에 저장
        if (!saved) {
            saveContactToLocal(formData);
        }

        // 성공 메시지 표시
        showSuccessMessage();
        
        // 폼 리셋
        form.reset();
        
    } catch (error) {
        console.error('[Contact] 폼 제출 중 오류:', error);
        showErrorMessage(error.message);
    } finally {
        // 버튼 활성화
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = '상담 신청하기 →';
        }
    }
}

// 초기화
document.addEventListener('DOMContentLoaded', async function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Supabase 초기화
        await initializeSupabase();
        
        // 폼 제출 이벤트 리스너
        contactForm.addEventListener('submit', handleFormSubmit);
        
        console.log('[Contact] 상담 신청 폼이 초기화되었습니다.');
    }
});

