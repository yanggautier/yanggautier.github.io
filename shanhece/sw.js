// 离线缓存：先用缓存秒开，同时在后台取新版，下次打开就是新版。更新游戏时把 V 改一下
const V = "shanhece-v150", FILES = ["./", "index.html", "manifest.json", "icon-192.png", "icon-512.png", "ts_qin.webp", "ts_zhongyuan.webp", "ts_beidi.webp", "ts_qilu.webp", "ts_chu.webp", "ts_wuyue.webp", "ts_bashu.webp", "ts_caoyuan.webp", "ts_lingnan.webp", "ts_haidong.webp"];
self.addEventListener("install", e => { e.waitUntil(caches.open(V).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener("fetch", e => { if (e.request.method !== "GET") return;
  e.respondWith(caches.open(V).then(c => c.match(e.request).then(hit => { const net = fetch(e.request).then(r => { if (r.ok && new URL(e.request.url).origin === location.origin) c.put(e.request, r.clone()); return r; }).catch(() => hit);
    return hit || net; }))); });
