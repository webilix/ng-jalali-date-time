import { NgModule } from '@angular/core';

import { MatInputModule, MatButtonModule, MatDividerModule } from '@angular/material';

@NgModule({
    exports: [MatInputModule, MatButtonModule, MatDividerModule]
})
export class MaterialModule {}
