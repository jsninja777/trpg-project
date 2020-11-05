import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/data/player';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
})
export class PlayerListComponent implements OnInit {
  players: Array<Player>;

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.playerService
      .getPlayersObs()
      .subscribe((players: Array<Player>) => (this.players = players));
  }
}
