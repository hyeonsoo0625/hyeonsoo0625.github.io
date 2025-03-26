# Multicore02-1
<hr>

# Introduction to Multicore Computing

## Multicore Processor
하나의 computing component는 2개 또는 그 이상의 `독립적인` core로 이루어져 있음
- Core (CPU)
    - program instruction을 읽고 실행하는 computing 단위
    - dual-core, quad-core, hexa-core, octa-core, ...
- share cache / not share cache
- symmetric or asymmetric
> Core (CPU)
> - Arithmetic operations
>   - add, sub, mul, div...
> - Memory access
>   - read, write
> - Control
>   - jump, test, branch

### Intel Multicore CPU (Recent)
Intel Multicore CPU에는 Performace Core와 Efficiency Core가 있음

<img src="/db/cs/img/2-1-1.png" style="width: 50%; display: block; margin: auto;"/>

위 그림을 보면 8+16코어 부분이 적혀 있는 것을 확인할 수 있다.  
이때, 8은 performace core, 16은 efficiency core를 나타낸다.

<img src="/db/cs/img/2-1-2.png" style="width: 50%; display: block; margin: auto;"/>

위 그림에서 Raptor Cove는 performance core, Gracemont는 efficiency core를 나타낸다. 이때 performance core가 큰 것을 확인할 수 있는데 이는 에너지를 절약하기 위해 efficiency core를 더 작게 만든다.

### Apple CPUs: M1 (2021), M3 (2023)
Apple은 이전에 Intel Processor를 사용했지만 최근 들어 자체적으로 CPU를 생산한다.  
이때, GPU와 NPU가 있는데 GPU는 6000~8000의 computing 단위가 들어가 있고, NPU는 AI processor에 특화되어 있어 연산에 최적화가 되어 있다.

<img src="/db/cs/img/2-1-3.png" style="width: 50%; display: block; margin: auto;"/>

### Apple Unified Memory
<img src="/db/cs/img/2-1-4.png" style="width: 40%; display: block; margin: auto;"/>
기존 memory는 data를 주고받는 과정이 필요하다. (왼쪽) 하지만 Apple은 자체 CPU를 사용하므로 CPU, GPU 둘다 memory에 접근이 가능하다.(오른쪽) 즉, CPU, GPU, NPU는 하나의 chip에서 memory를 공유하게 된다.

- 장점
    - 효율적
- 단점
    - 생산 이후, 수정할 수 없다.
    - 이는 CPU, GPU, NPU가 다 연결되어 있으므로 변경이 힘들게 된다.

## Multicore Processor
- Multiple core는 동시에 multiple instruction을 연산할 수 있다. (Concurrently)
- program의 전반적인 속도가 상승한다. (Performance)
- Software algorithm이나 구현에 대해 강하게 의존적이다.
    - 이는 multicore processor를 동시에 사용하기 위해서는 코드를 짜야 실행이 가능하다.
- ex. Desktop PCs, mobile devices, servers

## Manycore Processor (GPU)
multi-core architecture는 높은 수의 core를 가지고 있다. (주로 2000 cores)  
(RTX 3080 Ti는 1024개의 processor를 가지고 있음)

- CUDA
    - NVIDIA에서 제조
    - GPGPU (General Purpose Graphics Processing Unit)
- OpenCL
    - 표준 parallel programming platform

### Parallel Applications
- Image and video processing
    - 주로 image나 video는 여러 pixel로 구성되어 있다. 이를 짧은 시간 내에 생성하기 위해서는 동시에 pixel에 작성하는 과정이 필요하다.
- 3D graphics
    - rendering, animation
    - 각각 triangle mesh로 3D를 표현하게 되는데 이때 각 triangle을 독립적으로 처리
- 3D gaming
- Simulation
    - protein folding, climate modeling
- Machine learning, deep learning

### Thread/Process
<img src="/db/cs/img/2-1-5.png" style="width: 20%; display: block; margin: auto;"/>

||Thread|Process|
|-|-|-|
|공동점|실행하기 위한 독립적인 sequence|
|차이점|- 하나의 process 안에서 shared memory가 실행된다. <br>- 하나의 process에는 multiple thread가 존재한다. | 독립적인 memory 공간에서 실행됨 |

- Multithreaded Program
    - Program이 다중의 thread를 이용해 동시에 실행된다.

### What is Paralle Computing?
- Paralle computing

