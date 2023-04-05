import { inject, Injectable } from '@angular/core';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore'
import { AppUser } from '../models/user';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'firebase/auth';
import { lastValueFrom, map, Observable, of, switchMap } from 'rxjs';
import { DataUser } from 'src/app/shared/models/data-user';


@Injectable({
  providedIn: 'root'
})


export class AuthService {

  userData: AppUser;
  
  constructor(
    private userService: UserService,
    public afAuth: AngularFireAuth,
    public router: Router,
    private route: ActivatedRoute,
    public afs: AngularFirestore
  ) {

    // Salva os dados do usuário quando este estiver logado e seta nulo em caso contrário
     this.afAuth.authState.subscribe((firebaseUser: User) => {
      if (firebaseUser) {
        this.userData = firebaseUser;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    })
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }

  get dataUser() : Observable<DataUser> { 

    let json = JSON.parse(localStorage.getItem('user'));         
    //realiza o mapeamento do firebaseObject para um DataUser 
    return this.userService.get(json.uid).pipe(map(
      (payload) =>  payload.data()
    ));  
  }

  async GoogleAuth() {
    await this.AuthLogin(new auth.GoogleAuthProvider());
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    console.log('passo aqui sim')
    localStorage.setItem('returnUrl', returnUrl);    
    
    setTimeout(() => {   
        this.router.navigateByUrl(returnUrl)
    }, 2000)
  }

  // // lógica de autenticação para provedores de autenticação
  async AuthLogin(provider: any) {
    const login = await this.afAuth.signInWithPopup(provider);
    this.SetUserData(login.user);
  }


   SetUserData(user: AppUser) {
    const userRef: AngularFirestoreDocument<AppUser> = this.afs.doc(
      `users/${user.uid}`
    );

    const userData: AppUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      emailVerified: user.emailVerified
    };

    return userRef.set(userData, {
      merge: true,
    })

  }
  //método assíncrono - não executa na ordem natural
  async canActivateAdmin(): Promise<boolean> {

    let json = JSON.parse(localStorage.getItem('user'));    
    
    //variável espera ser preenchida para rodar as próximas instruções
    const user = await lastValueFrom(this.userService.get(json.uid));    
    if(!user.get('isAdmin')) this.router.navigate(['login']);
    return user.get('isAdmin');   
    
  }

  async canActivate(state: RouterStateSnapshot): Promise<boolean> {    
  
    let user = localStorage.getItem('user');
    
    if (user === 'null') {          
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });      
      return false;
    }    
    localStorage.removeItem('returnUrl');
    return true;
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    })
  }
}

export const authGuardAdmin: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(AuthService).canActivateAdmin();
}

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(AuthService).canActivate(state);
}