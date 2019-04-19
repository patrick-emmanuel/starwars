export const baseUrl = "https://cors-anywhere.herokuapp.com/swapi.co/api";

export const sortFunctionAsc = (a, b, value) => {
  if (a[value] < b[value]) {
    return -1;
  }
  if (a[value] > b[value]) {
    return 1;
  }
  return 0;
};

export const convertMapToArray = map => {
  const array = [];
  for (let entry of map.entries()) {
    array.push(entry);
  }
  return array;
};

const sortFunctionDesc = (a, b, value) => {
  if (a[value] < b[value]) {
    return 1;
  }
  if (a[value] > b[value]) {
    return -1;
  }
  return 0;
};

export const sortCharacters = (characters, sortAscending, value) => {
  parseHeightsToNumbers(characters);
  if (sortAscending) {
    characters = characters.sort((a, b) => sortFunctionAsc(a, b, value));
  } else {
    characters = characters.sort((a, b) => sortFunctionDesc(a, b, value));
  }
  return characters;
};

const parseHeightsToNumbers = characters => {
  characters.forEach(character => {
    let value = Number(character.height);
    if (isNaN(value)) {
      character.height = 0;
    } else {
      character.height = value;
    }
  });
};

export const sumCharacterHeights = characters => {
  const result = characters.reduce((accumulator, currentValue) => {
    if (isNaN(Number(currentValue.height))) {
      return accumulator;
    }
    return accumulator + Number(currentValue.height);
  }, 0);
  return toFeet(result);
};

const toFeet = cmValue => {
  var inches = cmValue * 0.393700787;
  var feet = Math.floor(inches / 12);
  inches %= 12;
  inches = inches.toFixed(2);
  return {
    cmValue,
    feet,
    inches
  };
};

export const filterCharacters = (value, allCharacters) => {
  if (value !== "all") {
    return allCharacters.filter(character => character.gender === value);
  } else {
    return allCharacters;
  }
};

export const formatGender = gender => {
  if (typeof gender === "string" && gender.length > 0) {
    return gender[0].toUpperCase();
  }
  return gender;
};
