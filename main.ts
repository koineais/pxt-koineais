//% color="#006699" weight=100 icon="\uf042"
namespace funUtilities {
    // 標準の表示用関数（ブロック非表示）
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

    export function flashLeds(times: number): void {
        for (let i = 0; i < times; i++) {
            basic.showIcon(IconNames.Heart)
            basic.pause(200)
            basic.clearScreen()
            basic.pause(200)
        }
    }

    // --- リアルタイム時計機能 ---
    let __clockOffsetSeconds = 0
    let __clockRunning = false

    /**
     * 時計の現在時刻を設定します（micro:bit起動からのオフセットを計算します）。
     * @param hours 時（0-23）
     * @param minutes 分（0-59）
     */
    //% block="set clock to %hours : %minutes"
    //% blockId="fun_utils_setclock"
    //% hours.min=0 hours.max=23
    //% minutes.min=0 minutes.max=59
    export function setClock(hours: number, minutes: number): void {
        const nowSec = Math.floor(input.runningTime() / 1000)
        __clockOffsetSeconds = hours * 3600 + minutes * 60 - nowSec
    }

    /**
     * 時計の表示を開始します（バックグラウンドで更新）。
     */
    //% block="start clock"
    //% blockId="fun_utils_startclock"
    export function startClock(): void {
        if (__clockRunning) return
        __clockRunning = true
        control.inBackground(() => {
            while (__clockRunning) {
                const s = Math.floor(input.runningTime() / 1000 + __clockOffsetSeconds)
                const hh = Math.floor(s / 3600) % 24
                const mm = Math.floor(s / 60) % 60
                const hhStr = hh < 10 ? "0" + hh : "" + hh
                const mmStr = mm < 10 ? "0" + mm : "" + mm
                basic.showString(hhStr + ":" + mmStr)
                // 次の分の開始まで待つ（経過秒に応じて調整）
                const elapsedSec = s % 60
                const waitMs = (60 - elapsedSec) * 1000
                basic.pause(waitMs)
            }
        })
    }

    /**
     * 時計の表示を停止します。
     */
    //% block="stop clock"
    //% blockId="fun_utils_stopclock"
    export function stopClock(): void {
        __clockRunning = false
        basic.clearScreen()
    }
}
