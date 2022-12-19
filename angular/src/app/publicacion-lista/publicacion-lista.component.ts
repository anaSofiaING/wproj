import { Component, OnInit } from '@angular/core';
import { Publicacion } from '../models/publicacion.model';
import { PublicacionService } from '../_services/publicacion.service';
import { User } from '../models/user.model';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-publicacion-lista',
  templateUrl: './publicacion-lista.component.html',
  styleUrls: ['./publicacion-lista.component.css']
})
export class PublicacionListaComponent implements OnInit {
  currentUser?: User;
  publicacion?: Publicacion[];
  currentPublicacion: Publicacion = {};
  currentIndex = -1;
  title = '';

  newPub: Publicacion={
    title:'',
    description:'',
    imagen:'',
    autor:'',
    published: true
  };
  submitted = false;

  constructor(private publicacionService: PublicacionService, private token :TokenStorageService ) { }

  ngOnInit(): void {
    this.retrievePublicacion();
    this.currentUser = this.token.getUser();
  }

  retrievePublicacion(): void {
    this.publicacionService.getAll()
      .subscribe({
        next: (data) => {
          this.publicacion = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrievePublicacion();
    this.currentPublicacion = {};
    this.currentIndex = -1;
  }

  setActivePublicacion(publicacion: Publicacion, index: number): void {
    this.currentPublicacion = publicacion;
    this.currentIndex = index;
  }

  removeAllPublicacion(): void {
    this.publicacionService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchTitle(): void {
    this.currentPublicacion = {};
    this.currentIndex = -1;

    this.publicacionService.findByTitle(this.title)
      .subscribe({
        next: (data) => {
          this.publicacion = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  saveTutorial(): void {
    const data = {
      title: this.newPub.title,
      description: this.newPub.description,
      imagen: this.newPub.imagen,
      autor: this.currentUser?.username,
      published: this.newPub.published
    };

    this.publicacionService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
        this.submitted = false;
        this.newPub = {
          title: '',
          description: '',
          imagen: '',
          autor:'',
          published: true
        };
        window.location.reload();  
  }
  
}