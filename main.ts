let x = 2
let y = 0
let score = 0
let gameOver = false

// playfield (5x5 grid)
let grid: number[][] = []

for (let i = 0; i < 5; i++) {
    grid.push([0, 0, 0, 0, 0])
}

// 🧱 draw everything
function draw() {
    basic.clearScreen()

    // locked blocks
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (grid[i][j] == 1) {
                led.plot(j, i)
            }
        }
    }

    // falling block
    if (!gameOver) {
        led.plot(x, y)
    }
}

// 💥 lock block into grid
function lockBlock() {
    grid[y][x] = 1
}

// 🧹 clear line (simple version)
function clearLines() {
    for (let i = 0; i < 5; i++) {
        let full = true

        for (let j = 0; j < 5; j++) {
            if (grid[i][j] == 0) {
                full = false
            }
        }

        if (full) {
            score += 1

            // drop everything down
            for (let k = i; k > 0; k--) {
                grid[k] = grid[k - 1]
            }

            grid[0] = [0, 0, 0, 0, 0]
        }
    }
}

// 🎮 input
input.onButtonPressed(Button.A, function () {
    if (x > 0) x--
})

input.onButtonPressed(Button.B, function () {
    if (x < 4) x++
})

input.onButtonPressed(Button.AB, function () {
    // fake rotation (jitter effect)
    x = randint(0, 4)
})

// ⬇️ game loop
basic.forever(function () {
    if (gameOver) return

    draw()

    basic.pause(500)

    y++

    // 💀 hit bottom or block
    if (y > 4 || grid[y][x] == 1) {
        y--
        lockBlock()
        clearLines()

        // reset piece
        x = 2
        y = 0

        // 💀 game over check
        if (grid[0][2] == 1) {
            gameOver = true
            basic.showIcon(IconNames.Skull)
            basic.showString("SCORE " + score)
        }
    }
})