//% color="#006699" weight=100 icon="\uf042"
namespace funUtilities {
    //% block="play fun animation"
    //% blockId="fun_utils_animation"
    export function playAnimation(): void {
        basic.showLeds(`
            . # . # .
            . # . # .
            . . . . .
            # . . . #
            . # # # .
        `)
        basic.pause(500)
        basic.showLeds(`
            . # . # .
            . # . # .
            . . . . .
            . # # # .
            # . . . #
        `)
        basic.pause(500)
        basic.clearScreen()
    }

    //% block="flash LEDs %times times"
    //% blockId="fun_utils_flash"
    //% times.min=1 times.max=10
    export function flashLeds(times: number): void {
        for (let i = 0; i < times; i++) {
            basic.showIcon(IconNames.Heart)
            basic.pause(200)
            basic.clearScreen()
            basic.pause(200)
        }
    }
}
