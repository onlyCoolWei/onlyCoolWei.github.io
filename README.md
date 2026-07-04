# 个人知识库 (My Personal Knowledge Base)

这是我基于 [Quartz 5](https://quartz.jzhao.xyz/) 搭建的个人知识库与数字花园。本仓库用于将我的 Obsidian 笔记自动构建并发布为静态网页。

🔗 访问网页：[onlyCoolWei.github.io](https://onlyCoolWei.github.io)

---

## 📂 内容结构 (Content Structure)

核心笔记内容存放在 `content/` 目录下。为了方便多端同步与管理，该目录被配置为 **Git 子模块 (Submodule)**，指向我底层的 Obsidian 笔记仓库：

* **`content/`** (子模块):
  * **`知识库/`**: 结构化的系统知识、学习笔记与技术积累。
  * **`日常随笔/`**: 随记、随笔与日常想法。
  * **`README.md`**: 知识库的主页/入口文件（发布后在网站中作为主页 Index 呈现）。
  * **`.obsidian/`**: Obsidian 客户端的配置文件夹（在 Quartz 构建时会被自动忽略）。

---

## 🛠️ 关键命令 (Key Commands)

以下是日常运行、预览与同步时最常用的关键命令：

### 1. 本地预览 (Preview)
在本地运行 Quartz 开发服务器以实时预览你的知识库，支持热重载（Hot Reload）：
```bash
npx quartz build --serve
```

### 2. 静态构建 (Build)
将 Markdown 笔记解析并构建为 HTML 静态页面资源：
```bash
npx quartz build
```

### 3. 一键同步 (Sync)
项目集成了自动同步脚本，用于一次性将 Obsidian 笔记库和博客发布状态进行全自动同步。只需在根目录运行：
```bash
npm run sync
```
该命令会自动执行以下步骤（详见 [sync-submodule.js](file:///Users/coolwei/Desktop/repository/my-brain/sync-submodule.js)）：
1. 在 `content` 子模块目录下拉取最新的 Obsidian 笔记变更；
2. 如果本地（例如 Obsidian 编辑器）存在新的修改，自动将变更提交并推送至底层的 `my-repository` 仓库；
3. 更新 `my-brain` 父仓库中的子模块引用指针；
4. 自动提交并推送父仓库的更改到 `onlyCoolWei.github.io` 远程仓库，从而触发 GitHub Actions 自动构建并上线。
