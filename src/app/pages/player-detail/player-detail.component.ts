import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  armorOptions,
  Skill,
  Trait,
  traitOptions,
  Weapon,
  weaponOptions,
} from 'src/app/data/constants.enum';
import { Player } from 'src/app/data/player';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss'],
})
export class PlayerDetailComponent implements OnInit {
  public playerForm: FormGroup;
  public isCreate: Boolean;
  public player: Player = new Player('New Player');

  public readonly armorOptions = armorOptions;
  public readonly weaponOptions = weaponOptions;
  public readonly traitOptions = traitOptions;

  // form fields
  public fighting = new FormControl(
    { value: 0, disabled: true },
    Validators.required
  );
  public thievery = new FormControl(
    { value: 0, disabled: true },
    Validators.required
  );
  public stealth = new FormControl(
    { value: 0, disabled: true },
    Validators.required
  );
  public archery = new FormControl(
    { value: 0, disabled: true },
    Validators.required
  );
  public learned = new FormControl(
    { value: 0, disabled: true },
    Validators.required
  );
  public survival = new FormControl(
    { value: 0, disabled: true },
    Validators.required
  );
  public perception = new FormControl(
    { value: 0, disabled: true },
    Validators.required
  );
  public apothecary = new FormControl(
    { value: 0, disabled: true },
    Validators.required
  );
  public intimidation = new FormControl(
    { value: 0, disabled: true },
    Validators.required
  );
  public performance = new FormControl(
    { value: 0, disabled: true },
    Validators.required
  );
  public manipulation = new FormControl(
    { value: 0, disabled: true },
    Validators.required
  );
  public insight = new FormControl(
    { value: 0, disabled: true },
    Validators.required
  );

  public isEditingBaseAttrs: Boolean = false;
  public isEditingBaseSkills: Boolean = false;
  public isEditingExtendedAttrs: Boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private playerService: PlayerService
  ) {
    this.playerForm = this.formBuilder.group({
      name: ['New Player', Validators.required],
      strength: [{ value: 0, disabled: true }, Validators.required],
      dexterity: [{ value: 0, disabled: true }, Validators.required],
      mind: [{ value: 0, disabled: true }, Validators.required],
      presence: [{ value: 0, disabled: true }, Validators.required],
      fighting: this.fighting,
      thievery: this.thievery,
      stealth: this.stealth,
      archery: this.archery,
      survival: this.survival,
      learned: this.learned,
      perception: this.perception,
      apothecary: this.apothecary,
      intimidation: this.intimidation,
      performance: this.performance,
      manipulation: this.manipulation,
      insight: this.insight,
      armor: [{ value: 0, disabled: true }, Validators.required],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.isCreate = id === 'new';

    if (!this.isCreate) {
      this.player = this.playerService.getPlayer(id);
      if (!this.player) {
        this.router.navigate(['/players']);
        return;
      }

      this.loadForm();
    } else {
      this.playerService.addPlayer(this.player);
    }

    this.playerForm.valueChanges.subscribe((value: any) => {
      if (value['name']) {
        this.player.name = value['name'];
      }
      if (value['strength']) {
        this.player.strength = value['strength'];
      }
      if (value['dexterity']) {
        this.player.dexterity = value['dexterity'];
      }
      if (value['mind']) {
        this.player.mind = value['mind'];
      }
      if (value['presence']) {
        this.player.presence = value['presence'];
      }
      if (value['armor']) {
        this.player._armor = value['armor'];
      }

      Object.values(Skill).forEach((formName: string) => {
        if (isNaN(Number(formName))) {
          if (!value[formName.toLowerCase()]) {
            return;
          }
          this.player.skills[Skill[formName]] = value[formName.toLowerCase()];
        }
      });

      this.playerService.updatePlayer(this.player.id, this.player);
    });
  }

  loadForm() {
    this.playerForm.get('name').setValue(this.player.name);
    this.playerForm.get('strength').setValue(this.player.strength);
    this.playerForm.get('dexterity').setValue(this.player.dexterity);
    this.playerForm.get('mind').setValue(this.player.mind);
    this.playerForm.get('presence').setValue(this.player.presence);
    this.playerForm.get('armor').setValue(this.player._armor);

    Object.values(Skill).forEach((formName: string) => {
      if (formName === 'Power') {
        return;
      }
      if (isNaN(Number(formName))) {
        this.playerForm.controls[formName.toLowerCase()].setValue(
          this.player.skills[Skill[formName]]
        );
      }
    });
  }

  toggleBaseAttrEditMode() {
    const toggleAction = this.isEditingBaseAttrs ? 'disable' : 'enable';
    if (this.isEditingBaseAttrs) {
      this.playerService.updatePlayer(this.player.id, this.player);
    }
    this.isEditingBaseAttrs = !this.isEditingBaseAttrs;

    this.playerForm.get('strength')[toggleAction]();
    this.playerForm.get('dexterity')[toggleAction]();
    this.playerForm.get('mind')[toggleAction]();
    this.playerForm.get('presence')[toggleAction]();
  }

  toggleSkillEditMode() {
    const toggleAction = this.isEditingBaseSkills ? 'disable' : 'enable';
    if (this.isEditingBaseSkills) {
      this.playerService.updatePlayer(this.player.id, this.player);
    }
    this.isEditingBaseSkills = !this.isEditingBaseSkills;

    Object.values(Skill).forEach((formName: string) => {
      if (formName === 'Power') {
        return;
      }
      if (isNaN(Number(formName))) {
        this[formName.toLowerCase()][toggleAction]();
      }
    });
  }

  toggleExtendedEditMode() {
    const toggleAction = this.isEditingExtendedAttrs ? 'disable' : 'enable';
    if (this.isEditingExtendedAttrs) {
      this.playerService.updatePlayer(this.player.id, this.player);
    }

    this.isEditingExtendedAttrs = !this.isEditingExtendedAttrs;
    this.playerForm.get('armor')[toggleAction]();
  }

  onWeaponChange(weapon: Weapon, event: any) {
    this.player.weapons[weapon] = event.checked;
  }

  onTraitChange(trait: Trait, event: any) {
    this.player.traits[trait] = event.checked;
  }

  exportJSON() {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(this.player.toJSON()));
    const downloadAnchorNode = document.createElement('a');
    const fileName = `player-${this.player.id}.json`;
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', fileName);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  handleImportClick() {
    const inputEl: any = document.getElementById('import');
    inputEl.click();
  }

  importJSON() {
    const inputEl: any = document.getElementById('import');
    const reader = new FileReader();

    reader.onload = (res) => {
      const payload = JSON.parse(res.target.result as string);

      this.player = new Player();
      this.player.loadJSON(payload);

      this.loadForm();
      this.playerService.updatePlayer(this.player.id, this.player);
    };
    reader.onerror = console.log;

    reader.readAsText(inputEl.files[0]);
  }
}
