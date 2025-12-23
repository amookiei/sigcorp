#!/usr/bin/env python3
"""
SIG Corporation - 간단한 로컬 서버
Python 3.x가 필요합니다.
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # CORS 헤더 추가
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def log_message(self, format, *args):
        # 로그 메시지 포맷팅
        print(f"[{self.log_date_time_string()}] {format % args}")

def main():
    # 현재 디렉토리로 이동
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    print("=" * 50)
    print("SIG Corporation - 로컬 서버")
    print("=" * 50)
    print(f"\n서버가 시작되었습니다!")
    print(f"URL: http://localhost:{PORT}")
    print(f"\n서버를 중지하려면 Ctrl+C를 누르세요\n")
    print("-" * 50)
    
    try:
        with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
            # 자동으로 브라우저 열기
            try:
                webbrowser.open(f'http://localhost:{PORT}')
            except:
                pass
            
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\n서버가 종료되었습니다.")
        sys.exit(0)
    except OSError as e:
        if e.errno == 10048:  # Windows: 포트가 이미 사용중
            print(f"\n[오류] 포트 {PORT}가 이미 사용중입니다.")
            print("다른 포트를 사용하거나 기존 서버를 종료하세요.")
        else:
            print(f"\n[오류] 서버 시작 실패: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()

