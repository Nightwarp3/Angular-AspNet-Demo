import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ThemeService {
    public currentTheme: BehaviorSubject<string> = new BehaviorSubject<string>(Theme.dark);

    private readonly storageKey: string = 'angular-demo-app-theme';

    private get theme(): Theme {
        const savedTheme = localStorage.getItem(this.storageKey);
        if (savedTheme) {
            return savedTheme as Theme;
        } else {
            return Theme.auto;
        }
    }
    private set theme(theme: Theme) {
        localStorage.setItem(this.storageKey, theme);
    }

    constructor() {
        this.applyTheme(this.theme);
    }

    public setTheme(theme: Theme) {
        this.theme = theme;
        this.applyTheme(theme);
    }

    private applyTheme(theme: Theme) {
        this.currentTheme.next(theme);

        let newTheme = theme;
        if (theme === Theme.auto) {
            newTheme = this.checkOsTheme();
        }

        document.body.classList.remove(Theme.dark);
        document.body.classList.remove(Theme.light);
        document.body.classList.add(newTheme);
    }

    private checkOsTheme(): Theme {
        const darkModeOn = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

        return darkModeOn ? Theme.dark : Theme.light;
    }
}

export enum Theme {
    auto = 'os-theme',
    dark = 'dark-theme',
    light = 'light-theme'
}
