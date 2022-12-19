import { Component, Input, OnInit } from '@angular/core';
import { Publicacion } from '../models/publicacion.model';
import { PublicacionService } from '../_services/publicacion.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-publicacion-detalles',
  templateUrl: './publicacion-detalles.component.html',
  styleUrls: ['./publicacion-detalles.component.css']
})
export class PublicacionDetallesComponent implements OnInit {

  
  @Input() viewMode = false;

  @Input() currentPublicacion: Publicacion = {
    title: '',
    description: '',
    published: false
  };
  message = '';
  constructor(
    private publicacionService: PublicacionService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getPublicacion(this.route.snapshot.params["id"]);
    }
  }

  getPublicacion(id: string): void {
    this.publicacionService.get(id)
      .subscribe({
        next: (data) => {
          this.currentPublicacion = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updatePublished(status: boolean): void {
    const data = {
      title: this.currentPublicacion.title,
      description: this.currentPublicacion.description,
      published: status
    };

    this.message = '';

    this.publicacionService.update(this.currentPublicacion.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.currentPublicacion.published = status;
          this.message = res.message ? res.message : 'The status was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  updatePublicacion(): void {
    this.message = '';

    this.publicacionService.update(this.currentPublicacion.id, this.currentPublicacion)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This tutorial was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deletePublicacion(): void {
    this.publicacionService.delete(this.currentPublicacion.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/publicacion']);
        },
        error: (e) => console.error(e)
      });
  }

}