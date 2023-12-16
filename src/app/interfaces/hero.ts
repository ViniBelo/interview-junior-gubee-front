import { Race } from "./race";

export interface Hero {
    id: string,
    name: string,
    race: Race,
    strength: number,
    agility: number,
    dexterity: number,
    intelligence: number
}
