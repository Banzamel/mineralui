import {mineralPackageEdition} from './packageEdition'

declare global {
    interface Window {
        __MINERAL_PRO_ACTIVATED__?: boolean
        __MINERAL_PRO_ACTIVATION_WARNING_SHOWN__?: boolean
    }
}

function shouldShowMineralProActivationWarning() {
    if (mineralPackageEdition !== 'pro') {
        return false
    }

    if (typeof window === 'undefined') {
        return false
    }

    if (window.__MINERAL_PRO_ACTIVATED__ === true) {
        return false
    }

    if (window.__MINERAL_PRO_ACTIVATION_WARNING_SHOWN__ === true) {
        return false
    }

    return true
}

function showMineralProActivationWarning() {
    if (!shouldShowMineralProActivationWarning()) {
        return
    }

    window.__MINERAL_PRO_ACTIVATION_WARNING_SHOWN__ = true

    console.warn(
        [
            '[MineralUI Pro] This project is using the private Pro package, but the installation is not registered yet.',
            'Run `node ./node_modules/@banzamel/mineralui-pro/bin/mineralui-pro.js activate --license-key=YOUR_LICENSE_KEY` to register this project in your license portal.',
        ].join(' ')
    )
}

showMineralProActivationWarning()

export {}
