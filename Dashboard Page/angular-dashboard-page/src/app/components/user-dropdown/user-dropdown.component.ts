import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Popper from "popper.js";

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html'
})
export class UserDropdownComponent implements OnInit {
  dropdownPopoverShow = false;
  @ViewChild('btnDropdownRef',{ static: false }) btnDropdownRef:ElementRef;
  popper = document.createElement("div");
  constructor() { }

  ngOnInit() {
    this.popper.innerHTML = `
`
  }
  toggleDropdown(event){
    event.preventDefault();
    if(this.dropdownPopoverShow){
      this.dropdownPopoverShow = false;
      this.destroyPopper();
    } else {
      this.dropdownPopoverShow = true;
      this.createPoppper();
    }
  }
  destroyPopper(){
    this.popper.parentNode.removeChild(this.popper);
  }
  createPoppper(){
    new Popper(this.btnDropdownRef.nativeElement, this.popper, {
      placement: "bottom-start"
    });
    this.btnDropdownRef.nativeElement.parentNode.insertBefore(this.popper, this.btnDropdownRef.nativeElement.nextSibling);

  }

}
