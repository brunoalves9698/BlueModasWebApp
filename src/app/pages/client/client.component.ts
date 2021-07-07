import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { City } from 'src/app/models/city.model';
import { Client } from 'src/app/models/client';
import { State } from 'src/app/models/state.model';
import { CepService } from 'src/app/services/cep.service';
import { IbgeService } from 'src/app/services/ibge.service';
import { EMAIL_PATTERN } from 'src/app/shared/constants/patterns.constant';
import { CartStorage } from 'src/app/shared/storage/cart-storage';
import { ClientStorage } from 'src/app/shared/storage/client-storage';
import { SortListUtil } from 'src/app/shared/utils/sort-list/sort-list.util';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClienteComponent implements OnInit {

  public form: FormGroup;
  public validationMessages: any = {};
  public client: Client;
  public states: State[] = [];
  public cities: City[] = [];
  public isBusy = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private cartStorage: CartStorage,
    private clientStorage: ClientStorage,
    private cepService: CepService,
    private ibgeService: IbgeService
  ) {
    this.client = this.clientStorage.getAll().length ? this.clientStorage.getAll()[0] : new Client();
  }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: [this.client.name, Validators.compose([
        Validators.required,
        Validators.maxLength(100)
      ])],
      email: [this.client.email, Validators.compose([
        Validators.required,
        Validators.email,
        Validators.pattern(EMAIL_PATTERN)
      ])],
      phone: [this.client.phone, Validators.compose([
        Validators.required,
        Validators.maxLength(15)
      ])],
      zipCode: [this.client.zipCode, Validators.compose([
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9)
      ])],
      address: [this.client.address, Validators.compose([
        Validators.required,
      ])],
      addressNumber: [this.client.addressNumber, Validators.compose([
        Validators.required,
      ])],
      neighborhood: [this.client.neighborhood, Validators.compose([
        Validators.required,
      ])],
      stateId: [this.client.stateId?.toString(), Validators.compose([
        Validators.required,
      ])],
      cityId: [this.client.cityId?.toString(), Validators.compose([
        Validators.required,
      ])]
    });

    this.getStates();
  }

  private getStates() {
    this.ibgeService.getStates().then((result: State[]) => {
      this.states = <State[]>SortListUtil.sort(result, 'nome');
      this.getCities();
    }, (error: any) => {
      alert('Não foi possível carregar os Estados.');
    });
  }

  private getCities(): Promise<City[]> {
    return new Promise((resolve, reject) => {
      let stateId = this.form.get('stateId').value;
      this.ibgeService.getCities(stateId).then((result: City[]) => {
        this.cities = <City[]>SortListUtil.sort(result, 'nome');
        return resolve(this.cities);
      }, (error: any) => {
        alert('Não foi possível carregar as Cidades.');
        reject();
      });
    });
  }

  public changeState() {
    this.form.controls.city_id.setValue('');
    let stateId = this.form.get('stateId').value;

    this.ibgeService.getCities(parseInt(stateId)).then((result: City[]) => {
      this.cities = <City[]>SortListUtil.sort(result, 'nome');
    }, (error: any) => {
      alert('Não foi possível carregar as Cidades.');
    });
  }

  public getAddress() {
    const cep = this.form.controls.zipCode.value?.replace(/\D/g, '');
    if (!/^[0-9]{8}$/.test(cep))
      return;

    this.cepService.get(cep).then((result: any) => {
      const state: State = this.getStateById(result.ibge.substring(0, 2));

      this.form.controls.address.setValue(result.logradouro);
      this.form.controls.neighborhood.setValue(result.bairro);
      this.form.controls.stateId.setValue(state.id.toString());

      this.getCityById(result.ibge).then((city: City) => {
        this.form.controls.cityId.setValue(city.id.toString());
      });
    });
  }

  private getStateById(id: string): State {
    let state: State = this.states.find((state: State) => {
      return state.id == id;
    });

    return state;
  }

  private async getCityById(id: string): Promise<City> {
    return this.getCities().then((cities: City[]) => {
      return new Promise((resolve, reject) => {
        this.cities.find((city: City) => {
          if (city.id == id) {
            resolve(city);
            return city.id == id;
          }
        });
      });
    });
  }

  public submitForm() {
    if (this.form.invalid) {
      alert('Verifique o preenchimento dos campos e tente novamente');
      return;
    }

    this.save();
  }

  private save() {
    this.isBusy = true;

    let id = this.client.id ?? null;
    this.client = Object.assign(new Client(), this.form.value);
    this.client.id = id;

    const hasProductsAllready = this.cartStorage.getAll().length;

    this.clientStorage.deleteAll();
    this.clientStorage.insertItem(this.client);

    alert('Dados salvos com sucesso');

    if (hasProductsAllready)
      this.router.navigateByUrl('/cart');

    this.isBusy = false;
  }

}
