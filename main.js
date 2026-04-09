window.addEventListener('load', () => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. 방문자 수 카운트 로직
    const updateVisit = () => {
        let visitCount = localStorage.getItem('visit_qwerty') || 0;
        visitCount = parseInt(visitCount) + 1;
        localStorage.setItem('visit_qwerty', visitCount);
        document.getElementById('visit-count').innerText = visitCount.toLocaleString();
    };
    updateVisit();

    // 2. 히어로 섹션 페이드 아웃
    gsap.to(".hero", {
        scrollTrigger: {
            trigger: ".about-wrap",
            start: "top bottom",
            end: "top top",
            scrub: 1
        },
        opacity: 0,
        y: -100,
        filter: "blur(20px)"
    });

    // 3. 텍스트 부드러운 순차 투명 전환 (겹침 방지)
    const texts = [".t1", ".t2", ".t3"];
    
    texts.forEach((selector, i) => {
        gsap.timeline({
            scrollTrigger: {
                trigger: ".about-wrap",
                start: `${i * 30}% top`,
                end: `${(i + 1) * 30}% top`,
                scrub: 2, // 부드러운 움직임을 위한 수치 조절
            }
        })
        .to(selector, { 
            opacity: 1, 
            y: 0, 
            pointerEvents: "auto",
            ease: "power2.out"
        })
        .to(selector, { 
            opacity: 0, 
            y: -50, 
            pointerEvents: "none",
            ease: "power2.in"
        }, "+=0.5"); // 화면에 머무는 시간
    });
});