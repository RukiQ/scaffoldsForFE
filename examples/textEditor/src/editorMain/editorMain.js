import tpl from './editorMain.tpl';
import './editorMain.scss';

$('#editor-wrap').append(tpl());

const $editorControl = $('#editor-control'),
    $fontColor = $('.font-color'),
    $bgColor = $('.bg-color'),
    $paragraph = $('.paragraph'),
    $fontFamily = $('.font-family'),
    $fontSize = $('.font-size'),
    $loadImg = $('.load-img');

$editorControl.on('click', 'a', function() {
    let $this = $(this),
        role = $this.data('role');

    document.execCommand(role, false, null);

    if (role == 'removeformat') {
        $fontColor.prop('selectedIndex', 0);
        $bgColor.prop('selectedIndex', 0);
        $paragraph.prop('selectedIndex', 0);
        $fontFamily.prop('selectedIndex', 0);
        $fontSize.prop('selectedIndex', 0);
        document.execCommand('formatBlock', false, '<p>');
        document.execCommand('fontName', false, '宋体');
        document.execCommand('fontSize', false, '4');
    }

});

$fontColor.on('change', function() {
    let fontcolor = $(this).val();
    document.execCommand('forecolor', false, fontcolor);
});

$bgColor.on('change', function() {
    let bgcolor = $(this).val();
    document.execCommand('backcolor', false, bgcolor);
});

$paragraph.on('change', function() {
    let role = $(this).val();
    document.execCommand('formatBlock', false, '<' + role + '>');
});

$fontFamily.on('change', function() {
    let fontfamily = $(this).val();
    document.execCommand('fontName', false, fontfamily);
});

$fontSize.on('change', function() {
    let size = $(this).val();
    document.execCommand('fontSize', false, size);
});

$loadImg.on('change', function() {
    imgLoad();
});

function imgLoad() {
    let file    = document.querySelector('input[type=file]').files[0],
        reader  = new FileReader();

    reader.addEventListener("load", function () {
        var img = '<img src="' + reader.result + '" />';
        $('#editor-area').append(img);
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}
