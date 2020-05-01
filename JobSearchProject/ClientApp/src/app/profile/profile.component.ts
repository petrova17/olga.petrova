import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthorizeService } from '../../api-authorization/authorize.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public userName: Observable<string>;

    constructor(private authorizeService: AuthorizeService) { }

    ngOnInit() {
        this.userName = this.authorizeService.getUser().pipe(map(u => u && u.name)); 
    }

}
