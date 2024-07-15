import { Component, inject } from "@angular/core";
import { MatSlideToggle, MatSlideToggleChange } from "@angular/material/slide-toggle";

import { MatIcon } from "@angular/material/icon";
import { MatIconButton } from "@angular/material/button";
import { MatToolbar } from "@angular/material/toolbar";
import { ThemeService } from "../../services/theme.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  standalone: true,
  imports: [
    MatToolbar,
    MatIconButton,
    MatIcon,
    MatSlideToggle,
  ],
})
export class HeaderComponent {
  private themeService = inject(ThemeService) as ThemeService;

  changeTheme(isLightTheme: MatSlideToggleChange) {
    this.themeService.changeTheme(isLightTheme.checked);
  }
}
