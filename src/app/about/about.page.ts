import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service';
import { ModalController, ToastController } from '@ionic/angular';
import { SecondPage } from './../modals/second/second.page';
import { Enum } from '../util/enum.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  alunos = new Array<any>();

  constructor(
    private service: ServiceService,
    private modalController: ModalController,
    public toastController: ToastController
  ) {
    this.getAll();
   }

  ngOnInit() {
  }

  async messageErro(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: Enum.ERRO_DANGER,
      position: Enum.POSITION_TOP
    });
    toast.present();
  }

  async messageSucess(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: Enum.SUCCESS,
      position: Enum.POSITION_TOP
    });
    toast.present();
  }

  getAll() {
    this.service.getAllUsers().subscribe(res => {
      res.forEach((u, key) => {
        // console.log('u => ' + u);
        // console.log('key => ' + key);

        this.alunos.push(u);
      });
    });
  }

  get(key: string) {

  }

  save(aluno: any) {
  }

  remove(key: string) {

  }

  async openModal() {
    const modal = await this.modalController.create({
      component: SecondPage
    });
    return await modal.present();
  }
}
