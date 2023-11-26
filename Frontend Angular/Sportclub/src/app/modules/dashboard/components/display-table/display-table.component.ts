import { Component, OnInit, Input } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { DataTransfer } from '../../services/dataTransfer.service';

@Component({
  selector: 'app-display-table',
  templateUrl: './display-table.component.html',
  styleUrls: ['./display-table.component.scss']
})
export class DisplayTableComponent {

  constructor(private _apiService: DashboardService,
    private _dataTransfer: DataTransfer) { }

  ngOnInit() {
    this._dataTransfer.datosEnviados.subscribe((datos) => {

      this.listObjects = [...datos];

      this.listObjects.sort((a, b) => {

        const dniA = a.dni;
        const dniB = b.dni;

        if (dniA < dniB) {
          return -1;
        } else if (dniA > dniB) {
          return 1;
        } else {
          return 0;
        }
      });

      if (this.listObjects.length > 0) {

        this.show = true;

      }

    });

  }

  listObjects: any[] = []

  show: boolean = false;

  deleteCustomerById(id: number): void {
    const shouldDelete = window.confirm('¿Estás seguro de que quieres eliminar este cliente?');

    if (shouldDelete) {

      this._apiService.deleteCustomerById(id).subscribe(

        (data) => {

          console.log('Success:', data.message);

          this.listObjects = this.listObjects.filter(obj => obj.dni !== id);

          if (this.listObjects.length == 0) {

            this.show = false;

          }

        },

        (error) => {

          console.error('Error:', error);

        }

      );

    } else {

      console.log('Eliminación cancelada por el usuario.');

    }

  }

  showModal: boolean = false;
  title: string = "";
  formData = {
    dni: '',
    name: '',
    lastname: '',
    birth_date: '',
    isGBA: false
  };

  update = {
    name: '',
    lastname: '',
    birth_date: '',
    isGBA: false
  };

  dni: boolean = true;
  create !: boolean;

  openModal(option: string, objeto: any): any {
    this.showModal = true;

    console.log(objeto)

    if (option == "new") {
      this.title = "CARGAR CLIENTE"
      this.create = true;
    } else {
      this.title = "MODIFICAR CLIENTE"
      this.dni = false;
      this.create = false;
      this.formData = {
        dni: objeto.dni,
        name: objeto.name,
        lastname: objeto.lastname,
        birth_date: objeto.birth_date,
        isGBA: objeto.isGBA,
      };

    }
  }

  closeModal() {
    this.showModal = false;
    this.formData.dni = ""
    this.formData.name = ""
    this.formData.lastname = ""
    this.formData.birth_date = ""
    this.formData.isGBA = false
  }


  submitForm(option: string) {

    this.update = {
      name: this.formData.name,
      lastname: this.formData.lastname,
      birth_date: this.formData.birth_date,
      isGBA: this.formData.isGBA,
    }

    if (option == "new") {

      this._apiService.createCustomer(this.formData).subscribe(

        (response) => {

          console.log('Success:', response.message);

          alert('Cliente creado exitosamente');

          this.closeModal();

          window.location.reload();

        },
        (error) => {

          console.error('Error:', error);

          alert('Error al crear el cliente');
        }
      );

    } else {

      if (this.update.name !== "" && this.update.lastname !== "") {

        console.log(this.update)

        this._apiService.updateCustomer(parseInt(this.formData.dni), this.update).subscribe(

          (response) => {

            console.log('Success:', response.message);

            alert('Cliente actualizado exitosamente');

            this.closeModal();

            window.location.reload();

          },

          (error) => {

            console.error('Error:', error);

            alert('Error al actualizar el cliente');

          }
        );

      } else {

        this.closeModal();

        alert('Error al actualizar el cliente');

      }


    }


  }

}
