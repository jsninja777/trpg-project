export enum Skill {
  Fighting,
  Thievery,
  Stealth,
  Archery,
  Learned,
  Survival,
  Perception,
  Apothecary,
  Intimidation,
  Performance,
  Manipulation,
  Insight,
  Power,
}

export enum SkillLevel {
  Untrained,
  Novice,
  Apprentice,
  Adept,
  Expert,
  Master,
}

export type BaseAttribute = 'strength' | 'dexterity' | 'mind' | 'presence';

export type CombatAttribute = 'vitality' | 'evasion' | 'armor' | 'alacrity' | 'tenacity';

export enum Armor {
  None,
  Chest,
  HeadChest,
  Silver,
  Gold,
}

export enum Trait {
  Slot1,
  Slot2,
  Slot3,
  Slot4,
}

export enum Weapon {
  Sword,
  Bow,
  Knife,
};

export type TraitRule = {
  requirement: Array<BaseAttribute | Trait>
  attribute: CombatAttribute | Skill;
  op: number;
}

export const SkillRules: Array<Array<BaseAttribute>> = [
  ['strength', 'dexterity'],
  ['dexterity'],
  ['dexterity'],
  ['dexterity'],
  ['mind'],
  ['mind'],
  ['mind'],
  ['mind'],
  ['presence'],
  ['presence'],
  ['presence'],
  ['presence'],
  ['presence', 'mind'],
];

export const TraitRules: Array<TraitRule> = [
  {
    requirement: ['dexterity'],
    attribute: 'evasion',
    op: 2
  },
  {
    // greater than strength value & ensure Slot1 trait exists as presiquient
    requirement: ['strength', Trait.Slot1],
    attribute: Skill.Fighting,
    op: 1
  },
  {
    // greater than strength value & ensure Slot1 trait exists as presiquient
    requirement: ['mind', Trait.Slot1],
    attribute: Skill.Perception,
    op: 3
  }
];

export const skillOptions: any = [
  { label: 'Untrained', key: SkillLevel.Untrained },
  { label: 'Novice', key: SkillLevel.Novice },
  { label: 'Apprentice', key: SkillLevel.Apprentice },
  { label: 'Adept', key: SkillLevel.Adept },
  { label: 'Expert', key: SkillLevel.Expert },
  { label: 'Master', key: SkillLevel.Master },
];

export const armorOptions: any = [
  { label: 'No Armor', key: Armor.None },
  { label: 'Chest Armor', key: Armor.Chest },
  { label: 'Head + Chest Armor', key: Armor.HeadChest },
  { label: 'Silver Armor', key: Armor.Silver },
  { label: 'Gold Armor', key: Armor.Gold },
];

export const weaponOptions: any = [
  { label: 'Sword', key: Weapon.Sword },
  { label: 'Bow', key: Weapon.Bow },
  { label: 'Knife', key: Weapon.Knife },
];

export const traitOptions: any = [
  { label: 'Slot1', key: Trait.Slot1 },
  { label: 'Slot2', key: Trait.Slot2 },
  { label: 'Slot3', key: Trait.Slot3 },
  { label: 'Slot4', key: Trait.Slot4 },
];

