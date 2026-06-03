#!/usr/bin/env node
'use strict';

const http = require('http');
const fs   = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 3456;
const DIR  = __dirname;
const HTML = path.join(DIR, 'index.html');

// ── I/O ──────────────────────────────────────────────────────────────────────

const rd  = () => fs.readFileSync(HTML, 'utf8');
const wr  = s  => fs.writeFileSync(HTML, s, 'utf8');
const run = cmd => new Promise(res =>
  exec(cmd, { cwd: DIR }, (e, o, r) => res({ ok: !e, out: (o + r).trim() }))
);

// ── CSS helpers ───────────────────────────────────────────────────────────────

const MEDIA_MOB = '@media (max-width: 767px)';
const MEDIA_TAB = '@media (min-width: 768px) and (max-width: 1023px)';
const esc   = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function split(html) {
  const im = html.indexOf(MEDIA_MOB);
  const it = html.indexOf(MEDIA_TAB);
  return {
    d: im >= 0 ? html.slice(0, im) : html,
    m: im >= 0 ? (it >= 0 ? html.slice(im, it) : html.slice(im)) : '',
    t: it >= 0 ? html.slice(it) : '',
  };
}

function cssGet(sec, sel, prop) {
  const m = sec.match(new RegExp(esc(sel) + '\\s*\\{[^}]*?' + esc(prop) + ':\\s*([^;}\\n]+)'));
  return m ? m[1].trim() : '';
}

function cssSet(sec, sel, prop, val) {
  return sec.replace(
    new RegExp('(' + esc(sel) + '\\s*\\{[^}]*?' + esc(prop) + ':\\s*)[^;}\\n]+'),
    '$1' + val
  );
}

// ── JS V-array helpers ────────────────────────────────────────────────────────

function vGet(html, key) {
  const m = html.match(new RegExp(esc(key) + ':\\s*\\[([^\\]]+)\\]'));
  return m ? m[1].split(',').map(s => s.trim()) : ['', '', '', ''];
}

function vSet(html, key, vals) {
  return html.replace(
    new RegExp('(' + esc(key) + ':\\s*\\[)[^\\]]+'),
    '$1' + vals.join(',    ') + '   '
  );
}

// ── Field definitions ─────────────────────────────────────────────────────────

const CSS_MAP = {
  // Desktop — #intro
  d_intro_size:         ['d', '#intro',         'font-size'],
  d_intro_lh:           ['d', '#intro',         'line-height'],
  d_intro_top:          ['d', '#intro',         'top'],
  d_intro_align:        ['d', '#intro',         'text-align'],
  d_intro_transform:    ['d', '#intro',         'transform'],
  // Desktop — #logo
  d_logo_width:         ['d', '#logo',          'width'],
  d_logo_top:           ['d', '#logo',          'top'],
  // Desktop — #logo2
  d_logo2_width:        ['d', '#logo2',         'width'],
  d_logo2_top:          ['d', '#logo2',         'top'],
  // Desktop — #event-info
  d_eventinfo_size:     ['d', '#event-info',    'font-size'],
  d_eventinfo_lh:       ['d', '#event-info',    'line-height'],
  d_eventinfo_align:    ['d', '#event-info',    'text-align'],
  // Desktop — #header-s3
  d_headers3_size:      ['d', '#header-s3',     'font-size'],
  d_headers3_lh:        ['d', '#header-s3',     'line-height'],
  d_headers3_top:       ['d', '#header-s3',     'top'],
  // Desktop — #manifesto
  d_manifesto_size:     ['d', '#manifesto',     'font-size'],
  d_manifesto_lh:       ['d', '#manifesto',     'line-height'],
  d_manifesto_align:    ['d', '#manifesto',     'text-align'],
  d_manifesto_bottom:   ['d', '#manifesto',     'bottom'],
  d_manifesto_transform:['d', '#manifesto',     'transform'],
  // Desktop — #curated
  d_curated_size:       ['d', '#curated',       'font-size'],
  d_curated_lh:         ['d', '#curated',       'line-height'],
  d_curated_letter:     ['d', '#curated',       'letter-spacing'],
  d_curated_transform:  ['d', '#curated',       'transform'],
  // Desktop — .bottom-nav
  d_botnav_size:        ['d', '.bottom-nav',    'font-size'],
  d_botnav_lh:          ['d', '.bottom-nav',    'line-height'],
  d_botnav_letter:      ['d', '.bottom-nav',    'letter-spacing'],
  d_botnav_height:      ['d', '.bottom-nav',    'height'],
  d_botnav_bottom:      ['d', '.bottom-nav',    'bottom'],
  // Mobile — #intro
  m_intro_size:         ['m', '#intro',         'font-size'],
  m_intro_lh:           ['m', '#intro',         'line-height'],
  m_intro_top:          ['m', '#intro',         'top'],
  // Mobile — #event-info
  m_eventinfo_size:     ['m', '#event-info',    'font-size'],
  m_eventinfo_lh:       ['m', '#event-info',    'line-height'],
  m_eventinfo_bottom:   ['m', '#event-info',    'bottom'],
  // Mobile — #header-s3
  m_headers3_size:      ['m', '#header-s3',     'font-size'],
  m_headers3_lh:        ['m', '#header-s3',     'line-height'],
  m_headers3_top:       ['m', '#header-s3',     'top'],
  m_headers3_padtop:    ['m', '#header-s3',     'padding-top'],
  // Mobile — .hs3-logo-mob
  m_hscenter_width:     ['m', '.hs3-logo-mob',  'width'],
  // Mobile + Tablet — #manifesto-streep (CSS in ≤1023px shared block → 'd' context)
  d_streep_margin:      ['d', '#manifesto-streep', 'margin-top'],
  // Mobile — #manifesto
  m_manifesto_size:     ['m', '#manifesto',     'font-size'],
  m_manifesto_lh:       ['m', '#manifesto',     'line-height'],
  m_manifesto_align:    ['m', '#manifesto',     'text-align'],
  m_manifesto_top:      ['m', '#manifesto',     'top'],
  m_manifesto_bottom:   ['m', '#manifesto',     'bottom'],
  m_manifesto_transform:['m', '#manifesto',     'transform'],
  // Mobile — #curated
  m_curated_size:       ['m', '#curated',       'font-size'],
  m_curated_lh:         ['m', '#curated',       'line-height'],
  m_curated_align:      ['m', '#curated',       'text-align'],
  // Mobile — .bottom-nav
  m_botnav_height:      ['m', '.bottom-nav',    'height'],
  m_botnav_size:        ['m', '.bottom-nav',    'font-size'],
  m_botnav_letter:      ['m', '.bottom-nav',    'letter-spacing'],
  // Tablet — #intro
  t_intro_size:         ['t', '#intro',          'font-size'],
  t_intro_lh:           ['t', '#intro',          'line-height'],
  t_intro_top:          ['t', '#intro',          'top'],
  // Tablet — #event-info
  t_eventinfo_size:     ['t', '#event-info',     'font-size'],
  t_eventinfo_lh:       ['t', '#event-info',     'line-height'],
  // Tablet — #header-s3
  t_headers3_size:      ['t', '#header-s3',      'font-size'],
  t_headers3_lh:        ['t', '#header-s3',      'line-height'],
  t_headers3_top:       ['t', '#header-s3',      'top'],
  t_headers3_padtop:    ['t', '#header-s3',      'padding-top'],
  // Tablet — .hs3-logo-mob
  t_hscenter_width:     ['t', '.hs3-logo-mob',   'width'],
  // Tablet — #manifesto
  t_manifesto_size:     ['t', '#manifesto',      'font-size'],
  t_manifesto_lh:       ['t', '#manifesto',      'line-height'],
  t_manifesto_align:    ['t', '#manifesto',      'text-align'],
  t_manifesto_bottom:   ['t', '#manifesto',      'bottom'],
  // Tablet — #curated
  t_curated_size:       ['t', '#curated',        'font-size'],
  t_curated_lh:         ['t', '#curated',        'line-height'],
  // Tablet — .bottom-nav
  t_botnav_height:      ['t', '.bottom-nav',     'height'],
  t_botnav_size:        ['t', '.bottom-nav',     'font-size'],
};

const V_KEYS = [
  // Desktop px
  'logoFS', 'logoTop', 'eventTop', 'curatedBottom',
  // Mobile vh/vw
  'logoFS_vw', 'logoTop_vh', 'eventTop_vh', 'curatedBot_vh',
  // Opacity
  'logo1Op', 'logo2Op',
  'eventInfoOp', 'headerS3Op', 'introOp', 'manifestoOp', 'curatedOp', 'streepOp',
];

// ── Manifesto content helpers ─────────────────────────────────────────────────

function manifestoGet(html) {
  const m = html.match(/<div id="manifesto">([\s\S]*?)<\/div>/);
  return m ? m[1].trim() : '';
}

function manifestoSet(html, text) {
  return html.replace(
    /(<div id="manifesto">)[\s\S]*?(<\/div>)/,
    `$1\n      ${text}\n    $2`
  );
}

// ── Read / write values ───────────────────────────────────────────────────────

function getValues() {
  const html = rd();
  const { d, m, t } = split(html);
  const out = {};
  for (const [id, [ctx, sel, prop]] of Object.entries(CSS_MAP)) {
    const sec = ctx === 'd' ? d : ctx === 'm' ? m : t;
    out[id] = cssGet(sec, sel, prop);
  }
  for (const k of V_KEYS)
    out[k] = vGet(html, k).join(',');
  out['manifesto_text'] = manifestoGet(html);
  return out;
}

function applyUpdate(key, value) {
  let html = rd();
  if (CSS_MAP[key]) {
    const [ctx, sel, prop] = CSS_MAP[key];
    const { d, m, t } = split(html);
    if (ctx === 'd')      html = cssSet(d, sel, prop, value) + m + t;
    else if (ctx === 'm') html = d + cssSet(m, sel, prop, value) + t;
    else if (ctx === 't') html = d + m + cssSet(t, sel, prop, value);
  } else if (V_KEYS.includes(key)) {
    html = vSet(html, key, value.split(',').map(s => s.trim()));
  } else if (key === 'manifesto_text') {
    html = manifestoSet(html, value);
  }
  wr(html);
}

// ── UI ────────────────────────────────────────────────────────────────────────

const UI = /* html */`<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Bouche Editor</title>
<style>
:root{--br:#4a1810;--cr:#f0ffa8;--pc:#ffbfbf;--bd:rgba(74,24,16,.13)}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:13px;background:var(--cr);color:var(--br);display:flex;flex-direction:column;height:100vh;overflow:hidden}
header{display:flex;align-items:center;gap:8px;padding:0 14px;height:46px;background:var(--br);color:var(--cr);flex-shrink:0}
h1{font-size:13px;font-weight:600;flex:1;letter-spacing:.03em}
#st{font-size:11px;opacity:.75}
.btn{border:none;padding:5px 13px;border-radius:3px;font-size:12px;font-weight:600;cursor:pointer}
.btn:disabled{opacity:.45;cursor:default}
#pb{background:rgba(240,255,168,.15);color:var(--cr);border:1px solid rgba(240,255,168,.25)}
#pb:hover:not(:disabled){background:rgba(240,255,168,.25)}
#db{background:var(--cr);color:var(--br)}
#db:hover:not(:disabled){background:var(--pc)}
main{display:flex;flex:1;overflow:hidden}
.panel{width:280px;flex-shrink:0;overflow-y:auto;background:#fff;border-right:1px solid var(--bd)}
.sec{border-bottom:1px solid var(--bd)}
.sh{padding:8px 12px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;background:var(--cr);cursor:pointer;display:flex;justify-content:space-between;user-select:none}
.sb{padding:8px 12px;display:flex;flex-direction:column;gap:5px}
.sb.h{display:none}
.sub{font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;opacity:.35;margin-top:6px;padding-top:5px;border-top:1px solid var(--bd)}
.sub:first-child{margin-top:0;padding-top:0;border-top:none}
.row2{display:grid;grid-template-columns:1fr 1fr;gap:5px}
.f label{font-size:10px;opacity:.5;display:block;margin-bottom:2px}
.f input{width:100%;border:1px solid var(--bd);border-radius:3px;padding:3px 6px;font-size:12px;color:var(--br);font-family:monospace}
.f input:focus{outline:none;border-color:var(--br)}
.f select{width:100%;border:1px solid var(--bd);border-radius:3px;padding:3px 6px;font-size:12px;color:var(--br);font-family:monospace;background:#fff;cursor:pointer}
.f select:focus{outline:none;border-color:var(--br)}
.a label{font-size:10px;opacity:.5;margin-bottom:2px;display:block}
.a-st{display:flex;gap:3px;margin-bottom:2px}
.a-st span{flex:1;text-align:center;font-size:9px;opacity:.3}
.a-row{display:flex;gap:3px}
.a-row input{flex:1;border:1px solid var(--bd);border-radius:3px;padding:4px 2px;font-size:11.5px;color:var(--br);text-align:center;font-family:monospace}
.a-row input:focus{outline:none;border-color:var(--br)}
.pv{flex:1;display:flex;flex-direction:column;overflow:hidden}
.pbar{display:flex;align-items:center;gap:8px;padding:7px 12px;background:var(--cr);border-bottom:1px solid var(--bd);flex-shrink:0}
.tgl{display:flex;border:1px solid var(--bd);border-radius:3px;overflow:hidden}
.tgl button{border:none;padding:4px 11px;font-size:11px;cursor:pointer;background:#fff;color:var(--br)}
.tgl button.on{background:var(--br);color:var(--cr)}
#psz{font-size:11px;opacity:.4}
.ifw{flex:1;overflow:hidden;display:flex;justify-content:center;background:#ddd}
iframe{border:none;background:#fff;height:100%;width:100%;transition:width .2s}
.ta label{font-size:10px;opacity:.5;display:block;margin-bottom:2px}
.ta textarea{width:100%;border:1px solid var(--bd);border-radius:3px;padding:5px 6px;font-size:12px;color:var(--br);font-family:monospace;resize:vertical;min-height:120px;line-height:1.5}
.ta textarea:focus{outline:none;border-color:var(--br)}
#log{position:fixed;bottom:0;left:280px;right:0;background:rgba(74,24,16,.95);color:var(--cr);padding:10px 14px;font-family:monospace;font-size:11px;max-height:200px;overflow-y:auto;display:none;white-space:pre-wrap;line-height:1.5;z-index:99}
#log.show{display:block}
</style>
</head>
<body>
<header>
  <h1>Bouche — Typography</h1>
  <span id="st"></span>
  <button class="btn" id="pb" onclick="push()">↑ Push</button>
  <button class="btn" id="db" onclick="deploy()">Deploy →</button>
</header>
<main>
  <div class="panel" id="panel">Loading…</div>
  <div class="pv">
    <div class="pbar">
      <div class="tgl">
        <button class="on" id="bD" onclick="mode('d')">Desktop</button>
        <button id="bT" onclick="mode('t')">Tablet</button>
        <button id="bM" onclick="mode('m')">Mobile</button>
      </div>
      <span id="psz"></span>
    </div>
    <div class="ifw"><iframe id="ifr" src="/preview"></iframe></div>
  </div>
</main>
<div id="log"></div>

<script>
let vals={}, T={};

async function load(){
  vals = await fetch('/values').then(r=>r.json());
  render();
}

function f(id,lbl){
  const v=vals[id]||'';
  return \`<div class="f"><label>\${lbl}</label><input id="\${id}" value="\${v}" oninput="sched('\${id}')"></div>\`;
}

function ta(id,lbl){
  const v=vals[id]||'';
  return \`<div class="ta"><label>\${lbl}</label><textarea id="\${id}" oninput="sched('\${id}')">\${v}</textarea></div>\`;
}

function sel(id,lbl,opts){
  const v=vals[id]||'';
  const os=opts.map(o=>\`<option\${o===v?' selected':''} value="\${o}">\${o}</option>\`).join('');
  return \`<div class="f"><label>\${lbl}</label><select id="\${id}" onchange="sched('\${id}')">\${os}</select></div>\`;
}

function a(id,lbl){
  const parts=(vals[id]||'0,0,0,0').split(',').map(s=>s.trim());
  const inp=parts.map((v,i)=>\`<input data-a="\${id}" data-i="\${i}" value="\${v}" oninput="schedA('\${id}')">\`).join('');
  return \`<div class="a"><label>\${lbl}</label><div class="a-st"><span>S1</span><span>S2</span><span>S3</span><span>S4</span></div><div class="a-row">\${inp}</div></div>\`;
}

function sec(t,body,open=true){
  const k=t.replace(/\\W+/g,'_');
  return \`<div class="sec"><div class="sh" onclick="tog('\${k}')">\${t}<span id="ar_\${k}">\${open?'▾':'▸'}</span></div><div class="sb\${open?'':' h'}" id="b_\${k}">\${body}</div></div>\`;
}

function sub(t){return \`<div class="sub">\${t}</div>\`;}

function render(){
  document.getElementById('panel').innerHTML=[

    sec('Manifesto Text',[
      \`<p style="font-size:10px;opacity:.5;line-height:1.5;margin-bottom:6px">Edit the manifesto copy below. Use &lt;br&gt; for manual line breaks (desktop), or remove them to let text wrap naturally on mobile/tablet. HTML entities: &amp;rsquo; &amp;mdash; &amp;egrave; &amp;amp;</p>\`,
      ta('manifesto_text','innerHTML'),
    ].join('')),

    sec('Desktop',[
      sub('#intro'),
      \`<div class="row2">\${f('d_intro_size','font-size')}\${f('d_intro_lh','line-height')}</div>\`,
      \`<div class="row2">\${f('d_intro_top','top')}\${sel('d_intro_align','text-align',['left','center','right','justify'])}</div>\`,
      f('d_intro_transform','transform'),

      sub('#logo (1.png — S1/S2)'),
      \`<div class="row2">\${f('d_logo_width','width (CSS default)')}\${f('d_logo_top','top (CSS default)')}</div>\`,

      sub('#logo2 (3.png — S3/S4)'),
      \`<div class="row2">\${f('d_logo2_width','width (CSS default)')}\${f('d_logo2_top','top (CSS default)')}</div>\`,

      sub('#event-info'),
      \`<div class="row2">\${f('d_eventinfo_size','font-size')}\${f('d_eventinfo_lh','line-height')}</div>\`,
      sel('d_eventinfo_align','text-align',['left','center','right','justify']),

      sub('#header-s3'),
      \`<div class="row2">\${f('d_headers3_size','font-size')}\${f('d_headers3_lh','line-height')}</div>\`,
      f('d_headers3_top','top'),

      sub('#manifesto'),
      \`<div class="row2">\${f('d_manifesto_size','font-size')}\${f('d_manifesto_lh','line-height')}</div>\`,
      \`<div class="row2">\${sel('d_manifesto_align','text-align',['left','center','right','justify'])}\${f('d_manifesto_bottom','bottom')}</div>\`,
      f('d_manifesto_transform','transform'),

      sub('#curated'),
      \`<div class="row2">\${f('d_curated_size','font-size')}\${f('d_curated_lh','line-height')}</div>\`,
      \`<div class="row2">\${f('d_curated_letter','letter-spacing')}\${f('d_curated_transform','transform')}</div>\`,

      sub('.bottom-nav'),
      \`<div class="row2">\${f('d_botnav_size','font-size')}\${f('d_botnav_lh','line-height')}</div>\`,
      \`<div class="row2">\${f('d_botnav_letter','letter-spacing')}\${f('d_botnav_height','height')}</div>\`,
      f('d_botnav_bottom','bottom'),
    ].join('')),

    sec('Mobile',[
      sub('#intro'),
      \`<div class="row2">\${f('m_intro_size','font-size')}\${f('m_intro_lh','line-height')}</div>\`,
      f('m_intro_top','top'),

      sub('#event-info'),
      \`<div class="row2">\${f('m_eventinfo_size','font-size')}\${f('m_eventinfo_lh','line-height')}</div>\`,
      f('m_eventinfo_bottom','bottom'),

      sub('#header-s3'),
      \`<div class="row2">\${f('m_headers3_size','font-size')}\${f('m_headers3_lh','line-height')}</div>\`,
      \`<div class="row2">\${f('m_headers3_top','top')}\${f('m_headers3_padtop','padding-top')}</div>\`,
      sub('.hs3-logo-mob (bouche_logo.png)'),
      f('m_hscenter_width','width'),

      sub('#manifesto'),
      \`<div class="row2">\${f('m_manifesto_size','font-size')}\${f('m_manifesto_lh','line-height')}</div>\`,
      \`<div class="row2">\${sel('m_manifesto_align','text-align',['left','center','right','justify'])}\${f('m_manifesto_top','top')}</div>\`,
      \`<div class="row2">\${f('m_manifesto_bottom','bottom')}\${f('m_manifesto_transform','transform')}</div>\`,

      sub('#manifesto-streep (mobile + tablet)'),
      f('d_streep_margin','margin-top'),

      sub('#curated'),
      \`<div class="row2">\${f('m_curated_size','font-size')}\${f('m_curated_lh','line-height')}</div>\`,
      sel('m_curated_align','text-align',['left','center','right','justify']),

      sub('.bottom-nav'),
      \`<div class="row2">\${f('m_botnav_height','height')}\${f('m_botnav_size','font-size')}</div>\`,
      f('m_botnav_letter','letter-spacing'),
    ].join('')),

    sec('Tablet (768–1023px)',[
      sub('#intro'),
      \`<div class="row2">\${f('t_intro_size','font-size')}\${f('t_intro_lh','line-height')}</div>\`,
      f('t_intro_top','top'),

      sub('#event-info'),
      \`<div class="row2">\${f('t_eventinfo_size','font-size')}\${f('t_eventinfo_lh','line-height')}</div>\`,

      sub('#header-s3'),
      \`<div class="row2">\${f('t_headers3_size','font-size')}\${f('t_headers3_lh','line-height')}</div>\`,
      \`<div class="row2">\${f('t_headers3_top','top')}\${f('t_headers3_padtop','padding-top')}</div>\`,
      sub('.hs3-logo-mob (bouche_logo.png)'),
      f('t_hscenter_width','width'),

      sub('#manifesto'),
      \`<div class="row2">\${f('t_manifesto_size','font-size')}\${f('t_manifesto_lh','line-height')}</div>\`,
      \`<div class="row2">\${sel('t_manifesto_align','text-align',['left','center','right','justify'])}\${f('t_manifesto_bottom','bottom')}</div>\`,

      sub('#curated'),
      \`<div class="row2">\${f('t_curated_size','font-size')}\${f('t_curated_lh','line-height')}</div>\`,

      sub('.bottom-nav'),
      \`<div class="row2">\${f('t_botnav_height','height')}\${f('t_botnav_size','font-size')}</div>\`,
    ].join(''),false),

    sec('JS — Desktop px',[
      a('logoFS','logo width (px)'),
      a('logoTop','logo top (px)'),
      a('eventTop','event-info top'),
      a('curatedBottom','curated bottom'),
    ].join(''),false),

    sec('JS — Mobile vh/vw',[
      a('logoFS_vw','logo width (vw)'),
      a('logoTop_vh','logo top (vh)'),
      a('eventTop_vh','event-info top (vh)'),
      a('curatedBot_vh','curated bottom (vh)'),
    ].join(''),false),

    sec('JS — Opacity',[
      a('logo1Op','#logo (1.png) opacity'),
      a('logo2Op','#logo2 (3.png) opacity'),
      a('introOp','#intro opacity'),
      a('eventInfoOp','#event-info opacity'),
      a('headerS3Op','#header-s3 opacity'),
      a('manifestoOp','#manifesto opacity'),
      a('streepOp','#manifesto-streep opacity (mobile/tablet)'),
      a('curatedOp','#curated opacity'),
    ].join(''),false),

  ].join('');
}

function tog(k){
  const b=document.getElementById('b_'+k),ar=document.getElementById('ar_'+k);
  b.classList.toggle('h');
  ar.textContent=b.classList.contains('h')?'▸':'▾';
}

function sched(id){
  clearTimeout(T[id]);
  T[id]=setTimeout(()=>send(id,document.getElementById(id).value),350);
}

function schedA(id){
  clearTimeout(T[id]);
  T[id]=setTimeout(()=>{
    const v=[...document.querySelectorAll(\`[data-a="\${id}"]\`)].map(i=>i.value).join(',');
    send(id,v);
  },350);
}

async function send(id,value){
  await fetch('/update',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({key:id,value})});
  refresh();
}

function refresh(){document.getElementById('ifr').src='/preview?t='+Date.now();}

function mode(m){
  document.getElementById('bD').classList.toggle('on',m==='d');
  document.getElementById('bT').classList.toggle('on',m==='t');
  document.getElementById('bM').classList.toggle('on',m==='m');
  const ifr=document.getElementById('ifr');
  const sz=document.getElementById('psz');
  if(m==='m'){ifr.style.width='390px';sz.textContent='390px';}
  else if(m==='t'){ifr.style.width='820px';sz.textContent='820px';}
  else{ifr.style.width='100%';sz.textContent='';}
  refresh();
}

function status(t,ok){
  const s=document.getElementById('st');
  s.textContent=t;
  s.style.color=ok==null?'':(ok?'#f0ffa8':'#ffbfbf');
  if(ok!=null)setTimeout(()=>{s.textContent='';s.style.color='';},6000);
}

async function action(endpoint,btnId,label){
  const btn=document.getElementById(btnId);
  btn.disabled=true;
  const log=document.getElementById('log');
  log.textContent='';
  log.classList.add('show');
  status(label+'…');
  try{
    const r=await fetch(endpoint,{method:'POST'});
    const t=await r.text();
    log.textContent=t;
    log.scrollTop=log.scrollHeight;
    status(r.ok?'✓ Done':'✗ Failed',r.ok);
  }catch(e){
    log.textContent=e.message;
    status('✗ Error',false);
  }
  btn.disabled=false;
  setTimeout(()=>log.classList.remove('show'),10000);
}

function push(){action('/push','pb','Pushing');}
function deploy(){action('/deploy','db','Deploying');}

load();
</script>
</body>
</html>`;

// ── MIME types ────────────────────────────────────────────────────────────────

const MIME = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
  '.otf': 'font/otf', '.woff': 'font/woff', '.woff2': 'font/woff2',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml',
};

// ── Server ────────────────────────────────────────────────────────────────────

http.createServer(async (req, res) => {
  const u = new URL(req.url, 'http://x');
  const p = u.pathname;

  // Editor UI
  if (req.method === 'GET' && p === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    return res.end(UI);
  }

  // Live preview
  if (req.method === 'GET' && p === '/preview') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    return res.end(rd());
  }

  // Get all values
  if (req.method === 'GET' && p === '/values') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(getValues()));
  }

  // Update one value
  if (req.method === 'POST' && p === '/update') {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', () => {
      try {
        const { key, value } = JSON.parse(body);
        applyUpdate(key, value);
        res.writeHead(200);
        res.end('ok');
      } catch (e) {
        res.writeHead(500);
        res.end(e.message);
      }
    });
    return;
  }

  // Push to git
  if (req.method === 'POST' && p === '/push') {
    const ts  = new Date().toISOString().slice(0, 16).replace('T', ' ');
    const add = `git add index.html typography.md`;
    const cmt = `git diff --cached --quiet && echo "Nothing to commit" || git commit -m "Typography edit ${ts}"`;
    const psh = `git push origin main`;
    const { ok, out } = await run(`${add} && ${cmt} && ${psh}`);
    res.writeHead(ok ? 200 : 500, { 'Content-Type': 'text/plain' });
    return res.end(out);
  }

  // Deploy
  if (req.method === 'POST' && p === '/deploy') {
    const { ok, out } = await run('vercel --prod');
    res.writeHead(ok ? 200 : 500, { 'Content-Type': 'text/plain' });
    return res.end(out);
  }

  // Static files (fonts, images)
  const fp = path.join(DIR, p);
  if (fs.existsSync(fp) && fs.statSync(fp).isFile()) {
    const mime = MIME[path.extname(fp)] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': mime });
    return fs.createReadStream(fp).pipe(res);
  }

  res.writeHead(404);
  res.end('Not found');

}).listen(PORT, () => {
  console.log(`\nBouche Typography Editor`);
  console.log(`→ http://localhost:${PORT}\n`);
});
