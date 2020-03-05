NodeList.prototype.forEach = Array.prototype.forEach
HTMLCollection.prototype.forEach = Array.prototype.forEach
function elem(selector) {
    return document.querySelector(selector)
}
function elems(selector) {
    return document.querySelectorAll(selector)
}

function step(){
    var d = new Date()
    var seconds = d.getSeconds()
    var minutes = d.getMinutes()
    var hours = d.getHours()
    const fullseconds = 60
    const fullminutes = 60
    const fullminutes_seconds = 60*60
    const fullhours = 24/2
    const fullhours_seconds = fullhours*60*60
    const fulldeg = 360

//  var seconds_in_seconds = seconds;
    var minutes_frac = (
        (minutes*fullseconds + seconds) /
        (fullminutes_seconds)
    )
    var hours_frac = (
        (hours * fullminutes_seconds + minutes*fullseconds + seconds) /
        (fullhours_seconds)
    )

    var finger_seconds = elem('#seconds')
    var finger_minutes = elem('#minutes')
    var finger_hours = elem('#hours')

    var rot_fs = (seconds/fullseconds)*fulldeg
    finger_seconds.style.transform = 'rotateZ('+rot_fs+'deg)'

    var rot_fm = (
        fulldeg * minutes_frac
    )
    finger_minutes.style.transform = 'rotateZ('+rot_fm+'deg)'

    var rot_fh = (
        360 * hours_frac
    )
    finger_hours.style.transform = 'rotateZ('+rot_fh+'deg)'
}

window.setInterval(function(){
    window.requestAnimationFrame(function(){
        step();
    })
},  200);
