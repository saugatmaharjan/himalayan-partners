var controller = new ScrollMagic.Controller();

var tween = new TweenLite.to("#hero-logo", 2, {
    y: -50,
    scale: (1.2,1.2),
    opacity: 0,
}, 2)

var tl = new TimelineLite();
tl.staggerFrom('.card', 1.5, {
    autoAlpha: 0,
    y: 100,
    ease: Elastic.easeOut.config(1, 0.6),
   }, 0.2);

var scene = new ScrollMagic.Scene({
    triggerElement: ".about",
    triggerHook: 0.1,
})
.setClassToggle('#header', 'has-background')
.addTo(controller)
// .addIndicators({ name: "pin scene", colorEnd: "red", offset: 200 })

var scene = new ScrollMagic.Scene({
    triggerElement: "#hero-logo",
    triggerHook: 0.15,
})
.setPin("#hero-logo", {pushFollowers: false})
.addTo(controller)
// .addIndicators({name: "pin scene", colorEnd: "red", offset: 200});

var scene = new ScrollMagic.Scene({
    triggerElement: "#hero-logo",
    duration: '75%',
    triggerHook: 0.05,
})
.setTween(tween)
.addTo(controller)
// .addIndicators({name: "pin scene", colorEnd: "red", offset: 200});

var scene = new ScrollMagic.Scene({
    triggerElement: "#cards-container",
    triggerHook: 0.8,
    reverse: false,
})
.setTween(tl)
// .reverse(false)
.addTo(controller)
// .addIndicators({name: "pin scene", colorEnd: "red", offset: 200});

