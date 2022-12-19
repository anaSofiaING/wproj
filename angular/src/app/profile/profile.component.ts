import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { RelacionService } from '../_services/relacion.service';
import { Relacion } from '../models/relacion.model';
import { User } from '../models/user.model';
import { AfterViewInit} from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import * as L from 'leaflet';

import { environment } from '../../environments/environment';
import { Calificacion } from '../models/calificacion.model';
import { CalificacionService } from '../_services/calificacion.service';
import { PublicacionService } from '../_services/publicacion.service';
import { Publicacion } from '../models/publicacion.model';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
//export class ProfileComponent implements OnInit {
  export class ProfileComponent implements AfterViewInit{  

  currentUser?: User;
  usuarios?: Relacion[];
  count : number=0;
  count2 : number=0;
  count3 : number=0;
  count4 : number=0;
  map:any;

  currentIndex = -1;
  resenas?: Calificacion[];
  puntos:number=0;
  Misresenas?: Calificacion[];
  posts?: Publicacion[];

  //para editar
  current: User = {
    foto: '',
    facebook: '',
    instagram: '',
    twitter: ''
  };

  constructor(private token: TokenStorageService,private publicacionService:PublicacionService,private puntuacionService:CalificacionService, private relacionService : RelacionService , private calificacionService: CalificacionService, private usuarioService: UserService) { }


  public ngAfterViewInit(): void {
    let aux2:  Calificacion[] = [];
    this.currentUser = this.token.getUser();
    this.relacionService.getAll().subscribe({
      next: (res) => {
        this.usuarios=res;
        for (var val of this.usuarios) {
          if(val.userPrinc == this.currentUser?.username ){
            this.count++;
          }else if(val.userSec == this.currentUser?.username){
            this.count2++;  
          }
        }
      },
      error: (e) => console.error(e)
    }); 

    this.calificacionService.getAll().subscribe({
      next: (res) => {
        this.resenas=res;
        if(this.resenas){
          for (var val of this.resenas) {
            if(val.username == this.currentUser?.username ){
              aux2.push(val);
            }
          }
        }
        
      },
      error: (e) => console.error(e)
    }); 
    this.Misresenas=aux2; 

    //suma de posts
    this.publicacionService.getAll().subscribe({
      next: (res) => {
        this.posts=res;
        if(this.posts){
          for (var val of this.posts) {
            if(val.autor== this.currentUser?.username ){
              this.count3++;
            }
          }
        }
        
      },
      error: (e) => console.error(e)
    }); 

    //calificaciones
    //rating
    this.calificacionService.getAll().subscribe({
      next: (res) => {
        let posts = res;
        let aux2:any=0;
        let aux3:number=0;
        if (!posts) {
        } else {
            for (let i = 0; i < posts.length; i++){
              if(posts[i].username == this.currentUser?.username){
                 aux2+=posts[i].puntuacion;
                aux3++; 
              }
            }
            this.count4=aux2/aux3;
        }
      },
      error: (e) => console.error(e),
    });

    this.loadMap();
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

  private loadMap(): void {
    this.map = L.map('map').setView([0, 0], 1);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: environment.mapbox.accessToken,
    }).addTo(this.map);

    this.getCurrentPosition()
    .subscribe((position: any) => {
      
      if(this.currentUser?.latitud ) {
      this.map.flyTo([this.currentUser?.latitud, this.currentUser?.longitud], 13);
      const icon = L.icon({
        iconUrl: 'assets/images/marker-icon.png',
        shadowUrl: 'assets/images/marker-shadow.png',
        popupAnchor: [13, 0],
      });
         
      const marker = L.marker([position.latitude, position.longitude], { icon }).bindPopup('Ubicación');
      marker.addTo(this.map);
      }
    });
  }
   
   
   actualizar(){
    const data = {
      foto: this.current.foto
    };

    this.usuarioService.update(this.currentUser?.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      });
   }
}
