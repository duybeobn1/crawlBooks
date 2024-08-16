import { Component, Input, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AppwriteService } from '../appwrite.service';
import { TranslateService } from '@ngx-translate/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  @Input() readListCount: number = 0;
  @Input() wishListCount: number = 0;
  user: any;
  isDarkMode: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private appwriteService: AppwriteService, 
    private translate: TranslateService, 
    library: FaIconLibrary
  ) {
    library.addIcons(faGoogle);
    translate.addLangs(['en', 'fr', 'vi']);
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.appwriteService.getCurrentUser().then(user => {
        this.user = user;
      }).catch(() => {
        this.user = null;
      });

      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        this.isDarkMode = savedTheme === 'dark';
        this.updateTheme();
      }
    }
  }

  login() {
    if (isPlatformBrowser(this.platformId)) {
      this.appwriteService.loginWithGoogle();
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      this.appwriteService.logout().then(() => {
        this.user = null;
      });
    }
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  toggleTheme() {
    if (isPlatformBrowser(this.platformId)) {
        this.isDarkMode = !this.isDarkMode;
        localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
        this.updateTheme();
    }
  }

  updateTheme() {
    const rootElement = document.documentElement;
    if (this.isDarkMode) {
        rootElement.classList.add('dark-mode');
        rootElement.classList.remove('light-mode');
    } else {
        rootElement.classList.add('light-mode');
        rootElement.classList.remove('dark-mode');
    }
  }

  getFirstName(fullName: string): string {
    return fullName.split(' ')[0];
  }
}
