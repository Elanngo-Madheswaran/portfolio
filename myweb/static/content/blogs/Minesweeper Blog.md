---
Title: How I created minesweeper in svelte
Last-edited: 2026-03-12, 22:01
excerpt: This article discusses how I created minesweeper in svelte and core logics inside its features
---
Hi , today in this blog I am going to explain how did I made a dynamic minesweeper using svelte.

## Project Setup

Lets create a simple project with these commands
```
npx sv create minesweeper
cd minesweeper
npm run dev
```

## Game Rules

In the minesweeper we create a board (say 10 x 10 ) has titles filled and below those tiles we have either a mine or a number that shows the number of mines in the nine tiles surrounding it.

<img src="../blog-assets/Pasted image 20251117200227.png"/>
in this above image the tile showing "1" meaning in the highlighted 8 titles there is 1 mine waiting to explode. When we finish all the titles without clicking on mines we win if we click on any mine then we lose.

### Flag system
There is a flag system in the game that allows user to mark the tiles which they think are mines and can easily avoid them.

## Basic Logic systems

So based on the game logic each title has these props
- Is Mine
- Message ( which shows mine icon or the no of surrounding mines or flag icon when flagged)
- is Surrounded by ( no of mines surrounding it)
- is revealed ( state used to check if it is already revealed)
- is Flagged 

## Components

We create a separate board component which takes a size state from the parent and renders a size x size board with all the props.

First we need to generate an array which stores all the cells which has the mines in them, we fill 1/4 th of the tiles with mines in this example.

 ```js
 let mines = $derived.by( ()=>{

            let no = Math.floor((size * size) / 4);

            let arr = Array.from({length :size*size}, (_ ,i) => i)

            let mine_num = new Set();

            while (mine_num.size < no) {

                mine_num.add(arr[Math.floor(Math.random() * arr.length)]);

            }

            return [...mine_num];

      }
      );
 ```
 here we use derived by so that when the board size changes the mines array also expands accordingly.

then we create a function that takes an cell number and returns the number of mines surrounding that cell.
```js
function checksurround(n){

        let count = 0;

        if (mines.includes(n)){

            return 0;

        }else{

            // Calculate row and column of the current cell

            const row = Math.floor(n / size);

            const col = n % size;

            // Check all 8 adjacent cells (including diagonals)

            for (let r = Math.max(0, row-1); r <= Math.min(row+1, size-1); r++) {

                for (let c = Math.max(0, col-1); c <= Math.min(col+1, size-1); c++) {

                    const adjacentCell = r * size + c;

                    // Skip the current cell itself

                    if (adjacentCell !== n && mines.includes(adjacentCell)) {

                        count++;

                    }

                }

            }

            return count;

        }

      }
```

Here the main logic is in the for loop which calculates returns the cell numbers by finding the surrounding cells as explained in the image below
<img src="../blog-assets/Pasted image 20251117203125.png" />

#### Reveal 

When a player left clicks any of these boxes this function is triggered
```js
function reveal(box , e){

        if (mode === "flag") flag(box ,e)

        else if(box.isFlaged|| box.isRevealed) return

        else if(box.isMine) reveal_mines(box)

        else {

            box.message = box.isSurrounded;

            box.isRevealed = true;

        if (box.isSurrounded == 0){

            const n = box.id;

            const row = Math.floor(n / size);

            const col = n % size;

            for (let r = Math.max(0, row-1); r <= Math.min(row+1, size-1); r++) {

                for (let c = Math.max(0, col-1); c <= Math.min(col+1, size-1); c++) {

                    const adjacentCell = r * size + c;

                    reveal(boxes[adjacentCell]);

                }

            }

        }

    }

      }
```

first it checks if it is already revealed , or is mine (which is handled by other method ) then , it finds the no of mines it is surrounded by using the previous method, if the isSurrounded is 0 then we loop through all the surrounding cells and reveal all of them too with recursive calling.

#### Flaging :

Players can flag the tiles which they think the mines are under so they can correctly move to other tiles which helps the players by not needing to remember the tiles themselves. So I have added so that on right click it adds flag instead of revealing.

The main problem here is for the players playing in mobile it is not possible for left/right click. I tried long press and implemented that too but it was not as reliable as I thought it was. So I came up with a button switching the modes ( Reveal / Flag ) so it would be easier for player and also more accessibility friendly. 

Others are some util functions and html markup which can be found in the project link below:

[Minesweeper github project](https://github.com/Elanngo-Madheswaran/minesweeper)

Live demo : [Minesweeper](https://mines-elanngo.vercel.app/)

