(() => {
    let e = document.querySelector(".calendar");
    const a = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ];
    (isLeapYear = (e) => (e % 4 == 0 && e % 100 != 0 && e % 400 != 0) || (e % 100 == 0 && e % 400 == 0)),
        (getFebDays = (e) => (isLeapYear(e) ? 29 : 28)),
        (generateCalendar = (t, r) => {
            let l = e.querySelector(".calendar-days"),
                c = e.querySelector("#year"),
                u = [31, getFebDays(r), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            l.innerHTML = "";
            let d = new Date();
            t || (t = d.getMonth()), r || (r = d.getFullYear());
            let o = a[t];
            (n.innerHTML = o), (c.innerHTML = r);
            let s = new Date(r, t, 1);
            for (let e = 0; e <= u[t] + s.getDay() - 1; e++) {
                let a = document.createElement("div");
                e >= s.getDay() && (a.classList.add("calendar-day-hover"),
                    (a.innerHTML = e - s.getDay() + 1),
                    (a.innerHTML += "<span></span>\n                            <span></span>\n                            <span></span>\n                            <span></span>"), e - s.getDay() + 1 === d.getDate() && r === d.getFullYear() && t === d.getMonth() && a.classList.add("curr-date")),
                    l.appendChild(a);
            }
        });
    let t = e.querySelector(".month-list");
    a.forEach((e, a) => {
        let n = document.createElement("div");
        (n.innerHTML = `<div data-month="${a}">${e}</div>`),
            (n.querySelector("div").onclick = () => {
                t.classList.remove("show"), (l.value = a), generateCalendar(a, c.value);
            }),
            t.appendChild(n);
    });
    let n = e.querySelector("#month-picker");
    n.onclick = () => {
        t.classList.add("show");
    };
    let r = new Date(),
        l = {
            value: r.getMonth()
        },
        c = {
            value: r.getFullYear()
        };
    generateCalendar(l.value, c.value),
        (document.querySelector("#prev-year").onclick = () => {
            --c.value, generateCalendar(l.value, c.value);
        }),
        (document.querySelector("#next-year").onclick = () => {
            ++c.value, generateCalendar(l.value, c.value);
        });
})();
