import DOMPurify from 'dompurify';

type RenderHtmlProps = {
    htmlContent: string;
}
const RenderHtml = ({ htmlContent }: RenderHtmlProps) => {
  // Sanitize the HTML content to prevent XSS
  const sanitizedHtml = DOMPurify.sanitize(htmlContent);

  return (
    <div
      style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px' }}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
};

export default RenderHtml
