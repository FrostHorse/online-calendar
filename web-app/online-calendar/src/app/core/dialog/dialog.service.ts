import { ComponentType, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector } from '@angular/core';
import { DialogRef } from 'src/app/models/dialog/dialog-ref';
import { DialogData } from '../../models/dialog/dialog-data';
import { DIALOG_DATA } from '../../models/dialog/dialog-tokens';

@Injectable({ providedIn: 'root' })
export class DialogService {
  constructor(private overlay: Overlay, private injector: Injector) {}

  open<T>(component: ComponentType<T>, data?: DialogData): DialogRef {
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'overlay-backdrop',
      panelClass: 'overlay-panel',
    });

    const dialogRef = new DialogRef(overlayRef);

    overlayRef.backdropClick().subscribe(() => dialogRef.close());

    const injector = Injector.create({
      parent: this.injector,
      providers: [
        { provide: DialogRef, useValue: dialogRef },
        { provide: DIALOG_DATA, useValue: data },
      ],
    });

    const portal = new ComponentPortal(component, null, injector);
    overlayRef.attach(portal);

    return dialogRef;
  }
}
