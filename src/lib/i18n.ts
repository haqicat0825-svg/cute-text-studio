/**
 * i18n 多语言文本
 * 支持中文 / English 切换
 * 品牌名 "Cute Text Studio" 始终保留英文
 */

export type Locale = 'zh' | 'en';

export const translations = {
  zh: {
    // 导航栏
    nav: {
      explore: '素材探索',
      create: 'AI生成',
      collection: '我的收藏',
    },
    // 首页
    home: {
      subtitle: '打造你的可爱风格 ✨',
      enterBtn: '进入工作室',
      tagline: '˗ˏˋ 发现可爱文字、Unicode 符号与 emoji 艺术 ˎˊ˗',
      featureExplore: {
        title: '素材探索',
        desc: '在瀑布流中发现精美的 Unicode 艺术字体、emoji 组合和装饰排版。',
        cta: '探索素材',
      },
      featureCreate: {
        title: 'AI 生成',
        desc: '用 AI 生成属于你的可爱文字风格，混合 emoji、符号和字体。',
        cta: '开始创作',
      },
      featureCollection: {
        title: '我的收藏',
        desc: '将喜欢的文字风格收藏到个人空间，打造你的可爱灵感库。',
        cta: '查看收藏',
      },
    },
    // Explore 页面
    explore: {
      searchPlaceholder: '告诉我你想要的风格...',
      searchHint: '试试：',
      galleryLabel: '素材画廊',
      footer: '♡ 为可爱文字爱好者用心打造 ♡',
      noResults: '没有找到匹配的素材，试试其他关键词吧',
      surpriseMe: '随机发现',
    },
    // Create 页面
    create: {
      title: '✎ 创作你的风格',
      subtitle: 'AI 可爱文字生成器',
      inputLabel: '你的文字',
      inputPlaceholder: '输入一些可爱的内容... 例如「生日甜妹风」',
      inputHint: '输入关键词，AI 会为你生成可爱文字 ✨',
      styleLabel: '风格选择',
      generateBtn: 'AI 生成',
      generating: '生成中...',
      regenBtn: '再生成一个',
      previewLabel: '预览',
      previewEmpty: '你的可爱文字会出现在这里',
      previewEmptyHint: '由 AI 生成',
      inspirationLabel: '灵感示例',
      copyBtn: '复制',
      footer: '♡ AI 创作即将上线 ♡',
      styleOptions: {
        sweet: '甜妹风',
        japanese: '日系可爱',
        korean: '韩系风格',
        soft: '柔软生活',
      },
      resultLabel: '生成结果',
      addedToFav: '已加入收藏',
      needInput: '请先输入文字描述',
    },
    // Collection 页面
    collection: {
      title: '我的收藏',
      emptyTitle: '还没有收藏任何内容',
      emptyDesc: '去探索页面发现你喜欢的可爱文字，点击爱心收藏到这里。',
      emptyHint: '在任意素材卡片上点击 ♡ 心形图标即可收藏',
      exploreBtn: '去探索素材',
      howToTitle: '如何收藏',
      howTo1: '浏览探索画廊，发现可爱的文字风格',
      howTo2: '点击卡片上的 ♡ 心形图标收藏',
      howTo3: '回到这里查看你所有的收藏',
      countLabel: '个收藏',
      clearAll: '清空收藏',
      clearConfirm: '确定要清空所有收藏吗？',
    },
    // 通用
    common: {
      copied: '已复制 ✨',
      copy: '复制',
      favorite: '收藏',
      removeFav: '取消收藏',
      backHome: '返回首页',
    },
    // 分类
    categories: {
      all: '全部',
      cute: '可爱颜文字',
      dreamy: '梦幻氛围',
      animal: '动物系',
      food: '日常生活',
      sweet: '甜妹风',
      japanese: '日系可爱',
      korean: '韩系风格',
      soft: '柔软生活',
      minimal: '极简',
      divider: '装饰线',
    },
  },
  en: {
    nav: {
      explore: 'Explore',
      create: 'Create',
      collection: 'Collection',
    },
    home: {
      subtitle: 'Create your cute style ✨',
      enterBtn: 'Enter Studio',
      tagline: '˗ˏˋ Discover cute text, Unicode & emoji art ˎˊ˗',
      featureExplore: {
        title: 'Explore',
        desc: 'Discover beautiful Unicode art fonts, emoji combinations, and decorative typography in a Pinterest-style gallery.',
        cta: 'Explore Gallery',
      },
      featureCreate: {
        title: 'Create',
        desc: 'Generate your own cute text styles with AI. Mix emojis, symbols, and fonts to create your unique aesthetic.',
        cta: 'Start Creating',
      },
      featureCollection: {
        title: 'Collection',
        desc: 'Save your favorite text styles to your personal collection. Build your own gallery of cute aesthetics.',
        cta: 'View Collection',
      },
    },
    explore: {
      searchPlaceholder: 'Tell me your cute style...',
      searchHint: 'Try:',
      galleryLabel: 'gallery',
      footer: '♡ Made with love for cute text lovers ♡',
      noResults: 'No results found, try another keyword',
      surpriseMe: 'Surprise Me',
    },
    create: {
      title: '✎ Create Your Style',
      subtitle: 'AI-powered cute text generator',
      inputLabel: 'Your Text',
      inputPlaceholder: 'Type something cute... e.g. "birthday sweet girl"',
      inputHint: 'Enter keywords, AI will generate cute text for you ✨',
      styleLabel: 'Style',
      generateBtn: 'Generate with AI',
      generating: 'Generating...',
      regenBtn: 'Regenerate',
      previewLabel: 'Preview',
      previewEmpty: 'Your cute text will appear here',
      previewEmptyHint: 'Powered by AI',
      inspirationLabel: 'Inspiration',
      copyBtn: 'Copy',
      footer: '♡ AI generation coming soon ♡',
      styleOptions: {
        sweet: 'Sweet Girl',
        japanese: 'Japanese Cute',
        korean: 'Korean Style',
        soft: 'Soft Life',
      },
      resultLabel: 'Result',
      addedToFav: 'Added to favorites',
      needInput: 'Please enter some text first',
    },
    collection: {
      title: 'My Collection',
      emptyTitle: 'Your Collection is Empty',
      emptyDesc: 'Start exploring and save your favorite cute text styles here. Tap the heart on any text card to add it to your collection.',
      emptyHint: 'Tap the heart icon on any card to save it',
      exploreBtn: 'Explore Text Styles',
      howToTitle: 'How to collect',
      howTo1: 'Browse the Explore gallery to discover cute text styles',
      howTo2: 'Tap the heart icon on any card to save it',
      howTo3: 'Come back here to see all your favorites',
      countLabel: 'saved',
      clearAll: 'Clear All',
      clearConfirm: 'Are you sure you want to clear all favorites?',
    },
    common: {
      copied: 'Copied ✨',
      copy: 'Copy',
      favorite: 'Favorite',
      removeFav: 'Remove',
      backHome: 'Back to Home',
    },
    categories: {
      all: 'All',
      cute: 'Cute',
      dreamy: 'Dreamy',
      animal: 'Animal',
      food: 'Food',
      sweet: 'Sweet Girl',
      japanese: 'Japanese Cute',
      korean: 'Korean Style',
      soft: 'Soft Life',
      minimal: 'Minimal',
      divider: 'Divider',
    },
  },
};

export type TranslationKeys = typeof translations.en;
