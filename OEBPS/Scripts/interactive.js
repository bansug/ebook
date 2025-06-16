// EPUB용 상호작용 기능
let 현재단계 = 0
const 문제해결단계 = [
  "1단계: 문제 정의 - 전자 투표 시스템이 필요한 상황 파악",
  "2단계: 요구사항 분석 - 3명의 후보자, 슬라이더 센서 사용",
  "3단계: 시스템 설계 - 입력, 처리, 출력 단계 구성",
  "4단계: 구현 계획 - 센서 연결 및 프로그래밍",
  "5단계: 테스트 및 검증 - 시스템 동작 확인",
]

// 용어 퀴즈 기능
function showTermQuiz() {
  const 퀴즈 = document.getElementById("termQuiz")
  퀴즈.style.display = 퀴즈.style.display === "none" ? "block" : "none"
}

function selectAnswer(요소, 정답여부) {
  // 이전 선택 제거
  const 선택지들 = 요소.parentNode.querySelectorAll("li")
  선택지들.forEach((선택지) => {
    선택지.classList.remove("selected", "correct", "incorrect")
  })

  // 선택된 답안 표시
  요소.classList.add("selected")

  // 잠시 후 피드백 표시
  setTimeout(() => {
    if (정답여부) {
      요소.classList.add("correct")
      피드백표시("termFeedback", "정답입니다! 스피커는 출력 장치입니다.", true)
    } else {
      요소.classList.add("incorrect")
      피드백표시("termFeedback", "틀렸습니다. 스피커는 출력 장치로, 입력 센서가 아닙니다.", false)
    }
  }, 500)
}

function selectFinalAnswer(요소, 정답여부) {
  // 이전 선택 제거
  const 선택지들 = 요소.parentNode.querySelectorAll("li")
  선택지들.forEach((선택지) => {
    선택지.classList.remove("selected", "correct", "incorrect")
  })

  // 선택된 답안 표시
  요소.classList.add("selected")

  // 잠시 후 피드백 표시
  setTimeout(() => {
    if (정답여부) {
      요소.classList.add("correct")
      피드백표시("finalFeedback", "정답입니다! 슬라이더 센서로 후보자를 선택합니다.", true)
    } else {
      요소.classList.add("incorrect")
      피드백표시("finalFeedback", "틀렸습니다. 문제에서 슬라이더 센서를 사용한다고 명시되어 있습니다.", false)
    }
  }, 500)
}

function 피드백표시(요소아이디, 메시지, 정답여부) {
  const 피드백 = document.getElementById(요소아이디)
  피드백.textContent = 메시지
  피드백.className = "quiz-feedback " + (정답여부 ? "correct" : "incorrect")
  피드백.style.display = "block"
}

// 질문답변 토글 기능
function toggleQA() {
  const 질문답변섹션 = document.getElementById("qaSection")
  질문답변섹션.style.display = 질문답변섹션.style.display === "none" ? "block" : "none"
}

// 문제 분석 단계별 보기
function showProblemAnalysis() {
  const 문제단계들 = document.getElementById("problemSteps")
  문제단계들.style.display = 문제단계들.style.display === "none" ? "block" : "none"
  현재단계 = 0
  진행률업데이트()
}

function nextStep() {
  if (현재단계 < 문제해결단계.length) {
    현재단계++
    진행률업데이트()
  }
}

function 진행률업데이트() {
  const 진행률표시 = document.getElementById("progressFill")
  const 단계내용 = document.getElementById("stepContent")

  const 진행률퍼센트 = (현재단계 / 문제해결단계.length) * 100
  진행률표시.style.width = 진행률퍼센트 + "%"

  if (현재단계 === 0) {
    단계내용.innerHTML = `
            <p><strong>문제 해결 과정을 단계별로 살펴보겠습니다.</strong></p>
            <button class="btn-primary" onclick="nextStep()">시작하기</button>
        `
  } else if (현재단계 <= 문제해결단계.length) {
    단계내용.innerHTML = `
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
                <h4 style="color: #00BCD4; margin-bottom: 10px;">${문제해결단계[현재단계 - 1]}</h4>
                <p>각 단계를 차근차근 따라가며 문제를 해결해 나갑니다.</p>
            </div>
            ${
              현재단계 < 문제해결단계.length
                ? '<button class="btn-primary" onclick="nextStep()">다음 단계</button>'
                : '<button class="btn-secondary" onclick="showProblemAnalysis()">다시 보기</button>'
            }
        `
  }
}

// 페이지 로드 시 상호작용 요소 초기화
document.addEventListener("DOMContentLoaded", () => {
  console.log("상호작용 EPUB이 성공적으로 로드되었습니다")

  // 부드러운 스크롤링 추가
  document.querySelectorAll('a[href^="#"]').forEach((앵커) => {
    앵커.addEventListener("click", function (이벤트) {
      이벤트.preventDefault()
      const 대상 = document.querySelector(this.getAttribute("href"))
      if (대상) {
        대상.scrollIntoView({
          behavior: "smooth",
        })
      }
    })
  })
})

// 상호작용 요소에 시각적 효과 추가
function 호버효과추가() {
  const 상호작용요소들 = document.querySelectorAll(".interactive-element")
  상호작용요소들.forEach((요소) => {
    요소.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px) scale(1.02)"
    })

    요소.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })
}

// DOM 준비 시 호버 효과 적용
document.addEventListener("DOMContentLoaded", 호버효과추가)
