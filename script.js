document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))  //array.from() collects all 200 divs and put them into an array 
    //we can work with, now each div will have a different index number
    const width = 10
    const scoreDisplay = document.querySelector('#score')
    const startBtn = document.querySelector('#start-button')

    console.log(squares)

    //What are functions?  functions are one of the main building
    // blocks of javascript it allows you write a block of code 
    // and execute it as many times you want

    //Arrow functions 

    //functions before es6 arrow function
    // function  hello () {
    //     return 'Hello world'
    // }

    // evolution
    // hello = () => 'Hello world'

    // let names = ['Ann', 'Serah', 'Mark']

    // names.forEach(name => {
    //     console.log(names + ' is the best')
    // })

    //Drawing tetriminoes using classList.add()

    //THE TETRIMINOES 

    const lTetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2*2]
    ]


    const zTetromino = [
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2,  width*2+1],
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1]

    ]


    const tTetromino = [
        [1, width, width+1, width+2],
        [1, width+1, width+2, width*2+1],
        [width, width+1, width+2, width*2+1],
        [1, width, width+1, width*2+1]
    ]

    const oTetromino = [

        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1]
    ]

    const iTetromino = [
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width*2, width+3],
        [1, width*1, width*2+1, width*3+1],
        [width, width+1, width*2, width+3],
    ]

    const theTetrominoes = [lTetromino, zTetromino, oTetromino, iTetromino, tTetromino]


    // we decide where we want to draw our tetrominoes 
    // on the squares grid 


    let currentPosition = 4
    let currentRotation = 0

    // randomly select a tetromino and its first rotation
    let random = Math.floor(Math.random()*theTetrominoes.length)
    console.log(random)
    let current = theTetrominoes[random][currentRotation]

    // draws the tetromino

    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino')
        })
    }

    // undraws the tetromino

    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino')
        })
    }

    // make tetromino move down every second 
    timerId = setInterval(moveDown, 1000)

    // assign functions to keyCodes
    function control(e) {
        if(e.keyCode === 37) {
            moveLeft()
        } else if (e.keyCode === 38) {
            //rotate()
        } else if (e.keyCode === 39) {
            moveRight()
        } else if (e.keyCode === 40) {
            moveDown()
        }
    }

    document.addEventListener('keyup', control)

    //move down function
    function moveDown() {
        undraw()
        currentPosition += width
        draw()
        freeze()
    }

    //freeze function

    function freeze () {
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {  // with .some we are checking to see if the logic we writing is true for some of the array
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))
            //start a new tetromino falling 
            random = Math.floor(Math.random() * theTetrominoes.length)
            current = theTetrominoes[random][currentRotation]
            currentPosition = 4
            draw()
        }
    }

    // move tetromino left unless its at the edge or theres a blockage
    
    function moveLeft () {
        undraw()
        const isAtLeftEdge = current.some(index => (currentPosition +index) % width === 0)

        if(!isAtLeftEdge) currentPosition -=1

        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition +=1
        }

        draw()
    }

    // move tetromino right unless its at the edge or theres a blockage
    
    function moveRight () {
        undraw()
        const isAtRightEdge = current.some(index => (currentPosition +index) % width === width -1)

        if(!isAtRightEdge) currentPosition +=1

        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -=1
        }

        draw()
    }




})