# gh-vue-el-form-edit

### 简介

基于 vue 以及 element-ui 封装的表单编辑器，提供 TableFormEdit，CustomerForm 两个组件

### TableFormEdit

| 参数 |   描述   | 类型  | 必选 |
| :--: | :------: | :---: | :--: |
| list | 配置列表 | Array |

### CustomerForm

|     参数      |             描述             |   类型   | 必选 |
| :-----------: | :--------------------------: | :------: | :--: |
|    isEdit     |           是否编辑           | Boolean  |
| clientRequest |           系统请求           | Function |
|     form      |           数据表单           |  Object  |
|     list      |           配置列表           |  Array   |
|   isPreview   |           是否预览           | Boolean  |
|  labelWidth   | 表单域标签的宽度，默认 120px |  String  |

|     方法     |                描述                |
| :----------: | :--------------------------------: |
| handleSubmit | 触发校验之后触发 handleSubmit 事件 |

|     事件     |            描述            |         返回参数         |
| :----------: | :------------------------: | :----------------------: |
| handleSubmit | 触发校验之后触发触发的事件 | values, isEdit(是否编辑) |
