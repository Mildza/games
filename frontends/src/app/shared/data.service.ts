import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService implements OnInit {
  boxers: string[];
  nba: string[];
  marvel: string[];
  constructor() {
    this.boxers = [
      'Mike Tyson',
      'Muhammad Ali',
      'Jack Dempsey',
      'Rocky Marciano',
      'Wladimir Klitchko',
      'Lenoks Luis',
      'Evander Holyfield',
      'George Foreman',
      'Chris Eubank',
      'Naseem Hamed',
    ];
    this.nba = [
      'Lebron James',
      'Nikola Jokic',
      'Vlade Divac',
      'Draymond Green',
      'Stephen Curry',
      'Klay Thompson',
      'Denis Rodman',
      'Ray Allen',
      'Reggie Miller',
      'Dwyane Wade',
    ];
    this.marvel = [
      'Thor',
      'Wolwerine',
      'Iron Man',
      'Hulk',
      'Captain America',
      'Daredevil',
      'Punisher',
      'Deadpool',
      'Elektra',
      'Black Panther',
    ];
  }

  ngOnInit() {}

  getAlphabet() {
    return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  }
  getBoxers() {
    return this.boxers;
  }
  getNba() {
    return this.nba;
  }
  getMarvel() {
    return this.marvel;
  }
}
