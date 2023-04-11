import { Component } from '@angular/core';
import { Theme, ThemeService } from './services/theme/theme.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public title = 'angular-aspnet-demo';
    public theme = Theme;
    public currentTheme: string = Theme.dark;

    constructor(
        private themeService: ThemeService
    ) {
        this.themeService.currentTheme.subscribe((x: string) => this.currentTheme = x);
    }

    public onThemeChange(newTheme: Theme): void {
        this.themeService.setTheme(newTheme);
    }
}
