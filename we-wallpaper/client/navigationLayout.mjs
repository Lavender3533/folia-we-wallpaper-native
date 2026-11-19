// Leave one native button slot between navigation and Folia's panel handle.
export function placeNavigation(viewport, layout) {
    const size = 48;
    const panel = layout?.obstacles.find(item => item.role === 'panel' && item.kind === 'control'
        && item.rect.width <= 128 && item.rect.height <= 80)?.rect;
    return {
        left: viewport.width - (viewport.width >= 768 ? 32 : 16) - size,
        top: (panel?.top ?? viewport.height - 32 - size) - (size + 12) * 2,
        width: size, height: size, revealPadding: 12,
    };
}
