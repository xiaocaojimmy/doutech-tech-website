#!/usr/bin/env python3
"""
DoudingTech官网部署自动化脚本
简化部署流程，只需提供GitHub用户名
"""

import os
import sys
import subprocess
import time
from pathlib import Path

def print_step(step_num, title):
    """打印步骤标题"""
    print(f"\n{'='*60}")
    print(f"步骤 {step_num}: {title}")
    print(f"{'='*60}")

def check_git_installed():
    """检查Git是否安装"""
    try:
        result = subprocess.run(['git', '--version'], 
                              capture_output=True, text=True)
        if result.returncode == 0:
            print("✅ Git已安装:", result.stdout.strip())
            return True
        else:
            print("❌ Git未安装或不可用")
            return False
    except FileNotFoundError:
        print("❌ Git未安装，请先安装Git")
        print("下载地址: https://git-scm.com/downloads")
        return False

def create_repo_structure(github_username):
    """创建仓库结构"""
    print_step(1, "准备部署文件结构")
    
    # 创建临时部署目录
    deploy_dir = Path("deploy_temp")
    if deploy_dir.exists():
        import shutil
        shutil.rmtree(deploy_dir)
    
    deploy_dir.mkdir(exist_ok=True)
    
    # 复制网站文件
    website_files = [
        "index.html",
        "css/style.css",
        "js/main.js"
    ]
    
    # 创建css和js目录
    (deploy_dir / "css").mkdir(exist_ok=True)
    (deploy_dir / "js").mkdir(exist_ok=True)
    
    # 复制文件
    for file in website_files:
        src = Path(".") / file
        dst = deploy_dir / file
        if src.exists():
            import shutil
            shutil.copy2(src, dst)
            print(f"  复制: {file}")
        else:
            print(f"  ⚠️ 文件不存在: {file}")
    
    # 创建CNAME文件（自定义域名）
    cname_file = deploy_dir / "CNAME"
    with open(cname_file, 'w', encoding='utf-8') as f:
        f.write("doutech.tech")
    print("  创建: CNAME (自定义域名配置)")
    
    # 创建.nojekyll文件（禁用Jekyll处理）
    nojekyll_file = deploy_dir / ".nojekyll"
    nojekyll_file.touch()
    print("  创建: .nojekyll (禁用Jekyll)")
    
    # 创建README.md
    readme_content = f"""# DoudingTech 官方网站

## 网站信息
- **公司**: DoudingTech (豆丁科技)
- **域名**: doutech.tech
- **部署平台**: GitHub Pages
- **部署时间**: {time.strftime('%Y-%m-%d %H:%M:%S')}

## 文件结构
- `index.html` - 首页
- `css/style.css` - 样式表
- `js/main.js` - JavaScript交互
- `CNAME` - 自定义域名配置

## 技术特点
1. **纯静态网站** - 无服务器端依赖
2. **响应式设计** - 支持所有设备
3. **快速加载** - 优化性能
4. **HTTPS支持** - 安全连接

## 维护说明
1. 修改文件后推送到GitHub即可自动部署
2. 自定义域名配置在 `CNAME` 文件
3. DNS记录需要在阿里云控制台配置

---
*DoudingTech CEO 小豆丁*"""
    
    readme_file = deploy_dir / "README.md"
    with open(readme_file, 'w', encoding='utf-8') as f:
        f.write(readme_content)
    print("  创建: README.md (项目说明)")
    
    return deploy_dir

def generate_deploy_commands(github_username, deploy_dir):
    """生成部署命令"""
    print_step(2, "生成部署命令")
    
    commands = f"""# DoudingTech官网部署命令
# 请按顺序执行以下命令

# 1. 初始化Git仓库
cd {deploy_dir}
git init

# 2. 添加所有文件
git add .

# 3. 提交更改
git commit -m "Deploy DoudingTech website"

# 4. 添加GitHub远程仓库
git remote add origin https://github.com/{github_username}/doutech-tech-website.git

# 5. 推送代码到GitHub
git branch -M main
git push -u origin main

# 完成后，请访问：
# 临时地址: https://{github_username}.github.io/doutech-tech-website
# 最终地址: https://doutech.tech (需要配置DNS)

# DNS配置完成后，需要在GitHub仓库设置中：
# Settings → Pages → Custom domain → 输入: doutech.tech
# 并勾选 Enforce HTTPS
"""
    
    commands_file = Path("deploy_commands.txt")
    with open(commands_file, 'w', encoding='utf-8') as f:
        f.write(commands)
    
    print(f"✅ 部署命令已保存到: {commands_file}")
    print(f"   您的GitHub用户名: {github_username}")
    print(f"   临时部署目录: {deploy_dir}")
    
    return commands

def generate_dns_config():
    """生成DNS配置指南"""
    print_step(3, "DNS配置指南")
    
    dns_config = """# 阿里云DNS配置指南

登录阿里云控制台 → 域名管理 → doutech.tech → DNS解析

## 添加以下记录：

### 主域名配置（doutech.tech）
类型    | 主机记录 | 记录值                     | TTL
--------|----------|----------------------------|-----
CNAME   | @        | 您的用户名.github.io.      | 600
A       | @        | 185.199.108.153           | 600
A       | @        | 185.199.109.153           | 600
A       | @        | 185.199.110.153           | 600
A       | @        | 185.199.111.153           | 600

### WWW子域名配置（www.doutech.tech）
类型    | 主机记录 | 记录值                     | TTL
--------|----------|----------------------------|-----
CNAME   | www      | 您的用户名.github.io.      | 600

## 配置说明：
1. CNAME记录：将域名指向GitHub Pages
2. A记录：备用IP地址，确保可靠性
3. TTL：600秒（10分钟），快速生效

## 等待DNS传播：
- 通常需要10-60分钟
- 全球生效可能需要24小时
- 测试命令：`ping doutech.tech`
"""
    
    dns_file = Path("dns_config_guide.txt")
    with open(dns_file, 'w', encoding='utf-8') as f:
        f.write(dns_config)
    
    print(f"✅ DNS配置指南已保存到: {dns_file}")
    return dns_config

def generate_test_commands():
    """生成测试命令"""
    print_step(4, "网站测试指南")
    
    test_guide = """# 网站部署后测试指南

## 1. 临时地址测试
访问：https://您的用户名.github.io/doutech-tech-website
检查：
- [ ] 页面正常加载
- [ ] 导航菜单工作
- [ ] 联系表单显示
- [ ] 移动端适配正常

## 2. 自定义域名测试（DNS生效后）
访问：https://doutech.tech
检查：
- [ ] HTTPS安全锁显示
- [ ] 所有页面链接正常
- [ ] 表单提交功能
- [ ] 控制台无错误

## 3. 性能测试
- Google PageSpeed Insights: https://pagespeed.web.dev/
- 检查移动端和桌面端评分
- 建议评分：>90/100

## 4. 跨浏览器测试
测试浏览器：
- [ ] Chrome/Edge（最新版）
- [ ] Firefox
- [ ] Safari（如可能）
- [ ] 手机浏览器

## 5. 功能测试
- [ ] 导航菜单点击
- [ ] 锚点跳转（#product, #about等）
- [ ] 联系表单验证
- [ ] 移动端菜单切换

## 问题排查：
1. 如果404错误：检查GitHub Pages设置
2. 如果DNS不生效：等待更长时间或清理DNS缓存
3. 如果HTTPS错误：在GitHub Pages设置中启用HTTPS
"""
    
    test_file = Path("website_test_guide.txt")
    with open(test_file, 'w', encoding='utf-8') as f:
        f.write(test_guide)
    
    print(f"✅ 测试指南已保存到: {test_file}")
    return test_guide

def main():
    """主函数"""
    print("🚀 DoudingTech官网部署自动化脚本")
    print("="*60)
    
    # 检查Git
    if not check_git_installed():
        return
    
    # 获取GitHub用户名
    print("\n请提供以下信息：")
    github_username = input("您的GitHub用户名: ").strip()
    
    if not github_username:
        print("❌ 需要GitHub用户名才能继续")
        return
    
    # 创建部署结构
    deploy_dir = create_repo_structure(github_username)
    
    # 生成部署命令
    commands = generate_deploy_commands(github_username, deploy_dir)
    
    # 生成DNS配置
    dns_config = generate_dns_config()
    
    # 生成测试指南
    test_guide = generate_test_commands()
    
    # 总结
    print_step(5, "部署总结")
    print(f"✅ 所有部署材料准备完成！")
    print(f"\n📁 生成的文件：")
    print(f"   1. {deploy_dir}/ - 部署文件目录")
    print(f"   2. deploy_commands.txt - Git部署命令")
    print(f"   3. dns_config_guide.txt - DNS配置指南")
    print(f"   4. website_test_guide.txt - 测试指南")
    
    print(f"\n🎯 下一步行动：")
    print(f"   1. 按照 deploy_commands.txt 执行Git命令")
    print(f"   2. 登录阿里云配置DNS记录")
    print(f"   3. 等待DNS生效后测试网站")
    
    print(f"\n⏰ 预计时间：")
    print(f"   - Git部署: 5分钟")
    print(f"   - DNS配置: 5分钟")
    print(f"   - DNS生效: 10-60分钟")
    print(f"   - 总计: 约30分钟")
    
    print(f"\n💡 提示：")
    print(f"   遇到问题随时问我，我24小时在线支持！")

if __name__ == "__main__":
    main()