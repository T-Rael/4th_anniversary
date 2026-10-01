/* Chức năng dựng sách, điều hướng và hiệu ứng. Nội dung nằm trong data.js. */
const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[c]);
const pages = [],
    milestoneIndexes = [];
const folio = (n) => `<div class="folio">— ${String(n).padStart(2, '0')} —</div>`;
const chunk = (items, size) => {
    const groups = [];
    for (let i = 0; i < items.length; i += size) groups.push(items.slice(i, i + size));
    return groups;
};
const petals = () =>
    Array.from(
        { length: 16 },
        (_, i) =>
            `<i class="petal" style="left:${(i * 37) % 97}%;animation-duration:${7 + (i % 6)}s;animation-delay:-${i * 0.7}s;font-size:${0.7 + (i % 4) * 0.18}rem">✿</i>`,
    ).join('');
const deco = (q, s) => `<article class="page deco">${petals()}<div class="quote">“${esc(q)}”</div><div class="small">${esc(s)}</div></article>`;
function photo(src, index) {
    return `<button class="photo" type="button" aria-label="Phóng to ảnh kỷ niệm ${index + 1}"><img src="${esc(src)}" alt="Ảnh kỷ niệm ${index + 1}" loading="eager" fetchpriority="high"></button>`;
}
function galleryMarkup(items, startIndex = 0) {
    return `<div class="gallery count-${items.length}">${items.map((src, i) => photo(src, startIndex + i)).join('')}</div>`;
}
function videoCard(src, index, poster = '') {
    const safeSrc = esc(src);
    const label = `Video ${String(index + 1).padStart(2, '0')}`;
    const media = /youtube\.com|youtu\.be/.test(src)
        ? `<iframe src="${safeSrc}" title="${label}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
        : `<video src="${safeSrc}"${poster ? ` poster="${esc(poster)}"` : ''} controls playsinline preload="metadata"></video>`;
    return `<div class="video-card">${media}<span class="video-label">${label} · ${esc(src.split('/').pop())}</span></div>`;
}
function milestoneMarkup(m, photos, groupIndex, totalGroups, num) {
    const isFirst = groupIndex === 0;
    const startIndex = groupIndex * 3;
    return `<article class="page milestone media-page ${isFirst ? 'chapter-page' : 'album-page'}">
        ${isFirst ? `<div class="date">${esc(m.date)}</div><h2>${esc(m.title)}</h2><p class="desc">${esc(m.desc)}</p>` : `<div class="chapter-kicker">${esc(m.date)} · Album ${groupIndex + 1}/${totalGroups}</div><h2>Thêm những khoảnh khắc</h2><p class="desc">${esc(m.title)} — những tấm hình mình muốn giữ lại thật lâu.</p>`}
        ${galleryMarkup(photos, startIndex)}${folio(num)}
    </article>`;
}
function videoPageMarkup(m, videos, poster, num) {
    return `<article class="page milestone video-page"><div class="chapter-kicker">${esc(m.date)} · Khoảnh khắc chuyển động</div><h2>${esc(m.title)}</h2><p class="desc">Bấm phát để xem lại những giây phút của chúng mình.</p><div class="video-gallery count-${videos.length}">${videos.map((src, i) => videoCard(src, i, poster)).join('')}</div>${folio(num)}</article>`;
}
function anniversaryMarkup(m, num) {
    const petals12 = '<i></i>'.repeat(12);
    const flowers = [
        [15, 71, 0.72, -0.3],
        [38, 48, 0.92, -1.1],
        [63, 50, 0.9, -1.8],
        [86, 70, 0.72, -2.4],
    ]
        .map(([x, y, s, d]) => `<span class="year-sunflower" style="--x:${x}%;--y:${y}%;--s:${s};--d:${d}s"><span class="sf-petals">${petals12}</span><b class="sf-center"></b></span>`)
        .join('');
    return `<article class="page anniversary-page"><div class="anniversary-orbit"><div class="four-sunflowers">${flowers}</div></div><div class="anniversary-copy"><div class="eyebrow">${esc(m.date)} · Our fourth chapter</div><h2>Bốn năm mình có nhau</h2><div class="anniversary-stats"><div class="anniversary-stat"><strong>4</strong><span>năm</span></div><div class="anniversary-stat"><strong>48</strong><span>tháng</span></div><div class="anniversary-stat"><strong>1.461</strong><span>ngày</span></div></div><p class="anniversary-message">${esc(m.desc)}</p><div class="flourish">♡</div><p class="anniversary-promise">Và mình vẫn còn thật nhiều trang để viết tiếp…</p></div>${folio(num)}</article>`;
}
pages.push({
    label: 'Mục lục',
    html: (num) =>
        `<article class="page toc"><div class="eyebrow">Our little story</div><h2>Mục lục</h2><div class="flourish">♡</div><nav class="toc-list">${CONFIG.milestones.map((m, i) => `<button class="toc-link" data-m="${i}"><span class="toc-no">${String(i + 1).padStart(2, '0')}</span><span>${esc(m.title)}</span><span class="toc-date">${esc(m.date)}</span></button>`).join('')}<button class="toc-link" data-special="garden"><span class="toc-no">☀</span><span>Vườn hướng dương</span><span class="toc-date">Lung linh</span></button><button class="toc-link" data-special="playlist"><span class="toc-no">♫</span><span>Playlist của chúng mình</span><span class="toc-date">Music</span></button><button class="toc-link" data-special="letter"><span class="toc-no">♡</span><span>Lời nhắn</span><span class="toc-date">Gửi em</span></button></nav>${folio(num)}</article>`,
});
pages.push({
    label: 'Lời mở đầu',
    html: (num) =>
        `<article class="page intro"><div class="starsign">✦ · ✧ · ✦</div><blockquote>“Có những cuộc gặp gỡ<br>trở thành cả một hành trình.”</blockquote><p>Và câu chuyện của chúng mình bắt đầu như thế…</p>${folio(num)}</article>`,
});
const quotes = [
    ['Thời gian đẹp nhất là thời gian có nhau.', 'Chương một · Những rung động đầu tiên'],
    ['Bình yên là khi mỗi ngày đều có người để nhớ.', 'Chương hai · Cùng nhau trưởng thành'],
    ['Chuyện tình đẹp nhất vẫn đang được viết tiếp.', 'Chương ba · Bốn mùa thương nhớ'],
];
CONFIG.milestones.forEach((m, i) => {
    milestoneIndexes[i] = pages.length;
    const photos = Array.isArray(m.photos) ? m.photos.filter(Boolean) : [];
    const videos = Array.isArray(m.videos) ? m.videos.filter(Boolean) : m.video ? [m.video] : [];
    const isFourthAnniversary = /bốn năm/i.test(m.title) && photos.length === 0 && videos.length === 0;
    if (isFourthAnniversary) {
        pages.push({ label: m.title, html: (num) => anniversaryMarkup(m, num) });
    } else {
        const photoGroups = chunk(photos, 3);
        if (photoGroups.length === 0) photoGroups.push([]);
        photoGroups.forEach((group, groupIndex) => {
            pages.push({
                label: groupIndex === 0 ? m.title : `${m.title} · Album ${groupIndex + 1}`,
                html: (num) => milestoneMarkup(m, group, groupIndex, photoGroups.length, num),
            });
        });
        if (videos.length) {
            pages.push({
                label: `${m.title} · Video`,
                html: (num) => videoPageMarkup(m, videos, photos[0] || '', num),
            });
        }
    }
    if ((i + 1) % 4 === 0 && i < CONFIG.milestones.length - 1) {
        const q = quotes[Math.floor(i / 4) % quotes.length];
        pages.push({ label: 'Khoảng lặng', html: () => deco(q[0], q[1]) });
    }
});
function flowerMarkup() {
    const flowers = [
        [3, 42, 0.54, -0.2, 2],
        [9, 61, 0.76, -0.9, 4],
        [16, 48, 0.58, -1.5, 2],
        [22, 73, 0.9, -2.2, 5],
        [29, 54, 0.68, -1.1, 3],
        [36, 82, 1.02, -2.8, 6],
        [44, 60, 0.72, -0.5, 3],
        [51, 76, 0.92, -1.8, 5],
        [59, 52, 0.62, -2.5, 2],
        [66, 85, 1.04, -1.2, 6],
        [73, 63, 0.78, -2.1, 4],
        [80, 75, 0.9, -0.7, 5],
        [87, 49, 0.58, -1.7, 2],
        [93, 66, 0.8, -2.4, 4],
        [98, 43, 0.53, -0.4, 2],
    ];
    const petals = '<i></i>'.repeat(12);
    const f = flowers
        .map(
            (a) =>
                `<div class="flower" style="--x:${a[0]}%;--h:${a[1]}%;--s:${a[2]};--d:${a[3]}s;--layer:${a[4]}"><i class="stem"></i><i class="leaf"></i><i class="leaf r"></i><span class="bloom">${petals}</span></div>`,
        )
        .join('');
    const g = Array.from(
        { length: 22 },
        (_, i) =>
            `<b class="glimmer" style="--x:${(i * 43) % 96}%;--y:${7 + ((i * 31) % 73)}%;--z:${0.5 + (i % 4) * 0.16}rem;--d:-${i * 0.17}s">✦</b>`,
    ).join('');
    return `<article class="page flower-page"><div class="eyebrow">29.08.2022 — 29.08.2026</div><h2>Vườn hướng dương của chúng mình</h2><p class="flower-note">Từ lúc gặp em, anh mới nhận ra hoa hướng dương đẹp như vậy.</p><div class="garden">${g}${f}<div class="garden-floor"></div></div></article>`;
}
const gardenIndex = pages.length;
pages.push({ label: 'Vườn hướng dương', html: flowerMarkup });
const playlistIndex = pages.length;
pages.push({
    label: 'Playlist',
    html: (num) => `<article class="page playlist-page"><div class="eyebrow">Songs we keep</div><h2>Playlist của chúng mình</h2><div class="flourish">♫</div><div class="songs">${CONFIG.playlist
        .map(
            (s, i) =>
                `<button type="button" class="song ${s.src ? '' : 'is-missing'}" data-track="${i}" aria-label="${s.src ? 'Phát' : 'Chưa có file cho'} ${esc(s.title)}"><span class="song-play">${s.src ? '▶' : '＋'}</span><span class="song-copy"><span class="song-title">${esc(s.title)}</span><span class="artist">${esc(s.artist)}</span></span><span class="note">${esc(s.note)}</span></button>`,
        )
        .join('')}</div><section class="playlist-player" aria-label="Trình phát nhạc"><div class="player-cover" id="playerCover"><span>♫</span></div><div class="player-info"><span class="now-label">Now playing</span><strong class="now-title">Chọn một bài hát</strong><span class="now-artist">Playlist của chúng mình</span></div><div class="player-controls"><button type="button" data-player-action="prev" aria-label="Bài trước">‹</button><button type="button" class="player-toggle" data-player-action="toggle" aria-label="Phát hoặc tạm dừng">▶</button><button type="button" data-player-action="next" aria-label="Bài sau">›</button></div><div class="player-timeline"><time class="time-current">0:00</time><input class="player-progress" type="range" min="0" max="100" value="0" step="0.1" aria-label="Tiến trình bài hát"><time class="time-total">0:00</time></div><p class="player-status" aria-live="polite">Chọn bài hát để bắt đầu.</p></section>${folio(num)}</article>`,
});
const letterIndex = pages.length;
pages.push({
    label: 'Lời nhắn',
    html: (num) =>
        `<article class="page letter"><div class="envelope"></div><div class="eyebrow">To my favorite person</div><h2>Gửi em,</h2><p class="letter-text">${esc(CONFIG.letter)}</p><div class="signature">— ${esc(CONFIG.signature)}</div><button class="primary" id="love" type="button" aria-label="Tung hoa và hiện những bức ảnh kỷ niệm">♡ Lovee</button>${folio(num)}</article>`,
});
const left = document.querySelector('#left'),
    right = document.querySelector('#right'),
    book = document.querySelector('#book'),
    prev = document.querySelector('#prev'),
    next = document.querySelector('#next'),
    progress = document.querySelector('#progress'),
    dots = document.querySelector('#dots');
const coverEl = document.querySelector('#cover'),
    openBtn = document.querySelector('#open'),
    homeBtn = document.querySelector('#home'),
    musicBtn = document.querySelector('#music'),
    audioEl = document.querySelector('#audio'),
    playlistAudioEl = document.querySelector('#playlistAudio'),
    lightboxEl = document.querySelector('#lightbox'),
    zoomEl = document.querySelector('#zoom'),
    closeBtn = document.querySelector('#close');
let current = 0,
    turning = false,
    mobile = matchMedia('(max-width:740px)').matches;
let activeTrackIndex = -1,
    playerMessage = 'Chọn bài hát để bắt đầu.';
const step = () => (mobile ? 1 : 2);
const normalize = (i) => (mobile ? i : i - (i % 2));
function render() {
    current = Math.max(0, Math.min(normalize(current), mobile ? pages.length - 1 : Math.max(0, pages.length - 2)));
    if (mobile) {
        left.innerHTML = '';
        right.innerHTML = pages[current]?.html(current + 1) || '';
    } else {
        left.innerHTML = pages[current]?.html(current + 1) || '';
        right.innerHTML = pages[current + 1]?.html(current + 2) || deco('Và hành trình vẫn còn tiếp tục…', 'To be continued');
    }
    prev.disabled = current === 0;
    next.disabled = current + step() >= pages.length;
    let shown = Math.min(current + step(), pages.length);
    progress.textContent = `${String(current + 1).padStart(2, '0')}–${String(shown).padStart(2, '0')} / ${String(pages.length).padStart(2, '0')}`;
    dots.innerHTML = Array.from(
        { length: Math.ceil(pages.length / step()) },
        (_, i) => `<i class="dot ${i === Math.floor(current / step()) ? 'active' : ''}"></i>`,
    ).join('');
    requestAnimationFrame(syncPlaylistUI);
}
function turn(dir) {
    if (turning) return;
    let target = current + (dir === 'next' ? step() : -step());
    if (target < 0 || target >= pages.length) return;
    book.querySelectorAll('video').forEach((item) => item.pause());
    turning = true;
    let sheet = document.createElement('div');
    sheet.className = 'turn-sheet ' + dir;
    sheet.innerHTML = (dir === 'next' ? right : left).innerHTML;
    book.append(sheet);
    setTimeout(() => {
        current = target;
        render();
    }, 330);
    setTimeout(() => {
        sheet.remove();
        turning = false;
    }, 740);
}
const go = (i) => {
    current = normalize(i);
    render();
};
const formatTime = (seconds) => {
    if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
};
const playableTrackIndexes = () => CONFIG.playlist.map((track, index) => (track.src ? index : -1)).filter((index) => index >= 0);
function syncPlaylistUI() {
    const track = activeTrackIndex >= 0 ? CONFIG.playlist[activeTrackIndex] : null;
    const isPlaying = Boolean(track?.src) && !playlistAudioEl.paused;
    book.querySelectorAll('.song[data-track]').forEach((button) => {
        const index = Number(button.dataset.track);
        const active = index === activeTrackIndex;
        button.classList.toggle('is-active', active);
        button.classList.toggle('is-playing', active && isPlaying);
        button.setAttribute('aria-pressed', String(active && isPlaying));
        const icon = button.querySelector('.song-play');
        if (icon) icon.textContent = CONFIG.playlist[index]?.src ? (active && isPlaying ? '❚❚' : '▶') : '＋';
    });
    const player = book.querySelector('.playlist-player');
    if (!player) return;
    player.classList.toggle('is-playing', isPlaying);
    const title = player.querySelector('.now-title');
    const artist = player.querySelector('.now-artist');
    const coverArt = player.querySelector('.player-cover');
    const toggle = player.querySelector('[data-player-action="toggle"]');
    const progressInput = player.querySelector('.player-progress');
    const duration = Number.isFinite(playlistAudioEl.duration) ? playlistAudioEl.duration : 0;
    title.textContent = track?.title || 'Chọn một bài hát';
    artist.textContent = track?.artist || 'Playlist của chúng mình';
    toggle.textContent = isPlaying ? '❚❚' : '▶';
    toggle.setAttribute('aria-label', isPlaying ? 'Tạm dừng' : 'Phát');
    progressInput.max = duration || 100;
    progressInput.value = duration ? Math.min(playlistAudioEl.currentTime, duration) : 0;
    progressInput.disabled = !track?.src;
    player.querySelector('.time-current').textContent = formatTime(playlistAudioEl.currentTime);
    player.querySelector('.time-total').textContent = formatTime(duration);
    player.querySelector('.player-status').textContent = playerMessage;
    const cover = track?.cover || '';
    coverArt.classList.toggle('has-cover', Boolean(cover));
    coverArt.style.backgroundImage = cover ? `url(${JSON.stringify(cover)})` : '';
    player.querySelectorAll('[data-player-action]').forEach((button) => (button.disabled = playableTrackIndexes().length === 0));
}
async function selectTrack(index, autoplay = true) {
    const track = CONFIG.playlist[index];
    if (!track) return;
    activeTrackIndex = index;
    if (!track.src) {
        playlistAudioEl.pause();
        playlistAudioEl.removeAttribute('src');
        playlistAudioEl.removeAttribute('data-track');
        playlistAudioEl.load();
        playerMessage = `Chưa có file nhạc cho “${track.title}”.`;
        syncPlaylistUI();
        return;
    }
    if (playlistAudioEl.dataset.track !== String(index)) {
        playlistAudioEl.src = track.src;
        playlistAudioEl.dataset.track = String(index);
        playlistAudioEl.load();
    }
    if (!autoplay) {
        playerMessage = `Đã chọn “${track.title}”.`;
        syncPlaylistUI();
        return;
    }
    audioEl.pause();
    try {
        await playlistAudioEl.play();
        playerMessage = `Đang phát “${track.title}”.`;
    } catch {
        playerMessage = 'Trình duyệt chưa cho phép phát nhạc. Hãy bấm nút phát một lần nữa.';
    }
    syncPlaylistUI();
}
function toggleTrack(index) {
    const sameTrack = activeTrackIndex === index && playlistAudioEl.dataset.track === String(index);
    if (sameTrack && !playlistAudioEl.paused) {
        playlistAudioEl.pause();
        return;
    }
    selectTrack(index, true);
}
function changeTrack(direction) {
    const available = playableTrackIndexes();
    if (!available.length) {
        playerMessage = 'Hãy thêm đường dẫn MP3 vào src trong data.js.';
        syncPlaylistUI();
        return;
    }
    const position = available.indexOf(activeTrackIndex);
    const nextPosition = position < 0 ? 0 : (position + direction + available.length) % available.length;
    const nextIndex = available[nextPosition];
    if (nextIndex === activeTrackIndex) playlistAudioEl.currentTime = 0;
    selectTrack(nextIndex, true);
}
prev.onclick = () => turn('prev');
next.onclick = () => turn('next');
book.onclick = (e) => {
    let m = e.target.closest('[data-m]');
    if (m) go(milestoneIndexes[+m.dataset.m]);
    let s = e.target.closest('[data-special]');
    if (s) go(s.dataset.special === 'garden' ? gardenIndex : s.dataset.special === 'playlist' ? playlistIndex : letterIndex);
    const song = e.target.closest('[data-track]');
    if (song) toggleTrack(Number(song.dataset.track));
    const playerAction = e.target.closest('[data-player-action]')?.dataset.playerAction;
    if (playerAction === 'prev') changeTrack(-1);
    if (playerAction === 'next') changeTrack(1);
    if (playerAction === 'toggle') {
        if (activeTrackIndex >= 0) toggleTrack(activeTrackIndex);
        else changeTrack(1);
    }
    let img = e.target.closest('.photo img');
    if (img) {
        zoomEl.src = img.src;
        lightboxEl.classList.add('show');
    }
    const loveButton = e.target.closest('#love');
    if (loveButton) startLoveCelebration(loveButton);
};
book.addEventListener('input', (e) => {
    if (!e.target.matches('.player-progress') || !Number.isFinite(playlistAudioEl.duration)) return;
    playlistAudioEl.currentTime = Number(e.target.value);
    syncPlaylistUI();
});
document.onkeydown = (e) => {
    if (e.key === 'Escape') {
        closeBox();
        return;
    }
    if (e.target.matches('input, button, video')) return;
    if (e.key === 'ArrowRight') turn('next');
    if (e.key === 'ArrowLeft') turn('prev');
};
let startX = 0,
    canSwipe = false;
book.onpointerdown = (e) => {
    startX = e.clientX;
    canSwipe = !e.target.closest('input, button, video, iframe');
};
book.onpointerup = (e) => {
    let d = e.clientX - startX;
    if (canSwipe && Math.abs(d) > 55) turn(d < 0 ? 'next' : 'prev');
};
openBtn.onclick = async () => {
    coverEl.classList.add('opened');
    await playBackgroundMusic();
};
homeBtn.onclick = () => {
    current = 0;
    render();
    coverEl.hidden = false;
    coverEl.classList.remove('opened');
};
if (location.hash === '#garden') {
    coverEl.hidden = true;
    coverEl.classList.add('opened');
    go(gardenIndex);
}
const milestoneHash = location.hash.match(/^#milestone-(\d+)$/);
if (milestoneHash) {
    const requested = Number(milestoneHash[1]) - 1;
    if (milestoneIndexes[requested] !== undefined) {
        coverEl.hidden = true;
        coverEl.classList.add('opened');
        go(milestoneIndexes[requested]);
    }
}
const pageHash = location.hash.match(/^#page-(\d+)$/);
if (pageHash) {
    const requestedPage = Number(pageHash[1]) - 1;
    if (pages[requestedPage]) {
        coverEl.hidden = true;
        coverEl.classList.add('opened');
        go(requestedPage);
    }
}
const trackHash = location.hash.match(/^#track-(\d+)$/);
if (trackHash) {
    const requestedTrack = Number(trackHash[1]) - 1;
    if (CONFIG.playlist[requestedTrack]) {
        coverEl.hidden = true;
        coverEl.classList.add('opened');
        go(playlistIndex);
        selectTrack(requestedTrack, true);
    }
}
function syncBackgroundMusicButton() {
    const isPlaying = Boolean(CONFIG.music) && !audioEl.paused;
    musicBtn.textContent = isPlaying ? '❚❚' : '♪';
    musicBtn.title = isPlaying ? 'Tắt nhạc nền' : 'Bật nhạc nền';
    musicBtn.setAttribute('aria-label', musicBtn.title);
    musicBtn.setAttribute('aria-pressed', String(isPlaying));
}
async function playBackgroundMusic() {
    if (!CONFIG.music) return false;
    playlistAudioEl.pause();
    try {
        await audioEl.play();
        return true;
    } catch {
        return false;
    } finally {
        syncBackgroundMusicButton();
    }
}
if (CONFIG.music) audioEl.src = CONFIG.music;
syncBackgroundMusicButton();
musicBtn.onclick = async () => {
    if (!CONFIG.music) {
        musicBtn.textContent = '×';
        musicBtn.title = 'Thêm nhạc trong CONFIG.music';
        setTimeout(syncBackgroundMusicButton, 1200);
        return;
    }
    if (audioEl.paused) {
        await playBackgroundMusic();
    } else {
        audioEl.pause();
    }
    syncBackgroundMusicButton();
};
audioEl.addEventListener('play', syncBackgroundMusicButton);
audioEl.addEventListener('pause', syncBackgroundMusicButton);
audioEl.addEventListener('ended', syncBackgroundMusicButton);
audioEl.addEventListener('error', syncBackgroundMusicButton);
playlistAudioEl.addEventListener('loadedmetadata', syncPlaylistUI);
playlistAudioEl.addEventListener('timeupdate', syncPlaylistUI);
playlistAudioEl.addEventListener('play', () => {
    const track = CONFIG.playlist[activeTrackIndex];
    playerMessage = track ? `Đang phát “${track.title}”.` : 'Đang phát.';
    syncPlaylistUI();
});
playlistAudioEl.addEventListener('pause', () => {
    if (!playlistAudioEl.ended && activeTrackIndex >= 0 && CONFIG.playlist[activeTrackIndex]?.src) {
        playerMessage = `Đã tạm dừng “${CONFIG.playlist[activeTrackIndex].title}”.`;
    }
    syncPlaylistUI();
});
playlistAudioEl.addEventListener('ended', () => changeTrack(1));
playlistAudioEl.addEventListener('error', () => {
    if (activeTrackIndex < 0) return;
    playerMessage = 'Không mở được file nhạc. Hãy kiểm tra lại đường dẫn src trong data.js.';
    syncPlaylistUI();
});
const closeBox = () => {
    lightboxEl.classList.remove('show');
    zoomEl.src = '';
};
closeBtn.onclick = closeBox;
lightboxEl.onclick = (e) => {
    if (e.target === lightboxEl) closeBox();
};
const sky = document.querySelector('#sky'),
    ctx = sky.getContext('2d'),
    celebrate = document.querySelector('#celebrate'),
    cx = celebrate.getContext('2d'),
    loveMessageEl = document.querySelector('#loveMessage'),
    loveStatusEl = document.querySelector('#loveStatus');
const MEMORY_PHOTOS = [...new Set(CONFIG.milestones.flatMap(({ photos = [] }) => photos).filter(Boolean))];
const memoryThumbCache = new Map();
let stars = [],
    celebrationParticles = [],
    celebrationFrame = 0,
    celebrationLast = 0,
    celebrationRun = 0,
    celebrationStopTimer = 0,
    celebrationMessageTimer = 0,
    memoryPhotoBag = [],
    staticLoveScene = null;

function roundedPath(context, x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2);
    context.beginPath();
    context.moveTo(x + r, y);
    context.arcTo(x + width, y, x + width, y + height, r);
    context.arcTo(x + width, y + height, x, y + height, r);
    context.arcTo(x, y + height, x, y, r);
    context.arcTo(x, y, x + width, y, r);
    context.closePath();
}
function buildFlowerSprite({ petals, petalColor, petalTip, centerColor, innerColor, petalWidth, petalLength }) {
    const sprite = document.createElement('canvas');
    sprite.width = 128;
    sprite.height = 128;
    const sc = sprite.getContext('2d');
    sc.translate(64, 64);
    sc.shadowColor = '#3b17384a';
    sc.shadowBlur = 7;
    for (let i = 0; i < petals; i++) {
        sc.save();
        sc.rotate((Math.PI * 2 * i) / petals);
        const gradient = sc.createLinearGradient(0, -7, 0, -30);
        gradient.addColorStop(0, petalColor);
        gradient.addColorStop(1, petalTip);
        sc.fillStyle = gradient;
        sc.beginPath();
        sc.ellipse(0, -22, petalWidth, petalLength, 0, 0, Math.PI * 2);
        sc.fill();
        sc.restore();
    }
    sc.shadowBlur = 5;
    sc.fillStyle = centerColor;
    sc.beginPath();
    sc.arc(0, 0, 13, 0, Math.PI * 2);
    sc.fill();
    sc.shadowBlur = 0;
    sc.fillStyle = innerColor;
    sc.beginPath();
    sc.arc(-2, -2, 6, 0, Math.PI * 2);
    sc.fill();
    return sprite;
}
const FLOWER_SPRITES = [
    buildFlowerSprite({ petals: 14, petalColor: '#f3a81f', petalTip: '#ffe36c', centerColor: '#6a351f', innerColor: '#3c201b', petalWidth: 5, petalLength: 18 }),
    buildFlowerSprite({ petals: 12, petalColor: '#fff8ed', petalTip: '#ffffff', centerColor: '#f0bd2e', innerColor: '#fff0a2', petalWidth: 6, petalLength: 17 }),
    buildFlowerSprite({ petals: 8, petalColor: '#ec75a0', petalTip: '#ffd1df', centerColor: '#f8c34b', innerColor: '#fff2a9', petalWidth: 9, petalLength: 17 }),
    buildFlowerSprite({ petals: 7, petalColor: '#9a63d5', petalTip: '#dbc5ff', centerColor: '#ffe590', innerColor: '#fff8cc', petalWidth: 9, petalLength: 18 }),
    buildFlowerSprite({ petals: 6, petalColor: '#df4c64', petalTip: '#ff9ca9', centerColor: '#f6bd6a', innerColor: '#fff0b3', petalWidth: 10, petalLength: 18 }),
    buildFlowerSprite({ petals: 5, petalColor: '#619bd8', petalTip: '#bfe2ff', centerColor: '#f8d96d', innerColor: '#fff6ba', petalWidth: 11, petalLength: 17 }),
    buildFlowerSprite({ petals: 10, petalColor: '#ff8c5d', petalTip: '#ffc6a2', centerColor: '#8c4530', innerColor: '#5d2e26', petalWidth: 7, petalLength: 18 }),
];

function shuffle(items) {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}
function takeMemorySources(count) {
    const picked = [];
    while (picked.length < count && MEMORY_PHOTOS.length) {
        if (!memoryPhotoBag.length) memoryPhotoBag = shuffle(MEMORY_PHOTOS);
        const src = memoryPhotoBag.shift();
        if (!picked.includes(src)) picked.push(src);
    }
    return picked;
}
function prepareMemoryThumb(src) {
    if (memoryThumbCache.has(src)) return memoryThumbCache.get(src);
    const promise = new Promise((resolve) => {
        const image = new Image();
        image.decoding = 'async';
        image.onload = () => {
            const thumb = document.createElement('canvas');
            thumb.width = 220;
            thumb.height = 260;
            const tc = thumb.getContext('2d');
            tc.shadowColor = '#1c0a2066';
            tc.shadowBlur = 12;
            tc.shadowOffsetY = 6;
            roundedPath(tc, 10, 8, 200, 240, 15);
            tc.fillStyle = '#fffaf5';
            tc.fill();
            tc.shadowColor = 'transparent';
            roundedPath(tc, 20, 18, 180, 188, 9);
            tc.save();
            tc.clip();
            const targetRatio = 180 / 188;
            const imageRatio = image.naturalWidth / image.naturalHeight;
            let sx = 0,
                sy = 0,
                sw = image.naturalWidth,
                sh = image.naturalHeight;
            if (imageRatio > targetRatio) {
                sw = image.naturalHeight * targetRatio;
                sx = (image.naturalWidth - sw) / 2;
            } else {
                sh = image.naturalWidth / targetRatio;
                sy = (image.naturalHeight - sh) / 2;
            }
            tc.drawImage(image, sx, sy, sw, sh, 20, 18, 180, 188);
            tc.restore();
            tc.strokeStyle = '#e9c4d1';
            tc.lineWidth = 2;
            roundedPath(tc, 20, 18, 180, 188, 9);
            tc.stroke();
            tc.fillStyle = '#c45f86';
            tc.font = "28px 'Cormorant Garamond', serif";
            tc.textAlign = 'center';
            tc.fillText('♡', 110, 234);
            resolve(thumb);
        };
        image.onerror = () => resolve(null);
        image.src = src;
    });
    memoryThumbCache.set(src, promise);
    if (memoryThumbCache.size > 24) memoryThumbCache.delete(memoryThumbCache.keys().next().value);
    return promise;
}
function memorySlots(compact) {
    const slots = compact
        ? [
              [0.16, 0.15],
              [0.5, 0.11],
              [0.84, 0.16],
              [0.14, 0.46],
              [0.86, 0.45],
              [0.18, 0.75],
              [0.5, 0.79],
              [0.82, 0.73],
          ]
        : [
              [0.09, 0.16],
              [0.27, 0.1],
              [0.48, 0.12],
              [0.7, 0.1],
              [0.9, 0.16],
              [0.08, 0.48],
              [0.27, 0.42],
              [0.73, 0.41],
              [0.92, 0.49],
              [0.14, 0.79],
              [0.36, 0.73],
              [0.64, 0.73],
              [0.86, 0.79],
          ];
    return shuffle(slots);
}
function addFlowerParticles(origin, count) {
    for (let i = 0; i < count; i++) {
        const targetX = 24 + Math.random() * Math.max(1, innerWidth - 48);
        const targetY = 24 + Math.random() * innerHeight * 0.72;
        celebrationParticles.push({
            type: 'flower',
            sprite: FLOWER_SPRITES[(Math.random() * FLOWER_SPRITES.length) | 0],
            originX: origin.x,
            originY: origin.y,
            targetX,
            targetY,
            controlX: (origin.x + targetX) / 2 + (Math.random() - 0.5) * 180,
            controlY: Math.min(origin.y, targetY) - 80 - Math.random() * 230,
            size: 22 + Math.random() * (mobile ? 25 : 39),
            rotation: Math.random() * Math.PI * 2,
            spin: (Math.random() - 0.5) * 0.12,
            sway: 8 + Math.random() * 18,
            fall: 90 + Math.random() * 170,
            delay: Math.random() * 650,
            burstDuration: 850 + Math.random() * 900,
            life: 3600 + Math.random() * 2200,
            age: 0,
        });
    }
}
function addPhotoParticle(thumb, origin, slot, compact, index) {
    celebrationParticles.push({
        type: 'photo',
        thumb,
        originX: origin.x,
        originY: origin.y,
        targetX: slot[0] * innerWidth,
        targetY: slot[1] * innerHeight,
        controlX: (origin.x + slot[0] * innerWidth) / 2 + (Math.random() - 0.5) * 100,
        controlY: Math.min(origin.y, slot[1] * innerHeight) - 90 - Math.random() * 130,
        width: compact ? 78 + Math.random() * 8 : 108 + Math.random() * 20,
        rotation: ((Math.random() - 0.5) * 18 * Math.PI) / 180,
        delay: 140 + index * 65 + Math.random() * 220,
        burstDuration: 1050 + Math.random() * 600,
        life: 5400,
        age: 0,
    });
}
function easeOutCubic(value) {
    return 1 - Math.pow(1 - value, 3);
}
function easeOutBack(value) {
    const c1 = 1.70158,
        c3 = c1 + 1;
    return 1 + c3 * Math.pow(value - 1, 3) + c1 * Math.pow(value - 1, 2);
}
function pointOnCurve(particle, progress) {
    const inverse = 1 - progress;
    return {
        x: inverse * inverse * particle.originX + 2 * inverse * progress * particle.controlX + progress * progress * particle.targetX,
        y: inverse * inverse * particle.originY + 2 * inverse * progress * particle.controlY + progress * progress * particle.targetY,
    };
}
function drawFlowerParticle(particle) {
    const elapsed = particle.age - particle.delay;
    if (elapsed < 0 || elapsed > particle.life) return;
    const burstProgress = Math.min(1, elapsed / particle.burstDuration);
    const point = pointOnCurve(particle, easeOutCubic(burstProgress));
    const driftProgress = Math.max(0, (elapsed - particle.burstDuration) / Math.max(1, particle.life - particle.burstDuration));
    const x = point.x + Math.sin(driftProgress * Math.PI * 5 + particle.rotation) * particle.sway * driftProgress;
    const y = point.y + particle.fall * driftProgress * driftProgress;
    const fadeIn = Math.min(1, elapsed / 160);
    const fadeOut = elapsed > particle.life * 0.72 ? 1 - (elapsed - particle.life * 0.72) / (particle.life * 0.28) : 1;
    const scale = 0.22 + easeOutBack(burstProgress) * 0.78;
    const size = particle.size * Math.max(0.2, scale);
    cx.save();
    cx.globalAlpha = Math.max(0, fadeIn * fadeOut);
    cx.translate(x, y);
    cx.rotate(particle.rotation + particle.spin * (elapsed / 16.67));
    cx.drawImage(particle.sprite, -size / 2, -size / 2, size, size);
    cx.restore();
}
function drawPhotoParticle(particle) {
    const elapsed = particle.age - particle.delay;
    if (elapsed < 0 || elapsed > particle.life) return;
    const burstProgress = Math.min(1, elapsed / particle.burstDuration);
    const point = pointOnCurve(particle, easeOutCubic(burstProgress));
    const floatProgress = Math.max(0, (elapsed - particle.burstDuration) / Math.max(1, particle.life - particle.burstDuration));
    const fadeIn = Math.min(1, elapsed / 220);
    const fadeOut = elapsed > particle.life - 900 ? 1 - (elapsed - particle.life + 900) / 900 : 1;
    const scale = 0.12 + easeOutBack(burstProgress) * 0.88;
    const width = particle.width * Math.max(0.2, scale);
    const height = width * (260 / 220);
    cx.save();
    cx.globalAlpha = Math.max(0, fadeIn * fadeOut);
    cx.translate(point.x, point.y - Math.sin(floatProgress * Math.PI) * 13);
    cx.rotate(particle.rotation * burstProgress + Math.sin(floatProgress * Math.PI * 2) * 0.025);
    cx.shadowColor = '#16091f66';
    cx.shadowBlur = 13;
    cx.shadowOffsetY = 5;
    cx.drawImage(particle.thumb, -width / 2, -height / 2, width, height);
    cx.restore();
}
function animateLoveCelebration(now) {
    const elapsedFrame = celebrationLast ? Math.min(34, now - celebrationLast) : 16.67;
    celebrationLast = now;
    cx.clearRect(0, 0, innerWidth, innerHeight);
    celebrationParticles.forEach((particle) => (particle.age += elapsedFrame));
    celebrationParticles.filter((particle) => particle.type === 'flower').forEach(drawFlowerParticle);
    celebrationParticles.filter((particle) => particle.type === 'photo').forEach(drawPhotoParticle);
    celebrationParticles = celebrationParticles.filter((particle) => particle.age <= particle.delay + particle.life);
    if (celebrationParticles.length) celebrationFrame = requestAnimationFrame(animateLoveCelebration);
    else celebrationFrame = 0;
}
function drawStaticLoveScene() {
    if (!staticLoveScene) return;
    cx.clearRect(0, 0, innerWidth, innerHeight);
    staticLoveScene.flowers.forEach((flower) => {
        cx.save();
        cx.globalAlpha = 0.92;
        cx.translate(flower.x, flower.y);
        cx.rotate(flower.rotation);
        cx.drawImage(flower.sprite, -flower.size / 2, -flower.size / 2, flower.size, flower.size);
        cx.restore();
    });
    staticLoveScene.photos.forEach((photo) => {
        const height = photo.width * (260 / 220);
        cx.save();
        cx.translate(photo.x, photo.y);
        cx.rotate(photo.rotation);
        cx.drawImage(photo.thumb, -photo.width / 2, -height / 2, photo.width, height);
        cx.restore();
    });
}
function stopLoveCelebration() {
    celebrationRun++;
    if (celebrationFrame) cancelAnimationFrame(celebrationFrame);
    clearTimeout(celebrationStopTimer);
    clearTimeout(celebrationMessageTimer);
    celebrationFrame = 0;
    celebrationLast = 0;
    celebrationParticles = [];
    staticLoveScene = null;
    cx.clearRect(0, 0, innerWidth, innerHeight);
    loveMessageEl.classList.remove('show');
    loveMessageEl.setAttribute('aria-hidden', 'true');
    document.querySelector('#love')?.classList.remove('is-celebrating');
}
function startLoveCelebration(button) {
    stopLoveCelebration();
    const run = celebrationRun;
    const rect = button.getBoundingClientRect();
    const origin = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const compact = mobile || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
    const photoSources = takeMemorySources(reducedMotion ? 4 : compact ? 7 : 12);
    const slots = memorySlots(compact);
    button.classList.add('is-celebrating');
    loveMessageEl.setAttribute('aria-hidden', 'false');
    loveMessageEl.classList.add('show');
    loveStatusEl.textContent = '';
    requestAnimationFrame(() => (loveStatusEl.textContent = 'Hoa và những bức ảnh kỷ niệm đã xuất hiện.'));

    if (reducedMotion) {
        staticLoveScene = {
            flowers: Array.from({ length: 22 }, () => ({
                sprite: FLOWER_SPRITES[(Math.random() * FLOWER_SPRITES.length) | 0],
                x: 24 + Math.random() * Math.max(1, innerWidth - 48),
                y: 28 + Math.random() * innerHeight * 0.78,
                size: 25 + Math.random() * 28,
                rotation: Math.random() * Math.PI * 2,
            })),
            photos: [],
        };
        drawStaticLoveScene();
        photoSources.forEach((src, index) => {
            prepareMemoryThumb(src).then((thumb) => {
                if (!thumb || run !== celebrationRun || !staticLoveScene) return;
                const slot = slots[index % slots.length];
                staticLoveScene.photos.push({
                    thumb,
                    x: slot[0] * innerWidth,
                    y: slot[1] * innerHeight,
                    width: compact ? 78 : 112,
                    rotation: ((Math.random() - 0.5) * 15 * Math.PI) / 180,
                });
                drawStaticLoveScene();
            });
        });
        celebrationMessageTimer = setTimeout(() => loveMessageEl.classList.remove('show'), 2400);
        celebrationStopTimer = setTimeout(stopLoveCelebration, 4200);
        return;
    }

    addFlowerParticles(origin, compact ? 78 : 150);
    photoSources.forEach((src, index) => {
        prepareMemoryThumb(src).then((thumb) => {
            if (!thumb || run !== celebrationRun) return;
            addPhotoParticle(thumb, origin, slots[index % slots.length], compact, index);
            if (!celebrationFrame) {
                celebrationLast = 0;
                celebrationFrame = requestAnimationFrame(animateLoveCelebration);
            }
        });
    });
    celebrationFrame = requestAnimationFrame(animateLoveCelebration);
    celebrationMessageTimer = setTimeout(() => loveMessageEl.classList.remove('show'), 2700);
    celebrationStopTimer = setTimeout(stopLoveCelebration, 6800);
}
function resize() {
    let d = Math.min(devicePixelRatio, 2);
    [sky, celebrate].forEach((c) => {
        c.width = innerWidth * d;
        c.height = innerHeight * d;
        c.style.width = innerWidth + 'px';
        c.style.height = innerHeight + 'px';
        c.getContext('2d').setTransform(d, 0, 0, d, 0, 0);
    });
    stars = Array.from({ length: Math.min(150, innerWidth / 7) }, () => ({
        x: Math.random() * innerWidth,
        y: Math.random() * innerHeight,
        r: Math.random() * 1.3 + 0.2,
        a: Math.random() * 0.65 + 0.15,
        p: Math.random() * 6.28,
    }));
}
function draw(t = 0) {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    stars.forEach((s) => {
        ctx.globalAlpha = s.a * (0.65 + 0.35 * Math.sin(t * 0.0007 + s.p));
        ctx.fillStyle = '#fff4fb';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, 7);
        ctx.fill();
    });
    ctx.globalAlpha = 1;
    if (!matchMedia('(prefers-reduced-motion:reduce)').matches) requestAnimationFrame(draw);
}
addEventListener('resize', () => {
    stopLoveCelebration();
    let m = matchMedia('(max-width:740px)').matches;
    if (m !== mobile) {
        mobile = m;
        render();
    }
    resize();
});
document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopLoveCelebration();
});
resize();
render();
draw();
