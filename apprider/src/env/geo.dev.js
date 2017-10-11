/**
 * Created by wangxiaoqing on 2017/3/27.
 */
// let srcaddress = {"name":"江苏省常州市武进区常武南路801号","location":{"lng":119.96567445314993,"lat":31.689227533288225},"city":"常州市","district":"武进区","business":"鸣凰,湖塘镇","cityid":"320412"};
// let dstaddress = {"name":"江苏省南京市建邺区恒山路","location":{"lng":118.73533887812992,"lat":31.99993248960044},"city":"南京市","district":"建邺区","business":"沙洲,兴隆","cityid":"320105"};
// export const getcurrentaddress = ()=>{
//   return srcaddress;31.9931551257,118.7294151918
// };
let getRandomLocation =  (latitude, longitude, radiusInMeters)=>{

    var getRandomCoordinates =  (radius, uniform)=> {
        // Generate two random numbers
        var a = Math.random(),
            b = Math.random();

        // Flip for more uniformity.
        if (uniform) {
            if (b < a) {
                var c = b;
                b = a;
                a = c;
            }
        }

        // It's all triangles.
        return [
            b * radius * Math.cos(2 * Math.PI * a / b),
            b * radius * Math.sin(2 * Math.PI * a / b)
        ];
    };

    var randomCoordinates = getRandomCoordinates(radiusInMeters, true);

    // Earths radius in meters via WGS 84 model.
    var earth = 6378137;

    // Offsets in meters.
    var northOffset = randomCoordinates[0],
        eastOffset = randomCoordinates[1];

    // Offset coordinates in radians.
    var offsetLatitude = northOffset / earth,
        offsetLongitude = eastOffset / (earth * Math.cos(Math.PI * (latitude / 180)));

    // Offset position in decimal degrees.
    let result = {
        latitude: latitude + (offsetLatitude * (180 / Math.PI)),
        longitude: longitude + (offsetLongitude * (180 / Math.PI))
    }
    return [result.longitude,result.latitude];
};

let locationsz =[0,0];

export const getcurrentlocationfn = (fncallback)=> {
    window.setTimeout(()=>{
        locationsz = getRandomLocation(32.0429300000,118.7780400000,300);
        fncallback(locationsz);
        console.log(`0801获取地理位置`);
    },0);
}
