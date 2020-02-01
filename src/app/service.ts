import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ServiceService {

    private loginPATH = 'login/';
    private usersPATH = 'usuarios/';
    private projectPATH = 'projetos/';
    private mapPATH = 'maps/';

    // json-server --watch db.json
    url = 'http://localhost:3000/';
    alunos = 'usuarios';
    projetos = 'projetos';
    constructor(
        private httpClient: HttpClient,
        private db: AngularFireDatabase
    ) { }

    // public list() {
    //     return this.httpClient.get(`${this.url}${this.alunos}`);
    // }

    // public findByFilter(filter: any) {
    //     return this.httpClient.get(`${this.url}${this.projetos}?title_like=${filter}`);
    // }

    // public find() {
    //     return this.httpClient.get(`${this.url}${this.projetos}`);
    // }

    // public saveAlunos(project: any) {
    //     return this.httpClient.post(`${this.url}${this.alunos}`, project);
    // }

    // public saveProject(project: any) {
    //     return this.httpClient.post(`${this.url}${this.projetos}`, project);
    // }

    getAll() {
        return this.db.list(this.loginPATH)
            .snapshotChanges()
            .pipe(
                map(changes =>
                    changes.map(l => ({ key: l.payload.key, ...l.payload.val() }))
                )
            );
    }

    get() {
        return this.db.list(this.loginPATH)
            .snapshotChanges().pipe(
                map(actions => {
                    return actions.map(a => {
                        const data = a.payload.val();
                        const codigo = a.payload.key;

                        return { codigo, ...data };
                    });
                })
            );
    }

    save(login: any) {
        return new Promise((resolve, reject) => {
            if (login.key) {
                this.db.list(this.loginPATH)
                    .update(login.key, { email: login.email, password: login.password })
                    .then(() => resolve())
                    .catch((e) => reject(e));
            } else {
                this.db.list(this.loginPATH)
                    .push(
                        {
                            name: login.name,
                            email: login.email,
                            password: login.password,
                            acces_token: 'dmVsb3NvY3Jld0BnbWFpbC5jb21fdGVzdA==',
                            expires_in: 500
                        })
                    .then(() => resolve())
                    .catch((e) => reject(e));
            }
        });
    }

    remove(key: any) {
        return this.db.list(this.loginPATH).remove(key);
    }


    // Usuarios
    saveUser(users: any) {
        return new Promise((resolve, reject) => {
            if (users.key) {
                this.db.list(this.usersPATH)
                    .update(users.key, {
                        avatar: users.avatar,
                        nome: users.nome,
                        sub: users.sub,
                        local: users.local,
                        logoLinkedin: users.logoLinkedin,
                        logoGithub: users.logoGithub,
                    })
                    .then(() => resolve())
                    .catch((e) => reject(e));
            } else {
                this.db.list(this.usersPATH)
                    .push(
                        {
                            avatar: users.avatar,
                            nome: users.nome,
                            sub: users.sub,
                            local: users.local,
                            logoLinkedin: users.logoLinkedin,
                            logoGithub: users.logoGithub,
                        })
                    .then(() => resolve())
                    .catch((e) => reject(e));
            }
        });
    }

    getAllUsers() {
        return this.db.list(this.usersPATH)
            .snapshotChanges()
            .pipe(
                map(changes =>
                    changes.map(u => ({ key: u.payload.key, ...u.payload.val() }))
                )
            );
    }

    removeUser(key: any) {
        return this.db.list(this.usersPATH).remove(key.key);
    }

    // Projetos
    saveProject(project: any) {
        return new Promise((resolve, reject) => {
            this.db.list(this.projectPATH)
                .push(
                    {
                        title: project.title,
                        author: project.author,
                    })
                .then(() => resolve())
                .catch((e) => reject(e));
        });
    }

    updateProject(project: any) {
        return new Promise((resolve, reject) => {
            this.db.list(this.projectPATH)
                .update(project.key, {
                    title: project.title,
                    author: project.author,
                })
                .then(() => resolve())
                .catch((e) => reject(e));
        });
    }

    getAllProjects() {
        return this.db.list(this.projectPATH)
            .snapshotChanges()
            .pipe(
                map(changes =>
                    changes.map(u => ({ key: u.payload.key, ...u.payload.val() }))
                )
            );
    }

    removeProject(key: any) {
        return this.db.list(this.projectPATH).remove(key.key);
    }

    // Maps
    saveMaps(maps: any) {
        return new Promise((resolve, reject) => {
            this.db.list(this.mapPATH)
                .push(
                    {
                        lat: maps.lat,
                        lng: maps.lng,
                        label: maps.label,
                        address: maps.address,
                        city: maps.city,
                        img: maps.img,
                    })
                .then(() => resolve())
                .catch((e) => reject(e));
        });
    }

    getAllMaps() {
        return this.db.list(this.mapPATH)
            .snapshotChanges()
            .pipe(
                map(changes =>
                    changes.map(m => ({ key: m.payload.key, ...m.payload.val() }))
                )
            );
    }
}
