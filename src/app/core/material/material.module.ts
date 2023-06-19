import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export const proxiedModules = [
  CommonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
];

@NgModule({
  declarations: [],
  imports: [...proxiedModules],
  exports: [...proxiedModules],
})
export class MaterialModule {}
