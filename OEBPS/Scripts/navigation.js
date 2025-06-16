// 네비게이션 기능 - 기존 스크립트와 충돌 방지
document.addEventListener("DOMContentLoaded", () => {
  // 네비게이션 전용 기능만 처리
  setupNavigationFeatures()
})

function setupNavigationFeatures() {
  // 키보드 네비게이션 추가
  document.addEventListener("keydown", (e) => {
    // 입력 필드에 포커스가 있을 때는 키보드 네비게이션 비활성화
    const activeElement = document.activeElement
    if (activeElement && (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA")) {
      return
    }

    const prevBtn = document.querySelector(".nav-btn.prev-btn")
    const nextBtn = document.querySelector(".nav-btn.next-btn")

    // 왼쪽 화살표 키 - 이전 페이지
    if (e.key === "ArrowLeft" && prevBtn) {
      e.preventDefault()
      window.location.href = prevBtn.href
    }

    // 오른쪽 화살표 키 - 다음 페이지
    if (e.key === "ArrowRight" && nextBtn) {
      e.preventDefault()
      window.location.href = nextBtn.href
    }
  })

  // 스크롤 시 네비게이션 버튼 표시/숨김
  let lastScrollTop = 0
  const navButtonsContainer = document.querySelector(".navigation-buttons")

  if (navButtonsContainer) {
    window.addEventListener("scroll", () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop

      if (scrollTop > lastScrollTop && scrollTop > 100) {
        // 아래로 스크롤 시 살짝 숨김
        navButtonsContainer.style.transform = "translateY(20px)"
        navButtonsContainer.style.opacity = "0.7"
      } else {
        // 위로 스크롤 시 표시
        navButtonsContainer.style.transform = "translateY(0)"
        navButtonsContainer.style.opacity = "1"
      }

      lastScrollTop = scrollTop
    })

    // 페이지 로드 시 부드러운 애니메이션
    setTimeout(() => {
      navButtonsContainer.style.animation = "slideInFromRight 0.5s ease-out"
    }, 500)
  }

  // 네비게이션 버튼 호버 효과
  const navButtons = document.querySelectorAll(".nav-btn")
  navButtons.forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      btn.style.transform = "translateY(-3px) scale(1.05)"
    })

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translateY(-2px) scale(1)"
    })
  })
}

// CSS 애니메이션 추가 (기존 스타일과 충돌하지 않도록)
if (!document.getElementById("navigation-styles")) {
  const style = document.createElement("style")
  style.id = "navigation-styles"
  style.textContent = `
      @keyframes slideInFromRight {
          from {
              transform: translateX(100px);
              opacity: 0;
          }
          to {
              transform: translateX(0);
              opacity: 1;
          }
      }
      
      .navigation-buttons {
          transition: all 0.3s ease;
      }
      
      .nav-btn {
          position: relative;
          overflow: hidden;
      }
      
      .nav-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
      }
      
      .nav-btn:hover::before {
          left: 100%;
      }
  `
  document.head.appendChild(style)
}
