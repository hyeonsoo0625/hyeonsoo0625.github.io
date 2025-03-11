---
layout: post
title:  "Learning Transferable Visual Models From Natural Language Supervision"
date:   2025-03-11 01:54:48 +0900
categories: cv
---
# Learning Transferable Visual Models From Natural Language Supervision

# Introduction
NLP는 지난 몇 년동안 raw text로부터 pre-training을 해왔다. text-to-text 개발은 Task-agnostic 아케텍처가 downstream dataset으로 zero-shot transfer할 수 있게 하였다.
`computer vision` 분야에서는 imageNet과 같은 crowd-labeled dataset에서 pre-training 하는 것이 관행이다.
web text로부터 확장 가능한 pre-training 방법이 computer vision에 적용하기 위해 다양한 연구가 있었다.
- 이미지와 쌍을 이루는 text 문서에서 명사와 형용사를 예측하도록 하여 내용 기반 이미지 검색을 개선(1999)
- 이미지와 관련된 caption의 단어를 예측하도록 훈련된 classifier에서 manifold learning을 통해 이미지 표현 학습(2007)
- low-level의 이미지와 text tag feature에 대한 multimodal Deep Boltzmann
Machines을 훈련시켜 깊은 표현 학습(2012)
- 이미지 caption에서 단어를 예측하기 위해 CNN이 유용한 이미지 표현을 학습한다는 것을 입증(2016)

이들은 이미지 표현 학습을 위한 natural language supervision은 여전히 드물다. 이는 일반적인 benchmark의 성능이 alternative 접근 방식보다 더 낮기 때문일 가능성이 높다.

이 연구에서는 대규모 natural language supervision으로 훈련된 image classifier를 연구한다. 이를 위해 인터넷에 있는 대량의 공용 데이터를 활용해 4억 개의 (image, text) 쌍으로 구성된 dataset을 만들고 CLIP을 훈련하였다.

# Approach
## Natural Language Supervision
이 논문의 핵심 아이디어는 자연어에 포함된 supervision으로부터 perception을 학습하는 것이다. 이전 연구들은 모두 이미지와 쌍을 이루는 text로부터 visual representation을 학습하는 방법을 소개하였지만 각각 unsupervised, self-supervised, weakly supervised, and supervised learning이라고 한다.
자연어로부터 학습하는 것은 일반적인 labeling 방식에 비해 확장성이 용이하다. 이는 representation을 언어와 연결해 zero-shot transfer이 가능하도록 한다.

## Selecting an Efficient Pre-Training Method
이 논문의 효율적인 pre-training 접근법으로 VirTex와 유사하게 Image CNN과 text transformer를 공동 훈련하여 이미지의 caption을 예측하도록 하였다. 하지만 이 방법은 효율적으로 확장하는데 어려움이 있다고 한다.
<img src="../images/CLIP/2.png" />
위 그림을 보면 6300 만개의 parameter를 가진 transformer language model이 ResNet-50 image encoder의 2배의 계산을 가짐에도 불구하고 bag-of-words encoding을 예측하는 기준선보다 속도가 3배 느리다는 것을 보여줬다.

$$N$$개의 (image, text) 쌍의 batch가 주어지면, CLIP은 image encoder와 text encoder를 공동으로 훈련해 $$N$$개의 실제 쌍의 이미지와 text embedding의 cosine similarity를 극대화하고, $$N^2-N$$개의 잘못된 쌍의 embedding의 cosine similarity는 최소화한다. 이를 이용해 similarity score에 대해 symmetric cross entropy loss을 최적화한다.

<img src="../images/CLIP/3.png" />

CLIP은 처음부터 훈련하여 image encoder를 ImageNet 가중치로 초기화하지 않고 text encoder를 pre-training된 가중치로 초기화하지 않는다. 또한 representation와 the contrastive embedding space 간에 non-linear projection을 사용하지 않고 각 encoder에서 multimodal embedding space로 매핑하기 위해 linear projection만을 사용 한다.

## Choosing and Scaling a Model
image encoder를 위해 다음과 같은 아키텍처를 고려했다.
- ResNet-50
이때, global average pooling layer를 attention pooling mechanism으로 대체하였다.
- ViT
transformer 이전에 결합된 patch나 positional embedding에 추가적인 layer normalization을 추가한다.

text encoder로는 transformer를 사용하였으며 6M parameter를 가진 12 layer와 512 width model를 사용하고 8개의 attention head를 가진다. text sequence는 [SOS], [EOS] token으로 둘러싸여 있고 [EOS] token에서 transformer의 가장 높은 layer의 활성화가 text의 feature 표현으로 간주되어 layer normalization된 후 multimodal embedding space로 linear projection이 된다.