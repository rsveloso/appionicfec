import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { Enum } from 'src/app/util/enum.service';
import { AuthService } from '../auth.service';
import { ServiceService } from 'src/app/service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  formulario: FormGroup;
  msgErro = false;
  msg: string;

  constructor(
    private authService: AuthService,
    private service: ServiceService,
    private router: Router,
    public menu: MenuController,
    public toastController: ToastController
  ) {
    this.formulario = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      confirm: new FormControl(null, Validators.required)
    });
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

  register(form) {

    if (this.validPassword(form)) {
      if (!this.isValid(form)) {
        console.log(form);
        form = { access_token: 'dGVzdEBnbWFpbC5jb21fMTIz', expires_in: 500, ...form.value };

        // this.authService.register(form).subscribe((res) => {
        //   console.log(res);
        //   this.messageSucess(Enum.REGISTRO_SUCESSO);
        //   this.router.navigateByUrl('login');
        // });

        this.service.save(form)
          .then((res) => {
            console.log(res);
            this.messageSucess(Enum.REGISTRO_SUCESSO);
            this.router.navigateByUrl('login');
          })
          .catch((e) => {
            this.msgErro = true;
            this.msg = Enum.ERRO_AO_REGISTRAR_USUARIO;
            this.messageErro(Enum.ERRO_AO_REGISTRAR_USUARIO);
          });

      } else {
        this.msgErro = true;
        this.msg = Enum.EMAIL_INVALIDO;
        this.messageErro(Enum.EMAIL_INVALIDO);
      }
    } else {
      this.msgErro = true;
      this.msg = Enum.SENHA_DIFERENTE;
      this.messageErro(Enum.SENHA_DIFERENTE);
    }

    this.msgErro = false;
  }

  validPassword(form: any): boolean {
    const senha = form.value.password;
    const senha2 = form.value.confirm;

    if (senha !== senha2) {
      return false;
    }
    return true;
  }

  isValid(form: any): any {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@uniara.edu.br/igm;
    const result = re.test(form.value.email);

    if (!result) {
      return {
        'email:validation:fail': true
      };
    }
    return null;
  }

  ionViewDidEnter() {
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    this.menu.enable(true);
  }
}
