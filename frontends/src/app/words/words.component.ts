import { Component, OnInit } from '@angular/core';
import { fromEvent, Subscription, Observable, interval } from 'rxjs';
// import * as io from 'socket.io-client';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.css'],
})
export class WordsComponent implements OnInit {
  private socket;

  data: string[];
  keys$: Observable<any>;
  subscription: Subscription;
  subscriptionTimer: Subscription;
  timer: number;
  score: number;
  hiscore: string;
  question: string[];
  questionCopy: string[];
  alphabet: string[];
  questionLength: number;
  counter: number = 0;
  bingo = {};
  winner: boolean = false;
  gameover: boolean = false;
  warning: boolean = false;
  record: boolean = false;
  start: boolean = false;
  hits: number = 0;
  key: string;
  choice: string = 'nba';

  constructor(private dataService: DataService) {
    // this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    // this.socket.on('start', start => console.log(start));
    // this.socket.emit('start', { message: 'poruka' });

    this.alphabet = this.dataService.getAlphabet();
    if (localStorage.getItem('hiscore')) {
      this.hiscore = localStorage.getItem('hiscore');
    } else {
      this.hiscore = '0';
    }
  }

  createQuestion() {
    switch (this.choice) {
      case 'box':
        this.data = this.dataService.getBoxers();
        break;
      case 'nba':
        this.data = this.dataService.getNba();
        break;
      default:
        this.data = this.dataService.getMarvel();
    }
    let pick = Math.floor(Math.random() * 10);
    this.question = this.data[pick].toUpperCase().split('');
    this.questionCopy = [...this.question];
    this.questionLength = this.data[pick].split(' ').join('').length;
  }

  startGame() {
    this.reset();
    if (this.subscriptionTimer) this.subscriptionTimer.unsubscribe();
    this.keys$ = fromEvent(document, 'keyup');
    this.subscription = this.keys$.subscribe(x => {
      this.key = x.key.toUpperCase();
      this.checkChar(this.key);
    });
    this.createQuestion();
    this.start = true;
    this.subscriptionTimer = interval(1000).subscribe(val => {
      this.getScore(val, this.hits);
      if (this.timer < 30) this.warning = true;
      if (this.timer <= 0) {
        this.timer = null;
        this.gameover = true;
        this.subscriptionTimer.unsubscribe();
      }
    });
  }

  checkChar(char) {
    const position = this.questionCopy.indexOf(char);
    let repeat = false;
    if (position == -1) {
      for (let value of Object.keys(this.bingo)) {
        if (value == char) {
          return (repeat = true);
        } else repeat = false;
      }
      repeat ? this.hits : this.hits++;
      this.bingo[char] = true;
    } else {
      this.bingo[char] = true;
      this.counter++;
      this.questionCopy.splice(position, 1);
      this.checkChar(char);
    }
    this.changeColor(char, this.bingo);

    if (this.questionLength == this.counter) {
      this.winner = true;
      if (this.timer > +this.hiscore) {
        this.hiscore = this.timer.toString();
        this.record = true;
        this.timer = null;
        localStorage.setItem('hiscore', this.hiscore);
      } else {
        this.score = this.timer;
        this.record = false;
        this.start = false;
      }
      this.subscription.unsubscribe();
      this.subscriptionTimer.unsubscribe();
    }
  }

  changeColor(char, obj) {
    for (let value of Object.keys(obj)) {
      if (value == char) {
        return { backgroundColor: 'red', border: '2px solid red' };
      }
    }
  }

  getScore(val, hits) {
    return (this.timer = 90 - val - hits * 5);
  }

  reset() {
    this.winner = false;
    this.gameover = false;
    this.warning = false;
    this.questionCopy = [];
    this.counter = 0;
    this.question = [];
    this.bingo = {};
    this.hits = 0;
    this.timer = 0;
  }
}
