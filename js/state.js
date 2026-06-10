/* ========== 游戏状态（简化版 — ARG风格） ========== */
const DEFAULT_STATE = {
  introComplete: false,
  foundRobots: false,
  foundBackup: false,
  foundAdmin: false,
  adminLoggedIn: false,
  adminAccessGranted: false,
  diaryUnlocked: false,
  trafficAnalyzed: false,
  secretNotesRead: false,
  terminalUnlocked: false,
  endingTriggered: false,
  unlockedPosts: [],
  glitchIntensity: 0,
  visitedHashes: [],
  terminalHistory: []
};

let gameState = { ...DEFAULT_STATE };

function saveState() {
  try { sessionStorage.setItem('lanblog_arg_save', JSON.stringify(gameState)); } catch(e) {}
}

function loadState() {
  try {
    const s = sessionStorage.getItem('lanblog_arg_save');
    if (s) { gameState = { ...DEFAULT_STATE, ...JSON.parse(s) }; return true; }
  } catch(e) {}
  return false;
}

function resetState() {
  gameState = { ...DEFAULT_STATE };
  try { sessionStorage.removeItem('lanblog_arg_save'); } catch(e) {}
}

function showHint(msg) {
  const t = document.getElementById('hint-toast');
  if (!t) return;
  t.textContent = '💡 ' + msg;
  t.style.display = 'block';
  t.style.animation = 'none'; t.offsetHeight;
  t.style.animation = 'toastIn 0.3s ease, toastOut 0.5s ease 4s forwards';
}

window.saveState = saveState;
window.loadState = loadState;
window.resetState = resetState;
window.showHint = showHint;
window.gameState = gameState;
