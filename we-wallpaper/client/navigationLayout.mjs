// Hover areas also belong to native controls, including their slide-out command entry.
export function placeNavigation(viewport, size, layout) {
    const right = viewport.width - 24;
    const bottom = viewport.height - 32;
    const obstacles = (layout?.obstacles || []).map(item => item.rect);
    if (!layout) obstacles.push({ left: viewport.width - 240, top: viewport.height - 200, width: 240, height: 200 });
    for (const { width, revealPadding, compact } of [
        { width:size.width, revealPadding:32, compact:false },
        { width:size.height, revealPadding:8, compact:true },
    ]) {
        const gap = 12 + revealPadding;
        const intersects = (a, b) => a.left < b.left + b.width + gap && a.left + a.width + gap > b.left
            && a.top < b.top + b.height + gap && a.top + a.height + gap > b.top;
        const xs = [right - width, ...obstacles.map(rect => rect.left - gap - width)];
        const ys = [bottom - size.height, ...obstacles.map(rect => rect.top - gap - size.height)];
        const candidates = [];
        for (const left of xs) for (const top of ys) {
            const rect = { left, top, width, height:size.height, revealPadding, compact };
            if (left < 12 || top < 12 || left + width > right || top + size.height > bottom) continue;
            if (!obstacles.some(obstacle => intersects(rect, obstacle))) candidates.push(rect);
        }
        candidates.sort((a,b) => (right - a.left - a.width) + (bottom - a.top - a.height) * 2
            - (right - b.left - b.width) - (bottom - b.top - b.height) * 2);
        if (candidates.length) return candidates[0];
    }
    return null;
}
