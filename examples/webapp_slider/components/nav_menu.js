import "../assets/css/style.scss";
import tpl from "../assets/tpl/nav.tpl";


$('body').append(tpl());

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

// js 原生实现
/*let oList = document.getElementById('list');

oList.addEventListener('click', function(e) {
    let target = e.target || e.srcElement;

    if (target.tagName === 'A') {
        let oLi = oList.children;

        for (let i=0; i< oLi.length; i++) {
            oLi[i].children[0].style.color = '#08c';
        }

        target.style.color = 'blue';
    }
}, false);
*/
