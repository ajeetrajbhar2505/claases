import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { WebService } from '../web.service';
import {
  commonNavigation,
  TextComparisonResult,
} from '../models/commonObjects.module';
import { Requestmodels } from '../models/Requestmodels.module';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;
  currentContent: string = 'video';
  totalScore: number = 0;
  totalMarks: number = 0;
  currentQuestion: number = 0;
  isModalOpen: boolean = false;
  viewResult: boolean = false;
  quizArray: any = [];
  startSpeech: boolean = false;
  lectureDetails = { lec_title: '', lec_id: '' };
  contentDetails: commonNavigation = {
    nested: '',
    from: '',
    classId: '',
    lec_id: '',
    contentId: '',
    content: '',
  };
  instructions =
    'Welcome to the auto quiz generation tool! This tool is designed by Ajeet Rajbhar for practice purposes and will generate multiple-choice quizzes for you automatically. Please note that while the correct answer will be provided, it may not always be displayed accurately or may be missing from the options provided. We appreciate your understanding and cooperation in using this tool. Happy practicing';
  constructor(
    private animationCtrl: AnimationController,
    public ActivatedRoute: ActivatedRoute,
    public router: Router,
    public http: HttpClient,
    public service: WebService
  ) {
    this._unsubscribeAll = new Subject();
    this.ActivatedRoute.queryParams.subscribe(async (param: any) => {
      this.contentDetails = param;
    });
  }

  speech() {
    if (this.quizArray.length) {
      const question = this.quizArray[this.currentQuestion].question_text;
      console.log(question);
  
      // Replace multiple dashes or underscores with a single hyphen (-)
      const questionText = question.replace(/[_-]+/g, ' - ');
  
      const options = this.quizArray[this.currentQuestion].options
        .map((option: any, index: any) => {
          const optionNumber = `Option ${index + 1}`;
          // Replace multiple dashes or underscores with a single hyphen (-)
          const optionText = option.option_text.replace(/[_-]+/g, ' - ');
          return `${optionNumber} ${optionText}`;
        })
        .join(' ');
  
      const speechtext = questionText.replace(/^Q:\s*/, '') + options;
      this.service.speech(speechtext);
  
      return;
    }
  }
  
  
  

  toggleSpeech() {
    this.startSpeech = !this.startSpeech;
    if (this.startSpeech) {
      this.speech(); // Start speech synthesis
    } else {
      this.service.clearSpeech(); // Clear the voice when stopping
    }
  }
  
  
  async autoGenerateQuiz() {
    this.quizArray = [];
    const req = new Requestmodels();
    req.RequestUrl = `fetchpaper/${this.contentDetails.contentId}`;

    await this.service
      .fetchData(req)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        async (data) => {
          if (data != null) {
            if (data.status !== 200) {
              return;
            }

            // fetch
            const questions = data.response || [];
            // Transformation and generation functions
            questions.questions.map((element: any) => {
              const questionModal: Question = {
                question_text: element.question,
                marks: element.mark,
                options: element.options.map((optionText: any, index: any) => {
                  const isCorrect =
                    element.correct_ans === String.fromCharCode(97 + index); // Check if it's the correct option
                  return {
                    id: index + 1,
                    option_text: optionText.replace(/^.\)\s*/, ''),
                    is_correct: isCorrect,
                    selected: false,
                    priority: isCorrect ? 4 : 0,
                    correct_response: false,
                  };
                }),
              };

              // Find the correct option and set it as the correct_response
              const correctOption = questionModal.options.find(
                (option) => option.is_correct
              );
              if (correctOption) {
                questionModal.options.forEach((option) => {
                  option.correct_response = option === correctOption;
                });
              }

              this.quizArray.push(questionModal);
            });
          }
        },
        (_error) => {
          return;
        },
        () => {}
      );
  }

  ngOnInit() {
    this.ActivatedRoute.queryParams.subscribe(async (param: any) => {
      this.lectureDetails = param;
      this.autoGenerateQuiz();
      this.restartQuiz();

      if (param.reload === 'true') {
        this.lectureDetails = param;
        this.autoGenerateQuiz();
        this.restartQuiz();
      }
    });
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
      this.startSpeech = false
      this.service.clearSpeech()
      this.currentQuestion = this.currentQuestion - 1;
    }
  }

  nextQuestion() {
    if (this.currentQuestion < this.quizArray.length - 1) {
      this.startSpeech = false
      this.service.clearSpeech()
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
    this.viewResult = false;
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
    return text.split(/[\s,]+/).filter((token) => token.length > 0);
  }

  getCommonTokens(tokens1: string[], tokens2: string[]): string[] {
    // Get the set of common tokens between the two texts
    return Array.from(
      new Set(tokens1.filter((token) => tokens2.includes(token)))
    );
  }

  cosineSimilarity(
    commonTokens: string[],
    tokens1: string[],
    tokens2: string[]
  ): number {
    // Compute the cosine similarity between the two texts
    const vector1 = this.getVector(commonTokens, tokens1);
    const vector2 = this.getVector(commonTokens, tokens2);
    return (
      this.dotProduct(vector1, vector2) /
      (this.magnitude(vector1) * this.magnitude(vector2))
    );
  }

  getVector(commonTokens: string[], tokens: string[]): number[] {
    // Compute the vector representation of the text
    return commonTokens.map((token) => (tokens.includes(token) ? 1 : 0));
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

// Define interfaces for your models
interface Option {
  id: number;
  option_text: string;
  is_correct: boolean;
  selected: boolean;
  priority: number;
  correct_response: boolean;
}

interface Question {
  question_text: string;
  marks: number;
  options: Option[];
}
