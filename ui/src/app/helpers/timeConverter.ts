export function timeConvert(n: number) {
    let num = n;
    let hours = (num / 60);
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    return rhours ? rhours + 'ч ' + rminutes + ' мин' :  rminutes + ' мин';
}