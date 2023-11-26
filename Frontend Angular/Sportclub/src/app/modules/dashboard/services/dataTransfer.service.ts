import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataTransfer {
  private datosSource = new BehaviorSubject<string[]>([]);
  datosEnviados = this.datosSource.asObservable();

  enviarDatos(datos: string[]) {
    this.datosSource.next(datos);
  }
}
