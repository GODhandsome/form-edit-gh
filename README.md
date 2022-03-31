# gh-form-edit

### 简介

基于 vue 以及 element-ui 封装的表单编辑器，提供 TableFormEdit，CustomerForm 两个组件

### TableFormEdit--表单编辑组件

| 参数 |   描述   | 类型  | 必选 |
| :--: | :------: | :---: | :--: |
| editList | 配置列表 | Array | 是 |



### CustomerForm--自定义表单组件

|     参数      |             描述             |   类型   | 必选 |
| :-----------: | :--------------------------: | :------: | :--: |
|    isEdit     |           是否编辑           | Boolean  |
| clientRequest |           系统请求           | Function |
|     form      |           数据表单           |  Object  |
|     list      |           配置列表           |  Array   |
|   isPreview   |           是否预览           | Boolean  |
|  labelWidth   | 表单域标签的宽度，默认 120px |  String  |

<br/>
<br/>

|     方法     |                描述                |
| :----------: | :--------------------------------: |
| handleValidate | 触发校验成功之后触发 submit 事件 |

<br/>
<br/>

|     事件     |            描述            |         返回参数         |
| :----------: | :------------------------: | :----------------------: |
| submit | 触发校验之后触发触发的事件 | values, isEdit(是否编辑) |
