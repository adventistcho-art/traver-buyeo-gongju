# 백제 비밀 탐험대

초등 현장학습용 부여·공주 탐험 앱입니다.

- `index.html` : 탐험 화면 (이야기·미션·게임)
- `web/` : Next.js (탐험 화면을 띄우고 `/api`를 Nest로 전달)
- `api/` : NestJS + Prisma(SQLite) — 계정·진도 저장

## 로컬에서 계정 이어서 하기

터미널 두 개를 켭니다.

```bash
npm run db:push
npm run dev:api
```

```bash
npm run dev:web
```

브라우저에서 http://localhost:3000 을 엽니다.

1. 이름·학교·비밀번호(4자리 이상)로 **탐험 출발하기**
2. 다음에 같은 이름·학교·비밀번호로 **이어가기**
3. 본 막, 퀴즈 답, 탐험 일지가 저장됩니다

API만 켜 둔 채 `index.html`을 열어도 `http://localhost:4000`으로 저장합니다.
