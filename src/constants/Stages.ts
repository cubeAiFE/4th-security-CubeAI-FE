export interface TopicItem {
  text: string;
}

export interface Topic {
  number: number;
  title: string;
  items: TopicItem[];
}

export interface Stage {
  id: number;
  icon: string;
  title: string;
  subtitle: string;
  topics: Topic[];
  gradient: string;
  headerColor: string;
}

export const stages: Stage[] = [
  {
    id: 1,
    icon: '🌱',
    title: 'AI의 개념 잡기',
    subtitle: '기초 이론',
    gradient: 'from-green-500 to-green-600',
    headerColor: 'border-green-500',
    topics: [
      {
        number: 1,
        title: 'AI란 무엇인가?',
        items: [{ text: '인공지능 vs 머신러닝 vs 딥러닝' }, { text: 'AI가 하는 일은 무엇인가?' }],
      },
      {
        number: 2,
        title: 'AI 텍스트 종류',
        items: [
          { text: '이미지 분류' },
          { text: '감정 분석' },
          { text: '추천 시스템' },
          { text: '생성 AI (텍스트/이미지 등)' },
          { text: '숫자 예측 (회귀 등)' },
        ],
      },
      {
        number: 3,
        title: 'AI 학습 흐름',
        items: [
          { text: '데이터 수집 → 전처리 → 학습 → 예측 → 평가' },
          { text: '지도학습 vs 비지도학습' },
          { text: '모델 성능 평가 기준(정확도 등)' },
        ],
      },
      {
        number: 4,
        title: 'AI 모델 설명',
        items: [
          { text: '선경망 기본 구조 (입력층, 은닉층, 출력층)' },
          { text: 'MLP vs CNN vs RNN 개요' },
          { text: 'CNN이 왜 이미지에 강한가? (시각적 도식 제공)' },
        ],
      },
    ],
  },
  {
    id: 2,
    icon: '🍃',
    title: '데이터 전처리 배우기',
    subtitle: '실전 준비',
    gradient: 'from-blue-500 to-blue-600',
    headerColor: 'border-blue-500',
    topics: [
      {
        number: 1,
        title: '이미지 데이터 구조 이해',
        items: [
          { text: '픽셀, RGB, 그레이스케일' },
          { text: 'MNIST 구조 이해 (28x28 흑백 이미지, 0~9 숫자 라벨)' },
        ],
      },
      {
        number: 2,
        title: '전처리의 이유',
        items: [
          { text: '노이즈 제거, 정규화, 차원 축소' },
          { text: '왜 원본 그대로 학습하면 안 되는가' },
        ],
      },
      {
        number: 3,
        title: '전처리 실습 툴북',
        items: [
          { text: '이미지 크기 맞추기 (Resize)' },
          { text: '픽셀 정규화 (0~1 사이)' },
          { text: '라벨 변환 (One-hot encoding)' },
          { text: '학습/검증 데이터 분할 (Train/Test split)' },
        ],
      },
    ],
  },
  {
    id: 3,
    icon: '🌿',
    title: '모델 구조 만들기',
    subtitle: '모델 설계',
    gradient: 'from-purple-500 to-purple-600',
    headerColor: 'border-purple-500',
    topics: [
      {
        number: 1,
        title: 'CNN의 핵심 구조',
        items: [
          { text: 'Convolution Layer (필터, 커널, 스트라이드)' },
          { text: 'Pooling Layer (Max, Avg)' },
          { text: 'Flatten & Dense Layer' },
        ],
      },
      {
        number: 2,
        title: '레이어 역할 및 순서',
        items: [{ text: 'Conv → ReLU → Pool → Conv → ReLU → Pool → Flatten → Dense → Softmax' }],
      },
      {
        number: 3,
        title: '모델 설계 실습',
        items: [{ text: '레이어 순서 드래그 맞추기 퀴즈' }],
      },
    ],
  },
  {
    id: 4,
    icon: '🍎',
    title: '학습 및 실험',
    subtitle: '파라미터 조정',
    gradient: 'from-orange-500 to-orange-600',
    headerColor: 'border-orange-500',
    topics: [
      {
        number: 1,
        title: ' 학습과정 이해',
        items: [
          { text: '에포크, 배치 크기, 손실함수, 옵티마이저' },
          { text: '학습 vs 테스트 개념' },
        ],
      },
      {
        number: 2,
        title: '파라미터 조정 실습',
        items: [
          { text: 'Epoch 수 조정' },
          { text: 'Learning Rate 설정' },
          { text: 'Optimizer 선택 (SGD, Adam 등)' },
        ],
      },
      {
        number: 3,
        title: '학습 실행 & 시각화',
        items: [
          { text: '학습 그래프 확인 (정확도, 손실 추이)' },
          { text: '테스트 정확도 표시' },
          { text: '오답 예시 보기' },
        ],
      },
      {
        number: 4,
        title: '모델 성능 향상 실험',
        items: [
          { text: 'Dropout 적용 실험' },
          { text: '에포크 수 증감 비교' },
          { text: '커널 수 조절 효과 비교' },
        ],
      },
    ],
  },
];
