// Reserve a gap beside native controls; never move a button underneath an open panel.
export function placeNavigation(viewport, size, layout) {
    const gap = 12;
    const right = viewport.width - 24;
    const bottom = viewport.height - 32;
    const obstacles = (layout?.obstacles || []).filter(item => item.kind === 'control').map(item => item.rect);
    if (!layout) obstacles.push({ left: viewport.width - 88, top: viewport.height - 240, width: 88, height: 240 });
    const intersects = (a, b) => a.left < b.left + b.width + gap && a.left + a.width + gap > b.left
        && a.top < b.top + b.height + gap && a.top + a.height + gap > b.top;
    const xs = [right - size.width, ...obstacles.map(rect => rect.left - gap - size.width)];
    const ys = [bottom - size.height, ...obstacles.map(rect => rect.top - gap - size.height)];
    const candidates = [];
    for (const left of xs) for (const top of ys) {
        const rect = { left, top, ...size };
        if (left < 12 || top < 12 || left + size.width > right || top + size.height > bottom) continue;
        if (!obstacles.some(obstacle => intersects(rect, obstacle))) candidates.push(rect);
    }
    candidates.sort((a,b) => (right - a.left - a.width) + (bottom - a.top - a.height) * 2
        - (right - b.left - b.width) - (bottom - b.top - b.height) * 2);
    return candidates[0] || null;
}
