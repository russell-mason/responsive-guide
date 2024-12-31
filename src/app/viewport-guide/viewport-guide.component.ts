import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackViewportDirective } from '../track-viewport/track-viewport.directive';

@Component({
    selector: 'viewport-guide',
    imports: [CommonModule, TrackViewportDirective],
    templateUrl: './viewport-guide.component.html',
    styleUrl: './viewport-guide.component.scss'
})
export class ViewportGuideComponent {
}
