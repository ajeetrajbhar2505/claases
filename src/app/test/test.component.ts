import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  currentContent: string = 'video';
  totalScore:number = 0
  quizArray = [
    {
      question_text: 'Who is prime minister of india ?',
      marks: 1 ,
      options: [
        { id :1, option_text: 'Narendra modi', is_correct: true,selected : false ,correct_response : false },
        { id :2, option_text: 'Rahul gandi', is_correct: false,selected : false,correct_response : false },
        { id :3, option_text: 'Mamta banerji', is_correct: false,selected : false,correct_response : false },
        { id :4, option_text: 'Yoginath', is_correct: false,selected : false,correct_response : false },
      ],
    },
  ];

  constructor() {}

  onselectOption(i:any,option:any)
  {

    this.quizArray[i].options.forEach(option=>{
      option.selected = false
      option.correct_response = false
    })
    option.selected = true
    if (option.is_correct) {
      option.correct_response = true
    }
    
  }

  ngOnInit() {}
}
