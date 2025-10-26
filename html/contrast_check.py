#!/usr/bin/env python3
# WCAG AA 對比度檢查工具

def hex_to_rgb(hex_color):
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def rgb_to_relative_luminance(r, g, b):
    def gamma_correct(c):
        c = c / 255.0
        if c <= 0.03928:
            return c / 12.92
        else:
            return pow((c + 0.055) / 1.055, 2.4)
    
    r_rel = gamma_correct(r)
    g_rel = gamma_correct(g)
    b_rel = gamma_correct(b)
    
    return 0.2126 * r_rel + 0.7152 * g_rel + 0.0722 * b_rel

def contrast_ratio(color1, color2):
    rgb1 = hex_to_rgb(color1)
    rgb2 = hex_to_rgb(color2)
    
    lum1 = rgb_to_relative_luminance(*rgb1)
    lum2 = rgb_to_relative_luminance(*rgb2)
    
    lighter = max(lum1, lum2)
    darker = min(lum1, lum2)
    
    return (lighter + 0.05) / (darker + 0.05)

def check_wcag_aa(ratio, level="normal"):
    if level == "normal":
        return ratio >= 4.5
    elif level == "large":
        return ratio >= 3.0
    return False

# 艾爾芙卡品牌色彩
colors = {
    'bg': '#0B1420',      # 深靛背景 
    'white': '#FFFFFF',    # 白色文字
    'blue': '#2F77C8',     # 冷藍主色
    'cyan': '#64C7E6',     # 淺青輔助色
    'gray': '#91A4B6',     # 次要灰
    'card': '#121821'      # 卡片背景
}

print('🎨 艾爾芙卡 WCAG AA 對比度檢查結果')
print('=' * 50)

# 檢查主要文字對比度
tests = [
    ('白色文字 vs 深靛背景', colors['white'], colors['bg'], 'normal'),
    ('冷藍色 vs 深靛背景', colors['blue'], colors['bg'], 'large'),
    ('淺青色 vs 深靛背景', colors['cyan'], colors['bg'], 'large'),
    ('次要灰 vs 深靛背景', colors['gray'], colors['bg'], 'normal'),
    ('白色文字 vs 卡片背景', colors['white'], colors['card'], 'normal'),
    ('淺青色 vs 卡片背景', colors['cyan'], colors['card'], 'large'),
]

for name, fg_color, bg_color, level in tests:
    ratio = contrast_ratio(fg_color, bg_color)
    passed = check_wcag_aa(ratio, level)
    min_ratio = 4.5 if level == 'normal' else 3.0
    
    status = "✅ 通過" if passed else "❌ 未通過"
    print(f'{name}: {ratio:.2f} (需要 ≥{min_ratio}) {status}')

print('\n🔧 按鈕對比度檢查')
print('-' * 30)

# 按鈕對比度檢查
button_tests = [
    ('冷藍按鈕背景 vs 深色文字', colors['blue'], colors['bg']),
    ('冷藍按鈕背景 vs 白色文字', colors['blue'], colors['white']),
    ('透明按鈕邊框 vs 背景', colors['blue'], colors['bg']),
]

for name, bg_color, text_color in button_tests:
    ratio = contrast_ratio(bg_color, text_color)
    passed = check_wcag_aa(ratio, 'normal')
    
    status = "✅ 通過" if passed else "❌ 未通過"
    print(f'{name}: {ratio:.2f} (需要 ≥4.5) {status}')

print('\n📋 建議調整')
print('-' * 20)

# 檢查是否有需要調整的顏色
if contrast_ratio(colors['gray'], colors['bg']) < 4.5:
    print('• 次要灰色可能需要調亮以達到 WCAG AA 標準')
    
if contrast_ratio(colors['blue'], colors['bg']) < 3.0:
    print('• 冷藍色可能需要調亮以達到大字體標準')

print('\n✨ 全部檢查完成！')