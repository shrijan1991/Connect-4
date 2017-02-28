# Connect 4

## Description
A web based connect 4 game (6 x 7).

### The UI
The UI is developed using react with redux handling the state tree.
The Player and Bot objects hold player and bot information entered at the start of the game.
The Board holds all components that need to be rendered.
The Cells are individual SVGs that dispatch a call to drop disk when clicked at.
The circles are individual disks.

Players are stored in the reducer along with the board state and number of moves.
The program uses thunk middleware to dispatch a function while dropping a disk.
A custom middleware exists to execute bot's turn in case the player has selected to play against a bot.

### The AI
Basic alpha-beta pruning with a simple evaluation function to find the value of current game state at leaves of alphabeta tree.

# Connect-4
