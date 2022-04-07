
$(".roadmap-info ul li span").click(function() {
    if ($(this).parent().hasClass('active2')) {
        $(this).parent().children('ul').slideUp()
        $(this).parent().removeClass('active2')
        $(".roadmap-info").removeClass('active')
    } else {
        $('.roadmap-info > ul > li > ul').slideUp()
        $('.roadmap-info ul li').removeClass('active2')
        
        $(this).parent().children('ul').slideDown()
        $(this).parent().addClass('active2')
        $(".roadmap-info").addClass('active')
        $(".roadmap-info ul li").removeClass('active')
    }

});

$(".roadmap-info > ul > li > a").hover(function() {
    $(".roadmap-info").addClass('active')
    $(".roadmap-info ul li").removeClass('active')
    $(this).parent().addClass('active')
});


$(".roadmap-info > ul ").mouseleave(function() {
    $(".roadmap-info").removeClass('active')
    $(".roadmap-info ul li").removeClass('active')
});

$(".roadmap-info > ul > li > ul ").mouseleave(function() {
    $(".roadmap-info").removeClass('active')
    $(".roadmap-info ul li").removeClass('active')
});

$(".roadmap-info > ul > li > a").hover(function() {
    $(".roadmap-info").addClass('active')
    $(".roadmap-info ul li").removeClass('active')
    $(this).parent().addClass('active')
});