import "../assets/css/nav_menu.scss";
import tpl from "../assets/tpl/nav.tpl";


$('.nav').append(tpl());

// jQuery 实现
let oList = $('#list');

oList.on('click', 'a', (e) => {
    let $target = $(e.target),
        oLi = oList.children();

    $.each(oLi, (index, item) => {
        $(item).find('a').css('color', '#08c');
    });

    $target.css('color', 'blue');
});
