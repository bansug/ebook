// Chapter 3 상호작용 기능 - 알고리즘 설계 및 프로그래밍

// 알고리즘 퀴즈 기능
function showAlgorithmQuiz() {
  const quiz = document.getElementById("algorithmQuiz")
  quiz.style.display = quiz.style.display === "none" ? "block" : "none"

  if (quiz.style.display === "block") {
    quiz.scrollIntoView({ behavior: "smooth", block: "nearest" })
  }
}

function selectAlgorithmAnswer(element, isCorrect) {
  // 이전 선택 제거
  const options = element.parentNode.querySelectorAll("li")
  options.forEach((option) => {
    option.classList.remove("selected", "correct", "incorrect")
    option.style.background = ""
    option.style.border = ""
  })

  // 선택된 답안 표시
  element.classList.add("selected")

  // 잠시 후 피드백 표시
  setTimeout(() => {
    if (isCorrect) {
      element.classList.add("correct")
      element.style.background = "#4caf50"
      element.style.color = "white"
      showFeedback("algorithmFeedback", "✅ 정답입니다! 알고리즘은 항상 투표 시작 안내부터 시작합니다.", true)
    } else {
      element.classList.add("incorrect")
      element.style.background = "#f44336"
      element.style.color = "white"
      showFeedback("algorithmFeedback", "❌ 틀렸습니다. 알고리즘의 첫 번째 단계를 다시 확인해보세요.", false)
    }
  }, 500)
}

// 화면 구성 퀴즈 기능
function showScreenQuiz() {
  const quiz = document.getElementById("screenQuiz")
  quiz.style.display = quiz.style.display === "none" ? "block" : "none"

  if (quiz.style.display === "block") {
    quiz.scrollIntoView({ behavior: "smooth", block: "nearest" })
  }
}

function selectScreenAnswer(element, isCorrect) {
  // 이전 선택 제거
  const options = element.parentNode.querySelectorAll("li")
  options.forEach((option) => {
    option.classList.remove("selected", "correct", "incorrect")
    option.style.background = ""
    option.style.border = ""
  })

  // 선택된 답안 표시
  element.classList.add("selected")

  // 잠시 후 피드백 표시
  setTimeout(() => {
    if (isCorrect) {
      element.classList.add("correct")
      element.style.background = "#4caf50"
      element.style.color = "white"
      showFeedback("screenFeedback", "✅ 정답입니다! 게임 캐릭터는 전자 투표 시스템에 필요하지 않습니다.", true)
    } else {
      element.classList.add("incorrect")
      element.style.background = "#f44336"
      element.style.color = "white"
      showFeedback("screenFeedback", "❌ 틀렸습니다. 전자 투표에 꼭 필요한 오브젝트들을 다시 생각해보세요.", false)
    }
  }, 500)
}

// 프로그래밍 실습 퀴즈 기능
function showProgrammingPractice() {
  const practice = document.getElementById("programmingPractice")
  practice.style.display = practice.style.display === "none" ? "block" : "none"

  if (practice.style.display === "block") {
    practice.scrollIntoView({ behavior: "smooth", block: "nearest" })
  }
}

function selectProgrammingAnswer(element, isCorrect) {
  // 이전 선택 제거
  const options = element.parentNode.querySelectorAll("li")
  options.forEach((option) => {
    option.classList.remove("selected", "correct", "incorrect")
    option.style.background = ""
    option.style.border = ""
  })

  // 선택된 답안 표시
  element.classList.add("selected")

  // 잠시 후 피드백 표시
  setTimeout(() => {
    if (isCorrect) {
      element.classList.add("correct")
      element.style.background = "#4caf50"
      element.style.color = "white"
      showFeedback("programmingFeedback", "✅ 정답입니다! 올바른 프로그래밍 순서를 이해하고 있습니다.", true)

      // 진행 단계 업데이트
      updateProgressStep(4) // 프로그래밍 단계 완료
    } else {
      element.classList.add("incorrect")
      element.style.background = "#f44336"
      element.style.color = "white"
      showFeedback(
        "programmingFeedback",
        "❌ 틀렸습니다. 알고리즘 순서에 따른 프로그래밍 순서를 다시 확인해보세요.",
        false,
      )
    }
  }, 500)
}

// 공통 피드백 표시 함수
function showFeedback(elementId, message, isCorrect) {
  const feedback = document.getElementById(elementId)
  feedback.textContent = message
  feedback.className = "quiz-feedback " + (isCorrect ? "correct" : "incorrect")
  feedback.style.display = "block"
  feedback.style.animation = "fadeInUp 0.5s ease-out"
}

// 진행 단계 업데이트 함수
function updateProgressStep(stepNumber) {
  const steps = document.querySelectorAll(".progress-step")

  steps.forEach((step, index) => {
    if (index < stepNumber) {
      step.classList.add("completed")
      step.classList.remove("active")
    } else if (index === stepNumber) {
      step.classList.add("active")
      step.classList.remove("completed")
    } else {
      step.classList.remove("active", "completed")
    }
  })
}

// 진행 단계 클릭 이벤트
function setupProgressSteps() {
  const steps = document.querySelectorAll(".progress-step")

  steps.forEach((step, index) => {
    step.addEventListener("click", () => {
      // 해당 섹션으로 스크롤
      const sections = [
        ".problem-section", // 1. 문제 알아보기
        ".analysis", // 2. 문제 분석
        ".problem-decomposition", // 3. 추상화
        ".algorithm-design", // 4. 알고리즘 설계
        ".programming-start", // 5. 프로그래밍
      ]

      if (sections[index]) {
        const targetSection = document.querySelector(sections[index])
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: "smooth" })
        }
      }
    })
  })
}

// 알고리즘 단계 애니메이션
function animateAlgorithmSteps() {
  const algoGroups = document.querySelectorAll(".algo-group")

  algoGroups.forEach((group, index) => {
    group.style.opacity = "0"
    group.style.transform = "translateX(-30px)"

    setTimeout(() => {
      group.style.transition = "all 0.6s ease-out"
      group.style.opacity = "1"
      group.style.transform = "translateX(0)"
    }, index * 200)
  })
}

// 이미지 로드 에러 처리 개선
function setupImageErrorHandling() {
  const images = document.querySelectorAll(".table-image")

  images.forEach((img) => {
    img.addEventListener("error", function () {
      this.style.display = "none"
      const fallback = this.nextElementSibling
      if (fallback) {
        fallback.style.display = "block"
        fallback.style.background = "#f8f9fa"
        fallback.style.border = "2px dashed #dee2e6"
        fallback.style.color = "#6c757d"
      }
    })
  })
}

// 페이지 로드 시 초기화
document.addEventListener("DOMContentLoaded", () => {
  console.log("Chapter 3 상호작용 기능이 로드되었습니다")

  // 진행 단계 설정
  setupProgressSteps()

  // 알고리즘 단계 애니메이션
  setTimeout(animateAlgorithmSteps, 500)

  // 이미지 에러 처리 설정
  setupImageErrorHandling()

  // 피드백 영역 초기화
  const feedbackElements = ["algorithmFeedback", "screenFeedback", "programmingFeedback"]
  feedbackElements.forEach((id) => {
    const element = document.getElementById(id)
    if (element) {
      element.innerHTML = ""
    }
  })

  // 스크롤 시 진행 단계 하이라이트
  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY + window.innerHeight / 2
    const algorithmSection = document.querySelector(".algorithm-design")
    const programmingSection = document.querySelector(".programming-start")

    if (algorithmSection && scrollPosition >= algorithmSection.offsetTop) {
      updateProgressStep(3) // 알고리즘 설계 활성화
    }

    if (programmingSection && scrollPosition >= programmingSection.offsetTop) {
      updateProgressStep(4) // 프로그래밍 활성화
    }
  })
})

// CSS 애니메이션 추가
const style = document.createElement("style")
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .progress-step.active {
        animation: pulse 2s infinite;
    }
    
    .interactive-algorithm:hover {
        animation: pulse 0.5s ease-in-out;
    }
`
document.head.appendChild(style)

// 접근성 개선: 키보드 네비게이션
document.addEventListener("keydown", (event) => {
  if (event.key === "Tab") {
    // 탭 키로 상호작용 요소 간 이동 시 시각적 피드백
    const focusedElement = document.activeElement
    if (focusedElement.classList.contains("interactive-algorithm")) {
      focusedElement.style.outline = "3px solid #667eea"
    }
  }
})
