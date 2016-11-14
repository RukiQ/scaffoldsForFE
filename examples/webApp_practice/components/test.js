import '../assets/css/main.scss';
import tpl from '../assets/tpl/test.tpl';
import '../lib/jquery.fullPage.js';

$('body').append(tpl());

$('#h5').fullpage({
    'sectionsColor': ['#254875', '#00FF00', '#695684'],
    onLeave: (index, nextIndex, direction) => {
        debugger
    },
    afterLoad: () => {
        debugger
    }
});