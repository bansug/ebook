// Chapter 5 상호작용 기능 - 투표 종료 및 당선자 안내

// 전역 변수
const finalQuizAnswers = [false, false, false]
let finalQuizScore = 0

// 투표 종료 퀴즈
function showEndVoteQuiz() {
  const quiz = document.getElementById("endVoteQuiz")
  quiz.style.display = quiz.style.display === "none" ? "block" : "none"

  if (quiz.style.display === "block") {
    quiz.scrollIntoView({ behavior: "smooth", block: "nearest" })
  }
}

function selectEndVoteAnswer(element, isCorrect) {
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
      showFeedback(
        "endVoteFeedback",
        "✅ 정답입니다! 투표 종료 버튼을 누르면 더 이상 투표를 받지 않고 당선자 선정 단계로 넘어갑니다.",
        true,
      )
      updateProgress(85)
    } else {
      element.classList.add("incorrect")
      element.style.background = "#f44336"
      element.style.color = "white"
      showFeedback("endVoteFeedback", "❌ 틀렸습니다. 투표 종료 버튼의 역할을 다시 생각해보세요.", false)
    }
  }, 500)
}

// 당선자 선정 퀴즈
function showWinnerQuiz() {
  const quiz = document.getElementById("winnerQuiz")
  quiz.style.display = quiz.style.display === "none" ? "block" : "none"

  if (quiz.style.display === "block") {
    quiz.scrollIntoView({ behavior: "smooth", block: "nearest" })
  }
}

function selectWinnerAnswer(element, isCorrect) {
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
      showFeedback(
        "winnerFeedback",
        "✅ 정답입니다! 동점자가 있을 경우 알고리즘에 따라 뒷번호의 후보자가 당선됩니다.",
        true,
      )
      updateProgress(90)
    } else {
      element.classList.add("incorrect")
      element.style.background = "#f44336"
      element.style.color = "white"
      showFeedback("winnerFeedback", "❌ 틀렸습니다. 동점자 처리 방식을 다시 확인해보세요.", false)
    }
  }, 500)
}

// 최종 퀴즈
function showFinalQuiz() {
  const quiz = document.getElementById("finalQuiz")
  quiz.style.display = quiz.style.display === "none" ? "block" : "none"

  if (quiz.style.display === "block") {
    quiz.scrollIntoView({ behavior: "smooth", block: "nearest" })
  }
}

function selectFinalAnswer(element, questionIndex, isCorrect) {
  // 이전 선택 제거
  const questionOptions = element.parentNode.querySelectorAll("li")
  questionOptions.forEach((option) => {
    option.classList.remove("selected", "correct", "incorrect")
    option.style.background = ""
    option.style.border = ""
  })

  // 선택된 답안 표시
  element.classList.add("selected")

  // 정답 여부 저장
  finalQuizAnswers[questionIndex] = isCorrect
}

// 최종 퀴즈 제출
function submitFinalQuiz() {
  // 점수 계산
  finalQuizScore = finalQuizAnswers.filter((answer) => answer).length

  // 결과 표시
  const resultScore = document.getElementById("resultScore")
  const resultMessage = document.getElementById("resultMessage")
  const evaluationResult = document.getElementById("evaluationResult")

  resultScore.textContent = `${finalQuizScore}/3`

  if (finalQuizScore === 3) {
    resultMessage.textContent = "완벽합니다! 모든 개념을 정확히 이해하셨습니다. 축하합니다! 🎉"
    showCompletionMessage()
    updateProgress(100)
  } else if (finalQuizScore === 2) {
    resultMessage.textContent = "잘했습니다! 대부분의 개념을 이해하셨습니다. 조금만 더 노력하세요!"
    updateProgress(95)
  } else if (finalQuizScore === 1) {
    resultMessage.textContent = "좋은 시작입니다. 다시 학습 내용을 복습해보세요."
    updateProgress(90)
  } else {
    resultMessage.textContent = "아쉽습니다. 학습 내용을 다시 검토해보세요."
    updateProgress(85)
  }

  evaluationResult.style.display = "block"
  evaluationResult.scrollIntoView({ behavior: "smooth", block: "nearest" })

  // 최종 퀴즈 옵션에 정답 표시
  const quizOptions = document.querySelectorAll("#finalQuiz .quiz-options li.selected")
  quizOptions.forEach((option, index) => {
    if (finalQuizAnswers[index]) {
      option.classList.add("correct")
      option.style.background = "#4caf50"
      option.style.color = "white"
    } else {
      option.classList.add("incorrect")
      option.style.background = "#f44336"
      option.style.color = "white"
    }
  })

  // 피드백 표시
  const feedback = document.getElementById("finalFeedback")
  feedback.textContent = `총점: ${finalQuizScore}/3 - ${
    finalQuizScore === 3 ? "완벽합니다! 🎉" : finalQuizScore >= 2 ? "잘했습니다! 👍" : "다시 도전해보세요! 💪"
  }`
  feedback.className = `quiz-feedback ${finalQuizScore >= 2 ? "correct" : "incorrect"}`
  feedback.style.display = "block"
}

// 학습 완료 축하 메시지 표시
function showCompletionMessage() {
  const completionMessage = document.getElementById("completionMessage")
  completionMessage.style.display = "block"

  // 애니메이션 효과
  setTimeout(() => {
    completionMessage.scrollIntoView({ behavior: "smooth", block: "nearest" })
  }, 500)
}

// 체크박스 토글
function toggleCheckbox(element) {
  element.classList.toggle("checked")

  // 모든 체크박스 확인
  const checkboxes = document.querySelectorAll(".custom-checkbox")
  const allChecked = Array.from(checkboxes).every((checkbox) => checkbox.classList.contains("checked"))

  // 모든 체크박스가 체크되면 진행률 업데이트
  if (allChecked) {
    updateProgress(95)
  }
}

// 공통 피드백 표시 함수
function showFeedback(elementId, message, isCorrect) {
  const feedback = document.getElementById(elementId)
  feedback.textContent = message
  feedback.className = "quiz-feedback " + (isCorrect ? "correct" : "incorrect")
  feedback.style.display = "block"
  feedback.style.animation = "fadeInUp 0.5s ease-out"
}

// 진행률 업데이트
function updateProgress(percentage) {
  const progressFill = document.getElementById("progressFill")
  const progressText = document.querySelector(".progress-text")

  progressFill.style.width = percentage + "%"
  progressText.textContent = `프로그래밍 구현 단계 (${percentage}% 완료)`

  if (percentage >= 100) {
    progressText.textContent = "🎉 학습 완료! 축하합니다!"
    progressText.style.color = "#4caf50"
    progressText.style.fontWeight = "600"
  }
}

// 투표 시뮬레이션 기능
function setupVotingSimulation() {
  const candidateSlider = document.getElementById("candidateSlider")
  const sliderValue = document.getElementById("sliderValue")
  const voteBtn = document.getElementById("voteBtn")
  const endVoteBtn = document.getElementById("endVoteBtn")
  const resetBtn = document.getElementById("resetBtn")
  const votes = [
    document.getElementById("votes1"),
    document.getElementById("votes2"),
    document.getElementById("votes3"),
  ]
  const announcement = document.getElementById("announcement")
  const candidates = document.querySelectorAll(".candidate")

  let voteCounts = [0, 0, 0]
  let isVotingEnded = false

  // 슬라이더 값 업데이트
  candidateSlider.addEventListener("input", () => {
    const value = candidateSlider.value
    let candidateNumber

    if (value <= 33) {
      candidateNumber = 1
    } else if (value <= 66) {
      candidateNumber = 2
    } else {
      candidateNumber = 3
    }

    sliderValue.textContent = candidateNumber
  })

  // 투표 버튼
  voteBtn.addEventListener("click", () => {
    if (isVotingEnded) {
      alert("투표가 이미 종료되었습니다.")
      return
    }

    const candidateNumber = Number.parseInt(sliderValue.textContent) - 1
    voteCounts[candidateNumber]++
    votes[candidateNumber].textContent = voteCounts[candidateNumber]

    // 애니메이션 효과
    votes[candidateNumber].style.animation = "pulse 0.5s ease-in-out"
    setTimeout(() => {
      votes[candidateNumber].style.animation = ""
    }, 500)
  })

  // 투표 종료 버튼
  endVoteBtn.addEventListener("click", () => {
    if (isVotingEnded) {
      alert("투표가 이미 종료되었습니다.")
      return
    }

    isVotingEnded = true
    voteBtn.disabled = true
    endVoteBtn.disabled = true

    // 당선자 선정
    const maxVotes = Math.max(...voteCounts)
    const winnerIndex = voteCounts.lastIndexOf(maxVotes)
    const winnerNumber = winnerIndex + 1

    // 결과 표시
    candidates.forEach((candidate) => candidate.classList.remove("winner"))
    candidates[winnerIndex].classList.add("winner")
    candidates[winnerIndex].innerHTML += '<div class="winner-label">당선</div>'

    announcement.textContent = `투표 결과: 후보 ${winnerNumber}번이 ${maxVotes}표로 당선되었습니다!`
    announcement.style.display = "block"

    // 진행률 업데이트
    updateProgress(95)
  })

  // 초기화 버튼
  resetBtn.addEventListener("click", () => {
    voteCounts = [0, 0, 0]
    isVotingEnded = false
    voteBtn.disabled = false
    endVoteBtn.disabled = false

    votes.forEach((vote) => {
      vote.textContent = "0"
    })

    candidates.forEach((candidate) => {
      candidate.classList.remove("winner")
      const winnerLabel = candidate.querySelector(".winner-label")
      if (winnerLabel) {
        winnerLabel.remove()
      }
    })

    announcement.style.display = "none"
  })
}

// 이미지 로드 에러 처리
function setupImageErrorHandling() {
  const images = document.querySelectorAll(".block-image, .side-image, .evaluation-image")

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

// 스크롤 애니메이션
function setupScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    },
    { threshold: 0.1 },
  )

  const animatedElements = document.querySelectorAll(".algorithm-step, .problem-visualization, .final-evaluation")
  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "all 0.6s ease-out"
    observer.observe(el)
  })
}

// 페이지 로드 시 초기화
document.addEventListener("DOMContentLoaded", () => {
  console.log("Chapter 5 상호작용 기능이 로드되었습니다")

  // 투표 시뮬레이션 설정
  setupVotingSimulation()

  // 이미지 에러 처리 설정
  setupImageErrorHandling()

  // 스크롤 애니메이션 설정
  setupScrollAnimations()

  // 최종 퀴즈 제출 버튼 이벤트
  document.getElementById("submitFinalQuiz").addEventListener("click", submitFinalQuiz)

  // 피드백 영역 초기화
  const feedbackElements = ["endVoteFeedback", "winnerFeedback", "finalFeedback"]
  feedbackElements.forEach((id) => {
    const element = document.getElementById(id)
    if (element) {
      element.innerHTML = ""
    }
  })

  // 진행률 애니메이션
  setTimeout(() => {
    const progressFill = document.getElementById("progressFill")
    progressFill.style.transition = "width 1s ease-out"
  }, 500)
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
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
    
    .interactive-element:hover {
        animation: pulse 0.5s ease-in-out;
    }
    
    .custom-checkbox.checked {
        background-color: #00bcd4;
        border-color: #00bcd4;
    }
    
    .candidate.winner {
        animation: pulse 1s ease-in-out infinite;
    }
`
document.head.appendChild(style)

// 접근성 개선
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
