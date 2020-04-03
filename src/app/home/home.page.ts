import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { PicturePage } from '../picture/picture.page';
import { IdeaService, Idea } from '../services/idea.service';
import { Observable } from 'rxjs';
import { DeletePage } from '../delete/delete.page';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],

})

export class HomePage {
  langs: string[] = ['English','Chinese'];
  lang: string = 'English';

  private ideas: Observable<Idea[]>;
  galleryType = 'Gallery';  
  constructor(public navCtrl: NavController, public modalController: ModalController,
    private ideaService:IdeaService, private translate: TranslateService

    ) {
      this.ideas = this.ideaService.getIdeas();
      this.translate.setDefaultLang('English');

    }
  
    changeLang(event) {
      this.translate.use(event.detail.value);
      this.lang = event.detail.value;  
      }

  async openPicture(img){const modal = await this.modalController.create({
    component: PicturePage, componentProps: {img:img,'lang':this.lang} 

    });
    return await modal.present();}

    async openDelete(img){const modal = await this.modalController.create({
      component: DeletePage, componentProps: {img:img,'lang':this.lang} 
  
      });
      return await modal.present();}
}

