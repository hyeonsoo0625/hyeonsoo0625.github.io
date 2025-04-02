## Enhancing Novel Object Detection via Cooperative Foundational Models

# Introduction
현재 Object Detection 분야는 Mask-RCNN과 DETR 등 close-set 패러다임으로 작동한다. 실제 환경에서는 object class가 긴 꼬리의 분포를 가지고 있다. 따라서 이러한 train data을 넘어 일반화 할 수 있는 open-set detector의 개발이 중요하다.
`RNCDL`은 supervised / self-supervised learning을 포함한 train pipeline을 통해 NOD를 다룬다. 그럼에도 불구하고 `RNCDL`은 추가 validation set 없이 새로운 category에 label을 할당할 수 있는 능력이 부족하고, 실제 응용을 위한 성능이 부족하다.

최근에는 CLIP과 같은 VLMs을 사용하여 detection 능력을 일반화한다. 예를 들어, GLIP, Grounding DINO는 language와 vision을 세밀하게 연결해 text 입력을 통해 detection을 달성했다. 하지만 이는 환경 및 재정적 비용을 수반한다.

이 연구에서는 CLIP과 SAM과 같은 foundational model의 장점을 활용해 기존 closed-set detector을 open-set detector로 전환한다. 이 연구는 Mask-RCNN에 의해 식별된 background box와 함께 CLIP의 zero-shot classification을 사용해 새로운 class label과 confidence score를 결정한다.
이 연구의 기여로 다음과 같다.
1. CLIP과 SAM을 사용해 foundational model의 장점을 활용해 closed-set detector를 open-set detector로 변환
2. 알려진 class와 새로운 class의 AP를 향상시키기 위한 SOTA open-set detector와 통합할 수 있는 modular 설계
3. COCO와 LVIS dataset에 대해 SOTA 기술과 비교해 접근 방법의 효과성 입증 및 ablation은 제안된 접근 방식과 그 구성요소의 장점을 보여줌

# Related Work
최근 object detection 분야는 미리 정의된 class 외에서 object를 검출하는 문제를 해결하지 못했다.
- GCD

Vision Transformer와 contrastive learning을 활용해 새로운 class를 식별하고 overfitting 문제를 해결

- OpenLDN

유사한 목표를 채택해 이미지 유사성과 bi-level optimization을 활용해 새로운 class instance를 clustering

- PromptCAL

visual prompt를 사용해 학습과 class 발견을 향상시키는 contrastive learning을 도입

- VOS

virtual outliers를 합성해 알려진 object와 알려지지 않은 object를 구별

- ViLD, OV-DETR, BARON

Vision-Language Model로부터 지식을 증류해 region embedding을 VLM 특징과 align을 수행

- CORA

DETR 기반 framework에서 region prompting과 anchor-free matching을 결합해 정제

- GLIP, GDINO

자연어를 활용해 detection 능력을 확장


하지만 위 모델들은 상당한 재정적, 환경적 비용이 초래된다. 반면 이 모델은 pre-training된 foundational model의 상호보완적인 장점을 이용해 광범위한 훈련 없이도 SOTA를 달성하였고, GDINO와 같은 기존 SOTA open-set detector와 결합해 전체 성능을 향상시킬 수 있다.

# Novel Object Detection
이 연구는 train 중 관찰된 class와 분포가 inference 동안 관찰되는 분포와 다르다고 가정한다. 이 연구의 목표는 inference시 알려진 category와 새로운 category의 object를 식별하고 각 object에 의미론적으로 label을 할당한다.

training dataset으로 다음과 같이 정의된다.

$$
D_{train} = \{(x_i, y_i)\}^N_{i=1} \in X \times Y_{train}
$$

이때, $x_i \in R^{3 \times h \times w}$는 입력 이미지, $y_i = \{(b_j, c_j)\}^L_{j=1}$에서 $b_j \in R^4$은 bounding box, $c_j \in C^{known}$은 class label을 나타낸다.

test dataset으로 다음과 같이 정의된다.

$$
D_{test} = \{(x_i, y_i)\}^M_{i=1} \in X \times Y_{test}
$$

이때, $Y_{test} \supset Y_{train}$을 만족하고, testing class label인 $c_j$는 C \supset C_{known}에 속할 수 있다.

기존 Mask-RNN과 DETR은 closed-set detector이므로, 새로운 object를 탐지하기 위해서는 Grounding DINO에서 DINO에 자연어를 도입하여 open-set 일반화에 성공하였다. 이는 category name 또는 class 형태로 된 자연어 입력을 처리해 이미지 내의 임의의 object를 탐지한다.

### Approach Overview
이 연구에서 closed-set detector을 CLIP과 SAM과 같은 foundational model을 이용해 open-set detector로 전환한다.
이를 위해 Mask-RCNN을 이용해 background object를 localize하고, 보이지 않은 class에 대한 CLIP의 이해를 활용해 새로운 object class를 찾는다. 이후, bounding box는 SAM의 instance mask-to-box 능력을 이용해 정제한다.

접근 방식으로 3가지 stage가 있다.
1. Initialization
complementary off-the-shelf detector(Mask-RCNN, Grounding DINO)로부터 object bounding box를 얻는다.

Complementary off-the-shelf detector는 주어진 object detection task에서 기존의 사전 학습된 detection 모델을 보완하는 방식으로 사용되는 detector
{:.note}

2. Unknown Object Labelling
pre-training된 language-image model인 CLIP에 의해 label이 없는 background bounding box를 처리

3. Refinement
detection된 box는 SAM을 이용해 정제

## Preliminaries
### Contrastive Language-Image Pre-training (CLIP)
CLIP은 이중 encoder 아키텍처를 포함하고 text encoder와 image encoder는 각각 $F_t^{(CLIP)}$, $F_i^{(CLIP)}$으로 표현된다. 훈련 시 N개의 image-text set batch를 이용해 훈련하고, image embedding인 $\phi_i \in R^d$와 $\phi_t \in R^d$를 정렬한다.
zero-shot classification을 위해 이미지 $x$와 $|C|$개의 고유 class 집합이 주어지면 template $T(\cdot)$를 이용해 $|C|$개의 text prompt를 생성한다. ("a photo of a [CLASS]"). 이때, [CLASS] token을 target dataset의 각 class 이름으로 변경한다.
이 textual descriptors인 $\Phi_t = F_t^{(CLIP)}(T(C))$가 되고, image는 $\phi_i = F_i^{(CLIP)}(x)$가 된다. 이때 다음과 같이 계산하여 예측 class를 구한다.

$$
\phi_i^T \Phi_t \in R^{1 \times |C|}
$$

이때, 예측된 class는 해당 score가 가장 높은 class가 된다.

### Segment Anything Model (SAM)
SAM은 class-agnostic image segmentation 모델이다. 이는 3가지 기본 모듈로 구성된다.
- image encoder $F_i^{(SAM)}$
- prompt encoder $F_p^{(SAM)}$
- mask decoder $G_m^{(SAM)}$

input image x와 prompts 집합인 $P = \{p_1, ..., p_M\}$에 대해 SAM은 segmentation mask인 $\{m_1, ..., m_M\}$와 이에 해당하는 confidence score인 $S^{(SAM)} = \{s_1^{(SAM)}, ..., s_M^{(SAM)}$를 생성한다.

프롬프트 $P$는 points, bounding boxes, rough masks들을 조합하여 구성된다. 이는 $F_p^{(SAM)}$를 통해 embedding 후, prompt embedding $\phi_p$를 생성

Image $x$는 $F_i^{(SAM)}$를 통해 image embedding $\phi_i$를 생성

이후, 두 prompt embedding, image embedding은 결합되어 $G_m^{(SAM)}$로 정달되어 정제된 segmentation mask $m$과 score $s^{(SAM)}$을 생성한다.

<img src="../images/CFM/SAM.png" />

### Grounding DINO (GDINO)
GDINO는 object detection을 위한 tranformer 기반 DETR 아키텍처를 사용한다. Visual backbone으로 Swin Transformer를 사용하고 textual encoding으로 BERT를 사용한다.
image $$x$$와 class name인 $$C$$를 결합하여 고정된 수의 (num_query=900) bounding box인 $$\{b_i^{(GD)}\}^{num\_query}_{i=1}$$와 각각에 해당하는 $$\{s_i^{(GD)}\}^{num\_query}_{i=1}$$, class label $$\{c_i^{(GD)} \in C\}^{num\_query}_{i=1}$$가 주어진다.

## Cooperative Foundational Models for NOD
### Initialization
1. Mask-RCNN과 GDINO를 이용해 bounding box를 초기화\
이는 각 detector의 약점을 보완하기 위해 결합
- Mask-RCNN은 언어적 단서를 통합하지 않음
- DETR은 예측된 bounding box가 제한적 (ex. num_query)