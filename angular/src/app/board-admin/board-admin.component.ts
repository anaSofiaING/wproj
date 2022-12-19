import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { RelacionService } from '../_services/relacion.service';
import { User } from '../models/user.model';
import { Relacion } from '../models/relacion.model';
import { TokenStorageService } from '../_services/token-storage.service';
import { Calificacion } from '../models/calificacion.model';
import { CalificacionService } from '../_services/calificacion.service';
import { PublicacionService } from '../_services/publicacion.service';

import { Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css'],
})
export class BoardAdminComponent implements OnInit {
  //variables para mostrar usuarios
  usuarios?: User[];
  usuariosF?: User[];
  usuariosM?: User[];
  //usuario seleccionado
  currentUsuario: User = {};
  currentIndex = -1;
  currentFollow = 0;
  currentFollowers = 0;
  currentPosts = 0;
  currentRate :number = 0;
  //usuario activo
  currentUser: any;
  filter: number = 1;
  //variable star rate
  star?:number;
  //variables para puntuacion
  calif: Calificacion = {
    title: '',
    comentario: ''
  };
  map:any;
  

  constructor(
    private token: TokenStorageService,
    private userService: UserService,
    private relacionService: RelacionService,
    private calificacionService : CalificacionService, 
    private publicacionService : PublicacionService
  ) {}

  ngOnInit(): void {
    this.retrieveUsuario();
    this.currentUser = this.token.getUser();
  }

  private getCurrentPosition(): any {
    return new Observable((observer: Subscriber<any>) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: any) => {
          observer.next({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          observer.complete();
        });

      } else {
        observer.error();
      }
    });
  }



  retrieveUsuario(): void {
    this.userService.getAdminBoard().subscribe({
      next: (data) => {
        this.usuarios = JSON.parse(data);
        //console.log(JSON.parse(data));
      },
      error: (e) => console.error(e),
    });
  }

  refreshList(): void {
    this.retrieveUsuario();
    this.currentUsuario = {};
    this.currentIndex = -1;
  }

  

  saveRelacion(userPrinc: any, userSec: any): void {
    let follow: Relacion[];
    let band=false;
    const data = {
      userPrinc: userPrinc,
      userSec: userSec,
    };
    
    
    this.relacionService.getAll().subscribe({
      next: (res) => {
        follow = res;
                 for(let j = 0; j < follow.length; j++){
                     if(follow[j].userSec==userSec){
                        band=true;
                     }
                 }
              
      },
      error: (e) => console.error(e),
    });

    if(!band){
      this.relacionService.create(data).subscribe({
        next: (res) => {
          console.log(res );
        },
        error: (e) => console.error(e),
      });
    }

  }
  retrieveFollows() {
    this.currentIndex = -1;
    this.retrieveUsuario();
    let users:  User[] = [];
    let follow: Relacion[];
    this.relacionService.getAll().subscribe({
      next: (res) => {
        follow = res;
        if (!this.usuarios) {
        } else {
            for (let i = 0; i < follow.length; i++){
              if(follow[i].userPrinc== this.currentUser.username){
                 for(let j = 0; j < this.usuarios.length; j++){
                     if(this.usuarios[j].username==follow[i].userSec){
                      users.push(this.usuarios[j]);
                     }
                 }
              }
            }
            this.usuariosF=users;
        }
      },
      error: (e) => console.error(e),
    });
  }
  retrieveFollowers() {
    this.currentIndex = -1;
    let users:  User[] = [];
    let follow: Relacion[];
    this.relacionService.getAll().subscribe({
      next: (res) => {
        follow = res;
        if (!this.usuarios) {
        } else {
            for (let i = 0; i < follow.length; i++){
              if(follow[i].userSec == this.currentUser.username){
                 for(let j = 0; j < this.usuarios.length; j++){
                     if(this.usuarios[j].username==follow[i].userPrinc){
                      users.push(this.usuarios[j]);
                     }
                 }
              }
            }
            this.usuariosM=users;
        }
      },
      error: (e) => console.error(e),
    });
  }
  filtro(val: number) {
    this.filter=val;
    switch (val) {
      //mostrar usuarios
      case 1:
        this.retrieveUsuario();
        break;
      //mostrar follows
      case 2:
        this.retrieveFollows();
        break;
        //mostrar followers
      case 3:
        this.retrieveFollowers();
        break;
    }
    console.log(this.usuarios);
  }
  suma(val :number){
    this.star=val;
  }

  calificar(userPrinc: any): void {
    const data = {
      title: this.calif.title,
      comentario: this.calif.comentario,
      username: userPrinc,
      puntuacion: this.star
    };

    this.calificacionService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      });
  }



  setActivePerfil(usuario: User, index: number): void {
    this.currentUsuario = usuario;
    this.currentIndex = index;
    this.currentFollow = 0;
  this.currentFollowers = 0;
  this.currentPosts = 0;
  this.currentRate = 0;
    //follows
    let follow: Relacion[];
    this.relacionService.getAll().subscribe({
      next: (res) => {
        follow = res;
        if (!follow) {
        } else {
            for (let i = 0; i < follow.length; i++){
              if(follow[i].userPrinc== this.currentUsuario.username){
                this.currentFollow++;
              }
            }
        }
      },
      error: (e) => console.error(e),
    });
    //followers
    this.relacionService.getAll().subscribe({
      next: (res) => {
        follow = res;
        if (!follow) {
        } else {
            for (let i = 0; i < follow.length; i++){
              if(follow[i].userSec == this.currentUsuario.username){
                this.currentFollowers++;
              }
            }
        }
      },
      error: (e) => console.error(e),
    }); 
    //suma de posts

    this.publicacionService.getAll().subscribe({
      next: (res) => {
        let posts=res;
        if(posts){
          for (var val of posts) {
            if(val.autor== this.currentUsuario.username ){
              this.currentPosts++;
            }
          }
        }
        
      },
      error: (e) => console.error(e)
    }); 

    //rating
    this.calificacionService.getAll().subscribe({
      next: (res) => {
        let posts = res;
        let aux2:any=0;
        let aux3:number=0;
        if (!posts) {
        } else {
            for (let i = 0; i < posts.length; i++){
              if(posts[i].username == this.currentUsuario.username){
                 aux2+=posts[i].puntuacion;
                aux3++; 
              }
            }
            this.currentRate=aux2/aux3;
        }
      },
      error: (e) => console.error(e),
    });
    
  }
}
