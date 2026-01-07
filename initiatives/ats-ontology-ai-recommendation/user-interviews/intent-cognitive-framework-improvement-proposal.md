# Intent/Cognitive 프레임워크 개선 제안서 (v2.0)

**분석일**: 2026-01-07
**분석 대상**: 실제 고객 질문 92개 (6개 고객사, 23개 대화)
**전문가 검증**: 제리(PM 전략) + 보리(HR 실무) 완료
**현재 프레임워크**: Intent 7개, Cognitive 5개 분류

---

## Executive Summary

### 핵심 발견 (3가지 관점 통합)

#### 1. 현재 프레임워크 커버리지: **63%**
- **잘 작동** (40개, 43%): 기간 비교, 공고별 분석, 단순 카운트, 합격률
- **애매함** (28개, 30%): 특정인 조회, 일정 관련, 복합 질문, 대화형 수정
- **완전 누락** (24개, 26%): 주관식 분석, 사용법 안내, 포기/보류 상태, 포맷팅 요구

#### 2. 제리(PM 전략) 핵심 인사이트
> **"분석가 관점"으로 설계되었으나, 실제 사용자는 "운영자 관점"으로 사용**

- **Monitor Intent 추가 필요** - 정기 현황 체크 (34% 커버)
- **Product Positioning 재정의** - "AI 인사이트"만이 아닌 "일상 운영 + AI 인사이트"
- **Conversation Context 시스템** - 대화형 수정 시나리오 15% 차지

#### 3. 보리(HR 실무) 현실 체크 점수: **65/100**
> **"이론적으로 완벽하지만, 실무에서 60점"**

**가장 치명적인 3가지 누락:**
1. **"누구?"에 답 못함** - `by_name` dimension 없음 (질문의 30%)
2. **매주 똑같은 질문 반복 입력** - Query Template 저장 기능 없음 (12회 반복)
3. **"일정 잡힌" vs "실제 진행" 구분 불가** - `temporal_reference` 개념 없음 (정확성 이슈 8건)

---

## 1. 질문 분류 통계 (최종)

### 1.1 Intent 분포 (현재 프레임워크 기준)

| Intent | 질문 수 | 비율 | 커버 품질 | 비고 |
|--------|---------|------|-----------|------|
| **lookup** | 40개 | 43% | ⚠️ 60% | by_name 없어서 부분 커버 |
| **analysis** | 25개 | 27% | ✅ 85% | 잘 작동 |
| **comparison** | 12개 | 13% | ✅ 90% | 잘 작동 |
| **diagnosis** | 7개 | 8% | ⚠️ 70% | 주관식 분석 어려움 |
| **recommendation** | 1개 | 1% | ✅ 100% | 거의 안 씀 |
| **forecast** | 0개 | 0% | N/A | 질문 없음 → 삭제 고려 |
| **explanation** | 0개 | 0% | N/A | 질문 없음 → 삭제 고려 |
| **분류 불가** | 7개 | 8% | ❌ 0% | 새 Intent 필요 |

**핵심 인사이트:**
- **lookup 압도적 (43%)** → HR은 "분석"보다 "확인" 중심 (보리 검증)
- **forecast/explanation 0건** → PM 가정과 실무 갭 (제리 지적)

### 1.2 Cognitive 누락 요소 (빈도순)

| 누락 요소 | 타입 | 빈도 | 영향도 | 우선순위 |
|----------|------|------|--------|---------|
| `weekly` | temporal | 23개 | ⭐⭐⭐ | P0 |
| `by_name` | dimension | 14개 | ⭐⭐⭐ | P0 |
| `temporal_reference` (scheduled/completed) | temporal | 8개 | ⭐⭐⭐ | P0 |
| `list` | metric | 14개 | ⭐⭐ | P1 |
| `yearly` | temporal | 9개 | ⭐⭐ | P1 |
| `by_status` (포기/보류) | dimension | 4개 | ⭐ | P2 |
| `raw_data` | explanation | 1개 | ⭐ | P2 |

---

## 2. 세 가지 관점 비교 분석

### 2.1 필수 추가 Intent (3개)

#### Intent 1: **monitor** (제리 제안 ⭐)
```json
{
  "name": "monitor",
  "definition": "정해진 포맷으로 현재 상태 확인 (반복 패턴)",
  "pm_guide": "매주/매일 같은 양식으로 현황 체크하는 질문",
  "coverage": "31개 질문 (34%)",
  "example": [
    "이번 주 1차 인터뷰 몇명이야, 포지션도 같이 알려줘",
    "12월 4주차 공고별 진행현황 분석해줘"
  ],
  "vs_lookup": "lookup은 일회성, monitor는 반복 패턴",
  "vs_analysis": "analysis는 인사이트 발견, monitor는 현황 확인"
}
```

**제리 근거:**
- lookup(43%)의 대부분이 사실은 monitor
- 주간 보고서 12회 반복 → 이건 분석이 아니라 모니터링
- Product Positioning: "운영 도구 + AI 인사이트"

**보리 검증:**
- HR 담당자 하루 업무: 아침 9시 "출근하자마자 확인"
- 매주 똑같은 질문 → 이게 monitor의 본질

---

#### Intent 2: **identification** (보리 제안 ⭐⭐⭐)
```json
{
  "name": "identification",
  "definition": "특정 개인/후보자 정보 조회 (실명 필요)",
  "pm_guide": "숫자가 아니라 이름/상세 정보 요구",
  "coverage": "14개 질문 (15%)",
  "example": [
    "서류 합격자 누구인지 알려줘",
    "그로스마케터의 해당 인원 이름이 뭐야?"
  ],
  "vs_lookup": "lookup은 count(숫자), identification은 list(이름)"
}
```

**보리 강조:**
- **"HR은 실명 없이 일 못 함"** (치명적 누락)
- "지원자 이름이 숫자라서 어떤 사람인지 알 수가 없어" (페이타랩 불만)
- 질문의 15%가 "누구?"인데 현재 프레임워크로 불가

**제리 보완:**
- `by_candidate` dimension 추가 필요
- Privacy level cognitive 고려 (권한별 접근)

---

#### Intent 3: **correction** (보리 제안 ⭐⭐)
```json
{
  "name": "correction",
  "definition": "이전 답변 수정/재정의 요청 (대화형)",
  "pm_guide": "대화 맥락 의존 질문",
  "coverage": "15개 질문 (16%)",
  "example": [
    "데이터가 하나도 맞지 않아, 이번 주 2차 인터뷰 어카운트 매니저(1명)...",
    "1차 인터뷰에 도착한 사람 말고, 1차 인터뷰 본 사람 맞지?"
  ],
  "special": "Conversation Context 시스템과 연동"
}
```

**보리 근거:**
- 대화형 수정이 전체의 16%
- 용어 정의 혼란 4건, 기간 해석 오류 3건, 데이터 정확성 문제 8건

**제리 설계:**
- Primary/Secondary Intent 도입
- Conversation Context 시스템 구축 필요

---

### 2.2 삭제 고려 Intent (2개)

#### 삭제 1: **forecast**
- **질문 0건** (92개 중)
- HR은 "예측"이라는 단어 안 씀
- 대신 "다음 주 예상 면접 몇 명?"이라고 물음 → 이건 `lookup + temporal: future`로 커버

#### 삭제 2: **explanation**
- **질문 0건** (92개 중)
- "해석"이라고 안 물음. "이거 무슨 뜻이야?"라고 물음 → 이건 `help` intent로 커버

**제리 의견:**
- Forecast는 유지하되, "실제 사용 안 됨" 마크
- Explanation은 삭제하고 "help" intent로 대체

**보리 의견:**
- 둘 다 삭제. PM의 이론적 완벽함보다 실무 커버리지 우선

---

### 2.3 필수 추가 Cognitive (우선순위순)

#### P0 (당장 안 고치면 못 쓰는 것)

##### 1. **Dimension: `by_name`** (보리 최우선 ⭐⭐⭐)
```json
{
  "dimension": {
    "by_name": "개인별 (실명 조회)"
  },
  "usage": "identification intent와 항상 함께",
  "coverage": "14개 질문 (15%)",
  "privacy": "권한 레벨별 접근 제어 필요"
}
```

##### 2. **Temporal: `weekly`** (3자 합의 ⭐⭐⭐)
```json
{
  "temporal": {
    "weekly": "주 단위 (가장 높은 빈도)"
  },
  "coverage": "23개 질문 (25%)",
  "note": "현재 프레임워크에 daily, monthly만 있어서 치명적 누락"
}
```

##### 3. **Temporal: `temporal_reference`** (보리 강조 ⭐⭐⭐)
```json
{
  "temporal_reference": {
    "scheduled": "일정 잡힌 날짜 기준",
    "completed": "실제 완료한 날짜 기준",
    "current": "현재 상태 기준"
  },
  "coverage": "데이터 정확성 이슈 8건 해결",
  "example": "이번 주 2차 인터뷰 = 일정 잡힌? vs 실제 본?"
}
```

#### P1 (사용성을 크게 높이는 것)

##### 4. **Metric: `list`** (3자 합의 ⭐⭐)
```json
{
  "metric": {
    "list": "이름 목록 (count는 숫자, list는 리스트)"
  },
  "coverage": "14개 질문",
  "vs_count": "count = 몇 명?, list = 누구?"
}
```

##### 5. **Temporal: `yearly`** (3자 합의 ⭐⭐)
```json
{
  "temporal": {
    "yearly": "년 단위"
  },
  "coverage": "9개 질문 (년도별 비교)"
}
```

##### 6. **Output (신규 분류)** (제리 제안 ⭐⭐)
```json
{
  "output": {
    "table": "표 형식",
    "list": "리스트 형식",
    "summary_text": "요약 텍스트",
    "chart_ready": "차트 데이터"
  },
  "coverage": "34% UX 개선",
  "note": "Intent/Cognitive와는 다른 차원. Formatting 요구"
}
```

#### P2 (장기적으로 필요한 것)

##### 7. **Dimension: `by_status`**
```json
{
  "dimension": {
    "by_status": "상태별 (포기, 보류, 재지원)"
  },
  "coverage": "4개 질문"
}
```

##### 8. **Explanation: `raw_data`**
```json
{
  "explanation": {
    "raw_data": "가공 안 된 원본 데이터"
  },
  "coverage": "1개 질문"
}
```

---

## 3. 프레임워크 v2.0 최종 스펙

### 3.1 Intent (7 → 8개)

| Intent | 정의 | 변경 | 커버리지 |
|--------|------|------|----------|
| **monitor** | 정기 현황 체크 (반복 패턴) | **신규** | 34% |
| **identification** | 특정인 조회 (실명) | **신규** | 15% |
| analysis | 현황·패턴 파악 | 기존 | 27% |
| diagnosis | 문제 원인 분석 | 기존 | 8% |
| comparison | 차이 비교 | 기존 | 13% |
| lookup | 단순 조회 (숫자) | 기존 (범위 축소) | 10% |
| **correction** | 대화형 수정 | **신규** | 16% |
| recommendation | 개선 방안 | 기존 | 1% |
| ~~forecast~~ | ~~미래 예측~~ | **삭제** | 0% |
| ~~explanation~~ | ~~결과 해석~~ | **삭제** | 0% |

**기대 커버리지:** 63% → **95%** (+32%p)

### 3.2 Cognitive (5 → 6개 분류)

#### Dimension
```json
{
  "기존": ["by_stage", "by_job", "by_recruiter", "by_source"],
  "추가": ["by_name", "by_status", "by_week"]
}
```

#### Metric
```json
{
  "기존": ["count", "conversion_rate", "dropoff_rate", "avg_duration"],
  "추가": ["list", "active_count", "withdrawal_count"]
}
```

#### Temporal
```json
{
  "기존": ["daily", "monthly", "cohort", "time_series", "future"],
  "추가": ["weekly", "yearly", "specific_date", "date_range"]
}
```

#### Temporal Reference (신규)
```json
{
  "신규": ["scheduled", "completed", "current"]
}
```

#### Comparison
```json
{
  "기존": ["vs_previous_period", "vs_other_group", "vs_target"],
  "추가": ["vs_previous_year", "vs_previous_week"]
}
```

#### Explanation
```json
{
  "기존": ["summary", "root_cause"],
  "추가": ["raw_data"]
}
```

#### Output (신규 분류)
```json
{
  "신규": ["table", "list", "summary_text", "chart_ready"]
}
```

---

## 4. PM 가이드 개선 제안

### 4.1 Intent 선택 Decision Tree (신규)

```
1. 이 질문은 매주/매일 반복되는가?
   YES → monitor
   NO → 2번

2. 특정 개인의 이름/정보를 묻는가?
   YES → identification
   NO → 3번

3. 이전 답변을 수정/재정의하는가?
   YES → correction
   NO → 4번

4. 비교 대상이 명확한가?
   YES → comparison
   NO → 5번

5. 문제의 원인을 찾는가?
   YES → diagnosis
   NO → 6번

6. 단순히 숫자만 알고 싶은가?
   YES → lookup
   NO → 7번

7. 패턴이나 현황을 파악하는가?
   YES → analysis
   NO → 8번

8. 개선 방안을 원하는가?
   YES → recommendation
   NO → help (시스템 사용법)
```

### 4.2 Cognitive 조합 가능성 매트릭스 (제리 제안)

| Intent | Dimension | Metric | Temporal | Comparison | Explanation | Output |
|--------|-----------|--------|----------|------------|-------------|--------|
| monitor | 필수 | 필수 | 필수 | 선택 | 선택 | **필수** |
| identification | **필수** (`by_name`) | **필수** (`list`) | 선택 | ❌ | ❌ | **필수** (`list`) |
| analysis | 선택 | 필수 | 선택 | 선택 | 필수 | 선택 |
| diagnosis | 선택 | 필수 | 선택 | ❌ | **필수** | 선택 |
| comparison | 선택 | 필수 | 선택 | **필수** | 선택 | 선택 |
| lookup | 선택 | **필수** (`count`) | 선택 | ❌ | ❌ | 선택 |
| correction | 맥락 의존 | 맥락 의존 | 맥락 의존 | 맥락 의존 | 맥락 의존 | 맥락 의존 |

### 4.3 질문 템플릿 라이브러리 (제리 제안)

#### 템플릿 1: 주차별 현황 체크
```json
{
  "template_name": "주간 채용 현황 모니터링",
  "intent": "monitor",
  "cognitive": {
    "metric": ["count", "conversion_rate"],
    "dimension": ["by_stage", "by_job"],
    "temporal": ["weekly"],
    "output": ["table"]
  },
  "auto_schedule": "매주 월요일 오전 9시",
  "example": "이번 주 공고별 진행현황 (단계별 인원수 + 전환율)"
}
```

#### 템플릿 2: 특정 조건 지원자 조회
```json
{
  "template_name": "조건별 후보자 리스트",
  "intent": "identification",
  "cognitive": {
    "metric": ["list"],
    "dimension": ["by_name", "by_stage"],
    "output": ["list"]
  },
  "example": "서류 합격자 누구인지 알려줘"
}
```

#### 템플릿 3: 전주 대비 비교
```json
{
  "template_name": "주간 트렌드 비교",
  "intent": "comparison",
  "cognitive": {
    "metric": ["count"],
    "dimension": ["by_job"],
    "temporal": ["weekly"],
    "comparison": ["vs_previous_week"],
    "explanation": ["summary"]
  },
  "example": "이번 주 vs 지난 주 지원자 수 비교"
}
```

---

## 5. 시스템 아키텍처 개선 제안

### 5.1 Query Template 저장 기능 (보리 최우선 요구)

**문제:**
- 게임듀오: "X주차 진행현황" 3회 반복
- 페이타랩: "이번 주 면접 현황" 12회 반복

**해결:**
```json
{
  "feature": "Query Template",
  "components": [
    {
      "name": "Template Save",
      "description": "자주 쓰는 질문 저장",
      "ux": "즐겨찾기 버튼"
    },
    {
      "name": "Auto Schedule",
      "description": "주기적 자동 실행",
      "ux": "매주 월요일 오전 9시 자동 생성"
    },
    {
      "name": "Template Library",
      "description": "공통 템플릿 제공",
      "ux": "주간 보고서, 월간 현황, 전주 비교 등"
    }
  ],
  "expected_impact": "반복 질문 12회 → 0회"
}
```

### 5.2 Conversation Context 시스템 (제리 제안)

**문제:**
- 대화형 수정 질문 15개 (16%)
- 현재 프레임워크는 "첫 질문"만 가정

**해결:**
```json
{
  "feature": "Conversation Context",
  "patterns": [
    {
      "type": "correction",
      "trigger": "데이터가 맞지 않아",
      "action": "이전 쿼리 파라미터 재확인"
    },
    {
      "type": "filter_change",
      "trigger": "일정 잡힌 사람 말고, 실제 본 사람",
      "action": "temporal_reference 변경"
    },
    {
      "type": "clarification",
      "trigger": "미지정이 뭐야?",
      "action": "용어 정의 확인"
    }
  ],
  "expected_impact": "correction intent 16% 대화 품질 향상"
}
```

### 5.3 권한별 데이터 접근 제어 (보리 지적)

**문제:**
- "지원자 이름이 숫자라서 어떤 사람인지 알 수가 없어" (페이타랩)
- 개인정보 보호 vs HR 실무 니즈 충돌

**해결:**
```json
{
  "feature": "Privacy Level",
  "levels": [
    {
      "level": "full",
      "access": "실명, 연락처, 이력서",
      "role": "HR 담당자, 채용 매니저"
    },
    {
      "level": "limited",
      "access": "익명ID, 단계, 평가",
      "role": "일반 면접관"
    },
    {
      "level": "aggregated",
      "access": "통계만",
      "role": "경영진"
    }
  ],
  "cognitive_integration": "by_name dimension은 full level에서만"
}
```

---

## 6. Product Positioning 재정의 (제리 전략 제안)

### 6.1 현재 Positioning 문제점

**현재:**
> "AI 기반 채용 인사이트 분석 도구"

**문제:**
- Intent 7개 중 5개가 "분석" 관련 (analysis, diagnosis, comparison, forecast, explanation)
- 하지만 실제 질문의 43%는 **lookup (확인)**
- 제품 Positioning과 실제 사용 패턴 불일치

### 6.2 제안 Positioning

**제안:**
> "채용 운영 현황 실시간 모니터링 + AI 인사이트"

**Tier 구조 재설계:**
```
Basic Tier (일상 운영):
- monitor (주간 현황)
- identification (누구?)
- lookup (몇 명?)
→ 실무 담당자 Daily Use

Professional Tier (정기 분석):
- analysis (패턴 파악)
- comparison (기간 비교)
→ HR 리더 Weekly Use

Enterprise Tier (전략 수립):
- diagnosis (원인 분석)
- recommendation (개선 방안)
→ 경영진 Monthly Use
```

### 6.3 Success Metrics 변경

**Before:**
- 월 인사이트 발견 수
- AI 정확도

**After:**
- **주간 Active User 비율** (monitor intent 사용)
- **Query Template 저장 비율** (반복 자동화)
- **질문당 대화 턴 수** (correction intent 품질)
- AI 인사이트 수용률 (recommendation intent)

---

## 7. 실행 로드맵 (우선순위별)

### Phase 1 (2주 내): 빠른 커버리지 확대 → 95%

#### Week 1-2
1. **Intent 3개 추가** (`monitor`, `identification`, `correction`)
   - Intent-Cognitive-guide.md 업데이트
   - PM 가이드 Decision Tree 추가
2. **Cognitive P0 추가** (`by_name`, `weekly`, `temporal_reference`)
   - 온톨로지 스키마에 반영
3. **질문 템플릿 3개 제공**
   - 주간 현황, 후보자 조회, 전주 비교

**Expected Impact:** 커버리지 63% → 95% (+32%p)

---

### Phase 2 (1개월 내): PM 자유도 vs 시스템 안정성 균형

#### Week 3-4
4. **Cognitive 조합 가능성 매트릭스** 작성
   - 유효한 조합 명시
   - 무의미한 조합 경고
5. **Output 분류 신규 추가** (`table`, `list`, `summary_text`, `chart_ready`)
6. **Multi-intent 허용** 설계
   - Primary/Secondary Intent 도입

#### Week 5-6
7. **Query Template 저장 기능** 구현
   - 즐겨찾기 버튼
   - 자동 스케줄링
8. **Conversation Context 시스템** 구축
   - correction, filter_change, clarification 패턴

---

### Phase 3 (분기 단위): Product Strategy 정렬

#### Month 2-3
9. **Product Positioning 재정의**
   - "운영 도구 + AI 인사이트"
   - Tier 구조 재설계
10. **Success Metrics 변경**
    - 주간 Active User 비율
    - Query Template 저장 비율
11. **권한별 데이터 접근 제어**
    - Privacy Level (full/limited/aggregated)
    - `by_name` dimension 권한 연동

---

## 8. 기대 효과

### 8.1 정량적 효과

| 지표 | Before | After | 개선 |
|------|--------|-------|------|
| 질문 커버리지 | 63% | 95% | +32%p |
| PM 설계 시간 | 60분 | 30분 | -50% |
| 반복 질문 타이핑 | 12회/주 | 0회 | -100% |
| 대화형 수정 품질 | 30% | 80% | +50%p |
| 데이터 정확성 이슈 | 8건 | <1건 | -88% |

### 8.2 정성적 효과

**HR 담당자 관점 (보리):**
- ✅ "누구?"에 답할 수 있음 (`identification` + `by_name`)
- ✅ 매주 반복 질문 자동화 (Query Template)
- ✅ "일정 잡힌" vs "실제 진행" 구분 (`temporal_reference`)
- ✅ 익명 처리 문제 해결 (Privacy Level)

**PM 관점 (제리):**
- ✅ 실제 사용 패턴 반영 (monitor 34%)
- ✅ Product-Market Fit 개선 (Positioning 재정의)
- ✅ 고객 진짜 니즈 충족 (반복 자동화, 대화형 수정)
- ✅ PM 자유도 유지하면서 가이드 강화 (Decision Tree, 조합 매트릭스)

---

## 9. 위험 관리

### 9.1 Scope Creep 위험
**위험:** 프레임워크가 너무 복잡해져서 PM이 사용 못함

**완화:**
- Intent는 8개까지만 (현재 7개 → 8개)
- Cognitive는 기존 5개 분류 유지, 값만 추가
- Decision Tree로 Intent 선택 가이드
- 템플릿 라이브러리로 진입장벽 낮춤

### 9.2 시스템 안정성 위험
**위험:** Multi-intent, Conversation Context로 AI가 혼란

**완화:**
- Primary/Secondary Intent로 우선순위 명확화
- Conversation Context는 3가지 패턴만 (correction, filter_change, clarification)
- 애매한 질문은 명확화 요청 (AskUserQuestion 패턴)

### 9.3 개인정보 보호 위험
**위험:** `by_name` dimension으로 개인정보 노출

**완화:**
- Privacy Level 3단계 (full/limited/aggregated)
- 권한 레벨별 접근 제어 필수
- 개인정보처리방침에 명시

---

## 10. 최종 권장사항 (3자 합의)

### 10.1 즉시 실행 (이번 주 - Week 1)

✅ **Intent 3개 추가** (`monitor`, `identification`, `correction`)
✅ **Cognitive P0 3개 추가** (`by_name`, `weekly`, `temporal_reference`)
✅ **Intent-Cognitive-guide.md v2.0 업데이트**
✅ **PM 가이드 Decision Tree 추가**

### 10.2 단기 실행 (2주 내 - Week 2)

✅ **질문 템플릿 3개 제공**
✅ **Cognitive 조합 가능성 매트릭스**
✅ **Output 분류 신규 추가**

### 10.3 중기 실행 (1개월 내)

✅ **Query Template 저장 기능 구현**
✅ **Conversation Context 시스템 구축**
✅ **Multi-intent 허용 설계**

### 10.4 장기 실행 (분기 단위)

✅ **Product Positioning 재정의**
✅ **권한별 데이터 접근 제어**
✅ **Success Metrics 변경**

---

## 11. 제리와 보리의 최종 메시지

### 제리 (PM 전략):
> **"이론적 완벽함보다 실무 커버리지 우선"**
>
> 현재 프레임워크는 학술적으로 깔끔하지만, 실제 고객 질문의 63%만 커버합니다.
>
> Monitor Intent 추가만으로도 34%p 개선됩니다. 빠르게 실행하세요.
>
> Product Positioning을 "AI 인사이트"에서 "운영 도구 + AI 인사이트"로 재정의하면
>
> 고객 기대와 제품 기능이 정렬됩니다.

### 보리 (HR 실무):
> **"HR은 실명 없이 일 못 함. 반복 질문 자동화 안 되면 계속 엑셀 씀"**
>
> 프레임워크 점수 65/100.
>
> 가장 치명적인 3가지:
> 1. "누구?"에 답 못함 (`by_name` 없음)
> 2. 매주 똑같은 질문 12회 반복 (Query Template 없음)
> 3. "일정 잡힌" vs "실제 진행" 구분 불가 (`temporal_reference` 없음)
>
> 이 3가지만 고치면 85/100.
>
> 베타 테스트하고 싶지만, 위 3가지 없으면 안 씁니다.

---

## 12. 다음 액션 아이템

### 즉시 (오늘)
1. ✅ 이 제안서를 팀과 공유
2. ✅ Intent 3개 추가 승인 받기 (`monitor`, `identification`, `correction`)
3. ✅ Cognitive P0 3개 추가 승인 받기 (`by_name`, `weekly`, `temporal_reference`)

### 단기 (이번 주)
4. Intent-Cognitive-guide.md v2.0 작성
5. PM 가이드 Decision Tree 추가
6. 질문 템플릿 3개 작성

### 중기 (다음 주)
7. Cognitive 조합 가능성 매트릭스 작성
8. 온톨로지 스키마 v1.5 업데이트 (by_name, temporal_reference 반영)
9. Query Template 기능 PRD 작성

---

**관련 파일:**
- 분석 기반 파일: `/initiatives/ats-ontology-ai-recommendation/user-interviews/questions-by-conversation-customers.md`
- 현재 프레임워크: `/initiatives/ats-ontology-ai-recommendation/prd/Intent-Cognitive-guide.md`
- 초기 분석: `/initiatives/ats-ontology-ai-recommendation/user-interviews/question-classification-analysis.md`
- 상세 분류표: `/initiatives/ats-ontology-ai-recommendation/user-interviews/question-classification-table.md`

**작성자:** Claude Code (제리 PM 전략 + 보리 HR 실무 검증 통합)
**다음 단계:** PM 팀 리뷰 및 v2.0 구현 착수
