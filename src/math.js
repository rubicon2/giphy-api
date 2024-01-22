function getRangedRandomInt(min, max) {
  const range = max - min;
  return Math.round(min + range * Math.random());
}

export { getRangedRandomInt };
