//>>built
define("dojo/data/ItemFileReadStore","../_base/kernel,../_base/lang,../_base/declare,../_base/array,../_base/xhr,../Evented,./util/filter,./util/simpleFetch,../date/stamp".split(","),function(k,l,n,q,o,r,p,s,t){n=n("dojo.data.ItemFileReadStore",[r],{constructor:function(a){this._arrayOfAllItems=[];this._arrayOfTopLevelItems=[];this._loadFinished=!1;this.url=this._ccUrl=this._jsonFileUrl=a.url;this._jsonData=a.data;this.data=null;this._datatypeMap=a.typeMap||{};this._datatypeMap.Date||(this._datatypeMap.Date=
{type:Date,deserialize:function(a){return t.fromISOString(a)}});this._features={"dojo.data.api.Read":!0,"dojo.data.api.Identity":!0};this._itemsByIdentity=null;this._storeRefPropName="_S";this._itemNumPropName="_0";this._rootItemPropName="_RI";this._reverseRefMap="_RRM";this._loadInProgress=!1;this._queuedFetches=[];if(void 0!==a.urlPreventCache)this.urlPreventCache=a.urlPreventCache?!0:!1;if(void 0!==a.hierarchical)this.hierarchical=a.hierarchical?!0:!1;if(a.clearOnClose)this.clearOnClose=!0;if("failOk"in
a)this.failOk=a.failOk?!0:!1},url:"",_ccUrl:"",data:null,typeMap:null,clearOnClose:!1,urlPreventCache:!1,failOk:!1,hierarchical:!0,_assertIsItem:function(a){if(!this.isItem(a))throw Error(this.declaredClass+": Invalid item argument.");},_assertIsAttribute:function(a){if("string"!==typeof a)throw Error(this.declaredClass+": Invalid attribute argument.");},getValue:function(a,b,e){a=this.getValues(a,b);return 0<a.length?a[0]:e},getValues:function(a,b){this._assertIsItem(a);this._assertIsAttribute(b);
return(a[b]||[]).slice(0)},getAttributes:function(a){this._assertIsItem(a);var b=[],e;for(e in a)e!==this._storeRefPropName&&e!==this._itemNumPropName&&e!==this._rootItemPropName&&e!==this._reverseRefMap&&b.push(e);return b},hasAttribute:function(a,b){this._assertIsItem(a);this._assertIsAttribute(b);return b in a},containsValue:function(a,b,e){var d=void 0;"string"===typeof e&&(d=p.patternToRegExp(e,!1));return this._containsValue(a,b,e,d)},_containsValue:function(a,b,e,d){return q.some(this.getValues(a,
b),function(a){if(null!==a&&!l.isObject(a)&&d){if(a.toString().match(d))return!0}else if(e===a)return!0})},isItem:function(a){return a&&a[this._storeRefPropName]===this&&this._arrayOfAllItems[a[this._itemNumPropName]]===a?!0:!1},isItemLoaded:function(a){return this.isItem(a)},loadItem:function(a){this._assertIsItem(a.item)},getFeatures:function(){return this._features},getLabel:function(a){if(this._labelAttr&&this.isItem(a))return this.getValue(a,this._labelAttr)},getLabelAttributes:function(){return this._labelAttr?
[this._labelAttr]:null},filter:function(a,b,e){var d=[],i,c;if(a.query){var f;i=a.queryOptions?a.queryOptions.ignoreCase:!1;var h={};for(c in a.query)f=a.query[c],"string"===typeof f?h[c]=p.patternToRegExp(f,i):f instanceof RegExp&&(h[c]=f);for(i=0;i<b.length;++i){var j=!0,g=b[i];if(null===g)j=!1;else for(c in a.query)f=a.query[c],this._containsValue(g,c,f,h[c])||(j=!1);j&&d.push(g)}}else for(i=0;i<b.length;++i)c=b[i],null!==c&&d.push(c);e(d,a)},_fetchItems:function(a,b,e){var d=this;if(this._loadFinished)this.filter(a,
this._getItemsArray(a.queryOptions),b);else{if(this._jsonFileUrl!==this._ccUrl)k.deprecated(this.declaredClass+": ","To change the url, set the url property of the store, not _jsonFileUrl.  _jsonFileUrl support will be removed in 2.0"),this.url=this._ccUrl=this._jsonFileUrl;else if(this.url!==this._ccUrl)this._ccUrl=this._jsonFileUrl=this.url;if(null!=this.data)this._jsonData=this.data,this.data=null;if(this._jsonFileUrl)if(this._loadInProgress)this._queuedFetches.push({args:a,filter:l.hitch(d,"filter"),
findCallback:l.hitch(d,b)});else{this._loadInProgress=!0;var i=o.get({url:d._jsonFileUrl,handleAs:"json-comment-optional",preventCache:this.urlPreventCache,failOk:this.failOk});i.addCallback(function(c){try{d._getItemsFromLoadedData(c),d._loadFinished=!0,d._loadInProgress=!1,d.filter(a,d._getItemsArray(a.queryOptions),b),d._handleQueuedFetches()}catch(f){d._loadFinished=!0,d._loadInProgress=!1,e(f,a)}});i.addErrback(function(b){d._loadInProgress=!1;e(b,a)});var c=null;if(a.abort)c=a.abort;a.abort=
function(){i&&-1===i.fired&&i.cancel();c&&c.call(a)}}else if(this._jsonData)try{this._loadFinished=!0,this._getItemsFromLoadedData(this._jsonData),this._jsonData=null,d.filter(a,this._getItemsArray(a.queryOptions),b)}catch(f){e(f,a)}else e(Error(this.declaredClass+": No JSON source data was provided as either URL or a nested Javascript object."),a)}},_handleQueuedFetches:function(){if(0<this._queuedFetches.length){for(var a=0;a<this._queuedFetches.length;a++){var b=this._queuedFetches[a],e=b.args,
d=b.filter,b=b.findCallback;d?d(e,this._getItemsArray(e.queryOptions),b):this.fetchItemByIdentity(e)}this._queuedFetches=[]}},_getItemsArray:function(a){return a&&a.deep?this._arrayOfAllItems:this._arrayOfTopLevelItems},close:function(){if(this.clearOnClose&&this._loadFinished&&!this._loadInProgress)this._arrayOfAllItems=[],this._arrayOfTopLevelItems=[],this._loadFinished=!1,this._itemsByIdentity=null,this._loadInProgress=!1,this._queuedFetches=[]},_getItemsFromLoadedData:function(a){function b(a){return null!==
a&&"object"===typeof a&&(!l.isArray(a)||d)&&!l.isFunction(a)&&(a.constructor==Object||l.isArray(a))&&"undefined"===typeof a._reference&&"undefined"===typeof a._type&&"undefined"===typeof a._value&&i.hierarchical}function e(a){i._arrayOfAllItems.push(a);for(var d in a){var c=a[d];if(c)if(l.isArray(c))for(var f=0;f<c.length;++f){var g=c[f];b(g)&&e(g)}else b(c)&&e(c)}}var d=!1,i=this;this._labelAttr=a.label;var c,f;this._arrayOfAllItems=[];this._arrayOfTopLevelItems=a.items;for(c=0;c<this._arrayOfTopLevelItems.length;++c)f=
this._arrayOfTopLevelItems[c],l.isArray(f)&&(d=!0),e(f),f[this._rootItemPropName]=!0;var h={},j;for(c=0;c<this._arrayOfAllItems.length;++c)for(j in f=this._arrayOfAllItems[c],f){if(j!==this._rootItemPropName){var g=f[j];null!==g?l.isArray(g)||(f[j]=[g]):f[j]=[null]}h[j]=j}for(;h[this._storeRefPropName];)this._storeRefPropName+="_";for(;h[this._itemNumPropName];)this._itemNumPropName+="_";for(;h[this._reverseRefMap];)this._reverseRefMap+="_";if(h=a.identifier){this._itemsByIdentity={};this._features["dojo.data.api.Identity"]=
h;for(c=0;c<this._arrayOfAllItems.length;++c)if(f=this._arrayOfAllItems[c],a=f[h],a=a[0],Object.hasOwnProperty.call(this._itemsByIdentity,a)){if(this._jsonFileUrl)throw Error(this.declaredClass+":  The json data as specified by: ["+this._jsonFileUrl+"] is malformed.  Items within the list have identifier: ["+h+"].  Value collided: ["+a+"]");if(this._jsonData)throw Error(this.declaredClass+":  The json data provided by the creation arguments is malformed.  Items within the list have identifier: ["+
h+"].  Value collided: ["+a+"]");}else this._itemsByIdentity[a]=f}else this._features["dojo.data.api.Identity"]=Number;for(c=0;c<this._arrayOfAllItems.length;++c)f=this._arrayOfAllItems[c],f[this._storeRefPropName]=this,f[this._itemNumPropName]=c;for(c=0;c<this._arrayOfAllItems.length;++c)for(j in f=this._arrayOfAllItems[c],f){a=f[j];for(h=0;h<a.length;++h)if(g=a[h],null!==g&&"object"==typeof g){if("_type"in g&&"_value"in g){var k=g._type,m=this._datatypeMap[k];if(m)if(l.isFunction(m))a[h]=new m(g._value);
else if(l.isFunction(m.deserialize))a[h]=m.deserialize(g._value);else throw Error("dojo.data.ItemFileReadStore: Value provided in typeMap was neither a constructor, nor a an object with a deserialize function");else throw Error("dojo.data.ItemFileReadStore: in the typeMap constructor arg, no object class was specified for the datatype '"+k+"'");}if(g._reference){g=g._reference;if(l.isObject(g))for(k=0;k<this._arrayOfAllItems.length;++k){var m=this._arrayOfAllItems[k],n=!0,o;for(o in g)m[o]!=g[o]&&
(n=!1);n&&(a[h]=m)}else a[h]=this._getItemByIdentity(g);this.referenceIntegrity&&(g=a[h],this.isItem(g)&&this._addReferenceToMap(g,f,j))}else this.isItem(g)&&this.referenceIntegrity&&this._addReferenceToMap(g,f,j)}}},_addReferenceToMap:function(){},getIdentity:function(a){var b=this._features["dojo.data.api.Identity"];return b===Number?a[this._itemNumPropName]:(a=a[b])?a[0]:null},fetchItemByIdentity:function(a){var b,e;if(this._loadFinished)b=this._getItemByIdentity(a.identity),a.onItem&&(e=a.scope?
a.scope:k.global,a.onItem.call(e,b));else{var d=this;if(this._jsonFileUrl!==this._ccUrl)k.deprecated(this.declaredClass+": ","To change the url, set the url property of the store, not _jsonFileUrl.  _jsonFileUrl support will be removed in 2.0"),this.url=this._ccUrl=this._jsonFileUrl;else if(this.url!==this._ccUrl)this._ccUrl=this._jsonFileUrl=this.url;if(null!=this.data&&null==this._jsonData)this._jsonData=this.data,this.data=null;if(this._jsonFileUrl)this._loadInProgress?this._queuedFetches.push({args:a}):
(this._loadInProgress=!0,e=o.get({url:d._jsonFileUrl,handleAs:"json-comment-optional",preventCache:this.urlPreventCache,failOk:this.failOk}),e.addCallback(function(e){var c=a.scope?a.scope:k.global;try{d._getItemsFromLoadedData(e),d._loadFinished=!0,d._loadInProgress=!1,b=d._getItemByIdentity(a.identity),a.onItem&&a.onItem.call(c,b),d._handleQueuedFetches()}catch(f){d._loadInProgress=!1,a.onError&&a.onError.call(c,f)}}),e.addErrback(function(b){d._loadInProgress=!1;a.onError&&a.onError.call(a.scope?
a.scope:k.global,b)}));else if(this._jsonData)d._getItemsFromLoadedData(d._jsonData),d._jsonData=null,d._loadFinished=!0,b=d._getItemByIdentity(a.identity),a.onItem&&(e=a.scope?a.scope:k.global,a.onItem.call(e,b))}},_getItemByIdentity:function(a){var b=null;this._itemsByIdentity?Object.hasOwnProperty.call(this._itemsByIdentity,a)&&(b=this._itemsByIdentity[a]):Object.hasOwnProperty.call(this._arrayOfAllItems,a)&&(b=this._arrayOfAllItems[a]);void 0===b&&(b=null);return b},getIdentityAttributes:function(){var a=
this._features["dojo.data.api.Identity"];return a===Number?null:[a]},_forceLoad:function(){var a=this;if(this._jsonFileUrl!==this._ccUrl)k.deprecated(this.declaredClass+": ","To change the url, set the url property of the store, not _jsonFileUrl.  _jsonFileUrl support will be removed in 2.0"),this.url=this._ccUrl=this._jsonFileUrl;else if(this.url!==this._ccUrl)this._ccUrl=this._jsonFileUrl=this.url;if(null!=this.data)this._jsonData=this.data,this.data=null;if(this._jsonFileUrl){var b=o.get({url:this._jsonFileUrl,
handleAs:"json-comment-optional",preventCache:this.urlPreventCache,failOk:this.failOk,sync:!0});b.addCallback(function(b){try{if(!0!==a._loadInProgress&&!a._loadFinished)a._getItemsFromLoadedData(b),a._loadFinished=!0;else if(a._loadInProgress)throw Error(this.declaredClass+":  Unable to perform a synchronous load, an async load is in progress.");}catch(d){throw d;}});b.addErrback(function(a){throw a;})}else if(this._jsonData)a._getItemsFromLoadedData(a._jsonData),a._jsonData=null,a._loadFinished=
!0}});l.extend(n,s);return n});