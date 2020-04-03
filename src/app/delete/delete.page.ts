import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { IdeaService, Idea } from '../services/idea.service';
import { Route } from '@angular/compiler/src/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.page.html',
  styleUrls: ['./delete.page.scss'],
})
export class DeletePage implements OnInit {

  @Input() lang:string;
  constructor(public modalController: ModalController,
    private navParams: NavParams,
    private activatedRoute: ActivatedRoute, private ideaService: IdeaService,
   private toastCtrl: ToastController, private router: Router) { }
  close() {
    this.modalController.dismiss();
    }
    img:any;
  idea: Idea = {
    name: '',
    notes: ''
  };

    deleteIdea() {
      this.ideaService.deleteIdea(this.idea.id).then(() => {
      this.showToast('');
      if (this.lang == 'English') {
        this.showToast("Picture deleted from favorites");  
      } else {
        this.showToast("图片已从收藏夹中删除");
      }
      this.close();
      }, err => {
      this.showToast('There was a problem deleting your idea :(');
      });
      }
      showToast(msg) {
        this.toastCtrl.create({
        message: msg,
        duration: 2000
        }).then(toast => toast.present());
        }

  ngOnInit() {
    this.img = this.navParams.get('img');
    this.lang = this.navParams.get('lang');
    this.idea = this.img;
  }

}
