版本更新
=========
- 0.0.2 : 重构主文件、接口文件代码。

接口列表
=========

`http://osc.im/disaster/earthquake/person/find/[type]?[params]`

可选参数：


### 选择寻人的平台
type[String] : baidu || 360 || sohu

--> `http://osc.im/disaster/earthquake/person/find/360`

## TODO
### 查询条件
params[page] :  页码

--> `http://osc.im/disaster/earthquake/person/find/360?page=1`

params[perpage] :  每页数量，默认为10

--> `http://osc.im/disaster/earthquake/person/find/360?perpage=20`

params[gender] :  性别 , female/male

--> `http://osc.im/disaster/earthquake/person/find/360?gender=female`

params[phone] :  电话 , Number

--> `http://osc.im/disaster/earthquake/person/find/360?phone=13760120888`

目前存在的问题：
=========

- 海外firebase数据库响应较慢，应在国内托管一份稳定的数据库。
- 界面不适合普通用户使用，数据结果未做分页。
- 代码组织性较差，不利用接口的长期维护。
- 没有写入接口。

OSC更新计划:
=========

- 此项目将park在OSC的灾难类目中
- 迁移数据库至mongodb
- 重写接口代码，本项目仓库只保留接口代码
- 提供一份接口文档
- 开发写入接口
