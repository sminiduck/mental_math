// virtual-keyboard.js
class VirtualKeyboard extends HTMLElement {
    constructor() {
      super();
  
      // Shadow DOM 생성
      this.attachShadow({ mode: 'open' });
  
      // 버튼 키 배열 정의
      this.keys = [
        'AC', '&lt',
        '7', '8', '9',
        '4', '5', '6',
        '1', '2', '3',
        '.', '0', 'V'
      ];
  
      // 내부 상태 (입력 스트림)
      this.inputStream = '';
  
      // 초기화
      this.render();
    }
  
    // 키보드 생성
    render() {
      // Shadow DOM의 스타일
      const style = `
        .keyboard {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0px;
          margin: 10px 0;
        }
        .key {
          padding: 15px;
          text-align: center;
          background: #ddd;
          border: 1px solid #ccc;
          cursor: pointer;
          font-size: 18px;
        }
        .key:hover {
          background: #bbb;
        }
        .key:active {
          background: #999;
        }
        .key[data-key="AC"] {
            background-color: #d32f2f;
            grid-column: span 2;
        }
      `;
  
      // Shadow DOM의 HTML
      const template = `
        <style>${style}</style>
        <div class="keyboard">
          ${this.keys.map(key => `<button class="key" data-key="${key}">${key}</button>`).join('')}
        </div>
      `;
  
      // Shadow Root에 템플릿 삽입
      this.shadowRoot.innerHTML = template;
  
      // 이벤트 핸들러 추가
      this.addEventListeners();
    }
  
    // 이벤트 핸들러 정의
    addEventListeners() {
      const buttons = this.shadowRoot.querySelectorAll('.key');
      buttons.forEach(button => {
        button.addEventListener('click', (e) => this.handleKeyPress(e));
      });
    }
  
    // 키 클릭 처리
    handleKeyPress(event) {
      const key = event.target.getAttribute('data-key');
      const resultInput = document.querySelector('#result');
  
      if (key === '=') {
        // 계산 처리
        try {
          this.inputStream = eval(this.inputStream).toString();
        } catch {
          this.inputStream = 'Error';
        }
      } else {
        // 입력 값 추가
        this.inputStream += key;
      }
  
      // 외부 입력 필드 업데이트
      if (resultInput) {
        resultInput.value = this.inputStream;
      }
    }
  }
  
  // 사용자 정의 요소 등록
  customElements.define('virtual-keyboard', VirtualKeyboard);
  