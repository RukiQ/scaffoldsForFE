<div id="editor-control">
    <ul>
        <li><a href="#" data-role="bold"><i class="fa fa-bold"></i></a></li>
        <li><a href="#" data-role="italic"><i class="fa fa-italic"></i></a></li>
        <li><a href="#" data-role="underline"><i class="fa fa-underline"></i></a></li>
        <li><a href="#" data-role="strikeThrough"><i class="fa fa-strikethrough"></i></a></li>
    </ul>
    <!-- 对齐方式 -->
    <ul>
        <li><a href="#" data-role="justifyleft"><i class="fa fa-align-left"></i></a></li>
        <li><a href="#" data-role="justifycenter"><i class="fa fa-align-justify"></i></a></li>
        <li><a href="#" data-role="justifyright"><i class="fa fa-align-right"></i></a></li>
    </ul>
    <ul>
        <li><a href="#" data-role="superscript"><i class="fa fa-superscript"></i></a></li>
        <li><a href="#" data-role="subscript"><i class="fa fa-subscript"></i></a></li>
    </ul>
    <!-- 字体颜色 -->
    <ul>
        <li>
            <i class="fa fa-pencil"></i>
            <select class="font-color">
                <option value="black" style="color: black">黑色</option>
                <option value="red" style="color: red">红色</option>
                <option value="green" style="color: green">绿色</option>
                <option value="yellow" style="color: yellow">黄色</option>
                <option value="blue" style="color: blue">蓝色</option>
                <option value="orange" style="color: orange">橙色</option>
                <option value="purple" style="color: purple">紫色</option>
            </select>
        </li>
        <li>
            <i class="fa fa-paint-brush"></i>
            <select class="bg-color">
                <option value="black" style="background: black; color: white">黑色</option>
                <option value="red" style="background: red;">红色</option>
                <option value="green" style="background: green; color: white">绿色</option>
                <option value="yellow" style="background: yellow;">黄色</option>
                <option value="blue" style="background: blue; color: white">蓝色</option>
                <option value="orange" style="background: orange;">橙色</option>
                <option value="purple" style="background: purple; color: white">紫色</option>
            </select>
        </li>
    </ul>
    <!-- 清除格式 -->
    <ul>
        <li><a href="#" data-role="removeformat"><i class="fa fa-eraser"></i></a></li>
    </ul>
    <!-- 段落 -->
    <ul>
        <li>
            <i class="fa fa-header"></i>
            <select class="paragraph">
                <option value="p">p</option>
                <option value="h1">h1</option>
                <option value="h2">h2</option>
                <option value="h3">h3</option>
                <option value="h4">h4</option>
                <option value="h5">h5</option>
            </select>
        </li>
    </ul>
    <!-- 字体设置 -->
    <ul>
        <li>
            <i class="fa fa-font"></i>
            <select class="font-family">
                <option value="宋体">宋体</option>
                <option value="微软雅黑">微软雅黑</option>
                <option value="仿宋">仿宋</option>
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
            </select>
        </li>
        <li>
            <i class="fa fa-text-width"></i>
            <select class="font-size">
                <option value="1">9</option>
                <option value="2">12</option>
                <option value="3">14</option>
                <option value="4" selected>16</option>
                <option value="5">18</option>
                <option value="6">22</option>
            </select>
        </li>
    </ul>
    <!-- 插入图片 -->
    <ul>
        <li class="insert-img">
            <a href="#" data-role="loadImg"><i class="fa fa-picture-o"></i></a>
            <input type="file" class="load-img">
        </li>
    </ul>
</div>

<div id="editor-area" contenteditable>
    <p>世上最简单的文本编辑器！</p>
</div>