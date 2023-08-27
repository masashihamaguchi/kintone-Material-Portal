/**
 * Copyright (c) 2021 Masashi Hamaguchi
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 */

(function () {
    /**
     * Parameters
     */
    // ウィジェット管理アプリ
    const PORTAL_MANAGEMENT_APP_ID = 0;
    // ポータルお知らせアプリ
    const NOTICE_APP_ID = 0;
    // Footer
    const FOOTER = '©︎ Material Portal';

    // Color Master
    const COLOR_MASTER = {
        'オレンジ': {
            class: 'orange',
            color: '#FFAA52'
        },
        'みずいろ': {
            class: 'light-blue',
            color: '#7ECAF2'
        },
        'みどり': {
            class: 'green',
            color: '#8ED09A'
        },
        'きいろ': {
            class: 'yellow',
            color: '#DAE46D'
        },
        'エメラルドグリーン': {
            class: 'emerald-green',
            color: '#9ED4C8'
        },
        'あか': {
            class: 'red',
            color: '#E4A396'
        },
        'ピンク': {
            class: 'pink',
            color: '#FF7793'
        },
        'あお': {
            class: 'blue',
            color: '#66B6E6'
        }
    };

    /**
     * Scripts
     */
    const loginUser = kintone.getLoginUser();

    const getMessage = function (now) {
        let time = Number(String(('00' + now.getHours()).slice(-2)) + String(('00' + now.getMinutes()).slice(-2)));

        let message;
        if (time < 500) {
            message = 'こんばんは';
        } else if (time < 1100) {
            message = 'おはようございます';
        } else if (time < 1700) {
            message = 'こんにちは';
        } else {
            message = 'こんばんは';
        }
        return `${message}、${loginUser.name}さん`;
    }

    const getDate = function (now) {
        let days = ['日', '月', '火', '水', '木', '金', '土'];
        return `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日(${days[now.getDay()]})`;
    }
    const getTime = function (now) {
        let hour = ('00' + now.getHours()).slice(-2)
        let minute = ('00' + now.getMinutes()).slice(-2);
        let seconds = ('00' + now.getSeconds()).slice(-2);
        return `${hour}:${minute}`;
    }

    // get records
    const getRecords = async function (app, query, offset = 0, records = []) {
        let q = query ? `${query} limit 500 offset ${offset}` : `limit 500 offset ${offset}`;
        const resp = await kintone.api(kintone.api.url('/k/v1/records', true), 'GET', {
            app: app,
            query: q
        }).then(resp => {
            return resp.records;
        }).catch(err => {
            console.log(err);
            return [];
        });

        records = records.concat(resp);
        if (resp.length >= 500) return getRecords(app, query, offset + 500, records);
        return records;
    }

    const getAssignedList = function () {
        return kintone.api(kintone.api.url('/k/api/app/listAssigned', true), 'POST', {
            'includeGuestInfo': true
        }).then(resp => {
            if (resp.success) {
                return resp.result.assignedAppList;
            } else {
                console.log('assigned list api error');
                return [];
            }
        }).catch(err => {
            console.log(err);
            return [];
        });
    }

    // fuwat
    const fuwat = function () {
        $('.fuwat').css('visibility', 'hidden');
        $(window).scroll(function () {
            let windowHeight = $(window).height(),
                topWindow = $(window).scrollTop();
            $('.fuwat').each(function () {
                let objectPosition = $(this).offset().top;
                if (topWindow > objectPosition - windowHeight + 200) {
                    $(this).addClass("fuwatAnime");
                }
            });
        });
    }

    const setMenuPosition = function () {
        let toggleBtn = $('.toggle-btn');
        let top = $(window).scrollTop();
        let basePosition = 64;
        if (top <= basePosition) {
            toggleBtn.css('top', `calc((112px - ${top}px) / 2 + 50% - 24px)`);
        } else {
            toggleBtn.css('top', `calc(24px + 50% - 24px)`);
        }
    }

    const createVueApp = async function () {
        let lists = await Promise.all([
            getRecords(NOTICE_APP_ID, 'お知らせ表示 in ("表示") and (掲載開始日 <= TODAY() or 掲載開始日 = "") and (掲載終了日 >= TODAY() or 掲載終了日 = "") order by 表示順 asc, レコード番号 asc'),
            getAssignedList(),
            getRecords(PORTAL_MANAGEMENT_APP_ID, 'ウィジェット表示 in ("表示") order by ウィジェット表示順 asc, レコード番号 asc')
        ]);

        Vue.createApp({
            data() {
                return {
                    date: getDate(new Date()),
                    time: getTime(new Date()),
                    message: getMessage(new Date()),
                    notices: lists[0],
                    assignedAppList: lists[1],
                    widgets: lists[2],
                    footer: FOOTER,
                    domain: document.domain,
                    // class
                    open: 'open'
                }
            },
            mounted: function () {
                // info clock
                setInterval(this.updateTime, 100);
                // menu-area position
                $(window).scroll(() => setMenuPosition());
                // fuwat
                fuwat();
            },
            methods: {
                updateTime: function () {
                    let now = new Date();
                    this.date = getDate(now);
                    this.time = getTime(now);
                    this.message = getMessage(now);
                },
                onScroll: function (id) {
                    let t = $(`#widget${id}`).offset().top;
                    $('html, body').animate({
                        scrollTop: t - 48
                    }, 400 + t / 4);
                },
                onOpenMenu: function () {
                    let area = $('#menu-area');
                    if (!area.hasClass(this.open)) {
                        area.addClass(this.open);
                    } else {
                        area.removeClass(this.open);
                    }
                },
                onMask: function () {
                    $('#menu-area').removeClass(this.open);
                },
                getColorClass: (key) => COLOR_MASTER[key].class,
                getColor: (key) => COLOR_MASTER[key].color
            }
        }).mount('#portal');
    }

    const init = function () {
        // for development
        // $('.kintone-portal-designer-html').css('display', 'none');

        // administrator menu
        const adminMenu = $('.gaia-argoui-coveroptionmenubutton');
        adminMenu.appendTo('.dhOPxC__right .dhOPxC__menu-list');
        adminMenu.css({
            width: "48px",
            height: "48px",
            backgroundImage: "url(https://static.cybozu.com/contents/k/image/argo/uiparts/ellipsis/ellipsis.png)",
            backgroundColor: "transparent"
        }).hover(() => {
            adminMenu.css("backgroundColor", "#434343");
        }, () => {
            adminMenu.css("backgroundColor", "transparent");
        });
    }

    /**
     * Run Scripts
     */
    // view init
    init();
    // create Vue App
    createVueApp();

})();
