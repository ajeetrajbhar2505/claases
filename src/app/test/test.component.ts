import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

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
    
  // quizArray = [
  //   {
  //     question_text: "Which letter does the word 'apple' starts with?",
  //     marks: 1,
  //     options: [
  //       {
  //         id: 1,
  //         option_text: 'a',
  //         is_correct: true,
  //         selected: false,
  //         correct_response: false,
  //       },
  //       {
  //         id: 2,
  //         option_text: 'e',
  //         is_correct: false,
  //         selected: false,
  //         correct_response: false,
  //       },
  //       {
  //         id: 3,
  //         option_text: 'o',
  //         is_correct: false,
  //         selected: false,
  //         correct_response: false,
  //       },
  //       {
  //         id: 4,
  //         option_text: 'l',
  //         is_correct: false,
  //         selected: false,
  //         correct_response: false,
  //       },
  //     ],
  //   },
  //   {
  //     question_text: "Which letter does the word 'car' starts with?",
  //     marks: 1,
  //     options: [
  //       {
  //         id: 1,
  //         option_text: 'o',
  //         is_correct: false,
  //         selected: false,
  //         correct_response: false,
  //       },
  //       {
  //         id: 2,
  //         option_text: 'c',
  //         is_correct: true,
  //         selected: false,
  //         correct_response: false,
  //       },
  //       {
  //         id: 3,
  //         option_text: 'b',
  //         is_correct: false,
  //         selected: false,
  //         correct_response: false,
  //       },
  //       {
  //         id: 4,
  //         option_text: 'd',
  //         is_correct: false,
  //         selected: false,
  //         correct_response: false,
  //       },
  //     ],
  //   },
  //   {
  //     question_text: "Which letter does the word 'giraffe' starts with?",
  //     marks: 1,
  //     options: [
  //       {
  //         id: 1,
  //         option_text: 'o',
  //         is_correct: false,
  //         selected: false,
  //         correct_response: false,
  //       },
  //       {
  //         id: 2,
  //         option_text: 'c',
  //         is_correct: false,
  //         selected: false,
  //         correct_response: false,
  //       },
  //       {
  //         id: 3,
  //         option_text: 'g',
  //         is_correct: true,
  //         selected: false,
  //         correct_response: false,
  //       },
  //       {
  //         id: 4,
  //         option_text: 'd',
  //         is_correct: false,
  //         selected: false,
  //         correct_response: false,
  //       },
  //     ],
  //   },
  // ];
  lectureDetails =  { lec_title : "",lec_id : ""}
  contentDetails: ContentDetails = {
    nested: '',
    from: '',
    classId: '',
    lec_id: '',
    contentId: '',
    content: '',
  };
  constructor(private animationCtrl: AnimationController,public ActivatedRoute:ActivatedRoute,public router:Router,public http:HttpClient) {
    this.ActivatedRoute.queryParams.subscribe(async (param: any) => {
      this.contentDetails = param;
    })
  }


 async autoGenerateQuiz()
  {
    let body = {
      topic : this.lectureDetails.lec_title,
      total_questions : "10"
    }
     this.quizArray = []
    let questions:any = await this.http.post(environment.nodeApi + '/quiz',body).toPromise()
    questions['questions'].forEach((element:any) => {
      const questionModal: Question = {
        question_text: element.question,
        marks: 1,
        options: []
        }
        for (let i = 0; i < element['options'].length; i++) {
          const options :Option  ={
            id: i+1,
            option_text: element['options'][i],
            is_correct: false,
            selected: false,
            correct_response: false,
          }
          questionModal.options.push(options)
        }


     //  Search for correct answers
      const searchquestion = element.question +  element['options'].join(' ');
      const correctOption:any =  this.generateCorrectOption(searchquestion)

      questionModal.options.forEach(option => {
        if (option.option_text.includes(correctOption)) {
          option.is_correct = true;
        }
      });
     this.quizArray.push(questionModal)

    });
    
    
  }


 async generateCorrectOption(question:any)
  {
    let body = {
      question : question
    }
    let correct_response:any = await this.http.post(environment.nodeApi + '/generateCorrectOption',body).toPromise()
    return correct_response['result'].replace(/\nA\. /, "");
  }


  ngOnInit() {
    this.ActivatedRoute.queryParams.subscribe(async (param: any) => {
      this.lectureDetails.lec_title = param.lec_title
      this.lectureDetails.lec_id = param.lec_id
      this.autoGenerateQuiz()
     console.log({quizArray : this.quizArray});

     this.restartQuiz()
    })
  }

  onselectOption(i: any, option: any) {
    this.quizArray[i].options.forEach((option:any) => {
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


  routeToPreviousPage()
  {
    const queryParams = {
      classId: this.contentDetails.classId,
      lec_id: this.contentDetails.lec_id,
      contentId: this.contentDetails.contentId,
      from: this.contentDetails.nested,
    };
    this.router.navigate([this.contentDetails.from], { queryParams });
  }

}
