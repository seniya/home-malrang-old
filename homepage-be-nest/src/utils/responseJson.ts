const RESULT_SUCCESS_CODE = 'RS0000';
const RESULT_SUCCESS_MESSAGE = 'SUCCESS';
const RESULT_ERROR_CODE = 'RS9999';
const RESULT_ERROR_MESSAGE = 'ERROR';

interface ResultIf {
  code: string;
  message: string;
}

export class ResponseJson {
  public data: any | any[];
  public result: ResultIf;

  public success(...data_): ResponseJson {
    // this.data = data;
    // console.log('ResponseJson success data_ : ', data_);
    // console.log('ResponseJson success data_.length : ', data_.length);
    this.data = data_[0];

    this.result = {
      code: RESULT_SUCCESS_CODE,
      message: RESULT_SUCCESS_MESSAGE,
    };
    return this;
  }

  public error(code_: string = RESULT_ERROR_CODE, message_: string = RESULT_ERROR_MESSAGE): ResponseJson {
    this.data = {};
    this.result = {
      code: code_,
      message: message_,
    };
    return this;
  }
}
