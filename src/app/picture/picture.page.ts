import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { IdeaService, Idea } from '../services/idea.service';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-picture',
  templateUrl: './picture.page.html',
  styleUrls: ['./picture.page.scss'],
})
export class PicturePage implements OnInit {
  
  img:any;
  idea: Idea = {
    name: '',
    notes: ''
  };
  private ideas: Observable<Idea[]>;
  @Input() lang:string;
  constructor(public modalController: ModalController,
     private navParams: NavParams,
     private activatedRoute: ActivatedRoute, private ideaService: IdeaService,
    private toastCtrl: ToastController, private router: Router
   ) {
  }
    close() {
      this.modalController.dismiss();
      }
      

  ngOnInit() {
    this.lang = this.navParams.get('lang');
    
    this.img = this.navParams.get('img');
    this.ideas = this.ideaService.getIdeas();


  }
  ionViewWillEnter() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
    this.ideaService.getIdea(id).subscribe(idea => {
    this.idea = idea;
    });
    }
    }

  addFavorie(){
    this.idea.name=this.img;
    this.ideaService.addIdea(this.idea).then(() => {
      this.router.navigateByUrl('/home');
      if (this.lang == 'English') {
        this.showToast("Added to favorites");  
      } else {
        this.showToast("添加到收藏夹");
      }
      
}  , err => {
     
      console.log(err);
    });
  }
  showToast(msg) {
    this.toastCtrl.create({
    message: msg,
    duration: 2000
    }).then(toast => toast.present());
    }
    
  }
