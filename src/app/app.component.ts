import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ViewportGuideComponent } from "./viewport-guide/viewport-guide.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ViewportGuideComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
