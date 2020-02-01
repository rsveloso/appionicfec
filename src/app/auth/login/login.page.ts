import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/model/Usuario';
import { ServiceService } from 'src/app/service';
import { Enum } from 'src/app/util/enum.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  msgErro = false;
  ok = false;
  msg: string;
  usuario: Usuario;
  usuarios = new Array<any>();

  constructor(
    private router: Router,
    public menu: MenuController,
    public toastController: ToastController,
    private service: ServiceService
  ) {
    this.msgErro = false;
    this.getUser();
  }

  ngOnInit() {
  }

  private async messageErro(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: Enum.ERRO_DANGER,
      position: Enum.POSITION_TOP
    });
    toast.present();
  }

  private async messageSucess(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: Enum.SUCCESS,
      position: Enum.POSITION_TOP
    });
    toast.present();
  }


  public login(form: any): void {
    if (!this.isValid(form)) {
      this.usuario = this.arrayFindUser(this.usuarios, form.value);
      if (this.usuario) {
        this.messageSucess(Enum.LOGIN_SUCESSO);
        this.router.navigateByUrl('home');
        this.msgErro = false;
        this.msg = '';
        form.reset();
      } else {
        this.msgErro = true;
        this.msg = Enum.EMAIL_OU_SENHA_INVALIDO;
        this.messageErro(Enum.EMAIL_OU_SENHA_INVALIDO);

        this.router.navigateByUrl('login');
        form.reset();
      }
      this.msgErro = false;
    } else {
      this.msgErro = true;
      this.msg = Enum.EMAIL_INVALIDO;
      this.messageErro(Enum.EMAIL_INVALIDO);
    }

    this.msgErro = false;
  }

  private isValid(form: any): any {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@uniara.edu.br/igm;
    const result = re.test(form.value.email);

    if (!result) {
      return {
        'email:validation:fail': true
      };
    }
    return null;
  }

  private ionViewDidEnter(): any {
    this.menu.enable(false);
  }

  private ionViewWillLeave(): any {
    this.menu.enable(true);
  }

  public getUser(): any {
    this.service.getAll().subscribe(data => {
      data.forEach((u, key) => {
        this.usuarios.push(u);
      });
    });
  }

  private arrayFindUser(users: any, user: any): any {
    const result = users.find(u => (u.email === user.email && u.password === user.password));
    return result;
  }

}
