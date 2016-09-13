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
Progress('img[src]')

// Modal Box
function ModalBox() {
    var $modalBox     = $('.modal')
    var $modalContent = $('.modal__content')
    var $modalClose   = $('.modal__close')
    var $modalControl = $('.modalControl')

    $modalControl.on('click',function() {
        var modalTarget = $(this).attr('href'),
            $modalTarget = $(modalTarget)

        $modalContent.removeClass('active')
        $modalBox.addClass('active')
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

// Lazyload
function lazyload(elem) {

    var lazyArea = elem,
        lazyItem = lazyArea.find('img[data-lazy]')

    function loadCheck() {
        if(this.complete) {
            this.setAttribute('class', 'lazyloaded')
            this.removeAttribute('data-lazy')
        }
    }

    lazyItem.each(function() {
        var lazySrc = this.getAttribute('data-lazy')
        this.setAttribute('src', lazySrc)
    }).on('load', loadCheck)
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

        // lazyload
        lazyload($targetMain)
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

        // lazyload
        lazyload($target)
    })

    // Bubble Control
    $('.bubbleControl').on('click', function() {
        $(this).toggleClass('active')
        $(this).siblings('.bubble').toggleClass('hide')
    })

})