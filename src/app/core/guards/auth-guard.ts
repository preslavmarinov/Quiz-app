import { CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";


export const authGuardQuiz = () : CanActivateFn => {
  return () => {
    const router:Router = inject(Router);
    const userId: string | null = sessionStorage.getItem('id');

    if(userId !== null) return true;

    return router.navigateByUrl('/authentication/login');
  }
}

export const authGuardDashboard = (): CanActivateFn => {
  return () => {
    const router:Router = inject(Router);
    const role: string | null = sessionStorage.getItem('role');
    const userId: string | null = sessionStorage.getItem('id');

    if(role === 'admin' && userId !== null) {
      return true;
    }
    else if(role === 'user') {
      return router.navigateByUrl('/quiz');
    }

    return router.navigateByUrl('/authentication/login');

  }
}
