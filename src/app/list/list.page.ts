import { ServiceService } from './../service';
import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Enum } from '../util/enum.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  public items = new Array<any>();

  constructor(
    private service: ServiceService,
    private modalController: ModalController,
    public toastController: ToastController
  ) {
    this.getAllProjects();
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

  logForm(form) {
    this.service.saveProject(form.value)
      .then((res) => {
        this.messageSucess(Enum.PROJETO_SUCESSO);
        this.closeModal();
      })
      .catch((e) => {
        this.messageErro(Enum.ERRO_AO_REGISTRAR_PROJETO);
      });
  }

  getAllProjects() {
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

}
