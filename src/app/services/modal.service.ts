import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../components/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(public dialog: MatDialog) { }

  displayModal(tab: string, messages: any): any{
    const dialogRef = this.dialog.open(ModalComponent, {
        width: '500px',
        id: 'common-modal',
        data: { messages: messages }
      });
      return dialogRef;
  }
}
