import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { IconModule } from 'src/app/shared/icon/icon.module';
import { NavBarComponent } from './nav-bar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatMenuModule,
    IconModule,
    MatIconModule,
  ],
  declarations: [NavBarComponent],
  exports: [NavBarComponent],
})
export class NavBarModule {}
