export interface commonNavigation{
    classId?:string;
    lec_id?:string;
    lec_title?:string;
    contentId?:string;
    from?:string;
    content?:string;
    nested?:string
    reload?:string
}

export interface ContentControls {
    playContent: boolean;
    openFullscreen: boolean;
    Rangeduration: number;
    currentRangeDuration: number;
    currentDuration: string;
    duration: string;
  }

 export interface TextComparisonResult {
    similarity: number;
    tokens1: string[];
    tokens2: string[];
  }
  
 export interface Option {
    id: number;
    option_text: string;
    is_correct: boolean;
    selected: boolean;
    priority : number,
    correct_response: boolean;
  }
  
  export interface Question {
    question_text: string;
    marks: number;
    options: Option[];
  }
  