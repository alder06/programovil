import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/servicio/firebase.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  email: string=""
  pass: String=""
  valor: number=0

  constructor(private firebase:FirebaseService, private Router:Router, private activate: ActivatedRoute) { 
    this.activate.queryParams .subscribe(params=> {
      this.email=params['email'];
      this.pass=params['password'];
      this.valor=params['valor'];/* no es necesario agregarlo aca, solo se agrega cuando quieres ver que los datos se envian*/
      console.log(this.email, this.pass);
        })

  }

  ngOnInit() {
  }

  async logout(){
    await this.firebase.logout();
    this.Router.navigateByUrl('login')
  }
}
