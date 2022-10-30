"use strict";var LIVESEARCH=LIVESEARCH||{};!function(e){LIVESEARCH.functions=new function(){var r=jQuery("#frm-course-search").find(".sr-updates");"function"!=typeof window.screenReaderUpdate&&(window.screenReaderUpdate=function(){}),this.init=function(){if(jQuery("#frm-course-search").length>0){this.arrResults=new Array;var r=document.location.toString().match(/https?\:\/\/[^\/]*/);r.length>0&&(this.strSiteURL=r[0],this.strAjaxURL=this.strSiteURL+"/media/wdp/style-assets/php/wdp-inc-ajax-search.php",this.setCoursesURL()),jQuery("#frm-course-search").append(jQuery(document.createElement("div")).attr("id","live-search-holder").hide()),this.iScrollIndex=0,jQuery("#frm-course-search").on("keyup",this.doSearch),jQuery("#frm-course-search").off("keypress"),jQuery("#frm-course-search").on("submit",this.checkSearchSubmission),this.searchForm(),jQuery("#search-departments").length>0&&(this.strIncDepts=jQuery("#search-departments").val()),jQuery("#search-departments-only").length>0&&(this.bFilterResults=jQuery("#search-departments-only").val()),jQuery("#search-query").on("blur",function(){e(":not(#live-search-holder a)").on("click",function(e){jQuery("#live-search-holder").hide()})}),jQuery("#btn-clear-live").on("click",function(){jQuery("#search-query").val(""),LIVESEARCH.functions.doSearch(),jQuery("#btn-clear-live").addClass("visuallyhidden")})}},this.setCoursesURL=function(){if(jQuery("#frm-course-search").attr("action")){var e=jQuery("#frm-course-search").attr("action").split("/");e.splice(e.length-2,1),this.strCoursesURL=e.join("/")}},this.searchForm=function(){jQuery('#frm-course-search input[type="radio"]').on("change",function(){jQuery("#frm-course-search").attr("action",jQuery(this).attr("data-url")),jQuery("#search-query").attr("name",jQuery(this).attr("data-name"));var e=jQuery("#browse-az").attr("href");if(jQuery("#browse-az").attr("href",jQuery("#browse-az").attr("data-switch-url")),jQuery("#browse-az").attr("data-switch-url",e),e=jQuery("#browse-dept").attr("href"),jQuery("#browse-dept").attr("href",jQuery("#browse-dept").attr("data-switch-url")),jQuery("#browse-dept").attr("data-switch-url",e),jQuery("#ug-pg-context").length){var r=jQuery("#ug-pg-context").html().toString();r.indexOf("Undergraduate")>-1?jQuery("#ug-pg-context").html(r.replace("Under","Post")):jQuery("#ug-pg-context").html(r.replace("Post","Under"))}LIVESEARCH.functions.setCoursesURL(),jQuery("#search-category").val("ug"==jQuery(this).val()?"Undergraduate":"Postgraduate")})},this.doSearch=function(e){if(e&&"38"==e.keyCode)LIVESEARCH.functions.scrollResults(!1);else if(e&&"40"==e.keyCode)LIVESEARCH.functions.scrollResults(!0);else if(jQuery("#live-search-holder li.focussed").length>0&&e&&("32"==e.keyCode||"39"==e.keyCode||13===e.keyCode))LIVESEARCH.functions.fireResultLink();else{if(e&&("9"==e.keyCode||16===e.keyCode))return;if(jQuery("#server-search-holder").html(""),""!=jQuery("#search-query").val()){var r=jQuery("#search-type").attr("name"),t="",s="";""!==LIVESEARCH.functions.strIncDepts&&void 0!==LIVESEARCH.functions.strIncDepts?t=LIVESEARCH.functions.strIncDepts:"f"===r?s=jQuery("#search-type").val():t=jQuery("#search-type").val(),LIVESEARCH.functions.iLatestSearch=(new Date).getTime(),LIVESEARCH.ajax&&LIVESEARCH.ajax.abort(),LIVESEARCH.ajax=jQuery.ajax({url:LIVESEARCH.functions.strAjaxURL,type:"GET",data:{q:jQuery("#search-query").val(),c:jQuery("#search-category").val(),df:jQuery("#search-data-path").val(),dd:jQuery("#search-data-depth").val(),d:t,f:s,l:LIVESEARCH.functions.bFilterResults,t:LIVESEARCH.functions.iLatestSearch},success:function(e){LIVESEARCH.functions.onSuccess(e)},failure:function(){LIVESEARCH.functions.onFailure()}})}else LIVESEARCH.ajax&&LIVESEARCH.ajax.abort(),jQuery("#live-search-holder").hide()}return!1},this.scrollResults=function(e){1==e?this.iScrollIndex++:this.iScrollIndex--,this.iScrollIndex<0?this.iScrollIndex=0:this.iScrollIndex>jQuery("#live-search-holder li").length&&(this.iScrollIndex=jQuery("#live-search-holder li").length),jQuery("#live-search-holder li").each(function(e,r){e+1==LIVESEARCH.functions.iScrollIndex?jQuery(r).addClass("focussed"):jQuery(r).removeClass("focussed")})},this.fireResultLink=function(){window.location.href=jQuery("#live-search-holder li.focussed a").attr("href")},this.checkSearchSubmission=function(){if(LIVESEARCH.functions.iScrollIndex>0)return LIVESEARCH.functions.fireResultLink(),!1},this.onSuccess=function(e){if(e)for(var r=0;r<e.childNodes.length;r++){var t=e.childNodes[r];if("response"==t.nodeName){this.arrResults=new Array;for(var s=t.childNodes,a=0;a<s.length;a++)if("result"==s[a].nodeName){var u="";void 0!==s[a].attributes.slug&&(u=s[a].attributes.slug.nodeValue.toString());var l="";void 0!==s[a].attributes.note&&(l=s[a].attributes.note.nodeValue.toString());var n="";void 0!==s[a].attributes.param&&(n=s[a].attributes.param.nodeValue.toString());var i="";void 0!==s[a].attributes.category&&(i=s[a].attributes.category.nodeValue.toString()),this.arrResults.push({title:s[a].firstChild.nodeValue.toString(),slug:u,category:i,note:l,param:n})}this.iLatestSearch==parseInt(t.attributes.getNamedItem("requested").value,10)&&this.processResults()}}},this.processResults=function(){var e=10;jQuery("#live-search-holder").html("").show();var t="All"===jQuery("#search-category").val();if(t){for(var s=this.arrResults.length,e=3,a=new Array,u=new Array,l=0;l<s;l++)"Postgraduate"===this.arrResults[l].category?u.push(this.arrResults[l]):a.push(this.arrResults[l]);var n=a.length;if(n>0){jQuery("#live-search-holder").append(jQuery(document.createElement("h3")).html("Undergraduate Courses"));var i=jQuery(document.createElement("ul")).addClass("resultlist ug").attr("aria-label","Undergraduate Courses");jQuery("#live-search-holder").append(i);for(var o=jQuery("#frm-course-search").attr("data-ugurl"),c=Q?n:Math.min(n,e),h=0;h<c;h++){var d="";d=""===a[h].slug?this.createUrl(a[h].title):a[h].slug,jQuery(".resultlist.ug").append(jQuery(document.createElement("li")).append(jQuery(document.createElement("a")).html(a[h].title+a[h].note).attr("href",o+d+"/"+a[h].param)))}a.length>e&&jQuery(".resultlist.ug").append(jQuery(document.createElement("li")).append(jQuery(document.createElement("a")).attr("href",o+"?q="+escape(jQuery("#search-query").val())).html("More courses found")).addClass("ajax-view-results"))}var y=u.length;if(y>0){jQuery("#live-search-holder").append(jQuery(document.createElement("h3")).html("Postgraduate Courses"));var j=jQuery(document.createElement("ul")).addClass("resultlist pg").attr("aria-label","Postgraduate Courses");jQuery("#live-search-holder").append(j);for(var o=jQuery("#frm-course-search").attr("data-pgurl"),f=Q?y:Math.min(y,e),p=0;p<f;p++){var d="";d=""===u[p].slug?this.createUrl(u[p].title):u[p].slug,jQuery(".resultlist.pg").append(jQuery(document.createElement("li")).append(jQuery(document.createElement("a")).html(u[p].title+u[p].note).attr("href",o+d+"/"+u[p].param)))}u.length>e&&jQuery(".resultlist.pg").append(jQuery(document.createElement("li")).append(jQuery(document.createElement("a")).attr("href",o+"?q="+escape(jQuery("#search-query").val())).html("More courses found")).addClass("ajax-view-results"))}0===n&&0===y&&""!=jQuery("#search-query").val()?(jQuery("#live-search-holder").append(jQuery(document.createElement("p")).html("No results were found").addClass("ajax-no-results")),screenReaderUpdate(r,"No results were found")):screenReaderUpdate(r,"Displaying "+(c+f)+" of "+s+" results")}else if(this.arrResults.length>0){var Q=jQuery("body").hasClass("course-search");jQuery("#live-search-holder").append(jQuery(document.createElement("ul")).addClass("resultlist"));for(var s=this.arrResults.length,m=Q?s:Math.min(s,e),l=0;l<m;l++){var d="";d=""===this.arrResults[l].slug?this.createURL(this.arrResults[l].title):this.arrResults[l].slug,jQuery(".resultlist").append(jQuery(document.createElement("li")).append(jQuery(document.createElement("a")).html(this.arrResults[l].title+this.arrResults[l].note).attr("href",this.strCoursesURL+d+"/"+this.arrResults[l].param)))}screenReaderUpdate(r,"Displaying "+m+" of "+s+" results"),this.appendLink(".resultlist",e,s,jQuery("#frm-course-search").attr("action"))}else""!=jQuery("#search-query").val()&&(jQuery("#live-search-holder").append(jQuery(document.createElement("p")).html("No results were found").addClass("ajax-no-results")),screenReaderUpdate(r,"No results were found"),jQuery("#btn-clear-live").removeClass("visuallyhidden"))},this.appendLink=function(e,r,t,s){jQuery("#btn-clear-live").removeClass("visuallyhidden");var a=jQuery("body").hasClass("course-search"),u="";u=1==t?"View this result":t<r?"View these results":"View all "+t+" results",a||jQuery(e).append(jQuery(document.createElement("li")).append(jQuery(document.createElement("a")).attr("href",s+"?q="+escape(jQuery("#search-query").val())).html(u)).addClass("ajax-view-results"))},this.createURL=function(e){return e.replace(/[^a-z0-9 ]*/gi,"").replace(/ +/gi,"-").toLowerCase()},this.onFailure=function(){alert("An error occurred")}},LIVESEARCH.functions.init()}(jQuery);