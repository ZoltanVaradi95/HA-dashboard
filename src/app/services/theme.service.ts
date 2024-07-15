import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    renderFact: Renderer2;

    constructor(
        private renderer: RendererFactory2) {
        this.renderFact = this.renderer.createRenderer(null, null);
    }

    changeTheme(isLightTheme: boolean) {
        if (isLightTheme) {
            this.setLightMode();
        } else {
            this.setDarkMode();
        }
    }

    setLightMode() {
        this.renderFact.addClass(document.body, 'light-theme');
    }

    setDarkMode() {
        this.renderFact.removeClass(document.body, 'light-theme');
    }
}
