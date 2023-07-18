import { NgModule, Optional, SkipSelf } from '@angular/core';
//import { CommonModule } from '@angular/common';
import { AuthenticationService } from './services/authentication.service';
import { QuestionService } from './services/question.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [],
  providers:[AuthenticationService,QuestionService],
  imports: [HttpClientModule]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule:CoreModule) { //Ensures that when its loaded you can't load it again
    if(parentModule) {
      throw new Error("You should import core module only in the root/app module");
    }
  }
}

