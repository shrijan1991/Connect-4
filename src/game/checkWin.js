const DIRECTIONS = [[1, 0], [0, 1], [1, -1], [1, 1]];

const checkWin = (boardState, x, y) => {
  const check = boardState[x][y];
  let winningPieces = [];
  const dir = DIRECTIONS.find((n) => {
    let count = 1;
    const possibleWinners = [];
    for (let sign = -1; sign <= 1; sign += 2) {
      possibleWinners.push([x, y]);
      const dx = n[0] * sign;
      const dy = n[1] * sign;
      let cx = x + dx;
      let cy = y + dy;
      while (cx > -1 && cy > -1 && cx < 6 && cy < 7) {
        if (boardState[cx][cy] === check) {
          count += 1;
          possibleWinners.push([cx, cy]);
          if (count > 3) {
            winningPieces = possibleWinners.slice();
            return true;
          }
        } else {
          break;
        }
        cx += dx;
        cy += dy;
      }
    }
  });
  return dir ? winningPieces : null;
};

export default checkWin;
