const get_my_timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
var audio = new Audio("https://files.paraffin-tutorials.ir/headinfo/sound/clock.mp3");
var Embed = [];
var embedToAdd = {
    type: "rich",
};
// Counter
function voicetochat() {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let container2 = document.querySelector(".container2");
    let p = document.createElement("p");
    p.setAttribute("contenteditable", "true");
    let span = document.createElement("span");
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.start();
    recognition.addEventListener("end", recognition.start);
    recognition.addEventListener("result", (e) => {
        container2.appendChild(p);
        let transcript = Array.from(e.results).map((result) => {
            return result[0];
        }).map((result) => {
            return result.transcript;
        }).join(" ");
        if (transcript.includes("انگلیسی تایپ کن") && e.results[0].isFinal) {
            recognition.stop();
            recognition.lang = "en-US";
            transcript = "";
            p = document.createElement("p");
            p.setAttribute("contenteditable", "true");
            p.setAttribute("dir", "ltr");
            container2.appendChild(p);
        }
        if (transcript.includes("type in Persian") && e.results[0].isFinal) {
            recognition.stop();
            recognition.lang = "fa-IR";
            transcript = "";
            p = document.createElement("p");
            p.setAttribute("contenteditable", "true");
            p.setAttribute("dir", "rtl");
            container2.appendChild(p);
        }
        if (transcript.includes("علامت سوال")) {
            transcript = transcript.replace("علامت سوال", "؟");
        }
        if (transcript.includes("علامت تعجب")) {
            transcript = transcript.replace("علامت تعجب", "!");
        }
        if (transcript.includes("ویرگول")) {
            transcript = transcript.replace("ویرگول", "،");
        }
        if (transcript.includes("نقطه")) {
            transcript = transcript.replace("نقطه", ".");
        }
        if (transcript.includes("خط بعدی") && e.results[0].isFinal) {
            transcript = "";
            p = document.createElement("p");
            p.setAttribute("contenteditable", "true");
            container2.appendChild(p);
        }
        span.textContent = transcript + " ";
        p.appendChild(span);
        if (e.results[0].isFinal) {
            span = document.createElement("span");
            p.appendChild(span);
        }
        if (transcript.includes("صفحه پاک شود") && e.results[0].isFinal) {
            container2.innerHTML = "";
            p.innerHTML = "";
        }
        if (transcript.includes("question mark")) {
            transcript = transcript.replace("question mark", "؟");
        }
        if (transcript.includes("exclamation mark")) {
            transcript = transcript.replace("exclamation mark", "!");
        }
        if (transcript.includes("comma")) {
            transcript = transcript.replace("comma", "،");
        }
        if (transcript.includes("full stop")) {
            transcript = transcript.replace("full stop", ".");
        }
        if (transcript.includes("next line") && e.results[0].isFinal) {
            transcript = "";
            p = document.createElement("p");
            p.setAttribute("contenteditable", "true");
            container2.appendChild(p);
        }
        if (e.results[0].isFinal) {
            span = document.createElement("span");
            p.appendChild(span);
        }
        if (transcript.includes("clear page") && e.results[0].isFinal) {
            container2.innerHTML = "";
            p.innerHTML = "";
        }
    });
}
// Scripts
$(document).on("ready", function () {
    $(".field").on("focus", function () {
        $("body").addClass("is-focus");
    });
    $(".field").on("blur", function () {
        $("body").removeClass("is-focus is-type");
    });
});
$(function () {
    $(".header-link").click(function () {
        $(".header-link").removeClass("active");
        $(this).addClass("active");
    });
});
// ------------------------------------------------- Scripts ------------------------------------------------- //
function your_timezone_f() {
    document.getElementById("search_time").placeholder = `Enter The Timezone (${get_my_timezone})`;
}
your_timezone_f();
// ------------------------------------------------- clock ------------------------------------------------- //
function for_clock(my_timezone) {
    /** Our wonderfull little clock **/
    class Clock {
        /**
         * Clock initialization
         */
        constructor() {
            this.hourHand = document.querySelector(".hour.hand");
            this.minuteHand = document.querySelector(".minute.hand");
            this.secondHand = document.querySelector(".second.hand");
            this.timer();
            setInterval(() => this.timer(), 1000);
        }
        /**
         * Timer of the clock
         */
        timer() {
            this.sethandRotation("hour");
            this.sethandRotation("minute");
            this.sethandRotation("second");
        }
        /**
         * Changes the rotation of the hands of the clock
         * @param  {HTMLElement} hand   One of the hand of the clock
         * @param  {number}      degree degree of rotation of the hand
         */
        sethandRotation(hand) {
            let date = moment().tz(my_timezone),
                hours, minutes, seconds, percentage, degree;
            switch (hand) {
                case "hour":
                    hours = date.hour();
                    hand = this.hourHand;
                    percentage = this.numberToPercentage(hours, 12);
                    break;
                case "minute":
                    minutes = date.minute();
                    hand = this.minuteHand;
                    percentage = this.numberToPercentage(minutes, 60);
                    break;
                case "second":
                    seconds = date.second();
                    hand = this.secondHand;
                    percentage = this.numberToPercentage(seconds, 60);
                    //   if(!jQuery("time-box").hasClass('hide')) {
                    //    this.sound.play();
                    //   }
                    break;
            }
            degree = this.percentageToDegree(percentage);
            hand.style.transform = `rotate(${degree}deg) translate(-50%, -50%)`;
        }
        /**
         * Converting a number to a percentage
         * @param  {number} number Number
         * @param  {number} max    Maximum value of the number
         * @return {number}        Return a percentage
         */
        numberToPercentage(number = 0, max = 60) {
            return (number / max) * 100;
        }
        /**
         * Converting a percentage to a degree
         * @param  {number} percentage Percentage
         * @return {number}            Return a degree
         */
        percentageToDegree(percentage = 0) {
            return (percentage * 360) / 100;
        }
    }
    let clock = new Clock();
}

function showTime() {
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    var session = "AM";
    if (h == 0) {
        h = 12;
    }
    if (h > 12) {
        h = h - 12;
        session = "PM";
    }
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    var time = h + ":" + m + ":" + s + " " + session;
    document.getElementById("profile-clock").innerText = time;
    document.getElementById("profile-clock").textContent = time;
    setTimeout(showTime, 1000);
}
for_clock(get_my_timezone);
showTime();
// ------------------------------------------------- Scripts ------------------------------------------------- //
home_btn.addEventListener("click", function () {
    audio.pause();
    $(".home-box").addClass("hide");
    $(".calendar-box").addClass("hide");
    $(".ip-box").addClass("hide");
    $(".today-box").addClass("hide");
    $(".other-box").addClass("hide");
    $(".setting-box").addClass("hide");
    $(".time-box").addClass("hide");
    $(".pastep-box").addClass("hide");
    $(".brand-box").addClass("hide");
    $(".discord-box").addClass("hide");
    $(".youtube-box").addClass("hide");
    $(".qrcode-box").addClass("hide");
    $(".color-box").addClass("hide");
    $(".team-box").addClass("hide");
    $(".calendar-box").addClass("hide");
    $(".vtoc-box").addClass("hide");
    $(".discord-token-generator-box").addClass("hide");
    $(".loading-box").removeClass("hide");
    setTimeout(() => {
        $(".loading-box").addClass("hide");
        $(".home-box").removeClass("hide");
    }, 1500);
});
home_btn2.addEventListener("click", function () {
    audio.pause();
    $(".home-box").addClass("hide");
    $(".calendar-box").addClass("hide");
    $(".ip-box").addClass("hide");
    $(".today-box").addClass("hide");
    $(".other-box").addClass("hide");
    $(".setting-box").addClass("hide");
    $(".time-box").addClass("hide");
    $(".pastep-box").addClass("hide");
    $(".brand-box").addClass("hide");
    $(".discord-box").addClass("hide");
    $(".youtube-box").addClass("hide");
    $(".qrcode-box").addClass("hide");
    $(".color-box").addClass("hide");
    $(".team-box").addClass("hide");
    $(".calendar-box").addClass("hide");
    $(".vtoc-box").addClass("hide");
    $(".discord-token-generator-box").addClass("hide");
    $(".loading-box").removeClass("hide");
    setTimeout(() => {
        $(".loading-box").addClass("hide");
        $(".home-box").removeClass("hide");
    }, 1500);
});
vtoc_btn.addEventListener("click", function () {
    audio.pause();
    voicetochat();
    $(".home-box").addClass("hide");
    $(".calendar-box").addClass("hide");
    $(".ip-box").addClass("hide");
    $(".today-box").addClass("hide");
    $(".other-box").addClass("hide");
    $(".time-box").addClass("hide");
    $(".pastep-box").addClass("hide");
    $(".brand-box").addClass("hide");
    $(".discord-box").addClass("hide");
    $(".youtube-box").addClass("hide");
    $(".qrcode-box").addClass("hide");
    $(".color-box").addClass("hide");
    $(".team-box").addClass("hide");
    $(".calendar-box").addClass("hide");
    $(".vtoc-box").addClass("hide");
    $(".discord-token-generator-box").addClass("hide");
    $(".loading-box").removeClass("hide");
    setTimeout(() => {
        $(".loading-box").addClass("hide");
        $(".vtoc-box").removeClass("hide");
    }, 1500);
});
pastep_btn.addEventListener("click", function () {
    audio.pause();
    voicetochat();
    $(".home-box").addClass("hide");
    $(".calendar-box").addClass("hide");
    $(".ip-box").addClass("hide");
    $(".today-box").addClass("hide");
    $(".other-box").addClass("hide");
    $(".time-box").addClass("hide");
    $(".pastep-box").addClass("hide");
    $(".brand-box").addClass("hide");
    $(".discord-box").addClass("hide");
    $(".youtube-box").addClass("hide");
    $(".qrcode-box").addClass("hide");
    $(".color-box").addClass("hide");
    $(".team-box").addClass("hide");
    $(".calendar-box").addClass("hide");
    $(".vtoc-box").addClass("hide");
    $(".discord-token-generator-box").addClass("hide");
    $(".loading-box").removeClass("hide");
    setTimeout(() => {
        $(".loading-box").addClass("hide");
        $(".pastep-box").removeClass("hide");
    }, 1500);
});
ip_btn.addEventListener("click", function () {
    audio.pause();
    $(".home-box").addClass("hide");
    $(".calendar-box").addClass("hide");
    $(".ip-box").addClass("hide");
    $(".today-box").addClass("hide");
    $(".other-box").addClass("hide");
    $(".setting-box").addClass("hide");
    $(".time-box").addClass("hide");
    $(".pastep-box").addClass("hide");
    $(".brand-box").addClass("hide");
    $(".discord-box").addClass("hide");
    $(".youtube-box").addClass("hide");
    $(".qrcode-box").addClass("hide");
    $(".color-box").addClass("hide");
    $(".team-box").addClass("hide");
    $(".calendar-box").addClass("hide");
    $(".loading-box").removeClass("hide");
    setTimeout(() => {
        $(".loading-box").addClass("hide");
        $(".ip-box").removeClass("hide");
    }, 1500);
});
today_btn.addEventListener("click", function () {
    audio.pause();
    $(".home-box").addClass("hide");
    $(".calendar-box").addClass("hide");
    $(".ip-box").addClass("hide");
    $(".today-box").addClass("hide");
    $(".other-box").addClass("hide");
    $(".setting-box").addClass("hide");
    $(".time-box").addClass("hide");
    $(".pastep-box").addClass("hide");
    $(".brand-box").addClass("hide");
    $(".discord-box").addClass("hide");
    $(".youtube-box").addClass("hide");
    $(".qrcode-box").addClass("hide");
    $(".color-box").addClass("hide");
    $(".team-box").addClass("hide");
    $(".calendar-box").addClass("hide");
    $(".loading-box").removeClass("hide");
    setTimeout(() => {
        $(".loading-box").addClass("hide");
        $(".today-box").removeClass("hide");
    }, 1500);
});
options_btn.addEventListener("click", function () {
    audio.pause();
    $(".home-box").addClass("hide");
    $(".calendar-box").addClass("hide");
    $(".ip-box").addClass("hide");
    $(".today-box").addClass("hide");
    $(".other-box").addClass("hide");
    $(".setting-box").addClass("hide");
    $(".time-box").addClass("hide");
    $(".pastep-box").addClass("hide");
    $(".brand-box").addClass("hide");
    $(".discord-box").addClass("hide");
    $(".youtube-box").addClass("hide");
    $(".qrcode-box").addClass("hide");
    $(".color-box").addClass("hide");
    $(".team-box").addClass("hide");
    $(".calendar-box").addClass("hide");
    $(".vtoc-box").addClass("hide");
    $(".discord-token-generator-box").addClass("hide");
    $(".loading-box").removeClass("hide");
    setTimeout(() => {
        $(".loading-box").addClass("hide");
        $(".other-box").removeClass("hide");
    }, 1500);
});
discord_token_generator_btn.addEventListener("click", function () {
    audio.pause();
    $(".home-box").addClass("hide");
    $(".calendar-box").addClass("hide");
    $(".ip-box").addClass("hide");
    $(".today-box").addClass("hide");
    $(".other-box").addClass("hide");
    $(".setting-box").addClass("hide");
    $(".time-box").addClass("hide");
    $(".pastep-box").addClass("hide");
    $(".brand-box").addClass("hide");
    $(".discord-box").addClass("hide");
    $(".youtube-box").addClass("hide");
    $(".qrcode-box").addClass("hide");
    $(".color-box").addClass("hide");
    $(".team-box").addClass("hide");
    $(".calendar-box").addClass("hide");
    $(".vtoc-box").addClass("hide");
    $(".discord-token-generator-box").addClass("hide");
    $(".loading-box").removeClass("hide");
    setTimeout(() => {
        $(".loading-box").addClass("hide");
        $(".discord-token-generator-box").removeClass("hide");
    }, 1500);
});
branding_btn.addEventListener("click", function () {
    audio.pause();
    $(".home-box").addClass("hide");
    $(".calendar-box").addClass("hide");
    $(".ip-box").addClass("hide");
    $(".today-box").addClass("hide");
    $(".other-box").addClass("hide");
    $(".setting-box").addClass("hide");
    $(".time-box").addClass("hide");
    $(".pastep-box").addClass("hide");
    $(".brand-box").addClass("hide");
    $(".discord-box").addClass("hide");
    $(".youtube-box").addClass("hide");
    $(".qrcode-box").addClass("hide");
    $(".color-box").addClass("hide");
    $(".team-box").addClass("hide");
    $(".calendar-box").addClass("hide");
    $(".vtoc-box").addClass("hide");
    $(".discord-token-generator-box").addClass("hide");
    $(".loading-box").removeClass("hide");
    setTimeout(() => {
        $(".loading-box").addClass("hide");
        $(".brand-box").removeClass("hide");
    }, 1500);
});
setting_btn.addEventListener("click", function () {
    audio.pause();
    $(".home-box").addClass("hide");
    $(".calendar-box").addClass("hide");
    $(".ip-box").addClass("hide");
    $(".today-box").addClass("hide");
    $(".other-box").addClass("hide");
    $(".setting-box").addClass("hide");
    $(".time-box").addClass("hide");
    $(".pastep-box").addClass("hide");
    $(".brand-box").addClass("hide");
    $(".discord-box").addClass("hide");
    $(".youtube-box").addClass("hide");
    $(".qrcode-box").addClass("hide");
    $(".color-box").addClass("hide");
    $(".team-box").addClass("hide");
    $(".calendar-box").addClass("hide");
    $(".vtoc-box").addClass("hide");
    $(".discord-token-generator-box").addClass("hide");
    $(".loading-box").removeClass("hide");
    setTimeout(() => {
        $(".loading-box").addClass("hide");
        $(".setting-box").removeClass("hide");
    }, 1500);
});
time_btn.addEventListener("click", function () {
    $(".home-box").addClass("hide");
    $(".calendar-box").addClass("hide");
    $(".ip-box").addClass("hide");
    $(".today-box").addClass("hide");
    $(".other-box").addClass("hide");
    $(".setting-box").addClass("hide");
    $(".time-box").addClass("hide");
    $(".pastep-box").addClass("hide");
    $(".brand-box").addClass("hide");
    $(".discord-box").addClass("hide");
    $(".youtube-box").addClass("hide");
    $(".qrcode-box").addClass("hide");
    $(".color-box").addClass("hide");
    $(".team-box").addClass("hide");
    $(".calendar-box").addClass("hide");
    $(".vtoc-box").addClass("hide");
    $(".discord-token-generator-box").addClass("hide");
    $(".loading-box").removeClass("hide");
    setTimeout(() => {
        $(".loading-box").addClass("hide");
        $(".time-box").removeClass("hide");
        audio.play();
    }, 1500);
});
qrcode_box_btn.addEventListener("click", function () {
    audio.pause();
    $(".home-box").addClass("hide");
    $(".calendar-box").addClass("hide");
    $(".ip-box").addClass("hide");
    $(".today-box").addClass("hide");
    $(".other-box").addClass("hide");
    $(".setting-box").addClass("hide");
    $(".time-box").addClass("hide");
    $(".pastep-box").addClass("hide");
    $(".brand-box").addClass("hide");
    $(".discord-box").addClass("hide");
    $(".youtube-box").addClass("hide");
    $(".qrcode-box").addClass("hide");
    $(".color-box").addClass("hide");
    $(".team-box").addClass("hide");
    $(".calendar-box").addClass("hide");
    $(".vtoc-box").addClass("hide");
    $(".discord-token-generator-box").addClass("hide");
    $(".loading-box").removeClass("hide");
    setTimeout(() => {
        $(".loading-box").addClass("hide");
        $(".qrcode-box").removeClass("hide");
    }, 1500);
});
color_box_btn.addEventListener("click", function () {
    audio.pause();
    $(".home-box").addClass("hide");
    $(".calendar-box").addClass("hide");
    $(".ip-box").addClass("hide");
    $(".today-box").addClass("hide");
    $(".other-box").addClass("hide");
    $(".setting-box").addClass("hide");
    $(".time-box").addClass("hide");
    $(".pastep-box").addClass("hide");
    $(".brand-box").addClass("hide");
    $(".discord-box").addClass("hide");
    $(".youtube-box").addClass("hide");
    $(".qrcode-box").addClass("hide");
    $(".color-box").addClass("hide");
    $(".team-box").addClass("hide");
    $(".calendar-box").addClass("hide");
    $(".vtoc-box").addClass("hide");
    $(".discord-token-generator-box").addClass("hide");
    $(".loading-box").removeClass("hide");
    setTimeout(() => {
        $(".loading-box").addClass("hide");
        $(".color-box").removeClass("hide");
    }, 1500);
});
calendar_btn.addEventListener("click", function () {
    audio.pause();
    $(".home-box").addClass("hide");
    $(".calendar-box").addClass("hide");
    $(".ip-box").addClass("hide");
    $(".today-box").addClass("hide");
    $(".other-box").addClass("hide");
    $(".setting-box").addClass("hide");
    $(".time-box").addClass("hide");
    $(".pastep-box").addClass("hide");
    $(".brand-box").addClass("hide");
    $(".discord-box").addClass("hide");
    $(".youtube-box").addClass("hide");
    $(".qrcode-box").addClass("hide");
    $(".color-box").addClass("hide");
    $(".team-box").addClass("hide");
    $(".calendar-box").addClass("hide");
    $(".vtoc-box").addClass("hide");
    $(".discord-token-generator-box").addClass("hide");
    $(".loading-box").removeClass("hide");
    setTimeout(() => {
        $(".loading-box").addClass("hide");
        $(".calendar-box").removeClass("hide");
    }, 1500);
});
discord_btn.addEventListener("click", function () {
    audio.pause();
    $(".home-box").addClass("hide");
    $(".calendar-box").addClass("hide");
    $(".ip-box").addClass("hide");
    $(".today-box").addClass("hide");
    $(".other-box").addClass("hide");
    $(".setting-box").addClass("hide");
    $(".time-box").addClass("hide");
    $(".pastep-box").addClass("hide");
    $(".brand-box").addClass("hide");
    $(".discord-box").addClass("hide");
    $(".youtube-box").addClass("hide");
    $(".qrcode-box").addClass("hide");
    $(".color-box").addClass("hide");
    $(".team-box").addClass("hide");
    $(".calendar-box").addClass("hide");
    $(".vtoc-box").addClass("hide");
    $(".discord-token-generator-box").addClass("hide");
    $(".loading-box").removeClass("hide");
    setTimeout(() => {
        $(".loading-box").addClass("hide");
        $(".discord-box").removeClass("hide");
    }, 1500);
});
discord_info_btn.addEventListener("click", function () {
    audio.pause();
    $(".home-box").addClass("hide");
    $(".calendar-box").addClass("hide");
    $(".ip-box").addClass("hide");
    $(".today-box").addClass("hide");
    $(".other-box").addClass("hide");
    $(".setting-box").addClass("hide");
    $(".time-box").addClass("hide");
    $(".pastep-box").addClass("hide");
    $(".brand-box").addClass("hide");
    $(".discord-box").addClass("hide");
    $(".youtube-box").addClass("hide");
    $(".qrcode-box").addClass("hide");
    $(".color-box").addClass("hide");
    $(".team-box").addClass("hide");
    $(".calendar-box").addClass("hide");
    $(".vtoc-box").addClass("hide");
    $(".discord-token-generator-box").addClass("hide");
    $(".loading-box").removeClass("hide");
    setTimeout(() => {
        $(".loading-box").addClass("hide");
        $(".discord-info-box").removeClass("hide");
    }, 1500);
});
youtube_btn.addEventListener("click", function () {
    audio.pause();
    $(".home-box").addClass("hide");
    $(".calendar-box").addClass("hide");
    $(".ip-box").addClass("hide");
    $(".today-box").addClass("hide");
    $(".other-box").addClass("hide");
    $(".setting-box").addClass("hide");
    $(".time-box").addClass("hide");
    $(".pastep-box").addClass("hide");
    $(".brand-box").addClass("hide");
    $(".discord-box").addClass("hide");
    $(".youtube-box").addClass("hide");
    $(".qrcode-box").addClass("hide");
    $(".color-box").addClass("hide");
    $(".team-box").addClass("hide");
    $(".calendar-box").addClass("hide");
    $(".vtoc-box").addClass("hide");
    $(".discord-token-generator-box").addClass("hide");
    $(".loading-box").removeClass("hide");
    setTimeout(() => {
        $(".loading-box").addClass("hide");
        $(".youtube-box").removeClass("hide");
    }, 1500);
});
search_btn_time.addEventListener("click", function () {
    var content_timezone = $("#search_time").val();
    if (content_timezone === "") {
        $.notify({
            title: "<strong>Error</strong>",
            message: "<br>Please enter some TIME_ZONE in the box.",
            icon: "fas fa-exclamation-triangle",
        }, {
            type: "danger",
            allow_dismiss: true,
            delay: 3000,
            placement: {
                from: "bottom",
                align: "right",
            },
        });
    }
    else {
        function for_clock_2(my_timezone) {
            /** Our wonderfull little clock **/
            class Clock2 {
                /**
                 * Clock initialization
                 */
                constructor() {
                    this.hourHand = document.querySelector(".hour2.hand");
                    this.minuteHand = document.querySelector(".minute2.hand");
                    this.secondHand = document.querySelector(".second2.hand");
                    this.timer();
                    setInterval(() => this.timer(), 1000);
                }
                /**
                 * Timer of the clock
                 */
                timer() {
                    this.sethandRotation("hour");
                    this.sethandRotation("minute");
                    this.sethandRotation("second");
                }
                /**
                 * Changes the rotation of the hands of the clock
                 * @param  {HTMLElement} hand   One of the hand of the clock
                 * @param  {number}      degree degree of rotation of the hand
                 */
                sethandRotation(hand) {
                    let date = moment().tz(my_timezone),
                        hours, minutes, seconds, percentage, degree;
                    switch (hand) {
                        case "hour":
                            hours = date.hour();
                            hand = this.hourHand;
                            percentage = this.numberToPercentage(hours, 12);
                            break;
                        case "minute":
                            minutes = date.minute();
                            hand = this.minuteHand;
                            percentage = this.numberToPercentage(minutes, 60);
                            break;
                        case "second":
                            seconds = date.second();
                            hand = this.secondHand;
                            percentage = this.numberToPercentage(seconds, 60);
                            //   if(!jQuery("time-box").hasClass('hide')) {
                            //    this.sound.play();
                            //   }
                            break;
                    }
                    degree = this.percentageToDegree(percentage);
                    hand.style.transform = `rotate(${degree}deg) translate(-50%, -50%)`;
                }
                /**
                 * Converting a number to a percentage
                 * @param  {number} number Number
                 * @param  {number} max    Maximum value of the number
                 * @return {number}        Return a percentage
                 */
                numberToPercentage(number = 0, max = 60) {
                    return (number / max) * 100;
                }
                /**
                 * Converting a percentage to a degree
                 * @param  {number} percentage Percentage
                 * @return {number}            Return a degree
                 */
                percentageToDegree(percentage = 0) {
                    return (percentage * 360) / 100;
                }
            }
            let clock2 = new Clock2();
        }
        $(".clock-parent").addClass("hide");
        $(".clock-parent-2").removeClass("hide");
        for_clock_2(content_timezone);
    }
});
// discord js scripts
(function (fetcher) {
    if (!fetcher) alert("Warning: Fetch is not available for your browser. Check if you aren't using Internet Explorer or an older version of your browser.");
    var urlBox = document.getElementById("wh-url");
    var send = document.getElementById("wh-send");
    var wh_content = document.getElementById("wh-content");
    send.addEventListener("click", function () {
        var url = urlBox.value;
        if (!fetcher) return alert("Fetch is not available for your browser. Check if you aren't using Internet Explorer or an older version of your browser.");
        var nick = $("#wh-username").val();
        if (nick.length > 32) return alert("Please ensure the webhook nickname does not have more than 32 characters.");
        if (/clyde/i.test(nick)) return alert("Nickname cannot contain Clyde :(");
        var avatar = $("#wh-avatar-url").val();
        var content = $("#wh-content").val() || "​";
        if (content.length > 2000) return alert("Please ensure the message content does not have more than 2000 characters.");
        var embedz = [];
        var returnable = "";
        var embedToAdd = {
            type: "rich",
        };
        var embedNum = "1";
        var title = $("#wh-title").val();
        var shouldreturn = false;
        if (title.length > 256) {
            returnable += "- Please ensure the title at embed " + embedNum + " does not have more than 256 characters.\n";
            shouldreturn = true;
        }
        var author = $("#wh-author").val();
        if (author.length > 256) {
            returnable += "- Please ensure the author at embed " + embedNum + " does not have more than 256 characters.\n";
            shouldreturn = true;
        }
        var authorIcon = $("#wh-author-icon").val();
        var authorUrl = $("#wh-author-url").val();
        var thumbnail = $("#wh-thumbnail").val();
        if (thumbnail.length > 2048) {
            returnable += "- Please ensure the thumbnail URL at embed " + embedNum + " does not have more than 2048 characters.\n";
            shouldreturn = true;
        }
        var desc = $("#wh-description").val();
        if (desc.length > 2048) {
            returnable += "- Please ensure the content at embed " + embedNum + " does not have more than 2048 characters.\n";
            shouldreturn = true;
        }
        var sidebar = $("#wh-color").val();
        var sidebarvalid = true;
        if (sidebar && !/^(?:#?[\dA-F]{3}|#?[\dA-F]{6})$/i.test(sidebar)) {
            returnable += "- Please ensure the sidebar color at embed " + embedNum + " has valid hex code color.\n";
            shouldreturn = true;
            sidebarvalid = false;
        }
        if (/^#?[\dA-F]{3}$/i.test(sidebar)) {
            sidebar = sidebar.match(/^#?([\dA-F]{3})$/i)[1].repeat(2);
        }
        if (sidebarvalid && sidebar) {
            sidebar = parseInt(sidebar.match(/^#?([\dA-F]{6})$/i)[1], 16);
        }
        var footer = $("#wh-footer").val();
        if (footer.length > 256) {
            returnable += "- Please ensure the footer at embed " + embedNum + " does not have more than 256 characters.\n";
            shouldreturn = true;
        }
        var footerIcon = $("#wh-footer-icon").val();
        var image = $("#wh-image").val();
        if (image.length > 2048) {
            returnable += "- Please ensure the image URL at embed " + embedNum + " does not have more than 2048 characters.\n";
            shouldreturn = true;
        }
        if (shouldreturn) return;
        if (title) embedToAdd.title = title;
        if (author) embedToAdd.author = {
            name: author,
        };
        if (authorIcon) {
            if (!embedToAdd.author) embedToAdd.author = {
                name: "​"
            };
            embedToAdd.author.icon_url = authorIcon;
        }
        if (authorUrl && embedToAdd.author) embedToAdd.author.url = authorUrl;
        if (thumbnail) embedToAdd.thumbnail = {
            url: thumbnail
        };
        if (desc) embedToAdd.description = desc;
        if (sidebar) embedToAdd.color = sidebar;
        if (footer) embedToAdd.footer = {
            text: footer,
        };
        if (footerIcon) {
            if (!embedToAdd.footer) embedToAdd.footer = {
                text: "​"
            };
            embedToAdd.footer.icon_url = footerIcon;
        }
        if (image) {
            embedToAdd.image = {
                url: image
            };
        }
        if (!embedToAdd.description && !embedToAdd.footer && !embedToAdd.author && !embedToAdd.title) embedToAdd.description = "​";
        embedz.push(embedToAdd);
        if (returnable) return alert(returnable.replace(/\s+$/, ""));
        var obj = {
            content: wh_content,
            embeds: embedz,
        };
        if (nick) obj.username = nick;
        if (avatar) obj.avatar_url = avatar;
        if (obj.embeds.length > 0 && content !== "" && content !== "​") obj.content = content;
        else if (obj.embeds.length === 0) obj.content = content;
        fetcher(url.startsWith("http") ? url : "https://" + url, {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(obj),
            referrerPolicy: "no-referrer",
        }).then(function (response) {
            if (!response.ok) {
                console.error(obj);
                return alert("Discord gave status of " + response.status);
            }
        });
    });
})(window.fetch);
// Youtube scripts
function get_youtube_id(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
}
async function yt_result() {
    var YT_LINK_3 = $("#yt-url").val();
    //video api
    let getInfo1 = async () => {
        let response1 = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${get_youtube_id(
            YT_LINK_3
        )}&key=AIzaSyAaNYL460TRg-bHHYfWEt_1l2YxXOJmmRU`);
        let info1 = response1.data.items[0].statistics;
        return info1;
    };
    let statistics = await getInfo1();
    //for channel api
    let getInfo2 = async () => {
        let response2 = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${get_youtube_id(
            YT_LINK_3
        )}&key=AIzaSyAaNYL460TRg-bHHYfWEt_1l2YxXOJmmRU`);
        let info2 = response2.data.items[0];
        return info2;
    };
    let snippet = await getInfo2();
    let tag = snippet.snippet.tags;
    var num = Math.floor(Math.random() * 1);
    var num2 = Math.floor(Math.random() * 3);
    var num3 = Math.floor(Math.random() * 6);
    let tag1 = tag[num] || "Na";
    let tag2 = tag[num2] || "Na";
    let tag3 = tag[num3] || "Na";
    let description_main = snippet.snippet.description;
    let description_substring = description_main.substring(0, 150);
    let description = description_substring + "".split("\n", 5).join("<br><br>");
    document.getElementById("yt_card__img").src = snippet.snippet.thumbnails.standard.url;
    document.getElementById("yt_card__heading").textContent = snippet.snippet.title;
    document.getElementById("yt_card_tag_1").textContent = "#" + tag1;
    document.getElementById("yt_card_tag_2").textContent = "#" + tag2;
    document.getElementById("yt_card_tag_3").textContent = "#" + tag3;
    document.getElementById("yt_card__description").innerHTML = description;
    document.getElementById("yt_viewCount").innerHTML = '<span class="emoji">👀</span>' + statistics.viewCount;
    document.getElementById("yt_likeCount").innerHTML = '<span class="emoji">👍</span>' + statistics.likeCount;
    document.getElementById("yt_dislikeCount").innerHTML = '<span class="emoji">👎</span>' + statistics.dislikeCount;
    document.getElementById("yt_commentCount").innerHTML = '<span class="emoji">💬</span>' + statistics.commentCount;
}
yt_search_btn.addEventListener("click", function () {
    yt_result();
    var link2 = $("#yt-url").val();
    if (link2 === "") {
        $.notify({
            title: "<strong>Error</strong>",
            message: "<br>Please enter some YOUTUBE_VIDEO_LINK in the box.",
            icon: "fas fa-exclamation-triangle",
        }, {
            type: "danger",
            allow_dismiss: true,
            delay: 3000,
            placement: {
                from: "bottom",
                align: "right",
            },
        });
    }
    else if (link2.includes("channel")) {
        $.notify({
            title: "<strong>Error</strong>",
            message: "<br>Please enter some YOUTUBE_VIDEO_LINK in the box.",
            icon: "fas fa-exclamation-triangle",
        }, {
            type: "danger",
            allow_dismiss: true,
            delay: 3000,
            placement: {
                from: "bottom",
                align: "right",
            },
        });
    }
    else {
        $(".yt-search-box").addClass("hide");
        $(".yt-loading").removeClass("hide");
        setTimeout(() => {
            $(".yt-loading").addClass("hide");
            $(".yt-result-box").removeClass("hide");
        }, 1500);
    }
});
id_discord_search_btn.addEventListener("click", async function () {
    var discord_id = $("#search_discord_info").val();
    if (discord_id === "") {
        $.notify({
            title: "<strong>Error</strong>",
            message: "<br>Please enter some DISCORD_ID in the box.",
            icon: "fas fa-exclamation-triangle",
        }, {
            type: "danger",
            allow_dismiss: true,
            delay: 3000,
            placement: {
                from: "bottom",
                align: "right",
            },
        });
    }
    else {
        let getInfo22 = async () => {
            let response22 = await axios.get(`https://api.discord.wf/v2/users/${discord_id}`);
            let info22 = response22;
            return info22;
        };
        let discord_api = await getInfo22();
        if (discord_api.data.discord.bot) {
            document.getElementById("discord-profile-pic").src = "https://cdn.discordapp.com/avatars/" + discord_id + "/" + discord_api.data.discord.avatar + ".png?size=1024";
            document.getElementById("discord-profile-username").innerHTML = discord_api.data.discord.username + "#" + discord_api.data.discord.discriminator + " 🤖";
            document.getElementById("discord-profile-id").innerHTML = discord_id;
        }
        else {
            document.getElementById("discord-profile-pic").src = "https://cdn.discordapp.com/avatars/" + discord_id + "/" + discord_api.data.discord.avatar + ".png?size=1024";
            document.getElementById("discord-profile-username").innerHTML = discord_api.data.discord.username + "#" + discord_api.data.discord.discriminator + " 👤";
            document.getElementById("discord-profile-id").innerHTML = discord_id;
        }
    }
});
$(".click-btn-down").click(function () {
    downloadVideo();
});

function downloadVideo() {
    var link = $("#yt-url").val();
    var format = $(".yt-format").children("option:selected").val();
    console.log(link);
    console.log(format);
    $(".download-video").html('<iframe style="border-radius:1rem;width:250px;height:60px;border:0;overflow:hidden;" scrolling="no" src="https://loader.to/api/button/?url=' + link + "&f=" + format + '"></iframe>');
}
//  Today scripts
async function today_def() {
    let m_day = moment().format("dddd");
    let m_day_n_2 = moment().format("Do");
    let m_mounth = moment().format("MMMM");
    let m_year = moment().format("YYYY");
    let sh_day = moment().locale("fa").format("dddd");
    let sh_day_n_2 = moment().locale("fa").format("Do");
    let sh_mounth = moment().locale("fa").format("MMMM");
    let sh_year = moment().locale("fa").format("YYYY");
    let m_num = moment().format("L");
    let sh_num = moment().locale("fa").format("L");
    const whatistoday = await axios.get(`https://byabbe.se/on-this-day/8/8/events.json`, {
        crossDomain: true,
    });
    document.getElementById("whatistoday1").textContent = whatistoday.data.events[0].description;
    document.getElementById("whatistoday2").textContent = whatistoday.data.events[1].description;
    document.getElementById("whatistoday3").textContent = whatistoday.data.events[2].description;
    document.getElementById("shamsi_text").textContent = sh_year + "    ،    " + sh_day + ` ${sh_day_n_2}` + "   ،    " + sh_mounth;
    document.getElementById("miladi_text").textContent = "  " + m_year + "    ,    " + m_mounth + ` ${m_day_n_2}` + "    ,    " + m_day;
    //-------------------number
    document.getElementById("shamsi_number").textContent = sh_num;
    document.getElementById("miladi_number").textContent = m_num;
}
today_def();
// dark light theme
$("#toggle-box-checkbox").on("change", function () {
    var element = document.getElementById("html");
    if (this.checked) {
        element.classList.add("dark-theme");
        element.classList.remove("light-theme");
    }
    else {
        element.classList.add("light-theme");
        element.classList.remove("dark-theme");
    }
});
async function token_generate() {
    const api_token = await axios.get(`https://some-random-api.ml/bottoken`, {
        crossDomain: true,
    });
    document.getElementById("random_token").textContent = api_token.data.token;
}
token_generator.addEventListener("click", function () {
    token_generate();
});
// qrcode
async function qr_code_maker() {
    var content = $("#qrcode_link").val();
    if (content === "") {
        $.notify({
            title: "<strong>Error</strong>",
            message: "<br>Please enter some LINK in the box.",
            icon: "fas fa-exclamation-triangle",
        }, {
            type: "danger",
            allow_dismiss: true,
            delay: 3000,
            placement: {
                from: "bottom",
                align: "right",
            },
        });
    }
    else {
        document.getElementById("qrcode_img").src = `http://api.qrserver.com/v1/create-qr-code/?data=${content}&size=100x100`;
        document.getElementById("qrcode_link_1").innerHTML = content;
    }
}
qrcode_btn.addEventListener("click", function () {
    qr_code_maker();
});
// color
async function color_analyze() {
    var content = $("#color_hex_2").val();
    if (content === "") {
        $.notify({
            title: "<strong>Error</strong>",
            message: "<br>Please enter some HEX_COLOR in the box.",
            icon: "fas fa-exclamation-triangle",
        }, {
            type: "danger",
            allow_dismiss: true,
            delay: 3000,
            placement: {
                from: "bottom",
                align: "right",
            },
        });
    }
    else if (content.includes("#")) {
        $.notify({
            title: "<strong>Error</strong>",
            message: "<br>Please enter some CORRECT_HEX_COLOR in the box.",
            icon: "fas fa-exclamation-triangle",
        }, {
            type: "danger",
            allow_dismiss: true,
            delay: 3000,
            placement: {
                from: "bottom",
                align: "right",
            },
        });
    }
    else {
        document.getElementById("color_img_1").src = `https://api.alexflipnote.dev/colour/image/${content}`;
        document.getElementById("color_img_2").src = `https://api.alexflipnote.dev/color/image/gradient/${content}`;
        document.getElementById("color_hex_1").innerHTML = content;
    }
}
color_btn.addEventListener("click", function () {
    color_analyze();
});
// pastep
async function pastep_auto() {
    const api_pastep = await axios.get(`https://pastep.com/api/accounts/data?username=parsa&api_secret=0FZKOKUR4GXB9SG0ZX2G`);
    document.getElementById("pastep_profile").src = api_pastep.data.avatar;
    document.getElementById("pastep_username").innerHTML = api_pastep.data.username;
    document.getElementById("pastep_bio").innerHTML = api_pastep.data.bio;
    document.getElementById("likes_pastep").innerHTML = "Likes : " + api_pastep.data.likes;
    document.getElementById("pastes_pastep").innerHTML = "Pastes : " + api_pastep.data.pastes;
    document.getElementById("recent_pastep").href = api_pastep.data.recent_paste;
    if (api_pastep.data.badges.includes("STAFF")) {
        $(".pastep-card__tag--1").removeClass("hide");
    }
    if (api_pastep.data.badges.includes("ADMIN")) {
        $(".pastep-card__tag--2").removeClass("hide");
    }
    if (api_pastep.data.badges.includes("PRO")) {
        $(".pastep-card__tag--3").removeClass("hide");
    }
    if (api_pastep.data.badges.includes("DONATOR")) {
        $(".pastep-card__tag--4").removeClass("hide");
    }
    if (api_pastep.data.badges.includes("BUG")) {
        $(".pastep-card__tag--5").removeClass("hide");
    }
}
pastep_auto();
async function pastep_search() {
    var content = $("#pastep_username_search").val();
    if (content === "") {
        $.notify({
            title: "<strong>Error</strong>",
            message: "<br>Please enter some USERNAME in the box.",
            icon: "fas fa-exclamation-triangle",
        }, {
            type: "danger",
            allow_dismiss: true,
            delay: 3000,
            placement: {
                from: "bottom",
                align: "right",
            },
        });
    }
    else {
        const api_pastep = await axios.get(`https://pastep.com/api/accounts/data?username=${content}&api_secret=0FZKOKUR4GXB9SG0ZX2G`);
        document.getElementById("pastep_profile").src = api_pastep.data.avatar;
        document.getElementById("pastep_username").innerHTML = api_pastep.data.username;
        document.getElementById("pastep_bio").innerHTML = api_pastep.data.bio;
        document.getElementById("likes_pastep").innerHTML = "Likes : " + api_pastep.data.likes;
        document.getElementById("pastes_pastep").innerHTML = "Pastes : " + api_pastep.data.pastes;
        document.getElementById("recent_pastep").href = api_pastep.data.recent_paste;
        if (api_pastep.data.badges.includes("STAFF")) {
            $(".pastep-card__tag--1").removeClass("hide");
        }
        else {
            $(".pastep-card__tag--1").addClass("hide");
        }
        if (api_pastep.data.badges.includes("ADMIN")) {
            $(".pastep-card__tag--2").removeClass("hide");
        }
        else {
            $(".pastep-card__tag--2").addClass("hide");
        }
        if (api_pastep.data.badges.includes("PRO")) {
            $(".pastep-card__tag--3").removeClass("hide");
        }
        else {
            $(".pastep-card__tag--3").addClass("hide");
        }
        if (api_pastep.data.badges.includes("DONATOR")) {
            $(".pastep-card__tag--4").removeClass("hide");
        }
        else {
            $(".pastep-card__tag--4").addClass("hide");
        }
        if (api_pastep.data.badges.includes("BUG")) {
            $(".pastep-card__tag--5").removeClass("hide");
        }
        else {
            $(".pastep-card__tag--5").addClass("hide");
        }
    }
}
search_btn_pastep.addEventListener("click", function () {
    pastep_search();
});
// ads
setTimeout(() => {
    $(".headinfo-ad").addClass("active");
}, 15000);
setInterval(() => {
    $(".headinfo-ad-2").addClass("active");
}, 120000);
dismiss_popup_btn.addEventListener("click", function () {
    $(".headinfo-ad").removeClass("active");
});
headinfo_ad_2_close.addEventListener("click", function () {
    $(".headinfo-ad-2").removeClass("active");
});
// ip section
google_map_btn.addEventListener("click", function () {
    $(".ip_map_image_popup").addClass("active");
});
ip_map_image.addEventListener("click", function () {
    $(".ip_map_image_popup").removeClass("active");
});
// email
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
Submit_email_btn.addEventListener("click", function () {
    let email = $("#submit_email").val();
    if (validateEmail(email)) {
        try {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({
                "email": email
            });
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            fetch("https://headinfo.ir/secret/api/v1/database/newEmail", requestOptions).then($.notify({
                title: "<strong>Successful</strong>",
                message: "<br>Your EMAIL has been successfully saved to the system.",
                icon: "fas fa-exclamation-triangle",
            }, {
                type: "success",
                allow_dismiss: true,
                delay: 3000,
                placement: {
                    from: "bottom",
                    align: "right",
                },
            }))
        }
        catch (err) {
            $.notify({
                title: "<strong>Error</strong>",
                message: "<br>Sorry we have some problems :(",
                icon: "fas fa-exclamation-triangle"
            }, {
                type: "danger",
                allow_dismiss: true,
                delay: 3000,
                placement: {
                    from: "bottom",
                    align: "right"
                }
            })
        }
    }
    else {
        $.notify({
            title: "<strong>Error</strong>",
            message: "<br>Please just enter some REAL_EMAIL in the box.",
            icon: "fas fa-exclamation-triangle"
        }, {
            type: "danger",
            allow_dismiss: true,
            delay: 3000,
            placement: {
                from: "bottom",
                align: "right"
            }
        })
    }
});
// close btn
function close_window() {
    close();
}
