export const sleep = (time: number) => {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve()
        }, time)
    })
}

export const isGeneratorFunction = (fn: Function) => {
    return Object.prototype.toString.call(fn) === '[object AsyncGeneratorFunction]'
}