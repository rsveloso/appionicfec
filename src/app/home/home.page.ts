import { Component } from '@angular/core';
// import { Facebook } from '@ionic-native/facebook';
import { Usuario } from '../model/Usuario';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage {
  usuario = null;
  // public facebook;

  constructor(
    private push: Push
  ) {
    // this.facebook = Facebook;
    this.usuario = 'Bem vindo!';

    this.push.hasPermission()
      .then((res: any) => {

        if (res.isEnabled) {
          alert('Tem permissão');

          const options: PushOptions = {
            android: {},
            ios: {
              alert: 'true',
              badge: true,
              sound: 'false'
            },
            windows: {},
            browser: {
              pushServiceURL: 'http://push.api.phonegap.com/v1/push'
            }
          };

          const pushObject: PushObject = this.push.init(options);

          pushObject.on('notification').subscribe((notification: any) => {
            alert(notification.message);
          });

          pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

          pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));


        } else {
          alert('não tem permissão');
        }

      });

  }

//   loginFacebook() {
//     let permissions = new Array<string>();
//     permissions = ["public_profile", "email"];

//     this.facebook.login(permissions).then((response) => {
//      let params = new Array<string>();

//      this.facebook.api("/me?fields=name,email", params)
//      .then(res => {

//          //estou usando o model para criar os usuarios
//          let usuario = new Usuario();
//          usuario.nome = res.name;
//          usuario.email = res.email;
//          usuario.senha = res.id;
//          usuario.login = res.email;

//          this.logar(usuario);
//      }, (error) => {
//        alert(error);
//        console.log('ERRO LOGIN: ',error);
//      })
//    }, (error) => {
//      alert(error);
//    });
//  }

 logar(usuario: Usuario) {
   // this.salvarService.salvarFacebook(usuario)
   // .then(() => {
       console.log(`Usuario obtido via facebook com sucesso! ${usuario.nome} ${usuario.email}`);
   // })
 }
}

