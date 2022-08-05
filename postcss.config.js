module.exports = {
    plugins: {
        'postcss-px-to-viewport': {
            unitToConvert: 'px',
            viewportWidth: 375, //Vant尺寸默认375
            unitPrecision: 5,
            propList: ['*'],
            viewportUnit: 'vw',
            fontViewportUnit: 'vw',
            selectorBlackList: [],
            minPixelValue: 1,
            mediaQuery: false,
            replace: true,
            exclude: undefined,
            // /node_modules\/[^@vant]/, //这里面的东西不转化 会被忽略 也可以undefined
            include: undefined,
            landscape: false,
            landscapeUnit: 'vw',
            landscapeWidth: 568
        },
    },
};