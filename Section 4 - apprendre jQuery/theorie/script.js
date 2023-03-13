$(function(){
    $("#p1").on({
        mouseenter: function(){
            $("#p5").hide();
        },
        mouseleave: function(){
            $("#p5").show();
        },
        click:function(){
            $("#p4").toggle();
        },

    });
    $("#p2").click(function(){
        $("#p3").hide(3000,function(){
            $("#p4").hide(3000,function(){
                $("#p5").hide(3000);
            });
        });
    });   
        
    $("#start").click(function(){
        $("#carre1").animate({
            left: '250px',
            width: '+=250px',
            opacity:1,
        },1500, function(){
            $("#carre1").animate({
                left: '25px',
                width: '100px',
                opacity:0.2
            },2000,function(){
                $("#carre1").slideUp(2000).slideDown(2000).fadeOut(3000).fadeIn(3000);
            });
        });
    });
    $("#stop").click(function(){
        $("#carre1").stop();
    });

    
    $("#test").click(function(){
        var myVar = $("#myInput").val("hello");
        $("#pp1").html("my new <br> text");
        $("#carre2").append("<p> nouveau paragraph <\p>")
    });
});