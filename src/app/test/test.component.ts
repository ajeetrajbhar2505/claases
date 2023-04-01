import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { WebService } from '../web.service';

interface TextComparisonResult {
  similarity: number;
  tokens1: string[];
  tokens2: string[];
}

interface ContentDetails {
  nested: string;
  from: string;
  classId: string;
  lec_id: string;
  contentId: string;
  content: string;
}

interface Option {
  id: number;
  option_text: string;
  is_correct: boolean;
  selected: boolean;
  priority : number,
  correct_response: boolean;
}

interface Question {
  question_text: string;
  marks: number;
  options: Option[];
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})



export class TestComponent implements OnInit {
  currentContent: string = 'video';
  totalScore: number = 0;
  totalMarks: number = 0;
  currentQuestion: number = 0;
  isModalOpen: boolean = false;
  viewResult: boolean = false;
  quizArray: any = []
  lectureDetails = { lec_title: "", lec_id: "" }
  contentDetails: ContentDetails = {
    nested: '',
    from: '',
    classId: '',
    lec_id: '',
    contentId: '',
    content: '',
  };
  instructions = "Welcome to the auto quiz generation tool! This tool is designed by Ajeet Rajbhar for practice purposes and will generate multiple-choice quizzes for you automatically. Please note that while the correct answer will be provided, it may not always be displayed accurately or may be missing from the options provided. We appreciate your understanding and cooperation in using this tool. Happy practicing"
  constructor(private animationCtrl: AnimationController, public ActivatedRoute: ActivatedRoute, public router: Router, public http: HttpClient,public service:WebService) {
    this.ActivatedRoute.queryParams.subscribe(async (param: any) => {
      this.contentDetails = param;
    })
  }

  speech()
  {
    if (!this.quizArray.length) {
      const question = this.quizArray[this.currentQuestion].question_text
      const speechtext = question.replace(/^Q:\s*/, '') +  ' Options are ' +  this.quizArray[this.currentQuestion].options.map((option:any) => option.option_text).join(' ')
      this.service.speech(speechtext)
      return
    }

    this.service.speechToText()


  }

  async autoGenerateQuiz() {
    try {
      let body = {
        topic: this.lectureDetails.lec_title,
        total_questions: "10"
      };
      this.quizArray = [];
      let questions: any = await this.http.post(environment.nodeApi + '/quiz', body).toPromise();
      for (let element of questions.questions) {
        const questionModal: Question = {
          question_text: element.question,
          marks: 1,
          options: []
        };
        for (let i = 0; i < element.options.length; i++) {
          const options: Option = {
            id: i + 1,
            option_text: this.removeLeadingLetters(element.options[i]),
            is_correct: false,
            selected: false,
            priority : 0,
            correct_response: false,
          };
          questionModal.options.push(options);
        }

        // Search for correct answers
        const searchQuestion = element.question + element.options.join(' ');
        const correctOption: any = await this.generateCorrectOption(searchQuestion);
        let isCorrectFound = false;
        let maxPriority = -1;

        questionModal.options.forEach(option => {
          var optionText = option.option_text
            .replace(/^(answer:\s*[a-zA-Z]\))?\s*/i, "")
            .trim()
            .toLowerCase()
            .replace(/^(answer\s+)?[a-z]\)\s*/g, '')

          var correctOptionText = this.removeLeadingLetters(correctOption)
            .replace(/^(answer:\s*[a-zA-Z]\))?\s*/i, "")
            .trim()
            .toLowerCase()
            .replace(/^(answer\s+)?[a-z]\)\s*/g, '')

                // The correct option is an  match, mark it as correct
            const similarity = this.compareTexts(optionText, correctOptionText).similarity;
            if (!isNaN(similarity)) {
              option.is_correct = true;
              option.priority = similarity
              isCorrectFound = true;
              if (similarity > maxPriority) {
                maxPriority = similarity;
              }

            }
            
        });



      // Highest priority option will be true
        questionModal.options.forEach(option => {
          option.is_correct = false;
        if (option.priority === maxPriority) {
          option.is_correct = true;
        }
      });

        // If correctOption Options me hii nahi hai to push kar and make them correct as option
        if (!isCorrectFound) {
          const correctOptionObject: Option = {
            id: element['options'].length + 1,
            option_text: this.removeLeadingLetters(correctOption),
            is_correct: true,
            selected: false,
            priority : 4,
            correct_response: false,
          };
          questionModal.options.push(correctOptionObject);
        }



        this.quizArray.push(questionModal);
      }
    } catch (error) {
      console.error(`Failed to generate quiz: ${error}`);
      throw error;
    }
    console.log(this.quizArray);

  }

  async generateCorrectOption(question: string): Promise<string> {
    try {
      const body = { question };
      const correctResponse: any = await this.http.post(`${environment.nodeApi}/generateCorrectOption`, body).toPromise();
      const correctOption = correctResponse['result'].replace(/\n[।|\.]\s*[A-ः]?[\)|\.]/, '').trim();
      return correctOption;
    } catch (error) {
      console.error(`Failed to generate correct option: ${error}`);
      throw error;
    }
  }






  ngOnInit() {
    this.ActivatedRoute.queryParams.subscribe(async (param: any) => {
      this.lectureDetails.lec_title = param.lec_title
      this.lectureDetails.lec_id = param.lec_id
      this.autoGenerateQuiz()

      this.restartQuiz()
    })
  }

  onselectOption(i: any, option: any) {
    this.quizArray[i].options.forEach((option: any) => {
      option.selected = false;
      option.correct_response = false;
    });
    option.selected = true;
    this.currentQuestion = i;
    if (option.is_correct) {
      option.correct_response = true;
    }
  }

  preQuestion() {
    if (this.currentQuestion > 0) {
      this.currentQuestion = this.currentQuestion - 1;
    }
  }

  nextQuestion() {
    if (this.currentQuestion < this.quizArray.length - 1) {
      this.currentQuestion = this.currentQuestion + 1;
    }
  }

  submitQuestion() {
    this.totalScore = 0;
    this.totalMarks = 0;
    for (let question of this.quizArray) {
      this.totalMarks += question.marks;
      for (let option of question['options']) {
        if (option.selected && option.correct_response) {
          this.totalScore += question.marks;
        }
      }
    }
    this.isModalOpen = true;
  }

  restartQuiz() {
    this.totalScore = 0;
    this.currentQuestion = 0;
    for (let question of this.quizArray) {
      for (let option of question['options']) {
        option.selected = false;
        option.correct_response = false;
      }
    }
    this.isModalOpen = false;
    this.viewResult = false
  }

  viewResults() {
    this.viewResult = true;
    this.currentQuestion = 0;
    this.isModalOpen = false;
  }

  dismiss() {
    this.isModalOpen = false;
  }

  enterAnimation = (baseEl: HTMLElement) => {
    const root: any = baseEl.shadowRoot;

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };


  routeToPreviousPage() {
    const queryParams = {
      classId: this.contentDetails.classId,
      lec_id: this.contentDetails.lec_id,
      contentId: this.contentDetails.contentId,
      from: this.contentDetails.nested,
    };
    this.router.navigate([this.contentDetails.from], { queryParams });
  }


  // removing A) , a. like this from options
  removeLeadingLetters(str: string): string {
    return str.replace(/^[a-zA-Z]\.?\)?\s*/i, '');

  }


// comparing two text 
    compareTexts(text1: string, text2: string): TextComparisonResult {
    const tokens1 = this.tokenize(text1);
    const tokens2 = this.tokenize(text2);
    const commonTokens = this.getCommonTokens(tokens1, tokens2);
    const similarity = this.cosineSimilarity(commonTokens, tokens1, tokens2);
    return { similarity, tokens1, tokens2 };
  }
  
    tokenize(text: string): string[] {
    // Split text into tokens (words)
    return text.split(/[\s,]+/).filter(token => token.length > 0);
  }
  
    getCommonTokens(tokens1: string[], tokens2: string[]): string[] {
    // Get the set of common tokens between the two texts
    return Array.from(new Set(tokens1.filter(token => tokens2.includes(token))));
  }
  
    cosineSimilarity(commonTokens: string[], tokens1: string[], tokens2: string[]): number {
    // Compute the cosine similarity between the two texts
    const vector1 = this.getVector(commonTokens, tokens1);
    const vector2 = this.getVector(commonTokens, tokens2);
    return this.dotProduct(vector1, vector2) / (this.magnitude(vector1) * this.magnitude(vector2));
  }
  
    getVector(commonTokens: string[], tokens: string[]): number[] {
    // Compute the vector representation of the text
    return commonTokens.map(token => tokens.includes(token) ? 1 : 0);
  }
  
    dotProduct(vector1: number[], vector2: number[]): number {
    // Compute the dot product of two vectors
    return vector1.reduce((sum, value, i) => sum + value * vector2[i], 0);
  }
  
    magnitude(vector: number[]): number {
    // Compute the magnitude of a vector
    return Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0));
  }


}
