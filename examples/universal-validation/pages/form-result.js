import Link from 'next/link';

const FormResult = ({theNumber}) => (
  <div>
    <h1>Form Submitted Successfully</h1>
    <p>
      You were redirected here on successfull submission.
      Your lucky number is: {theNumber}
    </p>
    <Link href="/">
      <a>Back to Form</a>
    </Link>
  </div>
);

FormResult.getInitialProps = ({query}) => (
  {theNumber: query.theNumber}
);

export default FormResult;