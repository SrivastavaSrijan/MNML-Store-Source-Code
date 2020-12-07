const randomWithRange = (max, min) => Math.floor(Math.random() * (max - min) + min);
export const delayFunction = (delayMax, delayMin) => {
  let delaySize = randomWithRange(delayMax, delayMin);
  return new Promise((resolve) => setTimeout(resolve, delaySize));
};
