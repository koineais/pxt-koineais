//% color="#006699" weight=100 icon="\uf042" // カテゴリの色とアイコンを設定
namespace funUtilities {
    /**
     * micro:bitのLED全体で簡単なアニメーションを表示します。
     */
    //% block="play fun animation"
    //% blockId="fun_utils_animation"
    export function playAnimation(): void {
        basic.showLeds(`
            . # . # .
            . # . # .
            . . . . .
            # . . . #
            . # # # .
        `);
        basic.pause(500);
        basic.showLeds(`
            . # . # .
            . # . # .
            . . . . .
            . # # # .
            # . . . #
        `);
        basic.pause(500);
        basic.clearScreen();
    }

    /**
     * 指定された回数、LEDを点滅させます。
     * @param times 点滅回数、例: 3
     */
    //% block="flash LEDs %times times"
    //% blockId="fun_utils_flash"
    //% times.min=1 times.max=10 // 入力できる値の範囲を指定
    export function flashLeds(times: number): void {
        for (let i = 0; i < times; i++) {
            basic.showIcon(IconNames.Heart);
            basic.pause(200);
            basic.clearScreen();
            basic.pause(200);
        }
    }
}
