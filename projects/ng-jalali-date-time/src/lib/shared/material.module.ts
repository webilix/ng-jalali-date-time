import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    exports: [MatInputModule, MatButtonModule, MatDividerModule]
})
export class MaterialModule {}
