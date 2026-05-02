/**
 * Tax Escape - Core Data Storage
 * Contains the decision tree mapping and the content database.
 */

const TAX_GUIDE_STRUCTURE = {
  "tax_guide": {
    "personal": {
      "title": "개인 세금",
      "icon": "👤",
      "items": [
        {"id": "p1", "name": "종합소득세 신고 방법", "tags": ["프리랜서", "5월", "직장인알바"], "url": "#p1"},
        {"id": "p2", "name": "연말정산 완벽 가이드", "tags": ["직장인", "13월의월급", "공제"], "url": "#p2"},
        {"id": "p3", "name": "프리랜서 세금 신고 방법", "tags": ["3.3%", "작가", "개발자", "강사"], "url": "#p3"},
        {"id": "p4", "name": "세금 환급 받는 법", "tags": ["경정청구", "삼쩜삼", "미수령환급금"], "url": "#p4"}
      ]
    },
    "business": {
      "title": "사업자 세금",
      "icon": "🏢",
      "items": [
        {"id": "b1", "name": "법인세 계산 & 신고", "tags": ["법인", "대표이사", "결산"], "url": "#b1"},
        {"id": "b2", "name": "사업자 경비 처리 방법", "tags": ["카드등록", "접대비", "복리후생비"], "url": "#b2"},
        {"id": "b3", "name": "세금계산서 발행 방법", "tags": ["홈택스", "공인인증서", "매출"], "url": "#b3"}
      ]
    },
    "savings": {
      "title": "절세 & 공제",
      "icon": "💰",
      "items": [
        {"id": "s1", "name": "소득공제 항목 총정리", "tags": ["인적공제", "신용카드", "전통시장"], "url": "#s1"},
        {"id": "s2", "name": "세액공제 항목 총정리", "tags": ["월세공제", "연금저축", "자녀세액"], "url": "#s2"},
        {"id": "s3", "name": "부동산 세금 줄이는 법", "tags": ["양도세", "취득세", "1주택자"], "url": "#s3"},
        {"id": "s4", "name": "증여 & 상속세 절세 전략", "tags": ["가족증여", "공제한도", "사전증여"], "url": "#s4"}
      ]
    }
  }
};

const TAX_DATA_CONTENT = [
  {
    "id": "p1",
    "category": "개인 세금",
    "title": "종합소득세 신고 방법",
    "title_en": "How to Report Comprehensive Income Tax",
    "content": "1. 대상: 작년 한 해 소득이 있는 모든 개인 (직장인 알바 포함).\n2. 기간: 매년 5월 1일 ~ 5월 31일.\n3. 방법: 홈택스 접속 > 신고/납부 > 종합소득세 > '모두채움' 서비스 이용 시 간편 신고 가능.",
    "content_en": "1. Target: Individuals with income last year.\n2. Period: May 1st - May 31st.\n3. Method: Hometax > Reporting > Comprehensive Income Tax.",
    "tags": ["5월", "홈택스", "필수"]
  },
  {
    "id": "p3",
    "category": "개인 세금",
    "title": "프리랜서 세금 신고 방법",
    "title_en": "Freelancer Tax Reporting Guide",
    "content": "1. 원천징수: 수입의 3.3%를 미리 떼고 받음.\n2. 장부작성: 수입이 적으면 '간편장부', 많으면 '복식부기' 의무 발생.\n3. 팁: 업무 관련 식비, 교통비, 통신비는 모두 필요경비로 인정 가능.",
    "content_en": "1. Withholding: 3.3% taken in advance.\n2. Bookkeeping: Simple or Double-entry depending on income.\n3. Tip: Meals, transport, and telecom can be business expenses.",
    "tags": ["3.3%", "경비처리", "알바"]
  },
  {
    "id": "b2",
    "category": "사업자 세금",
    "title": "사업자 경비 처리 방법",
    "title_en": "Business Expense Management",
    "content": "1. 카드: 사업용 신용카드를 홈택스에 반드시 등록.\n2. 항목: 임차료, 인건비, 비품 구입비, 접대비(한도 내).\n3. 주의: 가사 관련 비용(개인 장보기 등)을 경비로 넣으면 가산세 위험.",
    "content_en": "1. Card: Register business credit card on Hometax.\n2. Items: Rent, labor, equipment, entertainment.\n3. Caution: No personal expenses allowed.",
    "tags": ["카드등록", "절세", "사업자"]
  },
  {
    "id": "s1",
    "category": "절세 & 공제",
    "title": "소득공제 항목 총정리",
    "title_en": "Income Deduction Summary",
    "content": "1. 인적공제: 부양가족 1명당 150만 원.\n2. 신용카드: 총급여의 25% 초과분부터 공제 시작 (전통시장/대중교통 추가 공제).\n3. 주택: 청약저축 납입액의 40% 공제.",
    "content_en": "1. Personnel: 1.5M KRW per dependent.\n2. Credit Card: Starts after 25% of gross salary.\n3. Housing: 40% of housing subscription savings.",
    "tags": ["연말정산", "가족", "카드"],
    "premium_info": "맞벌이 부부 절세 팁: 소득이 높은 쪽으로 인적공제를 몰아주는 것이 일반적이나, 의료비/신용카드는 소득이 낮은 쪽이 유리할 수 있으니 시뮬레이션 필수."
  },
  {
    "id": "s4",
    "category": "절세 & 공제",
    "title": "증여 & 상속세 절세 전략",
    "title_en": "Gift & Inheritance Tax Strategy",
    "content": "1. 증여공제: 배우자 6억, 성인 자녀 5천만 원(10년 합산).\n2. 사전증여: 재산 가치가 오르기 전에 미리 증여하는 것이 유리.\n3. 기간: 상속 전 10년 이내 증여는 상속재산에 합산됨을 주의.",
    "content_en": "1. Deduction: 600M for spouse, 50M for adult children.\n2. Advance Gift: Better to gift before asset value rises.\n3. Caution: Gifts within 10 years are included in inheritance.",
    "tags": ["재테크", "가족", "상속"],
    "premium_info": "자녀 증여 팁: 10년 주기 공제를 활용해 태어나자마자 2천만 원, 10세 2천만 원, 20세 5천만 원 식으로 증여하면 성인 시점까지 9천만 원을 비과세로 증여 가능합니다."
  },
  {
    "id": "p2",
    "category": "개인 세금",
    "title": "연말정산 완벽 가이드",
    "title_en": "Year-end Settlement Guide",
    "content": "1. 일정: 매년 1월 ~ 2월 (회사 일정에 따름).\n2. 핵심: 간소화 서비스 자료 다운로드 및 누락된 영수증(안경, 교복 등) 직접 제출.\n3. 전략: 총급여의 25% 초과분부터 공제되므로 전략적 카드 소비 필요.",
    "content_en": "1. Period: Jan - Feb.\n2. Key: Use 'Simplified Service' and submit missing receipts.\n3. Strategy: Optimize card spending.",
    "tags": ["13월의월급", "공제", "연말"]
  },
  {
    "id": "p4",
    "category": "개인 세금",
    "title": "세금 환급 받는 법",
    "title_en": "How to Get Tax Refund",
    "content": "1. 경정청구: 지난 5년 내 못 받은 환급금을 다시 청구 가능.\n2. 미수령 환급금: 홈택스 '환급금 찾기' 메뉴에서 즉시 조회.\n3. 삼쩜삼 등 서비스: 복잡한 신고가 어렵다면 사설 서비스를 이용해 간편하게 조회 가능.",
    "content_en": "1. Rectification: Claim missed refunds from the last 5 years.\n2. Unclaimed: Search 'Find My Refund' on Hometax.\n3. Services: Use third-party apps for easy lookup.",
    "tags": ["경정청구", "환급", "꿀팁"],
    "premium_info": "국세청 환급금 조회 공식 링크: https://www.hometax.go.kr/ (조회/발급 > 기타조회 > 환급금찾기). 팁: 경정청구는 세무사 대행 시 환급액의 10~20% 수수료가 발생하나 직접 홈택스에서 진행 시 0원입니다."
  },
  {
    "id": "b1",
    "category": "사업자 세금",
    "title": "법인세 계산 & 신고",
    "title_en": "Corporate Tax Filing",
    "content": "1. 대상: 영리법인 및 비영리법인.\n2. 기간: 사업연도 종료일로부터 3개월 이내 (대부분 3월 말).\n3. 서류: 재무상태표, 포괄손익계산서, 세무조정계산서 등 필수 제출.",
    "content_en": "1. Target: For-profit and Non-profit corporations.\n2. Period: Within 3 months of fiscal year-end.\n3. Documents: Balance sheet, P&L, Tax adjustments.",
    "tags": ["법인", "대표", "결산"]
  },
  {
    "id": "b3",
    "category": "사업자 세금",
    "title": "세금계산서 발행 방법",
    "title_en": "How to Issue Tax Invoices",
    "content": "1. 준비: 공동인증서(사업자용) 또는 보안카드.\n2. 발행: 홈택스 > 전자(세금)계산서 > 발급.\n3. 마감: 공급일 다음 달 10일까지 발행 완료해야 가산세 없음.",
    "content_en": "1. Prep: Joint certificate or security card.\n2. Issue: Hometax > Electronic Tax Invoice.\n3. Deadline: Must issue by the 10th of the following month.",
    "tags": ["홈택스", "매출", "증빙"]
  },
  {
    "id": "s2",
    "category": "절세 & 공제",
    "title": "세액공제 항목 총정리",
    "title_en": "Tax Credit Summary",
    "content": "1. 월세공제: 연간 750만 원 한도 내 15~17% 공제.\n2. 연금저축: 연 최대 600만 원(IRP 포함 900만 원) 납입액에 대해 공제.\n3. 자녀: 만 8세 이상 자녀당 세액 공제 혜택.",
    "content_en": "1. Monthly Rent: 15-17% credit up to 7.5M.\n2. Pension: Credit for savings up to 6M (9M with IRP).\n3. Children: Credits for children aged 8+.",
    "tags": ["월세", "연금저축", "자녀"],
    "premium_info": "월세 세액공제 주의사항: 전입신고가 필수이며, 집주인의 동의는 필요 없습니다. 확정일자가 없어도 공제 가능합니다."
  },
  {
    "id": "s3",
    "category": "절세 & 공제",
    "title": "부동산 세금 줄이는 법",
    "title_en": "Real Estate Tax Strategies",
    "content": "1. 취득세: 생애 최초 주택 구입 시 감면 혜택 확인.\n2. 양도세: 1주택자 비과세 요건(2년 보유 등) 충족 확인.\n3. 종부세: 공동명의 전환 등을 통한 기본 공제액 극대화.",
    "content_en": "1. Acquisition: Exemptions for first-time buyers.\n2. Transfer: Non-taxable for 1-house owners (2yr hold).\n3. Comprehensive: Joint ownership for higher deductions.",
    "tags": ["부동산", "아파트", "양도세"],
    "premium_info": "상생임대인 제도 활용: 임대료 인상률 5% 이내 유지 시 거주요건 2년 없이도 양도세 비과세 혜택 가능(기한 확인 요망)."
  }
];

const TAX_MBTI_QUESTIONS = [
  {
    "id": "type",
    "question": "당신은 누구인가요?",
    "options": [
      {"label": "직장인", "value": "employee"},
      {"label": "프리랜서", "value": "freelancer"},
      {"label": "사업자", "value": "business"}
    ]
  },
  {
    "id": "income",
    "question": "연 소득이 어떻게 되나요?",
    "options": [
      {"label": "2,400만원 미만", "value": "low"},
      {"label": "2,400만원 ~ 7,500만원", "value": "mid"},
      {"label": "7,500만원 초과", "value": "high"}
    ]
  },
  {
    "id": "concern",
    "question": "현재 가장 고민인 것은?",
    "options": [
      {"label": "환급", "value": "refund"},
      {"label": "경비처리", "value": "expense"},
      {"label": "증여/상속", "value": "inheritance"}
    ]
  }
];

// Exporting for both browser and workers
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TAX_GUIDE_STRUCTURE, TAX_DATA_CONTENT, TAX_MBTI_QUESTIONS };
} else if (typeof exports !== 'undefined') {
  exports.TAX_GUIDE_STRUCTURE = TAX_GUIDE_STRUCTURE;
  exports.TAX_DATA_CONTENT = TAX_DATA_CONTENT;
  exports.TAX_MBTI_QUESTIONS = TAX_MBTI_QUESTIONS;
}
