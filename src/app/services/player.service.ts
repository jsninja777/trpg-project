import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Player } from '../data/player';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private players: BehaviorSubject<Array<Player>> = new BehaviorSubject([
    new Player('Tester4', 2, 3, 4, 6),
    new Player('Tester5',  3, 4 ,6, 2),
  ]);

  constructor() {}

  addPlayer(player: Player) {
    const newPlayers = [...this.players.value, player];
    this.players.next(newPlayers);
  }

  updatePlayer(id: string, newPlayer: Player) {
    const newPlayers = this.players.value.map((player: Player) =>
      player.id === id ? newPlayer : player
    );
    this.players.next(newPlayers);
  }

  removePlayer(id: string) {
    const newPlayers = this.players.value.filter(
      (player: Player) => player.id !== id
    );
    this.players.next(newPlayers);
  }

  getPlayer(id: string) {
    return this.players.value.find((player: Player) => player.id === id);
  }

  getPlayersObs() {
    return this.players;
  }
}
