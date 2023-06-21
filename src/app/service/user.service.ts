import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private localUserIdKey = 'userId';

  constructor(private httpClient: HttpClient) { }

  public getUserId() {
    const userId = localStorage.getItem(this.localUserIdKey);
    return userId || '';
  }

  public async loadAndReturnUserId() {
    const userId = localStorage.getItem(this.localUserIdKey);
    if(userId) return userId;

    const user = await lastValueFrom(this.httpClient.get<User>('NewUser'));
    localStorage.setItem(this.localUserIdKey, user.id);
    return user.id;
  }
}
