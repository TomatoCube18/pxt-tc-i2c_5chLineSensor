/**
  * TC-MAKECODE-I2C-5CH_LineSensor
  */
  //% color="#275C6B" icon="\uf1ca weight=95 block="I2C-LineSensor"
namespace i2cLineSensor {
    let LINESENSOR_I2C_ADDR = 0x17 
    
    
    /**
     * Read IRs from 5 Channel Line Sensor.
     */
    //% blockId="linesensor_read_ir" block="i2c,IR(Binary)"
    //% weight=100 
    export function readIR(): number {
        
        // pins.i2cWriteNumber(
        //     LINESENSOR_I2C_ADDR,
        //     1,
        //     NumberFormat.UInt8BE,
        //     false
        // )
        // basic.pause(200)
        
        let readbuf = pins.i2cReadBuffer(LINESENSOR_I2C_ADDR, pins.sizeOf(NumberFormat.UInt8LE))
        let irReadings = Number(readbuf & 0x1F)

        return irReadings       
    }

    /**
     * Query IR from 5 Channel Line Sensor at position x.
     */
    //% blockId="is_line_detected"
    //% block="Is Line detected at %pos"
    //% pos.min=1 group.max=5
    //% weight=90 
    export function isLineDetected(pos: number): number {
        let readbuf = pins.i2cReadBuffer(LINESENSOR_I2C_ADDR, pins.sizeOf(NumberFormat.UInt8LE))
        return Number(((readbuf & (0x1 << (pos-1))) != 0 ))
    }
}
