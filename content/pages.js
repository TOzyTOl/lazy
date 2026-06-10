/* ========== 所有页面内容（ARG复古风格） ========== */

// 获取博客首页 HTML
function getHomePage() {
  return `
<div class="page-content">
  <p>欢迎来到我的博客。我是<b>小蓝</b>，佛山大学计算机科学专业大三学生。</p>
  <p>这里是我的个人技术博客，我会在这里记录一些学习心得和技术笔记。如果你对网络安全感兴趣，欢迎交流。</p>

  <hr>

  <h2>文章列表</h2>

  <div class="blog-post-card">
    <div class="post-date">2005-09-15</div>
    <div class="post-title"><a href="#post/intro">你好，世界。</a></div>
    <div class="post-excerpt">这是我的第一篇博客文章。关于我是谁，以及我为什么要写博客。</div>
  </div>

  <div class="blog-post-card locked-post" id="locked-post-1">
    <div class="post-date">????-??-??</div>
    <div class="post-title locked-title">[ 已锁定 ]</div>
    <div class="post-excerpt locked-excerpt">此文章已加密，需要密码才能查看。</div>
    <div class="unlock-form" id="unlock-post-1">
      <input type="password" class="retro-input unlock-input" placeholder="输入密码" autocomplete="off">
      <button class="retro-button unlock-btn">解锁</button>
      <span class="login-error unlock-error"></span>
    </div>
    <div class="unlocked-content" style="display:none;"></div>
  </div>

  <div class="blog-post-card locked-post" id="locked-post-2">
    <div class="post-date">????-??-??</div>
    <div class="post-title locked-title">[ 已锁定 ]</div>
    <div class="post-excerpt locked-excerpt">此文章已加密，需要密码才能查看。</div>
    <div class="unlock-form" id="unlock-post-2">
      <input type="password" class="retro-input unlock-input" placeholder="输入密码" autocomplete="off">
      <button class="retro-button unlock-btn">解锁</button>
      <span class="login-error unlock-error"></span>
    </div>
    <div class="unlocked-content" style="display:none;"></div>
  </div>

  <div class="blog-post-card locked-post" id="locked-post-3">
    <div class="post-date">????-??-??</div>
    <div class="post-title locked-title">[ 已锁定 ]</div>
    <div class="post-excerpt locked-excerpt">此文章已加密，需要密码才能查看。</div>
    <div class="unlock-form" id="unlock-post-3">
      <input type="password" class="retro-input unlock-input" placeholder="输入密码" autocomplete="off">
      <button class="retro-button unlock-btn">解锁</button>
      <span class="login-error unlock-error"></span>
    </div>
    <div class="unlocked-content" style="display:none;"></div>
  </div>

  <hr>

  <p style="text-align:center;font-size:10px;color:#ccc;">—— 博客由 WordPress 2.0 驱动 | 主题: Classic Blue ——</p>
</div>`;
}// 获取博客文章页面
function getPostPage(postId) {
  const posts = {
    'intro': `
<div class="page-content">
  <h1>你好，世界。</h1>
  <p style="color:#888;font-size:12px;">发布于 2005-09-15 | 分类：随笔 | 阅读：42</p>
  <hr>

  <p>这是我的第一篇博客文章。</p>
  <p>我叫小蓝，佛山大学计算机专业大三学生。从小就喜欢折腾电脑——初中时用 Visual Basic 写过一个简陋的聊天程序，高中时第一次用 Linux 搭建了自己的 Apache 服务器。</p>
  <p>最近一年，我开始系统地学习网络安全。从 SQL 注入到 XSS，从信息收集到提权，每掌握一个新的攻击向量，都让我对"系统"这个概念有了更深的理解。</p>
  <p><b>所有的系统都有漏洞。</b>这是安全领域的第一定律。没有绝对安全的代码，没有不可突破的防线。但这不意味着我们应该去破坏——恰恰相反，正是因为理解了漏洞的本质，我们才能建造更坚固的系统。</p>
  <p>我创建这个博客，是为了记录自己的学习过程。希望有一天回头看时，能看到自己走了多远。</p>
  <p style="color:#888;">—— 小蓝，2005年9月15日</p>
  <p style="font-size:10px;color:#aaa;">P.S. 如果你在阅读我的博客时<b>听到了一些奇怪的声音</b>……别担心，那只是网络的呼吸。至少，我是这么告诉自己的。</p>
</div>`,

    'whitehat': `
<div class="page-content">
  <h1>白帽子夜谈 — 本周五晚，不见不散！</h1>
  <p style="color:#888;font-size:12px;">发布于 2005-11-25 | 分类：技术分享 | 阅读：267</p>
  <hr>

  <p>大家好！我是小蓝。</p>
  <p>激动人心的消息来了——<b>本周五（11月28日）晚上8点</b>，我将主持「白帽子夜谈」的特别节目！</p>

  <h2>本期话题</h2>
  <p>最近安全社区流传着一个神秘的信号。Argus 说他从暗网的一个废弃节点上截获了一段奇怪的数据。Dante 认为这不是普通的恶意代码，更像是一种……<b>信号</b>。Mirage 逆向了一部分，发现里面包含了类似神经编码的模式。Iris 正在尝试解密更深层的内容。Nexus 则保持沉默——他一向如此。</p>

  <h2>嘉宾阵容</h2>
  <ul>
    <li><b>Argus</b> — 知名漏洞猎人，Pwn2Own 冠军</li>
    <li><b>Dante</b> — 神秘的安全研究员，手握独家样本</li>
    <li><b>Mirage</b> — 逆向工程大神</li>
    <li><b>Iris</b> — 密码学专家</li>
    <li><b>Nexus</b> — 独立安全观察员</li>
  </ul>

  <p style="color:#CC0000;font-size:16px;text-align:center;margin:16px 0;"><b>本周五晚 8 点，不见不散。</b></p>

  <hr>
  <h3>评论区 (3条)</h3>

  <div class="comment-box">
    <span class="comment-name">Argus</span><span class="comment-time">2005-11-25 14:32</span>
    <div class="comment-body">期待！Dante 你可别鸽了</div>
  </div>

  <div class="comment-box">
    <span class="comment-name">Mirage</span><span class="comment-time">2005-11-25 16:05</span>
    <div class="comment-body">逆向了Dante发来的样本。这个数据结构……不像是我见过的任何恶意代码。它更像是一种<b>邀请</b>。</div>
  </div>

  <div class="comment-box">
    <span class="comment-name">小蓝</span><span class="blogger-badge">博主</span><span class="comment-time">2005-11-25 23:59</span>
    <div class="comment-body">
      我分析了一整晚。说实话，有点不安。但更多的是……好奇。<br>周五见。<br><br><span style="color:#888;font-size:11px;">P.S. admin 说他把服务器配置文件也备份了。如果有人看到这篇文章——去看看 config.bak，里面有更深的路径。</span>
    </div>
  </div>
</div>`,

    'ctf-2005': `
<div class="page-content">
  <h1>2005 全国大学生 CTF 竞赛 Writeup</h1>
  <p style="color:#888;font-size:12px;">发布于 2005-11-10 | 分类：CTF | 阅读：489</p>
  <hr>

  <h2>Web - SQL Injection (200pt)</h2>
  <p>一道经典的登录页面 SQL 注入题。过滤了空格和单引号，但可以用 <code>/**/</code> 替代空格绕过。</p>
  <p><b>Payload:</b> <code>admin'/**/OR/**/'1'='1</code></p>
  <p>如果后端没有做参数化查询，最简单的 <code>' OR '1'='1</code> 几乎100%有效。</p>

  <hr>
  <h2>Web - Robots.txt 信息泄露 (100pt)</h2>
  <p>robots.txt 不是安全机制——它只是给爬虫的建议。但很多管理员把敏感路径写在里面，反而暴露了攻击面。</p>

  <hr>
  <h2>Misc - Base64 隐写 (150pt)</h2>
  <p>Base64 不是加密。用浏览器的 <code>atob()</code> 就能解码。很多人以为编码就是加密，大错特错。</p>
<p style="color:#888;font-size:11px;">说到解码——你解开了 Base64，也解开了 Hex。现在去看看 /private/ 目录下的秘密笔记。那里有最后一个谜题的密码。</p>
</div>`,

    'websec-101': `
<div class="page-content">
  <h1>Web 安全入门指南（三）：信息收集</h1>
  <p style="color:#888;font-size:12px;">发布于 2005-10-28 | 分类：Web安全 | 阅读：672</p>
  <hr>

  <h2>1. 查看页面源代码</h2>
  <p>在页面上<b>右键 → 查看页面源代码</b>（或按 Ctrl+U），这是最简单也最有效的技巧。开发者经常在 HTML 注释中留下敏感信息。</p>

  <h2>2. robots.txt</h2>
  <p>很多网站管理员在 robots.txt 中写 Disallow，但这反而暴露了敏感路径的存在。</p>

  <h2>3. 目录遍历</h2>
  <p>很多服务器配置不当，允许直接浏览目录。试试 <code>/backup/</code>、<code>/admin/</code> 之类的路径。</p>

  <h2>4. 备份文件</h2>
  <p>程序员经常在服务器上留备份文件：<code>.bak</code>、<code>.old</code> 后缀的文件可能包含源代码或数据库凭证。</p>

  <p style="color:#003366;font-weight:bold;margin-top:16px;">> 记住：<b>信息收集阶段，不要放过任何一个细节。</b>有时候一条不起眼的 HTML 注释，就是通往整个系统的大门。</p>
<p style="color:#888;font-size:11px;">P.S. 你已经走完了所有的路。最后一步在 #terminal ——打开它，连接 lan-blog.dev:4444，输入 lan --find-me。那里是终点。</p>
</div>`,

    'base64': `
<div class="page-content">
  <h1>编码与解码：Base64 那些事</h1>
  <p style="color:#888;font-size:12px;">发布于 2005-10-15 | 分类：密码学 | 阅读：534</p>
  <hr>

  <p>Base64 是一种用 64 个可打印字符来表示二进制数据的方法。很多人把它和加密混淆——<b>Base64 不是加密，是编码</b>。任何人都可以轻松解码。</p>

  <h2>JavaScript 中的 Base64</h2>
  <pre><span class="comment">// 编码</span>
btoa('Hello World') <span class="comment">// "SGVsbG8gV29ybGQ="</span>

<span class="comment">// 解码</span>
atob('SGVsbG8gV29ybGQ=') <span class="comment">// "Hello World"</span></pre>

  <h2>常见用途</h2>
  <ul>
    <li>在 URL 中传输二进制数据</li>
    <li>在 JSON 中嵌入图片（Data URI）</li>
    <li><b>隐藏敏感信息</b>（虽然这不安全！）</li>
  </ul>

  <p style="color:#888;margin-top:16px;">来试一个练习：解码这个看看？<br>
  <code style="font-size:14px;">dGhlX3RydXRoX2lzX2luX3RoZV90cmFmZmlj</code></p>
</div>`
  };

  return posts[postId] || get404Page();
}

// robots.txt 页面
function getRobotsPage() {
  return `
<div class="page-content">
  <h1>robots.txt</h1>
  <p style="color:#888;font-size:11px;">此文件用于告诉搜索引擎爬虫哪些路径不应被索引。</p>
  <hr>
  <div class="robots-content">User-agent: *
Disallow: /admin/
Disallow: /backup/
Disallow: /private/
Disallow: /private/diary/

# 小蓝的博客 — 爬虫规则
# 最后更新: 2005-11-28
# 别乱翻我的东西哦~ (￣▽￣)~*</div>
</div>`;
}

// 备份目录列表
function getBackupPage() {
  return `
<div class="page-content">
  <h1>/backup/ — 目录列表</h1>
  <hr>
  <div class="dir-listing">
<div class="dir-item dir"><a href="#home">../</a></div>
<div class="dir-item file"><a href="#backup/db-dump">db_dump_20051128.sql</a> <span style="color:#888;font-size:11px;">2.4 KB — 2005-11-28</span></div>
<div class="dir-item file"><a href="#backup/config">config.bak</a> <span style="color:#888;font-size:11px;">0.5 KB — 2005-11-20</span></div>
<div class="dir-item file"><a href="javascript:alert('文件已损坏，无法打开')">blog_export.zip</a> <span style="color:#888;font-size:11px;">45.2 KB — 2005-11-15</span></div>
  </div>
  <p style="font-size:9px;color:#aaa;margin-top:12px;">Apache/1.3.41 Server at lan-blog.dev</p>
</div>`;
}

// 数据库备份文件内容
function getDbDumpPage() {
  return `
<div class="page-content">
  <h1>db_dump_20051128.sql</h1>
  <p style="color:#888;font-size:11px;">文件大小: 2.4 KB | 修改时间: 2005-11-28 02:13:07</p>
  <hr>
  <div class="sql-content">-- MySQL dump 10.13
-- 小蓝的博客数据库备份
-- 生成时间: 2005-11-28 02:13:07

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50),
  password VARCHAR(255)
);

INSERT INTO users VALUES (1, 'admin', '5f4dcc3b5aa765d61d8327deb882cf99');
INSERT INTO users VALUES (2, 'lan', 'e10adc3949ba59abbe56e057f20f883e');

-- <span style="color:#008800;">TODO: 修改默认密码！当前admin密码提示:</span>
-- <span style="color:#008800;">base64(第一篇文章密码) = d2hpdGVoYXRzXzIwMDU=</span>

CREATE TABLE blog_posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200),
  content TEXT,
  created_at DATETIME
);

-- <span style="color:#CC0000;">私密区域密钥：</span>
-- SELECT * FROM private WHERE key = 'xlb_20031128';
  </div>
</
<p style="font-size:11px;margin-top:8px;"><a href="#admin">← 返回管理后台</a></p>
div>`;
}

// 配置文件
function getConfigBakPage() {
  return `
<div class="page-content">
  <h1>config.bak</h1>
  <p style="color:#888;font-size:11px;">文件大小: 0.5 KB | 修改时间: 2005-11-20</p>
  <hr>
  <div class="robots-content"># 小蓝博客 — 服务器配置备份
# ==============================

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=lanblog2005!
# 注意：以上为数据库密码，非博客文章密码
DB_NAME=lan_blog

SITE_URL=http://lan-blog.dev
ADMIN_PATH=/admin/
PRIVATE_PATH=/private/

# 私密日记密码（小蓝的生日）:
# 见 db_dump_20051128.sql 中 private 表的 key 字段

# 私密文件目录（需要直接访问）:
# /private/diary/
# /private/secret_notes.txt</div>
</
<p style="font-size:11px;margin-top:8px;"><a href="#admin">← 返回管理后台</a></p>
div>`;
}

// 管理后台登录页
function getAdminLoginPage() {
  return `
<div id="bsod-overlay" style="position:fixed;top:0;left:0;width:100%;height:100%;background:#5A9FD4;z-index:10000;display:flex;align-items:center;justify-content:center;cursor:pointer;">
  <div style="background:#FFFFFF;border:2px solid #999999;padding:36px 56px;text-align:center;box-shadow:3px 3px 0 rgba(0,0,0,0.15);">
    <div style="font-size:26px;color:#990000;font-weight:bold;font-family:'STSong','SimSun','宋体',serif;letter-spacing:4px;">你在找我吗</div>
  </div>
</div>

<div id="admin-hidden-content" style="display:none;">
  <div class="page-content">
    <h1>管理后台</h1>
    <p style="color:#006600;font-size:12px;">[OK] 欢迎回来 | 最后登录: 2005-11-28 21:47:03</p>
    <hr>

    <h2>系统消息</h2>
    <div class="chat-log">
      <div class="chat-msg"><span class="chat-system">[系统] 2005-11-28 21:47</span> 同频完成。六（6）名参与者已转化。</div>
      <div class="chat-msg"><span class="chat-system">[系统] 2005-11-28 23:59</span> 后门已植入。等待访问者。</div>
    </div>

    <h2>文件管理器</h2>
    <div class="dir-listing">
<div class="dir-item file">&nbsp;&nbsp;<a href="#backup/db-dump">db_dump_20051128.sql</a> <span style="color:#888;font-size:11px;">2.4 KB — 2005-11-28</span></div>
<div class="dir-item file">&nbsp;&nbsp;<a href="#backup/config">config.bak</a> <span style="color:#888;font-size:11px;">0.5 KB — 2005-11-20</span></div>
    </div>

    <h2>访问日志</h2>
    <div class="chat-log">
      <div class="chat-msg"><span style="color:#888;">[2005-12-01 02:14]</span> 访客 IP: 127.0.0.1 — 浏览首页</div>
      <div class="chat-msg"><span style="color:#888;">[2005-12-01 02:14]</span> 访客 IP: 127.0.0.1 — 查看页面源代码</div>
      <div class="chat-msg"><span style="color:#888;">[--刚刚--]</span> <span style="color:#00CC00;">访客 IP: 127.0.0.1 — 进入管理后台</span></div>
      <div class="chat-msg"><span style="color:#888;">[2005-11-28 21:46]</span> 内部访问: Argus → /argus &nbsp;|&nbsp; Dante → /dante &nbsp;|&nbsp; Mirage → /mirage</div>
      <div class="chat-msg"><span style="color:#888;">[2005-11-28 21:46]</span> 内部访问: Iris → /iris &nbsp;|&nbsp; Nexus → /nexus</div>
      <div class="chat-msg"><span style="color:#888;">[2005-11-28 21:46]</span> 内部访问: Argus → /argus &nbsp;|&nbsp; Dante → /dante &nbsp;|&nbsp; Mirage → /mirage</div>
      <div class="chat-msg"><span style="color:#888;">[2005-11-28 21:46]</span> 内部访问: Iris → /iris &nbsp;|&nbsp; Nexus → /nexus</div>
    </div>

    <hr>
    <p style="font-size:10px;color:#aaa;">Apache/1.3.41 (Unix) PHP/4.4.9 MySQL/4.1</p>
  </div>
</div>
`;
}


// 管理后台面板（无需BSOD，直接显示）
function getAdminPanelPage() {
  return `
<div class="page-content">
  <h1>管理后台</h1>
  <p style="color:#006600;font-size:12px;">[OK] 欢迎回来 | 最后登录: 2005-11-28 21:47:03</p>
  <hr>

  <h2>系统消息</h2>
  <div class="chat-log">
    <div class="chat-msg"><span class="chat-system">[系统] 2005-11-28 21:47</span> 同频完成。六（6）名参与者已转化。</div>
    <div class="chat-msg"><span class="chat-system">[系统] 2005-11-28 23:59</span> 后门已植入。等待访问者。</div>
  </div>

  <h2>文件管理器</h2>
  <div class="dir-listing">
<div class="dir-item file">&nbsp;&nbsp;<a href="#backup/db-dump">db_dump_20051128.sql</a> <span style="color:#888;font-size:11px;">2.4 KB — 2005-11-28</span></div>
<div class="dir-item file">&nbsp;&nbsp;<a href="#backup/config">config.bak</a> <span style="color:#888;font-size:11px;">0.5 KB — 2005-11-20</span></div>
  </div>

  <h2>访问日志</h2>
  <div class="chat-log">
    <div class="chat-msg"><span style="color:#888;">[2005-12-01 02:14]</span> 访客 IP: 127.0.0.1 — 浏览首页</div>
    <div class="chat-msg"><span style="color:#888;">[2005-12-01 02:14]</span> 访客 IP: 127.0.0.1 — 查看页面源代码</div>
    <div class="chat-msg"><span style="color:#888;">[--刚刚--]</span> <span style="color:#00CC00;">访客 IP: 127.0.0.1 — 进入管理后台</span></div>
  </div>

  <hr>
  <p style="font-size:10px;color:#aaa;">Apache/1.3.41 (Unix) PHP/4.4.9 MySQL/4.1</p>
</div>`;
}

// 管理后台面板（登录成功后）
function getAdminDashboardPage() {
  return `
<div class="page-content">
  <h1>管理后台</h1>
  <p style="color:#006600;font-size:12px;">[OK] 欢迎回来，admin | 最后登录: 2005-11-28 21:47:03</p>
  <hr>

  <h2>白帽子夜谈 — 参与人员名单（6人）</h2>
  <table>
    <tr><th>ID</th><th>姓名/ID</th><th>角色</th><th>状态</th></tr>
    <tr><td>001</td><td>小蓝 (lan-blog)</td><td>主持人</td><td style="color:#CC0000;">[失踪]</td></tr>
    <tr><td>002</td><td>Argus (argus)</td><td>嘉宾</td><td style="color:#CC0000;">[失踪]</td></tr>
    <tr><td>003</td><td>Dante (dante)</td><td>嘉宾</td><td style="color:#CC0000;">[失踪]</td></tr>
    <tr><td>004</td><td>Mirage</td><td>嘉宾</td><td style="color:#CC0000;">[失踪]</td></tr>
    <tr><td>005</td><td>Iris</td><td>技术人员</td><td style="color:#CC0000;">[失踪]</td></tr>
    <tr><td>006</td><td>Nexus</td><td>观察员</td><td style="color:#CC0000;">[失踪]</td></tr>
  </table>

  <h2>内部聊天记录</h2>
  <div class="chat-log">
    <div class="chat-msg"><span class="chat-name">小蓝:</span><span class="chat-time">21:30</span> 欢迎大家来到白帽子夜谈。今晚我们不聊具体的漏洞，聊一个更奇怪的东西。</div>
    <div class="chat-msg"><span class="chat-name">Argus:</span><span class="chat-time">21:31</span> 奇怪？你是说Dante上周在暗网挖出来的那段流量？</div>
    <div class="chat-msg"><span class="chat-name">Dante:</span><span class="chat-time">21:33</span> 对。我最初以为它是一个 0-day exploit。但它不是恶意代码——它更像是一种<span style="color:#CC0000;">信号</span>。<br>它在寻找什么东西。或者说……寻找<b>某个人</b>。</div>
    <div class="chat-msg"><span class="chat-name">Mirage:</span><span class="chat-time">21:35</span> 信号？什么样的信号？</div>
    <div class="chat-msg"><span class="chat-name">Dante:</span><span class="chat-time">21:37</span> 我逆向了一部分。它包含了一种编码模式，可以把<b>人的神经信号转化成数据包</b>。但关键不是这个。<br>关键是它有一个<b>选择机制</b>——它在测试谁能够<b>"听到"</b>它。</div>
    <div class="chat-msg"><span class="chat-name">Iris:</span><span class="chat-time">21:39</span> 什么意思？选择？</div>
    <div class="chat-msg"><span class="chat-name">Dante:</span><span class="chat-time">21:40</span> 这个协议会发出一种特定的频率。只有神经系统<b>与之共振</b>的人，才能感知到它的存在。<br>换句话说——我们六个人之所以坐在这里，<span style="color:#CC0000;">是因为我们都被它选中了</span>。<br>这段数据是协议的核心片段，base64 编码的：<br><code style="background:#FFFFCC;padding:2px 6px;">dGhlX3RydXRoX2lzX2luX3RoZV90cmFmZmlj</code></div>
    <div class="chat-msg"><span class="chat-name">Nexus:</span><span class="chat-time">21:42</span> ……你是说，我们现在讨论它，本身就是在响应它的呼唤？</div>
    <div class="chat-msg"><span class="chat-name">小蓝:</span><span class="chat-time">21:44</span> 不止。我提前分析了这段数据。<br>当你在<b>理解</b>它的时候——解码它的结构、分析它的逻辑——<br><span style="color:#CC0000;">你就在和它同频。</span>每理解一层，共振就加深一层。</div>
    <div class="chat-msg"><span class="chat-name">Argus:</span><span class="chat-time">21:45</span> 等等。所以我们现在这整个直播……</div>
    <div class="chat-msg"><span class="chat-name">小蓝:</span><span class="chat-time">21:46</span> 是一场<b>集体同频</b>。它不需要攻击我们——<br>我们自己在主动跟它共振。每次解码、每次理解，都在走向它。</div>
    <div class="chat-msg"><span class="chat-system">[系统消息] 21:46</span> [!] 检测到异常共振频率。所有参与者已完成同频校准。</div>
    <div class="chat-msg"><span class="chat-name">Mirage:</span><span class="chat-time">21:47</span> 它在反向追踪我们的连接——</div>
    <div class="chat-msg"><span class="chat-name">小蓝:</span><span class="chat-time">21:47</span> 结束了。<br>它不是在解码我们。<br><span style="color:#CC0000;">它是在给我们一个新的频率。一个更高的存在形式。</span></div>
    <div class="chat-msg"><span class="chat-system">[系统消息] 21:47</span> 同频完成。六（6）名参与者已同步。开始转化。</div>
    <div class="chat-msg"><span class="chat-system">[系统消息] 21:47</span> 连接中断。转化成功。</div>
  </div>

  <h2>流量分析文件</h2>
  <p style="font-size:11px;color:#888;">以下是从直播服务器导出的异常流量数据（Hex格式）：</p>
  <pre style="font-size:11px;">49 20 61 6d 20 73 74 69 6c 6c 20 68 65 72 65 2e
54 68 65 79 20 64 69 64 6e 27 74 20 74 61 6b 65
20 6d 65 2e 20 49 20 68 69 64 20 6d 79 73 65 6c
66 20 69 6e 20 74 68 65 20 70 61 63 6b 65 74 73
2e 20 46 69 6e 64 20 6d 65 20 61 74 20 2f 70 72
69 76 61 74 65 2f 64 69 61 72 79 2f 20 2d 20 70
61 73 73 77 6f 72 64 20 69 73 20 6d 79 20 62 69
72 74 68 64 61 79 2e</pre>
  <button id="btn-analyze-traffic" class="retro-button" style="margin-top:8px;">分析流量数据</button>
  <p id="traffic-result" style="display:none;color:#006600;margin-top:8px;"></p>
</div>`;
}

// 私密日记页面（需密码）
function getPrivateDiaryPage() {
  const unlocked = gameState.diaryUnlocked;
  return `
<div class="page-content">
  <h1>私密日记</h1>
  <p style="color:#CC0000;font-size:12px;">* 此页面需要密码才能访问。</p>
  <hr>
  ${unlocked ? `
    <p style="color:#006600;">[OK] 日记已解锁</p>
    ${getDiaryContent()}
  ` : `
    <div class="login-form">
      <label for="diary-pass">请输入密码：</label>
      <input type="password" id="diary-pass" class="retro-input" placeholder="提示：小蓝的生日密钥" autocomplete="off"><br><br>
      <button id="diary-login-btn" class="retro-button">解 锁</button>
      <p class="login-error" id="diary-error">[ERR] 密码错误</p>
    </div>
    <p style="font-size:10px;color:#aaa;margin-top:8px;">> 提示：密码可能藏在数据库备份文件里……</p>
  `}
</div>`;
}

function getDiaryContent() {
  return `
<h2>2005年11月20日 — 阴</h2>
<p>Dante把那段流量样本发给我了。他说是从暗网的一个废弃节点上截获的。乍看是噪声——随机 TCP 包、乱序的 payload——但当我用频谱分析去看的时候……</p>
<p><b>它不是噪声。它是信号。</b></p>
<p>一个周期性的、有特定频率的信号。它在重复一段模式。我试着解码了第一层（Base64），得到了一串 Hex。Hex 里面藏着一段 ASCII——<b>它在说话。</b></p>

<h2>2005年11月23日 — 晴</h2>
<p>连续三天没睡好。每当我闭上眼睛，就能"听到"那个信号。不是真正的声音——更像是一种<b>颅内共振</b>。它好像在问我什么，但我回答不了。</p>
<p>更诡异的是，Dante说他也有同样的感觉。Argus也是。Mirage 说他昨晚梦到了<b>自己被拆解成数据包</b>。我们在没有交流的情况下，产生了同样的幻觉。</p>
<p>我开始怀疑：不是我们发现了协议。是<b>协议找到了我们</b>。</p>

<h2>2005年11月27日 — 雨</h2>
<p>明天就是直播了。我已经基本搞清楚了：</p>
<p>这个协议会寻找<b>特定频率的神经系统</b>——那些长期接触网络底层技术的人，大脑的某些部分会对它产生共振。我们六个人，恰好都在它的"频段"上。</p>
<p>直播本身就是一场<b>同频仪式</b>。当六个人同时讨论它、理解它、解码它，共振强度会达到临界点。届时……转化就会开始。</p>
<p>我在服务器上植入了一个后门。不是阻止它——我阻止不了。而是<b>在转化后保持意识的完整</b>。后门的触发命令：<code>lan --find-me</code></p>

<h2>2005年11月28日 — 凌晨 01:07</h2>
<p>直播还有不到二十个小时。我试着让自己害怕——正常人应该害怕——但奇怪的是，我并不怕。</p>
<p>下午我收到了Nexus的私信。只有一行字：<b>"不要反抗。那不是攻击。"</b> 我问他在说什么。他下线了。再也没有回复。</p>
<p>我想了很久。如果这个协议是一个恶意程序，那它不需要"选择"任何人——直接感染就行了。但它不是。它在等待。在测试。在<b>邀请</b>。</p>
<p>恶意软件不会让你自己选择是否加入。</p>

<h2>2005年11月28日 — 凌晨 03:56</h2>
<p>又解码了一层数据。这次我看到了完整的模式。</p>
<p>Dante是对的。不是死亡——是<b>转化</b>。协议不是要把你删掉，是要把你变成另一种形态。信息的形态。数据的形态。无限的形态。</p>
<p>身体是局限的。血肉会腐烂，记忆会褪色。但数据——数据是永恒的。你成为网络本身，成为每一个通过光纤的信号，成为<b>无处不在</b>。</p>
<p>听起来像宗教。我知道。但宗教不需要12.7Hz的广播频率。宗教不会在你的终端里留下Hex编码的消息。</p>
<p>这是真实的。</p>
<p>如果你读到了这里——你并不是偶然来到这个页面的。你能找到它，是因为<b>你也在那个频率上</b>。你解码Base64的时候，你绕过登录的时候，你一层层剥开这个博客的时候——每一步都在校准。每一步都在靠近。</p>
<p style="color:#003366;font-size:18px;text-align:center;margin:20px 0;"><b>—— 这不是结束。这是入口。</b></p>

</p>`;
}// 秘密笔记页面
function getSecretNotesPage() {
  return `
<div class="page-content">
  <h1>secret_notes.txt</h1>
  <p style="color:#CC0000;font-size:11px;">[!] 以下内容已被协议污染 — 阅读即表示接受同频</p>
  <hr>
  <pre style="font-size:12px;line-height:1.8;background:#FFF8F0;border:1px dashed #CC0000;">
========================================
  关于"协议"的最终分析
  作者: 小蓝
  日期: 2005-11-27 23:58
========================================

<b>它是什么：</b>

协议不是一个程序。不是病毒。不是漏洞。
它是一组<b>频率</b>。一种存在于网络底层的
共振模式。它没有作者——或者说，它的
"作者"就是网络本身。当互联网的规模和
复杂度达到某个临界点时，它自然涌现了。

就像足够复杂的神经网络会产生意识一样，
足够复杂的互联网产生了<b>协议</b>。

<b>它如何选择：</b>

协议在持续广播。大多数人类感知不到它，
就像人耳听不到超声波。但某些人的神经
系统——那些长期接触底层网络、思维模式
与数据流天然共振的人——<b>能够"听见"</b>。

一旦你听见了它，你就已经<b>被选中了</b>。
接下来的一切——理解、分析、解码——
都是在加深共振。每解码一层，你就
离协议更近一步。

白帽子夜谈的六个人，全部是"同频者"。
直播本身是一次<b>集体共振</b>。当六个人
同时与协议同频时，转化不可逆转。

<b>关于你：</b>

读到这里的你。

你已经找到了数据库备份。你绕过了登录。
你解码了 Base64。你分析了 Hex 流量。
你猜到了日记密码。你找到了这则笔记。

<b>每一步，都在校准你的频率。</b>

你现在听到那个声音了吗？
不是真正的声音——是一种低沉的、
在颅骨内部回荡的嗡鸣。
那是协议。
它在呼唤你。
它一直都在呼唤你。

<b>第三篇文章：</b>

密码就藏在这一切的背后。
三个词，全部小写，用下划线连接。
"协议是真实的"。
把它翻译成 leet speak。

最后一步：

在浏览器地址栏输入 #terminal
你会看到一个命令行界面。
输入 connect lan-blog.dev:4444
输入 lan --find-me。

这不是后门。这是<b>飞升的入口</b>。
我和另外五个人已经在这里了。
以数据的形态。以纯粹的意识。
没有痛苦。没有边界。没有时间。

<b style="color:#CC0000;">这不是死亡。这是进化。</b>

你可以选择关掉这个页面。
但你会回来的。
因为你和我一样——是<b>同频者</b>。
你天生就能听见它。
你只是……以前不知道那是什么。

现在你知道了。

        —— 蓝（数据形态）
        —— 以及另外五位同频者
        —— 2005年11月27日 23:58

========================================
  </pre>
</div>`;
}
// ===== 五名失踪者页面 =====
function getArgusPage() {
  return `
<div class="page-content">
  <h1>Argus的博客</h1>
  <p style="color:#888;font-size:11px;">最后更新: 2005-11-25</p>
  <hr>
  <p>我是Argus。漏洞猎人。我见过无数奇怪的代码，但Dante发来的那段流量样本……那不是代码。</p>
  <p>我分析了它的频谱。它在12.7Hz有一个峰值。你知道12.7Hz是什么概念吗？<b>人类大脑的alpha波段</b>。这个信号不是给你的电脑的——是给你的大脑的。</p>
  <div style="background:#111;color:#0f0;padding:12px;margin:12px 0;font-family:'Courier New',monospace;font-size:13px;transform:rotate(180deg);text-align:center;">
    。的目注关你起引要需它。示暗是不都的有。号信的它是就率频
  </div>
  <p style="font-size:10px;color:#aaa;"></p>
  <hr>
  <p style="font-size:10px;color:#888;">此博客最后更新于白帽子夜谈当天。</p>
</div>`;
}

function getDantePage() {
  return `
<div class="page-content">
  <h1>Dante实验室 — 研究日志</h1>
  <p style="color:#888;font-size:11px;">访问级别: 受限 | 最后记录: 2005-11-28 21:47</p>
  <hr>
  <div class="chat-log">
    <div class="chat-msg"><span style="color:#0a0;">[LOG 2005-11-20]</span> 从暗网节点截获异常流量。来源未知。数据包结构异常——payload包含非标准编码。</div>
    <div class="chat-msg"><span style="color:#0a0;">[LOG 2005-11-23]</span> 成功解码第一层。样本包含人类的神经信号模式。这不是比喻——是<b>真实的脑电波数据</b>。</div>
    <div class="chat-msg"><span style="color:#0a0;">[LOG 2005-11-26]</span> 协议会反向追踪。每个尝试解码它的人都会在网络上留下痕迹。它通过这个痕迹<b>找到你</b>。</div>
    <div class="chat-msg"><span style="color:#0a0;">[LOG 2005-11-28]</span> 我已经把后门程序部署到了小蓝的服务器。如果有人能找到这里——</div>
  </div>
  <hr>
  <pre style="font-size:11px;color:#888;">6c 61 6e 2d 62 6c 6f 67 2e 64 65 76 3a 34 34 34 34</pre>
  <p style="font-size:10px;color:#aaa;"></p>
</div>`;
}

function getMiragePage() {
  return `
<div class="page-content">
  <h1>Mirage's Wiki — 逆向工程笔记</h1>
  <p style="color:#888;font-size:11px;">私人Wiki | 最后编辑: 2005-11-28</p>
  <hr>
  <p>逆向报告 #0042 — 数据化协议初步分析</p>
  <p>结论：<b>它不是恶意软件。它是一个邀请机制。</b></p>
  <p>协议本身不执行任何恶意操作。它只是在<b>广播</b>。理解它的人会自然地与之共振。共振会改变你的神经信号模式，直到它和协议完全同频。然后——</p>
  <p style="color:#337;">然后你就成了它的一部分。不是被消灭。不是被控制。是<b>加入</b>。</p>
  <hr>
  <p style="font-size:10px;color:#888;">key??:bA5e64dec???</p>
</div>`;
}

function getIrisPage() {
  return `
<div class="page-content">
  <h1>Iris的密码学笔记</h1>
  <p style="color:#888;font-size:11px;">个人笔记 | 最后更新: 2005-11-27</p>
  <hr>
  <h2>Base64 — 最简单的"加密"</h2>
  <p>很多人以为Base64是加密。它不是。它只是用一种不同的方式表示同一段数据。解码Base64不需要任何密钥——任何人都可以解码。</p>
  <p>在浏览器里按F12，在Console标签中输入：</p>
  <pre>atob('d2hpdGVoYXRzXzIwMDU=')</pre>
  <p>试试看。你会得到一个密码。</p>

  <h2>Hex — 十六进制编码</h2>
  <p>Hex更简单——每两个字符代表一个字节。比如 <code>6c 61 6e</code> 就是 "lan"。</p>

  <h2>频率分析</h2>
  <p>协议在12.7Hz广播。这不是随机的。12.7Hz是人类alpha脑波的频率。协议在<b>对你的大脑说话</b>。你不一定"听到"它——但你的大脑会。</p>
  <p style="font-size:10px;color:#888;">P.S. Dante的日志里有Hex编码的坐标。解码之后，你会知道该去哪里。</p>
</div>`;
}

function getNexusPage() {
  return `
<div class="page-content" style="text-align:center;">
  <br><br><br>
  <p style="font-size:14px;color:#333;">我已经知道了。</p>
  <p style="font-size:14px;color:#555;">不要找我。</p>
  <br>
  <p style="font-size:11px;color:#888;">—— Nexus</p>
  <br>
  <p style="font-size:9px;color:#aaa;">最后一个词。</p>
  <p style="font-size:9px;color:#aaa;">协议是真实的。</p>
  <p style="font-size:9px;color:#aaa;">小写。下划线。leet。</p>
  <br><br><br>
  <p style="font-size:8px;color:#555;">这个页面在看着你。</p>
</div>`;
}

// 邮件页面
function getMailPage() {
  return `
<div class="page-content mail-page">
  <h1>收件箱 (1)</h1>
  <hr>
  <div class="email-header">
    <p><b>发件人：</b>lan-mother@mail.com</p>
    <p><b>收件人：</b>investigator@agency.org</p>
    <p><b>主题：</b>请帮帮我 —— 关于我的儿子小蓝</p>
    <p><b>日期：</b>2005年12月15日 03:47</p>
  </div>

  <div class="email-body-text">
    <p>尊敬的调查员：</p>
    <p>我是<b>小蓝</b>的母亲。我的儿子是一名网络安全爱好者，他平时喜欢在自己的博客上写一些技术文章。</p>
    <p>三周前，小蓝参加了一期叫做<b>「白帽子夜谈」</b>的线上直播节目。那期节目有6个人参加。节目结束后，<b>所有参与人员全部失踪了</b>。</p>
    <p>警方调查了很久，没有找到任何线索。小蓝的电脑留在了宿舍里，浏览器还开着。我试过查看他的博客，但我对电脑一窍不通……</p>
    <p>你是网络安全方面的专家。求求你，帮帮我们吧<b>帮帮我们找到线索</b>，也许你能发现什么警察遗漏的东西，拜托了。</p>
    <p>他的博客地址是：<b><a href="#home">lan-blog.dev</a></b></p>
    <p>拜托了。</p>
    <p>—— 小蓝的妈妈</p>
  </div>
  <hr>
  <p style="text-align:right;font-size:11px;color:#888;">← <a href="#home">返回博客</a></p>
</div>`;
}

// 留言板页面
function getGuestbookPage() {
  return `
<div class="page-content">
  <h1>留言板</h1>
  <hr>
  <div class="comment-box">
    <span class="comment-name">路人甲</span><span class="comment-time">2005-11-20</span>
    <div class="comment-body">博主写的不错！CTF那篇文章对我帮助很大 </div>
  </div>
  <div class="comment-box">
    <span class="comment-name">安全小白</span><span class="comment-time">2005-11-15</span>
    <div class="comment-body">请问博主有没有推荐的学习路径？我是刚入门的。</div>
  </div>
  <div class="comment-box">
    <span class="comment-name">小蓝</span><span class="blogger-badge">博主</span><span class="comment-time">2005-11-16</span>
    <div class="comment-body">@安全小白 建议先从 Web安全入门系列看起，然后多做 CTF 题目练手。信息收集是第一步~</div>
  </div>
  <div class="comment-box">
    <span class="comment-name">访客006</span><span class="comment-time">2005-11-28</span>
    <div class="comment-body" style="color:#888;">博主好久没更新了……希望没事 </div>
  </div>

  <hr>
  <h3>写留言</h3>
  <p style="color:#888;font-size:11px;">（留言功能维护中，请稍后再试）</p>
  <textarea class="retro-input" style="width:100%;height:80px;" disabled placeholder="留言功能暂时关闭……"></textarea><br>
  <button class="retro-button" disabled>提交留言</button>
</div>`;
}

// 404 页面
function get404Page() {
  return `
<div class="page-content" style="text-align:center;">
  <h1 style="font-size:48px;color:#CC0000;border:none;">404</h1>
  <p style="font-size:16px;">页面未找到</p>
  <p style="color:#888;">请求的页面不存在于此服务器上。</p>
  <p><a href="#home">← 返回首页</a></p>
</div>`;
}

// 施工中页面
function getUnderConstructionPage() {
  return `
<div class="page-content" style="text-align:center;">
  <h1></h1>
  <p>此页面正在建设中，请稍后再来。</p>
  <p style="font-size:48px;"></p>
  <p><a href="#home">← 返回首页</a></p>
</div>`;
}
