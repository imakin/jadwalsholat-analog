NodeList.prototype.forEach = Array.prototype.forEach
HTMLCollection.prototype.forEach = Array.prototype.forEach
function elem(selector) {
    return document.querySelector(selector)
}
function elems(selector) {
    return document.querySelectorAll(selector)
}

var verbose = false;
var alarm_iqomah_time = 10;
var alarm_warn_th = 30 + alarm_iqomah_time;

const months = ["januari","februari","maret","april","mei",
"juni","juli","agustus","september","oktober","november","desember"]
function jadwalstr_to_minutes(str) {
    var times = str.split(':')
    var h = parseInt(times[0],10);
    var m = parseInt(times[1],10);
    return h*60+m;
}
//today
function get_jadwal_sholat(date) {
    var jadwalmonth = jadwal[ months[date.getMonth()] ];
    var jadwaltoday = jadwalmonth[ date.getDay()+1 ];
    return jadwaltoday;
}

function get_closest_jadwal(date) {
    var jadwals = get_jadwal_sholat(date);
    var current_time_in_minutes = date.getHours()*60+date.getMinutes()
    for (key in jadwals) {
        var v = jadwals[key];
        var v_in_minutes = jadwalstr_to_minutes(v) + alarm_iqomah_time;
        if (verbose) {
            console.log('v_in_minutes '+v_in_minutes)
            console.log('current_time_in_minutes '+current_time_in_minutes)
            console.log('(v_in_minutes - current_time_in_minutes) < alarm_warn_th '+
                ((v_in_minutes - current_time_in_minutes) < alarm_warn_th))
            console.log("current_time_in_minutes < v_in_minutes: "+ (current_time_in_minutes < v_in_minutes))
        }
        if (current_time_in_minutes < v_in_minutes) {
            if ((v_in_minutes - current_time_in_minutes) < alarm_warn_th) {
                return v;
            }
        }
    }
    return null;
}

function alarm_pie_set(degree_pos,degree_len) {
    var alarm_pie = elem('#pie-jadwalsholat');
    var alarm_pie_inner = elem('#pie-jadwalsholat .pie-inner');


    var skew = 90 - degree_len
    degree_pos += 90 // pie-inner rotation starts from 9o clock
    alarm_pie_inner.style.transform =
        "rotate("+degree_pos+"deg) skew("+skew+"deg)"
}

function step(d){
    // var d = new Date()
    if (d==null) {
        d = new Date();
    }
    var seconds = d.getSeconds()
    var minutes = d.getMinutes()
    var hours = d.getHours()
    const fullseconds = 60
    const fullminutes = 60
    const fullminutes_seconds = 60*60
    const fullhours = 24/2
    const fullhours_seconds = fullhours*60*60
    const fulldeg = 360
    var current_time_in_minutes = hours*60+minutes //for jadwal sholat

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

    var alarm_pie = elem('#pie-jadwalsholat');
    var alarm_pie_inner = elem('#pie-jadwalsholat .pie-inner');
    var closest_jadwal = get_closest_jadwal(d);
    if (closest_jadwal) {
        var min = parseInt(closest_jadwal.split(':')[1], 10)
        var minute_deg = 360*min/60;
        alarm_pie_set(minute_deg, (360*alarm_iqomah_time/60))

        alarm_pie_inner.style.backgroundColor = "rgb(230,230,30)"
    }
    else {
        alarm_pie_inner.style.backgroundColor = "rgb(250,250,250)"
    }
}

var interval_clock = window.setInterval(function(){
    window.requestAnimationFrame(function(){
        step();
    })
},  200);


test_date = new Date()
test_date.setHours(14)
test_date.setMinutes(50)
// clearInterval(interval_clock)
