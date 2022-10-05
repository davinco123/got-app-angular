export interface Character {
  url: string;
  name: string;
  gender: string;
  culture: string;
  born: string;
  died: string;
  titles: string[];
  aliases: string[];
  father: string;
  mother: string;
  spouse: string;
  allegiances: string[];
  books: string[];
  povBooks: string[];
  tvSeries: string[];
  playedBy: string[];
}

export interface updateCharacter {
  father: NameAndId;
  mother: NameAndId;
  spouse: NameAndId;
  allegiances: NameAndId[];
  books: NameAndId[];
  povBooks: NameAndId[];
}

export interface NameAndId {
  id: string;
  name: string;
}
