import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  currentContent: string = 'video';
  totalScore: number = 0;
  currentQuestion: number = 0;
  quizArray = [
    {
      question_text: "Which letter does the word 'apple' starts with?",
      marks: 1,
      options: [
        {
          id: 1,
          option_text: 'a',
          is_correct: true,
          selected: false,
          correct_response: false,
        },
        {
          id: 2,
          option_text: 'e',
          is_correct: false,
          selected: false,
          correct_response: false,
        },
        {
          id: 3,
          option_text: 'o',
          is_correct: false,
          selected: false,
          correct_response: false,
        },
        {
          id: 4,
          option_text: 'l',
          is_correct: false,
          selected: false,
          correct_response: false,
        },
      ],
    },
    {
      question_text: "Which letter does the word 'car' starts with?",
      marks: 2,
      options: [
        {
          id: 1,
          option_text: 'o',
          is_correct: false,
          selected: false,
          correct_response: false,
        },
        {
          id: 2,
          option_text: 'c',
          is_correct: true,
          selected: false,
          correct_response: false,
        },
        {
          id: 3,
          option_text: 'b',
          is_correct: false,
          selected: false,
          correct_response: false,
        },
        {
          id: 4,
          option_text: 'd',
          is_correct: false,
          selected: false,
          correct_response: false,
        },
      ],
    },
  ];

  constructor() {}

  onselectOption(i: any, option: any) {
    this.quizArray[i].options.forEach((option) => {
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

  ngOnInit() {}
}
