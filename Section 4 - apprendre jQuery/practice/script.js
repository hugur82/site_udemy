$(function(){
    var $mainMenuItem = $("#main-menu ul").children("li"),
    totalMainMenuItems = $mainMenuItem.length,
    openedIndex = 2,

    init = function(){
        bindEvents();
        if(ValidIndex(openedIndex))
        {
            animateItem($mainMenuItem.eq(openedIndex), true, 750);
        }

    },

    bindEvents = function(){
        
        $mainMenuItem.children(".images").click(function(){
            var newIndex = $(this).parent().index();
            checkAndAnimateItem(newIndex);
        });
        $(".button").hover(
            function(){
                $(this).addClass("hovered")
            },
            function(){
                $(this).removeClass("hovered")
                
            }
        );
        $(".button").click(function(){
            var newIndex = $(this).index();
            checkAndAnimateItem(newIndex);

        });
    };
    
    ValidIndex = function(indexToCheck)
    {
        return (indexToCheck >= 0 ) && (indexToCheck < totalMainMenuItems)
    },

    animateItem = function($item, toOpen, speed){
        var $colorImage = $item.find(".color"),
        itemParam = toOpen ? {width: "420px"} : {width: "140px"},
        colorImageParam = toOpen ? {left: "0px"} : {left: "140px"};
        $colorImage.animate(colorImageParam, speed);
        $item.animate(itemParam, speed);
        
    },

    checkAndAnimateItem = function(indexToCheckAndAnimate)
    {
        
        if (openedIndex === indexToCheckAndAnimate)
        {
            animateItem($mainMenuItem.eq(indexToCheckAndAnimate),false,250);
            openedIndex = -1;
        }
        else
        {
            if(ValidIndex(indexToCheckAndAnimate))
            {
                animateItem($mainMenuItem.eq(openedIndex),false,250);
                openedIndex = indexToCheckAndAnimate;
                animateItem($mainMenuItem.eq(openedIndex),true,250);
            }
        }   
    }
    init();
});