# 📝 마크다운 메모장 (Next.js)

실시간 미리보기, 테마 설정, 자동 저장, GitHub 업로드 등 다양한 기능을 갖춘 **프론트엔드 마크다운 메모장**입니다.  
간단한 메모부터 코드 작성까지 편리하게 사용할 수 있는 토이 프로젝트로, 웹 환경에서 생산성을 높이는 데 도움을 줍니다.

## ✨ 주요 기능

| 기능                        | 설명 |
|-----------------------------|------|
| 🖊 실시간 미리보기          | 마크다운 입력 시 오른쪽에서 바로 HTML로 렌더링된 결과 확인 |
| 🌙 다크/라이트/커스텀 테마 | 사용자 테마 저장 및 자동 복원 |
| 💾 자동 저장                | 작성 중 자동으로 로컬스토리지에 저장 (2초 간격) |
| 💼 GitHub 업로드            | GitHub 저장소에 Personal Token으로 직접 업로드 |
| 📥 파일 다운로드/업로드     | Markdown 파일로 다운로드 및 기존 파일 업로드 |
| 📋 템플릿 불러오기          | 자주 사용하는 마크다운 양식을 템플릿으로 불러오기 |
| ⌨️ 단축키 지원             | `Ctrl+S` 또는 `Cmd+S`로 수동 저장 가능 |
| 📱 모바일 최적화           | 반응형 레이아웃으로 다양한 화면 크기 지원 |

---

## 🛠 사용된 기술

- [Next.js 13+](https://nextjs.org/) – React 기반 프레임워크
- [Tailwind CSS](https://tailwindcss.com/) – 유틸리티 기반 CSS 프레임워크
- [marked](https://github.com/markedjs/marked) – Markdown → HTML 변환
- GitHub REST API – 파일 업로드 기능
- LocalStorage – 자동 저장 및 테마 저장
- TypeScript – 정적 타입 적용 (일부 모듈)

---

## 📦 폴더 구조
📁 project-root ├── components # 에디터, 미리보기, 테마, 컨트롤 등 UI 구성 ├── pages # index.tsx (메인 페이지) ├── styles # Tailwind 글로벌 스타일 ├── utils # 다운로드, 업로드, GitHub API, 템플릿 관리

---

## 🖥 설치 및 실행 방법

1. 프로젝트 클론
bash
git clone https://github.com/your-username/markdown_note.git
cd markdown_note

npm install

npm run dev

http://localhost:3000


---

## 향후 추가예정 기능

- GitHub OAuth 인증 연동

- 버전 관리 기능 (히스토리)

- 마크다운 파일을 PDF로 변환

- 커스텀 템플릿 생성 및 저장 기능

- Markdown Linting