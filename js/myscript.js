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

    function Layer(elem, deltaX, deltaY) {
        this.elem = elem
        this.deltaX  = deltaX
        this.deltaY  = deltaY
    }

    var layers = []
    $('.parallax--layer').each(function() {
        var deltaX = $(this).data('delta-x')
        var deltaY = $(this).data('delta-y')
        layers.push(new Layer(this, deltaX, deltaY))
    })
    // ParallaxBase
    function parallaxBase() {
        $('.parallax--base').each(function(){
            var baseWidth = $(this).outerWidth(),
                baseHeight= $(this).outerHeight()

            $(this).css({
                'margin-top' : -1 * baseHeight / 2 + 'px',
                'margin-left': -1 * baseWidth  / 2 + 'px'
            })
        })
    }
    parallaxBase()

    $(window).on('mousemove' , function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    $(window).resize(function() {
        parallaxBase()
    });

    function run() {
        pointX = mouseX - centerX;
        pointY = mouseY - centerY;
        newX += ( pointX - newX ) * 1/6;
        newY += ( pointY - newY ) * 1/6;

        layers.forEach(function(layer) {
            parallaxX = newX / layer.deltaX,
            parallaxY = newY / layer.deltaY;
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

        // lazyload
        lazyload($modalTarget)
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
        $(this).parents('.item').addClass('active')

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

// WebView
function ProjectView() {
    $projectView      = $('.projectView')
    $projectViewItem  = $('.projectView__item')
    $projectClose     = $('.projectView__close')

    $projectActive    = $('.projectView__item.active') 

    $controlPrev  = $projectViewItem.find('.projectView__view--control .prev')
    $controlNext  = $projectViewItem.find('.projectView__view--control .next')

    $projectImgWrap   = $projectViewItem.find('.img-wrap')
    $projectImg       = $projectImgWrap.find('div')


    $projectImgWrap.find('div:first-child').addClass('active')
    $projectImgWrap.find('div:nth-child(2)').addClass('next')


    // Close
    $projectClose.on('click',function() {
        $projectView.removeClass('active')
        $projectViewItem.removeClass('active')

        // reset
        $projectImg.attr('class','')
        $projectImgWrap.find('div:first-child').addClass('active')
        $projectImgWrap.find('div:nth-child(2)').addClass('next')
    })
    $(window).on('click',function(e) {
        var clickTarget = $(e.target)
        if (clickTarget.is('.projectView')) {
            $projectView.removeClass('active')
            $projectViewItem.removeClass('active')
        }
    })

    function nameImg() {
        var $projectImgActive = $projectImgWrap.find('div.active'),
            $projectImgPrev   = $projectImgActive.prev(),
            $projectImgNext   = $projectImgActive.next()
        $projectImgPrev.attr('class','prev')
        $projectImgNext.attr('class','next')
    }

    $controlPrev.on('click', function() {
        $projectImgWrap.each(function() {
            var $projectImgActive = $(this).find('div.active'),
                $projectImg       = $(this).find('div')
            if ($projectImgActive.index() === 0) {
                return
            }
            else {
                $projectImgActive.removeClass('active').prev().attr('class','active')
                nameImg()
            }
        })
    })

    $controlNext.on('click', function() {
        $projectImgWrap.each(function() {
            var $projectImgActive = $(this).find('div.active'),
                $projectImg       = $(this).find('div')
            if ($projectImgActive.index() === $projectImg.length - 1) {
                return
            }
            else {
                $projectImgActive.removeClass('active').next().attr('class','active')
                nameImg()
            }
        })
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

    // PictureView
    PictureView()

    // webView
    ProjectView()

    // Style Control
    $('#styleControl').on('click','button', function() {
        var target = $(this).attr('class')

        $('body').attr('id', target)

        // Parallax
        // $('.parallax .parallax__item').removeClass('active')
        // $('.parallax').find(target).addClass('active')
    })

    // Nav Control
	$('.nav__btn').on('click', function() {
		var target        = $(this).data('target'),
            targetMain    = '#' + target,
            $targetMain   = $(targetMain),
            targetSubnav  = '.subnav-' + target
            $targetSubnav = $(targetSubnav)
		$('.main').addClass('open')
		$('.main__section, .sectionControl').removeClass('active')
        $targetMain.addClass('active')
		$targetSubnav.addClass('active')
        setTimeout(function() {
            $targetMain.find('.section__content').addClass('active')
            $('.subnav').addClass('open')
        }, 1000)

        // lazyload
        lazyload($targetMain)
	})
	$('#backControl').on('click', function() {
		$('.main, .subnav').removeClass('open')
        $('.intro, .section, .section__content, .subnav').removeClass('active')
	})

    // SubNav Control
    $('#subnavClose').on('click', function() {
        $('#subnav').toggleClass('active')
    })
    $('.sectionControl').on('click', function() {
        var target  = '#' + $(this).data('target'),
            $target = $(target)
        $('.sectionControl, #subnav, .section, .section__content').removeClass('active')
        $target.addClass('active')

        setTimeout(function() {
            $target.find('.section__content').addClass('active')
        }, 300)

        $(this).addClass('active')

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

    // Web Control
    $('.projectControl').on('click', function() {
        var projectTarget   = $(this).attr('href'),
            $projectTarget  = $(projectTarget)

        $('.projectView').addClass('active')
        $projectTarget.addClass('active')

        // lazyload
        lazyload($projectTarget)
    })

    // illustration delay
    function itemDelay() {
        $item = $('.section').find('.item')
        $item.each(function() {
            var itemNum = $(this).index() * 0.1
            $(this).css('animation-delay', itemNum + 's')
        })
    }
    itemDelay()

    // about
    $('.boardControl button').click(function() {
        var target = $(this).data('target')
        $('.board--content__item, .board--mask div').removeClass('active')
        $('.board--content').find(target).addClass('active')
        $('.board--mask').find(target).addClass('active')
    })
})