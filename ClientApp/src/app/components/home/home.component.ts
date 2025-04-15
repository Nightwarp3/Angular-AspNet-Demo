import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AuthorizationService } from 'src/app/services/authorization/authorization.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [
        MatButtonModule,
        MatCardModule,
        MatIconModule
    ],
    providers: [
        AuthorizationService
    ]
})
export class HomeComponent {
    public authorized: boolean = false;
    public samples: any[] = [
        { name: 'Surely Stronk', player: 'Mike', image: '../../../assets/Surely.png' },
        { name: 'Sabastian Gridlock', player: 'Hawk', image: 'https://visualstudio.microsoft.com/wp-content/uploads/2021/10/Product-Icon.svg' },
        { name: 'Winter Bloodrook', player: 'Hollie', image: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1MmB8?ver=6c43g' },
        { name: 'Jack Torver', player: 'Jon', image: 'https://blz-contentstack-images.akamaized.net/v3/assets/bltf408a0557f4e4998/blt6aadd13b6247fda4/659f578f21f660a27b478b1f/DIA_D4_bnet_S3_stat_bchbnet_enus_1600x500.png?imwidth=1568&imdensity=1' },
        { name: 'Thendrill the Green', player: 'Josh', image: 'https://blz-contentstack-images.akamaized.net/v3/assets/bltf408a0557f4e4998/blt6902356f8e29e47b/651dfede903f1f51bff8afcb/BC23_collections_gbl_stat_enus_1920x1080_1_TS02.png?imwidth=640&imdensity=1' },
        { name: 'Larna Whitemane', player: 'Laura', image: 'https://blz-contentstack-images.akamaized.net/v3/assets/bltf408a0557f4e4998/blt20603e5c3832b67a/659daa9337a55382af3f4d68/_04.png?imwidth=1080&imdensity=1' }
    ];

    constructor(
        private authorizationService: AuthorizationService
    ) { }

    public authorizeUser(): void {
        this.authorizationService.authorize()
            .subscribe({
                next: () => {
                    this.authorized = true;
                },
                error: (err) => {
                    this.authorized = false;
                }
            });
    }

    public logout(): void {
        this.authorized = false;
    }
}
