// Chapter 4 상호작용 기능 - 후보 선택 및 득표 반영

// 전역 변수
let droppedBlocks = []
const correctOrder = ["sensor", "condition", "display", "button", "signal"]

// 투표 과정 퀴즈
function showVotingQuiz() {
  const quiz = document.getElementById("votingQuiz")
  quiz.style.display = quiz.style.display === "none" ? "block" : "none"

  if (quiz.style.display === "block") {
    quiz.scrollIntoView({ behavior: "smooth", block: "nearest" })
  }
}

function selectVotingAnswer(element, isCorrect) {
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
      showFeedback("votingFeedback", "✅ 정답입니다! 슬라이더로 후보를 선택한 후 버튼을 눌러 투표합니다.", true)
      updateProgress(70)
    } else {
      element.classList.add("incorrect")
      element.style.background = "#f44336"
      element.style.color = "white"
      showFeedback("votingFeedback", "❌ 틀렸습니다. 투표 과정의 올바른 순서를 다시 생각해보세요.", false)
    }
  }, 500)
}

// 득표 반영 퀴즈
function showScoreQuiz() {
  const quiz = document.getElementById("scoreQuiz")
  quiz.style.display = quiz.style.display === "none" ? "block" : "none"

  if (quiz.style.display === "block") {
    quiz.scrollIntoView({ behavior: "smooth", block: "nearest" })
  }
}

function selectScoreAnswer(element, isCorrect) {
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
      showFeedback("scoreFeedback", "✅ 정답입니다! 선택된 후보의 득표수만 정확히 증가시켜야 합니다.", true)
      updateProgress(80)
    } else {
      element.classList.add("incorrect")
      element.style.background = "#f44336"
      element.style.color = "white"
      showFeedback("scoreFeedback", "❌ 틀렸습니다. 득표수 관리의 핵심 원칙을 다시 확인해보세요.", false)
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

// 진행률 업데이트
function updateProgress(percentage) {
  const progressFill = document.getElementById("progressFill")
  const progressText = document.querySelector(".progress-text")

  progressFill.style.width = percentage + "%"
  progressText.textContent = `프로그래밍 구현 단계 (${percentage}% 완료)`

  if (percentage >= 100) {
    progressText.textContent = "🎉 이번 단계 완료! 다음 단계로 진행하세요."
    progressText.style.color = "#4caf50"
    progressText.style.fontWeight = "600"
  }
}

// 드래그 앤 드롭 기능
function setupDragAndDrop() {
  const codeBlocks = document.querySelectorAll(".code-block")
  const workspace = document.getElementById("codeWorkspace")

  codeBlocks.forEach((block) => {
    block.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", e.target.dataset.block)
      e.target.style.opacity = "0.5"
    })

    block.addEventListener("dragend", (e) => {
      e.target.style.opacity = "1"
    })
  })

  workspace.addEventListener("dragover", (e) => {
    e.preventDefault()
    workspace.style.borderColor = "#007bff"
    workspace.style.backgroundColor = "#f8f9fa"
  })

  workspace.addEventListener("dragleave", (e) => {
    workspace.style.borderColor = "#dee2e6"
    workspace.style.backgroundColor = "white"
  })

  workspace.addEventListener("drop", (e) => {
    e.preventDefault()
    const blockType = e.dataTransfer.getData("text/plain")
    addBlockToWorkspace(blockType)

    workspace.style.borderColor = "#28a745"
    workspace.style.backgroundColor = "white"
    workspace.classList.add("has-blocks")
  })
}

function addBlockToWorkspace(blockType) {
  const workspace = document.getElementById("codeWorkspace")
  const placeholder = workspace.querySelector(".workspace-placeholder")

  if (placeholder) {
    placeholder.style.display = "none"
  }

  const blockNames = {
    sensor: "슬라이더 센서 읽기",
    condition: "조건문 (if)",
    button: "버튼 입력 감지",
    signal: "신호 전송",
    display: "후보 번호 표시",
  }

  const droppedBlock = document.createElement("div")
  droppedBlock.className = "dropped-block"
  droppedBlock.textContent = blockNames[blockType]
  droppedBlock.dataset.block = blockType

  // 삭제 버튼 추가
  const deleteBtn = document.createElement("span")
  deleteBtn.textContent = " ✕"
  deleteBtn.style.cursor = "pointer"
  deleteBtn.style.marginLeft = "5px"
  deleteBtn.onclick = () => {
    droppedBlock.remove()
    droppedBlocks = droppedBlocks.filter((b) => b !== blockType)

    if (workspace.children.length === 1) {
      // placeholder만 남은 경우
      placeholder.style.display = "block"
      workspace.classList.remove("has-blocks")
    }
  }

  droppedBlock.appendChild(deleteBtn)
  workspace.appendChild(droppedBlock)

  droppedBlocks.push(blockType)
}

function checkCodeOrder() {
  const result = document.getElementById("codeResult")

  if (droppedBlocks.length === 0) {
    showFeedback("codeResult", "⚠️ 코드 블록을 배치해주세요.", false)
    return
  }

  const isCorrect = JSON.stringify(droppedBlocks) === JSON.stringify(correctOrder)

  if (isCorrect) {
    showFeedback("codeResult", "🎉 완벽합니다! 올바른 순서로 코드를 배치했습니다.", true)
    updateProgress(90)

    // 성공 애니메이션
    const workspace = document.getElementById("codeWorkspace")
    workspace.style.animation = "bounce 0.6s ease-in-out"
    setTimeout(() => {
      workspace.style.animation = ""
    }, 600)
  } else {
    const correctOrderText = correctOrder
      .map((block) => {
        const blockNames = {
          sensor: "슬라이더 센서 읽기",
          condition: "조건문 (if)",
          button: "버튼 입력 감지",
          signal: "신호 전송",
          display: "후보 번호 표시",
        }
        return blockNames[block]
      })
      .join(" → ")

    showFeedback("codeResult", `❌ 순서가 틀렸습니다. 올바른 순서: ${correctOrderText}`, false)
  }
}

// 이미지 로드 에러 처리
function setupImageErrorHandling() {
  const images = document.querySelectorAll(".table-image, .example-image, .side-image")

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

  const animatedElements = document.querySelectorAll(".algorithm-step, .table-with-images")
  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "all 0.6s ease-out"
    observer.observe(el)
  })
}

// 키보드 단축키
function setupKeyboardShortcuts() {
  document.addEventListener("keydown", (e) => {
    // Ctrl + R: 코드 워크스페이스 리셋
    if (e.ctrlKey && e.key === "r") {
      e.preventDefault()
      resetWorkspace()
    }

    // Ctrl + Enter: 코드 순서 확인
    if (e.ctrlKey && e.key === "Enter") {
      e.preventDefault()
      checkCodeOrder()
    }
  })
}

function resetWorkspace() {
  const workspace = document.getElementById("codeWorkspace")
  const placeholder = workspace.querySelector(".workspace-placeholder")

  // 모든 드롭된 블록 제거
  const droppedBlocksElements = workspace.querySelectorAll(".dropped-block")
  droppedBlocksElements.forEach((block) => block.remove())

  // 전역 배열 초기화
  droppedBlocks = []

  // placeholder 다시 표시
  placeholder.style.display = "block"
  workspace.classList.remove("has-blocks")
  workspace.style.borderColor = "#dee2e6"

  // 결과 숨기기
  const result = document.getElementById("codeResult")
  result.style.display = "none"
}

// 페이지 로드 시 초기화
document.addEventListener("DOMContentLoaded", () => {
  console.log("Chapter 4 상호작용 기능이 로드되었습니다")

  // 드래그 앤 드롭 설정
  setupDragAndDrop()

  // 이미지 에러 처리 설정
  setupImageErrorHandling()

  // 스크롤 애니메이션 설정
  setupScrollAnimations()

  // 키보드 단축키 설정
  setupKeyboardShortcuts()

  // 피드백 영역 초기화
  const feedbackElements = ["votingFeedback", "scoreFeedback", "codeResult"]
  feedbackElements.forEach((id) => {
    const element = document.getElementById(id)
    if (element) {
      element.innerHTML = ""
    }
  })

  // 툴팁 추가
  const codeBlocks = document.querySelectorAll(".code-block")
  codeBlocks.forEach((block) => {
    block.title = "드래그하여 워크스페이스에 배치하세요"
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
    
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-10px);
        }
        60% {
            transform: translateY(-5px);
        }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .interactive-coding:hover {
        animation: pulse 0.5s ease-in-out;
    }
    
    .code-block:hover {
        transform: translateY(-2px) scale(1.05);
    }
    
    .dropped-block {
        animation: fadeInUp 0.3s ease-out;
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
