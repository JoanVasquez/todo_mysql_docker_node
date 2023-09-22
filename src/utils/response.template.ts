export default class ResponseTemplate {
  private _timeStamp: string;
  private _statusCode: number;
  private _status: string;
  private _message: any;
  private _data: any;

  constructor(statusCode: number, status: string, message: any, data?: any) {
    this._timeStamp = new Date().toLocaleDateString();
    this._statusCode = statusCode;
    this._status = status;
    this._message = message;
    this._data = data;
  }

  get statusCode(): number {
    return this._statusCode;
  }

  get status(): string {
    return this._status;
  }

  get message(): any {
    return this._message;
  }
}
