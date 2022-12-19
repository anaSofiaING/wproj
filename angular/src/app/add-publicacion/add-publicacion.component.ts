import { Component, OnInit } from '@angular/core';
import { Publicacion } from '../models/publicacion.model';
import { PublicacionService } from '../_services/publicacion.service';

@Component({
  selector: 'app-add-publicacion',
  templateUrl: './add-publicacion.component.html',
  styleUrls: ['./add-publicacion.component.css']
})
export class AddPublicacionComponent implements OnInit {

  
  publicacion: Publicacion = {
    title: '',
    description: '',
    published: false
  };
  submitted = false;

  constructor(private publicacionService: PublicacionService) { }

  ngOnInit(): void {
  }

  savePublicacion(): void {
    const data = {
      title: this.publicacion.title,
      description: this.publicacion.description
    };

    this.publicacionService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newPublicacion(): void {
    this.submitted = false;
    this.publicacion = {
      title: '',
      description: '',
      published: false
    };
  }

}