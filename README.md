# vue-components-public
```
二次封装element组件
```
## 安装
```shell
npm install vue-components-public
```
## 全局注册（在main.js文件里注册）
```javascript
import Vue from 'vue'
import VueComponentsPublic from "vue-components-public";
import "vue-components-public/lib/vue-components-public.css";
Vue.use(VueComponentsPublic);
```
## 局部注册（在你所使用的vue文件里注册）
```javascript
import Vue from 'vue'
import { publicInpit } from 'vue-components-public';
Vue.use(publicInpit);
```
## 例子
姓名脱敏
```javascript
let str = vue-components-public.$hideName("张三");
```
### Customize configuration
See [Configuration Reference](https://github.com/FangFeijideZ/vue-components-public)
```
 
#目录
* [1.姓名脱敏](#hideName)
 
```
<h6 id="hideName">1.姓名脱敏</h6>
```javascript
//返回字符串
let str = vue-components-public.$hideName("张三");

