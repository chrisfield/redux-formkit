import ExtendableError from "es6-error";

class SubmissionError extends ExtendableError {
  public errors: any;
  constructor(errors: any) {
    super("Submit Validation Failed");
    this.errors = errors;
  }
}

export default SubmissionError;
