const MIN_HEIGHT = 180;

/* eslint-disable import/prefer-default-export */
export const sortImagesByHeight = (images, colCount) => {
  const cols = new Array(colCount).fill('').map(() => []);
  const height = new Array(colCount).fill(0);
  const MAX_HEIGHT = (920 / colCount) * 2;
  images.forEach((image) => {
    const minHeight = Math.min(...height);
    const index = height.indexOf(minHeight);
    cols[index].push(image);
    height[index] += Math.min(Math.max(image.height, MIN_HEIGHT), MAX_HEIGHT);
  });
  return [].concat(...cols);
};
