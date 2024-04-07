document.addEventListener("DOMContentLoaded", function () {
    new Vue({
      el: '#app',
      data: {
        greekLetters: {
          'α': [1, 3],    
          'β': [4, 2],    
          'γ': [3, 1],  
          'δ': [2, 4],    
          'ε': [1, 4],   
          'ζ': [3, 2],    
          'η': [4, 3],    
          'θ': [2, 1],  
          'ι': [1, 2],   
          'κ': [3, 4],   
          'λ': [2, 3],   
          'μ': [4, 1],   
        },
        randomGreekLetter: '',
        showGreekLetter: false,
        showElements: true,
        clickedCables: [],
      },
      methods: {
        removeClickedClasses() {
            document.querySelectorAll('.element.clicked-bg').forEach(element => {
              element.classList.remove('clicked-bg');
          });
            document.querySelectorAll('.cableMain.clicked').forEach(cable => {
              cable.classList.remove('clicked');
          });
        },
        generateRandomLetter() {
          const randomIndex = Math.floor(Math.random() * Object.keys(this.greekLetters).length);
          this.randomGreekLetter = Object.keys(this.greekLetters)[randomIndex];
          this.showGreekLetter = true;
  
          setTimeout(() => {
            this.showGreekLetter = false;
            this.showElements = false;
          }, 2000);
        },
        changeColor(event) {
          const parentElement = event.target.closest('.element');
  
          if (parentElement) {
            const clickedCableId = event.target.id; 
            const cableNumber = parseInt(clickedCableId.replace('cable', '')); 
  
            this.clickedCables.push(cableNumber); 
  
            event.target.classList.add('clicked');
            parentElement.classList.add('clicked-bg');

            if (this.clickedCables.length === 2) {
                const correctNumbers = this.greekLetters[this.randomGreekLetter];
                if (
                  this.clickedCables[0] === correctNumbers[0] &&
                  this.clickedCables[1] === correctNumbers[1]
                ) {
                  document.body.style.backgroundColor = "green";
                  setTimeout(() => {
                    this.resetGame(); 
                  }, 1000);
                } else {
                  document.body.style.backgroundColor = "red";
                  setTimeout(() => {
                    this.resetGame(); 
                  }, 1000);
                }
              }
          }
        },
        resetGame() {
          document.body.style.backgroundColor = "#211212";
            this.showElements = true;
            this.showGreekLetter = true;
            this.clickedCables = [];
            this.removeClickedClasses(); 
            this.generateRandomLetter();
          }
      },
      mounted() {
        this.generateRandomLetter();
      }
    });
  });
  
