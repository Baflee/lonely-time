package com.app.modules

import android.content.Context
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.Arguments

class ShakeDetectorModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext), SensorEventListener {

    private var sensorManager: SensorManager? = null
    private var accelerometer: Sensor? = null
    private var lastTime: Long = 0
    private var lastX: Float = 0f
    private var lastY: Float = 0f
    private var lastZ: Float = 0f
    private val SHAKE_THRESHOLD_NORMAL = 1200
    private val SHAKE_THRESHOLD_VIOLENT = 3000
    private val TIME_THRESHOLD = 100

    init {
        sensorManager = reactContext.getSystemService(Context.SENSOR_SERVICE) as SensorManager
        accelerometer = sensorManager?.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)
        sensorManager?.registerListener(this, accelerometer, SensorManager.SENSOR_DELAY_NORMAL)
    }

    override fun getName(): String {
        return "ShakeDetector"
    }

    private fun sendEvent(eventName: String, params: WritableMap?) {
        reactApplicationContext
            .getJSModule(RCTDeviceEventEmitter::class.java)
            .emit(eventName, params)
    }

    override fun onSensorChanged(event: SensorEvent?) {
        event?.let {
            val currentTime = System.currentTimeMillis()
            if ((currentTime - lastTime) > TIME_THRESHOLD) {
                val timeDifference = currentTime - lastTime
                lastTime = currentTime

                val x = it.values[0]
                val y = it.values[1]
                val z = it.values[2]

                val speed = Math.abs(x + y + z - lastX - lastY - lastZ) / timeDifference * 10000
                val params = Arguments.createMap()

                if (speed > SHAKE_THRESHOLD_VIOLENT) {
                    params.putString("type", "violent")
                    params.putString("message", "(Vous secouez trop fort le téléphone, votre animal de compagnie n'aime pas ça.)")
                } else if (speed > SHAKE_THRESHOLD_NORMAL) {
                    params.putString("type", "normal")
                    params.putString("message", "(Vous secouez votre téléphone pour jouer avec votre animal de compagnie !)")
                }

                sendEvent("onShake", params)

                lastX = x
                lastY = y
                lastZ = z
            }
        }
    }

    @ReactMethod
    fun addListener(eventType: String) {
                // Pas utilisé pour le moment
    }

    @ReactMethod
    fun removeListeners(count: Int) {
                // Pas utilisé pour le moment
    }

    override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {
        // Pas utilisé pour le moment
    }

    @ReactMethod
    fun startShakeDetection() {
        // La logique de démarrage pourrait être ajoutée ici si nécessaire
    }

    @ReactMethod
    fun stopShakeDetection() {
        sensorManager?.unregisterListener(this)
        // Autres nettoyages si nécessaire
    }
}