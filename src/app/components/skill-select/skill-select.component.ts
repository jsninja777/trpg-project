import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Player } from 'src/app/data/player';
import { Skill, skillOptions } from '../../data/constants.enum';

@Component({
  selector: 'app-skill-select',
  templateUrl: './skill-select.component.html',
  styleUrls: ['./skill-select.component.scss'],
})
export class SkillSelectComponent implements OnInit {
  @Input() label: string;
  @Input() control: FormControl;
  @Input() player: Player;

  value: number = 0;

  constructor() {}

  ngOnInit(): void {
    if (!this.player) {
      return;
    }
    this.value = this.player.skills[Skill[this.label]];
  }

  get options() {
    return skillOptions.filter((option: any) =>
      this.player.canUpdateSkill(Skill[this.label], option.key)
    );
  }

  generate() {
    this.value = this.player.generateSkillValue(Skill[this.label]);
  }
}
