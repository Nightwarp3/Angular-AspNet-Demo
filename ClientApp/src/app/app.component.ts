import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Theme, ThemeService } from './services/theme/theme.service';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule
    ],
    providers: [
        ThemeService
    ]
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
