# Assumptions

이 폴더는 opportunities와 솔루션의 리스크를 줄이는 동안 생성된 assumption logs 및 테스트 계획을 저장합니다.

## 📄 파일 명명
- `assumptions-[opportunity-name]-[YYYY-MM-DD].md`

## 🧭 출처
- `@frameworks/continuous-discovery-habits/indentify-and-test-assumptions.mdc` 사용
- 산출물은 프레임워크의 Output 섹션에 따라 여기에 저장되어야 함

## ✅ 제안된 구조
```markdown
# Assumptions — [Opportunity Name]

## Story Map Snapshot
- 위험한 순간을 드러내는 행위자 및 주요 단계

## Assumption Log
| ID | Category | Assumption | Evidence | Importance | Evidence Known | LoFA |

## Assumption Map (요약)
- 우상단 LoFA 우선순위

## Test Cards (LoFA)
- 가설, 시뮬레이션, 방법, 대상, n & window, 성공 기준, 다음 단계

## Results and Decisions
- 우리가 배운 것과 다음에 변경할 것
```

## 🔁 워크플로우
1. `opportunities/`의 우선순위 지정된 opportunity에서 시작
2. 여기에 assumptions 파일을 생성하고 LoFA assumptions 식별
3. 최소 실행 가능 테스트 실행; 결과 및 결정 기록
4. 증거에 기반하여 아이디어/opportunities 업데이트

---
Keep assumptions positive, specific, and tied to observable behavior.
