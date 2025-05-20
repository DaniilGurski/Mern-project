type ErrorMessageProps = {
  error: string;
};

export default function ErrorMessage({ error }: ErrorMessageProps) {
  return <>{error && <p className="text-red-500"> {error} </p>}</>;
}
