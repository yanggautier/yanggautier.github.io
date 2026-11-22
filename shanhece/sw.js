// 离线缓存：先用缓存秒开，同时在后台取新版，下次打开就是新版。更新游戏时把 V 改一下
const V = "shanhece-v216", FILES = ["./", "index.html", "manifest.json", "icon-192.png", "icon-512.png", "ts_qin.webp", "tr.webp", "fx.webp", "ts_zhongyuan.webp", "ts_beidi.webp", "ts_qilu.webp", "ts_chu.webp", "ts_wuyue.webp", "ts_bashu.webp", "ts_caoyuan.webp", "ts_lingnan.webp", "ts_haidong.webp"];
self.addEventListener("install", e => { e.waitUntil(caches.open(V).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener("fetch", e => { if (e.request.method !== "GET" || e.request.headers.has("range") || /\.mp3$/.test(new URL(e.request.url).pathname)) return;  // 音乐不走缓存：浏览器是分段取的，缓存不了分段的回应
  e.respondWith(caches.open(V).then(c => c.match(e.request).then(hit => { const net = fetch(e.request).then(r => { if (r.ok && new URL(e.request.url).origin === location.origin) c.put(e.request, r.clone()); return r; }).catch(() => hit);
    return hit || net; }))); });
