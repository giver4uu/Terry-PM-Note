# Product Analytics

이 폴더는 이 initiative에 대한 데이터 분석, metrics 추적, 정량적 인사이트를 포함합니다.

## 📁 권장 파일

### baseline-metrics.md
Initiative 구현 전 현재 상태 metrics

**포함:**
- Key performance indicators (KPIs)
- 사용자 행동 metrics
- 비즈니스 metrics
- 기술 성능 metrics
- 데이터 수집 타임스탬프

### success-metrics.md
성공이 무엇인지 정의하고 측정 방법 정의

**구조:**
```markdown
# Success Metrics

## Primary Success Metrics
- [Metric 1]: [현재 baseline] → [타겟]
- [Metric 2]: [현재 baseline] → [타겟]

## Secondary Metrics
- [보조 metric]: [현재] → [타겟]

## Counter-Metrics
- [주시할 Metric]: [허용 범위]
```

### analysis/
지속적인 데이터 분석 및 인사이트를 위한 폴더

**다음으로 구성:**
- `weekly-reports/` - 정기 metric 업데이트
- `deep-dives/` - 특정 주제에 대한 상세 분석
- `experiments/` - A/B 테스트 결과 및 학습사항

### dashboards/
주요 대시보드 및 리포트의 링크 및 스크린샷

**포함:**
- Dashboard URLs
- 주요 리포트 일정
- 데이터 소스 및 정의
- 액세스 지침

## 📊 Analytics 프레임워크

### 데이터 수집
- [ ] 이벤트 추적 구현됨
- [ ] 사용자 세그먼테이션 정의됨
- [ ] Baseline 측정 캡처됨
- [ ] Dashboard 액세스 구성됨

### 측정 주기
- **Daily**: [모니터링할 고빈도 metrics]
- **Weekly**: [정기 진행 지표]
- **Monthly**: [전략적 결과 metrics]

### 분석 프로세스
1. Baseline 데이터 수집
2. Success metrics 및 타겟 정의
3. 새로운 기능에 대한 추적 구현
4. 일일/주간 진행 상황 모니터링
5. 월간 심층 분석 수행
6. Stakeholders와 인사이트 공유

---
*Combine quantitative data with qualitative insights from user research.*
