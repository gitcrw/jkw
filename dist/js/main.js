"use strict";!function(){$("#head").load("head.html"),$("#foot").load("foot.html");var t,n=["rgb(197, 55, 69)","rgb(71, 166, 224)","rgb(155, 21, 21)","rgb(40, 65, 147)","rgb(124, 183, 223)","rgb(93, 120, 105)","rgb(255, 178, 188)","rgb(36, 107, 163)","rgb(51, 21, 10)"],e=new Swiper(".banner .swiper-container",{noSwiping:!0,noSwipingClass:"stop-swiping",effect:"fade",speed:1e3,loop:!0,autoplay:{delay:2e3,disableOnInteraction:!1},pagination:{el:".swiper-pagination",clickable:!0,renderBullet:function(t,n){return'<span class="'+n+'">'+(t+1)+"</span>"}},on:{slideChange:function(){$("#banner").css("background",n[this.realIndex])}},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}});(t=document.getElementsByClassName("swiper-container")[0]).onmouseover=function(){e.autoplay.stop()},t.onmouseout=function(){e.autoplay.start()},(t=document.getElementsByClassName("swiper-container")[1]).onmouseover=function(){i.autoplay.stop()},t.onmouseout=function(){i.autoplay.start()};var i=new Swiper(".news_r .swiper-container",{noSwiping:!0,noSwipingClass:"stop-swiping",effect:"slide",speed:1e3,loop:!0,autoplay:{delay:2e3,disableOnInteraction:!1},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}});function o(t,n,e){$.ajax({type:"post",url:"../api/goods.php",data:{star:t,end:n},success:function(t){var n=JSON.parse(t).map(function(t){return'\n\t\t\t\t\t\t<div gid="'+t.gid+'">\n\t\t\t\t\t\t\t<img src="../db_imgs/'+t.fimgurl+'" alt="" />\n\t\t\t\t\t\t\t<div class="bottom">\n\t\t\t\t\t\t\t\t<h3>'+t.name+"</h3>\n\t\t\t\t\t\t\t\t<p>"+t.desc+"</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>"}).join("");$(e).html(n)}})}function s(t,n,e){$.ajax({type:"post",url:"../api/goods.php",data:{star:t,end:n},success:function(t){var n=JSON.parse(t).map(function(t){return'\n\t\t\t\t\t\t<li gid="'+t.gid+'"><a href="detail.html?'+t.gid+'">\n\t\t\t\t\t\t\t<p>'+t.name+'</p>\n\t\t\t\t\t\t\t<img src="../db_imgs/'+t.fimgurl+'" alt="" />\n\t\t\t\t\t\t</a></li>'}).join("");$(e).html(n)}})}$.ajax({type:"post",url:"../api/goods.php",data:{star:1,end:4},success:function(t){var n=JSON.parse(t).map(function(t){return'\n\t\t\t\t\t<div class="hot_goods" gid="'+t.gid+'">\n\t\t\t\t\t\t<a href="detail.html?'+t.gid+'" target="_blank">\n\t\t\t\t\t\t\t<img src="../db_imgs/'+t.fimgurl+'" alt="" />\n\t\t\t\t\t\t\t<div class="imgbox">\n\t\t\t\t\t\t\t\t<h3>'+t.name+"</h3>\n\t\t\t\t\t\t\t\t<p>"+t.desc+"</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</div>"}).join("");$("#hot_t").html(n)}}),$.ajax({type:"post",url:"../api/goods.php",data:{star:5,end:16},success:function(t){var n=JSON.parse(t).map(function(t){return'\n\t\t\t\t\t<li gid="'+t.gid+'">\n\t\t\t\t\t\t<a href="detail.html?'+t.gid+'">\n\t\t\t\t\t\t\t<img src="../db_imgs/'+t.fimgurl+'" alt="" />\n\t\t\t\t\t\t\t<div class="dt">\n\t\t\t\t\t\t\t\t<h4>'+t.name+"</h4><h5>"+t.desc+"</h5>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</li>"}).join("");$("#hot_b").html(n)}});var a=$(".onef_h2").offset().top,r=$(".twof_h2").offset().top,l=$(".threef_h2").offset().top,c=$(".fourf_h2").offset().top,d=$(".fivef_h2").offset().top,p=$(".sixf_h2").offset().top;window.onscroll=function(){if(window.scrollY>a){setTimeout(function(){o(17,17,"#onecenter"),s(12,15,"#onerl"),s(12,14,"#onerr")},500),a=1e7}if(window.scrollY>r){setTimeout(function(){o(17,17,"#twocenter"),s(12,15,"#tworl"),s(12,14,"#tworr")},500),r=1e7}if(window.scrollY>l){setTimeout(function(){o(17,17,"#threecenter"),s(12,15,"#threerl"),s(12,14,"#threerr")},500),l=1e7}if(window.scrollY>c){setTimeout(function(){o(17,17,"#fourcenter"),s(12,15,"#fourrl"),s(12,14,"#fourrr")},500),c=1e7}if(window.scrollY>d){setTimeout(function(){o(17,17,"#fivecenter"),s(12,15,"#fiverl"),s(12,14,"#fiverr")},500),d=1e7}if(window.scrollY>p){setTimeout(function(){o(17,17,"#sixcenter"),s(12,15,"#sixrl"),s(12,14,"#sixrr")},500),p=1e7}500<window.scrollY?$(".r_st").fadeIn():$(".r_st").fadeOut()},$("#ntab a").hover(function(){$(this).addClass("active").siblings().attr("class",""),$("#ninfo>div").eq($(this).index()).addClass("show").siblings().attr("class","")}),$("#ntab2 a").hover(function(){$(this).addClass("active").siblings().attr("class",""),$("#ninfo2>div").eq($(this).index()).addClass("show").siblings().attr("class","")}),$(".r_sm").mouseover(function(){$(".wxxcx").animate({left:-315},200),$(".wxapp").animate({left:-155},200)}),$(".r_sm").mouseleave(function(){$(".wxxcx").animate({left:100},200),$(".wxapp").animate({left:260},200)}),$(".r_st").click(function(){$("html, body").animate({scrollTop:0},500)})}();