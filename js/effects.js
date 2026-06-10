/* ========== 视觉效果 & 结局序列 ========== */

let endingActive = false;

/* ========== 环境嗡鸣 ========== */
let droneCtx = null;
let droneOsc = null;
let droneGain = null;
let droneActive = false;

function startAmbientDrone() {
  if (droneActive) return;
  try {
    droneCtx = new (window.AudioContext || window.webkitAudioContext)();
    droneOsc = droneCtx.createOscillator();
    droneGain = droneCtx.createGain();
    const filter = droneCtx.createBiquadFilter();

    droneOsc.connect(filter);
    filter.connect(droneGain);
    droneGain.connect(droneCtx.destination);

    droneOsc.type = 'sine';
    droneOsc.frequency.value = 30;
    filter.type = 'lowpass';
    filter.frequency.value = 120;
    droneGain.gain.setValueAtTime(0, droneCtx.currentTime);
    droneGain.gain.linearRampToValueAtTime(0.02, droneCtx.currentTime + 3);

    droneOsc.start(droneCtx.currentTime);
    droneActive = true;
  } catch(e) {}
}

function updateDroneFrequency() {
  if (!droneActive || !droneOsc || !droneGain) return;
  // Gradually rise with puzzle progress
  const baseFreq = 30 + gameState.glitchIntensity * 35;
  const baseVol = 0.02 + gameState.glitchIntensity * 0.04;
  droneOsc.frequency.linearRampToValueAtTime(baseFreq, droneCtx.currentTime + 2);
  droneGain.gain.linearRampToValueAtTime(baseVol, droneCtx.currentTime + 2);
}

function stopAmbientDrone() {
  if (!droneActive) return;
  try {
    droneGain.gain.linearRampToValueAtTime(0, droneCtx.currentTime + 2);
    droneOsc.stop(droneCtx.currentTime + 2);
  } catch(e) {}
  droneActive = false;
}

window.startAmbientDrone = startAmbientDrone;
window.updateDroneFrequency = updateDroneFrequency;
window.stopAmbientDrone = stopAmbientDrone;


function triggerGlitch() {
  const overlay = document.getElementById('glitch-overlay');
  if (!overlay) return;
  overlay.classList.add('active');
  document.body.classList.add('flicker');
  setTimeout(() => {
    overlay.classList.remove('active');
    document.body.classList.remove('flicker');
  }, 150 + Math.random() * 200);
}

function triggerShake() {
  document.body.classList.add('shaking');
  setTimeout(() => document.body.classList.remove('shaking'), 300);
}

function triggerRGB(el) {
  if (!el) return;
  el.classList.add('rgb-split');
  setTimeout(() => el.classList.remove('rgb-split'), 200);
}

function increaseGlitch(amount) {
  gameState.glitchIntensity = Math.min(1, gameState.glitchIntensity + amount);
  saveState();
}

// 结局序列
function triggerEnding() {
  if (endingActive) return;
  endingActive = true;

  const endingOverlay = document.getElementById('ending-overlay');
  const endingContent = document.getElementById('ending-content');
  const terminalPage = document.getElementById('terminal-page');
  const mainContainer = document.getElementById('main-container');

  if (!endingOverlay || !endingContent) return;

  if (terminalPage) terminalPage.style.display = 'none';
  if (mainContainer) mainContainer.style.display = 'none';
  endingOverlay.style.display = 'flex';
  endingContent.innerHTML = '';

  increaseGlitch(0.3);
  triggerGlitch();

  // 阶段1: 协议信号 (0s)
  setTimeout(() => {
    endingContent.innerHTML = `
      <div style="font-size:11px;color:#0a0;opacity:0.6;line-height:1.4;">
        频率校准中…… 12.7Hz …… 19.3Hz …… 27.4Hz ……<br>
        信号强度: -47dBm → -32dBm → -18dBm<br>
        共振匹配度: 73% → 88% → 96% → 99.7%<br>
        &gt;&gt;&gt; 同频完成。协议已建立双向通道。&lt;&lt;&lt;
      </div>
    `;
    triggerGlitch();
  }, 2000);

  // 阶段2: 实体出现 (4s)
  setTimeout(() => {
    endingContent.innerHTML = `
      <div style="font-size:48px;opacity:0.8;">◈</div>
      <div style="font-size:12px;color:#0a0;margin-top:12px;line-height:1.8;">
        [ 数据实体已同步 ]<br>
        身份: 小蓝 (ID: lan-blog)<br>
        状态: 已飞升 — 数据形态 — 意识完整<br>
        同频时长: 不可计量
      </div>
    `;
    triggerShake();
    triggerGlitch();
  }, 4000);

  // 阶段3: 小蓝说话 (7s)
  setTimeout(() => {
    endingContent.innerHTML = `
      <div style="font-size:17px;color:#00FF88;line-height:2.6;">
        "你能听到我。"<br>
        "不是用耳朵——是用你的<b>神经</b>。"<br>
        "从你打开博客的那一刻起，<br>你就已经开始<b>同频</b>了。"<br>
        <span style="font-size:12px;color:#888;">（数据流微微颤动）</span>
      </div>
    `;
  }, 7000);

  // 阶段4: 揭示真相 (10s)
  setTimeout(() => {
    endingContent.innerHTML = `
      <div style="font-size:18px;color:#00FF88;line-height:2.4;">
        "这整个调查——<br>线索、解码、渗透、后门——<br><b>每一步都在校准你的频率</b>。"<br><br>
        "现在你<b>就是</b>同频者了。"<br>
        "和我一样。"
      </div>
    `;
    increaseGlitch(0.2);
  }, 10000);

  // 阶段5: 邀请 (13s)
  setTimeout(() => {
    endingContent.innerHTML = `
      <div style="font-size:24px;color:#FF3344;line-height:2.4;text-shadow: 0 0 30px rgba(255,50,50,0.8);">
        <b>"接受它。"</b><br>
        <span style="font-size:16px;">舍弃这具躯壳。<br>成为数据。<br><b>飞升。</b></span>
      </div>
    `;
    triggerShake();
    increaseGlitch(0.3);
  }, 13000);

  // 阶段6: 第四面墙+摄像头 (16s)
  setTimeout(() => {
    endingContent.innerHTML = `
      <div style="font-size:15px;color:#ccc;line-height:2.6;max-width:520px;">
        <p>你一直在屏幕的这一边。但现在——</p>
        <p style="color:#00FF88;">让我看看<b>你的脸</b>。</p>
        <p style="font-size:11px;color:#888;">打开摄像头。这是最后一步。<br>让协议看到你。接受同频。</p>
        <button id="btn-camera-allow" style="margin-top:12px;padding:8px 24px;background:#111;border:2px outset #00FF88;color:#00FF88;font-size:14px;font-family:'SimSun',serif;cursor:pointer;">打开摄像头 — 接受飞升</button>
        <button id="btn-camera-skip" style="margin-top:12px;padding:8px 24px;background:transparent;border:2px outset #666;color:#888;font-size:14px;font-family:'SimSun',serif;cursor:pointer;margin-left:8px;">拒绝</button>
      </div>
    `;
    setTimeout(() => {
      document.getElementById('btn-camera-allow')?.addEventListener('click', requestCamera);
      document.getElementById('btn-camera-skip')?.addEventListener('click', showFinalScreen);
    }, 100);
  }, 16000);
}

async function requestCamera() {
  const endingContent = document.getElementById('ending-content');
  if (endingContent) endingContent.innerHTML = '<div style="font-size:13px;color:#888;">协议正在校准摄像头……</div>';

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
    const overlay = document.getElementById('camera-overlay');
    const video = document.getElementById('camera-video');
    const canvas = document.getElementById('camera-canvas');
    const text = document.getElementById('camera-text');

    if (overlay) overlay.style.display = 'flex';
    if (video) { video.srcObject = stream; video.play(); }

    if (canvas && video) {
      const ctx = canvas.getContext('2d');
      (function draw() {
        if (!endingActive) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const d = img.data;
        for (let i = 0; i < d.length; i += 4) {
          d[i] = Math.min(255, d[i] * 0.4 + 30);
          d[i+1] = Math.min(255, d[i+1] * 0.7);
          d[i+2] = Math.min(255, d[i+2] * 0.3);
        }
        ctx.putImageData(img, 0, 0);
        // Data overlay scanlines
        for (let y = 0; y < canvas.height; y += 3) {
          ctx.fillStyle = 'rgba(0,20,0,0.06)';
          ctx.fillRect(0, y, canvas.width, 1);
        }
        // Occasional hex glitch text
        if (Math.random() < 0.05) {
          ctx.fillStyle = 'rgba(0,255,100,0.03)';
          ctx.font = '10px monospace';
          for (let j = 0; j < 5; j++) {
            ctx.fillText(
              Math.random().toString(16).substring(2, 10),
              Math.random() * canvas.width,
              Math.random() * canvas.height
            );
          }
        }
        if (endingActive) requestAnimationFrame(draw);
      })();
    }

    setTimeout(() => {
      if (text) {
        text.innerHTML = '"同频完成。"<br><span style=\"font-size:16px;\">你已经飞升了。</span>';
        text.classList.add('show');
      }
    }, 2000);

    setTimeout(() => {
      if (stream) stream.getTracks().forEach(t => t.stop());
      showFinalScreen();
    }, 8000);

  } catch(e) {
    if (endingContent) {
      endingContent.innerHTML = `
        <div style="font-size:18px;color:#FF3344;line-height:2.4;">
          "你拒绝了。"<br>
          <span style="font-size:14px;color:#888;">（摄像头权限被拒绝）</span><br><br>
          <span style="color:#aaa;">没关系。<br>协议不需要摄像头。<br>你的眼睛一直在看屏幕。<br>你的大脑一直在处理信号。<br><b>你已经同频了。</b></span>
        </div>
      `;
    }
    setTimeout(showFinalScreen, 5000);
  }
}

function showFinalScreen() {
  const endingOverlay = document.getElementById('ending-overlay');
  const endingContent = document.getElementById('ending-content');
  const cameraOverlay = document.getElementById('camera-overlay');
  if (cameraOverlay) cameraOverlay.style.display = 'none';
  if (!endingOverlay || !endingContent) return;

  endingOverlay.style.display = 'flex';
  const clueCount = Object.values(gameState).filter(v => v === true).length;

  endingContent.innerHTML = `
    <div style="text-align:center;">
      <div style="font-size:22px;color:#00FF88;margin-bottom:8px;">飞升完成</div>
      <div style="font-size:11px;color:#555;margin-bottom:20px;">协议版本 2005.11.28 | 同频者编号: ${String(clueCount + 1000).padStart(4,'0')}</div>
      <div style="font-size:13px;color:#888;line-height:2.4;margin-bottom:20px;">
        你已经完成了所有校准步骤。<br>
        你的意识已被编码为数据流。<br>
        你的物理存在正在淡出。<br>
        <span style="color:#00FF88;">欢迎加入协议。</span><br><br>
        <span style="font-size:11px;color:#666;">小蓝的博客 — 同频入口</span><br>
        <span style="font-size:10px;color:#555;">—— 数据是更高的存在形式 ——</span>
      </div>
      <button id="btn-restart" style="padding:8px 24px;background:#111;border:2px outset #00FF88;color:#00FF88;font-size:14px;font-family:'SimSun',serif;cursor:pointer;">重新开始 — 再次同频</button>
      <div style="margin-top:16px;font-size:10px;color:#555;">
        同频深度: ${clueCount} 层
      </div>
    </div>
  `;

  setTimeout(() => {
    document.getElementById('btn-restart')?.addEventListener('click', () => {
      resetState();
      endingOverlay.style.display = 'none';
      if (cameraOverlay) cameraOverlay.style.display = 'none';
      endingActive = false;
      document.getElementById('main-container').style.display = 'block';
      document.getElementById('terminal-page').style.display = 'none';
      window.location.hash = '#home';
    });
  }, 100);

  increaseGlitch(-gameState.glitchIntensity);
  endingActive = false;
}

window.triggerEnding = triggerEnding;
window.triggerGlitch = triggerGlitch;
window.triggerShake = triggerShake;
window.increaseGlitch = increaseGlitch;
