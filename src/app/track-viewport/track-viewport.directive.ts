import { Directive, ElementRef, HostListener, afterRender, inject, signal } from '@angular/core';

/**
 * From viewport-data.json
 *
 * List of available viewport sizes and the class that should be assigned to the associated element when matched.
 * N.B. The selected viewport will be the largest area that fits within the current viewport.
 *
 * There are two sizes for each device, one that represents the approximate device resolution, and another that
 * represents the resolution compensating for UI chrome.
 *
 * The default compensations are (width height):
 * phones - landscape: -50px -80px
 * phones - portrait: 0px -180px
 * tablets: 70px 70px
 * desktops: 25px -180px
 */
import * as viewportData from './viewport-data.json';
import { Viewport } from './viewport';

/**
 * Directive that sets a class name indicating the current viewport size against the associated element.
 * Unlike media queries this is a single value matching the best fit. With media queries, when multiple sizes
 * match, they're all applied. This can make it difficult to coordinate multiple non-incremental screen sizes.
 *
 * @example
 * <div track-viewport></div>
 */
@Directive({
    selector: '[track-viewport]',
    exportAs: 'viewportTracker'
})
export class TrackViewportDirective {
    private element = inject(ElementRef);
    private _ = afterRender(() => this.setActiveViewportClass());

    private lastViewportClassName = '';

    public viewports = viewportData.viewports as Viewport[];

    public activeViewport = signal(this.GetBestFitViewport());

    public client = signal<{ width: number, height: number}>({ width: 0, height: 0 });

    public browser = signal<{ width: number, height: number}>({ width: 0, height: 0 });

    /**
     *  Sets the class every time the window changes size.
     */
    @HostListener('window:resize', ['$event'])
    private handleElementOnResize(event: any): void {
        this.activeViewport.set(this.GetBestFitViewport());
        
        this.setActiveViewportClass();
    }

    private setActiveViewportClass() {
        this.client.set({ width: document.documentElement.clientWidth, height: document.documentElement.clientHeight });
        this.browser.set({ width: window.outerWidth, height:window.outerHeight });

        if (this.activeViewport().className !== this.lastViewportClassName) {
            if (this.lastViewportClassName !== '') {
                this.element.nativeElement.classList.remove(this.lastViewportClassName);
            }

            this.element.nativeElement.classList.add(this.activeViewport().className);

            this.lastViewportClassName = this.activeViewport().className;
        }
    }

    private GetBestFitViewport(): Viewport {
        const clientWidth = document.documentElement.clientWidth;
        const clientHeight = document.documentElement.clientHeight;

        let bestFit = this.viewports
            .filter(viewport => clientWidth >= viewport.viewWidth && clientHeight >= viewport.viewHeight)
            .sort(
                // Sort by area, descending - pick the largest viewport that fits
                (first, second) => second.viewWidth * second.viewHeight - first.viewWidth * first.viewHeight
            )[0];

        if (bestFit === undefined) {
            bestFit = this.viewports.sort(
                // Sort by area, ascending - pick the smallest viewport that fits
                (first, second) => first.viewWidth * first.viewHeight - second.viewWidth * second.viewHeight
            )[0];
        }

        return bestFit;
    }
}
