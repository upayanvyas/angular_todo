import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/http.service';
import { ModalpopupComponent } from 'src/app/shared/modalpopup/modalpopup.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  closeModal: any;
  userList = []
  searchInput: string = ''

  constructor(
    public modalService: NgbModal,
    public http: HttpService, private notifyService: ToastrService
  ) { }


  ngOnInit(): void {
    this.getdata()
  }

  getdata() {
    this.http.get('users').subscribe(res => {
      this.userList = res
    })
  }

  postdata(user: any) {
    this.http.post('users', user).subscribe(res => {
      this.getdata()
      this.notify('Product added successfully!', 'success')
    }, err => {
      console.log('error==> ', err)
    })

  }

  search(searchText: any) {
    if (searchText.trim().length > 0) {
      let filterList: any = []
      searchText = searchText.toLocaleLowerCase()
      this.http.get('users').subscribe(res => {
        res.filter((user: any) => {
          let u = user['name'].toLocaleLowerCase()
          if (u.includes(searchText)) {
            filterList.push(user)
          }
        })
        // console.log('filterList: ', filterList)
      })
      this.userList = filterList
    }
    else {
      this.getdata()
    }
  }

  openModal() {
    const modalRef = this.modalService.open(ModalpopupComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
      });

    modalRef.result.then((result: any) => {
      if (result) {
        this.postdata(result)
      }
    }, (reason: any) => {
      console.log('reason for modal close: ', reason)
    });
  }

  notify(message: string | undefined, title: string | undefined) {
    this.notifyService.success(message, title)
  }


}
