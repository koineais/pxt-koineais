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

    // --- タイマー機能 ---
    let __timerDurationSeconds = 60
    let __timerRemainingSeconds = 0
    let __timerRunning = false

    /**
     * タイマーの時間を設定します。
     * @param minutes 分（0-59）
     * @param seconds 秒（0-59）
     */
    //% block="タイマーを %minutes 分 %seconds 秒 に設定"
    //% blockId="fun_utils_settimer"
    //% minutes.min=0 minutes.max=59
    //% seconds.min=0 seconds.max=59
    export function setTimerDuration(minutes: number, seconds: number): void {
        __timerDurationSeconds = Math.max(0, minutes * 60 + seconds)
        __timerRemainingSeconds = __timerDurationSeconds
    }

    /**
     * タイマーを開始します（カウントダウン表示）。
     */
    //% block="タイマーを開始する"
    //% blockId="fun_utils_starttimer"
    export function startTimer(): void {
        if (__timerRunning) return
        __timerRunning = true
        if (__timerRemainingSeconds <= 0) __timerRemainingSeconds = __timerDurationSeconds
        control.inBackground(() => {
            while (__timerRunning && __timerRemainingSeconds > 0) {
                const mm = Math.floor(__timerRemainingSeconds / 60)
                const ss = __timerRemainingSeconds % 60
                const mmStr = mm < 10 ? "0" + mm : "" + mm
                const ssStr = ss < 10 ? "0" + ss : "" + ss
                basic.showString(mmStr + ":" + ssStr)
                basic.pause(1000)
                __timerRemainingSeconds--
            }
            if (__timerRunning && __timerRemainingSeconds <= 0) {
                // 終了通知（簡易）
                for (let i = 0; i < 4; i++) {
                    basic.showIcon(IconNames.Heart)
                    music.playTone(440, 150)
                    basic.pause(150)
                    basic.clearScreen()
                    basic.pause(150)
                }
            }
            __timerRunning = false
        })
    }

    /**
     * タイマーを停止します。
     */
    //% block="タイマーを停止する"
    //% blockId="fun_utils_stoptimer"
    export function stopTimer(): void {
        __timerRunning = false
    }

    /**
     * タイマーをリセットします（設定時間に戻す）。
     */
    //% block="タイマーをリセットする"
    //% blockId="fun_utils_resettimer"
    export function resetTimer(): void {
        __timerRemainingSeconds = __timerDurationSeconds
        basic.clearScreen()
    }
}
