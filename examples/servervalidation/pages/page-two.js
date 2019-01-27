import Link from 'next/link';

const PageTwo = (props) => (
  <div>
    <h1>Page Two</h1>
    <p>
      Example form redirected here on successfull submission.
      Your lucky number is: {props.theNumber}
    </p>
    <Link href="/">
      <a>Back to Form</a>
    </Link>
  </div>
);

PageTwo.getInitialProps = ({query}) => (
  {theNumber: query.theNumber}
);

export default PageTwo;