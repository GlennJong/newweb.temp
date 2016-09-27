// After loading
setTimeout(function(){
    $('#heading').addClass('finish')
},3700)

// Progress
function Progress (elem) {
    $elem = $(elem)
    var total  = $elem.length;
    var finish = 0;
    $elem.one('load', loaded)
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
        // console.log(percent)
        if (percent >= 100) {
            $('body').addClass('load-done')
            // console.log('work!')
        }
    }
}
Progress('img[src]')

// Parallax
function Parallax() {
    centerX = $(window).width()  / 2;
    centerY = $(window).height() / 2;
    // Temp
    mouseX = centerX;
    mouseY = centerY;

    newX   = 0;
    newY   = 0;
    pointX = 0;
    pointY = 0;

    function Layer(elem, delta) {
        this.elem = elem
        this.delta  = delta
    }

    var layers = []
    $('.parallax--layer').each(function() {
        var delta = $(this).data('parallax')
        layers.push(new Layer(this, delta))
    })

    $(window).on('mousemove' , function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function run() {
        pointX = mouseX - centerX;
        pointY = mouseY - centerY;
        newX += ( pointX - newX ) * 1/6;
        newY += ( pointY - newY ) * 1/6;

        layers.forEach(function(layer) {
            parallaxX = newX / layer.delta,
            parallaxY = newY / layer.delta;
            var $elem = $(layer.elem)
            $elem.css({
                'transform': 'translate(' + parallaxX + 'px, ' + parallaxY + 'px)' 
            })
        })
        requestAnimationFrame(run);
    }
    run()
}
Parallax()

// Modal Box
function ModalBox() {
    $modalBox     = $('.modal')
    $modalContent = $('.modal__content')
    $modalClose   = $('.modal__close')
    $modalControl = $('.modalControl')

    // Close
    $modalClose.on('click',function() {
        $modalBox.removeClass('active')
        $modalContent.removeClass('active')
    })
    $(window).on('click',function(e) {
        var clickTarget = $(e.target)
        if (clickTarget.is('.modal')) {
            $modalBox.removeClass('active')
            $modalContent.removeClass('active')
        }
    })

    // Modal Control
    $modalControl.on('click',function() {
        var modalTarget = $(this).attr('href'),
            $modalTarget = $(modalTarget)

        $modalBox.addClass('active')
        $modalTarget.addClass('active')

    })
}

// Picture View
function PictureView() {
    $pictureItem    = $('.item')
    $pictureControl = $('.pictureControl')
    $pictureView    = $('.pictureView')
    $pictureClose   = $('.pictureView__close')
    $picturePrev    = $('.pictureView .prev')
    $pictureNext    = $('.pictureView .next')

    // Close
    $pictureClose.on('click',function() {
        $pictureView.removeClass('active')
        $pictureItem.removeClass('active')
    })
    $(window).on('click',function(e) {
        var clickTarget = $(e.target)
        if (clickTarget.is('.pictureView')) {
            $pictureView.removeClass('active')
            $pictureItem.removeClass('active')
        }
    })

    $pictureControl.on('click', function() {
        $(this).parent('.item').addClass('active')

        var $pictureItem = $('.item.active')
        var pictureSrc   = $pictureItem.find('img').attr('src')

        $pictureView.addClass('active')
        changeSrc()
    })
    $picturePrev.on('click', function() {
        var $pictureItem = $('.item.active')
        var allItem = $pictureItem.siblings('.item').length
        if ($pictureItem.index() === 0) {
            return
        }
        else {
            $pictureItem.removeClass('active').prev().addClass('active')
            changeSrc()
        }
    })
    $pictureNext.on('click', function() {
        var $pictureItem = $('.item.active')
        var allItem = $pictureItem.siblings('.item').length
        if ($pictureItem.index() === allItem) {
            return
        }
        else {
            $pictureItem.removeClass('active').next().addClass('active')
            changeSrc()
        }
    })

    // Change Img src
    function changeSrc() {
        var imgSrc = $('.item.active img').attr('src')
        $pictureView.find('img').attr('src', imgSrc)
    }
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

    // PictureView
    PictureView()

    // Parallax
    $('.parallax--base').each(function(){
        var baseWidth = $(this).outerWidth(),
            baseHeight= $(this).outerHeight()

        $(this).css({
            'margin-top' : -1 * baseHeight / 2 + 'px',
            'margin-left': -1 * baseWidth  / 2 + 'px'
        })
    })

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
        $('.intro, .section').removeClass('active')
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
        $('.intro').removeClass('active')

        // lazyload
        lazyload($target)
    })

    // Bubble Control
    $('.bubbleControl').on('click', function() {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active')
            $(this).siblings('.bubble').addClass('hide')

        }
        else {
            $('.bubbleControl').removeClass('active')
            $('.bubble').addClass('hide')
            $(this).addClass('active')
            $(this).siblings('.bubble').removeClass('hide')
        }
    })

    // intro Control
    // $('.introControl button').on('click', function() {
    //     var $intro = $(this).parents('.intro')
    //     $intro.addClass('active')
    // })

    // Tabs
    $('.tab button').on('click', function() {
        var tabTarget  = $(this).data('tab'),
            $tabTarget = $(tabTarget)

        if ($(this).hasClass('active')) {
            return
        }
        else {
            $('.tab button, .tab-content').removeClass('active');
            $(this).addClass('active')
            $tabTarget.addClass('active')
        }
    })

})