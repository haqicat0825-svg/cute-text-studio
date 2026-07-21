// ============================================================
// Material Validator - 素材验证工具
// ------------------------------------------------------------
// 检测素材中是否存在异常 Unicode 控制字符
// 用于 Material Manager 页面的 Display Test / Copy Test
// ============================================================

// 危险的 Unicode 控制字符列表
const DANGEROUS_CHARS: { code: number; name: string; hex: string }[] = [
  { code: 0xfffd, name: 'Replacement Character', hex: 'U+FFFD' },
  { code: 0xfeff, name: 'BOM / Zero Width No-Break Space', hex: 'U+FEFF' },
  { code: 0x200b, name: 'Zero Width Space', hex: 'U+200B' },
  { code: 0x200c, name: 'Zero Width Non-Joiner', hex: 'U+200C' },
  // U+200D (ZWJ) 是合法的 emoji 组合字符，不列入危险列表
  { code: 0x200e, name: 'Left-to-Right Mark', hex: 'U+200E' },
  { code: 0x200f, name: 'Right-to-Left Mark', hex: 'U+200F' },
  { code: 0x202a, name: 'Left-to-Right Embedding', hex: 'U+202A' },
  { code: 0x202b, name: 'Right-to-Left Embedding', hex: 'U+202B' },
  { code: 0x202c, name: 'Pop Directional Formatting', hex: 'U+202C' },
  { code: 0x202d, name: 'Left-to-Right Override', hex: 'U+202D' },
  { code: 0x202e, name: 'Right-to-Left Override', hex: 'U+202E' },
  { code: 0x2060, name: 'Word Joiner', hex: 'U+2060' },
  { code: 0x2061, name: 'Function Application', hex: 'U+2061' },
  { code: 0x2062, name: 'Invisible Times', hex: 'U+2062' },
  { code: 0x2063, name: 'Invisible Separator', hex: 'U+2063' },
  { code: 0x2064, name: 'Invisible Plus', hex: 'U+2064' },
];

export interface ValidationResult {
  isValid: boolean;
  issues: { char: string; name: string; hex: string; position: number }[];
  warnings: string[];
}

/**
 * 验证单个素材文本
 * 检查是否包含危险的 Unicode 控制字符
 */
export function validateText(text: string): ValidationResult {
  const issues: { char: string; name: string; hex: string; position: number }[] = [];
  const warnings: string[] = [];

  for (let i = 0; i < text.length; i++) {
    const code = text.codePointAt(i);
    if (code === undefined) continue;

    const dangerous = DANGEROUS_CHARS.find((d) => d.code === code);
    if (dangerous) {
      issues.push({
        char: String.fromCodePoint(code),
        name: dangerous.name,
        hex: dangerous.hex,
        position: i,
      });
    }

    // 检查代理对（surrogate pairs）是否完整
    if (code >= 0xd800 && code <= 0xdbff) {
      // 高代理项，检查后面是否有低代理项
      if (i + 1 >= text.length || text.charCodeAt(i + 1) < 0xdc00 || text.charCodeAt(i + 1) > 0xdfff) {
        warnings.push(`位置 ${i}: 不完整的代理对（孤立的 高代理项）`);
      }
    } else if (code >= 0xdc00 && code <= 0xdfff) {
      // 低代理项前面没有高代理项
      if (i === 0 || text.charCodeAt(i - 1) < 0xd800 || text.charCodeAt(i - 1) > 0xdbff) {
        warnings.push(`位置 ${i}: 不完整的代理对（孤立的 低代理项）`);
      }
    }
  }

  // 检查空内容
  if (text.trim().length === 0) {
    warnings.push('素材内容为空或仅包含空白字符');
  }

  // 检查过长内容（可能影响排版）
  if (text.length > 200) {
    warnings.push(`素材内容过长（${text.length} 字符），可能影响排版显示`);
  }

  return {
    isValid: issues.length === 0,
    issues,
    warnings,
  };
}

/**
 * 批量验证素材列表
 */
export function validateBatch(
  items: { id: string; content: string }[]
): { id: string; result: ValidationResult }[] {
  return items.map((item) => ({
    id: item.id,
    result: validateText(item.content),
  }));
}

/**
 * 清理文本中的危险控制字符（保留合法的 ZWJ U+200D）
 * 返回清理后的文本和被移除的字符列表
 */
export function cleanText(
  text: string
): { cleaned: string; removed: { char: string; name: string; hex: string }[] } {
  const removed: { char: string; name: string; hex: string }[] = [];
  let cleaned = '';

  for (let i = 0; i < text.length; i++) {
    const code = text.codePointAt(i);
    if (code === undefined) continue;

    const dangerous = DANGEROUS_CHARS.find((d) => d.code === code);
    if (dangerous) {
      removed.push({
        char: String.fromCodePoint(code),
        name: dangerous.name,
        hex: dangerous.hex,
      });
    } else {
      cleaned += text[i];
    }
  }

  return { cleaned, removed };
}

/**
 * 获取素材状态的中文名称
 */
export function statusToLabel(status: string): string {
  const labels: Record<string, string> = {
    verified: '已验证',
    pending: '待审核',
    broken: '异常',
  };
  return labels[status] || status;
}

/**
 * 获取素材状态的英文名称
 */
export function statusToLabelEn(status: string): string {
  const labels: Record<string, string> = {
    verified: 'Verified',
    pending: 'Pending',
    broken: 'Broken',
  };
  return labels[status] || status;
}
