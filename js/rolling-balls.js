/**
 * Rolling Balls Animation
 * SIG Corporation - nasmedia.co.kr style
 */

(function() {
    'use strict';

    let balls = [];
    let animationId = null;
    let container = null;

    // 공 생성
    function createBall(type) {
        const ball = document.createElement('div');
        ball.className = `rolling-ball ball-${type}`;
        
        const size = Math.random() * 80 + 80; // 80-160px
        const direction = Math.random() > 0.5 ? 1 : -1; // 왼쪽에서 오는지 오른쪽에서 오는지
        const startX = direction > 0 ? -size : window.innerWidth + size;
        const startY = Math.random() * (window.innerHeight - size * 2) + size;
        
        ball.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            left: ${startX}px;
            top: ${startY}px;
            pointer-events: auto;
            cursor: pointer;
            transition: transform 0.2s ease;
        `;

        // 타입별 스타일
        switch(type) {
            case 'stroke':
                ball.style.cssText += `
                    background: transparent;
                    border: 3px solid white;
                    mix-blend-mode: screen;
                `;
                break;
            case 'green':
                ball.style.cssText += `
                    background: #3D9D5A;
                    border: none;
                    mix-blend-mode: difference;
                `;
                break;
            case 'white':
                ball.style.cssText += `
                    background: white;
                    border: none;
                    mix-blend-mode: difference;
                `;
                break;
        }

        // 초기 속도 (양쪽에서 오도록)
        ball.vx = direction * (Math.random() * 1.5 + 1); // 기본 속도
        ball.vy = (Math.random() - 0.5) * 1;
        ball.rotation = 0;
        ball.rotationSpeed = (Math.random() - 0.5) * 8;
        ball.hovered = false;
        ball.type = type;
        ball.baseSpeed = Math.abs(ball.vx);

        container.appendChild(ball);
        balls.push(ball);

        // 마우스 이벤트
        ball.addEventListener('mouseenter', () => {
            ball.hovered = true;
            const rect = ball.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // 마우스 위치로 가속 방향 결정
            const handleMouseMove = (e) => {
                const dx = e.clientX - centerX;
                const dy = e.clientY - centerY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 200) {
                    ball.vx = (dx / distance) * 8;
                    ball.vy = (dy / distance) * 8;
                    ball.rotationSpeed *= 2;
                }
            };
            
            document.addEventListener('mousemove', handleMouseMove);
            ball._mouseMoveHandler = handleMouseMove;
        });

        ball.addEventListener('mouseleave', () => {
            ball.hovered = false;
            if (ball._mouseMoveHandler) {
                document.removeEventListener('mousemove', ball._mouseMoveHandler);
            }
            ball.rotationSpeed = (Math.random() - 0.5) * 8;
        });

        return ball;
    }

    // 애니메이션 루프
    function animate() {
        balls.forEach((ball, index) => {
            if (!ball.parentElement) {
                balls.splice(index, 1);
                return;
            }

            const rect = ball.getBoundingClientRect();
            const speed = ball.hovered ? 12 : ball.baseSpeed; // 호버 시 가속

            // 위치 업데이트
            const newX = rect.left + ball.vx * speed;
            const newY = rect.top + ball.vy * speed;

            // 회전
            ball.rotation += ball.rotationSpeed;
            
            // 화면 밖으로 나가면 제거
            if (newX < -300 || newX > window.innerWidth + 300 || 
                newY < -300 || newY > window.innerHeight + 300) {
                if (ball._mouseMoveHandler) {
                    document.removeEventListener('mousemove', ball._mouseMoveHandler);
                }
                ball.remove();
                balls.splice(index, 1);
                // 새로운 공 생성
                setTimeout(() => {
                    const types = ['stroke', 'green', 'white'];
                    createBall(types[Math.floor(Math.random() * 3)]);
                }, 2000);
                return;
            }

            ball.style.left = newX + 'px';
            ball.style.top = newY + 'px';
            ball.style.transform = `rotate(${ball.rotation}deg)`;
        });

        animationId = requestAnimationFrame(animate);
    }

    // 마우스 호버 감지 (전역)
    function setupHoverDetection() {
        // 마우스 이동 시 근처 공들에 영향
        document.addEventListener('mousemove', (e) => {
            balls.forEach(ball => {
                if (ball.hovered) return; // 이미 호버된 공은 제외
                
                const rect = ball.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const dx = e.clientX - centerX;
                const dy = e.clientY - centerY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    ball.hovered = true;
                    const force = (120 - distance) / 120;
                    ball.vx = (dx / distance) * 8 * force;
                    ball.vy = (dy / distance) * 8 * force;
                    ball.rotationSpeed *= 3;
                }
            });
        });
    }

    // 초기화
    function init() {
        container = document.getElementById('stats-banner');
        if (!container) return;

        // 공 컨테이너 생성
        const ballContainer = document.createElement('div');
        ballContainer.id = 'rolling-balls-container';
        ballContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            pointer-events: none;
            z-index: 1;
        `;
        container.appendChild(ballContainer);
        container = ballContainer;

        // 초기 공 생성 (3-5개)
        const initialCount = 3 + Math.floor(Math.random() * 3);
        const types = ['stroke', 'green', 'white'];
        
        for (let i = 0; i < initialCount; i++) {
            setTimeout(() => {
                createBall(types[Math.floor(Math.random() * types.length)]);
            }, i * 500);
        }

        // 애니메이션 시작
        animate();

        // 호버 감지 설정
        setupHoverDetection();

        // 주기적으로 새 공 생성
        setInterval(() => {
            if (balls.length < 5) {
                const types = ['stroke', 'green', 'white'];
                createBall(types[Math.floor(Math.random() * types.length)]);
            }
        }, 5000);
    }

    // DOM 로드 완료 시 초기화
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        setTimeout(init, 100);
    }
})();

