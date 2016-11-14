     
<div class="form-obj"></div>

<h3>过滤项</h3>

<div class="col first-col">

  <div class="item">
    <label>组名称：</label><input type="text" class="group-name biz-input" style="margin-left: 9px;">
  </div>

  <div class="item">
    <label>频&nbsp;道：</label>
    <select class="channel biz-select">
      <option value="">请选择</option>
      <option value="购物搜索">购物搜索</option>
      <option value="dsp">dsp</option>
      <option value="搜狐微门户">搜狐微门户</option>
      <option value="qq导航页">qq导航页</option>
      <option value="搜狗拼音">搜狗拼音</option>
    </select>
  </div>

  <div class="item">
    <label>组出价：</label>
    <input type="text" class="price-low biz-input" > --
    <input type="text" class="price-up biz-input" >&nbsp;元
  </div>

</div>

<div class="col second-col">
    
  <div class="item">
    <label>投放地域：</label>
    
    <input type="radio" name="region" value="allRegion" title="全部地域" class="all-region" id="all-region">

    <input type="radio" name="region" value="selectRegion" title="选择地域" class="sel-region" id="sel-region" checked>

    <span class="ck-item">
      <input type="checkbox" name="city" value="beijing" title="北京" id="bj" checked />
      <input type="checkbox" name="city" value="tianjin" title="天津" id="tj" checked />
    </span>
  </div>

  <div class="item">
    <label>开始时间：</label>
    <input type="text" class="time-begin biz-calendar" value="" readonly>
    <label>结束时间：</label>
    <input type="text" class="time-end biz-calendar" value="" readonly>
  </div>

</div>

<div class="query">
  <a href="javascript:;" class="biz-button" id="btn-query">查询</a>
  <a href="javascript:;" class="biz-button" id="btn-reset">清空</a>
  <input type="reset" name="reset" style="display: none;" />
</div>
