import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modalpopup',
  templateUrl: './modalpopup.component.html',
  styleUrls: ['./modalpopup.component.scss']
})
export class ModalpopupComponent implements OnInit {

  user: any = {
    name: '',
    email: '',
    username: '',
  };

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  closeModal(sendData: any, method:string | null) {
    if (method === 'add'){
      this.activeModal.close(sendData);
    }
    else{
      this.activeModal.close();
    }
  }

  addProduct(user:any) {
    this.closeModal(user, 'add')
  }


}
