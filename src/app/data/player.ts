import {
  BaseAttribute,
  Skill,
  SkillLevel,
  SkillRules,
  Trait,
  TraitRule,
  TraitRules,
} from './constants.enum';

const exportableFields: Array<string> = [
  'name',
  'strength',
  'dexterity',
  'mind',
  'presence',
  'damage',
  'extraTenacity',
  'power',
  'skills',
  '_armor',
  'weapons',
  'traits',
];

export class Player {
  id: string = '';
  name: string = '';

  // === Base attributes === //

  strength: number = 0;
  dexterity: number = 0;
  mind: number = 0;
  presence: number = 0;

  // === End of Base attributes === //

  // === Extra attributes === //

  damage: number = 0;
  extraTenacity: number = 0;

  // === End of Extra attributes === //

  readonly power: number = 0;

  skills: Array<SkillLevel> = [
    SkillLevel.Untrained,
    SkillLevel.Untrained,
    SkillLevel.Untrained,
    SkillLevel.Untrained,
    SkillLevel.Untrained,
    SkillLevel.Untrained,
    SkillLevel.Untrained,
    SkillLevel.Untrained,
    SkillLevel.Untrained,
    SkillLevel.Untrained,
    SkillLevel.Untrained,
    SkillLevel.Untrained,
  ];

  _armor: number = 0;
  weapons: Array<Boolean> = [];
  traits: Array<Boolean> = [];

  constructor(
    name: string = 'New Player',
    strength: number = 0,
    dexterity: number = 0,
    mind: number = 0,
    presence: number = 0
  ) {
    this.id = Math.random().toString(36).substring(6);
    this.name = name;
    this.strength = strength;
    this.dexterity = dexterity;
    this.mind = mind;
    this.presence = presence;
  }

  // === Combat attributes === //

  get vitality(): number {
    return Math.max(this.strength + 3 - this.damage, 0);
  }

  get evasion(): number {
    let bonus = 0;
    TraitRules.forEach((rule: TraitRule, slotIndex: number) => {
      if (rule.attribute === 'evasion' && this.traits[slotIndex]) {
        bonus += rule.op;
      }
    });
    return this.dexterity + 10 + bonus;
  }

  get armor(): number {
    // thought bonus is 1x for armor equiped
    return this.dexterity + 10 + this._armor;
  }

  get alacrity(): number {
    return this.dexterity + this.mind;
  }

  get tenacity(): number {
    return this.presence + 1 + this.extraTenacity;
  }

  // === End of Combat attributes === //

  public receiveTenacity(amount: number) {
    this.extraTenacity += amount;
  }

  public doDamage() {
    this.damage += 1;
  }

  public canUpdateSkill(field: Skill, value: number): boolean {
    // should consider all attributes related with skill
    return SkillRules[field].every((attr: string) => this[attr] >= value);
  }

  public canUpdateTrait(field: Trait): boolean {
    // no requirements
    if (!TraitRules[field] || !TraitRules[field].requirement) {
      return true;
    }
    return TraitRules[field].requirement.every(
      (attr: BaseAttribute | Trait) =>
        (typeof attr === 'number' ? this.traits[attr] : (this[attr] >= field)) 
    );
  }

  public generateSkillValue(field: Skill) {
    if (this.skills[field] === SkillLevel.Untrained) {
      return Math.min(this.getRandomNumber(20), this.getRandomNumber(20));
    }

    return (
      this.getRandomNumber(20) +
      this.getRandomNumber(4 + (this.skills[field] - 1) * 2)
    );
  }

  private getRandomNumber(max: number): number {
    return Math.floor(Math.random() * max) + 1;
  }

  toJSON(): any {
    const data: any = {};
    exportableFields.forEach((field: string) => {
      data[field] = this[field];
    });

    return data;
  }

  async loadJSON(payload: any) {
    exportableFields.forEach((field: string) => {
      if (payload[field] === undefined) {
        return;
      }
      this[field] = payload[field];
    });
  }
}
