import { Inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";



export const authGuardQuiz = () : CanActivateFn => {
    console.log("vleze izvun");
    return () => {
        console.log("vleze vutre");
        const router: Router = Inject(Router);
        const userId: string | null = sessionStorage.getItem('id');

        console.log(userId)
        console.log(router);
        console.log(router.url);

        if(userId !== null) return true;
        else {
            return router.navigateByUrl('/authentication/login');
        }
    }
}