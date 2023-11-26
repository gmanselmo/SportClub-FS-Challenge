import { Component, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { DataTransfer } from '../../services/dataTransfer.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  constructor(private _apiService: DashboardService,
    private _dataTransfer: DataTransfer) {}

  ngOnInit() {
    this.listAll()
  }

  fromDate: string = '';
  toDate: string = '';
  searched: any = '';
  searchCons: string[] = [];
  isChecked: boolean = false;

  search(event: any): void {
    this.searched = event.target.value.toLowerCase();

    console.log(this.searched)

    const isNumeric = (cadena: string): boolean => /^[0-9]+$/.test(cadena);

    if (isNumeric(this.searched)) {

      this._apiService.getID(this.searched).subscribe(
      (response) => {

        console.log(response)
        

        if (this.searched == '') {

          this.listAll()

        } else {

          const customer: any[] = response.customers
          .map((item: any) => ({
            dni: item.dni,
            name: item.name,
            lastname: item.lastname,
            birth_date: item.birth_date,
            isGBA: item.isGBA,
          }));

          this.searchCons = [...customer];

          this._dataTransfer.enviarDatos(this.searchCons);

        }

      },
      (error) => {
        console.error("Error cargando datos:", error);
      }
    );
    } else {

      this._apiService.search(this.searched, this.isChecked, this.fromDate, this.toDate).subscribe(
        (response) => {
  
          console.log(response)
  
          if (this.searched == '') {
  
            this.listAll()
  
          } else {
  
            const customer: any[] = response.customers
            .map((item: any) => ({
              dni: item.dni,
              name: item.name,
              lastname: item.lastname,
              birth_date: item.birth_date,
              isGBA: item.isGBA,
            }));
  
            this.searchCons = [...customer];
  
            this._dataTransfer.enviarDatos(this.searchCons);
  
          }

        },
        (error) => {
          console.error("Error cargando datos:", error);
        }
      );

    }

  }

  getSelectedOptions(): boolean {

    return this.isChecked

  }


  listAll(): void {
    this._apiService.bringAll().subscribe(
      (response: any) => {
        console.log(response);
  
        const customer: any[] = response.customers
          .map((item: any) => ({
            dni: item.dni,
            name: item.name,
            lastname: item.lastname,
            birth_date: item.birth_date,
            isGBA: item.isGBA,
          }));

          this.searchCons = [...customer];

          this._dataTransfer.enviarDatos(this.searchCons);          

      },
      (error: any) => {
        console.error("Error cargando datos:", error);
      }
    );
  }

  lista() {
    console.log(this.searchCons)
  }

  check(option: string) {

    if (option === "check") {
      this.isChecked = !this.isChecked;
    } else if (option === "1") {
      this.isChecked = false;
    }
  
    
    this._apiService.search(this.searched, this.isChecked, this.fromDate, this.toDate).subscribe(
      (response) => {

        console.log(response)

        const customer: any[] = response.customers
        .map((item: any) => ({
          dni: item.dni,
          name: item.name,
          lastname: item.lastname,
          birth_date: item.birth_date,
          isGBA: item.isGBA,
        }));

        this.searchCons = [...customer];

        this._dataTransfer.enviarDatos(this.searchCons);

      },
      (error) => {
        console.error("Error cargando datos:", error);
      }
    );

  }

}
