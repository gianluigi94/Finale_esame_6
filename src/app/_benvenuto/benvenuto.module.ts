import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
<<<<<<< HEAD
import { TranslateModule } from '@ngx-translate/core'; // 👈 aggiungi questo

=======
import { TranslateModule } from '@ngx-translate/core';
>>>>>>> 35cb057 (metà commenti)
import { BenvenutoRoutingModule } from './benvenuto-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { ComponentiComuniModule } from '../_componenti_comuni/componenti-comuni.module';
import { SaturnoModule } from '../_componenti_comuni/saturno/saturno.module';
@NgModule({
  declarations: [
    WelcomeComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    BenvenutoRoutingModule,
<<<<<<< HEAD
    ComponentiComuniModule,
    SaturnoModule,
=======
    ComponentiComuniModule, //utilizzo dei componenti comuni
    SaturnoModule, //utilizzo di saturno
>>>>>>> 35cb057 (metà commenti)
    ReactiveFormsModule,
    TranslateModule,
  ],
})
export class BenvenutoModule {}
