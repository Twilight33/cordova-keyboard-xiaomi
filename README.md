# Keyboard Back Repro

## Issue

On a Xiaomi device, pressing the system Back button or gesture while the soft keyboard is open can also deliver a Cordova `backbutton` event to the app. In the observed test, the keyboard closes and the app receives one event; on other tested phones, the keyboard closes without a Cordova event. This project is a minimal reproduction for comparing that behavior across devices.

The demo displays a `backbutton` event counter and a simulated view level, making it easy to see whether a keyboard-dismiss press was also delivered to the app. The simulated view level does not perform real page navigation.

## Project profile

- Cordova Android platform: 15.1.0
- Android target SDK: 36
- Edge-to-edge layout: enabled
- App ID: `org.example.keyboardbackrepro`
- App name: Keyboard Back Repro
- Web content: one text input and a small Back-event/view-level diagnostic

## Build

Prerequisites: Cordova CLI 13, Node.js 20.17 or newer, Java 17 or newer, Android SDK with API 36 installed, and a working Android Gradle setup.

From this directory:

1. Install the Android platform: `cordova platform add android@15.1.0`
2. Confirm requirements: `cordova requirements android`
3. Build a debug APK: `cordova build android`
4. Install on a connected device: `cordova run android --device`

The platform version is pinned in the project configuration; do not upgrade it when preparing a report unless testing a separate version.

## Reproduction

1. Install the debug build on the Xiaomi phone. Record its Android version, API level, and MIUI/HyperOS version.
2. Open the app and tap **Reset test**.
3. Tap the text field and wait until the on-screen keyboard is fully visible.
4. Press the device’s system Back button or perform its Back gesture exactly once.
5. Note whether the keyboard closes, whether the app view changes, and the values of **Back events** and **Demo view**.
6. Repeat with the keyboard hidden as a control, then tap **Reset test** and repeat while the keyboard is visible.

Expected for the keyboard-first press: the keyboard closes, **Back events** remains 0, and **Demo view** remains 3 / 3. If a Cordova `backbutton` event is delivered, the counter increases and the demo view moves back one level per event. A jump of two levels from one press indicates two events reached the sample listener. This simulated view level is deliberately local and does not perform real page navigation.

## Details to include in a report

- Cordova CLI and `cordova-android` platform versions
- Device manufacturer/model (optional if anonymizing), Android release/API level, and MIUI/HyperOS version
- Navigation mode (gesture or three-button)
- Whether the keyboard was visible and the input was focused before pressing Back
- Result after one press: keyboard state, Back-event count, and demo view level
- Whether the behavior reproduces on another device or emulator
- Logcat output around the reproduction, after reviewing it for private information

