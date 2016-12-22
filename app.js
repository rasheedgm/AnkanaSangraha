var articleAll =[];
$(document).ready(function(){
    
    //Pull from VB
    $('#pull-data-vb').on("click", function(){
        articleAll =[];
        document.getElementById("progress-bar").style.width = "0%";
        $.ajax({
            url:"http://www.varthabharati.in/category/ankana",
            type: 'GET',
            success: function(res){
                var pullArticleList= $(res.responseText).find('#block-views-child-term-blocks-block').find('.grid');            
                pullArticleList.each(function(index,newHead){
                    var textA="http://www.varthabharati.in/" + $(newHead).find(".views-row-1 ").find("a").attr("href");
                    //$('.vb-links').append(textA + "</br>");
                    getarticleVb(textA,pullArticleList.length);
                });
            },
            error: function(){
                alert("error");
            },
            complete: function(){
                //alert("pull complete")
            },
            beforeSend: function(){
                $('#pull-data-vb').text("Pulling data from VB..");
            }
        });
        // onclick suddi ends
        //getarticle from suddi page function
        function getarticleVb(Url,n){
            var article= {};
            //alert(n);
            $.ajax({
                url: Url,
                type: 'GET',
                success: function(res){
                    article.title = $(res.responseText).find('#main-content').find("#page-title").text();
                    article.author = $(res.responseText).find('#main-content').find(".field-name-field-story-author").text();
                    article.body="";
                    $(res.responseText).find('#main-content').find(".field-items").find('p').each(function(index, articleBody){
                        article.body = article.body + "\n" + $(articleBody).text();
                    });
                    article.image = $(res.responseText).find('#main-content').find(".field-items img").first().attr("src");
                    //alert(article.body);
                    if(typeof article.image === 'undefined'){  
                        article.image="";
                    };
                    article.url=Url;
                    article.featured=false;
                    article.published=true;
                    article.publisher="Varthabarati"
                    console.log(article);
                    var currentLength = updatearticleAllObj(article);
                    var progressPercent = (100*currentLength)/n;
                    progressPercent = progressPercent + "%";
                    document.getElementById("progress-bar").style.width = progressPercent;
                    var data = {title: article.title,author:article.author, body: article.body, image: article.image, url: article.url};
                    
                },
                error: function(){
                    alert("error");
                },
                beforeSend: function(){
                    $('#pull-data-vb').text("Pulling data from VB..");
                },
                complete: function(){
                    $('#pull-data-vb').text("Pulling Done!!");
                }
            });
        };
    }); 
    //on click varthabharathi
    function updatearticleAllObj(obj){
        articleAll=articleAll.concat(obj);
        return articleAll.length;
    };
    
    $('#click').on("click", function(){
    htmlText = '<!doctype html><html lang="kn"><head> <meta charset="utf-8" /><title>ಅಂಕಣ ಸಂಗ್ರಹ 1</title> <link rel="stylesheet" href="style.css"  type="text/css" /></head><body><div id="toc"> <h2> Table of Contents <br /></h2<ul>';
                    
    
     //toc
      articleAll.forEach(function(article,index){
        i = index+1;
        htmlText = htmlText + '<li><a href="#ch'+i+ '">'+ article.title + '</a></li>';
    });  
 
     
    htmlText = htmlText + '</ul></div><div class="pagebreak"></div>';
        
        
    //
    articleAll.forEach(function(article,index){
        i = index+1;
        htmlText = htmlText + '<h2 id="ch'+ i + '">'+ article.title + '</h2>' +'<h3>'+article.author +'</h3>' + '<p>'+ article.body+'</p>'+'<h3>'+article.publisher +'</h3>'
    });
    
    htmlText = htmlText + '</body></html>'
    $('#pulled-data').text(htmlText);
        
    });
    
    
    
    
    
    
    
    function setarticleObj(){
        var cols = [];
        var result = [];
        $('#pulled-data>thead>th').each(function(){
            cols.push($(this).text().toLowerCase());
        });
        $('#pulled-data>tbody>tr').each(function(id){
            var row = {'id': id+1};
            $(this).find('td').each(function(index){
                row[cols[index]] = $(this).text();
            });
            result.push(row);
        });
        console.log(result);
    };
    
});



/*angular app*/
app=angular.module('articleApp', []);
app.controller('articleCtrl', function($scope){
    
});



