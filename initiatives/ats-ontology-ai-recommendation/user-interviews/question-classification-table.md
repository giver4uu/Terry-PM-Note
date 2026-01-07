# 고객 질문 Intent/Cognitive 분류표

**작성일**: 2026-01-06
**총 질문 수**: 92개
**분류 기준**: Intent/Cognitive 설계 원칙 (PM용 가이드)

---

## 분류 범례

### Intent (7가지)
- `analysis`: 현황·패턴 파악
- `diagnosis`: 문제 원인 분석
- `comparison`: 차이 비교
- `forecast`: 미래 예측
- `recommendation`: 개선 방안
- `lookup`: 단순 조회
- `explanation`: 결과 해석

### Cognitive 분류
- **Dimension**: by_stage, by_job, by_recruiter, by_source
- **Metric**: count, conversion_rate, dropoff_rate, avg_duration
- **Temporal**: daily, monthly, cohort, time_series, future
- **Comparison**: vs_previous_period, vs_other_group, vs_target
- **Explanation**: summary, root_cause

---

## 대표 질문 분류 (패턴별 Top 3)

### 패턴 1: 주간/월간 정기 보고 (23개)

#### 1-1. "이번 주 1차 인터뷰 몇명이야, 포지션도 같이 알려줘"
**고객**: 페이타랩
**빈도**: 주간 반복
**분류**:
```json
{
  "intent": "lookup",
  "cognitive": {
    "metric": ["count"],
    "dimension": ["by_stage", "by_job"],
    "temporal": ["weekly"]  // ⚠️ 프레임워크에 없음
  }
}
```
**문제점**: `temporal`에 "weekly" 없음 (daily, monthly만 있음)

---

#### 1-2. "12월 4주차 공고별 진행현황 분석해줘"
**고객**: 게임듀오
**빈도**: 주간 반복
**분류**:
```json
{
  "intent": "analysis",
  "cognitive": {
    "metric": ["count"],
    "dimension": ["by_stage", "by_job"],
    "temporal": ["weekly"],
    "explanation": ["summary"]
  }
}
```
**특징**: 표 형식 요구 ("공고 / 서류검토중 / 과제중 / 면접중")

---

#### 1-3. "이번 주와 다음 주 채용 진행 현황을 정리하려고 해"
**고객**: 페이타랩
**빈도**: 주간 반복
**분류**:
```json
{
  "intent": "lookup",
  "cognitive": {
    "metric": ["count"],
    "dimension": ["by_stage", "by_job"],
    "temporal": ["weekly", "future"]  // 이번 주 + 다음 주
  }
}
```
**문제점**: "이번 주 vs 다음 주" 동시 조회 → cognitive 조합 복잡

---

### 패턴 2: 년도별/월별 비교 (9개)

#### 2-1. "2024년도 지원자 수와 2025년 지원자수 비교해줘"
**고객**: 기어세컨드
**빈도**: 1회성 (연간 리뷰)
**분류**:
```json
{
  "intent": "comparison",
  "cognitive": {
    "metric": ["count"],
    "temporal": ["yearly"],  // ⚠️ 프레임워크에 없음
    "comparison": ["vs_previous_period"],
    "explanation": ["summary"]
  }
}
```
**문제점**: `temporal`에 "yearly" 없음

---

#### 2-2. "2024년과 2025년의 합격률 차이 보여줘"
**고객**: 기어세컨드
**분류**:
```json
{
  "intent": "comparison",
  "cognitive": {
    "metric": ["conversion_rate"],
    "temporal": ["yearly"],
    "comparison": ["vs_previous_period"],
    "explanation": ["summary"]
  }
}
```

---

#### 2-3. "2024년과 2025년의 전형 단계별 탈락률 비교해줘"
**고객**: 기어세컨드
**분류**:
```json
{
  "intent": "comparison",
  "cognitive": {
    "metric": ["dropoff_rate"],
    "dimension": ["by_stage"],
    "temporal": ["yearly"],
    "comparison": ["vs_previous_period"],
    "explanation": ["summary"]
  }
}
```

---

### 패턴 3: 원인 분석 (7개)

#### 3-1. "자바 개발자 1차 면접 본 사람들 중에서 불합격 평가 받은 사람들 중 공통적인 내용이 뭐야?"
**고객**: 원티드랩
**분류**:
```json
{
  "intent": "diagnosis",
  "cognitive": {
    "metric": ["pattern"],  // ⚠️ 프레임워크에 없음 (공통 패턴 추출)
    "dimension": ["by_stage"],
    "explanation": ["root_cause"]
  }
}
```
**문제점**: "주관식 평가 내용 분석" → 텍스트 마이닝, 현재 metric에 없음

---

#### 3-2. "66일이나 걸린 케이스는 어떤 상황인지 보여줘"
**고객**: 원티드랩
**분류**:
```json
{
  "intent": "diagnosis",
  "cognitive": {
    "metric": ["avg_duration"],
    "explanation": ["root_cause", "detail"]  // ⚠️ detail 없음
  }
}
```
**문제점**: "상세 케이스 보기" → explanation에 "detail" 필요

---

#### 3-3. "불합격 86명의 주요 탈락 단계와 사유 보여줘"
**고객**: 게임듀오
**분류**:
```json
{
  "intent": "diagnosis",
  "cognitive": {
    "metric": ["dropoff_rate"],
    "dimension": ["by_stage"],
    "explanation": ["root_cause"]
  }
}
```
**특징**: 분류 가능 (현재 프레임워크로 커버)

---

### 패턴 4: 특정 지원자 조회 (14개)

#### 4-1. "서류 합격자 누구인지 알려줘"
**고객**: 페이타랩
**빈도**: 매우 높음 (질문의 15%)
**분류**:
```json
{
  "intent": "lookup",
  "cognitive": {
    "metric": ["list"],  // ⚠️ 프레임워크에 없음 (count가 아니라 이름 목록)
    "dimension": ["by_stage"]
  }
}
```
**문제점**:
- `metric`에 "list" 없음 (count는 숫자, list는 이름 배열)
- 개인정보 표시 레벨 (이름 vs 익명ID) 고려 필요

---

#### 4-2. "그로스마케터의 해당 인원 이름이 뭐야?"
**고객**: 페이타랩
**분류**:
```json
{
  "intent": "lookup",
  "cognitive": {
    "metric": ["list"],
    "dimension": ["by_job"]
  }
}
```
**UX 이슈**: "지원자 이름이 숫자라서 어떤 사람인지 알 수가 없어" → 익명화 문제

---

#### 4-3. "지금 2차 인터뷰 단계에 있는 사람 누구야?"
**고객**: 페이타랩
**분류**:
```json
{
  "intent": "lookup",
  "cognitive": {
    "metric": ["list"],
    "dimension": ["by_stage"],
    "temporal": ["current"]  // ⚠️ 프레임워크에 없음 ("현재" 시점)
  }
}
```

---

### 패턴 5: 유입 경로 분석 (11개)

#### 5-1. "유입경로별 지원자수 / 서류 합격자 수 / 서류 합격율 알려줘"
**고객**: 페이타랩
**분류**:
```json
{
  "intent": "analysis",
  "cognitive": {
    "metric": ["count", "conversion_rate"],
    "dimension": ["by_source"],
    "explanation": ["summary"]
  }
}
```
**특징**: 분류 가능 (현재 프레임워크로 완벽 커버) ✅

---

#### 5-2. "서칭 경로로 유입된 사람 몇명이야?"
**고객**: 게임듀오
**분류**:
```json
{
  "intent": "lookup",
  "cognitive": {
    "metric": ["count"],
    "dimension": ["by_source"]
  }
}
```
**특징**: 분류 가능 ✅

---

#### 5-3. "2025년 5~6월 지원자 급증의 주요 유입 채널 알려줘"
**고객**: 기어세컨드
**분류**:
```json
{
  "intent": "diagnosis",
  "cognitive": {
    "metric": ["count"],
    "dimension": ["by_source"],
    "temporal": ["monthly"],
    "explanation": ["root_cause"]
  }
}
```
**특징**: "급증 원인" = diagnosis ✅

---

## 분류 어려운 질문 (7개 - 프레임워크 확장 필요)

### ❌ 케이스 1: 복합 Intent
**질문**: "현재 포지션 중 가장 오래 오픈되어 있는 포지션이 무엇인지 알려주고 어떤 단계에서 가장 소요시간이 길었는지 알려줘" (원티드랩)

**문제**: 2개 Intent 혼재
- 전반부: `lookup` (어떤 포지션?)
- 후반부: `diagnosis` (어떤 단계가 병목?)

**현재 프레임워크**: Intent는 반드시 1개

**해결 방안**:
1. **Option A**: 주 의도인 `diagnosis`로 통합
   ```json
   {
     "intent": "diagnosis",
     "cognitive": {
       "metric": ["avg_duration"],
       "dimension": ["by_stage"],
       "explanation": ["root_cause"]
     }
   }
   ```
2. **Option B**: `compound_query` 새 Intent 추가 (PM 자유도 확장)

**권장**: Option A (diagnosis로 통합)

---

### ❌ 케이스 2: 사용법 질문
**질문**: "지원자 데이터를 추출하고 싶은데 어떻게 해?" (페이타랩)

**문제**: 분석 질문이 아니라 시스템 사용법 질문

**현재 프레임워크**: Intent 7개 중 해당 없음

**해결 방안**:
1. **Option A**: 온톨로지 질문 범위 밖 → 별도 FAQ/Help 시스템
2. **Option B**: `help` Intent 추가 (시스템 사용법)
   ```json
   {
     "intent": "help",
     "cognitive": {
       "topic": ["data_export"]  // 새로운 cognitive 분류
     }
   }
   ```

**권장**: Option A (범위 밖, 별도 처리)

---

### ❌ 케이스 3: Raw 데이터 요청
**질문**: "raw data를 줘" (힐링페이퍼)

**문제**: 분석 결과가 아니라 원본 데이터 요구

**현재 프레임워크**: `lookup`? `export`?

**해결 방안**:
1. **Option A**: `export` Intent 추가
   ```json
   {
     "intent": "export",
     "cognitive": {
       "format": ["raw", "csv", "excel"]  // 새로운 cognitive
     }
   }
   ```
2. **Option B**: `lookup`의 explanation을 "detail"로 확장
   ```json
   {
     "intent": "lookup",
     "cognitive": {
       "explanation": ["detail"]  // raw data 수준
     }
   }
   ```

**권장**: Option B (explanation 확장)

---

### ❌ 케이스 4: 후보자 매칭 (추천)
**질문**: "AI 효율화, 데이터 분석, 자동화 역량을 가진 그로스 마케터 찾아줘" (페이타랩)

**문제**:
- 분석이 아니라 "후보자 추천"
- 현재 `recommendation`은 "프로세스 개선 방안"용

**현재 프레임워크**: recommendation이 이 의미 아님

**해결 방안**:
1. **Option A**: `recommendation`의 의미 확장
   ```json
   {
     "intent": "recommendation",
     "recommendation_type": ["process", "candidate"],  // 새 필드
     "cognitive": {
       "metric": ["match_score"],  // 새 metric
       "dimension": ["by_job"]
     }
   }
   ```
2. **Option B**: `candidate_matching` 새 Intent 추가
3. **Option C**: 온톨로지 범위 밖 (UC-012 위험 시그널과 유사, Phase 2)

**권장**: Option C (범위 밖, Phase 2)

---

### ❌ 케이스 5: 용어 정의 확인
**질문**: "합격 기준은 뭐야? 왜 아무도 없어?" → "아 내가 말한 합격자수는 서류 평가 통과 (면접으로 간 사람)을 의미한거였어" (페이타랩)

**문제**: 사용자와 AI의 용어 정의 불일치

**현재 프레임워크**: Intent 해당 없음

**해결 방안**:
1. **Option A**: `explanation` Intent로 분류
   ```json
   {
     "intent": "explanation",
     "cognitive": {
       "explanation_type": ["term_definition"]  // 새 필드
     }
   }
   ```
2. **Option B**: 시스템 개선 (용어 정의 명확화, 사용자 선택)

**권장**: Option B (시스템 UX 개선, Intent 추가 불필요)

---

### ❌ 케이스 6: 데이터 정확성 검증
**질문**: "데이터가 하나도 맞지 않아, 이번 주 2차 인터뷰 어카운트 매니저(1명), 세일즈 매니저(1명) 총 2명이야" (페이타랩)

**문제**: AI 응답 오류 지적 및 재요청

**현재 프레임워크**: Intent 해당 없음

**해결 방안**:
1. **Option A**: 시스템 개선 (AI 정확도, 데이터 검증)
2. **Option B**: `verification` Intent 추가 (AI 응답 검증)

**권장**: Option A (시스템 품질 개선, Intent 추가 불필요)

---

### ❌ 케이스 7: 기간 해석 오류
**질문**: "아니 나는 2026년 1월 내를 말하는 거야!" (페이타랩)

**문제**: 사용자 의도와 AI 해석 불일치

**현재 프레임워크**: temporal cognitive 문제

**해결 방안**:
1. **Option A**: temporal cognitive 확장
   - `custom_range` 추가 (현재 없음)
   - "2026년 1월 내" = `{temporal: "monthly", year: 2026, month: 1}`
2. **Option B**: AI 파싱 개선 (프레임워크 변경 불필요)

**권장**: Option A (temporal 확장) + Option B (AI 개선)

---

## 프레임워크 개선 제안 (v2.0)

### 1. Temporal 확장 (필수)
**현재**: daily, monthly, cohort, time_series, future
**추가**:
- `weekly` ⭐ (가장 높은 빈도, 23개 질문)
- `yearly` (9개 질문)
- `current` ("현재" 시점)
- `custom_range` (특정 기간 지정)

---

### 2. Metric 확장 (필수)
**현재**: count, conversion_rate, dropoff_rate, avg_duration
**추가**:
- `list` ⭐ (이름 목록, 14개 질문)
- `pattern` (공통 패턴 추출)
- `match_score` (후보자 매칭 점수, Phase 2)

---

### 3. Explanation 확장 (권장)
**현재**: summary, root_cause
**추가**:
- `detail` (raw data 수준)
- `comparison_insight` (비교 후 인사이트)

---

### 4. 새 Intent 검토 (선택)
**추가 고려**:
- `export` (데이터 추출) → 또는 lookup 확장
- `help` (시스템 사용법) → 또는 범위 밖
- `candidate_matching` (후보자 추천) → Phase 2

**권장**: 추가하지 않음 (기존 7개로 충분, 확장 시 복잡도 증가)

---

## 분류 통계 (초기 분석)

### Intent 분포 (대표 질문 기준)
| Intent | 질문 수 (추정) | 비율 | 예시 |
|--------|--------------|------|------|
| **lookup** | ~40개 | 43% | "이번 주 몇 명?", "누구야?" |
| **analysis** | ~25개 | 27% | "현황 분석", "유입경로 분석" |
| **comparison** | ~12개 | 13% | "작년 vs 올해" |
| **diagnosis** | ~10개 | 11% | "왜 탈락률 높아?", "병목 어디?" |
| **explanation** | ~3개 | 3% | "이 결과 무슨 뜻?" |
| **recommendation** | ~1개 | 1% | 프로세스 개선 |
| **forecast** | ~1개 | 1% | 미래 예측 |

**핵심 인사이트**:
- **lookup이 압도적** (43%) → HR 담당자는 "분석"보다 "확인" 중심
- **comparison도 높음** (13%) → 경영진 보고용 (년도별, 공고별 비교)
- **forecast는 거의 없음** (1%) → 예측보다 현황 파악이 우선

---

### Cognitive 사용 빈도 (복수 선택 가능)
| Cognitive | 사용 빈도 | 예시 |
|----------|----------|------|
| **Dimension.by_stage** | 높음 | "서류검토중 / 과제중 / 면접중" |
| **Dimension.by_job** | 높음 | "포지션별" |
| **Dimension.by_source** | 중간 | "유입경로별" |
| **Dimension.by_recruiter** | 낮음 | 거의 안 쓰임 |
| **Metric.count** | 매우 높음 | "몇 명?" |
| **Metric.list** | 높음 | "누구?" (⚠️ 프레임워크에 없음) |
| **Metric.conversion_rate** | 중간 | "합격률" |
| **Temporal.weekly** | 매우 높음 | "이번 주" (⚠️ 없음) |
| **Temporal.monthly** | 중간 | "이번 달", "12월" |
| **Temporal.yearly** | 중간 | "2024 vs 2025" (⚠️ 없음) |

---

## 다음 단계

**대기 중**:
- 제리 분석 결과 (PM 전략 관점) - 진행 중
- 보리 분석 결과 (HR 실무 관점) - 진행 중

**완료 후 작업**:
1. 전문가 인사이트 통합
2. 프레임워크 v2.0 최종 제안
3. PM용 가이드 업데이트
4. 92개 전체 질문 분류표 (스프레드시트)

---

**현재 진행 상태**: 대표 질문 분류 완료, 전문가 분석 대기 중
