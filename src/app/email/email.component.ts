import { Component, OnInit } from '@angular/core';
import { Login } from '../modelos/login';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  prueba= new Login('','');

  constructor() { }

  ngOnInit(): void {
  }

 imprimir(email:String, password:String){
   console.log('Email: '+email,'Password: '+password);

 }

}
