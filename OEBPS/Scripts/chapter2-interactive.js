// Chapter 2 상호작용 기능

function checkAnswer() {
  const userAnswer = document.getElementById("answer").value.trim().toLowerCase()
  const feedback = document.getElementById("feedback")

  // 더 포괄적인 답변 검증
  const correctKeywords = ["편리", "정확", "빠른", "효율", "신속", "간편", "자동", "디지털", "비용절감", "시간단축"]
  const hasCorrectKeyword = correctKeywords.some((keyword) => userAnswer.includes(keyword))

  if (hasCorrectKeyword || userAnswer.length > 5) {
    feedback.innerHTML = "✅ 정답입니다! 전자 투표 시스템은 편리하고 정확하며 빠른 결과 처리가 가능합니다."
    feedback.className = "correct"

    // 성공 애니메이션 효과
    feedback.style.animation = "fadeInUp 0.5s ease-out"
  } else {
    feedback.innerHTML = "❌ 다시 생각해보세요. 힌트: 전자 투표는 기존 종이 투표보다 어떤 점이 좋을까요?"
    feedback.className = "incorrect"

    // 입력 필드 흔들기 효과
    const answerInput = document.getElementById("answer")
    answerInput.style.animation = "shake 0.5s ease-in-out"
    setTimeout(() => {
      answerInput.style.animation = ""
    }, 500)
  }
}

function gradeQuiz() {
  const selected = document.querySelector('input[name="q1"]:checked')
  const result = document.getElementById("result")

  if (!selected) {
    result.innerHTML = "⚠️ 답을 선택해주세요."
    result.className = "incorrect"
    return
  }

  if (selected.value === "1") {
    result.innerHTML = "✅ 정답입니다! 보안은 전자투표 시스템의 가장 중요한 핵심 요소입니다."
    result.className = "correct"

    // 정답 선택지 하이라이트
    selected.parentElement.style.background = "#e8f5e8"
    selected.parentElement.style.border = "2px solid #4caf50"
  } else {
    result.innerHTML = "❌ 오답입니다. 전자투표에서 가장 중요한 것은 투표의 신뢰성을 보장하는 보안입니다."
    result.className = "incorrect"

    // 오답 선택지 하이라이트
    selected.parentElement.style.background = "#ffebee"
    selected.parentElement.style.border = "2px solid #f44336"
  }

  result.style.animation = "fadeInUp 0.5s ease-out"
}

// 추상화 퀴즈 기능
function showAbstractionQuiz() {
  const quiz = document.getElementById("abstractionQuiz")
  quiz.style.display = quiz.style.display === "none" ? "block" : "none"
}

function selectAbstractionAnswer(element, isCorrect) {
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
      element.style.background = "#e8f5e8"
      element.style.border = "2px solid #4caf50"
      showAbstractionFeedback(
        "abstractionFeedback",
        "✅ 정답입니다! 문제 분해는 복잡한 문제를 해결 가능한 작은 단위로 나누는 것입니다.",
        true,
      )
    } else {
      element.classList.add("incorrect")
      element.style.background = "#ffebee"
      element.style.border = "2px solid #f44336"
      showAbstractionFeedback(
        "abstractionFeedback",
        "❌ 틀렸습니다. 문제 분해는 복잡한 문제를 더 쉽게 해결하기 위한 방법입니다.",
        false,
      )
    }
  }, 500)
}

function showAbstractionFeedback(elementId, message, isCorrect) {
  const feedback = document.getElementById(elementId)
  feedback.textContent = message
  feedback.className = "quiz-feedback " + (isCorrect ? "correct" : "incorrect")
  feedback.style.display = "block"
  feedback.style.animation = "fadeInUp 0.5s ease-out"
}

// 엔터키로 답변 제출 가능하도록 개선
document.addEventListener("DOMContentLoaded", () => {
  const answerInput = document.getElementById("answer")

  if (answerInput) {
    answerInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        checkAnswer()
      }
    })
  }

  // 피드백 영역 초기화
  document.getElementById("feedback").innerHTML = ""
  document.getElementById("result").innerHTML = ""

  // 라디오 버튼 선택 시 시각적 피드백
  const radioButtons = document.querySelectorAll('input[name="q1"]')
  radioButtons.forEach((radio) => {
    radio.addEventListener("change", function () {
      // 모든 라벨 초기화
      radioButtons.forEach((r) => {
        r.parentElement.style.background = ""
        r.parentElement.style.border = ""
      })

      // 선택된 라벨 하이라이트
      this.parentElement.style.background = "#e3f2fd"
      this.parentElement.style.border = "2px solid #2196f3"
    })
  })
})

// CSS 애니메이션 추가
const style = document.createElement("style")
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
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
`
document.head.appendChild(style)

// 접근성 개선: 스크린 리더를 위한 알림
function announceToScreenReader(message) {
  const announcement = document.createElement("div")
  announcement.setAttribute("aria-live", "polite")
  announcement.setAttribute("aria-atomic", "true")
  announcement.style.position = "absolute"
  announcement.style.left = "-10000px"
  announcement.style.width = "1px"
  announcement.style.height = "1px"
  announcement.style.overflow = "hidden"
  announcement.textContent = message

  document.body.appendChild(announcement)

  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}
