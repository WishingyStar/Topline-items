"use strict";(self["webpackChunklaitoutiao"]=self["webpackChunklaitoutiao"]||[]).push([[494],{4494:function(t,e,i){i.r(e),i.d(e,{default:function(){return h}});var n=function(){var t=this,e=t._self._c;return e("div",[e("van-nav-bar",{attrs:{title:"修改昵称","left-arrow":""},on:{"click-left":function(e){return t.$router.back()}}}),e("van-field",{attrs:{label:"昵称",clearable:"",placeholder:"请输入昵称"},model:{value:t.nickname,callback:function(e){t.nickname=e},expression:"nickname"}}),e("div",{staticStyle:{"text-align":"center",padding:"20px"}},[e("van-button",{staticStyle:{"background-color":"#7e8ad4"},attrs:{size:"large"},on:{click:t.edit_nickname}},[t._v("修改")])],1)],1)},r=[],s=(i(1611),i(7061)),a={components:{[s.Z.name]:s.Z},data(){return{nickname:""}},created(){this.nickname=this.$route.query.nickname},methods:{edit_nickname(){let{nickname:t}=this;0!==t.trim().length?(sessionStorage.setItem("nickname",t),setTimeout((t=>{this.$router.back()}),300)):this.$toast("不能为空")}}},l=a,o=i(1001),u=(0,o.Z)(l,n,r,!1,null,null,null),h=u.exports},7549:function(){},7061:function(t,e,i){i.d(e,{Z:function(){return $}});var n=i(3915),r=i.n(n),s=i(9299),a=i(3370);function l(){return!a.sk&&/ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())}var o=i(8161),u=l();function h(){u&&(0,o.kn)((0,o.oD)())}var c=i(4535),d=i(5781),f=i(855),g=i(408),v=i(9858),m=i(6631),p=i(5363),b=(0,f.d)("field"),k=b[0],y=b[1],$=k({inheritAttrs:!1,provide:function(){return{vanField:this}},inject:{vanForm:{default:null}},props:(0,s.Z)({},p.T,{name:String,rules:Array,disabled:{type:Boolean,default:null},readonly:{type:Boolean,default:null},autosize:[Boolean,Object],leftIcon:String,rightIcon:String,clearable:Boolean,formatter:Function,maxlength:[Number,String],labelWidth:[Number,String],labelClass:null,labelAlign:String,inputAlign:String,placeholder:String,errorMessage:String,errorMessageAlign:String,showWordLimit:Boolean,value:{type:[Number,String],default:""},type:{type:String,default:"text"},error:{type:Boolean,default:null},colon:{type:Boolean,default:null},clearTrigger:{type:String,default:"focus"},formatTrigger:{type:String,default:"onChange"}}),data:function(){return{focused:!1,validateFailed:!1,validateMessage:""}},watch:{value:function(){this.updateValue(this.value),this.resetValidation(),this.validateWithTrigger("onChange"),this.$nextTick(this.adjustSize)}},mounted:function(){this.updateValue(this.value,this.formatTrigger),this.$nextTick(this.adjustSize),this.vanForm&&this.vanForm.addField(this)},beforeDestroy:function(){this.vanForm&&this.vanForm.removeField(this)},computed:{showClear:function(){var t=this.getProp("readonly");if(this.clearable&&!t){var e=(0,a.Xq)(this.value)&&""!==this.value,i="always"===this.clearTrigger||"focus"===this.clearTrigger&&this.focused;return e&&i}},showError:function(){return null!==this.error?this.error:!!(this.vanForm&&this.vanForm.showError&&this.validateFailed)||void 0},listeners:function(){return(0,s.Z)({},this.$listeners,{blur:this.onBlur,focus:this.onFocus,input:this.onInput,click:this.onClickInput,keypress:this.onKeypress})},labelStyle:function(){var t=this.getProp("labelWidth");if(t)return{width:(0,g.N)(t)}},formValue:function(){return this.children&&(this.$scopedSlots.input||this.$slots.input)?this.children.value:this.value}},methods:{focus:function(){this.$refs.input&&this.$refs.input.focus()},blur:function(){this.$refs.input&&this.$refs.input.blur()},runValidator:function(t,e){return new Promise((function(i){var n=e.validator(t,e);if((0,a.tI)(n))return n.then(i);i(n)}))},isEmptyValue:function(t){return Array.isArray(t)?!t.length:0!==t&&!t},runSyncRule:function(t,e){return(!e.required||!this.isEmptyValue(t))&&!(e.pattern&&!e.pattern.test(t))},getRuleMessage:function(t,e){var i=e.message;return(0,a.mf)(i)?i(t,e):i},runRules:function(t){var e=this;return t.reduce((function(t,i){return t.then((function(){if(!e.validateFailed){var t=e.formValue;return i.formatter&&(t=i.formatter(t,i)),e.runSyncRule(t,i)?i.validator?e.runValidator(t,i).then((function(n){!1===n&&(e.validateFailed=!0,e.validateMessage=e.getRuleMessage(t,i))})):void 0:(e.validateFailed=!0,void(e.validateMessage=e.getRuleMessage(t,i)))}}))}),Promise.resolve())},validate:function(t){var e=this;return void 0===t&&(t=this.rules),new Promise((function(i){t||i(),e.resetValidation(),e.runRules(t).then((function(){e.validateFailed?i({name:e.name,message:e.validateMessage}):i()}))}))},validateWithTrigger:function(t){if(this.vanForm&&this.rules){var e=this.vanForm.validateTrigger===t,i=this.rules.filter((function(i){return i.trigger?i.trigger===t:e}));i.length&&this.validate(i)}},resetValidation:function(){this.validateFailed&&(this.validateFailed=!1,this.validateMessage="")},updateValue:function(t,e){void 0===e&&(e="onChange"),t=(0,a.Xq)(t)?String(t):"";var i=this.maxlength;if((0,a.Xq)(i)&&t.length>i&&(t=this.value&&this.value.length===+i?this.value:t.slice(0,i)),"number"===this.type||"digit"===this.type){var n="number"===this.type;t=(0,c.uf)(t,n,n)}this.formatter&&e===this.formatTrigger&&(t=this.formatter(t));var r=this.$refs.input;r&&t!==r.value&&(r.value=t),t!==this.value&&this.$emit("input",t)},onInput:function(t){t.target.composing||this.updateValue(t.target.value)},onFocus:function(t){this.focused=!0,this.$emit("focus",t),this.$nextTick(this.adjustSize),this.getProp("readonly")&&this.blur()},onBlur:function(t){this.getProp("readonly")||(this.focused=!1,this.updateValue(this.value,"onBlur"),this.$emit("blur",t),this.validateWithTrigger("onBlur"),this.$nextTick(this.adjustSize),h())},onClick:function(t){this.$emit("click",t)},onClickInput:function(t){this.$emit("click-input",t)},onClickLeftIcon:function(t){this.$emit("click-left-icon",t)},onClickRightIcon:function(t){this.$emit("click-right-icon",t)},onClear:function(t){(0,d.PF)(t),this.$emit("input",""),this.$emit("clear",t)},onKeypress:function(t){var e=13;if(t.keyCode===e){var i=this.getProp("submitOnEnter");i||"textarea"===this.type||(0,d.PF)(t),"search"===this.type&&this.blur()}this.$emit("keypress",t)},adjustSize:function(){var t=this.$refs.input;if("textarea"===this.type&&this.autosize&&t){var e=(0,o.oD)();t.style.height="auto";var i=t.scrollHeight;if((0,a.Kn)(this.autosize)){var n=this.autosize,r=n.maxHeight,s=n.minHeight;r&&(i=Math.min(i,r)),s&&(i=Math.max(i,s))}i&&(t.style.height=i+"px",(0,o.kn)(e))}},genInput:function(){var t=this.$createElement,e=this.type,i=this.getProp("disabled"),n=this.getProp("readonly"),a=this.slots("input"),l=this.getProp("inputAlign");if(a)return t("div",{class:y("control",[l,"custom"]),on:{click:this.onClickInput}},[a]);var o={ref:"input",class:y("control",l),domProps:{value:this.value},attrs:(0,s.Z)({},this.$attrs,{name:this.name,disabled:i,readonly:n,placeholder:this.placeholder}),on:this.listeners,directives:[{name:"model",value:this.value}]};if("textarea"===e)return t("textarea",r()([{},o]));var u,h=e;return"number"===e&&(h="text",u="decimal"),"digit"===e&&(h="tel",u="numeric"),t("input",r()([{attrs:{type:h,inputmode:u}},o]))},genLeftIcon:function(){var t=this.$createElement,e=this.slots("left-icon")||this.leftIcon;if(e)return t("div",{class:y("left-icon"),on:{click:this.onClickLeftIcon}},[this.slots("left-icon")||t(v.Z,{attrs:{name:this.leftIcon,classPrefix:this.iconPrefix}})])},genRightIcon:function(){var t=this.$createElement,e=this.slots,i=e("right-icon")||this.rightIcon;if(i)return t("div",{class:y("right-icon"),on:{click:this.onClickRightIcon}},[e("right-icon")||t(v.Z,{attrs:{name:this.rightIcon,classPrefix:this.iconPrefix}})])},genWordLimit:function(){var t=this.$createElement;if(this.showWordLimit&&this.maxlength){var e=(this.value||"").length;return t("div",{class:y("word-limit")},[t("span",{class:y("word-num")},[e]),"/",this.maxlength])}},genMessage:function(){var t=this.$createElement;if(!this.vanForm||!1!==this.vanForm.showErrorMessage){var e=this.errorMessage||this.validateMessage;if(e){var i=this.getProp("errorMessageAlign");return t("div",{class:y("error-message",i)},[e])}}},getProp:function(t){return(0,a.Xq)(this[t])?this[t]:this.vanForm&&(0,a.Xq)(this.vanForm[t])?this.vanForm[t]:void 0},genLabel:function(){var t=this.$createElement,e=this.getProp("colon")?":":"";return this.slots("label")?[this.slots("label"),e]:this.label?t("span",[this.label+e]):void 0}},render:function(){var t,e=arguments[0],i=this.slots,n=this.getProp("disabled"),r=this.getProp("labelAlign"),s={icon:this.genLeftIcon},a=this.genLabel();a&&(s.title=function(){return a});var l=this.slots("extra");return l&&(s.extra=function(){return l}),e(m.Z,{attrs:{icon:this.leftIcon,size:this.size,center:this.center,border:this.border,isLink:this.isLink,required:this.required,clickable:this.clickable,titleStyle:this.labelStyle,valueClass:y("value"),titleClass:[y("label",r),this.labelClass],arrowDirection:this.arrowDirection},scopedSlots:s,class:y((t={error:this.showError,disabled:n},t["label-"+r]=r,t["min-height"]="textarea"===this.type&&!this.autosize,t)),on:{click:this.onClick}},[e("div",{class:y("body")},[this.genInput(),this.showClear&&e(v.Z,{attrs:{name:"clear"},class:y("clear"),on:{touchstart:this.onClear}}),this.genRightIcon(),i("button")&&e("div",{class:y("button")},[i("button")])]),this.genWordLimit(),this.genMessage()])}})},1611:function(t,e,i){i(8924),i(885),i(4240),i(3164),i(7549)},4535:function(t,e,i){function n(t,e,i){return Math.min(Math.max(t,e),i)}function r(t,e,i){var n=t.indexOf(e),r="";return-1===n?t:"-"===e&&0!==n?t.slice(0,n):("."===e&&t.match(/^(\.|-\.)/)&&(r=n?"-0":"0"),r+t.slice(0,n+1)+t.slice(n).replace(i,""))}function s(t,e,i){void 0===e&&(e=!0),void 0===i&&(i=!0),t=e?r(t,".",/\./g):t.split(".")[0],t=i?r(t,"-",/-/g):t.replace(/-/,"");var n=e?/[^-0-9.]/g:/[^-0-9]/g;return t.replace(n,"")}i.d(e,{uf:function(){return s},w6:function(){return n}})}}]);
//# sourceMappingURL=494.6603dbab.js.map