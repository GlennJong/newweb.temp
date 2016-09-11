// After loading
setTimeout(function(){
    $('#heading').addClass('finish')
},3700)

// Progress
function Progress (elem) {
    var $elem = $(elem)
    var total  = $elem.length;
    var finish = 0
    $elem.on('load', loaded)
            .each(chechCompleted)

    function chechCompleted() {
        if (this.complete) {
            loaded.call(this)
        }
    }
    function loaded() {
        finish += 1
        var percent = finish / total * 100
        $('.progress .progress-inset').width(percent + '%')
        console.log(percent)
        if (percent >= 100) {
            $('body').addClass('load-done')
            console.log('work!')
        }
    }
}
Progress('img')

// Modal Box
function ModalBox() {
    var $modalBox = $('.modal')
    var $modalClose = $('.modal__close')
    var $modalControl = $('.modalControl')

    $modalControl.on('click',function() {
        var modalTarget = $(this).attr('href'),
        $modalTarget = $(modalTarget)
        $modalTarget.addClass('active')
    })
    $modalClose.on('click',function() {
        $modalBox.removeClass('active')
    })
    $(window).on('click',function(e) {
        var clickTarget = $(e.target)
        if (clickTarget.is('.modal')) {
            $modalBox.removeClass('active')
        }
    })
}


$(document).ready(function() {

    // ModalBox
    ModalBox()

    // Nav Control
	$('.nav__btn').on('click', function() {
		var target        = $(this).data('target'),
            targetMain    = '#' + target,
            $targetMain   = $(targetMain),
            targetSubnav  = '.subnav-' + target
            $targetSubnav = $(targetSubnav)
		$('.main').addClass('open')
		$('.main__section, .main__subnav__button').removeClass('active')
        $targetMain.addClass('active')
		$targetSubnav.addClass('active')
	})
	$('#backControl').on('click', function() {
		$('.main').removeClass('open')
	})

    // SubNav Control
    $('#subnavClose').on('click', function() {
        $('#subnav').toggleClass('active')
    })
    $('.sectionControl').on('click', function() {
        var target  = '#' + $(this).data('target'),
            $target = $(target)
        $('.sectionControl, #subnav, .main__section').removeClass('active')
        $target.addClass('active')
        $(this).addClass('active')
    })

})