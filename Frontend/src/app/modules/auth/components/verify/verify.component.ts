import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'tp-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})

export class VerifyComponent implements OnInit {
  isPressedVerifyButton: boolean = false
  profileForm = new FormGroup({
    code: new FormControl('')
  });

  constructor(private authService: AuthService) { }

  sendVerify() {
    if (!this.isPressedVerifyButton) {
      this.authService.verifyGet()
      this.isPressedVerifyButton = true

      let x = document.getElementById('code')

      if (x?.className == "verify__field") {
        x.className += " responsive";
      }
      /*else if (x?.className) {
        x.className = "verify__field";
      }*/
    }
    else {
      
    }
  }

  ngOnInit(): void {
  }

}
