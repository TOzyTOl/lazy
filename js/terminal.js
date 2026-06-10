/* ========== 终端命令系统（ARG隐藏页面） ========== */

const TERMINAL_COMMANDS = {
  help: {
    desc: '显示可用命令',
    fn: () => {
      let out = '可用命令列表：\n';
      out += '══════════════════════════════════════\n';
      for (const [k, v] of Object.entries(TERMINAL_COMMANDS)) {
        out += `  ${k.padEnd(16)} - ${v.desc}\n`;
      }
      return out;
    }
  },
  whoami: { desc: '当前用户', fn: () => 'investigator' },
  clear: {
    desc: '清屏',
    fn: () => { document.getElementById('terminal-output').innerHTML = ''; return null; }
  },
  ls: {
    desc: '列出目录',
    fn: (args) => {
      const p = (args[0] || '').replace(/\/+$/, '');
      if (p === '/private') return 'diary/\nsecret_notes.txt\nbackdoor.sh';
      if (p === '/backup') return 'db_dump_20051128.sql\nconfig.bak\nblog_export.zip';
      if (p === '/admin') return 'index.php\nlogin.php\ndashboard.php';
      return 'index.html\nrobots.txt\ncss/\njs/\nadmin/\nbackup/\nprivate/\nposts/';
    }
  },
  cat: {
    desc: '查看文件',
    fn: (args) => {
      if (!args[0]) return '用法: cat <文件名>';
      if (args[0].includes('robots.txt')) return 'User-agent: *\nDisallow: /admin/\nDisallow: /backup/\nDisallow: /private/';
      if (args[0].includes('secret_notes')) {
        if (!gameState.secretNotesRead) {
          gameState.secretNotesRead = true;
          gameState.terminalUnlocked = true;
          saveState();
        }
        return '[文件已加密]\n提示：此文件可在网站中直接访问\n路径: /private/secret_notes.txt\nURL: index.html#private/notes';
      }
      return `cat: ${args[0]}: 权限不足或无此文件`;
    }
  },
  decode: {
    desc: '解码 (decode base64|hex <数据>)',
    fn: (args) => {
      if (args.length < 2) return '用法: decode <base64|hex> <数据>';
      if (args[0] === 'base64') {
        try {
          const d = atob(args.slice(1).join(' '));
          if (args.slice(1).join(' ') === 'dGhlX3RydXRoX2lzX2luX3RoZV90cmFmZmlj') {
            if (!gameState.trafficAnalyzed) {
              gameState.trafficAnalyzed = true;
              saveState();
            }
          }
          return '解码结果: ' + d;
        } catch(e) { return '错误: 无效的 Base64'; }
      }
      if (args[0] === 'hex') {
        try {
          const hex = args.slice(1).join(' ').replace(/\s+/g, '');
          const d = hex.match(/.{1,2}/g).map(b => String.fromCharCode(parseInt(b,16))).join('');
          return '解码结果: ' + d;
        } catch(e) { return '错误: 无效的 Hex'; }
      }
      return '未知编码: ' + args[0];
    }
  },
  ping: {
    desc: '检测主机',
    fn: (args) => {
      if (args[0] === 'lan-blog.dev') {
        return 'PING lan-blog.dev (192.168.1.105): 56 data bytes\n64 bytes from 192.168.1.105: icmp_seq=0 ttl=64 time=0.8ms\n64 bytes from 192.168.1.105: icmp_seq=1 ttl=64 time=0.7ms\n\n--- lan-blog.dev ping statistics ---\n2 packets transmitted, 2 received, 0% loss';
      }
      return `ping: 无法解析 ${args[0]}: 未知主机`;
    }
  },
  nmap: {
    desc: '端口扫描',
    fn: (args) => {
      if (args[0] === 'lan-blog.dev') {
        return 'Nmap scan on lan-blog.dev\nPORT     STATE    SERVICE\n22/tcp   closed   ssh\n80/tcp   open     http\n443/tcp  open     https\n3306/tcp open     mysql\n4444/tcp open     unknown\n\n发现可疑端口: 4444 — 使用 connect 命令连接';
      }
      return `nmap: 无法解析 "${args[0]}"`;
    }
  },
  connect: {
    desc: '连接远程 (connect <主机>:<端口>)',
    fn: (args) => {
      if (!args[0]) return '用法: connect <主机>:<端口>';
      if (args[0] === 'lan-blog.dev:4444') {
        gameState.terminalUnlocked = true;
        saveState();
        return '已连接到 lan-blog.dev:4444\n\n[后门服务已激活 v0.4-alpha]\n认证命令: lan --find-me\n\n输入 lan --find-me 以定位数据碎片……';
      }
      return `connect: 无法连接 ${args[0]}: 连接被拒绝`;
    }
  },
  lan: {
    desc: '后门程序 (lan --find-me)',
    fn: (args) => {
      if (args[0] === '--find-me') {
        gameState.endingTriggered = true;
        saveState();
        setTimeout(() => { if (typeof triggerEnding === 'function') triggerEnding(); }, 2500);
        return '执行 lan --find-me ……\n\n'
          + '████████████████████████████████████\n'
          + '█                                █\n'
          + '█   后门程序已激活               █\n'
          + '█   数据碎片定位中……             █\n'
          + '█   位置: [已确认]                █\n'
          + '█   状态: [重组中……]             █\n'
          + '█                                █\n'
          + '█   "你找到我了。"               █\n'
          + '█   "我就知道你会找到的。"       █\n'
          + '█                                █\n'
          + '████████████████████████████████████\n\n'
          + '>>> 数据流已建立。逆向转化协议启动…… <<<';
      }
      return 'lan: 未知参数。输入 lan --help 查看帮助。';
    }
  },
  exit: {
    desc: '返回博客',
    fn: () => {
      setTimeout(() => { window.location.hash = '#home'; }, 300);
      return '断开连接中……';
    }
  }
};

function initTerminal() {
  const input = document.getElementById('terminal-input');
  const body = document.getElementById('terminal-body');
  const output = document.getElementById('terminal-output');
  if (!input || !output) return;

  // 初始化输出
  output.innerHTML = `
<div class="dim">小蓝的博客服务器 — 远程终端 v2.1.0</div>
<div class="dim">后门服务运行在端口 4444</div>
<div class="dim">输入 'help' 获取可用命令列表</div>
<div class="dim">═══════════════════════════════════</div>
`;

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const cmd = input.value.trim();
      if (cmd) executeTerminalCommand(cmd);
      input.value = '';
    }
  });

  if (body) body.addEventListener('click', () => input.focus());
}

function executeTerminalCommand(raw) {
  const parts = raw.split(/\s+/);
  const name = parts[0].toLowerCase();
  const args = parts.slice(1);
  const output = document.getElementById('terminal-output');
  const prompt = document.querySelector('.terminal-prompt');

  gameState.terminalHistory.push(raw);
  output.innerHTML += `<div style="color:#aaa;">${prompt?.textContent || '$'} ${raw}</div>`;

  const cmd = TERMINAL_COMMANDS[name];
  if (!cmd) {
    output.innerHTML += `<div class="error">命令未找到: ${name}。输入 'help' 获取帮助。</div>`;
  } else {
    const result = cmd.fn(args);
    if (result !== null) {
      typeLines(result, output);
    }
  }

  setTimeout(() => { output.scrollTop = output.scrollHeight; }, 100);
  saveState();
}

function typeLines(text, output) {
  const lines = text.split('\n');
  let i = 0;
  function next() {
    if (i >= lines.length) return;
    const cls = lines[i].includes('错误') || lines[i].includes('Error') ? 'error'
      : lines[i].includes('████') ? 'highlight'
      : lines[i].includes('>>>') ? 'warn'
      : '';
    output.innerHTML += `<div class="${cls}">${lines[i]}</div>`;
    i++;
    setTimeout(next, Math.max(15, Math.min(60, lines[i-1]?.length * 1.5 || 30)));
  }
  next();
}

window.initTerminal = initTerminal;
window.executeTerminalCommand = executeTerminalCommand;
