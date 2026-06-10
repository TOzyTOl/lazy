/* ========== Hash路由 + 谜题检测 + 页面交互 ========== */

let currentHash = '';

function initRouter() {
  // 监听 hash 变化
  window.addEventListener('hashchange', () => {
    handleRoute(window.location.hash);
  });

  // 处理初始 hash
  const initialHash = window.location.hash || '#home';
  handleRoute(initialHash);

  // 启动一些定时效果
  setInterval(() => {
    if (gameState.glitchIntensity > 0.3 && Math.random() < gameState.glitchIntensity * 0.15) {
      triggerGlitch();
    }
  }, 30000 + Math.random() * 60000);

  // 更新计数器
  updateCounter();
  updateUptime();
}

function handleRoute(hash) {
  if (!hash || hash === '#') hash = '#home';
  if (hash === currentHash && document.getElementById('page-content').innerHTML) return;
  currentHash = hash;

  const mainContainer = document.getElementById('main-container');
  const terminalPage = document.getElementById('terminal-page');
  const pageContent = document.getElementById('page-content');
  const breadcrumb = document.getElementById('breadcrumb');

  // 终端页面特殊处理
  if (hash === '#terminal') {
    if (mainContainer) mainContainer.style.display = 'none';
    if (terminalPage) {
      terminalPage.style.display = 'flex';
      initTerminal();
      setTimeout(() => document.getElementById('terminal-input')?.focus(), 200);
    }
    // 解锁终端
    if (!gameState.terminalUnlocked) {
      gameState.terminalUnlocked = true;
      saveState();
    }
    return;
  }

  // 正常页面
  if (terminalPage) terminalPage.style.display = 'none';
  if (mainContainer) mainContainer.style.display = 'block';

  if (!pageContent) return;

  let content = '';
  let bc = '';

  switch (hash) {
    case '#home':
      content = getHomePage();
      bc = '📍 当前位置：<a href="#home">首页</a>';
      break;

    case '#post/intro':
      content = getPostPage('intro');
      bc = '当前位置：<a href="#home">首页</a> &gt; <a href="#post/intro">你好，世界。</a>';
      break;

    case '#post/whitehat':
      content = getPostPage('whitehat');
      bc = '📍 当前位置：<a href="#home">首页</a> &gt; <a href="#post/whitehat">白帽子夜谈</a>';
      break;

    case '#post/ctf-2005':
      content = getPostPage('ctf-2005');
      bc = '📍 当前位置：<a href="#home">首页</a> &gt; <a href="#post/ctf-2005">CTF Writeup</a>';
      break;

    case '#post/websec-101':
      content = getPostPage('websec-101');
      bc = '📍 当前位置：<a href="#home">首页</a> &gt; <a href="#post/websec-101">Web安全入门</a>';
      break;

    case '#post/base64':
      content = getPostPage('base64');
      bc = '📍 当前位置：<a href="#home">首页</a> &gt; <a href="#post/base64">Base64教程</a>';
      break;

    // === 隐藏页面 ===
    case '#robots':
      content = getRobotsPage();
      bc = '当前位置：<a href="#home">首页</a> &gt; robots.txt';
      break;

    case '#backup':
      content = getBackupPage();
      bc = '当前位置：<a href="#home">首页</a> &gt; /backup/';
      break;

    case '#backup/db-dump':
      content = getDbDumpPage();
      bc = '📍 <a href="#home">首页</a> &gt; <a href="#backup">/backup/</a> &gt; db_dump.sql';
      break;

    case '#backup/config':
      content = getConfigBakPage();
      bc = '📍 <a href="#home">首页</a> &gt; <a href="#backup">/backup/</a> &gt; config.bak';
      break;

    case '#admin':
      if (gameState.adminAccessGranted) {
        content = getAdminPanelPage();
        bc = '当前位置：<a href="#home">首页</a> &gt; 管理后台';
      } else {
        content = getAdminLoginPage();
        bc = '当前位置：<a href="#home">首页</a> &gt; 管理后台';
      }
      break;

    case '#private':
      content = getPrivateDiaryPage();
      bc = '📍 <a href="#home">首页</a> &gt; 📔 私密日记';
      break;

    case '#private/notes':
      content = getSecretNotesPage();
      bc = '📍 <a href="#home">首页</a> &gt; 📔 私密日记 &gt; secret_notes.txt';
      if (!gameState.secretNotesRead) {
        gameState.secretNotesRead = true;
        gameState.terminalUnlocked = true;
        increaseGlitch(0.15);
        updateBodyPhase();
        updateDroneFrequency();
        saveState();
        updateSidebar();
        updateStatusBar(window.location.hash);
        updateFooterWhisper();
        showHint('秘密笔记！小蓝提到 /terminal 页面和后门命令 lan --find-me……');
      }
      break;

    case '#mail':
      content = getMailPage();
      bc = '📍 <a href="#home">首页</a> &gt; 📧 邮件';
      break;

        case '#argus':
      content = getArgusPage();
      bc = '当前位置：<a href="#home">首页</a> &gt; Argus的博客';
      break;

    case '#dante':
      content = getDantePage();
      bc = '当前位置：<a href="#home">首页</a> &gt; Dante实验室';
      break;

    case '#mirage':
      content = getMiragePage();
      bc = '当前位置：<a href="#home">首页</a> &gt; Mirage的Wiki';
      break;

    case '#iris':
      content = getIrisPage();
      bc = '当前位置：<a href="#home">首页</a> &gt; Iris的密码学笔记';
      break;

    case '#nexus':
      content = getNexusPage();
      bc = '当前位置：<a href="#home">首页</a> &gt; Nexus观测站';
      break;

    case '#guestbook':
      content = getGuestbookPage();
      bc = '📍 <a href="#home">首页</a> &gt; 📔 留言板';
      break;

    default:
      content = get404Page();
      bc = '📍 404 — 页面未找到';
      break;
  }

  pageContent.innerHTML = content;
  pageContent.classList.add('page-fade-in');
  if (breadcrumb) breadcrumb.innerHTML = bc;

  // 记录访问
  if (!gameState.visitedHashes.includes(hash)) {
    gameState.visitedHashes.push(hash);
  }

  // 延迟初始化页面交互
  setTimeout(() => initPageInteractions(hash), 200);

  // 更新状态栏 + 低语 + 闪烁
  updateStatusBar(hash);
  updateFooterWhisper();
  updateSidebar();
  transitionFlash(hash);

  // 滚动到顶部
  window.scrollTo(0, 0);
  saveState();
}

function initPageInteractions(hash) {
  // Admin BSOD page — click handler + error sound
  if (hash === '#admin') {
    if (!gameState.foundAdmin) {
      gameState.foundAdmin = true;
      saveState();
    }
    // Delay for DOM to render
    setTimeout(() => {
      const overlay = document.getElementById('bsod-overlay');
      const hidden = document.getElementById('admin-hidden-content');
      if (!overlay || !hidden) return;

      // 同频校准音效 — 从噪音扫频到锁定
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const now = ctx.currentTime;

        // 主音：从低频扫到锁定频率，从粗糙到纯净
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        osc.connect(filter); filter.connect(gain); gain.connect(ctx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.linearRampToValueAtTime(320, now + 0.8);
        osc.frequency.linearRampToValueAtTime(327, now + 1.2);
        osc.frequency.setValueAtTime(327, now + 1.8);  // 锁定

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(200, now);
        filter.frequency.linearRampToValueAtTime(800, now + 1.2);
        filter.Q.setValueAtTime(8, now);
        filter.Q.linearRampToValueAtTime(1, now + 1.5);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.07, now + 0.3);
        gain.gain.setValueAtTime(0.07, now + 1.6);
        gain.gain.linearRampToValueAtTime(0, now + 2.2);

        osc.start(now); osc.stop(now + 2.3);

        // 第二泛音：从失调到和谐
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.connect(gain2); gain2.connect(ctx.destination);
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(215, now);
        osc2.frequency.linearRampToValueAtTime(310, now + 0.6);
        osc2.frequency.linearRampToValueAtTime(327, now + 1.4); // 最终与主音融合
        gain2.gain.setValueAtTime(0, now);
        gain2.gain.linearRampToValueAtTime(0.03, now + 0.2);
        gain2.gain.linearRampToValueAtTime(0, now + 1.8);
        osc2.start(now); osc2.stop(now + 1.9);
      } catch(e) {}

      overlay.addEventListener('click', function dismiss() {
        overlay.style.display = 'none';
        hidden.style.display = 'block';
        gameState.adminAccessGranted = true;
        saveState();
        const content = document.getElementById('page-content');
        if (content) content.classList.add('page-fade-in');
        overlay.removeEventListener('click', dismiss);
      });
    }, 300);
    return;
  }

  // Locked posts unlocking on homepage
  if (hash === '#home') {
    document.querySelectorAll('.locked-post').forEach(post => {
      const btn = post.querySelector('.unlock-btn');
      const input = post.querySelector('.unlock-input');
      const error = post.querySelector('.unlock-error');
      const content = post.querySelector('.unlocked-content');
      const titleEl = post.querySelector('.locked-title');
      const dateEl = post.querySelector('.post-date');
      const excerptEl = post.querySelector('.locked-excerpt');
      const formEl = post.querySelector('.unlock-form');
      const postId = post.id;

      if (!btn || btn.dataset.bound) return;
      btn.dataset.bound = '1';

      // Password mapping & post links
      const passwords = {
        'locked-post-1': 'whitehats_2005',
        'locked-post-2': 'bA5e64dec0de',
        'locked-post-3': 'th3_pr0t0c0l_1s_r34l'
      };
      const postHashes = {
        'locked-post-1': '#post/whitehat',
        'locked-post-2': '#post/ctf-2005',
        'locked-post-3': '#post/websec-101'
      };
      const contents = {
        'locked-post-1': {
          title: '白帽子夜谈 — 本周五晚，不见不散！',
          date: '2005-11-25',
          excerpt: '周五晚上8点，我将主持「白帽子夜谈」。Argus、Dante、Mirage、Iris、Nexus 都会来——六个同频者齐聚一堂。是巧合吗？我不确定。',
          content: getPostPage('whitehat')
        },
        'locked-post-2': {
          title: '2005 全国大学生 CTF 竞赛 Writeup',
          date: '2005-11-10',
          excerpt: 'Web方向的一道SQL注入题很有意思。不过最有趣的是一道Misc题——一段Base64编码的数据，解码之后的内容让我想了很多。关于"编码的本质"。',
          content: getPostPage('ctf-2005')
        },
        'locked-post-3': {
          title: 'Web 安全入门指南（三）：信息收集',
          date: '2005-10-28',
          excerpt: '信息收集最重要的一步往往被忽略：查看页面源代码。开发者在HTML注释中留下的东西，有时候直接通向整个系统的核心。',
          content: getPostPage('websec-101')
        }
      };

      // 如果已解锁过，直接显示内容
      if (gameState.unlockedPosts.includes(postId)) {
        const info = contents[postId];
        titleEl.innerHTML = '<a href=\"' + postHashes[postId] + '\">' + info.title + '</a>';
        titleEl.classList.remove('locked-title');
        dateEl.textContent = info.date;
        excerptEl.textContent = info.excerpt;
        excerptEl.classList.remove('locked-excerpt');
        formEl.style.display = 'none';
        content.innerHTML = info.content;
        content.style.display = 'block';
        saveState();
        return;
      }

      btn.addEventListener('click', () => {
        const pwd = input.value.trim();
        if (pwd === passwords[postId]) {
          const info = contents[postId];
          titleEl.innerHTML = '<a href=\"' + postHashes[postId] + '\">' + info.title + '</a>';
          titleEl.classList.remove('locked-title');
          dateEl.textContent = info.date;
          excerptEl.textContent = info.excerpt;
          excerptEl.classList.remove('locked-excerpt');
          formEl.style.display = 'none';
          content.innerHTML = info.content;
          content.style.display = 'block';
          gameState.unlockedPosts.push(postId);
          increaseGlitch(0.04);
          updateBodyPhase();
          updateDroneFrequency();
          saveState();
          updateSidebar();
          updateStatusBar(window.location.hash);
          updateFooterWhisper();
        } else {
          error.style.display = 'block';
          error.textContent = '密码错误';
        }
      });

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') btn.click();
      });
    });
    return;
  }

  // 管理员登录 (old, keep for compatibility)
  if (hash === '#admin' && !gameState.adminLoggedIn) {
    const btn = document.getElementById('admin-login-btn');
    const userInput = document.getElementById('admin-user');
    const passInput = document.getElementById('admin-pass');
    const errorEl = document.getElementById('admin-error');

    if (btn) {
      btn.addEventListener('click', () => {
        const user = userInput?.value || '';
        const pass = passInput?.value || '';

        // 检测SQL注入模式
        const sqli = /(\s*'.*OR.*'.*'\s*=\s*'|--|\bUNION\b)/i;
        const isInjection = sqli.test(user) || sqli.test(pass) ||
          user.includes("'") || pass.includes("'") ||
          (user.toLowerCase().includes('or') && user.includes('='));

        if (isInjection) {
          gameState.adminLoggedIn = true;
          if (errorEl) errorEl.style.display = 'none';
          showHint('SQL注入成功！管理后台已解锁。');
          increaseGlitch(0.05);
          window.location.hash = '#admin/dashboard';
        } else if (errorEl) {
          errorEl.style.display = 'block';
          errorEl.textContent = '❌ 用户名或密码错误';
          if (user.includes("'") || pass.includes("'")) {
            setTimeout(() => {
              errorEl.textContent = '❌ 用户名或密码错误 — 但你在尝试什么……继续。';
            }, 1500);
          }
        }
      });

      passInput?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') btn.click();
      });
    }
  }

  // 日记密码
  if (hash === '#private' && !gameState.diaryUnlocked) {
    const btn = document.getElementById('diary-login-btn');
    const input = document.getElementById('diary-pass');
    const errorEl = document.getElementById('diary-error');

    if (btn && input) {
      btn.addEventListener('click', () => {
        if (input.value === 'xlb_20031128' || input.value === '20031128') {
          gameState.diaryUnlocked = true;
          if (errorEl) errorEl.style.display = 'none';
          showHint('日记解锁成功！小蓝在日记里留下了重要线索……');
          increaseGlitch(0.1);
          updateBodyPhase();
          updateDroneFrequency();
          saveState();
          updateSidebar();
          updateStatusBar(window.location.hash);
          updateFooterWhisper();
          // 重新渲染
          document.getElementById('page-content').innerHTML = getPrivateDiaryPage();
        } else if (errorEl) {
          errorEl.style.display = 'block';
        }
      });

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') btn.click();
      });
    }
  }

  // 流量分析按钮
  const trafficBtn = document.getElementById('btn-analyze-traffic');
  if (trafficBtn) {
    trafficBtn.addEventListener('click', () => {
      const resultEl = document.getElementById('traffic-result');
      if (!resultEl) return;

      const hex = '49 20 61 6d 20 73 74 69 6c 6c 20 68 65 72 65 2e 54 68 65 79 20 64 69 64 6e 27 74 20 74 61 6b 65 20 6d 65 2e 20 49 20 68 69 64 20 6d 79 73 65 6c 66 20 69 6e 20 74 68 65 20 70 61 63 6b 65 74 73 2e 20 46 69 6e 64 20 6d 65 20 61 74 20 2f 70 72 69 76 61 74 65 2f 64 69 61 72 79 2f 20 2d 20 70 61 73 73 77 6f 72 64 20 69 73 20 6d 79 20 62 69 72 74 68 64 61 79 2e';
      const decoded = hex.replace(/\s+/g, '').match(/.{1,2}/g)
        .map(b => String.fromCharCode(parseInt(b, 16))).join('');

      resultEl.style.display = 'block';
      resultEl.innerHTML = `✅ 解码结果：<br><br>"<em>${decoded}</em>"<br><br>
        <span style="font-size:11px;color:#888;">小蓝在数据流中留下了信息：他藏在 /private/diary/ 里，密码是他的生日密钥。</span>`;

      if (!gameState.trafficAnalyzed) {
        gameState.trafficAnalyzed = true;
        saveState();
        showHint('Hex 解码成功！小蓝暗示了日记的位置和密码。');
      }
    });
  }

  // 管理后台面板链接
  if (hash === '#admin/dashboard') {
    // 为聊天记录中的编码数据添加提示
    document.querySelectorAll('.chat-log code').forEach(el => {
      el.style.cursor = 'pointer';
      el.title = '点击复制此编码数据';
      el.addEventListener('click', () => {
        navigator.clipboard?.writeText(el.textContent);
        showHint('编码数据已复制！可以用终端的 decode 命令解码。');
      });
    });
  }
}

// 更新状态栏 — 四阶段递进
function updateStatusBar(hash) {
  const bar = document.getElementById('status-bar');
  if (!bar) return;

  const pageNames = {
    '#home': '首页', '#post/intro': '文章：你好，世界。',
    '#post/whitehat': '文章：白帽子夜谈', '#post/ctf-2005': '文章：CTF Writeup',
    '#post/websec-101': '文章：Web安全入门', '#post/base64': '文章：Base64教程',
    '#admin': '管理后台', '#backup': '备份目录',
    '#backup/db-dump': '数据库备份文件', '#backup/config': '服务器配置文件',
    '#private': '私密日记', '#private/notes': '秘密笔记',
    '#terminal': '远程终端', '#mail': '邮件', '#guestbook': '留言板',
    '#robots': 'robots.txt', '#argus': 'Argus的博客', '#dante': 'Dante实验室',
    '#mirage': 'Mirage的Wiki', '#iris': 'Iris的密码学笔记', '#nexus': 'Nexus观测站'
  };
  const name = pageNames[hash] || hash.replace('#', '');

  bar.classList.remove('protocol-watching', 'protocol-aware');

  if (gameState.secretNotesRead) {
    // 阶段4：协议完全控制
    bar.textContent = '协议正在访问您';
    bar.classList.add('protocol-watching');
  } else if (gameState.diaryUnlocked) {
    // 阶段3：察觉被注视
    bar.textContent = '有人正在注视您';
    bar.classList.add('protocol-aware');
  } else {
    // 阶段1-2：正常浏览
    bar.textContent = '您正在访问 ' + name;
  }
}

// 更新页面底部低语
function updateFooterWhisper() {
  let whisper = document.getElementById('footer-whisper');
  if (!whisper) {
    whisper = document.createElement('div');
    whisper.id = 'footer-whisper';
    whisper.className = 'footer-whisper';
    const footer = document.querySelector('.footer');
    if (footer) footer.parentNode.insertBefore(whisper, footer);
  }
  if (!whisper) return;

  if (gameState.secretNotesRead) {
    whisper.textContent = '你一直在听。你一直在同频。';
    whisper.style.opacity = '0.7';
  } else if (gameState.diaryUnlocked) {
    whisper.textContent = '你在听吗';
    whisper.style.opacity = '0.3';
  } else if (gameState.adminAccessGranted) {
    whisper.textContent = '';
    whisper.style.opacity = '0';
  } else {
    whisper.textContent = '';
    whisper.style.opacity = '0';
  }
}


// ========== 动态侧边栏 ==========
function updateSidebar() {
  const chars = ['argus','dante','mirage','iris','nexus'];
  const visited = gameState.visitedHashes || [];

  chars.forEach(id => {
    const el = document.getElementById('link-' + id);
    if (!el) return;
    const a = el.querySelector('a');
    const s = el.querySelector('.link-status');
    if (!a || !s) return;

    const hash = '#' + id;
    const wasVisited = visited.includes(hash);

    if (gameState.secretNotesRead) {
      a.href = hash;
      a.onclick = null;
      s.textContent = '[已同频]';
      s.style.color = '#CC0000';
    } else if (gameState.diaryUnlocked) {
      a.href = hash;
      a.onclick = null;
      s.textContent = wasVisited ? '[最后访问: 2005.11.28]' : '[已离线]';
      s.style.color = '#996600';
    } else if (wasVisited) {
      a.href = hash;
      a.onclick = null;
      s.textContent = '[最后访问: 2005.11.28]';
      s.style.color = '#888';
    }
    // else: keep default [已失效]
  });
}

window.updateSidebar = updateSidebar;

// 页面切换时的短暂闪烁
function transitionFlash(hash) {
  if (hash === '#private' && !gameState.diaryUnlocked) return;
  if (hash === '#private/notes' && !gameState.secretNotesRead) {
    const flash = document.createElement('div');
    flash.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#000;z-index:10001;display:flex;align-items:center;justify-content:center;pointer-events:none;opacity:0.9;';
    flash.innerHTML = '<div style="color:#0f0;font-family:monospace;font-size:16px;text-align:center;">你正在接近真相。<br>真相也在接近你。</div>';
    document.body.appendChild(flash);
    setTimeout(() => { flash.style.opacity = '0'; flash.style.transition = 'opacity 0.5s'; }, 600);
    setTimeout(() => { flash.remove(); }, 1200);
  }
}

// 更新访客计数器
function updateCounter() {
  const saved = sessionStorage.getItem('lanblog_visits');
  const visits = (parseInt(saved) || 1337) + 1;
  try { sessionStorage.setItem('lanblog_visits', visits.toString()); } catch(e) {}

  const counterEl = document.getElementById('visitor-counter');
  if (counterEl) counterEl.textContent = String(visits).padStart(5, '0');

  const footerCounter = document.getElementById('footer-counter');
  if (footerCounter) footerCounter.textContent = String(visits).padStart(5, '0');
}

// 更新运行时间
function updateUptime() {
  const el = document.getElementById('uptime');
  if (!el) return;
  const start = new Date('2005-09-01');
  const days = Math.floor((Date.now() - start) / (1000 * 60 * 60 * 24));
  el.textContent = days;
}

// ========== 开场序列 ==========
function startIntroSequence() {
  const mainContainer = document.getElementById('main-container');
  const emailIntro = document.getElementById('email-intro');

  // 隐藏博客和邮件（但保留博客已渲染的内容）
  if (mainContainer) mainContainer.style.display = 'none';
  if (emailIntro) emailIntro.style.display = 'none';

  // 第一步：显示快报
  showNewsBulletin();
}

function showNewsBulletin() {
  const newsBulletin = document.getElementById('news-bulletin');
  if (!newsBulletin) return;
  newsBulletin.style.display = 'flex';
  document.body.style.background = '#000';

  const btn = document.getElementById('btn-close-bulletin');
  if (btn) {
    // 防止重复绑定
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    newBtn.addEventListener('click', () => {
      document.getElementById('news-bulletin').style.display = 'none';
      setTimeout(() => showEmailIntro(), 300);
    });
  }
}

function showEmailIntro() {
  const emailIntro = document.getElementById('email-intro');
  if (!emailIntro) return;
  emailIntro.style.display = 'flex';

  const blogLink = document.getElementById('btn-enter-blog');
  if (blogLink) {
    const newLink = blogLink.cloneNode(true);
    blogLink.parentNode.replaceChild(newLink, blogLink);
    newLink.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('email-intro').style.display = 'none';
      document.body.style.background = '#000020';
      if (typeof startAmbientDrone === 'function') startAmbientDrone();

      // 标记开场完成
      gameState.introComplete = true;
      saveState();

      // 显示博客并定位到首页
      const mainContainer = document.getElementById('main-container');
      if (mainContainer) mainContainer.style.display = 'block';

      // 强制刷新首页内容
      currentHash = '';
      window.location.hash = '#home';
    });
  }
}

// ========== 启动 ==========
document.addEventListener('DOMContentLoaded', () => {
  const hasProgress = loadState();
  initRouter();

  // 初始化状态栏
  updateStatusBar(window.location.hash || '#home');

  // 只在全新打开时展示过场（刷新时 sessionStorage 保留，跳过）
  if (!hasProgress || !gameState.introComplete) {
    startIntroSequence();
  }
});


function updateBodyPhase() {
  if (gameState.glitchIntensity > 0.5) {
    document.body.classList.add('phase-degrade', 'phase-corrupt');
  } else if (gameState.glitchIntensity > 0.3) {
    document.body.classList.add('phase-degrade');
    document.body.classList.remove('phase-corrupt');
  } else {
    document.body.classList.remove('phase-degrade', 'phase-corrupt');
  }
}
window.updateBodyPhase = updateBodyPhase;

// ========== 键盘快捷键（ARG隐藏） ==========
document.addEventListener('keydown', (e) => {
  // Ctrl+Shift+T 快速打开终端
  if (e.ctrlKey && e.shiftKey && e.key === 'T') {
    e.preventDefault();
    window.location.hash = '#terminal';
  }
  // ESC 从终端返回
  if (e.key === 'Escape' && currentHash === '#terminal') {
    window.location.hash = '#home';
  }
});
