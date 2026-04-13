export interface Resource {
  title: string;
  url: string;
  type: 'video' | 'github' | 'paper' | 'doc';
}

export interface RoadmapStage {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  modules: {
    title: string;
    content: string;
    resources?: Resource[];
  }[];
  progress: number;
  status: 'completed' | 'active' | 'locked';
}

export const ROADMAP_DATA: RoadmapStage[] = [
  {
    id: 1,
    title: "第一阶段：认知跨越与底层理论巩固 (理论层)",
    subtitle: "Theory & Transformer",
    description: "从传统的统计模型和时序数据，彻底转向 Transformer 架构。",
    progress: 100,
    status: 'completed',
    modules: [
      {
        title: "解构 Transformer 核心",
        content: "不要只停留在调用 API 或阅读顶层架构图。你需要从头手写一个 Transformer，深刻理解 Attention 机制、KV Cache、位置编码（RoPE）的数学推导和显存占用计算。",
        resources: [
          { title: "Andrej Karpathy: nanoGPT Video", url: "https://www.youtube.com/watch?v=kCc8FmEb1nY", type: 'video' },
          { title: "nanoGPT GitHub Repo", url: "https://github.com/karpathy/nanoGPT", type: 'github' },
          { title: "Attention Is All You Need Paper", url: "https://arxiv.org/abs/1706.03762", type: 'paper' }
        ]
      },
      {
        title: "吃透大模型相关的优化理论",
        content: "深入研究 AdamW 优化器在大规模分布式环境下的表现，以及为什么在几十亿参数下会出现 Loss Spike。",
        resources: [
          { title: "AdamW Optimizer Explained", url: "https://pytorch.org/docs/stable/generated/torch.optim.AdamW.html", type: 'doc' }
        ]
      },
      {
        title: "后训练（Post-training）的数学基础",
        content: "深入研究 RLHF 中的 PPO 算法，以及目前更主流的 DPO（直接偏好优化）。",
        resources: [
          { title: "DPO: Direct Preference Optimization Paper", url: "https://arxiv.org/abs/2305.18290", type: 'paper' }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "第二阶段：跨越最大的鸿沟 —— 分布式系统与算力工程 (系统层)",
    subtitle: "Systems & Distributed",
    description: "这是大部分算法工程师和数据科学家转型大模型时最痛苦的阶段。懂数学不够，必须懂显卡。",
    progress: 62,
    status: 'active',
    modules: [
      {
        title: "熟练掌握并行训练框架",
        content: "深入研究 PyTorch Distributed。理解并能实现 DDP, TP, PP, FSDP / DeepSpeed ZeRO。",
        resources: [
          { title: "PyTorch Distributed Overview", url: "https://pytorch.org/tutorials/beginner/dist_overview.html", type: 'doc' },
          { title: "DeepSpeed GitHub", url: "https://github.com/microsoft/DeepSpeed", type: 'github' }
        ]
      },
      {
        title: "榨干 GPU 性能 (CUDA 初级/中级)",
        content: "了解 CUDA 的内存层级（Shared Memory, Global Memory），并理解 FlashAttention 的原理。",
        resources: [
          { title: "FlashAttention Paper", url: "https://arxiv.org/abs/2205.14135", type: 'paper' },
          { title: "CUDA Programming Guide", url: "https://docs.nvidia.com/cuda/cuda-c-programming-guide/index.html", type: 'doc' }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "第三阶段：从“跑通”到“魔改”开源项目 (实践层)",
    subtitle: "Practice & Contribution",
    description: "从“使用者”转变为“核心贡献者”。",
    progress: 0,
    status: 'locked',
    modules: [
      {
        title: "深挖开源微调框架",
        content: "阅读并修改 PEFT、TRL 或 Axolotl 的源码。尝试自己调整微调过程中的 loss 函数。",
        resources: [
          { title: "PEFT GitHub", url: "https://github.com/huggingface/peft", type: 'github' },
          { title: "Axolotl GitHub", url: "https://github.com/OpenAccess-AI-Collective/axolotl", type: 'github' }
        ]
      },
      {
        title: "参与推理加速项目",
        content: "了解 vLLM 或 TGI 的底层逻辑（例如 PagedAttention 如何像操作系统管理虚拟内存一样管理 KV Cache）。",
        resources: [
          { title: "vLLM GitHub", url: "https://github.com/vllm-project/vllm", type: 'github' }
        ]
      },
      {
        title: "打造高含金量的个人切入点",
        content: "利用擅长的领域（如 EDM）作为试验田，进行 Continual Pre-training 并通过 DPO 微调。",
        resources: []
      }
    ]
  },
  {
    id: 4,
    title: "第四阶段：职场转型策略",
    subtitle: "Strategy & Career",
    description: "内部转岗或寻找“桥梁”职位，发挥学术与工程的复合优势。",
    progress: 0,
    status: 'locked',
    modules: [
      {
        title: "内部转岗或寻找“桥梁”职位",
        content: "寻找大型科技公司里的 Machine Learning Engineer (LLM Infra) 或 Applied Scientist (GenAI) 职位。",
        resources: []
      },
      {
        title: "发挥学术与工程的复合优势",
        content: "在顶级会议（ACL, EMNLP）上发表关于大模型微调效率或垂类领域对齐的论文。",
        resources: []
      }
    ]
  }
];
